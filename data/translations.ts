export type SiteLang = "it" | "en" | "es" | "de" | "ru" | "ro" | "zh" | "ja";

export function t(obj: Record<SiteLang, string>, lang: SiteLang): string {
  return obj[lang] ?? obj["it"];
}

export const translations = {
  // NAVBAR
  nav: {
    concept: { it: "CONCEPT", en: "CONCEPT", es: "CONCEPTO", de: "KONZEPT", ru: "КОНЦЕПТ", ro: "CONCEPT", zh: "理念", ja: "コンセプト" },
    menu: { it: "MENU", en: "MENU", es: "MENÚ", de: "SPEISEKARTE", ru: "МЕНЮ", ro: "MENIU", zh: "菜单", ja: "メニュー" },
    cucina: { it: "LA CUCINA", en: "THE KITCHEN", es: "LA COCINA", de: "DIE KÜCHE", ru: "КУХНЯ", ro: "BUCĂTĂRIA", zh: "厨房", ja: "料理" },
    cantina: { it: "LA CANTINA", en: "THE CELLAR", es: "LA BODEGA", de: "DER WEINKELLER", ru: "ВИННЫЙ ПОГРЕБ", ro: "PIVNIȚA", zh: "酒窖", ja: "ワインセラー" },
    prenotazioni: { it: "PRENOTAZIONI", en: "RESERVATIONS", es: "RESERVAS", de: "RESERVIERUNGEN", ru: "БРОНИРОВАНИЕ", ro: "REZERVĂRI", zh: "预订", ja: "予約" },
    gallery: { it: "GALLERY", en: "GALLERY", es: "GALERÍA", de: "GALERIE", ru: "ГАЛЕРЕЯ", ro: "GALERIE", zh: "图库", ja: "ギャラリー" },
    contatti: { it: "CONTATTI", en: "CONTACTS", es: "CONTACTO", de: "KONTAKT", ru: "КОНТАКТЫ", ro: "CONTACT", zh: "联系", ja: "お問い合わせ" },
    arena: { it: "ARENA", en: "ARENA", es: "ARENA", de: "ARENA", ru: "АРЕНА", ro: "ARENA", zh: "竞技场", ja: "アレーナ" },
    prenota: { it: "Prenota", en: "Book", es: "Reservar", de: "Reservieren", ru: "Забронировать", ro: "Rezervă", zh: "预订", ja: "予約する" },
  },

  // HERO
  hero: {
    title: { it: "La Vecia Mescola", en: "La Vecia Mescola", es: "La Vecia Mescola", de: "La Vecia Mescola", ru: "La Vecia Mescola", ro: "La Vecia Mescola", zh: "La Vecia Mescola", ja: "La Vecia Mescola" },
    subtitle: { it: "Cucina veneta autentica nel cuore di Verona.", en: "Authentic Venetian cuisine in the heart of Verona.", es: "Cocina véneta auténtica en el corazón de Verona.", de: "Authentische venezianische Küche im Herzen Veronas.", ru: "Аутентичная венетская кухня в сердце Вероны.", ro: "Bucătărie venețiană autentică în inima Veronei.", zh: "维罗纳心脏地带的正宗威尼托美食。", ja: "ヴェローナの中心で楽しむ本格ヴェネト料理。" },
    cta: { it: "Menu", en: "Menu", es: "Menú", de: "Speisekarte", ru: "Меню", ro: "Meniu", zh: "菜单", ja: "メニュー" },
    scroll: { it: "Scorri", en: "Scroll", es: "Desplazar", de: "Scrollen", ru: "Прокрутить", ro: "Derulați", zh: "滚动", ja: "スクロール" },
  },

  // CONCEPT
  concept: {
    number: { it: "01", en: "01", es: "01", de: "01", ru: "01", ro: "01", zh: "01", ja: "01" },
    title: { it: "CONCEPT", en: "CONCEPT", es: "CONCEPTO", de: "KONZEPT", ru: "КОНЦЕПТ", ro: "CONCEPT", zh: "理念", ja: "コンセプト" },
    subtitle: { it: "Origini e Ispirazioni", en: "Origins & Inspirations", es: "Orígenes e Inspiraciones", de: "Ursprünge & Inspirationen", ru: "Истоки и вдохновение", ro: "Origini și Inspirații", zh: "起源与灵感", ja: "起源とインスピレーション" },
    paragraph: { it: "Esplorando l'eredità della cucina veneta. Un viaggio di (ri)scoperta nel cuore di Verona, a pochi passi dall'Arena.", en: "Exploring Venetian culinary heritage. A journey of (re)discovery in the heart of Verona, steps from the Arena.", es: "Explorando el patrimonio de la cocina véneta. Un viaje de (re)descubrimiento en el corazón de Verona, a pasos de la Arena.", de: "Das Erbe der venezianischen Küche erkunden. Eine Reise der (Wieder)Entdeckung im Herzen Veronas, wenige Schritte von der Arena.", ru: "Исследуя наследие венетской кухни. Путешествие (повторного) открытия в сердце Вероны, в нескольких шагах от Арены.", ro: "Explorând moștenirea bucătăriei venețiene. O călătorie de (re)descoperire în inima Veronei, la câțiva pași de Arenă.", zh: "探索威尼托烹饪的传承。在维罗纳中心、竞技场几步之遥，踏上一段（重新）发现之旅。", ja: "ヴェネト料理の遺産を探る旅。アレーナからほど近い、ヴェローナの中心での（再）発見の旅。" },
    gallery: { it: "VIEW GALLERY", en: "VIEW GALLERY", es: "VER GALERÍA", de: "GALERIE ANSEHEN", ru: "СМОТРЕТЬ ГАЛЕРЕЮ", ro: "VEZI GALERIA", zh: "查看图库", ja: "ギャラリーを見る" },
  },

  // MENU SECTION
  menuSection: {
    number: { it: "02", en: "02", es: "02", de: "02", ru: "02", ro: "02", zh: "02", ja: "02" },
    title: { it: "MENU", en: "MENU", es: "MENÚ", de: "SPEISEKARTE", ru: "МЕНЮ", ro: "MENIU", zh: "菜单", ja: "メニュー" },
    cta: { it: "⬧ SCOPRI IL MENU ⬧", en: "⬧ DISCOVER THE MENU ⬧", es: "⬧ DESCUBRE EL MENÚ ⬧", de: "⬧ SPEISEKARTE ENTDECKEN ⬧", ru: "⬧ ОТКРЫТЬ МЕНЮ ⬧", ro: "⬧ DESCOPERĂ MENIUL ⬧", zh: "⬧ 探索菜单 ⬧", ja: "⬧ メニューを見る ⬧" },
  },

  // CUCINA
  cucina: {
    number: { it: "03", en: "03", es: "03", de: "03", ru: "03", ro: "03", zh: "03", ja: "03" },
    title: { it: "LA CUCINA", en: "THE KITCHEN", es: "LA COCINA", de: "DIE KÜCHE", ru: "КУХНЯ", ro: "BUCĂTĂRIA", zh: "厨房", ja: "料理" },
    pasta_title: { it: "Pasta Fresca", en: "Fresh Pasta", es: "Pasta Fresca", de: "Frische Pasta", ru: "Свежая паста", ro: "Paste Proaspete", zh: "新鲜意面", ja: "フレッシュパスタ" },
    pasta_desc: { it: "Fatta in casa ogni giorno con farine selezionate e uova fresche. Bigoli, pappardelle, tagliolini — la tradizione veneta nel piatto.", en: "Made in-house every day with selected flours and fresh eggs. Bigoli, pappardelle, tagliolini — Venetian tradition on the plate.", es: "Elaborada en casa cada día con harinas selectas y huevos frescos. Bigoli, pappardelle, tagliolini — la tradición véneta en el plato.", de: "Täglich hausgemacht mit ausgewählten Mehlen und frischen Eiern. Bigoli, Pappardelle, Tagliolini — die venezianische Tradition auf dem Teller.", ru: "Готовится дома каждый день из отборной муки и свежих яиц. Биголи, паппарделле, тальолини — венетская традиция на тарелке.", ro: "Preparate în casă zilnic cu făinuri selecționate și ouă proaspete. Bigoli, pappardelle, tagliolini — tradiția venețiană în farfurie.", zh: "每日以精选面粉和新鲜鸡蛋手工制作。Bigoli、宽面、细面——威尼托传统的味道。", ja: "厳選した小麦粉と新鮮な卵で毎日手作り。ビーゴリ、パッパルデッレ、タリオリーニ——ヴェネトの伝統を皿の上に。" },
    risotto_title: { it: "Risotto all'Amarone", en: "Amarone Risotto", es: "Risotto al Amarone", de: "Amarone-Risotto", ru: "Ризотто с Амароне", ro: "Risotto cu Amarone", zh: "阿玛罗内烩饭", ja: "アマローネのリゾット" },
    risotto_desc: { it: "Il nostro piatto simbolo: riso Vialone Nano mantecato con Amarone della Valpolicella, radicchio e fonduta veneta.", en: "Our signature dish: Vialone Nano rice creamed with Amarone della Valpolicella, radicchio and Venetian fondue.", es: "Nuestro plato estrella: arroz Vialone Nano cremoso con Amarone della Valpolicella, radicchio y fondue veneta.", de: "Unser Signature-Gericht: Vialone-Nano-Reis cremig gerührt mit Amarone della Valpolicella, Radicchio und venezianischem Fondue.", ru: "Наше фирменное блюдо: рис Виалоне Нано, мантекато с Амароне делла Вальполичелла, радиккьо и венетским фондю.", ro: "Preparatul nostru emblematic: orez Vialone Nano mantecato cu Amarone della Valpolicella, radicchio și fondue venețiană.", zh: "我们的招牌菜：维亚龙纳诺米与阿玛罗内·德拉·瓦尔波利切拉、菊苣和威尼斯奶酪火锅慢炖。", ja: "当店のシグネチャー料理：アマローネ・デッラ・ヴァルポリチェッラ、ラディッキオ、ヴェネト風フォンデュで仕上げたヴィアローネ・ナノ米のリゾット。" },
    freschi_title: { it: "Ingredienti Freschi", en: "Fresh Ingredients", es: "Ingredientes Frescos", de: "Frische Zutaten", ru: "Свежие ингредиенты", ro: "Ingrediente Proaspete", zh: "新鲜食材", ja: "新鮮な食材" },
    freschi_desc: { it: "Materie prime locali e di stagione dal territorio veronese.", en: "Local and seasonal produce from the Veronese territory.", es: "Materias primas locales y de temporada del territorio veronés.", de: "Lokale und saisonale Zutaten aus dem Veronesen Gebiet.", ru: "Местные и сезонные продукты с веронской территории.", ro: "Materii prime locale și de sezon din teritoriul veronez.", zh: "来自维罗纳地区的本地应季食材。", ja: "ヴェローナの地から届く、地元産・旬の食材。" },
  },

  // CANTINA
  cantina: {
    number: { it: "04", en: "04", es: "04", de: "04", ru: "04", ro: "04", zh: "04", ja: "04" },
    title: { it: "LA CANTINA", en: "THE CELLAR", es: "LA BODEGA", de: "DER WEINKELLER", ru: "ВИННЫЙ ПОГРЕБ", ro: "PIVNIȚA", zh: "酒窖", ja: "ワインセラー" },
    intro: { it: "Una selezione di vini della Valpolicella e del territorio veronese, scelti per accompagnare ogni piatto.", en: "A selection of wines from Valpolicella and the Veronese territory, chosen to accompany every dish.", es: "Una selección de vinos de Valpolicella y del territorio veronés, elegidos para acompañar cada plato.", de: "Eine Auswahl an Weinen aus der Valpolicella und dem Veronesen Gebiet, ausgewählt, um jeden Gang zu begleiten.", ru: "Подборка вин из Вальполичеллы и веронской территории, подобранных к каждому блюду.", ro: "O selecție de vinuri din Valpolicella și teritoriul veronez, alese pentru a însoți fiecare preparat.", zh: "精选瓦尔波利切拉及维罗纳地区葡萄酒，与每道佳肴完美搭配。", ja: "ヴァルポリチェッラとヴェローナ地方のワインのセレクション。すべての料理に寄り添うよう厳選。" },
    amarone_title: { it: "Amarone della Valpolicella", en: "Amarone della Valpolicella", es: "Amarone della Valpolicella", de: "Amarone della Valpolicella", ru: "Амароне делла Вальполичелла", ro: "Amarone della Valpolicella", zh: "阿玛罗内·德拉·瓦尔波利切拉", ja: "アマローネ・デッラ・ヴァルポリチェッラ" },
    amarone_desc: { it: "Il re dei vini veronesi. Rosso intenso, corposo e avvolgente.", en: "The king of Veronese wines. Deep red, full-bodied and enveloping.", es: "El rey de los vinos veroneses. Rojo intenso, con cuerpo y envolvente.", de: "Der König der Veroneser Weine. Tiefrot, vollmundig und umhüllend.", ru: "Король веронских вин. Насыщенный, полнотелый и обволакивающий красный.", ro: "Regele vinurilor veroneze. Roșu intens, plin și învelitor.", zh: "维罗纳葡萄酒之王。色泽浓郁、酒体饱满、口感醇厚。", ja: "ヴェローナワインの王様。深みのある色調、フルボディ、包み込むような味わい。" },
    soave_title: { it: "Soave Classico", en: "Soave Classico", es: "Soave Classico", de: "Soave Classico", ru: "Соаве Классико", ro: "Soave Classico", zh: "经典索阿韦", ja: "ソアーヴェ・クラシコ" },
    soave_desc: { it: "Bianco elegante dai Colli Scaligeri. Fresco e minerale.", en: "Elegant white from the Colli Scaligeri. Fresh and mineral.", es: "Blanco elegante de los Colli Scaligeri. Fresco y mineral.", de: "Eleganter Weißwein von den Colli Scaligeri. Frisch und mineralisch.", ru: "Элегантное белое вино с холмов Скалигери. Свежее и минеральное.", ro: "Alb elegant din Colli Scaligeri. Proaspăt și mineral.", zh: "斯卡利杰里丘陵的优雅白葡萄酒。清新矿物质感。", ja: "コッリ・スカリジェリの優雅な白ワイン。フレッシュでミネラル感豊か。" },
    ripasso_title: { it: "Valpolicella Ripasso", en: "Valpolicella Ripasso", es: "Valpolicella Ripasso", de: "Valpolicella Ripasso", ru: "Вальполичелла Рипассо", ro: "Valpolicella Ripasso", zh: "瓦尔波利切拉里帕索", ja: "ヴァルポリチェッラ・リパッソ" },
    ripasso_desc: { it: "Strutturato e morbido, eccellente con secondi di carne.", en: "Structured and smooth, excellent with meat main courses.", es: "Estructurado y suave, excelente con segundos de carne.", de: "Strukturiert und weich, ausgezeichnet zu Fleischgerichten.", ru: "Структурированное и мягкое, отлично подходит к мясным блюдам.", ro: "Structurat și moale, excelent cu preparate din carne.", zh: "结构感强而柔顺，与肉类主菜完美搭配。", ja: "構造的でなめらか。肉料理のメインコースに最適。" },
  },

  // LA MESCOLA
  mescola: {
    title1: { it: "PASSATO E PRESENTE", en: "PAST AND PRESENT", es: "PASADO Y PRESENTE", de: "VERGANGENHEIT UND GEGENWART", ru: "ПРОШЛОЕ И НАСТОЯЩЕЕ", ro: "TRECUT ȘI PREZENT", zh: "过去与现在", ja: "過去と現在" },
    title2: { it: "SAPORI & TERRITORIO", en: "FLAVOURS & TERROIR", es: "SABORES & TERRITORIO", de: "AROMEN & TERROIR", ru: "ВКУСЫ И ТЕРРИТОРИЯ", ro: "AROME & TERITORIU", zh: "风味与产地", ja: "味わいとテロワール" },
    p1: { it: "La Vecia Mescola è radicata nel cuore di Verona, nel centro storico a pochi passi dall'Arena. Un viaggio nella tradizione veneta: pasta fresca fatta in casa, risotto all'Amarone, ingredienti del territorio.", en: "La Vecia Mescola is rooted in the heart of Verona, in the historic centre steps from the Arena. A journey into Venetian tradition: fresh homemade pasta, Amarone risotto, local ingredients.", es: "La Vecia Mescola está arraigada en el corazón de Verona, en el centro histórico a pasos de la Arena. Un viaje a la tradición véneta: pasta fresca casera, risotto al Amarone, ingredientes locales.", de: "La Vecia Mescola ist verwurzelt im Herzen Veronas, in der Altstadt, wenige Schritte von der Arena. Eine Reise in die venezianische Tradition: frische hausgemachte Pasta, Amarone-Risotto, regionale Zutaten.", ru: "La Vecia Mescola укоренилась в сердце Вероны, в историческом центре в нескольких шагах от Арены. Путешествие в венетскую традицию: свежая домашняя паста, ризотто с Амароне, местные ингредиенты.", ro: "La Vecia Mescola este înrădăcinată în inima Veronei, în centrul istoric la câțiva pași de Arenă. O călătorie în tradiția venețiană: paste proaspete de casă, risotto cu Amarone, ingrediente locale.", zh: "La Vecia Mescola 扎根于维罗纳中心、竞技场咫尺之遥的历史街区。一段威尼托传统之旅：手工新鲜意面、阿玛罗内烩饭、本地食材。", ja: "La Vecia Mescolaは、アレーナからほど近いヴェローナの歴史的中心地に根ざしています。ヴェネト伝統への旅：手打ち生パスタ、アマローネのリゾット、地元の食材。" },
    p2: { it: "Cucina senza confini imposti, che esplora il patrimonio di sapori e spezie della regione, combinando tecniche tradizionali e contemporanee. Un invito a celebrare il convivio — come si faceva nella Verona di un tempo.", en: "Cuisine without imposed boundaries, exploring the region's heritage of flavours and spices, combining traditional and contemporary techniques. An invitation to celebrate the convivial table — as it was done in old Verona.", es: "Cocina sin fronteras impuestas, que explora el patrimonio de sabores y especias de la región, combinando técnicas tradicionales y contemporáneas. Una invitación a celebrar el convite — como se hacía en la Verona de antaño.", de: "Küche ohne aufgezwungene Grenzen, die das Erbe der Aromen und Gewürze der Region erkundet und traditionelle mit zeitgenössischen Techniken verbindet. Eine Einladung, das Zusammensein zu feiern — wie es im Verona von einst gemacht wurde.", ru: "Кухня без навязанных границ, исследующая наследие вкусов и специй региона, сочетая традиционные и современные техники. Приглашение отпраздновать совместное застолье — как это делалось в старой Вероне.", ro: "Bucătărie fără granițe impuse, care explorează patrimoniul de arome și condimente al regiunii, combinând tehnici tradiționale și contemporane. O invitație de a celebra convivialitatea — așa cum se făcea în Verona de altădată.", zh: "不设边界的烹饪，探索大区香料与风味的遗产，融合传统与当代技艺。一份共享盛宴的邀请——如同旧时维罗纳。", ja: "押し付けられた境界のない料理。地域の味とスパイスの遺産を探り、伝統と現代の技を融合。かつてのヴェローナのように、食卓の喜びを祝う招待。" },
  },

  // RESERVATIONS
  reservations: {
    number: { it: "05", en: "05", es: "05", de: "05", ru: "05", ro: "05", zh: "05", ja: "05" },
    title: { it: "PRENOTAZIONI", en: "RESERVATIONS", es: "RESERVAS", de: "RESERVIERUNGEN", ru: "БРОНИРОВАНИЕ", ro: "REZERVĂRI", zh: "预订", ja: "予約" },
    cta: { it: "CONTATTACI PER PRENOTARE", en: "CONTACT US TO BOOK", es: "CONTÁCTANOS PARA RESERVAR", de: "KONTAKTIEREN SIE UNS", ru: "СВЯЖИТЕСЬ С НАМИ", ro: "CONTACTAȚI-NE PENTRU REZERVARE", zh: "联系我们预订", ja: "予約はこちら" },
  },

  // ATMOSFERA
  atmosfera: {
    where: { it: "Dove Siamo", en: "Where We Are", es: "Dónde Estamos", de: "Wo Wir Sind", ru: "Где Мы", ro: "Unde Suntem", zh: "我们在哪里", ja: "所在地" },
    title: { it: "L'Atmosfera", en: "The Atmosphere", es: "La Atmósfera", de: "Die Atmosphäre", ru: "Атмосфера", ro: "Atmosfera", zh: "氛围", ja: "雰囲気" },
    card1_title: { it: "Locale Intimo", en: "Intimate Venue", es: "Local Íntimo", de: "Intimes Lokal", ru: "Уютное место", ro: "Local Intim", zh: "温馨空间", ja: "親密な空間" },
    card1_desc: { it: "Un ambiente caldo e accogliente dove sentirsi a casa. Mattoni a vista, luci soffuse e un servizio attento che fa la differenza.", en: "A warm and welcoming atmosphere where you feel at home. Exposed brickwork, soft lighting and attentive service that makes the difference.", es: "Un ambiente cálido y acogedor donde sentirse como en casa. Ladrillo visto, luces suaves y un servicio atento que marca la diferencia.", de: "Ein warmes und einladendes Ambiente, wo man sich wie zu Hause fühlt. Sichtbackstein, gedämpftes Licht und aufmerksamer Service, der den Unterschied macht.", ru: "Тёплая и уютная атмосфера, где чувствуешь себя как дома. Открытая кирпичная кладка, мягкое освещение и внимательный сервис, который меняет всё.", ro: "Un ambient cald și primitor unde te simți ca acasă. Cărămidă aparentă, lumini calde și un serviciu atent care face diferența.", zh: "温馨宜人的氛围，宾至如归。裸露的砖墙、柔和的灯光和体贴的服务令您印象深刻。", ja: "温かく居心地のよい雰囲気。レンガの壁、やわらかな照明、そして行き届いたサービスが特別なひとときを。" },
    card2_title: { it: "Centro Storico", en: "Historic Centre", es: "Centro Histórico", de: "Altstadt", ru: "Исторический центр", ro: "Centrul Istoric", zh: "历史中心", ja: "歴史的中心地" },
    card2_desc: { it: "In Vicolo Chiodo 4, nel cuore pulsante di Verona. A pochi passi da Piazza Bra, Piazza delle Erbe e i monumenti più amati della città.", en: "At Vicolo Chiodo 4, in the beating heart of Verona. Steps from Piazza Bra, Piazza delle Erbe and the city's most beloved monuments.", es: "En Vicolo Chiodo 4, en el corazón palpitante de Verona. A pasos de Piazza Bra, Piazza delle Erbe y los monumentos más queridos de la ciudad.", de: "In der Vicolo Chiodo 4, im pulsierenden Herzen Veronas. Wenige Schritte von der Piazza Bra, der Piazza delle Erbe und den beliebtesten Sehenswürdigkeiten der Stadt.", ru: "Vicolo Chiodo 4, в самом сердце Вероны. В нескольких шагах от Пьяцца Бра, Пьяцца делле Эрбе и самых любимых памятников города.", ro: "În Vicolo Chiodo 4, în inima pulsatilă a Veronei. La câțiva pași de Piazza Bra, Piazza delle Erbe și monumentele cele mai iubite ale orașului.", zh: "Vicolo Chiodo 4号，维罗纳跳动的心脏。距布拉广场、草药广场和城市最受喜爱的纪念碑仅几步之遥。", ja: "Vicolo Chiodo 4番地、ヴェローナの鼓動する心臓部。ブラ広場、エルベ広場、そして街を代表する名所まで数歩。" },
    card3_title: { it: "Vicino all'Arena", en: "Near the Arena", es: "Cerca de la Arena", de: "In der Nähe der Arena", ru: "Рядом с Ареной", ro: "Lângă Arenă", zh: "紧邻竞技场", ja: "アレーナ近く" },
    card3_desc: { it: "A soli 200 metri dall'Arena di Verona. La scelta ideale per una cena prima dello spettacolo o dopo una passeggiata serale.", en: "Just 200 metres from the Arena di Verona. The ideal choice for dinner before the show or after an evening stroll.", es: "A solo 200 metros de la Arena de Verona. La elección ideal para una cena antes del espectáculo o después de un paseo nocturno.", de: "Nur 200 Meter von der Arena di Verona entfernt. Die ideale Wahl für ein Abendessen vor der Vorstellung oder nach einem Abendspaziergang.", ru: "Всего в 200 метрах от Арены ди Верона. Идеальный выбор для ужина перед спектаклем или после вечерней прогулки.", ro: "La doar 200 de metri de Arena din Verona. Alegerea ideală pentru o cină înainte de spectacol sau după o plimbare de seară.", zh: "距维罗纳竞技场仅200米。演出前晚餐或夜间漫步后的理想之选。", ja: "アレーナ・ディ・ヴェローナからわずか200メートル。公演前のディナーや夜の散歩の後に最適な選択。" },
  },

  // TESTIMONIALS
  testimonials: {
    label: { it: "Recensioni", en: "Reviews", es: "Reseñas", de: "Bewertungen", ru: "Отзывы", ro: "Recenzii", zh: "评价", ja: "レビュー" },
    title: { it: "I Nostri Ospiti", en: "Our Guests", es: "Nuestros Huéspedes", de: "Unsere Gäste", ru: "Наши гости", ro: "Oaspeții Noștri", zh: "我们的宾客", ja: "お客様の声" },
    t1: { it: "Cura dei dettagli estetici e soprattutto della qualità. Assolutamente consigliato, specialmente per il famoso risotto all'Amarone.", en: "Attention to aesthetic details and above all quality. Absolutely recommended, especially for the famous Amarone risotto.", es: "Cuidado de los detalles estéticos y sobre todo de la calidad. Absolutamente recomendado, especialmente por el famoso risotto al Amarone.", de: "Liebe zum ästhetischen Detail und vor allem zur Qualität. Absolut empfehlenswert, besonders für das berühmte Amarone-Risotto.", ru: "Внимание к эстетическим деталям и прежде всего к качеству. Абсолютно рекомендую, особенно знаменитое ризотто с Амароне.", ro: "Atenție la detaliile estetice și mai ales la calitate. Absolut recomandat, mai ales pentru celebrul risotto cu Amarone.", zh: "注重美学细节，更注重品质。强烈推荐，尤其是著名的阿玛罗内烩饭。", ja: "美的細部への配慮、そして何より品質へのこだわり。特に有名なアマローネのリゾットは絶対のおすすめ。" },
    t2: { it: "Il locale è a pochi passi da Piazza Bra, ci hanno fatto sentire in famiglia e gustare delle ottime pietanze.", en: "The restaurant is steps from Piazza Bra, they made us feel like family and we enjoyed excellent dishes.", es: "El local está a pocos pasos de Piazza Bra, nos hicieron sentir en familia y disfrutamos de excelentes platos.", de: "Das Lokal liegt wenige Schritte von der Piazza Bra, man hat uns wie Familie behandelt und wir haben ausgezeichnete Gerichte genossen.", ru: "Ресторан в нескольких шагах от Пьяцца Бра, нас приняли как семью и мы насладились отличными блюдами.", ro: "Localul este la câțiva pași de Piazza Bra, ne-au făcut să ne simțim ca în familie și am savurat preparate excelente.", zh: "餐厅距布拉广场仅数步之遥，他们让我们如家人般感到温暖，并品尝了精美佳肴。", ja: "ブラ広場から数歩のこのレストランは、まるで家族のように迎えてくれ、素晴らしい料理を楽しみました。" },
    t3: { it: "Ottima scelta per una cena romantica nella città dell'amore.", en: "An excellent choice for a romantic dinner in the city of love.", es: "Una excelente elección para una cena romántica en la ciudad del amor.", de: "Eine ausgezeichnete Wahl für ein romantisches Abendessen in der Stadt der Liebe.", ru: "Отличный выбор для романтического ужина в городе любви.", ro: "O alegere excelentă pentru o cină romantică în orașul iubirii.", zh: "在爱情之城享用浪漫晚餐的绝佳选择。", ja: "愛の街でのロマンティックなディナーに最高の選択。" },
  },

  // GALLERY
  gallery: {
    number: { it: "06", en: "06", es: "06", de: "06", ru: "06", ro: "06", zh: "06", ja: "06" },
    title: { it: "GALLERY", en: "GALLERY", es: "GALERÍA", de: "GALERIE", ru: "ГАЛЕРЕЯ", ro: "GALERIE", zh: "图库", ja: "ギャラリー" },
  },

  // ARENA
  arena: {
    kicker: { it: "Stagione, concerti e spettacoli", en: "Season, concerts and shows", es: "Temporada, conciertos y espectáculos", de: "Saison, Konzerte und Aufführungen", ru: "Сезон, концерты и спектакли", ro: "Sezon, concerte și spectacole", zh: "演出季、音乐会与演出", ja: "シーズン、コンサート、ショー" },
    title: { it: "EVENTI A VERONA", en: "EVENTS IN VERONA", es: "EVENTOS EN VERONA", de: "EVENTS IN VERONA", ru: "СОБЫТИЯ В ВЕРОНЕ", ro: "EVENIMENTE ÎN VERONA", zh: "维罗纳活动", ja: "ヴェローナのイベント" },
    subtitle: { it: "Scopri cosa vedere a Verona e acquista i biglietti.", en: "Discover what to see in Verona and buy tickets.", es: "Descubre qué ver en Verona y compra entradas.", de: "Entdecken Sie, was in Verona zu sehen ist, und kaufen Sie Tickets.", ru: "Узнайте, что посмотреть в Вероне, и купите билеты.", ro: "Descoperă ce să vezi în Verona și cumpără bilete.", zh: "探索维罗纳的精彩活动并购票。", ja: "ヴェローナで見るべきものを発見してチケットを購入。" },
    cta: { it: "Prenota il Tavolo", en: "Book a Table", es: "Reservar Mesa", de: "Tisch Reservieren", ru: "Забронировать столик", ro: "Rezervă Masa", zh: "预订餐桌", ja: "テーブルを予約" },
  },

  // CONTATTI
  contatti: {
    title: { it: "Contatti", en: "Contacts", es: "Contacto", de: "Kontakt", ru: "Контакты", ro: "Contact", zh: "联系我们", ja: "お問い合わせ" },
    dove: { it: "Dove Siamo", en: "Where We Are", es: "Dónde Estamos", de: "Wo Wir Sind", ru: "Где Мы", ro: "Unde Suntem", zh: "我们的位置", ja: "所在地" },
    telefono: { it: "Telefono", en: "Phone", es: "Teléfono", de: "Telefon", ru: "Телефон", ro: "Telefon", zh: "电话", ja: "電話" },
    prenotazioni: { it: "Prenotazioni", en: "Reservations", es: "Reservas", de: "Reservierungen", ru: "Бронирование", ro: "Rezervări", zh: "预订", ja: "予約" },
    prenotazioni_desc: { it: "Per prenotazioni chiamare o scrivere su WhatsApp", en: "For reservations call or message on WhatsApp", es: "Para reservas llame o escriba por WhatsApp", de: "Für Reservierungen anrufen oder WhatsApp schreiben", ru: "Для бронирования звоните или пишите в WhatsApp", ro: "Pentru rezervări sunați sau scrieți pe WhatsApp", zh: "预订请致电或通过WhatsApp留言", ja: "ご予約はお電話またはWhatsAppで" },
    orari: { it: "Orari di Apertura", en: "Opening Hours", es: "Horario de Apertura", de: "Öffnungszeiten", ru: "Часы работы", ro: "Program de Funcționare", zh: "营业时间", ja: "営業時間" },
    giorno: { it: "Giorno", en: "Day", es: "Día", de: "Tag", ru: "День", ro: "Zi", zh: "日期", ja: "曜日" },
    pranzo: { it: "Pranzo", en: "Lunch", es: "Almuerzo", de: "Mittagessen", ru: "Обед", ro: "Prânz", zh: "午餐", ja: "ランチ" },
    cena: { it: "Cena", en: "Dinner", es: "Cena", de: "Abendessen", ru: "Ужин", ro: "Cină", zh: "晚餐", ja: "ディナー" },
    lunedi: { it: "Lunedì", en: "Monday", es: "Lunes", de: "Montag", ru: "Понедельник", ro: "Luni", zh: "周一", ja: "月曜日" },
    martedi: { it: "Martedì", en: "Tuesday", es: "Martes", de: "Dienstag", ru: "Вторник", ro: "Marți", zh: "周二", ja: "火曜日" },
    mercoledi: { it: "Mercoledì", en: "Wednesday", es: "Miércoles", de: "Mittwoch", ru: "Среда", ro: "Miercuri", zh: "周三", ja: "水曜日" },
    giovedi: { it: "Giovedì", en: "Thursday", es: "Jueves", de: "Donnerstag", ru: "Четверг", ro: "Joi", zh: "周四", ja: "木曜日" },
    venerdi: { it: "Venerdì", en: "Friday", es: "Viernes", de: "Freitag", ru: "Пятница", ro: "Vineri", zh: "周五", ja: "金曜日" },
    sabato: { it: "Sabato", en: "Saturday", es: "Sábado", de: "Samstag", ru: "Суббота", ro: "Sâmbătă", zh: "周六", ja: "土曜日" },
    domenica: { it: "Domenica", en: "Sunday", es: "Domingo", de: "Sonntag", ru: "Воскресенье", ro: "Duminică", zh: "周日", ja: "日曜日" },
    seguici: { it: "Seguici", en: "Follow Us", es: "Síguenos", de: "Folgen Sie uns", ru: "Подписывайтесь", ro: "Urmărește-ne", zh: "关注我们", ja: "フォローする" },
  },

  // FOOTER
  footer: {
    tagline: { it: "Cucina veneta autentica nel cuore di Verona, a due passi dall'Arena.", en: "Authentic Venetian cuisine in the heart of Verona, steps from the Arena.", es: "Cocina véneta auténtica en el corazón de Verona, a pasos de la Arena.", de: "Authentische venezianische Küche im Herzen Veronas, wenige Schritte von der Arena.", ru: "Аутентичная венетская кухня в сердце Вероны, в нескольких шагах от Арены.", ro: "Bucătărie venețiană autentică în inima Veronei, la câțiva pași de Arenă.", zh: "维罗纳心脏地带的正宗威尼托美食，距竞技场咫尺之遥。", ja: "アレーナからほど近い、ヴェローナの中心で楽しむ本格ヴェネト料理。" },
    contatti: { it: "Contatti", en: "Contacts", es: "Contacto", de: "Kontakt", ru: "Контакты", ro: "Contact", zh: "联系方式", ja: "お問い合わせ" },
    orari: { it: "Orari", en: "Hours", es: "Horarios", de: "Öffnungszeiten", ru: "Часы работы", ro: "Program", zh: "营业时间", ja: "営業時間" },
    naviga: { it: "Naviga", en: "Navigate", es: "Navegar", de: "Navigation", ru: "Навигация", ro: "Navigare", zh: "导航", ja: "ナビゲーション" },
    seguici: { it: "Seguici su Instagram", en: "Follow us on Instagram", es: "Síguenos en Instagram", de: "Folgen Sie uns auf Instagram", ru: "Подписывайтесь в Instagram", ro: "Urmărește-ne pe Instagram", zh: "在Instagram上关注我们", ja: "Instagramでフォロー" },
    lun: { it: "Lun", en: "Mon", es: "Lun", de: "Mo", ru: "Пн", ro: "Lun", zh: "周一", ja: "月" },
    mar_gio: { it: "Mar–Gio", en: "Tue–Thu", es: "Mar–Jue", de: "Di–Do", ru: "Вт–Чт", ro: "Mar–Joi", zh: "周二至周四", ja: "火〜木" },
    ven_sab: { it: "Ven–Sab", en: "Fri–Sat", es: "Vie–Sáb", de: "Fr–Sa", ru: "Пт–Сб", ro: "Vin–Sâm", zh: "周五至周六", ja: "金〜土" },
    dom: { it: "Dom", en: "Sun", es: "Dom", de: "So", ru: "Вс", ro: "Dum", zh: "周日", ja: "日" },
  },
} as const;
