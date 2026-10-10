(function () {
  'use strict';

  var WORDS = window.TOEIC_WORDS;
  var CATS = window.TOEIC_CATEGORIES;
  var WORD_BY_ID = {};
  WORDS.forEach(function (w) { WORD_BY_ID[w.id] = w; });
  var PHRASES = window.PHRASES;
  var SCENES = window.PHRASE_SCENES;
  var PHRASE_BY_ID = {};
  PHRASES.forEach(function (p) { PHRASE_BY_ID[p.id] = p; });

  // 句型的 id 以 p: 開頭，學習紀錄和單字存在同一個地方，共用複習排程
  function isPhrase(id) { return id.indexOf('p:') === 0; }
  function getItem(id) { return isPhrase(id) ? PHRASE_BY_ID[id] : WORD_BY_ID[id]; }
  function speechText(id) { var it = getItem(id); return it.type === 'phrase' ? it.plain : it.word; }

  // 改版時要和 sw.js 的 CACHE 版本號一起更新（npm test 會檢查兩者一致）
  var APP_VERSION = '0.3.4';
  var STORE_KEY = 'toeic-practice-v1';
  var ERROR_KEY = 'toeic-practice-errors';   // index.html 開頭的錯誤紀錄寫在這裡
  var ISSUE_URL = 'https://github.com/eden23550/toeic-practice/issues/new/choose';
  // 不需要登入的 Google 表單，打開時會自動帶入題目資訊（預先填入連結）
  var REPORT_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfz_i_0iS4KOdqzezJpXvbfaOZkrSCFq2qHggGOqSFeVaitDQ/viewform';
  // 表單各題的代號；改了表單題目要到「預先填寫表單」重新取得
  var REPORT_FIELDS = {
    type: 'entry.1300635232',     // 回報類型（選項文字必須和表單完全相同）
    info: 'entry.441789377',      // 題目或錯誤資訊
    device: 'entry.1426037231',   // App 版本與裝置
  };
  var REPORT_INFO_MAX = 3000;     // 網址太長表單會打不開，資訊編碼後超過這個長度就截斷
  // 各記憶等級答對後的下次複習間隔（天）
  var INTERVALS = [0, 1, 3, 7, 14, 30, 60];
  var MAX_LEVEL = INTERVALS.length - 1;
  var MISTAKE_CLEAR_STREAK = 2;

  var STATUS = {
    new: { label: '未學', cls: 'st-new' },
    learning: { label: '學習中', cls: 'st-learning' },
    familiar: { label: '熟悉', cls: 'st-familiar' },
    mastered: { label: '精熟', cls: 'st-mastered' },
  };

  var MODE_LABEL = {
    en2zh: '英選中', zh2en: '中選英', fill: '詞性填空', spell: '拼字', card: '單字卡', listen: '聽力',
    p_listen: '聽句子', p_zh2en: '中翻英', p_order: '句子重組', p_reply: '情境對話',
  };
  var PHRASE_MODES = ['p_listen', 'p_zh2en', 'p_order', 'p_reply'];
  var ORDER_MAX_WORDS = 10;

  // ---------- 工具函式 ----------
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function dateStr(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function today() { return dateStr(new Date()); }
  function addDays(str, n) {
    var p = str.split('-');
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    d.setDate(d.getDate() + n);
    return dateStr(d);
  }
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function pct(a, b) { return b ? Math.round((a / b) * 100) : 0; }
  function mainPos(w) { return w.pos.split('/')[0]; }
  function exHtml(en) {
    return esc(en).replace(/\[(.+?)\]/, '<mark>$1</mark>');
  }
  function exBlank(en) {
    return esc(en).replace(/\[(.+?)\]/, '<span class="blank">_____</span>');
  }
  function exPlain(en) { return en.replace(/[\[\]]/g, ''); }
  function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  // NFKC 會把中文輸入法打出的全形英文字母（ａｂｃ）轉成一般的半形字母
  function normalize(s) { return s.normalize('NFKC').trim().toLowerCase().replace(/\s+/g, ' ').replace(/[’‘]/g, "'"); }
  // 出現注音、中文等東亞文字，通常是忘了切換成英文鍵盤（打錯字母、數字則照常判錯）
  function looksNonEnglish(s) { return /[\u2E80-\u9FFF\uAC00-\uD7AF\uF900-\uFAFF\uFF00-\uFFEF]/.test(normalize(s)); }

  // ---------- 資料儲存 ----------
  function defaultState() {
    return {
      settings: { dailyNew: 15, dailyNewPhrases: 5, accent: 'en-US', rate: 0.9, autoSpeak: true },
      words: {},
      daily: {},
    };
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (!raw) return defaultState();
      var s = JSON.parse(raw);
      var d = defaultState();
      s.settings = Object.assign(d.settings, s.settings || {});
      s.words = s.words || {};
      s.daily = s.daily || {};
      return s;
    } catch (e) {
      return defaultState();
    }
  }

  var state = loadState();

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* 儲存空間不可用 */ }
  }

  function dayRec(date) {
    var d = date || today();
    if (!state.daily[d]) state.daily[d] = { newCount: 0, newPhrases: 0, answered: 0, correct: 0, wrong: 0 };
    return state.daily[d];
  }

  function statusOf(id) {
    var r = state.words[id];
    if (!r || r.level < 1) return 'new';
    if (r.level <= 2) return 'learning';
    if (r.level <= 4) return 'familiar';
    return 'mastered';
  }

  function isLearned(id) {
    var r = state.words[id];
    return !!r && r.level >= 1;
  }

  function countNew(id) {
    var day = dayRec();
    if (isPhrase(id)) day.newPhrases = (day.newPhrases || 0) + 1;
    else day.newCount++;
  }

  function introduce(id) {
    var existing = state.words[id];
    if (existing) {
      // 自由練習時碰過但尚未正式學習的字
      if (!existing.intro && existing.level === 0) { existing.intro = true; countNew(id); save(); }
      return;
    }
    state.words[id] = { level: 0, intro: true, due: today(), correct: 0, wrong: 0, mistake: false, mistakeStreak: 0, lastWrong: null };
    countNew(id);
    save();
  }

  // result: 'correct' | 'fuzzy' | 'wrong'；schedule 決定是否影響複習排程
  function record(id, result, schedule) {
    var r = state.words[id];
    if (!r) {
      r = state.words[id] = { level: 0, due: today(), correct: 0, wrong: 0, mistake: false, mistakeStreak: 0, lastWrong: null };
    }
    var day = dayRec();
    day.answered++;
    if (result === 'correct') { r.correct++; day.correct++; }
    if (result === 'wrong') { r.wrong++; day.wrong++; }

    if (schedule) {
      if (result === 'correct') {
        r.level = Math.min(r.level + 1, MAX_LEVEL);
        r.due = addDays(today(), INTERVALS[r.level]);
      } else if (result === 'fuzzy') {
        r.level = Math.max(1, r.level);
        r.due = addDays(today(), 1);
      } else {
        r.level = 1;
        r.due = addDays(today(), 1);
      }
    }

    if (result === 'wrong' || result === 'fuzzy') {
      r.mistake = true;
      r.mistakeStreak = 0;
      if (result === 'wrong') r.lastWrong = today();
    } else if (r.mistake) {
      r.mistakeStreak++;
      if (r.mistakeStreak >= MISTAKE_CLEAR_STREAK) r.mistake = false;
    }
    save();
  }

  // ---------- 發音 ----------
  var voices = [];
  function loadVoices() {
    if (!('speechSynthesis' in window)) return;
    voices = window.speechSynthesis.getVoices();
  }
  if ('speechSynthesis' in window) {
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
  function pickVoice(lang) {
    var norm = function (s) { return s.replace('_', '-').toLowerCase(); };
    var exact = voices.filter(function (v) { return norm(v.lang) === lang.toLowerCase(); });
    if (exact.length) return exact[0];
    var en = voices.filter(function (v) { return norm(v.lang).indexOf('en') === 0; });
    return en[0] || null;
  }
  var canSpeak = 'speechSynthesis' in window;

  function speak(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = state.settings.accent;
    u.rate = state.settings.rate;
    var v = pickVoice(state.settings.accent);
    if (v) u.voice = v;
    window.speechSynthesis.speak(u);
  }
  function speakBtn(text, big) {
    return '<button class="speak' + (big ? ' big' : '') + '" data-speak="' + esc(text) + '" aria-label="發音">🔊</button>';
  }

  // ---------- 題目產生 ----------
  function distractors(word, field, n) {
    var used = {};
    used[word[field]] = true;
    // 排除中文意思相同或重疊的字，避免出現兩個正確答案
    var zhParts = word.zh.split('；');
    var usable = WORDS.filter(function (w) {
      return w.id !== word.id && !w.zh.split('；').some(function (p) { return zhParts.indexOf(p) >= 0; });
    });
    var samePos = shuffle(usable.filter(function (w) { return mainPos(w) === mainPos(word); }));
    var others = shuffle(usable.filter(function (w) { return mainPos(w) !== mainPos(word); }));
    var out = [];
    samePos.concat(others).some(function (w) {
      if (!used[w[field]]) { used[w[field]] = true; out.push(w[field]); }
      return out.length >= n;
    });
    return out;
  }

  // 有些字沒有詞性變化題、有些裝置不能發音，改用其他題型
  function resolveMode(id, mode) {
    if (isPhrase(id)) {
      var p = PHRASE_BY_ID[id];
      if (mode === 'p_reply' && !p.q) return 'p_zh2en';
      if (mode === 'p_order' && p.plain.split(' ').length > ORDER_MAX_WORDS) return 'p_zh2en';
      if (mode === 'p_listen' && !canSpeak) return 'p_zh2en';
      return mode;
    }
    var w = WORD_BY_ID[id];
    if (mode === 'fill' && !w.forms.length) return 'zh2en';
    if (mode === 'listen' && !canSpeak) return 'en2zh';
    return mode;
  }

  // 句型的干擾選項優先從同一個情境挑；情境對話題只用其他「回答」當選項
  function phraseDistractors(p, field, n, repliesOnly) {
    var ok = function (x) { return x.id !== p.id && (!repliesOnly || x.q); };
    var same = shuffle(PHRASES.filter(function (x) { return ok(x) && x.scene === p.scene; }));
    var other = shuffle(PHRASES.filter(function (x) { return ok(x) && x.scene !== p.scene; }));
    var used = {};
    used[p[field]] = true;
    var out = [];
    same.concat(other).some(function (x) {
      if (!used[x[field]]) { used[x[field]] = true; out.push(x[field]); }
      return out.length >= n;
    });
    return out;
  }

  function makePhraseQuestion(p, mode) {
    var q = { id: p.id, mode: mode };
    if (mode === 'p_listen') {
      q.options = shuffle([p.zh].concat(phraseDistractors(p, 'zh', 3)));
      q.answer = p.zh;
    } else if (mode === 'p_zh2en' || mode === 'p_reply') {
      q.options = shuffle([p.plain].concat(phraseDistractors(p, 'plain', 3, mode === 'p_reply')));
      q.answer = p.plain;
    } else if (mode === 'p_order') {
      var tokens = p.plain.split(' ');
      var order = tokens.map(function (t, i) { return i; });
      if (tokens.length > 1) {
        do { order = shuffle(order); } while (order.every(function (v, i) { return v === i; }));
      }
      q.tokens = tokens;
      q.order = order;      // 打亂後的順序（存 tokens 的索引）
      q.picked = [];        // 使用者依序點選的 order 位置
      q.answer = p.plain;
    }
    return q;
  }

  function makeQuestion(id, mode) {
    if (isPhrase(id)) return makePhraseQuestion(PHRASE_BY_ID[id], mode);
    var w = WORD_BY_ID[id];
    var q = { id: id, mode: mode, exIdx: Math.floor(Math.random() * w.examples.length) };
    if (mode === 'en2zh' || mode === 'listen') {
      q.options = shuffle([w.zh].concat(distractors(w, 'zh', 3)));
      q.answer = w.zh;
    } else if (mode === 'zh2en') {
      q.options = shuffle([w.word].concat(distractors(w, 'word', 3)));
      q.answer = w.word;
    } else if (mode === 'fill') {
      // 多益 Part 5 風格：選項是同一個字的不同詞性或易混淆字
      q.options = shuffle([w.word].concat(shuffle(w.forms).slice(0, 3)));
      q.answer = w.word;
    }
    return q;
  }

  function reviewMode(id) {
    var r = state.words[id];
    var lv = r ? r.level : 1;
    var modes;
    if (isPhrase(id)) {
      if (lv <= 1) modes = ['p_listen', 'p_zh2en', 'p_reply'];
      else if (lv === 2) modes = ['p_order', 'p_reply', 'p_listen'];
      else modes = ['p_order', 'p_reply', 'p_listen', 'p_zh2en'];
      return pickRandom(modes);
    }
    if (lv <= 1) modes = ['en2zh', 'card', 'zh2en', 'listen'];
    else if (lv === 2) modes = ['zh2en', 'fill', 'listen', 'en2zh'];
    else modes = ['fill', 'spell', 'listen', 'zh2en', 'card'];
    return pickRandom(modes);
  }

  var PRACTICE_MODES = ['en2zh', 'zh2en', 'fill', 'spell', 'listen'];

  // ---------- 學習清單 ----------
  function dueIn(list) {
    var t = today();
    return list.filter(function (w) {
      var r = state.words[w.id];
      return r && r.level >= 1 && r.due <= t;
    }).map(function (w) { return w.id; });
  }
  function unseenIn(list) {
    return list.filter(function (w) { var r = state.words[w.id]; return !r || (r.level === 0 && !r.intro); });
  }
  // 已介紹但尚未完成第一次測驗的項目（例如學到一半離開）
  function pendingIn(list) {
    return list.filter(function (w) {
      var r = state.words[w.id];
      return r && r.level === 0 && r.intro;
    }).map(function (w) { return w.id; });
  }

  function dueWords() { return dueIn(WORDS); }
  function unseenWords() {
    return unseenIn(WORDS)
      .sort(function (a, b) { return a.lvl - b.lvl || a.order - b.order || a.catIndex - b.catIndex; })
      .map(function (w) { return w.id; });
  }
  function pendingNewWords() { return pendingIn(WORDS); }
  function newQuota() {
    return Math.max(0, state.settings.dailyNew - dayRec().newCount);
  }

  // 句型依情境順序學習：從機場入境開始，符合剛抵達時的需要
  function duePhrases() { return dueIn(PHRASES); }
  function unseenPhrases() {
    return unseenIn(PHRASES)
      .sort(function (a, b) { return a.sceneIndex - b.sceneIndex || a.order - b.order; })
      .map(function (p) { return p.id; });
  }
  function pendingNewPhrases() { return pendingIn(PHRASES); }
  function newPhraseQuota() {
    return Math.max(0, state.settings.dailyNewPhrases - (dayRec().newPhrases || 0));
  }

  function mistakeWords() {
    return WORDS.filter(function (w) { var r = state.words[w.id]; return r && r.mistake; })
      .sort(function (a, b) {
        var ra = state.words[a.id], rb = state.words[b.id];
        return (rb.lastWrong || '').localeCompare(ra.lastWrong || '');
      })
      .map(function (w) { return w.id; });
  }

  function streak() {
    var n = 0;
    var d = today();
    if (!(state.daily[d] && state.daily[d].answered)) d = addDays(d, -1);
    while (state.daily[d] && state.daily[d].answered) {
      n++;
      d = addDays(d, -1);
    }
    return n;
  }

  // ---------- 練習流程 ----------
  var session = null;
  var currentTab = 'home';
  var libFilter = { cat: 'all', q: '' };
  var currentScene = null;

  // 每個 item: { type: 'intro' | 'quiz', id, mode, retry }
  function buildNewItems(ids) {
    var items = [];
    for (var i = 0; i < ids.length; i += 5) {
      var group = ids.slice(i, i + 5);
      group.forEach(function (id) { items.push({ type: 'intro', id: id }); });
      shuffle(group).forEach(function (id) {
        var mode = isPhrase(id) ? pickRandom(['p_listen', 'p_zh2en']) : pickRandom(['en2zh', 'zh2en']);
        items.push({ type: 'quiz', id: id, mode: mode, first: true });
      });
    }
    return items;
  }

  function startDaily(extraNew) {
    var reviews = shuffle(dueWords()).map(function (id) {
      return { type: 'quiz', id: id, mode: reviewMode(id) };
    });
    var pending = pendingNewWords();
    var count = extraNew != null ? extraNew : newQuota();
    var fresh = pending.concat(unseenWords().slice(0, Math.max(0, count - pending.length)));
    if (extraNew != null) reviews = [];
    var items = reviews.concat(buildNewItems(fresh));
    startSession('daily', items, true, extraNew != null ? '加碼學習' : '今日學習');
  }

  function startPhraseDaily(extraNew) {
    var reviews = extraNew != null ? [] : shuffle(duePhrases()).map(function (id) {
      return { type: 'quiz', id: id, mode: reviewMode(id) };
    });
    var pending = pendingNewPhrases();
    var count = extraNew != null ? extraNew : newPhraseQuota();
    var fresh = pending.concat(unseenPhrases().slice(0, Math.max(0, count - pending.length)));
    startSession('daily', reviews.concat(buildNewItems(fresh)), true, extraNew != null ? '加碼句型' : '今日句型');
  }

  function startScenePractice(sceneId) {
    var ids = shuffle(PHRASES.filter(function (p) { return p.scene === sceneId; }).map(function (p) { return p.id; })).slice(0, 10);
    var items = ids.map(function (id) { return { type: 'quiz', id: id, mode: pickRandom(PHRASE_MODES) }; });
    startSession('free', items, false, '情境練習');
  }

  function startMistakes() {
    var ids = shuffle(mistakeWords()).slice(0, 15);
    var items = ids.map(function (id) {
      return { type: 'quiz', id: id, mode: pickRandom(PRACTICE_MODES) };
    });
    startSession('mistakes', items, false, '生字本練習');
  }

  function startFree(cat, mode, count, onlyLearned) {
    var pool = WORDS.filter(function (w) {
      if (cat !== 'all' && w.cat !== cat) return false;
      if (onlyLearned && !isLearned(w.id)) return false;
      return true;
    });
    var ids = shuffle(pool.map(function (w) { return w.id; })).slice(0, count);
    var items = ids.map(function (id) {
      return { type: 'quiz', id: id, mode: mode === 'mixed' ? pickRandom(PRACTICE_MODES) : mode };
    });
    startSession('free', items, false, '自由練習');
  }

  function startSession(kind, items, schedule, title) {
    if (!items.length) return;
    items.forEach(function (it) { if (it.mode) it.mode = resolveMode(it.id, it.mode); });
    session = {
      kind: kind, title: title, items: items, idx: 0, schedule: schedule,
      answered: {}, correct: 0, wrong: 0, wrongIds: [], q: null, revealed: false,
    };
    renderSession();
  }

  function currentItem() { return session.items[session.idx]; }

  function nextItem() {
    session.idx++;
    session.q = null;
    session.picked = null;
    session.revealed = false;
    if (session.idx >= session.items.length) {
      renderSummary();
    } else {
      renderSession();
    }
  }

  function answer(result) {
    var item = currentItem();
    var firstTry = !session.answered[item.id];
    if (firstTry) {
      session.answered[item.id] = true;
      if (result === 'correct') session.correct++;
      else {
        session.wrong++;
        if (session.wrongIds.indexOf(item.id) < 0) session.wrongIds.push(item.id);
      }
      record(item.id, result, session.schedule);
    } else if (result === 'correct') {
      // 重考答對：只更新今日作答量
      dayRec().answered++;
      save();
    }
    // 答錯就在本輪稍後再考一次
    if (result !== 'correct' && !item.retry && session.kind !== 'free') {
      var pos = Math.min(session.items.length, session.idx + 4);
      var retryMode = resolveMode(item.id, pickRandom(isPhrase(item.id) ? ['p_listen', 'p_zh2en'] : ['en2zh', 'zh2en', 'listen']));
      session.items.splice(pos, 0, { type: 'quiz', id: item.id, mode: retryMode, retry: true });
    }
    session.revealed = true;
    session.lastResult = result;
    renderSession();
    if (state.settings.autoSpeak) speak(speechText(item.id));
  }

  function exitSession() {
    session = null;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    render();
  }

  // ---------- 畫面 ----------
  var $app = document.getElementById('app');

  function render() {
    if (session) { renderSession(); return; }
    var body = '';
    if (currentTab === 'home') body = viewHome();
    else if (currentTab === 'phrases') body = currentScene ? viewScene() : viewPhrases();
    else if (currentTab === 'library') body = viewLibrary();
    else if (currentTab === 'mistakes') body = viewMistakes();
    else if (currentTab === 'stats') body = viewStats();
    else if (currentTab === 'settings') body = viewSettings();
    $app.innerHTML = '<main class="page">' + body + '</main>' + navBar();
    if (currentTab === 'library') bindLibrarySearch();
  }

  function navBar() {
    var tabs = [
      ['home', '🏠', '今日'], ['phrases', '💬', '句型'], ['library', '📚', '單字庫'], ['mistakes', '📝', '生字本'],
      ['stats', '📊', '統計'], ['settings', '⚙️', '設定'],
    ];
    return '<nav class="tabbar">' + tabs.map(function (t) {
      return '<button class="tab' + (currentTab === t[0] ? ' active' : '') + '" data-tab="' + t[0] + '">' +
        '<span class="tab-icon">' + t[1] + '</span><span>' + t[2] + '</span></button>';
    }).join('') + '</nav>';
  }

  function viewHome() {
    var due = dueWords().length;
    var pending = pendingNewWords().length;
    var quota = Math.max(newQuota(), pending);
    var remainNew = Math.min(quota, unseenWords().length + pending);
    var day = dayRec();
    var learned = WORDS.filter(function (w) { return isLearned(w.id); }).length;
    var total = due + remainNew;

    var h = '<header class="hero"><h1>多益單字練習</h1><p class="sub">為出國溝通打好單字基礎</p></header>';
    h += '<section class="card today">';
    h += '<div class="today-row"><div class="big-num">' + due + '</div><div>個字要複習</div></div>';
    h += '<div class="today-row"><div class="big-num">' + remainNew + '</div><div>個新字</div></div>';
    if (total > 0) {
      h += '<button class="btn primary block" data-action="start-daily">開始今日學習</button>';
    } else {
      h += '<p class="done-msg">🎉 今天的任務都完成了！</p>';
      if (unseenWords().length) h += '<button class="btn block" data-action="extra">再學 5 個新字</button>';
    }
    h += '</section>';
    h += phraseTodayCard(true);

    h += '<section class="tiles">';
    h += tile('🔥', streak() + ' 天', '連續練習');
    h += tile('✅', day.answered + ' 題', '今日作答');
    h += tile('🎯', (day.correct + day.wrong ? pct(day.correct, day.correct + day.wrong) + '%' : '–'), '今日正確率');
    h += tile('📖', learned + ' / ' + WORDS.length, '已學單字');
    h += '</section>';

    h += '<section class="card"><h2>自由練習</h2><p class="hint">自選分類與題型，不影響複習排程。</p>';
    h += '<div class="form-grid">';
    h += '<label>分類<select id="free-cat"><option value="all">全部分類</option>' +
      CATS.map(function (c) { return '<option value="' + c.id + '">' + c.icon + ' ' + c.name + '</option>'; }).join('') + '</select></label>';
    h += '<label>題型<select id="free-mode"><option value="mixed">綜合</option>' +
      PRACTICE_MODES.map(function (m) { return '<option value="' + m + '">' + MODE_LABEL[m] + '</option>'; }).join('') + '</select></label>';
    h += '<label>題數<select id="free-count"><option>10</option><option>20</option><option>30</option></select></label>';
    h += '<label>範圍<select id="free-scope"><option value="learned">已學過的字</option><option value="all">所有單字</option></select></label>';
    h += '</div><button class="btn block" data-action="start-free">開始練習</button></section>';
    return h;
  }

  // ---------- 句型 ----------
  function phraseTodayCard(compact) {
    var due = duePhrases().length;
    var pending = pendingNewPhrases().length;
    var remainNew = Math.min(Math.max(newPhraseQuota(), pending), unseenPhrases().length + pending);
    var h = '<section class="card today phrase-today">';
    if (compact) h += '<h2>💬 出國實用句型</h2>';
    h += '<div class="today-row"><div class="big-num">' + due + '</div><div>句要複習</div></div>';
    h += '<div class="today-row"><div class="big-num">' + remainNew + '</div><div>句新句型</div></div>';
    if (due + remainNew > 0) {
      h += '<button class="btn primary block" data-action="start-phrases">開始句型練習</button>';
    } else {
      h += '<p class="done-msg">🎉 今天的句型完成了！</p>';
      if (unseenPhrases().length) h += '<button class="btn block" data-action="extra-phrases">再學 3 句</button>';
    }
    return h + '</section>';
  }

  function viewPhrases() {
    var h = '<header class="hero"><h1>出國實用句型</h1><p class="sub">打工度假篇 · 從入境到交朋友</p></header>';
    h += phraseTodayCard(false);
    h += '<h2 class="section-title">情境</h2><div class="scene-list">';
    SCENES.forEach(function (s) {
      var learned = s.phrases.filter(function (p) { return isLearned('p:' + p[0].replace(/[\[\]]/g, '')); }).length;
      h += '<button class="scene-card" data-scene="' + s.id + '">' +
        '<span class="scene-icon">' + s.icon + '</span>' +
        '<span class="scene-main"><span class="scene-name">' + s.name + '</span>' +
        '<span class="progress"><span style="width:' + pct(learned, s.phrases.length) + '%"></span></span></span>' +
        '<span class="scene-num">' + learned + '/' + s.phrases.length + '</span></button>';
    });
    return h + '</div>';
  }

  function viewScene() {
    var s = SCENES.filter(function (x) { return x.id === currentScene; })[0];
    var list = PHRASES.filter(function (p) { return p.scene === s.id; });
    var h = '<header class="page-head"><button class="btn link back" data-action="scene-back">‹ 所有情境</button>' +
      '<h1>' + s.icon + ' ' + s.name + '</h1></header>';
    h += '<button class="btn primary block" data-action="scene-practice">練習這個情境（' + Math.min(10, list.length) + ' 題）</button>';
    h += '<p class="hint">點句子可以看對方可能怎麼說、替換用法和小提醒。練習這個情境不影響複習排程。</p>';
    return h + '<ul class="word-list">' + list.map(phraseRow).join('') + '</ul>';
  }

  function phraseHtml(p) {
    return esc(p.en).replace(/\[(.+?)\]/, '<mark>$1</mark>');
  }

  function phraseRow(p) {
    var st = STATUS[statusOf(p.id)];
    return '<li class="word-item"><details><summary>' +
      '<div class="wi-main"><span class="wi-phrase">' + phraseHtml(p) + '</span>' +
      '<div class="wi-zh">' + esc(p.zh) + '</div></div>' +
      '<span class="badge ' + st.cls + '">' + st.label + '</span>' + speakBtn(p.plain) +
      '</summary>' + phraseDetail(p) + '</details></li>';
  }

  function phraseDetail(p) {
    var h = '<div class="detail">';
    if (p.q) {
      h += '<p class="they-label">對方可能會說</p><p class="ex">' + esc(p.q.en) + ' ' + speakBtn(p.q.en) + '</p>' +
        '<p class="ex-zh">' + esc(p.q.zh) + '</p>';
    }
    if (p.swaps.length) {
      h += '<p class="they-label">也可以替換成</p>' + p.swaps.map(function (sw) {
        var line = p.en.replace(/\[(.+?)\]/, '[' + sw + ']');
        return '<p class="ex">' + esc(line).replace(/\[(.+?)\]/, '<mark>$1</mark>') + ' ' + speakBtn(exPlain(line)) + '</p>';
      }).join('');
    }
    if (p.note) h += '<p class="note">💡 ' + esc(p.note) + '</p>';
    if (!p.q && !p.swaps.length && !p.note) h += '<p class="ex-zh">這句可以直接整句記下來使用。</p>';
    return h + '</div>';
  }

  function phraseCard(p) {
    return '<div class="word-card">' +
      '<div class="wc-top"><h2 class="wc-phrase">' + phraseHtml(p) + '</h2>' + speakBtn(p.plain, true) + '</div>' +
      '<p class="wc-zh">' + esc(p.zh) + '</p>' + phraseDetail(p) + '</div>';
  }

  function tile(icon, value, label) {
    return '<div class="tile"><div class="tile-icon">' + icon + '</div><div class="tile-value">' + value +
      '</div><div class="tile-label">' + label + '</div></div>';
  }

  function viewLibrary() {
    var h = '<header class="page-head"><h1>單字庫</h1></header>';
    h += '<input id="lib-search" class="search" type="search" placeholder="搜尋英文或中文…" value="' + esc(libFilter.q) + '">';
    h += '<div class="chips">' + chip('all', '全部') + CATS.map(function (c) { return chip(c.id, c.icon + ' ' + c.name); }).join('') + '</div>';
    h += '<div id="lib-list">' + libraryList() + '</div>';
    return h;
  }

  function chip(id, label) {
    return '<button class="chip' + (libFilter.cat === id ? ' active' : '') + '" data-cat="' + id + '">' + label + '</button>';
  }

  function libraryList() {
    var q = normalize(libFilter.q);
    var list = WORDS.filter(function (w) {
      if (libFilter.cat !== 'all' && w.cat !== libFilter.cat) return false;
      if (!q) return true;
      return w.word.toLowerCase().indexOf(q) >= 0 || w.zh.indexOf(libFilter.q.trim()) >= 0;
    });
    if (!list.length) return '<p class="empty">找不到符合的單字</p>';
    return '<p class="hint">共 ' + list.length + ' 個字</p><ul class="word-list">' + list.map(wordRow).join('') + '</ul>';
  }

  function wordRow(w) {
    var st = STATUS[statusOf(w.id)];
    return '<li class="word-item"><details><summary>' +
      '<div class="wi-main"><span class="wi-word">' + esc(w.word) + '</span> <span class="kk">[' + esc(w.kk) + ']</span>' +
      '<div class="wi-zh"><span class="pos">' + esc(w.pos) + '</span> ' + esc(w.zh) + '</div></div>' +
      '<span class="badge ' + st.cls + '">' + st.label + '</span>' + speakBtn(w.word) +
      '</summary>' + wordDetail(w) + '</details></li>';
  }

  // firstEx：剛考過的例句排在最前面
  function wordDetail(w, firstEx) {
    var stars = '★★★'.slice(0, w.lvl) + '☆☆☆'.slice(0, 3 - w.lvl);
    var exs = w.examples.slice();
    if (firstEx > 0) exs.unshift(exs.splice(firstEx, 1)[0]);
    return '<div class="detail">' + exs.map(function (e) {
      return '<p class="ex">' + exHtml(e.en) + ' ' + speakBtn(exPlain(e.en)) + '</p>' +
        '<p class="ex-zh">' + esc(e.zh) + '</p>';
    }).join('') +
      '<p class="col">常用搭配：<b>' + esc(w.col) + '</b></p>' +
      '<p class="lvl">難度 <span class="stars">' + stars + '</span></p></div>';
  }

  function bindLibrarySearch() {
    var input = document.getElementById('lib-search');
    input.addEventListener('input', function () {
      libFilter.q = input.value;
      document.getElementById('lib-list').innerHTML = libraryList();
    });
  }

  function viewMistakes() {
    var ids = mistakeWords();
    var h = '<header class="page-head"><h1>生字本</h1></header>';
    h += '<p class="hint">答錯或標記「模糊」的字會自動加入，在生字本練習中連續答對 ' + MISTAKE_CLEAR_STREAK + ' 次就會移出。</p>';
    if (!ids.length) return h + '<p class="empty">目前沒有生字，繼續保持！</p>';
    h += '<button class="btn primary block" data-action="start-mistakes">練習生字本（' + Math.min(15, ids.length) + ' 題）</button>';
    h += '<ul class="word-list">' + ids.map(function (id) {
      var w = WORD_BY_ID[id];
      var r = state.words[id];
      return '<li class="word-item"><details><summary>' +
        '<div class="wi-main"><span class="wi-word">' + esc(w.word) + '</span> <span class="kk">[' + esc(w.kk) + ']</span>' +
        '<div class="wi-zh"><span class="pos">' + esc(w.pos) + '</span> ' + esc(w.zh) + '</div></div>' +
        '<span class="badge st-wrong">錯 ' + r.wrong + '</span>' + speakBtn(w.word) +
        '</summary>' + wordDetail(w) +
        '<button class="btn small" data-remove-mistake="' + esc(id) + '">移出生字本</button></details></li>';
    }).join('') + '</ul>';
    return h;
  }

  function viewStats() {
    var counts = { new: 0, learning: 0, familiar: 0, mastered: 0 };
    WORDS.forEach(function (w) { counts[statusOf(w.id)]++; });
    var totalC = 0, totalW = 0;
    Object.keys(state.words).forEach(function (id) { totalC += state.words[id].correct; totalW += state.words[id].wrong; });

    var h = '<header class="page-head"><h1>練習紀錄</h1></header>';
    h += '<section class="tiles">';
    h += tile('🔥', streak() + ' 天', '連續練習');
    h += tile('🎯', totalC + totalW ? pct(totalC, totalC + totalW) + '%' : '–', '總正確率');
    h += tile('🧠', counts.familiar + counts.mastered, '熟悉以上');
    h += tile('🏆', counts.mastered, '精熟');
    h += '</section>';

    // 學習狀態分布
    h += '<section class="card"><h2>單字掌握度</h2><div class="stack-bar">';
    ['mastered', 'familiar', 'learning', 'new'].forEach(function (k) {
      if (counts[k]) h += '<div class="seg ' + STATUS[k].cls + '" style="flex:' + counts[k] + '"></div>';
    });
    h += '</div><div class="legend">';
    ['mastered', 'familiar', 'learning', 'new'].forEach(function (k) {
      h += '<span><i class="dot ' + STATUS[k].cls + '"></i>' + STATUS[k].label + ' ' + counts[k] + '</span>';
    });
    h += '</div></section>';

    var pc = { new: 0, learning: 0, familiar: 0, mastered: 0 };
    PHRASES.forEach(function (p) { pc[statusOf(p.id)]++; });
    h += '<section class="card"><h2>句型掌握度</h2><div class="stack-bar">';
    ['mastered', 'familiar', 'learning', 'new'].forEach(function (k) {
      if (pc[k]) h += '<div class="seg ' + STATUS[k].cls + '" style="flex:' + pc[k] + '"></div>';
    });
    h += '</div><div class="legend">';
    ['mastered', 'familiar', 'learning', 'new'].forEach(function (k) {
      h += '<span><i class="dot ' + STATUS[k].cls + '"></i>' + STATUS[k].label + ' ' + pc[k] + '</span>';
    });
    h += '</div></section>';

    // 近 14 天
    var days = [];
    for (var i = 13; i >= 0; i--) days.push(addDays(today(), -i));
    var max = Math.max.apply(null, days.map(function (d) { return state.daily[d] ? state.daily[d].answered : 0; }).concat([1]));
    h += '<section class="card"><h2>近 14 天作答量</h2><div class="bars">';
    days.forEach(function (d) {
      var n = state.daily[d] ? state.daily[d].answered : 0;
      h += '<div class="bar-col" title="' + d + '：' + n + ' 題"><div class="bar-val">' + (n || '') + '</div>' +
        '<div class="bar" style="height:' + Math.round((n / max) * 100) + '%"></div>' +
        '<div class="bar-label">' + (+d.slice(8)) + '</div></div>';
    });
    h += '</div></section>';

    // 各分類
    h += '<section class="card"><h2>各分類表現</h2><p class="hint">正確率低的分類就是需要加強的情境。</p><ul class="cat-stats">';
    CATS.forEach(function (c) {
      var learned = 0, cc = 0, cw = 0;
      c.words.forEach(function (w) {
        var r = state.words[w[0]];
        if (r) { cc += r.correct; cw += r.wrong; }
        if (isLearned(w[0])) learned++;
      });
      var acc = cc + cw ? pct(cc, cc + cw) + '%' : '–';
      h += '<li><div class="cs-head"><span>' + c.icon + ' ' + c.name + '</span><span class="cs-num">' +
        learned + '/' + c.words.length + ' · 正確率 ' + acc + '</span></div>' +
        '<div class="progress"><div style="width:' + pct(learned, c.words.length) + '%"></div></div></li>';
    });
    h += '</ul></section>';
    return h;
  }

  function viewSettings() {
    var s = state.settings;
    var h = '<header class="page-head"><h1>設定</h1></header>';
    h += '<section class="card"><h2>學習</h2>';
    h += '<label class="row">每日新字數量<select id="set-daily">' + [5, 10, 15, 20, 25, 30, 40, 50].map(function (n) {
      return '<option' + (n === s.dailyNew ? ' selected' : '') + '>' + n + '</option>';
    }).join('') + '</select></label>';
    h += '<label class="row">每日新句型數量<select id="set-daily-phrases">' + [3, 5, 8, 10].map(function (n) {
      return '<option' + (n === s.dailyNewPhrases ? ' selected' : '') + '>' + n + '</option>';
    }).join('') + '</select></label></section>';

    h += '<section class="card"><h2>發音</h2>';
    h += '<label class="row">口音<select id="set-accent">' + [['en-US', '美式'], ['en-AU', '澳式'], ['en-GB', '英式']].map(function (a) {
      return '<option value="' + a[0] + '"' + (a[0] === s.accent ? ' selected' : '') + '>' + a[1] + '</option>';
    }).join('') + '</select></label>';
    h += '<label class="row">語速<select id="set-rate">' + [[0.7, '慢'], [0.9, '標準'], [1, '正常']].map(function (a) {
      return '<option value="' + a[0] + '"' + (a[0] === s.rate ? ' selected' : '') + '>' + a[1] + '</option>';
    }).join('') + '</select></label>';
    h += '<label class="row">答題後自動發音<input type="checkbox" id="set-auto"' + (s.autoSpeak ? ' checked' : '') + '></label>';
    h += '<button class="btn small" data-speak="Welcome to Australia. Nice to meet you.">試聽</button>';
    if (!('speechSynthesis' in window)) h += '<p class="warn">這個瀏覽器不支援語音發音。</p>';
    h += '<p class="hint">若沒有澳式語音，會自動改用裝置上的其他英文語音。</p></section>';

    var errCount = readErrors().length;
    h += '<section class="card"><h2>問題回報</h2>' +
      '<p class="hint">題目有問題時，作答後按「🚩 回報這題」。App 出錯時，按「回報錯誤紀錄」。表單會自動填好相關資訊，不需要登入。</p>' +
      '<p class="row">錯誤紀錄<span class="err-count">' + errCount + ' 筆</span></p>' +
      '<div class="btn-row"><button class="btn" data-action="copy-errors">回報錯誤紀錄</button>' +
      (errCount ? '<button class="btn" data-action="clear-errors">清除</button>' : '') + '</div>' +
      '<button class="btn primary block" data-action="report-general">回報問題或建議</button>' +
      '<p class="hint">有 GitHub 帳號的話，也可以<a href="' + ISSUE_URL + '" target="_blank" rel="noopener">到 GitHub 回報</a>。</p></section>';

    h += '<section class="card"><h2>資料</h2><p class="hint">練習紀錄只存在這台裝置的瀏覽器，建議定期匯出備份。</p>';
    h += '<div class="btn-row"><button class="btn" data-action="export">匯出紀錄</button>';
    h += '<label class="btn">匯入紀錄<input type="file" id="import-file" accept="application/json,.json" hidden></label></div>';
    h += '<button class="btn danger block" data-action="reset">清除所有紀錄</button></section>';
    h += '<p class="footer">多益練習 App v' + APP_VERSION + ' · 單字 ' + WORDS.length + ' 個 · 句型 ' + PHRASES.length + ' 句</p>';
    return h;
  }

  // ---------- 練習畫面 ----------
  function renderSession() {
    var item = currentItem();
    var w = getItem(item.id);
    var phrase = isPhrase(item.id);
    var progress = pct(session.idx, session.items.length);
    var h = '<div class="session"><header class="session-head">' +
      '<button class="icon-btn" data-action="exit" aria-label="離開">✕</button>' +
      '<div class="progress thin"><div style="width:' + progress + '%"></div></div>' +
      '<span class="count">' + (session.idx + 1) + '/' + session.items.length + '</span></header>';
    h += '<main class="session-body">';

    if (item.type === 'intro') {
      h += '<p class="tag new-tag">' + (phrase ? '新句型' : '新單字') + '</p>' + (phrase ? phraseCard(w) : wordCard(w)) +
        '<button class="btn primary block" data-action="next">記住了，下一個</button>';
    } else {
      if (!session.q) session.q = makeQuestion(item.id, item.mode);
      h += phrase ? phraseQuizHtml(w, item, session.q) : quizHtml(w, item, session.q);
    }
    h += '</main></div>';
    $app.innerHTML = h;

    if (item.type === 'intro') introduce(item.id);
    // 每題只在第一次顯示時自動發音
    if (session.spokenIdx !== session.idx) {
      session.spokenIdx = session.idx;
      if (item.type === 'intro' && state.settings.autoSpeak) speak(speechText(item.id));
      if (item.mode === 'spell' || item.mode === 'listen' || item.mode === 'p_listen') speak(speechText(item.id));
      if (item.mode === 'p_reply' && !session.revealed) speak(w.q.en);
    }

    var input = document.getElementById('spell-input');
    if (input && !session.revealed) input.focus();
    var next = document.querySelector('[data-action="next"]');
    if (next && session.revealed) next.focus();
  }

  function wordCard(w, firstEx) {
    return '<div class="word-card">' +
      '<div class="wc-top"><h2 class="wc-word">' + esc(w.word) + '</h2>' + speakBtn(w.word, true) + '</div>' +
      '<p class="kk">[' + esc(w.kk) + ']</p>' +
      '<p class="wc-zh"><span class="pos">' + esc(w.pos) + '</span> ' + esc(w.zh) + '</p>' +
      wordDetail(w, firstEx) + '</div>';
  }

  function quizHtml(w, item, q) {
    var h = '<p class="tag">' + MODE_LABEL[item.mode] + (item.retry ? ' · 再試一次' : '') + '</p>';
    var revealed = session.revealed;

    if (item.mode === 'card') {
      h += '<div class="prompt"><h2 class="prompt-word">' + esc(w.word) + '</h2>' + speakBtn(w.word, true) +
        '<p class="kk">[' + esc(w.kk) + ']</p></div>';
      if (!revealed && !session.cardShown) {
        h += '<p class="hint center">先在心裡想想中文意思</p><button class="btn primary block" data-action="show-card">顯示答案</button>';
      } else if (!revealed) {
        h += '<div class="word-card compact"><p class="wc-zh"><span class="pos">' + esc(w.pos) + '</span> ' + esc(w.zh) + '</p>' + wordDetail(w) + '</div>';
        h += '<p class="hint center">你記得嗎？</p><div class="rate-row">' +
          '<button class="btn rate-wrong" data-rate="wrong">不會</button>' +
          '<button class="btn rate-fuzzy" data-rate="fuzzy">模糊</button>' +
          '<button class="btn rate-correct" data-rate="correct">會</button></div>';
      } else {
        h += feedback(w);
      }
      return h;
    }

    if (item.mode === 'listen') {
      h += '<div class="prompt">' + (revealed
        ? '<h2 class="prompt-word">' + esc(w.word) + '</h2>' + speakBtn(w.word, true) + '<p class="kk">[' + esc(w.kk) + ']</p>'
        : '<button class="listen-btn" data-speak="' + esc(w.word) + '" aria-label="再聽一次">🔊</button><p class="hint">點喇叭可以再聽一次</p>') +
        '</div><p class="hint center">聽發音，選出正確的中文意思</p>';
    } else if (item.mode === 'en2zh') {
      h += '<div class="prompt"><h2 class="prompt-word">' + esc(w.word) + '</h2>' + speakBtn(w.word, true) +
        '<p class="kk">[' + esc(w.kk) + ']</p></div><p class="hint center">選出正確的中文意思</p>';
    } else if (item.mode === 'zh2en') {
      h += '<div class="prompt"><h2 class="prompt-zh"><span class="pos">' + esc(w.pos) + '</span> ' + esc(w.zh) + '</h2></div>' +
        '<p class="hint center">選出正確的英文單字</p>';
    } else if (item.mode === 'fill') {
      var ex = w.examples[q.exIdx].en;
      h += '<div class="prompt"><p class="prompt-sentence">' + (revealed ? exHtml(ex) : exBlank(ex)) + '</p></div>' +
        '<p class="hint center">選出文法和意思都正確的字</p>';
    } else if (item.mode === 'spell') {
      var hint = w.word.split('').map(function (c, i) {
        if (i === 0 || c === ' ' || c === '-') return c === ' ' ? '&nbsp;&nbsp;' : esc(c);
        return '_';
      }).join(' ');
      h += '<div class="prompt"><h2 class="prompt-zh"><span class="pos">' + esc(w.pos) + '</span> ' + esc(w.zh) + '</h2>' +
        speakBtn(w.word, true) + '<p class="spell-hint">' + hint + '</p></div>';
      if (!revealed) {
        // inputmode="email" 讓手機優先顯示英文鍵盤（iPhone 不會跳出注音），而且仍有空白鍵
        h += '<form class="spell-form" data-form="spell"><input id="spell-input" lang="en" inputmode="email" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="輸入英文拼字">' +
          '<button class="btn primary" type="submit">確定</button></form>' +
          '<p class="spell-warn" role="alert" hidden>看起來輸入了注音或中文，請切換成英文鍵盤再輸入一次（這次不算答錯）</p>' +
          '<button class="btn link" data-action="give-up">不知道，看答案</button>';
      } else {
        h += '<p class="your-answer">你的答案：<b>' + esc(session.spellInput || '（未作答）') + '</b></p>' + feedback(w);
      }
      return h;
    }

    h += optionsHtml(q);
    if (revealed) h += feedback(w);
    return h;
  }

  function optionsHtml(q) {
    var revealed = session.revealed;
    return '<div class="options">' + q.options.map(function (opt) {
      var cls = 'option';
      if (revealed) {
        if (opt === q.answer) cls += ' right';
        else if (opt === session.picked) cls += ' wrong';
        else cls += ' dim';
      }
      return '<button class="' + cls + '" data-option="' + esc(opt) + '"' + (revealed ? ' disabled' : '') + '>' + esc(opt) + '</button>';
    }).join('') + '</div>';
  }

  function phraseQuizHtml(p, item, q) {
    var h = '<p class="tag">' + MODE_LABEL[item.mode] + (item.retry ? ' · 再試一次' : '') + '</p>';
    var revealed = session.revealed;

    if (item.mode === 'p_listen') {
      h += '<div class="prompt">' + (revealed
        ? '<p class="prompt-sentence center">' + esc(p.plain) + ' ' + speakBtn(p.plain) + '</p>'
        : '<button class="listen-btn" data-speak="' + esc(p.plain) + '" aria-label="再聽一次">🔊</button><p class="hint">點喇叭可以再聽一次</p>') +
        '</div><p class="hint center">聽句子，選出正確的中文意思</p>';
    } else if (item.mode === 'p_zh2en') {
      h += '<div class="prompt"><h2 class="prompt-zh">' + esc(p.zh) + '</h2></div><p class="hint center">選出正確的英文說法</p>';
    } else if (item.mode === 'p_reply') {
      h += '<div class="prompt they"><p class="they-label">對方說</p>' +
        '<p class="they-say">' + esc(p.q.en) + ' ' + speakBtn(p.q.en) + '</p>' +
        (revealed ? '<p class="ex-zh">' + esc(p.q.zh) + '</p>' : '') +
        '</div><p class="hint center">你該怎麼回答？</p>';
    } else if (item.mode === 'p_order') {
      h += '<div class="prompt"><h2 class="prompt-zh">' + esc(p.zh) + '</h2></div>';
      if (!revealed) {
        var built = q.picked.map(function (pos, i) {
          return '<button class="token picked" data-unpick="' + i + '">' + esc(q.tokens[q.order[pos]]) + '</button>';
        }).join('');
        var pool = q.order.map(function (ti, pos) {
          var used = q.picked.indexOf(pos) >= 0;
          return '<button class="token' + (used ? ' used' : '') + '" data-pick="' + pos + '"' + (used ? ' disabled' : '') + '>' + esc(q.tokens[ti]) + '</button>';
        }).join('');
        var done = q.picked.length === q.order.length;
        h += '<p class="hint center">依序點選單字，排出正確的句子</p>' +
          '<div class="order-built">' + (built || '<span class="order-empty">點下面的單字放到這裡</span>') + '</div>' +
          '<div class="order-pool">' + pool + '</div>' +
          '<div class="btn-row"><button class="btn" data-action="order-reset">重來</button>' +
          '<button class="btn primary" data-action="order-check"' + (done ? '' : ' disabled') + '>確定</button></div>';
      } else {
        h += '<p class="your-answer">你的答案：<b>' + esc(session.orderInput) + '</b></p>' + feedback(p);
      }
      return h;
    }
    h += optionsHtml(q);
    if (revealed) h += feedback(p);
    return h;
  }

  function feedback(w) {
    var r = session.lastResult;
    var head = r === 'correct' ? '<div class="fb-head ok">✓ 答對了！</div>'
      : r === 'fuzzy' ? '<div class="fb-head fuzzy">△ 明天再複習</div>'
        : '<div class="fb-head ng">✗ 答錯了，稍後會再考一次</div>';
    if (session.kind === 'free' && r === 'wrong') {
      head = '<div class="fb-head ng">✗ 答錯了' + (w.type === 'phrase' ? '，再看一次這句' : '，已加入生字本') + '</div>';
    }
    var card = w.type === 'phrase' ? phraseCard(w) : wordCard(w, session.q ? session.q.exIdx : 0);
    return '<div class="feedback">' + head + card + '</div>' +
      '<button class="btn primary block" data-action="next">下一題</button>' +
      '<button class="btn link report" data-action="report">🚩 這題怪怪的？回報這題</button>';
  }

  // ---------- 問題回報 ----------
  function deviceInfo() {
    return 'App 版本：v' + APP_VERSION + '\n裝置：' + navigator.userAgent +
      '\n發音：' + (canSpeak ? state.settings.accent + '，可用語音 ' + voices.length + ' 個' : '不支援');
  }

  function reportText() {
    var item = currentItem();
    var q = session.q;
    var it = getItem(item.id);
    var lines = ['【題目回報】', '題型：' + MODE_LABEL[item.mode] + '（' + item.mode + '）', '項目：' + item.id];
    if (item.mode === 'fill') lines.push('例句：' + it.examples[q.exIdx].en);
    if (item.mode === 'p_reply') lines.push('對方說：' + it.q.en);
    if (q && q.options) lines.push('選項：' + q.options.join(' / '));
    if (session.picked) lines.push('我選的：' + session.picked);
    if (item.mode === 'spell') lines.push('我的拼字：' + (session.spellInput || '（未作答）'));
    if (item.mode === 'p_order') lines.push('我的排列：' + session.orderInput);
    lines.push('正確答案：' + ((q && q.answer) || speechText(item.id)));
    return lines.join('\n');
  }

  function readErrors() {
    try { return JSON.parse(localStorage.getItem(ERROR_KEY) || '[]'); } catch (e) { return []; }
  }

  // 只帶最近 5 筆，最新的在前面，避免網址太長
  function errorReportText() {
    var errs = readErrors().slice(-5).reverse();
    return ['【錯誤紀錄】', errs.length ? errs.map(function (e) {
      return e.time + '  ' + e.msg + (e.src ? '  @ ' + e.src : '') + (e.stack ? '\n' + e.stack : '');
    }).join('\n\n') : '（沒有錯誤紀錄）'].join('\n');
  }

  function clampForUrl(text) {
    if (encodeURIComponent(text).length <= REPORT_INFO_MAX) return text;
    var cut = text;
    while (cut && encodeURIComponent(cut + '…（已截斷）').length > REPORT_INFO_MAX) cut = cut.slice(0, -50);
    return cut + '…（已截斷）';
  }

  function reportUrl(type, info) {
    var params = [];
    if (type) params.push(REPORT_FIELDS.type + '=' + encodeURIComponent(type));
    if (info) params.push(REPORT_FIELDS.info + '=' + encodeURIComponent(clampForUrl(info)));
    params.push(REPORT_FIELDS.device + '=' + encodeURIComponent(deviceInfo()));
    return REPORT_FORM_URL + '?usp=pp_url&' + params.join('&');
  }

  // 優先用剪貼簿 API，不支援時改用舊方法；done(true/false) 回報是否成功
  function copyToClipboard(text, done) {
    var fallback = function () {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { /* 不支援 */ }
      ta.remove();
      done(ok);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, fallback);
    } else {
      fallback();
    }
  }

  // 回報視窗：表單連結已經帶入題目資訊，使用者只要寫哪裡有問題
  // （用真的連結而不是 window.open，iPhone 才不會把它當成彈出視窗擋掉）
  // type：表單「回報類型」的選項文字，沒有對應的選項就傳 null 讓使用者自己選
  function openReport(type, info, what) {
    closeSheet();
    var raw = (info ? info + '\n\n' : '') + deviceInfo();
    var el = document.createElement('div');
    el.className = 'sheet-backdrop';
    el.setAttribute('data-close-sheet', '');
    el.innerHTML = '<div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">' +
      '<h2 id="sheet-title">回報問題</h2>' +
      '<p class="sheet-status">✅ ' + esc(what) + '已經自動填進表單</p>' +
      '<ol class="sheet-steps"><li>按下面的按鈕打開回報表單（不用登入）</li>' +
      '<li>' + (type ? '' : '選擇回報類型，') + '在「哪裡有問題？」寫下你遇到的狀況</li>' +
      '<li>按「提交」送出</li></ol>' +
      '<a class="btn primary block" href="' + esc(reportUrl(type, info)) + '" target="_blank" rel="noopener" data-close-sheet>打開回報表單</a>' +
      '<details class="sheet-raw"><summary>表單裡沒有出現這些資訊？點這裡手動複製</summary>' +
      '<textarea readonly rows="8"></textarea><button class="btn small" data-copy-raw>複製</button></details>' +
      '<button class="btn link" data-close-sheet>關閉</button></div>';
    el.querySelector('textarea').value = raw;
    document.body.appendChild(el);
  }

  function closeSheet() {
    var el = document.querySelector('.sheet-backdrop');
    if (el) el.remove();
  }

  function renderSummary() {
    var s = session;
    var total = s.correct + s.wrong;
    var h = '<div class="session"><main class="session-body summary">';
    h += '<div class="summary-emoji">' + (total && s.wrong === 0 ? '🏆' : '🎉') + '</div>';
    h += '<h1>' + esc(s.title) + '完成！</h1>';
    if (total) {
      h += '<section class="tiles">' + tile('✅', s.correct, '答對') + tile('❌', s.wrong, '答錯') +
        tile('🎯', pct(s.correct, total) + '%', '正確率') + tile('🔥', streak() + ' 天', '連續練習') + '</section>';
    }
    if (s.wrongIds.length) {
      h += '<section class="card"><h2>需要加強的項目</h2><ul class="word-list">' +
        s.wrongIds.map(function (id) { return isPhrase(id) ? phraseRow(PHRASE_BY_ID[id]) : wordRow(WORD_BY_ID[id]); }).join('') + '</ul></section>';
    }
    h += '<button class="btn primary block" data-action="exit">回到首頁</button></main></div>';
    $app.innerHTML = h;
  }

  // ---------- 事件 ----------
  document.addEventListener('click', function (e) {
    var closer = e.target.closest('[data-close-sheet]');
    if (closer && (closer.tagName !== 'DIV' || e.target === closer)) {
      // 點連結時不要擋住預設行為，表單才能正常打開
      setTimeout(closeSheet);
      if (closer.tagName !== 'A') return;
    }
    var copyRaw = e.target.closest('[data-copy-raw]');
    if (copyRaw) {
      copyToClipboard(document.querySelector('.sheet-raw textarea').value, function (ok) {
        copyRaw.textContent = ok ? '已複製 ✓' : '請長按上方文字手動複製';
      });
      return;
    }
    if (document.querySelector('.sheet-backdrop')) return;
    var t = e.target.closest('button, [data-tab]');
    if (!t) return;

    if (t.dataset.speak) {
      e.preventDefault();
      e.stopPropagation();
      speak(t.dataset.speak);
      return;
    }
    if (t.dataset.tab) {
      currentTab = t.dataset.tab;
      currentScene = null;
      render();
      window.scrollTo(0, 0);
      return;
    }
    if (t.dataset.scene) {
      currentScene = t.dataset.scene;
      render();
      window.scrollTo(0, 0);
      return;
    }
    if (t.dataset.pick != null && session && !session.revealed) {
      session.q.picked.push(+t.dataset.pick);
      renderSession();
      return;
    }
    if (t.dataset.unpick != null && session && !session.revealed) {
      session.q.picked.splice(+t.dataset.unpick, 1);
      renderSession();
      return;
    }
    if (t.dataset.cat) {
      libFilter.cat = t.dataset.cat;
      render();
      return;
    }
    if (t.dataset.removeMistake) {
      var r = state.words[t.dataset.removeMistake];
      if (r) { r.mistake = false; save(); }
      render();
      return;
    }
    if (t.dataset.option != null && session && !session.revealed) {
      session.picked = t.dataset.option;
      answer(t.dataset.option === session.q.answer ? 'correct' : 'wrong');
      return;
    }
    if (t.dataset.rate && session) {
      answer(t.dataset.rate);
      return;
    }

    switch (t.dataset.action) {
      case 'start-daily': startDaily(); break;
      case 'extra': startDaily(5); break;
      case 'start-phrases': startPhraseDaily(); break;
      case 'extra-phrases': startPhraseDaily(3); break;
      case 'scene-practice': startScenePractice(currentScene); break;
      case 'scene-back': currentScene = null; render(); window.scrollTo(0, 0); break;
      case 'order-reset': session.q.picked = []; renderSession(); break;
      case 'order-check': {
        var oq = session.q;
        session.orderInput = oq.picked.map(function (pos) { return oq.tokens[oq.order[pos]]; }).join(' ');
        answer(session.orderInput === oq.answer ? 'correct' : 'wrong');
        break;
      }
      case 'start-mistakes': startMistakes(); break;
      case 'start-free': {
        var cat = document.getElementById('free-cat').value;
        var mode = document.getElementById('free-mode').value;
        var count = +document.getElementById('free-count').value;
        var onlyLearned = document.getElementById('free-scope').value === 'learned';
        var hasLearned = WORDS.some(function (w) { return isLearned(w.id) && (cat === 'all' || w.cat === cat); });
        if (onlyLearned && !hasLearned) {
          alert('這個分類還沒有學過的字，請改選「所有單字」或先完成今日學習。');
          return;
        }
        startFree(cat, mode, count, onlyLearned);
        break;
      }
      case 'next': nextItem(); break;
      case 'exit': exitSession(); break;
      case 'show-card': session.cardShown = true; renderSession(); session.cardShown = false; break;
      case 'give-up': session.spellInput = ''; answer('wrong'); break;
      case 'export': exportData(); break;
      case 'report': openReport('題目有問題', reportText(), '題目資訊'); break;
      case 'copy-errors': openReport('App 出錯', errorReportText(), '錯誤紀錄'); break;
      case 'report-general': openReport(null, '', 'App 版本與裝置資訊'); break;
      case 'clear-errors':
        try { localStorage.removeItem(ERROR_KEY); } catch (err) { /* 儲存空間不可用 */ }
        render();
        break;
      case 'reset':
        if (confirm('確定要清除所有練習紀錄嗎？這個動作無法復原。')) {
          state = defaultState();
          save();
          render();
        }
        break;
    }
  });

  document.addEventListener('submit', function (e) {
    if (e.target.dataset.form !== 'spell') return;
    e.preventDefault();
    var input = document.getElementById('spell-input');
    var val = input.value;
    if (!val.trim()) return;
    if (looksNonEnglish(val)) {
      document.querySelector('.spell-warn').hidden = false;
      input.select();
      return;
    }
    var w = WORD_BY_ID[currentItem().id];
    session.spellInput = val.trim();
    answer(normalize(val) === normalize(w.word) ? 'correct' : 'wrong');
  });

  document.addEventListener('change', function (e) {
    var id = e.target.id;
    var s = state.settings;
    if (id === 'set-daily') s.dailyNew = +e.target.value;
    else if (id === 'set-daily-phrases') s.dailyNewPhrases = +e.target.value;
    else if (id === 'set-accent') s.accent = e.target.value;
    else if (id === 'set-rate') s.rate = +e.target.value;
    else if (id === 'set-auto') s.autoSpeak = e.target.checked;
    else if (id === 'import-file') { importData(e.target.files[0]); return; }
    else return;
    save();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeSheet(); return; }
    if (document.querySelector('.sheet-backdrop')) return;
    if (!session || e.key !== 'Enter') return;
    if (document.activeElement && document.activeElement.id === 'spell-input') return;
    var next = document.querySelector('[data-action="next"]');
    if (next) { e.preventDefault(); next.click(); }
  });

  function exportData() {
    var blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'toeic-practice-' + today() + '.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }

  function importData(file) {
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var data = JSON.parse(reader.result);
        if (!data || typeof data.words !== 'object' || typeof data.daily !== 'object') throw new Error('bad');
        if (!confirm('匯入會覆蓋目前的紀錄，確定嗎？')) return;
        var d = defaultState();
        state = { settings: Object.assign(d.settings, data.settings || {}), words: data.words, daily: data.daily };
        save();
        alert('匯入成功！');
        render();
      } catch (err) {
        alert('檔案格式不正確，無法匯入。');
      }
    };
    reader.readAsText(file);
  }

  // ---------- 啟動 ----------
  render();

  if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
    window.addEventListener('load', function () {
      // updateViaCache: 'none' 讓瀏覽器檢查 sw.js 更新時不使用 HTTP 快取
      navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).catch(function () { /* 離線功能不可用 */ });
    });
  }
})();
