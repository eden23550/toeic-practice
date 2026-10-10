// 檢查版本號：
// 1. js/app.js 的 APP_VERSION 要和 sw.js 的 CACHE 版本號一致
// 2. 如果有提供比較的分支（例如 PR 的目標分支），而 App 檔案有改動，版本號必須更新，
//    否則已安裝在手機上的 App 不會換成新版
// 執行：node tests/check-version.js [比較的分支，例如 origin/main]
'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.join(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const appVersion = (src) => (src.match(/var APP_VERSION = '([^']+)'/) || [])[1];
const swVersion = (src) => (src.match(/var CACHE = 'toeic-practice-v([^']+)'/) || [])[1];

const app = appVersion(read('js/app.js'));
const sw = swVersion(read('sw.js'));

if (!app || !sw) {
  console.error('✗ 找不到版本號：js/app.js 需要 APP_VERSION，sw.js 需要 CACHE');
  process.exit(1);
}
if (app !== sw) {
  console.error(`✗ 版本號不一致：js/app.js 是 ${app}，sw.js 是 ${sw}`);
  process.exit(1);
}

const base = process.argv[2];
if (base) {
  const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' });
  // App 的實際內容；文件、測試、GitHub 設定的改動不需要更新版本號
  const APP_FILES = /^(index\.html|sw\.js|manifest\.webmanifest|css\/|js\/|icons\/)/;
  const changed = git('diff', '--name-only', `${base}...HEAD`).split('\n').filter((f) => APP_FILES.test(f));
  if (changed.length) {
    let baseVersion;
    try { baseVersion = swVersion(git('show', `${base}:sw.js`)); } catch (e) { baseVersion = null; }
    if (baseVersion === sw) {
      console.error(`✗ App 檔案有改動（${changed.join('、')}），但版本號還是 ${sw}。\n` +
        '  請同時更新 js/app.js 的 APP_VERSION 和 sw.js 的 CACHE，已安裝的 App 才會換成新版。');
      process.exit(1);
    }
    console.log(`✓ 版本號已更新：${baseVersion} → ${sw}`);
    process.exit(0);
  }
}
console.log(`✓ 版本號一致：${app}`);
