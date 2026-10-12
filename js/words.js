// 單字庫：每個字的格式為
// [英文, KK 音標, 詞性, 中文, 常用搭配, 難度 1~3, 詞性變化題的干擾選項, [[例句, 中譯], ...]]
// - 例句用 [ ] 標出目標字，形式必須和英文欄位相同
// - 干擾選項放進每個例句都必須說不通，避免一題有兩個答案；沒有適合的就留空陣列
// - 每個分類屬於一條路線（track）：life 出國生活、toeic 多益核心，每日新字依設定的比例從兩條路線挑
window.TOEIC_CATEGORIES = [
  {
    id: 'daily', track: 'life', name: '日常生活', icon: '🏠', words: [
      ['appointment', 'əˋpɔɪntmənt', 'n.', '約會；預約', 'make an appointment', 1, ['appoint', 'appointed'], [
        ['I made an [appointment] to get my hair cut.', '我預約了剪頭髮。'],
        ['Please call us if you need to change your [appointment].', '如果需要更改預約，請打電話給我們。'],
      ]],
      ['schedule', 'ˋskɛdʒʊl', 'n.', '行程；時間表', 'a busy schedule', 1, ['scheduled', 'reschedule'], [
        ['My [schedule] is very busy this week.', '我這週的行程很滿。'],
        ['The bus [schedule] is posted at the stop.', '公車時刻表貼在站牌上。'],
      ]],
      ['convenient', 'kənˋvinjənt', 'adj.', '方便的', 'convenient for sb', 1, ['convenience', 'conveniently'], [
        ['Is Friday morning [convenient] for you?', '星期五早上你方便嗎？'],
        ['Online banking is very [convenient] for busy people.', '網路銀行對忙碌的人來說非常方便。'],
      ]],
      ['neighbor', 'ˋnebɚ', 'n.', '鄰居', 'next-door neighbor', 1, ['neighboring', 'neighborly'], [
        ['Our [neighbor] helped us carry the boxes.', '我們的鄰居幫我們搬箱子。'],
        ['My [neighbor] plays loud music every night.', '我的鄰居每天晚上都把音樂放得很大聲。'],
      ]],
      ['errand', 'ˋɛrənd', 'n.', '差事；跑腿', 'run errands', 2, ['errands', 'errant'], [
        ['I need to run an [errand] before lunch.', '午餐前我得去辦點事。'],
        ['Could you do an [errand] for me after work?', '下班後你可以幫我跑個腿嗎？'],
      ]],
      ['recycle', 'riˋsaɪkl̩', 'v.', '回收', 'recycle paper', 1, ['recycling', 'recycled', 'recyclable'], [
        ['Please [recycle] the bottles in the blue bin.', '請把瓶子回收到藍色桶子裡。'],
        ['It is easy to [recycle] paper and glass.', '紙類和玻璃很容易回收。'],
      ]],
      ['garbage', 'ˋgɑrbɪdʒ', 'n.', '垃圾', 'take out the garbage', 1, [], [
        ['We take out the [garbage] on Tuesday night.', '我們星期二晚上倒垃圾。'],
        ["Please don't leave [garbage] in the hallway.", '請不要把垃圾留在走廊上。'],
      ]],
      ['weather', 'ˋwɛðɚ', 'n.', '天氣', 'weather report', 1, [], [
        ['The [weather] in Sydney is warm in December.', '雪梨十二月的天氣很溫暖。'],
        ['Our picnic depends on the [weather].', '我們的野餐要看天氣而定。'],
      ]],
      ['forecast', 'ˋforˏkæst', 'n.', '預報', 'weather forecast', 2, ['forecasted', 'forecasts'], [
        ['The [forecast] says it will rain tomorrow.', '預報說明天會下雨。'],
        ['The [forecast] for tomorrow is sunny and warm.', '明天的天氣預報是晴朗溫暖。'],
      ]],
      ['available', 'əˋveləbl̩', 'adj.', '有空的；可取得的', 'available for', 1, ['availability', 'avail'], [
        ['Are you [available] to talk this afternoon?', '你今天下午有空談一下嗎？'],
        ['Is this jacket [available] in a smaller size?', '這件外套有小一點的尺寸嗎？'],
      ]],
      ['borrow', 'ˋbɑro', 'v.', '借入', 'borrow sth from sb', 1, ['borrowed', 'borrowing', 'borrower'], [
        ['Can I [borrow] your pen for a minute?', '我可以借一下你的筆嗎？'],
        ['You can [borrow] up to five books from the library.', '你最多可以向圖書館借五本書。'],
      ]],
      ['lend', 'lɛnd', 'v.', '借出', 'lend sb sth', 1, ['lent', 'lending', 'lender'], [
        ['Could you [lend] me some money until Friday?', '你可以借我一些錢到星期五嗎？'],
        ['Can you [lend] me your umbrella?', '你可以借我雨傘嗎？'],
      ]],
      ['habit', 'ˋhæbɪt', 'n.', '習慣', 'a good habit', 1, ['habitual', 'habitually'], [
        ['Reading before bed is a good [habit].', '睡前閱讀是個好習慣。'],
        ['Try to make exercise a daily [habit].', '試著把運動變成每天的習慣。'],
      ]],
      ['ordinary', 'ˋɔrdnˏɛrɪ', 'adj.', '平常的；普通的', 'ordinary people', 2, ['ordinarily', 'ordinariness'], [
        ['It was just an [ordinary] day at work.', '那只是平常的一個工作天。'],
        ['He is just an [ordinary] student like me.', '他只是個跟我一樣的普通學生。'],
      ]],
      ['chore', 'tʃor', 'n.', '家務；雜事', 'household chores', 2, [], [
        ['Washing dishes is my least favorite [chore].', '洗碗是我最不喜歡的家事。'],
        ['Cleaning the bathroom is a [chore] nobody likes.', '打掃浴室是沒人喜歡的家事。'],
      ]],
      ['laundry', 'ˋlɔndrɪ', 'n.', '待洗衣物；洗衣', 'do the laundry', 1, [], [
        ['I do my [laundry] every Sunday.', '我每個星期天洗衣服。'],
        ['The hotel offers a [laundry] service for guests.', '飯店為房客提供洗衣服務。'],
      ]],
      ['emergency', 'ɪˋmɝdʒənsɪ', 'n.', '緊急情況', 'emergency exit', 1, [], [
        ['In an [emergency], call 000 in Australia.', '在澳洲遇到緊急情況請撥 000。'],
        ['Use the stairs in case of [emergency].', '緊急情況時請走樓梯。'],
      ]],
      ['polite', 'pəˋlaɪt', 'adj.', '有禮貌的', 'be polite to sb', 1, ['politely', 'politeness'], [
        ['It is [polite] to thank the bus driver.', '向公車司機道謝是有禮貌的。'],
        ['The hotel staff were very [polite] and helpful.', '飯店員工非常有禮貌又樂於助人。'],
      ]],
      ['introduce', 'ˏɪntrəˋdjus', 'v.', '介紹', 'introduce A to B', 1, ['introduction', 'introductory', 'introduced'], [
        ['Let me [introduce] myself.', '讓我自我介紹一下。'],
        ["I'd like to [introduce] you to my manager.", '我想把你介紹給我的經理。'],
      ]],
      ['directions', 'dəˋrɛkʃənz', 'n.', '指路；方向說明', 'give directions', 1, ['directly', 'direct'], [
        ['Could you give me [directions] to the station?', '你可以告訴我怎麼去車站嗎？'],
        ['The hotel website has clear [directions] from the airport.', '飯店網站上有從機場過來的清楚路線說明。'],
      ]],
      ['nearby', 'ˋnɪrˋbaɪ', 'adv.', '在附近', 'live nearby', 1, ['nearly', 'nearness'], [
        ['Is there a supermarket [nearby]?', '附近有超市嗎？'],
        ['We stayed at a hotel [nearby].', '我們住在附近的飯店。'],
      ]],
      ['crowded', 'ˋkraʊdɪd', 'adj.', '擁擠的', 'a crowded place', 1, ['crowd', 'crowds'], [
        ['The train is always [crowded] in the morning.', '早上的火車總是很擠。'],
        ['The beach gets very [crowded] in summer.', '夏天海灘會變得很擁擠。'],
      ]],
      ['quiet', 'ˋkwaɪət', 'adj.', '安靜的', 'keep quiet', 1, ['quite', 'quietly', 'quietness'], [
        ['We live in a [quiet] area.', '我們住在一個安靜的地區。'],
        ['Please be [quiet] in the library.', '在圖書館請保持安靜。'],
      ]],
      ['mention', 'ˋmɛnʃən', 'v.', '提到', 'mention sth to sb', 2, ['mentioned', 'mentioning'], [
        ['Did she [mention] what time she would arrive?', '她有提到她幾點會到嗎？'],
        ["Please don't [mention] this to anyone yet.", '這件事請先別跟任何人提起。'],
      ]],
      ['suggest', 'səˋdʒɛst', 'v.', '建議', 'suggest doing sth', 2, ['suggestion', 'suggested', 'suggestive'], [
        ['May I [suggest] taking the bus instead?', '我可以建議改搭公車嗎？'],
        ['Can you [suggest] a good restaurant nearby?', '你可以推薦附近不錯的餐廳嗎？'],
      ]],
    ],
  },
  {
    id: 'travel', track: 'life', name: '旅遊交通', icon: '✈️', words: [
      ['reservation', 'ˏrɛzɚˋveʃən', 'n.', '預訂', 'make a reservation', 1, ['reserved', 'reserving'], [
        ['I have a [reservation] under the name Chen.', '我有用陳的名字預訂。'],
        ['You can cancel your [reservation] up to 24 hours before.', '你最晚可以在 24 小時前取消預訂。'],
      ]],
      ['passport', 'ˋpæsˏport', 'n.', '護照', 'passport control', 1, [], [
        ['Please show your [passport] at the counter.', '請在櫃檯出示您的護照。'],
        ['My [passport] expires next year.', '我的護照明年到期。'],
      ]],
      ['boarding pass', 'ˋbordɪŋ ˏpæs', 'n.', '登機證', 'show your boarding pass', 1, [], [
        ['You can print your [boarding pass] at the kiosk.', '你可以在自助機台列印登機證。'],
        ['Please have your [boarding pass] ready.', '請準備好您的登機證。'],
      ]],
      ['departure', 'dɪˋpɑrtʃɚ', 'n.', '出發；離境', 'departure gate', 1, ['depart', 'departed'], [
        ['The [departure] time has changed to 10 a.m.', '出發時間改成早上十點了。'],
        ['Please arrive two hours before [departure].', '請在出發前兩小時抵達。'],
      ]],
      ['arrival', 'əˋraɪvl̩', 'n.', '抵達', 'arrival time', 1, ['arrive', 'arrived', 'arriving'], [
        ['Please check the [arrival] board for your flight.', '請查看抵達看板上你的班機。'],
        ['Call me upon your [arrival] in Sydney.', '你抵達雪梨時打電話給我。'],
      ]],
      ['delay', 'dɪˋle', 'v.', '延誤', 'be delayed by', 1, ['delayed', 'delays'], [
        ['Bad weather may [delay] our flight.', '惡劣天氣可能會延誤我們的班機。'],
        ['Heavy traffic might [delay] the bus.', '交通壅塞可能會讓公車誤點。'],
      ]],
      ['destination', 'ˏdɛstəˋneʃən', 'n.', '目的地', 'travel destination', 2, ['destined', 'destine'], [
        ['Our final [destination] is Melbourne.', '我們的最終目的地是墨爾本。'],
        ['Bali is a popular holiday [destination].', '峇里島是熱門的度假地點。'],
      ]],
      ['itinerary', 'aɪˋtɪnəˏrɛrɪ', 'n.', '行程表', 'travel itinerary', 3, [], [
        ['The travel agent sent us the [itinerary].', '旅行社寄給我們行程表了。'],
        ['Please check the [itinerary] before we leave.', '出發前請確認行程表。'],
      ]],
      ['luggage', 'ˋlʌgɪdʒ', 'n.', '行李', 'carry-on luggage', 1, [], [
        ['Each passenger may bring one piece of [luggage].', '每位乘客可攜帶一件行李。'],
        ["Don't leave your [luggage] unattended.", '請勿將行李置於無人看管處。'],
      ]],
      ['customs', 'ˋkʌstəmz', 'n.', '海關', 'go through customs', 2, ['customer', 'customary'], [
        ['We went through [customs] after landing.', '我們降落後通過了海關。'],
        ['It took an hour to clear [customs] at the airport.', '在機場通關花了一小時。'],
      ]],
      ['declare', 'dɪˋklɛr', 'v.', '申報', 'declare goods', 2, ['declaration', 'declared'], [
        ['Do you have anything to [declare]?', '你有任何東西要申報嗎？'],
        ['You must [declare] all food items at the border.', '入境時你必須申報所有食品。'],
      ]],
      ['aisle', 'aɪl', 'n.', '走道', 'aisle seat', 1, ['isle', 'aisles'], [
        ["I'd like an [aisle] seat, please.", '我想要靠走道的座位。'],
        ['The snacks are in [aisle] five.', '零食在第五排走道。'],
      ]],
      ['fare', 'fɛr', 'n.', '車資；票價', 'bus fare', 1, ['fair', 'fares'], [
        ['The bus [fare] is three dollars.', '公車票價是三元。'],
        ['Taxi [fare] is higher at night.', '夜間計程車資比較貴。'],
      ]],
      ['round-trip', 'ˋraʊndˋtrɪp', 'adj.', '來回的', 'round-trip ticket', 1, [], [
        ['A [round-trip] ticket is cheaper.', '來回票比較便宜。'],
        ['How much is a [round-trip] flight to Tokyo?', '到東京的來回機票多少錢？'],
      ]],
      ['transfer', 'trænsˋfɝ', 'v.', '轉乘；轉移', 'transfer to', 2, ['transferred', 'transferring', 'transferable'], [
        ['You need to [transfer] at Central Station.', '你需要在中央車站轉車。'],
        ['You can [transfer] to the airport train here.', '你可以在這裡轉乘機場快線。'],
      ]],
      ['platform', 'ˋplætˏfɔrm', 'n.', '月台', 'on platform 4', 1, [], [
        ['The train leaves from [platform] 4.', '火車從第四月台出發。'],
        ['Please stand behind the yellow line on the [platform].', '請站在月台黃線後方。'],
      ]],
      ['sightseeing', 'ˋsaɪtˏsiɪŋ', 'n.', '觀光', 'go sightseeing', 1, ['sightsee', 'sights'], [
        ['We went [sightseeing] in the city center.', '我們去市中心觀光。'],
        ['We spent the whole day [sightseeing] in Rome.', '我們在羅馬觀光了一整天。'],
      ]],
      ['currency', 'ˋkɝənsɪ', 'n.', '貨幣', 'foreign currency', 2, ['current', 'currently'], [
        ['Where can I exchange foreign [currency]?', '我可以在哪裡兌換外幣？'],
        ['The euro is the [currency] of Spain.', '歐元是西班牙的貨幣。'],
      ]],
      ['exchange', 'ɪksˋtʃendʒ', 'v.', '兌換；交換', 'exchange A for B', 1, ['exchanged', 'exchangeable'], [
        ['I want to [exchange] Taiwan dollars for US dollars.', '我想把台幣換成美金。'],
        ['Can I [exchange] this shirt for a larger size?', '這件襯衫可以換大一號的嗎？'],
      ]],
      ['visa', 'ˋvizə', 'n.', '簽證', 'working holiday visa', 1, [], [
        ['You need a [visa] to work in Australia.', '在澳洲工作需要簽證。'],
        ['My student [visa] is valid for two years.', '我的學生簽證有效期兩年。'],
      ]],
      ['accommodation', 'əˏkɑməˋdeʃən', 'n.', '住宿', 'hotel accommodation', 2, ['accommodate', 'accommodating'], [
        ['The price includes [accommodation] and meals.', '價格包含住宿和餐點。'],
        ['We need to find cheap [accommodation] near the beach.', '我們需要在海邊附近找便宜的住宿。'],
      ]],
      ['tourist', 'ˋtʊrɪst', 'n.', '觀光客', 'tourist attraction', 1, ['tourism', 'touristy'], [
        ['Every [tourist] should visit the Opera House.', '每個觀光客都應該去看雪梨歌劇院。'],
        ['The [tourist] asked me for directions to the museum.', '那位觀光客向我問去博物館的路。'],
      ]],
      ['souvenir', 'ˏsuvəˋnɪr', 'n.', '紀念品', 'souvenir shop', 1, [], [
        ['I bought a [souvenir] for my sister.', '我買了一個紀念品給我妹妹。'],
        ["I'll buy a small [souvenir] for my coworkers.", '我會買個小紀念品給同事。'],
      ]],
      ['commute', 'kəˋmjut', 'v.', '通勤', 'commute to work', 2, ['commuter', 'commuting', 'commuted'], [
        ['It takes me an hour to [commute] to work.', '我通勤上班要花一小時。'],
        ['I prefer to [commute] by bike.', '我比較喜歡騎腳踏車通勤。'],
      ]],
      ['vehicle', 'ˋviɪkl̩', 'n.', '車輛', 'motor vehicle', 2, [], [
        ['Please do not leave your [vehicle] here.', '請勿將車輛停放在此。'],
        ['Electric [vehicle] sales are growing fast.', '電動車的銷量成長很快。'],
      ]],
    ],
  },
  {
    id: 'dining', track: 'life', name: '飲食餐廳', icon: '🍽️', words: [
      ['menu', 'ˋmɛnju', 'n.', '菜單', 'on the menu', 1, [], [
        ['Could we see the [menu], please?', '可以給我們看一下菜單嗎？'],
        ['Is there anything on the [menu] without meat?', '菜單上有沒有不含肉的餐點？'],
      ]],
      ['order', 'ˋɔrdɚ', 'v.', '點餐；訂購', 'place an order', 1, ['ordered', 'orderly'], [
        ['Are you ready to [order]?', '您準備好點餐了嗎？'],
        ["I'd like to [order] a large pizza, please.", '我想點一個大披薩。'],
      ]],
      ['dessert', 'dɪˋzɝt', 'n.', '甜點', 'for dessert', 1, ['desert', 'deserted'], [
        ['Would you like some [dessert]?', '您要來點甜點嗎？'],
        ['We were too full for [dessert].', '我們太飽了，吃不下甜點。'],
      ]],
      ['beverage', 'ˋbɛvərɪdʒ', 'n.', '飲料', 'hot beverage', 2, [], [
        ['The price includes one [beverage].', '價格包含一杯飲料。'],
        ['Hot and cold [beverage] options are available.', '有冷熱飲可以選擇。'],
      ]],
      ['bill', 'bɪl', 'n.', '帳單', 'pay the bill', 1, [], [
        ['Can we have the [bill], please?', '可以給我們帳單嗎？'],
        ['Let me pay the [bill] this time.', '這次讓我付帳。'],
      ]],
      ['tip', 'tɪp', 'n.', '小費', 'leave a tip', 1, [], [
        ['In the US, people usually leave a [tip].', '在美國，人們通常會留小費。'],
        ['A 15 percent [tip] is common in New York.', '在紐約給 15% 的小費很常見。'],
      ]],
      ['vegetarian', 'ˏvɛdʒəˋtɛrɪən', 'adj.', '素食的', 'vegetarian option', 1, ['vegetation', 'vegetarianism'], [
        ['Do you have any [vegetarian] dishes?', '你們有素食餐點嗎？'],
        ['My sister has been [vegetarian] for ten years.', '我姊姊吃素已經十年了。'],
      ]],
      ['allergic', 'əˋlɝdʒɪk', 'adj.', '過敏的', 'be allergic to', 1, ['allergy', 'allergen'], [
        ["I'm [allergic] to peanuts.", '我對花生過敏。'],
        ['Are you [allergic] to any medicine?', '你對任何藥物過敏嗎？'],
      ]],
      ['ingredient', 'ɪnˋgridɪənt', 'n.', '原料；食材', 'fresh ingredients', 2, [], [
        ['Butter is the main [ingredient] in this cake.', '奶油是這個蛋糕的主要材料。'],
        ['Each [ingredient] is listed on the label.', '每種成分都列在標籤上。'],
      ]],
      ['recipe', 'ˋrɛsəpɪ', 'n.', '食譜', 'follow a recipe', 1, ['receipt', 'recipient'], [
        ['Can you share the [recipe] with me?', '你可以分享食譜給我嗎？'],
        ['This [recipe] needs two cups of flour.', '這個食譜需要兩杯麵粉。'],
      ]],
      ['takeaway', 'ˋtekəˏwe', 'n.', '外帶（英澳用法）', 'takeaway coffee', 1, [], [
        ['Is that for dine-in or [takeaway]?', '內用還是外帶？（美式說 to go）'],
        ["Let's just get [takeaway] tonight.", '今晚就叫外帶吧。'],
      ]],
      ['portion', 'ˋporʃən', 'n.', '一份；部分', 'a large portion', 2, ['portioned', 'portions'], [
        ['The [portion] was too large for me.', '那份量對我來說太大了。'],
        ['Kids can order a smaller [portion].', '小朋友可以點比較小的份量。'],
      ]],
      ['flavor', 'ˋflevɚ', 'n.', '口味', 'strong flavor', 1, ['flavored', 'flavorful'], [
        ['Which ice cream [flavor] do you like?', '你喜歡哪種口味的冰淇淋？'],
        ['This tea has a strong [flavor].', '這茶的味道很濃。'],
      ]],
      ['spicy', 'ˋspaɪsɪ', 'adj.', '辣的', 'spicy food', 1, ['spice', 'spiciness'], [
        ['Is this soup very [spicy]?', '這個湯很辣嗎？'],
        ["I can't eat [spicy] food.", '我不能吃辣。'],
      ]],
      ['cater', 'ˋketɚ', 'v.', '承辦宴席；迎合', 'cater for / to', 3, ['caterer', 'catering'], [
        ['A local company will [cater] the party.', '一家本地公司會承辦派對餐點。'],
        ['Who will [cater] the wedding dinner?', '誰會負責婚宴的外燴？'],
      ]],
      ['refreshments', 'rɪˋfrɛʃmənts', 'n.', '茶點；點心飲料', 'serve refreshments', 2, ['refresh', 'refreshed'], [
        ['Light [refreshments] will be served after the talk.', '演講後會提供簡單茶點。'],
        ['[Refreshments] are available in the lobby.', '大廳有提供茶點。'],
      ]],
      ['reserve', 'rɪˋzɝv', 'v.', '預訂；保留', 'reserve a table', 1, ['reservation', 'reserved'], [
        ["I'd like to [reserve] a table for four.", '我想預訂四人桌。'],
        ['You should [reserve] seats early for the concert.', '演唱會的座位你應該早點預訂。'],
      ]],
      ['cuisine', 'kwɪˋzin', 'n.', '菜餚；烹飪風格', 'local cuisine', 2, [], [
        ['This restaurant serves Thai [cuisine].', '這家餐廳供應泰式料理。'],
        ['Melbourne is famous for its Italian [cuisine].', '墨爾本以義大利料理聞名。'],
      ]],
      ['appetizer', 'ˋæpəˏtaɪzɚ', 'n.', '開胃菜', 'order an appetizer', 2, ['appetite', 'appetizing'], [
        ['We shared an [appetizer] before the main course.', '我們在主菜前分享了一道開胃菜。'],
        ['Would you like an [appetizer] before your steak?', '牛排之前要不要來份開胃菜？'],
      ]],
      ['waiter', 'ˋwetɚ', 'n.', '服務生', 'ask the waiter', 1, ['wait', 'waiting'], [
        ['The [waiter] brought us some water.', '服務生幫我們送來了水。'],
        ["Let's ask the [waiter] for the bill.", '我們請服務生結帳吧。'],
      ]],
      ['complimentary', 'ˏkɑmpləˋmɛntərɪ', 'adj.', '免費贈送的', 'complimentary breakfast', 3, ['complementary', 'compliment'], [
        ['Bread is [complimentary] with every meal.', '每份餐點都免費附麵包。'],
        ['Guests receive a [complimentary] breakfast.', '房客可享免費早餐。'],
      ]],
      ['grocery', 'ˋgrosərɪ', 'n.', '食品雜貨', 'grocery shopping', 1, ['groceries', 'grocer'], [
        ['I go to the [grocery] store twice a week.', '我一週去兩次雜貨店。'],
        ['Can you pick up some milk at the [grocery] store?', '你可以去雜貨店買些牛奶嗎？'],
      ]],
      ['nutrition', 'njuˋtrɪʃən', 'n.', '營養', 'nutrition facts', 2, ['nutritious', 'nourish'], [
        ['Good [nutrition] is important for children.', '良好的營養對孩子很重要。'],
        ['The doctor gave me advice on [nutrition].', '醫生給了我營養方面的建議。'],
      ]],
      ['leftover', 'ˋlɛftˏovɚ', 'adj.', '剩下的', 'leftover food', 2, [], [
        ['We had [leftover] pizza for lunch.', '我們午餐吃剩下的披薩。'],
        ['Put the [leftover] rice in the fridge.', '把剩飯放進冰箱。'],
      ]],
      ['pour', 'por', 'v.', '倒；灌', 'pour a drink', 1, ['poured', 'poor'], [
        ['Could you [pour] me a glass of water?', '你可以幫我倒杯水嗎？'],
        ['Please [pour] the sauce over the rice.', '請把醬汁淋在飯上。'],
      ]],
    ],
  },
  {
    id: 'shopping', track: 'life', name: '購物消費', icon: '🛍️', words: [
      ['receipt', 'rɪˋsit', 'n.', '收據', 'keep the receipt', 1, ['receive', 'recipe'], [
        ['Please keep your [receipt].', '請保留您的收據。'],
        ['You need the [receipt] to return the item.', '退貨需要收據。'],
      ]],
      ['refund', 'ˋriˏfʌnd', 'n.', '退款', 'full refund', 1, ['refundable', 'refunded'], [
        ['Can I get a [refund] for this jacket?', '這件外套可以退款嗎？'],
        ['The [refund] will appear on your card in five days.', '退款會在五天內退回你的卡片。'],
      ]],
      ['discount', 'ˋdɪskaʊnt', 'n.', '折扣', 'get a discount', 1, ['discounted', 'discounting'], [
        ['Students get a ten percent [discount].', '學生享有九折優惠。'],
        ['Is there a [discount] for large orders?', '大量訂購有折扣嗎？'],
      ]],
      ['cashier', 'kæˋʃɪr', 'n.', '收銀員', 'pay the cashier', 1, ['cashless', 'cashed'], [
        ['Please pay the [cashier] at the front.', '請到前面向收銀員付款。'],
        ['The [cashier] gave me the wrong change.', '收銀員找錯錢給我。'],
      ]],
      ['purchase', 'ˋpɝtʃəs', 'v.', '購買', 'make a purchase', 2, ['purchased', 'purchasing', 'purchaser'], [
        ['You can [purchase] tickets online.', '你可以在網路上購票。'],
        ['Where can I [purchase] a SIM card?', '我可以在哪裡買 SIM 卡？'],
      ]],
      ['return', 'rɪˋtɝn', 'v.', '退貨；歸還', 'return an item', 1, ['returned', 'returnable', 'returning'], [
        ["I'd like to [return] these shoes.", '我想退這雙鞋子。'],
        ['You can [return] it within 30 days.', '你可以在 30 天內退貨。'],
      ]],
      ['warranty', 'ˋwɔrəntɪ', 'n.', '保固', 'under warranty', 2, ['warranted', 'warranties'], [
        ['The laptop comes with a two-year [warranty].', '這台筆電有兩年保固。'],
        ['The [warranty] covers repairs for one year.', '保固涵蓋一年內的維修。'],
      ]],
      ['affordable', 'əˋfordəbl̩', 'adj.', '負擔得起的；平價的', 'affordable price', 2, ['afford', 'affordably', 'affordability'], [
        ['This shop sells [affordable] clothes.', '這家店賣平價的衣服。'],
        ["It's hard to find [affordable] housing in the city.", '在城市裡很難找到負擔得起的住處。'],
      ]],
      ['expensive', 'ɪkˋspɛnsɪv', 'adj.', '昂貴的', 'too expensive', 1, ['expense', 'expensively'], [
        ['Rent is very [expensive] in Sydney.', '雪梨的房租很貴。'],
        ['This restaurant is too [expensive] for students.', '這間餐廳對學生來說太貴了。'],
      ]],
      ['bargain', 'ˋbɑrgɪn', 'n.', '便宜貨；划算的交易', 'a good bargain', 2, ['bargaining', 'bargained'], [
        ['This coat was a real [bargain].', '這件大衣真的很划算。'],
        ['At that price, the TV is a [bargain].', '那個價格，這台電視很划算。'],
      ]],
      ['customer', 'ˋkʌstəmɚ', 'n.', '顧客', 'customer service', 1, ['customize', 'customary'], [
        ['The [customer] asked for a larger size.', '顧客要求大一點的尺寸。'],
        ['Every [customer] receives a free gift.', '每位顧客都會收到一份免費禮物。'],
      ]],
      ['fit', 'fɪt', 'v.', '合身', 'fit well', 1, ['fitted', 'fitness'], [
        ["These jeans don't [fit] me.", '這條牛仔褲我穿不合身。'],
        ['Does this jacket [fit] you?', '這件外套你穿合身嗎？'],
      ]],
      ['try on', 'traɪ ɑn', 'v.', '試穿', 'try on clothes', 1, [], [
        ['Can I [try on] this shirt?', '我可以試穿這件襯衫嗎？'],
        ['You can [try on] the shoes over there.', '你可以在那邊試穿鞋子。'],
      ]],
      ['checkout', 'ˋtʃɛkˏaʊt', 'n.', '結帳處', 'self-checkout', 1, [], [
        ['There is a long line at the [checkout].', '結帳處排了很長的隊。'],
        ['Please bring your basket to the [checkout].', '請把購物籃拿到結帳處。'],
      ]],
      ['in stock', 'ɪn stɑk', 'adj.', '有庫存的', 'keep in stock', 2, [], [
        ['Is this item [in stock]?', '這個商品有現貨嗎？'],
        ['We will have more sizes [in stock] next week.', '下週會有更多尺寸到貨。'],
      ]],
      ['out of stock', 'aʊt əv stɑk', 'adj.', '缺貨的', 'temporarily out of stock', 2, [], [
        ['Sorry, that model is [out of stock].', '抱歉，那個型號缺貨。'],
        ['The new phone was [out of stock] in two hours.', '新手機兩小時內就賣光了。'],
      ]],
      ['deliver', 'dɪˋlɪvɚ', 'v.', '運送；遞送', 'deliver to', 1, ['delivery', 'delivered'], [
        ['We can [deliver] it to your home tomorrow.', '我們明天可以送到您家。'],
        ['Can you [deliver] the sofa on Saturday?', '沙發可以星期六送來嗎？'],
      ]],
      ['package', 'ˋpækɪdʒ', 'n.', '包裹', 'send a package', 1, ['packaging', 'packed'], [
        ['A [package] arrived for you this morning.', '今天早上有你的包裹。'],
        ["I'm waiting for a [package] from Amazon.", '我在等一個亞馬遜的包裹。'],
      ]],
      ['brand', 'brænd', 'n.', '品牌', 'brand name', 1, ['branded', 'brandy'], [
        ['Which [brand] of phone do you use?', '你用哪個牌子的手機？'],
        ['Nike is a famous sports [brand].', 'Nike 是知名的運動品牌。'],
      ]],
      ['quality', 'ˋkwɑlətɪ', 'n.', '品質', 'high quality', 1, ['qualify', 'qualified'], [
        ['The [quality] of this bag is excellent.', '這個包包的品質很好。'],
        ['Customers care more about [quality] than price.', '顧客重視品質勝過價格。'],
      ]],
      ['compare', 'kəmˋpɛr', 'v.', '比較', 'compare A with B', 1, ['comparison', 'comparable', 'compared'], [
        ["It's smart to [compare] prices online.", '在網路上比價是聰明的做法。'],
        ["Let's [compare] these two phones before we buy.", '買之前我們先比較這兩支手機吧。'],
      ]],
      ['coupon', 'ˋkupɑn', 'n.', '優惠券', 'discount coupon', 1, [], [
        ['Use this [coupon] to save five dollars.', '用這張優惠券可以省五元。'],
        ['This [coupon] can only be used once.', '這張優惠券只能使用一次。'],
      ]],
      ['merchandise', 'ˋmɝtʃənˏdaɪz', 'n.', '商品', 'sell merchandise', 3, ['merchant', 'merchants'], [
        ['All [merchandise] is 20% off today.', '今天所有商品打八折。'],
        ['The store displays its [merchandise] in the window.', '這家店把商品陳列在櫥窗裡。'],
      ]],
      ['valid', 'ˋvælɪd', 'adj.', '有效的', 'valid ID', 2, ['validity', 'validate'], [
        ['This coupon is [valid] until May 31.', '這張優惠券有效期限到 5 月 31 日。'],
        ['Please show a [valid] ID.', '請出示有效的身分證件。'],
      ]],
      ['payment', 'ˋpemənt', 'n.', '付款', 'make a payment', 1, ['payable', 'paid'], [
        ['We accept [payment] by credit card.', '我們接受信用卡付款。'],
        ['[Payment] is due within 14 days.', '款項須在 14 天內付清。'],
      ]],
    ],
  },
  {
    id: 'housing', track: 'life', name: '租屋居住', icon: '🔑', words: [
      ['rent', 'rɛnt', 'n.', '房租', 'pay the rent', 1, ['rented', 'rentable'], [
        ['The [rent] is due on the first of each month.', '房租在每月一號到期。'],
        ['How much is the [rent] for this apartment?', '這間公寓房租多少？'],
      ]],
      ['landlord', 'ˋlændˏlɔrd', 'n.', '房東', 'contact the landlord', 1, [], [
        ['Call the [landlord] if the heater breaks.', '暖氣壞了就打給房東。'],
        ['Our [landlord] lives upstairs.', '我們的房東住在樓上。'],
      ]],
      ['tenant', 'ˋtɛnənt', 'n.', '房客', 'tenant agreement', 2, ['tenancy', 'tenants'], [
        ['The new [tenant] moves in next week.', '新房客下週搬進來。'],
        ['Every [tenant] must follow the building rules.', '每位房客都必須遵守大樓規定。'],
      ]],
      ['lease', 'lis', 'n.', '租約', 'sign a lease', 2, ['leased', 'least'], [
        ['I signed a one-year [lease].', '我簽了一年的租約。'],
        ['The [lease] ends in March.', '租約三月到期。'],
      ]],
      ['deposit', 'dɪˋpɑzɪt', 'n.', '押金；存款', 'security deposit', 1, ['deposited', 'depositing'], [
        ['You will get your [deposit] back when you move out.', '你搬走時會拿回押金。'],
        ["The [deposit] is equal to one month's rent.", '押金等於一個月的房租。'],
      ]],
      ['utilities', 'juˋtɪlətɪz', 'n.', '水電瓦斯等費用', 'pay utilities', 2, ['utilize', 'utilization'], [
        ['Does the rent include [utilities]?', '房租包含水電費嗎？'],
        ['The rent is $800 a month, plus [utilities].', '房租每月 800 元，水電另計。'],
      ]],
      ['furnished', 'ˋfɝnɪʃt', 'adj.', '附家具的', 'fully furnished', 2, ['furniture', 'furnish'], [
        ["I'm looking for a [furnished] apartment.", '我在找附家具的公寓。'],
        ['The room comes [furnished] with a bed and a desk.', '房間附有床和書桌。'],
      ]],
      ['apartment', 'əˋpɑrtmənt', 'n.', '公寓', 'rent an apartment', 1, ['apart', 'apartments'], [
        ['My [apartment] is close to the station.', '我的公寓離車站很近。'],
        ['I share an [apartment] with two friends.', '我和兩個朋友合租一間公寓。'],
      ]],
      ['roommate', 'ˋrumˏmet', 'n.', '室友', 'share with a roommate', 1, [], [
        ['My [roommate] is from Japan.', '我的室友來自日本。'],
        ['My [roommate] and I split the bills.', '我和室友分攤帳單。'],
      ]],
      ['flatmate', 'ˋflætˏmet', 'n.', '室友（英澳用法）', 'looking for a flatmate', 1, [], [
        ['I found a [flatmate] online.', '我在網路上找到了室友。'],
        ['We need a new [flatmate] by next month.', '我們下個月前需要找到新室友。'],
      ]],
      ['move in', 'muv ɪn', 'v.', '搬入', 'move in together', 1, [], [
        ['When can I [move in]?', '我什麼時候可以搬進去？'],
        ['The apartment will be ready to [move in] on May 1.', '公寓 5 月 1 日就可以入住。'],
      ]],
      ['repair', 'rɪˋpɛr', 'v.', '修理', 'repair work', 1, ['repaired', 'repairable'], [
        ['Someone will [repair] the window tomorrow.', '明天會有人來修窗戶。'],
        ['How long will it take to [repair] the heater?', '修好暖氣要多久？'],
      ]],
      ['maintenance', 'ˋmentənəns', 'n.', '維修；保養', 'maintenance fee', 2, ['maintain', 'maintained'], [
        ['The building has a [maintenance] team.', '這棟大樓有維修團隊。'],
        ['The elevator is closed for [maintenance].', '電梯因維修暫停使用。'],
      ]],
      ['plumber', 'ˋplʌmɚ', 'n.', '水管工', 'call a plumber', 2, ['plumbing', 'plumb'], [
        ['We called a [plumber] to fix the sink.', '我們叫了水管工來修水槽。'],
        ['You should call a [plumber] if the toilet is blocked.', '馬桶塞住的話，你應該叫水管工。'],
      ]],
      ['leak', 'lik', 'n.', '漏水；洩漏', 'water leak', 2, ['leaky', 'leaked'], [
        ['There is a [leak] in the bathroom ceiling.', '浴室天花板在漏水。'],
        ['Please report any water [leak] to the office.', '任何漏水請向管理室回報。'],
      ]],
      ['neighborhood', 'ˋnebɚˏhʊd', 'n.', '社區；街坊', 'in the neighborhood', 1, ['neighboring', 'neighborly'], [
        ["It's a safe [neighborhood] for families.", '這是個適合家庭的安全社區。'],
        ['There are many cafes in this [neighborhood].', '這個社區有很多咖啡廳。'],
      ]],
      ['property', 'ˋprɑpɚtɪ', 'n.', '房產；財產', 'rental property', 2, ['proper', 'properly'], [
        ['The [property] has two bedrooms and a garden.', '這間房子有兩間臥室和一個花園。'],
        ['Prices for [property] near the beach are high.', '海邊附近的房價很高。'],
      ]],
      ['real estate', 'ˋriəl ɪsˋtet', 'n.', '房地產', 'real estate agent', 2, [], [
        ['She works for a [real estate] agency.', '她在房地產仲介公司工作。'],
        ['He wants to invest in [real estate].', '他想投資房地產。'],
      ]],
      ['inspect', 'ɪnˋspɛkt', 'v.', '檢查；看房', 'inspect a property', 2, ['inspection', 'inspector'], [
        ['Can I [inspect] the room this weekend?', '我這週末可以去看房間嗎？'],
        ['You should [inspect] the apartment before signing the lease.', '簽租約前你應該先看房。'],
      ]],
      ['spacious', 'ˋspeʃəs', 'adj.', '寬敞的', 'spacious room', 2, ['space', 'spaciously'], [
        ['The living room is bright and [spacious].', '客廳明亮又寬敞。'],
        ['We need a [spacious] car for the trip.', '這趟旅行我們需要一台寬敞的車。'],
      ]],
      ['vacant', 'ˋvekənt', 'adj.', '空著的', 'vacant room', 3, ['vacancy', 'vacate'], [
        ['The apartment has been [vacant] for months.', '這間公寓已經空了好幾個月。'],
        ['Is that seat [vacant]?', '那個位子有人坐嗎？'],
      ]],
      ['renovate', 'ˋrɛnəˏvet', 'v.', '翻修', 'newly renovated', 3, ['renovation', 'renovated'], [
        ['They plan to [renovate] the kitchen.', '他們計畫翻修廚房。'],
        ['It will cost a lot to [renovate] this old house.', '翻修這間老房子會花很多錢。'],
      ]],
      ['appliance', 'əˋplaɪəns', 'n.', '家電用品', 'home appliance', 2, ['apply', 'applicable'], [
        ['Every [appliance] in the kitchen is new.', '廚房裡的每樣家電都是新的。'],
        ['The landlord will repair any broken [appliance].', '房東會修理任何壞掉的家電。'],
      ]],
      ['resident', 'ˋrɛzədənt', 'n.', '居民；住戶', 'local resident', 2, ['reside', 'residential'], [
        ['Every [resident] has a parking space.', '每位住戶都有一個停車位。'],
        ['Only one [resident] complained about the noise.', '只有一位住戶抱怨噪音。'],
      ]],
      ['location', 'loˋkeʃən', 'n.', '位置；地點', 'convenient location', 1, ['locate', 'located'], [
        ['The [location] is perfect for students.', '這個地點對學生來說很理想。'],
        ['The hotel is in a great [location].', '這間飯店的地點很棒。'],
      ]],
    ],
  },
  {
    id: 'health', track: 'life', name: '健康醫療', icon: '🏥', words: [
      ['symptom', 'ˋsɪmptəm', 'n.', '症狀', 'common symptom', 2, ['symptomatic', 'symptoms'], [
        ['A sore throat is a common [symptom] of a cold.', '喉嚨痛是感冒的常見症狀。'],
        ['A high fever is a serious [symptom].', '高燒是嚴重的症狀。'],
      ]],
      ['prescription', 'prɪˋskrɪpʃən', 'n.', '處方', 'fill a prescription', 2, ['prescribe', 'prescribed'], [
        ['You need a [prescription] for this medicine.', '這個藥需要處方。'],
        ['Bring your [prescription] to the pharmacy.', '把處方箋拿去藥局。'],
      ]],
      ['pharmacy', 'ˋfɑrməsɪ', 'n.', '藥局', '24-hour pharmacy', 1, ['pharmaceutical', 'pharmacies'], [
        ['Is there a [pharmacy] open late?', '有開到很晚的藥局嗎？'],
        ['The [pharmacy] is next to the bank.', '藥局在銀行旁邊。'],
      ]],
      ['medicine', 'ˋmɛdəsn̩', 'n.', '藥', 'take medicine', 1, ['medical', 'medically'], [
        ['Take this [medicine] after meals.', '飯後服用這個藥。'],
        ['Keep all [medicine] away from children.', '所有藥品都要放在孩子拿不到的地方。'],
      ]],
      ['fever', 'ˋfivɚ', 'n.', '發燒', 'have a fever', 1, ['feverish', 'fevers'], [
        ['I have a high [fever].', '我發高燒。'],
        ['My son has had a [fever] since last night.', '我兒子從昨晚就開始發燒。'],
      ]],
      ['headache', 'ˋhɛdˏek', 'n.', '頭痛', 'have a headache', 1, [], [
        ['I have a terrible [headache].', '我頭痛得很厲害。'],
        ['Loud music gives me a [headache].', '大聲的音樂讓我頭痛。'],
      ]],
      ['injury', 'ˋɪndʒərɪ', 'n.', '受傷；傷害', 'serious injury', 2, ['injure', 'injured'], [
        ['He missed the game because of an [injury].', '他因為受傷錯過了比賽。'],
        ['Wear a helmet to prevent head [injury].', '戴安全帽以防頭部受傷。'],
      ]],
      ['clinic', 'ˋklɪnɪk', 'n.', '診所', 'medical clinic', 1, ['clinical', 'clinician'], [
        ['The [clinic] opens at 8 a.m.', '診所早上八點開門。'],
        ['There is a small [clinic] near my apartment.', '我家附近有一間小診所。'],
      ]],
      ['insurance', 'ɪnˋʃʊrəns', 'n.', '保險', 'travel insurance', 2, ['insure', 'insured'], [
        ['Does your [insurance] cover dental care?', '你的保險有給付牙科嗎？'],
        ['You should buy travel [insurance] before you go.', '出發前你應該買旅遊保險。'],
      ]],
      ['patient', 'ˋpeʃənt', 'n.', '病人', 'patient record', 1, ['patience', 'patiently'], [
        ['The doctor is seeing another [patient].', '醫生正在看另一位病人。'],
        ['Each [patient] has a private room.', '每位病人都有單人房。'],
      ]],
      ['recover', 'rɪˋkʌvɚ', 'v.', '康復；恢復', 'recover from', 2, ['recovery', 'recovered'], [
        ['It took me a week to [recover] from the flu.', '我花了一週才從流感中康復。'],
        ['Get some rest so you can [recover] quickly.', '多休息才能快點康復。'],
      ]],
      ['exercise', 'ˋɛksɚˏsaɪz', 'v.', '運動', 'regular exercise', 1, ['exercised', 'exercising'], [
        ['I try to [exercise] three times a week.', '我盡量一週運動三次。'],
        ['Doctors say we should [exercise] every day.', '醫生說我們應該每天運動。'],
      ]],
      ['healthy', 'ˋhɛlθɪ', 'adj.', '健康的', 'healthy diet', 1, ['health', 'healthily'], [
        ['Eating vegetables keeps you [healthy].', '吃蔬菜讓你保持健康。'],
        ['She eats a [healthy] breakfast every morning.', '她每天早上都吃健康的早餐。'],
      ]],
      ['dentist', 'ˋdɛntɪst', 'n.', '牙醫', 'go to the dentist', 1, ['dental', 'dentistry'], [
        ['I see the [dentist] twice a year.', '我一年看兩次牙醫。'],
        ['My tooth hurts, so I need to see a [dentist].', '我牙痛，得去看牙醫。'],
      ]],
      ['treatment', 'ˋtritmənt', 'n.', '治療', 'medical treatment', 2, ['treated', 'treatable'], [
        ['The [treatment] worked very well.', '這個治療效果很好。'],
        ['The new [treatment] is expensive but effective.', '這種新療法很貴但很有效。'],
      ]],
      ['check-up', 'ˋtʃɛkˏʌp', 'n.', '健康檢查', 'annual check-up', 1, [], [
        ['I have a [check-up] next Monday.', '我下週一要做健康檢查。'],
        ['You should get a dental [check-up] every six months.', '你應該每六個月做一次牙齒檢查。'],
      ]],
      ['ambulance', 'ˋæmbjələns', 'n.', '救護車', 'call an ambulance', 1, [], [
        ['Call an [ambulance] right away!', '馬上叫救護車！'],
        ['The [ambulance] arrived in ten minutes.', '救護車十分鐘就到了。'],
      ]],
      ['dizzy', 'ˋdɪzɪ', 'adj.', '頭暈的', 'feel dizzy', 1, ['dizzily', 'dizziness'], [
        ['I get [dizzy] when I stand up too fast.', '我站起來太快會頭暈。'],
        ['The heat made me [dizzy].', '高溫讓我頭暈。'],
      ]],
      ['cough', 'kɔf', 'n.', '咳嗽', 'a bad cough', 1, ['coughed', 'coughs'], [
        ['I have had a [cough] for three days.', '我已經咳嗽三天了。'],
        ["I can't sleep because of this bad [cough].", '我咳得很嚴重，睡不著。'],
      ]],
      ['sore', 'sor', 'adj.', '疼痛的', 'sore throat', 1, ['sorely', 'soreness'], [
        ['I have a [sore] throat.', '我喉嚨痛。'],
        ['My legs are [sore] after the hike.', '健行後我的腿很痠。'],
      ]],
      ['pain', 'pen', 'n.', '疼痛', 'back pain', 1, ['painful', 'painfully'], [
        ['Where is the [pain]?', '哪裡痛？'],
        ['Take this pill if the [pain] gets worse.', '如果疼痛加劇就吃這顆藥。'],
      ]],
      ['diagnose', 'ˋdaɪəgˏnoz', 'v.', '診斷', 'be diagnosed with', 3, ['diagnosis', 'diagnostic'], [
        ['The doctor will [diagnose] the problem after the test.', '醫生會在檢查後診斷問題。'],
        ['It is hard to [diagnose] this illness early.', '這種疾病很難早期診斷。'],
      ]],
      ['surgery', 'ˋsɝdʒərɪ', 'n.', '手術', 'have surgery', 2, ['surgical', 'surgically'], [
        ['She needs [surgery] on her knee.', '她的膝蓋需要動手術。'],
        ['After the [surgery], she stayed in the hospital for a week.', '手術後她住院了一個星期。'],
      ]],
      ['stress', 'strɛs', 'n.', '壓力', 'under stress', 1, ['stressful', 'stressed'], [
        ['Too much [stress] can make you sick.', '壓力太大會讓你生病。'],
        ['Yoga helps me reduce [stress].', '瑜伽幫助我減輕壓力。'],
      ]],
      ['physician', 'fɪˋzɪʃən', 'n.', '內科醫師', 'family physician', 3, ['physical', 'physics'], [
        ['Ask your [physician] before taking it.', '服用前請先詢問你的醫師。'],
        ['A [physician] will see you shortly.', '醫師馬上就會為您看診。'],
      ]],
    ],
  },
  {
    id: 'office', track: 'toeic', name: '辦公職場', icon: '💼', words: [
      ['colleague', 'ˋkɑlig', 'n.', '同事', 'work colleague', 1, ['college', 'collegial'], [
        ['My [colleague] will help you with that.', '我的同事會協助你處理。'],
        ['I had lunch with a [colleague] today.', '我今天和一位同事吃午餐。'],
      ]],
      ['supervisor', 'ˋsupɚˏvaɪzɚ', 'n.', '主管', 'direct supervisor', 2, ['supervise', 'supervision'], [
        ['Please ask your [supervisor] for approval.', '請向你的主管申請核准。'],
        ['My [supervisor] approved my vacation.', '我的主管批准了我的休假。'],
      ]],
      ['deadline', 'ˋdɛdˏlaɪn', 'n.', '截止期限', 'meet the deadline', 1, [], [
        ['The [deadline] for the report is Friday.', '報告的截止日是星期五。'],
        ['We worked late to meet the [deadline].', '我們加班趕在期限前完成。'],
      ]],
      ['submit', 'səbˋmɪt', 'v.', '提交', 'submit an application', 1, ['submission', 'submitted'], [
        ['Please [submit] your report by Friday.', '請在星期五前提交報告。'],
        ['You can [submit] the form online.', '你可以線上提交表格。'],
      ]],
      ['assignment', 'əˋsaɪnmənt', 'n.', '任務；作業', 'complete an assignment', 2, ['assign', 'assigned'], [
        ['This is your first [assignment].', '這是你的第一個任務。'],
        ['She finished the [assignment] ahead of schedule.', '她提前完成了任務。'],
      ]],
      ['department', 'dɪˋpɑrtmənt', 'n.', '部門', 'sales department', 1, ['depart', 'departmental'], [
        ['She works in the sales [department].', '她在業務部工作。'],
        ['Which [department] do you work in?', '你在哪個部門工作？'],
      ]],
      ['photocopy', 'ˋfotəˏkɑpɪ', 'v.', '影印', 'make a photocopy', 1, ['photocopier', 'photocopied'], [
        ['Could you [photocopy] this document?', '你可以影印這份文件嗎？'],
        ['Please [photocopy] your passport for our records.', '請影印你的護照以供存檔。'],
      ]],
      ['supplies', 'səˋplaɪz', 'n.', '用品；補給品', 'office supplies', 1, ['supplier', 'supplied'], [
        ['Office [supplies] are in the cabinet.', '辦公用品在櫃子裡。'],
        ['Please order more [supplies] for the kitchen.', '請為茶水間多訂一些用品。'],
      ]],
      ['document', 'ˋdɑkjəmənt', 'n.', '文件', 'sign a document', 1, ['documented', 'documenting'], [
        ['Please sign this [document].', '請簽署這份文件。'],
        ['Please save the [document] before you close it.', '關閉前請先儲存文件。'],
      ]],
      ['file', 'faɪl', 'v.', '歸檔；提出', 'file a report', 1, ['filed', 'filing'], [
        ['Please [file] these papers by date.', '請將這些文件依日期歸檔。'],
        ['You must [file] your tax return by April.', '你必須在四月前申報所得稅。'],
      ]],
      ['responsible', 'rɪˋspɑnsəbl̩', 'adj.', '負責的', 'be responsible for', 2, ['responsibility', 'responsibly'], [
        ['Who is [responsible] for the project?', '誰負責這個專案？'],
        ["Parents are [responsible] for their children's safety.", '父母要為孩子的安全負責。'],
      ]],
      ['promote', 'prəˋmot', 'v.', '升遷；推廣', 'be promoted to', 2, ['promotion', 'promoted'], [
        ['The company plans to [promote] him to manager.', '公司打算把他升為經理。'],
        ['We need to [promote] our new menu online.', '我們需要在網路上推廣新菜單。'],
      ]],
      ['overtime', 'ˋovɚˏtaɪm', 'adv.', '加班地', 'work overtime', 1, [], [
        ['I worked [overtime] last night.', '我昨晚加班。'],
        ['Nobody likes to work [overtime] on weekends.', '沒有人喜歡週末加班。'],
      ]],
      ['shift', 'ʃɪft', 'n.', '輪班', 'night shift', 1, ['shifted', 'shifty'], [
        ['My [shift] starts at 7 a.m.', '我的班早上七點開始。'],
        ['Can you cover my [shift] tomorrow?', '你明天可以幫我代班嗎？'],
      ]],
      ['task', 'tæsk', 'n.', '工作；任務', 'daily tasks', 1, [], [
        ['Please finish this [task] first.', '請先完成這項工作。'],
        ['Writing reports is my least favorite [task].', '寫報告是我最不喜歡的工作。'],
      ]],
      ['efficient', 'ɪˋfɪʃənt', 'adj.', '有效率的', 'energy efficient', 2, ['efficiency', 'efficiently'], [
        ['The new system is more [efficient].', '新系統比較有效率。'],
        ['She is the most [efficient] worker on our team.', '她是我們團隊中最有效率的人。'],
      ]],
      ['extension', 'ɪkˋstɛnʃən', 'n.', '分機；延期', 'ask for an extension', 2, ['extend', 'extensive'], [
        ['Please call me at [extension] 204.', '請撥分機 204 找我。'],
        ['Can I get an [extension] on the deadline?', '截止日期可以延後嗎？'],
      ]],
      ['remind', 'rɪˋmaɪnd', 'v.', '提醒', 'remind sb to do', 1, ['reminder', 'reminded'], [
        ['Please [remind] me to call the client.', '請提醒我打電話給客戶。'],
        ['Can you [remind] me about the meeting tomorrow?', '你可以提醒我明天的會議嗎？'],
      ]],
      ['assist', 'əˋsɪst', 'v.', '協助', 'assist sb with sth', 2, ['assistance', 'assistant'], [
        ['Can you [assist] me with this report?', '你可以協助我處理這份報告嗎？'],
        ['Our staff will [assist] you with your luggage.', '我們的員工會協助您搬運行李。'],
      ]],
      ['memo', 'ˋmɛmo', 'n.', '備忘錄；公告', 'send a memo', 2, ['memorize', 'memorial'], [
        ['Did you read the [memo] from HR?', '你看過人資發的公告了嗎？'],
        ['The [memo] says the office will close early on Friday.', '公告說辦公室星期五會提早關門。'],
      ]],
      ['headquarters', 'ˋhɛdˋkwɔrtɚz', 'n.', '總部', 'company headquarters', 2, [], [
        ['Our [headquarters] is in New York.', '我們的總部在紐約。'],
        ['The meeting will be held at [headquarters].', '會議將在總部舉行。'],
      ]],
      ['branch', 'bræntʃ', 'n.', '分公司；分店', 'branch office', 2, ['branches', 'branched'], [
        ['The bank opened a new [branch] downtown.', '銀行在市中心開了新分行。'],
        ['Which [branch] is closest to your home?', '哪間分行離你家最近？'],
      ]],
      ['workload', 'ˋwɝkˏlod', 'n.', '工作量', 'heavy workload', 2, [], [
        ['My [workload] is heavy this month.', '我這個月工作量很重。'],
        ["We hired more staff to reduce everyone's [workload].", '我們多聘了人來減輕大家的工作量。'],
      ]],
      ['absent', 'ˋæbsn̩t', 'adj.', '缺席的', 'be absent from', 1, ['absence', 'absently'], [
        ['Tom is [absent] today because he is sick.', 'Tom 今天生病缺席。'],
        ['Three students were [absent] this morning.', '今天早上有三名學生缺席。'],
      ]],
      ['prioritize', 'praɪˋɔrəˏtaɪz', 'v.', '排優先順序', 'prioritize tasks', 3, ['priority', 'prior'], [
        ['You need to [prioritize] your tasks.', '你需要排定工作的優先順序。'],
        ["Let's [prioritize] the most urgent orders.", '我們先處理最緊急的訂單吧。'],
      ]],
    ],
  },
  {
    id: 'meeting', track: 'toeic', name: '會議溝通', icon: '🗣️', words: [
      ['agenda', 'əˋdʒɛndə', 'n.', '議程', 'on the agenda', 2, [], [
        ["Let's look at the [agenda] for today.", '我們來看一下今天的議程。'],
        ['The first item on the [agenda] is the budget.', '議程的第一項是預算。'],
      ]],
      ['attend', 'əˋtɛnd', 'v.', '參加；出席', 'attend a meeting', 1, ['attendance', 'attendee', 'attendant'], [
        ['Will you [attend] the meeting tomorrow?', '你明天會出席會議嗎？'],
        ['More than 200 people will [attend] the event.', '將有超過 200 人參加這場活動。'],
      ]],
      ['postpone', 'postˋpon', 'v.', '延期', 'postpone until', 2, ['postponement', 'postponed'], [
        ['We have to [postpone] the meeting until Monday.', '我們必須把會議延到星期一。'],
        ['Can we [postpone] our call until next week?', '我們的電話會議可以延到下週嗎？'],
      ]],
      ['cancel', 'ˋkænsl̩', 'v.', '取消', 'cancel a meeting', 1, ['cancellation', 'canceled'], [
        ['I need to [cancel] my order.', '我需要取消我的訂單。'],
        ['Please let us know if you need to [cancel].', '如果需要取消請告訴我們。'],
      ]],
      ['discuss', 'dɪˋskʌs', 'v.', '討論', 'discuss a plan', 1, ['discussion', 'discussed'], [
        ["Let's [discuss] this after lunch.", '我們午餐後再討論這件事。'],
        ['We need to [discuss] the budget for next year.', '我們需要討論明年的預算。'],
      ]],
      ['opinion', 'əˋpɪnjən', 'n.', '意見；看法', 'in my opinion', 1, ['opinionated', 'opine'], [
        ['What is your [opinion] on this plan?', '你對這個計畫有什麼看法？'],
        ['In my [opinion], we should wait.', '依我看，我們應該再等等。'],
      ]],
      ['agree', 'əˋgri', 'v.', '同意', 'agree with sb', 1, ['agreement', 'agreeable'], [
        ['I [agree] with you.', '我同意你。'],
        ['Do you [agree] with the new plan?', '你同意新計畫嗎？'],
      ]],
      ['presentation', 'ˏprɛzənˋteʃən', 'n.', '簡報；報告', 'give a presentation', 1, ['presented', 'presentable'], [
        ['She gave a great [presentation].', '她做了一場很棒的簡報。'],
        ['The [presentation] will last about 20 minutes.', '簡報大約會進行 20 分鐘。'],
      ]],
      ['proposal', 'prəˋpozl̩', 'n.', '提案', 'submit a proposal', 2, ['propose', 'proposed'], [
        ['The board approved the [proposal].', '董事會核准了這個提案。'],
        ['Please send me your [proposal] by Friday.', '請在星期五前把提案寄給我。'],
      ]],
      ['conference', 'ˋkɑnfərəns', 'n.', '會議；研討會', 'conference room', 2, ['confer', 'conferred'], [
        ["I'm going to a [conference] in Chicago.", '我要去芝加哥參加研討會。'],
        ['The [conference] room is on the third floor.', '會議室在三樓。'],
      ]],
      ['participant', 'pɑrˋtɪsəpənt', 'n.', '參加者', 'workshop participant', 2, ['participate', 'participation'], [
        ['Each [participant] will receive a name tag.', '每位參加者都會拿到名牌。'],
        ['Every [participant] must register online.', '每位參加者都必須線上報名。'],
      ]],
      ['summarize', 'ˋsʌməˏraɪz', 'v.', '總結；摘要', 'to summarize', 2, ['summary', 'summarized'], [
        ['Let me [summarize] the main points.', '讓我總結一下重點。'],
        ['Can you [summarize] the report in one page?', '你可以用一頁總結這份報告嗎？'],
      ]],
      ['clarify', 'ˋklærəˏfaɪ', 'v.', '釐清；說明', 'clarify a point', 2, ['clarification', 'clarity'], [
        ['Could you [clarify] what you mean?', '你可以說明一下你的意思嗎？'],
        ["I'd like to [clarify] one point.", '我想釐清一點。'],
      ]],
      ['confirm', 'kənˋfɝm', 'v.', '確認', 'confirm a booking', 1, ['confirmation', 'confirmed'], [
        ['Please [confirm] your attendance by email.', '請以電子郵件確認是否出席。'],
        ['Please [confirm] your flight 24 hours in advance.', '請在 24 小時前確認你的航班。'],
      ]],
      ['feedback', 'ˋfidˏbæk', 'n.', '回饋意見', 'give feedback', 1, [], [
        ['Thank you for your [feedback].', '謝謝你的意見回饋。'],
        ['We welcome [feedback] from our customers.', '我們歡迎顧客提供意見。'],
      ]],
      ['decision', 'dɪˋsɪʒən', 'n.', '決定', 'make a decision', 1, ['decide', 'decisive'], [
        ['We will make a [decision] next week.', '我們下週會做出決定。'],
        ['It was a difficult [decision] for everyone.', '這對每個人都是困難的決定。'],
      ]],
      ['negotiate', 'nɪˋgoʃɪˏet', 'v.', '協商；談判', 'negotiate a contract', 3, ['negotiation', 'negotiable'], [
        ['We need to [negotiate] a better price.', '我們需要談一個更好的價格。'],
        ['They will [negotiate] the terms of the contract.', '他們將協商合約條款。'],
      ]],
      ['minutes', 'ˋmɪnɪts', 'n.', '會議紀錄', 'take the minutes', 3, [], [
        ['Who will take the [minutes] today?', '今天誰負責做會議紀錄？'],
        ["Please read the [minutes] from last week's meeting.", '請閱讀上週的會議紀錄。'],
      ]],
      ['brief', 'brif', 'adj.', '簡短的', 'a brief summary', 2, ['briefly', 'brevity'], [
        ["Let's have a [brief] meeting.", '我們開個簡短的會議吧。'],
        ['Please keep your answer [brief].', '請簡短回答。'],
      ]],
      ['reschedule', 'riˋskɛdʒʊl', 'v.', '重新安排時間', 'reschedule a meeting', 2, ['rescheduled', 'rescheduling'], [
        ['Can we [reschedule] for Thursday?', '我們可以改到星期四嗎？'],
        ['I need to [reschedule] my dentist appointment.', '我需要改牙醫的預約時間。'],
      ]],
      ['projector', 'prəˋdʒɛktɚ', 'n.', '投影機', 'turn on the projector', 1, ['projected', 'projecting'], [
        ["The [projector] isn't working.", '投影機壞了。'],
        ['Can you connect your laptop to the [projector]?', '你可以把筆電接上投影機嗎？'],
      ]],
      ['consensus', 'kənˋsɛnsəs', 'n.', '共識', 'reach a consensus', 3, ['consensual', 'consistent'], [
        ['The team reached a [consensus].', '團隊達成了共識。'],
        ['There is no [consensus] on the new design yet.', '對新設計還沒有共識。'],
      ]],
      ['objective', 'əbˋdʒɛktɪv', 'n.', '目的；目標', 'main objective', 3, ['objectively', 'objectives'], [
        ['The main [objective] is to cut costs.', '主要目標是降低成本。'],
        ['Our [objective] this year is to double our sales.', '我們今年的目標是讓銷售額翻倍。'],
      ]],
      ['interrupt', 'ˏɪntəˋrʌpt', 'v.', '打斷', 'sorry to interrupt', 2, ['interruption', 'interrupted'], [
        ['Sorry to [interrupt], but I have a question.', '抱歉打斷一下，我有個問題。'],
        ["Please don't [interrupt] me while I'm talking.", '我說話時請不要打斷我。'],
      ]],
      ['explain', 'ɪkˋsplen', 'v.', '解釋', 'explain sth to sb', 1, ['explanation', 'explained'], [
        ['Could you [explain] that again?', '你可以再解釋一次嗎？'],
        ['Let me [explain] how this machine works.', '讓我說明這台機器怎麼運作。'],
      ]],
    ],
  },
  {
    id: 'hr', track: 'toeic', name: '人資招募', icon: '🧑‍💼', words: [
      ['applicant', 'ˋæpləkənt', 'n.', '應徵者；申請人', 'job applicant', 2, ['apply', 'applicable'], [
        ['Each [applicant] must send a resume.', '每位應徵者都必須寄履歷。'],
        ['The [applicant] must speak English well.', '應徵者必須英文流利。'],
      ]],
      ['apply', 'əˋplaɪ', 'v.', '申請；應徵', 'apply for', 1, ['application', 'applicant'], [
        ['I want to [apply] for this job.', '我想應徵這份工作。'],
        ['You can [apply] online or in person.', '你可以線上或親自申請。'],
      ]],
      ['resume', 'ˋrɛzəˏme', 'n.', '履歷', 'send a resume', 1, [], [
        ['Please attach your [resume].', '請附上你的履歷。'],
        ['Keep your [resume] short and clear.', '你的履歷要簡短清楚。'],
      ]],
      ['interview', 'ˋɪntɚˏvju', 'n.', '面試', 'job interview', 1, ['interviewed', 'interviewee'], [
        ['I have a job [interview] tomorrow.', '我明天有個工作面試。'],
        ['Please arrive ten minutes early for the [interview].', '面試請提早十分鐘到。'],
      ]],
      ['candidate', 'ˋkændəˏdet', 'n.', '候選人', 'ideal candidate', 2, ['candidacy', 'candid'], [
        ['She is the best [candidate] for the job.', '她是這份工作最好的人選。'],
        ['Each [candidate] will take a short test.', '每位候選人都要參加簡短測驗。'],
      ]],
      ['qualified', 'ˋkwɑləˏfaɪd', 'adj.', '有資格的；合格的', 'highly qualified', 2, ['qualify', 'qualification'], [
        ['He is [qualified] for the position.', '他有資格擔任這個職位。'],
        ['We are looking for a [qualified] nurse.', '我們正在找合格的護理師。'],
      ]],
      ['experience', 'ɪkˋspɪrɪəns', 'n.', '經驗', 'work experience', 1, ['experienced', 'experiential'], [
        ['Do you have any sales [experience]?', '你有任何銷售經驗嗎？'],
        ['This job requires two years of [experience].', '這份工作需要兩年經驗。'],
      ]],
      ['position', 'pəˋzɪʃən', 'n.', '職位', 'apply for a position', 1, ['positive', 'positioned'], [
        ['The [position] has been filled.', '這個職位已經有人了。'],
        ['She applied for the [position] of manager.', '她應徵了經理職位。'],
      ]],
      ['salary', 'ˋsælərɪ', 'n.', '薪水', 'starting salary', 1, [], [
        ['The [salary] is paid monthly.', '薪水按月支付。'],
        ['The starting [salary] is $50,000 a year.', '起薪是年薪五萬元。'],
      ]],
      ['benefits', 'ˋbɛnəfɪts', 'n.', '福利', 'employee benefits', 2, ['beneficial', 'benefited'], [
        ['The job offers good [benefits].', '這份工作的福利很好。'],
        ['Health insurance is one of the [benefits] of this job.', '健康保險是這份工作的福利之一。'],
      ]],
      ['hire', 'haɪr', 'v.', '僱用', 'hire staff', 1, ['hired', 'hiring'], [
        ['We plan to [hire] two more workers.', '我們打算再僱用兩名員工。'],
        ['We need to [hire] a new designer.', '我們需要僱用一位新設計師。'],
      ]],
      ['employee', 'ˏɛmplɔɪˋi', 'n.', '員工', 'full-time employee', 1, ['employ', 'employment'], [
        ['Every [employee] gets ten days of leave.', '每位員工有十天假。'],
        ['Each [employee] has a security card.', '每位員工都有門禁卡。'],
      ]],
      ['employer', 'ɪmˋplɔɪɚ', 'n.', '雇主', 'former employer', 2, ['employ', 'employment'], [
        ['My [employer] pays for my training.', '我的雇主支付我的培訓費用。'],
        ['Your [employer] will pay your salary every month.', '你的雇主每個月會支付你的薪水。'],
      ]],
      ['full-time', 'ˋfʊlˋtaɪm', 'adj.', '全職的', 'full-time position', 1, [], [
        ['Is this a [full-time] job?', '這是全職工作嗎？'],
        ['She works [full-time] at a bank.', '她在銀行全職工作。'],
      ]],
      ['part-time', 'ˋpɑrtˋtaɪm', 'adj.', '兼職的', 'part-time job', 1, [], [
        ['I have a [part-time] job at a cafe.', '我在咖啡廳打工。'],
        ['Many students work [part-time] on weekends.', '很多學生週末打工。'],
      ]],
      ['retire', 'rɪˋtaɪr', 'v.', '退休', 'retire from', 2, ['retirement', 'retired'], [
        ['My father will [retire] next year.', '我爸爸明年退休。'],
        ['She plans to [retire] at 60.', '她打算 60 歲退休。'],
      ]],
      ['resign', 'rɪˋzaɪn', 'v.', '辭職', 'resign from', 2, ['resignation', 'resigned'], [
        ['She decided to [resign] from her job.', '她決定辭職。'],
        ['He had to [resign] for health reasons.', '他因為健康因素不得不辭職。'],
      ]],
      ['training', 'ˋtrenɪŋ', 'n.', '訓練；培訓', 'training session', 1, ['trainer', 'trainee'], [
        ['New staff must complete [training].', '新進員工必須完成培訓。'],
        ['The [training] lasts three days.', '培訓為期三天。'],
      ]],
      ['reference', 'ˋrɛfərəns', 'n.', '推薦人；推薦信', 'reference letter', 2, ['refer', 'referred'], [
        ['Can you give me a [reference]?', '你可以當我的推薦人嗎？'],
        ['My former boss wrote me a [reference].', '我的前老闆幫我寫了推薦信。'],
      ]],
      ['requirement', 'rɪˋkwaɪrmənt', 'n.', '必要條件', 'meet the requirements', 2, ['require', 'required'], [
        ["A driver's license is a [requirement] for this job.", '駕照是這份工作的必要條件。'],
        ['Check each [requirement] before you apply.', '申請前請確認每項條件。'],
      ]],
      ['performance', 'pɚˋfɔrməns', 'n.', '表現；績效', 'job performance', 2, ['perform', 'performed'], [
        ['Your [performance] this year was excellent.', '你今年的表現非常好。'],
        ['Your bonus depends on your [performance].', '你的獎金取決於你的表現。'],
      ]],
      ['evaluation', 'ɪˏvæljʊˋeʃən', 'n.', '評估；考核', 'performance evaluation', 3, ['evaluate', 'evaluated'], [
        ['Your [evaluation] is next month.', '你的考核在下個月。'],
        ['The manager will write an [evaluation] of each employee.', '經理會為每位員工寫考核。'],
      ]],
      ['personnel', 'ˏpɝsn̩ˋɛl', 'n.', '人事；全體員工', 'personnel department', 3, ['personal', 'personally'], [
        ['Contact the [personnel] office for details.', '詳情請洽人事室。'],
        ['All [personnel] must wear a badge.', '所有員工都必須配戴識別證。'],
      ]],
      ['recruit', 'rɪˋkrut', 'v.', '招募', 'recruit staff', 3, ['recruitment', 'recruiter'], [
        ['We want to [recruit] young engineers.', '我們想招募年輕工程師。'],
        ["It's hard to [recruit] good staff these days.", '這年頭很難招募到好員工。'],
      ]],
      ['leave', 'liv', 'n.', '休假', 'annual leave', 1, ['leaving', 'left'], [
        ["I'm on sick [leave] today.", '我今天請病假。'],
        ['She is on maternity [leave] until June.', '她請產假到六月。'],
      ]],
    ],
  },
  {
    id: 'finance', track: 'toeic', name: '財務金融', icon: '💰', words: [
      ['account', 'əˋkaʊnt', 'n.', '帳戶', 'open an account', 1, ['accountant', 'accounting'], [
        ["I'd like to open a bank [account].", '我想開一個銀行帳戶。'],
        ['You can check your [account] online.', '你可以在網路上查看你的帳戶。'],
      ]],
      ['balance', 'ˋbæləns', 'n.', '餘額', 'account balance', 2, ['balanced', 'balancing'], [
        ['Please check your account [balance].', '請查看你的帳戶餘額。'],
        ['My [balance] is too low to buy the ticket.', '我的餘額不夠買票。'],
      ]],
      ['withdraw', 'wɪðˋdrɔ', 'v.', '提款；撤回', 'withdraw money', 2, ['withdrawal', 'withdrawn'], [
        ['I need to [withdraw] some cash.', '我需要領一些現金。'],
        ['You can [withdraw] cash at any ATM.', '你可以在任何提款機領現金。'],
      ]],
      ['transaction', 'trænsˋækʃən', 'n.', '交易', 'online transaction', 2, ['transact', 'transactional'], [
        ['Every [transaction] is recorded.', '每筆交易都有紀錄。'],
        ['Each [transaction] costs one dollar.', '每筆交易收費一元。'],
      ]],
      ['budget', 'ˋbʌdʒɪt', 'n.', '預算', 'on a budget', 1, ['budgetary', 'budgeted'], [
        ['We have a small [budget] for the trip.', '我們這趟旅行的預算不多。'],
        ['The project is over [budget].', '這個專案超出預算了。'],
      ]],
      ['expense', 'ɪkˋspɛns', 'n.', '費用；支出', 'travel expenses', 2, ['expensive', 'expend'], [
        ['Keep a record of every [expense].', '把每一筆支出都記錄下來。'],
        ['Rent is my biggest monthly [expense].', '房租是我每月最大的支出。'],
      ]],
      ['invoice', 'ˋɪnvɔɪs', 'n.', '請款單；發票', 'send an invoice', 2, ['invoiced', 'invoicing'], [
        ['We will send the [invoice] next week.', '我們下週會寄請款單。'],
        ['Please pay the [invoice] within 30 days.', '請在 30 天內支付這張請款單。'],
      ]],
      ['profit', 'ˋprɑfɪt', 'n.', '利潤', 'make a profit', 2, ['profitable', 'profitably'], [
        ['The company made a large [profit].', '公司賺了大筆利潤。'],
        ['The store made no [profit] last year.', '這家店去年沒有獲利。'],
      ]],
      ['revenue', 'ˋrɛvəˏnju', 'n.', '營收', 'annual revenue', 3, [], [
        ['Our [revenue] grew by 10 percent.', '我們的營收成長了 10%。'],
        ['Most of our [revenue] comes from online sales.', '我們大部分營收來自網路銷售。'],
      ]],
      ['loan', 'lon', 'n.', '貸款', 'take out a loan', 2, ['lone', 'loaned'], [
        ['He took out a [loan] to buy a car.', '他貸款買車。'],
        ['The bank approved my [loan].', '銀行核准了我的貸款。'],
      ]],
      ['interest', 'ˋɪntərɪst', 'n.', '利息', 'interest rate', 2, ['interesting', 'interested'], [
        ['The bank charges five percent [interest].', '銀行收取 5% 的利息。'],
        ['What is the [interest] rate on this loan?', '這筆貸款的利率是多少？'],
      ]],
      ['tax', 'tæks', 'n.', '稅', 'tax refund', 1, ['taxable', 'taxed'], [
        ['The price includes [tax].', '價格已含稅。'],
        ['Do I have to pay [tax] on this?', '這個我需要繳稅嗎？'],
      ]],
      ['income', 'ˋɪnˏkʌm', 'n.', '收入', 'monthly income', 1, [], [
        ['Her monthly [income] is stable.', '她的月收入很穩定。'],
        ['Rent should be less than a third of your [income].', '房租應該低於收入的三分之一。'],
      ]],
      ['cost', 'kɔst', 'v.', '花費；值', 'cost a lot', 1, ['costly', 'costs'], [
        ['How much does it [cost]?', '這個多少錢？'],
        ['A taxi will [cost] about 40 dollars.', '搭計程車大約要 40 元。'],
      ]],
      ['fee', 'fi', 'n.', '費用；手續費', 'service fee', 1, [], [
        ['There is no [fee] for this service.', '這項服務不收費。'],
        ['The entrance [fee] is ten dollars.', '入場費是十元。'],
      ]],
      ['cash', 'kæʃ', 'n.', '現金', 'pay in cash', 1, ['cashier', 'cashless'], [
        ['Do you accept [cash]?', '你們收現金嗎？'],
        ["I don't carry much [cash] these days.", '我最近身上不太帶現金。'],
      ]],
      ['credit card', 'ˋkrɛdɪt ˏkɑrd', 'n.', '信用卡', 'pay by credit card', 1, [], [
        ['Can I pay by [credit card]?', '我可以刷信用卡嗎？'],
        ['I lost my [credit card] yesterday.', '我昨天弄丟了信用卡。'],
      ]],
      ['reimburse', 'ˏriɪmˋbɝs', 'v.', '核銷；退還（費用）', 'reimburse expenses', 3, ['reimbursement', 'reimbursed'], [
        ['The company will [reimburse] your travel costs.', '公司會核銷你的差旅費。'],
        ['Please keep receipts so we can [reimburse] you.', '請保留收據，我們才能核銷給你。'],
      ]],
      ['audit', 'ˋɔdɪt', 'n.', '稽核；審計', 'financial audit', 3, ['audited', 'audible'], [
        ['The annual [audit] starts next week.', '年度稽核下週開始。'],
        ['The [audit] found no serious problems.', '稽核沒有發現嚴重的問題。'],
      ]],
      ['investment', 'ɪnˋvɛstmənt', 'n.', '投資', 'make an investment', 2, ['invest', 'invested'], [
        ['Real estate is a good [investment].', '房地產是不錯的投資。'],
        ['Buying a home is a big [investment].', '買房是一筆很大的投資。'],
      ]],
      ['estimate', 'ˋɛstəˏmet', 'v.', '估計', 'estimate the cost', 2, ['estimation', 'estimated'], [
        ['Can you [estimate] the total cost?', '你可以估計總費用嗎？'],
        ['Can you [estimate] how long the repair will take?', '你可以估計修理要多久嗎？'],
      ]],
      ['financial', 'faɪˋnænʃəl', 'adj.', '財務的；金融的', 'financial report', 2, ['financially', 'financier'], [
        ['We need to review the [financial] report.', '我們需要檢視財務報告。'],
        ['Many students have [financial] problems.', '很多學生有財務上的困難。'],
      ]],
      ['accountant', 'əˋkaʊntənt', 'n.', '會計師', 'hire an accountant', 2, ['account', 'accountable'], [
        ['Our [accountant] handles the taxes.', '我們的會計師處理稅務。'],
        ['You should ask an [accountant] for advice.', '你應該請教會計師的意見。'],
      ]],
      ['save', 'sev', 'v.', '存錢；節省', 'save money', 1, ['saved', 'savings'], [
        ['I want to [save] money for my trip.', '我想為旅行存錢。'],
        ['We can [save] time by taking the train.', '搭火車可以節省時間。'],
      ]],
      ['afford', 'əˋford', 'v.', '負擔得起', "can't afford", 1, ['affordable', 'affordability'], [
        ["I can't [afford] a new car.", '我買不起新車。'],
        ["We can't [afford] to lose this client.", '我們承擔不起失去這個客戶。'],
      ]],
    ],
  },
  {
    id: 'marketing', track: 'toeic', name: '行銷業務', icon: '📈', words: [
      ['advertise', 'ˋædvɚˏtaɪz', 'v.', '打廣告', 'advertise a product', 2, ['advertisement', 'advertiser', 'advertised'], [
        ['We plan to [advertise] on social media.', '我們打算在社群媒體上打廣告。'],
        ['It is expensive to [advertise] on TV.', '在電視上打廣告很貴。'],
      ]],
      ['advertisement', 'ˏædvɚˋtaɪzmənt', 'n.', '廣告', 'place an advertisement', 2, ['advertise', 'advertiser'], [
        ['I saw an [advertisement] for the job.', '我看到了這份工作的廣告。'],
        ['The [advertisement] appeared in the newspaper.', '這則廣告刊登在報紙上。'],
      ]],
      ['campaign', 'kæmˋpen', 'n.', '（宣傳）活動', 'marketing campaign', 2, [], [
        ['The new [campaign] starts in June.', '新的宣傳活動六月開始。'],
        ['The [campaign] was a big success.', '這次宣傳活動非常成功。'],
      ]],
      ['promotion', 'prəˋmoʃən', 'n.', '促銷；升遷', 'special promotion', 2, ['promote', 'promotional'], [
        ['The store is running a summer [promotion].', '這家店正在舉辦夏季促銷。'],
        ['She got a [promotion] after only one year.', '她才一年就升職了。'],
      ]],
      ['client', 'ˋklaɪənt', 'n.', '客戶', 'meet a client', 1, ['clientele', 'clients'], [
        ["I'm meeting a [client] this afternoon.", '我今天下午要見客戶。'],
        ['Our biggest [client] is a hotel chain.', '我們最大的客戶是一家連鎖飯店。'],
      ]],
      ['competitor', 'kəmˋpɛtətɚ', 'n.', '競爭對手', 'main competitor', 2, ['compete', 'competitive'], [
        ['Our main [competitor] lowered its prices.', '我們的主要競爭對手降價了。'],
        ['We must study what our [competitor] is doing.', '我們必須研究競爭對手在做什麼。'],
      ]],
      ['survey', 'ˋsɝve', 'n.', '調查；問卷', 'customer survey', 2, ['surveyed', 'surveyor'], [
        ['Please fill out this short [survey].', '請填寫這份簡短問卷。'],
        ['The [survey] shows that customers want lower prices.', '調查顯示顧客希望價格更低。'],
      ]],
      ['launch', 'lɔntʃ', 'v.', '推出；發起', 'launch a product', 2, ['launched', 'launches'], [
        ['We will [launch] the new product in May.', '我們會在五月推出新產品。'],
        ['When do you plan to [launch] the website?', '你們打算什麼時候推出網站？'],
      ]],
      ['target', 'ˋtɑrgɪt', 'n.', '目標；對象', 'target market', 2, ['targets', 'targetable'], [
        ['Young people are our [target] market.', '年輕人是我們的目標市場。'],
        ['Our [target] customers are students.', '我們的目標客群是學生。'],
      ]],
      ['demand', 'dɪˋmænd', 'n.', '需求', 'in demand', 2, ['demanding', 'demanded'], [
        ['There is high [demand] for electric cars.', '電動車的需求很高。'],
        ['We cannot meet the [demand] for this product.', '我們無法滿足這項產品的需求。'],
      ]],
      ['sales', 'selz', 'n.', '銷售額；銷售', 'sales figures', 1, ['salesman', 'salable'], [
        ['[Sales] increased last quarter.', '上一季的銷售額增加了。'],
        ['Our [sales] doubled this year.', '我們今年的銷售額翻倍了。'],
      ]],
      ['product', 'ˋprɑdəkt', 'n.', '產品', 'new product', 1, ['productive', 'productively'], [
        ['This [product] is very popular.', '這個產品非常受歡迎。'],
        ['We test every [product] before selling it.', '每項產品在販售前我們都會測試。'],
      ]],
      ['sample', 'ˋsæmpl̩', 'n.', '樣品；試用品', 'free sample', 1, ['sampled', 'simple'], [
        ['Can I try a free [sample]?', '我可以試吃免費樣品嗎？'],
        ['Please send us a [sample] of the fabric.', '請寄一份布料樣品給我們。'],
      ]],
      ['brochure', 'broˋʃʊr', 'n.', '小冊子；簡介', 'travel brochure', 2, [], [
        ['Please take a [brochure].', '請拿一份簡介。'],
        ['The hotel [brochure] has a map of the area.', '飯店簡介裡有這一帶的地圖。'],
      ]],
      ['trend', 'trɛnd', 'n.', '趨勢', 'market trend', 2, ['trendy', 'trended'], [
        ['Online shopping is a growing [trend].', '網路購物是成長中的趨勢。'],
        ['Smartwatches are the latest [trend].', '智慧手錶是最新的潮流。'],
      ]],
      ['strategy', 'ˋstrætədʒɪ', 'n.', '策略', 'business strategy', 2, ['strategic', 'strategically'], [
        ['We need a new marketing [strategy].', '我們需要新的行銷策略。'],
        ['Our [strategy] is to focus on young customers.', '我們的策略是鎖定年輕客群。'],
      ]],
      ['contract', 'ˋkɑntrækt', 'n.', '合約', 'sign a contract', 2, ['contractor', 'contractual'], [
        ['Both sides signed the [contract].', '雙方簽署了合約。'],
        ['The [contract] ends next June.', '合約明年六月到期。'],
      ]],
      ['potential', 'pəˋtɛnʃəl', 'adj.', '潛在的', 'potential customer', 3, ['potentially', 'potentiality'], [
        ["Let's call every [potential] customer.", '我們打電話給每位潛在客戶吧。'],
        ['We met three [potential] clients at the fair.', '我們在展覽上認識了三位潛在客戶。'],
      ]],
      ['quarter', 'ˋkwɔrtɚ', 'n.', '季；四分之一', 'first quarter', 2, ['quarterly', 'quarters'], [
        ['Profits rose in the third [quarter].', '第三季利潤上升了。'],
        ['Sales were strong in the last [quarter].', '上一季的銷售表現很好。'],
      ]],
      ['increase', 'ɪnˋkris', 'v.', '增加', 'increase by', 1, ['increasingly', 'increased'], [
        ['We hope to [increase] sales this year.', '我們希望今年能提高銷售額。'],
        ['We need to [increase] our prices next year.', '我們明年需要調漲價格。'],
      ]],
      ['decrease', 'dɪˋkris', 'v.', '減少', 'decrease in', 1, ['decreasing', 'decreased'], [
        ['Costs will [decrease] next year.', '明年成本會降低。'],
        ['The new machine will [decrease] waiting time.', '新機器會縮短等待時間。'],
      ]],
      ['feature', 'ˋfitʃɚ', 'n.', '特色；功能', 'key feature', 2, ['featured', 'featuring'], [
        ['The camera is the best [feature] of this phone.', '相機是這支手機最棒的功能。'],
        ['Which [feature] do you use the most?', '你最常用哪個功能？'],
      ]],
      ['announce', 'əˋnaʊns', 'v.', '宣布', 'announce a plan', 1, ['announcement', 'announcer'], [
        ['The company will [announce] the winner tomorrow.', '公司明天將宣布得獎者。'],
        ['We are pleased to [announce] our new store.', '我們很高興宣布新店開幕。'],
      ]],
      ['exhibition', 'ˏɛksəˋbɪʃən', 'n.', '展覽', 'trade exhibition', 2, ['exhibitor', 'exhibited'], [
        ['We will join a trade [exhibition] in Tokyo.', '我們將參加東京的商展。'],
        ['The art [exhibition] is free on Sundays.', '這個藝術展覽星期天免費參觀。'],
      ]],
      ['expand', 'ɪkˋspænd', 'v.', '擴張；擴大', 'expand a business', 2, ['expansion', 'expansive'], [
        ['We plan to [expand] into Asia.', '我們計畫擴展到亞洲市場。'],
        ['The company will [expand] its team next year.', '公司明年將擴編團隊。'],
      ]],
    ],
  },
  {
    id: 'logistics', track: 'toeic', name: '物流製造', icon: '📦', words: [
      ['shipment', 'ˋʃɪpmənt', 'n.', '貨運；一批貨', 'track a shipment', 2, ['shipped', 'shipping'], [
        ['The [shipment] will arrive on Monday.', '這批貨會在星期一到。'],
        ['We received the [shipment] two days late.', '我們晚了兩天才收到這批貨。'],
      ]],
      ['warehouse', 'ˋwɛrˏhaʊs', 'n.', '倉庫', 'warehouse manager', 2, [], [
        ['The boxes are stored in the [warehouse].', '箱子存放在倉庫裡。'],
        ['The [warehouse] is open 24 hours a day.', '倉庫 24 小時開放。'],
      ]],
      ['inventory', 'ˋɪnvənˏtorɪ', 'n.', '庫存；存貨清單', 'take inventory', 2, ['invent', 'invention'], [
        ['We check the [inventory] every month.', '我們每個月盤點庫存。'],
        ['Our [inventory] is low, so we need to order more.', '我們的庫存不多了，需要再訂貨。'],
      ]],
      ['supplier', 'səˋplaɪɚ', 'n.', '供應商', 'main supplier', 2, ['supplied', 'supplying'], [
        ['We found a new [supplier].', '我們找到了新的供應商。'],
        ['Our [supplier] in China raised its prices.', '我們在中國的供應商漲價了。'],
      ]],
      ['manufacture', 'ˏmænjəˋfæktʃɚ', 'v.', '製造', 'manufacture goods', 3, ['manufacturer', 'manufacturing'], [
        ['The factory will [manufacture] 500 cars a day.', '這間工廠每天將生產 500 輛車。'],
        ['It costs less to [manufacture] goods overseas.', '在海外製造商品的成本比較低。'],
      ]],
      ['factory', 'ˋfæktərɪ', 'n.', '工廠', 'factory worker', 1, [], [
        ['My uncle works in a [factory].', '我叔叔在工廠工作。'],
        ['The [factory] employs 300 workers.', '這間工廠僱用 300 名工人。'],
      ]],
      ['equipment', 'ɪˋkwɪpmənt', 'n.', '設備', 'safety equipment', 2, ['equip', 'equipped'], [
        ['The new [equipment] is expensive.', '新設備很昂貴。'],
        ['All [equipment] must be checked before use.', '所有設備使用前都必須檢查。'],
      ]],
      ['assemble', 'əˋsɛmbl̩', 'v.', '組裝；集合', 'assemble parts', 2, ['assembly', 'assembled'], [
        ['It takes an hour to [assemble] the desk.', '組裝這張書桌要一小時。'],
        ['Can you help me [assemble] this bookshelf?', '你可以幫我組裝這個書架嗎？'],
      ]],
      ['ship', 'ʃɪp', 'v.', '運送；出貨', 'ship overseas', 1, ['shipment', 'shipped'], [
        ['We will [ship] your order today.', '我們今天會出貨。'],
        ['We can [ship] your order overseas.', '我們可以把您的訂單寄到海外。'],
      ]],
      ['track', 'træk', 'v.', '追蹤', 'track an order', 1, ['tracked', 'tracking'], [
        ['You can [track] your package online.', '你可以在網路上追蹤包裹。'],
        ['This app lets you [track] your delivery.', '這個 App 讓你追蹤包裹配送進度。'],
      ]],
      ['damaged', 'ˋdæmɪdʒd', 'adj.', '損壞的', 'damaged goods', 1, ['damage', 'damaging'], [
        ['The box was [damaged] during delivery.', '箱子在運送途中損壞了。'],
        ['We will replace any [damaged] items.', '任何損壞的商品我們都會更換。'],
      ]],
      ['fragile', 'ˋfrædʒəl', 'adj.', '易碎的', 'handle fragile items', 2, ['fragility', 'fragment'], [
        ["Be careful, it's [fragile].", '小心，這是易碎品。'],
        ['Please carry this box carefully; the glass inside is [fragile].', '請小心搬這個箱子，裡面的玻璃很易碎。'],
      ]],
      ['distribute', 'dɪˋstrɪbjʊt', 'v.', '分配；配送', 'distribute to', 3, ['distribution', 'distributor'], [
        ['We will [distribute] products to 20 stores.', '我們將把產品配送到 20 家店。'],
        ['Please [distribute] these handouts to everyone.', '請把這些講義發給大家。'],
      ]],
      ['storage', 'ˋstorɪdʒ', 'n.', '儲存；倉儲', 'storage room', 2, ['store', 'stored'], [
        ['The basement is used for [storage].', '地下室用來存放東西。'],
        ['Is there enough [storage] in the kitchen?', '廚房的收納空間夠嗎？'],
      ]],
      ['quantity', 'ˋkwɑntətɪ', 'n.', '數量', 'large quantity', 2, ['quantify', 'quantitative'], [
        ['Please check the [quantity] of each item.', '請確認每個品項的數量。'],
        ['We offer discounts for a large [quantity].', '大量訂購我們有提供折扣。'],
      ]],
      ['defect', 'ˋdifɛkt', 'n.', '瑕疵；缺陷', 'product defect', 3, ['defective', 'defected'], [
        ['We found a [defect] in the product.', '我們在產品中發現了瑕疵。'],
        ['Every [defect] must be reported.', '每個瑕疵都必須回報。'],
      ]],
      ['procedure', 'prəˋsidʒɚ', 'n.', '程序；步驟', 'follow a procedure', 2, ['proceed', 'procedural'], [
        ['Please follow the safety [procedure].', '請遵守安全程序。'],
        ['What is the [procedure] for returning an item?', '退貨的程序是什麼？'],
      ]],
      ['machine', 'məˋʃin', 'n.', '機器', 'vending machine', 1, [], [
        ['The [machine] stopped working.', '機器停止運轉了。'],
        ['The coffee [machine] is broken again.', '咖啡機又壞了。'],
      ]],
      ['operate', 'ˋɑpəˏret', 'v.', '操作；營運', 'operate a machine', 2, ['operation', 'operator'], [
        ['Do you know how to [operate] this machine?', '你知道怎麼操作這台機器嗎？'],
        ['Only trained staff can [operate] the crane.', '只有受過訓練的員工可以操作起重機。'],
      ]],
      ['load', 'lod', 'v.', '裝載', 'load and unload', 1, ['loaded', 'loading'], [
        ['Please [load] the boxes onto the truck.', '請把箱子裝上卡車。'],
        ['It takes an hour to [load] the truck.', '裝滿這台卡車要一小時。'],
      ]],
      ['truck', 'trʌk', 'n.', '卡車', 'delivery truck', 1, [], [
        ['The [truck] will arrive at noon.', '卡車中午會到。'],
        ['A delivery [truck] is blocking the road.', '一輛貨車擋住了路。'],
      ]],
      ['container', 'kənˋtenɚ', 'n.', '貨櫃；容器', 'shipping container', 2, ['contain', 'contained'], [
        ['The [container] is full.', '貨櫃滿了。'],
        ['Store the rice in an airtight [container].', '把米放在密封容器裡保存。'],
      ]],
      ['delivery', 'dɪˋlɪvərɪ', 'n.', '送貨；運送服務', 'free delivery', 1, ['deliver', 'delivered'], [
        ['[Delivery] is free for orders over $50.', '訂單滿 50 元免運費。'],
        ['When is the [delivery] date?', '送貨日期是哪一天？'],
      ]],
      ['capacity', 'kəˋpæsətɪ', 'n.', '容量；產能', 'full capacity', 3, ['capable', 'capably'], [
        ['The factory is running at full [capacity].', '工廠正在滿載運轉。'],
        ['The hall has a [capacity] of 500 people.', '這個大廳可容納 500 人。'],
      ]],
      ['safety', 'ˋseftɪ', 'n.', '安全', 'safety rules', 1, ['safe', 'safely'], [
        ['[Safety] is our top priority.', '安全是我們的首要考量。'],
        ['For your [safety], please wear a seat belt.', '為了您的安全，請繫好安全帶。'],
      ]],
    ],
  },
  // ---------- 多益核心（v0.9.0 新增 12 類） ----------
  {
    id: 'legal', track: 'toeic', name: '合約法律', icon: '📜', words: [
      ['clause', 'klɔz', 'n.', '條款', 'a clause in the contract', 2, ['clauses', 'claws'], [
        ['The contract has a [clause] about late payment.', '合約裡有一條關於延遲付款的條款。'],
        ['This [clause] protects both the buyer and the seller.', '這項條款同時保障買方和賣方。'],
      ]],
      ['terms', 'tɝmz', 'n.', '條件；條款', 'terms and conditions', 1, ['term', 'terminal'], [
        ['The [terms] of the agreement are listed on page two.', '協議的條款列在第二頁。'],
        ['Under these [terms], the buyer pays the shipping costs.', '依照這些條件，運費由買方支付。'],
      ]],
      ['obligation', 'ˏɑbləˋgeʃən', 'n.', '義務', 'a legal obligation', 2, ['oblige', 'obligatory'], [
        ['The company has a legal [obligation] to protect customer data.', '公司在法律上有義務保護客戶資料。'],
        ['You are under no [obligation] to buy anything today.', '您今天沒有義務一定要購買任何東西。'],
      ]],
      ['liability', 'ˏlaɪəˋbɪlətɪ', 'n.', '法律責任', 'accept liability for', 3, ['liable', 'reliable'], [
        ['The hotel accepts no [liability] for valuables left in the room.', '飯店對留在房間內的貴重物品不負任何責任。'],
        ['The contractor has insurance to cover any [liability] for damage.', '承包商有保險，可以承擔任何損壞的賠償責任。'],
      ]],
      ['comply', 'kəmˋplaɪ', 'v.', '遵守', 'comply with regulations', 2, ['compliance', 'compliant'], [
        ['All employees must [comply] with the safety rules.', '所有員工都必須遵守安全規定。'],
        ['Suppliers who fail to [comply] with the contract may lose the deal.', '沒有遵守合約的供應商可能會失去這筆生意。'],
      ]],
      ['compliance', 'kəmˋplaɪəns', 'n.', '遵守；合規', 'in compliance with', 3, ['comply', 'compliant'], [
        ['The factory was inspected for [compliance] with safety standards.', '工廠接受了是否符合安全標準的檢查。'],
        ['We need to ensure full [compliance] with the new law.', '我們必須確保完全遵守新法規。'],
      ]],
      ['regulation', 'ˏrɛgjəˋleʃən', 'n.', '規定；法規', 'safety regulations', 2, ['regulate', 'regulatory'], [
        ['According to the new [regulation], all drivers must carry a license.', '根據新規定，所有駕駛人都必須攜帶駕照。'],
        ['This [regulation] applies to all food sellers.', '這項法規適用於所有食品販售業者。'],
      ]],
      ['violate', 'ˋvaɪəˏlet', 'v.', '違反', 'violate the agreement', 2, ['violation', 'violent'], [
        ['Sharing these files would [violate] the agreement.', '分享這些檔案會違反協議。'],
        ["Please do not [violate] the building's no-smoking policy.", '請不要違反大樓的禁菸規定。'],
      ]],
      ['penalty', 'ˋpɛnl̩tɪ', 'n.', '罰款；處罰', 'pay a penalty', 2, ['penalize', 'penal'], [
        ['There is a [penalty] for paying the bill late.', '帳單逾期繳納會被罰款。'],
        ['The driver had to pay a [penalty] for speeding.', '那位駕駛因為超速必須繳罰款。'],
      ]],
      ['terminate', 'ˋtɝməˏnet', 'v.', '終止', 'terminate a contract', 2, ['termination', 'terminal'], [
        ["Either party may [terminate] the contract with 30 days' notice.", '任何一方都可以在 30 天前通知終止合約。'],
        ['The company decided to [terminate] its lease early.', '公司決定提前終止租約。'],
      ]],
      ['renew', 'rɪˋnju', 'v.', '續約；更新', 'renew a contract', 1, ['renewal', 'renewable'], [
        ['I need to [renew] my passport before the trip.', '出發前我得去換新護照。'],
        ['We plan to [renew] the contract for another year.', '我們打算再續約一年。'],
      ]],
      ['signature', 'ˋsɪgnətʃɚ', 'n.', '簽名', 'put your signature on', 1, ['signed', 'signify'], [
        ['We need your [signature] at the bottom of this form.', '我們需要您在這張表格最下方簽名。'],
        ['The document is not valid without a [signature].', '這份文件沒有簽名就無效。'],
      ]],
      ['authorize', 'ˋɔθəˏraɪz', 'v.', '授權；批准', 'authorize a payment', 2, ['authority', 'authorization'], [
        ['Only the manager can [authorize] a refund.', '只有經理可以批准退款。'],
        ['Please [authorize] the payment before Friday.', '請在星期五前核准這筆付款。'],
      ]],
      ['attorney', 'əˋtɝnɪ', 'n.', '律師', 'hire an attorney', 2, ['attorneys', 'attend'], [
        ['You should talk to an [attorney] before you sign anything.', '簽任何東西之前，你應該先找律師談談。'],
        ['The company hired an [attorney] to review the contract.', '公司請了一位律師審閱合約。'],
      ]],
      ['dispute', 'dɪˋspjut', 'n./v.', '爭議；糾紛', 'settle a dispute', 2, ['disputed', 'disputable'], [
        ['The two companies settled the [dispute] out of court.', '兩家公司在庭外解決了糾紛。'],
        ['A [dispute] over payment delayed the project.', '一場付款糾紛讓專案延誤了。'],
      ]],
      ['settlement', 'ˋsɛtl̩mənt', 'n.', '和解；結算', 'reach a settlement', 3, ['settle', 'settled'], [
        ['The two sides reached a [settlement] last week.', '雙方上週達成了和解。'],
        ['The [settlement] of the account is due at the end of the month.', '這個帳戶要在月底結清。'],
      ]],
      ['confidential', 'ˏkɑnfəˋdɛnʃəl', 'adj.', '機密的', 'confidential information', 2, ['confidence', 'confidentially'], [
        ['Please keep this information [confidential].', '請對這些資訊保密。'],
        ['The report contains [confidential] customer data.', '這份報告包含機密的客戶資料。'],
      ]],
      ['binding', 'ˋbaɪndɪŋ', 'adj.', '有約束力的', 'a legally binding contract', 3, ['bind', 'bonding'], [
        ['Once it is signed, the agreement is legally [binding].', '一旦簽署，這份協議就具有法律約束力。'],
        ['Is a verbal agreement [binding] in Australia?', '在澳洲，口頭協議有約束力嗎？'],
      ]],
      ['amendment', 'əˋmɛndmənt', 'n.', '修正案；修訂', 'make an amendment to', 3, ['amend', 'amended'], [
        ['The board approved an [amendment] to the contract.', '董事會核准了合約的修訂。'],
        ['Any [amendment] must be made in writing.', '任何修訂都必須以書面方式進行。'],
      ]],
      ['expire', 'ɪkˋspaɪr', 'v.', '到期；失效', 'expire at the end of', 1, ['expiration', 'expired'], [
        ['My passport will [expire] next month.', '我的護照下個月就到期了。'],
        ['Your membership is about to [expire].', '您的會員資格即將到期。'],
      ]],
      ['breach', 'britʃ', 'n./v.', '違反（合約）', 'a breach of contract', 3, ['breached', 'breaches'], [
        ['Sharing the price list is a clear [breach] of the agreement.', '分享價目表明顯違反了協議。'],
        ['Late delivery is a [breach] of contract.', '延遲交貨就是違約。'],
      ]],
      ['provision', 'prəˋvɪʒən', 'n.', '規定；條款', 'a provision in the contract', 3, ['provide', 'provisional'], [
        ['The contract includes a [provision] for early termination.', '合約中有一條提前終止的條款。'],
        ['Under this [provision], the tenant must pay for minor repairs.', '依照這項規定，房客必須支付小修繕的費用。'],
      ]],
      ['lawsuit', 'ˋlɔˏsut', 'n.', '訴訟', 'file a lawsuit', 2, ['lawful', 'lawfully'], [
        ['The customer filed a [lawsuit] against the company.', '那位顧客對公司提起了訴訟。'],
        ['The company spent two years fighting the [lawsuit].', '公司花了兩年打這場官司。'],
      ]],
      ['consent', 'kənˋsɛnt', 'n./v.', '同意', 'written consent', 2, ['consented', 'consensual'], [
        ["Children need their parents' [consent] to join the trip.", '孩子需要父母同意才能參加這趟旅行。'],
        ['Photos cannot be used without written [consent].', '沒有書面同意不能使用照片。'],
      ]],
      ['enforce', 'ɪnˋfors', 'v.', '執行；實施', 'enforce the rules', 2, ['enforcement', 'enforceable'], [
        ['The city plans to [enforce] the new parking rules.', '市政府打算實施新的停車規定。'],
        ["It is the manager's job to [enforce] the dress code.", '執行服裝規定是經理的工作。'],
      ]],
    ],
  },
  {
    id: 'tech', track: 'toeic', name: '科技與 IT', icon: '💻', words: [
      ['software', 'ˋsɔftˏwɛr', 'n.', '軟體', 'install software', 1, [], [
        ['Please install the latest [software] on your laptop.', '請在你的筆電上安裝最新的軟體。'],
        ['Our team uses accounting [software] to track expenses.', '我們團隊用會計軟體來記錄開支。'],
      ]],
      ['hardware', 'ˋhɑrdˏwɛr', 'n.', '硬體；五金', 'computer hardware', 1, [], [
        ['The old computer [hardware] needs to be replaced.', '舊的電腦硬體需要汰換。'],
        ['You can buy screws at the [hardware] store.', '你可以在五金行買到螺絲。'],
      ]],
      ['install', 'ɪnˋstɔl', 'v.', '安裝', 'install a program', 1, ['installation', 'installment'], [
        ['It only takes ten minutes to [install] the program.', '安裝這個程式只要十分鐘。'],
        ['A technician will come to [install] the printer.', '技術人員會來安裝印表機。'],
      ]],
      ['upgrade', 'ʌpˋgred', 'v.', '升級', 'upgrade the system', 1, ['upgraded', 'upgrading'], [
        ['We need to [upgrade] our computers this year.', '我們今年需要把電腦升級。'],
        ['You can [upgrade] to a larger room for a small fee.', '您只要付一點費用就可以升級到較大的房間。'],
      ]],
      ['device', 'dɪˋvaɪs', 'n.', '裝置', 'a mobile device', 1, ['devise', 'devious'], [
        ['Please turn off any electronic [device] during takeoff.', '起飛時請關閉所有電子裝置。'],
        ['This small [device] can track your steps.', '這個小裝置可以記錄你的步數。'],
      ]],
      ['network', 'ˋnɛtˏwɝk', 'n.', '網路；網絡', 'a computer network', 1, ['networking', 'networked'], [
        ['The company has a [network] of stores across Asia.', '這家公司在亞洲各地有連鎖門市網絡。'],
        ['Is there a wireless [network] I can use here?', '這裡有我可以用的無線網路嗎？'],
      ]],
      ['password', 'ˋpæsˏwɝd', 'n.', '密碼', 'change your password', 1, [], [
        ['Please change your [password] every three months.', '請每三個月更改一次密碼。'],
        ['Excuse me, what is the Wi-Fi [password]?', '不好意思，Wi-Fi 密碼是什麼？'],
      ]],
      ['database', 'ˋdetəˏbes', 'n.', '資料庫', 'a customer database', 2, [], [
        ['All customer details are stored in the [database].', '所有客戶資料都存在資料庫裡。'],
        ['The [database] is backed up every night.', '資料庫每天晚上都會備份。'],
      ]],
      ['technician', 'tɛkˋnɪʃən', 'n.', '技術人員', 'a computer technician', 2, ['technical', 'technique'], [
        ['A [technician] will fix the printer this afternoon.', '技術人員今天下午會來修印表機。'],
        ['Please call the IT [technician] if the screen goes black.', '如果螢幕變黑，請打電話給 IT 技術人員。'],
      ]],
      ['malfunction', 'mælˋfʌŋkʃən', 'n./v.', '故障', 'an equipment malfunction', 3, ['malfunctioned', 'malfunctioning'], [
        ['The delay was caused by a [malfunction] in the system.', '這次延誤是系統故障造成的。'],
        ['The machine had a [malfunction] and stopped working.', '機器故障，停止運作了。'],
      ]],
      ['troubleshoot', 'ˋtrʌbl̩ˏʃut', 'v.', '排除故障', 'troubleshoot a problem', 2, ['troubled', 'troublesome'], [
        ['Our IT team can help you [troubleshoot] the problem.', '我們的 IT 團隊可以幫你排除問題。'],
        ['Try to [troubleshoot] the printer before calling support.', '打電話給客服之前，先試著排除印表機的故障。'],
      ]],
      ['compatible', 'kəmˋpætəbl̩', 'adj.', '相容的', 'compatible with', 2, ['compatibility', 'compatibly'], [
        ['Is this charger [compatible] with my phone?', '這個充電器和我的手機相容嗎？'],
        ['The new software is not [compatible] with older computers.', '新軟體和舊電腦不相容。'],
      ]],
      ['backup', 'ˋbækˏʌp', 'n.', '備份', 'make a backup', 1, [], [
        ['Always make a [backup] of important files.', '重要的檔案一定要備份。'],
        ['Luckily, we had a [backup] of the report on another drive.', '幸好我們在另一個硬碟裡有這份報告的備份。'],
      ]],
      ['access', 'ˋæksɛs', 'n./v.', '使用權；存取', 'have access to', 2, ['accessible', 'accessed'], [
        ['Only managers have [access] to this room.', '只有經理可以進入這個房間。'],
        ['You need a password to [access] the files.', '你需要密碼才能存取這些檔案。'],
      ]],
      ['attachment', 'əˋtætʃmənt', 'n.', '附件', 'open an attachment', 1, ['attach', 'attached'], [
        ["The email had an [attachment] that I couldn't open.", '那封電子郵件有一個我打不開的附件。'],
        ['Do not open an [attachment] from an unknown sender.', '不要打開陌生寄件者的附件。'],
      ]],
      ['server', 'ˋsɝvɚ', 'n.', '伺服器', 'a secure server', 1, ['serve', 'serving'], [
        ['The company [server] crashed last night.', '公司的伺服器昨晚當機了。'],
        ['Our files are saved on a secure [server].', '我們的檔案存在一台安全的伺服器上。'],
      ]],
      ['digital', 'ˋdɪdʒɪtl̩', 'adj.', '數位的', 'digital copies', 1, ['digit', 'digitally'], [
        ['We sell both printed and [digital] copies of the book.', '這本書我們有賣紙本和電子版。'],
        ['Most companies now keep [digital] records.', '現在大多數公司都保存數位紀錄。'],
      ]],
      ['interface', 'ˋɪntɚˏfes', 'n.', '介面', 'a user interface', 2, ['interfere', 'interference'], [
        ['The new [interface] is easy to use.', '新的介面很好用。'],
        ["Users like the app's simple [interface].", '使用者喜歡這個 App 簡單的介面。'],
      ]],
      ['automate', 'ˋɔtəˏmet', 'v.', '使自動化', 'automate a process', 2, ['automatic', 'automation'], [
        ['We plan to [automate] the billing process.', '我們打算把帳單流程自動化。'],
        ['Software can [automate] many simple tasks.', '軟體可以把許多簡單的工作自動化。'],
      ]],
      ['specification', 'ˏspɛsəfəˋkeʃən', 'n.', '規格', 'meet the specifications', 3, ['specify', 'specific'], [
        ['Each part must be made to the exact [specification].', '每個零件都必須完全依照規格製造。'],
        ['The engineer wrote a detailed [specification] for the new machine.', '工程師為新機器寫了一份詳細的規格書。'],
      ]],
      ['outage', 'ˋaʊtɪdʒ', 'n.', '停電；斷線', 'a power outage', 3, [], [
        ['A power [outage] shut down the office for three hours.', '一場停電讓辦公室停擺了三個小時。'],
        ['The internet [outage] affected thousands of customers.', '網路斷線影響了好幾千名客戶。'],
      ]],
      ['wireless', 'ˋwaɪrlɪs', 'adj.', '無線的', 'wireless internet', 1, ['wirelessly', 'wiring'], [
        ['The hotel offers free [wireless] internet.', '飯店提供免費的無線網路。'],
        ['I bought a [wireless] mouse for my laptop.', '我買了一個無線滑鼠給筆電用。'],
      ]],
      ['encrypt', 'ɛnˋkrɪpt', 'v.', '加密', 'encrypt data', 3, ['encryption', 'encrypted'], [
        ['Always [encrypt] files before you send them.', '傳送檔案前一定要先加密。'],
        ['The app uses a key to [encrypt] your messages.', '這個 App 用金鑰為你的訊息加密。'],
      ]],
      ['prototype', 'ˋprotəˏtaɪp', 'n.', '原型；樣品', 'build a prototype', 2, ['prototypical', 'prototyping'], [
        ['The team built a [prototype] of the new phone.', '團隊做出了新手機的原型。'],
        ['This [prototype] is lighter than the first one.', '這個樣品比第一個輕。'],
      ]],
      ['update', 'ʌpˋdet', 'v.', '更新', 'update the software', 1, ['updated', 'updating'], [
        ['Please [update] your address in the system.', '請在系統裡更新您的地址。'],
        ['Remember to [update] the app before the meeting.', '記得在開會前更新 App。'],
      ]],
    ],
  },
  {
    id: 'service', track: 'toeic', name: '客戶服務', icon: '📞', words: [
      ['inquiry', 'ɪnˋkwaɪrɪ', 'n.', '詢問', 'an inquiry about', 2, ['inquire', 'inquired'], [
        ['Thank you for your [inquiry] about our prices.', '感謝您詢問我們的價格。'],
        ['We received an [inquiry] from a customer in Japan.', '我們收到一位日本客戶的詢問。'],
      ]],
      ['complaint', 'kəmˋplent', 'n.', '抱怨；客訴', 'make a complaint', 1, ['complain', 'complaining'], [
        ['We received a [complaint] about the noise last night.', '我們收到一則關於昨晚噪音的客訴。'],
        ['Please fill out this form to make a [complaint].', '要客訴請填寫這張表格。'],
      ]],
      ['respond', 'rɪˋspɑnd', 'v.', '回應', 'respond to an email', 1, ['response', 'responsive'], [
        ['We will [respond] to your email within 24 hours.', '我們會在 24 小時內回覆您的電子郵件。'],
        ['Please [respond] by Friday if you plan to attend.', '如果您打算出席，請在星期五前回覆。'],
      ]],
      ['satisfaction', 'ˏsætɪsˋfækʃən', 'n.', '滿意', 'customer satisfaction', 2, ['satisfy', 'satisfied'], [
        ['Customer [satisfaction] is our top priority.', '顧客滿意是我們的第一要務。'],
        ['The survey measures guest [satisfaction] with our hotel.', '這份問卷調查房客對我們飯店的滿意度。'],
      ]],
      ['representative', 'ˏrɛprɪˋzɛntətɪv', 'n.', '代表；客服人員', 'a customer service representative', 2, ['represent', 'represented'], [
        ['Please hold for the next available [representative].', '請稍候，下一位有空的客服人員將為您服務。'],
        ['A sales [representative] will call you tomorrow.', '業務代表明天會打電話給您。'],
      ]],
      ['hotline', 'ˋhɑtˏlaɪn', 'n.', '服務專線', 'a 24-hour hotline', 1, [], [
        ['Call our 24-hour [hotline] if you have any problems.', '如果有任何問題，請撥打我們的 24 小時服務專線。'],
        ['The [hotline] is free for all customers.', '所有顧客都可以免費撥打這支專線。'],
      ]],
      ['resolve', 'rɪˋzɑlv', 'v.', '解決', 'resolve a problem', 2, ['resolution', 'resolved'], [
        ['We will try to [resolve] the problem as soon as possible.', '我們會盡快設法解決這個問題。'],
        ["The manager helped [resolve] the customer's complaint.", '經理協助處理了那位顧客的客訴。'],
      ]],
      ['apologize', 'əˋpɑləˏdʒaɪz', 'v.', '道歉', 'apologize for the delay', 1, ['apology', 'apologetic'], [
        ['We [apologize] for the delay.', '我們為延誤向您致歉。'],
        ["I'd like to [apologize] for the mistake on your bill.", '我想為您帳單上的錯誤道歉。'],
      ]],
      ['inconvenience', 'ˏɪnkənˋvinjəns', 'n.', '不便', 'apologize for any inconvenience', 2, ['inconvenient', 'inconveniently'], [
        ['We apologize for any [inconvenience].', '造成您任何不便，我們深感抱歉。'],
        ['The road work caused great [inconvenience] to local shops.', '道路施工對附近店家造成很大的不便。'],
      ]],
      ['compensate', 'ˋkɑmpənˏset', 'v.', '補償', 'compensate sb for sth', 2, ['compensation', 'compensatory'], [
        ['The airline will [compensate] passengers for the delay.', '航空公司會補償旅客延誤的損失。'],
        ['We will [compensate] you for the damaged item.', '我們會賠償您損壞的商品。'],
      ]],
      ['replacement', 'rɪˋplesmənt', 'n.', '替換品；接替者', 'send a replacement', 2, ['replace', 'replaceable'], [
        ['The store sent me a [replacement] for the broken lamp.', '店家寄了一盞新的檯燈給我，替換壞掉的那盞。'],
        ['We are looking for a [replacement] for our retiring manager.', '我們正在找人接替即將退休的經理。'],
      ]],
      ['guarantee', 'ˏgærənˋti', 'n./v.', '保證', 'a money-back guarantee', 2, ['guaranteed', 'guarantor'], [
        ['The TV comes with a two-year [guarantee].', '這台電視附兩年保固。'],
        ['Can you [guarantee] that it will arrive by Friday?', '你可以保證星期五前送達嗎？'],
      ]],
      ['courteous', 'ˋkɝtɪəs', 'adj.', '有禮貌的', 'courteous staff', 3, ['courtesy', 'courteously'], [
        ['The hotel staff were very [courteous].', '飯店員工非常有禮貌。'],
        ['Please be [courteous] to every caller.', '請對每一位來電者都保持禮貌。'],
      ]],
      ['loyalty', 'ˋlɔɪəltɪ', 'n.', '忠誠度', 'customer loyalty', 2, ['loyal', 'loyally'], [
        ['We thank our customers for their [loyalty].', '我們感謝顧客長久以來的支持。'],
        ['Good service builds customer [loyalty].', '好的服務能建立顧客忠誠度。'],
      ]],
      ['membership', 'ˋmɛmbɚˏʃɪp', 'n.', '會員資格', 'a membership card', 1, ['member', 'members'], [
        ['[Membership] is free for students.', '學生可以免費成為會員。'],
        ['You can renew your gym [membership] online.', '你可以在網路上續辦健身房會員。'],
      ]],
      ['subscription', 'səbˋskrɪpʃən', 'n.', '訂閱', 'cancel a subscription', 2, ['subscribe', 'subscriber'], [
        ['You can cancel your [subscription] at any time.', '您可以隨時取消訂閱。'],
        ['A one-year [subscription] costs 50 dollars.', '訂閱一年要 50 元。'],
      ]],
      ['escalate', 'ˋɛskəˏlet', 'v.', '升級處理；擴大', 'escalate a complaint', 3, ['escalation', 'escalator'], [
        ['If the problem continues, I will [escalate] it to my manager.', '如果問題持續，我會把它轉給我的主管處理。'],
        ['The agent decided to [escalate] the complaint to a supervisor.', '客服人員決定把這件客訴轉給主管處理。'],
      ]],
      ['prompt', 'prɑmpt', 'adj.', '迅速的', 'a prompt reply', 2, ['promptly', 'promptness'], [
        ['Thank you for your [prompt] reply.', '謝謝您迅速的回覆。'],
        ['The customer was happy with our [prompt] service.', '那位顧客對我們迅速的服務很滿意。'],
      ]],
      ['voucher', 'ˋvaʊtʃɚ', 'n.', '禮券；抵用券', 'a gift voucher', 2, ['vouch', 'vouchers'], [
        ['You will receive a $10 [voucher] for your next visit.', '您會收到一張下次消費可用的 10 元抵用券。'],
        ['This [voucher] can be used at any of our stores.', '這張禮券在我們任何一家分店都能使用。'],
      ]],
      ['policy', 'ˋpɑləsɪ', 'n.', '政策；規定', 'a return policy', 1, ['police', 'polish'], [
        ['Our return [policy] allows refunds within 30 days.', '我們的退貨政策允許 30 天內退款。'],
        ['Smoking indoors is against company [policy].', '在室內吸菸違反公司規定。'],
      ]],
      ['testimonial', 'ˏtɛstəˋmonɪəl', 'n.', '顧客推薦', 'a customer testimonial', 3, ['testify', 'testified'], [
        ['We posted a customer [testimonial] on our website.', '我們在網站上刊登了一則顧客推薦。'],
        ['This [testimonial] comes from a happy client in Sydney.', '這則推薦來自一位雪梨的滿意客戶。'],
      ]],
      ['reply', 'rɪˋplaɪ', 'n./v.', '回覆', 'reply to an email', 1, ['replied', 'replies'], [
        ['Please [reply] to this email by Monday.', '請在星期一前回覆這封電子郵件。'],
        ["I'm still waiting for a [reply] from the hotel.", '我還在等飯店的回覆。'],
      ]],
      ['follow up', 'ˋfɑlo ʌp', 'v.', '後續追蹤', 'follow up with a client', 2, ['followed up', 'following up'], [
        ['I will [follow up] with the client next week.', '我下週會再跟客戶追蹤進度。'],
        ['Please [follow up] on this order tomorrow.', '請明天追蹤這筆訂單。'],
      ]],
      ['on hold', 'ɑn hold', 'prep.', '等候中（電話）', 'put sb on hold', 2, [], [
        ['Sorry, I have to put you [on hold] for a moment.', '抱歉，我得請您在線上稍候一下。'],
        ['I was [on hold] for twenty minutes before someone answered.', '我在電話上等了二十分鐘才有人接。'],
      ]],
      ['toll-free', 'ˋtolˋfri', 'adj.', '免付費的', 'a toll-free number', 2, [], [
        ['Call our [toll-free] number for help.', '需要協助請撥打我們的免付費電話。'],
        ['The [toll-free] line is open from 9 a.m. to 6 p.m.', '免付費專線的服務時間是早上 9 點到晚上 6 點。'],
      ]],
    ],
  },
  {
    id: 'facility', track: 'toeic', name: '建築與設施', icon: '🏗️', words: [
      ['facility', 'fəˋsɪlətɪ', 'n.', '設施；場所', 'sports facility', 2, ['facilitate', 'facilitated'], [
        ['The hotel has a fitness [facility] on the top floor.', '飯店頂樓有健身設施。'],
        ['The new research [facility] will open next spring.', '新的研究中心明年春天啟用。'],
      ]],
      ['construction', 'kənˋstrʌkʃən', 'n.', '建造；施工', 'under construction', 1, ['construct', 'constructive'], [
        ['The new bridge is still under [construction].', '新橋還在施工中。'],
        ['Road [construction] may cause delays on Main Street.', '道路施工可能造成緬因街交通延誤。'],
      ]],
      ['blueprint', 'ˋbluˏprɪnt', 'n.', '藍圖；計畫', 'a blueprint for', 2, [], [
        ['The architect showed us a [blueprint] of the new office.', '建築師給我們看新辦公室的藍圖。'],
        ['This report is a [blueprint] for our future growth.', '這份報告是我們未來成長的藍圖。'],
      ]],
      ['architect', 'ˋɑrkəˏtɛkt', 'n.', '建築師', 'hire an architect', 2, ['architecture', 'architectural'], [
        ['We hired an [architect] to design our new house.', '我們請了一位建築師設計新房子。'],
        ['The [architect] explained her plans to the clients.', '建築師向客戶說明她的設計。'],
      ]],
      ['site', 'saɪt', 'n.', '地點；工地', 'construction site', 1, ['sight', 'cite'], [
        ['All visitors must wear a helmet on the construction [site].', '所有訪客在工地都必須戴安全帽。'],
        ['The company chose a [site] near the harbor for its new factory.', '公司為新工廠選了港口附近的地點。'],
      ]],
      ['crew', 'kru', 'n.', '工作人員（一組）', 'a construction crew', 2, ['crews', 'cruise'], [
        ['A cleaning [crew] comes in every night after nine.', '每晚九點後會有清潔人員進來。'],
        ['The repair [crew] has fixed the broken pipe.', '維修人員已經修好破掉的水管。'],
      ]],
      ['permit', 'ˋpɝmɪt', 'n.', '許可證', 'building permit', 2, ['permitted', 'permissive'], [
        ['You need a building [permit] to add a second floor.', '要加蓋二樓需要建築許可證。'],
        ['The city issued a parking [permit] to each resident.', '市政府發給每位居民一張停車許可證。'],
      ]],
      ['elevator', 'ˋɛləˏvetɚ', 'n.', '電梯', 'take the elevator', 1, ['elevate', 'elevation'], [
        ['Please take the [elevator] to the fifth floor.', '請搭電梯到五樓。'],
        ['The [elevator] is out of order today.', '電梯今天故障了。'],
      ]],
      ['entrance', 'ˋɛntrəns', 'n.', '入口', 'main entrance', 1, ['enter', 'entrant'], [
        ["Let's meet at the main [entrance] at nine.", '我們九點在大門口見。'],
        ['Please use the side [entrance] during the repairs.', '維修期間請走側門。'],
      ]],
      ['lobby', 'ˋlɑbɪ', 'n.', '大廳', 'hotel lobby', 1, ['lobbies', 'lobbyist'], [
        ['The [lobby] is decorated with local art.', '大廳用在地藝術品裝飾。'],
        ['Our office building has a large [lobby] with a coffee shop.', '我們的辦公大樓有個附設咖啡店的大廳。'],
      ]],
      ['parking lot', 'ˋpɑrkɪŋ ˏlɑt', 'n.', '停車場', 'a parking lot', 1, [], [
        ['The [parking lot] behind the building is full.', '大樓後面的停車場滿了。'],
        ["I'll pick you up in the [parking lot] after work.", '下班後我在停車場接你。'],
      ]],
      ['electrician', 'ɪˏlɛkˋtrɪʃən', 'n.', '電工', 'call an electrician', 2, ['electric', 'electrical', 'electricity'], [
        ['We called an [electrician] to fix the lights.', '我們請了電工來修燈。'],
        ['The [electrician] will check the wiring on Monday.', '電工星期一會來檢查線路。'],
      ]],
      ['ventilation', 'ˏvɛntl̩ˋeʃən', 'n.', '通風', 'poor ventilation', 3, ['ventilate', 'ventilated'], [
        ['The kitchen needs better [ventilation].', '廚房需要更好的通風。'],
        ['Good [ventilation] keeps the warehouse cool in summer.', '良好的通風讓倉庫夏天保持涼爽。'],
      ]],
      ['heating', 'ˋhitɪŋ', 'n.', '暖氣', 'heating system', 1, ['heated', 'heats'], [
        ['The [heating] in our office broke down this morning.', '我們辦公室的暖氣今天早上壞了。'],
        ['We pay extra for [heating] in the winter.', '冬天我們要多付暖氣費。'],
      ]],
      ['layout', 'ˋleˏaʊt', 'n.', '配置；版面', 'office layout', 2, ['lay out', 'laid out'], [
        ['The new office [layout] gives everyone more space.', '新的辦公室配置讓每個人有更多空間。'],
        ['I like the clean [layout] of this website.', '我喜歡這個網站簡潔的版面。'],
      ]],
      ['floor plan', 'ˋflor ˏplæn', 'n.', '平面圖', 'open floor plan', 2, [], [
        ['The agent sent us a [floor plan] of the apartment.', '仲介寄給我們公寓的平面圖。'],
        ['An open [floor plan] makes the office feel bigger.', '開放式格局讓辦公室感覺更大。'],
      ]],
      ['relocate', 'riˋloket', 'v.', '搬遷；調職', 'relocate to', 2, ['relocation', 'relocated'], [
        ['The company plans to [relocate] its head office to Taichung.', '公司打算把總部搬到台中。'],
        ['We may need to [relocate] the meeting to a bigger room.', '我們可能需要把會議移到大一點的房間。'],
      ]],
      ['premises', 'ˋprɛmɪsɪz', 'n.', '場所；房屋土地', 'on the premises', 3, ['promises', 'premiere'], [
        ['Smoking is not allowed anywhere on the [premises].', '場所內全面禁菸。'],
        ['Security guards patrol the [premises] at night.', '警衛晚上會巡邏整個廠區。'],
      ]],
      ['janitor', 'ˋdʒænətɚ', 'n.', '清潔工；管理員', 'school janitor', 2, ['janitors', 'janitorial'], [
        ['The [janitor] cleans the restrooms every evening.', '清潔工每天傍晚打掃廁所。'],
        ['Please ask a [janitor] to unlock the storage room.', '請找一位管理員來打開儲藏室。'],
      ]],
      ['closure', 'ˋkloʒɚ', 'n.', '關閉', 'road closure', 2, ['closed', 'closely'], [
        ['The road [closure] will last until Friday.', '道路封閉會持續到星期五。'],
        ['The [closure] of the east entrance is only temporary.', '東側入口只是暫時關閉。'],
      ]],
      ['temporary', 'ˋtɛmpəˏrɛrɪ', 'adj.', '暫時的；臨時的', 'temporary staff', 1, ['temporarily', 'temper'], [
        ['We hired [temporary] workers for the holiday season.', '我們為假期旺季請了臨時工。'],
        ['This is only a [temporary] solution.', '這只是暫時的解決辦法。'],
      ]],
      ['hazard', 'ˋhæzɚd', 'n.', '危險；危害', 'safety hazard', 2, ['hazardous', 'hazardously'], [
        ['Wet floors are a safety [hazard].', '濕滑的地板有安全上的危險。'],
        ['Loose cables can be a fire [hazard].', '鬆脫的電線可能引發火災。'],
      ]],
      ['adjacent', 'əˋdʒesənt', 'adj.', '鄰近的', 'adjacent to', 3, ['adjacency', 'adjacently'], [
        ['The parking lot is [adjacent] to the main building.', '停車場就在主大樓旁邊。'],
        ['Guests can have lunch in the [adjacent] room.', '來賓可以在隔壁的房間用午餐。'],
      ]],
      ['landscaping', 'ˋlændˏskepɪŋ', 'n.', '景觀美化', 'landscaping work', 3, ['landscaped', 'landscaper'], [
        ['The [landscaping] around the office was done by a local company.', '辦公室周圍的景觀是一家本地公司做的。'],
        ['We hired a company to handle the [landscaping] for the new park.', '我們請了一家公司負責新公園的景觀工程。'],
      ]],
      ['cafeteria', 'ˏkæfəˋtɪrɪə', 'n.', '自助餐廳；員工餐廳', 'staff cafeteria', 1, ['cafeterias', 'caffeine'], [
        ['The [cafeteria] on the second floor opens at 11:30.', '二樓的員工餐廳十一點半開始營業。'],
        ['Our company [cafeteria] serves free breakfast on Fridays.', '我們公司餐廳每週五提供免費早餐。'],
      ]],
    ],
  },
  {
    id: 'media', track: 'toeic', name: '媒體與公關', icon: '📰', words: [
      ['publish', 'ˋpʌblɪʃ', 'v.', '出版；發表', 'publish an article', 1, ['publication', 'publisher'], [
        ['The magazine will [publish] my article next month.', '雜誌下個月會刊登我的文章。'],
        ['We plan to [publish] the survey results on our website.', '我們打算把調查結果公布在網站上。'],
      ]],
      ['publication', 'ˏpʌblɪˋkeʃən', 'n.', '出版品；出版', 'monthly publication', 2, ['publish', 'publicize'], [
        ['The [publication] of the annual report has been delayed.', '年報的出版延後了。'],
        ['This magazine is a popular [publication] among young readers.', '這本雜誌是年輕讀者喜愛的刊物。'],
      ]],
      ['editor', 'ˋɛdɪtɚ', 'n.', '編輯', 'chief editor', 1, ['edition', 'editorial'], [
        ['The [editor] asked me to shorten my story.', '編輯要我把稿子縮短。'],
        ['She works as an [editor] at a travel magazine.', '她在一家旅遊雜誌當編輯。'],
      ]],
      ['article', 'ˋɑrtɪkl̩', 'n.', '文章；物品', 'read an article', 1, ['articles', 'articulate'], [
        ['I read an interesting [article] about electric cars.', '我讀了一篇關於電動車的有趣文章。'],
        ["The [article] was published in Monday's paper.", '這篇文章刊登在星期一的報紙上。'],
      ]],
      ['journalist', 'ˋdʒɝnl̩ɪst', 'n.', '記者', 'freelance journalist', 2, ['journal', 'journalism'], [
        ['A [journalist] called to ask about our new product.', '有位記者打電話來詢問我們的新產品。'],
        ['She worked as a [journalist] for ten years before joining us.', '她加入我們之前當了十年記者。'],
      ]],
      ['press release', 'prɛs rɪˋlis', 'n.', '新聞稿', 'issue a press release', 2, [], [
        ['We will send out a [press release] about the merger tomorrow.', '我們明天會發布關於合併的新聞稿。'],
        ['The [press release] was posted on the company website.', '新聞稿已經貼在公司網站上。'],
      ]],
      ['coverage', 'ˋkʌvərɪdʒ', 'n.', '報導；保險範圍', 'media coverage', 3, ['covered', 'uncovered'], [
        ['The product launch received wide media [coverage].', '產品發表會獲得媒體廣泛報導。'],
        ['This insurance plan offers full [coverage] for dental care.', '這個保險方案全額給付牙齒治療。'],
      ]],
      ['broadcast', 'ˋbrɔdˏkæst', 'n./v.', '廣播；播送', 'live broadcast', 2, ['broadcaster', 'broadcasting'], [
        ['The game will be shown in a live [broadcast] tonight.', '比賽今晚會現場直播。'],
        ['The station will [broadcast] the speech at 8 p.m.', '電台晚上八點會播出這場演講。'],
      ]],
      ['headline', 'ˋhɛdˏlaɪn', 'n.', '標題；頭條', 'make headlines', 1, ['headlines', 'headliner'], [
        ["The [headline] on today's paper is about the election.", '今天報紙的頭條是關於選舉。'],
        ['Write a short [headline] for your blog post.', '幫你的部落格文章寫個簡短的標題。'],
      ]],
      ['subscriber', 'səbˋskraɪbɚ', 'n.', '訂閱者；用戶', 'paying subscriber', 2, ['subscribe', 'subscription'], [
        ['As a [subscriber], you can read all our articles online.', '身為訂戶，您可以在線上閱讀我們所有的文章。'],
        ['Our newest [subscriber] lives in New Zealand.', '我們最新的訂閱者住在紐西蘭。'],
      ]],
      ['edition', 'ɪˋdɪʃən', 'n.', '版本；版次', 'the latest edition', 2, ['edited', 'editorial'], [
        ['The latest [edition] of the guidebook has new maps.', '這本旅遊指南的最新版有新地圖。'],
        ['The weekend [edition] of the paper comes with a free magazine.', '週末版報紙附贈一本雜誌。'],
      ]],
      ['column', 'ˋkɑləm', 'n.', '專欄；（表格的）欄', 'write a column', 2, ['columnist', 'columns'], [
        ['She writes a weekly [column] for a business magazine.', '她替一本商業雜誌寫每週專欄。'],
        ['Please enter the prices in the second [column].', '請把價格填在第二欄。'],
      ]],
      ['review', 'rɪˋvju', 'n./v.', '評論；審查', 'a positive review', 1, ['reviewer', 'reviewed'], [
        ['The restaurant got a great [review] in the local paper.', '這家餐廳在地方報紙上得到很好的評價。'],
        ['Please [review] the contract before you sign it.', '簽約前請先仔細看過合約。'],
      ]],
      ['critic', 'ˋkrɪtɪk', 'n.', '評論家', 'film critic', 2, ['critical', 'criticize', 'criticism'], [
        ['A famous food [critic] visited our restaurant last night.', '昨晚有位知名美食評論家來我們餐廳用餐。'],
        ['Even the harshest [critic] liked the new design.', '連最嚴厲的評論家都喜歡新設計。'],
      ]],
      ['draft', 'dræft', 'n./v.', '草稿；起草', 'first draft', 2, ['drafted', 'drafty'], [
        ['Please send me the first [draft] by Friday.', '請在星期五前把初稿寄給我。'],
        ['Could you [draft] a reply to this email?', '你可以幫忙草擬這封信的回覆嗎？'],
      ]],
      ['proofread', 'ˋprufˏrid', 'v.', '校對', 'proofread a document', 2, ['proofreader', 'proofreading'], [
        ['Please [proofread] the report before sending it out.', '報告寄出前請先校對。'],
        ['I asked a coworker to [proofread] my cover letter.', '我請同事幫我校對求職信。'],
      ]],
      ['author', 'ˋɔθɚ', 'n.', '作者', 'best-selling author', 1, ['authorize', 'authored'], [
        ['The [author] will sign copies of her new book.', '作者會替她的新書簽名。'],
        ['Who is the [author] of this report?', '這份報告是誰寫的？'],
      ]],
      ['manuscript', 'ˋmænjəˏskrɪpt', 'n.', '原稿；手稿', 'submit a manuscript', 3, [], [
        ['The writer sent her [manuscript] to three publishers.', '作家把原稿寄給三家出版社。'],
        ['The editor made notes on every page of the [manuscript].', '編輯在原稿的每一頁都做了註記。'],
      ]],
      ['copyright', 'ˋkɑpɪˏraɪt', 'n.', '著作權', 'copyright law', 2, ['copyrighted', 'copywriter'], [
        ['Who holds the [copyright] on this song?', '這首歌的著作權屬於誰？'],
        ["You must not use this music without the [copyright] owner's permission.", '未經著作權人同意，不得使用這段音樂。'],
      ]],
      ['public relations', 'ˋpʌblɪk rɪˋleʃənz', 'n.', '公關', 'public relations department', 2, [], [
        ['She has worked in [public relations] for over ten years.', '她從事公關工作超過十年。'],
        ['Our [public relations] team will handle the media questions.', '我們的公關團隊會處理媒體的提問。'],
      ]],
      ['spokesperson', 'ˋspoksˏpɝsn̩', 'n.', '發言人', 'company spokesperson', 2, ['spoken', 'spokes'], [
        ['A [spokesperson] for the airline apologized for the delay.', '航空公司發言人為班機延誤致歉。'],
        ["The company's [spokesperson] answered questions from reporters.", '公司發言人回答了記者的提問。'],
      ]],
      ['statement', 'ˋstetmənt', 'n.', '聲明；對帳單', 'issue a statement', 2, ['state', 'stated'], [
        ['The company issued a [statement] about the data leak.', '公司針對資料外洩發表了聲明。'],
        ['Please check your bank [statement] every month.', '請每個月檢查銀行對帳單。'],
      ]],
      ['audience', 'ˋɔdɪəns', 'n.', '觀眾；聽眾', 'a large audience', 1, ['audio', 'audition'], [
        ['The [audience] clapped loudly after the speech.', '演講結束後觀眾熱烈鼓掌。'],
        ['The show is popular with a young [audience].', '這個節目很受年輕觀眾歡迎。'],
      ]],
      ['circulation', 'ˏsɝkjəˋleʃən', 'n.', '發行量；流通；循環', 'daily circulation', 3, ['circulate', 'circulated'], [
        ["The newspaper's daily [circulation] has dropped this year.", '這份報紙的每日發行量今年下滑了。'],
        ['Regular exercise improves blood [circulation].', '規律運動能促進血液循環。'],
      ]],
      ['publicity', 'pʌbˋlɪsətɪ', 'n.', '宣傳；曝光', 'get publicity', 3, ['publicize', 'publicized'], [
        ['The festival got a lot of [publicity] online.', '這個節慶在網路上獲得大量曝光。'],
        ['Bad [publicity] can hurt a small business.', '負面新聞可能傷害小型企業。'],
      ]],
    ],
  },
  {
    id: 'events', track: 'toeic', name: '活動與會展', icon: '🎤', words: [
      ['venue', 'ˋvɛnju', 'n.', '場地', 'event venue', 2, ['avenue', 'revenue'], [
        ['We need to book a [venue] for the year-end party.', '我們需要預訂尾牙的場地。'],
        ['The concert [venue] holds about 2,000 people.', '這個演唱會場地可容納約兩千人。'],
      ]],
      ['host', 'host', 'n./v.', '主辦；主持（人）', 'host an event', 1, ['hosted', 'hostile'], [
        ['Our city will [host] the conference next year.', '我們的城市明年將主辦這場會議。'],
        ['He was the [host] of a popular TV show.', '他曾是一個熱門電視節目的主持人。'],
      ]],
      ['organize', 'ˋɔrgəˏnaɪz', 'v.', '籌辦；整理', 'organize an event', 1, ['organization', 'organizer'], [
        ['Who will [organize] the company picnic this year?', '今年誰要籌辦公司野餐？'],
        ['I need to [organize] my files before the audit.', '查帳前我得把檔案整理好。'],
      ]],
      ['registration', 'ˏrɛdʒɪˋstreʃən', 'n.', '報名；登記', 'online registration', 2, ['register', 'registered'], [
        ['The [registration] fee includes lunch and coffee.', '報名費包含午餐和咖啡。'],
        ['Please arrive early to allow time for [registration].', '請提早到場，預留報到的時間。'],
      ]],
      ['keynote', 'ˋkiˏnot', 'n.', '主題演講', 'keynote speech', 3, ['keynotes', 'keynoted'], [
        ['The CEO will deliver a [keynote] on the future of AI.', '執行長將發表關於 AI 未來的主題演講。'],
        ['Her [keynote] was the highlight of the conference.', '她的主題演講是這場會議的亮點。'],
      ]],
      ['speaker', 'ˋspikɚ', 'n.', '演講者；喇叭', 'guest speaker', 1, ['speech', 'spoken'], [
        ['Our guest [speaker] today is a famous chef.', '今天的特別來賓講者是一位知名主廚。'],
        ['The [speaker] thanked everyone for coming.', '講者感謝大家蒞臨。'],
      ]],
      ['banquet', 'ˋbæŋkwɪt', 'n.', '宴會', 'awards banquet', 2, ['banquets', 'bouquet'], [
        ['An awards [banquet] will be held at the Grand Hotel.', '頒獎晚宴將在大飯店舉行。'],
        ['The [banquet] was attended by more than 300 guests.', '這場宴會有三百多位賓客出席。'],
      ]],
      ['reception', 'rɪˋsɛpʃən', 'n.', '接待處；歡迎會', 'welcome reception', 2, ['receive', 'receptive'], [
        ['Please leave your room key at [reception].', '請把房間鑰匙交給櫃檯。'],
        ['There will be a welcome [reception] after the opening ceremony.', '開幕典禮後會有歡迎酒會。'],
      ]],
      ['sponsor', 'ˋspɑnsɚ', 'n./v.', '贊助（商）', 'main sponsor', 2, ['sponsorship', 'sponsored'], [
        ['A local bank is the main [sponsor] of the marathon.', '一家本地銀行是這場馬拉松的主要贊助商。'],
        ['Several companies agreed to [sponsor] the event.', '有幾家公司同意贊助這個活動。'],
      ]],
      ['seminar', 'ˋsɛməˏnɑr', 'n.', '研討會', 'attend a seminar', 1, ['seminars', 'seminal'], [
        ["I'm attending a [seminar] on digital marketing next week.", '我下週要參加一場數位行銷研討會。'],
        ['The [seminar] starts at 2 p.m. in Room 301.', '研討會下午兩點在 301 室開始。'],
      ]],
      ['workshop', 'ˋwɝkˏʃɑp', 'n.', '工作坊；工作室', 'hold a workshop', 1, ['workshops', 'workable'], [
        ['We held a writing [workshop] for new staff.', '我們為新進員工辦了一場寫作工作坊。'],
        ['The [workshop] is free for all members.', '這個工作坊會員全部免費。'],
      ]],
      ['trade show', 'ˋtred ˏʃo', 'n.', '商展', 'attend a trade show', 2, [], [
        ['We will show our new products at the [trade show] in Tokyo.', '我們會在東京的商展上展出新產品。'],
        ['The [trade show] attracts buyers from all over the world.', '這個商展吸引來自世界各地的買家。'],
      ]],
      ['booth', 'buθ', 'n.', '攤位；亭', 'exhibition booth', 2, ['booths', 'boots'], [
        ['Our [booth] is next to the main entrance.', '我們的攤位在主要入口旁邊。'],
        ['Each company gets a [booth] for three days.', '每家公司都有一個攤位，為期三天。'],
      ]],
      ['admission', 'ədˋmɪʃən', 'n.', '入場（費）；入學許可', 'free admission', 2, ['admit', 'admitted'], [
        ['Children under six get free [admission].', '六歲以下兒童免費入場。'],
        ['[Admission] to the museum is $15.', '博物館門票是十五美元。'],
      ]],
      ['invitation', 'ˏɪnvəˋteʃən', 'n.', '邀請（函）', 'accept an invitation', 1, ['invited', 'inviting'], [
        ['Thank you for your kind [invitation].', '謝謝您的盛情邀請。'],
        ['We sent an [invitation] to every client.', '我們寄了邀請函給每一位客戶。'],
      ]],
      ['ceremony', 'ˋsɛrəˏmonɪ', 'n.', '典禮', 'opening ceremony', 1, ['ceremonial', 'ceremonies'], [
        ['The opening [ceremony] starts at 10 a.m.', '開幕典禮上午十點開始。'],
        ['They had a small wedding [ceremony] by the beach.', '他們在海邊辦了一場小型婚禮。'],
      ]],
      ['award', 'əˋwɔrd', 'n./v.', '獎；頒發', 'win an award', 1, ['awarded', 'awarding'], [
        ['She won an [award] for her design work.', '她的設計作品得了獎。'],
        ['The judges will [award] the prize on Sunday.', '評審將在星期日頒獎。'],
      ]],
      ['nominate', 'ˋnɑməˏnet', 'v.', '提名', 'nominate sb for', 2, ['nomination', 'nominee'], [
        ['You can [nominate] a coworker for Employee of the Month.', '你可以提名同事角逐本月最佳員工。'],
        ['The committee will [nominate] three candidates.', '委員會將提名三位候選人。'],
      ]],
      ['anniversary', 'ˏænəˋvɝsərɪ', 'n.', '週年紀念', 'wedding anniversary', 2, ['anniversaries', 'annual'], [
        ['The company is celebrating its 50th [anniversary] this year.', '公司今年慶祝成立五十週年。'],
        ['Our wedding [anniversary] is next Saturday.', '我們的結婚紀念日是下星期六。'],
      ]],
      ['auditorium', 'ˏɔdəˋtorɪəm', 'n.', '禮堂', 'school auditorium', 2, ['audience', 'audition'], [
        ['The awards ceremony will be held in the [auditorium].', '頒獎典禮將在禮堂舉行。'],
        ['The [auditorium] can seat up to 500 people.', '禮堂最多可容納五百人。'],
      ]],
      ['fundraiser', 'ˋfʌndˏrezɚ', 'n.', '募款活動', 'charity fundraiser', 3, ['funded', 'fundraised'], [
        ['The school held a [fundraiser] to buy new computers.', '學校辦了募款活動來買新電腦。'],
        ['Our team is organizing a charity [fundraiser] next month.', '我們團隊下個月要舉辦慈善募款活動。'],
      ]],
      ['volunteer', 'ˏvɑlənˋtɪr', 'n./v.', '志工；自願', 'volunteer work', 1, ['voluntary', 'voluntarily'], [
        ['We need one more [volunteer] to help at the front desk.', '我們還需要一位志工在服務台幫忙。'],
        ['Would you like to [volunteer] at the food festival?', '你想到美食節當志工嗎？'],
      ]],
      ['orientation', 'ˏorɪɛnˋteʃən', 'n.', '新人說明會；方向', 'new employee orientation', 2, ['orient', 'oriented'], [
        ['All new staff must attend [orientation] on their first day.', '所有新進員工第一天都必須參加新人說明會。'],
        ['The [orientation] for new students begins at 9 a.m.', '新生說明會上午九點開始。'],
      ]],
      ['luncheon', 'ˋlʌntʃən', 'n.', '午餐會', 'business luncheon', 3, ['lunches', 'lunchtime'], [
        ['The club holds a monthly [luncheon] for its members.', '俱樂部每個月為會員舉辦午餐會。'],
        ['A [luncheon] will be served in the main hall at noon.', '中午會在大廳提供午餐。'],
      ]],
      ['lecture', 'ˋlɛktʃɚ', 'n./v.', '演講；講課', 'give a lecture', 1, ['lecturer', 'lectured'], [
        ['Professor Lin will give a [lecture] on climate change.', '林教授將發表一場關於氣候變遷的演講。'],
        ['Tickets for the evening [lecture] are free.', '晚間講座的入場券免費。'],
      ]],
    ],
  },
  {
    id: 'environment', track: 'toeic', name: '環境與能源', icon: '🌱', words: [
      ['environmental', 'ɪnˏvaɪrənˋmɛntl̩', 'adj.', '環境的', 'environmental protection', 2, ['environment', 'environmentally'], [
        ['The factory must follow strict [environmental] regulations.', '這家工廠必須遵守嚴格的環境法規。'],
        ['The report describes the [environmental] effects of the new highway.', '這份報告說明了新高速公路對環境的影響。'],
      ]],
      ['sustainable', 'səˋstenəbl̩', 'adj.', '永續的；可持續的', 'sustainable development', 3, ['sustain', 'sustainability', 'sustainably'], [
        ['The company is looking for more [sustainable] ways to package its products.', '公司正在尋找更永續的產品包裝方式。'],
        ['Is this level of growth really [sustainable]?', '這樣的成長幅度真的能持續下去嗎？'],
      ]],
      ['renewable', 'rɪˋnjuəbl̩', 'adj.', '可再生的；可續約的', 'renewable energy', 2, ['renew', 'renewal'], [
        ['The city plans to get half of its power from [renewable] sources.', '市政府計畫有一半的電力來自再生能源。'],
        ['Wind and solar power are both [renewable].', '風力和太陽能都是可再生的。'],
      ]],
      ['energy', 'ˋɛnɚdʒɪ', 'n.', '能源；精力', 'save energy', 1, ['energetic', 'energize'], [
        ['Turning off the lights when you leave helps save [energy].', '離開時關燈有助於節省能源。'],
        ["I don't have much [energy] after a long day at work.", '工作了一整天之後，我沒什麼精力了。'],
      ]],
      ['emission', 'ɪˋmɪʃən', 'n.', '排放；排放物', 'reduce carbon emissions', 3, ['emit', 'emitted'], [
        ['The new law limits the [emission] of harmful gases.', '新法限制有害氣體的排放。'],
        ['This car meets the latest [emission] standards.', '這輛車符合最新的排放標準。'],
      ]],
      ['pollution', 'pəˋluʃən', 'n.', '污染', 'air pollution', 1, ['pollute', 'polluted'], [
        ['Air [pollution] is a serious problem in many big cities.', '空氣污染是許多大城市的嚴重問題。'],
        ['The factory was fined for causing water [pollution].', '這家工廠因為造成水污染而被罰款。'],
      ]],
      ['conserve', 'kənˋsɝv', 'v.', '節約；保存', 'conserve energy', 2, ['conservation', 'conservative'], [
        ['Please help us [conserve] water by taking shorter showers.', '請縮短淋浴時間，幫我們節約用水。'],
        ['We turn off the heaters at night to [conserve] energy.', '我們晚上會關掉暖氣來節約能源。'],
      ]],
      ['consumption', 'kənˋsʌmpʃən', 'n.', '消耗量；消費', 'energy consumption', 2, ['consume', 'consumer'], [
        ['The new machines have reduced our energy [consumption] by 20 percent.', '新機器讓我們的能源消耗量減少了百分之二十。'],
        ['Water [consumption] rises sharply in summer.', '夏天的用水量會大幅上升。'],
      ]],
      ['waste', 'west', 'n./v.', '廢棄物；浪費', 'reduce waste', 1, ['wasteful', 'wasted'], [
        ['The factory has found new ways to reduce [waste].', '這家工廠找到了減少廢棄物的新方法。'],
        ["Don't [waste] time on emails that aren't important.", '不要把時間浪費在不重要的電子郵件上。'],
      ]],
      ['reduce', 'rɪˋdjus', 'v.', '減少；降低', 'reduce costs', 1, ['reduction', 'reduced'], [
        ['We need to [reduce] the amount of paper we use.', '我們需要減少用紙量。'],
        ['Using LED lights can [reduce] your electricity bill.', '使用 LED 燈可以降低電費。'],
      ]],
      ['eco-friendly', 'ˏikoˋfrɛndlɪ', 'adj.', '環保的', 'eco-friendly products', 2, [], [
        ['The hotel only uses [eco-friendly] cleaning products.', '這家飯店只使用環保清潔用品。'],
        ['Bamboo straws are an [eco-friendly] choice.', '竹吸管是環保的選擇。'],
      ]],
      ['solar', 'ˋsolɚ', 'adj.', '太陽的；太陽能的', 'solar panels', 1, [], [
        ['The office building has [solar] panels on the roof.', '這棟辦公大樓的屋頂上有太陽能板。'],
        ['[Solar] power is cheap and clean in sunny Australia.', '在陽光充足的澳洲，太陽能便宜又乾淨。'],
      ]],
      ['carbon footprint', 'ˋkɑrbən ˋfʊtˏprɪnt', 'n.', '碳足跡', 'reduce your carbon footprint', 3, [], [
        ['Taking the train instead of flying can lower your [carbon footprint].', '搭火車而不搭飛機可以降低你的碳足跡。'],
        ['The company publishes its [carbon footprint] every year.', '這家公司每年都會公布碳足跡。'],
      ]],
      ['climate', 'ˋklaɪmɪt', 'n.', '氣候', 'climate change', 1, ['climatic', 'climatically'], [
        ['The [climate] in Perth is hot and dry in summer.', '伯斯夏天的氣候炎熱乾燥。'],
        ['Grapes grow well in a mild [climate].', '葡萄在溫和的氣候下長得很好。'],
      ]],
      ['resource', 'ˋrisors', 'n.', '資源', 'natural resources', 1, ['resourceful', 'resourced'], [
        ['Water is a precious [resource] in dry areas.', '在乾燥地區，水是珍貴的資源。'],
        ['The library is a great [resource] for new employees.', '圖書館對新進員工來說是很好的資源。'],
      ]],
      ['preserve', 'prɪˋzɝv', 'v.', '保護；保存', 'preserve the environment', 2, ['preservation', 'preservative'], [
        ['The town is working hard to [preserve] its old buildings.', '這個小鎮努力保存它的老建築。'],
        ['The park was created to [preserve] the forest and its wildlife.', '這座公園是為了保護森林和其中的野生動物而設立的。'],
      ]],
      ['landfill', 'ˋlændˏfɪl', 'n.', '垃圾掩埋場', 'send waste to landfill', 3, [], [
        ['Most of this trash will end up in a [landfill].', '這些垃圾大部分最後都會進到掩埋場。'],
        ['The city plans to close the old [landfill] next year.', '市政府計畫明年關閉舊的垃圾掩埋場。'],
      ]],
      ['disposable', 'dɪˋspozəbl̩', 'adj.', '拋棄式的；用完即丟的', 'disposable cups', 2, ['dispose', 'disposal'], [
        ['The café has stopped using [disposable] cups.', '這家咖啡店已經不再使用拋棄式杯子。'],
        ["Please don't use [disposable] chopsticks.", '請不要使用免洗筷。'],
      ]],
      ['reusable', 'riˋjuzəbl̩', 'adj.', '可重複使用的', 'reusable bags', 2, ['reuse', 'reusability'], [
        ['These glass containers are [reusable] and easy to clean.', '這些玻璃容器可以重複使用，而且很好清洗。'],
        ['Are the plastic lunch boxes [reusable]?', '這些塑膠便當盒可以重複使用嗎？'],
      ]],
      ['habitat', 'ˋhæbəˏtæt', 'n.', '棲息地', 'natural habitat', 3, ['inhabit', 'habitable'], [
        ['The wetland is an important [habitat] for wild birds.', '這片濕地是野鳥重要的棲息地。'],
        ['The new road will destroy the [habitat] of many animals.', '這條新道路會破壞許多動物的棲息地。'],
      ]],
      ['electricity', 'ɪˏlɛkˋtrɪsətɪ', 'n.', '電力；電', 'save electricity', 1, ['electrical', 'electrify'], [
        ['The storm cut off [electricity] to the whole area.', '暴風雨造成整個地區停電。'],
        ['Air conditioners use a lot of [electricity].', '冷氣很耗電。'],
      ]],
      ['organic', 'ɔrˋgænɪk', 'adj.', '有機的', 'organic food', 1, ['organize', 'organically'], [
        ['This farm grows [organic] vegetables without chemicals.', '這座農場不用化學藥劑種植有機蔬菜。'],
        ['[Organic] food is usually more expensive.', '有機食品通常比較貴。'],
      ]],
      ['shortage', 'ˋʃɔrtɪdʒ', 'n.', '短缺', 'a shortage of', 2, ['short', 'shorten', 'shortly'], [
        ['There is a [shortage] of nurses in rural areas.', '鄉下地區缺乏護理師。'],
        ['The drought led to a serious water [shortage].', '乾旱導致嚴重缺水。'],
      ]],
      ['drought', 'draʊt', 'n.', '乾旱', 'a severe drought', 2, [], [
        ['Farmers lost many crops during the [drought].', '乾旱期間農民損失了許多作物。'],
        ['The city limited water use because of the [drought].', '因為乾旱，市政府限制用水。'],
      ]],
      ['wildlife', 'ˋwaɪldˏlaɪf', 'n.', '野生動物', 'wildlife protection', 2, ['wild', 'wildly'], [
        ['The national park is home to a lot of [wildlife].', '這座國家公園有許多野生動物。'],
        ['We saw kangaroos and other [wildlife] on our road trip.', '我們在公路旅行中看到袋鼠和其他野生動物。'],
      ]],
    ],
  },
  {
    id: 'biztrip', track: 'toeic', name: '商務出差', icon: '🧳', words: [
      ['business trip', 'ˋbɪznɪs ˏtrɪp', 'n.', '出差', 'go on a business trip', 1, [], [
        ['My manager is away on a [business trip] this week.', '我的主管這週出差不在。'],
        ["I'm going on a [business trip] to Tokyo next month.", '我下個月要去東京出差。'],
      ]],
      ['expense report', 'ɪkˋspɛns rɪˋport', 'n.', '費用報告；報帳單', 'submit an expense report', 2, [], [
        ['Please submit your [expense report] within a week of returning.', '請在回來後一週內交出報帳單。'],
        ['Keep all your receipts for the [expense report].', '所有收據都要留著報帳用。'],
      ]],
      ['lodging', 'ˋlɑdʒɪŋ', 'n.', '住宿', 'food and lodging', 3, ['lodged', 'lodger'], [
        ['The company will pay for your travel and [lodging].', '公司會支付你的交通和住宿費用。'],
        ['Finding cheap [lodging] near the conference center was hard.', '要在會議中心附近找到便宜的住宿很難。'],
      ]],
      ['shuttle', 'ˋʃʌtl̩', 'n.', '接駁車', 'airport shuttle', 2, ['shuttled', 'shuttling'], [
        ['The hotel offers a free [shuttle] to the airport.', '飯店提供免費的機場接駁車。'],
        ['The [shuttle] leaves every 20 minutes from the main gate.', '接駁車每 20 分鐘從大門口發車。'],
      ]],
      ['rental car', 'ˋrɛntl̩ ˏkɑr', 'n.', '租用的車；租車', 'return the rental car', 1, [], [
        ['We picked up our [rental car] at the airport.', '我們在機場取了租來的車。'],
        ['The [rental car] must be returned with a full tank.', '租的車必須加滿油歸還。'],
      ]],
      ['layover', 'ˋleˏovɚ', 'n.', '轉機停留', 'a three-hour layover', 3, [], [
        ['We have a three-hour [layover] in Singapore.', '我們在新加坡要轉機停留三個小時。'],
        ['I bought a coffee during my [layover] in Hong Kong.', '我在香港轉機的空檔買了一杯咖啡。'],
      ]],
      ['connecting flight', 'kəˋnɛktɪŋ ˏflaɪt', 'n.', '轉機航班', 'catch a connecting flight', 2, [], [
        ['Our first flight was late, so we missed the [connecting flight].', '我們的第一段班機誤點，所以錯過了轉機航班。'],
        ['The [connecting flight] to Brisbane leaves from Gate 12.', '飛往布里斯本的轉機航班在 12 號登機門出發。'],
      ]],
      ['frequent flyer', 'ˋfrikwənt ˋflaɪɚ', 'n.', '飛行常客', 'frequent flyer program', 2, [], [
        ['As a [frequent flyer], she earns a lot of free miles.', '身為飛行常客，她累積了很多免費里程。'],
        ['Join our [frequent flyer] program to earn points on every trip.', '加入我們的飛行常客計畫，每次搭乘都能累積點數。'],
      ]],
      ['overseas', 'ˋovɚˋsiz', 'adj./adv.', '海外的；在海外', 'overseas branch', 1, ['oversee', 'overseer'], [
        ['Our company has three [overseas] offices.', '我們公司有三個海外辦事處。'],
        ['She is planning to work [overseas] next year.', '她打算明年到海外工作。'],
      ]],
      ['abroad', 'əˋbrɔd', 'adv.', '在國外；到國外', 'study abroad', 1, [], [
        ['Many students want to study [abroad] after college.', '很多學生大學畢業後想出國留學。'],
        ['Do you often travel [abroad] for work?', '你常常因為工作出國嗎？'],
      ]],
      ['jet lag', 'dʒɛt læg', 'n.', '時差（不適）', 'get over jet lag', 1, [], [
        ['I always have bad [jet lag] after flying to Europe.', '我每次飛到歐洲都時差很嚴重。'],
        ['It took me three days to get over my [jet lag].', '我花了三天才調好時差。'],
      ]],
      ['travel agency', 'ˋtrævl̩ ˋedʒənsɪ', 'n.', '旅行社', 'book through a travel agency', 1, [], [
        ['We booked the whole trip through a [travel agency].', '我們整趟旅程都是透過旅行社訂的。'],
        ['The [travel agency] arranged our hotel and flights.', '旅行社幫我們安排了飯店和機票。'],
      ]],
      ['economy class', 'ɪˋkɑnəmɪ ˏklæs', 'n.', '經濟艙', 'fly economy class', 1, [], [
        ['Staff must fly [economy class] on short trips.', '短程出差的員工必須搭經濟艙。'],
        ['The seats in [economy class] are a bit narrow.', '經濟艙的座位有點窄。'],
      ]],
      ['carry-on', 'ˋkærɪˏɑn', 'n.', '隨身行李', 'carry-on bag', 2, [], [
        ['You can bring one [carry-on] and one small personal item.', '你可以帶一件隨身行李和一件小型個人物品。'],
        ['Please put your [carry-on] in the overhead bin.', '請把隨身行李放進上方的置物櫃。'],
      ]],
      ['baggage claim', 'ˋbægɪdʒ ˏklem', 'n.', '行李提領處', 'baggage claim area', 2, [], [
        ["I'll meet you at [baggage claim] after we land.", '降落後我們在行李提領處碰面。'],
        ['Our suitcases took forever to arrive at [baggage claim].', '我們的行李箱過了好久才送到行李提領處。'],
      ]],
      ['overnight', 'ˋovɚˋnaɪt', 'adj./adv.', '過夜的；一夜之間', 'stay overnight', 2, [], [
        ['The meeting ran late, so we stayed [overnight] in Osaka.', '會議拖得很晚，所以我們在大阪過夜。'],
        ['The price includes one [overnight] stay at the hotel.', '這個價格包含飯店住宿一晚。'],
      ]],
      ['time zone', 'taɪm zon', 'n.', '時區', 'a different time zone', 1, [], [
        ['Sydney is in a different [time zone] from Perth.', '雪梨和伯斯在不同的時區。'],
        ['Remember to check the [time zone] before you set up the call.', '安排通話前記得先確認時區。'],
      ]],
      ['check in', 'tʃɛk ɪn', 'v.', '辦理入住；報到', 'check in at the front desk', 1, [], [
        ['You can [check in] at the hotel after 2 p.m.', '你可以在下午兩點後辦理飯店入住。'],
        ['Please [check in] at the counter two hours before your flight.', '請在班機起飛前兩小時到櫃檯報到。'],
      ]],
      ['transportation', 'ˏtrænspɚˋteʃən', 'n.', '交通運輸；交通工具', 'public transportation', 1, ['transportable', 'transported'], [
        ['Most employees use public [transportation] to get to work.', '大部分員工搭大眾運輸上班。'],
        ['The company will pay for your [transportation] from the airport.', '公司會支付你從機場出發的交通費。'],
      ]],
      ['suite', 'swit', 'n.', '套房', 'a hotel suite', 2, ['suit', 'sweet'], [
        ['The [suite] has a living room and two bedrooms.', '這間套房有一個客廳和兩間臥室。'],
        ['We upgraded the client to a [suite] with an ocean view.', '我們幫客戶升級到海景套房。'],
      ]],
      ['fully booked', 'ˋfʊlɪ bʊkt', 'adj.', '客滿的；預訂一空', 'be fully booked', 2, [], [
        ['Sorry, the hotel is [fully booked] that weekend.', '抱歉，那個週末飯店已經客滿了。'],
        ['All the flights to Melbourne were [fully booked].', '飛往墨爾本的班機全都訂滿了。'],
      ]],
      ['in advance', 'ɪn ədˋvæns', 'adv.', '事先；提前', 'book in advance', 1, [], [
        ['Please book your flight at least two weeks [in advance].', '請至少提前兩週訂機票。'],
        ['Thanks [in advance] for your help.', '先謝謝你的幫忙。'],
      ]],
      ['on time', 'ɑn taɪm', 'adv.', '準時', 'arrive on time', 1, [], [
        ['The flight left [on time] despite the rain.', '雖然下雨，班機還是準時起飛。'],
        ['Please make sure you hand in the report [on time].', '請務必準時交報告。'],
      ]],
      ['domestic', 'dəˋmɛstɪk', 'adj.', '國內的；家庭的', 'domestic flights', 2, ['domesticate', 'domestically'], [
        ['The [domestic] terminal is a short walk from the international one.', '國內線航廈離國際線航廈只要走一小段路。'],
        ['[Domestic] sales rose by 5 percent this quarter.', '這一季的國內銷售成長了百分之五。'],
      ]],
      ['international', 'ˏɪntɚˋnæʃənl̩', 'adj.', '國際的', 'international conference', 1, ['internationally', 'internationalize'], [
        ['She will speak at an [international] conference in Singapore.', '她將在新加坡的一場國際會議上演講。'],
        ['Please arrive three hours early for [international] flights.', '搭國際航班請提早三小時抵達。'],
      ]],
    ],
  },
  {
    id: 'management', track: 'toeic', name: '管理與策略', icon: '🏢', words: [
      ['management', 'ˋmænɪdʒmənt', 'n.', '管理；管理階層', 'senior management', 1, ['manage', 'manageable', 'managerial'], [
        ['The decision was made by senior [management].', '這個決定是由高層主管做出的。'],
        ['Good time [management] helps you finish projects on schedule.', '良好的時間管理能幫你如期完成專案。'],
      ]],
      ['executive', 'ɪgˋzɛkjʊtɪv', 'n./adj.', '主管；高階主管的', 'chief executive officer', 2, ['execute', 'execution'], [
        ['She was promoted to a senior [executive] position.', '她被升為高階主管職位。'],
        ['An [executive] from head office will visit us on Monday.', '總公司的一位主管星期一會來拜訪我們。'],
      ]],
      ['board of directors', 'bord əv dəˋrɛktɚz', 'n.', '董事會', 'report to the board of directors', 2, [], [
        ['The [board of directors] approved the new budget.', '董事會核准了新預算。'],
        ['She was invited to join the [board of directors].', '她受邀加入董事會。'],
      ]],
      ['chairperson', 'ˋtʃɛrˏpɝsn̩', 'n.', '主席；董事長', 'committee chairperson', 2, [], [
        ['The [chairperson] opened the meeting at 9 a.m.', '主席在早上九點宣布會議開始。'],
        ['She was elected [chairperson] of the committee.', '她被選為委員會主席。'],
      ]],
      ['merger', 'ˋmɝdʒɚ', 'n.', '合併', 'a merger between two companies', 3, ['merge', 'merged'], [
        ['The proposed [merger] still needs government approval.', '這項合併提案仍需要政府核准。'],
        ['Hundreds of jobs were cut after the [merger] was announced.', '合併案宣布後，有數百個職位被裁撤。'],
      ]],
      ['acquisition', 'ˏækwəˋzɪʃən', 'n.', '收購；取得', 'mergers and acquisitions', 3, ['acquire', 'acquired'], [
        ['The [acquisition] of the startup cost $50 million.', '收購這家新創公司花了五千萬美元。'],
        ['The company announced its latest [acquisition] on Monday.', '公司在星期一宣布了最新的收購案。'],
      ]],
      ['subsidiary', 'səbˋsɪdɪˏɛrɪ', 'n.', '子公司', 'a wholly owned subsidiary', 3, ['subsidy', 'subsidize'], [
        ['The firm opened a [subsidiary] in Vietnam last year.', '這家公司去年在越南成立了子公司。'],
        ['Our Australian [subsidiary] handles all sales in the region.', '我們的澳洲子公司負責該地區所有的銷售。'],
      ]],
      ['stakeholder', 'ˋstekˏholdɚ', 'n.', '利害關係人', 'key stakeholders', 3, [], [
        ['Every [stakeholder] was invited to give feedback on the plan.', '每一位利害關係人都受邀對計畫提供意見。'],
        ['The manager met with each [stakeholder] before the project started.', '專案開始前，經理和每位利害關係人都見了面。'],
      ]],
      ['shareholder', 'ˋʃɛrˏholdɚ', 'n.', '股東', 'shareholder meeting', 2, [], [
        ['Each [shareholder] will receive a copy of the annual report.', '每位股東都會收到一份年報。'],
        ['The [shareholder] meeting will be held in May.', '股東大會將在五月舉行。'],
      ]],
      ['restructure', 'riˋstrʌktʃɚ', 'v.', '重組；改組', 'restructure the company', 3, ['restructuring', 'restructured'], [
        ['The company plans to [restructure] its sales department.', '公司計畫重組業務部門。'],
        ['We had to [restructure] the loan to lower our monthly payments.', '我們必須重新調整貸款，降低每月還款金額。'],
      ]],
      ['oversee', 'ˋovɚˋsi', 'v.', '監督；管理', 'oversee a project', 2, ['overseas', 'overseer'], [
        ['Ms. Lee will [oversee] the opening of the new branch.', '李小姐將負責督導新分店的開幕。'],
        ['Who is going to [oversee] the training program?', '誰要負責監督訓練計畫？'],
      ]],
      ['delegate', 'ˋdɛləˏget', 'v.', '委派；授權', 'delegate tasks', 2, ['delegation', 'delegated'], [
        ['A good manager knows how to [delegate] tasks.', '好的主管懂得如何分派工作。'],
        ['You should [delegate] some of your work to your assistant.', '你應該把一些工作交給你的助理。'],
      ]],
      ['implement', 'ˋɪmpləˏmɛnt', 'v.', '實施；執行', 'implement a plan', 2, ['implementation', 'implemented'], [
        ['The new policy will be easy to [implement].', '新政策執行起來會很容易。'],
        ['We plan to [implement] the new software next month.', '我們打算下個月導入新軟體。'],
      ]],
      ['initiative', 'ɪˋnɪʃətɪv', 'n.', '計畫；主動性', 'take the initiative', 3, ['initiate', 'initial'], [
        ['The city launched a new [initiative] to reduce traffic.', '市政府推出了一項減少交通量的新計畫。'],
        ['She showed great [initiative] by solving the problem herself.', '她自己解決了問題，展現出很強的主動性。'],
      ]],
      ['milestone', 'ˋmaɪlˏston', 'n.', '里程碑', 'reach a milestone', 2, [], [
        ['Launching the app was a major [milestone] for our team.', '推出這個 App 是我們團隊的重要里程碑。'],
        ['Our store reached a big [milestone] this year: one million customers.', '我們的店今年達到一個重要里程碑：一百萬名顧客。'],
      ]],
      ['outcome', 'ˋaʊtˏkʌm', 'n.', '結果', 'the outcome of', 2, [], [
        ['We are still waiting for the [outcome] of the negotiations.', '我們還在等談判的結果。'],
        ['Everyone was happy with the [outcome] of the game.', '大家都對比賽結果很滿意。'],
      ]],
      ['assess', 'əˋsɛs', 'v.', '評估', 'assess performance', 2, ['assessment', 'assessor'], [
        ["Managers [assess] each employee's performance twice a year.", '主管每年評估每位員工的表現兩次。'],
        ['An expert came to [assess] the damage after the storm.', '暴風雨過後，一位專家來評估損害。'],
      ]],
      ['coordinate', 'koˋɔrdn̩ˏet', 'v.', '協調', 'coordinate with', 2, ['coordination', 'coordinator'], [
        ['Kevin will [coordinate] the schedule for the sales conference.', 'Kevin 會負責協調業務會議的行程。'],
        ['We need someone to [coordinate] with the overseas team.', '我們需要有人和海外團隊協調。'],
      ]],
      ['productivity', 'ˏprodʌkˋtɪvətɪ', 'n.', '生產力', 'improve productivity', 2, ['productive', 'productively'], [
        ['The new software has improved our [productivity].', '新軟體提升了我們的生產力。'],
        ['Taking short breaks can increase [productivity].', '適時短暫休息可以提高生產力。'],
      ]],
      ['morale', 'məˋræl', 'n.', '士氣', 'boost morale', 3, ['moral', 'morally'], [
        ['The team-building trip really boosted [morale].', '這次團隊建立旅遊大大提振了士氣。'],
        ['Staff [morale] has been low since the layoffs.', '裁員之後員工士氣一直很低落。'],
      ]],
      ['leadership', 'ˋlidɚʃɪp', 'n.', '領導（力）；領導階層', 'leadership skills', 1, ['leader', 'leading'], [
        ['She showed strong [leadership] during the crisis.', '她在危機中展現了強大的領導力。'],
        ['The company is now under new [leadership].', '公司現在由新的領導階層掌管。'],
      ]],
      ['mission statement', 'ˋmɪʃən ˋstetmənt', 'n.', '使命宣言', 'company mission statement', 3, [], [
        ['Our [mission statement] is printed on the wall of the lobby.', '我們的使命宣言印在大廳的牆上。'],
        ['The CEO asked us to help rewrite the [mission statement].', '執行長請我們協助改寫使命宣言。'],
      ]],
      ['division', 'dəˋvɪʒən', 'n.', '部門；分部', 'sales division', 2, ['divided', 'divisive'], [
        ['He was transferred to the marketing [division].', '他被調到行銷部門。'],
        ['Each [division] has its own budget.', '每個部門都有自己的預算。'],
      ]],
      ['streamline', 'ˋstrimˏlaɪn', 'v.', '簡化（流程）；使更有效率', 'streamline the process', 3, ['streamlined', 'streamlining'], [
        ['We want to [streamline] the ordering process.', '我們想簡化訂購流程。'],
        ['New software can help [streamline] our daily tasks.', '新軟體可以幫助簡化我們的日常工作。'],
      ]],
      ['benchmark', 'ˋbɛntʃˏmɑrk', 'n.', '基準；標竿', 'set a benchmark', 3, [], [
        ["Last year's sales will be used as a [benchmark].", '去年的業績會被當作基準。'],
        ['The new phone sets a high [benchmark] for battery life.', '這支新手機在電池續航力上立下了很高的標竿。'],
      ]],
    ],
  },
  {
    id: 'adverbs', track: 'toeic', name: 'Part 5 高頻副詞', icon: '⚡', words: [
      ['approximately', 'əˋprɑksəmɪtlɪ', 'adv.', '大約', 'approximately 30 minutes', 2, ['approximate', 'approximation'], [
        ['The flight takes [approximately] three hours.', '這班飛機大約要飛三個小時。'],
        ['[Approximately] 200 people attended the product launch.', '大約有 200 人參加了產品發表會。'],
      ]],
      ['immediately', 'ɪˋmidɪɪtlɪ', 'adv.', '立刻', 'take effect immediately', 1, ['immediate', 'immediacy'], [
        ['Please report any safety problems to your supervisor [immediately].', '任何安全問題請立刻向你的主管回報。'],
        ['The new parking policy takes effect [immediately].', '新的停車規定即刻生效。'],
      ]],
      ['previously', 'ˋprivɪəslɪ', 'adv.', '先前', 'as previously mentioned', 2, ['previous', 'preview'], [
        ['Ms. Lee [previously] worked as a sales manager in Tokyo.', '李小姐先前在東京擔任業務經理。'],
        ['The meeting was [previously] scheduled for Monday.', '這場會議原本排在星期一。'],
      ]],
      ['recently', 'ˋrisn̩tlɪ', 'adv.', '最近', 'recently opened', 1, ['recent', 'recency'], [
        ['The company [recently] opened a new branch in Kaohsiung.', '這家公司最近在高雄開了一間新分店。'],
        ['We have [recently] updated our privacy policy.', '我們最近更新了隱私權政策。'],
      ]],
      ['frequently', 'ˋfrikwəntlɪ', 'adv.', '經常', 'frequently asked questions', 2, ['frequent', 'frequency'], [
        ['The printer on the third floor [frequently] breaks down.', '三樓的印表機經常故障。'],
        ['Our sales representatives travel [frequently] to Singapore.', '我們的業務代表經常到新加坡出差。'],
      ]],
      ['consequently', 'ˋkɑnsəkwɛntlɪ', 'adv.', '因此', 'and consequently', 3, ['consequent', 'consequence'], [
        ['The supplier raised its prices. [Consequently], we had to find a new one.', '供應商漲價了，因此我們必須另找一家。'],
        ['The highway was closed and, [consequently], several employees arrived late.', '高速公路封閉，因此有好幾位員工遲到。'],
      ]],
      ['therefore', 'ˋðɛrˏfor', 'adv.', '因此', 'and therefore', 2, [], [
        ['The office will be closed on Monday. [Therefore], all meetings will be moved to Tuesday.', '辦公室星期一不開放，因此所有會議都改到星期二。'],
        ['Our costs have increased, and we must [therefore] raise our prices.', '我們的成本增加了，因此必須調漲價格。'],
      ]],
      ['however', 'haʊˋɛvɚ', 'adv.', '然而', 'however, ...', 1, [], [
        ['The new system is faster. [However], it is harder to use.', '新系統比較快，然而比較難用。'],
        ['The hotel is expensive; [however], it is very close to the airport.', '這家飯店很貴，不過離機場很近。'],
      ]],
      ['nevertheless', 'ˏnɛvɚðəˋlɛs', 'adv.', '儘管如此', 'but nevertheless', 3, [], [
        ['Sales were slow in January. [Nevertheless], the company met its annual target.', '一月的銷售很慢，儘管如此，公司還是達成了年度目標。'],
        ['The task was difficult; [nevertheless], the team finished it on time.', '這項任務很困難，儘管如此，團隊還是準時完成了。'],
      ]],
      ['furthermore', 'ˋfɝðɚˏmor', 'adv.', '此外', 'furthermore, ...', 3, [], [
        ['The new office is larger. [Furthermore], it is closer to the train station.', '新辦公室比較大，此外離火車站也比較近。'],
        ['The software is easy to use. [Furthermore], it is free for small businesses.', '這套軟體很好用，此外小型企業可以免費使用。'],
      ]],
      ['moreover', 'morˋovɚ', 'adv.', '而且', 'moreover, ...', 3, [], [
        ['The plan is too expensive. [Moreover], it would take two years to complete.', '這個計畫太貴了，而且要兩年才能完成。'],
        ['Ms. Ito has strong sales skills; [moreover], she speaks three languages.', '伊藤小姐的銷售能力很強，而且會說三種語言。'],
      ]],
      ['otherwise', 'ˋʌðɚˏwaɪz', 'adv.', '否則', 'unless otherwise stated', 2, [], [
        ['Please submit your report by Friday; [otherwise], it will not be reviewed.', '請在星期五前交報告，否則不會被審閱。'],
        ['Save your work often. [Otherwise], you may lose important data.', '要經常存檔，否則你可能會遺失重要資料。'],
      ]],
      ['accordingly', 'əˋkɔrdɪŋlɪ', 'adv.', '相應地；因此', 'act accordingly', 3, ['accord', 'accordance'], [
        ['Fuel prices have risen, so we have adjusted our budget [accordingly].', '油價上漲了，所以我們相應地調整了預算。'],
        ['Please read the safety instructions and act [accordingly].', '請閱讀安全須知並照著做。'],
      ]],
      ['significantly', 'sɪgˋnɪfəkəntlɪ', 'adv.', '顯著地', 'increase significantly', 2, ['significant', 'significance', 'signify'], [
        ['Sales have increased [significantly] since the advertising campaign.', '廣告活動之後，銷售量顯著增加。'],
        ['The new software [significantly] reduces processing time.', '新軟體大幅縮短了處理時間。'],
      ]],
      ['gradually', 'ˋgrædʒʊəlɪ', 'adv.', '逐漸地', 'gradually increase', 2, ['gradual', 'graduate'], [
        ['Prices are expected to rise [gradually] over the next year.', '預計價格在明年會逐漸上漲。'],
        ['The company [gradually] expanded into overseas markets.', '這家公司逐步拓展到海外市場。'],
      ]],
      ['temporarily', 'ˏtɛmpəˋrɛrəlɪ', 'adv.', '暫時地', 'temporarily closed', 2, ['temporary', 'temper'], [
        ['The elevator is [temporarily] out of service.', '電梯暫時停止使用。'],
        ['The website will be [temporarily] unavailable during maintenance.', '網站在維修期間會暫時無法使用。'],
      ]],
      ['regularly', 'ˋrɛgjəlɚlɪ', 'adv.', '定期地', 'regularly scheduled', 1, ['regular', 'regulate', 'regularity'], [
        ['Employees are asked to change their passwords [regularly].', '員工被要求定期更改密碼。'],
        ['The equipment is [regularly] inspected by our technicians.', '這些設備由我們的技術人員定期檢查。'],
      ]],
      ['promptly', 'ˋprɑmptlɪ', 'adv.', '迅速地；準時地', 'respond promptly', 2, ['prompt', 'promptness'], [
        ["Ms. Chen [promptly] responded to the customer's complaint.", '陳小姐迅速回覆了顧客的投訴。'],
        ['Our team [promptly] replaced the damaged items.', '我們的團隊很快就更換了損壞的商品。'],
      ]],
      ['primarily', 'praɪˋmɛrəlɪ', 'adv.', '主要地', 'primarily responsible for', 3, ['primary', 'prime'], [
        ['This laptop is designed [primarily] for students.', '這台筆電主要是為學生設計的。'],
        ['The delay was caused [primarily] by bad weather.', '延誤主要是天候不佳造成的。'],
      ]],
      ['relatively', 'ˋrɛlətɪvlɪ', 'adv.', '相對地', 'relatively low', 2, ['relative', 'relation', 'relate'], [
        ['The new model is [relatively] inexpensive.', '新機型相對便宜。'],
        ['Office rents in this area are [relatively] low.', '這一區的辦公室租金相對較低。'],
      ]],
      ['eventually', 'ɪˋvɛntʃʊəlɪ', 'adv.', '最終', 'eventually lead to', 2, ['eventual', 'event'], [
        ['The two companies [eventually] reached an agreement.', '兩家公司最後達成了協議。'],
        ['After several delays, the project was [eventually] completed in May.', '經過幾次延誤，這個專案最終在五月完成。'],
      ]],
      ['especially', 'əˋspɛʃəlɪ', 'adv.', '特別是', 'especially popular', 1, ['special', 'specialty'], [
        ['This area is [especially] popular with tourists.', '這一區特別受觀光客歡迎。'],
        ['Sales were strong this year, [especially] in Asia.', '今年的銷售很好，特別是在亞洲。'],
      ]],
      ['unfortunately', 'ʌnˋfɔrtʃənɪtlɪ', 'adv.', '不幸地', 'unfortunately, ...', 1, ['unfortunate', 'fortune'], [
        ['[Unfortunately], your flight has been canceled.', '很遺憾，您的班機已經取消了。'],
        ["The CEO is [unfortunately] unable to attend today's meeting.", '很可惜，執行長無法出席今天的會議。'],
      ]],
      ['separately', 'ˋsɛpərɪtlɪ', 'adv.', '分開地', 'sold separately', 2, ['separate', 'separation'], [
        ['Meals are not included and must be paid for [separately].', '餐點不包含在內，必須另外付費。'],
        ['The two candidates were interviewed [separately].', '兩位應徵者分別接受面試。'],
      ]],
      ['shortly', 'ˋʃɔrtlɪ', 'adv.', '不久；很快', 'shortly after', 2, ['short', 'shorten', 'shortage'], [
        ['The meeting will begin [shortly].', '會議很快就要開始了。'],
        ['[Shortly] after the merger was announced, the CEO resigned.', '合併案宣布後不久，執行長就辭職了。'],
      ]],
    ],
  },
  {
    id: 'adjectives', track: 'toeic', name: 'Part 5 高頻形容詞', icon: '✨', words: [
      ['mandatory', 'ˋmændəˏtorɪ', 'adj.', '強制的', 'mandatory training', 3, ['mandate', 'demand'], [
        ['Attendance at the safety training is [mandatory] for all staff.', '所有員工都必須參加安全訓練。'],
        ['Wearing a helmet is [mandatory] on the construction site.', '在工地一定要戴安全帽。'],
      ]],
      ['eligible', 'ˋɛlɪdʒəbl̩', 'adj.', '有資格的', 'eligible for a bonus', 3, ['eligibility', 'elect'], [
        ['Full-time employees are [eligible] for the annual bonus.', '正職員工有資格領年終獎金。'],
        ['Customers who spend over $100 are [eligible] for free shipping.', '消費滿 100 美元的顧客可享免運費。'],
      ]],
      ['tentative', 'ˋtɛntətɪv', 'adj.', '暫定的', 'tentative schedule', 3, ['tentatively', 'attentive'], [
        ['We have reached a [tentative] agreement with the supplier.', '我們和供應商達成了初步協議。'],
        ['The [tentative] schedule will be confirmed next week.', '暫定的時程下週會確認。'],
      ]],
      ['preliminary', 'prɪˋlɪməˏnɛrɪ', 'adj.', '初步的', 'preliminary results', 3, ['preliminarily', 'preliminaries'], [
        ['The [preliminary] results of the survey look promising.', '問卷的初步結果看起來很有希望。'],
        ['We will hold a [preliminary] meeting with the client on Thursday.', '我們星期四會和客戶開一場初步會議。'],
      ]],
      ['comprehensive', 'ˏkɑmprɪˋhɛnsɪv', 'adj.', '全面的', 'comprehensive review', 3, ['comprehend', 'comprehension', 'comprehensively'], [
        ['The new employee handbook is very [comprehensive].', '新的員工手冊內容非常完整。'],
        ['We offer a [comprehensive] insurance plan for all employees.', '我們為所有員工提供全方位的保險方案。'],
      ]],
      ['considerable', 'kənˋsɪdərəbl̩', 'adj.', '相當大的', 'a considerable amount of', 2, ['consider', 'considerably', 'consideration'], [
        ['The project required a [considerable] amount of time.', '這個專案花了相當多的時間。'],
        ['There has been [considerable] interest in our new product.', '我們的新產品受到相當大的關注。'],
      ]],
      ['substantial', 'səbˋstænʃəl', 'adj.', '大量的；可觀的', 'a substantial increase', 3, ['substance', 'substantially', 'substantiate'], [
        ['The company made a [substantial] profit last year.', '這家公司去年獲利可觀。'],
        ['Employees received a [substantial] increase in salary.', '員工獲得了大幅加薪。'],
      ]],
      ['reliable', 'rɪˋlaɪəbl̩', 'adj.', '可靠的', 'a reliable supplier', 2, ['rely', 'reliably', 'reliability'], [
        ['We are looking for a [reliable] supplier of packaging materials.', '我們正在尋找可靠的包裝材料供應商。'],
        ['The new delivery service is fast and [reliable].', '新的配送服務又快又可靠。'],
      ]],
      ['flexible', 'ˋflɛksəbl̩', 'adj.', '有彈性的', 'flexible working hours', 2, ['flexibility', 'flexibly'], [
        ['The company offers [flexible] working hours.', '這家公司提供彈性工時。'],
        ['Our payment terms are quite [flexible].', '我們的付款條件相當有彈性。'],
      ]],
      ['adequate', 'ˋædəkwɪt', 'adj.', '足夠的；適當的', 'adequate space', 3, ['adequately', 'adequacy'], [
        ['The room does not have [adequate] space for 50 people.', '這個房間沒有足夠的空間容納 50 人。'],
        ['Make sure there is [adequate] lighting in the warehouse.', '確保倉庫裡有足夠的照明。'],
      ]],
      ['accurate', 'ˋækjərɪt', 'adj.', '準確的', 'accurate information', 2, ['accurately', 'accuracy'], [
        ['Please make sure all the figures in the report are [accurate].', '請確認報告中的所有數字都正確。'],
        ['We need [accurate] information about our customers.', '我們需要關於顧客的準確資訊。'],
      ]],
      ['essential', 'ɪˋsɛnʃəl', 'adj.', '必要的', 'essential for', 2, ['essence', 'essentially'], [
        ['Good communication skills are [essential] for this position.', '良好的溝通能力是這個職位必備的。'],
        ['Please pack only [essential] items for the business trip.', '出差請只帶必需品。'],
      ]],
      ['sufficient', 'səˋfɪʃənt', 'adj.', '足夠的', 'sufficient funds', 2, ['suffice', 'sufficiently', 'sufficiency'], [
        ['We do not have [sufficient] funds to complete the project.', '我們沒有足夠的資金完成這個專案。'],
        ["Two days' notice is [sufficient] for most requests.", '大部分的申請提前兩天通知就夠了。'],
      ]],
      ['optional', 'ˋɑpʃənl̩', 'adj.', '選擇性的', 'optional tour', 2, ['option', 'optionally'], [
        ['Attendance at the company dinner is [optional].', '公司聚餐可自由參加。'],
        ['The tour includes an [optional] visit to the museum.', '這個行程包含自由參加的博物館參觀。'],
      ]],
      ['numerous', 'ˋnjumərəs', 'adj.', '許多的', 'numerous complaints', 2, ['number', 'numeral'], [
        ['The hotel has received [numerous] complaints about the noise.', '這家飯店收到許多關於噪音的投訴。'],
        ['[Numerous] companies took part in the trade fair.', '許多公司參加了這次商展。'],
      ]],
      ['various', 'ˋvɛrɪəs', 'adj.', '各式各樣的', 'various kinds of', 1, ['vary', 'variety', 'variously'], [
        ['The store sells [various] kinds of office supplies.', '這家店販售各式各樣的辦公用品。'],
        ['We discussed [various] options at the meeting.', '我們在會議上討論了各種方案。'],
      ]],
      ['upcoming', 'ˋʌpˏkʌmɪŋ', 'adj.', '即將到來的', 'upcoming event', 2, [], [
        ['Please register for the [upcoming] conference by Friday.', '請在星期五前報名即將舉行的研討會。'],
        ['The manager will discuss the [upcoming] changes at the meeting.', '經理會在會議上說明即將到來的變動。'],
      ]],
      ['outstanding', 'ˏaʊtˋstændɪŋ', 'adj.', '傑出的；未付的', 'outstanding balance', 3, [], [
        ['Mr. Brown received an award for his [outstanding] performance.', '布朗先生因表現傑出而獲獎。'],
        ['Please pay the [outstanding] balance by the end of the month.', '請在月底前付清未付款項。'],
      ]],
      ['prominent', 'ˋprɑmənənt', 'adj.', '著名的；顯眼的', 'a prominent figure', 3, ['prominence', 'prominently'], [
        ['She is a [prominent] figure in the fashion industry.', '她是時尚界的知名人物。'],
        ['The company logo should appear in a [prominent] position.', '公司標誌應該放在顯眼的位置。'],
      ]],
      ['innovative', 'ˋɪnəˏvetɪv', 'adj.', '創新的', 'innovative design', 2, ['innovate', 'innovation', 'innovatively'], [
        ["Ms. Park's design for the new store is highly [innovative].", '朴小姐的新店設計非常有創意。'],
        ['The judges found the marketing plan very [innovative].', '評審認為這份行銷企劃非常創新。'],
      ]],
      ['exclusive', 'ɪkˋsklusɪv', 'adj.', '獨家的', 'exclusive offer', 2, ['exclude', 'exclusively', 'exclusion'], [
        ['Members receive [exclusive] discounts on all products.', '會員所有商品都享有專屬折扣。'],
        ['The magazine published an [exclusive] interview with the CEO.', '這本雜誌刊登了執行長的獨家專訪。'],
      ]],
      ['subsequent', 'ˋsʌbsɪkwɛnt', 'adj.', '隨後的', 'subsequent meetings', 3, ['subsequently', 'sequence'], [
        ['The problem was fixed in [subsequent] versions of the software.', '這個問題在之後的軟體版本中修正了。'],
        ['The first meeting went well, and [subsequent] meetings were even more productive.', '第一次會議很順利，之後的會議更有成效。'],
      ]],
      ['specific', 'spɪˋsɪfɪk', 'adj.', '特定的；具體的', 'specific examples', 2, ['specify', 'specifically', 'specification'], [
        ['Please give [specific] examples in your report.', '請在報告中舉出具體的例子。'],
        ['This job requires [specific] technical skills.', '這份工作需要特定的技術能力。'],
      ]],
      ['appropriate', 'əˋproprɪɪt', 'adj.', '適當的', 'appropriate action', 2, ['appropriately', 'appropriateness'], [
        ['Please wear [appropriate] clothing for the interview.', '面試請穿著合宜的服裝。'],
        ['The manager will take [appropriate] action to solve the problem.', '經理會採取適當的措施解決問題。'],
      ]],
      ['initial', 'ɪˋnɪʃəl', 'adj.', '最初的', 'initial cost', 2, ['initially', 'initiate'], [
        ['The [initial] cost of the equipment was very high.', '這套設備的初期成本非常高。'],
        ['Our [initial] plan was to open two stores this year.', '我們最初的計畫是今年開兩家店。'],
      ]],
    ],
  },
  {
    id: 'phrasal', track: 'toeic', name: '高頻片語', icon: '🔗', words: [
      ['in accordance with', 'ɪn əˋkɔrdn̩s wɪð', 'prep.', '依照', 'in accordance with the regulations', 3, [], [
        ['All products are tested [in accordance with] safety regulations.', '所有產品都依照安全規定進行檢測。'],
        ['Refunds will be issued [in accordance with] our return policy.', '退款將依照我們的退貨政策辦理。'],
      ]],
      ['prior to', 'ˋpraɪɚ tə', 'prep.', '在…之前', 'prior to departure', 3, [], [
        ['Please arrive 15 minutes [prior to] your interview.', '請在面試前 15 分鐘抵達。'],
        ['All passengers must check in [prior to] departure.', '所有旅客都必須在出發前報到。'],
      ]],
      ['on behalf of', 'ɑn bɪˋhæf əv', 'prep.', '代表', 'on behalf of the company', 2, [], [
        ['I am writing [on behalf of] the marketing department.', '我代表行銷部寫這封信。'],
        ['Ms. Wang accepted the award [on behalf of] the company.', '王小姐代表公司領獎。'],
      ]],
      ['in charge of', 'ɪn tʃɑrdʒ əv', 'prep.', '負責', 'be in charge of', 1, [], [
        ['Mr. Lin is [in charge of] the new project.', '林先生負責這個新專案。'],
        ['Who is [in charge of] ordering office supplies?', '誰負責訂購辦公用品？'],
      ]],
      ['take over', 'tek ˋovɚ', 'v.', '接管；接手', 'take over as manager', 2, [], [
        ['Ms. Davis will [take over] as sales director next month.', '戴維斯小姐下個月將接任業務總監。'],
        ['A larger firm is planning to [take over] the company.', '一家更大的公司正計畫收購這家公司。'],
      ]],
      ['carry out', 'ˋkærɪ aʊt', 'v.', '執行', 'carry out an inspection', 2, [], [
        ['The technicians will [carry out] the inspection on Friday.', '技術人員星期五會進行檢查。'],
        ['We need more staff to [carry out] the plan.', '我們需要更多人手來執行這項計畫。'],
      ]],
      ['set up', 'sɛt ʌp', 'v.', '設立；安裝', 'set up an office', 1, [], [
        ['We plan to [set up] a new office in Taichung.', '我們計畫在台中設立新辦公室。'],
        ['Can you help me [set up] the projector?', '你可以幫我架設投影機嗎？'],
      ]],
      ['look into', 'lʊk ˋɪntʊ', 'v.', '調查', 'look into the problem', 2, [], [
        ['Our customer service team will [look into] the problem.', '我們的客服團隊會調查這個問題。'],
        ['The manager promised to [look into] the billing error.', '經理答應會查明帳單錯誤。'],
      ]],
      ['fill out', 'fɪl aʊt', 'v.', '填寫（表格）', 'fill out a form', 1, [], [
        ['Please [fill out] this form before your appointment.', '請在看診前填寫這份表格。'],
        ['All applicants must [fill out] an online application.', '所有應徵者都必須填寫線上申請表。'],
      ]],
      ['hand in', 'hænd ɪn', 'v.', '繳交', 'hand in a report', 1, [], [
        ['Please [hand in] your expense reports by Friday.', '請在星期五前繳交費用報告。'],
        ['Did you [hand in] your timesheet yesterday?', '你昨天交工時表了嗎？'],
      ]],
      ['figure out', 'ˋfɪgjɚ aʊt', 'v.', '想出；弄清楚', 'figure out a solution', 1, [], [
        ['We need to [figure out] why sales are down.', '我們需要弄清楚銷售下滑的原因。'],
        ["I can't [figure out] how to use the new software.", '我搞不懂新軟體要怎麼用。'],
      ]],
      ['run out of', 'rʌn aʊt əv', 'v.', '用完', 'run out of time', 1, [], [
        ['The printer is about to [run out of] ink.', '印表機的墨水快用完了。'],
        ['We may [run out of] time before we finish the agenda.', '我們可能還沒討論完議程就沒時間了。'],
      ]],
      ['put off', 'pʊt ɔf', 'v.', '延後', 'put off a meeting', 2, [], [
        ['We need to [put off] the meeting until next week.', '我們得把會議延到下週。'],
        ["Don't [put off] replying to important emails.", '不要拖延回覆重要的電子郵件。'],
      ]],
      ['call off', 'kɔl ɔf', 'v.', '取消', 'call off an event', 2, [], [
        ['We may have to [call off] the outdoor event because of the rain.', '因為下雨，我們可能得取消戶外活動。'],
        ['The union decided to [call off] the strike.', '工會決定取消罷工。'],
      ]],
      ['turn down', 'tɝn daʊn', 'v.', '拒絕；調低', 'turn down an offer', 2, [], [
        ['Ms. Lee decided to [turn down] the job offer.', '李小姐決定婉拒這份工作。'],
        ['Could you [turn down] the air conditioning a little?', '你可以把冷氣調小一點嗎？'],
      ]],
      ['deal with', 'dil wɪð', 'v.', '處理', 'deal with complaints', 1, [], [
        ['Our staff are trained to [deal with] customer complaints.', '我們的員工受過處理顧客投訴的訓練。'],
        ['I will [deal with] the shipping problem this afternoon.', '我今天下午會處理運送的問題。'],
      ]],
      ['in addition to', 'ɪn əˋdɪʃən tə', 'prep.', '除…之外', 'in addition to salary', 2, [], [
        ['[In addition to] a competitive salary, we offer free lunches.', '除了優渥的薪水，我們還提供免費午餐。'],
        ['The hotel has a fitness center [in addition to] an outdoor pool.', '這家飯店除了室外游泳池，還有健身中心。'],
      ]],
      ['due to', 'dju tə', 'prep.', '由於', 'due to bad weather', 2, [], [
        ['The flight was delayed [due to] bad weather.', '班機因為天候不佳而延誤。'],
        ['The store will be closed next week [due to] renovations.', '這家店下週因為整修暫停營業。'],
      ]],
      ['regardless of', 'rɪˋgɑrdlɪs əv', 'prep.', '不管；無論', 'regardless of experience', 3, [], [
        ['All new employees receive the same training [regardless of] experience.', '所有新進員工不論經驗都接受相同的訓練。'],
        ['The event will take place [regardless of] the weather.', '無論天氣如何，活動都會照常舉行。'],
      ]],
      ['in response to', 'ɪn rɪˋspɑns tə', 'prep.', '回應', 'in response to customer feedback', 2, [], [
        ['[In response to] customer feedback, we have extended our opening hours.', '為了回應顧客意見，我們延長了營業時間。'],
        ['I am writing [in response to] your job advertisement.', '我寫這封信是要應徵貴公司刊登的職缺。'],
      ]],
      ['with regard to', 'wɪð rɪˋgɑrd tə', 'prep.', '關於', 'with regard to your order', 3, [], [
        ['I am calling [with regard to] your recent order.', '我打電話來是關於您最近的訂單。'],
        ['Please contact Mr. Ho [with regard to] the budget.', '關於預算的事請聯絡何先生。'],
      ]],
      ['as of', 'æz əv', 'prep.', '自…起', 'as of today', 3, [], [
        ['[As of] July 1, the office will open at 8:30 a.m.', '自 7 月 1 日起，辦公室早上 8 點半開門。'],
        ['[As of] today, we have received 200 applications.', '截至今天，我們已收到 200 份申請。'],
      ]],
      ['according to', 'əˋkɔrdɪŋ tə', 'prep.', '根據', 'according to the report', 1, [], [
        ['[According to] the report, sales rose by 10 percent.', '根據報告，銷售額成長了百分之十。'],
        ['The project is going [according to] plan.', '專案正按照計畫進行。'],
      ]],
      ['in terms of', 'ɪn tɝmz əv', 'prep.', '就…而言', 'in terms of cost', 2, [], [
        ['[In terms of] price, this model is the best choice.', '就價格而言，這個型號是最好的選擇。'],
        ['The new office is much better [in terms of] location.', '就地點而言，新辦公室好多了。'],
      ]],
      ['instead of', 'ɪnˋstɛd əv', 'prep.', '而不是', 'instead of driving', 1, [], [
        ["Let's hold the meeting on Thursday [instead of] Friday.", '我們把會議改在星期四開，不要星期五。'],
        ['Customers can now pay online [instead of] at the counter.', '顧客現在可以線上付款，不必到櫃台。'],
      ]],
    ],
  },
];

window.TOEIC_WORDS = window.TOEIC_CATEGORIES.flatMap(function (cat, catIndex) {
  return cat.words.map(function (w, i) {
    return {
      id: w[0], word: w[0], kk: w[1], pos: w[2], zh: w[3], col: w[4], lvl: w[5],
      forms: w[6],
      examples: w[7].map(function (e) { return { en: e[0], zh: e[1] }; }),
      cat: cat.id, track: cat.track, catIndex: catIndex, order: i,
    };
  });
});
