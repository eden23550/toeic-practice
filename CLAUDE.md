# toeic-practice 開發說明

多益單字與出國實用句型（澳洲打工度假）練習 App。純 HTML / CSS / JavaScript 的 PWA，部署在 GitHub Pages（`main` 分支根目錄），沒有建置步驟，也沒有伺服器。

使用者說繁體中文；App 介面、程式註解、commit 以外的說明文件都用繁體中文。

## 檔案

- `js/words.js`：單字庫（12 個分類 × 25 字）
- `js/phrases.js`：句型（10 個情境），格式說明在檔案開頭
- `js/app.js`：所有 App 邏輯與畫面，包在一個 IIFE 裡
- `sw.js`：service worker（網路優先、離線用快取）
- `index.html`：開頭有錯誤紀錄的 inline script，必須放在其他 script 之前
- `tests/`：資料檢查、版本號檢查、E2E 測試
- `docs/requirements.md`：需求與版本規劃，功能有變動時要更新

## 規則

- **改了 App 檔案（index.html、sw.js、manifest、css/、js/、icons/）就要更新版本號**：`js/app.js` 的 `APP_VERSION` 和 `sw.js` 的 `CACHE` 必須一致，不然已安裝的 App 不會換成新版。`package.json` 的 version 也一起改。
- **學習紀錄的相容性**：紀錄存在 localStorage 的 `toeic-practice-v1`，以單字本身（`appointment`）或 `p:` + 句子當作 id。不要改既有單字或句子的文字，否則使用者的進度會對不上；要改的話需要寫轉換程式。
- **詞性填空的干擾選項**：放進該字的每一個例句，文法或意思都必須說不通，避免一題有兩個正確答案。例句中 `[ ]` 標出的形式必須和單字欄位完全相同。
- **情境對話**：同一個情境裡，每句「對方說的話」只能對應一個回答。
- **KK 音標**：新增單字時用 CMUdict 比對重音（`pip install cmudict`）；單音節字不標重音。
- 使用者用 iPhone（從主畫面開啟），朋友用 Android。發音依賴裝置內建的 Web Speech API。

## 測試

```bash
npm install
npm run test:data                                  # 資料格式
npm run test:version                               # 版本號一致
CHROMIUM_PATH=/opt/pw-browsers/chromium npm run test:e2e   # 瀏覽器流程測試（沒有本機 Chromium 就先 npx playwright install chromium）
```

GitHub Actions 會在每個 PR 執行全部測試，並檢查 App 檔案有改動時版本號是否更新。推送前先在本機跑過。
