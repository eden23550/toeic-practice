// 打工度假之旅：每個國家是一章，沿路的每一站抵達時會拿到一張明信片。
// 經驗值累積到一定程度就前進到下一站；走完最後一站，護照蓋上這個國家的章。
//
// 新增國家：在 JOURNEY 後面加一個國家（第一站通常是出發或抵達的機場）。
// 已經走完前面國家的使用者，下次打開 App 會從新國家的第一站開始。
// 站的 id 會存在學習紀錄裡（拿到的明信片），不要改既有的 id。
//
// 每一站：{ id, name, icon, text（明信片內容）, phrase（這一站用得到的英文）, phraseZh }
window.JOURNEY = [
  {
    id: 'au',
    name: '澳洲',
    flag: '🇦🇺',
    title: '第一章：澳洲打工度假',
    stops: [
      {
        id: 'au-taipei', name: '台北', icon: '🧳',
        text: '旅程從這裡開始！台灣護照申請的是澳洲打工度假簽證（subclass 417）。出發前確認簽證、足夠的旅費存款和旅遊保險，護照效期也要夠長。',
        phrase: "I'm going to Australia on a working holiday visa.", phraseZh: '我要用打工度假簽證去澳洲。',
      },
      {
        id: 'au-airport', name: '桃園機場', icon: '✈️',
        text: '從桃園直飛雪梨大約 9 個小時。澳洲對入境的食物檢查很嚴格，肉類、蛋、新鮮蔬果都要在入境卡上誠實申報，沒申報被查到可能會被罰款。',
        phrase: 'I have some food to declare.', phraseZh: '我有一些食物要申報。',
      },
      {
        id: 'au-sydney', name: '雪梨', icon: '🌉',
        text: '歌劇院和港灣大橋就在環形碼頭（Circular Quay）旁邊。搭火車、公車和渡輪可以用 Opal 卡，也可以直接用感應式信用卡刷卡進出站。',
        phrase: 'How do I get to Circular Quay?', phraseZh: '環形碼頭要怎麼去？',
      },
      {
        id: 'au-bluemountains', name: '藍山', icon: '⛰️',
        text: '從雪梨搭火車大約兩個小時。整片山看起來藍藍的，是因為尤加利樹散發的油滴讓陽光散射。回聲角（Echo Point）可以看到著名的三姊妹岩。',
        phrase: 'What a beautiful view!', phraseZh: '風景好美！',
      },
      {
        id: 'au-melbourne', name: '墨爾本', icon: '☕',
        text: '墨爾本是咖啡之都，點咖啡常聽到 flat white、long black。市中心的巷弄藏著很多咖啡店和塗鴉，市區的免費電車區（Free Tram Zone）搭電車不用錢。',
        phrase: 'Can I get a flat white, please?', phraseZh: '可以給我一杯小白咖啡嗎？',
      },
      {
        id: 'au-greatoceanroad', name: '大洋路', icon: '🚗',
        text: '沿著海岸開車可以看到十二使徒岩，雖然叫十二使徒，現在剩下的石柱其實不到十二根。澳洲是靠左行駛，租車自駕要特別注意。',
        phrase: 'Remember to drive on the left.', phraseZh: '記得靠左行駛。',
      },
      {
        id: 'au-adelaide', name: '阿德雷德', icon: '🍇',
        text: '附近的巴羅莎谷（Barossa Valley）是有名的葡萄酒產區，採收季常需要背包客幫忙採葡萄。在偏遠地區做滿 88 天的指定工作，就可以申請第二年簽證。',
        phrase: 'Are you hiring fruit pickers?', phraseZh: '你們有在招採果工嗎？',
      },
      {
        id: 'au-perth', name: '伯斯', icon: '🐾',
        text: '搭船到羅特尼斯島（Rottnest Island）可以看到「世界上最快樂的動物」短尾矮袋鼠（quokka）。牠們很親人，但不能餵食或觸摸，違規會被罰款。',
        phrase: 'Could you take a photo of us?', phraseZh: '可以幫我們拍張照嗎？',
      },
      {
        id: 'au-uluru', name: '烏魯魯', icon: '🪨',
        text: '烏魯魯是原住民阿南古族（Anangu）的聖地，2019 年起禁止攀登。日出和日落時，巨岩的顏色會從橘紅變成深紫色。',
        phrase: 'Please respect the local culture.', phraseZh: '請尊重當地文化。',
      },
      {
        id: 'au-cairns', name: '凱恩斯', icon: '🐠',
        text: '凱恩斯是前往大堡礁的門戶，可以浮潛或潛水看珊瑚礁。夏天是水母季，下海要穿防護衣，或在海灘的防水母網內游泳。',
        phrase: 'Is it safe to swim here?', phraseZh: '這裡游泳安全嗎？',
      },
      {
        id: 'au-brisbane', name: '布里斯本', icon: '🏖️',
        text: '南岸公園（South Bank）有一座人工沙灘，就在市中心河邊，免費開放。搭 CityCat 渡輪沿著布里斯本河，可以看到整座城市。',
        phrase: 'Is this beach free?', phraseZh: '這個海灘是免費的嗎？',
      },
      {
        id: 'au-goldcoast', name: '黃金海岸', icon: '🏄',
        text: '衝浪者天堂（Surfers Paradise）是澳洲篇的最後一站！澳洲海灘要在紅黃旗中間游泳，那是救生員看顧的範圍。恭喜你完成澳洲的旅程！',
        phrase: "Let's swim between the flags.", phraseZh: '我們在旗子中間游泳吧。',
      },
    ],
  },
];
