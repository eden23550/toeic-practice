// 修改 App 檔案後請更新版本號，讓使用者拿到新版；要和 js/app.js 的 APP_VERSION 一致（npm test 會檢查）
var CACHE = 'toeic-practice-v0.8.0';
var FILES = [
  './',
  'index.html',
  'css/style.css',
  'js/words.js',
  'js/forms.js',
  'js/phrases.js',
  'js/toeic.js',
  'js/journey.js',
  'js/app.js',
  'manifest.webmanifest',
  'icons/icon.svg',
  'icons/icon-192.png',
  'icons/icon-512.png',
];

self.addEventListener('install', function (e) {
  // cache: 'reload' 略過瀏覽器的 HTTP 快取，確保存進來的是最新檔案
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return c.addAll(FILES.map(function (f) { return new Request(f, { cache: 'reload' }); }));
  }));
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

// 先用網路取得最新版本，離線時改用快取
// cache: 'no-cache' 讓瀏覽器每次都向伺服器確認檔案有沒有更新（GitHub Pages 預設會快取 10 分鐘）
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request, { cache: 'no-cache' }).then(function (res) {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
      return res;
    }).catch(function () {
      return caches.match(e.request, { ignoreSearch: true });
    })
  );
});
