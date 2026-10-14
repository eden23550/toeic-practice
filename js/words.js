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
  // ---------- 單字擴充（v1.0.0 新增 56 類） ----------
  {
    id: 'photo', track: 'toeic', name: 'Part 1 照片描述', icon: '📷', words: [
      ['lean', 'lin', 'v.', '傾斜；倚靠', 'lean on the railing', 1, ['leaned', 'leaning'], [
        ["Please don't [lean] on the railing; it is loose.", '請不要靠在欄杆上，它鬆了。'],
        ['You can [lean] the ladder against the wall for now.', '你可以先把梯子靠在牆上。'],
      ]],
      ['stack', 'stæk', 'v.', '堆疊', 'stack boxes', 1, ['stacked', 'stacking'], [
        ['The workers will [stack] the boxes on a cart.', '工人會把箱子堆在推車上。'],
        ['Please [stack] the chairs after the meeting.', '會議結束後請把椅子疊起來。'],
      ]],
      ['arrange', 'əˋrendʒ', 'v.', '排列；安排', 'arrange flowers', 1, ['arrangement', 'arranged'], [
        ['The florist will [arrange] the flowers on each table.', '花藝師會在每張桌上擺好花。'],
        ['Could you [arrange] the brochures on the front desk?', '你可以把簡介擺在櫃台上嗎？'],
      ]],
      ['board', 'bord', 'v.', '登上（車船飛機）', 'board a plane', 1, ['boarding', 'boarded'], [
        ['Passengers may now [board] the plane at Gate 12.', '乘客現在可以在 12 號登機門登機。'],
        ['You will need to show your ticket to [board] the ferry.', '登上渡輪需要出示船票。'],
      ]],
      ['unload', 'ʌnˋlod', 'v.', '卸貨', 'unload a truck', 2, ['unloaded', 'unloading'], [
        ['Two men will [unload] the truck at the loading dock.', '兩名男子會在卸貨區把卡車上的貨卸下來。'],
        ['We need to [unload] these crates before noon.', '我們得在中午前把這些木箱卸下來。'],
      ]],
      ['sweep', 'swip', 'v.', '掃地', 'sweep the floor', 1, ['swept', 'sweeping'], [
        ['Could you [sweep] the floor before the store opens?', '你可以在店開門前掃一下地嗎？'],
        ['The janitor will [sweep] the lobby every evening.', '清潔人員每天傍晚都會打掃大廳。'],
      ]],
      ['hang', 'hæŋ', 'v.', '懸掛', 'hang a picture', 1, ['hung', 'hanging'], [
        ['Please [hang] your coat on the hook by the door.', '請把外套掛在門邊的掛鉤上。'],
        ['We will [hang] the new banner above the entrance.', '我們會把新的布條掛在入口上方。'],
      ]],
      ['pile', 'paɪl', 'n.', '一堆；堆放', 'a pile of papers', 2, ['piled', 'piles'], [
        ["There is a [pile] of papers on the manager's desk.", '經理的桌上有一堆文件。'],
        ['A [pile] of boxes is blocking the back door.', '一堆箱子擋住了後門。'],
      ]],
      ['fold', 'fold', 'v.', '摺疊', 'fold the towels', 1, ['folded', 'folding'], [
        ['Please [fold] the towels and put them on the shelf.', '請把毛巾摺好放到架子上。'],
        ['Staff will [fold] the tables after the event.', '活動結束後工作人員會把桌子收起來。'],
      ]],
      ['polish', 'ˋpɑlɪʃ', 'v.', '擦亮', 'polish the floor', 2, ['polished', 'polishing'], [
        ['The cleaners will [polish] the lobby floor tonight.', '清潔人員今晚會把大廳地板打亮。'],
        ['Remember to [polish] the glasses before the guests arrive.', '記得在客人到之前把玻璃杯擦亮。'],
      ]],
      ['kneel', 'nil', 'v.', '跪下', 'kneel down', 2, ['knelt', 'kneeling'], [
        ['You may need to [kneel] down to check the pipes.', '你可能得跪下來檢查水管。'],
        ['The gardener had to [kneel] beside the flower bed.', '園丁得跪在花圃旁邊。'],
      ]],
      ['lean against', 'lin əˋgɛnst', 'v.', '倚靠著', 'lean against the wall', 2, [], [
        ['Several bicycles [lean against] the fence.', '幾台腳踏車靠在圍籬上。'],
        ['Please do not [lean against] the glass doors.', '請不要倚靠玻璃門。'],
      ]],
      ['reach for', 'ritʃ fɔr', 'v.', '伸手去拿', 'reach for a book', 2, [], [
        ['A woman is about to [reach for] a box on the top shelf.', '一名女子正要伸手去拿最上層架子的箱子。'],
        ['Use the step stool when you [reach for] items up high.', '要拿高處的東西時請用踏凳。'],
      ]],
      ['stroll', 'strol', 'v.', '散步；漫步', 'stroll along the beach', 2, ['strolled', 'strolling'], [
        ['After lunch, we can [stroll] along the river.', '午餐後我們可以沿著河邊散步。'],
        ['Visitors like to [stroll] through the park on weekends.', '遊客週末喜歡在公園裡散步。'],
      ]],
      ['line up', 'laɪn ʌp', 'v.', '排隊；排成一列', 'line up at the counter', 1, [], [
        ['Customers [line up] at the counter to order coffee.', '顧客在櫃台前排隊點咖啡。'],
        ['Please [line up] behind the yellow line.', '請在黃線後面排隊。'],
      ]],
      ['examine', 'ɪgˋzæmɪn', 'v.', '檢查；仔細查看', 'examine a document', 2, ['examination', 'examiner'], [
        ['The mechanic will [examine] the engine this afternoon.', '技師今天下午會檢查引擎。'],
        ['Please [examine] the contract carefully before signing.', '簽約前請仔細看過合約。'],
      ]],
      ['adjust', 'əˋdʒʌst', 'v.', '調整', 'adjust the height', 2, ['adjustment', 'adjustable'], [
        ['You can [adjust] the height of the chair with this lever.', '你可以用這根桿子調整椅子的高度。'],
        ['The technician will [adjust] the projector before the talk.', '技術人員會在演講前調整投影機。'],
      ]],
      ['mop', 'mɑp', 'v.', '用拖把拖地', 'mop the floor', 2, ['mopped', 'mopping'], [
        ['Could you [mop] the kitchen floor before closing?', '打烊前你可以拖一下廚房地板嗎？'],
        ['A worker will [mop] up the spilled water right away.', '工作人員會馬上把灑出的水拖乾淨。'],
      ]],
      ['wipe', 'waɪp', 'v.', '擦拭', 'wipe the table', 1, ['wiped', 'wiping'], [
        ['Please [wipe] the tables after customers leave.', '客人離開後請把桌子擦乾淨。'],
        ['Use a soft cloth to [wipe] the screen.', '用軟布擦拭螢幕。'],
      ]],
      ['rake', 'rek', 'v.', '用耙子耙', 'rake the leaves', 3, ['raked', 'raking'], [
        ['The gardeners will [rake] the leaves on the lawn tomorrow.', '園丁明天會把草坪上的落葉耙乾淨。'],
        ['Can you help me [rake] the gravel path?', '你可以幫我把碎石步道耙平嗎？'],
      ]],
      ['plant', 'plænt', 'v.', '種植', 'plant trees', 1, ['planted', 'planting'], [
        ['Volunteers will [plant] trees along the street next week.', '志工下週會在街道兩旁種樹。'],
        ['We plan to [plant] flowers in front of the office.', '我們打算在辦公室前面種花。'],
      ]],
      ['hammer', 'ˋhæmɚ', 'v.', '用鎚子敲', 'hammer a nail', 2, ['hammered', 'hammering'], [
        ['Please [hammer] the nails into the board carefully.', '請小心把釘子敲進木板。'],
        ['The carpenter will [hammer] the frame together.', '木工會把框架釘起來。'],
      ]],
      ['browse', 'braʊz', 'v.', '瀏覽；隨意看看', 'browse the shelves', 2, ['browsed', 'browsing'], [
        ['Feel free to [browse] the shelves while you wait.', '等候時可以隨意看看架上的商品。'],
        ['Customers can [browse] our catalog online.', '顧客可以在網路上瀏覽我們的型錄。'],
      ]],
      ['row', 'ro', 'n./v.', '一排；划船', 'a row of chairs', 2, ['rows', 'rowing'], [
        ['A [row] of chairs has been set up for the audience.', '已經為觀眾擺好一排椅子。'],
        ['Cars are parked in a [row] along the street.', '汽車沿著街道停成一排。'],
      ]],
      ['dock', 'dɑk', 'v.', '停靠碼頭；碼頭', 'dock at the pier', 3, ['docked', 'docking'], [
        ['The ferry will [dock] at Pier 3 at noon.', '渡輪中午會停靠在三號碼頭。'],
        ['Large ships cannot [dock] in this small harbor.', '大型船隻無法停靠這個小港口。'],
      ]],
    ],
  },
  {
    id: 'conj', track: 'toeic', name: 'Part 5 連接詞與介系詞', icon: '🧩', words: [
      ['although', 'ɔlˋðo', 'conj.', '雖然', 'although it is late', 1, ['despite', 'in spite of'], [
        ['[Although] the train was late, we arrived on time.', '雖然火車誤點，我們還是準時到了。'],
        ['The plan was approved, [although] some managers had doubts.', '計畫通過了，雖然有些主管仍有疑慮。'],
      ]],
      ['unless', 'ənˋlɛs', 'conj.', '除非', 'unless otherwise noted', 2, ['despite', 'due to'], [
        ['You cannot enter the building [unless] you have an ID badge.', '除非你有識別證，否則不能進入大樓。'],
        ['The order will ship tomorrow [unless] the customer cancels it.', '除非客戶取消，否則訂單明天會出貨。'],
      ]],
      ['whereas', 'hwɛrˋæz', 'conj.', '然而；但是（對比）', 'whereas others', 3, ['despite', 'instead of'], [
        ['Sales rose in Asia, [whereas] they fell in Europe.', '亞洲的銷售成長，歐洲則下滑。'],
        ['The old model was heavy, [whereas] the new one weighs only 1 kg.', '舊款很重，而新款只有一公斤。'],
      ]],
      ['despite', 'dɪˋspaɪt', 'prep.', '儘管', 'despite the delay', 2, ['although', 'even though'], [
        ['[Despite] the heavy rain, the outdoor event was a success.', '儘管下大雨，戶外活動還是很成功。'],
        ['The store stayed busy [despite] the high prices.', '儘管價格很高，那家店還是生意很好。'],
      ]],
      ['throughout', 'θruˋaʊt', 'prep.', '遍及；在整個…期間', 'throughout the year', 2, ['although', 'whereas'], [
        ['The museum is open [throughout] the year.', '博物館全年開放。'],
        ['Free Wi-Fi is available [throughout] the hotel.', '整間飯店都有免費 Wi-Fi。'],
      ]],
      ['whether', 'ˋhwɛðɚ', 'conj.', '是否', 'whether or not', 2, ['either', 'despite'], [
        ['Please let us know [whether] you can attend the dinner.', '請告訴我們你是否能出席晚宴。'],
        ['The manager has not decided [whether] to hire more staff.', '經理還沒決定是否要多請人。'],
      ]],
      ['once', 'wʌns', 'conj.', '一旦', 'once you arrive', 2, ['despite', 'due to'], [
        ['[Once] the payment is received, we will ship your order.', '一旦收到款項，我們就會寄出您的訂單。'],
        ['You can log in [once] your account is activated.', '帳號啟用後您就可以登入。'],
      ]],
      ['provided that', 'prəˋvaɪdɪd ðæt', 'conj.', '只要；倘若', 'provided that you agree', 3, ['despite', 'in spite of'], [
        ['You may leave early [provided that] your work is finished.', '只要工作做完，你可以提早離開。'],
        ['Employees can work from home [provided that] they attend Monday meetings.', '只要員工出席週一的會議，就可以在家工作。'],
      ]],
      ['as long as', 'æz lɔŋ æz', 'conj.', '只要', 'as long as possible', 2, ['regardless of', 'despite'], [
        ['You can use the meeting room [as long as] you book it in advance.', '只要事先預約，你就可以使用會議室。'],
        ['The warranty is valid [as long as] you keep the receipt.', '只要保留收據，保固就有效。'],
      ]],
      ['even though', 'ˋivən ðo', 'conj.', '即使', 'even though it rained', 2, ['despite', 'in spite of'], [
        ['[Even though] the project was difficult, the team finished it early.', '即使專案很困難，團隊還是提早完成。'],
        ['She accepted the job [even though] the salary was low.', '即使薪水很低，她還是接受了那份工作。'],
      ]],
      ['so that', 'so ðæt', 'conj.', '以便', 'so that we can', 2, ['due to', 'in spite of'], [
        ['Please arrive early [so that] we can start on time.', '請提早到，以便我們準時開始。'],
        ['We extended our hours [so that] more customers could visit.', '我們延長了營業時間，好讓更多顧客上門。'],
      ]],
      ['in case', 'ɪn kes', 'conj.', '以防萬一', 'just in case', 2, ['despite', 'due to'], [
        ['Bring an umbrella [in case] it rains this afternoon.', '帶把傘，以防下午下雨。'],
        ['Save a copy of the file [in case] the system crashes.', '把檔案存個備份，以防系統當機。'],
      ]],
      ['beyond', 'bɪˋjɑnd', 'prep.', '超出；在…之外', 'beyond our control', 2, ['although', 'unless'], [
        ['The delay was caused by factors [beyond] our control.', '延誤是由我們無法控制的因素造成的。'],
        ['The cost of the repair is [beyond] our budget.', '維修費用超出了我們的預算。'],
      ]],
      ['within', 'wɪˋðɪn', 'prep.', '在…之內', 'within three days', 1, ['although', 'whereas'], [
        ['Please reply [within] three business days.', '請在三個工作天內回覆。'],
        ['All offices are [within] walking distance of the station.', '所有辦公室都在車站步行可到的距離內。'],
      ]],
      ['except', 'ɪkˋsɛpt', 'prep.', '除了…之外', 'except Sunday', 1, ['although', 'whereas'], [
        ['The office is open every day [except] Sunday.', '辦公室除了星期日每天都開。'],
        ['Everyone [except] the new interns attended the training.', '除了新來的實習生，大家都參加了訓練。'],
      ]],
      ['besides', 'bɪˋsaɪdz', 'prep.', '此外；除…之外還有', 'besides that', 2, ['although', 'even though'], [
        ['[Besides] a good salary, the job offers free housing.', '這份工作除了薪水不錯，還提供免費住宿。'],
        ['[Besides] English, she speaks Japanese and Korean.', '除了英文，她還會說日文和韓文。'],
      ]],
      ['toward', 'təˋwɔrd', 'prep.', '朝向；為了', 'toward the goal', 1, ['although', 'unless'], [
        ['The guide walked [toward] the main entrance.', '導覽員朝主要入口走去。'],
        ['This money will go [toward] the new library.', '這筆錢將用於興建新圖書館。'],
      ]],
      ['via', 'ˋvaɪə', 'prep.', '經由；透過', 'via email', 2, ['although', 'whereas'], [
        ['We will send the documents [via] email.', '我們會透過電子郵件寄送文件。'],
        ['The flight to London goes [via] Dubai.', '飛往倫敦的班機經由杜拜轉機。'],
      ]],
      ['upon', 'əˋpɑn', 'prep.', '一…就；在…之上', 'upon arrival', 3, ['although', 'even though'], [
        ['[Upon] arrival, guests will receive a room key.', '房客一抵達就會拿到房卡。'],
        ['Payment is due [upon] receipt of the invoice.', '收到發票後即須付款。'],
      ]],
      ['amid', 'əˋmɪd', 'prep.', '在…之中', 'amid concerns', 3, ['although', 'whereas'], [
        ['The company grew steadily [amid] strong competition.', '在激烈的競爭中，公司仍穩定成長。'],
        ['Stock prices fell [amid] concerns about rising costs.', '在成本上升的疑慮中，股價下跌。'],
      ]],
      ['alongside', 'əˋlɔŋˏsaɪd', 'prep.', '在旁邊；與…一起', 'work alongside', 3, ['although', 'unless'], [
        ['Interns work [alongside] senior engineers on real projects.', '實習生和資深工程師一起做真正的專案。'],
        ['A new café opened [alongside] the bookstore.', '書店旁邊開了一家新咖啡店。'],
      ]],
      ['whereby', 'hwɛrˋbaɪ', 'conj.', '藉此；憑此', 'a system whereby', 3, ['despite', 'in spite of'], [
        ['We introduced a system [whereby] staff can swap shifts online.', '我們推出一套系統，讓員工可以在線上換班。'],
        ['The two firms signed an agreement [whereby] they will share research costs.', '兩家公司簽了協議，藉此分攤研究費用。'],
      ]],
      ['notwithstanding', 'ˏnɑtwɪθˋstændɪŋ', 'prep.', '儘管', 'notwithstanding the delay', 3, ['although', 'even though'], [
        ['[Notwithstanding] the delays, the project finished on budget.', '儘管有所延誤，專案仍在預算內完成。'],
        ['[Notwithstanding] his lack of experience, he was hired as team leader.', '儘管缺乏經驗，他還是被聘為組長。'],
      ]],
      ['in spite of', 'ɪn spaɪt əv', 'prep.', '儘管', 'in spite of the weather', 2, ['although', 'even though'], [
        ['The flight left on time [in spite of] the snow.', '儘管下雪，班機還是準時起飛。'],
        ['[In spite of] the high price, the tickets sold out quickly.', '儘管票價很高，票還是很快就賣光了。'],
      ]],
      ['as soon as', 'æz sun æz', 'conj.', '一…就', 'as soon as possible', 1, ['despite', 'regardless of'], [
        ['Please call me [as soon as] you get the results.', '你一拿到結果就請打給我。'],
        ['The meeting will start [as soon as] the director arrives.', '主任一到，會議就會開始。'],
      ]],
    ],
  },
  {
    id: 'verbs1', track: 'toeic', name: '高頻動詞 I', icon: '🏃', words: [
      ['anticipate', 'ænˋtɪsəˏpet', 'v.', '預期', 'anticipate demand', 3, ['anticipation', 'anticipated'], [
        ['Retailers should [anticipate] strong demand during the holidays.', '零售商應該預料到假期期間需求會很強勁。'],
        ['Good managers try to [anticipate] problems before they happen.', '好的主管會在問題發生前就預先想到。'],
      ]],
      ['acknowledge', 'əkˋnɑlɪdʒ', 'v.', '承認；確認收到', 'acknowledge receipt', 3, ['acknowledgment', 'acknowledged'], [
        ['Please [acknowledge] receipt of this email.', '請確認已收到這封電子郵件。'],
        ["The CEO will [acknowledge] the team's hard work at the party.", '執行長會在派對上肯定團隊的辛勞。'],
      ]],
      ['allocate', 'ˋæləˏket', 'v.', '分配', 'allocate funds', 3, ['allocation', 'allocated'], [
        ['The board will [allocate] more funds to research.', '董事會將撥更多經費給研發。'],
        ['We need to [allocate] enough time for training.', '我們需要分配足夠的時間給培訓。'],
      ]],
      ['obtain', 'əbˋten', 'v.', '取得', 'obtain permission', 2, ['obtainable', 'obtained'], [
        ['You must [obtain] permission before using the photos.', '使用這些照片前必須先取得許可。'],
        ['Visitors can [obtain] a parking pass at the front desk.', '訪客可以在櫃台領取停車證。'],
      ]],
      ['retain', 'rɪˋten', 'v.', '保留；留住', 'retain employees', 3, ['retention', 'retained'], [
        ['Good benefits help companies [retain] skilled workers.', '好的福利能幫助公司留住優秀人才。'],
        ['Please [retain] your receipt for future reference.', '請保留收據以備日後查詢。'],
      ]],
      ['pursue', 'pɚˋsu', 'v.', '追求；從事', 'pursue a career', 2, ['pursuit', 'pursued'], [
        ['She left the bank to [pursue] a career in design.', '她離開銀行去從事設計工作。'],
        ['The company will [pursue] new markets in Asia.', '公司將開拓亞洲的新市場。'],
      ]],
      ['require', 'rɪˋkwaɪr', 'v.', '需要；要求', 'require approval', 1, ['requirement', 'required'], [
        ['All visitors will [require] a security badge.', '所有訪客都需要配戴安全識別證。'],
        ['This position may [require] some weekend work.', '這個職位可能需要週末上班。'],
      ]],
      ['verify', 'ˋvɛrəˏfaɪ', 'v.', '核實；驗證', 'verify the information', 2, ['verification', 'verified'], [
        ['Please [verify] your email address to complete registration.', '請驗證您的電子郵件地址以完成註冊。'],
        ['The bank will [verify] your identity before opening the account.', '銀行開戶前會核對您的身分。'],
      ]],
      ['indicate', 'ˋɪndəˏket', 'v.', '指出；顯示', 'indicate a preference', 2, ['indication', 'indicator'], [
        ['Please [indicate] your meal preference on the form.', '請在表格上註明您的餐點偏好。'],
        ['These results [indicate] that sales will improve.', '這些結果顯示銷售將會好轉。'],
      ]],
      ['ensure', 'ɪnˋʃʊr', 'v.', '確保', 'ensure safety', 2, ['sure', 'ensured'], [
        ['Please [ensure] that all doors are locked before you leave.', '離開前請確認所有門都已上鎖。'],
        ['We will [ensure] that your order arrives on time.', '我們會確保您的訂單準時送達。'],
      ]],
      ['determine', 'dɪˋtɝmɪn', 'v.', '決定；確定', 'determine the cause', 2, ['determination', 'determined'], [
        ['Engineers are trying to [determine] the cause of the problem.', '工程師正試著找出問題的原因。'],
        ['The survey will help us [determine] what customers want.', '這份調查能幫我們確定顧客要什麼。'],
      ]],
      ['accompany', 'əˋkʌmpənɪ', 'v.', '陪同；伴隨', 'accompany a guest', 2, ['accompaniment', 'accompanied'], [
        ['Please [accompany] our guests to the dining hall.', '請陪同我們的客人到餐廳。'],
        ['A staff member will [accompany] you to the meeting room.', '會有一位工作人員陪您到會議室。'],
      ]],
      ['attract', 'əˋtrækt', 'v.', '吸引', 'attract customers', 1, ['attraction', 'attractive'], [
        ['The sale should [attract] many new customers.', '這次特賣應該能吸引很多新顧客。'],
        ['The city hopes to [attract] more tourists this summer.', '市政府希望今年夏天能吸引更多觀光客。'],
      ]],
      ['consult', 'kənˋsʌlt', 'v.', '諮詢；查閱', 'consult a doctor', 2, ['consultant', 'consultation'], [
        ['Please [consult] the manual before calling technical support.', '打電話給技術支援前，請先查閱手冊。'],
        ['You should [consult] a lawyer before signing the contract.', '簽約前你應該諮詢律師。'],
      ]],
      ['contribute', 'kənˋtrɪbjut', 'v.', '貢獻；捐助', 'contribute to', 2, ['contribution', 'contributor'], [
        ['Everyone is encouraged to [contribute] ideas at the meeting.', '鼓勵大家在會議上提出想法。'],
        ['Local businesses will [contribute] money to the festival.', '當地商家會出資贊助這個節慶。'],
      ]],
      ['emphasize', 'ˋɛmfəˏsaɪz', 'v.', '強調', 'emphasize the importance', 2, ['emphasis', 'emphatic'], [
        ['The speaker will [emphasize] the importance of safety.', '講者會強調安全的重要性。'],
        ['I want to [emphasize] that the deadline cannot change.', '我要強調截止日期不能更改。'],
      ]],
      ['enhance', 'ɪnˋhæns', 'v.', '提升；增強', 'enhance performance', 3, ['enhancement', 'enhanced'], [
        ['The new software will [enhance] our productivity.', '新軟體會提升我們的生產力。'],
        ['We plan to [enhance] the customer experience in our stores.', '我們打算提升門市的顧客體驗。'],
      ]],
      ['establish', 'əˋstæblɪʃ', 'v.', '建立；設立', 'establish a branch', 2, ['establishment', 'established'], [
        ['The firm hopes to [establish] a branch in Melbourne.', '公司希望在墨爾本設立分公司。'],
        ['We need to [establish] clear rules for remote work.', '我們需要為遠距工作訂定明確的規則。'],
      ]],
      ['evaluate', 'ɪˋvæljuˏet', 'v.', '評估', 'evaluate performance', 2, ['evaluation', 'evaluator'], [
        ['Supervisors will [evaluate] each employee in December.', '主管會在十二月評估每位員工。'],
        ['We must [evaluate] the costs before we decide.', '做決定前我們必須評估成本。'],
      ]],
      ['exceed', 'ɪkˋsid', 'v.', '超過', 'exceed expectations', 2, ['excess', 'exceedingly'], [
        ['Carry-on bags must not [exceed] seven kilograms.', '手提行李不得超過七公斤。'],
        ["Our sales this quarter may [exceed] last year's total.", '我們這一季的銷售額可能會超過去年的總額。'],
      ]],
      ['facilitate', 'fəˋsɪləˏtet', 'v.', '促進；使容易', 'facilitate communication', 3, ['facility', 'facilitator'], [
        ['The new app will [facilitate] communication between teams.', '新的應用程式會讓團隊之間溝通更順暢。'],
        ['A clear agenda can [facilitate] a productive meeting.', '清楚的議程有助於開出有效率的會議。'],
      ]],
      ['inform', 'ɪnˋfɔrm', 'v.', '通知；告知', 'inform sb of sth', 1, ['information', 'informative'], [
        ['Please [inform] your supervisor if you will be absent.', '如果要請假，請告知你的主管。'],
        ['We will [inform] all customers of the price change.', '我們會通知所有顧客價格調整的事。'],
      ]],
      ['maintain', 'menˋten', 'v.', '維持；保養', 'maintain quality', 2, ['maintenance', 'maintained'], [
        ['It is important to [maintain] high quality standards.', '維持高品質標準很重要。'],
        ['A technician will [maintain] the machines every month.', '技術人員每個月會保養機器。'],
      ]],
      ['notify', 'ˋnotəˏfaɪ', 'v.', '通知', 'notify sb of sth', 2, ['notification', 'notified'], [
        ['Please [notify] us at least 24 hours before you cancel.', '取消請至少提前 24 小時通知我們。'],
        ['The airline will [notify] passengers of any delays.', '航空公司會通知乘客任何延誤。'],
      ]],
      ['outline', 'ˋaʊtˏlaɪn', 'v.', '概述；大綱', 'outline a plan', 2, ['outlined', 'outlines'], [
        ['The director will [outline] the new strategy at the meeting.', '處長會在會議上概述新策略。'],
        ['Could you [outline] the main points of the proposal?', '你可以概述一下提案的重點嗎？'],
      ]],
    ],
  },
  {
    id: 'verbs2', track: 'toeic', name: '高頻動詞 II', icon: '🛠️', words: [
      ['participate', 'pɑrˋtɪsəˏpet', 'v.', '參加', 'participate in', 2, ['participation', 'participant'], [
        ['All staff are required to [participate] in the safety training.', '全體員工都必須參加安全訓練。'],
        ['Would you like to [participate] in our customer survey?', '您願意參加我們的顧客調查嗎？'],
      ]],
      ['convey', 'kənˋve', 'v.', '傳達', 'convey a message', 3, ['conveyed', 'conveying'], [
        ['Please [convey] our thanks to your team.', '請代我們向您的團隊致謝。'],
        ['A good chart can [convey] complex data clearly.', '好的圖表可以清楚傳達複雜的數據。'],
      ]],
      ['proceed', 'prəˋsid', 'v.', '繼續進行；前往', 'proceed with', 2, ['procedure', 'process'], [
        ['Passengers should [proceed] to Gate 8 for boarding.', '乘客請前往 8 號登機門登機。'],
        ['We will [proceed] with the merger as planned.', '我們會按計畫進行合併。'],
      ]],
      ['endorse', 'ɪnˋdɔrs', 'v.', '背書；支持', 'endorse a product', 3, ['endorsement', 'endorsed'], [
        ['A famous athlete agreed to [endorse] the new shoes.', '一位知名運動員同意代言這款新鞋。'],
        ['The committee will [endorse] the proposal next week.', '委員會下週會表態支持這份提案。'],
      ]],
      ['recommend', 'ˏrɛkəˋmɛnd', 'v.', '推薦；建議', 'highly recommend', 1, ['recommendation', 'recommended'], [
        ['Can you [recommend] a good hotel near the airport?', '你可以推薦機場附近不錯的飯店嗎？'],
        ['I would [recommend] booking your tickets early.', '我建議你早點訂票。'],
      ]],
      ['refer', 'rɪˋfɝ', 'v.', '提到；轉介', 'refer to', 2, ['reference', 'referral'], [
        ['Please [refer] to page 5 for details.', '詳情請參閱第 5 頁。'],
        ['The doctor will [refer] you to a specialist.', '醫生會把你轉介給專科醫師。'],
      ]],
      ['reflect', 'rɪˋflɛkt', 'v.', '反映；反省', 'reflect the cost', 2, ['reflection', 'reflective'], [
        ['The new prices will [reflect] higher shipping costs.', '新價格會反映較高的運費。'],
        ['Take some time to [reflect] on what went wrong.', '花點時間想想哪裡出了問題。'],
      ]],
      ['enroll', 'ɪnˋrol', 'v.', '註冊；報名', 'enroll in a course', 2, ['enrollment', 'enrolled'], [
        ['Employees can [enroll] in the course online.', '員工可以在線上報名這門課。'],
        ['You must [enroll] by Friday to get the discount.', '你必須在星期五前報名才有折扣。'],
      ]],
      ['reject', 'rɪˋdʒɛkt', 'v.', '拒絕', 'reject an offer', 2, ['rejection', 'rejected'], [
        ['The board may [reject] the proposal if it costs too much.', '如果花費太高，董事會可能會否決這份提案。'],
        ['Why did you [reject] their job offer?', '你為什麼拒絕他們的工作邀約？'],
      ]],
      ['release', 'rɪˋlis', 'v.', '發布；釋放', 'release a product', 2, ['released', 'releases'], [
        ['The company will [release] its new phone in March.', '公司將在三月推出新手機。'],
        ['We plan to [release] the sales figures next week.', '我們打算下週公布銷售數字。'],
      ]],
      ['relieve', 'rɪˋliv', 'v.', '減輕；緩解', 'relieve stress', 3, ['relief', 'relieved'], [
        ['This medicine should [relieve] the pain quickly.', '這種藥應該能很快緩解疼痛。'],
        ['Hiring two more staff will [relieve] the pressure on the team.', '多請兩個人能減輕團隊的壓力。'],
      ]],
      ['remain', 'rɪˋmen', 'v.', '保持；剩下', 'remain seated', 2, ['remainder', 'remaining'], [
        ['Please [remain] seated until the plane stops.', '飛機停妥前請留在座位上。'],
        ['The store will [remain] open during the renovation.', '整修期間店面會照常營業。'],
      ]],
      ['replace', 'rɪˋples', 'v.', '取代；更換', 'replace the battery', 1, ['replacement', 'replaceable'], [
        ['We need to [replace] the printer cartridge.', '我們得換印表機的墨水匣。'],
        ['The new system will [replace] the old one next month.', '新系統下個月會取代舊系統。'],
      ]],
      ['represent', 'ˏrɛprɪˋzɛnt', 'v.', '代表', 'represent the company', 2, ['representative', 'representation'], [
        ['Ms. Lee will [represent] our company at the trade fair.', '李小姐會代表我們公司參加商展。'],
        ['These figures [represent] a 10 percent increase.', '這些數字代表成長了百分之十。'],
      ]],
      ['request', 'rɪˋkwɛst', 'v.', '要求；請求', 'request a refund', 1, ['requested', 'requesting'], [
        ['You can [request] a refund within 30 days.', '您可以在 30 天內申請退款。'],
        ['Please [request] time off at least two weeks in advance.', '請假請至少提前兩週提出申請。'],
      ]],
      ['dispatch', 'dɪˋspætʃ', 'v.', '派遣；發送', 'dispatch an order', 3, ['dispatched', 'dispatcher'], [
        ['We will [dispatch] your order within 24 hours.', '我們會在 24 小時內寄出您的訂單。'],
        ['The company can [dispatch] a technician to your office today.', '公司今天可以派一位技術人員到您的辦公室。'],
      ]],
      ['accommodate', 'əˋkɑməˏdet', 'v.', '容納；提供住宿', 'accommodate guests', 3, ['accommodation', 'accommodating'], [
        ['The hall can [accommodate] up to 300 guests.', '這個大廳最多可容納 300 位賓客。'],
        ['We will try to [accommodate] your special requests.', '我們會盡量配合您的特殊需求。'],
      ]],
      ['revise', 'rɪˋvaɪz', 'v.', '修改；修訂', 'revise a report', 2, ['revision', 'revised'], [
        ['Please [revise] the report and send it back by Monday.', '請修改報告並在星期一前寄回。'],
        ['We may need to [revise] our budget for next year.', '我們可能需要修訂明年的預算。'],
      ]],
      ['acquire', 'əˋkwaɪr', 'v.', '取得；收購', 'acquire a company', 3, ['acquisition', 'acquired'], [
        ['The firm plans to [acquire] a smaller rival.', '這家公司計畫收購一家規模較小的競爭對手。'],
        ['Interns can [acquire] valuable skills in this program.', '實習生能在這個計畫中學到寶貴的技能。'],
      ]],
      ['secure', 'sɪˋkjʊr', 'v.', '取得；確保安全', 'secure funding', 3, ['security', 'securely'], [
        ['The startup hopes to [secure] funding this year.', '這家新創公司希望今年能取得資金。'],
        ['Book early to [secure] a seat at the conference.', '早點報名才能確保研討會的座位。'],
      ]],
      ['specify', 'ˋspɛsəˏfaɪ', 'v.', '具體指定；明確說明', 'specify the size', 3, ['specific', 'specification'], [
        ['Please [specify] the size and color when you order.', '訂購時請註明尺寸和顏色。'],
        ['The contract does not [specify] a delivery date.', '合約沒有明確寫出交貨日期。'],
      ]],
      ['assure', 'əˋʃʊr', 'v.', '向…保證', 'assure sb that', 2, ['assurance', 'assured'], [
        ['I can [assure] you that the problem will be fixed.', '我可以向您保證問題會解決。'],
        ['Let me [assure] our customers that their data is safe.', '我要向顧客保證他們的資料很安全。'],
      ]],
      ['supervise', 'ˋsupɚˏvaɪz', 'v.', '監督；管理', 'supervise staff', 2, ['supervisor', 'supervision'], [
        ['Mr. Chen will [supervise] the new employees.', '陳先生會負責督導新員工。'],
        ['Someone needs to [supervise] the work on the construction site.', '需要有人在工地監工。'],
      ]],
      ['attain', 'əˋten', 'v.', '達到；獲得', 'attain a goal', 3, ['attainment', 'attainable'], [
        ['The team worked hard to [attain] its sales target.', '團隊努力達成銷售目標。'],
        ['Few applicants [attain] such a high score.', '很少有應徵者能拿到這麼高的分數。'],
      ]],
      ['undergo', 'ˏʌndɚˋgo', 'v.', '經歷；接受（檢查、手術）', 'undergo training', 3, ['underwent', 'undergone'], [
        ['All new drivers must [undergo] a safety check.', '所有新司機都必須接受安全檢查。'],
        ['The building will [undergo] renovations next year.', '這棟大樓明年將進行整修。'],
      ]],
    ],
  },
  {
    id: 'nouns1', track: 'toeic', name: '高頻名詞 I', icon: '📘', words: [
      ['approval', 'əˋpruvl̩', 'n.', '批准；認可', 'get approval from', 2, ['approve', 'approved'], [
        ['All travel expenses require [approval] from your manager.', '所有差旅費用都需要經過主管核准。'],
        ['The new design received final [approval] last week.', '新設計上週獲得最終核准。'],
      ]],
      ['assessment', 'əˋsɛsmənt', 'n.', '評估', 'a risk assessment', 2, ['assess', 'assessed'], [
        ['The consultant will complete an [assessment] of our safety procedures.', '顧問將完成我們安全程序的評估。'],
        ['Each employee receives a performance [assessment] once a year.', '每位員工每年接受一次績效評估。'],
      ]],
      ['attempt', 'əˋtɛmpt', 'n.', '嘗試', 'in an attempt to', 2, ['attempted', 'attempting'], [
        ['In an [attempt] to reduce costs, the company moved to a smaller office.', '為了降低成本，公司搬到較小的辦公室。'],
        ['Her first [attempt] at the certification exam was successful.', '她第一次參加認證考試就通過了。'],
      ]],
      ['capability', 'ˏkepəˋbɪlətɪ', 'n.', '能力', 'production capability', 2, ['capable', 'capably'], [
        ['The new software has the [capability] to process thousands of orders per hour.', '新軟體每小時能處理數千筆訂單。'],
        ['We need to expand our production [capability] before the holiday season.', '我們必須在假期旺季前擴大產能。'],
      ]],
      ['commitment', 'kəˋmɪtmənt', 'n.', '承諾；投入', 'a commitment to quality', 2, ['commit', 'committed'], [
        ['The company is known for its [commitment] to customer service.', '這家公司以致力於顧客服務聞名。'],
        ['Thank you for your hard work and [commitment] this year.', '謝謝你今年的辛勤工作與投入。'],
      ]],
      ['credential', 'krɪˋdɛnʃəl', 'n.', '資格證明', 'a teaching credential', 3, ['credible', 'credibly'], [
        ['Applicants must show a valid nursing [credential] before the interview.', '應徵者面試前必須出示有效的護理資格證明。'],
        ['A teaching [credential] is required for this position.', '這個職位需要教師資格證書。'],
      ]],
      ['criteria', 'kraɪˋtɪrɪə', 'n.', '標準（複數）', 'meet the criteria', 3, ['criterion', 'critical'], [
        ['These [criteria] are used to evaluate each proposal.', '這些標準用來評估每一份提案。'],
        ['Suppliers will be judged on several [criteria], including cost and quality.', '供應商將依據包括成本和品質在內的幾項標準來評選。'],
      ]],
      ['allowance', 'əˋlaʊəns', 'n.', '津貼；額度', 'a travel allowance', 3, ['allow', 'allowable'], [
        ['Staff receive a daily meal [allowance] when they travel for work.', '員工出差時每天可領餐費津貼。'],
        ['The baggage [allowance] for this flight is 23 kilograms.', '這班飛機的行李限額是 23 公斤。'],
      ]],
      ['amenity', 'əˋmɛnətɪ', 'n.', '便利設施', 'a popular amenity', 3, ['amend', 'amenable'], [
        ['The rooftop pool is the most popular [amenity] at the hotel.', '頂樓泳池是這家飯店最受歡迎的設施。'],
        ['Free Wi-Fi is now a basic [amenity] in most offices.', '免費 Wi-Fi 現在是大多數辦公室的基本設施。'],
      ]],
      ['effort', 'ˋɛfɚt', 'n.', '努力', 'make an effort', 1, ['effortless', 'effortlessly'], [
        ['Thank you for your [effort] on the annual report.', '謝謝你為年度報告付出的努力。'],
        ['The team made every [effort] to finish the project on time.', '團隊盡一切努力準時完成專案。'],
      ]],
      ['expansion', 'ɪkˋspænʃən', 'n.', '擴張', 'business expansion', 2, ['expand', 'expansive'], [
        ['The [expansion] of the factory will create 200 new jobs.', '工廠擴建將創造 200 個新工作機會。'],
        ['The company announced plans for further [expansion] into Asia.', '公司宣布進一步拓展亞洲市場的計畫。'],
      ]],
      ['expertise', 'ˏɛkspɚˋtiz', 'n.', '專業知識', 'technical expertise', 3, ['expert', 'expertly'], [
        ['We hired a consultant with [expertise] in tax law.', '我們聘請了一位具備稅法專業的顧問。'],
        ['The project requires a high level of technical [expertise].', '這個專案需要高度的技術專業。'],
      ]],
      ['function', 'ˋfʌŋkʃən', 'n.', '功能；作用', 'a useful function', 2, ['functional', 'functionally'], [
        ['This printer also has a scanning [function].', '這台印表機也有掃描功能。'],
        ['The main [function] of the committee is to review budgets.', '委員會的主要職責是審查預算。'],
      ]],
      ['guideline', 'ˋgaɪdˏlaɪn', 'n.', '指導方針', 'follow the guideline', 2, ['guided', 'guiding'], [
        ['Please read each [guideline] carefully before you submit the form.', '送出表格前請仔細閱讀每一條規定。'],
        ['According to the new [guideline], all visitors must wear a badge.', '根據新規定，所有訪客都必須配戴識別證。'],
      ]],
      ['instruction', 'ɪnˋstrʌkʃən', 'n.', '說明；指示', 'follow each instruction', 1, ['instruct', 'instructive'], [
        ['Every [instruction] in the manual is translated into Spanish.', '手冊裡的每一項說明都翻譯成了西班牙文。'],
        ['New employees receive [instruction] on safety procedures during their first week.', '新進員工在第一週會接受安全程序的指導。'],
      ]],
      ['intention', 'ɪnˋtɛnʃən', 'n.', '意圖；打算', 'have no intention of', 2, ['intend', 'intentional'], [
        ['We have no [intention] of raising prices this year.', '我們今年沒有漲價的打算。'],
        ['The CEO announced her [intention] to retire next spring.', '執行長宣布她打算明年春天退休。'],
      ]],
      ['margin', 'ˋmɑrdʒɪn', 'n.', '邊緣；利潤', 'profit margin', 3, ['marginal', 'marginally'], [
        ['The store has a higher profit [margin] on its own brand products.', '這家店自有品牌商品的利潤率比較高。'],
        ['Please write your comments in the [margin] of the document.', '請把意見寫在文件的頁邊空白處。'],
      ]],
      ['method', 'ˋmɛθəd', 'n.', '方法', 'payment method', 1, ['methodical', 'methodically'], [
        ['Which payment [method] would you prefer?', '您想用哪一種付款方式？'],
        ['The trainer showed us a faster [method] for entering data.', '講師教我們一個更快的資料輸入方法。'],
      ]],
      ['incentive', 'ɪnˋsɛntɪv', 'n.', '獎勵；誘因', 'offer an incentive', 3, ['intensive', 'intensively'], [
        ['The company offers a cash [incentive] to employees who meet their sales targets.', '公司提供現金獎勵給達成業績目標的員工。'],
        ['Free shipping is a strong [incentive] for customers to buy online.', '免運費是吸引顧客網購的一大誘因。'],
      ]],
      ['occupation', 'ˏɑkjəˋpeʃən', 'n.', '職業', 'state your occupation', 2, ['occupy', 'occupied'], [
        ['Please write your name, age, and [occupation] on the form.', '請在表格上填寫姓名、年齡和職業。'],
        ['Nursing is a demanding but rewarding [occupation].', '護理是一份辛苦但很有成就感的職業。'],
      ]],
      ['opportunity', 'ˏɑpɚˋtjunətɪ', 'n.', '機會', 'a job opportunity', 1, ['opportune', 'opportunely'], [
        ['Thank you for the [opportunity] to speak with you today.', '謝謝您今天給我和您談話的機會。'],
        ['This position is a great career [opportunity] for recent graduates.', '這個職位對應屆畢業生來說是很好的職涯機會。'],
      ]],
      ['feasibility', 'ˏfizəˋbɪlətɪ', 'n.', '可行性', 'a feasibility study', 3, ['feasible', 'feasibly'], [
        ['We need to examine the [feasibility] of opening a second store.', '我們需要評估開第二家分店的可行性。'],
        ['The [feasibility] of the project depends on government funding.', '這個計畫是否可行取決於政府補助。'],
      ]],
      ['perspective', 'pɚˋspɛktɪv', 'n.', '觀點', "from a customer's perspective", 3, ['prospective', 'perceptive'], [
        ["From a customer's [perspective], the website is hard to use.", '從顧客的角度來看，這個網站很難用。'],
        ['Working abroad gave me a new [perspective] on business.', '在國外工作讓我對商業有了新的看法。'],
      ]],
      ['preference', 'ˋprɛfərəns', 'n.', '偏好', 'a preference for', 2, ['prefer', 'preferable'], [
        ['Do you have a [preference] for a window or aisle seat?', '您比較想要靠窗還是靠走道的座位？'],
        ['Customers showed a clear [preference] for the smaller model.', '顧客明顯比較喜歡較小的機型。'],
      ]],
      ['precaution', 'prɪˋkɔʃən', 'n.', '預防措施', 'as a precaution', 3, ['precautionary', 'cautious'], [
        ['As a [precaution], all employees must wear safety glasses in the lab.', '為了預防起見，所有員工在實驗室都必須戴護目鏡。'],
        ['The airline took every [precaution] to protect passengers.', '航空公司採取了一切預防措施來保護乘客。'],
      ]],
    ],
  },
  {
    id: 'nouns2', track: 'toeic', name: '高頻名詞 II', icon: '📗', words: [
      ['proficiency', 'prəˋfɪʃənsɪ', 'n.', '熟練；精通', 'English proficiency', 3, ['proficient', 'proficiently'], [
        ['Applicants must demonstrate [proficiency] in Japanese.', '應徵者必須證明具備日語能力。'],
        ['A high score on the test shows your English [proficiency].', '考試高分能證明你的英語能力。'],
      ]],
      ['prospect', 'ˋprɑspɛkt', 'n.', '前景；潛在客戶', 'a sales prospect', 3, ['prospective', 'prospectively'], [
        ['The sales team contacted every new [prospect] at the trade fair.', '業務團隊聯絡了在商展認識的每一位潛在客戶。'],
        ['The [prospect] of a pay raise motivated the staff.', '可能加薪的前景激勵了員工。'],
      ]],
      ['quotation', 'kwoˋteʃən', 'n.', '報價；引述', 'request a quotation', 3, ['quoted', 'quotable'], [
        ['Please send us a [quotation] for 500 printed brochures.', '請提供印製 500 份手冊的報價給我們。'],
        ["The article opens with a [quotation] from the company's founder.", '這篇文章以公司創辦人的一句話開頭。'],
      ]],
      ['rate', 'ret', 'n.', '比率；費用', 'interest rate', 1, ['rated', 'rating'], [
        ['The hotel charges a nightly [rate] of $120.', '這家飯店每晚收費 120 美元。'],
        ['The unemployment [rate] fell to 3 percent last month.', '上個月失業率降到 3%。'],
      ]],
      ['recognition', 'ˏrɛkəgˋnɪʃən', 'n.', '表揚；認可', 'in recognition of', 2, ['recognize', 'recognizable'], [
        ['She received an award in [recognition] of her service.', '她獲頒獎項，以表彰她的貢獻。'],
        ['The brand has gained international [recognition].', '這個品牌已獲得國際認可。'],
      ]],
      ['recommendation', 'ˏrɛkəmɛnˋdeʃən', 'n.', '推薦；建議', 'a letter of recommendation', 2, ['recommend', 'recommended'], [
        ['Could you write a letter of [recommendation] for me?', '你可以幫我寫一封推薦信嗎？'],
        ["The board accepted the consultant's [recommendation] to close the branch.", '董事會接受了顧問關閉分店的建議。'],
      ]],
      ['reduction', 'rɪˋdʌkʃən', 'n.', '減少；降低', 'a reduction in costs', 2, ['reduce', 'reduced'], [
        ['The new system led to a 20 percent [reduction] in energy use.', '新系統讓能源使用量減少了 20%。'],
        ['The union opposed any [reduction] in benefits.', '工會反對任何福利縮減。'],
      ]],
      ['reputation', 'ˏrɛpjəˋteʃən', 'n.', '名聲', 'a good reputation', 2, ['reputable', 'reputed'], [
        ['The restaurant has an excellent [reputation] for fresh seafood.', '這家餐廳以新鮮海鮮聞名。'],
        ["A single mistake can damage a company's [reputation].", '一個錯誤就可能損害公司的名聲。'],
      ]],
      ['remainder', 'rɪˋmendɚ', 'n.', '剩餘部分', 'the remainder of', 3, ['remain', 'remaining'], [
        ['The [remainder] of the payment is due next month.', '剩下的款項下個月到期。'],
        ["I'll be out of the office for the [remainder] of the week.", '這週剩下的時間我都不在辦公室。'],
      ]],
      ['resolution', 'ˏrɛzəˋluʃən', 'n.', '解決；決議', 'reach a resolution', 3, ['resolved', 'resolute'], [
        ['The board passed a [resolution] to increase the budget.', '董事會通過了增加預算的決議。'],
        ['We hope to reach a quick [resolution] to this dispute.', '我們希望能盡快解決這場糾紛。'],
      ]],
      ['responsibility', 'rɪˏspɑnsəˋbɪlətɪ', 'n.', '責任', 'take responsibility for', 2, ['responsible', 'responsibly'], [
        ['The manager takes full [responsibility] for the delay.', '經理為這次延誤負起全部責任。'],
        ['It is my [responsibility] to lock the office at night.', '晚上鎖辦公室門是我的責任。'],
      ]],
      ['outlook', 'ˋaʊtˏlʊk', 'n.', '前景；展望', 'the economic outlook', 3, ['outlet', 'overlook'], [
        ['The economic [outlook] for next year is positive.', '明年的經濟前景樂觀。'],
        ['Analysts have a positive [outlook] on the tech industry.', '分析師看好科技業的前景。'],
      ]],
      ['revision', 'rɪˋvɪʒən', 'n.', '修訂', 'a final revision', 2, ['revise', 'revised'], [
        ['The contract needs one more [revision] before we sign it.', '合約在簽署前還需要再修改一次。'],
        ['Please send me the latest [revision] of the report by Friday.', '請在星期五前把報告的最新修訂版寄給我。'],
      ]],
      ['obstacle', 'ˋɑbstəkl̩', 'n.', '障礙', 'overcome an obstacle', 2, ['obstruct', 'obstructive'], [
        ['High costs are the biggest [obstacle] to expanding overseas.', '高成本是拓展海外市場最大的障礙。'],
        ['The team worked together to overcome every [obstacle].', '團隊齊心克服了每一個障礙。'],
      ]],
      ['source', 'sors', 'n.', '來源', 'a reliable source', 1, ['sourced', 'sourcing'], [
        ['Tourism is the main [source] of income for the town.', '觀光是這個小鎮主要的收入來源。'],
        ['The reporter would not name her [source].', '記者不願透露她的消息來源。'],
      ]],
      ['standard', 'ˋstændɚd', 'n.', '標準', 'meet the standard', 1, ['standardize', 'standardized'], [
        ['All products must meet the international safety [standard].', '所有產品都必須符合國際安全標準。'],
        ['Our hotel sets a high [standard] for customer service.', '我們飯店對顧客服務設下很高的標準。'],
      ]],
      ['priority', 'praɪˋɔrətɪ', 'n.', '優先事項', 'top priority', 2, ['prior', 'prioritize'], [
        ['Customer safety is our top [priority].', '顧客安全是我們的首要之務。'],
        ['Please give this order [priority] over the others.', '請優先處理這張訂單。'],
      ]],
      ['supplement', 'ˋsʌpləmənt', 'n.', '補充；增刊', 'a weekly supplement', 3, ['supplementary', 'supplemental'], [
        ['The newspaper publishes a travel [supplement] every Sunday.', '這份報紙每週日出刊旅遊特刊。'],
        ['The training video is a useful [supplement] to the manual.', '訓練影片是手冊很好的補充。'],
      ]],
      ['query', 'ˋkwɪrɪ', 'n.', '詢問；疑問', 'answer a query', 3, ['queried', 'querying'], [
        ['Our support team answers every customer [query] within 24 hours.', '我們的客服團隊在 24 小時內回覆每一則顧客詢問。'],
        ['Please direct your [query] to the billing department.', '請將您的問題轉給帳務部門。'],
      ]],
      ['tendency', 'ˋtɛndənsɪ', 'n.', '傾向', 'a tendency to', 3, ['tend', 'tended'], [
        ['Customers have a [tendency] to buy more when prices are displayed clearly.', '價格標示清楚時，顧客往往會買得比較多。'],
        ['There is a growing [tendency] among young workers to change jobs often.', '年輕上班族越來越傾向經常換工作。'],
      ]],
      ['transition', 'trænˋzɪʃən', 'n.', '轉換；過渡', 'a smooth transition', 3, ['transitional', 'transitioned'], [
        ['We want a smooth [transition] to the new accounting system.', '我們希望能順利轉換到新的會計系統。'],
        ['The company is in a period of [transition] after the merger.', '公司在合併後正處於過渡期。'],
      ]],
      ['trial', 'ˋtraɪəl', 'n.', '試用；試驗', 'a free trial', 2, ['trail', 'tried'], [
        ['Sign up today for a 30-day free [trial].', '今天就註冊享 30 天免費試用。'],
        ['The new software is being tested in a [trial] at three branches.', '新軟體正在三家分店試行。'],
      ]],
      ['venture', 'ˋvɛntʃɚ', 'n.', '冒險事業；創業', 'a joint venture', 3, ['ventured', 'venturing'], [
        ['The two firms formed a joint [venture] to build the resort.', '兩家公司合資興建這座度假村。'],
        ['Opening a café was her first business [venture].', '開咖啡店是她第一次創業。'],
      ]],
      ['scope', 'skop', 'n.', '範圍', 'the scope of the project', 3, [], [
        ['The [scope] of the project has grown since January.', '這個專案的範圍從一月以來擴大了。'],
        ["This issue is outside the [scope] of today's meeting.", '這個問題不在今天會議的討論範圍內。'],
      ]],
      ['workforce', 'ˋwɝkˏfors', 'n.', '全體員工；勞動力', 'a skilled workforce', 3, [], [
        ['The company plans to cut its [workforce] by 10 percent.', '公司計畫裁減 10% 的員工。'],
        ['The region is known for its highly skilled [workforce].', '這個地區以高技術勞動力聞名。'],
      ]],
    ],
  },
  {
    id: 'trends', track: 'toeic', name: '數字與趨勢', icon: '📊', words: [
      ['surge', 'sɝdʒ', 'n.', '激增', 'a surge in demand', 3, ['surged', 'surging'], [
        ['There has been a [surge] in demand for electric cars.', '電動車的需求大幅激增。'],
        ['The store saw a sudden [surge] in online orders after the ad.', '廣告推出後，這家店的網路訂單突然暴增。'],
      ]],
      ['decline', 'dɪˋklaɪn', 'v.', '下降；婉拒', 'decline an offer', 2, ['declining', 'declined'], [
        ['Sales are expected to [decline] next quarter.', '預計下一季銷售額會下滑。'],
        ['She had to [decline] the invitation because of a prior commitment.', '她因為已經有約，只好婉拒邀請。'],
      ]],
      ['fluctuate', 'ˋflʌktʃʊˏet', 'v.', '波動', 'prices fluctuate', 3, ['fluctuation', 'fluctuating'], [
        ['Fuel prices tend to [fluctuate] throughout the year.', '燃料價格一整年都會波動。'],
        ['Exchange rates can [fluctuate] widely from day to day.', '匯率每天都可能大幅波動。'],
      ]],
      ['peak', 'pik', 'n./v.', '高峰；達到高峰', 'reach a peak', 2, ['peaked', 'peaking'], [
        ['Sales usually reach their [peak] in December.', '銷售額通常在十二月達到高峰。'],
        ['Ticket sales are expected to [peak] in late July.', '預計票房會在七月下旬達到高峰。'],
      ]],
      ['double', 'ˋdʌbl̩', 'v.', '加倍', 'double in size', 1, ['doubling', 'doubled'], [
        ['The company plans to [double] its workforce next year.', '公司計畫明年將員工人數增加一倍。'],
        ['Profits could [double] if the new product succeeds.', '如果新產品成功，利潤可能會翻倍。'],
      ]],
      ['steady', 'ˋstɛdɪ', 'adj.', '穩定的', 'steady growth', 2, ['steadily', 'steadiness'], [
        ['The company has seen [steady] growth over the past five years.', '公司過去五年穩定成長。'],
        ['Demand for our products has remained [steady] this year.', '今年我們產品的需求一直很穩定。'],
      ]],
      ['sharp', 'ʃɑrp', 'adj.', '急劇的', 'a sharp increase', 2, ['sharply', 'sharpen'], [
        ['There was a [sharp] increase in fuel prices last month.', '上個月燃料價格急劇上漲。'],
        ['The stock market saw a [sharp] drop on Monday.', '股市星期一大跌。'],
      ]],
      ['slight', 'slaɪt', 'adj.', '輕微的', 'a slight decrease', 2, ['slightly', 'slightest'], [
        ['There was a [slight] decrease in sales in March.', '三月的銷售額略為下滑。'],
        ['We expect only a [slight] delay in shipping.', '我們預計出貨只會稍微延遲。'],
      ]],
      ['plunge', 'plʌndʒ', 'v.', '暴跌', 'plunge by 20 percent', 3, ['plunged', 'plunging'], [
        ['Analysts warned that share prices could [plunge] after the announcement.', '分析師警告，消息公布後股價可能暴跌。'],
        ['Sales may [plunge] if we raise prices too much.', '如果我們漲價太多，銷售額可能會暴跌。'],
      ]],
      ['soar', 'sor', 'v.', '飆升', 'prices soar', 3, ['soared', 'soaring'], [
        ['Demand for the new phone is expected to [soar] this winter.', '預計今年冬天新手機的需求會飆升。'],
        ['Housing prices continue to [soar] in big cities.', '大城市的房價持續飆漲。'],
      ]],
      ['drop', 'drɑp', 'n.', '下降', 'a drop in sales', 1, ['dropped', 'dropping'], [
        ['The company reported a 10 percent [drop] in profits.', '公司公布利潤下滑了 10%。'],
        ['A sudden [drop] in temperature damaged the crops.', '氣溫驟降使農作物受損。'],
      ]],
      ['rise', 'raɪz', 'v.', '上升', 'rise sharply', 1, ['raise', 'risen'], [
        ['Prices are expected to [rise] next month.', '預計下個月物價會上漲。'],
        ['Interest rates will [rise] again in the spring.', '利率春天會再度調升。'],
      ]],
      ['stable', 'ˋstebl̩', 'adj.', '穩定的', 'a stable income', 2, ['stability', 'stabilize'], [
        ['The company is in a [stable] financial position.', '公司的財務狀況很穩定。'],
        ['Prices have remained [stable] for six months.', '物價已經連續六個月保持穩定。'],
      ]],
      ['figure', 'ˋfɪgjɚ', 'n.', '數字；人物', 'the final figure', 2, ['figured', 'figurative'], [
        ['The final [figure] will be announced at the end of the quarter.', '最終數字將在季末公布。'],
        ['She is a well-known [figure] in the fashion industry.', '她是時尚界的知名人物。'],
      ]],
      ['percentage', 'pɚˋsɛntɪdʒ', 'n.', '百分比', 'a high percentage of', 2, [], [
        ['A large [percentage] of our customers shop online.', '我們有很大比例的顧客在網路上購物。'],
        ['The [percentage] of women in management has increased.', '女性擔任主管的比例提高了。'],
      ]],
      ['average', 'ˋævərɪdʒ', 'n.', '平均', 'on average', 1, ['averaged', 'averaging'], [
        ['On [average], our staff work 38 hours a week.', '我們的員工平均每週工作 38 小時。'],
        ['Our sales this month were above [average].', '我們這個月的銷售額高於平均。'],
      ]],
      ['total', 'ˋtotl̩', 'n.', '總數；總共', 'in total', 1, ['totally', 'totaled'], [
        ['The [total] comes to $350, including tax.', '含稅總共是 350 美元。'],
        ['We received 120 applications in [total].', '我們總共收到 120 份申請。'],
      ]],
      ['ratio', 'ˋreʃo', 'n.', '比例', 'the ratio of A to B', 3, ['rational', 'rationally'], [
        ['The [ratio] of teachers to students is one to ten.', '師生比是一比十。'],
        ["Investors look closely at the company's debt-to-equity [ratio].", '投資人密切關注公司的負債權益比。'],
      ]],
      ['statistics', 'stəˋtɪstɪks', 'n.', '統計數據', 'official statistics', 2, ['statistical', 'statistically'], [
        ['According to the latest [statistics], tourism is growing.', '根據最新統計，觀光業正在成長。'],
        ['The report includes [statistics] on employee turnover.', '報告中包含員工流動率的統計數據。'],
      ]],
      ['boost', 'bust', 'v.', '提升；促進', 'boost sales', 2, ['booster', 'boosted'], [
        ['The new ad campaign should [boost] sales.', '新的廣告活動應該能提升銷售額。'],
        ['Lower prices helped [boost] demand in the second quarter.', '降價帶動了第二季的需求。'],
      ]],
      ['fall short', 'fɔl ʃɔrt', 'v.', '未達到', 'fall short of expectations', 3, ['fell short', 'fallen short'], [
        ['Our sales could [fall short] of the target this quarter.', '我們這一季的銷售額可能達不到目標。'],
        ['If donations [fall short], the event will be canceled.', '如果捐款不足，活動就會取消。'],
      ]],
      ['level off', 'ˋlɛvl̩ ɔf', 'v.', '趨於平穩', 'prices level off', 3, ['leveled off', 'leveling off'], [
        ['Experts expect housing prices to [level off] next year.', '專家預期明年房價會趨於平穩。'],
        ['After months of growth, sales began to [level off].', '經過幾個月的成長後，銷售額開始持平。'],
      ]],
      ['rebound', 'rɪˋbaʊnd', 'v.', '反彈；回升', 'rebound strongly', 3, ['rebounded', 'rebounding'], [
        ['Analysts expect the market to [rebound] next quarter.', '分析師預期市場下一季會反彈。'],
        ['Tourism should [rebound] once the new airport opens.', '新機場啟用後，觀光業應該會回溫。'],
      ]],
      ['outperform', 'ˏaʊtpɚˋfɔrm', 'v.', '表現優於', 'outperform competitors', 3, ['outperformed', 'performance'], [
        ['Our new model is expected to [outperform] its competitors.', '我們的新機型預計表現會優於競爭對手。'],
        ['Small companies can often [outperform] larger ones.', '小公司的表現常常能勝過大公司。'],
      ]],
      ['projection', 'prəˋdʒɛkʃən', 'n.', '預測；預估', 'a sales projection', 3, ['projected', 'projecting'], [
        ["The finance team prepared a [projection] of next year's revenue.", '財務團隊做了明年營收的預估。'],
        ['According to the latest [projection], profits will rise by 5 percent.', '根據最新預測，利潤將成長 5%。'],
      ]],
    ],
  },
  {
    id: 'mail', track: 'toeic', name: '電話與郵件', icon: '✉️', words: [
      ['voicemail', 'ˋvɔɪsˏmel', 'n.', '語音信箱', 'leave a voicemail', 1, [], [
        ['I left a [voicemail] for Ms. Chen this morning.', '我今天早上在陳小姐的語音信箱留了言。'],
        ['Please check your [voicemail] when you get back.', '你回來後請聽一下語音留言。'],
      ]],
      ['regarding', 'rɪˋgɑrdɪŋ', 'prep.', '關於', 'regarding your inquiry', 2, ['regard', 'regardless'], [
        ['I am writing [regarding] your recent order.', '我來信是關於您最近的訂單。'],
        ['If you have any questions [regarding] the schedule, please contact me.', '如果對行程有任何問題，請與我聯絡。'],
      ]],
      ['attached', 'əˋtætʃt', 'adj.', '附加的；隨信附上的', 'the attached file', 1, ['attach', 'attaching'], [
        ['Please review the [attached] document before the meeting.', '開會前請先看過附件文件。'],
        ['Please complete the [attached] form and return it by Friday.', '請填寫附件表格，並在星期五前交回。'],
      ]],
      ['forward', 'ˋfɔrwɚd', 'v.', '轉寄', 'forward an email', 1, ['forwarded', 'forwarding'], [
        ['Could you [forward] this email to the sales team?', '你可以把這封信轉寄給業務團隊嗎？'],
        ['I will [forward] your message to the manager.', '我會把您的留言轉給經理。'],
      ]],
      ['reply all', 'rɪˋplaɪ ɔl', 'v.', '全部回覆', 'click reply all', 1, [], [
        ["Please don't [reply all] unless everyone needs the information.", '除非每個人都需要這個資訊，否則請不要按全部回覆。'],
        ['I accidentally hit [reply all] and sent my note to the whole office.', '我不小心按了全部回覆，把訊息寄給整個辦公室。'],
      ]],
      ['subject line', 'ˋsʌbdʒɪkt ˏlaɪn', 'n.', '郵件主旨', 'a clear subject line', 2, [], [
        ['Please include your order number in the [subject line].', '請在郵件主旨中註明您的訂單編號。'],
        ['A short, clear [subject line] helps people find your email later.', '簡短清楚的主旨能讓人日後更容易找到你的信。'],
      ]],
      ['recipient', 'rɪˋsɪpɪənt', 'n.', '收件人', 'the recipient of', 2, ['receive', 'receptive'], [
        ['Double-check the [recipient] before you send the email.', '寄出郵件前，請再確認一次收件人。'],
        ["She was the [recipient] of this year's sales award.", '她是今年業績獎的得主。'],
      ]],
      ['sender', 'ˋsɛndɚ', 'n.', '寄件人', 'return to sender', 1, ['send', 'sent'], [
        ['The package was returned to the [sender].', '包裹被退回給寄件人。'],
        ["Do not open attachments if you don't know the [sender].", '如果不認識寄件人，請不要打開附件。'],
      ]],
      ['inbox', 'ˋɪnˏbɑks', 'n.', '收件匣', 'check your inbox', 1, [], [
        ['I have over 200 unread emails in my [inbox].', '我的收件匣裡有超過 200 封未讀郵件。'],
        ['The confirmation email should arrive in your [inbox] within minutes.', '確認信應該幾分鐘內就會寄到您的收件匣。'],
      ]],
      ['spam', 'spæm', 'n.', '垃圾郵件', 'a spam filter', 1, [], [
        ["Check your [spam] folder if you don't see our reply.", '如果沒看到我們的回信，請檢查垃圾郵件匣。'],
        ['Our new filter blocks most [spam] before it reaches employees.', '我們的新過濾器能在垃圾郵件寄到員工手上前擋下大部分。'],
      ]],
      ['conference call', 'ˋkɑnfərəns ˏkɔl', 'n.', '電話會議', 'join a conference call', 2, [], [
        ['We have a [conference call] with the Tokyo office at 9 a.m.', '我們早上九點要和東京辦公室開電話會議。'],
        ['Please dial in to the [conference call] five minutes early.', '請提早五分鐘撥入電話會議。'],
      ]],
      ['enclosed', 'ɪnˋklozd', 'adj.', '隨函附上的', 'the enclosed form', 3, ['enclose', 'enclosing'], [
        ['Please sign the [enclosed] contract and return it to us.', '請簽署隨函附上的合約並寄回給我們。'],
        ['A copy of the receipt is [enclosed] with this letter.', '隨信附上收據影本一份。'],
      ]],
      ['correspondence', 'ˏkɔrəˋspɑndəns', 'n.', '通信；信件', 'business correspondence', 3, ['correspond', 'correspondent'], [
        ['Please keep copies of all [correspondence] with clients.', '請保留與客戶往來的所有信件副本。'],
        ['All [correspondence] should be sent to our new address.', '所有信件都請寄到我們的新地址。'],
      ]],
      ['out of office', 'aʊt əv ˋɔfɪs', 'adj.', '不在辦公室', 'an out of office reply', 2, [], [
        ['I set up an [out of office] message before my vacation.', '我休假前設定了不在辦公室的自動回覆。'],
        ['Mr. Kim is [out of office] until June 3.', '金先生到 6 月 3 日前都不在辦公室。'],
      ]],
      ['notice', 'ˋnotɪs', 'n.', '通知；公告', 'without notice', 1, ['notify', 'noticeable'], [
        ['Please read the [notice] posted by the elevator.', '請閱讀貼在電梯旁的公告。'],
        ['Prices may change without [notice].', '價格可能隨時變動，恕不另行通知。'],
      ]],
      ['bulletin', 'ˋbʊlətɪn', 'n.', '公告；簡報', 'a news bulletin', 2, [], [
        ['The new schedule is posted on the [bulletin] board.', '新的班表貼在公告欄上。'],
        ['The company sends out a weekly news [bulletin] to all staff.', '公司每週會寄一份新聞快訊給全體員工。'],
      ]],
      ['newsletter', 'ˋnjuzˏlɛtɚ', 'n.', '電子報；通訊', 'subscribe to a newsletter', 2, [], [
        ['Sign up for our monthly [newsletter] to get special offers.', '訂閱我們的每月電子報，就能收到優惠訊息。'],
        ['The new manager was introduced in the company [newsletter].', '公司通訊介紹了新任經理。'],
      ]],
      ['courier', 'ˋkʊrɪɚ', 'n.', '快遞（員）', 'send by courier', 2, [], [
        ['The documents will be delivered by [courier] tomorrow morning.', '文件明天早上會以快遞送達。'],
        ['A [courier] came to pick up the package at noon.', '快遞員中午來取件。'],
      ]],
      ['envelope', 'ˋɛnvəˏlop', 'n.', '信封', 'a sealed envelope', 1, ['envelop', 'enveloped'], [
        ['Please put the invoice in a stamped [envelope].', '請把發票放進貼好郵票的信封裡。'],
        ['Write the address clearly on the front of the [envelope].', '請把地址清楚寫在信封正面。'],
      ]],
      ['postage', 'ˋpostɪdʒ', 'n.', '郵資', 'postage paid', 2, ['postal', 'posted'], [
        ['How much [postage] do I need for this letter to Canada?', '這封寄到加拿大的信需要多少郵資？'],
        ['The price includes [postage] and handling.', '價格包含郵資和手續費。'],
      ]],
      ['stationery', 'ˋsteʃənˏɛrɪ', 'n.', '文具', 'office stationery', 2, ['stationary', 'station'], [
        ['Please order more [stationery] for the front desk.', '請幫櫃檯多訂一些文具。'],
        ['The company logo is printed on all our [stationery].', '我們所有的文具上都印有公司標誌。'],
      ]],
      ['letterhead', 'ˋlɛtɚˏhɛd', 'n.', '印有公司抬頭的信紙', 'company letterhead', 3, [], [
        ['Official letters must be printed on company [letterhead].', '正式信件必須印在公司抬頭信紙上。'],
        ['The new [letterhead] shows our updated address and logo.', '新的信紙抬頭印有我們更新後的地址和標誌。'],
      ]],
      ['dial', 'ˋdaɪəl', 'v.', '撥號', 'dial a number', 1, ['dialed', 'dialing'], [
        ['Please [dial] 9 to get an outside line.', '撥外線請先按 9。'],
        ['To reach the front desk, [dial] zero from your room.', '要聯絡櫃檯，請從房間撥 0。'],
      ]],
      ['hang up', 'hæŋ ʌp', 'v.', '掛電話', 'hang up the phone', 1, ['hung up', 'hanging up'], [
        ["Please don't [hang up]; I'll transfer you now.", '請不要掛斷，我現在幫您轉接。'],
        ["I'm sorry, I have to [hang up] now; my next meeting is starting.", '抱歉，我得掛電話了，下一個會議要開始了。'],
      ]],
      ['get back to', 'gɛt bæk tu', 'v.', '回覆（某人）', 'get back to sb', 2, ['got back to', 'getting back to'], [
        ["I'll [get back to] you by the end of the day.", '我今天下班前會回覆你。'],
        ['Could you [get back to] the client about the price?', '你可以回覆客戶有關價格的問題嗎？'],
      ]],
    ],
  },
  {
    id: 'timing', track: 'toeic', name: '時間與日程', icon: '⏰', words: [
      ['fiscal year', 'ˋfɪskl̩ jɪr', 'n.', '會計年度', 'the end of the fiscal year', 3, [], [
        ['Sales rose by 12 percent in the last [fiscal year].', '上個會計年度的銷售額成長了百分之十二。'],
        ['The new budget takes effect at the start of the [fiscal year].', '新預算從會計年度開始時生效。'],
      ]],
      ['quarterly', 'ˋkwɔrtɚlɪ', 'adj.', '每季的', 'quarterly report', 2, ['quarter', 'quarters'], [
        ['Ms. Lee is preparing a [quarterly] budget review for the board.', '李小姐正在為董事會準備每季的預算檢討。'],
        ['The company newsletter is published on a [quarterly] basis.', '公司的電子報每季發行一次。'],
      ]],
      ['biweekly', 'baɪˋwiklɪ', 'adj.', '兩週一次的', 'biweekly meeting', 3, [], [
        ['Employees at the factory are paid on a [biweekly] basis.', '工廠的員工每兩週領一次薪水。'],
        ['The design team holds a [biweekly] check-in on Monday mornings.', '設計團隊每兩週的星期一早上開一次進度會議。'],
      ]],
      ['annually', 'ˋænjʊəlɪ', 'adv.', '每年', 'be held annually', 2, ['annual', 'anniversary'], [
        ['The trade conference is held [annually] in Melbourne.', '這場貿易研討會每年在墨爾本舉行。'],
        ['All safety equipment is inspected [annually] by an outside firm.', '所有安全設備每年由外部公司檢查一次。'],
      ]],
      ['overdue', 'ˏovɚˋdju', 'adj.', '過期的；逾期未付的', 'an overdue payment', 2, ['overdo', 'overdone'], [
        ['Please pay the [overdue] balance by Friday to avoid a late fee.', '請在星期五前繳清逾期的款項，以免被收滯納金。'],
        ['The library book I borrowed is two weeks [overdue].', '我借的圖書館的書已經逾期兩週了。'],
      ]],
      ['punctual', 'ˋpʌŋktʃʊəl', 'adj.', '準時的', 'be punctual for', 2, ['punctuality', 'punctually'], [
        ['Please be [punctual] for the 9 a.m. meeting with the client.', '早上九點和客戶的會議請準時出席。'],
        ['Mr. Kim is known as a [punctual] and reliable employee.', '金先生是出了名準時又可靠的員工。'],
      ]],
      ['on schedule', 'ɑn ˋskɛdʒʊl', 'prep.', '按照預定時間', 'run on schedule', 1, [], [
        ['The office renovation is still [on schedule] despite the rain.', '儘管下雨，辦公室的整修仍然按照進度進行。'],
        ['All flights to Brisbane are departing [on schedule] this morning.', '今天早上飛往布里斯本的班機都準時起飛。'],
      ]],
      ['behind schedule', 'bɪˋhaɪnd ˋskɛdʒʊl', 'prep.', '進度落後', 'fall behind schedule', 2, [], [
        ['The construction project is three weeks [behind schedule].', '這項工程的進度落後了三週。'],
        ['We hired two more workers because we were falling [behind schedule].', '因為進度開始落後，我們又多請了兩名工人。'],
      ]],
      ['ahead of schedule', 'əˋhɛd əv ˋskɛdʒʊl', 'prep.', '比預定時間提前', 'finish ahead of schedule', 2, [], [
        ['The new branch opened two months [ahead of schedule].', '新分店比預定時間提早兩個月開幕。'],
        ['Thanks to the extra staff, we finished the audit [ahead of schedule].', '多虧有額外的人手，我們提前完成了稽核。'],
      ]],
      ['in time', 'ɪn taɪm', 'prep.', '及時', 'in time for', 1, [], [
        ['We arrived just [in time] for the keynote speech.', '我們剛好及時趕上主題演講。'],
        ['Will the parts be delivered [in time] for the product launch?', '零件能及時送到、趕上產品發表嗎？'],
      ]],
      ['timeline', 'ˋtaɪmˏlaɪn', 'n.', '時程表', 'project timeline', 2, ['timely', 'timed'], [
        ['The project [timeline] has been revised because of the delay.', '因為延誤，專案的時程表已經修改了。'],
        ['Please send me a [timeline] for the office move.', '請把辦公室搬遷的時程表寄給我。'],
      ]],
      ['duration', 'djʊˋreʃən', 'n.', '持續時間；期間', 'for the duration of', 3, ['durable', 'endure'], [
        ['Please keep your phone switched off for the [duration] of the flight.', '飛行期間請保持手機關機。'],
        ['The [duration] of the contract is two years.', '這份合約的期限是兩年。'],
      ]],
      ['interval', 'ˋɪntɚvl̩', 'n.', '間隔', 'at regular intervals', 3, [], [
        ['There will be a 20-minute [interval] between the two sessions.', '兩場議程之間會有二十分鐘的休息時間。'],
        ['The machine checks the temperature at a set [interval].', '這台機器每隔固定的時間檢查一次溫度。'],
      ]],
      ['ongoing', 'ˋɑnˏgoɪŋ', 'adj.', '進行中的；持續的', 'ongoing project', 2, ['outgoing', 'undergo'], [
        ['The contract negotiations are still [ongoing].', '合約協商仍在進行中。'],
        ['Thank you for your [ongoing] support of our charity.', '感謝您一直以來對我們慈善機構的支持。'],
      ]],
      ['adjourn', 'əˋdʒɝn', 'v.', '休會；延會', 'adjourn the meeting', 3, ['adjournment', 'adjourned'], [
        ["Let's [adjourn] the meeting until tomorrow morning.", '我們先休會，明天早上再繼續。'],
        ['The chairperson decided to [adjourn] the session at noon.', '主席決定在中午宣布休會。'],
      ]],
      ['convene', 'kənˋvin', 'v.', '召開（會議）；聚集', 'convene a meeting', 3, ['convention', 'convenient'], [
        ['The board of directors will [convene] next Monday to vote on the merger.', '董事會將在下週一開會，表決合併案。'],
        ['The director plans to [convene] a meeting of all department managers.', '主任打算召集所有部門經理開會。'],
      ]],
      ['calendar', 'ˋkæləndɚ', 'n.', '行事曆', 'mark the date on the calendar', 1, [], [
        ["I've added the training session to my [calendar].", '我已經把訓練課程加進我的行事曆了。'],
        ['Please check the shared [calendar] before booking the meeting room.', '預約會議室前請先查看共用行事曆。'],
      ]],
      ['slot', 'slɑt', 'n.', '時段；空檔', 'time slot', 2, [], [
        ['The only open [slot] this week is Thursday at 3 p.m.', '這週唯一的空檔是星期四下午三點。'],
        ['Each speaker has a 15-minute [slot] in the program.', '每位講者在議程中有十五分鐘的時段。'],
      ]],
      ['prior', 'ˋpraɪɚ', 'adj.', '先前的', 'prior to', 3, ['priority', 'priorities'], [
        ['Applicants must have [prior] experience in sales.', '應徵者必須有銷售相關經驗。'],
        ['Please arrive at the airport two hours [prior] to departure.', '請在起飛前兩小時抵達機場。'],
      ]],
      ['occupied', 'ˋɑkjəˏpaɪd', 'adj.', '使用中的；忙碌的', 'be occupied with', 2, ['occupation', 'occupy'], [
        ['Sorry, all the meeting rooms are [occupied] right now.', '抱歉，所有會議室現在都有人在用。'],
        ['Ms. Tan was [occupied] with client calls all morning.', '陳小姐整個早上都忙著接客戶的電話。'],
      ]],
      ['beforehand', 'bɪˋforˏhænd', 'adv.', '事先', 'let sb know beforehand', 2, [], [
        ['Please register [beforehand] if you plan to attend the workshop.', '如果打算參加工作坊，請事先報名。'],
        ['We reviewed the slides [beforehand] to avoid any mistakes.', '我們事先檢查過投影片，避免出錯。'],
      ]],
      ['meanwhile', 'ˋminˏhwaɪl', 'adv.', '同時；在此期間', 'in the meanwhile', 2, ['whereas', 'whereby'], [
        ['The new system will launch in May. [Meanwhile], staff will continue to use the old one.', '新系統五月上線，在此之前員工會繼續使用舊系統。'],
        ['The office is being repainted; [meanwhile], employees will work from home.', '辦公室正在重新粉刷，這段期間員工會在家工作。'],
      ]],
      ['afterward', 'ˋæftɚwɚd', 'adv.', '之後；後來', 'shortly afterward', 1, [], [
        ['The seminar ends at four, and a reception will be held [afterward].', '研討會四點結束，之後會舉行歡迎酒會。'],
        ['The manager announced the merger, and shortly [afterward] the stock price rose.', '經理宣布合併案，不久之後股價就上漲了。'],
      ]],
      ['imminent', 'ˋɪmənənt', 'adj.', '即將發生的', 'imminent danger', 3, ['eminent', 'imminence'], [
        ['Analysts believe a merger announcement is [imminent].', '分析師認為合併的消息即將宣布。'],
        ['Staff were warned of the [imminent] closure of the plant.', '員工被告知工廠即將關閉。'],
      ]],
      ['until further notice', 'ənˋtɪl ˋfɝðɚ ˋnotɪs', 'prep.', '直到另行通知', 'closed until further notice', 3, [], [
        ['The east entrance will be closed [until further notice].', '東側入口關閉，直到另行通知。'],
        ['All business travel is suspended [until further notice].', '所有出差暫停，直到另行通知。'],
      ]],
    ],
  },
  {
    id: 'banking', track: 'toeic', name: '銀行與投資', icon: '🏦', words: [
      ['mortgage', 'ˋmɔrgɪdʒ', 'n.', '房貸；抵押貸款', 'take out a mortgage', 3, [], [
        ['The couple took out a [mortgage] to buy their first home.', '這對夫妻申請了房貸買下第一間房子。'],
        ['Our [mortgage] payment is due on the first of each month.', '我們的房貸每個月一號要繳。'],
      ]],
      ['interest rate', 'ˋɪntərɪst ret', 'n.', '利率', 'raise interest rates', 2, [], [
        ['The central bank decided to keep the [interest rate] unchanged.', '央行決定維持利率不變。'],
        ['This savings account offers a higher [interest rate] than most banks.', '這個儲蓄帳戶的利率比大多數銀行高。'],
      ]],
      ['stock', 'stɑk', 'n.', '股票；庫存', 'in stock', 2, [], [
        ['The printer you ordered is currently out of [stock].', '您訂購的印表機目前沒有庫存。'],
        ['She bought [stock] in a renewable energy company.', '她買了一家再生能源公司的股票。'],
      ]],
      ['dividend', 'ˋdɪvəˏdɛnd', 'n.', '股利', 'pay a dividend', 3, ['divide', 'divided'], [
        ['The company will pay a [dividend] to its shareholders in March.', '公司將在三月發放股利給股東。'],
        ['The board approved a larger [dividend] for this quarter.', '董事會通過這一季發放更高的股利。'],
      ]],
      ['portfolio', 'portˋfolɪˏo', 'n.', '投資組合；作品集', 'investment portfolio', 3, [], [
        ['Our financial advisor helped us diversify our [portfolio].', '我們的理財顧問幫我們分散投資組合。'],
        ['Please bring your design [portfolio] to the interview.', '面試時請帶著你的設計作品集。'],
      ]],
      ['asset', 'ˋæsɛt', 'n.', '資產', 'a valuable asset', 2, [], [
        ['Her language skills are a great [asset] to the team.', '她的語言能力是團隊的一大資產。'],
        ['The company sold its largest [asset], a downtown office building.', '公司賣掉了最大的資產──一棟市中心的辦公大樓。'],
      ]],
      ['debt', 'dɛt', 'n.', '債務', 'pay off debt', 2, ['debtor', 'indebted'], [
        ['The company has paid off most of its [debt].', '公司已經還清大部分的債務。'],
        ['Taking on too much [debt] can be risky for a small business.', '對小公司來說，背負太多債務很危險。'],
      ]],
      ['equity', 'ˋɛkwətɪ', 'n.', '股權；公平', 'equity stake', 3, ['equal', 'equitable'], [
        ['The founders sold part of their [equity] to raise funds.', '創辦人賣掉部分股權來籌措資金。'],
        ['Homeowners can borrow against the [equity] in their homes.', '屋主可以用房屋的淨值來借款。'],
      ]],
      ['fund', 'fʌnd', 'n.', '基金；資金', 'raise funds', 2, ['funded', 'fundamental'], [
        ['She invests in an index [fund] every month.', '她每個月都投資指數型基金。'],
        ['The city set up a [fund] to support local artists.', '市政府成立了一筆基金來支持在地藝術家。'],
      ]],
      ['savings account', 'ˋsevɪŋz əˋkaʊnt', 'n.', '儲蓄帳戶', 'open a savings account', 1, [], [
        ['I opened a [savings account] when I started my new job.', '我開始新工作時開了一個儲蓄帳戶。'],
        ['Part of each paycheck goes directly into my [savings account].', '每次薪水都有一部分直接存進我的儲蓄帳戶。'],
      ]],
      ['checking account', 'ˋtʃɛkɪŋ əˋkaʊnt', 'n.', '支票帳戶；活期帳戶', 'open a checking account', 2, [], [
        ['My rent is paid automatically from my [checking account].', '我的房租從支票帳戶自動扣款。'],
        ['There is no monthly fee for a student [checking account].', '學生活期帳戶沒有月費。'],
      ]],
      ['withdrawal', 'wɪðˋdrɔəl', 'n.', '提款；撤回', 'make a withdrawal', 2, ['withdraw', 'withdrawn'], [
        ['You can make a [withdrawal] at any of our branches.', '您可以在我們任何一家分行提款。'],
        ['There is a daily [withdrawal] limit of $1,000.', '每日提款上限是一千美元。'],
      ]],
      ['wire transfer', 'waɪr ˋtrænsfɚ', 'n.', '電匯', 'send a wire transfer', 2, [], [
        ['The supplier asked to be paid by [wire transfer].', '供應商要求以電匯付款。'],
        ['A [wire transfer] to an overseas account usually takes two days.', '電匯到海外帳戶通常需要兩天。'],
      ]],
      ['credit score', 'ˋkrɛdɪt skor', 'n.', '信用分數', 'a good credit score', 2, [], [
        ['A high [credit score] can help you get a lower interest rate.', '信用分數高可以幫你拿到較低的利率。'],
        ['Paying bills late can hurt your [credit score].', '帳單遲繳會影響你的信用分數。'],
      ]],
      ['credit', 'ˋkrɛdɪt', 'n.', '信用；額度', 'store credit', 2, ['credible', 'creditor'], [
        ['Customers with good [credit] can apply for a lower rate.', '信用良好的顧客可以申請較低的利率。'],
        ['The store gave me [credit] for the jacket I returned.', '店家把我退回的外套金額換成購物額度給我。'],
      ]],
      ['overdraft', 'ˋovɚˏdræft', 'n.', '透支', 'overdraft fee', 3, ['overdrawn', 'overdraw'], [
        ['The bank charges a fee for every [overdraft].', '每次透支銀行都會收取手續費。'],
        ['Your account currently has an [overdraft] of $200.', '您的帳戶目前透支兩百美元。'],
      ]],
      ['teller', 'ˋtɛlɚ', 'n.', '銀行櫃員', 'bank teller', 2, [], [
        ['The [teller] counted the cash twice before handing it over.', '櫃員把現金數了兩次才交出去。'],
        ['Please wait in line until a [teller] is available.', '請排隊等候，直到有櫃員可以為您服務。'],
      ]],
      ['ATM', 'ˏeˏtiˋɛm', 'n.', '自動提款機', 'withdraw cash from an ATM', 1, [], [
        ['Is there an [ATM] near the hotel?', '飯店附近有提款機嗎？'],
        ['The [ATM] in the lobby is out of order today.', '大廳的提款機今天故障了。'],
      ]],
      ['exchange rate', 'ɪksˋtʃendʒ ret', 'n.', '匯率', 'a favorable exchange rate', 2, [], [
        ['The [exchange rate] at the airport is usually not very good.', '機場的匯率通常不太好。'],
        ['Our profits depend partly on the [exchange rate].', '我們的利潤有一部分取決於匯率。'],
      ]],
      ['inflation', 'ɪnˋfleʃən', 'n.', '通貨膨脹', 'rising inflation', 3, ['inflate', 'inflated'], [
        ['Rising [inflation] has increased the cost of raw materials.', '通膨上升使原料成本增加。'],
        ['The central bank is trying to control [inflation].', '央行正努力控制通貨膨脹。'],
      ]],
      ['investor', 'ɪnˋvɛstɚ', 'n.', '投資人', 'attract investors', 2, ['invest', 'invested'], [
        ['The startup is looking for an [investor] to fund its expansion.', '這家新創公司正在尋找投資人資助擴張。'],
        ['One [investor] has agreed to provide $2 million.', '一位投資人已經同意出資兩百萬美元。'],
      ]],
      ['stock market', 'stɑk ˋmɑrkɪt', 'n.', '股市', 'invest in the stock market', 2, [], [
        ['The [stock market] fell sharply after the announcement.', '消息公布後股市大跌。'],
        ['He started investing in the [stock market] after college.', '他大學畢業後開始投資股市。'],
      ]],
      ['bankrupt', 'ˋbæŋkrʌpt', 'adj.', '破產的', 'go bankrupt', 3, ['bankruptcy', 'bankruptcies'], [
        ['One of our suppliers went [bankrupt] last year.', '我們的一家供應商去年破產了。'],
        ['Several airlines were declared [bankrupt] during the crisis.', '危機期間有好幾家航空公司被宣告破產。'],
      ]],
      ['lender', 'ˋlɛndɚ', 'n.', '出借人；貸方', 'mortgage lender', 3, ['lend', 'lending'], [
        ['The [lender] approved our loan application within a week.', '貸方在一週內就核准了我們的貸款申請。'],
        ['Please contact your [lender] right away if you miss a payment.', '如果漏繳一期，請立刻聯絡你的貸款機構。'],
      ]],
      ['collateral', 'kəˋlætərəl', 'n.', '擔保品', 'use sth as collateral', 3, [], [
        ['The bank asked us to use the building as [collateral].', '銀行要求我們用這棟大樓當擔保品。'],
        ['Loans of this size usually require [collateral].', '這種金額的貸款通常需要擔保品。'],
      ]],
    ],
  },
  {
    id: 'insurance', track: 'toeic', name: '保險與醫療行政', icon: '🩺', words: [
      ['premium', 'ˋprimɪəm', 'n./adj.', '保費；高級的', 'insurance premium', 3, [], [
        ['Our insurance [premium] increased by 5 percent this year.', '我們的保費今年漲了百分之五。'],
        ['The hotel offers [premium] rooms with ocean views.', '這家飯店提供海景的高級客房。'],
      ]],
      ['claim', 'klem', 'n./v.', '理賠申請；聲稱', 'file a claim', 2, ['claimant', 'claimed'], [
        ['You can file a [claim] online within 30 days of the accident.', '事故發生後三十天內可以上網申請理賠。'],
        ['Please submit the [claim] form along with your receipts.', '請把理賠申請表連同收據一起交上來。'],
      ]],
      ['deductible', 'dɪˋdʌktəbl̩', 'n.', '自付額', 'pay the deductible', 3, ['deduct', 'deducted'], [
        ['Our car insurance policy has a $500 [deductible].', '我們的汽車保險自付額是五百美元。'],
        ['You must pay the [deductible] before your coverage begins.', '你必須先付自付額，保險才開始給付。'],
      ]],
      ['policyholder', 'ˋpɑləsɪˏholdɚ', 'n.', '保戶', 'notify policyholders', 3, [], [
        ['Every [policyholder] receives an annual statement in January.', '每位保戶都會在一月收到年度對帳單。'],
        ['The insurer sent a letter to each [policyholder] about the new rates.', '保險公司寄信通知每位保戶新的費率。'],
      ]],
      ['beneficiary', 'ˏbɛnəˋfɪʃɪˏɛrɪ', 'n.', '受益人', 'name a beneficiary', 3, ['beneficial', 'beneficially'], [
        ['She named her son as the [beneficiary] of the policy.', '她指定兒子為這份保單的受益人。'],
        ['The [beneficiary] must sign the claim form.', '受益人必須在理賠申請表上簽名。'],
      ]],
      ['copayment', 'koˋpemənt', 'n.', '部分負擔', 'make a copayment', 3, [], [
        ["The [copayment] for a doctor's visit is $20.", '看一次醫生的部分負擔是二十美元。'],
        ['Patients pay a small [copayment] at the front desk.', '病人在櫃檯支付一小筆部分負擔。'],
      ]],
      ['insured', 'ɪnˋʃʊrd', 'adj./n.', '被保險的；被保險人', 'be fully insured', 3, ['insure', 'insurance'], [
        ['Is your company car [insured] against theft?', '你的公務車有保竊盜險嗎？'],
        ['The package is fully [insured] for its full value.', '這個包裹已經按全額投保。'],
      ]],
      ['medical record', 'ˋmɛdɪkl̩ ˋrɛkɚd', 'n.', '病歷', 'access medical records', 2, [], [
        ['The clinic keeps every [medical record] in a secure database.', '診所把每一份病歷都存在安全的資料庫裡。'],
        ['Please bring a copy of your [medical record] to your first visit.', '初診時請帶一份你的病歷影本。'],
      ]],
      ['waiting room', 'ˋwetɪŋ rum', 'n.', '候診室；等候室', 'sit in the waiting room', 1, [], [
        ['Please have a seat in the [waiting room] until your name is called.', '請在候診室坐一下，等叫到您的名字。'],
        ['The [waiting room] was full of patients this morning.', '今天早上候診室擠滿了病人。'],
      ]],
      ['referral', 'rɪˋfɝəl', 'n.', '轉診；推薦', 'a referral to a specialist', 3, ['refer', 'referred'], [
        ['You need a [referral] from your doctor to see a specialist.', '你需要醫生開轉診單才能看專科醫師。'],
        ['We offer a bonus for each successful [referral].', '每成功推薦一個人，我們就提供獎金。'],
      ]],
      ['specialist', 'ˋspɛʃəlɪst', 'n.', '專科醫師；專家', 'see a specialist', 2, ['specialize', 'specialized'], [
        ['Dr. Park is a heart [specialist] at the city hospital.', '朴醫師是市立醫院的心臟專科醫師。'],
        ['The company hired an IT [specialist] to fix the network.', '公司請了一位資訊專家來修網路。'],
      ]],
      ['diagnosis', 'ˏdaɪəgˋnosɪs', 'n.', '診斷', 'make a diagnosis', 2, ['diagnose', 'diagnosed'], [
        ['The doctor made a quick [diagnosis] after the blood test.', '醫生驗完血後很快就做出診斷。'],
        ['An early [diagnosis] can greatly improve treatment results.', '及早診斷能大幅改善治療效果。'],
      ]],
      ['pharmacist', 'ˋfɑrməsɪst', 'n.', '藥劑師', 'ask the pharmacist', 2, ['pharmacy', 'pharmaceutical'], [
        ['Mr. Lin has worked as a [pharmacist] for ten years.', '林先生當藥劑師已經十年了。'],
        ['The [pharmacist] put on a white coat and counted the pills carefully.', '藥劑師穿上白袍，仔細地數藥丸。'],
      ]],
      ['outpatient', 'ˋaʊtˏpeʃənt', 'n.', '門診病人', 'outpatient clinic', 3, [], [
        ['An [outpatient] can usually go home on the same day.', '門診病人通常當天就可以回家。'],
        ['The hospital is building a new [outpatient] clinic.', '醫院正在興建一座新的門診大樓。'],
      ]],
      ['inpatient', 'ˋɪnˏpeʃənt', 'n.', '住院病人', 'inpatient care', 3, [], [
        ['Each [inpatient] receives three meals a day.', '每位住院病人一天有三餐。'],
        ['The [inpatient] ward is on the fourth floor.', '住院病房在四樓。'],
      ]],
      ['vaccination', 'ˏvæksəˋneʃən', 'n.', '疫苗接種', 'get a vaccination', 2, ['vaccinate', 'vaccinated'], [
        ['Travelers need a [vaccination] before visiting the region.', '旅客前往該地區前需要接種疫苗。'],
        ['The company offers free flu [vaccination] to all staff.', '公司為全體員工提供免費的流感疫苗接種。'],
      ]],
      ['reimbursement', 'ˏriɪmˋbɝsmənt', 'n.', '核銷；退款', 'request reimbursement', 3, ['reimburse', 'reimbursed'], [
        ['Submit your receipts to receive [reimbursement] for travel costs.', '交出收據就能核銷差旅費。'],
        ['The [reimbursement] will be added to your next paycheck.', '核銷的款項會加在你下一次的薪水裡。'],
      ]],
      ['allergy', 'ˋælɚdʒɪ', 'n.', '過敏', 'a food allergy', 1, ['allergic', 'allergies'], [
        ['Do you have a food [allergy]?', '你有食物過敏嗎？'],
        ['My [allergy] to peanuts is quite serious.', '我對花生過敏的情況很嚴重。'],
      ]],
      ['emergency room', 'ɪˋmɝdʒənsɪ rum', 'n.', '急診室', 'go to the emergency room', 1, [], [
        ['He was taken to the [emergency room] after the accident.', '他在事故後被送到急診室。'],
        ['The [emergency room] is open 24 hours a day.', '急診室二十四小時開放。'],
      ]],
      ['health insurance', 'hɛlθ ɪnˋʃʊrəns', 'n.', '健康保險', 'health insurance coverage', 1, [], [
        ['Full-time employees receive [health insurance] from the company.', '全職員工享有公司提供的健康保險。'],
        ['Does your [health insurance] cover dental care?', '你的健康保險有給付牙科治療嗎？'],
      ]],
      ['sick leave', 'sɪk liv', 'n.', '病假', 'take sick leave', 1, [], [
        ['Ms. Wu is on [sick leave] until next Wednesday.', '吳小姐請病假到下週三。'],
        ['Employees get ten days of paid [sick leave] each year.', '員工每年有十天的帶薪病假。'],
      ]],
      ['physical therapy', 'ˋfɪzɪkl̩ ˋθɛrəpɪ', 'n.', '物理治療', 'undergo physical therapy', 2, [], [
        ['After the knee surgery, he needed six weeks of [physical therapy].', '膝蓋手術後，他需要做六週的物理治療。'],
        ['Our insurance plan covers [physical therapy] for back injuries.', '我們的保險方案有給付背傷的物理治療。'],
      ]],
      ['dosage', 'ˋdosɪdʒ', 'n.', '劑量', 'the recommended dosage', 3, [], [
        ['Do not exceed the recommended [dosage] on the label.', '請勿超過標籤上的建議劑量。'],
        ['The doctor lowered the [dosage] because of the side effects.', '因為有副作用，醫生降低了劑量。'],
      ]],
      ['side effect', 'saɪd ɪˋfɛkt', 'n.', '副作用', 'common side effect', 2, [], [
        ['A common [side effect] of this medicine is drowsiness.', '這種藥常見的副作用是嗜睡。'],
        ['Tell your doctor if you notice any [side effect].', '如果發現任何副作用，請告訴醫生。'],
      ]],
      ['first aid', 'fɝst ed', 'n.', '急救', 'first aid kit', 1, [], [
        ['All lifeguards must complete a [first aid] course.', '所有救生員都必須完成急救課程。'],
        ['The [first aid] kit is kept in the staff kitchen.', '急救箱放在員工茶水間。'],
      ]],
    ],
  },
  {
    id: 'retail', track: 'toeic', name: '零售與餐飲經營', icon: '🏪', words: [
      ['franchise', 'ˋfrænˏtʃaɪz', 'n.', '加盟店；經銷權', 'open a franchise', 3, ['franchised', 'franchising'], [
        ['She bought a [franchise] of a popular coffee chain.', '她買下了一家知名咖啡連鎖店的加盟店。'],
        ['The company plans to open its first [franchise] in Taipei next year.', '這家公司計畫明年在台北開第一家加盟店。'],
      ]],
      ['retailer', 'ˋriˏtelɚ', 'n.', '零售商', 'online retailer', 2, ['retail', 'retailing'], [
        ['The [retailer] will open three new stores next spring.', '這家零售商明年春天會開三家新店。'],
        ['A large [retailer] has agreed to sell our products.', '一家大型零售商已同意販售我們的產品。'],
      ]],
      ['wholesale', 'ˋholˏsel', 'n./adv.', '批發；以批發方式', 'wholesale prices', 2, ['wholesaler', 'wholesaling'], [
        ['Restaurants can buy rice at [wholesale] from this market.', '餐廳可以在這個市場用批發價買米。'],
        ['The factory sells [wholesale] to stores across the country.', '這間工廠以批發方式賣給全國各地的商店。'],
      ]],
      ['markup', 'ˋmɑrkˏʌp', 'n.', '加價；利潤', 'a 40 percent markup', 3, ['marking', 'marked'], [
        ['The store adds a 40 percent [markup] to imported goods.', '這家店對進口商品加價四成。'],
        ['The [markup] on bottled water at the hotel is very high.', '飯店裡瓶裝水的加價非常高。'],
      ]],
      ['clearance', 'ˋklɪrəns', 'n.', '清倉；許可', 'clearance sale', 2, ['clear', 'clearly'], [
        ['Everything in the [clearance] sale is 70 percent off.', '清倉拍賣的所有商品都打三折。'],
        ['These shoes were on [clearance] last week.', '這雙鞋上週在清倉特價。'],
      ]],
      ['price tag', 'ˋpraɪs ˏtæg', 'n.', '價格標籤', 'check the price tag', 1, [], [
        ['A clerk is attaching a [price tag] to each shirt.', '店員正在每件襯衫上掛價格標籤。'],
        ['The [price tag] on this sofa says $899.', '這張沙發的價格標籤寫著 899 美元。'],
      ]],
      ['display', 'dɪˋsple', 'n.', '陳列；展示', 'on display', 1, ['displayed', 'displaying'], [
        ['The new phones are on [display] near the entrance.', '新手機陳列在入口附近。'],
        ['She arranged a window [display] for the holiday season.', '她為節慶檔期布置了櫥窗陳列。'],
      ]],
      ['barcode', 'ˋbɑrˏkod', 'n.', '條碼', 'scan a barcode', 1, [], [
        ['The cashier is scanning the [barcode] on a box of cereal.', '收銀員正在掃一盒麥片上的條碼。'],
        ['Every item in the warehouse has a [barcode] for tracking.', '倉庫裡每件商品都有條碼以便追蹤。'],
      ]],
      ['stock up', 'stɑk ʌp', 'v.', '囤貨', 'stock up on supplies', 2, ['stocked up', 'stocking up'], [
        ['We need to [stock up] on paper before the holiday.', '我們得在連假前把紙囤好。'],
        ["Let's [stock up] on snacks before the long weekend.", '我們在連假前先囤點零食吧。'],
      ]],
      ['shopping cart', 'ˋʃɑpɪŋ ˏkɑrt', 'n.', '購物車', 'push a shopping cart', 1, [], [
        ['A woman is pushing a [shopping cart] down the aisle.', '一名女子正推著購物車走過走道。'],
        ['Click the icon to view the items in your [shopping cart].', '點選圖示即可查看購物車裡的商品。'],
      ]],
      ['markdown', 'ˋmɑrkˏdaʊn', 'n.', '降價', 'a 50 percent markdown', 3, ['marked down', 'marking down'], [
        ['Winter coats are now available at a 50 percent [markdown].', '冬季大衣現在打五折出售。'],
        ["The manager approved a [markdown] on last year's models.", '經理核准了去年款式的降價。'],
      ]],
      ['retail', 'ˋriˏtel', 'n.', '零售（業）', 'work in retail', 2, ['retailer', 'retailed'], [
        ['She has worked in [retail] for ten years.', '她在零售業工作了十年。'],
        ['Jobs in [retail] often include weekend shifts.', '零售業的工作常常要排週末班。'],
      ]],
      ['consumer', 'kənˋsumɚ', 'n.', '消費者', 'consumer demand', 2, ['consume', 'consumption'], [
        ["Today's [consumer] expects fast and free delivery.", '現在的消費者期待快速又免運的配送。'],
        ['Every [consumer] has the right to a refund for faulty goods.', '每位消費者都有權為瑕疵商品退款。'],
      ]],
      ['showroom', 'ˋʃoˏrum', 'n.', '展示間', 'car showroom', 2, [], [
        ['Visit our [showroom] to see the new furniture collection.', '歡迎到我們的展示間看新系列家具。'],
        ['The car dealer opened a larger [showroom] downtown.', '這家汽車經銷商在市中心開了更大的展示間。'],
      ]],
      ['loyalty program', 'ˋlɔɪəltɪ ˋprogræm', 'n.', '會員集點計畫', 'join a loyalty program', 2, [], [
        ['Members of our [loyalty program] earn points on every purchase.', '加入我們會員集點計畫的會員每次消費都能累積點數。'],
        ['The café launched a [loyalty program] to keep regular customers.', '這家咖啡店推出會員集點計畫來留住常客。'],
      ]],
      ['foot traffic', 'ˋfʊt ˋtræfɪk', 'n.', '人流；來客數', 'heavy foot traffic', 3, [], [
        ['The new location gets a lot of [foot traffic] from office workers.', '新店面有很多上班族經過，人流量很大。'],
        ['[Foot traffic] at the mall drops sharply after 8 p.m.', '購物中心晚上八點以後人潮大幅減少。'],
      ]],
      ['storefront', 'ˋstorˏfrʌnt', 'n.', '店面', 'rent a storefront', 2, [], [
        ['The bakery rented a small [storefront] on Main Street.', '這家麵包店在大街上租了一間小店面。'],
        ['A worker is painting the [storefront] before the grand opening.', '一名工人正在開幕前粉刷店面。'],
      ]],
      ['outlet', 'ˋaʊtˏlɛt', 'n.', '暢貨中心；插座', 'outlet mall', 2, ['outlay', 'outcome'], [
        ['We bought these shoes at an [outlet] near the airport.', '我們在機場附近的暢貨中心買了這雙鞋。'],
        ['Plug the charger into the [outlet] next to the desk.', '把充電器插到桌子旁邊的插座上。'],
      ]],
      ['packaging', 'ˋpækɪdʒɪŋ', 'n.', '包裝', 'eco-friendly packaging', 2, ['packed', 'packaged'], [
        ['The new [packaging] uses 30 percent less plastic.', '新包裝少用了三成的塑膠。'],
        ['Customers complained that the [packaging] was hard to open.', '顧客抱怨包裝很難打開。'],
      ]],
      ['vendor', 'ˋvɛndɚ', 'n.', '供應商；攤販', 'approved vendor', 2, ['vend', 'vending'], [
        ['We are looking for a new [vendor] for office supplies.', '我們正在找新的辦公用品供應商。'],
        ['Each [vendor] at the night market pays a small daily fee.', '夜市的每個攤販每天都要付一小筆費用。'],
      ]],
      ['bulk', 'bʌlk', 'n.', '大量；大部分', 'buy in bulk', 2, ['bulky', 'bulkier'], [
        ['Restaurants save money by buying cooking oil in [bulk].', '餐廳大量採購食用油來省錢。'],
        ['The [bulk] of our sales come from repeat customers.', '我們大部分的營業額來自回頭客。'],
      ]],
      ['shelf', 'ʃɛlf', 'n.', '架子', 'top shelf', 1, ['shelve', 'shelved'], [
        ['A clerk is putting cans on the bottom [shelf].', '店員正把罐頭放到最下層的架子上。'],
        ['Please put the files back on the [shelf] when you are done.', '用完後請把檔案放回架子上。'],
      ]],
      ['label', 'ˋlebl̩', 'n.', '標籤', 'product label', 1, ['labeled', 'labeling'], [
        ['Each box has a [label] with the product code.', '每個箱子上都有一張印著產品代碼的標籤。'],
        ['Please put a [label] on every file folder.', '請在每個資料夾上貼標籤。'],
      ]],
      ['catering', 'ˋketərɪŋ', 'n.', '外燴', 'catering service', 2, ['cater', 'caterer'], [
        ['The hotel provides [catering] for weddings and parties.', '這家飯店提供婚宴和派對的外燴服務。'],
        ['The price includes [catering] and decorations.', '這個價格包含外燴和場地布置。'],
      ]],
      ['back order', 'ˋbæk ˋɔrdɚ', 'n.', '延後交貨的訂單', 'on back order', 3, [], [
        ['The printer you ordered is on [back order] until next month.', '您訂購的印表機缺貨，要到下個月才能出貨。'],
        ['We will ship the [back order] as soon as new stock arrives.', '新貨一到，我們就會寄出延後交貨的訂單。'],
      ]],
    ],
  },
  {
    id: 'factory', track: 'toeic', name: '製造與品管', icon: '🏭', words: [
      ['assembly line', 'əˋsɛmblɪ ˏlaɪn', 'n.', '組裝線', 'work on an assembly line', 2, [], [
        ['Workers are standing along the [assembly line].', '工人們沿著組裝線站著。'],
        ['The new [assembly line] can produce 200 cars a day.', '新的組裝線每天可以生產 200 輛車。'],
      ]],
      ['quality control', 'ˋkwɑlətɪ kənˋtrol', 'n.', '品質管理', 'quality control inspector', 2, [], [
        ['Every product goes through [quality control] before shipping.', '每件產品出貨前都要經過品管。'],
        ['She was promoted to head of [quality control] last year.', '她去年升為品管部主管。'],
      ]],
      ['batch', 'bætʃ', 'n.', '一批', 'a batch of products', 2, ['batches', 'batched'], [
        ['We test every [batch] before it leaves the factory.', '每一批貨離開工廠前我們都會檢測。'],
        ['This [batch] of cookies came out of the oven too early.', '這批餅乾太早出爐了。'],
      ]],
      ['output', 'ˋaʊtˏpʊt', 'n.', '產量', 'increase output', 2, ['outcome', 'outlet'], [
        ['Our factory increased its [output] by 15 percent this year.', '我們工廠今年產量增加了 15%。'],
        ['Daily [output] has doubled since the new machines arrived.', '新機器到了以後，每日產量翻了一倍。'],
      ]],
      ['raw material', 'rɔ məˋtɪrɪəl', 'n.', '原料', 'raw material costs', 2, [], [
        ['The price of every [raw material] we use has gone up.', '我們使用的每一種原料都漲價了。'],
        ['Cotton is the main [raw material] for this factory.', '棉花是這間工廠的主要原料。'],
      ]],
      ['machinery', 'məˋʃinərɪ', 'n.', '機器（總稱）', 'heavy machinery', 2, ['machine', 'machinist'], [
        ['The factory bought new [machinery] last year.', '這間工廠去年買了新機器。'],
        ['Heavy [machinery] must be operated by trained staff.', '重型機械必須由受過訓練的人員操作。'],
      ]],
      ['automation', 'ˏɔtəˋmeʃən', 'n.', '自動化', 'factory automation', 3, ['automate', 'automatic'], [
        ['[Automation] has reduced our labor costs.', '自動化降低了我們的人力成本。'],
        ['The plant invested heavily in [automation] last year.', '這座工廠去年大舉投資自動化。'],
      ]],
      ['forklift', 'ˋfɔrkˏlɪft', 'n.', '堆高機', 'drive a forklift', 2, [], [
        ['A man is driving a [forklift] in the warehouse.', '一名男子正在倉庫裡開堆高機。'],
        ['Only certified staff may operate the [forklift].', '只有持證人員可以操作堆高機。'],
      ]],
      ['conveyor belt', 'kənˋveɚ ˏbɛlt', 'n.', '輸送帶', 'on a conveyor belt', 2, [], [
        ['Boxes are moving along a [conveyor belt].', '箱子正沿著輸送帶移動。'],
        ['The [conveyor belt] stopped because of a power failure.', '輸送帶因為停電而停了。'],
      ]],
      ['defective', 'dɪˋfɛktɪv', 'adj.', '有瑕疵的', 'defective products', 2, ['defect', 'defectively'], [
        ['Return any [defective] items within 30 days.', '有瑕疵的商品請於 30 天內退回。'],
        ['The machine was [defective], so we sent it back.', '這台機器有瑕疵，所以我們退回去了。'],
      ]],
      ['inspection', 'ɪnˋspɛkʃən', 'n.', '檢查', 'safety inspection', 2, ['inspect', 'inspected'], [
        ['All products undergo an [inspection] before shipping.', '所有產品出貨前都要經過檢查。'],
        ['The [inspection] took three hours to complete.', '這次檢查花了三個小時才完成。'],
      ]],
      ['tolerance', 'ˋtɑlərəns', 'n.', '容許誤差；容忍', 'zero tolerance', 3, ['tolerate', 'tolerant'], [
        ['The parts must be made within a [tolerance] of 0.1 mm.', '零件的誤差必須控制在 0.1 公釐以內。'],
        ['Our manager has zero [tolerance] for safety violations.', '我們經理對違反安全規定零容忍。'],
      ]],
      ['precision', 'prɪˋsɪʒən', 'n.', '精準', 'with great precision', 3, ['precise', 'precisely'], [
        ['This machine cuts metal with great [precision].', '這台機器切割金屬非常精準。'],
        ['The job requires [precision] and patience.', '這份工作需要精準和耐心。'],
      ]],
      ['durable', 'ˋdjʊrəbl̩', 'adj.', '耐用的', 'durable materials', 2, ['durability', 'durably'], [
        ['These work boots are very [durable].', '這雙工作靴非常耐用。'],
        ['We need a [durable] material for the outdoor furniture.', '戶外家具需要用耐用的材料。'],
      ]],
      ['production', 'prəˋdʌkʃən', 'n.', '生產', 'mass production', 1, ['productive', 'productively'], [
        ['[Production] of the new model will start in March.', '新車款將在三月開始生產。'],
        ['The factory increased [production] to meet demand.', '工廠增加產量以因應需求。'],
      ]],
      ['manufacturer', 'ˏmænjəˋfæktʃərɚ', 'n.', '製造商', 'car manufacturer', 2, ['manufacture', 'manufacturing'], [
        ['The [manufacturer] offers a two-year warranty.', '製造商提供兩年保固。'],
        ['Contact the [manufacturer] if the product breaks.', '產品壞了的話請聯絡製造商。'],
      ]],
      ['operator', 'ˋɑpəˏretɚ', 'n.', '操作員', 'machine operator', 2, ['operate', 'operation'], [
        ['The machine [operator] is wearing safety glasses.', '機器操作員戴著護目鏡。'],
        ['Only a trained [operator] may use this crane.', '只有受過訓練的操作員才能使用這台吊車。'],
      ]],
      ['pallet', 'ˋpælɪt', 'n.', '棧板', 'load a pallet', 3, [], [
        ['Workers are stacking boxes on a wooden [pallet].', '工人正把箱子堆到木棧板上。'],
        ['Each [pallet] can hold up to one ton of goods.', '每個棧板最多可以承載一噸貨物。'],
      ]],
      ['lead time', 'ˋlid ˏtaɪm', 'n.', '前置時間；交貨期', 'reduce lead time', 3, [], [
        ['The [lead time] for custom orders is six weeks.', '客製訂單的交貨期是六週。'],
        ['A local supplier would shorten our [lead time].', '找本地供應商可以縮短我們的前置時間。'],
      ]],
      ['downtime', 'ˋdaʊnˏtaɪm', 'n.', '停機時間', 'reduce downtime', 3, [], [
        ['Regular maintenance helps reduce machine [downtime].', '定期保養有助於減少機器停機時間。'],
        ['The power outage caused two hours of [downtime].', '停電造成兩小時的停機。'],
      ]],
      ['yield', 'jild', 'n.', '產量；收益', 'a high yield', 3, ['yielding', 'yielded'], [
        ['The new process has a higher [yield] than the old one.', '新製程的產量比舊的高。'],
        ['The [yield] from this machine is about 500 units an hour.', '這台機器每小時的產量大約是 500 個。'],
      ]],
      ['component', 'kəmˋponənt', 'n.', '零件；組成部分', 'electronic component', 2, ['compose', 'composed'], [
        ['Each [component] is tested separately.', '每個零件都會分別測試。'],
        ['The battery is the most expensive [component] of the phone.', '電池是手機裡最貴的零件。'],
      ]],
      ['logistics', 'loˋdʒɪstɪks', 'n.', '物流', 'logistics company', 3, ['logistic', 'logistically'], [
        ['She is in charge of [logistics] for the trade fair.', '她負責這次商展的物流。'],
        ['Good [logistics] can cut delivery times in half.', '良好的物流可以把配送時間減半。'],
      ]],
      ['safety gear', 'ˋseftɪ ˏgɪr', 'n.', '安全裝備', 'wear safety gear', 2, [], [
        ['All visitors must wear [safety gear] on the factory floor.', '所有訪客在廠區都必須穿戴安全裝備。'],
        ['A worker is putting on his [safety gear] before his shift.', '一名工人正在上班前穿上安全裝備。'],
      ]],
      ['recall', 'ˋriˏkɔl', 'n.', '召回（產品）', 'product recall', 3, ['recalled', 'recalls'], [
        ['The company issued a [recall] of 10,000 cars.', '這家公司召回了一萬輛車。'],
        ['This [recall] affects all models made in 2025.', '這次召回影響 2025 年生產的所有車款。'],
      ]],
    ],
  },
  {
    id: 'transport', track: 'toeic', name: '交通與車輛', icon: '🚦', words: [
      ['traffic jam', 'ˋtræfɪk ˏdʒæm', 'n.', '塞車', 'stuck in a traffic jam', 1, [], [
        ['I was stuck in a [traffic jam] for an hour this morning.', '我今天早上塞車塞了一個小時。'],
        ['An accident on the bridge caused a long [traffic jam].', '橋上的車禍造成大塞車。'],
      ]],
      ['detour', 'ˋditʊr', 'n.', '繞道', 'take a detour', 2, ['detoured', 'detouring'], [
        ['We had to take a [detour] because of the accident.', '因為車禍我們只好繞路。'],
        ['A [detour] is in place while the bridge is repaired.', '橋梁維修期間設有改道路線。'],
      ]],
      ['toll', 'tol', 'n.', '過路費', 'pay a toll', 2, ['tolls', 'tolled'], [
        ['You have to pay a [toll] to cross the bridge.', '過這座橋要付過路費。'],
        ['The highway [toll] is collected electronically.', '高速公路通行費是電子收費。'],
      ]],
      ['commuter', 'kəˋmjutɚ', 'n.', '通勤者', 'commuter train', 2, ['commute', 'commuting'], [
        ['A typical [commuter] spends an hour on the train each day.', '一般通勤族每天要在火車上待一個小時。'],
        ['The [commuter] is reading the news on her phone.', '這位通勤族正在用手機看新聞。'],
      ]],
      ['intersection', 'ˏɪntɚˋsɛkʃən', 'n.', '十字路口', 'busy intersection', 2, ['intersect', 'intersecting'], [
        ['Turn left at the next [intersection].', '在下一個路口左轉。'],
        ['The accident happened at a busy [intersection].', '車禍發生在一個繁忙的路口。'],
      ]],
      ['pedestrian', 'pəˋdɛstrɪən', 'n.', '行人', 'pedestrian crossing', 2, ['pedestrians', 'pedal'], [
        ['A [pedestrian] is crossing the street with an umbrella.', '一名行人正撐著傘過馬路。'],
        ['Drivers must stop when a [pedestrian] is in the crosswalk.', '有行人在斑馬線上時，駕駛必須停車。'],
      ]],
      ['crosswalk', 'ˋkrɔsˏwɔk', 'n.', '行人穿越道', 'use the crosswalk', 1, [], [
        ['People are waiting at the [crosswalk] for the light to change.', '人們在斑馬線前等紅綠燈。'],
        ['Please use the [crosswalk] when crossing the road.', '過馬路時請走斑馬線。'],
      ]],
      ['parking garage', 'ˋpɑrkɪŋ gəˋrɑʒ', 'n.', '停車場（室內）', 'underground parking garage', 1, [], [
        ['Visitors can park in the [parking garage] under the building.', '訪客可以把車停在大樓地下的停車場。'],
        ['The [parking garage] closes at midnight.', '這座停車場午夜關閉。'],
      ]],
      ['rush hour', 'ˋrʌʃ ˏaʊr', 'n.', '尖峰時間', 'during rush hour', 1, [], [
        ['The trains are very crowded during [rush hour].', '尖峰時間火車非常擁擠。'],
        ['Leave before [rush hour] if you want to get there on time.', '想準時到的話就在尖峰時間前出發。'],
      ]],
      ['carpool', 'ˋkɑrˏpul', 'v.', '共乘', 'carpool to work', 2, ['carpooled', 'carpooling'], [
        ['Several employees decided to [carpool] to save on gas.', '幾位員工決定共乘來省油錢。'],
        ["Let's [carpool] to the conference tomorrow.", '我們明天一起共乘去研討會吧。'],
      ]],
      ['fuel', 'ˋfjuəl', 'n.', '燃料', 'fuel costs', 2, ['fueled', 'refuel'], [
        ['[Fuel] prices rose again this month.', '這個月油價又漲了。'],
        ['The truck ran out of [fuel] on the highway.', '卡車在高速公路上沒油了。'],
      ]],
      ['roadwork', 'ˋrodˏwɝk', 'n.', '道路施工', 'roadwork ahead', 2, [], [
        ['[Roadwork] on Route 9 will cause delays all week.', '9 號公路的道路施工整週都會造成延誤。'],
        ['Workers are doing [roadwork] near the train station.', '工人正在火車站附近進行道路施工。'],
      ]],
      ['mechanic', 'məˋkænɪk', 'n.', '技師；修車師傅', 'auto mechanic', 2, ['mechanical', 'mechanism'], [
        ['The [mechanic] fixed my brakes in an hour.', '修車師傅一小時就修好了我的煞車。'],
        ['Take your car to a [mechanic] before the long trip.', '長途旅行前把車送去給技師檢查。'],
      ]],
      ['tire', 'taɪr', 'n.', '輪胎', 'flat tire', 1, ['tired', 'tiring'], [
        ['A man is changing a flat [tire] on the side of the road.', '一名男子正在路邊換爆掉的輪胎。'],
        ['Check the [tire] pressure before a long drive.', '長途開車前要檢查胎壓。'],
      ]],
      ['license plate', 'ˋlaɪsn̩s ˏplet', 'n.', '車牌', 'license plate number', 1, [], [
        ['Please write down your [license plate] number at the front desk.', '請在櫃台登記您的車牌號碼。'],
        ['The camera recorded the [license plate] of every car.', '攝影機記錄了每輛車的車牌。'],
      ]],
      ["driver's license", 'ˋdraɪvɚz ˋlaɪsn̩s', 'n.', '駕照', "renew a driver's license", 1, [], [
        ["You need a valid [driver's license] to rent a car.", '租車需要有效的駕照。'],
        ["He renewed his [driver's license] online.", '他在網路上換發了駕照。'],
      ]],
      ['speed limit', 'ˋspid ˋlɪmɪt', 'n.', '速限', 'exceed the speed limit', 1, [], [
        ['The [speed limit] near the school is 30 km per hour.', '學校附近的速限是時速 30 公里。'],
        ['He got a ticket for going over the [speed limit].', '他因為超速被開罰單。'],
      ]],
      ['highway', 'ˋhaɪˏwe', 'n.', '高速公路', 'take the highway', 1, [], [
        ['Take the [highway] if you want to get there faster.', '想快點到的話就走高速公路。'],
        ['Two lanes of the [highway] are closed for repairs.', '高速公路有兩個車道因維修封閉。'],
      ]],
      ['ferry', 'ˋfɛrɪ', 'n.', '渡輪', 'take the ferry', 1, [], [
        ['Passengers are getting off the [ferry].', '乘客正在下渡輪。'],
        ['The [ferry] to the island leaves every two hours.', '前往島上的渡輪每兩小時一班。'],
      ]],
      ['subway', 'ˋsʌbˏwe', 'n.', '地鐵', 'take the subway', 1, [], [
        ['I take the [subway] to work every day.', '我每天搭地鐵上班。'],
        ['The [subway] station is a five-minute walk from our office.', '地鐵站離我們辦公室走路五分鐘。'],
      ]],
      ['terminal', 'ˋtɝmənl̩', 'n.', '航廈；終點站', 'bus terminal', 2, ['terminate', 'termination'], [
        ['The bus [terminal] is next to the train station.', '公車總站在火車站旁邊。'],
        ['Please arrive at the [terminal] two hours before your flight.', '請在班機起飛前兩小時抵達航廈。'],
      ]],
      ['timetable', 'ˋtaɪmˏtebl̩', 'n.', '時刻表', 'train timetable', 1, [], [
        ['Check the [timetable] before you go to the station.', '去車站前先查一下時刻表。'],
        ['The new [timetable] takes effect on July 1.', '新的時刻表七月一日起生效。'],
      ]],
      ['route', 'rut', 'n.', '路線', 'bus route', 1, ['routine', 'routed'], [
        ['Which bus [route] goes to the airport?', '哪一條公車路線會到機場？'],
        ['The driver took a shorter [route] to avoid traffic.', '司機走了一條比較短的路線來避開車潮。'],
      ]],
      ['transit', 'ˋtrænsɪt', 'n.', '大眾運輸；轉運', 'public transit', 2, ['transition', 'transmit'], [
        ['Many workers use public [transit] to get downtown.', '很多上班族搭大眾運輸進市區。'],
        ['A monthly [transit] pass costs $60.', '大眾運輸月票要 60 美元。'],
      ]],
      ['parking meter', 'ˋpɑrkɪŋ ˋmitɚ', 'n.', '停車收費表', 'feed the parking meter', 2, [], [
        ['A woman is putting coins into the [parking meter].', '一名女子正在把硬幣投進停車收費表。'],
        ['The [parking meter] accepts credit cards.', '這個停車收費表可以刷信用卡。'],
      ]],
    ],
  },
  {
    id: 'research', track: 'toeic', name: '研發與科學', icon: '🔬', words: [
      ['laboratory', 'ˋlæbrəˏtorɪ', 'n.', '實驗室', 'research laboratory', 2, ['laboratories', 'labor'], [
        ['The samples were sent to an outside [laboratory] for testing.', '樣本被送到外部實驗室檢驗。'],
        ['Our new [laboratory] is equipped with the latest microscopes.', '我們的新實驗室配備了最新的顯微鏡。'],
      ]],
      ['experiment', 'ɪkˋspɛrəmənt', 'n.', '實驗', 'conduct an experiment', 1, ['experimental', 'experimentally'], [
        ['The team will run another [experiment] next week.', '團隊下週會再做一次實驗。'],
        ['The [experiment] showed that the new coating lasts longer.', '實驗顯示新的塗層比較耐用。'],
      ]],
      ['researcher', 'rɪˋsɝtʃɚ', 'n.', '研究人員', 'a senior researcher', 2, ['research', 'researched'], [
        ['A [researcher] from the university presented the results.', '一位大學的研究人員發表了結果。'],
        ['Each [researcher] must wear safety glasses in the lab.', '每位研究人員在實驗室裡都必須戴護目鏡。'],
      ]],
      ['patent', 'ˋpætn̩t', 'n.', '專利', 'apply for a patent', 3, ['patented', 'patentable'], [
        ['The company applied for a [patent] on its new battery design.', '公司為新的電池設計申請了專利。'],
        ['Our [patent] on this technology expires in 2030.', '我們這項技術的專利在 2030 年到期。'],
      ]],
      ['breakthrough', 'ˋbrekˏθru', 'n.', '突破', 'a major breakthrough', 3, ['broken', 'breaking'], [
        ['The scientists made a major [breakthrough] in cancer research.', '科學家在癌症研究上有了重大突破。'],
        ['This new material is a real [breakthrough] for the solar industry.', '這種新材料對太陽能產業來說是真正的突破。'],
      ]],
      ['analyze', 'ˋænl̩ˏaɪz', 'v.', '分析', 'analyze data', 2, ['analysis', 'analytical', 'analyst'], [
        ['We need to [analyze] the survey results before the meeting.', '我們需要在開會前分析問卷結果。'],
        ['This software can [analyze] thousands of images per hour.', '這套軟體每小時可以分析上千張影像。'],
      ]],
      ['analysis', 'əˋnæləsɪs', 'n.', '分析', 'a detailed analysis', 2, ['analyze', 'analytical', 'analyzed'], [
        ['According to our [analysis], sales will rise next quarter.', '根據我們的分析，下一季的銷售會成長。'],
        ['The report includes a detailed [analysis] of customer feedback.', '報告包含對顧客意見的詳細分析。'],
      ]],
      ['finding', 'ˋfaɪndɪŋ', 'n.', '研究結果；發現', 'a key finding', 2, ['found', 'founded'], [
        ['The most surprising [finding] was that older users preferred the app.', '最令人意外的發現是年長的使用者比較喜歡這個 App。'],
        ['Each [finding] will be checked by a second team.', '每一項研究結果都會由第二個團隊檢查。'],
      ]],
      ['hypothesis', 'haɪˋpɑθəsɪs', 'n.', '假設', 'test a hypothesis', 3, ['hypothetical', 'hypothesize'], [
        ['The data supported our [hypothesis].', '數據支持我們的假設。'],
        ['Their [hypothesis] was proven wrong by later tests.', '他們的假設被後來的測試證明是錯的。'],
      ]],
      ['theory', 'ˋθiərɪ', 'n.', '理論', 'in theory', 2, ['theoretical', 'theoretically'], [
        ['In [theory], the new system should save us time.', '理論上，新系統應該能幫我們節省時間。'],
        ['The [theory] has not been tested in real stores yet.', '這個理論還沒有在實體店面測試過。'],
      ]],
      ['evidence', 'ˋɛvədəns', 'n.', '證據', 'strong evidence', 2, ['evident', 'evidently'], [
        ['There is no [evidence] that the product is unsafe.', '沒有證據顯示這項產品不安全。'],
        ['Please keep your receipts as [evidence] of your expenses.', '請保留收據作為支出的證明。'],
      ]],
      ['conduct', 'kənˋdʌkt', 'v.', '進行；實施', 'conduct a survey', 2, ['conducted', 'conductor', 'conductive'], [
        ['We will [conduct] a survey of 500 customers.', '我們將對 500 位顧客進行問卷調查。'],
        ['The lab plans to [conduct] further tests next month.', '實驗室計畫下個月進行更多測試。'],
      ]],
      ['observe', 'əbˋzɝv', 'v.', '觀察；遵守', 'observe the rules', 2, ['observation', 'observant', 'observed'], [
        ['Visitors must [observe] all safety rules in the lab.', '訪客在實驗室裡必須遵守所有安全規定。'],
        ['The scientists will [observe] the plants for six months.', '科學家會觀察這些植物六個月。'],
      ]],
      ['measure', 'ˋmɛʒɚ', 'n./v.', '測量；措施', 'safety measures', 2, ['measurement', 'measurable'], [
        ['Please [measure] the samples carefully before mixing them.', '混合之前請仔細測量樣本。'],
        ['This device can [measure] temperature to within 0.1 degrees.', '這個裝置測量溫度可以精確到 0.1 度以內。'],
      ]],
      ['pilot', 'ˋpaɪlət', 'adj./n.', '試行的；試驗', 'a pilot program', 3, [], [
        ['The [pilot] program will run in three stores before the national launch.', '試行計畫會先在三家店實施，再推向全國。'],
        ['The results of the [pilot] study were very encouraging.', '試驗研究的結果非常鼓舞人心。'],
      ]],
      ['feasible', 'ˋfizəbl̩', 'adj.', '可行的', 'technically feasible', 3, ['feasibility', 'feasibly'], [
        ['Is it [feasible] to finish the project by June?', '在六月前完成這個專案可行嗎？'],
        ['The engineers said the plan is technically [feasible].', '工程師說這個計畫在技術上是可行的。'],
      ]],
      ['simulation', 'ˏsɪmjəˋleʃən', 'n.', '模擬', 'a computer simulation', 3, ['simulate', 'simulated'], [
        ['The training uses a computer [simulation] of the factory floor.', '訓練使用工廠現場的電腦模擬。'],
        ['The [simulation] showed how the bridge would react to strong winds.', '模擬顯示了橋在強風中會有什麼反應。'],
      ]],
      ['peer review', 'pɪr rɪˋvju', 'n.', '同儕審查', 'pass peer review', 3, [], [
        ['The article passed [peer review] and will be published next month.', '這篇文章通過了同儕審查，下個月會刊出。'],
        ['All papers go through [peer review] before publication.', '所有論文在刊登前都要經過同儕審查。'],
      ]],
      ['grant', 'grænt', 'n./v.', '補助金；授予', 'receive a grant', 3, ['granted', 'granting'], [
        ['The lab received a government [grant] to study clean energy.', '實驗室獲得政府補助來研究乾淨能源。'],
        ['The city will [grant] permission for the new building next month.', '市政府下個月會核准新大樓的許可。'],
      ]],
      ['funding', 'ˋfʌndɪŋ', 'n.', '資金；資助', 'secure funding', 2, ['funded', 'fundamental'], [
        ['We are looking for [funding] to expand the research.', '我們正在尋找資金來擴大研究。'],
        ['Government [funding] for the program was cut by 20 percent.', '政府對這個計畫的資助被刪減了 20%。'],
      ]],
      ['engineer', 'ˏɛndʒəˋnɪr', 'n.', '工程師', 'a software engineer', 1, ['engineering', 'engineered'], [
        ['An [engineer] will inspect the machine tomorrow morning.', '明天早上會有工程師來檢查機器。'],
        ['She works as a software [engineer] at a tech company.', '她在一家科技公司擔任軟體工程師。'],
      ]],
      ['discovery', 'dɪˋskʌvərɪ', 'n.', '發現', 'make a discovery', 2, ['discover', 'discovered'], [
        ['The [discovery] of a new material could cut production costs.', '新材料的發現可能降低生產成本。'],
        ['Their [discovery] was published in a leading journal.', '他們的發現刊登在一本頂尖期刊上。'],
      ]],
      ['data', 'ˋdetə', 'n.', '資料；數據', 'collect data', 1, ['date', 'dated'], [
        ['We collected [data] from over 2,000 customers.', '我們蒐集了超過 2,000 位顧客的資料。'],
        ['The [data] shows a clear increase in online sales.', '數據顯示網路銷售明顯增加。'],
      ]],
      ['variable', 'ˋvɛrɪəbl̩', 'n./adj.', '變數；可變的', 'a key variable', 3, ['vary', 'various'], [
        ['Weather is an important [variable] in crop yields.', '天氣是影響農作物產量的重要變數。'],
        ['This loan has a [variable] interest rate.', '這筆貸款是浮動利率。'],
      ]],
      ['methodology', 'ˏmɛθəˋdɑlədʒɪ', 'n.', '研究方法', 'research methodology', 3, ['methodical', 'methodically'], [
        ['The report explains the [methodology] used in the survey.', '報告說明了這次調查使用的研究方法。'],
        ["Reviewers questioned the study's [methodology].", '審查者對這項研究的方法提出質疑。'],
      ]],
    ],
  },
  {
    id: 'commercialre', track: 'toeic', name: '商用不動產', icon: '🏬', words: [
      ['commercial property', 'kəˋmɝʃəl ˋprɑpɚtɪ', 'n.', '商用不動產', 'invest in commercial property', 3, [], [
        ['Investing in [commercial property] can provide steady rental income.', '投資商用不動產可以帶來穩定的租金收入。'],
        ['The firm manages [commercial property] in three cities.', '這家公司在三個城市管理商用不動產。'],
      ]],
      ['occupancy', 'ˋɑkjəpənsɪ', 'n.', '使用率；入住', 'occupancy rate', 3, ['occupy', 'occupied', 'occupant'], [
        ['[Occupancy] in the new tower has reached 95 percent.', '新大樓的使用率已經達到 95%。'],
        ['Hotel [occupancy] is highest during the summer holidays.', '飯店住房率在暑假期間最高。'],
      ]],
      ['zoning', 'ˋzonɪŋ', 'n.', '分區規劃', 'zoning laws', 3, ['zoned', 'zones'], [
        ['[Zoning] laws do not allow factories in this neighborhood.', '分區法規不允許在這個社區設工廠。'],
        ['The site needs a [zoning] change before construction can begin.', '這塊地需要變更分區才能開始施工。'],
      ]],
      ['appraisal', 'əˋprezl̩', 'n.', '估價；評估', 'a property appraisal', 3, ['appraise', 'appraised'], [
        ['The bank requires an [appraisal] before approving the loan.', '銀行核准貸款前要求先估價。'],
        ['The [appraisal] valued the building at $3 million.', '估價結果認定這棟大樓價值 300 萬美元。'],
      ]],
      ['listing', 'ˋlɪstɪŋ', 'n.', '（房屋）刊登物件', 'a new listing', 2, ['listed', 'lists'], [
        ['The new [listing] includes photos of every office.', '新刊登的物件附有每間辦公室的照片。'],
        ['This [listing] has been on the website for two months.', '這個物件已經在網站上刊登兩個月了。'],
      ]],
      ['down payment', 'daʊn ˋpemənt', 'n.', '頭期款', 'make a down payment', 2, [], [
        ['We need a 20 percent [down payment] to buy the building.', '我們需要兩成的頭期款才能買下這棟大樓。'],
        ['They are saving for a [down payment] on a small shop.', '他們正在存錢準備買一間小店面的頭期款。'],
      ]],
      ['square meter', 'skwɛr ˋmitɚ', 'n.', '平方公尺', 'per square meter', 1, [], [
        ['The office rents for $400 per [square meter] per year.', '這間辦公室的租金是每年每平方公尺 400 美元。'],
        ['Each [square meter] of land here costs more than a car.', '這裡每平方公尺的土地比一輛車還貴。'],
      ]],
      ['floor space', 'flor spes', 'n.', '樓地板面積', 'total floor space', 2, [], [
        ['The warehouse has 5,000 square meters of [floor space].', '這座倉庫有 5,000 平方公尺的樓地板面積。'],
        ['We need more [floor space] for the new production line.', '我們需要更多樓地板面積來放新的生產線。'],
      ]],
      ['property manager', 'ˋprɑpɚtɪ ˋmænɪdʒɚ', 'n.', '物業經理', 'contact the property manager', 2, [], [
        ['Please report any repairs to the [property manager].', '任何維修需求請向物業經理反映。'],
        ['The [property manager] collects rent from all the tenants.', '物業經理向所有租戶收租金。'],
      ]],
      ['real estate agent', 'ˋriəl ɪsˋtet ˋedʒənt', 'n.', '房地產仲介', 'hire a real estate agent', 2, [], [
        ['Our [real estate agent] found us an office near the station.', '我們的房地產仲介幫我們找到車站附近的辦公室。'],
        ['The [real estate agent] showed us five properties in one afternoon.', '房地產仲介一個下午帶我們看了五個物件。'],
      ]],
      ['sublet', 'ˋsʌbˏlɛt', 'v.', '轉租', 'sublet an office', 3, ['sublets', 'subletting'], [
        ["You may not [sublet] the space without the landlord's permission.", '未經房東同意，你不可以轉租這個空間。'],
        ['We plan to [sublet] part of our office to a startup.', '我們打算把部分辦公室轉租給一家新創公司。'],
      ]],
      ['lease agreement', 'lis əˋgrimənt', 'n.', '租賃契約', 'sign a lease agreement', 2, [], [
        ['Please read the [lease agreement] carefully before signing it.', '簽名前請仔細閱讀租賃契約。'],
        ['The [lease agreement] runs for five years.', '這份租賃契約為期五年。'],
      ]],
      ['renewal', 'rɪˋnjuəl', 'n.', '續約；更新', 'lease renewal', 2, ['renew', 'renewable'], [
        ['Our lease is up for [renewal] in March.', '我們的租約三月要續約。'],
        ['Contract [renewal] usually takes about two weeks.', '續約通常需要大約兩週。'],
      ]],
      ['security deposit', 'sɪˋkjʊrətɪ dɪˋpɑzɪt', 'n.', '押金', 'pay a security deposit', 2, [], [
        ["The landlord asked for a [security deposit] of three months' rent.", '房東要求三個月租金的押金。'],
        ['You will get your [security deposit] back when the lease ends.', '租約結束時你會拿回押金。'],
      ]],
      ['utility bill', 'juˋtɪlətɪ bɪl', 'n.', '水電費帳單', 'pay the utility bill', 2, [], [
        ['The tenant is responsible for the monthly [utility bill].', '每月的水電費由租戶負擔。'],
        ['Our [utility bill] went up after we installed new air conditioners.', '裝了新冷氣之後，我們的水電費帳單變高了。'],
      ]],
      ['relocation', 'ˏriloˋkeʃən', 'n.', '搬遷', 'relocation costs', 2, ['relocate', 'relocated'], [
        ['The [relocation] of our head office will take place in June.', '總公司的搬遷將在六月進行。'],
        ['[Relocation] to the new site is expected to take three weeks.', '搬到新地點預計需要三週。'],
      ]],
      ['office space', 'ˋɔfɪs spes', 'n.', '辦公空間', 'rent office space', 1, [], [
        ['We are looking for [office space] in the city center.', '我們正在找市中心的辦公空間。'],
        ['The company rents [office space] on the tenth floor.', '公司租用十樓的辦公空間。'],
      ]],
      ['retail space', 'ˋritel spes', 'n.', '零售店面空間', 'lease retail space', 2, [], [
        ['The ground floor offers [retail space] for shops and cafés.', '一樓提供給商店和咖啡店的零售空間。'],
        ['Demand for [retail space] in the mall is very high.', '購物中心的店面空間需求很高。'],
      ]],
      ['prime location', 'praɪm loˋkeʃən', 'n.', '黃金地段', 'in a prime location', 2, [], [
        ['The hotel is in a [prime location] near the harbor.', '這間飯店位於港口附近的黃金地段。'],
        ['Rent is higher because the shop is in a [prime location].', '因為店面位於黃金地段，所以租金比較高。'],
      ]],
      ['vacancy rate', 'ˋvekənsɪ ret', 'n.', '空置率', 'a low vacancy rate', 3, [], [
        ['The office [vacancy rate] fell to 8 percent this year.', '今年辦公室空置率降到 8%。'],
        ['A high [vacancy rate] means tenants can negotiate lower rent.', '空置率高代表租戶可以談到較低的租金。'],
      ]],
      ['open house', 'ˋopən haʊs', 'n.', '開放參觀（看屋）', 'hold an open house', 2, [], [
        ['The agent will hold an [open house] on Saturday afternoon.', '仲介星期六下午會舉辦開放看屋。'],
        ['More than 50 people came to the [open house].', '超過 50 個人來參加開放看屋。'],
      ]],
      ['broker', 'ˋbrokɚ', 'n.', '仲介；經紀人', 'a real estate broker', 2, ['broke', 'broken'], [
        ['We hired a [broker] to find a new warehouse.', '我們請了一位仲介來找新倉庫。'],
        ['The [broker] charges a fee of 5 percent.', '這位仲介收取 5% 的費用。'],
      ]],
      ['tenancy', 'ˋtɛnənsɪ', 'n.', '租期', 'a fixed-term tenancy', 3, ['tenants', 'tenancies'], [
        ['The [tenancy] lasts for two years.', '租期為兩年。'],
        ['A minimum [tenancy] of 12 months is required.', '最短租期必須是 12 個月。'],
      ]],
      ['move out', 'muv aʊt', 'v.', '搬出', 'move out of the office', 1, [], [
        ['We have to [move out] by the end of the month.', '我們必須在月底前搬出去。'],
        ['Tenants who [move out] early must pay a fee.', '提前搬出的租戶必須支付費用。'],
      ]],
      ['move-in date', 'ˋmuvˏɪn det', 'n.', '入住日期', 'confirm the move-in date', 2, [], [
        ['Our [move-in date] is the first of next month.', '我們的入住日期是下個月一號。'],
        ['Can we change the [move-in date] to a week later?', '我們可以把入住日期延後一週嗎？'],
      ]],
    ],
  },
  {
    id: 'government', track: 'toeic', name: '政府與公共服務', icon: '🏛️', words: [
      ['municipal', 'mjuˋnɪsəpl̩', 'adj.', '市政的', 'municipal government', 3, [], [
        ['The [municipal] government approved plans for a new park.', '市政府核准了新公園的計畫。'],
        ['The library is funded by the [municipal] budget.', '圖書館由市政預算出資。'],
      ]],
      ['council', 'ˋkaʊnsl̩', 'n.', '議會；委員會', 'city council', 2, ['councils', 'counseling'], [
        ['The city [council] has approved the new parking rules.', '市議會已經通過新的停車規定。'],
        ['The [council] meets on the first Monday of every month.', '議會每個月第一個星期一開會。'],
      ]],
      ['mayor', 'ˋmeɚ', 'n.', '市長', 'the mayor of the city', 1, ['mayors', 'mayoral'], [
        ['The [mayor] is expected to attend the opening ceremony.', '市長預計會出席開幕典禮。'],
        ['Our [mayor] has served the city for eight years.', '我們的市長已經為這個城市服務八年了。'],
      ]],
      ['legislation', 'ˏlɛdʒɪsˋleʃən', 'n.', '法規；立法', 'pass legislation', 3, ['legislate', 'legislative'], [
        ['New [legislation] requires companies to report their emissions.', '新法規要求公司申報排放量。'],
        ['The government passed [legislation] to protect consumers.', '政府通過了保護消費者的法規。'],
      ]],
      ['ordinance', 'ˋɔrdnəns', 'n.', '條例', 'a city ordinance', 3, ['ordinary', 'ordinarily'], [
        ['A city [ordinance] bans smoking in public parks.', '一項市條例禁止在公園吸菸。'],
        ['The [ordinance] takes effect on January 1.', '這項條例一月一日生效。'],
      ]],
      ['citizen', 'ˋsɪtəzn̩', 'n.', '公民；市民', 'senior citizen', 1, ['citizenship', 'civic'], [
        ['Every [citizen] has the right to vote.', '每個公民都有投票權。'],
        ['She became an Australian [citizen] last year.', '她去年成為澳洲公民。'],
      ]],
      ['public service', 'ˋpʌblɪk ˋsɝvɪs', 'n.', '公共服務', 'work in public service', 2, [], [
        ['He has worked in [public service] for over twenty years.', '他在公共服務部門工作超過二十年。'],
        ['Free buses are an important [public service] for older residents.', '免費公車對年長居民是重要的公共服務。'],
      ]],
      ['tax return', 'tæks rɪˋtɝn', 'n.', '報稅單', 'file a tax return', 2, [], [
        ['You must file your [tax return] by October 31.', '你必須在十月三十一日前提交報稅單。'],
        ['An accountant helped me fill out my [tax return].', '一位會計師幫我填報稅單。'],
      ]],
      ['census', 'ˋsɛnsəs', 'n.', '人口普查', 'a national census', 3, ['censor', 'censored'], [
        ['The national [census] is held every five years.', '全國人口普查每五年舉行一次。'],
        ['Australia conducts a [census] to count its population.', '澳洲進行人口普查來統計人口。'],
      ]],
      ['election', 'ɪˋlɛkʃən', 'n.', '選舉', 'hold an election', 1, ['elect', 'elected'], [
        ['The [election] will be held in May.', '選舉將在五月舉行。'],
        ["Voters will choose a new mayor in next month's [election].", '選民會在下個月的選舉中選出新市長。'],
      ]],
      ['vote', 'vot', 'v.', '投票', 'vote on a proposal', 1, ['voter', 'voted'], [
        ['Citizens over 18 can [vote] in the election.', '18 歲以上的公民可以在選舉中投票。'],
        ['The board will [vote] on the proposal tomorrow.', '董事會明天會對這項提案投票。'],
      ]],
      ['license', 'ˋlaɪsn̩s', 'n.', '執照；許可證', "driver's license", 1, ['licensed', 'licensing'], [
        ['You need a [license] to sell alcohol in this state.', '在這個州賣酒需要執照。'],
        ["Her driver's [license] expires next month.", '她的駕照下個月到期。'],
      ]],
      ['embassy', 'ˋɛmbəsɪ', 'n.', '大使館', 'contact the embassy', 2, [], [
        ['Contact the [embassy] immediately if you lose your passport.', '如果護照遺失，請立刻聯絡大使館。'],
        ['The [embassy] is closed on public holidays.', '大使館在國定假日不開放。'],
      ]],
      ['consulate', 'ˋkɑnsl̩ɪt', 'n.', '領事館', 'the consulate general', 3, ['consult', 'consulted'], [
        ['You can renew your passport at the [consulate].', '你可以在領事館更換護照。'],
        ['The [consulate] is open from 9 a.m. to 4 p.m.', '領事館開放時間是早上九點到下午四點。'],
      ]],
      ['immigration', 'ˏɪməˋgreʃən', 'n.', '移民；入境審查', 'go through immigration', 2, ['immigrate', 'immigrant'], [
        ['You must go through [immigration] when you arrive at the airport.', '抵達機場時必須通過入境審查。'],
        ['The government plans to reduce [immigration] next year.', '政府計畫明年減少移民人數。'],
      ]],
      ['ministry', 'ˋmɪnɪstrɪ', 'n.', '（政府）部', 'the Ministry of Health', 3, ['ministerial', 'ministries'], [
        ['The [ministry] has released new guidelines for food safety.', '該部會發布了新的食品安全準則。'],
        ['The [ministry] is expected to announce the new tax rates on Monday.', '該部會預計星期一公布新稅率。'],
      ]],
      ['agency', 'ˋedʒənsɪ', 'n.', '機構；代理商', 'a government agency', 2, ['agencies', 'agenda'], [
        ['A government [agency] is investigating the accident.', '一個政府機構正在調查這起事故。'],
        ['We hired a recruitment [agency] to find new staff.', '我們委託一家人力仲介公司找新員工。'],
      ]],
      ['public hearing', 'ˋpʌblɪk ˋhɪrɪŋ', 'n.', '公聽會', 'hold a public hearing', 3, [], [
        ['The city will hold a [public hearing] on the new road.', '市政府會針對新道路舉辦公聽會。'],
        ['Residents spoke at the [public hearing] last night.', '居民在昨晚的公聽會上發言。'],
      ]],
      ['fine', 'faɪn', 'n.', '罰款', 'pay a fine', 1, ['fined', 'finely'], [
        ['I got a [fine] for parking in a loading zone.', '我因為停在卸貨區被罰款。'],
        ['The [fine] for littering is $500.', '亂丟垃圾的罰款是 500 元。'],
      ]],
      ['subsidy', 'ˋsʌbsədɪ', 'n.', '補助金', 'a government subsidy', 3, ['subsidize', 'subsidized'], [
        ['The government offers a [subsidy] for solar panels.', '政府提供太陽能板的補助。'],
        ['The [subsidy] will cover half the cost of training.', '補助金會負擔一半的訓練費用。'],
      ]],
      ['welfare', 'ˋwɛlˏfɛr', 'n.', '福利', 'employee welfare', 2, [], [
        ['The company cares a lot about employee [welfare].', '公司非常重視員工福利。'],
        ['The new law aims to improve the [welfare] of older people.', '新法的目的是改善年長者的福利。'],
      ]],
      ['official', 'əˋfɪʃəl', 'n./adj.', '官員；正式的', 'a government official', 2, ['officially', 'officiate'], [
        ['A government [official] confirmed the news this morning.', '一位政府官員今天早上證實了這個消息。'],
        ['The [official] opening is scheduled for June 1.', '正式開幕訂在六月一日。'],
      ]],
      ['bureaucracy', 'bjʊˋrɑkrəsɪ', 'n.', '官僚體制', 'cut bureaucracy', 3, ['bureaucrat', 'bureaucratic'], [
        ['Too much [bureaucracy] slows down new projects.', '太多官僚程序會拖慢新專案。'],
        ['Cutting [bureaucracy] will help small businesses grow.', '減少官僚程序有助於小型企業成長。'],
      ]],
      ['jurisdiction', 'ˏdʒʊrɪsˋdɪkʃən', 'n.', '管轄權', 'under the jurisdiction of', 3, ['jurisdictional', 'judicial'], [
        ['This case is outside our [jurisdiction].', '這個案件不在我們的管轄範圍內。'],
        ['The city has no [jurisdiction] over federal land.', '市政府對聯邦土地沒有管轄權。'],
      ]],
      ['petition', 'pəˋtɪʃən', 'n.', '請願（書）', 'sign a petition', 3, ['petitioned', 'petitioning'], [
        ['Over 2,000 residents signed a [petition] against the new road.', '超過 2,000 位居民連署反對新道路。'],
        ['The [petition] asks the council to keep the library open.', '這份請願書要求議會讓圖書館繼續開放。'],
      ]],
    ],
  },
  {
    id: 'accounting', track: 'toeic', name: '財報與會計', icon: '📒', words: [
      ['balance sheet', 'ˋbæləns ʃit', 'n.', '資產負債表', 'prepare a balance sheet', 3, [], [
        ['The [balance sheet] shows what the company owns and owes.', '資產負債表顯示公司擁有的資產和負債。'],
        ['Investors studied the [balance sheet] before making a decision.', '投資人在做決定前研究了資產負債表。'],
      ]],
      ['income statement', 'ˋɪnˏkʌm ˋstetmənt', 'n.', '損益表', 'a quarterly income statement', 3, [], [
        ['The [income statement] shows a profit of $2 million.', '損益表顯示獲利 200 萬美元。'],
        ["Please attach last year's [income statement] to the loan application.", '請在貸款申請書附上去年的損益表。'],
      ]],
      ['ledger', 'ˋlɛdʒɚ', 'n.', '分類帳', 'the general ledger', 3, [], [
        ['All transactions are recorded in the general [ledger].', '所有交易都記錄在總分類帳裡。'],
        ['The accountant found an error in the [ledger].', '會計師在分類帳裡發現了一個錯誤。'],
      ]],
      ['payroll', 'ˋpeˏrol', 'n.', '薪資名冊；薪資', 'payroll department', 2, [], [
        ['Please send your timesheet to the [payroll] department by Friday.', '請在星期五前把工時表交給薪資部門。'],
        ['The company has 300 people on its [payroll].', '公司的薪資名冊上有 300 人。'],
      ]],
      ['bookkeeping', 'ˋbʊkˏkipɪŋ', 'n.', '記帳', 'bookkeeping software', 2, ['bookkeeper', 'booked'], [
        ['Good [bookkeeping] makes tax time much easier.', '好好記帳會讓報稅輕鬆很多。'],
        ['I took a course in [bookkeeping] last year.', '我去年上了一門記帳課。'],
      ]],
      ['depreciation', 'dɪˏpriʃɪˋeʃən', 'n.', '折舊', 'annual depreciation', 3, ['depreciate', 'depreciated'], [
        ['[Depreciation] reduces the value of the equipment each year.', '折舊每年都會降低設備的價值。'],
        ['The annual [depreciation] on the trucks is $8,000.', '這些卡車每年的折舊是 8,000 美元。'],
      ]],
      ['expenditure', 'ɪkˋspɛndɪtʃɚ', 'n.', '支出', 'capital expenditure', 3, ['expend', 'expendable'], [
        ['Total [expenditure] rose by 12 percent last year.', '去年總支出增加了 12%。'],
        ['We need to reduce [expenditure] on business travel.', '我們需要減少出差的支出。'],
      ]],
      ['net profit', 'nɛt ˋprɑfɪt', 'n.', '淨利', 'a net profit of', 2, [], [
        ['The company reported a [net profit] of $5 million.', '公司公布的淨利為 500 萬美元。'],
        ['Our [net profit] fell because of higher shipping costs.', '我們的淨利因為運費上漲而下滑。'],
      ]],
      ['gross', 'gros', 'adj.', '總的；毛的', 'gross profit', 2, ['grossly', 'grossed'], [
        ['[Gross] sales reached $2 million this quarter.', '本季總銷售額達到 200 萬美元。'],
        ["The company's [gross] income rose last year.", '公司去年的總收入增加了。'],
      ]],
      ['deficit', 'ˋdɛfəsɪt', 'n.', '赤字', 'a budget deficit', 3, ['deficient', 'deficits'], [
        ['The government ran a [deficit] of $5 billion last year.', '政府去年有 50 億美元的赤字。'],
        ['The [deficit] has grown because tax income fell.', '因為稅收減少，赤字擴大了。'],
      ]],
      ['surplus', 'ˋsɝpləs', 'n.', '盈餘；過剩', 'a budget surplus', 3, ['surpass', 'surpassed'], [
        ['The company had a [surplus] of $1 million last year.', '公司去年有 100 萬美元的盈餘。'],
        ['The budget [surplus] will be used to repair roads.', '預算盈餘將用來修路。'],
      ]],
      ['cash flow', 'kæʃ flo', 'n.', '現金流量', 'positive cash flow', 2, [], [
        ['Late payments from clients hurt our [cash flow].', '客戶延遲付款影響了我們的現金流量。'],
        ['Small businesses must manage their [cash flow] carefully.', '小型企業必須謹慎管理現金流量。'],
      ]],
      ['earnings', 'ˋɝnɪŋz', 'n.', '收益；收入', 'quarterly earnings', 2, ['earned', 'earnest'], [
        ["The company's [earnings] rose 8 percent this year.", '公司今年的收益成長了 8%。'],
        ['Quarterly [earnings] will be announced on Friday.', '季度收益將在星期五公布。'],
      ]],
      ['overhead', 'ˋovɚˏhɛd', 'n.', '營運費用', 'reduce overhead', 3, [], [
        ['Moving to a smaller office will reduce our [overhead].', '搬到小一點的辦公室可以減少營運費用。'],
        ['[Overhead] includes rent, utilities and insurance.', '營運費用包括房租、水電和保險。'],
      ]],
      ['tax deduction', 'tæks dɪˋdʌkʃən', 'n.', '稅額扣除', 'claim a tax deduction', 3, [], [
        ['You can claim a [tax deduction] for work-related travel.', '和工作有關的交通費可以申報扣除。'],
        ['Donations to charity may qualify for a [tax deduction].', '捐款給慈善機構可能可以抵稅。'],
      ]],
      ['accounts receivable', 'əˋkaʊnts rɪˋsivəbl̩', 'n.', '應收帳款', 'manage accounts receivable', 3, [], [
        ['Our [accounts receivable] grew because several clients paid late.', '因為好幾個客戶延遲付款，我們的應收帳款增加了。'],
        ['She works in [accounts receivable] and sends invoices to customers.', '她在應收帳款部門負責寄發票給客戶。'],
      ]],
      ['accounts payable', 'əˋkaʊnts ˋpeəbl̩', 'n.', '應付帳款', 'the accounts payable team', 3, [], [
        ['Please send all supplier invoices to [accounts payable].', '請把所有供應商的發票寄給應付帳款部門。'],
        ['The [accounts payable] team pays our suppliers every two weeks.', '應付帳款小組每兩週付款給供應商一次。'],
      ]],
      ['cost-effective', 'ˏkɔstɪˋfɛktɪv', 'adj.', '划算的', 'a cost-effective solution', 2, [], [
        ['Online ads are more [cost-effective] than TV commercials.', '網路廣告比電視廣告划算。'],
        ['We are looking for a [cost-effective] way to ship our products.', '我們正在找划算的方式來運送產品。'],
      ]],
      ['reconcile', 'ˋrɛkənˏsaɪl', 'v.', '核對（帳目）；調和', 'reconcile the accounts', 3, ['reconciliation', 'reconciled'], [
        ['Please [reconcile] the bank statement with our records.', '請將銀行對帳單和我們的紀錄核對。'],
        ['It took two days to [reconcile] the accounts.', '核對帳目花了兩天。'],
      ]],
      ['write off', 'raɪt ɔf', 'v.', '註銷（壞帳）', 'write off a debt', 3, [], [
        ['The company had to [write off] $50,000 in bad debt.', '公司不得不註銷五萬美元的壞帳。'],
        ['We decided to [write off] the unpaid invoices.', '我們決定把未付款的發票列為壞帳。'],
      ]],
      ['break even', 'brek ˋivən', 'v.', '收支平衡', 'break even within a year', 3, [], [
        ['The new store is expected to [break even] within two years.', '新店預計兩年內達到收支平衡。'],
        ['We need to sell 1,000 units to [break even].', '我們需要賣出 1,000 件才能損益兩平。'],
      ]],
      ['spreadsheet', 'ˋsprɛdˏʃit', 'n.', '試算表', 'update the spreadsheet', 1, ['spreadsheets', 'spreading'], [
        ['I entered all the figures into a [spreadsheet].', '我把所有數字輸入試算表。'],
        ['The [spreadsheet] shows monthly sales by region.', '這份試算表顯示各地區的每月銷售。'],
      ]],
      ['financial statement', 'faɪˋnænʃəl ˋstetmənt', 'n.', '財務報表', 'annual financial statement', 2, [], [
        ['The auditors checked every [financial statement] carefully.', '稽核人員仔細檢查了每一份財務報表。'],
        ['The bank asked for our latest [financial statement].', '銀行要求我們提供最新的財務報表。'],
      ]],
      ['capital', 'ˋkæpətl̩', 'n.', '資本；首都', 'raise capital', 2, ['capitalize', 'capitalized'], [
        ['The startup needs more [capital] to grow.', '這家新創公司需要更多資本才能成長。'],
        ['Canberra is the [capital] of Australia.', '坎培拉是澳洲的首都。'],
      ]],
      ['turnover', 'ˋtɝnˏovɚ', 'n.', '營業額；人員流動率', 'staff turnover', 3, ['turned', 'turning'], [
        ['Annual [turnover] reached $10 million.', '年營業額達到一千萬美元。'],
        ['High staff [turnover] is costly for small businesses.', '員工流動率高對小型企業來說代價很大。'],
      ]],
    ],
  },
  {
    id: 'negotiation', track: 'toeic', name: '談判與商務關係', icon: '🤝', words: [
      ['deal', 'dil', 'n.', '交易；處理', 'close a deal', 1, ['dealt', 'dealer'], [
        ['We finally closed the [deal] with our new supplier.', '我們終於和新供應商談成交易。'],
        ['We need to make a [deal] before the end of the month.', '我們需要在月底前談成交易。'],
      ]],
      ['partnership', 'ˋpɑrtnɚˏʃɪp', 'n.', '合夥關係', 'form a partnership', 2, ['partner', 'partnered'], [
        ['The two firms formed a [partnership] in 2020.', '兩家公司在 2020 年建立了合作關係。'],
        ['The new [partnership] between the two airlines begins in May.', '兩家航空公司的新合作關係五月開始。'],
      ]],
      ['partner', 'ˋpɑrtnɚ', 'n.', '夥伴；合夥人', 'business partner', 1, ['partnership', 'partnered'], [
        ['She became a [partner] at the law firm last year.', '她去年成為律師事務所的合夥人。'],
        ['My [partner] and I started the company in 2019.', '我和合夥人在 2019 年創立了公司。'],
      ]],
      ['collaborate', 'kəˋlæbəˏret', 'v.', '合作', 'collaborate on a project', 2, ['collaboration', 'collaborative'], [
        ['The two teams will [collaborate] on the new design.', '兩個團隊會合作進行新設計。'],
        ['We hope to [collaborate] with local artists.', '我們希望和本地藝術家合作。'],
      ]],
      ['collaboration', 'kəˏlæbəˋreʃən', 'n.', '合作', 'in collaboration with', 2, ['collaborate', 'collaborative'], [
        ['The project was a [collaboration] between three companies.', '這個專案是三家公司的合作成果。'],
        ['Thank you for your [collaboration] on this report.', '謝謝你在這份報告上的合作。'],
      ]],
      ['compromise', 'ˋkɑmprəˏmaɪz', 'n.', '妥協', 'reach a compromise', 2, ['compromising', 'compromised'], [
        ['After hours of talks, both sides reached a [compromise].', '經過數小時的協商，雙方達成了妥協。'],
        ['Neither side was willing to make a [compromise].', '雙方都不願意妥協。'],
      ]],
      ['concession', 'kənˋsɛʃən', 'n.', '讓步', 'make a concession', 3, ['concede', 'conceded'], [
        ['We made one major [concession] on price.', '我們在價格上做了一個重大讓步。'],
        ['The supplier agreed to a small [concession] on delivery dates.', '供應商同意在交貨日期上稍作讓步。'],
      ]],
      ['counteroffer', 'ˋkaʊntɚˏɔfɚ', 'n.', '還價', 'make a counteroffer', 3, [], [
        ['The buyer made a [counteroffer] of $450,000.', '買方還價 45 萬美元。'],
        ["We will discuss their [counteroffer] at tomorrow's meeting.", '我們會在明天的會議上討論他們的還價。'],
      ]],
      ['mutual', 'ˋmjutʃʊəl', 'adj.', '互相的', 'mutual benefit', 2, ['mutually', 'mutuality'], [
        ['The agreement is based on [mutual] trust.', '這份協議建立在互信的基礎上。'],
        ['We met through a [mutual] friend.', '我們是透過共同的朋友認識的。'],
      ]],
      ['long-term', 'ˋlɔŋˏtɝm', 'adj.', '長期的', 'a long-term relationship', 1, [], [
        ['We want to build a [long-term] relationship with our clients.', '我們希望和客戶建立長期的關係。'],
        ['The company signed a [long-term] contract with the supplier.', '公司和供應商簽了長期合約。'],
      ]],
      ['rapport', 'ræˋpor', 'n.', '融洽關係', 'build rapport with', 3, ['report', 'reported'], [
        ["It's important to build [rapport] with new clients.", '和新客戶建立良好關係很重要。'],
        ['She has excellent [rapport] with her team.', '她和團隊的關係非常融洽。'],
      ]],
      ['cooperation', 'koˏɑpəˋreʃən', 'n.', '合作', 'thank you for your cooperation', 2, ['cooperate', 'cooperative'], [
        ['Thank you for your [cooperation].', '謝謝您的配合。'],
        ['Close [cooperation] between departments saved us time.', '部門之間的密切合作替我們省了時間。'],
      ]],
      ['joint venture', 'dʒɔɪnt ˋvɛntʃɚ', 'n.', '合資企業', 'form a joint venture', 3, [], [
        ['The two companies set up a [joint venture] in Vietnam.', '兩家公司在越南成立了合資企業。'],
        ['The [joint venture] will produce electric buses.', '這家合資企業將生產電動公車。'],
      ]],
      ['bid', 'bɪd', 'n.', '投標；出價', 'submit a bid', 2, ['bidder', 'bidding'], [
        ['Our company submitted a [bid] for the contract.', '我們公司為這份合約投了標。'],
        ['The city accepted our [bid] to build the new bridge.', '市政府接受了我們興建新橋的投標。'],
      ]],
      ['tender', 'ˋtɛndɚ', 'n.', '投標', 'submit a tender', 3, ['tenderly', 'tendered'], [
        ['The government invited companies to submit a [tender].', '政府邀請企業提交標書。'],
        ['The [tender] closes on 30 June.', '投標在六月三十日截止。'],
      ]],
      ['quote', 'kwot', 'n.', '報價；引用', 'get a quote', 2, ['quoted', 'quotable'], [
        ['Can you send me a [quote] for 500 units?', '可以給我 500 件的報價嗎？'],
        ['The [quote] includes delivery and installation.', '報價包含運送和安裝。'],
      ]],
      ['offer', 'ˋɔfɚ', 'v.', '提供；出價', 'offer a discount', 1, ['offered', 'offering'], [
        ['We can [offer] you a 10 percent discount.', '我們可以給您九折優惠。'],
        ['The hotel will [offer] free breakfast to all guests.', '飯店會提供所有房客免費早餐。'],
      ]],
      ['persuade', 'pɚˋswed', 'v.', '說服', 'persuade sb to do sth', 2, ['persuasive', 'persuasion'], [
        ['I tried to [persuade] my manager to hire more staff.', '我試著說服經理多聘一些人。'],
        ['We need to [persuade] the client that our plan works.', '我們需要說服客戶我們的計畫可行。'],
      ]],
      ['convince', 'kənˋvɪns', 'v.', '使信服', 'convince sb of sth', 2, ['convincing', 'convinced'], [
        ['It was hard to [convince] the board to approve the budget.', '要說服董事會核准預算很困難。'],
        ['We must [convince] investors that the market is growing.', '我們必須讓投資人相信市場正在成長。'],
      ]],
      ['leverage', 'ˋlɛvərɪdʒ', 'v.', '善用；槓桿', 'leverage strengths', 3, ['leveraged', 'leverages'], [
        ['We can [leverage] our network to find new customers.', '我們可以善用人脈來找新客戶。'],
        ['The company plans to [leverage] its strong brand to enter Asia.', '公司計畫善用強勢品牌進入亞洲市場。'],
      ]],
      ['win-win', 'ˋwɪnˏwɪn', 'adj.', '雙贏的', 'a win-win situation', 2, [], [
        ['The new agreement is a [win-win] deal for both companies.', '新協議對兩家公司來說是雙贏的交易。'],
        ['We are looking for a [win-win] solution.', '我們正在尋找雙贏的解決辦法。'],
      ]],
      ['alliance', 'əˋlaɪəns', 'n.', '聯盟', 'form an alliance', 3, ['allied', 'alliances'], [
        ['The three airlines formed an [alliance] last year.', '這三家航空公司去年組成了聯盟。'],
        ['The [alliance] was announced at a press conference yesterday.', '這個聯盟昨天在記者會上宣布。'],
      ]],
      ['intermediary', 'ˏɪntɚˋmidɪˏɛrɪ', 'n.', '中間人', 'act as an intermediary', 3, ['mediate', 'mediated'], [
        ['The bank acted as an [intermediary] between the buyer and the seller.', '銀行在買賣雙方之間擔任中間人。'],
        ['We hired an [intermediary] to handle the negotiations.', '我們請了一位中間人處理談判。'],
      ]],
      ['liaison', 'liˋeˏzɑn', 'n.', '聯絡人；聯繫', 'act as a liaison', 3, [], [
        ['She serves as the [liaison] between the sales team and the factory.', '她擔任業務團隊和工廠之間的聯絡人。'],
        ['Please contact our [liaison] if you have any questions.', '如果有任何問題，請聯絡我們的聯絡窗口。'],
      ]],
      ['memorandum', 'ˏmɛməˋrændəm', 'n.', '備忘錄', 'memorandum of understanding', 3, ['memorize', 'memorable'], [
        ['Both companies signed a [memorandum] of understanding.', '兩家公司簽署了合作備忘錄。'],
        ['The [memorandum] outlines the main terms of the deal.', '備忘錄列出了這筆交易的主要條件。'],
      ]],
    ],
  },
  {
    id: 'branding', track: 'toeic', name: '品牌與廣告', icon: '📣', words: [
      ['slogan', 'ˋslogən', 'n.', '標語；口號', 'a catchy slogan', 2, [], [
        ['Our new [slogan] is short and easy to remember.', '我們的新標語簡短又好記。'],
        ['The company changed its [slogan] after twenty years.', '這家公司在二十年後換了口號。'],
      ]],
      ['logo', 'ˋlogo', 'n.', '商標', 'company logo', 1, [], [
        ['The [logo] is printed on every box we ship.', '我們出貨的每個箱子都印有商標。'],
        ['A designer created a new [logo] for the brand.', '一位設計師為這個品牌設計了新商標。'],
      ]],
      ['commercial', 'kəˋmɝʃəl', 'n.', '電視廣告；商業的', 'a TV commercial', 2, ['commerce', 'commercially'], [
        ['The company ran a TV [commercial] during the final.', '公司在決賽期間播出電視廣告。'],
        ['Their new [commercial] features a famous singer.', '他們的新廣告找了一位知名歌手。'],
      ]],
      ['billboard', 'ˋbɪlˏbord', 'n.', '廣告看板', 'a billboard ad', 2, [], [
        ['A huge [billboard] beside the highway shows our new phone.', '高速公路旁的巨型看板上是我們的新手機。'],
        ['Renting a [billboard] in the city center is expensive.', '在市中心租廣告看板很貴。'],
      ]],
      ['flyer', 'ˋflaɪɚ', 'n.', '傳單', 'hand out flyers', 1, [], [
        ['We put a [flyer] in every mailbox on the street.', '我們在這條街的每個信箱都放了一張傳單。'],
        ['The [flyer] lists all the special offers for this week.', '這張傳單列出本週所有的優惠。'],
      ]],
      ['banner', 'ˋbænɚ', 'n.', '橫幅廣告', 'a banner ad', 2, [], [
        ['A [banner] at the entrance welcomes visitors to the fair.', '入口處的橫幅歡迎訪客參加展覽。'],
        ['Click the [banner] at the top of the page to see the sale.', '點選頁面上方的橫幅廣告就能看到特價活動。'],
      ]],
      ['influencer', 'ˋɪnflʊənsɚ', 'n.', '網紅', 'a social media influencer', 2, ['influence', 'influential'], [
        ['The brand paid an [influencer] to promote its new drink.', '這個品牌付錢請網紅宣傳新飲料。'],
        ['A popular [influencer] posted a review of our product.', '一位人氣網紅發布了我們產品的評論。'],
      ]],
      ['viral', 'ˋvaɪrəl', 'adj.', '爆紅的', 'go viral', 2, ['virus', 'virally'], [
        ['The video went [viral] overnight.', '這支影片一夜之間爆紅。'],
        ['Their [viral] ad has been viewed 10 million times.', '他們那支爆紅的廣告已經有一千萬次觀看。'],
      ]],
      ['target audience', 'ˋtɑrgɪt ˋɔdɪəns', 'n.', '目標客群', 'reach the target audience', 2, [], [
        ['Our [target audience] is young professionals in big cities.', '我們的目標客群是大城市的年輕上班族。'],
        ['The ad failed to reach its [target audience].', '這支廣告沒能觸及目標客群。'],
      ]],
      ['market share', 'ˋmɑrkɪt ʃɛr', 'n.', '市占率', 'increase market share', 2, [], [
        ['The company increased its [market share] to 30 percent.', '公司把市占率提高到 30%。'],
        ['We lost [market share] to cheaper competitors.', '我們的市占率被較便宜的競爭對手搶走了。'],
      ]],
      ['niche', 'nɪtʃ', 'n.', '利基市場', 'a niche market', 3, [], [
        ['The company found a [niche] in eco-friendly pet products.', '這家公司在環保寵物用品找到了利基市場。'],
        ['Small brands often succeed by focusing on a [niche].', '小品牌常常靠專注於利基市場而成功。'],
      ]],
      ['demographic', 'ˏdɛməˋgræfɪk', 'n.', '人口結構；族群', 'a younger demographic', 3, ['demographically', 'democratic'], [
        ['Our main [demographic] is women aged 25 to 40.', '我們的主要族群是 25 到 40 歲的女性。'],
        ['The new ad targets a younger [demographic].', '新廣告鎖定較年輕的族群。'],
      ]],
      ['rebrand', 'riˋbrænd', 'v.', '重塑品牌', 'rebrand the company', 3, ['rebranding', 'rebranded'], [
        ['The company decided to [rebrand] after the merger.', '公司在合併後決定重塑品牌。'],
        ['We plan to [rebrand] the product for younger customers.', '我們打算為了年輕顧客重塑產品形象。'],
      ]],
      ['word of mouth', 'wɝd əv maʊθ', 'n.', '口碑', 'by word of mouth', 2, [], [
        ['Most of our customers hear about us by [word of mouth].', '我們大部分的顧客是透過口碑認識我們的。'],
        ['Good [word of mouth] helped the café grow quickly.', '好口碑讓這家咖啡店很快成長。'],
      ]],
      ['giveaway', 'ˋgɪvəˏwe', 'n.', '贈品', 'a free giveaway', 2, [], [
        ['Every visitor received a free [giveaway] at the booth.', '每位來到攤位的訪客都拿到免費贈品。'],
        ['The [giveaway] attracted hundreds of new followers.', '這次贈品活動吸引了數百位新粉絲。'],
      ]],
      ['exposure', 'ɪkˋspoʒɚ', 'n.', '曝光', 'media exposure', 2, ['expose', 'exposed'], [
        ['The event gave our brand great [exposure].', '這場活動讓我們的品牌大量曝光。'],
        ['Media [exposure] helped sales grow quickly.', '媒體曝光讓銷售快速成長。'],
      ]],
      ['awareness', 'əˋwɛrnɪs', 'n.', '認知度', 'brand awareness', 2, ['aware', 'unaware'], [
        ['The campaign raised brand [awareness] among students.', '這個活動提高了學生對品牌的認知度。'],
        ['Public [awareness] of the product is still low.', '大眾對這項產品的認知度仍然很低。'],
      ]],
      ['catchy', 'ˋkætʃɪ', 'adj.', '朗朗上口的', 'a catchy jingle', 2, ['catch', 'caught'], [
        ['The ad has a [catchy] song that everyone remembers.', '這支廣告有一首大家都記得的洗腦歌。'],
        ['Their slogan is short and [catchy].', '他們的標語簡短又朗朗上口。'],
      ]],
      ['appeal', 'əˋpil', 'n.', '吸引力；吸引', 'wide appeal', 2, ['appealing', 'appealed'], [
        ['The product has wide [appeal] among teenagers.', '這項產品在青少年之間很受歡迎。'],
        ["The new design increased the brand's [appeal] to young buyers.", '新設計提高了品牌對年輕買家的吸引力。'],
      ]],
      ['endorsement', 'ɪnˋdɔrsmənt', 'n.', '代言；認可', 'a celebrity endorsement', 3, ['endorse', 'endorsed'], [
        ["The athlete's [endorsement] helped boost sales.", '這位運動員的代言幫助提升了銷售。'],
        ['The toothpaste received an [endorsement] from a dental association.', '這款牙膏獲得牙醫協會的認可。'],
      ]],
      ['sponsorship', 'ˋspɑnsɚˏʃɪp', 'n.', '贊助', 'corporate sponsorship', 2, ['sponsor', 'sponsored'], [
        ['We are looking for [sponsorship] for the charity concert.', '我們正在為慈善音樂會尋找贊助。'],
        ['The festival relies heavily on corporate [sponsorship].', '這個節慶活動非常依賴企業贊助。'],
      ]],
      ['press conference', 'prɛs ˋkɑnfərəns', 'n.', '記者會', 'hold a press conference', 2, [], [
        ['The CEO will announce the new product at a [press conference].', '執行長會在記者會上發表新產品。'],
        ['Reporters asked many questions at the [press conference].', '記者在記者會上問了很多問題。'],
      ]],
      ['focus group', 'ˋfokəs grup', 'n.', '焦點團體', 'run a focus group', 3, [], [
        ['A [focus group] tested three versions of the package design.', '焦點團體測試了三種包裝設計。'],
        ['We invited ten customers to join a [focus group].', '我們邀請了十位顧客參加焦點團體座談。'],
      ]],
      ['market research', 'ˋmɑrkɪt rɪˋsɝtʃ', 'n.', '市場調查', 'conduct market research', 2, [], [
        ['[Market research] shows that customers want healthier snacks.', '市場調查顯示顧客想要更健康的零食。'],
        ['We hired a firm to do [market research] in Japan.', '我們請了一家公司在日本做市場調查。'],
      ]],
      ['brand loyalty', 'brænd ˋlɔɪəltɪ', 'n.', '品牌忠誠度', 'build brand loyalty', 3, [], [
        ['Reward programs help build [brand loyalty].', '集點計畫有助於建立品牌忠誠度。'],
        ['[Brand loyalty] is lower among younger shoppers.', '年輕消費者的品牌忠誠度比較低。'],
      ]],
    ],
  },
  {
    id: 'adjectives2', track: 'toeic', name: '高頻形容詞 II', icon: '💎', words: [
      ['advisable', 'ədˋvaɪzəbl̩', 'adj.', '明智的；可取的', 'it is advisable to', 3, ['advise', 'advice'], [
        ['It is [advisable] to book your flight at least a month in advance.', '最好至少提前一個月訂機票。'],
        ['Wearing a hard hat on the construction site is highly [advisable].', '在工地戴安全帽是非常明智的。'],
      ]],
      ['ample', 'ˋæmpl̩', 'adj.', '充足的', 'ample parking', 3, ['amply', 'amplify'], [
        ['There is [ample] parking behind the convention center.', '會議中心後面有充足的停車位。'],
        ['Participants will have [ample] time to ask questions after the talk.', '演講結束後，參加者會有充足的時間發問。'],
      ]],
      ['competent', 'ˋkɑmpətənt', 'adj.', '能勝任的', 'a competent manager', 3, ['competence', 'competently', 'compete'], [
        ['We are looking for a highly [competent] accountant.', '我們正在找一位非常能幹的會計師。'],
        ['Ms. Chen is [competent] in both English and Japanese.', '陳小姐英文和日文都能勝任。'],
      ]],
      ['crucial', 'ˋkruʃəl', 'adj.', '關鍵的', 'play a crucial role', 2, ['crucially', 'crux'], [
        ['Customer feedback plays a [crucial] role in product design.', '顧客意見在產品設計中扮演關鍵角色。'],
        ['It is [crucial] that we meet the deadline for this order.', '我們一定要趕上這筆訂單的期限，這非常關鍵。'],
      ]],
      ['diverse', 'daɪˋvɝs', 'adj.', '多樣的', 'diverse backgrounds', 2, ['diversity', 'diversify'], [
        ['Our employees come from [diverse] backgrounds.', '我們的員工來自多元的背景。'],
        ['The city offers a [diverse] range of restaurants.', '這座城市有各式各樣的餐廳。'],
      ]],
      ['exceptional', 'ɪkˋsɛpʃənl̩', 'adj.', '傑出的；例外的', 'exceptional service', 3, ['exception', 'exceptionally'], [
        ['The hotel is known for its [exceptional] service.', '這家飯店以一流的服務聞名。'],
        ['Her sales results this year were [exceptional].', '她今年的業績非常傑出。'],
      ]],
      ['favorable', 'ˋfevərəbl̩', 'adj.', '有利的；好評的', 'favorable conditions', 2, ['favor', 'favorably'], [
        ['The new product received [favorable] reviews from customers.', '新產品獲得顧客的好評。'],
        ['Exchange rates are [favorable] for travelers this month.', '這個月的匯率對旅客很有利。'],
      ]],
      ['generous', 'ˋdʒɛnərəs', 'adj.', '慷慨的；優厚的', 'a generous offer', 2, ['generosity', 'generously'], [
        ['The company offers a [generous] benefits package.', '這家公司提供優厚的福利。'],
        ['Thank you for your [generous] donation to the library.', '感謝您慷慨捐款給圖書館。'],
      ]],
      ['informative', 'ɪnˋfɔrmətɪv', 'adj.', '資訊豐富的', 'an informative session', 2, ['inform', 'information'], [
        ['The safety workshop was very [informative].', '這場安全研習的內容非常豐富。'],
        ['Visitors found the museum guide [informative] and easy to read.', '參觀者覺得博物館導覽手冊內容豐富又好讀。'],
      ]],
      ['knowledgeable', 'ˋnɑlɪdʒəbl̩', 'adj.', '知識淵博的', 'knowledgeable about', 2, ['knowledge', 'knowledgeably'], [
        ['Our staff are [knowledgeable] about local tours and attractions.', '我們的員工對當地行程和景點很熟悉。'],
        ['She is the most [knowledgeable] person on the team.', '她是團隊裡懂得最多的人。'],
      ]],
      ['lengthy', 'ˋlɛŋθɪ', 'adj.', '冗長的', 'a lengthy process', 2, ['length', 'lengthen'], [
        ['The visa application process can be [lengthy].', '簽證申請流程可能很冗長。'],
        ['After a [lengthy] discussion, the board approved the budget.', '經過冗長的討論後，董事會通過了預算。'],
      ]],
      ['lucrative', 'ˋlukrətɪv', 'adj.', '賺錢的', 'a lucrative contract', 3, [], [
        ['The firm won a [lucrative] contract with the government.', '這家公司拿到一份利潤豐厚的政府合約。'],
        ['Online sales have become a [lucrative] business for small shops.', '網路銷售已經成為小商店很賺錢的生意。'],
      ]],
      ['minimal', 'ˋmɪnəml̩', 'adj.', '最小的；極少的', 'minimal cost', 2, ['minimize', 'minimally'], [
        ['The renovation caused [minimal] disruption to hotel guests.', '這次整修對飯店房客的影響降到最低。'],
        ['The new software requires [minimal] training.', '新軟體幾乎不需要訓練。'],
      ]],
      ['moderate', 'ˋmɑdərɪt', 'adj.', '適度的；中等的', 'moderate prices', 2, ['moderately', 'moderation', 'moderator'], [
        ['The hotel offers clean rooms at [moderate] prices.', '這家飯店以中等的價格提供乾淨的房間。'],
        ['Sales showed [moderate] growth in the third quarter.', '第三季的銷售額有小幅成長。'],
      ]],
      ['notable', 'ˋnotəbl̩', 'adj.', '值得注意的；著名的', 'a notable exception', 3, ['notably', 'note'], [
        ['The conference attracted several [notable] speakers.', '這場研討會吸引了好幾位知名講者。'],
        ['The most [notable] change is the new company logo.', '最值得注意的改變是公司的新標誌。'],
      ]],
      ['obsolete', 'ˏɑbsəˋlit', 'adj.', '過時的', 'become obsolete', 3, ['obsolescence', 'absolute'], [
        ['The old fax machines in our office are now [obsolete].', '我們辦公室的舊傳真機現在已經過時了。'],
        ['Much of this equipment will become [obsolete] within five years.', '這些設備有很多會在五年內被淘汰。'],
      ]],
      ['persuasive', 'pɚˋswesɪv', 'adj.', '有說服力的', 'a persuasive argument', 2, ['persuade', 'persuasion', 'persuasively'], [
        ['She gave a very [persuasive] presentation to the investors.', '她向投資人做了一場非常有說服力的簡報。'],
        ['The sales pitch was [persuasive] enough to win the contract.', '這次推銷很有說服力，成功拿下合約。'],
      ]],
      ['practical', 'ˋpræktɪkl̩', 'adj.', '實用的；實際的', 'practical advice', 1, ['practice', 'practically'], [
        ['The proposal is creative but not very [practical].', '這個提案很有創意，但不太實際。'],
        ['Comfortable shoes are more [practical] than high heels for this job.', '做這份工作，舒服的鞋子比高跟鞋實用。'],
      ]],
      ['rigorous', 'ˋrɪgərəs', 'adj.', '嚴格的', 'rigorous testing', 3, ['rigor', 'rigorously'], [
        ['All of our products undergo [rigorous] testing.', '我們所有產品都經過嚴格的測試。'],
        ['The hiring process is [rigorous] and takes several weeks.', '招募流程很嚴格，要花好幾個星期。'],
      ]],
      ['routine', 'ruˋtin', 'adj.', '例行的', 'routine maintenance', 2, ['routinely', 'routines'], [
        ['The elevator will be closed on Monday for [routine] maintenance.', '電梯星期一會因例行保養而停用。'],
        ['Filing weekly reports is a [routine] part of the job.', '提交週報是這份工作的例行事項。'],
      ]],
      ['satisfactory', 'ˏsætɪsˋfæktərɪ', 'adj.', '令人滿意的', 'satisfactory results', 2, ['satisfy', 'satisfaction', 'satisfied'], [
        ['The results of the safety inspection were [satisfactory].', '安全檢查的結果令人滿意。'],
        ['If the repair is not [satisfactory], we will redo it free of charge.', '如果修理結果不令人滿意，我們會免費重修。'],
      ]],
      ['seasonal', 'ˋsizn̩əl', 'adj.', '季節性的', 'seasonal work', 2, ['season', 'seasonally'], [
        ['Demand for air conditioners is highly [seasonal].', '冷氣機的需求有很強的季節性。'],
        ['Most of the jobs at the ski resort are [seasonal].', '滑雪度假村的工作大多是季節性的。'],
      ]],
      ['sophisticated', 'səˋfɪstɪˏketɪd', 'adj.', '精密的；精緻的', 'sophisticated equipment', 3, ['sophistication', 'sophisticate'], [
        ['The factory uses highly [sophisticated] equipment.', '這間工廠使用非常精密的設備。'],
        ['Customers today are more [sophisticated] than they were ten years ago.', '現在的顧客比十年前更講究。'],
      ]],
      ['thorough', 'ˋθɝo', 'adj.', '徹底的', 'a thorough review', 2, ['thoroughly', 'through', 'throughout'], [
        ['The inspector conducted a [thorough] review of the building.', '檢查員對這棟建築做了徹底的檢查。'],
        ['We need a more [thorough] investigation into the accident.', '我們需要對這起事故進行更徹底的調查。'],
      ]],
      ['versatile', 'ˋvɝsətl̩', 'adj.', '多功能的；多才多藝的', 'a versatile tool', 3, ['versatility', 'version'], [
        ['This [versatile] kitchen tool can slice, chop, and grate.', '這個多功能廚具可以切片、切碎和磨泥。'],
        ['Ms. Kim is a [versatile] employee who can work in any department.', '金小姐是多才多藝的員工，在哪個部門都能勝任。'],
      ]],
    ],
  },
  {
    id: 'adverbs2', track: 'toeic', name: '高頻副詞 II', icon: '🌀', words: [
      ['additionally', 'əˋdɪʃənl̩ɪ', 'adv.', '此外', 'and additionally', 2, ['additional', 'addition'], [
        ['The job offers a good salary. [Additionally], employees get free lunch.', '這份工作薪水不錯，此外員工還有免費午餐。'],
        ['Staff working overseas will [additionally] receive a housing allowance.', '派駐海外的員工另外還會領到住房津貼。'],
      ]],
      ['alternatively', 'ɔlˋtɝnətɪvlɪ', 'adv.', '或者', 'or alternatively', 3, ['alternative', 'alternate'], [
        ['You can pay online. [Alternatively], you can pay at the front desk.', '您可以線上付款，或者也可以在櫃台付款。'],
        ['Guests may take the hotel shuttle or, [alternatively], call a taxi.', '房客可以搭飯店接駁車，或者叫計程車。'],
      ]],
      ['definitely', 'ˋdɛfənɪtlɪ', 'adv.', '一定；確實', 'definitely worth it', 1, ['definite', 'definition'], [
        ['I will [definitely] attend the training session on Friday.', '我星期五一定會參加訓練課程。'],
        ['This is [definitely] the best offer we have received so far.', '這絕對是我們目前收到最好的報價。'],
      ]],
      ['entirely', 'ɪnˋtaɪrlɪ', 'adv.', '完全地', 'entirely new', 2, ['entire', 'entirety'], [
        ['The new library was funded [entirely] by private donors.', '新圖書館完全由私人捐款興建。'],
        ['I [entirely] agree with your proposal.', '我完全同意你的提案。'],
      ]],
      ['extremely', 'ɪkˋstrimlɪ', 'adv.', '極度地', 'extremely busy', 1, ['extreme', 'extremity'], [
        ['The new smartphone has been [extremely] popular with young people.', '這款新手機非常受年輕人歡迎。'],
        ['Ms. Park is [extremely] busy this week, so please email her.', '朴小姐這週非常忙，請寄電子郵件給她。'],
      ]],
      ['fairly', 'ˋfɛrlɪ', 'adv.', '相當；公平地', 'fairly easy', 2, ['fair', 'fairness'], [
        ['The online test was [fairly] easy.', '線上測驗相當簡單。'],
        ['All applications will be [fairly] evaluated by the committee.', '所有申請都會由委員會公平地審查。'],
      ]],
      ['formerly', 'ˋfɔrmɚlɪ', 'adv.', '以前', 'formerly known as', 3, ['former', 'form'], [
        ['The café on the corner was [formerly] a post office.', '轉角那間咖啡店以前是郵局。'],
        ['Ms. Grant [formerly] worked as a flight attendant.', '格蘭特小姐以前是空服員。'],
      ]],
      ['highly', 'ˋhaɪlɪ', 'adv.', '非常；高度地', 'highly recommended', 2, ['high', 'height'], [
        ['This restaurant comes [highly] recommended by local residents.', '這家餐廳受到當地居民大力推薦。'],
        ['The marketing position is [highly] competitive.', '這個行銷職位競爭非常激烈。'],
      ]],
      ['initially', 'ɪˋnɪʃəlɪ', 'adv.', '最初', 'initially planned', 2, ['initial', 'initiate'], [
        ['The event was [initially] planned for May.', '這場活動原本計畫在五月舉行。'],
        ['[Initially], only five people signed up for the course.', '一開始只有五個人報名這門課。'],
      ]],
      ['largely', 'ˋlɑrdʒlɪ', 'adv.', '主要地；大部分', 'largely due to', 2, ['large', 'enlarge'], [
        ['The success of the festival was [largely] due to our volunteers.', '這次活動的成功主要歸功於我們的志工。'],
        ['The drop in sales [largely] reflects higher prices.', '銷售下滑主要反映了價格上漲。'],
      ]],
      ['mainly', 'ˋmenlɪ', 'adv.', '主要地', 'mainly because', 1, ['main', 'maintain'], [
        ['We [mainly] sell our products to hotels and restaurants.', '我們的產品主要賣給飯店和餐廳。'],
        ['The audience at the seminar was [mainly] students.', '研討會的聽眾主要是學生。'],
      ]],
      ['merely', 'ˋmɪrlɪ', 'adv.', '僅僅', 'merely a suggestion', 3, ['mere', 'merit'], [
        ['This is [merely] a draft, so please feel free to make changes.', '這只是草稿，請儘管修改。'],
        ['Our goal is not [merely] to sell products but to build trust.', '我們的目標不只是賣產品，而是建立信任。'],
      ]],
      ['occasionally', 'əˋkeʒənl̩ɪ', 'adv.', '偶爾', 'only occasionally', 2, ['occasional', 'occasion'], [
        ['The train is [occasionally] delayed by bad weather.', '火車偶爾會因天候不佳而誤點。'],
        ['I [occasionally] work from home on Fridays.', '我星期五偶爾會在家工作。'],
      ]],
      ['originally', 'əˋrɪdʒənl̩ɪ', 'adv.', '原本；起初', 'originally scheduled', 2, ['original', 'origin'], [
        ['The meeting was [originally] scheduled for Tuesday.', '這場會議原本排在星期二。'],
        ['Mr. Ross is [originally] from Canada.', '羅斯先生原本是加拿大人。'],
      ]],
      ['particularly', 'pɚˋtɪkjəlɚlɪ', 'adv.', '特別地', 'particularly important', 2, ['particular', 'particle'], [
        ['Sales were [particularly] strong in Southeast Asia.', '東南亞的銷售特別強勁。'],
        ['I [particularly] enjoyed the keynote speech.', '我特別喜歡那場主題演講。'],
      ]],
      ['periodically', 'ˏpɪrɪˋɑdɪkl̩ɪ', 'adv.', '定期地', 'checked periodically', 3, ['periodic', 'period'], [
        ['The fire alarms are inspected [periodically].', '火災警報器會定期檢查。'],
        ['Please check your email [periodically] for updates.', '請定期查看電子郵件以獲得最新消息。'],
      ]],
      ['rarely', 'ˋrɛrlɪ', 'adv.', '很少', 'rarely used', 2, ['rare', 'rarity'], [
        ['Mr. Kent [rarely] misses a team meeting.', '肯特先生很少缺席團隊會議。'],
        ['This model is [rarely] out of stock.', '這個型號很少缺貨。'],
      ]],
      ['readily', 'ˋrɛdɪlɪ', 'adv.', '容易地；樂意地', 'readily available', 3, ['ready', 'readiness'], [
        ['Spare parts for this printer are [readily] available.', '這台印表機的零件很容易買到。'],
        ['The manager [readily] agreed to our request.', '經理爽快地答應了我們的要求。'],
      ]],
      ['reportedly', 'rɪˋportɪdlɪ', 'adv.', '據報導', 'is reportedly planning', 3, ['report', 'reported'], [
        ['The company is [reportedly] planning to open a factory in Vietnam.', '據報導，這家公司正計畫在越南設廠。'],
        ['The CEO will [reportedly] step down next year.', '據報導，執行長明年將卸任。'],
      ]],
      ['roughly', 'ˋrʌflɪ', 'adv.', '大約', 'roughly speaking', 2, ['rough', 'roughness'], [
        ['The bus trip to the airport takes [roughly] two hours.', '搭巴士到機場大約要兩個小時。'],
        ['[Roughly] half of our staff work remotely.', '我們大約一半的員工遠端工作。'],
      ]],
      ['simultaneously', 'ˏsaɪml̩ˋtenɪəslɪ', 'adv.', '同時地', 'occur simultaneously', 3, ['simultaneous', 'simulate'], [
        ['The film will be released [simultaneously] in 20 countries.', '這部電影將在 20 個國家同步上映。'],
        ['The two training sessions will take place [simultaneously].', '這兩場訓練課程會同時進行。'],
      ]],
      ['solely', 'ˋsollɪ', 'adv.', '唯一地；僅僅', 'solely responsible', 3, ['sole', 'solid'], [
        ["The final decision is [solely] the manager's responsibility.", '最後的決定完全由經理負責。'],
        ['This parking area is [solely] for customers.', '這個停車區僅供顧客使用。'],
      ]],
      ['typically', 'ˋtɪpɪkl̩ɪ', 'adv.', '通常', 'typically take', 2, ['typical', 'type'], [
        ['Deliveries [typically] arrive within three business days.', '貨品通常在三個工作天內送達。'],
        ['The office is [typically] quiet on Friday afternoons.', '辦公室星期五下午通常很安靜。'],
      ]],
      ['ultimately', 'ˋʌltəmɪtlɪ', 'adv.', '最終', 'ultimately responsible', 3, ['ultimate', 'ultimatum'], [
        ["The board will [ultimately] decide on next year's budget.", '最終將由董事會決定明年的預算。'],
        ['[Ultimately], the project was a great success.', '最後，這個專案非常成功。'],
      ]],
      ['widely', 'ˋwaɪdlɪ', 'adv.', '廣泛地', 'widely used', 2, ['wide', 'width'], [
        ['This accounting software is [widely] used in hospitals.', '這套會計軟體在醫院被廣泛使用。'],
        ['Our new snack is now [widely] available in supermarkets.', '我們的新零食現在在超市到處都買得到。'],
      ]],
    ],
  },
  {
    id: 'phrasal2', track: 'toeic', name: '高頻片語 II', icon: '🧷', words: [
      ['in light of', 'ɪn laɪt əv', 'prep.', '鑑於', 'in light of recent events', 3, [], [
        ['[In light of] the bad weather, the outdoor concert has been canceled.', '鑑於天氣不佳，戶外音樂會已經取消。'],
        ['The budget was revised [in light of] rising costs.', '因應成本上漲，預算已經修改。'],
      ]],
      ['on account of', 'ɑn əˋkaʊnt əv', 'prep.', '因為', 'on account of the weather', 3, [], [
        ['The flight was delayed [on account of] heavy fog.', '班機因為濃霧而延誤。'],
        ['Mr. Hill missed the meeting [on account of] illness.', '希爾先生因病沒有出席會議。'],
      ]],
      ['with the exception of', 'wɪð ðɪ ɪkˋsɛpʃən əv', 'prep.', '除了…之外', 'with the exception of Sundays', 3, [], [
        ['The store is open every day [with the exception of] public holidays.', '這家店除了國定假日之外每天營業。'],
        ['All staff, [with the exception of] new hires, must attend the review.', '除了新進人員，全體員工都必須參加檢討會。'],
      ]],
      ['in the event of', 'ɪn ðɪ ɪˋvɛnt əv', 'prep.', '萬一', 'in the event of a fire', 3, [], [
        ['[In the event of] a fire, please use the stairs.', '萬一發生火災，請走樓梯。'],
        ['A full refund will be given [in the event of] cancellation by the airline.', '萬一航空公司取消航班，將全額退款。'],
      ]],
      ['by means of', 'baɪ minz əv', 'prep.', '藉由', 'by means of a survey', 3, [], [
        ['Customer opinions were collected [by means of] an online survey.', '顧客意見是透過線上問卷收集的。'],
        ['The goods are moved [by means of] a conveyor belt.', '貨物是藉由輸送帶運送的。'],
      ]],
      ['in favor of', 'ɪn ˋfevɚ əv', 'prep.', '贊成；支持', 'vote in favor of', 2, [], [
        ['Most board members voted [in favor of] the merger.', '大多數董事投票贊成合併。'],
        ['The company dropped the old design [in favor of] a simpler one.', '公司捨棄舊設計，改用比較簡單的設計。'],
      ]],
      ['on short notice', 'ɑn ʃɔrt ˋnotɪs', 'adv.', '臨時通知', 'available on short notice', 2, [], [
        ['Thank you for coming to the meeting [on short notice].', '謝謝你在臨時通知下趕來開會。'],
        ['It is hard to find a hotel room [on short notice] during the festival.', '節慶期間臨時要訂飯店房間很困難。'],
      ]],
      ['at your earliest convenience', 'æt jʊr ˋɝlɪɪst kənˋvinjəns', 'adv.', '在您方便時儘早', 'reply at your earliest convenience', 3, [], [
        ['Please reply to this email [at your earliest convenience].', '請您方便時儘早回覆這封郵件。'],
        ['Kindly return the signed contract [at your earliest convenience].', '請您儘早寄回簽好的合約。'],
      ]],
      ['as a result', 'æz ə rɪˋzʌlt', 'adv.', '因此', 'as a result of', 1, [], [
        ['The supplier raised its prices. [As a result], we changed vendors.', '供應商漲價了，因此我們換了廠商。'],
        ['Sales increased by 20% [as a result] of the new campaign.', '新的行銷活動使銷售額增加了 20%。'],
      ]],
      ['in contrast', 'ɪn ˋkɑntræst', 'adv.', '相比之下', 'in contrast to', 2, [], [
        ['Sales in Europe fell. [In contrast], sales in Asia grew by 15%.', '歐洲的銷售下滑，相比之下亞洲成長了 15%。'],
        ["[In contrast] to last year, this year's conference was well organized.", '和去年相比，今年的研討會籌劃得很好。'],
      ]],
      ['on the other hand', 'ɑn ðə ˋʌðɚ hænd', 'adv.', '另一方面', 'but on the other hand', 1, [], [
        ['The apartment is small. [On the other hand], the rent is low.', '這間公寓很小，但另一方面房租很便宜。'],
        ['Working from home saves time; [on the other hand], it can feel lonely.', '在家工作很省時間，但另一方面可能會覺得孤單。'],
      ]],
      ['as well as', 'æz wɛl æz', 'conj.', '以及', 'as well as other', 1, [], [
        ['The hotel has a pool [as well as] a fitness center.', '這家飯店有游泳池以及健身中心。'],
        ['Ms. Liu speaks Korean [as well as] English.', '劉小姐會說英文，也會說韓文。'],
      ]],
      ['rather than', 'ˋræðɚ ðæn', 'conj.', '而不是', 'rather than wait', 2, [], [
        ['We decided to hold the meeting online [rather than] in person.', '我們決定線上開會，而不是當面開。'],
        ['Please send the files by email [rather than] by fax.', '請用電子郵件寄檔案，不要用傳真。'],
      ]],
      ['in place of', 'ɪn ples əv', 'prep.', '取代', 'in place of the manager', 2, [], [
        ['Mr. Wu will give the speech [in place of] the director.', '吳先生將代替主任發表演說。'],
        ['You can use olive oil [in place of] butter in this recipe.', '這道食譜可以用橄欖油取代奶油。'],
      ]],
      ['apart from', 'əˋpɑrt frəm', 'prep.', '除了', 'apart from that', 2, [], [
        ['[Apart from] a few small errors, the report is excellent.', '除了幾個小錯誤之外，這份報告很出色。'],
        ['Everyone [apart from] Ms. Ito attended the training.', '除了伊藤小姐，大家都參加了訓練。'],
      ]],
      ['along with', 'əˋlɔŋ wɪð', 'prep.', '連同', 'along with a receipt', 2, [], [
        ['Please return the item [along with] the original receipt.', '請連同原始收據一起退回商品。'],
        ['The CEO, [along with] two managers, will visit the factory.', '執行長將和兩位經理一起參觀工廠。'],
      ]],
      ['in exchange for', 'ɪn ɪksˋtʃendʒ fɔr', 'prep.', '交換', 'in exchange for free meals', 2, [], [
        ['Volunteers get free tickets [in exchange for] their help.', '志工幫忙可以換到免費門票。'],
        ['The supplier offered a discount [in exchange for] a larger order.', '供應商提出加大訂單就給折扣。'],
      ]],
      ['in the meantime', 'ɪn ðə ˋminˏtaɪm', 'adv.', '在此期間', 'and in the meantime', 2, [], [
        ['The technician will arrive at 3 p.m. [In the meantime], please do not use the machine.', '技術人員下午三點會到，在那之前請不要使用機器。'],
        ['Your new card will arrive next week; [in the meantime], you can use online banking.', '新卡下週會寄到，在這段期間你可以使用網路銀行。'],
      ]],
      ['at the latest', 'æt ðə ˋletɪst', 'adv.', '最晚', 'by Friday at the latest', 2, [], [
        ['Please submit your report by Friday [at the latest].', '請最晚在星期五前交報告。'],
        ['The shipment should arrive by noon [at the latest].', '這批貨最晚中午前應該會到。'],
      ]],
      ['for the time being', 'fɚ ðə taɪm ˋbiɪŋ', 'adv.', '暫時', 'closed for the time being', 2, [], [
        ['The cafeteria is closed [for the time being].', '員工餐廳暫時關閉。'],
        ['[For the time being], please use the side entrance.', '目前請暫時使用側門。'],
      ]],
      ['in person', 'ɪn ˋpɝsn̩', 'adv.', '親自', 'apply in person', 1, [], [
        ['Applications must be submitted [in person] at the front desk.', '申請必須親自到櫃台遞交。'],
        ['It was nice to finally meet you [in person].', '很高興終於見到你本人。'],
      ]],
      ['at no cost', 'æt no kɔst', 'adv.', '免費', 'at no cost to you', 2, [], [
        ['We will replace the damaged item [at no cost] to you.', '我們會免費為您更換損壞的商品。'],
        ['Employees can use the gym [at no cost].', '員工可以免費使用健身房。'],
      ]],
      ['free of charge', 'fri əv tʃɑrdʒ', 'adv.', '免費', 'delivered free of charge', 2, [], [
        ['Delivery is [free of charge] for orders over $50.', '訂單超過 50 美元免運費。'],
        ['Guests can use the Wi-Fi [free of charge].', '房客可以免費使用無線網路。'],
      ]],
      ['out of order', 'aʊt əv ˋɔrdɚ', 'adj.', '故障', 'be out of order', 1, [], [
        ['The elevator on the left is [out of order].', '左邊那台電梯故障了。'],
        ['Sorry, the ticket machine is [out of order] today.', '抱歉，售票機今天故障。'],
      ]],
      ['up to date', 'ʌp tə det', 'adj.', '最新的', 'keep sth up to date', 2, [], [
        ['Please keep your contact details [up to date].', '請隨時更新你的聯絡資料。'],
        ['Our website is not [up to date], so please call us for prices.', '我們的網站資訊不是最新的，請來電詢價。'],
      ]],
    ],
  },
  {
    id: 'verbs3', track: 'toeic', name: '高頻動詞 III', icon: '🔨', words: [
      ['adhere', 'ədˋhɪr', 'v.', '遵守；黏附', 'adhere to the rules', 3, ['adherence', 'adhesive'], [
        ['All staff must [adhere] to the safety regulations.', '所有員工都必須遵守安全規定。'],
        ['Suppliers are expected to [adhere] to our quality standards.', '供應商應該遵守我們的品質標準。'],
      ]],
      ['approve', 'əˋpruv', 'v.', '批准', 'approve a request', 1, ['approval', 'approved'], [
        ['The manager needs to [approve] your leave request.', '經理需要批准你的請假申請。'],
        ['Did the board [approve] the new budget?', '董事會通過新預算了嗎？'],
      ]],
      ['calculate', 'ˋkælkjəˏlet', 'v.', '計算', 'calculate the cost', 2, ['calculation', 'calculator'], [
        ['Please [calculate] the total cost of the business trip.', '請計算這趟出差的總費用。'],
        ['The software can [calculate] sales tax automatically.', '這套軟體可以自動計算營業稅。'],
      ]],
      ['compile', 'kəmˋpaɪl', 'v.', '彙編；整理', 'compile a list', 3, ['compilation', 'comply'], [
        ['Please [compile] a list of everyone attending the conference.', '請整理一份所有與會者的名單。'],
        ['Our team will [compile] the survey results into a report.', '我們團隊會把問卷結果整理成報告。'],
      ]],
      ['comprise', 'kəmˋpraɪz', 'v.', '包含；組成', 'comprise several parts', 3, ['comprehensive', 'compromise'], [
        ['The new committee will [comprise] five members.', '新委員會將由五位成員組成。'],
        ['The training program will [comprise] three short courses.', '這個訓練計畫將包含三門短期課程。'],
      ]],
      ['conclude', 'kənˋklud', 'v.', '結束；作出結論', 'conclude a meeting', 2, ['conclusion', 'conclusive'], [
        ['The meeting will [conclude] at 5 p.m.', '會議將在下午五點結束。'],
        ['From the data, we can [conclude] that the campaign was successful.', '從數據來看，我們可以斷定這次活動很成功。'],
      ]],
      ['consolidate', 'kənˋsɑləˏdet', 'v.', '合併；鞏固', 'consolidate operations', 3, ['consolidation', 'consolidated'], [
        ['The company plans to [consolidate] its two warehouses.', '公司打算把兩座倉庫合併。'],
        ['We need to [consolidate] our position in the Asian market.', '我們需要鞏固在亞洲市場的地位。'],
      ]],
      ['deduct', 'dɪˋdʌkt', 'v.', '扣除', 'deduct from', 3, ['deduction', 'deductible'], [
        ['We will [deduct] the cleaning fee from your deposit.', '我們會從你的押金扣除清潔費。'],
        ['Your employer must [deduct] tax from your wages.', '雇主必須從你的薪資中扣稅。'],
      ]],
      ['demonstrate', 'ˋdɛmənˏstret', 'v.', '示範；證明', 'demonstrate how to', 2, ['demonstration', 'demonstrative'], [
        ['The trainer will [demonstrate] how to use the new machine.', '訓練員會示範如何使用新機器。'],
        ['Applicants must [demonstrate] strong communication skills.', '應徵者必須展現良好的溝通能力。'],
      ]],
      ['designate', 'ˋdɛzɪgˏnet', 'v.', '指定', 'designate sb as', 3, ['designation', 'designated'], [
        ['Please [designate] one contact person for the project.', '請為這個專案指定一位聯絡人。'],
        ['The city plans to [designate] the old factory site as a park.', '市政府計畫把舊工廠用地劃定為公園。'],
      ]],
      ['disclose', 'dɪsˋkloz', 'v.', '揭露', 'disclose information', 3, ['disclosure', 'disclosed'], [
        ['We do not [disclose] customer information to third parties.', '我們不會把顧客資料透露給第三方。'],
        ['The company refused to [disclose] the price of the deal.', '公司拒絕透露這筆交易的金額。'],
      ]],
      ['eliminate', 'ɪˋlɪməˏnet', 'v.', '消除', 'eliminate waste', 2, ['elimination', 'eliminated'], [
        ['The new system will [eliminate] most of our paperwork.', '新系統將省掉我們大部分的文書作業。'],
        ['We need to [eliminate] unnecessary costs.', '我們需要刪除不必要的開支。'],
      ]],
      ['encounter', 'ɪnˋkaʊntɚ', 'v.', '遇到', 'encounter a problem', 2, ['encountered', 'encountering'], [
        ['Drivers may [encounter] delays on the highway this weekend.', '這個週末駕駛人在高速公路上可能會遇到塞車。'],
        ['Did you [encounter] any problems during the installation?', '安裝過程中你有遇到任何問題嗎？'],
      ]],
      ['expedite', 'ˋɛkspɪˏdaɪt', 'v.', '加速處理', 'expedite delivery', 3, ['expedition', 'expeditious'], [
        ['Can you [expedite] the shipping of my order?', '可以加快寄送我的訂單嗎？'],
        ['We paid an extra fee to [expedite] the visa process.', '我們多付了一筆費用來加速簽證流程。'],
      ]],
      ['generate', 'ˋdʒɛnəˏret', 'v.', '產生', 'generate revenue', 2, ['generation', 'generator'], [
        ['The new advertising campaign helped [generate] more sales.', '新的廣告活動帶動了更多銷售。'],
        ['These solar panels can [generate] enough power for the whole office.', '這些太陽能板能產生足夠整間辦公室使用的電力。'],
      ]],
      ['incorporate', 'ɪnˋkɔrpəˏret', 'v.', '納入', 'incorporate feedback', 3, ['incorporation', 'corporate'], [
        ['We will [incorporate] your feedback into the final design.', '我們會把您的意見納入最終設計。'],
        ['The new office should [incorporate] more natural light.', '新辦公室應該引進更多自然光。'],
      ]],
      ['integrate', 'ˋɪntəˏgret', 'v.', '整合', 'integrate with', 3, ['integration', 'integral'], [
        ['The app can [integrate] with your online calendar.', '這個應用程式可以和你的線上行事曆整合。'],
        ['We plan to [integrate] the two computer systems next year.', '我們計畫明年整合這兩套電腦系統。'],
      ]],
      ['minimize', 'ˋmɪnəˏmaɪz', 'v.', '降到最低', 'minimize costs', 2, ['minimal', 'minimum'], [
        ['We must [minimize] waste in the factory.', '我們必須把工廠的浪費降到最低。'],
        ['To [minimize] delays, please arrive at the airport early.', '為了減少延誤，請提早抵達機場。'],
      ]],
      ['modify', 'ˋmɑdəˏfaɪ', 'v.', '修改', 'modify a booking', 2, ['modification', 'modified'], [
        ['You can [modify] your booking online.', '你可以在網路上修改訂位。'],
        ['We had to [modify] the design to reduce costs.', '為了降低成本，我們必須修改設計。'],
      ]],
      ['prohibit', 'proˋhɪbɪt', 'v.', '禁止', 'prohibit smoking', 2, ['prohibition', 'prohibited'], [
        ['The company will [prohibit] personal phone use on the factory floor.', '公司將禁止在廠區使用私人手機。'],
        ['Hotels may [prohibit] pets in guest rooms.', '飯店可能禁止客房內攜帶寵物。'],
      ]],
      ['reinforce', 'ˏriɪnˋfors', 'v.', '加強', 'reinforce a message', 3, ['reinforcement', 'reinforced'], [
        ['Regular training will [reinforce] good safety habits.', '定期訓練能加強良好的安全習慣。'],
        ['Workers had to [reinforce] the old bridge before reopening it.', '工人必須先補強舊橋才能重新開放。'],
      ]],
      ['restore', 'rɪˋstor', 'v.', '恢復；修復', 'restore power', 2, ['restoration', 'restored'], [
        ['Technicians are working to [restore] power to the building.', '技術人員正在努力恢復大樓的電力。'],
        ['The new owners plan to [restore] the historic hotel.', '新屋主計畫修復這間歷史悠久的飯店。'],
      ]],
      ['simplify', 'ˋsɪmpləˏfaɪ', 'v.', '簡化', 'simplify the process', 2, ['simple', 'simplicity'], [
        ['We need to [simplify] the application form.', '我們需要簡化申請表。'],
        ['The new software will [simplify] the ordering process.', '新軟體將簡化訂購流程。'],
      ]],
      ['solicit', 'səˋlɪsɪt', 'v.', '徵求', 'solicit feedback', 3, ['solicitation', 'solicitor'], [
        ['The city will [solicit] bids from local contractors.', '市政府將向本地承包商徵求投標。'],
        ['We regularly [solicit] feedback from our customers.', '我們定期向顧客徵求意見。'],
      ]],
      ['waive', 'wev', 'v.', '免除；放棄', 'waive a fee', 3, ['waiver', 'wave'], [
        ['The hotel agreed to [waive] the cancellation fee.', '飯店同意免收取消費。'],
        ['We will [waive] the delivery charge for orders over $50.', '訂單超過 50 美元我們會免收運費。'],
      ]],
    ],
  },
  {
    id: 'nouns3', track: 'toeic', name: '高頻名詞 III', icon: '📙', words: [
      ['aspect', 'ˋæspɛkt', 'n.', '方面', 'every aspect of', 2, ['aspects', 'respect'], [
        ['Customer service is an important [aspect] of our business.', '客戶服務是我們業務很重要的一環。'],
        ['We discussed every [aspect] of the project at the meeting.', '我們在會議上討論了專案的每個面向。'],
      ]],
      ['circumstance', 'ˋsɝkəmˏstæns', 'n.', '情況', 'due to an unexpected circumstance', 2, ['circumstantial', 'circumstances'], [
        ['The event was canceled due to an unexpected [circumstance].', '活動因突發狀況而取消。'],
        ['Each [circumstance] is reviewed individually by our staff.', '每個情況都會由我們的人員個別審查。'],
      ]],
      ['contribution', 'ˏkɑntrəˋbjuʃən', 'n.', '貢獻；捐款', 'make a contribution', 2, ['contribute', 'contributed'], [
        ['We appreciate your [contribution] to the project.', '我們感謝你對這個專案的貢獻。'],
        ['Every [contribution] to the charity, large or small, helps.', '每一筆給慈善機構的捐款，不論多寡都有幫助。'],
      ]],
      ['discrepancy', 'dɪˋskrɛpənsɪ', 'n.', '差異；不一致', 'a discrepancy between', 3, ['discreet', 'discrete'], [
        ['There is a [discrepancy] between the invoice and the order form.', '發票和訂購單之間有出入。'],
        ['Please report any [discrepancy] in your pay slip to HR.', '薪資單如有任何不符，請通知人資部。'],
      ]],
      ['emphasis', 'ˋɛmfəsɪs', 'n.', '強調', 'place emphasis on', 2, ['emphasize', 'emphatic'], [
        ['The company places great [emphasis] on safety.', '公司非常重視安全。'],
        ['There is a strong [emphasis] on teamwork in our department.', '我們部門非常強調團隊合作。'],
      ]],
      ['enrollment', 'ɪnˋrolmənt', 'n.', '註冊；入學人數', 'enrollment fee', 3, ['enroll', 'enrolled'], [
        ['[Enrollment] for the evening course closes on Friday.', '夜間課程的報名星期五截止。'],
        ["The university's [enrollment] has increased by 10% this year.", '這所大學今年的入學人數增加了 10%。'],
      ]],
      ['exception', 'ɪkˋsɛpʃən', 'n.', '例外', 'make an exception', 2, ['exceptional', 'except'], [
        ['This rule applies to all employees without [exception].', '這條規定適用於所有員工，沒有例外。'],
        ['We made an [exception] for her because of the storm.', '因為暴風雨，我們為她破例。'],
      ]],
      ['implication', 'ˏɪmplɪˋkeʃən', 'n.', '影響；含意', 'implications for', 3, ['imply', 'implicate'], [
        ['What is the [implication] of the new law for small businesses?', '新法律對小型企業有什麼影響？'],
        ['The [implication] is that prices will rise next year.', '這意味著明年價格會上漲。'],
      ]],
      ['involvement', 'ɪnˋvɑlvmənt', 'n.', '參與', 'involvement in', 2, ['involve', 'involved'], [
        ['Thank you for your [involvement] in the charity event.', '謝謝你參與這次慈善活動。'],
        ['The project requires the [involvement] of every department.', '這個專案需要每個部門參與。'],
      ]],
      ['limitation', 'ˏlɪməˋteʃən', 'n.', '限制', 'a limitation of', 2, ['limited', 'limitless'], [
        ['The main [limitation] of the study is its small sample size.', '這項研究主要的限制是樣本數太少。'],
        ['Every system has some [limitation], so we need a backup plan.', '每套系統都有一些限制，所以我們需要備案。'],
      ]],
      ['necessity', 'nəˋsɛsətɪ', 'n.', '必需品；必要', 'a basic necessity', 2, ['necessary', 'necessarily'], [
        ['A car is a [necessity] if you live in the countryside.', '如果住在鄉下，汽車是必需品。'],
        ['Good communication is a [necessity] in this job.', '良好的溝通在這份工作中是必要的。'],
      ]],
      ['notification', 'ˏnotəfəˋkeʃən', 'n.', '通知', 'receive a notification', 2, ['notify', 'notified'], [
        ['You will receive a [notification] when your order ships.', '訂單出貨時你會收到通知。'],
        ['Please read the [notification] on your phone before the meeting.', '開會前請先看手機上的通知。'],
      ]],
      ['occurrence', 'əˋkɝəns', 'n.', '發生（的事）', 'a rare occurrence', 3, ['occur', 'occurred'], [
        ['Power outages are a rare [occurrence] in this area.', '這一區很少停電。'],
        ['Please report every [occurrence] of equipment failure.', '每次設備故障都請回報。'],
      ]],
      ['possession', 'pəˋzɛʃən', 'n.', '擁有；財產', 'in possession of', 2, ['possess', 'possessive'], [
        ['Passengers must keep their bags in their [possession] at all times.', '旅客必須隨時看管好自己的行李。'],
        ['The company took [possession] of the new building in May.', '公司在五月接收了新大樓。'],
      ]],
      ['presence', 'ˋprɛzn̩s', 'n.', '出席；存在', 'a strong presence', 2, ['presentable', 'presently'], [
        ['We thank you for your [presence] at the opening ceremony.', '感謝您出席開幕典禮。'],
        ['The company is expanding its [presence] in Southeast Asia.', '公司正在擴大在東南亞的據點。'],
      ]],
      ['principle', 'ˋprɪnsəpl̩', 'n.', '原則', 'a basic principle', 2, ['principal', 'principally'], [
        ['Honesty is the basic [principle] of our business.', '誠實是我們經營的基本原則。'],
        ['The new office design follows the [principle] of simplicity.', '新辦公室的設計遵循簡約的原則。'],
      ]],
      ['privilege', 'ˋprɪvl̩ɪdʒ', 'n.', '特權；榮幸', 'a privilege to', 3, ['privileged', 'private'], [
        ['It is a [privilege] to work with such a talented team.', '能和這麼優秀的團隊共事是我的榮幸。'],
        ['Gold members enjoy the [privilege] of free parking.', '金卡會員享有免費停車的優惠。'],
      ]],
      ['proportion', 'prəˋporʃən', 'n.', '比例', 'a large proportion of', 3, ['proportional', 'proportionally'], [
        ['A large [proportion] of our customers shop online.', '我們有很大比例的顧客在網路上購物。'],
        ['The [proportion] of women in management has increased.', '管理階層中女性的比例增加了。'],
      ]],
      ['proximity', 'prɑkˋsɪmətɪ', 'n.', '鄰近', 'proximity to', 3, ['proximate', 'approximate'], [
        ["The hotel's [proximity] to the airport is very convenient.", '這家飯店離機場很近，非常方便。'],
        ['We chose the office for its [proximity] to the train station.', '我們選這間辦公室是因為它靠近火車站。'],
      ]],
      ['rationale', 'ˏræʃəˋnæl', 'n.', '理由', 'the rationale behind', 3, ['rational', 'rationally'], [
        ['Can you explain the [rationale] behind this decision?', '你可以說明這個決定背後的理由嗎？'],
        ['The [rationale] for the price increase is rising fuel costs.', '漲價的理由是燃料成本上升。'],
      ]],
      ['restriction', 'rɪˋstrɪkʃən', 'n.', '限制', 'a weight restriction', 2, ['restrict', 'restrictive'], [
        ['There is a weight [restriction] on checked baggage.', '託運行李有重量限制。'],
        ['The new parking [restriction] applies to all visitors.', '新的停車限制適用於所有訪客。'],
      ]],
      ['setback', 'ˋsɛtˏbæk', 'n.', '挫折；倒退', 'a minor setback', 3, [], [
        ['The factory fire was a major [setback] for the company.', '工廠火災對公司是一大挫敗。'],
        ['Despite an early [setback], the project finished on time.', '儘管一開始受挫，專案還是準時完成。'],
      ]],
      ['shortfall', 'ˋʃɔrtˏfɔl', 'n.', '短缺；不足額', 'a budget shortfall', 3, ['short', 'shorten'], [
        ['The city faces a $2 million [shortfall] this year.', '市政府今年面臨兩百萬美元的缺口。'],
        ['Strong holiday sales helped cover the [shortfall].', '假期的強勁銷售幫忙補足了不足的金額。'],
      ]],
      ['substitute', 'ˋsʌbstəˏtjut', 'n.', '代替品；代替者', 'a substitute for', 2, ['substituted', 'constitute'], [
        ['We hired a [substitute] while Ms. Cho was on leave.', '卓小姐休假期間，我們請了一位代理人。'],
        ['Soy milk is a good [substitute] for regular milk.', '豆漿是牛奶很好的替代品。'],
      ]],
      ['threshold', 'ˋθrɛʃold', 'n.', '門檻', 'reach a threshold', 3, [], [
        ['Orders above the $100 [threshold] qualify for free shipping.', '訂單超過 100 美元的門檻就享有免運費。'],
        ['Your income is below the [threshold] for paying tax.', '你的收入低於繳稅的門檻。'],
      ]],
    ],
  },
  {
    id: 'hr2', track: 'toeic', name: '人事進階', icon: '👥', words: [
      ['bonus', 'ˋbonəs', 'n.', '獎金', 'a year-end bonus', 1, [], [
        ['All employees will receive a year-end [bonus].', '所有員工都會領到年終獎金。'],
        ['The sales team earned a [bonus] for reaching its target.', '業務團隊達成目標，拿到了獎金。'],
      ]],
      ['raise', 'rez', 'n.', '加薪', 'ask for a raise', 1, ['raised', 'arise'], [
        ['I plan to ask my manager for a [raise].', '我打算向經理要求加薪。'],
        ['All staff will get a 3% [raise] next year.', '全體員工明年會加薪 3%。'],
      ]],
      ['layoff', 'ˋleˏɔf', 'n.', '裁員', 'announce layoffs', 2, [], [
        ['The factory announced a [layoff] of 200 workers.', '工廠宣布裁員 200 人。'],
        ['Many employees are worried about another [layoff].', '許多員工擔心會再裁員。'],
      ]],
      ['dismiss', 'dɪsˋmɪs', 'v.', '解僱；駁回', 'dismiss an employee', 3, ['dismissal', 'dismissive'], [
        ['The company may [dismiss] employees who break safety rules.', '公司可能會解僱違反安全規定的員工。'],
        ['The judge decided to [dismiss] the case.', '法官決定駁回這起案件。'],
      ]],
      ['probation', 'proˋbeʃən', 'n.', '試用期', 'on probation', 3, ['probationary', 'probable'], [
        ['New employees are on [probation] for three months.', '新進員工有三個月的試用期。'],
        ['He passed his [probation] and became a permanent employee.', '他通過試用期，成為正式員工。'],
      ]],
      ['internship', 'ˋɪntɝnˏʃɪp', 'n.', '實習', 'a summer internship', 2, ['internal', 'interns'], [
        ['She did a summer [internship] at an investment bank.', '她暑假在一家投資銀行實習。'],
        ['We offer a paid [internship] for university graduates.', '我們為大學畢業生提供有薪實習。'],
      ]],
      ['intern', 'ˋɪntɝn', 'n.', '實習生', 'a marketing intern', 1, ['internal', 'internship'], [
        ['We hired an [intern] to help with the summer project.', '我們僱了一位實習生來協助暑期專案。'],
        ['Our new [intern] is a university student from Taichung.', '我們新來的實習生是台中來的大學生。'],
      ]],
      ['mentor', 'ˋmɛntɚ', 'n.', '導師；指導者', 'a mentor program', 2, ['mention', 'mentality'], [
        ['Each new employee is assigned a [mentor].', '每位新進員工都會分配一位指導前輩。'],
        ['My [mentor] gave me useful career advice.', '我的導師給了我很有用的職涯建議。'],
      ]],
      ['onboarding', 'ˋɑnˏbɔrdɪŋ', 'n.', '新人入職訓練', 'an onboarding program', 3, [], [
        ['Our [onboarding] program lasts two weeks.', '我們的新人入職訓練為期兩週。'],
        ['HR is updating the [onboarding] materials for new hires.', '人資部正在更新新進員工的入職資料。'],
      ]],
      ['performance review', 'pɚˋfɔrməns rɪˋvju', 'n.', '績效考核', 'an annual performance review', 2, [], [
        ['My [performance review] is scheduled for next Monday.', '我的績效考核排在下星期一。'],
        ['Raises are decided after the annual [performance review].', '加薪幅度在年度績效考核後決定。'],
      ]],
      ['job description', 'dʒɑb dɪˋskrɪpʃən', 'n.', '職務說明', 'read the job description', 2, [], [
        ['Please read the [job description] carefully before applying.', '應徵前請仔細閱讀職務說明。'],
        ['Customer support is not part of my [job description].', '客服不在我的職務範圍內。'],
      ]],
      ['job opening', 'dʒɑb ˋopənɪŋ', 'n.', '職缺', 'a job opening in sales', 2, [], [
        ['There is a [job opening] in our accounting department.', '我們會計部有一個職缺。'],
        ['The [job opening] was posted on our website yesterday.', '這個職缺昨天公布在我們的網站上。'],
      ]],
      ['headhunter', 'ˋhɛdˏhʌntɚ', 'n.', '獵人頭', 'contacted by a headhunter', 3, [], [
        ['A [headhunter] called me about a manager position.', '有位獵人頭打電話給我，談一個經理職缺。'],
        ['The company used a [headhunter] to find its new CEO.', '公司透過獵人頭找到新任執行長。'],
      ]],
      ['pension', 'ˋpɛnʃən', 'n.', '退休金', 'a pension plan', 3, ['pensioner', 'tension'], [
        ['She will receive a [pension] when she retires.', '她退休後會領到退休金。'],
        ["The company contributes to each employee's [pension].", '公司會為每位員工提撥退休金。'],
      ]],
      ['severance', 'ˋsɛvərəns', 'n.', '資遣費', 'severance pay', 3, ['sever', 'several'], [
        ['Laid-off workers will receive [severance] pay.', '被裁員的員工會領到資遣費。'],
        ["The company offered him three months' [severance].", '公司給了他三個月的資遣費。'],
      ]],
      ['telecommute', 'ˋtɛlɪkəˏmjut', 'v.', '遠距上班', 'telecommute from home', 3, ['telecommuting', 'telecommuter'], [
        ['Many of our employees [telecommute] two days a week.', '我們很多員工每週遠距上班兩天。'],
        ['Staff in the design team can [telecommute] on Fridays.', '設計團隊的員工星期五可以遠距上班。'],
      ]],
      ['remote work', 'rɪˋmot wɝk', 'n.', '遠端工作', 'a remote work policy', 2, [], [
        ['The company introduced a new [remote work] policy.', '公司推出了新的遠端工作政策。'],
        ['[Remote work] saves employees a lot of commuting time.', '遠端工作幫員工省下很多通勤時間。'],
      ]],
      ['flextime', 'ˋflɛksˏtaɪm', 'n.', '彈性上班時間', 'work flextime', 3, [], [
        ['Our office offers [flextime], so you can start between 8 and 10.', '我們公司有彈性上班時間，可以在八點到十點之間上班。'],
        ['[Flextime] helps parents pick up their children from school.', '彈性上班時間方便家長接送孩子放學。'],
      ]],
      ['contract worker', 'ˋkɑntrækt ˋwɝkɚ', 'n.', '約聘人員', 'hire a contract worker', 2, [], [
        ['We hired a [contract worker] for the six-month project.', '我們為這個為期六個月的專案聘了一位約聘人員。'],
        ['As a [contract worker], he does not receive paid holidays.', '身為約聘人員，他沒有帶薪假。'],
      ]],
      ['freelancer', 'ˋfriˏlænsɚ', 'n.', '自由工作者', 'hire a freelancer', 2, ['freelance', 'freelancing'], [
        ['We hired a [freelancer] to design our new website.', '我們請了一位自由工作者設計新網站。'],
        ['As a [freelancer], she works from home for several clients.', '身為自由工作者，她在家為好幾個客戶工作。'],
      ]],
      ['union', 'ˋjunjən', 'n.', '工會', 'a labor union', 2, ['unify', 'unite'], [
        ['The [union] negotiated higher wages for factory workers.', '工會為工廠員工爭取到更高的薪資。'],
        ['Most of the drivers belong to the [union].', '大部分司機都有加入工會。'],
      ]],
      ['grievance', 'ˋgrivəns', 'n.', '申訴', 'file a grievance', 3, ['grieve', 'grief'], [
        ['Employees can file a [grievance] with the HR department.', '員工可以向人資部提出申訴。'],
        ['The [grievance] procedure is explained in the employee handbook.', '申訴程序在員工手冊裡有說明。'],
      ]],
      ['diversity', 'daɪˋvɝsətɪ', 'n.', '多元', 'workplace diversity', 2, ['diverse', 'diversify'], [
        ['Our company values [diversity] in the workplace.', '我們公司重視職場多元。'],
        ["The team's [diversity] brings many new ideas.", '團隊的多元性帶來許多新點子。'],
      ]],
      ['team building', 'tim ˋbɪldɪŋ', 'n.', '團隊建立', 'a team building activity', 2, [], [
        ['We went hiking as a [team building] activity.', '我們去健行當作團隊建立活動。'],
        ['Good [team building] improves communication between departments.', '良好的團隊建立能改善部門之間的溝通。'],
      ]],
      ['workplace', 'ˋwɝkˏples', 'n.', '職場', 'workplace safety', 1, [], [
        ["Safety in the [workplace] is everyone's responsibility.", '職場安全是每個人的責任。'],
        ['A friendly [workplace] helps companies keep good staff.', '友善的職場能幫公司留住好員工。'],
      ]],
    ],
  },
  {
    id: 'etiquette', track: 'toeic', name: '職場禮儀與溝通', icon: '🙇', words: [
      ['etiquette', 'ˋɛtɪkɛt', 'n.', '禮儀', 'business etiquette', 3, [], [
        ['Learning local business [etiquette] helps you make a good impression abroad.', '學習當地的商務禮儀有助於在國外留下好印象。'],
        ['Phone [etiquette] is covered in the first week of training.', '電話禮儀會在訓練的第一週教到。'],
      ]],
      ['punctuality', 'ˏpʌŋktʃʊˋælətɪ', 'n.', '準時', 'value punctuality', 3, ['punctual', 'punctually'], [
        ['Our manager places great value on [punctuality].', '我們經理非常重視準時。'],
        ['[Punctuality] is expected at all client meetings.', '所有客戶會議都必須準時出席。'],
      ]],
      ['dress code', 'ˋdrɛs ˏkod', 'n.', '服裝規定', 'follow the dress code', 2, [], [
        ['The company has a strict [dress code] for client meetings.', '公司對客戶會議有嚴格的服裝規定。'],
        ['Please check the [dress code] before the awards dinner.', '頒獎晚宴前請先確認服裝規定。'],
      ]],
      ['business casual', 'ˋbɪznɪs ˋkæʒʊəl', 'n.', '商務休閒服', 'wear business casual', 2, [], [
        ['Employees may wear [business casual] on Fridays.', '員工星期五可以穿商務休閒服。'],
        ['The invitation says the dress code is [business casual].', '邀請函上說服裝規定是商務休閒。'],
      ]],
      ['handshake', 'ˋhændˏʃek', 'n.', '握手', 'a firm handshake', 1, [], [
        ['He greeted the client with a firm [handshake].', '他用有力的握手迎接客戶。'],
        ['The two companies sealed the deal with a [handshake].', '兩家公司握手敲定了這筆交易。'],
      ]],
      ['greet', 'grit', 'v.', '問候；迎接', 'greet visitors', 1, ['greeting', 'greeted'], [
        ['The receptionist will [greet] visitors at the entrance.', '接待人員會在入口迎接訪客。'],
        ['Please stand up and [greet] our guests when they arrive.', '客人到的時候請起身問候。'],
      ]],
      ['small talk', 'ˋsmɔl ˏtɔk', 'n.', '閒聊', 'make small talk', 2, [], [
        ['It is common to make [small talk] before a meeting starts.', '會議開始前閒聊幾句是很常見的。'],
        ['She is good at [small talk] with new clients.', '她很會跟新客戶閒聊。'],
      ]],
      ['appreciate', 'əˋpriʃɪˏet', 'v.', '感激；欣賞', 'appreciate your help', 1, ['appreciation', 'appreciative'], [
        ['We really [appreciate] your help with the project.', '我們非常感謝你協助這個專案。'],
        ['I would [appreciate] it if you could reply by Friday.', '如果你能在星期五前回覆，我會很感激。'],
      ]],
      ['gratitude', 'ˋgrætəˏtjud', 'n.', '感謝', 'express gratitude', 2, ['grateful', 'gratefully'], [
        ['We would like to express our [gratitude] to all the volunteers.', '我們想向所有志工表達感謝。'],
        ['She sent the team a card to show her [gratitude].', '她寄了一張卡片給團隊表達謝意。'],
      ]],
      ['misunderstanding', 'ˏmɪsʌndɚˋstændɪŋ', 'n.', '誤會', 'clear up a misunderstanding', 2, ['misunderstand', 'misunderstood'], [
        ["I'm sorry, there seems to be a [misunderstanding] about the date.", '抱歉，關於日期似乎有些誤會。'],
        ['A quick phone call cleared up the [misunderstanding].', '一通簡短的電話就把誤會解開了。'],
      ]],
      ['formal', 'ˋfɔrml̩', 'adj.', '正式的', 'formal attire', 1, ['formally', 'formality'], [
        ['Please wear [formal] clothes to the awards dinner.', '頒獎晚宴請穿正式服裝。'],
        ['Use a [formal] tone when writing to new clients.', '寫信給新客戶時要用正式的語氣。'],
      ]],
      ['informal', 'ɪnˋfɔrml̩', 'adj.', '非正式的', 'an informal meeting', 1, ['informally', 'informality'], [
        ['We had an [informal] chat over coffee.', '我們喝咖啡時非正式地聊了一下。'],
        ['The team lunch is an [informal] event, so jeans are fine.', '團隊午餐是非正式的活動，穿牛仔褲就可以。'],
      ]],
      ['tone', 'ton', 'n.', '語氣', 'tone of voice', 2, [], [
        ['Keep a polite [tone] in all customer emails.', '所有客戶郵件都要保持禮貌的語氣。'],
        ['Her [tone] of voice showed that she was upset.', '她說話的語氣顯示她不高興。'],
      ]],
      ['assertive', 'əˋsɝtɪv', 'adj.', '堅定自信的', 'be more assertive', 3, ['assert', 'assertion'], [
        ['You need to be more [assertive] in negotiations.', '談判時你需要更堅定自信一點。'],
        ['She gave an [assertive] but polite answer.', '她給了一個堅定但有禮貌的回答。'],
      ]],
      ['diplomatic', 'ˏdɪpləˋmætɪk', 'adj.', '圓融的；外交的', 'a diplomatic answer', 3, ['diplomat', 'diplomacy'], [
        ['He gave a [diplomatic] answer to the difficult question.', '他對那個難題給了圓融的回答。'],
        ['Try to be [diplomatic] when you disagree with a client.', '和客戶意見不同時，試著圓融一點。'],
      ]],
      ['tactful', 'ˋtæktfəl', 'adj.', '得體的', 'a tactful reply', 3, ['tact', 'tactfully'], [
        ['It was [tactful] of her not to mention his mistake.', '她沒有提到他的錯誤，很得體。'],
        ['Please write a [tactful] reply to the complaint.', '請對這則客訴寫一封得體的回覆。'],
      ]],
      ['brainstorm', 'ˋbrenˏstɔrm', 'v.', '腦力激盪', 'brainstorm ideas', 2, ['brainstorming', 'brainstormed'], [
        ["Let's [brainstorm] ideas for the new campaign.", '我們來為新的活動腦力激盪一下。'],
        ['The team met to [brainstorm] names for the product.', '團隊開會腦力激盪產品名稱。'],
      ]],
      ['input', 'ˋɪnˏpʊt', 'n.', '意見；投入', 'valuable input', 2, [], [
        ['Thank you for your [input] on the report.', '謝謝你對報告提供的意見。'],
        ['We need [input] from every department before we decide.', '做決定前我們需要每個部門的意見。'],
      ]],
      ['concern', 'kənˋsɝn', 'n.', '擔心；關心的事', 'raise a concern', 2, ['concerned', 'concerning'], [
        ['She raised a [concern] about the tight deadline.', '她提出了對緊迫期限的擔憂。'],
        ['Customer safety is our main [concern].', '顧客安全是我們最關心的事。'],
      ]],
      ['address', 'əˋdrɛs', 'v./n.', '處理（問題）；地址', 'address an issue', 2, ['addressed', 'addressing'], [
        ['The manager promised to [address] the problem quickly.', '經理承諾會盡快處理這個問題。'],
        ['Please send the package to our new office [address].', '請把包裹寄到我們新的辦公室地址。'],
      ]],
      ['compliment', 'ˋkɑmpləmənt', 'n.', '讚美', 'pay sb a compliment', 2, ['complement', 'complimentary'], [
        ['She received a [compliment] from the client on her presentation.', '她的簡報得到了客戶的稱讚。'],
        ["It's polite to accept a [compliment] with a simple thank-you.", '接受讚美時簡單說聲謝謝是有禮貌的。'],
      ]],
      ['cubicle', 'ˋkjubɪkl̩', 'n.', '辦公隔間', 'office cubicle', 2, [], [
        ['My [cubicle] is right next to the printer.', '我的辦公隔間就在印表機旁邊。'],
        ['Please keep your [cubicle] clean and tidy.', '請保持你的辦公隔間乾淨整齊。'],
      ]],
      ['break room', 'ˋbrek ˏrum', 'n.', '茶水間', 'in the break room', 1, [], [
        ['There is free coffee in the [break room].', '茶水間有免費咖啡。'],
        ["Let's have lunch in the [break room] today.", '我們今天在茶水間吃午餐吧。'],
      ]],
      ['name tag', 'ˋnem ˏtæg', 'n.', '名牌', 'wear a name tag', 1, [], [
        ['Please wear your [name tag] during the conference.', '研討會期間請配戴名牌。'],
        ['Visitors must pick up a [name tag] at reception.', '訪客必須到接待處領取名牌。'],
      ]],
      ['courtesy', 'ˋkɝtəsɪ', 'n.', '禮貌', 'common courtesy', 2, ['courteous', 'courteously'], [
        ['It is common [courtesy] to reply to emails promptly.', '迅速回覆電子郵件是基本禮貌。'],
        ['Staff should treat every caller with [courtesy].', '員工應該禮貌地對待每一位來電者。'],
      ]],
    ],
  },
  {
    id: 'education', track: 'toeic', name: '教育訓練', icon: '🎓', words: [
      ['certification', 'ˏsɝtɪfəˋkeʃən', 'n.', '認證', 'professional certification', 2, ['certify', 'certified'], [
        ['She earned her [certification] in project management last year.', '她去年取得了專案管理認證。'],
        ['This job requires a valid safety [certification].', '這份工作需要有效的安全認證。'],
      ]],
      ['course', 'kors', 'n.', '課程', 'take a course', 1, [], [
        ["I'm taking an online [course] in accounting.", '我正在上一門線上會計課。'],
        ['The [course] lasts six weeks.', '這門課為期六週。'],
      ]],
      ['curriculum', 'kəˋrɪkjələm', 'n.', '課程規劃', 'training curriculum', 3, [], [
        ['The training [curriculum] was updated this year.', '訓練課程規劃今年更新了。'],
        ['The [curriculum] covers both theory and practice.', '這套課程涵蓋理論和實務。'],
      ]],
      ['tuition', 'tjuˋɪʃən', 'n.', '學費', 'tuition fees', 2, [], [
        ['The company will pay your [tuition] if you pass the course.', '如果你通過這門課，公司會支付你的學費。'],
        ['[Tuition] has risen by five percent this year.', '今年學費漲了百分之五。'],
      ]],
      ['scholarship', 'ˋskɑlɚˏʃɪp', 'n.', '獎學金', 'win a scholarship', 2, ['scholar', 'scholarly'], [
        ['She won a [scholarship] to study in Australia.', '她獲得獎學金到澳洲念書。'],
        ['The [scholarship] covers all tuition and books.', '這份獎學金涵蓋所有學費和書錢。'],
      ]],
      ['degree', 'dɪˋgri', 'n.', '學位', "a bachelor's degree", 1, [], [
        ['Applicants must have a [degree] in engineering.', '應徵者必須具備工程學位。'],
        ["She is working toward a master's [degree] at night.", '她晚上在進修碩士學位。'],
      ]],
      ['diploma', 'dɪˋplomə', 'n.', '文憑', 'high school diploma', 2, ['diplomat', 'diplomatic'], [
        ['A high school [diploma] is required for this position.', '這個職位需要高中文憑。'],
        ['She received her [diploma] at the graduation ceremony.', '她在畢業典禮上領到了文憑。'],
      ]],
      ['graduate', 'ˋgrædʒʊɪt', 'n./v.', '畢業生；畢業', 'a recent graduate', 1, ['graduation', 'graduated'], [
        ['She is a [graduate] of the University of Sydney.', '她是雪梨大學的畢業生。'],
        ['The company hires at least one new [graduate] every year.', '公司每年至少會雇用一位應屆畢業生。'],
      ]],
      ['major', 'ˋmedʒɚ', 'n.', '主修', 'major in', 1, ['majority', 'majorly'], [
        ['What was your [major] in college?', '你大學主修什麼？'],
        ['Her [major] was economics, but she works in marketing.', '她主修經濟，但在行銷部門工作。'],
      ]],
      ['instructor', 'ɪnˋstrʌktɚ', 'n.', '講師', 'a yoga instructor', 1, ['instruct', 'instructive'], [
        ['The [instructor] explained each step clearly.', '講師把每個步驟都解釋得很清楚。'],
        ['Our [instructor] has ten years of teaching experience.', '我們的講師有十年的教學經驗。'],
      ]],
      ['trainee', 'treˋni', 'n.', '受訓者', 'management trainee', 2, ['train', 'trained'], [
        ['Each [trainee] is assigned a mentor for the first month.', '每位受訓者第一個月都會被分配一位指導員。'],
        ['The new [trainee] will shadow a senior clerk this week.', '新來的受訓者這週會跟著一位資深職員學習。'],
      ]],
      ['module', 'ˋmɑdʒʊl', 'n.', '單元；模組', 'training module', 3, ['modular', 'modulate'], [
        ['Please complete the first [module] before Friday.', '請在星期五前完成第一個單元。'],
        ['Each [module] ends with a short quiz.', '每個單元最後都有一個小測驗。'],
      ]],
      ['e-learning', 'ˋiˏlɝnɪŋ', 'n.', '線上學習', 'e-learning platform', 2, [], [
        ['Staff can complete safety training on our [e-learning] platform.', '員工可以在我們的線上學習平台完成安全訓練。'],
        ['[E-learning] lets employees study at their own pace.', '線上學習讓員工可以依照自己的步調學習。'],
      ]],
      ['exam', 'ɪgˋzæm', 'n.', '考試', 'pass an exam', 1, [], [
        ['I have to study for the certification [exam].', '我得準備認證考試。'],
        ['She passed the [exam] on her first try.', '她第一次就通過了考試。'],
      ]],
      ['semester', 'səˋmɛstɚ', 'n.', '學期', 'the fall semester', 1, [], [
        ['Classes for the fall [semester] begin in September.', '秋季學期的課九月開始。'],
        ["I'm taking four courses this [semester].", '我這學期修四門課。'],
      ]],
      ['faculty', 'ˋfækl̩tɪ', 'n.', '全體教職員', 'faculty members', 3, [], [
        ['All [faculty] members must attend the meeting.', '全體教職員都必須出席會議。'],
        ['The [faculty] includes experts from several countries.', '教職員中有來自好幾個國家的專家。'],
      ]],
      ['alumni', 'əˋlʌmnaɪ', 'n.', '校友（複數）', 'alumni association', 3, ['alumnus', 'alumna'], [
        ['Many [alumni] return for the annual reunion.', '很多校友回來參加年度校友會。'],
        ['Several [alumni] now work at our company.', '有幾位校友現在在我們公司工作。'],
      ]],
      ['academic', 'ˏækəˋdɛmɪk', 'adj.', '學術的', 'academic background', 2, ['academically', 'academia'], [
        ['Please list your [academic] qualifications on the form.', '請在表格上列出你的學歷資格。'],
        ['She has a strong [academic] record.', '她的學業成績很優秀。'],
      ]],
      ['vocational', 'voˋkeʃənl̩', 'adj.', '職業的；技職的', 'vocational training', 3, ['vocation', 'vocationally'], [
        ['He completed a [vocational] course in welding.', '他完成了焊接的職業訓練課程。'],
        ['The government funds [vocational] schools for young people.', '政府資助給年輕人的技職學校。'],
      ]],
      ['skill set', 'ˋskɪl ˏsɛt', 'n.', '技能組合', 'a broad skill set', 2, [], [
        ['Her [skill set] is perfect for this role.', '她的技能組合非常適合這個職位。'],
        ['The training will help you expand your [skill set].', '這個訓練會幫助你擴展技能。'],
      ]],
      ['refresher course', 'rɪˋfrɛʃɚ ˏkors', 'n.', '進修課程', 'take a refresher course', 3, [], [
        ['All drivers must take a safety [refresher course] every two years.', '所有司機每兩年都必須上一次安全進修課程。'],
        ['I signed up for a [refresher course] in Excel.', '我報名了 Excel 的進修課程。'],
      ]],
      ['qualification', 'ˏkwɑləfəˋkeʃən', 'n.', '資格', 'professional qualification', 2, ['qualify', 'qualified'], [
        ['A teaching [qualification] is required for this role.', '這個職位需要教師資格。'],
        ['Do you have the right [qualification] for this job?', '你具備這份工作需要的資格嗎？'],
      ]],
      ['textbook', 'ˋtɛkstˏbʊk', 'n.', '教科書', 'a required textbook', 1, [], [
        ['Please bring your [textbook] to every class.', '每堂課請帶教科書。'],
        ['The [textbook] for this course costs 80 dollars.', '這門課的教科書要 80 美元。'],
      ]],
      ['transcript', 'ˋtrænˏskrɪpt', 'n.', '成績單；逐字稿', 'an official transcript', 3, ['transcribe', 'transcribed'], [
        ['Please send an official [transcript] from your university.', '請寄一份你大學的正式成績單。'],
        ['A [transcript] of the interview will be emailed to you.', '訪談的逐字稿會用電子郵件寄給你。'],
      ]],
      ['coursework', 'ˋkorsˏwɝk', 'n.', '課業', 'complete coursework', 2, [], [
        ['Trainees must finish all [coursework] before the final exam.', '受訓者必須在期末考前完成所有課業。'],
        ['The [coursework] includes weekly reports and a group project.', '課業包括每週報告和一個小組專題。'],
      ]],
    ],
  },
  {
    id: 'hotel', track: 'toeic', name: '飯店與旅宿業', icon: '🛎️', words: [
      ['concierge', 'ˏkɑnsɪˋɛrʒ', 'n.', '禮賓服務員', 'ask the concierge', 3, [], [
        ['The [concierge] booked us a table at a nearby restaurant.', '禮賓服務員幫我們在附近的餐廳訂了位。'],
        ['Ask the [concierge] if you need theater tickets.', '如果需要戲票，可以問禮賓服務員。'],
      ]],
      ['front desk', 'ˋfrʌnt ˏdɛsk', 'n.', '櫃檯', 'call the front desk', 1, [], [
        ['Please leave your room key at the [front desk].', '請把房間鑰匙留在櫃檯。'],
        ['Call the [front desk] if you need extra towels.', '如果需要多的毛巾，請打電話給櫃檯。'],
      ]],
      ['housekeeping', 'ˋhaʊsˏkipɪŋ', 'n.', '房務部', 'call housekeeping', 2, [], [
        ['[Housekeeping] cleans the rooms every morning.', '房務部每天早上打掃房間。'],
        ['I called [housekeeping] to ask for another pillow.', '我打電話給房務部要一個枕頭。'],
      ]],
      ['room service', 'rum ˋsɝvɪs', 'n.', '客房服務', 'order room service', 1, [], [
        ['We ordered [room service] because we were too tired to go out.', '我們太累不想出門，所以叫了客房服務。'],
        ['[Room service] is available 24 hours a day.', '客房服務 24 小時提供。'],
      ]],
      ['wake-up call', 'ˋwekˏʌp ˏkɔl', 'n.', '晨喚服務', 'request a wake-up call', 2, [], [
        ['Could I have a [wake-up call] at six tomorrow?', '明天六點可以給我晨喚服務嗎？'],
        ['The hotel forgot my [wake-up call], so I almost missed my flight.', '飯店忘了叫我起床，害我差點錯過班機。'],
      ]],
      ['deluxe', 'dɪˋlʌks', 'adj.', '豪華的', 'a deluxe suite', 2, [], [
        ['We upgraded to a [deluxe] room with a sea view.', '我們升等到有海景的豪華客房。'],
        ['The [deluxe] package includes breakfast and a spa visit.', '豪華方案包含早餐和一次水療。'],
      ]],
      ['booking', 'ˋbʊkɪŋ', 'n.', '預訂', 'make a booking', 1, ['booked', 'bookable'], [
        ["I'd like to make a [booking] for two nights.", '我想預訂兩晚。'],
        ['Your [booking] has been confirmed.', '你的預訂已經確認了。'],
      ]],
      ['single room', 'ˋsɪŋgl̩ ˏrum', 'n.', '單人房', 'book a single room', 1, [], [
        ['A [single room] costs 120 dollars per night.', '單人房一晚 120 美元。'],
        ['I reserved a [single room] for the conference.', '我為了研討會訂了一間單人房。'],
      ]],
      ['double room', 'ˋdʌbl̩ ˏrum', 'n.', '雙人房', 'a double room with a view', 1, [], [
        ['Do you have a [double room] available for Friday night?', '星期五晚上有空的雙人房嗎？'],
        ['The [double room] has a king-size bed.', '這間雙人房有一張特大雙人床。'],
      ]],
      ['valet', 'væˋle', 'n.', '代客泊車員', 'valet parking', 3, [], [
        ['Leave your car with the [valet] at the entrance.', '把車交給入口的代客泊車員就好。'],
        ['The [valet] will bring your car around in five minutes.', '泊車員五分鐘內會把你的車開過來。'],
      ]],
      ['bellhop', 'ˋbɛlˏhɑp', 'n.', '行李員', 'tip the bellhop', 3, [], [
        ['The [bellhop] carried our bags up to the room.', '行李員把我們的行李提到房間。'],
        ["It's customary to tip the [bellhop] in some countries.", '在一些國家，給行李員小費是慣例。'],
      ]],
      ['guest', 'gɛst', 'n.', '客人；房客', 'hotel guest', 1, [], [
        ['Breakfast is free for every hotel [guest].', '每位房客都可以免費享用早餐。'],
        ['Each [guest] receives a welcome drink on arrival.', '每位客人抵達時都會拿到一杯迎賓飲料。'],
      ]],
      ['hospitality', 'ˏhɑspɪˋtælətɪ', 'n.', '款待；餐旅業', 'the hospitality industry', 2, ['hospitable', 'hospitably'], [
        ['[Hospitality] is one of the largest employers in Queensland.', '餐旅業是昆士蘭最大的雇主之一。'],
        ['Thank you for your warm [hospitality] during our visit.', '謝謝你們在我們拜訪期間的熱情款待。'],
      ]],
      ['inn', 'ɪn', 'n.', '小旅館', 'a country inn', 2, [], [
        ['We stayed at a small [inn] near the lake.', '我們住在湖邊的一家小旅館。'],
        ['The old [inn] has only eight rooms.', '這間老旅館只有八間房。'],
      ]],
      ['resort', 'rɪˋzɔrt', 'n.', '度假村', 'a beach resort', 1, [], [
        ['The company retreat will be held at a beach [resort].', '公司的員工旅遊會在海灘度假村舉行。'],
        ['The [resort] offers golf, tennis and a private beach.', '度假村提供高爾夫、網球和私人海灘。'],
      ]],
      ['bed and breakfast', 'ˋbɛd ənd ˋbrɛkfəst', 'n.', '民宿', 'stay at a bed and breakfast', 2, [], [
        ['We stayed at a cozy [bed and breakfast] in the countryside.', '我們住在鄉間一間溫馨的民宿。'],
        ['The [bed and breakfast] serves homemade jam every morning.', '這間民宿每天早上都提供自製果醬。'],
      ]],
      ['minibar', 'ˋmɪnɪˏbɑr', 'n.', '迷你吧', 'charges for the minibar', 2, [], [
        ['Drinks from the [minibar] will be added to your bill.', '迷你吧的飲料會加到你的帳單上。'],
        ['The [minibar] is restocked every day.', '迷你吧每天都會補貨。'],
      ]],
      ['key card', 'ˋki ˏkɑrd', 'n.', '房卡', 'a room key card', 1, [], [
        ['My [key card] stopped working, so I went back to the front desk.', '我的房卡不能用了，所以我回到櫃檯。'],
        ['You need your [key card] to use the elevator.', '搭電梯需要用房卡。'],
      ]],
      ['porter', 'ˋportɚ', 'n.', '搬運工', 'ask a porter', 2, [], [
        ['A [porter] will take your luggage to your room.', '搬運員會把你的行李送到房間。'],
        ['The [porter] helped us load the bags into the taxi.', '搬運員幫我們把行李搬上計程車。'],
      ]],
      ['linen', 'ˋlɪnɪn', 'n.', '床單毛巾類', 'bed linen', 2, [], [
        ['Housekeeping changes the [linen] every two days.', '房務人員每兩天換一次床單毛巾。'],
        ['The hotel uses high-quality cotton [linen].', '飯店使用高品質的棉質寢具。'],
      ]],
      ['towel', 'ˋtaʊəl', 'n.', '毛巾', 'a clean towel', 1, [], [
        ['Could you bring me a clean [towel], please?', '可以麻煩給我一條乾淨的毛巾嗎？'],
        ['Please leave the used [towel] on the bathroom floor.', '請把用過的毛巾放在浴室地板上。'],
      ]],
      ['guest house', 'ˋgɛst ˏhaʊs', 'n.', '招待所；民宿', 'stay at a guest house', 2, [], [
        ['Visiting engineers stay at the company [guest house].', '來訪的工程師住在公司的招待所。'],
        ['The [guest house] is a short walk from the train station.', '這間民宿離火車站走路很近。'],
      ]],
      ['check-in counter', 'ˋtʃɛkˏɪn ˋkaʊntɚ', 'n.', '報到櫃檯', 'at the check-in counter', 1, [], [
        ['Please show your passport at the [check-in counter].', '請在報到櫃檯出示護照。'],
        ['There was a long line at the [check-in counter].', '報到櫃檯前大排長龍。'],
      ]],
      ['late checkout', 'ˋlet ˋtʃɛkˏaʊt', 'n.', '延遲退房', 'request a late checkout', 2, [], [
        ['Can I request a [late checkout] at 2 p.m.?', '我可以申請延遲到下午兩點退房嗎？'],
        ['Members can enjoy a free [late checkout].', '會員可以享有免費延遲退房。'],
      ]],
      ['no-show', 'ˋnoˏʃo', 'n.', '預約未到的人', 'charge a no-show fee', 3, [], [
        ['The hotel charges one night for each [no-show].', '預約未到的客人，飯店會收一晚的費用。'],
        ['If you cancel late, you will be treated as a [no-show].', '如果太晚取消，會被視為預約未到。'],
      ]],
    ],
  },
  {
    id: 'airline', track: 'toeic', name: '航空業', icon: '🛫', words: [
      ['airline', 'ˋɛrˏlaɪn', 'n.', '航空公司', 'a budget airline', 1, [], [
        ['Which [airline] are you flying with?', '你搭哪一家航空公司？'],
        ['The [airline] offers free meals on international flights.', '這家航空公司在國際航班上提供免費餐點。'],
      ]],
      ['aircraft', 'ˋɛrˏkræft', 'n.', '飛機', 'board the aircraft', 2, [], [
        ['The [aircraft] was delayed because of a technical problem.', '飛機因為技術問題延誤了。'],
        ['Smoking is not allowed anywhere on the [aircraft].', '飛機上任何地方都禁止吸菸。'],
      ]],
      ['cabin crew', 'ˋkæbɪn ˏkru', 'n.', '機組人員', 'cabin crew members', 2, [], [
        ['The [cabin crew] will now serve drinks.', '機組人員現在會提供飲料。'],
        ['Please follow the instructions of the [cabin crew].', '請遵守機組人員的指示。'],
      ]],
      ['captain', 'ˋkæptɪn', 'n.', '機長；船長', 'the captain speaking', 1, [], [
        ['This is your [captain] speaking.', '我是本班機的機長。'],
        ['The [captain] has turned on the seat belt sign.', '機長已經打開安全帶指示燈。'],
      ]],
      ['runway', 'ˋrʌnˏwe', 'n.', '跑道', 'on the runway', 2, [], [
        ['Our plane waited on the [runway] for twenty minutes.', '我們的飛機在跑道上等了二十分鐘。'],
        ['The airport is building a second [runway].', '機場正在興建第二條跑道。'],
      ]],
      ['takeoff', 'ˋtekˏɔf', 'n.', '起飛', 'during takeoff', 1, [], [
        ['Please turn off your laptop during [takeoff].', '起飛時請關閉筆電。'],
        ['[Takeoff] was delayed due to heavy fog.', '因為濃霧，起飛延誤了。'],
      ]],
      ['landing', 'ˋlændɪŋ', 'n.', '降落', 'a smooth landing', 1, [], [
        ['The pilot made a smooth [landing] in the rain.', '機師在雨中平穩降落。'],
        ['Please remain seated until after [landing].', '降落後請留在座位上。'],
      ]],
      ['turbulence', 'ˋtɝbjələns', 'n.', '亂流', 'experience turbulence', 3, ['turbulent', 'turbulently'], [
        ['We experienced some [turbulence] over the ocean.', '我們在海上遇到了一些亂流。'],
        ['Please return to your seat due to [turbulence].', '因為亂流，請回到座位。'],
      ]],
      ['overhead bin', 'ˋovɚˏhɛd ˏbɪn', 'n.', '座位上方置物櫃', 'put your bag in the overhead bin', 2, [], [
        ['Please place your carry-on bag in the [overhead bin].', '請把隨身行李放在上方置物櫃。'],
        ['The [overhead bin] above my seat was already full.', '我座位上方的置物櫃已經滿了。'],
      ]],
      ['seat belt', 'ˋsit ˏbɛlt', 'n.', '安全帶', 'fasten your seat belt', 1, [], [
        ['Please fasten your [seat belt] while seated.', '入座時請繫好安全帶。'],
        ['The [seat belt] sign has been turned off.', '安全帶指示燈已經熄滅。'],
      ]],
      ['aisle seat', 'ˋaɪl ˏsit', 'n.', '走道座位', 'request an aisle seat', 1, [], [
        ['I always ask for an [aisle seat] on long flights.', '長途飛行時我總是要走道座位。'],
        ['Is there an [aisle seat] available near the front?', '前面有空的走道座位嗎？'],
      ]],
      ['window seat', 'ˋwɪndo ˏsit', 'n.', '靠窗座位', 'get a window seat', 1, [], [
        ['I booked a [window seat] so I can see the view.', '我訂了靠窗座位，這樣可以看風景。'],
        ['Would you like a [window seat] or an aisle seat?', '你要靠窗還是靠走道的座位？'],
      ]],
      ['gate', 'get', 'n.', '登機門', 'boarding gate', 1, [], [
        ['Flight 302 will depart from [gate] 15.', '302 班機將從 15 號登機門出發。'],
        ['The [gate] closes twenty minutes before departure.', '登機門在起飛前二十分鐘關閉。'],
      ]],
      ['standby', 'ˋstændˏbaɪ', 'n.', '候補', 'on standby', 2, [], [
        ['The flight was full, so I was put on [standby].', '班機客滿，所以我被排進候補。'],
        ['[Standby] passengers will be called after everyone has boarded.', '候補旅客會在所有人登機後被叫到。'],
      ]],
      ['overbooked', 'ˋovɚˏbʊkt', 'adj.', '超額預訂的', 'an overbooked flight', 3, ['overbook', 'overbooking'], [
        ['The flight was [overbooked], so some passengers took a later one.', '班機超賣，所以有些乘客改搭較晚的班次。'],
        ['Because the hotel was [overbooked], we were moved to another property.', '因為飯店超額預訂，我們被安排到另一間飯店。'],
      ]],
      ['flight attendant', 'ˋflaɪt əˋtɛndənt', 'n.', '空服員', 'ask a flight attendant', 1, [], [
        ['A [flight attendant] brought me a blanket.', '一位空服員拿了毯子給我。'],
        ['Press the call button if you need a [flight attendant].', '需要空服員時請按服務鈴。'],
      ]],
      ['cockpit', 'ˋkɑkˏpɪt', 'n.', '駕駛艙', 'the cockpit door', 3, [], [
        ['Passengers are not allowed to enter the [cockpit].', '乘客不得進入駕駛艙。'],
        ['The pilots checked the instruments in the [cockpit].', '機師在駕駛艙檢查儀表。'],
      ]],
      ['airfare', 'ˋɛrˏfɛr', 'n.', '機票價格', 'cheap airfare', 2, [], [
        ['The company will cover your [airfare] and hotel.', '公司會支付你的機票和住宿。'],
        ['[Airfare] usually goes up during the holidays.', '假期期間機票通常會漲價。'],
      ]],
      ['baggage allowance', 'ˋbægɪdʒ əˋlaʊəns', 'n.', '行李限額', 'check your baggage allowance', 2, [], [
        ['The [baggage allowance] for economy class is 23 kilograms.', '經濟艙的行李限額是 23 公斤。'],
        ['Please check your [baggage allowance] before you pack.', '打包前請先確認行李限額。'],
      ]],
      ['excess baggage', 'ˋɛkˏsɛs ˋbægɪdʒ', 'n.', '超重行李', 'pay for excess baggage', 2, [], [
        ['I had to pay 60 dollars for [excess baggage].', '我付了 60 美元的超重行李費。'],
        ['[Excess baggage] fees can be paid online in advance.', '超重行李費可以事先在網路上支付。'],
      ]],
      ['duty-free', 'ˋdjutɪˋfri', 'adj.', '免稅的', 'duty-free shopping', 1, [], [
        ['I bought some perfume at the [duty-free] shop.', '我在免稅店買了香水。'],
        ['[Duty-free] goods must be carried in a sealed bag.', '免稅商品必須裝在密封袋裡。'],
      ]],
      ['security check', 'sɪˋkjʊrətɪ ˏtʃɛk', 'n.', '安全檢查', 'go through the security check', 1, [], [
        ['Please remove your laptop at the [security check].', '安檢時請把筆電拿出來。'],
        ['The [security check] took almost an hour.', '安全檢查花了將近一小時。'],
      ]],
      ['departure lounge', 'dɪˋpɑrtʃɚ ˏlaʊndʒ', 'n.', '候機室', 'wait in the departure lounge', 2, [], [
        ['We waited in the [departure lounge] for our delayed flight.', '我們在候機室等延誤的班機。'],
        ['The [departure lounge] has free Wi-Fi and charging stations.', '候機室有免費 Wi-Fi 和充電站。'],
      ]],
      ['nonstop', 'ˏnɑnˋstɑp', 'adj.', '直飛的', 'a nonstop flight', 2, [], [
        ['There is a [nonstop] flight from Taipei to Brisbane.', '台北有直飛布里斯本的班機。'],
        ['A [nonstop] flight costs more but saves time.', '直飛班機比較貴，但能省時間。'],
      ]],
      ['boarding time', 'ˋbordɪŋ ˏtaɪm', 'n.', '登機時間', 'check the boarding time', 1, [], [
        ['The [boarding time] is printed on your boarding pass.', '登機時間印在登機證上。'],
        ['Please be at the gate before the [boarding time].', '請在登機時間前抵達登機門。'],
      ]],
    ],
  },
  {
    id: 'arts', track: 'toeic', name: '藝文與娛樂', icon: '🎭', words: [
      ['exhibit', 'ɪgˋzɪbɪt', 'n./v.', '展覽；展出', 'exhibit artwork', 2, ['exhibition', 'exhibitor'], [
        ['The gallery will [exhibit] her paintings next month.', '畫廊下個月會展出她的畫作。'],
        ['Several local companies will [exhibit] their products at the fair.', '幾家本地公司會在展覽會上展示產品。'],
      ]],
      ['gallery', 'ˋgælərɪ', 'n.', '畫廊；美術館', 'an art gallery', 1, [], [
        ['The [gallery] is open until 8 p.m. on Fridays.', '美術館星期五開到晚上八點。'],
        ['Her photos are on display at a [gallery] downtown.', '她的照片在市中心的一間畫廊展出。'],
      ]],
      ['museum', 'mjuˋziəm', 'n.', '博物館', 'a science museum', 1, [], [
        ['The [museum] is closed on Mondays.', '博物館星期一休館。'],
        ['Admission to the [museum] is free for students.', '學生可以免費進入博物館。'],
      ]],
      ['artwork', 'ˋɑrtˏwɝk', 'n.', '藝術品', 'original artwork', 1, [], [
        ['The hotel lobby displays [artwork] by local painters.', '飯店大廳展示本地畫家的作品。'],
        ['Please do not touch the [artwork].', '請勿觸摸藝術品。'],
      ]],
      ['curator', 'kjʊˋretɚ', 'n.', '策展人', 'museum curator', 3, ['curated', 'curation'], [
        ['The [curator] chose every painting in the show.', '展覽中的每一幅畫都是策展人挑的。'],
        ['She works as a [curator] at the city museum.', '她在市立博物館擔任策展人。'],
      ]],
      ['concert', 'ˋkɑnsɚt', 'n.', '音樂會', 'an outdoor concert', 1, [], [
        ['We have tickets for the [concert] on Saturday.', '我們有星期六音樂會的票。'],
        ['The [concert] was cancelled because of the storm.', '音樂會因為暴風雨取消了。'],
      ]],
      ['theater', 'ˋθiətɚ', 'n.', '劇院', 'a movie theater', 1, ['theatrical', 'theatrically'], [
        ['We have tickets for a show at the [theater] tonight.', '我們有今晚劇院演出的票。'],
        ['The [theater] seats about 800 people.', '這間劇院大約可容納 800 人。'],
      ]],
      ['box office', 'bɑks ˋɔfɪs', 'n.', '售票處', 'pick up tickets at the box office', 2, [], [
        ['You can pick up your tickets at the [box office].', '你可以到售票處取票。'],
        ['The [box office] opens one hour before the show.', '售票處在演出前一小時開門。'],
      ]],
      ['matinee', 'ˏmætn̩ˋe', 'n.', '日場演出', 'a Sunday matinee', 3, [], [
        ['Tickets for the [matinee] are cheaper.', '日場演出的票比較便宜。'],
        ['We saw the 2 p.m. [matinee] of the new musical.', '我們看了新音樂劇下午兩點的日場。'],
      ]],
      ['intermission', 'ˏɪntɚˋmɪʃən', 'n.', '中場休息', 'during the intermission', 3, ['intermittent', 'intermittently'], [
        ['Drinks are served in the lobby during the [intermission].', '中場休息時大廳有提供飲料。'],
        ['There is a 20-minute [intermission] after the first act.', '第一幕結束後有 20 分鐘的中場休息。'],
      ]],
      ['orchestra', 'ˋɔrkɪstrə', 'n.', '管弦樂團', 'a symphony orchestra', 2, ['orchestral', 'orchestrate'], [
        ['The city [orchestra] performs every Friday night.', '市立管弦樂團每週五晚上演出。'],
        ['She plays the violin in a local [orchestra].', '她在本地的管弦樂團拉小提琴。'],
      ]],
      ['playwright', 'ˋpleˏraɪt', 'n.', '劇作家', 'an award-winning playwright', 3, [], [
        ['The [playwright] attended the opening night.', '劇作家出席了首演之夜。'],
        ['The play was written by a young Australian [playwright].', '這齣戲是一位年輕的澳洲劇作家寫的。'],
      ]],
      ['sculpture', 'ˋskʌlptʃɚ', 'n.', '雕塑', 'a bronze sculpture', 2, ['sculptor', 'sculpted'], [
        ['The park features a large [sculpture] made of recycled metal.', '公園裡有一座用回收金屬做的大型雕塑。'],
        ['The museum bought a [sculpture] by a famous artist.', '博物館買了一件知名藝術家的雕塑。'],
      ]],
      ['portrait', 'ˋportret', 'n.', '肖像', 'paint a portrait', 2, ['portray', 'portrayed'], [
        ['A [portrait] of the founder hangs in the lobby.', '創辦人的肖像掛在大廳。'],
        ['The artist painted a [portrait] of the CEO.', '畫家畫了一幅執行長的肖像。'],
      ]],
      ['festival', 'ˋfɛstəvl̩', 'n.', '節慶', 'a film festival', 1, [], [
        ['The film [festival] runs for ten days.', '影展為期十天。'],
        ['Thousands of people attend the music [festival] every summer.', '每年夏天有數千人參加音樂節。'],
      ]],
      ['guided tour', 'ˋgaɪdɪd ˏtʊr', 'n.', '導覽', 'join a guided tour', 1, [], [
        ['The museum offers a free [guided tour] at 11 a.m.', '博物館早上十一點有免費導覽。'],
        ['We joined a [guided tour] of the old factory.', '我們參加了舊工廠的導覽。'],
      ]],
      ['landmark', 'ˋlændˏmɑrk', 'n.', '地標', 'a famous landmark', 2, [], [
        ["The Opera House is Sydney's most famous [landmark].", '雪梨歌劇院是雪梨最有名的地標。'],
        ['The hotel is close to every major [landmark] in the city.', '這間飯店離市內各大地標都很近。'],
      ]],
      ['heritage', 'ˋhɛrətɪdʒ', 'n.', '遺產；傳統', 'cultural heritage', 3, ['inherit', 'inherited'], [
        ['The old town is a World [Heritage] site.', '這座古城是世界遺產。'],
        ["The festival celebrates the city's Chinese [heritage].", '這個節慶慶祝這座城市的華人傳統。'],
      ]],
      ['cultural', 'ˋkʌltʃərəl', 'adj.', '文化的', 'cultural events', 2, ['culturally', 'cultured'], [
        ['The city offers many [cultural] activities in summer.', '這座城市夏天有很多文化活動。'],
        ['The museum is an important [cultural] center.', '這間博物館是重要的文化中心。'],
      ]],
      ['documentary', 'ˏdɑkjəˋmɛntərɪ', 'n.', '紀錄片', 'watch a documentary', 2, ['documented', 'documentation'], [
        ['We watched a [documentary] about the Great Barrier Reef.', '我們看了一部關於大堡礁的紀錄片。'],
        ['The [documentary] won an award at the film festival.', '這部紀錄片在影展得了獎。'],
      ]],
      ['performer', 'pɚˋfɔrmɚ', 'n.', '表演者', 'a street performer', 1, ['perform', 'performed'], [
        ['Each [performer] will be on stage for ten minutes.', '每位表演者會在台上表演十分鐘。'],
        ['The street [performer] drew a large crowd.', '那位街頭藝人吸引了一大群人。'],
      ]],
      ['rehearsal', 'rɪˋhɝsl̩', 'n.', '排練', 'a dress rehearsal', 2, ['rehearse', 'rehearsed'], [
        ['The final [rehearsal] is on Thursday evening.', '最後一次排練在星期四晚上。'],
        ['The cast will have a [rehearsal] before the show.', '演員們在演出前會排練一次。'],
      ]],
      ['applause', 'əˋplɔz', 'n.', '掌聲', 'a round of applause', 2, ['applaud', 'applauded'], [
        ['The audience broke into [applause] at the end.', '結束時觀眾爆出掌聲。'],
        ["Let's give a warm round of [applause] to our speaker.", '讓我們給講者熱烈的掌聲。'],
      ]],
      ['encore', 'ˋɑnˏkor', 'n.', '安可', 'play an encore', 3, [], [
        ['The crowd cheered until the band played an [encore].', '觀眾一直歡呼，直到樂團演奏安可曲。'],
        ['For her [encore], the singer chose an old folk song.', '歌手安可時選了一首老民謠。'],
      ]],
      ['screening', 'ˋskrinɪŋ', 'n.', '放映；篩檢', 'a film screening', 3, ['screened', 'screens'], [
        ['There will be a [screening] of the film at 7 p.m.', '晚上七點會放映這部電影。'],
        ['All new employees must complete a health [screening].', '所有新進員工都必須完成健康篩檢。'],
      ]],
    ],
  },
  {
    id: 'fitness', track: 'toeic', name: '健身與運動', icon: '🏋️', words: [
      ['gym', 'dʒɪm', 'n.', '健身房', 'go to the gym', 1, [], [
        ['I go to the [gym] three times a week.', '我一週去健身房三次。'],
        ['The hotel [gym] is open 24 hours.', '飯店的健身房 24 小時開放。'],
      ]],
      ['workout', 'ˋwɝkˏaʊt', 'n.', '運動；鍛鍊', 'a quick workout', 1, [], [
        ['I do a quick [workout] before breakfast.', '我早餐前會做個簡短的運動。'],
        ['That [workout] left me exhausted.', '那次鍛鍊讓我筋疲力盡。'],
      ]],
      ['personal trainer', 'ˋpɝsn̩l̩ ˋtrenɚ', 'n.', '私人教練', 'hire a personal trainer', 1, [], [
        ['My [personal trainer] designed a plan just for me.', '我的私人教練為我量身設計了一套計畫。'],
        ['The gym offers one free session with a [personal trainer].', '健身房提供一堂免費的私人教練課。'],
      ]],
      ['athlete', 'ˋæθlit', 'n.', '運動員', 'a professional athlete', 2, ['athletic', 'athletics'], [
        ['The [athlete] trained for years to reach the Olympics.', '這位運動員訓練多年才打進奧運。'],
        ['Our company sponsors a young [athlete] from Perth.', '我們公司贊助一位來自伯斯的年輕運動員。'],
      ]],
      ['tournament', 'ˋtɝnəmənt', 'n.', '錦標賽', 'a tennis tournament', 2, [], [
        ['Our team won the company golf [tournament].', '我們隊贏得了公司高爾夫錦標賽。'],
        ['The [tournament] will be held in Melbourne in January.', '錦標賽將於一月在墨爾本舉行。'],
      ]],
      ['championship', 'ˋtʃæmpɪənˏʃɪp', 'n.', '冠軍賽', 'win the championship', 2, [], [
        ['The local team won the national [championship].', '本地球隊贏得了全國冠軍。'],
        ['Tickets for the [championship] sold out in an hour.', '冠軍賽的票一小時就賣完了。'],
      ]],
      ['league', 'lig', 'n.', '聯盟；聯賽', 'join a league', 2, [], [
        ['Our office joined a local soccer [league].', '我們辦公室加入了當地的足球聯賽。'],
        ['The team finished first in the [league] this year.', '這支球隊今年在聯賽中拿到第一。'],
      ]],
      ['coach', 'kotʃ', 'n.', '教練', 'a basketball coach', 1, [], [
        ['The [coach] made the players run extra laps.', '教練要球員多跑幾圈。'],
        ['She works as a swimming [coach] on weekends.', '她週末擔任游泳教練。'],
      ]],
      ['stadium', 'ˋstedɪəm', 'n.', '體育場', 'a football stadium', 1, [], [
        ['The [stadium] holds about 50,000 fans.', '這座體育場可容納約五萬名球迷。'],
        ['Take the free shuttle bus to the [stadium].', '搭免費接駁車到體育場。'],
      ]],
      ['marathon', 'ˋmærəˏθɑn', 'n.', '馬拉松', 'run a marathon', 1, [], [
        ['She is training to run her first [marathon].', '她正在為第一場馬拉松做訓練。'],
        ['The city [marathon] will close several roads on Sunday.', '城市馬拉松星期天會封閉幾條道路。'],
      ]],
      ['jog', 'dʒɑg', 'v.', '慢跑', 'jog in the park', 1, ['jogging', 'jogged'], [
        ['I like to [jog] along the beach before work.', '我喜歡上班前沿著海灘慢跑。'],
        ['She tries to [jog] three times a week.', '她盡量一週慢跑三次。'],
      ]],
      ['stretch', 'strɛtʃ', 'v.', '伸展', 'stretch your legs', 1, ['stretching', 'stretched'], [
        ['Remember to [stretch] before you run.', '跑步前記得伸展。'],
        ['It is important to [stretch] after a long workout.', '長時間運動後伸展很重要。'],
      ]],
      ['yoga', 'ˋjogə', 'n.', '瑜伽', 'do yoga', 1, [], [
        ['I do [yoga] every morning to relax.', '我每天早上做瑜伽放鬆。'],
        ['The gym offers free [yoga] classes for members.', '健身房為會員提供免費瑜伽課。'],
      ]],
      ['spectator', 'ˋspɛkˏtetɚ', 'n.', '觀眾', 'spectator seating', 3, ['spectacle', 'spectacular'], [
        ['Each [spectator] must show a ticket at the gate.', '每位觀眾都必須在入口出示門票。'],
        ['A [spectator] in the stands caught the ball.', '看台上的一位觀眾接住了球。'],
      ]],
      ['referee', 'ˏrɛfəˋri', 'n.', '裁判', 'the referee blew the whistle', 2, [], [
        ['The [referee] stopped the game because of the rain.', '裁判因為下雨暫停了比賽。'],
        ['The players argued with the [referee] about the goal.', '球員為了那一球和裁判爭論。'],
      ]],
      ['recreation', 'ˏrɛkrɪˋeʃən', 'n.', '娛樂；休閒', 'outdoor recreation', 2, ['recreational', 'recreate'], [
        ['Swimming is my favorite form of [recreation].', '游泳是我最喜歡的休閒方式。'],
        ['The town spends more on [recreation] every year.', '這個鎮每年在休閒設施上的花費都在增加。'],
      ]],
      ['outdoor', 'ˋaʊtˏdor', 'adj.', '戶外的', 'outdoor activities', 1, [], [
        ['The hotel has an [outdoor] pool.', '這間飯店有戶外泳池。'],
        ['The [outdoor] concert was moved inside because of rain.', '戶外音樂會因為下雨改到室內。'],
      ]],
      ['hiking', 'ˋhaɪkɪŋ', 'n.', '健行', 'go hiking', 1, ['hike', 'hiker'], [
        ['We went [hiking] in the Blue Mountains last weekend.', '我們上週末去藍山健行。'],
        ['[Hiking] is a popular weekend activity in Australia.', '健行是澳洲很受歡迎的週末活動。'],
      ]],
      ['cycling', 'ˋsaɪklɪŋ', 'n.', '騎自行車', 'go cycling', 1, ['cycle', 'cyclist'], [
        ['I go [cycling] along the river on weekends.', '我週末會沿著河邊騎腳踏車。'],
        ['[Cycling] to work saves both money and time.', '騎腳踏車上班既省錢又省時間。'],
      ]],
      ['swimming pool', 'ˋswɪmɪŋ ˏpul', 'n.', '游泳池', 'an indoor swimming pool', 1, [], [
        ['The [swimming pool] is closed for cleaning today.', '游泳池今天因為清潔而關閉。'],
        ['Our apartment building has a heated [swimming pool].', '我們的公寓大樓有溫水游泳池。'],
      ]],
      ['locker room', 'ˋlɑkɚ ˏrum', 'n.', '更衣室', 'in the locker room', 1, [], [
        ['You can change in the [locker room].', '你可以在更衣室換衣服。'],
        ['Please do not leave valuables in the [locker room].', '請勿把貴重物品留在更衣室。'],
      ]],
      ['warm up', 'wɔrm ʌp', 'v.', '暖身', 'warm up before exercise', 1, [], [
        ['Always [warm up] before you exercise.', '運動前一定要暖身。'],
        ['The players [warm up] on the field before each game.', '球員每場比賽前都在場上暖身。'],
      ]],
      ['cool down', 'kul daʊn', 'v.', '緩和運動', 'cool down after a run', 2, [], [
        ['Walk slowly for five minutes to [cool down] after your run.', '跑完步後慢走五分鐘做緩和運動。'],
        ['The instructor asked us to [cool down] with some light stretches.', '教練要我們做些輕鬆的伸展來緩和。'],
      ]],
      ['sportswear', 'ˋsportsˏwɛr', 'n.', '運動服', 'a sportswear brand', 2, [], [
        ['The store sells [sportswear] and running shoes.', '這家店賣運動服和跑鞋。'],
        ['Please wear [sportswear] to the team-building event.', '團隊活動請穿運動服。'],
      ]],
      ['fitness center', 'ˋfɪtnɪs ˋsɛntɚ', 'n.', '健身中心', 'a hotel fitness center', 1, [], [
        ['The [fitness center] is on the third floor.', '健身中心在三樓。'],
        ['Employees can use the [fitness center] for free.', '員工可以免費使用健身中心。'],
      ]],
    ],
  },
  {
    id: 'telecom', track: 'toeic', name: '電信與網路服務', icon: '📶', words: [
      ['telecommunications', 'ˏtɛləkəˏmjunəˋkeʃənz', 'n.', '電信', 'the telecommunications industry', 3, [], [
        ['The company has invested heavily in [telecommunications] infrastructure.', '這家公司在電信基礎建設上投入了大量資金。'],
        ['She works in the marketing department of a [telecommunications] firm.', '她在一家電信公司的行銷部門工作。'],
      ]],
      ['service provider', 'ˋsɝvɪs prəˋvaɪdɚ', 'n.', '服務供應商', 'switch service providers', 2, [], [
        ['We are switching to a new internet [service provider] next month.', '我們下個月要換一家新的網路服務供應商。'],
        ['Contact your [service provider] if the connection keeps dropping.', '如果連線一直中斷，請聯絡您的服務供應商。'],
      ]],
      ['mobile plan', 'ˋmobl̩ ˏplæn', 'n.', '手機方案', 'upgrade your mobile plan', 1, [], [
        ["The company pays for each employee's [mobile plan].", '公司幫每位員工支付手機方案的費用。'],
        ['I changed my [mobile plan] to one with more data.', '我把手機方案換成流量比較多的。'],
      ]],
      ['data plan', 'ˋdetə ˏplæn', 'n.', '網路流量方案', 'a monthly data plan', 1, [], [
        ['My [data plan] includes 20 GB per month.', '我的網路流量方案每月有 20 GB。'],
        ['Sales staff who travel often need a larger [data plan].', '常出差的業務人員需要流量比較大的方案。'],
      ]],
      ['signal', 'ˋsɪgnl̩', 'n.', '訊號', 'a weak signal', 1, ['signify', 'signaled'], [
        ['The [signal] is very weak in the basement meeting room.', '地下室會議室的訊號非常弱。'],
        ["I couldn't get a [signal] on the train, so I missed your call.", '我在火車上收不到訊號，所以漏接了你的電話。'],
      ]],
      ['roaming', 'ˋromɪŋ', 'n.', '漫遊', 'international roaming charges', 2, ['roam', 'roamed'], [
        ['International [roaming] charges can be very expensive.', '國際漫遊費可能非常昂貴。'],
        ['Turn off data [roaming] before your business trip.', '出差前請關閉數據漫遊。'],
      ]],
      ['prepaid', 'priˋped', 'adj.', '預付的', 'a prepaid SIM card', 2, ['prepay', 'prepayment'], [
        ['All calls on this account are [prepaid].', '這個帳號的所有通話都是預付的。'],
        ['This phone plan is [prepaid], so there are no monthly bills.', '這個手機方案是預付的，所以沒有月帳單。'],
      ]],
      ['broadband', 'ˋbrɔdˏbænd', 'n.', '寬頻', 'high-speed broadband', 2, [], [
        ['The new office comes with high-speed [broadband].', '新辦公室有高速寬頻。'],
        ['Many rural areas still do not have reliable [broadband].', '許多鄉村地區仍然沒有穩定的寬頻。'],
      ]],
      ['router', 'ˋraʊtɚ', 'n.', '路由器', 'restart the router', 2, ['route', 'routed'], [
        ['Try restarting the [router] if the Wi-Fi stops working.', '如果 Wi-Fi 斷了，試著重新啟動路由器。'],
        ['The [router] is on the shelf next to the printer.', '路由器在印表機旁邊的架子上。'],
      ]],
      ['modem', 'ˋmodəm', 'n.', '數據機', 'install a modem', 2, [], [
        ['A technician will come to install a new [modem] on Monday.', '技術人員星期一會來安裝新的數據機。'],
        ['Check that the cable is plugged into the [modem].', '請檢查網路線有沒有插進數據機。'],
      ]],
      ['upload', 'ˋʌpˏlod', 'v.', '上傳', 'upload a file', 1, ['uploaded', 'uploading'], [
        ['Please [upload] your résumé to our website.', '請把您的履歷上傳到我們的網站。'],
        ['It takes a few minutes to [upload] large video files.', '上傳大型影片檔需要幾分鐘。'],
      ]],
      ['download', 'ˋdaʊnˏlod', 'v.', '下載', 'download an app', 1, ['downloaded', 'downloading'], [
        ['You can [download] the app for free.', '你可以免費下載這個應用程式。'],
        ['Please [download] the form and return it by Friday.', '請下載表格，並在星期五前繳回。'],
      ]],
      ['streaming', 'ˋstrimɪŋ', 'n.', '串流', 'a streaming service', 2, ['streamed', 'streams'], [
        ['The company launched a new music [streaming] service.', '這家公司推出了新的音樂串流服務。'],
        ['[Streaming] movies on a weak connection is frustrating.', '在連線不好時串流看電影很令人沮喪。'],
      ]],
      ['technical support', 'ˋtɛknɪkl̩ səˋport', 'n.', '技術支援', 'contact technical support', 2, [], [
        ['Please call [technical support] if you cannot log in.', '如果無法登入，請打電話給技術支援。'],
        ['Our [technical support] team is available 24 hours a day.', '我們的技術支援團隊全天 24 小時服務。'],
      ]],
      ['connection', 'kəˋnɛkʃən', 'n.', '連線；關係', 'an internet connection', 1, ['connect', 'connected'], [
        ['The internet [connection] here is very slow.', '這裡的網路連線非常慢。'],
        ['There is a strong [connection] between sleep and productivity.', '睡眠和工作效率之間有很密切的關係。'],
      ]],
      ['hotspot', 'ˋhɑtˏspɑt', 'n.', '熱點', 'a Wi-Fi hotspot', 2, [], [
        ['I used my phone as a [hotspot] to get my laptop online.', '我用手機當熱點讓筆電上網。'],
        ['The airport lounge offers a free Wi-Fi [hotspot].', '機場貴賓室提供免費的 Wi-Fi 熱點。'],
      ]],
      ['SIM card', 'sɪm ˏkɑrd', 'n.', 'SIM 卡', 'buy a SIM card', 1, [], [
        ['You can buy a local [SIM card] at the airport.', '你可以在機場買當地的 SIM 卡。'],
        ['Insert the [SIM card] before turning on the phone.', '開機前先插入 SIM 卡。'],
      ]],
      ['text message', 'tɛkst ˋmɛsɪdʒ', 'n.', '簡訊', 'send a text message', 1, [], [
        ['You will receive a [text message] with your verification code.', '您會收到一封附有驗證碼的簡訊。'],
        ['The clinic sends a [text message] to remind patients of their appointments.', '診所會發簡訊提醒病人看診時間。'],
      ]],
      ['landline', 'ˋlændˏlaɪn', 'n.', '市內電話', 'call a landline', 2, [], [
        ['Fewer homes have a [landline] these days.', '現在裝市內電話的家庭越來越少。'],
        ['Please call the office [landline] instead of my cellphone.', '請打辦公室的市內電話，不要打我的手機。'],
      ]],
      ['cellphone', 'ˋsɛlˏfon', 'n.', '手機', 'turn off your cellphone', 1, [], [
        ['Please switch your [cellphone] to silent during the meeting.', '開會時請把手機轉成靜音。'],
        ['I left my [cellphone] in the taxi.', '我把手機忘在計程車上了。'],
      ]],
      ['unlimited', 'ʌnˋlɪmɪtɪd', 'adj.', '無限的', 'unlimited data', 1, ['limit', 'limitation'], [
        ['The data on this plan is [unlimited].', '這個方案的流量是無限的。'],
        ['Members get [unlimited] access to the online library.', '會員可以無限次使用線上圖書館。'],
      ]],
      ['monthly fee', 'ˋmʌnθlɪ ˏfi', 'n.', '月費', 'pay a monthly fee', 1, [], [
        ['The [monthly fee] includes calls and text messages.', '月費包含通話和簡訊。'],
        ['There is no [monthly fee] for this basic account.', '這個基本帳戶不收月費。'],
      ]],
      ['activate', 'ˋæktəˏvet', 'v.', '啟用', 'activate your account', 2, ['active', 'activation'], [
        ['You need to [activate] your new card before using it.', '新卡使用前需要先啟用。'],
        ['Call this number to [activate] your account.', '請撥打這個號碼啟用您的帳戶。'],
      ]],
      ['deactivate', 'diˋæktəˏvet', 'v.', '停用', 'deactivate an account', 3, ['deactivation', 'inactive'], [
        ['Please [deactivate] your old account before you leave the company.', '離職前請停用你的舊帳號。'],
        ['The bank will [deactivate] the card if it is reported stolen.', '如果卡片被通報遭竊，銀行會停用該卡。'],
      ]],
      ['network operator', 'ˋnɛtˏwɝk ˋɑpəˏretɚ', 'n.', '電信業者', 'a mobile network operator', 3, [], [
        ['Our phones use the largest [network operator] in the country.', '我們的手機用的是國內最大的電信業者。'],
        ['The [network operator] apologized for the service outage.', '電信業者為服務中斷道歉。'],
      ]],
    ],
  },
  {
    id: 'agriculture', track: 'toeic', name: '農業與食品產業', icon: '🌾', words: [
      ['agriculture', 'ˋægrɪˏkʌltʃɚ', 'n.', '農業', 'modern agriculture', 2, ['agricultural', 'agriculturally'], [
        ["Most of the region's income comes from [agriculture].", '這個地區大部分的收入來自農業。'],
        ['The government plans to invest more in [agriculture].', '政府計畫在農業上投入更多資金。'],
      ]],
      ['crop', 'krɑp', 'n.', '作物', 'grow crops', 2, ['cropped', 'crops'], [
        ['The main [crop] in this area is rice.', '這個地區的主要作物是稻米。'],
        ['Farmers expect a good [crop] of apples this year.', '農民預期今年蘋果會豐收。'],
      ]],
      ['harvest', 'ˋhɑrvɪst', 'n.', '收成', 'a good harvest', 2, ['harvested', 'harvests'], [
        ['The grape [harvest] begins in late February.', '葡萄的採收從二月底開始。'],
        ["This year's rice [harvest] was the best in a decade.", '今年的稻米收成是十年來最好的。'],
      ]],
      ['livestock', 'ˋlaɪvˏstɑk', 'n.', '家畜', 'raise livestock', 3, [], [
        ['The farm raises [livestock] such as cattle and sheep.', '這座農場飼養牛、羊等家畜。'],
        ['Prices for [livestock] feed have risen sharply.', '家畜飼料的價格大幅上漲。'],
      ]],
      ['fertilizer', 'ˋfɝtl̩ˏaɪzɚ', 'n.', '肥料', 'organic fertilizer', 3, ['fertilize', 'fertile'], [
        ['The farmer applies [fertilizer] to the fields every spring.', '農夫每年春天在田裡施肥。'],
        ['Organic [fertilizer] is more expensive but better for the soil.', '有機肥料比較貴，但對土壤比較好。'],
      ]],
      ['pesticide', 'ˋpɛstɪˏsaɪd', 'n.', '殺蟲劑', 'pesticide use', 3, [], [
        ['All vegetables are tested for [pesticide] residue.', '所有蔬菜都要檢驗農藥殘留。'],
        ['The farm stopped using [pesticide] three years ago.', '這座農場三年前就停用殺蟲劑了。'],
      ]],
      ['irrigation', 'ˏɪrəˋgeʃən', 'n.', '灌溉', 'an irrigation system', 3, ['irrigate', 'irrigated'], [
        ['Farmers in dry areas depend on [irrigation].', '乾燥地區的農民依賴灌溉。'],
        ['[Irrigation] accounts for most of the water used in the region.', '這個地區用水大多用在灌溉上。'],
      ]],
      ['produce', 'ˋprɑdjus', 'n.', '農產品；生產', 'fresh produce', 2, ['productive', 'productively'], [
        ['Fresh [produce] is delivered to the store every morning.', '新鮮農產品每天早上送到店裡。'],
        ['The supermarket sells local [produce] at low prices.', '這家超市以低價販售在地農產品。'],
      ]],
      ['grain', 'gren', 'n.', '穀物', 'grain prices', 2, ['grains', 'grainy'], [
        ['The [grain] is stored in large silos near the port.', '穀物存放在港口附近的大型筒倉裡。'],
        ['Rice is the main [grain] grown in Taiwan.', '稻米是台灣種植的主要穀物。'],
      ]],
      ['dairy', 'ˋdɛrɪ', 'n.', '乳製品', 'dairy products', 2, ['diary', 'daily'], [
        ['She avoids [dairy] because she is lactose intolerant.', '她有乳糖不耐症，所以避免吃乳製品。'],
        ['Too much [dairy] can upset my stomach.', '吃太多乳製品會讓我腸胃不舒服。'],
      ]],
      ['poultry', 'ˋpoltrɪ', 'n.', '家禽', 'poultry farm', 3, [], [
        ['The farm raises [poultry] for both eggs and meat.', '這座農場飼養家禽，產蛋也供肉。'],
        ['Always cook [poultry] thoroughly before eating it.', '家禽肉一定要徹底煮熟再吃。'],
      ]],
      ['orchard', 'ˋɔrtʃɚd', 'n.', '果園', 'an apple orchard', 3, [], [
        ['The family owns a large apple [orchard] in the hills.', '這家人在山上擁有一大片蘋果園。'],
        ['Visitors can pick fruit at the [orchard] on weekends.', '遊客週末可以到果園採水果。'],
      ]],
      ['vineyard', 'ˋvɪnjɚd', 'n.', '葡萄園', 'a family-owned vineyard', 3, [], [
        ['The [vineyard] produces about 50,000 bottles of wine a year.', '這座葡萄園一年生產約五萬瓶葡萄酒。'],
        ['Our team dinner was held at a [vineyard] outside the city.', '我們的團隊晚餐在城外的一座葡萄園舉行。'],
      ]],
      ['greenhouse', 'ˋgrinˏhaʊs', 'n.', '溫室', 'greenhouse vegetables', 2, [], [
        ['Tomatoes are grown in a [greenhouse] all year round.', '番茄一整年都在溫室裡種植。'],
        ['The company built a new [greenhouse] to test different seeds.', '公司蓋了一座新溫室來測試不同的種子。'],
      ]],
      ['processing', 'ˋprɑsɛsɪŋ', 'n.', '加工', 'food processing', 2, ['processed', 'processes'], [
        ['Food [processing] is a major industry in this region.', '食品加工是這個地區的主要產業。'],
        ['Payment [processing] usually takes two to three business days.', '付款處理通常需要兩到三個工作天。'],
      ]],
      ['expiration date', 'ˏɛkspəˋreʃən ˏdet', 'n.', '到期日', 'check the expiration date', 1, [], [
        ['Check the [expiration date] before you buy the milk.', '買牛奶前先看看到期日。'],
        ['The [expiration date] is printed on the bottom of the can.', '到期日印在罐子底部。'],
      ]],
      ['food safety', 'ˋfud ˋseftɪ', 'n.', '食品安全', 'food safety standards', 2, [], [
        ['All kitchen staff must complete a [food safety] course.', '所有廚房員工都必須完成食品安全課程。'],
        ['The factory was inspected for [food safety] violations.', '這間工廠接受了食品安全違規的稽查。'],
      ]],
      ['supply chain', 'səˋplaɪ ˏtʃen', 'n.', '供應鏈', 'supply chain management', 2, [], [
        ['The storm caused delays across the entire [supply chain].', '暴風雨使整條供應鏈都出現延誤。'],
        ['We are looking for ways to make our [supply chain] more efficient.', '我們正在尋找讓供應鏈更有效率的方法。'],
      ]],
      ['distributor', 'dɪˋstrɪbjətɚ', 'n.', '經銷商', 'an authorized distributor', 2, ['distribute', 'distributed'], [
        ['We signed a contract with a new [distributor] in Japan.', '我們和日本一家新的經銷商簽了約。'],
        ['The [distributor] delivers our products to supermarkets nationwide.', '經銷商把我們的產品送到全國各地的超市。'],
      ]],
      ['cultivate', 'ˋkʌltəˏvet', 'v.', '栽培', 'cultivate crops', 3, ['cultivation', 'cultivated'], [
        ['It is difficult to [cultivate] coffee in cold climates.', '在寒冷的氣候裡很難種植咖啡。'],
        ['Sales staff should [cultivate] good relationships with clients.', '業務人員應該和客戶培養良好的關係。'],
      ]],
      ['seed', 'sid', 'n.', '種子', 'plant seeds', 1, ['seeded', 'seedy'], [
        ['Plant the [seed] about two centimeters deep.', '把種子種在大約兩公分深的地方。'],
        ["The farmer bought [seed] for next season's crop.", '農夫買了下一季作物的種子。'],
      ]],
      ['soil', 'sɔɪl', 'n.', '土壤', 'rich soil', 2, ['soiled', 'soils'], [
        ['The [soil] here is rich and good for farming.', '這裡的土壤肥沃，很適合耕作。'],
        ['Grapes grow well in this kind of [soil].', '葡萄在這種土壤中長得很好。'],
      ]],
      ['tractor', 'ˋtræktɚ', 'n.', '拖拉機', 'drive a tractor', 2, ['traction', 'attract'], [
        ["He drives a [tractor] on his family's farm.", '他在家裡的農場開拖拉機。'],
        ['The new [tractor] can plow ten hectares a day.', '新的拖拉機一天可以耕十公頃的地。'],
      ]],
      ['cattle', 'ˋkætl̩', 'n.', '牛（總稱）', 'raise cattle', 2, [], [
        ['The ranch has more than 500 head of [cattle].', '這座牧場有五百多頭牛。'],
        ['Beef prices rose after many [cattle] were lost in the drought.', '許多牛在乾旱中死亡後，牛肉價格上漲了。'],
      ]],
      ['agricultural', 'ˏægrɪˋkʌltʃərəl', 'adj.', '農業的', 'agricultural products', 2, ['agriculturally', 'agriculturalist'], [
        ['The country exports many [agricultural] products to Asia.', '這個國家出口許多農產品到亞洲。'],
        ['She studied [agricultural] science at university.', '她在大學念農業科學。'],
      ]],
    ],
  },
  {
    id: 'repairs', track: 'toeic', name: '物業管理與維修', icon: '🔧', words: [
      ['repairman', 'rɪˋpɛrˏmæn', 'n.', '修理工', 'call a repairman', 1, ['repair', 'repairable'], [
        ['We called a [repairman] to fix the dishwasher.', '我們找了修理工來修洗碗機。'],
        ['The [repairman] said the part needs to be replaced.', '修理工說這個零件需要更換。'],
      ]],
      ['handyman', 'ˋhændɪˏmæn', 'n.', '雜工', 'hire a handyman', 2, ['handy', 'handily'], [
        ['The building manager hired a [handyman] to fix the fence.', '大樓管理員請了一位雜工來修圍籬。'],
        ['The [handyman] can also paint the walls for you.', '這位雜工也可以幫你粉刷牆壁。'],
      ]],
      ['faucet', 'ˋfɔsɪt', 'n.', '水龍頭', 'a leaking faucet', 2, [], [
        ['The kitchen [faucet] has been dripping all night.', '廚房的水龍頭整晚都在滴水。'],
        ['Please turn off the [faucet] after washing your hands.', '洗完手請關上水龍頭。'],
      ]],
      ['light bulb', 'ˋlaɪt ˏbʌlb', 'n.', '燈泡', 'change a light bulb', 1, [], [
        ['The [light bulb] in the hallway needs to be replaced.', '走廊的燈泡需要更換。'],
        ['Switching to an LED [light bulb] can save energy.', '換成 LED 燈泡可以節省能源。'],
      ]],
      ['air conditioner', 'ˋɛr kənˋdɪʃənɚ', 'n.', '冷氣機', 'turn on the air conditioner', 1, [], [
        ['The [air conditioner] in the conference room is too loud.', '會議室的冷氣機太吵了。'],
        ['A technician is coming to repair the [air conditioner] this afternoon.', '技術人員今天下午會來修冷氣機。'],
      ]],
      ['heater', 'ˋhitɚ', 'n.', '暖氣機', 'a space heater', 1, [], [
        ['Employees may not use a personal [heater] under their desks.', '員工不可以在桌子底下使用個人暖氣機。'],
        ['The [heater] in my office makes a strange noise.', '我辦公室的暖氣機會發出奇怪的聲音。'],
      ]],
      ['thermostat', 'ˋθɝməˏstæt', 'n.', '溫度調節器', 'adjust the thermostat', 3, [], [
        ['Please do not adjust the [thermostat] without permission.', '未經許可請勿調整溫度調節器。'],
        ['The [thermostat] is set to 25 degrees during office hours.', '上班時間溫度調節器設定在 25 度。'],
      ]],
      ['fire alarm', 'ˋfaɪr əˋlɑrm', 'n.', '火災警報器', 'the fire alarm goes off', 1, [], [
        ['Leave the building immediately when the [fire alarm] sounds.', '火災警報器響起時請立刻離開大樓。'],
        ['The [fire alarm] will be tested on Thursday morning.', '火災警報器將在星期四早上測試。'],
      ]],
      ['smoke detector', 'ˋsmok dɪˋtɛktɚ', 'n.', '煙霧偵測器', 'install a smoke detector', 2, [], [
        ['Every apartment must have a working [smoke detector].', '每間公寓都必須有正常運作的煙霧偵測器。'],
        ['The [smoke detector] in the kitchen went off when I made toast.', '我烤吐司的時候，廚房的煙霧偵測器響了。'],
      ]],
      ['sprinkler', 'ˋsprɪŋklɚ', 'n.', '灑水器', 'a sprinkler system', 2, [], [
        ["The building's [sprinkler] system is inspected every year.", '大樓的灑水系統每年都要檢查。'],
        ['Do not hang anything from the [sprinkler] on the ceiling.', '不要在天花板的灑水器上掛任何東西。'],
      ]],
      ['emergency exit', 'ɪˋmɝdʒənsɪ ˋɛgzɪt', 'n.', '緊急出口', 'use the emergency exit', 1, [], [
        ['Do not block the [emergency exit] with boxes.', '不要用箱子擋住緊急出口。'],
        ['The nearest [emergency exit] is at the end of the hallway.', '最近的緊急出口在走廊盡頭。'],
      ]],
      ['evacuation', 'ɪˏvækjʊˋeʃən', 'n.', '疏散', 'an evacuation plan', 3, ['evacuate', 'evacuated'], [
        ['An [evacuation] was ordered after the gas leak.', '瓦斯外洩後下令疏散。'],
        ['Follow the instructions of the floor wardens during an [evacuation].', '疏散時請遵從樓層引導人員的指示。'],
      ]],
      ['fire drill', 'ˋfaɪr ˏdrɪl', 'n.', '消防演習', 'hold a fire drill', 2, [], [
        ['There will be a [fire drill] at 10 a.m. tomorrow.', '明天早上十點會有消防演習。'],
        ['All employees must take part in the annual [fire drill].', '所有員工都必須參加年度消防演習。'],
      ]],
      ['paint', 'pent', 'v.', '油漆；粉刷', 'paint the walls', 1, ['painter', 'painting'], [
        ['Workers will [paint] the lobby this weekend.', '工人這個週末會粉刷大廳。'],
        ['We hired a company to [paint] the hallways.', '我們請了一家公司來粉刷走廊。'],
      ]],
      ['carpet', 'ˋkɑrpɪt', 'n.', '地毯', 'clean the carpet', 1, [], [
        ['The [carpet] in the lobby will be replaced next week.', '大廳的地毯下週會更換。'],
        ['Someone spilled coffee on the office [carpet].', '有人把咖啡灑在辦公室的地毯上。'],
      ]],
      ['ceiling', 'ˋsilɪŋ', 'n.', '天花板', 'a high ceiling', 2, [], [
        ['Water is leaking from the [ceiling] in the storage room.', '儲藏室的天花板在漏水。'],
        ['The lobby has a high glass [ceiling].', '大廳有挑高的玻璃天花板。'],
      ]],
      ['pipe', 'paɪp', 'n.', '管子', 'a burst pipe', 1, ['piped', 'pipes'], [
        ['A [pipe] burst in the basement last night.', '昨晚地下室有一根水管爆了。'],
        ['This [pipe] is leaking again.', '這根管子又在漏水了。'],
      ]],
      ['cleaning crew', 'ˋklinɪŋ ˏkru', 'n.', '清潔人員', 'the cleaning crew', 2, [], [
        ['The [cleaning crew] comes in every evening after 7 p.m.', '清潔人員每天晚上七點後進來打掃。'],
        ['Please leave your trash bins by the door for the [cleaning crew].', '請把垃圾桶放在門邊讓清潔人員處理。'],
      ]],
      ['pest control', 'ˋpɛst kənˋtrol', 'n.', '除蟲', 'a pest control company', 3, [], [
        ['The restaurant calls [pest control] every three months.', '這家餐廳每三個月請一次除蟲公司。'],
        ['The kitchen will be closed on Monday for [pest control].', '廚房星期一因除蟲作業關閉。'],
      ]],
      ['broken', 'ˋbrokən', 'adj.', '壞掉的', 'a broken window', 1, ['break', 'breakage'], [
        ['The elevator is [broken] again.', '電梯又壞了。'],
        ['Please report any [broken] equipment to the front desk.', '任何壞掉的設備都請通報櫃檯。'],
      ]],
      ['out of service', 'aʊt əv ˋsɝvɪs', 'prep.', '停止服務', 'temporarily out of service', 2, [], [
        ['The east elevator is [out of service] until Friday.', '東側電梯停用到星期五。'],
        ['Sorry, this vending machine is [out of service].', '抱歉，這台販賣機暫停服務。'],
      ]],
      ['fix', 'fɪks', 'v.', '修理', 'fix the problem', 1, ['fixture', 'fixed'], [
        ['Can you [fix] the copier by noon?', '你可以在中午前修好影印機嗎？'],
        ['We need someone to [fix] the leaking roof.', '我們需要有人來修漏水的屋頂。'],
      ]],
      ['service request', 'ˋsɝvɪs rɪˋkwɛst', 'n.', '維修申請', 'submit a service request', 2, [], [
        ['Tenants can submit a [service request] online.', '房客可以在線上提出維修申請。'],
        ['Your [service request] has been sent to the maintenance team.', '您的維修申請已送交維修團隊。'],
      ]],
      ['work order', 'wɝk ˋɔrdɚ', 'n.', '工單', 'issue a work order', 3, [], [
        ['The supervisor issued a [work order] to replace the broken window.', '主管開了工單更換破掉的窗戶。'],
        ['Each [work order] must be signed when the job is completed.', '每張工單在工作完成後都必須簽名。'],
      ]],
      ['ladder', 'ˋlædɚ', 'n.', '梯子', 'climb a ladder', 1, [], [
        ['Hold the [ladder] while I change the light.', '我換燈的時候請幫我扶著梯子。'],
        ['Never stand on the top step of a [ladder].', '絕對不要站在梯子的最上面一階。'],
      ]],
    ],
  },
  {
    id: 'officegear', track: 'toeic', name: '辦公設備與用品', icon: '🖨️', words: [
      ['printer', 'ˋprɪntɚ', 'n.', '印表機', 'a color printer', 1, ['printed', 'prints'], [
        ['The [printer] is out of paper.', '印表機沒紙了。'],
        ['The [printer] on the third floor is jammed again.', '三樓的印表機又卡紙了。'],
      ]],
      ['copier', 'ˋkɑpɪɚ', 'n.', '影印機', 'a photocopier', 1, ['copied', 'copies'], [
        ['The [copier] is jammed again.', '影印機又卡紙了。'],
        ['The [copier] on this floor needs more toner.', '這層樓的影印機需要補碳粉。'],
      ]],
      ['scanner', 'ˋskænɚ', 'n.', '掃描器', 'use the scanner', 1, ['scanned', 'scans'], [
        ['The [scanner] is next to the printer.', '掃描器在印表機旁邊。'],
        ['Our new [scanner] works much faster than the old one.', '我們的新掃描器比舊的快很多。'],
      ]],
      ['fax', 'fæks', 'n.', '傳真', 'send a fax', 1, [], [
        ['Few companies still send documents by [fax].', '現在很少公司還用傳真寄文件。'],
        ['Did you receive the [fax] I sent this morning?', '你收到我今天早上傳的傳真了嗎？'],
      ]],
      ['stapler', 'ˋsteplɚ', 'n.', '釘書機', 'borrow a stapler', 1, ['stapled', 'staples'], [
        ['This [stapler] is out of staples.', '這台釘書機沒有釘書針了。'],
        ['My [stapler] keeps jamming.', '我的釘書機一直卡住。'],
      ]],
      ['paper clip', 'ˋpepɚ ˏklɪp', 'n.', '迴紋針', 'a box of paper clips', 1, [], [
        ['Please attach the receipt with a [paper clip].', '請用迴紋針把收據夾上。'],
        ['A [paper clip] is better than a staple if you need to scan the pages.', '如果要掃描，用迴紋針比釘書針好。'],
      ]],
      ['folder', 'ˋfoldɚ', 'n.', '資料夾', 'a file folder', 1, ['fold', 'folded'], [
        ["Each [folder] is labeled with the client's name.", '每個資料夾都標上了客戶的名字。'],
        ['I saved the file in a shared [folder] on the server.', '我把檔案存在伺服器上的共用資料夾。'],
      ]],
      ['binder', 'ˋbaɪndɚ', 'n.', '活頁夾', 'a three-ring binder', 2, ['bind', 'bound'], [
        ['Each new employee receives a training [binder].', '每位新進員工都會拿到一本訓練活頁夾。'],
        ["The [binder] on the shelf has last year's reports.", '架上的活頁夾裡有去年的報告。'],
      ]],
      ['filing cabinet', 'ˋfaɪlɪŋ ˋkæbənɪt', 'n.', '檔案櫃', 'a locked filing cabinet', 2, [], [
        ['Contracts are kept in a locked [filing cabinet].', '合約存放在上鎖的檔案櫃裡。'],
        ['The [filing cabinet] by the window is full.', '窗邊的檔案櫃已經滿了。'],
      ]],
      ['desk', 'dɛsk', 'n.', '書桌；辦公桌', 'the front desk', 1, [], [
        ['Please leave the package on my [desk].', '請把包裹放在我的辦公桌上。'],
        ['Visitors should check in at the front [desk].', '訪客請到櫃檯登記。'],
      ]],
      ['whiteboard', 'ˋhwaɪtˏbord', 'n.', '白板', 'write on the whiteboard', 1, [], [
        ['The manager wrote the sales targets on the [whiteboard].', '經理把銷售目標寫在白板上。'],
        ['Please erase the [whiteboard] after the meeting.', '會議結束後請擦乾淨白板。'],
      ]],
      ['marker', 'ˋmɑrkɚ', 'n.', '麥克筆', 'a whiteboard marker', 1, ['marked', 'marks'], [
        ['This [marker] has run out of ink.', '這支麥克筆沒水了。'],
        ['Please use a red [marker] for corrections.', '請用紅色麥克筆修改。'],
      ]],
      ['laptop', 'ˋlæpˏtɑp', 'n.', '筆記型電腦', 'a company laptop', 1, [], [
        ['Each sales representative is given a company [laptop].', '每位業務代表都會配一台公司的筆電。'],
        ['Please bring your [laptop] to the training session.', '參加訓練課程時請帶筆電。'],
      ]],
      ['monitor', 'ˋmɑnətɚ', 'n.', '螢幕；監控', 'a computer monitor', 1, ['monitored', 'monitors'], [
        ['My computer [monitor] is too small for this spreadsheet.', '我的電腦螢幕太小，看這份試算表很吃力。'],
        ['Each designer has a second [monitor] on the desk.', '每位設計師桌上都有第二個螢幕。'],
      ]],
      ['keyboard', 'ˋkiˏbord', 'n.', '鍵盤', 'a wireless keyboard', 1, [], [
        ['I spilled coffee on my [keyboard].', '我把咖啡灑在鍵盤上了。'],
        ['The IT department ordered a new wireless [keyboard] for me.', '資訊部幫我訂了一個新的無線鍵盤。'],
      ]],
      ['toner', 'ˋtonɚ', 'n.', '碳粉', 'replace the toner', 2, [], [
        ['The printer is running low on [toner].', '印表機的碳粉快用完了。'],
        ['Extra [toner] is kept in the supply closet.', '備用碳粉放在用品櫃裡。'],
      ]],
      ['cartridge', 'ˋkɑrtrɪdʒ', 'n.', '墨水匣', 'an ink cartridge', 2, [], [
        ['I need to replace the ink [cartridge] in my printer.', '我需要換印表機的墨水匣。'],
        ['Each [cartridge] prints about 300 pages.', '每個墨水匣大約可以印三百頁。'],
      ]],
      ['shredder', 'ˋʃrɛdɚ', 'n.', '碎紙機', 'a paper shredder', 2, ['shredded', 'shreds'], [
        ['This [shredder] is jammed again.', '這台碎紙機又卡住了。'],
        ['The [shredder] is full and needs to be emptied.', '碎紙機滿了，需要清空。'],
      ]],
      ['notepad', 'ˋnotˏpæd', 'n.', '便條本', 'a hotel notepad', 1, [], [
        ['She always brings a [notepad] to meetings.', '她開會一定會帶便條本。'],
        ['There is a [notepad] and a pen next to the phone.', '電話旁邊有便條本和筆。'],
      ]],
      ['sticky note', 'ˋstɪkɪ ˏnot', 'n.', '便利貼', 'leave a sticky note', 1, [], [
        ['I left a [sticky note] on your monitor.', '我在你的螢幕上留了一張便利貼。'],
        ['Write each idea on a separate [sticky note].', '每個點子寫在一張便利貼上。'],
      ]],
      ['calculator', 'ˋkælkjəˏletɚ', 'n.', '計算機', 'use a calculator', 1, ['calculate', 'calculated'], [
        ['I need a [calculator] to check these numbers.', '我需要計算機來核對這些數字。'],
        ['Can I borrow your [calculator] for a minute?', '可以借我用一下你的計算機嗎？'],
      ]],
      ['storage room', 'ˋstorɪdʒ ˏrum', 'n.', '儲藏室', 'the storage room', 1, [], [
        ['Extra chairs are kept in the [storage room].', '多的椅子放在儲藏室裡。'],
        ['The key to the [storage room] is at the front desk.', '儲藏室的鑰匙在櫃檯。'],
      ]],
      ['extension cord', 'ɪkˋstɛnʃən ˏkɔrd', 'n.', '延長線', 'plug into an extension cord', 2, [], [
        ['We need an [extension cord] for the projector.', '投影機需要一條延長線。'],
        ['Do not run an [extension cord] across the walkway.', '不要把延長線拉過走道。'],
      ]],
      ['headset', 'ˋhɛdˏsɛt', 'n.', '耳機麥克風', 'wear a headset', 2, [], [
        ['Call center staff wear a [headset] all day.', '客服中心人員整天戴著耳機麥克風。'],
        ['Please use a [headset] during online meetings.', '線上會議時請使用耳機麥克風。'],
      ]],
      ['ink', 'ɪŋk', 'n.', '墨水', 'run out of ink', 1, [], [
        ['The printer is almost out of black [ink].', '印表機的黑色墨水快用完了。'],
        ['Please sign the form in blue [ink].', '請用藍色墨水在表格上簽名。'],
      ]],
    ],
  },
  {
    id: 'listening', track: 'toeic', name: 'Part 3／4 常見說法', icon: '🗨️', words: [
      ['out of town', 'aʊt əv taʊn', 'prep.', '出城；不在', 'be out of town', 2, [], [
        ['Ms. Lee is [out of town] until next Tuesday.', '李小姐出差到下星期二才回來。'],
        ["I'll be [out of town] for a conference next week.", '我下週要出城參加會議。'],
      ]],
      ['on vacation', 'ɑn veˋkeʃən', 'prep.', '休假中', 'be on vacation', 1, [], [
        ['The manager is [on vacation], so please contact her assistant.', '經理正在休假，請聯絡她的助理。'],
        ['Half the team will be [on vacation] in August.', '團隊有一半的人八月會休假。'],
      ]],
      ['running late', 'ˋrʌnɪŋ let', 'v.', '快要遲到', 'be running late', 1, [], [
        ["Sorry, I'm [running late] because of the traffic.", '抱歉，因為塞車我會晚一點到。'],
        ["The speaker is [running late], so we'll start with the second item.", '講者會晚到，所以我們先從第二項開始。'],
      ]],
      ['fill in for', 'fɪl ɪn fɔr', 'v.', '代替（某人）', 'fill in for a colleague', 2, [], [
        ['Can you [fill in for] me at the meeting tomorrow?', '明天的會議你可以代替我出席嗎？'],
        ['Mark will [fill in for] Susan while she is on leave.', '蘇珊休假期間由馬克代理她的工作。'],
      ]],
      ['cover a shift', 'ˋkʌvɚ ə ʃɪft', 'v.', '代班', 'cover a shift for sb', 2, [], [
        ['Could you [cover a shift] for me on Saturday?', '你星期六可以幫我代個班嗎？'],
        ['We need someone to [cover a shift] at the front desk this weekend.', '這個週末櫃檯需要有人代班。'],
      ]],
      ['take a look at', 'tek ə lʊk æt', 'v.', '看一下', 'take a look at the report', 1, [], [
        ['Could you [take a look at] this contract before I send it?', '我寄出前你可以看一下這份合約嗎？'],
        ['A technician will [take a look at] the printer this afternoon.', '技術人員今天下午會來看一下印表機。'],
      ]],
      ['drop off', 'drɑp ɔf', 'v.', '送去；放下', 'drop off a package', 1, [], [
        ["I'll [drop off] the documents at your office on my way home.", '我回家路上會把文件送到你辦公室。'],
        ['You can [drop off] your rental car at the airport.', '你可以在機場還租來的車。'],
      ]],
      ['pick up', 'pɪk ʌp', 'v.', '拿取；接（人）', 'pick up a client', 1, [], [
        ['Can you [pick up] the package from the front desk?', '你可以去櫃檯拿包裹嗎？'],
        ["I'll [pick up] Mr. Tanaka at the airport at five.", '我五點會去機場接田中先生。'],
      ]],
      ['sign up', 'saɪn ʌp', 'v.', '報名', 'sign up for a course', 1, [], [
        ['You can [sign up] for the workshop on the company website.', '你可以在公司網站上報名研習。'],
        ['Please [sign up] by Friday if you want to join the trip.', '想參加旅遊的話請在星期五前報名。'],
      ]],
      ['sign in', 'saɪn ɪn', 'v.', '簽到；登入', 'sign in at reception', 1, [], [
        ['All visitors must [sign in] at the reception desk.', '所有訪客都必須在接待處簽到。'],
        ['Please [sign in] with your employee ID and password.', '請用員工編號和密碼登入。'],
      ]],
      ['look forward to', 'lʊk ˋfɔrwɚd tu', 'v.', '期待', 'look forward to meeting you', 1, [], [
        ['I [look forward to] meeting you next week.', '我很期待下週和您見面。'],
        ['We [look forward to] working with your team.', '我們期待和貴團隊合作。'],
      ]],
      ['get in touch', 'gɛt ɪn tʌtʃ', 'v.', '聯絡', 'get in touch with sb', 2, [], [
        ['Please [get in touch] with me if you have any questions.', '如果有任何問題請和我聯絡。'],
        ["I'll [get in touch] as soon as the results are ready.", '結果一出來我就會跟您聯絡。'],
      ]],
      ['keep in mind', 'kip ɪn maɪnd', 'v.', '記住', 'keep in mind that...', 2, [], [
        ['Please [keep in mind] that the office closes early on Friday.', '請記得辦公室星期五提早關門。'],
        ['[Keep in mind] that prices may change without notice.', '請記住價格可能隨時調整，恕不另行通知。'],
      ]],
      ['make sure', 'mek ʃʊr', 'v.', '確保', 'make sure that...', 1, [], [
        ['Please [make sure] the door is locked when you leave.', '離開時請確定門有鎖好。'],
        ['[Make sure] you bring your ID to the interview.', '面試時記得帶身分證件。'],
      ]],
      ['take care of', 'tek kɛr əv', 'v.', '處理；照顧', 'take care of a problem', 1, [], [
        ["Don't worry, I'll [take care of] the hotel booking.", '別擔心，飯店訂房我來處理。'],
        ['Who will [take care of] the customers while you are away?', '你不在的時候誰來照顧客人？'],
      ]],
      ['be supposed to', 'bi səˋpozd tu', 'v.', '應該要', 'be supposed to arrive', 2, [], [
        ['When will we [be supposed to] submit the final report?', '我們應該什麼時候交期末報告？'],
        ['How would I [be supposed to] know his password?', '我怎麼會知道他的密碼？'],
      ]],
      ['used to', 'ˋjust tu', 'v.', '過去常常', 'used to work', 1, [], [
        ['I [used to] work at a bank before I joined this company.', '我進這家公司前曾在銀行工作。'],
        ['We [used to] have a meeting every Monday morning.', '我們以前每週一早上都要開會。'],
      ]],
      ['on the way', 'ɑn ðə we', 'prep.', '在路上', 'be on the way', 1, [], [
        ['The technician is [on the way] to your office now.', '技術人員現在正在去您辦公室的路上。'],
        ['Can you buy some coffee [on the way] to work?', '你上班途中可以買些咖啡嗎？'],
      ]],
      ['go over', 'go ˋovɚ', 'v.', '檢查；仔細看過', 'go over the details', 2, [], [
        ["Let's [go over] the agenda before the meeting starts.", '會議開始前我們先看一下議程。'],
        ['Could you [go over] my report and check for errors?', '你可以幫我看過報告、檢查有沒有錯誤嗎？'],
      ]],
      ['point out', 'pɔɪnt aʊt', 'v.', '指出', 'point out a mistake', 2, [], [
        ["I'd like to [point out] a mistake in the budget.", '我想指出預算裡的一個錯誤。'],
        ['Did the inspector [point out] any safety problems?', '檢查員有指出任何安全問題嗎？'],
      ]],
      ['come up with', 'kʌm ʌp wɪð', 'v.', '想出', 'come up with an idea', 2, [], [
        ['We need to [come up with] a new marketing plan.', '我們需要想出新的行銷計畫。'],
        ['Can you [come up with] a better name for the product?', '你能幫產品想個更好的名字嗎？'],
      ]],
      ['run into', 'rʌn ˋɪntu', 'v.', '巧遇；遇到', 'run into problems', 2, [], [
        ['I often [run into] Ms. Park at the coffee shop downstairs.', '我常在樓下的咖啡店遇到朴小姐。'],
        ['We may [run into] some delays because of the weather.', '因為天氣，我們可能會遇到一些延誤。'],
      ]],
      ['show up', 'ʃo ʌp', 'v.', '出現', 'show up on time', 1, [], [
        ['Please [show up] at least ten minutes before the interview.', '請至少在面試前十分鐘到。'],
        ['Did the client [show up] for the meeting?', '客戶有來開會嗎？'],
      ]],
      ['set aside', 'sɛt əˋsaɪd', 'v.', '留出；撥出', 'set aside time', 2, [], [
        ["Let's [set aside] some time to discuss the budget.", '我們撥點時間討論預算吧。'],
        ['The company will [set aside] ten percent of its profits for training.', '公司會撥出百分之十的利潤做為培訓經費。'],
      ]],
      ['work out', 'wɝk aʊt', 'v.', '解決；運動', 'work out a solution', 2, [], [
        ["I'm sure we can [work out] a solution together.", '我相信我們可以一起想出解決辦法。'],
        ['I usually [work out] at the gym after work.', '我通常下班後去健身房運動。'],
      ]],
    ],
  },
  {
    id: 'formal', track: 'toeic', name: 'Part 7 正式用語', icon: '🖋️', words: [
      ['hereby', 'hɪrˋbaɪ', 'adv.', '特此', 'hereby notify', 3, [], [
        ['We [hereby] confirm your reservation for June 5.', '我們特此確認您 6 月 5 日的預約。'],
        ['You are [hereby] notified that your lease will end on May 31.', '特此通知您的租約將於 5 月 31 日到期。'],
      ]],
      ['aforementioned', 'əˋforˏmɛnʃənd', 'adj.', '上述的', 'the aforementioned changes', 3, [], [
        ['The [aforementioned] changes will take effect next month.', '上述變更將於下個月生效。'],
        ['Please send the [aforementioned] documents by Friday.', '請在星期五前寄出上述文件。'],
      ]],
      ['pursuant to', 'pɚˋsuənt tu', 'prep.', '依據', 'pursuant to the contract', 3, [], [
        ['[Pursuant to] our agreement, payment is due within 30 days.', '依據我們的協議，款項應於 30 天內支付。'],
        ['The fee was refunded [pursuant to] company policy.', '費用依公司規定退還。'],
      ]],
      ['kindly', 'ˋkaɪndlɪ', 'adv.', '請；親切地', 'kindly note', 2, ['kind', 'kindness'], [
        ['Guests are [kindly] asked to check out by 11 a.m.', '敬請房客於上午 11 點前退房。'],
        ['She [kindly] offered to show us around the office.', '她親切地提議帶我們參觀辦公室。'],
      ]],
      ['sincerely', 'sɪnˋsɪrlɪ', 'adv.', '誠摯地', 'Yours sincerely', 1, ['sincere', 'sincerity'], [
        ['We [sincerely] apologize for the delay.', '我們對延誤誠摯致歉。'],
        ['I [sincerely] hope you will consider our proposal.', '誠摯希望您能考慮我們的提案。'],
      ]],
      ['regards', 'rɪˋgɑrdz', 'n.', '問候', 'Best regards', 1, [], [
        ['Please give my [regards] to your team.', '請代我向您的團隊問好。'],
        ['The e-mail ended with "Kind [regards], Peter."', '這封電子郵件以「敬祝順心，彼得」結尾。'],
      ]],
      ['respectfully', 'rɪˋspɛktfəlɪ', 'adv.', '恭敬地', 'respectfully request', 3, ['respectful', 'respectively'], [
        ['We [respectfully] request that you reconsider your decision.', '我們懇請您重新考慮您的決定。'],
        ['The staff treated every customer [respectfully].', '員工恭敬地對待每一位顧客。'],
      ]],
      ['upon request', 'əˋpɑn rɪˋkwɛst', 'prep.', '應要求', 'available upon request', 3, [], [
        ['References are available [upon request].', '推薦人資料可應要求提供。'],
        ['A printed copy of the manual will be sent [upon request].', '如有需要，可寄送紙本手冊。'],
      ]],
      ['do not hesitate', 'du nɑt ˋhɛzəˏtet', 'v.', '請不要猶豫', 'do not hesitate to contact us', 2, [], [
        ['Please [do not hesitate] to contact us if you have any questions.', '如有任何問題，請隨時與我們聯絡。'],
        ['If you need further information, [do not hesitate] to call me.', '如需進一步資訊，請隨時打電話給我。'],
      ]],
      ['please be advised', 'pliz bi ədˋvaɪzd', 'v.', '特此通知', 'please be advised that...', 3, [], [
        ['[Please be advised] that the office will be closed on Monday.', '特此通知辦公室星期一不上班。'],
        ['[Please be advised] that parking fees will increase next month.', '特此通知停車費下個月將調漲。'],
      ]],
      ['regret to inform', 'rɪˋgrɛt tu ɪnˋfɔrm', 'v.', '很遺憾通知', 'regret to inform you that...', 3, [], [
        ['We [regret to inform] you that the position has been filled.', '很遺憾通知您該職缺已經有人錄取。'],
        ['We [regret to inform] passengers that Flight 302 has been canceled.', '很遺憾通知旅客 302 班機已取消。'],
      ]],
      ['for your reference', 'fɔr jʊr ˋrɛfərəns', 'prep.', '供您參考', 'attached for your reference', 2, [], [
        ["I've attached last year's report [for your reference].", '我附上去年的報告供您參考。'],
        ['A copy of the floor plan is enclosed [for your reference].', '隨函附上平面圖一份供您參考。'],
      ]],
      ['as requested', 'æz rɪˋkwɛstɪd', 'adv.', '依您的要求', 'as requested, ...', 2, [], [
        ['Here is the revised invoice, [as requested].', '這是依您要求修改後的發票。'],
        ['[As requested], we have changed the delivery date to May 10.', '依您的要求，我們已把交貨日改為 5 月 10 日。'],
      ]],
      ['effective immediately', 'ɪˋfɛktɪv ɪˋmidɪɪtlɪ', 'adv.', '即日起生效', 'effective immediately, ...', 3, [], [
        ['[Effective immediately], all visitors must wear a badge.', '即日起，所有訪客都必須配戴識別證。'],
        ['Mr. Tan has resigned as sales director, [effective immediately].', '陳先生已辭去業務總監一職，即日生效。'],
      ]],
      ['valid until', 'ˋvælɪd ənˋtɪl', 'adj.', '有效期限至', 'valid until the end of the month', 2, [], [
        ['This coupon is [valid until] the end of March.', '這張折價券有效期限到三月底。'],
        ['The special price is [valid until] June 30 only.', '特價只到 6 月 30 日為止。'],
      ]],
      ['subject to', 'ˋsʌbdʒɪkt tu', 'adj.', '受…約束；視…而定', 'subject to change', 3, [], [
        ['Prices are [subject to] change without notice.', '價格如有變動，恕不另行通知。'],
        ['All travel requests are [subject to] manager approval.', '所有出差申請都須經主管核准。'],
      ]],
      ['terms and conditions', 'tɝmz ənd kənˋdɪʃənz', 'n.', '條款與條件', 'read the terms and conditions', 2, [], [
        ['Please read the [terms and conditions] before signing.', '簽名前請詳閱條款與條件。'],
        ['The [terms and conditions] of the sale are listed on the back.', '銷售條款與條件列在背面。'],
      ]],
      ['on file', 'ɑn faɪl', 'prep.', '存檔中', 'keep on file', 3, [], [
        ['We will keep your résumé [on file] for six months.', '我們會將您的履歷存檔六個月。'],
        ['Do we have her contact details [on file]?', '我們的檔案裡有她的聯絡資料嗎？'],
      ]],
      ['to whom it may concern', 'tu hum ɪt me kənˋsɝn', 'n.', '敬啟者', 'begin with "To whom it may concern"', 2, [], [
        ['[To whom it may concern]: I am writing to recommend Ms. Chen for the position.', '敬啟者：我寫這封信推薦陳小姐擔任該職位。'],
        ['The reference letter began with "[To whom it may concern]."', '這封推薦信以「敬啟者」開頭。'],
      ]],
      ['attention', 'əˋtɛnʃən', 'n.', '注意；（信件）收件人', 'for the attention of', 1, ['attend', 'attentive'], [
        ['May I have your [attention], please?', '請大家注意一下好嗎？'],
        ['Please send the invoice to the [attention] of Mr. Wu.', '請將發票寄給吳先生收。'],
      ]],
      ['acknowledgment', 'əkˋnɑlɪdʒmənt', 'n.', '確認收到；致謝', 'an acknowledgment of receipt', 3, ['acknowledge', 'acknowledged'], [
        ['You will receive an [acknowledgment] by e-mail once we get your application.', '我們收到您的申請後，會以電子郵件通知您。'],
        ['We have not yet received an [acknowledgment] of our order.', '我們還沒收到訂單的確認回覆。'],
      ]],
      ['confirmation number', 'ˏkɑnfɚˋmeʃən ˋnʌmbɚ', 'n.', '確認編號', 'give your confirmation number', 2, [], [
        ['Please have your [confirmation number] ready when you call.', '來電時請準備好您的確認編號。'],
        ['Your [confirmation number] is printed at the top of the e-mail.', '您的確認編號印在電子郵件最上方。'],
      ]],
      ['reference number', 'ˋrɛfərəns ˋnʌmbɚ', 'n.', '參考編號', 'quote the reference number', 2, [], [
        ['Please include the [reference number] in all correspondence.', '所有往來信件請註明參考編號。'],
        ['Write the invoice [reference number] on your payment slip.', '請在繳款單上寫下發票的參考編號。'],
      ]],
      ['in writing', 'ɪn ˋraɪtɪŋ', 'prep.', '以書面形式', 'confirm in writing', 2, [], [
        ['Please submit your complaint [in writing].', '請以書面形式提出申訴。'],
        ['All changes to the contract must be made [in writing].', '合約的任何變更都必須以書面為之。'],
      ]],
      ['enclosure', 'ɪnˋkloʒɚ', 'n.', '附件', 'see enclosure', 3, ['enclose', 'enclosing'], [
        ['Please see the [enclosure] for the full price list.', '完整價目表請見附件。'],
        ['The letter came with one [enclosure], a signed contract.', '這封信附有一份附件：一份簽好的合約。'],
      ]],
    ],
  },
  {
    id: 'economy', track: 'toeic', name: '經濟與市場', icon: '💹', words: [
      ['economy', 'ɪˋkɑnəmɪ', 'n.', '經濟', 'the global economy', 1, ['economic', 'economical', 'economize'], [
        ['The local [economy] depends heavily on tourism.', '當地經濟非常依賴觀光業。'],
        ['Experts expect the [economy] to recover next year.', '專家預期經濟明年會復甦。'],
      ]],
      ['economic', 'ˏikəˋnɑmɪk', 'adj.', '經濟的', 'economic growth', 2, ['economical', 'economically', 'economize'], [
        ['Rising fuel prices slowed [economic] growth last year.', '油價上漲使去年的經濟成長趨緩。'],
        ['Many countries face serious [economic] challenges this year.', '今年許多國家面臨嚴峻的經濟挑戰。'],
      ]],
      ['recession', 'rɪˋsɛʃən', 'n.', '經濟衰退', 'enter a recession', 3, ['recede', 'receded'], [
        ['Many companies cut jobs during the [recession].', '許多公司在經濟衰退期間裁員。'],
        ['Economists warn that a [recession] may begin next year.', '經濟學家警告明年可能開始經濟衰退。'],
      ]],
      ['growth', 'groθ', 'n.', '成長', 'sales growth', 1, ['grow', 'grown', 'grew'], [
        ['The company reported strong [growth] in online sales.', '公司公布網路銷售強勁成長。'],
        ['The tourism industry has shown steady [growth] this quarter.', '觀光業本季呈現穩定成長。'],
      ]],
      ['supply', 'səˋplaɪ', 'n.', '供應', 'supply and demand', 1, ['supplied', 'supplies'], [
        ['The [supply] of fresh vegetables is limited this winter.', '今年冬天新鮮蔬菜的供應有限。'],
        ['A steady [supply] of parts is essential for the factory.', '穩定的零件供應對工廠來說非常重要。'],
      ]],
      ['trade', 'tred', 'n.', '貿易', 'international trade', 1, ['trader', 'traded'], [
        ['Foreign [trade] makes up a large part of the economy.', '對外貿易占經濟的很大一部分。'],
        ['The two countries signed a deal to boost [trade].', '兩國簽署協議以促進貿易。'],
      ]],
      ['export', 'ˋɛksport', 'n.', '出口；出口品', 'a major export', 1, ['exporter', 'exported'], [
        ["Rice is the country's main [export].", '稻米是這個國家主要的出口品。'],
        ['Wine is a major [export] for South Australia.', '葡萄酒是南澳的主要出口品。'],
      ]],
      ['import', 'ˋɪmport', 'n.', '進口；進口品', 'a ban on imports', 1, ['importer', 'imported'], [
        ["Oil is the country's largest [import].", '石油是這個國家最大的進口品。'],
        ['Coffee is a popular [import] in Taiwan.', '咖啡在台灣是很受歡迎的進口品。'],
      ]],
      ['tariff', 'ˋtærɪf', 'n.', '關稅', 'impose a tariff on', 3, [], [
        ['The government placed a [tariff] on imported steel.', '政府對進口鋼鐵課徵關稅。'],
        ['The new [tariff] will raise the price of foreign cars.', '新的關稅會讓進口車的價格上漲。'],
      ]],
      ['global', 'ˋglobl̩', 'adj.', '全球的', 'the global market', 1, ['globe', 'globally', 'globalize'], [
        ['The company has a strong [global] presence.', '這家公司在全球都有強大的影響力。'],
        ['Rising oil prices affect the [global] economy.', '油價上漲影響全球經濟。'],
      ]],
      ['boom', 'bum', 'n.', '繁榮；激增', 'a building boom', 2, ['boomed', 'booming'], [
        ['The town enjoyed a building [boom] in the 1990s.', '這個小鎮在 1990 年代經歷了一波建築熱潮。'],
        ['The mining [boom] created thousands of jobs.', '礦業榮景創造了數千個工作機會。'],
      ]],
      ['downturn', 'ˋdaʊnˏtɝn', 'n.', '衰退', 'an economic downturn', 3, ['downtown', 'downward'], [
        ['Sales fell sharply during the economic [downturn].', '經濟衰退期間銷售量大幅下滑。'],
        ['Tourism suffered a [downturn] after the floods.', '水災過後觀光業陷入衰退。'],
      ]],
      ['competition', 'ˏkɑmpəˋtɪʃən', 'n.', '競爭', 'fierce competition', 1, ['compete', 'competitive', 'competitor'], [
        ['There is strong [competition] among online retailers.', '網路零售商之間競爭激烈。'],
        ['Increased [competition] has forced prices down.', '競爭加劇迫使價格下降。'],
      ]],
      ['monopoly', 'məˋnɑpl̩ɪ', 'n.', '壟斷', 'have a monopoly on', 3, ['monopolize', 'monopolistic'], [
        ['The company had a [monopoly] on the local bus service.', '這家公司壟斷了當地的公車服務。'],
        ['The law prevents any firm from holding a [monopoly].', '法律禁止任何公司形成壟斷。'],
      ]],
      ['sector', 'ˋsɛktɚ', 'n.', '部門；產業', 'the service sector', 3, [], [
        ['Jobs in the service [sector] are growing fast.', '服務業的工作機會快速增加。'],
        ['The government plans to invest more in the energy [sector].', '政府計畫加碼投資能源產業。'],
      ]],
      ['industry', 'ˋɪndəstrɪ', 'n.', '產業', 'the tourism industry', 1, ['industrial', 'industrious', 'industrialize'], [
        ['She has worked in the fashion [industry] for ten years.', '她在時尚產業工作了十年。'],
        ['The tourism [industry] employs thousands of people.', '觀光產業雇用了數千人。'],
      ]],
      ['market trend', 'ˋmɑrkɪt trɛnd', 'n.', '市場趨勢', 'follow market trends', 2, [], [
        ['Our analysts study every [market trend] closely.', '我們的分析師仔細研究每一個市場趨勢。'],
        ['The growing demand for electric cars is a clear [market trend].', '電動車需求增加是明顯的市場趨勢。'],
      ]],
      ['purchasing power', 'ˋpɝtʃəsɪŋ ˋpaʊɚ', 'n.', '購買力', 'increase purchasing power', 3, [], [
        ["High inflation has reduced consumers' [purchasing power].", '高通膨降低了消費者的購買力。'],
        ['Young people in the city have strong [purchasing power].', '城市裡的年輕人購買力很強。'],
      ]],
      ['unemployment', 'ˏʌnɪmˋplɔɪmənt', 'n.', '失業', 'the unemployment rate', 2, ['unemployed', 'employer'], [
        ['The [unemployment] rate fell to 3.5% last month.', '上個月失業率降到 3.5%。'],
        ['Many young people are worried about [unemployment].', '許多年輕人擔心失業。'],
      ]],
      ['labor', 'ˋlebɚ', 'n.', '勞動力；勞工', 'labor costs', 2, ['laborer', 'laborious'], [
        ['Rising [labor] costs have pushed up prices.', '勞工成本上升推高了價格。'],
        ['The farm is facing a shortage of [labor] this summer.', '這座農場今年夏天面臨人力短缺。'],
      ]],
      ['wage', 'wedʒ', 'n.', '工資', 'the minimum wage', 2, ['waged', 'wager'], [
        ['The minimum [wage] will rise next July.', '最低工資明年七月會調漲。'],
        ['Workers asked for a higher hourly [wage].', '工人要求提高時薪。'],
      ]],
      ['economist', 'ɪˋkɑnəmɪst', 'n.', '經濟學家', 'a leading economist', 2, ['economic', 'economics', 'economical'], [
        ['The [economist] predicted a slow recovery.', '這位經濟學家預測復甦會很緩慢。'],
        ['She works as an [economist] at a major bank.', '她在一家大銀行擔任經濟學家。'],
      ]],
      ['price index', 'praɪs ˋɪndɛks', 'n.', '物價指數', 'the consumer price index', 3, [], [
        ['The consumer [price index] rose by 2% this year.', '今年消費者物價指數上漲了 2%。'],
        ['The government publishes the [price index] every month.', '政府每個月公布物價指數。'],
      ]],
      ['trade agreement', 'tred əˋgrimənt', 'n.', '貿易協定', 'sign a trade agreement', 3, [], [
        ['Australia signed a new [trade agreement] with India.', '澳洲和印度簽署了新的貿易協定。'],
        ['The [trade agreement] will lower taxes on farm products.', '這項貿易協定將降低農產品的稅。'],
      ]],
      ['emerging market', 'ɪˋmɝdʒɪŋ ˋmɑrkɪt', 'n.', '新興市場', 'invest in emerging markets', 3, [], [
        ['Vietnam is an [emerging market] with great potential.', '越南是一個很有潛力的新興市場。'],
        ['The firm wants to expand into an [emerging market] in Africa.', '這家公司想拓展到非洲的新興市場。'],
      ]],
    ],
  },
  {
    id: 'security', track: 'toeic', name: '安全與保全', icon: '🔒', words: [
      ['security guard', 'sɪˋkjʊrətɪ gɑrd', 'n.', '警衛', 'hire a security guard', 1, [], [
        ['A [security guard] checks every visitor at the entrance.', '警衛在入口檢查每一位訪客。'],
        ['Please ask the [security guard] if you lose your key.', '如果你弄丟鑰匙，請詢問警衛。'],
      ]],
      ['surveillance', 'sɚˋveləns', 'n.', '監視', 'under surveillance', 3, [], [
        ['The building is under 24-hour [surveillance].', '這棟大樓有 24 小時監控。'],
        ['The store installed new [surveillance] equipment last week.', '這家店上週安裝了新的監視設備。'],
      ]],
      ['badge', 'bædʒ', 'n.', '識別證', 'wear a name badge', 2, [], [
        ['Please wear your [badge] at all times in the office.', '在辦公室裡請隨時配戴識別證。'],
        ['New employees will receive a [badge] on their first day.', '新進員工第一天會拿到識別證。'],
      ]],
      ['access card', 'ˋæksɛs kɑrd', 'n.', '門禁卡', 'swipe an access card', 2, [], [
        ['You need an [access card] to enter the server room.', '進入機房需要門禁卡。'],
        ['Please report a lost [access card] to the front desk.', '門禁卡遺失請向櫃檯報告。'],
      ]],
      ['ID card', 'ˏaɪˋdi kɑrd', 'n.', '身分證；識別證', 'show your ID card', 1, [], [
        ['Visitors must show an [ID card] at the gate.', '訪客必須在大門出示身分證件。'],
        ['I left my [ID card] at home this morning.', '我今天早上把識別證忘在家裡了。'],
      ]],
      ['visitor pass', 'ˋvɪzɪtɚ pæs', 'n.', '訪客證', 'issue a visitor pass', 2, [], [
        ['Please collect a [visitor pass] from reception.', '請到接待處領取訪客證。'],
        ['Return your [visitor pass] when you leave the building.', '離開大樓時請歸還訪客證。'],
      ]],
      ['protective', 'prəˋtɛktɪv', 'adj.', '保護的', 'protective clothing', 2, ['protect', 'protectively'], [
        ['Workers must wear [protective] clothing in the lab.', '員工在實驗室裡必須穿防護衣。'],
        ['Please put on [protective] gloves before you start.', '開始之前請戴上防護手套。'],
      ]],
      ['helmet', 'ˋhɛlmɪt', 'n.', '安全帽', 'wear a safety helmet', 1, [], [
        ['Everyone on the construction site must wear a [helmet].', '工地上的每個人都必須戴安全帽。'],
        ['He bought a new [helmet] for his motorcycle.', '他為機車買了一頂新安全帽。'],
      ]],
      ['goggles', 'ˋgɑgl̩z', 'n.', '護目鏡', 'safety goggles', 2, [], [
        ['Wear safety [goggles] when you use the cutting machine.', '使用切割機時請戴上護目鏡。'],
        ['The [goggles] protect your eyes from dust.', '護目鏡能保護眼睛不受灰塵傷害。'],
      ]],
      ['gloves', 'glʌvz', 'n.', '手套', 'a pair of gloves', 1, [], [
        ['Kitchen staff must wear [gloves] when handling food.', '廚房人員處理食物時必須戴手套。'],
        ['These rubber [gloves] protect your hands from chemicals.', '這些橡膠手套能保護雙手不受化學品傷害。'],
      ]],
      ['first aid kit', 'fɝst ed kɪt', 'n.', '急救箱', 'keep a first aid kit', 1, [], [
        ['The [first aid kit] is kept next to the kitchen sink.', '急救箱放在廚房水槽旁邊。'],
        ['Every company vehicle should carry a [first aid kit].', '每輛公司車都應該配備急救箱。'],
      ]],
      ['alarm', 'əˋlɑrm', 'n.', '警報', 'a fire alarm', 1, ['alarmed', 'alarming'], [
        ['The fire [alarm] went off during the meeting.', '開會時火災警報響了。'],
        ['Please set the [alarm] before you leave the office.', '離開辦公室前請設定保全警報。'],
      ]],
      ['lock', 'lɑk', 'n.', '鎖', 'change the locks', 1, ['locked', 'unlock'], [
        ['The [lock] on the back door is broken.', '後門的鎖壞了。'],
        ['I need a new key for this [lock].', '這個鎖我需要一把新鑰匙。'],
      ]],
      ['unlock', 'ʌnˋlɑk', 'v.', '解鎖', 'unlock the door', 1, ['unlocked', 'unlocking'], [
        ['Tap your card here to [unlock] the door.', '在這裡感應卡片就能開門。'],
        ['Only managers can [unlock] the storage room.', '只有主管能打開儲藏室的鎖。'],
      ]],
      ['authorized personnel', 'ˋɔθəˏraɪzd ˏpɝsn̩ˋɛl', 'n.', '授權人員', 'authorized personnel only', 3, [], [
        ['This area is open to [authorized personnel] only.', '本區僅限授權人員進入。'],
        ['Only [authorized personnel] may handle the cash.', '只有授權人員可以經手現金。'],
      ]],
      ['restricted area', 'rɪˋstrɪktɪd ˋɛrɪə', 'n.', '管制區', 'enter a restricted area', 2, [], [
        ['Visitors may not enter the [restricted area].', '訪客不得進入管制區。'],
        ['The warehouse is a [restricted area] after 6 p.m.', '晚上六點後倉庫是管制區。'],
      ]],
      ['warning sign', 'ˋwɔrnɪŋ saɪn', 'n.', '警告標誌', 'put up a warning sign', 1, [], [
        ['Please put up a [warning sign] near the wet floor.', '請在濕地板旁放置警告標誌。'],
        ['The driver did not see the [warning sign] on the road.', '駕駛沒有看到路上的警告標誌。'],
      ]],
      ['caution', 'ˋkɔʃən', 'n.', '小心；警告', 'use caution', 2, ['cautious', 'cautiously'], [
        ['Please use [caution] when the floor is wet.', '地板濕滑時請小心。'],
        ['Drivers should proceed with [caution] near the school.', '駕駛在學校附近應小心行駛。'],
      ]],
      ['safety procedure', 'ˋseftɪ prəˋsidʒɚ', 'n.', '安全程序', 'follow safety procedures', 2, [], [
        ['Every worker must follow this [safety procedure] carefully.', '每位員工都必須確實遵守這項安全程序。'],
        ['The manager explained the new [safety procedure] at the meeting.', '經理在會議上說明了新的安全程序。'],
      ]],
      ['security camera', 'sɪˋkjʊrətɪ ˋkæmərə', 'n.', '監視器', 'install a security camera', 1, [], [
        ['A [security camera] recorded the break-in.', '監視器錄下了闖入的過程。'],
        ['We installed a [security camera] above the front door.', '我們在大門上方裝了一台監視器。'],
      ]],
      ['evacuate', 'ɪˋvækjʊˏet', 'v.', '疏散；撤離', 'evacuate the building', 3, ['evacuation', 'evacuated'], [
        ['Staff were told to [evacuate] the building immediately.', '員工被告知立刻撤離大樓。'],
        ['Everyone must [evacuate] when the alarm sounds.', '警報響起時所有人都必須疏散。'],
      ]],
      ['hazardous', 'ˋhæzɚdəs', 'adj.', '危險的', 'hazardous materials', 3, ['hazards', 'hazardously'], [
        ['Store [hazardous] chemicals in a locked cabinet.', '危險化學品要存放在上鎖的櫃子裡。'],
        ['The workers removed the [hazardous] waste safely.', '工人安全地清除了有害廢棄物。'],
      ]],
      ['flammable', 'ˋflæməbl̩', 'adj.', '易燃的', 'flammable materials', 3, ['flames', 'flammability'], [
        ['Keep [flammable] materials away from heat.', '易燃物品要遠離熱源。'],
        ['This liquid is highly [flammable].', '這種液體非常易燃。'],
      ]],
      ['slippery', 'ˋslɪpərɪ', 'adj.', '滑的', 'slippery when wet', 2, ['slip', 'slipper'], [
        ['The floor is [slippery] after it rains.', '下雨後地板很滑。'],
        ['Be careful, the stairs are [slippery].', '小心，樓梯很滑。'],
      ]],
      ['accident report', 'ˋæksədənt rɪˋport', 'n.', '事故報告', 'file an accident report', 2, [], [
        ['Please fill out an [accident report] after any injury.', '發生任何受傷事件後請填寫事故報告。'],
        ['The supervisor sent the [accident report] to head office.', '主管把事故報告送到總公司。'],
      ]],
    ],
  },
  {
    id: 'shipping', track: 'toeic', name: '物流進階', icon: '🚚', words: [
      ['freight', 'fret', 'n.', '貨物；貨運', 'freight costs', 3, ['fright', 'frighten'], [
        ['The [freight] will arrive at the port on Monday.', '這批貨物星期一會抵達港口。'],
        ['[Freight] costs have doubled this year.', '今年貨運成本翻了一倍。'],
      ]],
      ['cargo', 'ˋkɑrgo', 'n.', '貨物', 'unload the cargo', 2, [], [
        ['The ship was carrying [cargo] from China.', '這艘船載著來自中國的貨物。'],
        ['Workers unloaded the [cargo] at the airport.', '工人在機場卸下貨物。'],
      ]],
      ['port', 'port', 'n.', '港口', 'arrive at the port', 1, [], [
        ['The ship will reach the [port] of Sydney tomorrow.', '這艘船明天會抵達雪梨港。'],
        ['Kaohsiung is the busiest [port] in Taiwan.', '高雄是台灣最繁忙的港口。'],
      ]],
      ['customs clearance', 'ˋkʌstəmz ˋklɪrəns', 'n.', '清關', 'wait for customs clearance', 3, [], [
        ['The goods are still waiting for [customs clearance].', '這批貨還在等待清關。'],
        ['[Customs clearance] usually takes two to three days.', '清關通常需要兩到三天。'],
      ]],
      ['tracking number', 'ˋtrækɪŋ ˋnʌmbɚ', 'n.', '追蹤號碼', 'enter the tracking number', 1, [], [
        ['Enter your [tracking number] to check the delivery status.', '輸入追蹤號碼即可查詢配送狀態。'],
        ['We will email you the [tracking number] once the item ships.', '商品出貨後我們會寄追蹤號碼給您。'],
      ]],
      ['shipping fee', 'ˋʃɪpɪŋ fi', 'n.', '運費', 'free shipping fee', 1, [], [
        ['The [shipping fee] is waived for orders over $50.', '訂單滿 50 元免運費。'],
        ['Is the [shipping fee] included in the price?', '價格有包含運費嗎？'],
      ]],
      ['express delivery', 'ɪkˋsprɛs dɪˋlɪvərɪ', 'n.', '快遞', 'choose express delivery', 1, [], [
        ['[Express delivery] costs an extra $15.', '快遞要多付 15 元。'],
        ['I chose [express delivery] because I need the part tomorrow.', '我選了快遞，因為明天就需要這個零件。'],
      ]],
      ['parcel', 'ˋpɑrsl̩', 'n.', '包裹', 'send a parcel', 1, [], [
        ['A [parcel] arrived for you this morning.', '今天早上有你的包裹。'],
        ['Please weigh the [parcel] before you send it.', '寄出前請先秤包裹的重量。'],
      ]],
      ['packing slip', 'ˋpækɪŋ slɪp', 'n.', '裝箱單', 'check the packing slip', 3, [], [
        ['Check the items against the [packing slip].', '請對照裝箱單清點品項。'],
        ['The [packing slip] is attached to the outside of the box.', '裝箱單貼在箱子外面。'],
      ]],
      ['loading dock', 'ˋlodɪŋ dɑk', 'n.', '裝卸平台', 'at the loading dock', 3, [], [
        ['The truck is waiting at the [loading dock].', '卡車正在裝卸平台等候。'],
        ['Deliveries should go to the [loading dock] behind the building.', '送貨請到大樓後方的裝卸平台。'],
      ]],
      ['consignment', 'kənˋsaɪnmənt', 'n.', '託運貨物', 'a consignment of goods', 3, ['consign', 'consigned'], [
        ['The [consignment] of shoes arrived damaged.', '這批託運的鞋子到貨時已經損壞。'],
        ['Please sign for the [consignment] when it arrives.', '貨物送達時請簽收。'],
      ]],
      ['delivery truck', 'dɪˋlɪvərɪ trʌk', 'n.', '貨車', 'load the delivery truck', 1, [], [
        ['The [delivery truck] is parked outside the store.', '貨車停在店外面。'],
        ['We need to load the [delivery truck] by 8 a.m.', '我們必須在早上八點前把貨車裝好。'],
      ]],
      ['fleet', 'flit', 'n.', '車隊；船隊', 'a fleet of trucks', 3, [], [
        ['The company owns a [fleet] of fifty trucks.', '這家公司擁有五十輛卡車的車隊。'],
        ['We plan to replace our entire [fleet] with electric vans.', '我們計畫把整個車隊換成電動廂型車。'],
      ]],
      ['estimated arrival', 'ˋɛstəˏmetɪd əˋraɪvl̩', 'n.', '預計抵達', 'estimated arrival time', 2, [], [
        ['The [estimated arrival] time is 3 p.m.', '預計抵達時間是下午三點。'],
        ['You can see the [estimated arrival] date on the tracking page.', '您可以在追蹤頁面看到預計到貨日期。'],
      ]],
      ['in transit', 'ɪn ˋtrænsɪt', 'prep.', '運送途中', 'goods in transit', 2, [], [
        ['Your order is currently [in transit].', '您的訂單目前正在運送途中。'],
        ['Some items were damaged [in transit].', '有些商品在運送途中損壞了。'],
      ]],
      ['out for delivery', 'aʊt fɔr dɪˋlɪvərɪ', 'prep.', '配送中', 'be out for delivery', 2, [], [
        ['Your parcel is [out for delivery] today.', '您的包裹今天正在配送中。'],
        ['The tracking page says my order is [out for delivery].', '追蹤頁面顯示我的訂單正在配送。'],
      ]],
      ['return label', 'rɪˋtɝn ˋlebl̩', 'n.', '退貨標籤', 'print a return label', 2, [], [
        ['Print the [return label] and stick it on the box.', '請印出退貨標籤並貼在箱子上。'],
        ['A free [return label] is included in the package.', '包裹內附有免費的退貨標籤。'],
      ]],
      ['proof of delivery', 'pruf əv dɪˋlɪvərɪ', 'n.', '送達證明', 'request proof of delivery', 3, [], [
        ['The driver took a photo as [proof of delivery].', '司機拍了一張照片作為送達證明。'],
        ['Please keep the signed [proof of delivery] for our records.', '請保留簽收的送達證明以便存檔。'],
      ]],
      ['bulk order', 'bʌlk ˋɔrdɚ', 'n.', '大量訂單', 'place a bulk order', 2, [], [
        ['We offer a discount on every [bulk order].', '大量訂購一律有折扣。'],
        ['The hotel placed a [bulk order] for towels.', '飯店大量訂購了毛巾。'],
      ]],
      ['restock', 'riˋstɑk', 'v.', '補貨', 'restock the shelves', 2, ['restocked', 'restocking'], [
        ['We need to [restock] the shelves before Monday.', '我們必須在星期一前把貨架補滿。'],
        ['The store will [restock] this item next week.', '這家店下週會補這項商品的貨。'],
      ]],
      ['backlog', 'ˋbækˏlɔg', 'n.', '積壓（的工作）', 'clear the backlog', 3, [], [
        ['We hired extra staff to clear the [backlog] of orders.', '我們加派人手來消化積壓的訂單。'],
        ['The holiday rush created a huge [backlog].', '假期的購物潮造成大量積壓。'],
      ]],
      ['fulfillment', 'fʊlˋfɪlmənt', 'n.', '訂單履行；實現', 'order fulfillment', 3, ['fulfill', 'fulfilled'], [
        ['The company outsources order [fulfillment] to a warehouse in Melbourne.', '這家公司把訂單出貨外包給墨爾本的一間倉庫。'],
        ['Faster [fulfillment] means happier customers.', '出貨越快，顧客越滿意。'],
      ]],
      ['distribution center', 'ˏdɪstrəˋbjuʃən ˋsɛntɚ', 'n.', '配送中心', 'a regional distribution center', 2, [], [
        ['All orders are shipped from our [distribution center] in Taoyuan.', '所有訂單都從我們在桃園的配送中心出貨。'],
        ['The company is building a new [distribution center] near the airport.', '公司正在機場附近興建新的配送中心。'],
      ]],
      ['container ship', 'kənˋtenɚ ʃɪp', 'n.', '貨櫃船', 'a large container ship', 2, [], [
        ['A huge [container ship] is entering the harbor.', '一艘巨大的貨櫃船正駛入港口。'],
        ['The goods will travel by [container ship] to Brisbane.', '這批貨會用貨櫃船運到布里斯本。'],
      ]],
      ['handling fee', 'ˋhændlɪŋ fi', 'n.', '手續費', 'charge a handling fee', 2, [], [
        ['A small [handling fee] is added to each order.', '每筆訂單會加收一點手續費。'],
        ['The airline charges a [handling fee] for oversized items.', '航空公司對超大件物品收取手續費。'],
      ]],
    ],
  },
  {
    id: 'it2', track: 'toeic', name: 'IT 進階', icon: '🖥️', words: [
      ['cloud computing', 'klaʊd kəmˋpjutɪŋ', 'n.', '雲端運算', 'move to cloud computing', 2, [], [
        ['[Cloud computing] lets staff work from anywhere.', '雲端運算讓員工可以在任何地方工作。'],
        ['The company saved money by switching to [cloud computing].', '公司改用雲端運算後省下了不少錢。'],
      ]],
      ['cybersecurity', 'ˏsaɪbɚsɪˋkjʊrətɪ', 'n.', '資訊安全', 'improve cybersecurity', 3, [], [
        ['The bank spends millions on [cybersecurity] every year.', '這家銀行每年花數百萬元在資訊安全上。'],
        ['All employees must complete [cybersecurity] training.', '所有員工都必須完成資安訓練。'],
      ]],
      ['data breach', 'ˋdetə britʃ', 'n.', '資料外洩', 'report a data breach', 3, [], [
        ['The [data breach] exposed thousands of customer emails.', '這次資料外洩曝光了數千名客戶的電子郵件。'],
        ['The company apologized for the [data breach].', '公司為資料外洩事件道歉。'],
      ]],
      ['firewall', 'ˋfaɪrˏwɔl', 'n.', '防火牆', 'set up a firewall', 2, [], [
        ['The [firewall] blocks suspicious traffic from the Internet.', '防火牆會阻擋來自網路的可疑流量。'],
        ['The IT team updated the [firewall] settings last night.', '資訊團隊昨晚更新了防火牆設定。'],
      ]],
      ['operating system', 'ˋɑpəˏretɪŋ ˋsɪstəm', 'n.', '作業系統', 'update the operating system', 2, [], [
        ['Please update the [operating system] on your laptop.', '請更新你筆電的作業系統。'],
        ['This app only works on the latest [operating system].', '這個 App 只能在最新的作業系統上使用。'],
      ]],
      ['browser', 'ˋbraʊzɚ', 'n.', '瀏覽器', 'a web browser', 1, ['browse', 'browsing'], [
        ['Please update your web [browser] to the latest version.', '請把你的網頁瀏覽器更新到最新版。'],
        ['Try opening the link in a different [browser].', '試著用另一個瀏覽器開啟連結。'],
      ]],
      ['user account', 'ˋjuzɚ əˋkaʊnt', 'n.', '使用者帳號', 'create a user account', 1, [], [
        ['Each new employee gets a [user account] on the first day.', '每位新員工第一天都會拿到使用者帳號。'],
        ['Your [user account] will be locked after five failed logins.', '登入失敗五次後，你的使用者帳號會被鎖住。'],
      ]],
      ['two-factor authentication', 'tu ˋfæktɚ ɔˏθɛntɪˋkeʃən', 'n.', '雙重驗證', 'turn on two-factor authentication', 3, [], [
        ['Please turn on [two-factor authentication] for your email.', '請為你的電子郵件開啟雙重驗證。'],
        ['[Two-factor authentication] makes your account much safer.', '雙重驗證讓你的帳號安全得多。'],
      ]],
      ['privacy policy', 'ˋpraɪvəsɪ ˋpɑləsɪ', 'n.', '隱私權政策', 'read the privacy policy', 2, [], [
        ['Please read our [privacy policy] before signing up.', '註冊前請先閱讀我們的隱私權政策。'],
        ['The company updated its [privacy policy] last month.', '公司上個月更新了隱私權政策。'],
      ]],
      ['artificial intelligence', 'ˏɑrtəˋfɪʃəl ɪnˋtɛlədʒəns', 'n.', '人工智慧', 'use artificial intelligence', 2, [], [
        ['The bank uses [artificial intelligence] to detect fraud.', '這家銀行利用人工智慧偵測詐騙。'],
        ['[Artificial intelligence] is changing the way we work.', '人工智慧正在改變我們的工作方式。'],
      ]],
      ['algorithm', 'ˋælgəˏrɪðəm', 'n.', '演算法', 'a search algorithm', 3, ['algorithmic', 'logarithm'], [
        ['The [algorithm] recommends videos based on your history.', '演算法會根據你的觀看紀錄推薦影片。'],
        ['Engineers improved the search [algorithm] last month.', '工程師上個月改良了搜尋演算法。'],
      ]],
      ['coding', 'ˋkodɪŋ', 'n.', '寫程式', 'coding skills', 2, ['coded', 'coder'], [
        ['She is taking a [coding] class online.', '她正在上線上程式課。'],
        ['[Coding] skills are in high demand these days.', '現在程式設計能力的需求很高。'],
      ]],
      ['developer', 'dɪˋvɛləpɚ', 'n.', '開發人員', 'a software developer', 2, ['develop', 'development'], [
        ['She works as a software [developer] in Taipei.', '她在台北擔任軟體開發人員。'],
        ['The [developer] fixed the problem overnight.', '開發人員連夜修好了問題。'],
      ]],
      ['programmer', 'ˋproˏgræmɚ', 'n.', '程式設計師', 'hire a programmer', 2, ['program', 'programming'], [
        ['The company hired a new [programmer] last week.', '公司上週雇用了一位新的程式設計師。'],
        ['The [programmer] who wrote this app now works in Sydney.', '寫這個 App 的程式設計師現在在雪梨工作。'],
      ]],
      ['bug', 'bʌg', 'n.', '程式錯誤', 'fix a bug', 1, [], [
        ['The team found a [bug] in the payment system.', '團隊在付款系統裡發現了一個錯誤。'],
        ['The new update fixes a [bug] that caused the app to freeze.', '新版本修正了導致 App 卡住的錯誤。'],
      ]],
      ['glitch', 'glɪtʃ', 'n.', '小故障', 'a technical glitch', 3, [], [
        ['A technical [glitch] delayed the online meeting.', '一個技術小故障讓線上會議延遲了。'],
        ['The website was down for an hour because of a [glitch].', '網站因為小故障停擺了一個小時。'],
      ]],
      ['crash', 'kræʃ', 'v.', '當機', 'the system crashed', 1, ['crashed', 'crashing'], [
        ['The system tends to [crash] when too many users log in.', '太多人同時登入時，系統容易當機。'],
        ['Too many open tabs can make your browser [crash].', '開太多分頁可能會讓瀏覽器當機。'],
      ]],
      ['reboot', 'riˋbut', 'v.', '重新開機', 'reboot the computer', 2, ['rebooted', 'rebooting'], [
        ['Please [reboot] your computer after the update.', '更新後請重新開機。'],
        ['You may need to [reboot] the router.', '你可能需要重新啟動路由器。'],
      ]],
      ['settings', 'ˋsɛtɪŋz', 'n.', '設定', 'change the settings', 1, [], [
        ['You can change the language in [settings].', '你可以在設定裡更改語言。'],
        ['Check your privacy [settings] on the app.', '檢查一下 App 的隱私設定。'],
      ]],
      ['storage space', 'ˋstorɪdʒ spes', 'n.', '儲存空間', 'free up storage space', 1, [], [
        ['My phone is running out of [storage space].', '我的手機儲存空間快不夠了。'],
        ['Delete old files to free up [storage space].', '刪除舊檔案來釋放儲存空間。'],
      ]],
      ['file sharing', 'faɪl ˋʃɛrɪŋ', 'n.', '檔案分享', 'a file sharing service', 2, [], [
        ['We use a [file sharing] service to send large videos.', '我們用檔案分享服務傳送大型影片。'],
        ['[File sharing] makes teamwork much easier.', '檔案分享讓團隊合作輕鬆許多。'],
      ]],
      ['video conference', 'ˋvɪdɪˏo ˋkɑnfərəns', 'n.', '視訊會議', 'hold a video conference', 1, [], [
        ['We have a [video conference] with the Tokyo office at 9 a.m.', '我們早上九點和東京辦公室開視訊會議。'],
        ['Please mute your microphone during the [video conference].', '視訊會議期間請把麥克風靜音。'],
      ]],
      ['screen', 'skrin', 'n.', '螢幕', 'a cracked screen', 1, [], [
        ['The [screen] on my laptop is too small.', '我筆電的螢幕太小了。'],
        ['Please share your [screen] so we can see the report.', '請分享你的螢幕，讓我們看報告。'],
      ]],
      ['touchscreen', 'ˋtʌtʃˏskrin', 'n.', '觸控螢幕', 'a touchscreen display', 1, [], [
        ['Customers order their food on a [touchscreen].', '顧客在觸控螢幕上點餐。'],
        ['The [touchscreen] does not work when your hands are wet.', '手濕的時候觸控螢幕不能用。'],
      ]],
      ['IT department', 'ˏaɪˋti dɪˋpɑrtmənt', 'n.', '資訊部門', 'contact the IT department', 1, [], [
        ['Please contact the [IT department] if you forget your password.', '如果忘記密碼，請聯絡資訊部門。'],
        ['The [IT department] will install the new software tonight.', '資訊部門今晚會安裝新軟體。'],
      ]],
    ],
  },
  {
    id: 'farm', track: 'life', name: '農場工作', icon: '🚜', words: [
      ['farm', 'fɑrm', 'n.', '農場', 'work on a farm', 1, ['farmer', 'farming'], [
        ['She worked on a [farm] in Queensland for three months.', '她在昆士蘭的農場工作了三個月。'],
        ['We stayed in a small cabin on the [farm].', '我們住在農場上的小木屋裡。'],
      ]],
      ['farmhand', 'ˋfɑrmˏhænd', 'n.', '農場工人', 'work as a farmhand', 2, [], [
        ['He found a job as a [farmhand] near Bundaberg.', '他在班德堡附近找到農場工人的工作。'],
        ['The [farmhand] showed us how to drive the tractor.', '那位農場工人教我們怎麼開拖拉機。'],
      ]],
      ['pick', 'pɪk', 'v.', '摘；挑選', 'pick fruit', 1, ['picked', 'picking', 'picker'], [
        ['You need to [pick] at least ten buckets a day.', '你一天至少要摘十桶。'],
        ['Please [pick] only the ripe tomatoes.', '請只摘熟的番茄。'],
      ]],
      ['packing shed', 'ˋpækɪŋ ʃɛd', 'n.', '包裝棚', 'work in the packing shed', 2, [], [
        ['On rainy days we work in the [packing shed].', '下雨天我們在包裝棚工作。'],
        ['The [packing shed] is cooler than the fields.', '包裝棚比田裡涼快。'],
      ]],
      ['punnet', 'ˋpʌnɪt', 'n.', '（水果）小盒', 'a punnet of strawberries', 3, [], [
        ['A [punnet] of strawberries costs $3 at the market.', '市場上一小盒草莓賣 3 元。'],
        ["Fill each [punnet] to the top, but don't squash the fruit.", '每一小盒都要裝滿，但不要壓壞水果。'],
      ]],
      ['crate', 'kret', 'n.', '板條箱', 'a crate of apples', 2, [], [
        ['Each [crate] of apples weighs about 20 kilos.', '每箱蘋果大約重 20 公斤。'],
        ['Stack the full [crate] next to the tractor.', '把裝滿的箱子疊在拖拉機旁邊。'],
      ]],
      ['bucket', 'ˋbʌkɪt', 'n.', '水桶', 'fill a bucket', 1, [], [
        ['We get paid for every [bucket] of blueberries we pick.', '我們每摘一桶藍莓就有一份錢。'],
        ['Empty your [bucket] into the big bin at the end of the row.', '把你的桶子倒進行尾的大箱子裡。'],
      ]],
      ['sunscreen', 'ˋsʌnˏskrin', 'n.', '防曬乳', 'put on sunscreen', 1, [], [
        ['Put on [sunscreen] before you go out to the fields.', '下田前要先擦防曬乳。'],
        ['The Australian sun is strong, so I bought a big bottle of [sunscreen].', '澳洲的太陽很毒，所以我買了一大瓶防曬乳。'],
      ]],
      ['piece rate', 'pis ret', 'n.', '計件工資', 'be paid at a piece rate', 3, [], [
        ['On a [piece rate], fast pickers can earn good money.', '按件計酬的話，摘得快的人可以賺不少。'],
        ['The [piece rate] for oranges is $40 per bin.', '柳丁的計件工資是每箱 40 元。'],
      ]],
      ['hourly rate', 'ˋaʊrlɪ ret', 'n.', '時薪', 'a fair hourly rate', 2, [], [
        ['The [hourly rate] at this farm is $28.', '這座農場的時薪是 28 元。'],
        ['I prefer an [hourly rate] because I am a slow picker.', '我比較喜歡領時薪，因為我摘得很慢。'],
      ]],
      ['backpacker', 'ˋbækˏpækɚ', 'n.', '背包客', 'a backpacker hostel', 1, ['backpack', 'backpacking'], [
        ['Every [backpacker] on the farm gets a free lunch on Fridays.', '農場上每位背包客星期五都有免費午餐。'],
        ['As a [backpacker], I try to save money on food.', '身為背包客，我盡量在吃的方面省錢。'],
      ]],
      ['regional', 'ˋridʒənl̩', 'adj.', '偏遠地區的；區域的', 'regional Australia', 2, ['region', 'regionally'], [
        ['You need to work in [regional] Australia for 88 days.', '你需要在澳洲偏遠地區工作 88 天。'],
        ['Many [regional] towns need fruit pickers in summer.', '許多偏遠小鎮夏天需要採果工人。'],
      ]],
      ['second-year visa', 'ˋsɛkənd jɪr ˋvizə', 'n.', '第二年簽證', 'apply for a second-year visa', 2, [], [
        ['I am doing farm work to get a [second-year visa].', '我在做農場工作，為了拿第二年簽證。'],
        ['Keep your payslips when you apply for the [second-year visa].', '申請第二年簽證時要保留薪資單。'],
      ]],
      ['sheep', 'ʃip', 'n.', '羊', 'a flock of sheep', 1, [], [
        ['The farm has more than two thousand [sheep].', '這座農場有兩千多隻羊。'],
        ['We helped move the [sheep] to another paddock.', '我們幫忙把羊趕到另一片牧場。'],
      ]],
      ['shearing', 'ˋʃɪrɪŋ', 'n.', '剪羊毛', 'shearing season', 3, [], [
        ['[Shearing] season starts in early spring.', '剪羊毛的季節在早春開始。'],
        ['He got a job helping in the [shearing] shed.', '他找到一份在剪毛棚幫忙的工作。'],
      ]],
      ['heat stroke', 'hit strok', 'n.', '中暑', 'suffer from heat stroke', 2, [], [
        ['Drink plenty of water to avoid [heat stroke].', '多喝水以免中暑。'],
        ['One of the pickers got [heat stroke] on a 40-degree day.', '在攝氏 40 度的那天有一位採果工中暑了。'],
      ]],
      ['insect repellent', 'ˋɪnsɛkt rɪˋpɛlənt', 'n.', '防蚊液', 'spray insect repellent', 2, [], [
        ['Spray some [insect repellent] before you go into the orchard.', '進果園前先噴一點防蚊液。'],
        ["The mosquitoes are bad here, so don't forget your [insect repellent].", '這裡蚊子很多，別忘了帶防蚊液。'],
      ]],
      ['flies', 'flaɪz', 'n.', '蒼蠅（複數）', 'swat the flies', 1, [], [
        ['The [flies] in the outback drive me crazy.', '內陸的蒼蠅快把我逼瘋了。'],
        ['Some workers wear a net over their hats to keep the [flies] away.', '有些工人在帽子上罩網子來防蒼蠅。'],
      ]],
      ['muddy', 'ˋmʌdɪ', 'adj.', '泥濘的', 'muddy boots', 2, [], [
        ['The paddock gets very [muddy] after heavy rain.', '大雨過後牧場會變得很泥濘。'],
        ['Please leave your [muddy] boots outside the kitchen.', '請把沾滿泥巴的靴子留在廚房外面。'],
      ]],
      ['prune', 'prun', 'v.', '修剪（枝葉）', 'prune the vines', 3, ['pruned', 'pruning'], [
        ['Our job this week is to [prune] the apple trees.', '我們這週的工作是修剪蘋果樹。'],
        ['The supervisor showed us how to [prune] the grapevines.', '主管示範給我們看怎麼修剪葡萄藤。'],
      ]],
      ['weed', 'wid', 'v.', '除草；雜草', 'weed the garden', 2, ['weeded', 'weeding'], [
        ['We had to [weed] the vegetable beds all morning.', '我們整個早上都在給菜圃除草。'],
        ['Can you help me [weed] the garden this weekend?', '這個週末你可以幫我拔花園的草嗎？'],
      ]],
      ['sunburn', 'ˋsʌnˏbɝn', 'n.', '曬傷', 'get a bad sunburn', 1, ['sunburnt', 'sunbathe'], [
        ['I got a bad [sunburn] on my first day of picking.', '我第一天採果就嚴重曬傷了。'],
        ['Wear a hat and long sleeves to avoid [sunburn].', '戴帽子、穿長袖以免曬傷。'],
      ]],
      ['water bottle', 'ˋwɔtɚ ˋbɑtl̩', 'n.', '水壺', 'refill your water bottle', 1, [], [
        ['Bring a big [water bottle] because it gets very hot.', '帶個大水壺，因為天氣會很熱。'],
        ['You can refill your [water bottle] at the shed.', '你可以在工寮裝水。'],
      ]],
      ['work boots', 'wɝk buts', 'n.', '工作靴', 'a pair of work boots', 1, [], [
        ['You must wear [work boots] in the orchard.', '在果園裡一定要穿工作靴。'],
        ['I bought cheap [work boots] at Kmart.', '我在 Kmart 買了便宜的工作靴。'],
      ]],
      ['ute', 'jut', 'n.', '小貨卡（澳）', 'drive a ute', 3, [], [
        ['The farmer picked us up in his [ute].', '農場主人開著他的小貨卡來接我們。'],
        ['Throw the empty crates in the back of the [ute].', '把空箱子丟到小貨卡的後車斗。'],
      ]],
    ],
  },
  {
    id: 'hostel', track: 'life', name: '青年旅館與分租', icon: '🛏️', words: [
      ['hostel', 'ˋhɑstl̩', 'n.', '青年旅館', 'stay at a hostel', 1, ['hostile', 'hostility'], [
        ['We booked a cheap [hostel] near Bondi Beach.', '我們訂了邦代海灘附近一間便宜的青年旅館。'],
        ['The [hostel] has free Wi-Fi and a barbecue area.', '這間青年旅館有免費 Wi-Fi 和烤肉區。'],
      ]],
      ['dorm', 'dɔrm', 'n.', '宿舍房', 'an eight-bed dorm', 1, [], [
        ['I am staying in a six-bed [dorm] to save money.', '為了省錢，我住六人房。'],
        ['The [dorm] was quiet because most people were out.', '大部分的人都出去了，所以宿舍房很安靜。'],
      ]],
      ['bunk bed', 'bʌŋk bɛd', 'n.', '上下鋪', 'the top bunk bed', 1, [], [
        ['I always ask for the bottom [bunk bed].', '我總是要求睡下鋪。'],
        ['Our room has one [bunk bed] and a small desk.', '我們房間有一張上下鋪和一張小書桌。'],
      ]],
      ['shared kitchen', 'ʃɛrd ˋkɪtʃɪn', 'n.', '共用廚房', 'cook in the shared kitchen', 1, [], [
        ['Please wash your dishes in the [shared kitchen].', '請在共用廚房把碗盤洗乾淨。'],
        ['The [shared kitchen] gets crowded around dinner time.', '晚餐時間共用廚房會很擠。'],
      ]],
      ['common room', 'ˋkɑmən rum', 'n.', '交誼廳', 'meet in the common room', 2, [], [
        ['We watched a movie together in the [common room].', '我們在交誼廳一起看電影。'],
        ['The [common room] has a pool table and free books.', '交誼廳有撞球桌和免費的書。'],
      ]],
      ['locker', 'ˋlɑkɚ', 'n.', '置物櫃', 'lock your locker', 1, ['locked', 'locking'], [
        ['Keep your passport in the [locker] under your bed.', '把護照放在床底下的置物櫃裡。'],
        ['Each guest gets a [locker] at no extra cost.', '每位房客都有一個免費的置物櫃。'],
      ]],
      ['curfew', 'ˋkɝfju', 'n.', '門禁', 'a midnight curfew', 2, [], [
        ['This hostel has a [curfew] at midnight.', '這間青旅的門禁是午夜十二點。'],
        ['There is no [curfew], so you can come back any time.', '這裡沒有門禁，你隨時都可以回來。'],
      ]],
      ['reception desk', 'rɪˋsɛpʃən dɛsk', 'n.', '接待櫃檯', 'ask at the reception desk', 1, [], [
        ['You can borrow a towel from the [reception desk].', '你可以向接待櫃檯借毛巾。'],
        ['The [reception desk] is open from 7 a.m. to 10 p.m.', '接待櫃檯早上七點到晚上十點有人。'],
      ]],
      ['noisy', 'ˋnɔɪzɪ', 'adj.', '吵鬧的', 'noisy neighbors', 1, ['noise', 'noisily'], [
        ['My dorm room was too [noisy] to sleep.', '我的宿舍房太吵了，睡不著。'],
        ['Some [noisy] guests came back at 3 a.m.', '有幾個吵鬧的房客凌晨三點才回來。'],
      ]],
      ['quiet hours', 'ˋkwaɪət aʊrz', 'n.', '安靜時段', 'respect quiet hours', 2, [], [
        ['[Quiet hours] are from 10 p.m. to 7 a.m.', '安靜時段是晚上十點到早上七點。'],
        ['Please keep the music down during [quiet hours].', '安靜時段請把音樂關小聲。'],
      ]],
      ['housemate', 'ˋhaʊsˏmet', 'n.', '室友', 'get along with a housemate', 1, [], [
        ['My [housemate] is from Germany and loves cooking.', '我的室友來自德國，很喜歡下廚。'],
        ['We are looking for a new [housemate] to share the rent.', '我們在找新室友一起分攤房租。'],
      ]],
      ['share house', 'ʃɛr haʊs', 'n.', '分租屋', 'live in a share house', 2, [], [
        ['I moved into a [share house] with four other people.', '我搬進一間和另外四個人合住的分租屋。'],
        ['A room in a [share house] is cheaper than a studio.', '分租屋的一個房間比套房便宜。'],
      ]],
      ['bond', 'bɑnd', 'n.', '押金（澳）', 'pay a bond', 2, [], [
        ["The landlord asked for four weeks' rent as a [bond].", '房東要收四週房租當押金。'],
        ['You will get your [bond] back when you move out.', '搬出去的時候押金會退給你。'],
      ]],
      ['bills', 'bɪlz', 'n.', '帳單（水電等）', 'bills included', 1, [], [
        ['The rent is $250 a week, [bills] included.', '房租一週 250 元，含水電網路。'],
        ['We split the [bills] equally among four housemates.', '我們四個室友平分帳單。'],
      ]],
      ['private room', 'ˋpraɪvɪt rum', 'n.', '單人房（獨立房）', 'book a private room', 1, [], [
        ['A [private room] costs twice as much as a dorm bed.', '獨立房的價錢是宿舍床位的兩倍。'],
        ['After a month in a dorm, I moved into a [private room].', '住了一個月宿舍房之後，我換到獨立房。'],
      ]],
      ['female-only', 'ˋfimel ˋonlɪ', 'adj.', '限女性的', 'a female-only dorm', 2, [], [
        ['She booked a bed in a [female-only] dorm.', '她訂了女生宿舍房的床位。'],
        ['The hostel has two [female-only] rooms on the second floor.', '這間青旅二樓有兩間女性專用房。'],
      ]],
      ['weekly rate', 'ˋwiklɪ ret', 'n.', '週租價', 'ask about the weekly rate', 2, [], [
        ['The [weekly rate] is cheaper than paying night by night.', '週租價比一晚一晚付便宜。'],
        ['Do you offer a [weekly rate] for long stays?', '長住有週租價嗎？'],
      ]],
      ['earplugs', 'ˋɪrˏplʌgz', 'n.', '耳塞', 'wear earplugs', 1, [], [
        ["I can't sleep in a dorm without [earplugs].", '在宿舍房沒有耳塞我睡不著。'],
        ['The reception sells [earplugs] for $2.', '櫃檯有賣耳塞，一副 2 元。'],
      ]],
      ['padlock', 'ˋpædˏlɑk', 'n.', '掛鎖', 'bring your own padlock', 2, [], [
        ['Bring your own [padlock] for the locker.', '請自備掛鎖鎖置物櫃。'],
        ['I lost the key to my [padlock].', '我把掛鎖的鑰匙弄丟了。'],
      ]],
      ['shower', 'ˋʃaʊɚ', 'n.', '淋浴', 'take a shower', 1, [], [
        ['Please keep your [shower] to four minutes to save water.', '為了省水，請在四分鐘內洗完澡。'],
        ['The [shower] on the second floor has no hot water.', '二樓的淋浴間沒有熱水。'],
      ]],
      ['toilet', 'ˋtɔɪlɪt', 'n.', '廁所', 'flush the toilet', 1, [], [
        ['The [toilet] in our room is blocked.', '我們房間的馬桶堵住了。'],
        ['Excuse me, where is the [toilet]?', '不好意思，請問廁所在哪裡？'],
      ]],
      ['mattress', 'ˋmætrɪs', 'n.', '床墊', 'a comfortable mattress', 2, [], [
        ['The [mattress] on the top bunk is very thin.', '上鋪的床墊很薄。'],
        ['I bought a second-hand [mattress] for my new room.', '我為新房間買了一張二手床墊。'],
      ]],
      ['blanket', 'ˋblæŋkɪt', 'n.', '毯子', 'an extra blanket', 1, [], [
        ["Can I have an extra [blanket]? It's cold tonight.", '可以多給我一條毯子嗎？今晚很冷。'],
        ['The hostel provides a sheet, a [blanket], and a pillow.', '青年旅館提供床單、毯子和枕頭。'],
      ]],
      ['pillow', 'ˋpɪlo', 'n.', '枕頭', 'a soft pillow', 1, [], [
        ['This [pillow] is too hard for me.', '這個枕頭對我來說太硬了。'],
        ['I always travel with a small [pillow] for long bus rides.', '我坐長途巴士時總會帶一個小枕頭。'],
      ]],
      ['lost and found', 'lɔst ən faʊnd', 'n.', '失物招領', 'check the lost and found', 1, [], [
        ['Check the [lost and found] at reception for your sunglasses.', '去櫃檯的失物招領處找找你的太陽眼鏡。'],
        ['Someone handed my wallet in to the [lost and found].', '有人把我的錢包交到失物招領處。'],
      ]],
    ],
  },
  {
    id: 'driving', track: 'life', name: '租車與開車', icon: '🚙', words: [
      ['car rental', 'kɑr ˋrɛntl̩', 'n.', '租車', 'car rental company', 1, [], [
        ['We booked a [car rental] online for our trip to Byron Bay.', '我們在網路上預訂了租車，要開去拜倫灣。'],
        ['The [car rental] desk is next to baggage claim.', '租車櫃台就在行李提領區旁邊。'],
      ]],
      ['insurance excess', 'ɪnˋʃʊrəns ˋɛkˏsɛs', 'n.', '保險自負額', 'reduce the insurance excess', 3, [], [
        ['The [insurance excess] on this car is $4,000 if you have an accident.', '這台車如果出事，保險自負額是四千澳幣。'],
        ['You can pay $25 a day to reduce your [insurance excess].', '你可以每天多付 25 澳幣來降低保險自負額。'],
      ]],
      ['full tank', 'fʊl tæŋk', 'n.', '加滿油；滿油箱', 'return the car with a full tank', 1, [], [
        ['Please return the car with a [full tank].', '還車時請加滿油。'],
        ['A [full tank] gets us about 600 kilometres.', '加滿一箱油大約可以跑六百公里。'],
      ]],
      ['petrol', 'ˋpɛtrəl', 'n.', '汽油（澳英）', 'run out of petrol', 1, [], [
        ['We almost ran out of [petrol] in the middle of nowhere.', '我們差點在荒郊野外沒油。'],
        ['[Petrol] is usually cheaper on Tuesdays in some cities.', '在某些城市，汽油通常星期二比較便宜。'],
      ]],
      ['petrol station', 'ˋpɛtrəl ˋsteʃən', 'n.', '加油站', 'stop at a petrol station', 1, [], [
        ['The next [petrol station] is 200 kilometres away.', '下一個加油站在兩百公里外。'],
        ["Let's stop at the [petrol station] and grab some snacks.", '我們在加油站停一下，順便買點零食吧。'],
      ]],
      ['diesel', 'ˋdizl̩', 'n.', '柴油', 'diesel engine', 2, [], [
        ['This campervan runs on [diesel], not unleaded.', '這台露營車加的是柴油，不是無鉛汽油。'],
        ['Putting [diesel] in a petrol car can damage the engine.', '汽油車加到柴油會損壞引擎。'],
      ]],
      ['unleaded', 'ʌnˋlɛdɪd', 'n.', '無鉛汽油', 'fill up with unleaded', 2, [], [
        ['Fill it up with [unleaded], please.', '請幫我加滿無鉛汽油。'],
        ['The rental car takes regular [unleaded].', '這台租來的車加一般無鉛汽油就可以。'],
      ]],
      ['roundabout', 'ˋraʊndəˏbaʊt', 'n.', '圓環', 'take the second exit at the roundabout', 2, [], [
        ['Take the second exit at the [roundabout].', '在圓環走第二個出口。'],
        ['There are lots of [roundabout] signs on country roads.', '鄉間道路上有很多圓環標誌。'],
      ]],
      ['give way', 'gɪv we', 'v.', '讓行；讓路', 'give way to traffic', 2, [], [
        ['You must [give way] to cars already on the roundabout.', '你必須讓已經在圓環裡的車先行。'],
        ['Always [give way] to people on the pedestrian crossing.', '一定要讓行人穿越道上的行人先走。'],
      ]],
      ['lane', 'len', 'n.', '車道', 'change lanes', 1, [], [
        ['Stay in the left [lane] unless you are overtaking.', '除非要超車，否則請待在左側車道。'],
        ['This [lane] is for buses only during peak hour.', '這條車道在尖峰時段只限公車行駛。'],
      ]],
      ['overtake', 'ˏovɚˋtek', 'v.', '超車', 'overtake a truck', 2, ['overtaking', 'overtook', 'overtaken'], [
        ["Don't [overtake] on a double white line.", '有雙白線的地方不要超車。'],
        ["It's dangerous to [overtake] a road train on a narrow highway.", '在狹窄的公路上超聯結卡車很危險。'],
      ]],
      ['U-turn', 'ju tɝn', 'n.', '迴轉', 'make a U-turn', 1, [], [
        ["You can't make a [U-turn] at traffic lights unless there's a sign.", '除非有標誌，否則不能在紅綠燈路口迴轉。'],
        ['We missed the exit, so we did a [U-turn] at the next roundabout.', '我們錯過了出口，所以在下一個圓環迴轉。'],
      ]],
      ['parking fine', 'ˋpɑrkɪŋ faɪn', 'n.', '停車罰單', 'get a parking fine', 2, [], [
        ['I got a [parking fine] because the meter ran out.', '停車計時器時間到了，我被開了停車罰單。'],
        ['The rental company charged me for the [parking fine] plus an admin fee.', '租車公司向我收了停車罰款，外加一筆手續費。'],
      ]],
      ['speed camera', 'spid ˋkæmərə', 'n.', '測速照相', 'be caught by a speed camera', 2, [], [
        ["Slow down, there's a [speed camera] ahead.", '慢一點，前面有測速照相。'],
        ['The fine from the [speed camera] arrived a month later.', '測速照相的罰單一個月後才寄到。'],
      ]],
      ['GPS', 'ˏdʒiˏpiˋɛs', 'n.', '導航', 'follow the GPS', 1, [], [
        ['The [GPS] lost signal in the mountains.', '導航在山區收不到訊號。'],
        ["Just follow the [GPS] and you'll find the farm.", '照著導航走就會找到農場。'],
      ]],
      ['flat tire', 'flæt taɪr', 'n.', '爆胎；輪胎沒氣', 'get a flat tire', 1, [], [
        ['We got a [flat tire] on a gravel road.', '我們在碎石路上爆胎了。'],
        ['Do you know how to change a [flat tire]?', '你知道怎麼換掉爆掉的輪胎嗎？'],
      ]],
      ['breakdown', 'ˋbrekˏdaʊn', 'n.', '故障；拋錨', 'have a breakdown', 2, ['broken', 'broke'], [
        ['We had a [breakdown] on the highway near Cairns.', '我們的車在凱恩斯附近的公路上拋錨了。'],
        ['Call this number in case of a [breakdown].', '如果車子故障，請撥打這支電話。'],
      ]],
      ['roadside assistance', 'ˋrodˏsaɪd əˋsɪstəns', 'n.', '道路救援', 'call roadside assistance', 2, [], [
        ['The rental includes 24-hour [roadside assistance].', '租車方案包含 24 小時道路救援。'],
        ['We waited two hours for [roadside assistance] to arrive.', '我們等了兩個小時道路救援才到。'],
      ]],
      ['indicator', 'ˋɪndəˏketɚ', 'n.', '方向燈', 'use your indicator', 2, ['indicate', 'indicated'], [
        ['Use your [indicator] before you change lanes.', '變換車道前要打方向燈。'],
        ['In Australia, the [indicator] is often on the right side of the steering wheel.', '在澳洲，方向燈的撥桿通常在方向盤右邊。'],
      ]],
      ['windscreen', 'ˋwɪndˏskrin', 'n.', '擋風玻璃（澳英）', 'a cracked windscreen', 2, [], [
        ['A stone hit the [windscreen] and left a small crack.', '一顆石頭打到擋風玻璃，留下一道小裂痕。'],
        ['The car was covered in dust, so I cleaned the [windscreen] at the petrol station.', '車子滿是灰塵，所以我在加油站把擋風玻璃擦乾淨。'],
      ]],
      ['right of way', 'raɪt əv we', 'n.', '路權', 'have the right of way', 3, [], [
        ['Pedestrians have the [right of way] at this crossing.', '在這個路口，行人有路權。'],
        ['Who has the [right of way] at an intersection without signs?', '沒有號誌的路口誰有路權？'],
      ]],
      ['reverse', 'rɪˋvɝs', 'v.', '倒車', 'reverse into a parking spot', 2, ['reversal', 'reversible'], [
        ['Can you [reverse] into that parking spot?', '你可以倒車停進那個車位嗎？'],
        ['Check your mirrors before you [reverse] out of the driveway.', '從車道倒車出去前要先看後照鏡。'],
      ]],
      ['honk', 'hɔŋk', 'v.', '按喇叭', 'honk the horn', 2, ['honked', 'honking'], [
        ["Please don't [honk] in residential areas at night.", '晚上在住宅區請不要按喇叭。'],
        ['You can [honk] to warn other drivers of danger.', '你可以按喇叭提醒其他駕駛有危險。'],
      ]],
      ['road trip', 'rod trɪp', 'n.', '公路旅行', 'go on a road trip', 1, [], [
        ["We're planning a [road trip] along the Great Ocean Road.", '我們打算沿著大洋路來一趟公路旅行。'],
        ['A [road trip] is the best way to see the outback.', '公路旅行是看內陸荒野最好的方式。'],
      ]],
      ['rest stop', 'rɛst stɑp', 'n.', '休息站', 'pull into a rest stop', 1, [], [
        ["Let's pull into the next [rest stop] and stretch our legs.", '我們在下一個休息站停一下，伸伸腿吧。'],
        ['The [rest stop] has toilets and free barbecues.', '這個休息站有廁所和免費烤肉台。'],
      ]],
    ],
  },
  {
    id: 'jobs', track: 'life', name: '打工與工作權益', icon: '🧑‍🍳', words: [
      ['cover letter', 'ˋkʌvɚ ˋlɛtɚ', 'n.', '求職信', 'write a cover letter', 2, [], [
        ['Attach your resume and a short [cover letter].', '請附上履歷和一封簡短的求職信。'],
        ['My [cover letter] explains why I want to work on a farm.', '我的求職信說明了我為什麼想在農場工作。'],
      ]],
      ['job ad', 'dʒɑb æd', 'n.', '徵人廣告', 'reply to a job ad', 1, [], [
        ['I saw a [job ad] for a kitchen hand on Gumtree.', '我在 Gumtree 上看到一則徵廚房助手的廣告。'],
        ['The [job ad] says no experience is needed.', '這則徵人廣告說不需要經驗。'],
      ]],
      ['casual job', 'ˋkæʒʊəl dʒɑb', 'n.', '臨時工（澳）', 'find a casual job', 2, [], [
        ['A [casual job] pays more per hour but has no paid leave.', '臨時工的時薪比較高，但沒有帶薪假。'],
        ['She found a [casual job] at a café in Melbourne.', '她在墨爾本的一家咖啡廳找到臨時工的工作。'],
      ]],
      ['roster', 'ˋrɑstɚ', 'n.', '班表', 'check the roster', 2, [], [
        ['The new [roster] comes out every Friday.', '新的班表每週五出來。'],
        ["I'm not on the [roster] this weekend.", '我這個週末沒有排班。'],
      ]],
      ['payslip', 'ˋpeˏslɪp', 'n.', '薪資單', 'check your payslip', 2, [], [
        ['Always check your [payslip] to make sure your hours are right.', '一定要檢查薪資單，確認時數正確。'],
        ['My boss emails me a [payslip] every fortnight.', '老闆每兩週寄一次薪資單給我。'],
      ]],
      ['superannuation', 'ˏsupɚˏænjʊˋeʃən', 'n.', '退休金（澳）', 'claim your superannuation', 3, [], [
        ['Your employer must pay [superannuation] on top of your wages.', '雇主必須在薪水之外另外幫你提撥退休金。'],
        ['You can claim your [superannuation] back after you leave Australia.', '離開澳洲後可以申請領回退休金。'],
      ]],
      ['tax file number', 'tæks faɪl ˋnʌmbɚ', 'n.', '稅號 TFN（澳）', 'apply for a tax file number', 2, [], [
        ['Apply for a [tax file number] as soon as you arrive.', '一抵達就去申請稅號。'],
        ["Without a [tax file number], you'll pay a much higher tax rate.", '沒有稅號的話，你要繳的稅率會高很多。'],
      ]],
      ['minimum wage', 'ˋmɪnəməm wedʒ', 'n.', '最低工資', 'be paid the minimum wage', 1, [], [
        ['The [minimum wage] in Australia goes up every July.', '澳洲的最低工資每年七月調漲。'],
        ['This job pays less than the [minimum wage], which is illegal.', '這份工作的薪水低於最低工資，這是違法的。'],
      ]],
      ['penalty rates', 'ˋpɛnl̩tɪ rets', 'n.', '假日加給（澳）', 'get penalty rates on Sundays', 3, [], [
        ['You get [penalty rates] for working on Sundays and public holidays.', '星期天和國定假日上班有假日加給。'],
        ['Some cafés add a surcharge to cover staff [penalty rates].', '有些咖啡廳會加收附加費來支付員工的假日加給。'],
      ]],
      ['cash in hand', 'kæʃ ɪn hænd', 'adv.', '領現金（未申報）', 'be paid cash in hand', 2, [], [
        ['Being paid [cash in hand] means you get no superannuation.', '領現金不報稅就代表你拿不到退休金。'],
        ['The farm offered to pay us [cash in hand], but we said no.', '農場說要付我們現金，但我們拒絕了。'],
      ]],
      ['trial shift', 'ˋtraɪəl ʃɪft', 'n.', '試做', 'do a trial shift', 2, [], [
        ['The manager asked me to do a two-hour [trial shift] on Saturday.', '經理請我星期六去試做兩個小時。'],
        ['A long unpaid [trial shift] is not legal in Australia.', '在澳洲，長時間不給薪的試做是不合法的。'],
      ]],
      ['white card', 'hwaɪt kɑrd', 'n.', '工地安全證（澳）', 'get a white card', 3, [], [
        ['You need a [white card] to work on a construction site.', '在工地工作需要有工地安全證。'],
        ['I did the [white card] course online in one day.', '我在網路上花一天上完了工地安全證的課程。'],
      ]],
      ['barista', 'bɑˋristə', 'n.', '咖啡師', 'work as a barista', 1, [], [
        ['Melbourne cafés are always looking for an experienced [barista].', '墨爾本的咖啡廳總是在找有經驗的咖啡師。'],
        ['The [barista] drew a heart in my flat white.', '咖啡師在我的小白咖啡上拉了一顆愛心。'],
      ]],
      ['waitstaff', 'ˋwetˏstæf', 'n.', '服務生（統稱）', 'hire waitstaff', 2, [], [
        ['The restaurant is hiring [waitstaff] for the summer.', '這家餐廳在招募暑期服務生。'],
        ['Tips are shared among the [waitstaff] and kitchen staff.', '小費由外場服務生和廚房員工一起分。'],
      ]],
      ['kitchen hand', 'ˋkɪtʃən hænd', 'n.', '廚房助手', 'work as a kitchen hand', 1, [], [
        ['As a [kitchen hand], I wash dishes and prepare vegetables.', '當廚房助手，我負責洗碗和備菜。'],
        ['The pub needs a [kitchen hand] for weekend shifts.', '這家酒吧需要一個週末班的廚房助手。'],
      ]],
      ['housekeeper', 'ˋhaʊsˏkipɚ', 'n.', '房務員', 'work as a housekeeper', 1, [], [
        ['She works as a [housekeeper] at a resort on the Gold Coast.', '她在黃金海岸的一家度假村當房務員。'],
        ['Each [housekeeper] cleans about fifteen rooms a day.', '每位房務員一天大約打掃十五間房。'],
      ]],
      ['cleaner', 'ˋklinɚ', 'n.', '清潔工', 'work as a cleaner', 1, ['clean', 'cleanly'], [
        ['He found a job as a [cleaner] in an office building.', '他在一棟辦公大樓找到清潔工的工作。'],
        ['The night [cleaner] comes in after everyone goes home.', '夜班清潔工在大家下班後才來。'],
      ]],
      ['labourer', 'ˋlebərɚ', 'n.', '勞工（澳英）', 'work as a labourer', 2, ['labour', 'laborious'], [
        ['He worked as a [labourer] on a building site in Perth.', '他在伯斯的工地當勞工。'],
        ['The farm needs another [labourer] for the harvest.', '農場收成期需要再找一個工人。'],
      ]],
      ['job agency', 'dʒɑb ˋedʒənsɪ', 'n.', '人力仲介', 'sign up with a job agency', 2, [], [
        ['I signed up with a [job agency] that finds farm work for backpackers.', '我登記了一家專門幫背包客找農場工作的人力仲介。'],
        ['Some [job agency] staff can help you write your resume.', '有些人力仲介的員工可以幫你寫履歷。'],
      ]],
      ['pay rise', 'pe raɪz', 'n.', '加薪（英澳）', 'ask for a pay rise', 2, [], [
        ['After six months, I asked my boss for a [pay rise].', '六個月後，我向老闆要求加薪。'],
        ['All casual staff got a [pay rise] in July.', '所有臨時員工七月都加薪了。'],
      ]],
      ['underpaid', 'ˏʌndɚˋped', 'adj.', '薪水過低的', 'be underpaid', 2, ['underpay', 'underpayment'], [
        ['Many backpackers are [underpaid] on farms.', '很多背包客在農場拿到的薪水過低。'],
        ['If you think you are being [underpaid], contact the Fair Work Ombudsman.', '如果你覺得薪水被少給了，可以聯絡公平工作監察署。'],
      ]],
      ['work rights', 'wɝk raɪts', 'n.', '工作權', 'know your work rights', 2, [], [
        ['Every worker in Australia has the same [work rights], including visa holders.', '在澳洲，每個工人都有一樣的工作權，簽證持有者也不例外。'],
        ['Check that your visa gives you full [work rights].', '確認你的簽證有完整的工作權。'],
      ]],
      ['unpaid', 'ʌnˋped', 'adj.', '無薪的；未付的', 'unpaid work', 1, [], [
        ["Don't accept weeks of [unpaid] work as a \"trial\".", '不要接受以「試做」為名、做好幾週卻沒薪水的工作。'],
        ['The hostel charged me for an [unpaid] bill from last week.', '青年旅館向我收了上週還沒付的帳單。'],
      ]],
      ['notice period', 'ˋnotɪs ˋpɪrɪəd', 'n.', '離職預告期', 'give a two-week notice period', 3, [], [
        ['My contract has a one-week [notice period].', '我的合約規定離職要提前一週告知。'],
        ["Casual workers usually don't have a [notice period].", '臨時工通常沒有離職預告期。'],
      ]],
      ['quit', 'kwɪt', 'v.', '辭職', 'quit your job', 1, ['quite', 'quitting'], [
        ['I want to [quit] my job and travel up the coast.', '我想辭掉工作，沿著海岸往北旅行。'],
        ['You should tell your boss a week before you [quit].', '你應該在辭職前一週告訴老闆。'],
      ]],
    ],
  },
  {
    id: 'payment', track: 'life', name: '手機與付款', icon: '💳', words: [
      ['top up', 'tɑp ʌp', 'v.', '儲值', 'top up your phone', 1, [], [
        ['You can [top up] your phone credit at any supermarket.', '你可以在任何一家超市幫手機儲值。'],
        ['I need to [top up] my Opal card before I get on the train.', '上火車前我得先幫 Opal 卡儲值。'],
      ]],
      ['phone bill', 'fon bɪl', 'n.', '電話帳單', 'pay the phone bill', 1, [], [
        ['My [phone bill] was huge because of roaming charges.', '因為漫遊費，我的電話帳單金額很驚人。'],
        ['I pay my [phone bill] by direct debit every month.', '我每個月用自動扣款付電話費。'],
      ]],
      ['debit card', 'ˋdɛbɪt kɑrd', 'n.', '簽帳金融卡', 'pay by debit card', 1, [], [
        ['The bank will post your [debit card] to your address.', '銀行會把簽帳金融卡寄到你的地址。'],
        ['I use my [debit card] for everything, even a coffee.', '我什麼都用簽帳金融卡付，連一杯咖啡也是。'],
      ]],
      ['PIN', 'pɪn', 'n.', '密碼（PIN 碼）', 'enter your PIN', 1, [], [
        ['Please enter your [PIN] and press OK.', '請輸入密碼後按確認。'],
        ['Never tell anyone your [PIN], not even bank staff.', '永遠不要把密碼告訴任何人，連銀行員工也不行。'],
      ]],
      ['contactless', 'ˋkɑntæktlɪs', 'adj.', '感應式的', 'contactless payment', 2, [], [
        ['Most shops in Australia accept [contactless] payments.', '澳洲大部分商店都接受感應式付款。'],
        ['Is your card [contactless], or do I need to insert it?', '你的卡可以感應嗎？還是要插卡？'],
      ]],
      ['online banking', 'ˋɑnˏlaɪn ˋbæŋkɪŋ', 'n.', '網路銀行', 'log in to online banking', 1, [], [
        ['You can transfer money to your landlord through [online banking].', '你可以透過網路銀行把錢轉給房東。'],
        ['I set up [online banking] on the day I opened my account.', '我開戶當天就設定好網路銀行。'],
      ]],
      ['bank fee', 'bæŋk fi', 'n.', '銀行手續費', 'avoid bank fees', 2, [], [
        ['This account has no monthly [bank fee] for students.', '這個帳戶對學生不收每月的銀行手續費。'],
        ['I was charged a [bank fee] for an international transfer.', '我做了一筆國際匯款，被收了銀行手續費。'],
      ]],
      ['direct debit', 'dəˋrɛkt ˋdɛbɪt', 'n.', '自動扣款', 'set up a direct debit', 2, [], [
        ['My gym membership is paid by [direct debit] every fortnight.', '我的健身房會費每兩週自動扣款。'],
        ['Cancel the [direct debit] before you leave the country.', '出國前記得取消自動扣款。'],
      ]],
      ['due date', 'dju det', 'n.', '到期日；繳費期限', 'before the due date', 1, [], [
        ['The [due date] for this bill is 15 March.', '這張帳單的繳費期限是三月十五日。'],
        ["If you pay after the [due date], you'll be charged extra.", '如果超過繳費期限才付，會被多收費用。'],
      ]],
      ['late fee', 'let fi', 'n.', '滯納金', 'charge a late fee', 2, [], [
        ['I forgot to pay my rent and got a $20 [late fee].', '我忘了付房租，被收了 20 澳幣的滯納金。'],
        ['The library charges a [late fee] for overdue books.', '圖書館對逾期的書收滯納金。'],
      ]],
      ['charger', 'ˋtʃɑrdʒɚ', 'n.', '充電器', 'phone charger', 1, ['charge', 'charging'], [
        ['Can I borrow your [charger]? My phone is almost dead.', '可以借你的充電器嗎？我的手機快沒電了。'],
        ["This [charger] doesn't fit Australian power points.", '這個充電器插不進澳洲的插座。'],
      ]],
      ['power bank', 'ˋpaʊɚ bæŋk', 'n.', '行動電源', 'charge a power bank', 1, [], [
        ['I always carry a [power bank] on long bus trips.', '搭長途巴士時我一定會帶行動電源。'],
        ["A big [power bank] isn't allowed in checked luggage.", '大容量的行動電源不能放在託運行李裡。'],
      ]],
      ['adapter', 'əˋdæptɚ', 'n.', '轉接頭', 'travel adapter', 1, ['adapt', 'adaptable'], [
        ["You'll need an [adapter] for Australian power points.", '你需要一個轉接頭才能用澳洲的插座。'],
        ['Does this [adapter] work in New Zealand too?', '這個轉接頭在紐西蘭也能用嗎？'],
      ]],
      ['plug', 'plʌg', 'n.', '插頭', 'pull out the plug', 1, [], [
        ["The [plug] on my hair dryer doesn't fit here.", '我吹風機的插頭在這裡插不進去。'],
        ['Turn off the switch before you pull out the [plug].', '拔插頭前先把開關關掉。'],
      ]],
      ['battery', 'ˋbætərɪ', 'n.', '電池', 'my battery is low', 1, [], [
        ['My phone [battery] dies so quickly in the cold.', '天氣冷時我的手機電池很快就沒電。'],
        ["The car won't start; I think the [battery] is flat.", '車子發不動，我想是電瓶沒電了。'],
      ]],
      ['screen protector', 'skrin prəˋtɛktɚ', 'n.', '螢幕保護貼', 'put on a screen protector', 1, [], [
        ['The [screen protector] cracked, but the phone screen is fine.', '螢幕保護貼裂了，但手機螢幕沒事。'],
        ["They'll put a [screen protector] on for free if you buy a case.", '如果你買手機殼，他們會免費幫你貼螢幕保護貼。'],
      ]],
      ['phone case', 'fon kes', 'n.', '手機殼', 'a waterproof phone case', 1, [], [
        ['A strong [phone case] saved my phone when I dropped it.', '手機掉到地上時，一個堅固的手機殼救了它。'],
        ['I bought a waterproof [phone case] for snorkelling.', '我買了一個防水手機殼去浮潛用。'],
      ]],
      ['coins', 'kɔɪnz', 'n.', '硬幣', 'gold coins', 1, [], [
        ['The laundry machines at the hostel only take [coins].', '青年旅館的洗衣機只收硬幣。'],
        ['Australian one- and two-dollar [coins] are gold.', '澳洲的一元和兩元硬幣是金色的。'],
      ]],
      ['banknote', 'ˋbæŋkˏnot', 'n.', '紙鈔', 'a $50 banknote', 2, [], [
        ['Australian [banknote] designs are colourful and made of plastic.', '澳洲紙鈔的設計色彩豐富，而且是塑膠做的。'],
        ["The shop wouldn't accept a $100 [banknote] for a bottle of water.", '店家不肯收一張一百元紙鈔買一瓶水。'],
      ]],
      ['change', 'tʃendʒ', 'n.', '零錢；找零', 'keep the change', 1, [], [
        ['Do you have any [change] for the parking meter?', '你有零錢可以投停車計時器嗎？'],
        ["Here's ten dollars. Keep the [change].", '這是十塊，不用找了。'],
      ]],
      ['ATM fee', 'ˏeˏtiˋɛm fi', 'n.', '提款手續費', 'pay an ATM fee', 2, [], [
        ['This machine charges a $3 [ATM fee] for every withdrawal.', '這台機器每次提款收 3 澳幣手續費。'],
        ["Use your own bank's machines to avoid an [ATM fee].", '用自己銀行的提款機就不用付提款手續費。'],
      ]],
      ['tap and go', 'tæp ənd go', 'n.', '感應支付', 'pay by tap and go', 2, [], [
        ['Most cafés accept [tap and go] for small amounts.', '大部分咖啡廳小額消費都接受感應支付。'],
        ['[Tap and go] is faster than inserting your card.', '感應支付比插卡快。'],
      ]],
      ['card reader', 'kɑrd ˋridɚ', 'n.', '刷卡機', 'the card reader is down', 2, [], [
        ["Sorry, our [card reader] isn't working; cash only today.", '抱歉，我們的刷卡機故障了，今天只收現金。'],
        ['Just tap your card on the [card reader].', '把卡放在刷卡機上感應就好。'],
      ]],
      ['transaction fee', 'trænˋzækʃən fi', 'n.', '交易手續費', 'foreign transaction fee', 2, [], [
        ['My Taiwanese card charges a [transaction fee] on every purchase overseas.', '我的台灣卡在國外每筆消費都會收交易手續費。'],
        ["There's a small [transaction fee] for paying by credit card.", '用信用卡付款要收一點交易手續費。'],
      ]],
      ['pay later', 'pe ˋletɚ', 'n.', '先買後付', 'buy now, pay later', 2, [], [
        ['Be careful with [pay later] apps; the late fees add up quickly.', '使用先買後付的 App 要小心，滯納金很快就會累積。'],
        ['You can split the cost into four payments with [pay later].', '用先買後付可以把費用分成四期付。'],
      ]],
    ],
  },
  {
    id: 'emergency', track: 'life', name: '緊急狀況與求助', icon: '🚨', words: [
      ['police', 'pəˋlis', 'n.', '警察', 'call the police', 1, ['polite', 'policy'], [
        ['Call the [police] if someone threatens you.', '如果有人威脅你，就報警。'],
        ['The [police] arrived within ten minutes.', '警察十分鐘內就到了。'],
      ]],
      ['police station', 'pəˋlis ˋsteʃən', 'n.', '警察局', 'report it at the police station', 1, [], [
        ['I reported my lost passport at the [police station].', '我到警察局報案說護照遺失了。'],
        ['Where is the nearest [police station]?', '最近的警察局在哪裡？'],
      ]],
      ['fire brigade', 'faɪr brɪˋged', 'n.', '消防隊', 'call the fire brigade', 2, [], [
        ['The [fire brigade] put out the fire in under an hour.', '消防隊不到一小時就把火撲滅了。'],
        ['Many country towns rely on a volunteer [fire brigade].', '許多鄉下小鎮靠的是志願消防隊。'],
      ]],
      ['robbery', 'ˋrɑbərɪ', 'n.', '搶劫', 'armed robbery', 2, ['rob', 'robbed'], [
        ['There was a [robbery] at the petrol station last night.', '昨晚那間加油站發生了搶案。'],
        ['She reported the [robbery] to the police right away.', '她立刻向警方報案說被搶了。'],
      ]],
      ['theft', 'θɛft', 'n.', '竊盜', 'report a theft', 2, ['thief', 'thieves'], [
        ['Car [theft] is a big problem in this area.', '這一帶汽車失竊的問題很嚴重。'],
        ['The hostel is not responsible for [theft] of personal belongings.', '青年旅館不負責個人物品失竊。'],
      ]],
      ['stolen', 'ˋstolən', 'adj.', '被偷的', 'a stolen wallet', 1, ['steal', 'stole'], [
        ['My wallet was [stolen] on the train.', '我的錢包在火車上被偷了。'],
        ['Report [stolen] cards to your bank immediately.', '卡片被偷要立刻通知銀行。'],
      ]],
      ['pickpocket', 'ˋpɪkˏpɑkɪt', 'n.', '扒手', 'beware of pickpockets', 2, [], [
        ['A [pickpocket] took my phone at the busy market.', '在擁擠的市集裡，一個扒手偷了我的手機。'],
        ['Keep your bag in front of you; there could be a [pickpocket] around.', '包包要放在前面，附近可能有扒手。'],
      ]],
      ['scam', 'skæm', 'n.', '詐騙', 'fall for a scam', 2, [], [
        ['That text about a missed parcel is a [scam].', '那則說你有包裹沒領的簡訊是詐騙。'],
        ['Be careful of any job [scam] that asks you to pay first.', '要小心任何要你先付錢的求職詐騙。'],
      ]],
      ['fraud', 'frɔd', 'n.', '詐欺', 'credit card fraud', 3, ['fraudulent', 'fraudulently'], [
        ['Credit card [fraud] is common when you shop online.', '網路購物時信用卡詐欺很常見。'],
        ['The man was arrested for [fraud].', '那名男子因詐欺被捕。'],
      ]],
      ['witness', 'ˋwɪtnɪs', 'n.', '目擊者', 'a witness to the accident', 2, ['witnessed', 'witnessing'], [
        ['The police asked if there was a [witness] to the accident.', '警察問有沒有人目擊這起事故。'],
        ['A [witness] saw the driver run the red light.', '一名目擊者看到駕駛闖紅燈。'],
      ]],
      ['bleeding', 'ˋblidɪŋ', 'n.', '流血；出血', 'stop the bleeding', 1, ['bled', 'bloody'], [
        ['Press hard on the cut to stop the [bleeding].', '用力壓住傷口來止血。'],
        ["Call 000 if the [bleeding] doesn't stop.", '如果血一直止不住，就撥 000。'],
      ]],
      ['unconscious', 'ʌnˋkɑnʃəs', 'adj.', '失去意識的', 'be knocked unconscious', 2, ['unconsciously', 'unconsciousness'], [
        ['He was [unconscious] when the ambulance arrived.', '救護車到的時候，他已經失去意識。'],
        ['Roll an [unconscious] person onto their side.', '把失去意識的人翻成側躺。'],
      ]],
      ['poison', 'ˋpɔɪzn̩', 'n.', '毒；毒藥', 'rat poison', 2, ['poisonous', 'poisoned'], [
        ['Some mushrooms contain a deadly [poison].', '有些蘑菇含有致命的毒素。'],
        ['Keep [poison] out of reach of children.', '毒藥要放在兒童拿不到的地方。'],
      ]],
      ['rescue', 'ˋrɛskju', 'v.', '救援；救出', 'rescue a swimmer', 2, ['rescued', 'rescuer'], [
        ['Lifeguards had to [rescue] two swimmers at Bondi today.', '救生員今天在邦代海灘救了兩名泳客。'],
        ['A helicopter was sent to [rescue] the lost hikers.', '直升機被派去救援迷路的登山客。'],
      ]],
      ['lifeguard', 'ˋlaɪfˏgɑrd', 'n.', '救生員', 'lifeguard on duty', 1, [], [
        ['Always swim where a [lifeguard] can see you.', '一定要在救生員看得到的地方游泳。'],
        ['The [lifeguard] waved at us to come back closer to shore.', '救生員揮手要我們回到靠近岸邊的地方。'],
      ]],
      ['rip current', 'rɪp ˋkɝənt', 'n.', '離岸流', 'be caught in a rip current', 3, [], [
        ["If you're caught in a [rip current], don't swim against it.", '如果遇到離岸流，不要逆著它游。'],
        ['A [rip current] can pull even strong swimmers out to sea.', '離岸流連游泳高手都能拉到外海。'],
      ]],
      ['bushfire', 'ˋbʊʃˏfaɪr', 'n.', '森林大火（澳）', 'bushfire season', 2, [], [
        ['The road was closed because of a [bushfire].', '因為森林大火，道路封閉了。'],
        ['Check the [bushfire] warnings before you go camping in summer.', '夏天去露營前要先查看森林大火警報。'],
      ]],
      ['flood', 'flʌd', 'n.', '洪水；淹水', 'flash flood', 1, [], [
        ['The [flood] cut off the only road to the town.', '洪水切斷了通往小鎮的唯一一條路。'],
        ['Never drive through [flood] water, even if it looks shallow.', '千萬不要開車穿越淹水的路段，就算看起來很淺。'],
      ]],
      ['warning', 'ˋwɔrnɪŋ', 'n.', '警告', 'a warning sign', 1, ['warn', 'warned'], [
        ["There's a [warning] sign about crocodiles near the river.", '河邊有一個鱷魚出沒的警告標誌。'],
        ['The police gave him a [warning] for speeding.', '警察因為他超速給了他一個警告。'],
      ]],
      ['missing', 'ˋmɪsɪŋ', 'adj.', '失蹤的；遺失的', 'a missing person', 1, ['miss', 'misses'], [
        ["My passport is [missing]! I can't find it anywhere.", '我的護照不見了！到處都找不到。'],
        ['Police are searching for a [missing] hiker in the national park.', '警方正在國家公園裡搜尋一名失蹤的登山客。'],
      ]],
      ['lost property', 'lɔst ˋprɑpɚtɪ', 'n.', '遺失物', 'lost property office', 2, [], [
        ["Ask at the station's [lost property] office.", '去車站的失物招領處問問看。'],
        ['My umbrella ended up in [lost property] at the airport.', '我的雨傘最後被送到機場的失物招領處。'],
      ]],
      ['emergency number', 'ɪˋmɝdʒənsɪ ˋnʌmbɚ', 'n.', '緊急電話', 'call the emergency number', 1, [], [
        ['The [emergency number] in Australia is 000.', '澳洲的緊急電話是 000。'],
        ['Save the [emergency number] in your phone before you go hiking.', '去健行前先把緊急電話存進手機。'],
      ]],
      ['storm', 'stɔrm', 'n.', '暴風雨', 'a storm is coming', 1, ['stormy', 'stormed'], [
        ['A big [storm] is coming tonight, so stay inside.', '今晚有一場大暴風雨要來，待在室內吧。'],
        ['Our flight was cancelled because of the [storm].', '我們的班機因為暴風雨取消了。'],
      ]],
      ['cyclone', 'ˋsaɪklon', 'n.', '氣旋', 'cyclone warning', 2, [], [
        ['A [cyclone] is heading for the coast of Queensland.', '一個氣旋正朝昆士蘭海岸前進。'],
        ['The [cyclone] season in northern Australia runs from November to April.', '澳洲北部的氣旋季從十一月持續到四月。'],
      ]],
      ['panic', 'ˋpænɪk', 'n.', '恐慌', 'in a panic', 2, ['panicked', 'panicky'], [
        ['There was [panic] when the fire alarm went off.', '火警警報響起時，大家一陣恐慌。'],
        ["Stay calm and don't give in to [panic].", '保持冷靜，不要陷入恐慌。'],
      ]],
    ],
  },
  {
    id: 'weather', track: 'life', name: '天氣與大自然', icon: '🌦️', words: [
      ['sunny', 'ˋsʌnɪ', 'adj.', '晴朗的', 'a sunny day', 1, ['sun', 'suns'], [
        ["It's [sunny] today, so don't forget your hat.", '今天天氣晴朗，別忘了戴帽子。'],
        ['We spent a [sunny] afternoon at the beach.', '我們在海邊度過了一個陽光普照的下午。'],
      ]],
      ['cloudy', 'ˋklaʊdɪ', 'adj.', '多雲的', 'cloudy skies', 1, ['cloud', 'clouds'], [
        ["It's [cloudy] but still warm.", '天氣多雲，但還是很暖和。'],
        ['You can still get sunburnt on a [cloudy] morning.', '多雲的早上還是會曬傷。'],
      ]],
      ['rainy', 'ˋrenɪ', 'adj.', '下雨的', 'the rainy season', 1, ['rained', 'rains'], [
        ["Bring an umbrella; it's the [rainy] season in Darwin.", '帶把傘吧，現在是達爾文的雨季。'],
        ['On [rainy] days, we play cards in the hostel kitchen.', '下雨天我們就在青年旅館的廚房玩牌。'],
      ]],
      ['windy', 'ˋwɪndɪ', 'adj.', '颳風的', 'a windy day', 1, ['wind', 'winds'], [
        ["It's too [windy] to go kayaking today.", '今天風太大，不適合划獨木舟。'],
        ['Melbourne can be cold and [windy] in winter.', '墨爾本冬天可能又冷風又大。'],
      ]],
      ['humid', 'ˋhjumɪd', 'adj.', '潮濕的', 'hot and humid', 2, ['humidity', 'humidify'], [
        ["It's very [humid] in Cairns during summer.", '凱恩斯夏天非常潮濕。'],
        ['The air feels hot and [humid] before a storm.', '暴風雨來之前，空氣感覺又熱又悶。'],
      ]],
      ['temperature', 'ˋtɛmprətʃɚ', 'n.', '溫度', 'the temperature drops', 1, [], [
        ['The [temperature] reached 42 degrees in Adelaide yesterday.', '阿得雷德昨天氣溫高達 42 度。'],
        ['In the desert, the [temperature] drops quickly at night.', '在沙漠裡，晚上氣溫下降得很快。'],
      ]],
      ['Celsius', 'ˋsɛlsɪəs', 'n.', '攝氏', 'degrees Celsius', 1, [], [
        ['Australia measures temperature in degrees [Celsius].', '澳洲用攝氏來量溫度。'],
        ["It's 35 degrees [Celsius] in the shade.", '陰涼處也有攝氏 35 度。'],
      ]],
      ['heatwave', 'ˋhitˏwev', 'n.', '熱浪', 'during a heatwave', 2, [], [
        ['Drink plenty of water during a [heatwave].', '熱浪期間要多喝水。'],
        ['The [heatwave] lasted for a whole week.', '這波熱浪持續了整整一週。'],
      ]],
      ['chilly', 'ˋtʃɪlɪ', 'adj.', '涼颼颼的', 'a chilly morning', 2, [], [
        ['It gets [chilly] at night in the outback, so bring a jumper.', '內陸荒野晚上會變冷，帶件毛衣吧。'],
        ['It was a [chilly] morning, but the afternoon was warm.', '早上涼颼颼的，但下午很暖和。'],
      ]],
      ['freezing', 'ˋfrizɪŋ', 'adj.', '冷得要命的', 'freezing cold', 1, [], [
        ['The water was [freezing], so I only stayed in for a minute.', '水冰得要命，我只泡了一分鐘。'],
        ["It's [freezing] in the mountains in July.", '七月的山區冷得要命。'],
      ]],
      ['thunderstorm', 'ˋθʌndɚˏstɔrm', 'n.', '雷雨', 'a severe thunderstorm', 1, [], [
        ['A [thunderstorm] knocked out the power at the hostel.', '一場雷雨讓青年旅館停電了。'],
        ['Get out of the water if you hear a [thunderstorm] coming.', '如果聽到雷雨要來了，就趕快離開水裡。'],
      ]],
      ['drizzle', 'ˋdrɪzl̩', 'n.', '毛毛雨', 'light drizzle', 2, [], [
        ["It's only a light [drizzle]; we don't need umbrellas.", '只是毛毛雨而已，不用撐傘。'],
        ['The [drizzle] continued all morning.', '毛毛雨下了一整個早上。'],
      ]],
      ['coast', 'kost', 'n.', '海岸', 'drive along the coast', 1, ['coastal', 'coasted'], [
        ['We drove along the [coast] from Sydney to Brisbane.', '我們沿著海岸從雪梨開到布里斯本。'],
        ['The east [coast] has some of the best beaches in the world.', '東海岸有一些世界上最美的海灘。'],
      ]],
      ['ocean', 'ˋoʃən', 'n.', '海洋', 'swim in the ocean', 1, [], [
        ['The [ocean] is too rough for swimming today.', '今天海浪太大，不適合游泳。'],
        ['Our room has a great view of the [ocean].', '我們的房間有很棒的海景。'],
      ]],
      ['wave', 'wev', 'n.', '海浪', 'catch a wave', 1, [], [
        ['A huge [wave] knocked me off my surfboard.', '一個大浪把我從衝浪板上打下來。'],
        ['It took me an hour to catch my first [wave].', '我花了一個小時才乘上第一道浪。'],
      ]],
      ['tide', 'taɪd', 'n.', '潮汐', 'high tide', 2, [], [
        ['At low [tide], you can walk out to the island.', '退潮時可以走路到那座島上。'],
        ['Check the [tide] times before you go fishing.', '去釣魚前先查潮汐時間。'],
      ]],
      ['reef', 'rif', 'n.', '礁', 'coral reef', 2, [], [
        ['We went snorkelling on the Great Barrier [Reef].', '我們去大堡礁浮潛。'],
        ["Don't touch the coral on the [reef].", '不要碰礁上的珊瑚。'],
      ]],
      ['rainforest', 'ˋrenˏfɔrɪst', 'n.', '雨林', 'tropical rainforest', 1, [], [
        ['The Daintree [rainforest] is over 100 million years old.', '丹翠雨林已經有超過一億年的歷史。'],
        ['We heard strange birds on our [rainforest] walk.', '我們在雨林步道上聽到奇特的鳥叫聲。'],
      ]],
      ['bush', 'bʊʃ', 'n.', '叢林；灌木', 'go into the bush', 2, [], [
        ['We spent the weekend camping in the [bush].', '我們週末去叢林裡露營。'],
        ['A kangaroo jumped out from behind a [bush].', '一隻袋鼠從灌木叢後面跳了出來。'],
      ]],
      ['outback', 'ˋaʊtˏbæk', 'n.', '內陸荒野（澳）', 'the Australian outback', 2, [], [
        ['Carry extra water when you drive through the [outback].', '開車穿越內陸荒野時要多帶水。'],
        ['Uluru is in the middle of the [outback].', '烏魯魯位在內陸荒野的正中央。'],
      ]],
      ['sunrise', 'ˋsʌnˏraɪz', 'n.', '日出', 'watch the sunrise', 1, [], [
        ['We got up at 5 a.m. to watch the [sunrise] at Byron Bay.', '我們早上五點起床，在拜倫灣看日出。'],
        ['Farm work usually starts at [sunrise].', '農場的工作通常在日出時開始。'],
      ]],
      ['sunset', 'ˋsʌnˏsɛt', 'n.', '日落', 'a beautiful sunset', 1, [], [
        ['The [sunset] over Uluru was amazing.', '烏魯魯的日落美極了。'],
        ["Let's have fish and chips on the beach at [sunset].", '我們日落時去海邊吃炸魚薯條吧。'],
      ]],
      ['UV index', 'ˏjuˋvi ˋɪndɛks', 'n.', '紫外線指數', 'a high UV index', 2, [], [
        ['The [UV index] is extreme today, so wear sunscreen.', '今天紫外線指數是危險級，要擦防曬。'],
        ['Check the [UV index] on the weather app before you go to the beach.', '去海邊前先在天氣 App 上查看紫外線指數。'],
      ]],
      ['season', 'ˋsizn̩', 'n.', '季節', 'the busy season', 1, ['seasonal', 'seasonally'], [
        ['Summer is my favourite [season] in Australia.', '夏天是我在澳洲最喜歡的季節。'],
        ['Fruit picking jobs depend on the [season].', '採水果的工作要看季節。'],
      ]],
      ['mild', 'maɪld', 'adj.', '溫和的', 'a mild winter', 2, ['mildly', 'mildness'], [
        ['Perth has [mild] winters and hot summers.', '伯斯冬天溫和，夏天炎熱。'],
        ['The weather is usually [mild] in autumn.', '秋天的天氣通常很溫和。'],
      ]],
    ],
  },
  {
    id: 'outdoor', track: 'life', name: '戶外活動與觀光', icon: '🏕️', words: [
      ['snorkelling', 'ˋsnɔrkl̩ɪŋ', 'n.', '浮潛', 'go snorkelling', 2, [], [
        ['We went [snorkelling] and saw a sea turtle.', '我們去浮潛，看到了一隻海龜。'],
        ['The tour includes [snorkelling] gear and lunch.', '這個行程包含浮潛裝備和午餐。'],
      ]],
      ['scuba diving', 'ˋskubə ˋdaɪvɪŋ', 'n.', '水肺潛水', 'try scuba diving', 2, [], [
        ['You need a licence to go [scuba diving] on your own.', '要自己去水肺潛水需要有證照。'],
        ['I did a [scuba diving] course on the Great Barrier Reef.', '我在大堡礁上了水肺潛水課程。'],
      ]],
      ['surfing', 'ˋsɝfɪŋ', 'n.', '衝浪', 'go surfing', 1, [], [
        ['Bondi Beach is a great place to learn [surfing].', '邦代海灘是學衝浪的好地方。'],
        ['[Surfing] is harder than it looks.', '衝浪比看起來還難。'],
      ]],
      ['kayaking', 'ˋkaɪækɪŋ', 'n.', '划獨木舟', 'go kayaking', 2, [], [
        ['We went [kayaking] with dolphins in Byron Bay.', '我們在拜倫灣划獨木舟，還看到海豚。'],
        ['Sea [kayaking] is best early in the morning when the water is calm.', '海上划獨木舟最適合在水面平靜的清晨。'],
      ]],
      ['camping', 'ˋkæmpɪŋ', 'n.', '露營', 'go camping', 1, [], [
        ['Free [camping] is allowed in some areas of the national park.', '國家公園的部分區域允許免費露營。'],
        ['[Camping] under the stars in the outback was unforgettable.', '在內陸荒野的星空下露營讓人難忘。'],
      ]],
      ['campsite', 'ˋkæmpˏsaɪt', 'n.', '營地', 'book a campsite', 1, [], [
        ['You have to book your [campsite] online before you arrive.', '你必須在抵達前先上網預訂營地。'],
        ['Our [campsite] had hot showers and a small kitchen.', '我們的營地有熱水澡和小廚房。'],
      ]],
      ['tent', 'tɛnt', 'n.', '帳篷', 'put up a tent', 1, [], [
        ['It took us an hour to put up the [tent] in the wind.', '風很大，我們花了一個小時才把帳篷搭好。'],
        ['A possum got into our [tent] and ate our bread.', '一隻負鼠鑽進我們的帳篷，把麵包吃掉了。'],
      ]],
      ['sleeping bag', 'ˋslipɪŋ bæg', 'n.', '睡袋', 'roll up a sleeping bag', 1, [], [
        ['Bring a warm [sleeping bag]; it gets cold at night.', '帶個保暖的睡袋，晚上會變冷。'],
        ['I rolled up my [sleeping bag] and packed the car.', '我把睡袋捲好，把東西裝上車。'],
      ]],
      ['campfire', 'ˋkæmpˏfaɪr', 'n.', '營火', 'sit around the campfire', 1, [], [
        ['We sat around the [campfire] and told stories.', '我們圍著營火講故事。'],
        ['A [campfire] is not allowed on days of high fire danger.', '火災危險高的日子不准生營火。'],
      ]],
      ['barbecue', 'ˋbɑrbɪkju', 'n.', '烤肉', 'have a barbecue', 1, [], [
        ['Many parks in Australia have a free public [barbecue].', '澳洲很多公園都有免費的公共烤肉台。'],
        ['Our housemates are having a [barbecue] on Sunday.', '我們的室友星期天要辦烤肉。'],
      ]],
      ['picnic', 'ˋpɪknɪk', 'n.', '野餐', 'have a picnic', 1, [], [
        ["Let's have a [picnic] in the Botanic Gardens.", '我們去植物園野餐吧。'],
        ['I packed sandwiches and fruit for the [picnic].', '我準備了三明治和水果去野餐。'],
      ]],
      ['national park', 'ˋnæʃənl̩ pɑrk', 'n.', '國家公園', 'visit a national park', 1, [], [
        ['You need a pass to drive into this [national park].', '開車進這座國家公園需要通行證。'],
        ['The Blue Mountains [national park] is two hours from Sydney.', '藍山國家公園距離雪梨兩個小時。'],
      ]],
      ['trail', 'trel', 'n.', '步道', 'a walking trail', 2, [], [
        ['This [trail] leads to a beautiful waterfall.', '這條步道通往一座漂亮的瀑布。'],
        ["Stay on the [trail] and don't feed the wildlife.", '請走在步道上，不要餵食野生動物。'],
      ]],
      ['lookout', 'ˋlʊkˏaʊt', 'n.', '觀景台', 'a scenic lookout', 2, [], [
        ['The view of the Three Sisters from the [lookout] is amazing.', '從觀景台看三姊妹岩的景色非常壯觀。'],
        ["Let's stop at the [lookout] and take some photos.", '我們在觀景台停一下拍些照片吧。'],
      ]],
      ['waterfall', 'ˋwɔtɚˏfɔl', 'n.', '瀑布', 'swim under a waterfall', 1, [], [
        ['You can swim in the pool under the [waterfall].', '你可以在瀑布下的水潭游泳。'],
        ['The [waterfall] is much bigger after heavy rain.', '大雨過後瀑布會變得壯觀許多。'],
      ]],
      ['koala', 'koˋɑlə', 'n.', '無尾熊', 'hold a koala', 1, [], [
        ['A [koala] sleeps up to 20 hours a day.', '無尾熊一天最多會睡 20 個小時。'],
        ['We saw a wild [koala] in a gum tree by the road.', '我們在路邊的尤加利樹上看到一隻野生無尾熊。'],
      ]],
      ['kangaroo', 'ˏkæŋgəˋru', 'n.', '袋鼠', 'watch out for kangaroos', 1, [], [
        ['A [kangaroo] jumped in front of our car at dusk.', '黃昏時一隻袋鼠跳到我們車前。'],
        ["The [kangaroo] is on Australia's coat of arms.", '袋鼠出現在澳洲的國徽上。'],
      ]],
      ['crocodile', 'ˋkrɑkəˏdaɪl', 'n.', '鱷魚', 'beware of crocodiles', 1, [], [
        ["Don't swim here; a [crocodile] was seen in the river last week.", '不要在這裡游泳，上週有人在河裡看到鱷魚。'],
        ['We saw a huge saltwater [crocodile] on the river cruise.', '我們在遊河行程中看到一隻巨大的鹹水鱷。'],
      ]],
      ['day trip', 'de trɪp', 'n.', '一日遊', 'take a day trip', 1, [], [
        ['We took a [day trip] from Melbourne to Phillip Island.', '我們從墨爾本到菲利普島一日遊。'],
        ['The Blue Mountains make an easy [day trip] from Sydney.', '藍山很適合從雪梨出發一日遊。'],
      ]],
      ['entry fee', 'ˋɛntrɪ fi', 'n.', '入場費', 'pay the entry fee', 1, [], [
        ['The [entry fee] for the park is $25 per car.', '公園的入場費是每台車 25 澳幣。'],
        ["There's no [entry fee] for the art gallery.", '美術館不收入場費。'],
      ]],
      ['backpack', 'ˋbækˏpæk', 'n.', '背包', 'carry a backpack', 1, [], [
        ['My [backpack] is too heavy for a long hike.', '我的背包太重了，不適合長途健行。'],
        ['Keep your passport in the inside pocket of your [backpack].', '把護照放在背包的內袋裡。'],
      ]],
      ['binoculars', 'bɪˋnɑkjəlɚz', 'n.', '望遠鏡（雙筒）', 'a pair of binoculars', 2, [], [
        ['Bring [binoculars] if you want to see the whales clearly.', '如果想看清楚鯨魚，就帶望遠鏡去。'],
        ['I watched the birds through my [binoculars].', '我用望遠鏡觀察鳥類。'],
      ]],
      ['map', 'mæp', 'n.', '地圖', 'read a map', 1, [], [
        ['Pick up a free [map] at the visitor centre.', '在遊客中心拿一份免費地圖。'],
        ["There's no signal out here, so download an offline [map].", '這裡沒有訊號，所以先下載離線地圖。'],
      ]],
      ['sunglasses', 'ˋsʌnˏglæsɪz', 'n.', '太陽眼鏡', 'wear sunglasses', 1, [], [
        ["Don't forget your hat and [sunglasses]; the sun is strong.", '別忘了帽子和太陽眼鏡，太陽很大。'],
        ['I lost my [sunglasses] in the waves.', '我的太陽眼鏡被海浪捲走了。'],
      ]],
      ['swimsuit', 'ˋswɪmˏsut', 'n.', '泳衣', 'put on a swimsuit', 1, [], [
        ['Wear your [swimsuit] under your clothes so you can swim anytime.', '把泳衣穿在衣服裡，隨時都能下水。'],
        ['I forgot my [swimsuit], so I bought one at the surf shop.', '我忘了帶泳衣，所以在衝浪用品店買了一件。'],
      ]],
    ],
  },
  {
    id: 'cooking', track: 'life', name: '超市與下廚', icon: '🍳', words: [
      ['supermarket', 'ˋsupɚˏmɑrkɪt', 'n.', '超市', 'go to the supermarket', 1, [], [
        ['The [supermarket] near our hostel is open until 10 p.m.', '我們青年旅館附近的超市開到晚上十點。'],
        ['I got a part-time job stacking shelves at the [supermarket].', '我在超市找到一份補貨上架的兼職工作。'],
      ]],
      ['trolley', 'ˋtrɑlɪ', 'n.', '購物推車（澳英）', 'push a trolley', 2, [], [
        ['You need a one-dollar coin to unlock a [trolley] at Aldi.', '在 Aldi 要投一元硬幣才能解鎖購物推車。'],
        ['Please return your [trolley] to the bay after loading your car.', '把東西搬上車後，請將購物推車推回停放區。'],
      ]],
      ['basket', 'ˋbæskɪt', 'n.', '籃子', 'a shopping basket', 1, ['baskets', 'basketball'], [
        ["I only need milk and eggs, so I'll just grab a [basket].", '我只要買牛奶和雞蛋，所以拿個籃子就好。'],
        ['She put the apples in a [basket] and went to the checkout.', '她把蘋果放進籃子裡，然後走去結帳。'],
      ]],
      ['frozen', 'ˋfrozn̩', 'adj.', '冷凍的', 'frozen food', 1, ['freeze', 'froze', 'freezes'], [
        ['I bought a bag of [frozen] dumplings for dinner.', '我買了一包冷凍水餃當晚餐。'],
        ['This pie must stay [frozen] until you bake it.', '這個派在烤之前必須保持冷凍。'],
      ]],
      ['fresh', 'frɛʃ', 'adj.', '新鮮的', 'fresh fruit', 1, ['freshly', 'freshness', 'freshen'], [
        ['These strawberries from the market look really [fresh].', '這些市場買的草莓看起來很新鮮。'],
        ['Always buy [fresh] fish from the seafood counter.', '魚一定要在海鮮櫃買新鮮的。'],
      ]],
      ['canned', 'kænd', 'adj.', '罐裝的', 'canned food', 1, ['can', 'cans'], [
        ['[Canned] tomatoes are cheap and last for months.', '罐裝番茄很便宜，又可以放好幾個月。'],
        ['We keep some [canned] food at home in case of a storm.', '我們在家裡放一些罐頭食品，以防暴風雨。'],
      ]],
      ['on special', 'ɑn ˋspɛʃəl', 'prep.', '特價中（澳）', 'be on special this week', 2, [], [
        ['Tim Tams are [on special] this week at Coles.', 'Tim Tam 餅乾這週在 Coles 特價。'],
        ['I always wait until the coffee is [on special] and then stock up.', '我總是等咖啡特價時再一次買很多。'],
      ]],
      ['half price', 'hæf praɪs', 'n.', '半價', 'at half price', 1, [], [
        ['Bread is [half price] at the bakery an hour before closing.', '麵包店打烊前一小時，麵包半價。'],
        ['I bought this shampoo at [half price] in the sale.', '這瓶洗髮精是我在特賣時用半價買的。'],
      ]],
      ['self-checkout', 'ˏsɛlfˋtʃɛkˏaʊt', 'n.', '自助結帳', 'use the self-checkout', 1, [], [
        ['The queue was long, so I used the [self-checkout].', '排隊的人很多，所以我用自助結帳。'],
        ['If the [self-checkout] stops working, a staff member will come and help.', '如果自助結帳機故障，會有店員過來幫忙。'],
      ]],
      ['deli', 'ˋdɛlɪ', 'n.', '熟食櫃', 'the deli counter', 2, [], [
        ['Can I get 200 grams of ham from the [deli], please?', '麻煩給我熟食櫃的火腿兩百公克。'],
        ['The [deli] sells roast chicken for twelve dollars.', '熟食櫃的烤雞賣十二塊錢。'],
      ]],
      ['bakery', 'ˋbekərɪ', 'n.', '麵包店', 'a local bakery', 1, ['bake', 'baked'], [
        ['The [bakery] next to our hostel sells great meat pies.', '我們青年旅館隔壁的麵包店賣很好吃的肉派。'],
        ['I bought a loaf of sourdough at the [bakery].', '我在麵包店買了一條酸種麵包。'],
      ]],
      ['butcher', 'ˋbʊtʃɚ', 'n.', '肉舖；肉販', 'the local butcher', 2, [], [
        ['The [butcher] cut the lamb chops for me.', '肉販幫我把羊排切好。'],
        ['The [butcher] on Main Street makes his own sausages.', '主街上那家肉舖自己做香腸。'],
      ]],
      ['seafood', 'ˋsiˏfud', 'n.', '海鮮', 'fresh seafood', 1, [], [
        ['We had [seafood] by the harbour on our last night in Sydney.', '在雪梨的最後一晚，我們在港邊吃海鮮。'],
        ['Prawns are the most popular [seafood] at Christmas in Australia.', '在澳洲，明蝦是聖誕節最受歡迎的海鮮。'],
      ]],
      ['cereal', 'ˋsɪrɪəl', 'n.', '穀片', 'a bowl of cereal', 1, [], [
        ['I eat a bowl of [cereal] with milk every morning.', '我每天早上吃一碗穀片配牛奶。'],
        ['The [cereal] is in aisle 4, next to the coffee.', '穀片在第四走道，咖啡旁邊。'],
      ]],
      ['boil', 'bɔɪl', 'v.', '煮沸', 'boil water', 1, ['boiled', 'boiling', 'boils'], [
        ['[Boil] the water before you add the noodles.', '先把水煮滾再放麵。'],
        ['You need to [boil] the eggs for about eight minutes.', '雞蛋要煮大約八分鐘。'],
      ]],
      ['fry', 'fraɪ', 'v.', '煎；炸', 'fry an egg', 1, ['fried', 'frying', 'fries'], [
        ['[Fry] the onions until they turn golden.', '把洋蔥炒到變成金黃色。'],
        ['Can you [fry] some eggs for breakfast?', '你可以煎幾顆蛋當早餐嗎？'],
      ]],
      ['bake', 'bek', 'v.', '烘烤', 'bake a cake', 1, ['baked', 'baker', 'bakery'], [
        ["I'm going to [bake] a cake for her birthday.", '我要烤一個蛋糕幫她慶生。'],
        ['[Bake] the pizza for 15 minutes at 200 degrees.', '用兩百度把披薩烤十五分鐘。'],
      ]],
      ['chop', 'tʃɑp', 'v.', '切碎', 'chop vegetables', 1, ['chopped', 'chopping', 'chops'], [
        ['Can you [chop] the carrots while I cook the rice?', '我煮飯的時候，你可以切紅蘿蔔嗎？'],
        ['[Chop] the garlic finely and add it to the pan.', '把大蒜切碎後放進鍋裡。'],
      ]],
      ['stir', 'stɝ', 'v.', '攪拌', 'stir the soup', 1, ['stirred', 'stirring', 'stirs'], [
        ["[Stir] the soup so it doesn't burn.", '攪拌一下湯，才不會燒焦。'],
        ['Remember to [stir] the sauce every few minutes.', '記得每隔幾分鐘攪拌一下醬汁。'],
      ]],
      ['microwave', 'ˋmaɪkroˏwev', 'n.', '微波爐', 'heat sth in the microwave', 1, ['microwaved', 'microwaving'], [
        ["There's a [microwave] in the staff kitchen.", '員工廚房裡有一台微波爐。'],
        ['Heat your lunch in the [microwave] for two minutes.', '把你的午餐放進微波爐熱兩分鐘。'],
      ]],
      ['oven', 'ˋʌvən', 'n.', '烤箱', 'preheat the oven', 1, [], [
        ['Preheat the [oven] before you put the chicken in.', '放雞肉進去之前，先預熱烤箱。'],
        ["The [oven] in our share house doesn't work properly.", '我們合租房子的烤箱不太好用。'],
      ]],
      ['frying pan', 'ˋfraɪɪŋ pæn', 'n.', '平底鍋', 'heat a frying pan', 1, [], [
        ['Heat a little oil in a [frying pan].', '在平底鍋裡加一點油加熱。'],
        ['Please wash the [frying pan] after you use it.', '用完平底鍋請洗乾淨。'],
      ]],
      ['cutting board', 'ˋkʌtɪŋ bord', 'n.', '砧板', 'a wooden cutting board', 1, [], [
        ['Use the red [cutting board] for raw meat.', '生肉請用紅色的砧板。'],
        ['Put the onion on the [cutting board] and slice it thinly.', '把洋蔥放在砧板上切成薄片。'],
      ]],
      ['groceries', 'ˋgrosərɪz', 'n.', '食品雜貨', 'buy groceries', 1, [], [
        ['We split the cost of [groceries] between four housemates.', '我們四個室友平分買菜的錢。'],
        ['I carried the [groceries] home in two bags.', '我用兩個袋子把買的東西提回家。'],
      ]],
      ['use-by date', 'ˋjuzˏbaɪ det', 'n.', '有效期限', 'check the use-by date', 2, [], [
        ['Always check the [use-by date] on milk before you buy it.', '買牛奶前一定要看有效期限。'],
        ["Don't eat the yoghurt; it's past its [use-by date].", '別吃那個優格，已經過期了。'],
      ]],
    ],
  },
  {
    id: 'doctor', track: 'life', name: '看病進階', icon: '💊', words: [
      ['GP', 'ˏdʒiˋpi', 'n.', '家庭醫師（澳英）', 'see a GP', 2, [], [
        ['I need to see a [GP] about this cough.', '我得去看家庭醫師，處理這個咳嗽。'],
        ['You can book a [GP] appointment online.', '你可以上網預約家庭醫師門診。'],
      ]],
      ['walk-in clinic', 'ˋwɔkˏɪn ˋklɪnɪk', 'n.', '免預約診所', 'go to a walk-in clinic', 2, [], [
        ['The [walk-in clinic] is open on weekends, but the wait can be long.', '那家免預約診所週末有開，但可能要等很久。'],
        ["If you can't get a GP appointment, try a [walk-in clinic].", '如果約不到家庭醫師，可以去免預約診所。'],
      ]],
      ['Medicare', 'ˋmɛdɪˏkɛr', 'n.', '澳洲全民健保', 'a Medicare card', 2, [], [
        ['Visitors from Taiwan are not covered by [Medicare], so get travel insurance.', '台灣來的旅客不在澳洲健保的保障範圍內，所以要買旅遊保險。'],
        ['The receptionist asked if I had a [Medicare] card.', '櫃檯人員問我有沒有澳洲健保卡。'],
      ]],
      ['sore throat', 'sor θrot', 'n.', '喉嚨痛', 'have a sore throat', 1, [], [
        ['I have a [sore throat] and a slight fever.', '我喉嚨痛，還有一點發燒。'],
        ['Honey and lemon tea can help a [sore throat].', '蜂蜜檸檬茶可以舒緩喉嚨痛。'],
      ]],
      ['runny nose', 'ˋrʌnɪ noz', 'n.', '流鼻水', 'have a runny nose', 1, [], [
        ["I've had a [runny nose] since the weather turned cold.", '天氣變冷之後我就一直流鼻水。'],
        ['Kids with a [runny nose] should stay home from day care.', '流鼻水的小孩不要去托兒所。'],
      ]],
      ['stomachache', 'ˋstʌməkˏek', 'n.', '胃痛；肚子痛', 'have a stomachache', 1, [], [
        ['I got a [stomachache] after eating that old sushi.', '吃了那個放太久的壽司之後，我肚子痛。'],
        ['She called in sick because of a bad [stomachache].', '她因為胃痛得很厲害而請病假。'],
      ]],
      ['diarrhea', 'ˏdaɪəˋriə', 'n.', '腹瀉', 'have diarrhea', 2, [], [
        ['Drink plenty of water if you have [diarrhea].', '如果拉肚子，要多喝水。'],
        ['The doctor said the [diarrhea] was caused by bad water.', '醫生說腹瀉是不乾淨的水造成的。'],
      ]],
      ['vomit', 'ˋvɑmɪt', 'v.', '嘔吐', 'start to vomit', 2, ['vomited', 'vomiting', 'vomits'], [
        ['The boat was rocking so much that I thought I would [vomit].', '船晃得好厲害，我以為自己會吐出來。'],
        ["The nurse told me to sip water slowly so I wouldn't [vomit] again.", '護理師要我小口慢慢喝水，才不會又吐。'],
      ]],
      ['rash', 'ræʃ', 'n.', '疹子', 'get a rash', 2, ['rashes', 'rashly'], [
        ['I got a [rash] from the new sunscreen.', '我擦了新的防曬乳後起疹子。'],
        ["There's a red [rash] on my arm that won't go away.", '我手臂上有一塊紅疹一直不退。'],
      ]],
      ['bruise', 'bruz', 'n.', '瘀青', 'a big bruise', 2, ['bruised', 'bruises'], [
        ['I have a big [bruise] on my leg from the ladder.', '我從梯子摔下來，腿上有一大塊瘀青。'],
        ['Where did you get that [bruise] on your arm?', '你手臂上那塊瘀青是怎麼來的？'],
      ]],
      ['burn', 'bɝn', 'n.', '燒燙傷', 'treat a burn', 1, ['burnt', 'burned'], [
        ['I got a [burn] on my hand from the hot oven tray.', '我被很燙的烤盤燙傷了手。'],
        ['Run cool water over the [burn] for twenty minutes.', '用冷水沖燙傷的地方二十分鐘。'],
      ]],
      ['swollen', 'ˋswolən', 'adj.', '腫起來的', 'a swollen ankle', 2, [], [
        ['My ankle is still [swollen] after the fall.', '跌倒之後，我的腳踝還是腫的。'],
        ['The bee sting left her hand red and [swollen].', '被蜜蜂叮了之後，她的手又紅又腫。'],
      ]],
      ['itchy', 'ˋɪtʃɪ', 'adj.', '癢的', 'itchy skin', 1, ['itch', 'itches'], [
        ['The mosquito bites on my legs are really [itchy].', '我腳上的蚊子咬的包好癢。'],
        ['This wool jumper feels [itchy].', '這件羊毛毛衣穿起來好癢。'],
      ]],
      ['painkiller', 'ˋpenˏkɪlɚ', 'n.', '止痛藥', 'take a painkiller', 1, [], [
        ['You can buy a [painkiller] like Panadol at any chemist.', '在任何一家藥局都買得到像普拿疼這樣的止痛藥。'],
        ['Take a [painkiller] with food, not on an empty stomach.', '止痛藥要配食物吃，不要空腹吃。'],
      ]],
      ['antibiotic', 'ˏæntɪbaɪˋɑtɪk', 'n.', '抗生素', 'prescribe an antibiotic', 2, [], [
        ['The GP gave me an [antibiotic] for the infection.', '家庭醫師開了抗生素給我治感染。'],
        ['In Australia, you need a prescription to buy an [antibiotic].', '在澳洲，買抗生素需要處方箋。'],
      ]],
      ['bandage', 'ˋbændɪdʒ', 'n.', '繃帶', 'put on a bandage', 1, ['bandaged', 'bandaging'], [
        ['Put a [bandage] on the cut to keep it clean.', '在傷口上綁繃帶保持乾淨。'],
        ['The nurse wrapped a [bandage] around my wrist.', '護理師在我手腕上纏了繃帶。'],
      ]],
      ['ointment', 'ˋɔɪntmənt', 'n.', '藥膏', 'apply ointment', 3, [], [
        ['Apply this [ointment] to the rash twice a day.', '這個藥膏一天擦兩次在疹子上。'],
        ['The pharmacist recommended an [ointment] for my sunburn.', '藥師推薦了一種治曬傷的藥膏。'],
      ]],
      ['flu', 'flu', 'n.', '流感', 'catch the flu', 1, [], [
        ['Half the team is off work with the [flu].', '團隊有一半的人得了流感在家休息。'],
        ['You can get a [flu] shot at most chemists.', '大部分藥局都可以打流感疫苗。'],
      ]],
      ['infection', 'ɪnˋfɛkʃən', 'n.', '感染', 'an ear infection', 2, ['infect', 'infected', 'infectious'], [
        ['The cut on his hand turned into an [infection].', '他手上的傷口後來感染了。'],
        ['You need antibiotics for this [infection].', '這種感染需要用抗生素治療。'],
      ]],
      ['toothache', 'ˋtuθˏek', 'n.', '牙痛', 'have a toothache', 1, [], [
        ["I couldn't sleep last night because of a [toothache].", '我昨晚牙痛到睡不著。'],
        ['Dentists in Australia are expensive, so I hope this [toothache] goes away.', '澳洲看牙很貴，希望這牙痛會自己好。'],
      ]],
      ['blood test', 'blʌd tɛst', 'n.', '驗血', 'have a blood test', 1, [], [
        ['The doctor wants me to have a [blood test] tomorrow.', '醫生要我明天去驗血。'],
        ["Don't eat anything for twelve hours before the [blood test].", '驗血前十二小時不要吃東西。'],
      ]],
      ['X-ray', 'ˋɛksˏre', 'n.', 'X 光', 'have an X-ray', 1, [], [
        ["The [X-ray] showed that my wrist wasn't broken.", 'X 光顯示我的手腕沒有骨折。'],
        ['The hospital sent me for an [X-ray] after the fall.', '我跌倒後，醫院安排我去照 X 光。'],
      ]],
      ['nausea', 'ˋnɔʃɪə', 'n.', '噁心', 'feel nausea', 3, ['nauseous', 'nauseated'], [
        ['This medicine may cause [nausea], so take it after meals.', '這個藥可能會引起噁心，所以要飯後吃。'],
        ['I felt a wave of [nausea] on the boat to the reef.', '在去大堡礁的船上，我一陣噁心想吐。'],
      ]],
      ['sneeze', 'sniz', 'v.', '打噴嚏', 'start to sneeze', 1, ['sneezed', 'sneezing', 'sneezes'], [
        ['Dust always makes me [sneeze].', '灰塵總是讓我打噴嚏。'],
        ['I started to [sneeze] as soon as I walked into the garden.', '我一走進花園就開始打噴嚏。'],
      ]],
      ['thermometer', 'θɚˋmɑmətɚ', 'n.', '溫度計', 'a digital thermometer', 2, [], [
        ['Do you have a [thermometer]? I think I have a fever.', '你有溫度計嗎？我好像發燒了。'],
        ['The nurse put the [thermometer] in my ear.', '護理師把溫度計放進我的耳朵量體溫。'],
      ]],
    ],
  },
  {
    id: 'slang', track: 'life', name: '澳洲口語與交朋友', icon: '🦘', words: [
      ['mate', 'met', 'n.', '朋友；老兄（澳）', 'thanks, mate', 1, [], [
        ['Thanks for the lift, [mate]!', '謝啦，老兄，謝謝你載我一程！'],
        ['My [mate] from the farm is coming to visit me in Melbourne.', '我在農場認識的朋友要來墨爾本找我。'],
      ]],
      ["G'day", 'gəˋde', 'adv.', '你好（澳）', "G'day, mate", 1, [], [
        ["[G'day], how are you going?", '你好，最近過得怎樣？'],
        ["The old farmer waved and said '[G'day]' to everyone.", '老農夫揮揮手跟每個人說「你好」。'],
      ]],
      ['arvo', 'ˋɑrvo', 'n.', '下午（澳）', 'this arvo', 2, [], [
        ['See you at the beach this [arvo]!', '今天下午海邊見！'],
        ['We finish picking at noon and have the [arvo] off.', '我們中午就採收完，下午放假。'],
      ]],
      ['brekkie', 'ˋbrɛkɪ', 'n.', '早餐（澳）', 'grab some brekkie', 2, [], [
        ["Let's grab [brekkie] at the café before work.", '上班前我們去咖啡店吃個早餐吧。'],
        ['The hostel offers free [brekkie] until 9 a.m.', '青年旅館九點前提供免費早餐。'],
      ]],
      ['barbie', 'ˋbɑrbɪ', 'n.', '烤肉（澳）', 'have a barbie', 2, [], [
        ["We're having a [barbie] at the park on Saturday.", '我們星期六要在公園烤肉。'],
        ['Throw some sausages on the [barbie]!', '放幾條香腸到烤肉架上吧！'],
      ]],
      ['no worries', 'no ˋwɝɪz', 'adv.', '沒問題；不客氣', 'no worries, mate', 1, [], [
        ['"Thanks for helping me move." "[No worries]!"', '「謝謝你幫我搬家。」「不客氣！」'],
        ["\"Sorry I'm late.\" \"[No worries], we just got here too.\"", '「抱歉我遲到了。」「沒關係，我們也剛到。」'],
      ]],
      ['heaps', 'hips', 'adv.', '很多；非常（澳）', 'thanks heaps', 1, [], [
        ['Thanks [heaps] for the lift to the airport!', '超謝謝你載我去機場！'],
        ["I've got [heaps] of time before my shift starts.", '離我上班還有很多時間。'],
      ]],
      ['reckon', 'ˋrɛkən', 'v.', '認為', 'I reckon', 2, [], [
        ["I [reckon] it's going to rain this arvo.", '我覺得今天下午會下雨。'],
        ['Do you [reckon] we can get there before dark?', '你覺得我們天黑前到得了嗎？'],
      ]],
      ['keen', 'kin', 'adj.', '熱衷的；想要', 'be keen to do sth', 2, ['keenly', 'keenness'], [
        ['Are you [keen] to come to the beach with us?', '你想跟我們一起去海邊嗎？'],
        ["I'm really [keen] on learning to surf.", '我很想學衝浪。'],
      ]],
      ['thongs', 'θɔŋz', 'n.', '夾腳拖（澳）', 'a pair of thongs', 2, [], [
        ['Most people wear [thongs] to the beach.', '大部分的人都穿夾腳拖去海邊。'],
        ["You can't wear [thongs] on the farm; you need boots.", '在農場不能穿夾腳拖，要穿靴子。'],
      ]],
      ['servo', 'ˋsɝvo', 'n.', '加油站（澳）', 'stop at the servo', 3, [], [
        ["Let's stop at the next [servo] for petrol and snacks.", '我們在下一個加油站停一下，加油順便買點零食。'],
        ['The [servo] in town is the only shop open after 8 p.m.', '鎮上的加油站是晚上八點後唯一還開的店。'],
      ]],
      ['bottle-o', 'ˋbɑtl̩ˏo', 'n.', '酒類專賣店（澳）', 'go to the bottle-o', 3, [], [
        ["Supermarkets here don't sell beer, so go to the [bottle-o].", '這裡的超市不賣啤酒，要去酒類專賣店買。'],
        ['The [bottle-o] asked to see my passport.', '酒類專賣店要求看我的護照。'],
      ]],
      ['uni', 'ˋjunɪ', 'n.', '大學（澳英）', 'go to uni', 1, [], [
        ['My housemate is studying nursing at [uni].', '我的室友在大學讀護理。'],
        ['What did you study at [uni] in Taiwan?', '你在台灣大學讀什麼？'],
      ]],
      ['footy', 'ˋfʊtɪ', 'n.', '足球；橄欖球（澳）', 'watch the footy', 2, [], [
        ['The whole pub was watching the [footy] on Saturday night.', '星期六晚上整間酒吧的人都在看球賽。'],
        ['Do you want to come to the [footy] with us this weekend?', '這週末要不要跟我們去看球？'],
      ]],
      ['stoked', 'stokt', 'adj.', '超開心的', 'be stoked about sth', 2, [], [
        ["I'm so [stoked] I got the job!", '我得到那份工作了，超開心！'],
        ['She was [stoked] to see a koala in the wild.', '她在野外看到無尾熊，超興奮的。'],
      ]],
      ['cheers', 'tʃɪrz', 'adv.', '謝謝；乾杯', 'cheers, mate', 1, [], [
        ["\"Here's your coffee.\" \"[Cheers]!\"", '「你的咖啡。」「謝啦！」'],
        ['We raised our glasses and said "[Cheers]!"', '我們舉起杯子說「乾杯！」'],
      ]],
      ['catch up', 'kætʃ ʌp', 'v.', '敘舊；見面', 'catch up for coffee', 1, [], [
        ["Let's [catch up] for coffee next week.", '我們下週約喝咖啡聊聊吧。'],
        ['It was great to [catch up] with my old friends from the hostel.', '能跟青旅的老朋友見面敘舊真好。'],
      ]],
      ['hang out', 'hæŋ aʊt', 'v.', '一起玩', 'hang out with friends', 1, [], [
        ['We usually [hang out] at the beach after work.', '我們下班後通常會去海邊混。'],
        ['Do you want to [hang out] this weekend?', '這週末要不要一起出去玩？'],
      ]],
      ['chill', 'tʃɪl', 'v.', '放鬆', 'chill at home', 1, ['chilly', 'chilled'], [
        ["Let's just [chill] at home tonight.", '今晚我們就在家放鬆吧。'],
        ['I want to [chill] by the pool after work.', '下班後我想在泳池邊放鬆一下。'],
      ]],
      ['awesome', 'ˋɔsəm', 'adj.', '很棒的', 'an awesome time', 1, ['awe', 'awed'], [
        ['The view from the top of the mountain was [awesome]!', '山頂的風景太棒了！'],
        ['We had an [awesome] time at the music festival.', '我們在音樂節玩得超開心。'],
      ]],
      ['legend', 'ˋlɛdʒənd', 'n.', '超讚的人（澳）', "You're a legend!", 2, [], [
        ["You fixed my bike? You're a [legend]!", '你幫我修好腳踏車了？你太讚了！'],
        ['Our manager is a [legend]; he bought pizza for the whole team.', '我們經理超讚，他請全隊吃披薩。'],
      ]],
      ['sunnies', 'ˋsʌnɪz', 'n.', '太陽眼鏡（澳）', 'a pair of sunnies', 3, [], [
        ["Don't forget your hat and [sunnies]; the sun is strong today.", '別忘了帽子和太陽眼鏡，今天太陽很大。'],
        ['I lost my [sunnies] somewhere on the beach.', '我的太陽眼鏡掉在海灘上某個地方了。'],
      ]],
      ['bloke', 'blok', 'n.', '傢伙；男人（澳英）', 'a nice bloke', 2, [], [
        ['The [bloke] at the front desk gave me a map of the town.', '櫃檯那個男的給了我一張小鎮地圖。'],
        ['Our boss is a nice [bloke], but he talks really fast.', '我們老闆人很好，但講話超快。'],
      ]],
      ['togs', 'tɑgz', 'n.', '泳衣（澳）', 'pack your togs', 3, [], [
        ["Bring your [togs]; we're going to the pool.", '帶泳衣喔，我們要去游泳池。'],
        ['My [togs] are still wet from this morning.', '我的泳衣早上弄濕到現在還沒乾。'],
      ]],
      ['esky', 'ˋɛskɪ', 'n.', '保冷箱（澳）', 'fill the esky with ice', 3, [], [
        ['Put the drinks in the [esky] with plenty of ice.', '把飲料放進保冷箱，多放點冰塊。'],
        ['We packed sandwiches in the [esky] for the road trip.', '我們把三明治裝進保冷箱帶去公路旅行。'],
      ]],
    ],
  },
  {
    id: 'paperwork', track: 'life', name: '證件與公家手續', icon: '📄', words: [
      ['form', 'fɔrm', 'n.', '表格', 'fill in a form', 1, [], [
        ['Please fill in this [form] and sign at the bottom.', '請填寫這張表格，並在最下面簽名。'],
        ['You can download the application [form] from the website.', '申請表可以從網站下載。'],
      ]],
      ['photo ID', 'ˋfoto ˏaɪˋdi', 'n.', '附照片的證件', 'show photo ID', 1, [], [
        ['You need to show [photo ID] to buy alcohol.', '買酒要出示附照片的證件。'],
        ["A passport or driver's licence is accepted as [photo ID].", '護照或駕照都可以當作附照片的證件。'],
      ]],
      ['proof of address', 'pruf əv əˋdrɛs', 'n.', '地址證明', 'provide proof of address', 2, [], [
        ['The bank asked for [proof of address], like a phone bill.', '銀行要求地址證明，像是電話帳單。'],
        ['A letter from your employer can work as [proof of address].', '雇主寄給你的信可以當作地址證明。'],
      ]],
      ['birth certificate', 'bɝθ sɚˋtɪfəkɪt', 'n.', '出生證明', 'a copy of your birth certificate', 2, [], [
        ['I had to bring my [birth certificate] to the embassy.', '我得帶出生證明去大使館。'],
        ['Her [birth certificate] is in Chinese, so she needs a translation.', '她的出生證明是中文的，所以需要翻譯。'],
      ]],
      ['certified copy', 'ˋsɝtəˏfaɪd ˋkɑpɪ', 'n.', '認證影本', 'a certified copy of your passport', 3, [], [
        ['Send a [certified copy] of your passport, not the original.', '寄護照的認證影本，不要寄正本。'],
        ['A pharmacist or police officer can sign a [certified copy] for you.', '藥師或警察可以幫你簽署認證影本。'],
      ]],
      ['translation', 'trænsˋleʃən', 'n.', '翻譯', 'an official translation', 1, ['translate', 'translated'], [
        ['You need an official English [translation] of your Taiwanese licence.', '你需要台灣駕照的正式英文翻譯。'],
        ['The [translation] must be done by a certified translator.', '翻譯必須由有認證的翻譯員完成。'],
      ]],
      ['visa grant', 'ˋvizə grænt', 'n.', '簽證核准', 'a visa grant letter', 2, [], [
        ['I received my [visa grant] by email just two days after applying.', '申請後才兩天，我就收到簽證核准的電子郵件。'],
        ['Print your [visa grant] notice and keep it with your passport.', '把簽證核准通知印出來，和護照放在一起。'],
      ]],
      ['visa condition', 'ˋvizə kənˋdɪʃən', 'n.', '簽證條件', 'breach a visa condition', 2, [], [
        ["One [visa condition] is that you can't work for the same employer for more than six months.", '其中一項簽證條件是同一個雇主不能做超過六個月。'],
        ['Read each [visa condition] carefully before you sign a work contract.', '簽工作合約前，要仔細看每一項簽證條件。'],
      ]],
      ['expiry date', 'ɪkˋspaɪrɪ det', 'n.', '到期日（英澳）', 'check the expiry date', 2, [], [
        ['Check the [expiry date] on your passport before you travel.', '出發前檢查一下護照的到期日。'],
        ["The card's [expiry date] is printed on the back.", '卡片的到期日印在背面。'],
      ]],
      ['queue', 'kju', 'n.', '排隊（英澳）', 'join the queue', 1, ['queued', 'queuing'], [
        ['There was a long [queue] at the post office this morning.', '今天早上郵局排了好長的隊。'],
        ['Please join the [queue] and wait for your number to be called.', '請排隊等候叫號。'],
      ]],
      ['ticket number', 'ˋtɪkɪt ˋnʌmbɚ', 'n.', '號碼牌', 'wait for your ticket number', 1, [], [
        ['Take a [ticket number] from the machine by the door.', '從門口的機器抽一張號碼牌。'],
        ['When your [ticket number] appears on the screen, go to the counter.', '螢幕上出現你的號碼時，就到櫃檯去。'],
      ]],
      ['counter', 'ˋkaʊntɚ', 'n.', '櫃檯', 'go to counter 3', 1, [], [
        ['Please go to [counter] 3 when your number is called.', '叫到你的號碼時，請到三號櫃檯。'],
        ['The woman at the [counter] checked my passport and visa.', '櫃檯的女士檢查了我的護照和簽證。'],
      ]],
      ['processing time', 'ˋprɑsɛsɪŋ taɪm', 'n.', '處理時間', 'the current processing time', 2, [], [
        ['The [processing time] for a tax file number is about two weeks.', '稅號的處理時間大約兩週。'],
        ['Check the website for the latest [processing time] before you apply.', '申請前先上網確認最新的處理時間。'],
      ]],
      ['government office', 'ˋgʌvɚnmənt ˋɔfɪs', 'n.', '政府機關', 'visit a government office', 1, [], [
        ['Most [government office] counters close at 4:30 p.m.', '大部分政府機關的櫃檯下午四點半就關了。'],
        ["You'll need to visit a [government office] in person to change your licence.", '換駕照要親自去政府機關辦理。'],
      ]],
      ['post office', 'post ˋɔfɪs', 'n.', '郵局', 'go to the post office', 1, [], [
        ['I sent a parcel home from the [post office].', '我在郵局寄了一個包裹回家。'],
        ['You can apply for a police check at the [post office].', '你可以在郵局申請良民證。'],
      ]],
      ['police check', 'pəˋlis tʃɛk', 'n.', '良民證', 'apply for a police check', 3, [], [
        ['Many aged care jobs require a [police check].', '很多老人照護工作都需要良民證。'],
        ['My [police check] came back clear after a week.', '一週後我的良民證就核發下來了，沒有任何紀錄。'],
      ]],
      ['identity', 'aɪˋdɛntətɪ', 'n.', '身分', 'proof of identity', 2, ['identify', 'identical'], [
        ['You must show proof of [identity] to open a bank account.', '開銀行帳戶必須出示身分證明。'],
        ['Someone stole my wallet and used my [identity] online.', '有人偷了我的錢包，還在網路上冒用我的身分。'],
      ]],
      ['nationality', 'ˏnæʃəˋnælətɪ', 'n.', '國籍', 'write your nationality', 1, ['national', 'nationally'], [
        ['Write your [nationality] in the box under your name.', '在你名字下面的欄位寫上國籍。'],
        ['My [nationality] is Taiwanese.', '我的國籍是台灣。'],
      ]],
      ['date of birth', 'det əv bɝθ', 'n.', '出生日期', 'enter your date of birth', 1, [], [
        ['Please enter your [date of birth] in DD/MM/YYYY format.', '請用「日／月／年」的格式填寫出生日期。'],
        ["The [date of birth] on the form doesn't match your passport.", '表格上的出生日期和你的護照不一致。'],
      ]],
      ['place of birth', 'ples əv bɝθ', 'n.', '出生地', 'list your place of birth', 1, [], [
        ['For [place of birth], just write the city and country.', '出生地只要寫城市和國家就好。'],
        ['My passport shows Taichung as my [place of birth].', '我的護照上出生地寫的是台中。'],
      ]],
      ['marital status', 'ˋmærətl̩ ˋstetəs', 'n.', '婚姻狀況', 'state your marital status', 2, [], [
        ['The form asks for your [marital status]: single, married or other.', '表格要填婚姻狀況：單身、已婚或其他。'],
        ['You must tell the office if your [marital status] changes.', '婚姻狀況有變動時，必須通知該機關。'],
      ]],
      ['home address', 'hom əˋdrɛs', 'n.', '住址', 'update your home address', 1, [], [
        ['Please update your [home address] when you move to a new town.', '搬到新的城鎮時，請更新你的住址。'],
        ['Can I use my hostel as my [home address]?', '我可以用青年旅館當作住址嗎？'],
      ]],
      ['emergency contact', 'ɪˋmɝdʒənsɪ ˋkɑntækt', 'n.', '緊急聯絡人', 'list an emergency contact', 1, [], [
        ['I put my sister down as my [emergency contact].', '我把姊姊填成緊急聯絡人。'],
        ['Every worker must give the farm an [emergency contact].', '每位工人都必須提供農場一位緊急聯絡人。'],
      ]],
      ['next of kin', 'nɛkst əv kɪn', 'n.', '最近親屬', 'notify the next of kin', 3, [], [
        ['The hospital form asked for my [next of kin].', '醫院的表格要我填最近親屬。'],
        ['My father is listed as my [next of kin].', '我的最近親屬登記的是我父親。'],
      ]],
      ['case number', 'kes ˋnʌmbɚ', 'n.', '案件編號', 'quote your case number', 2, [], [
        ['Please quote your [case number] when you call us.', '來電時請提供您的案件編號。'],
        ['I wrote down the [case number] after reporting my stolen phone.', '報案手機被偷之後，我把案件編號抄了下來。'],
      ]],
    ],
  },
  {
    id: 'citytransit', track: 'life', name: '城市交通', icon: '🚋', words: [
      ['tram', 'træm', 'n.', '路面電車', 'take the tram', 1, [], [
        ["The [tram] is free in Melbourne's city centre.", '在墨爾本市中心搭路面電車免費。'],
        ['I take the [tram] to work every morning.', '我每天早上搭路面電車上班。'],
      ]],
      ['train station', 'tren ˋsteʃən', 'n.', '火車站', 'the nearest train station', 1, [], [
        ['The hostel is a five-minute walk from the [train station].', '青年旅館離火車站走路五分鐘。'],
        ["Let's meet in front of the [train station] at six.", '我們六點在火車站前面見。'],
      ]],
      ['tap on', 'tæp ɑn', 'v.', '上車刷卡', 'tap on with your card', 1, [], [
        ['Remember to [tap on] when you get on the bus.', '上公車時記得刷卡。'],
        ['You can [tap on] with your phone or a credit card in Sydney.', '在雪梨可以用手機或信用卡刷卡上車。'],
      ]],
      ['tap off', 'tæp ɔf', 'v.', '下車刷卡', 'forget to tap off', 1, [], [
        ["If you forget to [tap off], you'll be charged the full fare.", '如果忘了下車刷卡，會被收全額車資。'],
        ["Don't forget to [tap off] at the gate when you leave the station.", '出站時別忘了在閘門刷卡。'],
      ]],
      ['bus stop', 'bʌs stɑp', 'n.', '公車站', 'wait at the bus stop', 1, [], [
        ['The [bus stop] is right outside the supermarket.', '公車站就在超市外面。'],
        ['I waited at the [bus stop] for half an hour.', '我在公車站等了半小時。'],
      ]],
      ['return ticket', 'rɪˋtɝn ˋtɪkɪt', 'n.', '來回票（英澳）', 'buy a return ticket', 1, [], [
        ['A [return ticket] to the Blue Mountains is cheaper than two singles.', '去藍山的來回票比兩張單程票便宜。'],
        ['Can I get a [return ticket] to Brisbane, please?', '麻煩給我一張到布里斯本的來回票。'],
      ]],
      ['one-way', 'ˋwʌnˋwe', 'adj.', '單程的', 'a one-way ticket', 1, [], [
        ["I bought a [one-way] ticket because I'm not sure when I'll come back.", '我買了單程票，因為還不確定什麼時候回來。'],
        ['Be careful; this is a [one-way] street.', '小心，這是單行道。'],
      ]],
      ['peak hour', 'pik aʊr', 'n.', '尖峰時段（澳）', 'during peak hour', 2, [], [
        ['Trains are packed during [peak hour].', '尖峰時段火車擠滿了人。'],
        ['Try to avoid driving into the city in [peak hour].', '盡量避免在尖峰時段開車進城。'],
      ]],
      ['off-peak', 'ˏɔfˋpik', 'adj.', '離峰的', 'off-peak fares', 2, [], [
        ['[Off-peak] fares are 30 percent cheaper.', '離峰時段的車資便宜三成。'],
        ["If you travel at an [off-peak] time, you'll easily get a seat.", '如果在離峰時間搭車，很容易就有位子。'],
      ]],
      ['taxi rank', 'ˋtæksɪ ræŋk', 'n.', '計程車招呼站', 'the taxi rank outside the station', 2, [], [
        ["There's a [taxi rank] outside the arrivals hall.", '入境大廳外面有計程車招呼站。'],
        ['The queue at the [taxi rank] was very long after the concert.', '演唱會結束後，計程車招呼站排了好長的隊。'],
      ]],
      ['rideshare', 'ˋraɪdˏʃɛr', 'n.', '共乘叫車', 'book a rideshare', 2, [], [
        ['It was late, so we booked a [rideshare] back to the hostel.', '時間很晚了，所以我們叫了共乘車回青年旅館。'],
        ['A [rideshare] to the airport costs about 50 dollars.', '叫車到機場大約五十塊錢。'],
      ]],
      ['bike lane', 'baɪk len', 'n.', '自行車道', 'ride in the bike lane', 1, [], [
        ["Please don't park in the [bike lane].", '請不要把車停在自行車道上。'],
        ["There's a [bike lane] all the way along the river.", '沿著河邊一路都有自行車道。'],
      ]],
      ['footpath', 'ˋfʊtˏpæθ', 'n.', '人行道（澳）', 'walk on the footpath', 2, [], [
        ['Stay on the [footpath]; the road is very busy.', '走在人行道上，這條路車很多。'],
        ['Scooters are not allowed on the [footpath] in some cities.', '有些城市不准在人行道上騎滑板車。'],
      ]],
      ['traffic light', 'ˋtræfɪk laɪt', 'n.', '紅綠燈', 'turn left at the traffic light', 1, [], [
        ['Turn left at the next [traffic light].', '在下一個紅綠燈左轉。'],
        ['The [traffic light] near the hostel is broken.', '青年旅館附近的紅綠燈壞了。'],
      ]],
      ['block', 'blɑk', 'n.', '街區', 'walk two blocks', 1, [], [
        ['The café is just one [block] from the station.', '咖啡店離車站只有一個街區。'],
        ["Walk around the [block] and you'll see the library.", '繞過這個街區就會看到圖書館。'],
      ]],
      ['corner', 'ˋkɔrnɚ', 'n.', '轉角', 'on the corner of', 1, [], [
        ['The pharmacy is on the [corner] of George Street and King Street.', '藥局在喬治街和國王街的轉角。'],
        ['Wait for me at the [corner] near the bank.', '在銀行附近的轉角等我。'],
      ]],
      ['CBD', 'ˏsiˏbiˋdi', 'n.', '市中心商業區', 'work in the CBD', 2, [], [
        ['Parking in the [CBD] is really expensive.', '在市中心停車非常貴。'],
        ['Lots of backpackers find café jobs in the [CBD].', '很多背包客在市中心找到咖啡店的工作。'],
      ]],
      ['suburb', 'ˋsʌbɝb', 'n.', '郊區', 'a quiet suburb', 1, ['suburban', 'suburbs'], [
        ['We moved to a quiet [suburb] where rent is cheaper.', '我們搬到一個房租比較便宜的安靜郊區。'],
        ['Which [suburb] is your new share house in?', '你新的合租房子在哪個區？'],
      ]],
      ['transport card', 'ˋtrænsˏport kɑrd', 'n.', '交通卡', 'top up your transport card', 1, [], [
        ['You can top up your [transport card] at any convenience store.', '交通卡在任何一家便利商店都能儲值。'],
        ['In Melbourne, the [transport card] is called a myki.', '在墨爾本，交通卡叫做 myki。'],
      ]],
      ['next stop', 'nɛkst stɑp', 'n.', '下一站', 'get off at the next stop', 1, [], [
        ['The [next stop] is Central Station.', '下一站是中央車站。'],
        ['Press the button if you want to get off at the [next stop].', '如果要在下一站下車，請按鈴。'],
      ]],
      ['get off', 'gɛt ɔf', 'v.', '下車', 'get off the bus', 1, [], [
        ['We need to [get off] at the third stop.', '我們要在第三站下車。'],
        ['Wait until the tram stops before you [get off].', '等電車停穩再下車。'],
      ]],
      ['get on', 'gɛt ɑn', 'v.', '上車', 'get on the train', 1, [], [
        ['Let people off the train before you [get on].', '先讓人下車再上車。'],
        ['Make sure you [get on] the right bus; there are two 380s.', '確認你搭對公車，有兩班 380 號。'],
      ]],
      ['miss the bus', 'mɪs ðə bʌs', 'v.', '錯過公車', 'hurry or you will miss the bus', 1, [], [
        ["Hurry up or we'll [miss the bus]!", '快一點，不然我們會趕不上公車！'],
        ['If you [miss the bus], the next one is in an hour.', '如果錯過這班公車，下一班要一小時後。'],
      ]],
      ['change trains', 'tʃendʒ trenz', 'v.', '轉乘火車', 'change trains at Central', 1, [], [
        ["You'll need to [change trains] at Central to get to the airport.", '去機場要在中央車站轉車。'],
        ['We had to [change trains] twice to get to the beach.', '我們轉了兩次火車才到海邊。'],
      ]],
      ['walking distance', 'ˋwɔkɪŋ ˋdɪstəns', 'n.', '步行距離', 'within walking distance', 1, [], [
        ['The beach is within [walking distance] of our hostel.', '海灘離我們的青年旅館走路就到得了。'],
        ['Is the supermarket within [walking distance], or do I need a car?', '超市走路到得了嗎，還是要開車？'],
      ]],
    ],
  },
  {
    id: 'feelings', track: 'life', name: '情緒與個性', icon: '😊', words: [
      ['homesick', 'ˋhomˏsɪk', 'adj.', '想家的', 'feel homesick', 1, [], [
        ["I felt [homesick] when I saw photos of my mum's cooking.", '看到媽媽做的菜的照片，我就想家了。'],
        ['Lots of backpackers get [homesick] around Chinese New Year.', '很多背包客在農曆新年前後會想家。'],
      ]],
      ['lonely', 'ˋlonlɪ', 'adj.', '寂寞的', 'feel lonely', 1, [], [
        ['My first week in Perth was quite [lonely].', '我在伯斯的第一個星期很寂寞。'],
        ['Joining a sports club helped me feel less [lonely].', '加入運動社團讓我比較不寂寞。'],
      ]],
      ['excited', 'ɪkˋsaɪtɪd', 'adj.', '興奮的', 'be excited about', 1, ['exciting', 'excite', 'excitement'], [
        ["I'm so [excited] about my trip to Uluru.", '我對要去烏魯魯的旅行超興奮的。'],
        ['The kids were [excited] to see kangaroos at the park.', '孩子們在公園看到袋鼠都很興奮。'],
      ]],
      ['nervous', 'ˋnɝvəs', 'adj.', '緊張的', 'feel nervous about', 1, ['nervously', 'nerve', 'nervousness'], [
        ['I was [nervous] before my first job interview in English.', '第一次用英文面試之前，我很緊張。'],
        ['Talking on the phone in English makes me [nervous].', '用英文講電話讓我很緊張。'],
      ]],
      ['confident', 'ˋkɑnfədənt', 'adj.', '有自信的', 'be confident that', 1, ['confidence', 'confidently', 'confide'], [
        ["She is [confident] that she'll find a farm job soon.", '她有信心很快就會找到農場的工作。'],
        ['Be [confident] when you hand your resume to the manager.', '把履歷交給經理時要有自信。'],
      ]],
      ['shy', 'ʃaɪ', 'adj.', '害羞的', 'a bit shy', 1, ['shyly', 'shyness'], [
        ["He's a bit [shy] at first, but he's really funny.", '他一開始有點害羞，但其實很好笑。'],
        ["Don't be [shy]; come and join us!", '別害羞，過來一起玩吧！'],
      ]],
      ['outgoing', 'ˋaʊtˏgoɪŋ', 'adj.', '外向的', 'an outgoing person', 1, [], [
        ['My housemate is very [outgoing] and knows everyone in town.', '我的室友很外向，鎮上的人他都認識。'],
        ["Hostel life is easier if you're [outgoing].", '如果你個性外向，住青年旅館會比較容易。'],
      ]],
      ['friendly', 'ˋfrɛndlɪ', 'adj.', '友善的', 'friendly staff', 1, ['friend', 'friendship'], [
        ['The people in this small town are really [friendly].', '這個小鎮的人真的很友善。'],
        ['Our housemates are [friendly] and easy to live with.', '我們的室友很友善，好相處。'],
      ]],
      ['rude', 'rud', 'adj.', '無禮的', 'rude to sb', 1, ['rudely', 'rudeness'], [
        ["It's [rude] to cut in line.", '插隊很沒禮貌。'],
        ['The customer was [rude] to the young cashier.', '那位客人對年輕的收銀員很無禮。'],
      ]],
      ['grateful', 'ˋgretfəl', 'adj.', '感激的', 'be grateful for', 1, ['gratitude', 'gratefully'], [
        ["I'm really [grateful] for all your help.", '我真的很感謝你所有的幫忙。'],
        ['We were very [grateful] to our host family.', '我們非常感謝寄宿家庭。'],
      ]],
      ['frustrated', 'ˋfrʌsˏtretɪd', 'adj.', '沮喪的', 'feel frustrated', 2, ['frustrating', 'frustrate'], [
        ["Many backpackers feel [frustrated] when they can't find farm work.", '很多背包客找不到農場工作時會很沮喪。'],
        ['She was [frustrated] with the slow internet at the hostel.', '青年旅館的網路很慢，讓她很煩躁。'],
      ]],
      ['exhausted', 'ɪgˋzɔstɪd', 'adj.', '筋疲力盡的', 'feel exhausted', 2, ['exhausting', 'exhaust', 'exhaustion'], [
        ['After ten hours of fruit picking, I was [exhausted].', '採了十個小時的水果之後，我累壞了。'],
        ['You look [exhausted]; go and get some sleep.', '你看起來累壞了，去睡一下吧。'],
      ]],
      ['relaxed', 'rɪˋlækst', 'adj.', '放鬆的', 'a relaxed atmosphere', 1, ['relaxing', 'relax'], [
        ['Our manager is very [relaxed] about what we wear.', '我們經理對穿著很隨意。'],
        ['You seem much more [relaxed] since you moved to the coast.', '你搬到海邊之後，看起來放鬆多了。'],
      ]],
      ['embarrassed', 'ɪmˋbærəst', 'adj.', '尷尬的', 'feel embarrassed', 1, ['embarrassing', 'embarrass'], [
        ['I felt [embarrassed] about my accent at first.', '一開始我對自己的口音感到很尷尬。'],
        ["Don't be [embarrassed] to ask for help.", '不要不好意思開口求助。'],
      ]],
      ['proud', 'praʊd', 'adj.', '驕傲的', 'be proud of', 1, ['pride', 'proudly'], [
        ['My parents are [proud] of me for travelling alone.', '我爸媽以我獨自出國為榮。'],
        ['She was [proud] to get her first pay slip in Australia.', '拿到在澳洲的第一張薪資單，她很自豪。'],
      ]],
      ['disappointed', 'ˏdɪsəˋpɔɪntɪd', 'adj.', '失望的', 'be disappointed with', 1, ['disappointing', 'disappoint', 'disappointment'], [
        ['I was [disappointed] that the beach was closed.', '海灘關閉了，讓我很失望。'],
        ['We were [disappointed] with the hostel room.', '我們對青年旅館的房間很失望。'],
      ]],
      ['surprised', 'sɚˋpraɪzd', 'adj.', '驚訝的', 'be surprised by', 1, ['surprising', 'surprise', 'surprisingly'], [
        ['I was [surprised] by how big the spiders are here.', '這裡的蜘蛛之大讓我很驚訝。'],
        ["Don't be [surprised] if the shops close at 5 p.m.", '如果商店下午五點就關門，不要太驚訝。'],
      ]],
      ['curious', 'ˋkjʊrɪəs', 'adj.', '好奇的', 'be curious about', 1, ['curiosity', 'curiously'], [
        ["I'm [curious] about Aboriginal culture.", '我對原住民文化很好奇。'],
        ['Kids are naturally [curious] about animals.', '小孩天生就對動物很好奇。'],
      ]],
      ['hardworking', 'ˋhɑrdˏwɝkɪŋ', 'adj.', '勤奮的', 'a hardworking team', 1, [], [
        ['The farmer said Taiwanese workers are very [hardworking].', '農場主人說台灣工人很勤奮。'],
        ['She is a [hardworking] student who studies every night.', '她是個每晚都讀書的勤奮學生。'],
      ]],
      ['easygoing', 'ˋizɪˏgoɪŋ', 'adj.', '隨和的', 'an easygoing person', 2, [], [
        ['My new boss is really [easygoing].', '我的新老闆人很隨和。'],
        ['Australians are often described as [easygoing].', '澳洲人常被形容為很隨和。'],
      ]],
      ['open-minded', 'ˏopənˋmaɪndɪd', 'adj.', '心胸開放的', 'be open-minded about', 2, [], [
        ['Travelling has made me more [open-minded].', '旅行讓我的心胸更開放。'],
        ['Try to be [open-minded] about trying new food.', '對嘗試新食物要抱持開放的心態。'],
      ]],
      ['culture shock', 'ˋkʌltʃɚ ʃɑk', 'n.', '文化衝擊', 'experience culture shock', 2, [], [
        ['I had a bit of [culture shock] when I saw people walking barefoot in shops.', '看到有人赤腳逛商店時，我有點文化衝擊。'],
        ['[Culture shock] usually fades after a few months.', '文化衝擊通常幾個月後就會淡去。'],
      ]],
      ['adapt', 'əˋdæpt', 'v.', '適應', 'adapt to', 2, ['adaptable', 'adaptation', 'adopt'], [
        ['It took me a month to [adapt] to life in Australia.', '我花了一個月才適應澳洲的生活。'],
        ['Kids usually [adapt] to new schools faster than adults.', '小孩通常比大人更快適應新學校。'],
      ]],
      ['independent', 'ˏɪndɪˋpɛndənt', 'adj.', '獨立的', 'become more independent', 1, ['independence', 'independently', 'depend'], [
        ['Living abroad has made me more [independent].', '住在國外讓我變得更獨立。'],
        ['She is an [independent] traveller who plans everything herself.', '她是個獨立的旅行者，什麼都自己規劃。'],
      ]],
      ['mature', 'məˋtʃʊr', 'adj.', '成熟的', "mature for one's age", 2, ['maturity', 'maturely'], [
        ["He's very [mature] for a nineteen-year-old.", '以十九歲來說，他非常成熟。'],
        ['Talking calmly with your boss was a [mature] decision.', '冷靜地和老闆溝通是很成熟的決定。'],
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
