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

    await step('完成一輪每日句型練習', async () => {
      await page.click('[data-tab="home"]');
      await page.click('[data-action="start-phrases"]');
      const tags = await runSession();
      expect(tags.has('新句型'), '應該有新句型介紹');
      await page.click('[data-action="exit"]');
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

    // 回報視窗：確認已複製、表單連結正確，並可關閉
    async function checkReportSheet(mustInclude) {
      await page.waitForSelector('.sheet-status:has-text("已複製")');
      const clip = await page.evaluate(() => navigator.clipboard.readText());
      mustInclude.forEach((t) => expect(clip.includes(t), `剪貼簿內容缺少「${t}」：` + clip.slice(0, 80)));
      const href = await page.getAttribute('.sheet a.btn', 'href');
      expect(/^https:\/\/docs\.google\.com\/forms\//.test(href), '回報表單連結不正確：' + href);
      await page.click('.sheet button[data-close-sheet]');
      await page.waitForSelector('.sheet-backdrop', { state: 'detached' });
    }

    await step('回報這題：複製題目資訊並提供表單連結', async () => {
      await page.click('[data-tab="home"]');
      await page.selectOption('#free-mode', 'fill');
      await page.click('[data-action="start-free"]');
      await answerCurrent();
      await page.click('[data-action="report"]');
      await checkReportSheet(['【題目回報】', '選項：', 'App 版本']);
      await page.click('[data-action="next"]');
      await page.click('[data-action="exit"]');
    });

    await step('錯誤紀錄：抓到錯誤並可在設定複製', async () => {
      await page.evaluate(() => setTimeout(() => { throw new Error('e2e-test-error'); }));
      await page.waitForTimeout(100);
      await page.click('[data-tab="settings"]');
      expect((await text('.err-count')) === '1 筆', '應該記錄到 1 筆錯誤');
      await page.click('[data-action="copy-errors"]');
      await checkReportSheet(['【錯誤紀錄】', 'e2e-test-error']);
      await page.click('[data-action="report-general"]');
      await checkReportSheet(['【一般回報】', 'App 版本']);
      await page.click('[data-action="clear-errors"]');
      expect((await text('.err-count')) === '0 筆', '清除後應該是 0 筆');
    });

    await step('其他分頁都能正常顯示', async () => {
      for (const tab of ['library', 'mistakes', 'stats', 'settings']) {
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
