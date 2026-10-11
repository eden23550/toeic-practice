# toeic-practice 開發說明

多益單字與出國實用句型（澳洲打工度假）練習 App。純 HTML / CSS / JavaScript 的 PWA，部署在 GitHub Pages（`main` 分支根目錄），沒有建置步驟，也沒有伺服器。

使用者說繁體中文；App 介面、程式註解、commit 以外的說明文件都用繁體中文。

## 檔案

- `js/words.js`：單字庫（12 個分類 × 25 字）
- `js/phrases.js`：句型（10 個情境），格式說明在檔案開頭
- `js/toeic.js`：多益題型題庫（搭配詞 `c:`、Part 5 文法 `g:`、Part 2 聽力應答 `l:`），第一個選項是正確答案
- `js/journey.js`：打工度假之旅的國家與各站（明信片內容）
- `js/app.js`：所有 App 邏輯與畫面，包在一個 IIFE 裡
- `sw.js`：service worker（網路優先、離線用快取）
- `index.html`：開頭有兩段 inline script，必須放在其他 script 之前：先套用使用者選的外觀（避免閃白），再啟動錯誤紀錄
- `tests/`：資料檢查、版本號檢查、E2E 測試
- `docs/requirements.md`：需求與版本規劃，功能有變動時要更新

## 規則

- **改了 App 檔案（index.html、sw.js、manifest、css/、js/、icons/）就要更新版本號**：`js/app.js` 的 `APP_VERSION` 和 `sw.js` 的 `CACHE` 必須一致，不然已安裝的 App 不會換成新版。`package.json` 的 version 也一起改。
- **學習紀錄的相容性**：紀錄存在 localStorage 的 `toeic-practice-v1`，以單字本身（`appointment`）或 `p:` + 句子當作 id。不要改既有單字或句子的文字，否則使用者的進度會對不上；要改的話需要寫轉換程式。
- **詞性填空的干擾選項**：放進該字的每一個例句，文法或意思都必須說不通，避免一題有兩個正確答案。例句中 `[ ]` 標出的形式必須和單字欄位完全相同。
- **情境對話**：同一個情境裡，每句「對方說的話」只能對應一個回答。
- **多益題型**：每個錯誤選項放進句子都必須說不通（文法錯誤或明顯不自然）。像 take a decision、have a break 這種英式或口語也成立的說法不能當錯誤選項。題目文字就是學習紀錄的 id，不要改既有題目。
- **獎勵制度**（打工度假之旅）存在學習紀錄的 `game` 欄位：經驗值、里程、免死金牌、拿到的明信片（站的 id）、每日任務。站和國家的 id 不要改；新增國家加在 `JOURNEY` 後面，走完前一個國家的使用者會從新國家的第一站出發。經驗值和里程的數字在 `js/app.js` 的 `XP`、`MILES`，改了要同步更新 `docs/requirements.md`。
- **口說跟讀**用 Web Speech API 的 SpeechRecognition，E2E 測試以假的辨識器模擬；評分函式 `scoreSpeech` 透過 `window.TOEIC_APP` 給測試使用。
- **KK 音標**：新增單字時用 CMUdict 比對重音（`pip install cmudict`）；單音節字不標重音。
- 使用者用 iPhone（從主畫面開啟），朋友用 Android。發音依賴裝置內建的 Web Speech API。
- **問題回報**走 Google 表單（`REPORT_FORM_URL`，不需登入，回覆在使用者自己的 Google 帳號），用預先填入連結帶入資訊，各題代號在 `REPORT_FIELDS`。表單的題目或「回報類型」選項文字有改動時，要請使用者到表單的「預先填寫表單」重新取得連結，並更新 `REPORT_FIELDS` 和 `tests/e2e.js` 的 `FORM_FIELDS`。打開表單要用 `<a>` 連結，不要用 `window.open`，iPhone 會擋。

## 測試

```bash
npm install
npm run test:data                                  # 資料格式
npm run test:version                               # 版本號一致
CHROMIUM_PATH=/opt/pw-browsers/chromium npm run test:e2e   # 瀏覽器流程測試（沒有本機 Chromium 就先 npx playwright install chromium）
```

GitHub Actions 會在每個 PR 執行全部測試，並檢查 App 檔案有改動時版本號是否更新。推送前先在本機跑過。
