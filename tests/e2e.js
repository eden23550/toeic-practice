// 用真的瀏覽器（Chromium、手機尺寸）把 App 主要流程跑一遍：
// 每日學習、每種題型、句型、問題回報、錯誤紀錄、重新整理後紀錄還在。
// 執行：npm run test:e2e
// 如果系統已經有 Chromium，可以用 CHROMIUM_PATH 指定路徑，就不用另外下載。
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const root = path.join(__dirname, '..');
const TYPES = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.svg': 'image/svg+xml',
};

// 簡單的靜態檔案伺服器
function serve() {
  const server = http.createServer((req, res) => {
    let file = decodeURIComponent(req.url.split('?')[0]);
    if (file.endsWith('/')) file += 'index.html';
    const full = path.join(root, file);
    if (!full.startsWith(root) || !fs.existsSync(full) || fs.statSync(full).isDirectory()) {
      res.writeHead(404);
      return res.end();
    }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(full)] || 'application/octet-stream' });
    fs.createReadStream(full).pipe(res);
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server)));
}

let passed = 0;
async function step(name, fn) {
  try {
    await fn();
    passed++;
    console.log('  ✓ ' + name);
  } catch (e) {
    console.error('  ✗ ' + name + '\n    ' + e.message.split('\n')[0]);
    throw e;
  }
}
function expect(cond, msg) { if (!cond) throw new Error(msg); }

