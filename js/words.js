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
