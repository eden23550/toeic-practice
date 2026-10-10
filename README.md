# toeic-practice

多益練習 App，記錄練習情況。目前版本（v0.1）專注在**單字訓練**，目標是為出國（澳洲、美國等）的基本溝通打好單字基礎。

## 功能

- **300 個單字**，分 12 個生活與職場情境，附 KK 音標、例句、中譯與常用搭配
- **每日學習**：間隔複習（記憶曲線），預設每天 15 個新字
- **五種題型**：英選中、中選英、例句填空、拼字、單字卡
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

## 專案結構

```
index.html            頁面入口
css/style.css         樣式（支援深色模式）
js/words.js           單字庫
js/app.js             App 邏輯：複習排程、題目、紀錄、畫面
sw.js                 Service worker（離線快取）
manifest.webmanifest  PWA 設定
docs/requirements.md  需求文件
```

## 新增單字

在 `js/words.js` 對應分類的 `words` 陣列加入一行：

```js
['英文', 'KK 音標', '詞性', '中文', '例句，用 [ ] 標出目標字', '例句中譯', '常用搭配', 難度 1~3],
```

修改後請更新 `sw.js` 裡的 `CACHE` 版本號，讓已安裝的使用者拿到新版。

練習紀錄存在瀏覽器裡，換手機或清除瀏覽器資料前，請先到「設定」匯出備份。
