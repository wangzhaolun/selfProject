SET NAMES 'utf8';
DROP DATABASE IF EXISTS big_snacks;
CREATE DATABASE big_snacks CHARSET=UTF8;
USE big_snacks;

/*产品表*/
CREATE TABLE big_dish(
    did INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(64),
    price FLOAT(6,2),
    img_sm VARCHAR(64),
    img_lg VARCHAR(64),
    detail VARCHAR(2048),
    material VARCHAR(2048)
);
INSERT INTO big_dish(did,img_sm,img_lg,name,price,material,detail) VALUES
(   null,
    '1.jpg',
    '1-l.jpg',
    '【南京酱板鸭】',
    75,
    '南农 酱鸭南京特产绝味酱板鸭卤味熟食鸭肉类整只装休闲零食',
    '酱板鸭成品色泽深红，皮肉酥香，酱香浓郁，滋味悠长，具有活血、顺气、健脾、养胃、美容之功效，是风靡大江南北的一种传统风味名吃，是佐酒佳肴、送礼佳品。'
),
(   null,
    '2.jpg',
    '2-l.jpg',
    '【小鸭腿】',
    3.5,
    '金特红 卤制品香辣鸭腿小腿王40g 真空小包装休闲肉类零食',
    '鸭肉是一种美味佳肴，适于滋补，是各种美味名菜的主要原料。人们常言“鸡鸭鱼肉”四大荤，鸭肉蛋白质含量比畜肉含量高得多，脂肪含量适中且分布较均匀。'
),
(   null,
    '3.jpg',
    '3-l.jpg',
    '【牛肉片】',
    25,
    '日日佳 牛肉片 香辣味手撕牛肉干休闲肉类零食福建小吃',
    '牛肉含有丰富的蛋白质，氨基酸。其组成比猪肉更接近人体需要。能提高机体抗病能力，对生长发育及手术后、病后调养 的人在补充失血和修复组织等方面特别适宜。'
),
(   null,
    '4.jpg',
    '4-l.jpg',
    '【牛肉干】',
    23,
    '淘豆五香 香辣味风干牛肉干100g 牛肉类零食特产休闲食品小吃',
    '牛肉干中的风干牛肉源于蒙古铁骑的战粮，携带方便，并且有丰富的营养。被誉为“成吉思汗的行军粮”。'
),
(   null,
    '5.jpg',
    '5-l.jpg',
    '【毛毛鱼】',
    1.5,
    '湖南特产 舜湘金仙毛毛鱼 香辣味鱼仔',
    '一种生活在淡水里的小鱼，湖南人往往将其做成一种很辣的小食品。深受湖南辣妹子的喜爱。'
),
(   null,
    '6.jpg',
    '6-l.jpg',
    '【鸭架】',
    10.5,
    '绝味 鸭架 真空包装蜜汁锁骨',
    '绝味鸭架属于绝味产品中其中一种，为长沙绝味轩旗下著名品牌产品。绝味鸭架入口时不麻不辣，一旦停口时则余味香辣无比。即可食用活肉，也可食骨节间香髓，也可以将骨头嚼碎，细品慢尝，体验“唇齿留香”，百吃不厌。'
),
(   null,
    '7.jpg',
    '7-l.jpg',
    '【麻辣鸡腿】',
    7,
    '金厨娘 麻辣鸡腿110G',
    '一种取自鸡的大腿的肉（带骨头的）,当然他还有引申义：特指一些身体强健，能奔能跑(也称"跑不死")的人，一般都加儿化音，叫"鸡腿儿"。另外，还有小鸡腿，又叫琵琶腿，是位于鸡翅下面的那一部分肉。'
),
(   null,
    '8.jpg',
    '8-l.jpg',
    '【夹心饼干】',
    25,
    '印尼 芝士奶酪三明治夹心饼干袋装240g 进口热销食品',
    '饼干具有耐贮藏、易携带、口味多样等特点，深受人们喜爱。饼干品种正向休闲化和功能化食品方向发展。饼干的主要营养成分是碳水化合物，还有蛋白质、脂肪、钙、钾、铁等，整体营养不够均衡。'
),
(   null,
    '9.jpg',
    '9-l.jpg',
    '【开心果】',
    42.5,
    '越南原装进口 休闲零食坚果百香林小马哥开心果碧根果手剥500g',
    '开心果，又名必思答，绿仁果等。阿月浑子（Pistachio），是一种干果，俗称开心果，又名“无名子”，类似白果，开裂有缝而与白果不同。开心果富含维生素、矿物质和抗氧化元素，具有低脂肪、低卡路里、高纤维的显著特点，是健康的明智选择。'
),
(   null,
    '10.jpg',
    '10-l.jpg',
    '【麻薯】',
    13.5,
    '台湾进口 零食品雪之恋手造绿茶口味麻薯180g',
    '日本人把糯米粉或其他淀粉类制成的有弹性和粘性的食品叫做“饼”，日语发音（もち/mochi），台湾音译之为“麻糬”。在大陆又叫做草饼，浙江地区也有直接叫麻薯的说法'
),
(   null,
    '11.jpg',
    '11-l.jpg',
    '【巧克力棒】',
    10,
    '韩国进口 36g三进X5巧克力棒花生三层夹心棒原味',
    '吃着巧克力棒，你是否知道“巧克力棒节”呢？每年的11月11日在不同的国家被赋予不同的意义。这一天在中国大陆是“光棍节”，而在中国的近邻－－韩国，却是“情人节”——韩国人把每年的11月11日叫做“巧克力棒节”（PEPERO DAY），情侣之间互赠细长饼干。'
),
(   null,
    '12.jpg',
    '12-l.jpg',
    '【可乐整箱】',
    55,
    '整箱 可乐碳酸汽水饮料600ml*12瓶',
    '可乐(Cola)是黑褐色、甜味、含咖啡因的碳酸饮料，有咖啡因但不含酒精，非常流行。可乐主要口味包括有香草、肉桂、柠檬香味等。名称来自可乐早期的材料之一：可乐果提取物，最知名的可乐品牌有可口可乐和百事可乐。'
),
(   null,
    '13.jpg',
    '13-l.jpg',
    '【牛奶啤酒】',
    6,
    '新疆特产 乳酸菌小金牛奶啤牛奶啤酒240ml',
    '此酒甚烈，是牛奶与啤酒的混合体，建议男士尽量少喝，女士随意，如您是铮铮铁骨，可以一试！'
),
(   null,
    '14.jpg',
    '14-l.jpg',
    '【百威啤酒】',
    4,
    '百威啤酒 KTV酒吧专用夜场啤酒小瓶装330ml 聚会酒水',
    '百威啤酒诞生于1876年，由阿道弗斯·布希创办。它采用质量最佳的纯天然 材料，以严谨的工艺控制，通过自然发酵，低温储藏而酿成。整个生产流程中不使用任何人造成份、添加剂或防腐剂。在发酵过程中，又使用数百年传统的山毛榉木发酵工艺，使啤酒格外清爽。'
),
(   null,
    '15.jpg',
    '15-l.jpg',
    '【苏打水】',
    4.5,
    '菲普 无糖原味天然苏打水390ml',
    '苏打水是碳酸氢钠的水溶液，可以天然形成或者用弱碱泡腾片、苏打泡腾片以及机器人工生成。天然苏打水除含有碳酸氢钠外，还含有多种微量元素成分，因此是上好的饮品。世界上只有法、俄、德等少数国家出产天然苏打水，我国部分地区（四川乐山、黑龙江）亦有出产天然苏打水。'
),
(   null,
    '16.jpg',
    '16-l.jpg',
    '【香蕉牛奶】',
    6,
    '台湾进口牛奶 大自然牛乳制品牛奶饮品风味饮料香蕉牛奶300ml',
    '香蕉含β胡萝卜素，维生素A与C，钙质，铁质。对于长时间处于快节奏，高压力久坐电脑前的白领，很多大学生由于不规律的饮食，不健康的坐姿和长时间缺乏运动，从而被胃肠疾病、皮肤疾病、便秘、痔疮等问题困扰。香蕉加牛奶的新鲜搭配有助于消化， 防止便秘，治喉病，贫血等功效。'
),
(   null,
    '17.jpg',
    '17-l.jpg',
    '【仙草蜜】',
    5,
    '台湾原装进口饮料 巧口仙草蜜夏季清凉350ml',
    '仙草蜜是一种清凉消暑的饮品，南方地区特产，尤其是福建，台湾。仙草蜜有消暑祛热、清火解渴之效，经熬制成冻，佐以蜂蜜，温润清凉，是消暑之佳品。'
);
/*用户表*/
CREATE TABLE big_users(
    userid INT PRIMARY KEY AUTO_INCREMENT, /*用户编号*/
    uname VARCHAR(20),                     /*用户名*/
    pwd VARCHAR(20),                       /*密码*/
    phone VARCHAR(20)                      /*电话*/
);
INSERT INTO big_users VALUES
(NULL,'mary','11111','13111112345'),
(NULL,'jerry','22222','13819196547'),
(NULL,'john','33333','13819196547');

