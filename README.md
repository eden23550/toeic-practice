# toeic-practice

多益練習 App，記錄練習情況。目前版本（v0.3）包含**單字訓練**和**出國實用句型**，目標是為出國（澳洲打工度假等）的基本溝通打好基礎。

## 功能

- **300 個單字**，分 12 個生活與職場情境，附 KK 音標、2 個例句、中譯與常用搭配
- **每日學習**：間隔複習（記憶曲線），預設每天 15 個新字
- **六種題型**：英選中、中選英、詞性填空（多益 Part 5 風格）、聽力、拼字、單字卡
- **出國實用句型**：158 句，分 10 個打工度假情境（入境、銀行、租屋、面試、打工、點餐、購物、交通、看醫生、交朋友），附對方可能怎麼說、替換用法與澳洲在地提醒
- **句型題型**：聽句子、中翻英、句子重組、情境對話
- **發音**：美式／澳式／英式口音可切換
- **生字本**：答錯的字自動收集
- **練習紀錄**：連續天數、正確率、近 14 天作答量、各分類表現
- **PWA**：可加到手機主畫面、離線使用

## 使用方式

### 線上使用（GitHub Pages）

1. 到 repo 的 **Settings → Pages**
2. Source 選 **Deploy from a branch**，Branch 選 `main`、資料夾 `/ (root)`，按 Save
3. 約一分鐘後即可開啟 `https://eden23550.github.io/toeic-practice/`
4. 手機用瀏覽器開啟後，選「加入主畫面」，就能像 App 一樣使用

### 在電腦上測試

```bash
python3 -m http.server 8000
```

然後開啟 <http://localhost:8000>。也可以直接用瀏覽器打開 `index.html`，但這樣無法離線使用。

## 回報問題

回報都透過 [Google 表單](https://docs.google.com/forms/d/e/1FAIpQLSfz_i_0iS4KOdqzezJpXvbfaOZkrSCFq2qHggGOqSFeVaitDQ/viewform)，不需要登入：

- **題目有問題**（兩個選項都對、例句怪怪的）：作答後按「🚩 這題怪怪的？回報這題」。
- **App 出錯**：到「設定 → 問題回報」按「複製錯誤紀錄」。
- **其他問題或建議**：到「設定 → 問題回報」按「回報問題或建議」。

App 會先自動複製題目或錯誤資訊，再提供表單連結，在表單的「題目或錯誤資訊」欄貼上即可。有 GitHub 帳號的話，也可以到 [GitHub Issues](https://github.com/eden23550/toeic-practice/issues/new/choose) 回報。

## 測試

```bash
npm install
npm test            # 資料檢查 + 版本號檢查 + 瀏覽器流程測試
```

每個 Pull Request 都會由 GitHub Actions 自動執行測試，沒通過會顯示紅燈。

## 專案結構

```
index.html            頁面入口
css/style.css         樣式（支援深色模式）
js/words.js           單字庫
js/phrases.js         出國實用句型
js/app.js             App 邏輯：複習排程、題目、紀錄、畫面
sw.js                 Service worker（離線快取）
manifest.webmanifest  PWA 設定
docs/requirements.md  需求文件
tests/                自動測試
CLAUDE.md             開發規則（給 AI 助手與開發者）
```

## 新增單字

在 `js/words.js` 對應分類的 `words` 陣列加入一行：

```js
['英文', 'KK 音標', '詞性', '中文', '常用搭配', 難度 1~3, ['詞性填空的干擾選項', ...], [
  ['例句，用 [ ] 標出目標字', '例句中譯'],
  ['第二個例句', '中譯'],
]],
```

干擾選項放進每個例句都必須說不通，避免一題出現兩個正確答案。修改後請同時更新 `js/app.js` 的 `APP_VERSION` 和 `sw.js` 的 `CACHE` 版本號，讓已安裝的使用者拿到新版，並執行 `npm test`。

練習紀錄存在瀏覽器裡，換手機或清除瀏覽器資料前，請先到「設定」匯出備份。
