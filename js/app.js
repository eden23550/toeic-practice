(function () {
  'use strict';

  var WORDS = window.TOEIC_WORDS;
  var CATS = window.TOEIC_CATEGORIES;
  // 兩條路線：出國生活、多益核心（每日新字依 settings.toeicMix 的比例挑）
  var TRACKS = [
    { id: 'toeic', name: '💼 多益核心' },
    { id: 'life', name: '🧳 出國生活' },
  ];
  var MIX_OPTIONS = [[100, '只學多益'], [70, '多益 70%・出國 30%'], [50, '各半'], [30, '多益 30%・出國 70%'], [0, '只學出國']];
  // 分類篩選：all、分類 id，或 track:toeic 這種整條路線
  function inCat(w, cat) { return cat === 'all' || w.cat === cat || cat === 'track:' + w.track; }
  var WORD_BY_ID = {};
  var WORD_BY_WORD = {};
  WORDS.forEach(function (w) { WORD_BY_ID[w.id] = w; WORD_BY_WORD[w.word] = w; });
  var WORD_FORMS = window.WORD_FORMS || {};
  var PHRASES = window.PHRASES;
  var SCENES = window.PHRASE_SCENES;
  var PHRASE_BY_ID = {};
  PHRASES.forEach(function (p) { PHRASE_BY_ID[p.id] = p; });
  var JOURNEY = window.JOURNEY;

  // 句型的 id 以 p: 開頭，學習紀錄和單字存在同一個地方，共用複習排程
  function isPhrase(id) { return id.indexOf('p:') === 0; }

  // 多益題型（搭配詞 c:、Part 5 文法 g:、Part 2 聽力應答 l:）只記錄對錯，不排複習
  var DRILLS = window.TOEIC_DRILLS;
  var DRILL_BY_ID = {};
  DRILLS.forEach(function (d) { DRILL_BY_ID[d.id] = d; });
  function isDrill(id) { return /^[cgl]:/.test(id); }
  var DRILL_SETS = {
    resp: { name: 'Part 2 聽力應答', icon: '🎧', desc: '聽問句，從三個回答選出最合適的' },
    gram: { name: 'Part 5 文法', icon: '✏️', desc: '時態、介系詞、連接詞等文法填空' },
    col: { name: '搭配詞', icon: '🔗', desc: 'make 還是 do？選出最自然的搭配' },
  };
  var DRILL_ORDER = ['resp', 'gram', 'col'];

  function getItem(id) {
    if (isPhrase(id)) return PHRASE_BY_ID[id];
    if (isDrill(id)) return DRILL_BY_ID[id];
    return WORD_BY_ID[id];
  }
  function fillBlank(d) { return d.sentence.replace('___', d.answer); }
  function speechText(id) {
    var it = getItem(id);
    if (it.type === 'phrase') return it.plain;
    if (it.type === 'resp') return it.answer;
    if (it.type === 'col' || it.type === 'gram') return fillBlank(it);
    return it.word;
  }

  // 改版時要和 sw.js 的 CACHE 版本號一起更新（npm test 會檢查兩者一致）
  var APP_VERSION = '1.0.0';
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
    p_listen: '聽句子', p_zh2en: '中翻英', p_order: '句子重組', p_reply: '情境對話', p_type: '打出整句',
    say: '看字念出來', p_say: '看句子念出來',
    col: '搭配詞', gram: 'Part 5 文法', resp: 'Part 2 聽力應答',
  };
  var PHRASE_MODES = ['p_listen', 'p_zh2en', 'p_order', 'p_reply'];
  var ORDER_MAX_WORDS = 10;   // 超過這個字數的句子，重組時改用 2～3 個字一組

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
      settings: { dailyNew: 15, dailyNewPhrases: 5, accent: 'en-US', rate: 0.9, autoSpeak: true, theme: 'auto', sayQuiz: true, toeicMix: 70, lastExport: null, backupSnooze: null },
      words: {},
      daily: {},
      game: defaultGame(),
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
      s.game = Object.assign(defaultGame(), s.game || {});
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
    gainXp(XP.learn);
    bump(isPhrase(id) ? 'newPhrase' : 'newWord');
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
  // 依序唸出多段文字（Part 2：先唸問句，再唸 A、B、C 三個回答）
  function speakQueue(texts) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    var v = pickVoice(state.settings.accent);
    texts.forEach(function (text) {
      var u = new SpeechSynthesisUtterance(text);
      u.lang = state.settings.accent;
      u.rate = state.settings.rate;
      if (v) u.voice = v;
      window.speechSynthesis.speak(u);
    });
  }
  function respSpeechList(d, q) {
    return [d.question].concat(q.options.map(function (o, i) { return 'ABC'.charAt(i) + '. ' + o; }));
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
      if (!used[w[field]]) { used[w[field]] = true; out.push(w); }
      return out.length >= n;
    });
    return out;
  }

  // 有些字沒有詞性變化題、有些裝置不能發音，改用其他題型
  function resolveMode(id, mode) {
    if (isDrill(id)) return mode;
    // 看字念出來：裝置不支援語音辨識，或使用者按了「現在不方便說話」，就換成其他題型
    if ((mode === 'say' || mode === 'p_say') && (!Recognition || (session && session.noSpeak))) {
      mode = mode === 'p_say' ? 'p_order' : pickRandom(['zh2en', 'listen', 'fill']);
    }
    if (isPhrase(id)) {
      var p = PHRASE_BY_ID[id];
      if (mode === 'p_reply' && !p.q) return 'p_zh2en';
      if (mode === 'p_listen' && !canSpeak) return 'p_zh2en';
      return mode;
    }
    var w = WORD_BY_ID[id];
    if (mode === 'fill' && !w.forms.length) return 'zh2en';
    if (mode === 'listen' && !canSpeak) return 'en2zh';
    return mode;
  }

  // 句型的干擾選項優先從同一個情境挑；情境對話題只用其他「回答」當選項
  // 英文選項挑「看起來像」的句子（開頭相同、長度相近、有共同的字），不能只看開頭或長短就猜到答案
  function phraseDistractors(p, field, n, repliesOnly) {
    var ok = function (x) { return x.id !== p.id && x.zh !== p.zh && (!repliesOnly || x.q); };
    var words = function (x) { return x.plain.toLowerCase().replace(/[^a-z' ]/g, '').split(' '); };
    var mine = words(p);
    var score = function (x) {
      var theirs = words(x);
      var sc = (x.scene === p.scene ? 1 : 0) + Math.random() * 1.5;
      if (field === 'plain') {
        if (theirs[0] === mine[0]) sc += 3;
        sc += theirs.filter(function (w) { return w.length > 2 && mine.indexOf(w) >= 0; }).length * 0.8;
        sc -= Math.abs(theirs.length - mine.length) / 3;
      }
      return sc;
    };
    var pool = PHRASES.filter(ok).map(function (x) { return { x: x, sc: score(x) }; })
      .sort(function (a, b) { return b.sc - a.sc; });
    var used = {};
    used[p[field]] = true;
    var out = [];
    pool.some(function (c) {
      if (!used[c.x[field]]) { used[c.x[field]] = true; out.push(c.x); }
      return out.length >= n;
    });
    return out;
  }

  // ---------- 句子重組的干擾字 ----------
  // 只用「換進句子一定錯」的字（主詞動詞一致、代名詞主格受格、a/an 等），
  // 不用 in/at、to/for 這種有時兩個都對的字，避免排出另一個也說得通的句子卻被判錯
  var CONFUSABLE = {
    'do': 'does', 'does': 'do', "don't": "doesn't", "doesn't": "don't", 'is': 'are', 'are': 'is',
    "isn't": "aren't", "aren't": "isn't", 'was': 'were', 'were': 'was', 'have': 'has', 'has': 'have',
    'a': 'an', 'an': 'a', 'i': 'me', 'me': 'I', 'he': 'him', 'him': 'he', 'she': 'her', 'they': 'them',
    'them': 'they', 'we': 'us', 'us': 'we', 'much': 'many', 'many': 'much',
  };
  var NOUNS = WORDS.filter(function (w) { return w.pos === 'n.' && /^[a-z]+$/.test(w.word); }).map(function (w) { return w.word; });

  // 把一個字（或一組字）裡可以混淆的字換掉，大小寫和標點照原本的樣子
  function swapConfusable(unit) {
    var parts = unit.split(' ');
    var idx = shuffle(parts.map(function (x, i) { return i; }));
    for (var k = 0; k < idx.length; k++) {
      var m = parts[idx[k]].match(/^([^A-Za-z']*)([A-Za-z']+)([^A-Za-z']*)$/);
      if (!m) continue;
      var alt = CONFUSABLE[m[2].toLowerCase()];
      if (!alt) continue;
      if (/^[A-Z]/.test(m[2]) && m[2] !== 'I' && alt !== 'I') alt = alt.charAt(0).toUpperCase() + alt.slice(1);
      var copy = parts.slice();
      copy[idx[k]] = m[1] + alt + m[3];
      return copy.join(' ');
    }
    return null;
  }

  // 重組題的單位：10 個字以內一個字一塊，長句子 2～3 個字一組；再加上 2～3 個干擾字
  function orderPieces(p) {
    var wordsList = p.plain.split(' ');
    var units = wordsList;
    if (wordsList.length > ORDER_MAX_WORDS) {
      var size = wordsList.length > 16 ? 3 : 2;
      units = [];
      for (var i = 0; i < wordsList.length; i += size) units.push(wordsList.slice(i, i + size).join(' '));
      // 最後只剩一個字就併到前一組
      if (units.length > 1 && units[units.length - 1].indexOf(' ') < 0) units[units.length - 2] += ' ' + units.pop();
    }
    // 比較時忽略大小寫和標點，避免出現 me 和 me, 這種看起來一樣的塊
    var key = function (u) { return u.toLowerCase().replace(/[^a-z' ]/g, ''); };
    var taken = {};
    units.forEach(function (u) { taken[key(u)] = true; });
    var extra = [];
    shuffle(units).some(function (u) {
      var alt = swapConfusable(u);
      if (alt && !taken[key(alt)]) { taken[key(alt)] = true; extra.push(alt); }
      return extra.length >= 2;
    });
    // 一個字一塊時，再補單字庫裡的名詞湊滿 3 個干擾字（動詞、介系詞可能換進句子還說得通，所以不用）
    if (units === wordsList) {
      shuffle(NOUNS).some(function (w) {
        if (!taken[w]) { taken[w] = true; extra.push(w); }
        return extra.length >= 3;
      });
    }
    return { units: units, extra: extra };
  }

  // 選擇題的選項和它們的來源（單字或句型），作答後用來顯示每個選項的意思
  function setOptions(q, answerItem, others, field) {
    var items = [answerItem].concat(others);
    q.options = shuffle(items.map(function (x) { return x[field]; }));
    q.answer = answerItem[field];
    q.sources = {};
    items.forEach(function (x) { q.sources[x[field]] = x.id; });
  }

  // 詞性填空的選項：單字庫裡有的字用單字庫的詞性和中文，其他的查 forms.js
  function formInfo(word) {
    var w = WORD_BY_WORD[word];
    if (w) return { pos: w.pos, zh: w.zh };
    var f = WORD_FORMS[word];
    return f ? { pos: f[0], zh: f[1] } : null;
  }

  function makePhraseQuestion(p, mode) {
    var q = { id: p.id, mode: mode };
    if (mode === 'p_listen') {
      setOptions(q, p, phraseDistractors(p, 'zh', 3), 'zh');
    } else if (mode === 'p_zh2en' || mode === 'p_reply') {
      setOptions(q, p, phraseDistractors(p, 'plain', 3, mode === 'p_reply'), 'plain');
    } else if (mode === 'p_order') {
      var pieces = orderPieces(p);
      var tokens = pieces.units.concat(pieces.extra);
      var order = tokens.map(function (t, i) { return i; });
      do { order = shuffle(order); } while (order.slice(0, pieces.units.length).every(function (v, i) { return v === i; }));
      q.tokens = tokens;
      q.unitCount = pieces.units.length;
      q.order = order;      // 打亂後的順序（存 tokens 的索引）
      q.picked = [];        // 使用者依序點選的 order 位置
      q.answer = p.plain;
    } else if (mode === 'p_type') {
      q.answer = p.plain;
    }
    return q;
  }

  function makeQuestion(id, mode) {
    if (isPhrase(id)) return makePhraseQuestion(PHRASE_BY_ID[id], mode);
    if (isDrill(id)) {
      var d = DRILL_BY_ID[id];
      return { id: id, mode: mode, options: shuffle(d.choices), answer: d.answer };
    }
    var w = WORD_BY_ID[id];
    var q = { id: id, mode: mode, exIdx: Math.floor(Math.random() * w.examples.length) };
    if (mode === 'en2zh' || mode === 'listen') {
      setOptions(q, w, distractors(w, 'zh', 3), 'zh');
    } else if (mode === 'zh2en') {
      setOptions(q, w, distractors(w, 'word', 3), 'word');
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
      else modes = ['p_type', 'p_type', 'p_order', 'p_reply', 'p_listen'];
      if (lv >= 2 && sayEnabled()) modes.push('p_say');
      return pickRandom(modes);
    }
    if (lv <= 1) modes = ['en2zh', 'card', 'zh2en', 'listen'];
    else if (lv === 2) modes = ['zh2en', 'fill', 'listen', 'en2zh'];
    else modes = ['fill', 'spell', 'listen', 'zh2en', 'card'];
    if (lv >= 2 && sayEnabled()) modes.push('say');
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
  function unseenWords(track) {
    return unseenIn(WORDS)
      .filter(function (w) { return !track || w.track === track; })
      .sort(function (a, b) { return a.lvl - b.lvl || a.order - b.order || a.catIndex - b.catIndex; })
      .map(function (w) { return w.id; });
  }
  // 依比例從兩條路線挑新字；一條路線學完了就從另一條補
  function pickNewWords(n) {
    if (n <= 0) return [];
    var toeic = unseenWords('toeic'), life = unseenWords('life');
    var mix = state.settings.toeicMix;
    var nT = Math.min(toeic.length, Math.round(n * mix / 100));
    var nL = Math.min(life.length, n - nT);
    nT = Math.min(toeic.length, n - nL);
    var a = toeic.slice(0, nT), b = life.slice(0, nL);
    // 交錯排列，讓兩條路線的字混在一起學
    var out = [];
    for (var i = 0; i < Math.max(a.length, b.length); i++) {
      if (a[i]) out.push(a[i]);
      if (b[i]) out.push(b[i]);
    }
    return out;
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

  // ---------- 打工度假之旅（獎勵制度） ----------
  // 答題得經驗值（XP）：升等級，也讓旅程往下一站前進。每日任務和寶箱得里程，里程可以換免死金牌。
  var XP = { correct: 10, wrong: 3, learn: 5, shadow: 15, mission: 50 };
  var MILES = { mission: 5, chest: 10, chestMin: 5, chestMax: 20, level: 20 };
  var FREEZE_PRICE = 50;
  var FREEZE_MAX = 2;
  var TITLES = [[1, '新手背包客'], [5, '小有經驗的旅人'], [10, '熟練旅人'], [15, '打工度假達人'], [20, '國際旅人'], [30, '環球旅行家'], [50, '世界公民']];

  function defaultGame() {
    return {
      xp: 0, countryXp: 0, country: JOURNEY[0].id, miles: 0, freezes: 0, combo: 0,
      postcards: [JOURNEY[0].stops[0].id], passport: [], frozen: [], freezeChecked: null,
      missions: null, notices: [{ type: 'welcome' }], endlessBest: 0,
    };
  }

  // 升到下一級需要的經驗值：Lv1→2 要 300，之後每級多 100
  function xpToNext(lv) { return 200 + 100 * lv; }
  function levelInfo(xp) {
    var lv = 1, rest = xp;
    while (rest >= xpToNext(lv)) { rest -= xpToNext(lv); lv++; }
    return { level: lv, into: rest, need: xpToNext(lv) };
  }
  function titleOf(lv) {
    var t = TITLES[0][1];
    TITLES.forEach(function (x) { if (lv >= x[0]) t = x[1]; });
    return t;
  }

  // 從第 i 站走到第 i+1 站需要的經驗值，越後面越遠
  function legXp(i) { return 600 + 300 * i; }
  function countryById(id) { return JOURNEY.filter(function (c) { return c.id === id; })[0] || JOURNEY[0]; }
  function stopById(id) {
    var found = null;
    JOURNEY.forEach(function (c) { c.stops.forEach(function (st) { if (st.id === id) found = { country: c, stop: st }; }); });
    return found;
  }
  function journeyInfo() {
    var c = countryById(state.game.country);
    var last = c.stops.length - 1;
    var i = 0, rest = state.game.countryXp;
    while (i < last && rest >= legXp(i)) { rest -= legXp(i); i++; }
    var nextCountry = JOURNEY[JOURNEY.indexOf(c) + 1] || null;
    return { country: c, idx: i, done: i >= last, into: rest, need: i < last ? legXp(i) : 0, nextCountry: nextCountry };
  }

  function notify(n) { state.game.notices.push(n); }

  // 走完一個國家：蓋護照章，有下一個國家就從它的第一站重新出發
  function finishCountry(c) {
    var g = state.game;
    if (g.passport.indexOf(c.id) < 0) {
      g.passport.push(c.id);
      notify({ type: 'country', country: c.id });
    }
    var next = JOURNEY[JOURNEY.indexOf(c) + 1];
    if (next) {
      g.country = next.id;
      g.countryXp = 0;
      if (g.postcards.indexOf(next.stops[0].id) < 0) g.postcards.push(next.stops[0].id);
    }
  }

  function gainXp(n) {
    if (!n) return 0;
    var g = state.game;
    if (session) session.xp += n;
    var before = levelInfo(g.xp).level;
    var j = journeyInfo();
    g.xp += n;
    if (!j.done) {
      g.countryXp += n;
      var after = journeyInfo();
      for (var i = j.idx + 1; i <= after.idx; i++) {
        var st = j.country.stops[i];
        if (g.postcards.indexOf(st.id) < 0) g.postcards.push(st.id);
        notify({ type: 'arrive', stop: st.id });
      }
      if (after.done) finishCountry(j.country);
    }
    var lv = levelInfo(g.xp).level;
    if (lv > before) {
      g.miles += MILES.level * (lv - before);
      notify({ type: 'level', level: lv });
    }
    save();
    return n;
  }

  // 已經走完的國家後來有了下一站（App 更新加了新國家），就接著出發
  function checkCountry() {
    var c = countryById(state.game.country);
    if (state.game.passport.indexOf(c.id) >= 0 && JOURNEY[JOURNEY.indexOf(c) + 1]) finishCountry(c);
  }

  // ---------- 每日任務 ----------
  // 每天從單字、句型與口說、挑戰三類各抽一個；avail 判斷今天做不做得到
  var MISSIONS = {
    w_learn: { cat: 'word', ev: 'newWord', target: 5, text: '學 5 個新單字', avail: function () { return unseenWords().length + pendingNewWords().length >= 5; } },
    w_correct: { cat: 'word', ev: 'wordCorrect', target: 20, text: '單字答對 20 題' },
    w_review: { cat: 'word', ev: 'wordsDone', target: 1, text: '完成一輪今日單字學習', avail: function () { return dueWords().length + pendingNewWords().length + Math.min(newQuota(), unseenWords().length) > 0; } },
    p_learn: { cat: 'phrase', ev: 'newPhrase', target: 3, text: '學 3 句新句型', avail: function () { return unseenPhrases().length + pendingNewPhrases().length >= 3; } },
    p_correct: { cat: 'phrase', ev: 'phraseCorrect', target: 10, text: '句型答對 10 題' },
    s_shadow: { cat: 'phrase', ev: 'shadowPass', target: 3, text: '口說跟讀 3 句達到 80 分', avail: function () { return !!Recognition; } },
    d_drill: { cat: 'challenge', ev: 'drillDone', target: 1, text: '完成一組多益題型（10 題）' },
    d_combo: { cat: 'challenge', ev: 'combo', target: 10, text: '連續答對 10 題', max: true },
    d_total: { cat: 'challenge', ev: 'answered', target: 40, text: '今天作答 40 題', max: true },
    d_mistakes: { cat: 'challenge', ev: 'mistakesDone', target: 1, text: '完成一次生字本練習', avail: function () { return mistakeWords().length >= 3; } },
    d_endless: { cat: 'challenge', ev: 'endlessCorrect', target: 20, text: '無盡挑戰答對 20 題', avail: function () { return endlessPool().length >= ENDLESS_MIN; } },
  };
  var MISSION_CATS = ['word', 'phrase', 'challenge'];

  function ensureMissions() {
    var g = state.game;
    var t = today();
    if (g.missions && g.missions.date === t) return g.missions;
    var list = MISSION_CATS.map(function (cat) {
      var ids = Object.keys(MISSIONS).filter(function (id) { return MISSIONS[id].cat === cat; });
      var ok = ids.filter(function (id) { return !MISSIONS[id].avail || MISSIONS[id].avail(); });
      var id = pickRandom(ok.length ? ok : ids);
      return { id: id, progress: 0, done: false };
    });
    g.missions = { date: t, list: list, chestOpened: false };
    g.combo = 0;
    save();
    return g.missions;
  }

  // 事件發生時更新任務進度；max 類的任務用「最高值」而不是累加
  function bump(ev, value) {
    var m = ensureMissions();
    var changed = false;
    m.list.forEach(function (it) {
      var def = MISSIONS[it.id];
      if (!def || it.done || def.ev !== ev) return;
      it.progress = def.max ? Math.max(it.progress, value) : it.progress + (value == null ? 1 : value);
      changed = true;
      if (it.progress >= def.target) {
        it.progress = def.target;
        it.done = true;
        state.game.miles += MILES.mission;
        gainXp(XP.mission);
        toast('✅ 任務完成：' + def.text + '　+' + XP.mission + ' XP　+' + MILES.mission + ' ✈️');
        if (m.list.every(function (x) { return x.done; })) toast('🎁 三個任務都完成了！到首頁打開旅行寶箱');
      }
    });
    if (changed) save();
  }

  function openChest() {
    var m = ensureMissions();
    if (m.chestOpened || !m.list.every(function (x) { return x.done; })) return;
    var n = MILES.chest + MILES.chestMin + Math.floor(Math.random() * (MILES.chestMax - MILES.chestMin + 1));
    m.chestOpened = true;
    state.game.miles += n;
    notify({ type: 'chest', miles: n });
    save();
    render();
  }

  function buyFreeze() {
    var g = state.game;
    if (g.miles < FREEZE_PRICE || g.freezes >= FREEZE_MAX) return;
    g.miles -= FREEZE_PRICE;
    g.freezes++;
    save();
    toast('🛡️ 買到一面免死金牌（持有 ' + g.freezes + ' 面）');
    render();
  }

  // ---------- 連續天數與免死金牌 ----------
  function practiced(d) { return !!(state.daily[d] && state.daily[d].answered); }
  function isFrozen(d) { return state.game.frozen.indexOf(d) >= 0; }

  // 免死金牌保住的日子不算練習天數，但不會讓連續中斷
  function streak() {
    var n = 0;
    var d = today();
    if (!practiced(d)) d = addDays(d, -1);
    while (practiced(d) || isFrozen(d)) {
      if (practiced(d)) n++;
      d = addDays(d, -1);
    }
    return n;
  }

  // 每天第一次打開時檢查：前幾天沒練習、金牌又夠，就自動用掉金牌保住連續天數
  function checkFreeze() {
    var g = state.game;
    var t = today();
    if (g.freezeChecked === t) return;
    g.freezeChecked = t;
    var missed = [];
    var d = addDays(t, -1);
    while (!practiced(d) && !isFrozen(d) && missed.length <= FREEZE_MAX) {
      missed.push(d);
      d = addDays(d, -1);
    }
    var kept = missed.length && missed.length <= g.freezes && (practiced(d) || isFrozen(d));
    if (kept) {
      g.freezes -= missed.length;
      g.frozen = g.frozen.concat(missed).filter(function (x) { return x >= addDays(t, -400); });
      notify({ type: 'freeze', used: missed.length, streak: streak() });
    }
    save();
  }

  // ---------- 提示 ----------
  function toast(msg) {
    var box = document.querySelector('.toasts');
    if (!box) {
      box = document.createElement('div');
      box.className = 'toasts';
      box.setAttribute('aria-live', 'polite');
      document.body.appendChild(box);
    }
    var el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    box.appendChild(el);
    setTimeout(function () { el.remove(); }, 3200);
  }

  function postcardHtml(st) {
    return '<div class="postcard"><div class="pc-icon">' + st.icon + '</div><h3>' + esc(st.name) + '</h3>' +
      '<p>' + esc(st.text) + '</p>' +
      '<p class="pc-phrase">' + esc(st.phrase) + ' ' + speakBtn(st.phrase) + '</p>' +
      '<p class="ex-zh">' + esc(st.phraseZh) + '</p></div>';
  }

  function noticeHtml(n) {
    var g = state.game;
    if (n.type === 'welcome') {
      var first = JOURNEY[0];
      return '<div class="notice-emoji">✈️</div><h2>打工度假之旅開始！</h2>' +
        '<p>從台北出發，目標是' + first.flag + ' ' + first.name + '的 ' + first.stops.length + ' 個地方。</p>' +
        '<ul class="notice-list"><li>⭐ 答題、學新字、口說跟讀都能得到經驗值，升級並往下一站前進</li>' +
        '<li>📍 抵達新的一站會拿到一張明信片</li>' +
        '<li>📋 每天 3 個任務，完成可以得到 ✈️ 里程，全部完成還能開寶箱</li>' +
        '<li>🛡️ 里程可以換免死金牌，忘記練習時自動保住連續天數</li></ul>';
    }
    if (n.type === 'level') {
      return '<div class="notice-emoji">⬆️</div><h2>升級！Lv ' + n.level + '</h2>' +
        '<p class="notice-big">' + esc(titleOf(n.level)) + '</p><p>獲得 +' + MILES.level + ' ✈️ 里程</p>';
    }
    if (n.type === 'arrive') {
      var f = stopById(n.stop);
      if (!f) return null;
      return '<p class="notice-tag">📍 抵達新的一站，獲得一張明信片</p>' + postcardHtml(f.stop);
    }
    if (n.type === 'country') {
      var c = countryById(n.country);
      var next = JOURNEY[JOURNEY.indexOf(c) + 1];
      return '<div class="notice-emoji">🛂</div><h2>完成' + esc(c.name) + '篇！</h2>' +
        '<p>護照蓋上了 ' + c.flag + ' ' + esc(c.name) + ' 的章。</p>' +
        '<p>' + (next ? '下一站：' + next.flag + ' ' + esc(next.name) + '，從第一站重新出發！' : '下一個國家準備中，等級、里程和每日任務都會繼續累積。') + '</p>';
    }
    if (n.type === 'freeze') {
      return '<div class="notice-emoji">🛡️</div><h2>免死金牌生效</h2>' +
        '<p>你有 ' + n.used + ' 天沒有練習，自動用掉 ' + n.used + ' 面免死金牌，連續 ' + n.streak + ' 天保住了！</p>' +
        '<p class="hint">還有 ' + g.freezes + ' 面金牌。今天也來練習吧！</p>';
    }
    if (n.type === 'chest') {
      return '<div class="notice-emoji">🎁</div><h2>旅行寶箱</h2><p class="notice-big">+' + n.miles + ' ✈️ 里程</p>' +
        '<p class="hint">明天會有新的任務！</p>';
    }
    return null;
  }

  function openSheet(inner, cls) {
    closeSheet();
    var el = document.createElement('div');
    el.className = 'sheet-backdrop' + (cls ? ' ' + cls : '');
    el.setAttribute('data-close-sheet', '');
    el.innerHTML = '<div class="sheet" role="dialog" aria-modal="true">' + inner + '</div>';
    document.body.appendChild(el);
    return el;
  }

  // 升級、抵達等通知等練習結束、回到一般畫面時才一個一個跳出來
  function showNotice() {
    if (session || shadow || document.querySelector('.sheet-backdrop')) return;
    var g = state.game;
    while (g.notices.length) {
      var n = g.notices.shift();
      save();
      var html = noticeHtml(n);
      if (!html) continue;
      openSheet(html + '<button class="btn primary block" data-close-sheet>好的</button>', 'notice');
      return;
    }
  }

  // ---------- 練習流程 ----------
  var session = null;
  var currentTab = 'home';
  var libFilter = { cat: 'all', q: '' };
  var currentScene = null;
  var practiceSub = null;   // 練習分頁裡的子頁面：'mistakes' 或 null
  var homeSub = null;       // 首頁的子頁面：'journey' 或 null
  var shadow = null;        // 口說跟讀的狀態

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
    var fresh = pending.concat(pickNewWords(Math.max(0, count - pending.length)));
    if (extraNew != null) reviews = [];
    var items = reviews.concat(buildNewItems(fresh));
    startSession('daily', items, true, extraNew != null ? '加碼學習' : '今日學習', 'words');
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

  // 每次 10 題：上次答錯的優先，再來是沒做過的，最後才是答對過的
  function startDrill(type) {
    var rank = function (d) {
      var r = state.words[d.id];
      if (!r) return 1;
      return r.mistake ? 0 : 2;
    };
    var ids = shuffle(DRILLS.filter(function (d) { return d.type === type; }))
      .sort(function (a, b) { return rank(a) - rank(b); })
      .slice(0, 10)
      .map(function (d) { return d.id; });
    var items = ids.map(function (id) { return { type: 'quiz', id: id, mode: type }; });
    startSession('free', items, false, DRILL_SETS[type].name, 'drill');
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
      if (!inCat(w, cat)) return false;
      if (onlyLearned && !isLearned(w.id)) return false;
      return true;
    });
    var ids = shuffle(pool.map(function (w) { return w.id; })).slice(0, count);
    var items = ids.map(function (id) {
      return { type: 'quiz', id: id, mode: mode === 'mixed' ? pickRandom(PRACTICE_MODES) : mode };
    });
    startSession('free', items, false, '自由練習');
  }

  // tag：完成時要算進哪個每日任務（words 今日單字、drill 多益題型）
  // extra：額外放進 session 的資料（例如無盡挑戰的命數）
  function startSession(kind, items, schedule, title, tag, extra) {
    if (!items.length) return;
    items.forEach(function (it) { if (it.mode) it.mode = resolveMode(it.id, it.mode); });
    session = Object.assign({
      kind: kind, title: title, items: items, idx: 0, schedule: schedule,
      answered: {}, correct: 0, wrong: 0, wrongIds: [], q: null, revealed: false, tag: tag || null, xp: 0,
    }, extra || {});
    renderSession();
  }

  function currentItem() { return session.items[session.idx]; }

  function nextItem() {
    if (session.kind === 'endless' && session.lives > 0) session.items.push(nextEndlessItem());
    session.idx++;
    session.q = null;
    session.picked = null;
    session.showText = false;
    session.typed = null;
    stopSay();
    session.say = null;
    session.revealed = false;
    if (session.idx >= session.items.length) {
      if (session.tag === 'words') bump('wordsDone');
      if (session.tag === 'drill') bump('drillDone');
      if (session.kind === 'mistakes') bump('mistakesDone');
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
      session.lastXp = gainXp(result === 'correct' ? XP.correct : XP.wrong);
      state.game.combo = result === 'correct' ? state.game.combo + 1 : 0;
      if (result === 'correct') {
        bump('combo', state.game.combo);
        if (isPhrase(item.id)) bump('phraseCorrect');
        else if (!isDrill(item.id)) bump('wordCorrect');
      }
    } else {
      session.lastXp = 0;
      if (result === 'correct') {
        // 重考答對：只更新今日作答量
        dayRec().answered++;
        save();
      }
    }
    bump('answered', dayRec().answered);
    if (session.kind === 'endless') endlessAnswered(result);
    // 答錯就在本輪稍後再考一次
    if (result !== 'correct' && !item.retry && session.kind !== 'free' && session.kind !== 'endless') {
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
    stopSay();
    if (session && session.kind === 'endless' && !session.finished) finishEndless();
    session = null;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    render();
  }

  // ---------- 畫面 ----------
  var $app = document.getElementById('app');

  // 外觀：auto 跟隨手機系統，light／dark 由使用者指定
  var THEME_COLORS = { light: '#0f766e', dark: '#0f1419' };
  function applyTheme() {
    var theme = state.settings.theme;
    var root = document.documentElement;
    if (theme === 'dark' || theme === 'light') root.setAttribute('data-theme', theme);
    else root.removeAttribute('data-theme');
    var dark = theme === 'dark' || (theme !== 'light' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? THEME_COLORS.dark : THEME_COLORS.light);
  }

  if (window.matchMedia) {
    var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (darkQuery.addEventListener) darkQuery.addEventListener('change', applyTheme);
  }

  function render() {
    applyTheme();
    checkFreeze();
    ensureMissions();
    if (session) { renderSession(); return; }
    if (shadow) { renderShadow(); return; }
    var body = '';
    if (currentTab === 'home') body = homeSub === 'journey' ? viewJourney() : viewHome();
    else if (currentTab === 'phrases') body = currentScene ? viewScene() : viewPhrases();
    else if (currentTab === 'library') body = viewLibrary();
    else if (currentTab === 'practice') body = practiceSub === 'mistakes' ? viewMistakes() : viewPractice();
    else if (currentTab === 'stats') body = viewStats();
    else if (currentTab === 'settings') body = viewSettings();
    $app.innerHTML = '<main class="page">' + body + '</main>' + navBar();
    if (currentTab === 'library') bindLibrarySearch();
    showNotice();
  }

  function navBar() {
    var tabs = [
      ['home', '🏠', '今日'], ['phrases', '💬', '句型'], ['practice', '🎯', '練習'], ['library', '📚', '單字庫'],
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
    h += journeyCard() + backupCard() + missionsCard();
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
    h += '<label>分類<select id="free-cat"><option value="all">全部分類</option>' + TRACKS.map(function (t) {
      return '<optgroup label="' + t.name + '"><option value="track:' + t.id + '">全部' + t.name.slice(2) + '</option>' +
        CATS.filter(function (c) { return c.track === t.id; }).map(function (c) { return '<option value="' + c.id + '">' + c.icon + ' ' + c.name + '</option>'; }).join('') + '</optgroup>';
    }).join('') + '</select></label>';
    h += '<label>題型<select id="free-mode"><option value="mixed">綜合</option>' +
      PRACTICE_MODES.map(function (m) { return '<option value="' + m + '">' + MODE_LABEL[m] + '</option>'; }).join('') + '</select></label>';
    h += '<label>題數<select id="free-count"><option>10</option><option>20</option><option>30</option></select></label>';
    h += '<label>範圍<select id="free-scope"><option value="learned">已學過的字</option><option value="all">所有單字</option></select></label>';
    h += '</div><button class="btn block" data-action="start-free">開始練習</button></section>';
    return h;
  }

  // ---------- 旅程與每日任務的畫面 ----------
  function journeyCard() {
    var g = state.game;
    var lv = levelInfo(g.xp);
    var j = journeyInfo();
    var here = j.country.stops[j.idx];
    var h = '<button class="journey-card" data-action="open-journey">' +
      '<span class="jc-top"><span class="jc-lv">Lv ' + lv.level + '</span><span class="jc-title">' + esc(titleOf(lv.level)) + '</span>' +
      '<span class="jc-wallet"><span class="jc-miles">✈️ ' + g.miles + '</span><span class="jc-freeze">🛡️ ' + g.freezes + '</span></span></span>';
    if (j.done) {
      h += '<span class="jc-route">' + j.country.flag + ' ' + esc(j.country.name) + '篇完成！' +
        (j.nextCountry ? '' : '下一個國家準備中') + '</span>';
    } else {
      var next = j.country.stops[j.idx + 1];
      h += '<span class="jc-route">' + j.country.flag + ' 📍 ' + esc(here.name) + ' → ' + next.icon + ' ' + esc(next.name) + '</span>' +
        '<span class="progress"><span style="width:' + pct(j.into, j.need) + '%"></span></span>' +
        '<span class="jc-hint">再 ' + (j.need - j.into) + ' XP 抵達' + esc(next.name) + ' · 點這裡看旅程地圖</span>';
    }
    return h + '</button>';
  }

  function missionsCard() {
    var m = ensureMissions();
    var doneCount = m.list.filter(function (x) { return x.done; }).length;
    var h = '<section class="card missions"><div class="missions-head"><h2>📋 今日任務</h2>' +
      '<span class="missions-count">' + doneCount + ' / ' + m.list.length + '</span></div><ul class="mission-list">';
    m.list.forEach(function (it) {
      var def = MISSIONS[it.id];
      h += '<li class="mission' + (it.done ? ' done' : '') + '" data-mission="' + it.id + '">' +
        '<span class="mission-check">' + (it.done ? '✅' : '⬜') + '</span>' +
        '<span class="mission-main"><span class="mission-text">' + esc(def.text) + '</span>' +
        '<span class="progress"><span style="width:' + pct(it.progress, def.target) + '%"></span></span></span>' +
        '<span class="mission-num">' + Math.min(it.progress, def.target) + '/' + def.target + '</span></li>';
    });
    h += '</ul><p class="hint">每完成一個 +' + XP.mission + ' XP、+' + MILES.mission + ' ✈️ 里程</p>';
    if (m.chestOpened) h += '<p class="done-msg">🎉 今天的寶箱已經打開了，明天見！</p>';
    else if (doneCount === m.list.length) h += '<button class="btn primary block chest-btn" data-action="open-chest">🎁 打開旅行寶箱</button>';
    else h += '<p class="chest-locked">🎁 三個任務都完成可以打開旅行寶箱</p>';
    return h + '</section>';
  }

  function viewJourney() {
    var g = state.game;
    var lv = levelInfo(g.xp);
    var j = journeyInfo();
    var h = '<header class="page-head"><button class="btn link back" data-action="journey-back">‹ 今日</button><h1>打工度假之旅</h1></header>';
    h += '<section class="card"><div class="lv-row"><span class="jc-lv">Lv ' + lv.level + '</span><b>' + esc(titleOf(lv.level)) + '</b>' +
      '<span class="cs-num">總經驗值 ' + g.xp + ' XP</span></div>' +
      '<div class="progress"><div style="width:' + pct(lv.into, lv.need) + '%"></div></div>' +
      '<p class="hint">再 ' + (lv.need - lv.into) + ' XP 升到 Lv ' + (lv.level + 1) + '</p>' +
      '<p class="hint">⭐ 答對 +' + XP.correct + '、答錯 +' + XP.wrong + '、學新字或新句型 +' + XP.learn + '、口說跟讀 80 分以上 +' + XP.shadow + '、完成每日任務 +' + XP.mission + '</p></section>';

    h += '<h2 class="section-title">' + j.country.flag + ' ' + esc(j.country.title) + '</h2><ol class="route">';
    j.country.stops.forEach(function (st, i) {
      var reached = i <= j.idx;
      var cls = i === j.idx ? 'here' : reached ? 'reached' : i === j.idx + 1 ? 'next' : 'locked';
      h += '<li class="stop ' + cls + '">' +
        (reached ? '<button class="stop-btn" data-postcard="' + st.id + '">' : '<div class="stop-btn">') +
        '<span class="stop-icon">' + (reached || i === j.idx + 1 ? st.icon : '🔒') + '</span>' +
        '<span class="stop-main"><span class="stop-name">' + (reached || i === j.idx + 1 ? esc(st.name) : '？？？') + '</span>';
      if (i === j.idx && !j.done) h += '<span class="stop-sub">📍 你在這裡</span>';
      else if (i === j.idx + 1) {
        h += '<span class="progress"><span style="width:' + pct(j.into, j.need) + '%"></span></span>' +
          '<span class="stop-sub">再 ' + (j.need - j.into) + ' XP</span>';
      } else if (reached) h += '<span class="stop-sub">📮 看明信片</span>';
      h += '</span>' + (reached ? '</button>' : '</div>') + '</li>';
    });
    h += '</ol>';
    if (j.done && !j.nextCountry) h += '<p class="note">🌏 下一個國家準備中！等級、里程和每日任務會繼續累積。</p>';

    h += '<section class="card"><h2>🛂 護照</h2><div class="stamps">';
    JOURNEY.forEach(function (c) {
      var got = g.passport.indexOf(c.id) >= 0;
      h += '<span class="stamp' + (got ? ' got' : '') + '">' + (got ? c.flag : '❔') + '<small>' + (got ? esc(c.name) : '未完成') + '</small></span>';
    });
    h += '</div><p class="hint">走完一個國家的所有地方，護照就會蓋上那個國家的章。</p></section>';

    h += '<section class="card"><h2>🛍️ 里程商店</h2><p class="row">你的里程<b>✈️ ' + g.miles + '</b></p>' +
      '<div class="shop-item"><span class="shop-icon">🛡️</span><span class="shop-main"><b>免死金牌</b>' +
      '<span class="hint">忘記練習的隔天打開 App 時自動使用，一面保住一天的連續天數。最多持有 ' + FREEZE_MAX + ' 面（目前 ' + g.freezes + ' 面）。</span></span>' +
      '<button class="btn small" data-action="buy-freeze"' + (g.miles < FREEZE_PRICE || g.freezes >= FREEZE_MAX ? ' disabled' : '') + '>' + FREEZE_PRICE + ' ✈️</button></div>' +
      '<p class="hint">里程來源：每日任務 +' + MILES.mission + '、旅行寶箱 ' + (MILES.chest + MILES.chestMin) + '～' + (MILES.chest + MILES.chestMax) + '、每升一級 +' + MILES.level + '</p></section>';
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
    h += '<div class="chips">' + chip('all', '全部（' + WORDS.length + '）') + '</div>';
    TRACKS.forEach(function (t) {
      h += '<div class="chips"><span class="chip-label">' + t.name + '</span>' + chip('track:' + t.id, '全部') +
        CATS.filter(function (c) { return c.track === t.id; }).map(function (c) { return chip(c.id, c.icon + ' ' + c.name); }).join('') + '</div>';
    });
    h += '<div id="lib-list">' + libraryList() + '</div>';
    return h;
  }

  function chip(id, label) {
    return '<button class="chip' + (libFilter.cat === id ? ' active' : '') + '" data-cat="' + id + '">' + label + '</button>';
  }

  function libraryList() {
    var q = normalize(libFilter.q);
    var list = WORDS.filter(function (w) {
      if (!inCat(w, libFilter.cat)) return false;
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

  function drillStats(type) {
    var list = DRILLS.filter(function (d) { return d.type === type; });
    var done = 0, c = 0, w = 0;
    list.forEach(function (d) {
      var r = state.words[d.id];
      if (r) { done++; c += r.correct; w += r.wrong; }
    });
    return { total: list.length, done: done, acc: c + w ? pct(c, c + w) + '%' : '–' };
  }

  function viewPractice() {
    var h = '<header class="hero"><h1>練習</h1><p class="sub">多益題型、口說跟讀與生字本</p></header>';
    var poolSize = endlessPool().length;
    h += '<h2 class="section-title">挑戰</h2><div class="scene-list">' +
      '<button class="scene-card endless-card" data-action="start-endless"' + (poolSize >= ENDLESS_MIN ? '' : ' disabled') + '><span class="scene-icon">♾️</span>' +
      '<span class="scene-main"><span class="scene-name">無盡挑戰</span>' +
      '<span class="scene-desc">' + (poolSize >= ENDLESS_MIN ? ENDLESS_LIVES + ' 條命，答對越多題目越難，看你能撐多久' : '先學 ' + ENDLESS_MIN + ' 個單字或句型再來挑戰（目前 ' + poolSize + ' 個）') + '</span></span>' +
      '<span class="scene-num">最高紀錄<br><b>' + state.game.endlessBest + '</b> 題</span></button></div>';
    h += '<h2 class="section-title">多益題型（每次 10 題）</h2><div class="scene-list">';
    DRILL_ORDER.forEach(function (type) {
      var m = DRILL_SETS[type];
      var st = drillStats(type);
      h += '<button class="scene-card" data-drill="' + type + '">' +
        '<span class="scene-icon">' + m.icon + '</span>' +
        '<span class="scene-main"><span class="scene-name">' + m.name + '</span>' +
        '<span class="scene-desc">' + m.desc + '</span>' +
        '<span class="progress"><span style="width:' + pct(st.done, st.total) + '%"></span></span></span>' +
        '<span class="scene-num">' + st.done + '/' + st.total + '<br>正確率 ' + st.acc + '</span></button>';
    });
    h += '</div><h2 class="section-title">口說</h2><div class="scene-list">' +
      '<button class="scene-card" data-action="start-shadow"><span class="scene-icon">🎤</span>' +
      '<span class="scene-main"><span class="scene-name">口說跟讀</span>' +
      '<span class="scene-desc">跟著唸出國實用句型，App 標出沒唸清楚的字</span></span></button>' +
      '<button class="scene-card" data-action="start-say"' + (Recognition ? '' : ' disabled') + '><span class="scene-icon">🗣️</span>' +
      '<span class="scene-main"><span class="scene-name">看字念出來</span>' +
      '<span class="scene-desc">' + (Recognition ? '不先聽發音，看著學過的單字和句子直接念（10 題）' : '這個瀏覽器不支援語音辨識') + '</span></span></button></div>';
    var mistakes = mistakeWords().length;
    h += '<h2 class="section-title">複習</h2><div class="scene-list">' +
      '<button class="scene-card" data-action="open-mistakes"><span class="scene-icon">📝</span>' +
      '<span class="scene-main"><span class="scene-name">生字本</span>' +
      '<span class="scene-desc">答錯或標記「模糊」的單字</span></span>' +
      '<span class="scene-num">' + mistakes + ' 個字</span></button></div>';
    return h;
  }

  function viewMistakes() {
    var ids = mistakeWords();
    var h = '<header class="page-head"><button class="btn link back" data-action="practice-back">‹ 練習</button><h1>生字本</h1></header>';
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

    h += '<section class="card"><h2>多益題型</h2><ul class="cat-stats">';
    DRILL_ORDER.forEach(function (type) {
      var st = drillStats(type);
      h += '<li><div class="cs-head"><span>' + DRILL_SETS[type].icon + ' ' + DRILL_SETS[type].name + '</span><span class="cs-num">' +
        st.done + '/' + st.total + ' · 正確率 ' + st.acc + '</span></div>' +
        '<div class="progress"><div style="width:' + pct(st.done, st.total) + '%"></div></div></li>';
    });
    h += '</ul></section>';

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
    h += '<section class="card"><h2>各分類表現</h2><p class="hint">正確率低的分類就是需要加強的情境。</p>';
    TRACKS.forEach(function (t) {
      var tw = WORDS.filter(function (w) { return w.track === t.id; });
      var tl = tw.filter(function (w) { return isLearned(w.id); }).length;
      h += '<h3 class="track-title">' + t.name + '<span class="cs-num">' + tl + '/' + tw.length + '</span></h3><ul class="cat-stats">';
      CATS.filter(function (c) { return c.track === t.id; }).forEach(statRow);
      h += '</ul>';
    });
    h += '</section>';
    return h;

    function statRow(c) {
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
    }
  }

  function viewSettings() {
    var s = state.settings;
    var h = '<header class="page-head"><h1>設定</h1></header>';
    h += '<section class="card"><h2>外觀</h2>' +
      '<label class="row">顯示模式<select id="set-theme">' + [['auto', '跟隨系統'], ['light', '淺色'], ['dark', '深色']].map(function (t) {
        return '<option value="' + t[0] + '"' + (t[0] === (s.theme || 'auto') ? ' selected' : '') + '>' + t[1] + '</option>';
      }).join('') + '</select></label>' +
      '<p class="hint">「跟隨系統」會依照手機的深色／淺色外觀自動切換。</p></section>';
    h += '<section class="card"><h2>學習</h2>';
    h += '<label class="row">每日新字數量<select id="set-daily">' + [5, 10, 15, 20, 25, 30, 40, 50].map(function (n) {
      return '<option' + (n === s.dailyNew ? ' selected' : '') + '>' + n + '</option>';
    }).join('') + '</select></label>';
    h += '<label class="row">新字比例<select id="set-mix">' + MIX_OPTIONS.map(function (m) {
      return '<option value="' + m[0] + '"' + (m[0] === s.toeicMix ? ' selected' : '') + '>' + m[1] + '</option>';
    }).join('') + '</select></label>' +
      '<p class="hint">每日新字從「💼 多益核心」和「🧳 出國生活」兩條路線依比例挑選；其中一條學完了會自動從另一條補。</p>';
    h += '<label class="row">每日新句型數量<select id="set-daily-phrases">' + [3, 5, 8, 10].map(function (n) {
      return '<option' + (n === s.dailyNewPhrases ? ' selected' : '') + '>' + n + '</option>';
    }).join('') + '</select></label>' +
      '<label class="row">複習時考「看字念出來」<input type="checkbox" id="set-say"' + (s.sayQuiz !== false ? ' checked' : '') + '></label>' +
      '<p class="hint">' + (Recognition ? '關掉後，複習只出不用開口的題目；「練習」分頁還是可以自己練。' : '這個瀏覽器不支援語音辨識，不會出念出來的題目。') + '</p></section>';

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

    h += '<section class="card"><h2>資料</h2><p class="hint">練習紀錄只存在這台裝置的瀏覽器，建議定期匯出備份。' +
      '<br>上次備份：' + (s.lastExport || '從未備份') + '</p>';
    h += '<div class="btn-row"><button class="btn" data-action="export">匯出紀錄</button>';
    h += '<label class="btn">匯入紀錄<input type="file" id="import-file" accept="application/json,.json" hidden></label></div>';
    h += '<button class="btn danger block" data-action="reset">清除所有紀錄</button></section>';
    h += '<p class="footer">多益練習 App v' + APP_VERSION + ' · 單字 ' + WORDS.length + ' 個 · 句型 ' + PHRASES.length + ' 句 · 多益題 ' + DRILLS.length + ' 題</p>';
    return h;
  }

  // ---------- 練習畫面 ----------
  function renderSession() {
    var item = currentItem();
    var w = getItem(item.id);
    var phrase = isPhrase(item.id);
    var endless = session.kind === 'endless';
    // 無盡挑戰：進度條顯示離下一個難度還有多遠，右上角是分數和剩下的命
    var progress = endless ? endlessTierProgress() : pct(session.idx, session.items.length);
    var h = '<div class="session"><header class="session-head">' +
      '<button class="icon-btn" data-action="exit" aria-label="離開">✕</button>' +
      '<div class="progress thin"><div style="width:' + progress + '%"></div></div>' +
      (endless
        ? '<span class="count endless-count">🏆 ' + session.correct + '　' + '❤️'.repeat(session.lives) + '🤍'.repeat(ENDLESS_LIVES - session.lives) + '</span></header>'
        : '<span class="count">' + (session.idx + 1) + '/' + session.items.length + '</span></header>');
    if (endless) h += '<p class="endless-tier">' + ENDLESS_TIERS[endlessTier()].name + '</p>';
    h += '<main class="session-body">';

    if (item.type === 'intro') {
      h += '<p class="tag new-tag">' + (phrase ? '新句型' : '新單字') + '</p>' + (phrase ? phraseCard(w) : wordCard(w)) +
        '<button class="btn primary block" data-action="next">記住了，下一個</button>';
    } else {
      if (!session.q) session.q = makeQuestion(item.id, item.mode);
      if (isDrill(item.id)) h += drillQuizHtml(w, item, session.q);
      else h += phrase ? phraseQuizHtml(w, item, session.q) : quizHtml(w, item, session.q);
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
      if (item.mode === 'resp' && !session.revealed) speakQueue(respSpeechList(w, session.q));
    }

    var input = document.getElementById('spell-input') || document.getElementById('type-input');
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

    if (item.mode === 'say') {
      // KK 音標等於告訴你怎麼念，作答後才顯示
      if (!revealed) {
        h += '<div class="prompt"><h2 class="prompt-word say-target">' + esc(w.word) + '</h2>' +
          '<p class="wc-zh"><span class="pos">' + esc(w.pos) + '</span> ' + esc(w.zh) + '</p></div>';
        return h + sayControls(w.word);
      }
      return h + sayHeardHtml() + feedback(w);
    }

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

  function optionsHtml(q, labeled) {
    var revealed = session.revealed;
    return '<div class="options">' + q.options.map(function (opt, i) {
      var cls = 'option';
      if (revealed) {
        if (opt === q.answer) cls += ' right';
        else if (opt === session.picked) cls += ' wrong';
        else cls += ' dim';
      }
      var label = (labeled ? '(' + 'ABCD'.charAt(i) + ') ' : '') + esc(opt);
      return '<button class="' + cls + '" data-option="' + esc(opt) + '"' + (revealed ? ' disabled' : '') + '>' + label + '</button>';
    }).join('') + '</div>';
  }

  function blankHtml(d, revealed) {
    var parts = esc(d.sentence).split('___');
    return parts[0] + (revealed ? '<mark>' + esc(d.answer) + '</mark>' : '<span class="blank">_____</span>') + parts[1];
  }

  function drillQuizHtml(d, item, q) {
    var revealed = session.revealed;
    var h = '<p class="tag">' + MODE_LABEL[item.mode] + (d.topic ? ' · ' + esc(d.topic) : '') + '</p>';
    if (item.mode === 'resp') {
      // 多益 Part 2 只有聲音；看不懂可以按「看文字」
      var showText = revealed || session.showText;
      h += '<div class="prompt they"><p class="they-label">問句</p>' +
        (showText
          ? '<p class="they-say">' + esc(d.question) + ' ' + speakBtn(d.question) + '</p>'
          : '<button class="listen-btn" data-action="speak-all" aria-label="重聽">🔊</button><p class="hint">點喇叭重聽問句和三個回答</p>') +
        (revealed ? '<p class="ex-zh">' + esc(d.zh) + '</p>' : '') + '</div>';
      h += '<p class="hint center">選出最合適的回答' +
        (showText ? '' : '　<button class="btn link inline" data-action="show-text">聽不懂？看文字</button>') + '</p>';
      h += '<div class="options">' + q.options.map(function (opt, i) {
        var cls = 'option';
        if (revealed) cls += opt === q.answer ? ' right' : opt === session.picked ? ' wrong' : ' dim';
        return '<div class="resp-row">' + speakBtn(opt) +
          '<button class="' + cls + '" data-option="' + esc(opt) + '"' + (revealed ? ' disabled' : '') + '>(' + 'ABC'.charAt(i) + ')' +
          (showText ? ' ' + esc(opt) : '') + '</button></div>';
      }).join('') + '</div>';
    } else {
      h += '<div class="prompt"><p class="prompt-sentence">' + blankHtml(d, revealed) + '</p></div>' +
        '<p class="hint center">' + (item.mode === 'col' ? '選出最自然的搭配' : '選出文法正確的答案') + '</p>';
      h += optionsHtml(q, true);
    }
    if (revealed) h += feedback(d);
    return h;
  }

  function drillCard(d) {
    var h = '<div class="word-card">';
    if (d.type === 'resp') {
      h += '<p class="they-label">問句</p><p class="ex">' + esc(d.question) + ' ' + speakBtn(d.question) + '</p>' +
        '<p class="ex-zh">' + esc(d.zh) + '</p>' +
        '<p class="they-label">正確回答</p><p class="ex"><b>' + esc(d.answer) + '</b> ' + speakBtn(d.answer) + '</p>';
    } else {
      h += '<p class="ex">' + blankHtml(d, true) + ' ' + speakBtn(fillBlank(d)) + '</p>' +
        (d.zh ? '<p class="ex-zh">' + esc(d.zh) + '</p>' : '');
    }
    return h + '<p class="note">💡 ' + esc(d.note) + '</p></div>';
  }

  function drillRow(d) {
    return '<li class="word-item"><details><summary><div class="wi-main"><span class="wi-phrase">' +
      esc(d.sentence || d.question) + '</span><div class="wi-zh">' + MODE_LABEL[d.type] + '</div></div></summary>' +
      '<div class="detail">' + drillCard(d) + '</div></details></li>';
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
        var done = q.picked.length > 0;
        var spare = q.tokens.length - q.unitCount;
        h += '<p class="hint center">依序點選，排出正確的句子' + (spare ? '（有 ' + spare + ' 個用不到）' : '') + '</p>' +
          '<div class="order-built">' + (built || '<span class="order-empty">點下面的單字放到這裡</span>') + '</div>' +
          '<div class="order-pool">' + pool + '</div>' +
          '<div class="btn-row"><button class="btn" data-action="order-reset">重來</button>' +
          '<button class="btn primary" data-action="order-check"' + (done ? '' : ' disabled') + '>確定</button></div>';
      } else {
        h += '<p class="your-answer">你的答案：<b>' + esc(session.orderInput) + '</b></p>' + feedback(p);
      }
      return h;
    } else if (item.mode === 'p_say') {
      if (!revealed) {
        var r = session.say && session.say.result;
        h += '<div class="prompt"><p class="shadow-target say-target">' +
          (r ? r.tokens.map(function (t) { return '<span class="' + (t.ok ? 'ok' : 'miss') + '">' + esc(t.text) + '</span>'; }).join(' ') : esc(p.plain)) +
          '</p><p class="ex-zh">' + esc(p.zh) + '</p></div>';
        return h + sayControls(p.plain);
      }
      return h + sayHeardHtml() + feedback(p);
    } else if (item.mode === 'p_type') {
      h += '<div class="prompt"><h2 class="prompt-zh">' + esc(p.zh) + '</h2></div>';
      if (!revealed) {
        h += '<p class="hint center">用英文打出整句（大小寫和標點不用管）</p>' +
          '<form class="type-form" data-form="ptype"><textarea id="type-input" rows="3" lang="en" inputmode="email" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="輸入英文句子"></textarea>' +
          '<button class="btn primary block" type="submit">確定</button></form>' +
          '<p class="spell-warn" role="alert" hidden>看起來輸入了注音或中文，請切換成英文鍵盤再輸入一次（這次不算答錯）</p>' +
          '<button class="btn link" data-action="give-up">不知道，看答案</button>';
      } else {
        var g = session.typed;
        h += '<p class="your-answer">你的答案：<b>' + esc(g ? g.input : '（未作答）') + '</b></p>';
        if (g && g.input) {
          h += '<p class="typed-diff">' + g.tokens.map(function (t) { return '<span class="' + t.st + '">' + esc(t.text) + '</span>'; }).join(' ') + '</p>' +
            '<p class="hint center">' + (g.missing ? '<span class="miss">波浪線</span>：沒打到或打錯的字　' : '') +
            (g.typos ? '<span class="typo">虛線</span>：小錯字，注意拼法　' : '') +
            (g.extra ? '多打了 ' + g.extra + ' 個字' : '') + '</p>';
        }
        h += feedback(p);
      }
      return h;
    }
    h += optionsHtml(q);
    if (revealed) h += feedback(p);
    return h;
  }

  // 作答後列出每個選項的意思；答錯時直接展開，答對時收起來
  function optionNotes(q) {
    if (!q || !q.options || isDrill(q.id)) return '';
    // 每個選項都附上英文的發音按鈕；單字另外附 KK 音標
    var kkOf = function (w) { return w && w.kk ? ' <span class="kk">[' + esc(w.kk) + ']</span>' : ''; };
    var rows = q.options.map(function (opt) {
      var main, sub, say;
      if (q.mode === 'fill') {
        var f = formInfo(opt);
        if (!f) return null;
        main = '<b>' + esc(opt) + '</b>' + kkOf(WORD_BY_WORD[opt]) + ' <span class="pos">' + esc(f.pos) + '</span>';
        sub = esc(f.zh);
        say = opt;
      } else {
        var src = q.sources && q.sources[opt] ? getItem(q.sources[opt]) : null;
        if (!src) return null;
        if (q.mode === 'en2zh' || q.mode === 'listen') { main = '<b>' + esc(opt) + '</b>'; sub = esc(src.word) + kkOf(src) + ' <span class="pos">' + esc(src.pos) + '</span>'; say = src.word; }
        else if (q.mode === 'zh2en') { main = '<b>' + esc(opt) + '</b>' + kkOf(src) + ' <span class="pos">' + esc(src.pos) + '</span>'; sub = esc(src.zh); say = src.word; }
        else if (q.mode === 'p_listen') { main = '<b>' + esc(opt) + '</b>'; sub = esc(src.plain); say = src.plain; }
        else { main = '<b>' + esc(opt) + '</b>'; sub = esc(src.zh); say = src.plain; }
      }
      var cls = opt === q.answer ? 'right' : opt === session.picked ? 'wrong' : '';
      return '<li class="' + cls + '"><span class="on-mark">' + (opt === q.answer ? '✓' : opt === session.picked ? '✗' : '·') + '</span>' +
        '<span class="on-main"><span>' + main + '</span><span class="on-sub">' + sub + '</span></span>' + speakBtn(say) + '</li>';
    });
    if (rows.some(function (r) { return !r; })) return '';
    var list = '<ul class="option-notes">' + rows.join('') + '</ul>';
    var title = q.mode === 'fill' ? '每個選項的詞性和意思' : '每個選項的意思';
    return '<details class="notes-box" open><summary>📖 ' + title + '</summary>' + list + '</details>';
  }

  function feedback(w) {
    var r = session.lastResult;
    var head = r === 'correct' ? '<div class="fb-head ok">✓ 答對了！</div>'
      : r === 'fuzzy' ? '<div class="fb-head fuzzy">△ ' + (/^(p_type|say|p_say)$/.test(currentItem().mode) ? '差一點！' : '') + (session.schedule ? '明天再複習' : '再多練習幾次') + '</div>'
        : '<div class="fb-head ng">✗ 答錯了，稍後會再考一次</div>';
    var drill = isDrill(w.id);
    if (session.kind === 'free' && r === 'wrong') {
      head = '<div class="fb-head ng">✗ 答錯了' + (drill ? '，看看解析' : w.type === 'phrase' ? '，再看一次這句' : '，已加入生字本') + '</div>';
    }
    if (session.kind === 'endless' && r !== 'correct') {
      head = '<div class="fb-head ng">' + (session.lives > 0 ? '💔 少了一條命，還剩 ' + session.lives + ' 條' : '💔 沒有命了，挑戰結束') + '</div>';
    }
    if (session.lastXp) head = head.replace('</div>', '<span class="xp-pill">+' + session.lastXp + ' XP</span></div>');
    var card = drill ? drillCard(w) : w.type === 'phrase' ? phraseCard(w) : wordCard(w, session.q ? session.q.exIdx : 0);
    return '<div class="feedback">' + head + optionNotes(session.q) + card + '</div>' +
      '<button class="btn primary block" data-action="next">' + (session.kind === 'endless' && session.lives <= 0 ? '看結果' : '下一題') + '</button>' +
      '<button class="btn link report" data-action="report">🚩 這題怪怪的？回報這題</button>';
  }

  // ---------- 口說跟讀 ----------
  var Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var SHADOW_PASS = 80;   // 分數達到這個百分比算唸對

  // 重要的字一定要聽對：句子裡 [ ] 標出的部分（a、in 這種短字除外），以及 5 個字母以上的字。
  // 只看分數的話，像 hospitality 被聽成 security 還有 89 分，會被當成念對
  function keyMisses(p, r) {
    var letters = function (t) { return t.toLowerCase().replace(/[^a-z']/g, ''); };
    var m = p.en.match(/\[(.+?)\]/);
    var keys = m ? m[1].split(' ').map(letters) : [];
    return r.tokens.filter(function (t) {
      var w = letters(t.text);
      return !t.ok && (w.length >= 5 || (w.length >= 3 && keys.indexOf(w) >= 0));
    }).map(function (t) { return t.text.replace(/[^A-Za-z'-]/g, ''); });
  }
  function speechPass(p, r) { return r.score >= SHADOW_PASS && !keyMisses(p, r).length; }

  // 幾個候選結果裡挑最好的：先看有沒有過，再看分數
  function bestSpeech(p, alts) {
    var best = null;
    alts.forEach(function (t) {
      var r = scoreSpeech(p.plain, t);
      r.pass = speechPass(p, r);
      r.misses = keyMisses(p, r);
      if (!best || (r.pass && !best.pass) || (r.pass === best.pass && r.score > best.score)) best = r;
    });
    return best;
  }

  // 辨識結果常把縮寫或數字寫成不同形式，比對前統一展開
  var CONTRACTIONS = {
    "i'm": 'i am', "it's": 'it is', "that's": 'that is', "what's": 'what is', "where's": 'where is',
    "who's": 'who is', "there's": 'there is', "here's": 'here is', "let's": 'let us', "don't": 'do not',
    "doesn't": 'does not', "didn't": 'did not', "can't": 'can not', 'cannot': 'can not', "won't": 'will not',
    "isn't": 'is not', "aren't": 'are not', "wasn't": 'was not', "i'll": 'i will', "you'll": 'you will',
    "we'll": 'we will', "i'd": 'i would', "you're": 'you are', "we're": 'we are', "they're": 'they are',
    "i've": 'i have', "we've": 'we have', "haven't": 'have not', "couldn't": 'could not',
    // iPhone 的辨識常把 going to、want to 寫成 gonna、wanna
    'gonna': 'going to', 'wanna': 'want to',
  };
  // 打字時常省略撇號（dont、im），也當作縮寫；its、well、were 這種本身就是單字的不算
  var NO_APOSTROPHE = {};
  Object.keys(CONTRACTIONS).forEach(function (k) {
    var bare = k.replace(/'/g, '');
    if (bare !== k && ['its', 'lets', 'wont', 'ill', 'well', 'id', 'were', 'cant', 'wed', 'hell', 'shell'].indexOf(bare) < 0) NO_APOSTROPHE[bare] = CONTRACTIONS[k];
  });
  var NUMBER_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];

  function speechPieces(tok) {
    var t = tok.normalize('NFKC').toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9']/g, '').replace(/^'+|'+$/g, '');
    if (!t) return [];
    if (CONTRACTIONS[t]) return CONTRACTIONS[t].split(' ');
    if (NO_APOSTROPHE[t]) return NO_APOSTROPHE[t].split(' ');
    if (/^\d+$/.test(t) && +t <= 20) return [NUMBER_WORDS[+t]];
    return [t];
  }

  // 用最長共同子序列比對：目標句的每個字有沒有在唸出來的內容裡依序出現
  function scoreSpeech(target, said) {
    var tokens = target.split(/\s+/).map(function (text) { return { text: text, pieces: speechPieces(text) }; });
    var flat = [];
    tokens.forEach(function (t, i) { t.pieces.forEach(function (p) { flat.push({ p: p, i: i, ok: false }); }); });
    var spoken = [];
    said.split(/\s+/).forEach(function (w) { spoken = spoken.concat(speechPieces(w)); });
    var n = flat.length, m = spoken.length, dp = [];
    for (var a = 0; a <= n; a++) { dp.push(new Array(m + 1).fill(0)); }
    for (a = n - 1; a >= 0; a--) {
      for (var b = m - 1; b >= 0; b--) {
        dp[a][b] = flat[a].p === spoken[b] ? dp[a + 1][b + 1] + 1 : Math.max(dp[a + 1][b], dp[a][b + 1]);
      }
    }
    a = 0; b = 0;
    while (a < n && b < m) {
      if (flat[a].p === spoken[b]) { flat[a].ok = true; a++; b++; }
      else if (dp[a + 1][b] >= dp[a][b + 1]) a++;
      else b++;
    }
    var matched = flat.filter(function (f) { return f.ok; }).length;
    return {
      transcript: said,
      score: n ? Math.round((matched / n) * 100) : 0,
      tokens: tokens.map(function (t, i) {
        return { text: t.text, ok: flat.filter(function (f) { return f.i === i; }).every(function (f) { return f.ok; }) };
      }),
    };
  }

  // 打出整句的比對：大小寫、標點、縮寫不影響；5 個字母以上的字差一個字母算小錯字（提醒但不算錯）
  function editDistance1(a, b) {
    if (a === b) return true;
    if (Math.abs(a.length - b.length) > 1) return false;
    var i = 0, j = 0, diff = 0;
    while (i < a.length && j < b.length) {
      if (a[i] === b[j]) { i++; j++; continue; }
      if (++diff > 1) return false;
      if (a.length > b.length) i++;
      else if (b.length > a.length) j++;
      else { i++; j++; }
    }
    return diff + (a.length - i) + (b.length - j) <= 1;
  }

  function compareTyped(target, typed) {
    var tokens = target.split(/\s+/).map(function (text) { return { text: text, pieces: speechPieces(text) }; });
    var flat = [];
    tokens.forEach(function (t, i) { t.pieces.forEach(function (pc) { flat.push({ p: pc, i: i, st: 'miss' }); }); });
    var spoken = [];
    typed.split(/\s+/).forEach(function (w) { spoken = spoken.concat(speechPieces(w)); });
    var near = function (a, b) { return a === b || (a.length >= 5 && editDistance1(a, b)); };
    var n = flat.length, m = spoken.length, dp = [], a, b;
    for (a = 0; a <= n; a++) dp.push(new Array(m + 1).fill(0));
    for (a = n - 1; a >= 0; a--) {
      for (b = m - 1; b >= 0; b--) {
        dp[a][b] = near(flat[a].p, spoken[b]) ? dp[a + 1][b + 1] + 1 : Math.max(dp[a + 1][b], dp[a][b + 1]);
      }
    }
    var usedTyped = 0;
    a = 0; b = 0;
    while (a < n && b < m) {
      if (near(flat[a].p, spoken[b])) { flat[a].st = flat[a].p === spoken[b] ? 'ok' : 'typo'; usedTyped++; a++; b++; }
      else if (dp[a + 1][b] >= dp[a][b + 1]) a++;
      else b++;
    }
    var missing = flat.filter(function (f) { return f.st === 'miss'; }).length;
    var extra = m - usedTyped;
    var typos = flat.filter(function (f) { return f.st === 'typo'; }).length;
    var rank = function (st) { return { miss: 2, typo: 1, ok: 0 }[st]; };
    return {
      missing: missing, extra: extra, typos: typos,
      result: missing + extra === 0 ? 'correct' : missing + extra <= 2 ? 'fuzzy' : 'wrong',
      tokens: tokens.map(function (t, i) {
        var st = 'ok';
        flat.forEach(function (f) { if (f.i === i && rank(f.st) > rank(st)) st = f.st; });
        return { text: t.text, st: st };
      }),
    };
  }

  // 句型裡的替換說法也算對（例如 I'm here on a student visa.）
  function phraseVariants(p) {
    return [p.plain].concat(p.swaps.map(function (sw) { return exPlain(p.en.replace(/\[(.+?)\]/, '[' + sw + ']')); }));
  }

  function gradeTyped(p, typed) {
    var best = null;
    phraseVariants(p).forEach(function (v) {
      var r = compareTyped(v, typed);
      r.target = v;
      var cost = r.missing + r.extra + r.typos / 10;
      if (!best || cost < best.cost) { best = r; best.cost = cost; }
    });
    return best;
  }

  function startShadow() {
    var learned = PHRASES.filter(function (p) { return isLearned(p.id); });
    var pool = learned.length >= 5 ? learned : PHRASES;
    shadow = { ids: shuffle(pool).slice(0, 10).map(function (p) { return p.id; }), idx: 0, result: null, error: null, listening: false, passed: 0, awarded: {} };
    renderShadow();
    window.scrollTo(0, 0);
  }

  function nextShadow() {
    stopListening();
    shadow.idx++;
    shadow.result = null;
    shadow.error = null;
    if (shadow.idx >= shadow.ids.length) shadow.done = true;
    renderShadow();
  }

  function exitShadow() {
    stopListening();
    shadow = null;
    render();
  }

  function stopListening() {
    if (shadow && shadow.rec) {
      try { shadow.rec.abort(); } catch (e) { /* 已經停止 */ }
      shadow.rec = null;
    }
    if (shadow) shadow.listening = false;
  }

  // 開麥克風聽一次：onResult 收到候選結果（最多 maxAlt 個），onEnd 在結束時呼叫，沒聽到東西就帶錯誤訊息
  function listenOnce(maxAlt, onResult, onEnd) {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    var rec = new Recognition();
    rec.lang = state.settings.accent;
    rec.interimResults = false;
    rec.continuous = false;
    rec.maxAlternatives = maxAlt;
    var got = false, error = null;
    rec.onresult = function (e) {
      got = true;
      var alts = [];
      for (var i = 0; i < e.results[0].length; i++) alts.push(e.results[0][i].transcript);
      onResult(alts);
    };
    rec.onerror = function (e) {
      error = e.error === 'not-allowed' || e.error === 'service-not-allowed'
        ? '沒有麥克風權限。iPhone 請到「設定 → Safari → 麥克風」允許；Android 請在 Chrome 的網站設定允許麥克風。'
        : e.error === 'no-speech' ? '沒有聽到聲音，請靠近麥克風再試一次。'
          : '語音辨識發生問題（' + e.error + '），請再試一次。';
    };
    rec.onend = function () { onEnd(rec, got ? null : error || '沒有聽到聲音，請靠近麥克風再試一次。'); };
    try {
      rec.start();
    } catch (err) {
      setTimeout(function () { onEnd(rec, '無法啟動麥克風，請再試一次。'); });
    }
    return rec;
  }

  function startListening() {
    if (!Recognition || !shadow || shadow.listening) return;
    var p = PHRASE_BY_ID[shadow.ids[shadow.idx]];
    shadow.listening = true;
    shadow.result = null;
    shadow.error = null;
    shadow.rec = listenOnce(3, function (alts) {
      var best = bestSpeech(p, alts);
      shadow.result = best;
      var day = dayRec();
      day.answered++;
      save();
      bump('answered', day.answered);
      // 同一句唸過 80 分只算一次經驗值
      if (best.pass && !shadow.awarded[shadow.idx]) {
        shadow.awarded[shadow.idx] = true;
        shadow.passed++;
        gainXp(XP.shadow);
        bump('shadowPass');
      }
    }, function (rec, error) {
      if (!shadow || shadow.rec !== rec) return;
      shadow.listening = false;
      shadow.rec = null;
      if (error) shadow.error = error;
      renderShadow();
    });
    renderShadow();
  }

  // ---------- 看字念出來 ----------
  // 單字：手機回傳的候選結果裡有這個字就算對（多念了 the、a 也沒關係），同音字和英式拼法也算
  var SAY_TRIES = 3;
  var HOMOPHONES = {
    fare: ['fair'], aisle: ['isle', "i'll"], weather: ['whether'], pour: ['poor', 'pore'], leak: ['leek'],
    tax: ['tacks'], cash: ['cache'], sore: ['soar', 'saw'], pain: ['pane'], load: ['lode'], loan: ['lone'],
  };

  function sayEnabled() { return !!Recognition && state.settings.sayQuiz !== false; }

  // 統一大小寫、標點和英式拼法（flavour → flavor、prioritise → prioritize），連字號當成空白
  function sayTokens(text) {
    return text.normalize('NFKC').toLowerCase().replace(/[’‘]/g, "'").replace(/-/g, ' ')
      .replace(/[^a-z' ]/g, ' ').split(/\s+/).filter(Boolean)
      .map(function (t) { return t.length >= 5 ? t.replace(/our$/, 'or').replace(/ourhood$/, 'orhood').replace(/is(e|ed|ing)$/, 'iz$1') : t; });
  }

  function sayWordMatches(word, alts) {
    var targets = [word].concat(HOMOPHONES[word] || []).map(function (t) { return sayTokens(t).join(''); });
    return alts.some(function (alt) {
      var tk = sayTokens(alt);
      // 連續幾個字接起來和目標相同就算（check up = check-up、take away = takeaway）
      for (var i = 0; i < tk.length; i++) {
        var joined = '';
        for (var j = i; j < tk.length && j < i + 3; j++) {
          joined += tk[j];
          if (targets.indexOf(joined) >= 0) return true;
        }
      }
      return false;
    });
  }

  function sayControls(target) {
    var st = session.say || {};
    var h = '';
    if (st.heard && st.heard.length) {
      h += '<p class="hint center">App 聽到的：「' + esc(st.heard[st.heard.length - 1]) + '」</p>' +
        '<p class="spell-warn">' + (st.result && st.result.misses.length ? '「' + esc(st.result.misses.join('、')) + '」沒念清楚' : '還不太對') +
        '，可以先按 🔊 聽一次再念（還有 ' + (SAY_TRIES - st.tries) + ' 次機會）</p>';
    }
    if (st.error) h += '<p class="spell-warn" role="alert">' + esc(st.error) + '</p>';
    if (st.tries >= 1) h += '<div class="center">' + speakBtn(target, true) + '</div>';
    h += '<button class="mic-btn' + (st.listening ? ' on' : '') + '" data-action="say-mic"' + (st.listening ? ' disabled' : '') + '>' +
      (st.listening ? '聆聽中…請開始念' : st.tries ? '🎤 再念一次' : '🎤 按一下開始念') + '</button>' +
      '<p class="hint center">不先聽發音，看著字直接念出來</p>' +
      '<div class="btn-row"><button class="btn" data-action="say-skip">🤫 現在不方便說話</button>' +
      '<button class="btn" data-action="say-giveup">看答案</button></div>';
    return h;
  }

  function sayHeardHtml() {
    var st = session.say;
    if (!st || !st.heard.length) return '';
    return '<p class="hint center">App 聽到的：「' + esc(st.heard[st.heard.length - 1]) + '」' +
      (st.passedOn ? '（第 ' + st.passedOn + ' 次念對）' : '') + '</p>';
  }

  function startSay() {
    if (!Recognition || !session || session.revealed) return;
    var item = currentItem();
    var st = session.say || (session.say = { tries: 0, heard: [], listening: false, result: null, error: null });
    if (st.listening) return;
    st.listening = true;
    st.error = null;
    var passed = false;
    st.rec = listenOnce(item.mode === 'say' ? 5 : 3, function (alts) {
      st.tries++;
      st.heard.push(alts[0] || '');
      if (item.mode === 'say') {
        passed = sayWordMatches(getItem(item.id).word, alts);
      } else {
        st.result = bestSpeech(getItem(item.id), alts);
        passed = st.result.pass;
      }
    }, function (rec, error) {
      if (session !== null && session.say === st && st.rec === rec) {
        st.listening = false;
        st.rec = null;
        if (error) { st.error = error; renderSession(); return; }
        // 前兩次可能是距離、環境音影響，3 次內念對都算對；3 次都沒念對才算錯
        if (passed) {
          st.passedOn = st.tries;
          answer('correct');
        } else if (st.tries >= SAY_TRIES) {
          answer('wrong');
        } else {
          renderSession();
        }
      }
    });
    renderSession();
  }

  function stopSay() {
    var st = session && session.say;
    if (st && st.rec) {
      var rec = st.rec;
      st.rec = null;
      st.listening = false;
      try { rec.abort(); } catch (e) { /* 已經停止 */ }
    }
  }

  // 不方便說話：這一題和這一輪後面的念出來題都換成其他題型，不扣分
  function skipSay() {
    stopSay();
    session.noSpeak = true;
    session.say = null;
    session.q = null;
    for (var i = session.idx; i < session.items.length; i++) {
      var it = session.items[i];
      if (it.mode === 'say' || it.mode === 'p_say') it.mode = resolveMode(it.id, it.mode);
    }
    session.spokenIdx = null;
    renderSession();
  }

  // ---------- 無盡挑戰 ----------
  // 只出學過的單字和句型，3 條命，答對越多題型越難；不影響複習排程，答錯的單字一樣進生字本
  var ENDLESS_LIVES = 3;
  var ENDLESS_MIN = 10;
  var ENDLESS_TIERS = [
    { from: 0, name: '🟢 暖身', words: ['en2zh', 'zh2en'], phrases: ['p_listen', 'p_zh2en'] },
    { from: 10, name: '🟡 進階', words: ['fill', 'listen', 'zh2en'], phrases: ['p_order', 'p_reply', 'p_listen'] },
    { from: 25, name: '🔴 高手', words: ['spell', 'fill', 'say'], phrases: ['p_type', 'p_order', 'p_say'] },
  ];

  function endlessPool() {
    return WORDS.concat(PHRASES).filter(function (x) { return isLearned(x.id); });
  }
  function endlessTier() {
    var t = 0;
    ENDLESS_TIERS.forEach(function (x, i) { if (session.correct >= x.from) t = i; });
    return t;
  }
  function endlessTierProgress() {
    var t = endlessTier();
    var next = ENDLESS_TIERS[t + 1];
    if (!next) return 100;
    return pct(session.correct - ENDLESS_TIERS[t].from, next.from - ENDLESS_TIERS[t].from);
  }

  // 下一題：避開最近出過的 15 個，依目前難度挑題型
  function nextEndlessItem() {
    var recent = session.recent;
    var pool = session.pool.filter(function (x) { return recent.indexOf(x.id) < 0; });
    var it = pickRandom(pool.length ? pool : session.pool);
    recent.push(it.id);
    if (recent.length > Math.min(15, session.pool.length - 1)) recent.shift();
    var tier = ENDLESS_TIERS[endlessTier()];
    var modes = (isPhrase(it.id) ? tier.phrases : tier.words).filter(function (m) { return (m !== 'say' && m !== 'p_say') || sayEnabled(); });
    // 同一個字可能再出現，要讓它重新算一次作答
    delete session.answered[it.id];
    return { type: 'quiz', id: it.id, mode: resolveMode(it.id, pickRandom(modes)) };
  }

  function startEndless() {
    var pool = endlessPool();
    if (pool.length < ENDLESS_MIN) return;
    stopSay();
    // 先放一個暫時的 session，nextEndlessItem 要用到題庫和目前分數
    var extra = { pool: pool, recent: [], lives: ENDLESS_LIVES, prevBest: state.game.endlessBest };
    session = Object.assign({ answered: {}, correct: 0 }, extra);
    var item = nextEndlessItem();
    startSession('endless', [item], false, '無盡挑戰', null, extra);
  }

  function endlessAnswered(result) {
    if (result === 'correct') {
      bump('endlessCorrect');
      if (session.correct > state.game.endlessBest) {
        if (session.prevBest > 0 && !session.toldRecord) { session.toldRecord = true; toast('🏆 打破最高紀錄！'); }
        state.game.endlessBest = session.correct;
        save();
      }
    } else {
      session.lives--;
    }
  }

  function finishEndless() {
    session.finished = true;
    if (session.correct > state.game.endlessBest) { state.game.endlessBest = session.correct; save(); }
  }

  function renderEndlessSummary() {
    var s = session;
    finishEndless();
    var record = s.correct > s.prevBest;
    var h = '<div class="session"><main class="session-body summary">';
    h += '<div class="summary-emoji">' + (record ? '🏆' : '♾️') + '</div>';
    h += '<h1>' + (record ? '新紀錄！' : '挑戰結束') + '</h1>';
    h += '<p class="endless-score"><b>' + s.correct + '</b> 題</p>';
    h += '<p class="hint center">最高紀錄 ' + state.game.endlessBest + ' 題' + (record && s.prevBest ? '（之前是 ' + s.prevBest + ' 題）' : '') + '・最後到達「' + ENDLESS_TIERS[endlessTier()].name + '」</p>';
    if (s.xp) h += '<p class="xp-earned">⭐ 這一輪獲得 ' + s.xp + ' XP</p>';
    if (s.wrongIds.length) {
      h += '<section class="card"><h2>答錯的項目</h2><ul class="word-list">' +
        s.wrongIds.map(function (id) { return isPhrase(id) ? phraseRow(PHRASE_BY_ID[id]) : wordRow(WORD_BY_ID[id]); }).join('') + '</ul></section>';
    }
    h += '<button class="btn primary block" data-action="start-endless">再挑戰一次</button>' +
      '<button class="btn block" data-action="exit">回到練習</button></main></div>';
    $app.innerHTML = h;
  }

  // 練習分頁：學過的單字和句子各挑 5 個（學過的太少就從全部挑），不影響複習排程
  function startSayPractice() {
    var pick = function (list) {
      var learned = list.filter(function (x) { return isLearned(x.id); });
      return shuffle(learned.length >= 5 ? learned : list).slice(0, 5);
    };
    var items = pick(WORDS).map(function (w) { return { type: 'quiz', id: w.id, mode: 'say' }; })
      .concat(pick(PHRASES).map(function (p) { return { type: 'quiz', id: p.id, mode: 'p_say' }; }));
    startSession('free', shuffle(items), false, '看字念出來');
  }

  function renderShadow() {
    var h = '<div class="session"><header class="session-head">' +
      '<button class="icon-btn" data-action="shadow-exit" aria-label="離開">✕</button>' +
      '<div class="progress thin"><div style="width:' + pct(shadow.idx, shadow.ids.length) + '%"></div></div>' +
      '<span class="count">' + Math.min(shadow.idx + 1, shadow.ids.length) + '/' + shadow.ids.length + '</span></header>';
    h += '<main class="session-body">';
    if (shadow.done) {
      h += '<div class="summary"><div class="summary-emoji">🎤</div><h1>口說跟讀完成！</h1>' +
        '<p class="hint center">' + shadow.passed + ' / ' + shadow.ids.length + ' 句念對（' + SHADOW_PASS + ' 分以上，重要的字都清楚）</p>' +
        '<button class="btn primary block" data-action="shadow-exit">回到練習</button></div></main></div>';
      $app.innerHTML = h;
      return;
    }
    var p = PHRASE_BY_ID[shadow.ids[shadow.idx]];
    var r = shadow.result;
    h += '<p class="tag">口說跟讀</p>';
    h += '<div class="prompt"><p class="shadow-target">' +
      (r ? r.tokens.map(function (t) { return '<span class="' + (t.ok ? 'ok' : 'miss') + '">' + esc(t.text) + '</span>'; }).join(' ') : esc(p.plain)) +
      '</p>' + speakBtn(p.plain, true) + '<p class="ex-zh">' + esc(p.zh) + '</p></div>';
    if (!Recognition) {
      h += '<p class="spell-warn">這個瀏覽器不支援語音辨識，可以先聽發音、自己跟著唸。<br>iPhone 請用 Safari 或從主畫面開啟的 App；Android 請用 Chrome。</p>' +
        '<button class="btn primary block" data-action="shadow-next">下一句</button>';
    } else {
      if (r) {
        h += '<div class="shadow-result"><p class="shadow-score ' + (r.pass ? 'ok' : 'ng') + '">' + r.score + ' 分</p>' +
          '<p class="hint center">' + (r.score === 100 ? '完美！每個字都很清楚' : r.pass ? '唸得不錯！紅色的字可以再加強'
            : r.misses.length ? '重要的字沒有被聽清楚：' + esc(r.misses.join('、')) + '，再試一次看看' : '紅色的字沒有被聽清楚，再試一次看看') + '</p>' +
          '<p class="hint center">App 聽到的：「' + esc(r.transcript) + '」</p></div>';
      }
      if (shadow.error) h += '<p class="spell-warn" role="alert">' + esc(shadow.error) + '</p>';
      h += '<button class="mic-btn' + (shadow.listening ? ' on' : '') + '" data-action="shadow-mic"' + (shadow.listening ? ' disabled' : '') + '>' +
        (shadow.listening ? '聆聽中…請開始唸' : r ? '🎤 再唸一次' : '🎤 按一下開始唸') + '</button>' +
        '<p class="hint center">先按 🔊 聽一次，再按麥克風跟著唸</p>' +
        '<button class="btn block" data-action="shadow-next">' + (shadow.idx + 1 < shadow.ids.length ? '下一句' : '完成') + '</button>';
    }
    h += '</main></div>';
    $app.innerHTML = h;
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
    if (isDrill(item.id)) lines.push('題目：' + (it.sentence || it.question));
    if (item.mode === 'p_reply') lines.push('對方說：' + it.q.en);
    if (q && q.options) lines.push('選項：' + q.options.join(' / '));
    if (session.picked) lines.push('我選的：' + session.picked);
    if (item.mode === 'spell') lines.push('我的拼字：' + (session.spellInput || '（未作答）'));
    if (item.mode === 'p_order') lines.push('我的排列：' + session.orderInput);
    if (item.mode === 'p_type') lines.push('我打的：' + (session.typed ? session.typed.input : '（未作答）'));
    if ((item.mode === 'say' || item.mode === 'p_say') && session.say) lines.push('App 聽到的：' + session.say.heard.join(' ｜ '));
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

  // 關掉通知後，接著顯示下一則（點連結時要等瀏覽器先處理完點擊）
  function dismissSheet() {
    var wasNotice = document.querySelector('.sheet-backdrop.notice');
    closeSheet();
    if (wasNotice) render();
  }

  function renderSummary() {
    var s = session;
    if (s.kind === 'endless') { renderEndlessSummary(); return; }
    var total = s.correct + s.wrong;
    var h = '<div class="session"><main class="session-body summary">';
    h += '<div class="summary-emoji">' + (total && s.wrong === 0 ? '🏆' : '🎉') + '</div>';
    h += '<h1>' + esc(s.title) + '完成！</h1>';
    if (s.xp) h += '<p class="xp-earned">⭐ 這一輪獲得 ' + s.xp + ' XP</p>';
    if (total) {
      h += '<section class="tiles">' + tile('✅', s.correct, '答對') + tile('❌', s.wrong, '答錯') +
        tile('🎯', pct(s.correct, total) + '%', '正確率') + tile('🔥', streak() + ' 天', '連續練習') + '</section>';
    }
    if (s.wrongIds.length) {
      h += '<section class="card"><h2>需要加強的項目</h2><ul class="word-list">' +
        s.wrongIds.map(function (id) {
          if (isDrill(id)) return drillRow(DRILL_BY_ID[id]);
          return isPhrase(id) ? phraseRow(PHRASE_BY_ID[id]) : wordRow(WORD_BY_ID[id]);
        }).join('') + '</ul></section>';
    }
    h += '<button class="btn primary block" data-action="exit">回到首頁</button></main></div>';
    $app.innerHTML = h;
  }

  // ---------- 事件 ----------
  document.addEventListener('click', function (e) {
    var closer = e.target.closest('[data-close-sheet]');
    if (closer && (closer.tagName !== 'DIV' || e.target === closer)) {
      // 點連結時不要擋住預設行為，表單才能正常打開
      setTimeout(dismissSheet);
      if (closer.tagName !== 'A') return;
    }
    var copyRaw = e.target.closest('[data-copy-raw]');
    if (copyRaw) {
      copyToClipboard(document.querySelector('.sheet-raw textarea').value, function (ok) {
        copyRaw.textContent = ok ? '已複製 ✓' : '請長按上方文字手動複製';
      });
      return;
    }
    var sheetSpeak = e.target.closest('.sheet [data-speak]');
    if (sheetSpeak) { speak(sheetSpeak.dataset.speak); return; }
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
      practiceSub = null;
      homeSub = null;
      render();
      window.scrollTo(0, 0);
      return;
    }
    if (t.dataset.postcard) {
      var pc = stopById(t.dataset.postcard);
      if (pc) openSheet(postcardHtml(pc.stop) + '<button class="btn primary block" data-close-sheet>關閉</button>', 'postcard-sheet');
      return;
    }
    if (t.dataset.drill) {
      startDrill(t.dataset.drill);
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
      case 'open-journey': homeSub = 'journey'; render(); window.scrollTo(0, 0); break;
      case 'journey-back': homeSub = null; render(); window.scrollTo(0, 0); break;
      case 'open-chest': openChest(); break;
      case 'buy-freeze': buyFreeze(); break;
      case 'open-mistakes': practiceSub = 'mistakes'; render(); window.scrollTo(0, 0); break;
      case 'practice-back': practiceSub = null; render(); window.scrollTo(0, 0); break;
      case 'speak-all': speakQueue(respSpeechList(getItem(currentItem().id), session.q)); break;
      case 'show-text': session.showText = true; renderSession(); break;
      case 'start-shadow': startShadow(); break;
      case 'shadow-mic': startListening(); break;
      case 'start-say': startSayPractice(); break;
      case 'start-endless': startEndless(); break;
      case 'say-mic': startSay(); break;
      case 'say-skip': skipSay(); break;
      case 'say-giveup': stopSay(); answer('wrong'); break;
      case 'shadow-next': nextShadow(); break;
      case 'shadow-exit': exitShadow(); break;
      case 'start-free': {
        var cat = document.getElementById('free-cat').value;
        var mode = document.getElementById('free-mode').value;
        var count = +document.getElementById('free-count').value;
        var onlyLearned = document.getElementById('free-scope').value === 'learned';
        var hasLearned = WORDS.some(function (w) { return isLearned(w.id) && inCat(w, cat); });
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
      case 'give-up': session.spellInput = ''; session.typed = null; answer('wrong'); break;
      case 'export': exportData(); break;
      case 'backup-later': state.settings.backupSnooze = addDays(today(), 7); save(); render(); break;
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
    if (e.target.dataset.form === 'ptype') {
      e.preventDefault();
      var box = document.getElementById('type-input');
      if (!box.value.trim()) return;
      if (looksNonEnglish(box.value)) {
        document.querySelector('.spell-warn').hidden = false;
        box.select();
        return;
      }
      var g = gradeTyped(PHRASE_BY_ID[currentItem().id], box.value);
      g.input = box.value.trim();
      session.typed = g;
      answer(g.result);
      return;
    }
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
    else if (id === 'set-mix') s.toeicMix = +e.target.value;
    else if (id === 'set-accent') s.accent = e.target.value;
    else if (id === 'set-rate') s.rate = +e.target.value;
    else if (id === 'set-auto') s.autoSpeak = e.target.checked;
    else if (id === 'set-say') s.sayQuiz = e.target.checked;
    else if (id === 'set-theme') { s.theme = e.target.value; applyTheme(); }
    else if (id === 'import-file') { importData(e.target.files[0]); return; }
    else return;
    save();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { dismissSheet(); return; }
    if (document.querySelector('.sheet-backdrop')) return;
    if (!session || e.key !== 'Enter') return;
    if (document.activeElement && document.activeElement.id === 'type-input') {
      // 打整句時按 Enter 直接送出，不換行（選字中的 Enter 不算）
      if (!e.isComposing) {
        e.preventDefault();
        document.querySelector('[data-form="ptype"] button[type="submit"]').click();
      }
      return;
    }
    if (document.activeElement && document.activeElement.id === 'spell-input') return;
    var next = document.querySelector('[data-action="next"]');
    if (next) { e.preventDefault(); next.click(); }
  });

  // 備份提醒：學了 30 個以上、超過 30 天沒匯出就在首頁提醒（按「稍後」7 天內不再提醒）
  var BACKUP_DAYS = 30;
  function backupDue() {
    var s = state.settings;
    var learned = Object.keys(state.words).filter(function (id) { return isLearned(id); }).length;
    if (learned < 30) return false;
    if (s.backupSnooze && s.backupSnooze > today()) return false;
    return !s.lastExport || s.lastExport <= addDays(today(), -BACKUP_DAYS);
  }
  function backupCard() {
    if (!backupDue()) return '';
    var s = state.settings;
    return '<section class="card backup-card"><h2>💾 備份一下學習紀錄</h2>' +
      '<p class="hint">' + (s.lastExport ? '上次備份是 ' + s.lastExport + '。' : '你還沒有備份過。') +
      '紀錄只存在這台手機，換手機或清除瀏覽器資料前一定要先匯出。</p>' +
      '<div class="btn-row"><button class="btn primary" data-action="export">立即匯出</button>' +
      '<button class="btn" data-action="backup-later">稍後提醒</button></div></section>';
  }

  function exportData() {
    state.settings.lastExport = today();
    state.settings.backupSnooze = null;
    save();
    setTimeout(render);
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
        state = {
          settings: Object.assign(d.settings, data.settings || {}), words: data.words, daily: data.daily,
          game: Object.assign(defaultGame(), data.game || {}),
        };
        checkCountry();
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
  // 給自動測試使用的內部函式
  window.TOEIC_APP = { scoreSpeech: scoreSpeech, levelInfo: levelInfo, legXp: legXp, gradeTyped: gradeTyped, orderPieces: orderPieces, sayWordMatches: sayWordMatches,
    sayPhrasePasses: function (plain, said) { return bestSpeech(PHRASE_BY_ID['p:' + plain], [said]).pass; },
    currentAnswer: function () { return session && session.q ? session.q.answer : null; } };
  checkCountry();
  // 請瀏覽器把紀錄當成重要資料，空間不足時不要自動清掉（Android Chrome 有效；iPhone 從主畫面開啟本來就不會清）
  if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(function () { /* 不支援 */ });
  render();

  if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
    window.addEventListener('load', function () {
      // updateViaCache: 'none' 讓瀏覽器檢查 sw.js 更新時不使用 HTTP 快取
      navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).catch(function () { /* 離線功能不可用 */ });
    });
  }
})();