/*订单表*/
CREATE TABLE big_order(
    oid INT PRIMARY KEY AUTO_INCREMENT,     /*订单ID*/
    userid INT,                             /*用户*/
    phone VARCHAR(16),                      /*联系电话*/
    user_name VARCHAR(16),                  /*收货方用户名*/
    order_time LONG,                        /*下单时间*/
    addr VARCHAR(256),                      /*订单地址*/
    totalprice FLOAT(6,2)                   /*订单总价*/
);
INSERT INTO big_order VALUES
(NULL,1,'15828287989','小明',1500315284672,'涡岭商业街东八巷八号',20.5),
(NULL,1,'13568681683','小王',1500325284672,'涡岭商业街东八巷九号',12.5);


/**购物车表**/
CREATE TABLE big_cart(
    ctid INT PRIMARY KEY AUTO_INCREMENT, /*购物车编号*/
    userid INT,                          /*用户编号*/
    did INT,                             /*产品编号*/
    dishCount INT                      /*数量*/
);
INSERT INTO big_cart VALUES (1,1,1,1),
(2,1,2,4),
(3,1,5,2),
(4,3,2,10),
(5,3,6,1);

/**订单详情表**/
CREATE TABLE big_orderdetails(
    oid INT ,                            /*订单编号*/
    did INT,                             /*产品id*/
    dishCount INT,                     /*购买数量*/
    price FLOAT(8,2)                     /*产品单价：需要记载，因为产品价格可能波动*/
);
INSERT INTO big_orderdetails VALUES (1,1,2,75),
(1,2,1,3.5),
(2,3,1,25),
(3,1,3,23),
(3,2,4,1.5),
(4,4,7,10.5),
(5,5,5,7),
(5,6,2,25);