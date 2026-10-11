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
          const target = document.querySelector('.shadow-target').textContent.trim();
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

  // 依題型作答一題；correct=false 時故意答錯
  async function answerCurrent(correct = true) {
    const data = await page.evaluate(() => ({ tag: document.querySelector('.tag').textContent }));
    if (await page.$('[data-action="show-card"]')) {
      await page.click('[data-action="show-card"]');
      await page.click(correct ? '[data-rate="correct"]' : '[data-rate="wrong"]');
    } else if (await page.$('#spell-input')) {
      await page.fill('#spell-input', correct ? '' : 'zzz');
      if (correct) await page.click('[data-action="give-up"]');
      else await page.press('#spell-input', 'Enter');
    } else if (await page.$('[data-action="order-check"]')) {
      const zh = (await page.textContent('.prompt-zh')).trim();
      const tokens = await page.evaluate((zh) => window.PHRASES.find((p) => p.zh === zh).plain.split(' '), zh);
      const order = correct ? tokens : tokens.slice().reverse();
      for (const tk of order) {
        await page.evaluate((tk) => {
          const b = [...document.querySelectorAll('.order-pool .token:not(.used)')].find((x) => x.textContent === tk);
          b.click();
        }, tk);
      }
      await page.click('[data-action="order-check"]');
    } else if (await page.$('.option:not([disabled])')) {
      await page.click('.option >> nth=0');
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

    await step('完成一輪每日句型練習', async () => {
      await page.click('[data-tab="home"]');
      await page.click('[data-action="start-phrases"]');
      const tags = await runSession();
      expect(tags.has('新句型'), '應該有新句型介紹');
      await page.click('[data-action="exit"]');
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

    await step('其他分頁都能正常顯示', async () => {
      for (const tab of ['practice', 'library', 'stats', 'settings']) {
        await page.click(`[data-tab="${tab}"]`);
        expect((await text('.page')).length > 20, `${tab} 分頁是空的`);
      }
    });

    await step('重新整理後紀錄還在', async () => {
      await page.reload();
      expect(!(await text('.tiles')).includes('0 / 300'), '已學單字應該保留');
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