(async () => {
  const server = await serve();
  const url = `http://127.0.0.1:${server.address().port}/`;
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: url });
  // 模擬語音辨識：測試環境沒有麥克風，假裝使用者唸出 window.__said（預設唸出畫面上的句子）
  await context.addInitScript(() => {
    window.__said = null;
    window.SpeechRecognition = window.webkitSpeechRecognition = class {
      start() {
        setTimeout(() => {
          const target = document.querySelector('.say-target, .shadow-target').textContent.trim();
          const transcript = window.__said || target;
          this.onresult && this.onresult({ results: [[{ transcript, confidence: 0.9 }]] });
          this.onend && this.onend();
        }, 50);
      }
      abort() {}
    };
  });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('pageerror', (e) => consoleErrors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });

  const text = async (sel) => (await page.textContent(sel)).replace(/\s+/g, ' ').trim();

  // 升級、抵達新的一站等通知會蓋住畫面：記下內容後關掉，再繼續原本的點擊
  const notices = [];
  async function closeNotices() {
    for (let i = 0; i < 20; i++) {
      const el = await page.$('.sheet-backdrop.notice');
      if (!el) return;
      notices.push((await el.textContent()).replace(/\s+/g, ' ').trim());
      await page.click('.notice .sheet button[data-close-sheet]', { noNoticeCheck: true });
      await el.waitForElementState('hidden').catch(() => {});
      await page.waitForTimeout(20);
    }
  }
  const rawClick = page.click.bind(page);
  page.click = async (sel, opts = {}) => {
    if (!opts.noNoticeCheck) await closeNotices();
    const { noNoticeCheck, ...rest } = opts;
    return rawClick(sel, rest);
  };

  // 依題型作答一題；correct=false 時故意答錯
  // strict=true 時選擇題也一定照 correct 作答（預設選第一個選項，對錯隨機）
  async function answerCurrent(correct = true, strict = false) {
    const data = await page.evaluate(() => ({ tag: document.querySelector('.tag').textContent }));
    if (await page.$('[data-action="say-mic"]')) {
      // 看字念出來：答錯就連念 3 次錯的（最後算模糊）
      await page.evaluate((c) => { window.__said = c ? null : 'zzz'; }, correct);
      for (let i = 0; i < 3 && !(await page.$('.fb-head')); i++) {
        await page.click('[data-action="say-mic"]');
        await page.waitForFunction(() => document.querySelector('.fb-head') || !document.querySelector('.mic-btn.on'));
      }
      await page.waitForSelector('.fb-head');
      await page.evaluate(() => { window.__said = null; });
    } else if (await page.$('[data-action="show-card"]')) {
      await page.click('[data-action="show-card"]');
      await page.click(correct ? '[data-rate="correct"]' : '[data-rate="wrong"]');
    } else if (await page.$('#spell-input')) {
      await page.fill('#spell-input', correct ? '' : 'zzz');
      if (correct) await page.click('[data-action="give-up"]');
      else await page.press('#spell-input', 'Enter');
    } else if (await page.$('#type-input')) {
      const zh = (await page.textContent('.prompt-zh')).trim();
      const plain = await page.evaluate((zh) => window.PHRASES.find((p) => p.zh === zh).plain, zh);
      await page.fill('#type-input', correct ? plain : 'zzz qqq www xxx');
      await page.press('#type-input', 'Enter');
    } else if (await page.$('[data-action="order-check"]')) {
      // 依句子由左到右，找出開頭吻合的塊（有干擾字，所以不能只看單字有沒有出現）
      const zh = (await page.textContent('.prompt-zh')).trim();
      const plain = await page.evaluate((zh) => window.PHRASES.find((p) => p.zh === zh).plain, zh);
      const pool = await page.$$eval('.order-pool .token', (bs) => bs.map((b) => b.textContent));
      const picks = [];
      let rest = plain;
      const left = pool.map((t, i) => i);
      while (rest) {
        const k = left.findIndex((i) => rest === pool[i] || rest.startsWith(pool[i] + ' '));
        if (k < 0) throw new Error('排不出句子：' + plain + '｜' + pool.join(' / '));
        picks.push(left[k]);
        rest = rest.slice(pool[left[k]].length).trim();
        left.splice(k, 1);
      }
      for (const i of correct ? picks : picks.slice().reverse()) await page.click(`.order-pool .token >> nth=${i}`);
      await page.click('[data-action="order-check"]');
    } else if (await page.$('.option:not([disabled])')) {
      if (strict) {
        const pick = await page.evaluate((c) => {
          const a = window.TOEIC_APP.currentAnswer();
          return [...document.querySelectorAll('.option')].map((o) => o.dataset.option).find((o) => (o === a) === c);
        }, correct);
        await page.click(`.option[data-option="${pick.replace(/"/g, '\\"')}"]`);
      } else {
        await page.click('.option >> nth=0');
      }
    } else if (!(await page.$('[data-action="next"]'))) {
      throw new Error('不知道怎麼回答這一題：' + data.tag);
    }
  }

  async function runSession(max = 200) {
    const tags = new Set();
    for (let i = 0; i < max; i++) {
      if (await page.$('.summary')) return tags;
      tags.add((await text('.tag')).replace(' · 再試一次', ''));
      await answerCurrent();
      await page.click('[data-action="next"]');
    }
    throw new Error('練習沒有在 ' + max + ' 題內結束');
  }

  try {
    console.log('E2E 測試：' + url);
    await page.goto(url);
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    await step('首頁顯示今日單字和句型任務', async () => {
      expect((await text('.today')).includes('15個新字'), '首頁應該有 15 個新字');
      expect((await text('.phrase-today')).includes('5句新句型'), '首頁應該有 5 句新句型');
    });

    await step('完成一輪每日單字學習', async () => {
      await page.click('[data-action="start-daily"]');
      const tags = await runSession();
      expect(tags.has('新單字'), '應該有新單字介紹');
      await page.click('[data-action="exit"]');
      expect((await text('.today')).includes('0個新字'), '學完後新字應該歸零');
    });

    for (const [mode, label] of [['en2zh', '英選中'], ['zh2en', '中選英'], ['fill', '詞性填空'], ['spell', '拼字'], ['listen', '聽力']]) {
      await step(`自由練習：${label}`, async () => {
        await page.click('[data-tab="home"]');
        await page.selectOption('#free-mode', mode);
        await page.selectOption('#free-scope', 'all');
        await page.click('[data-action="start-free"]');
        const tags = await runSession(15);
        expect(tags.has(label), `應該出現「${label}」題型，實際是 ${[...tags].join('、')}`);
        await page.click('[data-action="exit"]');
      });
    }

    await step('拼字：輸入注音會提醒切換鍵盤，全形英文字母算對', async () => {
      await page.click('[data-tab="home"]');
      await page.selectOption('#free-mode', 'spell');
      await page.selectOption('#free-scope', 'all');
      await page.click('[data-action="start-free"]');
      expect((await page.getAttribute('#spell-input', 'inputmode')) === 'email', '拼字輸入框應該請手機顯示英文鍵盤');
      await page.fill('#spell-input', 'ㄜ');
      await page.press('#spell-input', 'Enter');
      expect(await page.isVisible('.spell-warn'), '輸入注音應該出現切換鍵盤的提醒');
      expect(!(await page.$('.fb-head')), '輸入注音不應該被判定答題');
      const zh = (await page.textContent('.prompt-zh')).replace(/^\S+\s/, '').trim();
      const word = await page.evaluate((zh) => window.TOEIC_WORDS.find((w) => w.zh === zh).word, zh);
      // 中文輸入法的全形字母：ａ-ｚ 是 U+FF41 起
      const fullWidth = word.replace(/[a-z]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 97 + 0xFF41));
      await page.fill('#spell-input', fullWidth);
      await page.press('#spell-input', 'Enter');
      expect((await text('.fb-head')).startsWith('✓'), `全形的「${fullWidth}」應該算答對`);
      await page.click('[data-action="exit"]');
    });

    await step('作答後顯示每個選項的意思、音標和發音（答對答錯都展開）', async () => {
      const notes = () => page.$$eval('.option-notes li', (lis) => lis.map((li) => ({
        cls: li.className, main: li.querySelector('b').textContent, text: li.textContent,
      })));
      // 英選中故意答錯：每個中文選項要標出對應的英文字
      await page.click('[data-tab="home"]');
      await page.selectOption('#free-mode', 'en2zh');
      await page.selectOption('#free-scope', 'all');
      await page.click('[data-action="start-free"]');
      const word = (await page.textContent('.prompt-word')).trim();
      const answer = await page.evaluate((w) => window.TOEIC_WORDS.find((x) => x.word === w).zh, word);
      const wrong = await page.$$eval('.option', (os, a) => os.map((o) => o.dataset.option).find((o) => o !== a), answer);
      await page.click(`.option[data-option="${wrong}"]`);
      expect(await page.$('.notes-box[open]'), '答錯時選項解析應該直接展開');
      let list = await notes();
      expect(list.length === 4, '應該列出 4 個選項');
      for (const n of list) {
        // 同一個中文可能對應好幾個字（例如 polite、courteous 都是「有禮貌的」）
        const ws = await page.evaluate((zh) => window.TOEIC_WORDS.filter((x) => x.zh === zh).map((x) => x.word), n.main);
        expect(ws.some((w) => n.text.includes(w)), `「${n.main}」應該標出英文 ${ws.join(' 或 ')}`);
      }
      expect(list.find((n) => n.main === answer).cls === 'right', '正確答案應該標成綠色');
      expect(list.find((n) => n.main === wrong).cls === 'wrong', '選錯的選項應該標成紅色');
      await page.click('[data-action="exit"]');

      // 中選英答對：解析收起來，英文選項標出詞性和中文
      await page.selectOption('#free-mode', 'zh2en');
      await page.click('[data-action="start-free"]');
      const zh = (await page.textContent('.prompt-zh')).replace(/^\S+\s/, '').trim();
      const en = await page.evaluate((zh) => window.TOEIC_WORDS.find((w) => w.zh === zh).word, zh);
      await page.click(`.option[data-option="${en}"]`);
      expect(await page.$('.notes-box[open]'), '答對時也應該直接看到每個選項的意思');
      expect((await page.$$('.option-notes .speak')).length === 4, '每個選項都應該有發音按鈕');
      expect((await page.$$('.option-notes .kk')).length === 4, '每個單字選項都應該有 KK 音標');
      list = await notes();
      for (const n of list) {
        const w = await page.evaluate((word) => window.TOEIC_WORDS.find((x) => x.word === word), n.main);
        expect(n.text.includes(w.zh) && n.text.includes(w.pos), `「${n.main}」應該標出詞性和中文`);
      }
      await page.click('[data-action="exit"]');

      // 詞性填空：每個選項都有詞性
      await page.selectOption('#free-mode', 'fill');
      await page.click('[data-action="start-free"]');
      await page.click('.option >> nth=0');
      list = await notes();
      expect(list.length === (await page.$$('.option')).length, '每個選項都要有解析');
      list.forEach((n) => expect(/(n|v|adj|adv)\./.test(n.text), `「${n.main}」應該標出詞性：${n.text}`));
      await page.click('[data-action="exit"]');
    });

    await step('完成一輪每日句型練習', async () => {
      await page.click('[data-tab="home"]');
      await page.click('[data-action="start-phrases"]');
      const tags = await runSession();
      expect(tags.has('新句型'), '應該有新句型介紹');
      await page.click('[data-action="exit"]');
    });

    await step('句子重組：每句都有干擾字，長句子用片語分組，干擾字不會和句子裡的字重複', async () => {
      const problems = await page.evaluate(() => {
        const bad = [];
        const key = (u) => u.toLowerCase().replace(/[^a-z' ]/g, '');
        window.PHRASES.forEach((p) => {
          for (let r = 0; r < 5; r++) {
            const o = window.TOEIC_APP.orderPieces(p);
            if (o.units.join(' ') !== p.plain) bad.push('分塊後接不回原句：' + p.plain);
            if (o.units.length > 10) bad.push('塊太多：' + p.plain);
            if (!o.extra.length) bad.push('沒有干擾字：' + p.plain);
            const keys = o.units.map(key);
            o.extra.forEach((x) => { if (keys.includes(key(x))) bad.push(`干擾字「${x}」和句子裡的字重複：` + p.plain); });
          }
        });
        return [...new Set(bad)];
      });
      expect(!problems.length, problems.slice(0, 5).join('\n'));
    });

    await step('打出整句的評分：大小寫、標點、縮寫、小錯字不算錯，少字算模糊', async () => {
      const cases = [
        ["No, I don't have anything to declare.", 'no i dont have anything to declare', 'correct'],
        ["No, I don't have anything to declare.", 'No, I do not have anything to declare', 'correct'],
        ["No, I don't have anything to declare.", "No I don't have anythng to declare", 'correct', 1],
        ["No, I don't have anything to declare.", 'No I have anything to declare', 'fuzzy'],
        ["No, I don't have anything to declare.", 'I have nothing', 'wrong'],
        ["I'm here on a working holiday visa.", 'I am here on a student visa', 'correct'],
        ["I'm planning to stay for about a year.", "I'm planning to stay for about a year a year", 'fuzzy'],
        ["I'm planning to stay for about a year.", "I'm planning to stay for about a year or a month", 'wrong'],
      ];
      for (const [target, typed, expected, typos = 0] of cases) {
        const r = await page.evaluate(({ target, typed }) =>
          window.TOEIC_APP.gradeTyped(window.PHRASES.find((p) => p.plain === target), typed), { target, typed });
        expect(r.result === expected && r.typos === typos, `「${typed}」應該是 ${expected}（小錯字 ${typos}），實際是 ${r.result}（小錯字 ${r.typos}）`);
      }
    });

    for (const [type, name] of [['resp', 'Part 2 聽力應答'], ['gram', 'Part 5 文法'], ['col', '搭配詞']]) {
      await step(`多益題型：${name}（答對與答錯都能判斷）`, async () => {
        await page.click('[data-tab="practice"]');
        await page.click(`[data-drill="${type}"]`);
        let right = 0, wrong = 0;
        for (let i = 0; i < 10; i++) {
          expect((await text('.tag')).startsWith(name), `題型標籤應該是「${name}」`);
          if (type === 'resp' && i === 0) {
            expect(!(await page.$('.they-say')), 'Part 2 一開始不應該顯示問句文字');
            await page.click('[data-action="show-text"]');
            expect(await page.$('.they-say'), '按「看文字」後應該顯示問句');
          }
          // 從題庫找出正確答案，交替答對、答錯
          const id = await page.evaluate(() => {
            const s = document.querySelector('.prompt-sentence, .they-say');
            return s ? s.textContent : null;
          });
          const answer = await page.evaluate(({ type, id }) => {
            const ds = window.TOEIC_DRILLS.filter((d) => d.type === type);
            const opts = [...document.querySelectorAll('.option')].map((o) => o.dataset.option);
            const d = ds.find((x) => opts.includes(x.answer) && opts.every((o) => x.choices.includes(o)) &&
              (!id || (x.sentence ? id.replace(/_+/, '___').trim() === x.sentence : id.includes(x.question))));
            return d.answer;
          }, { type, id });
          const pick = i % 2 === 0 ? answer : await page.evaluate((a) =>
            [...document.querySelectorAll('.option')].map((o) => o.dataset.option).find((o) => o !== a), answer);
          await page.click(`.option[data-option="${pick.replace(/"/g, '\\"')}"]`);
          const ok = (await text('.fb-head')).startsWith('✓');
          expect(ok === (i % 2 === 0), `第 ${i + 1} 題判斷錯誤`);
          ok ? right++ : wrong++;
          expect(await page.$('.word-card .note'), '作答後應該顯示解析');
          await page.click('[data-action="next"]');
        }
        expect(await page.$('.summary'), '10 題後應該出現結算畫面');
        await page.click('[data-action="exit"]');
        expect((await text(`[data-drill="${type}"] .scene-num`)).startsWith('10/'), '練習頁應該記錄做過 10 題');
      });
    }

    await step('口說跟讀：唸對、唸錯都能評分', async () => {
      await page.click('[data-tab="practice"]');
      await page.click('[data-action="start-shadow"]');
      await page.click('[data-action="shadow-mic"]');
      await page.waitForSelector('.shadow-score');
      expect((await text('.shadow-score')) === '100 分', '完整唸出句子應該是 100 分，實際是 ' + await text('.shadow-score'));
      await page.evaluate(() => { window.__said = 'hello'; });
      await page.click('[data-action="shadow-mic"]');
      await page.waitForFunction(() => document.querySelector('.shadow-score') && document.querySelector('.shadow-score').textContent !== '100 分');
      expect(await page.$('.shadow-target .miss'), '唸錯時應該用紅色標出沒唸到的字');
      await page.evaluate(() => { window.__said = null; });
      for (let i = 0; i < 10 && !(await page.$('.summary')); i++) await page.click('[data-action="shadow-next"]');
      expect((await text('.summary h1')).includes('口說跟讀完成'), '唸完全部句子後應該出現完成畫面');
      await page.click('[data-action="shadow-exit"]');
    });

    await step('口說評分：縮寫、數字、大小寫與標點不影響分數', async () => {
      const cases = [
        ["I'm planning to stay for about a year.", 'I am planning to stay for about a year', 100],
        ["I'll be about ten minutes late. Sorry about that.", "I'll be about 10 minutes late sorry about that", 100],
        ["Where's the nearest bus stop?", 'where is the nearest bus stop', 100],
        ['Can I try this on?', 'can I buy this one', 60],
        ['Catch you later!', '', 0],
      ];
      for (const [target, said, expected] of cases) {
        const r = await page.evaluate(({ target, said }) => window.TOEIC_APP.scoreSpeech(target, said), { target, said });
        expect(r.score === expected, `「${said}」對「${target}」應該是 ${expected} 分，實際是 ${r.score} 分`);
      }
      const r = await page.evaluate(() => window.TOEIC_APP.scoreSpeech('Can I try this on?', 'can I buy this one'));
      expect(r.tokens.filter((t) => !t.ok).map((t) => t.text).join(' ') === 'try on?', '應該標出沒唸到的 try 和 on?');
    });

    await step('看字念出來：單字比對接受同音字、英式拼法和連字號', async () => {
      const cases = [
        ['fare', ['fair'], true], ['check-up', ['check up'], true], ['flavor', ['flavour'], true],
        ['neighborhood', ['the neighbourhood'], true], ['takeaway', ['take away'], true],
        ['prioritize', ['prioritise'], true], ['schedule', ['the schedule'], true],
        ['tip', ['multiple'], false], ['receipt', ['recipe', 'reset'], false], ['dessert', ['desert'], false],
      ];
      for (const [word, alts, expected] of cases) {
        const r = await page.evaluate(({ word, alts }) => window.TOEIC_APP.sayWordMatches(word, alts), { word, alts });
        expect(r === expected, `「${word}」聽成「${alts.join('、')}」應該${expected ? '' : '不'}算對`);
      }
    });

    await step('句子念出來：重要的字沒聽對就不算過（hospitality 被聽成 security）', async () => {
      const cases = [
        ["I'm going to look for work in hospitality.", "I'm going to look for work in security", false],
        ["I'm going to look for work in hospitality.", 'I am gonna look for work in hospitality', true],
        ["I'm planning to stay for about a year.", "I'm planning to stay for about year", true],
        ['Where can I pick up my luggage?', 'where can I pick up my language', false],
      ];
      for (const [plain, said, expected] of cases) {
        const r = await page.evaluate(({ plain, said }) => window.TOEIC_APP.sayPhrasePasses(plain, said), { plain, said });
        expect(r === expected, `「${said}」對「${plain}」應該${expected ? '' : '不'}算念對`);
      }
    });

    await step('看字念出來：3 次內念對算對、3 次都念錯算錯、不方便說話會換題型', async () => {
      await page.click('[data-tab="practice"]');
      await page.click('[data-action="start-say"]');
      expect((await text('.tag')).startsWith('看'), '應該出現念出來的題目');
      expect(!(await page.$('.prompt .kk')), '作答前不應該顯示 KK 音標');
      expect(!(await page.$('.session-body .speak')), '第一次念之前不應該有發音按鈕');
      // 第 1 題：第一次就念對
      await page.click('[data-action="say-mic"]');
      await page.waitForSelector('.fb-head');
      expect((await text('.fb-head')).startsWith('✓'), '第一次念對應該算答對');
      await page.click('[data-action="next"]');
      // 第 2 題：先念錯，再念對 → 模糊
      await page.evaluate(() => { window.__said = 'zzz'; });
      await page.click('[data-action="say-mic"]');
      await page.waitForSelector('.spell-warn:has-text("還有 2 次機會")');
      expect(await page.$('.session-body .speak'), '念錯一次後應該可以聽發音');
      await page.evaluate(() => { window.__said = null; });
      await page.click('[data-action="say-mic"]');
      await page.waitForSelector('.fb-head');
      expect((await text('.fb-head')).startsWith('✓'), '3 次內念對都算對：' + await text('.fb-head'));
      expect((await text('.session-body')).includes('第 2 次念對'), '應該顯示第幾次念對');
      await page.click('[data-action="next"]');
      // 第 3 題：連念 3 次都不對 → 答錯
      await page.evaluate(() => { window.__said = 'zzz'; });
      for (let k = 0; k < 3; k++) {
        await page.click('[data-action="say-mic"]');
        await page.waitForFunction(() => document.querySelector('.fb-head') || !document.querySelector('.mic-btn.on'));
      }
      await page.waitForSelector('.fb-head');
      await page.evaluate(() => { window.__said = null; });
      expect((await text('.fb-head')).startsWith('✗'), '3 次都念錯應該算錯：' + await text('.fb-head'));
      await page.click('[data-action="next"]');
      // 第 4 題：不方便說話 → 這題和後面的題目都換掉
      await page.click('[data-action="say-skip"]');
      const tags = await runSession(20);
      expect(![...tags].some((t) => t.startsWith('看')), '按了不方便說話後不應該再出念出來的題目：' + [...tags].join('、'));
      await page.click('[data-action="exit"]');
    });

    await step('看字念出來：設定關掉後，複習不會出念出來的題目', async () => {
      await page.click('[data-tab="settings"]');
      await page.uncheck('#set-say');
      await page.evaluate(() => {
        const s = JSON.parse(localStorage.getItem('toeic-practice-v1'));
        const d = new Date(); const t = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
        Object.keys(s.words).filter((k) => !/^[cgl]:/.test(k)).slice(0, 30).forEach((k) => { s.words[k].level = 2; s.words[k].due = t; });
        localStorage.setItem('toeic-practice-v1', JSON.stringify(s));
      });
      await page.reload();
      await page.click('[data-tab="home"]');
      await page.click('[data-action="start-daily"]');
      const tags = await runSession();
      expect(![...tags].some((t) => t.startsWith('看')), '關掉後不應該出念出來的題目：' + [...tags].join('、'));
      await page.click('[data-action="exit"]');
      await page.click('[data-tab="settings"]');
      await page.check('#set-say');
    });

    await step('無盡挑戰：答對越多越難，3 條命用完結束並記錄最高紀錄', async () => {
      await page.click('[data-tab="practice"]');
      expect(await page.isEnabled('[data-action="start-endless"]'), '學過 10 個以上應該可以開始無盡挑戰');
      await page.click('[data-action="start-endless"]');
      expect((await text('.endless-count')).includes('❤️❤️❤️'), '一開始應該有 3 條命');
      expect((await text('.endless-tier')).includes('暖身'), '一開始應該是暖身難度');
      for (let i = 0; i < 10; i++) {
        await answerCurrent(true, true);
        expect((await text('.fb-head')).startsWith('✓'), `第 ${i + 1} 題應該答對：` + await text('.fb-head'));
        await page.click('[data-action="next"]');
      }
      expect((await text('.endless-tier')).includes('進階'), '答對 10 題後應該進到進階難度');
      expect((await text('.endless-count')).includes('🏆 10'), '分數應該是 10');
      for (let i = 0; i < 3; i++) {
        await answerCurrent(false, true);
        expect((await text('.fb-head')).includes('💔'), '答錯應該少一條命：' + await text('.fb-head'));
        await page.click('[data-action="next"]');
      }
      expect((await text('.summary h1')).includes('新紀錄'), '第一次挑戰應該是新紀錄');
      expect((await text('.endless-score')).includes('10'), '結果應該是 10 題');
      await page.click('[data-action="exit"]');
      expect((await text('.endless-card .scene-num')).includes('10'), '練習頁應該顯示最高紀錄 10 題');
      expect((await page.evaluate(() => JSON.parse(localStorage.getItem('toeic-practice-v1')).game.endlessBest)) === 10, '最高紀錄應該存起來');
    });

    await step('生字本移到練習分頁', async () => {
      await page.click('[data-tab="practice"]');
      await page.click('[data-action="open-mistakes"]');
      expect((await text('.page-head h1')) === '生字本', '應該打開生字本');
      await page.click('[data-action="practice-back"]');
      expect(await page.$('[data-drill="gram"]'), '返回後應該回到練習頁');
    });

    await step('句型分頁與情境內容', async () => {
      await page.click('[data-tab="phrases"]');
      expect((await page.$$('.scene-card')).length === 10, '應該有 10 個情境');
      await page.click('[data-scene="housing"]');
      expect((await page.$$('.word-item')).length > 10, '情境裡應該有句子');
      await page.click('[data-action="scene-back"]');
    });

    await step('句子重組：答對與答錯都能判斷', async () => {
      const results = [];
      for (let round = 0; round < 20 && results.length < 2; round++) {
        await page.click('[data-tab="phrases"]');
        await page.click('[data-scene="social"]');
        await page.click('[data-action="scene-practice"]');
        for (let i = 0; i < 10; i++) {
          if ((await text('.tag')).startsWith('句子重組') && results.length < 2) {
            const correct = results.length === 0;
            await answerCurrent(correct);
            results.push([correct, (await text('.fb-head')).startsWith('✓')]);
          } else {
            await answerCurrent();
          }
          await page.click('[data-action="next"]');
        }
        await page.click('[data-action="exit"]');
      }
      expect(results.length === 2, '沒有抽到句子重組題');
      results.forEach(([correct, judged]) => expect(correct === judged, `排${correct ? '對' : '錯'}卻判成${judged ? '對' : '錯'}`));
    });

    await step('打出整句：熟悉的句子會考打字，打錯會標出錯的字', async () => {
      // 讓已學過的句型都變成「熟悉」並且今天到期
      const setLevel = () => page.evaluate(() => {
        const s = JSON.parse(localStorage.getItem('toeic-practice-v1'));
        const d = new Date(); const t = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
        Object.keys(s.words).filter((k) => k.startsWith('p:')).forEach((k) => { s.words[k].level = 3; s.words[k].due = t; });
        localStorage.setItem('toeic-practice-v1', JSON.stringify(s));
      });
      let typedWrong = false, typedRight = false;
      for (let round = 0; round < 6 && !(typedWrong && typedRight); round++) {
        await setLevel();
        await page.reload();
        await page.click('[data-tab="phrases"]');
        await page.click('[data-action="start-phrases"]');
        for (let i = 0; i < 40 && !(await page.$('.summary')); i++) {
          if (await page.$('#type-input')) {
            expect((await page.getAttribute('#type-input', 'autocorrect')) === 'off', '打字框應該關掉自動修正');
            if (!typedWrong) {
              await page.fill('#type-input', 'ㄅㄆㄇ');
              await page.press('#type-input', 'Enter');
              expect(await page.isVisible('.spell-warn'), '打注音應該提醒切換鍵盤');
              await page.fill('#type-input', 'hello there my friend');
              await page.press('#type-input', 'Enter');
              expect((await text('.fb-head')).startsWith('✗'), '亂打應該算錯');
              expect(await page.$('.typed-diff .miss'), '應該標出沒打到的字');
              typedWrong = true;
            } else {
              await answerCurrent(true);
              expect((await text('.fb-head')).startsWith('✓'), '打對應該算對');
              typedRight = true;
            }
          } else {
            await answerCurrent();
          }
          await page.click('[data-action="next"]');
        }
        if (await page.$('[data-action="exit"]')) await page.click('[data-action="exit"]');
      }
      expect(typedWrong && typedRight, '沒有抽到打出整句的題目');
    });

    // 回報視窗：確認表單連結帶入了正確的回報類型、資訊與裝置，手動複製可用，並可關閉
    const FORM_FIELDS = { type: 'entry.1300635232', info: 'entry.441789377', device: 'entry.1426037231' };
    async function checkReportSheet(type, mustInclude) {
      await page.waitForSelector('.sheet');
      const url = new URL(await page.getAttribute('.sheet a.btn', 'href'));
      expect(url.hostname === 'docs.google.com' && url.pathname.startsWith('/forms/'), '回報表單連結不正確：' + url);
      expect(url.searchParams.get(FORM_FIELDS.type) === type, `回報類型應該是「${type}」，實際是「${url.searchParams.get(FORM_FIELDS.type)}」`);
      const info = url.searchParams.get(FORM_FIELDS.info) || '';
      mustInclude.forEach((t) => expect(info.includes(t), `表單資訊缺少「${t}」：` + info.slice(0, 80)));
      expect((url.searchParams.get(FORM_FIELDS.device) || '').includes('App 版本'), '表單應該帶入 App 版本與裝置');
      expect(url.href.length < 8000, '表單網址太長：' + url.href.length);
      await page.click('.sheet-raw summary');
      await page.click('[data-copy-raw]');
      await page.waitForSelector('[data-copy-raw]:has-text("已複製")');
      const clip = await page.evaluate(() => navigator.clipboard.readText());
      expect(clip.includes('App 版本'), '手動複製的內容應該包含裝置資訊');
      await page.click('.sheet button[data-close-sheet]');
      await page.waitForSelector('.sheet-backdrop', { state: 'detached' });
    }

    await step('回報這題：表單自動帶入題目資訊', async () => {
      await page.click('[data-tab="home"]');
      await page.selectOption('#free-mode', 'fill');
      await page.click('[data-action="start-free"]');
      await answerCurrent();
      await page.click('[data-action="report"]');
      await checkReportSheet('題目有問題', ['【題目回報】', '選項：', '正確答案：']);
      await page.click('[data-action="next"]');
      await page.click('[data-action="exit"]');
    });

    await step('錯誤紀錄：抓到錯誤並可帶入回報表單', async () => {
      await page.evaluate(() => setTimeout(() => { throw new Error('e2e-test-error'); }));
      await page.waitForTimeout(100);
      await page.click('[data-tab="settings"]');
      expect((await text('.err-count')) === '1 筆', '應該記錄到 1 筆錯誤');
      await page.click('[data-action="copy-errors"]');
      await checkReportSheet('App 出錯', ['【錯誤紀錄】', 'e2e-test-error']);
      await page.click('[data-action="report-general"]');
      await checkReportSheet(null, []);
      await page.click('[data-action="clear-errors"]');
      expect((await text('.err-count')) === '0 筆', '清除後應該是 0 筆');
    });

    await step('外觀：可切換深色／淺色／跟隨系統，重新開啟後保留', async () => {
      const bg = () => page.evaluate(() => getComputedStyle(document.body).backgroundColor);
      await page.emulateMedia({ colorScheme: 'light' });
      await page.click('[data-tab="settings"]');
      const lightBg = await bg();
      await page.selectOption('#set-theme', 'dark');
      const darkBg = await bg();
      expect(darkBg !== lightBg, '選深色後背景應該變暗');
      expect((await page.getAttribute('html', 'data-theme')) === 'dark', 'html 應該標記 data-theme="dark"');
      await page.reload();
      expect((await page.getAttribute('html', 'data-theme')) === 'dark', '重新開啟後應該保留深色');
      expect((await bg()) === darkBg, '重新開啟後背景應該還是深色');
      // 手機是深色外觀，但使用者選淺色
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.click('[data-tab="settings"]');
      await page.selectOption('#set-theme', 'light');
      expect((await bg()) === lightBg, '手機是深色時選淺色，背景應該是淺色');
      // 跟隨系統
      await page.selectOption('#set-theme', 'auto');
      expect((await page.getAttribute('html', 'data-theme')) === null, '跟隨系統時不應該有 data-theme');
      expect((await bg()) === darkBg, '跟隨系統且手機是深色時，背景應該是深色');
      await page.emulateMedia({ colorScheme: 'light' });
      expect((await bg()) === lightBg, '跟隨系統且手機是淺色時，背景應該是淺色');
    });

    // ---------- 打工度假之旅 ----------
    const readGame = () => page.evaluate(() => JSON.parse(localStorage.getItem('toeic-practice-v1')).game);
    const writeState = (fn) => page.evaluate((src) => {
      const s = JSON.parse(localStorage.getItem('toeic-practice-v1'));
      new Function('s', src)(s);
      localStorage.setItem('toeic-practice-v1', JSON.stringify(s));
    }, fn);

    await step('旅程：第一次打開有說明，練習後得到經驗值、升級並抵達新的一站', async () => {
      expect(notices.some((n) => n.includes('打工度假之旅開始')), '第一次打開應該出現旅程說明');
      expect(notices.some((n) => n.includes('升級！')), '練習一陣子後應該出現升級通知');
      expect(notices.some((n) => n.includes('抵達新的一站')), '練習一陣子後應該抵達新的一站');
      const g = await readGame();
      expect(g.xp > 600, '經驗值應該累積，實際是 ' + g.xp);
      expect(g.postcards.includes('au-airport'), '應該拿到桃園機場的明信片');
      await page.click('[data-tab="home"]');
      expect((await text('.journey-card')).includes('Lv '), '首頁應該顯示等級');
      await page.click('[data-action="open-journey"]');
      expect((await page.$$('.route .stop')).length === 12, '澳洲應該有 12 站');
      await page.click('[data-postcard="au-airport"]');
      expect((await text('.postcard')).includes('桃園機場'), '點已抵達的站應該顯示明信片');
      await page.click('.sheet button[data-close-sheet]', { noNoticeCheck: true });
      expect(!(await page.$('[data-postcard="au-goldcoast"]')), '還沒抵達的站不能看明信片');
      await page.click('[data-action="journey-back"]');
    });

    await step('每日任務：完成三個任務後可以打開寶箱拿里程', async () => {
      // 指定今天的任務：生字本以外都可以用前面的流程完成
      await writeState(`s.game.missions = { date: s.game.missions.date, chestOpened: false, list: [
        { id: 'w_correct', progress: 18, done: false }, { id: 'p_correct', progress: 0, done: false },
        { id: 'd_drill', progress: 0, done: false }] }; s.game.miles = 0;`);
      await page.reload();
      await page.click('[data-tab="home"]');
      expect((await text('.missions')).includes('0 / 3'), '應該有 3 個未完成的任務');
      expect(!(await page.$('[data-action="open-chest"]')), '任務沒完成前不能開寶箱');
      // 單字答對 2 題 → 完成「單字答對 20 題」
      await page.selectOption('#free-mode', 'en2zh');
      await page.selectOption('#free-scope', 'all');
      await page.click('[data-action="start-free"]');
      for (let i = 0; i < 2; i++) {
        const word = (await page.textContent('.prompt-word')).trim();
        const zh = await page.evaluate((w) => window.TOEIC_WORDS.find((x) => x.word === w).zh, word);
        await page.click(`.option[data-option="${zh}"]`);
        expect((await text('.fb-head')).includes('+10 XP'), '答對應該顯示 +10 XP');
        await page.click('[data-action="next"]');
      }
      await page.waitForSelector('.toast:has-text("任務完成")');
      await page.click('[data-action="exit"]');
      expect((await text('.missions')).includes('1 / 3'), '應該完成 1 個任務');
      // 句型答對 10 題、完成一組多益題型
      await writeState(`s.game.missions.list[1].progress = 9;`);
      await page.reload();
      await page.click('[data-tab="phrases"]');
      await page.click('[data-scene="social"]');
      await page.click('[data-action="scene-practice"]');
      for (let i = 0; i < 10 && !(await page.$('.fb-head.ok')); i++) {
        await answerCurrent();
        if (!(await page.$('.fb-head.ok'))) await page.click('[data-action="next"]');
      }
      await page.click('[data-action="exit"]');
      await page.click('[data-tab="practice"]');
      await page.click('[data-drill="col"]');
      for (let i = 0; i < 10; i++) { await answerCurrent(); await page.click('[data-action="next"]'); }
      await page.click('[data-action="exit"]');
      await page.click('[data-tab="home"]');
      expect((await text('.missions')).includes('3 / 3'), '三個任務都應該完成：' + await text('.missions'));
      await page.click('[data-action="open-chest"]');
      await page.waitForSelector('.notice');
      const chest = await text('.notice');
      expect(/旅行寶箱\s*\+\d+ ✈️/.test(chest), '寶箱應該給里程：' + chest);
      await closeNotices();
      const g = await readGame();
      const chestMiles = +chest.match(/\+(\d+) ✈️/)[1];
      expect(chestMiles >= 15 && chestMiles <= 30, '寶箱里程應該在 15～30，實際是 ' + chestMiles);
      expect(g.miles >= 15 + chestMiles, '三個任務加寶箱至少要有 ' + (15 + chestMiles) + ' 里程，實際是 ' + g.miles);
      expect(!(await page.$('[data-action="open-chest"]')), '寶箱只能開一次');
    });

    await step('里程商店：用里程換免死金牌，最多 2 面', async () => {
      await writeState(`s.game.miles = 120; s.game.freezes = 0;`);
      await page.reload();
      await page.click('[data-action="open-journey"]');
      await page.click('[data-action="buy-freeze"]');
      await page.click('[data-action="buy-freeze"]');
      let g = await readGame();
      expect(g.freezes === 2 && g.miles === 20, `應該有 2 面金牌、剩 20 里程，實際是 ${g.freezes} 面、${g.miles} 里程`);
      expect(await page.isDisabled('[data-action="buy-freeze"]'), '持有 2 面後不能再買');
    });

    await step('免死金牌：漏掉一天自動使用，連續天數保住；金牌不夠就中斷', async () => {
      // 假裝前 3 天到前 2 天都有練習，昨天沒練習
      const setup = (freezes) => writeState(`
        const d = (n) => { const x = new Date(); x.setDate(x.getDate() - n); return x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0'); };
        s.daily = {}; s.daily[d(3)] = { newCount: 0, answered: 5, correct: 5, wrong: 0 }; s.daily[d(2)] = { newCount: 0, answered: 5, correct: 5, wrong: 0 };
        s.game.freezes = ${freezes}; s.game.frozen = []; s.game.freezeChecked = null; s.game.notices = [];`);
      await setup(1);
      await page.reload();
      await page.waitForSelector('.notice');
      expect((await text('.notice')).includes('免死金牌生效'), '應該自動使用免死金牌');
      await closeNotices();
      expect((await text('.tiles')).includes('2 天'), '連續天數應該保住 2 天：' + await text('.tiles'));
      expect((await readGame()).freezes === 0, '金牌應該用掉');
      await page.reload();
      expect(!(await page.$('.notice')), '同一天不應該再用一次');
      // 漏掉一天但沒有金牌
      await setup(0);
      await page.reload();
      expect(!(await page.$('.notice')), '沒有金牌時不應該出現通知');
      expect((await text('.tiles')).includes('0 天'), '沒有金牌時連續天數應該中斷');
    });

    await step('旅程：走完澳洲蓋護照章，顯示下一個國家準備中', async () => {
      const total = await page.evaluate(() => { let t = 0; for (let i = 0; i < 11; i++) t += window.TOEIC_APP.legXp(i); return t; });
      await writeState(`s.game.countryXp = ${total - 3};`);
      await page.reload();
      await page.click('[data-tab="home"]');
      await page.selectOption('#free-mode', 'en2zh');
      await page.selectOption('#free-scope', 'all');
      await page.click('[data-action="start-free"]');
      await answerCurrent(); // 答對或答錯都至少 +3，再加上可能的任務經驗值
      await page.click('[data-action="exit"]');
      await page.waitForSelector('.notice');
      await closeNotices();
      expect(notices.some((n) => n.includes('黃金海岸')), '應該抵達最後一站黃金海岸');
      expect(notices.some((n) => n.includes('完成澳洲篇') && n.includes('下一個國家準備中')), '應該完成澳洲篇');
      const g = await readGame();
      expect(g.passport.includes('au'), '護照應該蓋上澳洲的章');
      expect((await text('.journey-card')).includes('下一個國家準備中'), '首頁應該顯示下一個國家準備中');
      await page.click('[data-action="open-journey"]');
      expect(await page.$('.stamp.got'), '護照頁應該有蓋好的章');
      await page.click('[data-action="journey-back"]');
    });

    await step('兩條路線：新字比例選「只學多益」時新字都來自多益核心，單字庫可以依路線篩選', async () => {
      await page.click('[data-tab="settings"]');
      await page.selectOption('#set-mix', '100');
      // 讓今天的新字額度重新開始
      await page.evaluate(() => {
        const s = JSON.parse(localStorage.getItem('toeic-practice-v1'));
        Object.values(s.daily).forEach((d) => { d.newCount = 0; });
        localStorage.setItem('toeic-practice-v1', JSON.stringify(s));
      });
      await page.reload();
      await page.click('[data-tab="home"]');
      await page.click('[data-action="start-daily"]');
      const seen = [];
      for (let i = 0; i < 80 && !(await page.$('.summary')); i++) {
        if (await page.$('.new-tag')) {
          seen.push((await page.textContent('.wc-word')).trim());
          await page.click('[data-action="next"]');
        } else {
          await answerCurrent();
          await page.click('[data-action="next"]');
        }
      }
      expect(seen.length >= 10, '應該有新字介紹：' + seen.length);
      const tracks = await page.evaluate((ws) => ws.map((w) => window.TOEIC_WORDS.find((x) => x.word === w).track), seen);
      expect(tracks.every((t) => t === 'toeic'), '只學多益時新字都應該是多益核心：' + seen.join(', '));
      if (await page.$('[data-action="exit"]')) await page.click('[data-action="exit"]');
      await page.click('[data-tab="settings"]');
      await page.selectOption('#set-mix', '70');
      await page.click('[data-tab="library"]');
      await page.click('[data-cat="track:toeic"]');
      expect((await text('#lib-list .hint')).includes('共 450 個字'), '多益核心應該有 450 個字：' + await text('#lib-list .hint'));
      await page.click('[data-cat="track:life"]');
      expect((await text('#lib-list .hint')).includes('共 150 個字'), '出國生活應該有 150 個字');
      await page.click('[data-cat="all"]');
    });

    await step('備份提醒：學了 30 個以上又沒備份時出現，按「稍後提醒」就收起來', async () => {
      await page.evaluate(() => {
        const s = JSON.parse(localStorage.getItem('toeic-practice-v1'));
        s.settings.lastExport = null; s.settings.backupSnooze = null;
        localStorage.setItem('toeic-practice-v1', JSON.stringify(s));
      });
      await page.reload();
      await page.click('[data-tab="home"]');
      expect(await page.$('.backup-card'), '應該出現備份提醒');
      await page.click('[data-action="backup-later"]');
      expect(!(await page.$('.backup-card')), '按稍後提醒後應該收起來');
      await page.click('[data-tab="settings"]');
      expect((await text('.page')).includes('上次備份：從未備份'), '設定頁應該顯示上次備份時間');
    });

    await step('其他分頁都能正常顯示', async () => {
      for (const tab of ['practice', 'library', 'stats', 'settings']) {
        await page.click(`[data-tab="${tab}"]`);
        expect((await text('.page')).length > 20, `${tab} 分頁是空的`);
      }
    });

    await step('重新整理後紀錄還在', async () => {
      await page.reload();
      expect(!/(^|\D)0 \/ \d+/.test(await text('.tiles')), '已學單字應該保留：' + await text('.tiles'));
    });

    const unexpected = consoleErrors.filter((e) => !e.includes('e2e-test-error'));
    await step('過程中沒有任何錯誤訊息', async () => {
      expect(!unexpected.length, unexpected.join('\n'));
    });

    console.log(`✓ E2E 測試全部通過（${passed} 項）`);
  } catch (e) {
    await page.screenshot({ path: path.join(root, 'e2e-failure.png'), fullPage: true }).catch(() => {});
    console.error('\nE2E 測試失敗，畫面截圖存在 e2e-failure.png');
    process.exitCode = 1;
  } finally {
    await browser.close();
    server.close();
  }
})();
