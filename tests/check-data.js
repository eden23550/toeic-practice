// 檢查單字庫和句型資料的格式，避免出現壞掉或有兩個正確答案的題目。
// 執行：node tests/check-data.js
'use strict';

const path = require('path');

global.window = {};
require(path.join(__dirname, '../js/words.js'));
require(path.join(__dirname, '../js/phrases.js'));

const errors = [];
const fail = (where, msg) => errors.push(`${where}: ${msg}`);

// ---------- 單字 ----------
const POS = ['n.', 'v.', 'adj.', 'adv.'];
const words = window.TOEIC_WORDS;
const wordIds = new Set();

window.TOEIC_CATEGORIES.forEach((cat) => {
  if (!cat.id || !cat.name || !cat.icon) fail(`分類 ${cat.id}`, '缺少 id、name 或 icon');
  if (!cat.words.length) fail(`分類 ${cat.id}`, '沒有任何單字');
});

words.forEach((w) => {
  const where = `單字「${w.word}」`;
  if (wordIds.has(w.id)) fail(where, '重複的單字');
  wordIds.add(w.id);

  ['word', 'kk', 'pos', 'zh', 'col'].forEach((k) => {
    if (typeof w[k] !== 'string' || !w[k].trim()) fail(where, `缺少欄位 ${k}`);
  });
  if (/[\[\]]/.test(w.kk)) fail(where, 'KK 音標不需要加 [ ]，畫面會自動加上');
  if (!w.pos.split('/').every((p) => POS.includes(p))) fail(where, `詞性「${w.pos}」不在 ${POS.join(' ')} 之中`);
  if (![1, 2, 3].includes(w.lvl)) fail(where, '難度必須是 1、2 或 3');

  if (!Array.isArray(w.examples) || w.examples.length < 2) fail(where, '至少要有 2 個例句');
  (w.examples || []).forEach((e, i) => {
    const marks = e.en.match(/\[(.+?)\]/g) || [];
    if (marks.length !== 1) fail(where, `第 ${i + 1} 個例句要剛好用一組 [ ] 標出目標字`);
    else if (marks[0].slice(1, -1).toLowerCase() !== w.word.toLowerCase()) {
      fail(where, `第 ${i + 1} 個例句標出的是「${marks[0]}」，必須和單字本身的形式相同`);
    }
    if (!e.zh || !e.zh.trim()) fail(where, `第 ${i + 1} 個例句缺少中譯`);
  });

  // 詞性填空：沒有適合的干擾選項就留空，有的話至少 2 個才能出題
  if (!Array.isArray(w.forms)) fail(where, '干擾選項必須是陣列');
  else {
    if (w.forms.length === 1) fail(where, '干擾選項只有 1 個，至少要 2 個（或留空陣列）');
    if (new Set(w.forms).size !== w.forms.length) fail(where, '干擾選項有重複');
    w.forms.forEach((f) => {
      if (f.toLowerCase() === w.word.toLowerCase()) fail(where, `干擾選項「${f}」和答案相同`);
    });
  }
});

// ---------- 句型 ----------
const phrases = window.PHRASES;
const phraseIds = new Set();

window.PHRASE_SCENES.forEach((scene) => {
  const where = `情境 ${scene.id}`;
  if (!scene.id || !scene.name || !scene.icon) fail(where, '缺少 id、name 或 icon');
  if (scene.phrases.length < 4) fail(where, '句子太少，選擇題需要至少 4 句');

  // 情境對話：同一個情境裡，對方說的話不能重複，否則會有兩個正確回答
  const questions = new Map();
  phrases.filter((p) => p.scene === scene.id && p.q).forEach((p) => {
    const key = p.q.en.toLowerCase();
    if (questions.has(key)) fail(where, `「${p.q.en}」對應到兩個回答：「${questions.get(key)}」和「${p.plain}」`);
    questions.set(key, p.plain);
  });
});

phrases.forEach((p) => {
  const where = `句型「${p.plain}」`;
  if (phraseIds.has(p.id)) fail(where, '重複的句子');
  phraseIds.add(p.id);

  if (!p.zh || !p.zh.trim()) fail(where, '缺少中文');
  if (/\s{2,}/.test(p.plain) || p.plain !== p.plain.trim()) fail(where, '有多餘的空白，句子重組題會出錯');
  const marks = p.en.match(/\[/g) || [];
  if (marks.length > 1) fail(where, '最多只能用一組 [ ] 標出可替換的部分');
  if ((p.en.match(/\[/g) || []).length !== (p.en.match(/\]/g) || []).length) fail(where, '[ ] 沒有成對');
  if (p.swaps.length && !marks.length) fail(where, '有替換用法，但句子裡沒有用 [ ] 標出位置');
  if (p.q && (!p.q.en || !p.q.zh)) fail(where, '「對方說的話」要有英文和中文');
});

// ---------- 結果 ----------
if (errors.length) {
  console.error(`資料檢查失敗，共 ${errors.length} 個問題：\n`);
  errors.forEach((e) => console.error('  ✗ ' + e));
  process.exit(1);
}
console.log(`✓ 資料檢查通過：${words.length} 個單字（${words.filter((w) => w.forms.length).length} 個有詞性填空題）、` +
  `${phrases.length} 句句型（${phrases.filter((p) => p.q).length} 句有情境對話題）`);
