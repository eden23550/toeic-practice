# 用 CMUdict 比對 KK 音標的重音位置（npm run check:kk，需要 pip install cmudict）。
# 輸入：JSON [[word, kk], ...]（stdin）；列出可能不一致的項目，常見的兩種念法可以保留。
import json, sys, re, cmudict
d = cmudict.dict()
VOW = set('iɪeɛæɑɔoʊuʌəɚɝ')
def nuclei(s):
    n, i = 0, 0
    while i < len(s):
        c = s[i]
        if c == 'a' and i + 1 < len(s) and s[i+1] in 'ɪʊ': n += 1; i += 2; continue
        if c == 'ɔ' and i + 1 < len(s) and s[i+1] == 'ɪ': n += 1; i += 2; continue
        if c in VOW: n += 1
        elif c == '̩': n += 1
        i += 1
    return n
bad = []
for word, kk in json.load(sys.stdin):
    ws = re.split(r'[ \-]', word)
    ks = re.split(r' ', kk)
    if len(ws) != len(ks):
        # 連字號的字 KK 可能寫在一起；只在空白分隔時逐字比
        ws = word.split(' ')
    if len(ws) != len(ks):
        bad.append((word, kk, '字數和 KK 段數不同')); continue
    for w, k in zip(ws, ks):
        prons = d.get(w.lower().replace('-', ''))
        if not prons: continue
        ok = False; msgs = []
        for p in prons:
            vowels = [ph for ph in p if ph[-1].isdigit()]
            syl = len(vowels)
            prim = [i for i, ph in enumerate(vowels) if ph[-1] == '1']
            kn = nuclei(k.replace('ˋ', '').replace('ˏ', ''))
            if syl == 1:
                good = len(ws) > 1 or ('ˋ' not in k and 'ˏ' not in k)
            else:
                if 'ˋ' not in k: good = (len(ws) > 1 and syl <= 2 and False)
                else:
                    before = nuclei(k.split('ˋ')[0].replace('ˏ', ''))
                    good = bool(prim) and before == prim[0]
            if good and abs(kn - syl) <= 1: ok = True; break
            msgs.append(' '.join(p))
        if not ok: bad.append((word, kk, w + ' CMU: ' + ' | '.join(msgs)))
for b in bad: print(' ｜ '.join(b))
print(f'{len(bad)} 個可能有問題', file=sys.stderr)
