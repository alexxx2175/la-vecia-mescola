import type { Locale } from "@/data/locales";

export type StoryText = { kicker: string; title: string; paragraphs: string[] };

/**
 * "La nostra storia": fatti verificabili (vicolo, Arena, pasta quotidiana,
 * cantina Valpolicella, parete delle celebrità, società dal 2012).
 */
export const STORY: Record<Locale, StoryText> = {
  it: {
    kicker: "La nostra storia",
    title: "Un'osteria di vicolo, a due passi dall'Arena",
    paragraphs: [
      "In dialetto veronese la mèscola è il mestolo di legno con cui l'oste girava il risotto. Da qui il nome: La Vecia Mescola Dell'Oste, una trattoria nascosta in Vicolo Chiodo, a duecento metri dall'Arena e da Piazza Bra ma lontana dal passaggio turistico.",
      "Dal 2012 la stessa gestione porta avanti una cucina veronese senza scorciatoie: la pasta si tira ogni mattina, i sughi si fanno in casa, il risotto all'Amarone si manteca al momento con riso Vialone Nano. La cantina è scelta bottiglia per bottiglia tra le cantine grandi e piccole della Valpolicella.",
      "Le sale, con affreschi di vite, mattoni a vista e lampadari di cristallo, hanno ospitato negli anni artisti e volti della televisione: le loro foto sono ancora alla parete, accanto ai tavoli dove ogni sera si cena prima dell'opera.",
    ],
  },
  en: {
    kicker: "Our story",
    title: "A back-lane trattoria, two minutes from the Arena",
    paragraphs: [
      "In the Verona dialect, the mèscola is the wooden spoon the innkeeper used to stir the risotto. Hence the name La Vecia Mescola Dell'Oste, the innkeeper's old spoon: a trattoria tucked into Vicolo Chiodo, two hundred metres from the Arena and Piazza Bra yet away from the tourist flow.",
      "Since 2012 the same family has run a Veronese kitchen without shortcuts: pasta is rolled every morning, sauces are made in-house, and the Amarone risotto is finished to order with Vialone Nano rice. The cellar is chosen bottle by bottle from the large and small wineries of the Valpolicella.",
      "The dining rooms, with vine frescoes, exposed brick and crystal chandeliers, have welcomed musicians and television personalities over the years: their photographs still hang on the wall, next to the tables where guests dine before the opera every evening.",
    ],
  },
  de: {
    kicker: "Unsere Geschichte",
    title: "Eine Trattoria in der Seitengasse, zwei Minuten von der Arena",
    paragraphs: [
      "Im Veroneser Dialekt ist die mèscola der Holzlöffel, mit dem der Wirt das Risotto rührte. Daher der Name La Vecia Mescola Dell'Oste, der alte Löffel des Wirts: eine Trattoria in der Vicolo Chiodo, zweihundert Meter von Arena und Piazza Bra entfernt und doch abseits der Touristenströme.",
      "Seit 2012 führt dieselbe Familie eine Veroneser Küche ohne Abkürzungen: Die Pasta wird jeden Morgen gemacht, die Saucen im Haus gekocht, das Amarone-Risotto auf Bestellung mit Vialone-Nano-Reis fertiggestellt. Der Weinkeller wird Flasche für Flasche bei großen und kleinen Kellereien des Valpolicella ausgesucht.",
      "Die Säle mit Rebenfresken, Sichtziegeln und Kristalllüstern haben über die Jahre Musiker und Fernsehgesichter empfangen: Ihre Fotos hängen noch an der Wand, neben den Tischen, an denen jeden Abend vor der Oper gegessen wird.",
    ],
  },
  es: {
    kicker: "Nuestra historia",
    title: "Una trattoria de callejón, a dos minutos de la Arena",
    paragraphs: [
      "En dialecto veronés, la mèscola es la cuchara de madera con la que el hostelero removía el risotto. De ahí el nombre La Vecia Mescola Dell'Oste, la vieja cuchara del hostelero: una trattoria escondida en Vicolo Chiodo, a doscientos metros de la Arena y de Piazza Bra pero lejos del paso turístico.",
      "Desde 2012 la misma familia lleva una cocina veronesa sin atajos: la pasta se estira cada mañana, las salsas se hacen en casa y el risotto al Amarone se manteca al momento con arroz Vialone Nano. La bodega se elige botella a botella entre grandes y pequeñas bodegas del Valpolicella.",
      "Las salas, con frescos de vid, ladrillo visto y lámparas de cristal, han acogido con los años a músicos y rostros de la televisión: sus fotos siguen en la pared, junto a las mesas donde cada noche se cena antes de la ópera.",
    ],
  },
  fr: {
    kicker: "Notre histoire",
    title: "Une trattoria de ruelle, à deux minutes des Arènes",
    paragraphs: [
      "En dialecte véronais, la mèscola est la cuillère en bois avec laquelle l'aubergiste remuait le risotto. D'où le nom La Vecia Mescola Dell'Oste, la vieille cuillère de l'aubergiste : une trattoria nichée dans le Vicolo Chiodo, à deux cents mètres des Arènes et de la Piazza Bra, mais à l'écart du flux touristique.",
      "Depuis 2012, la même famille tient une cuisine véronaise sans raccourcis : les pâtes sont façonnées chaque matin, les sauces sont faites maison et le risotto à l'Amarone est terminé à la commande avec du riz Vialone Nano. La cave est choisie bouteille par bouteille chez les grands et petits domaines de la Valpolicella.",
      "Les salles, avec leurs fresques de vigne, leurs briques apparentes et leurs lustres en cristal, ont accueilli au fil des ans musiciens et visages de la télévision : leurs photos sont toujours au mur, à côté des tables où l'on dîne chaque soir avant l'opéra.",
    ],
  },
  pt: {
    kicker: "A nossa história",
    title: "Uma trattoria de viela, a dois minutos da Arena",
    paragraphs: [
      "No dialeto veronês, a mèscola é a colher de pau com que o taberneiro mexia o risotto. Daí o nome La Vecia Mescola Dell'Oste, a velha colher do taberneiro: uma trattoria escondida na Vicolo Chiodo, a duzentos metros da Arena e da Piazza Bra mas longe do fluxo turístico.",
      "Desde 2012 a mesma família mantém uma cozinha veronesa sem atalhos: a massa é feita todas as manhãs, os molhos são caseiros e o risotto ao Amarone é finalizado na hora com arroz Vialone Nano. A garrafeira é escolhida garrafa a garrafa entre grandes e pequenas adegas do Valpolicella.",
      "As salas, com frescos de videira, tijolo à vista e lustres de cristal, receberam ao longo dos anos músicos e rostos da televisão: as suas fotografias continuam na parede, ao lado das mesas onde todas as noites se janta antes da ópera.",
    ],
  },
  ro: {
    kicker: "Povestea noastră",
    title: "O trattoria pe o stradelă, la două minute de Arenă",
    paragraphs: [
      "În dialectul veronez, mèscola este lingura de lemn cu care hangiul amesteca risotto-ul. De aici numele La Vecia Mescola Dell'Oste, lingura veche a hangiului: o trattoria ascunsă pe Vicolo Chiodo, la două sute de metri de Arenă și de Piazza Bra, dar departe de fluxul turistic.",
      "Din 2012 aceeași familie duce mai departe o bucătărie veroneză fără scurtături: pastele se fac în fiecare dimineață, sosurile sunt de casă, iar risotto-ul cu Amarone se finisează la comandă cu orez Vialone Nano. Crama este aleasă sticlă cu sticlă de la cramele mari și mici din Valpolicella.",
      "Sălile, cu fresce cu viță-de-vie, cărămidă aparentă și candelabre de cristal, au găzduit de-a lungul anilor muzicieni și figuri de televiziune: fotografiile lor sunt încă pe perete, lângă mesele la care se cinează în fiecare seară înainte de operă.",
    ],
  },
  ru: {
    kicker: "Наша история",
    title: "Траттория в переулке, в двух минутах от Арены",
    paragraphs: [
      "На веронском диалекте mèscola — это деревянная ложка, которой хозяин таверны помешивал ризотто. Отсюда название La Vecia Mescola Dell'Oste, «старая ложка хозяина»: траттория, спрятанная в переулке Vicolo Chiodo, в двухстах метрах от Арены и площади Бра, но в стороне от туристического потока.",
      "С 2012 года одна и та же семья ведёт веронскую кухню без компромиссов: пасту раскатывают каждое утро, соусы готовят сами, а ризотто с Амароне доводят до готовности под заказ из риса Vialone Nano. Винная карта собирается бутылка за бутылкой у больших и малых хозяйств Вальполичеллы.",
      "Залы с фресками виноградной лозы, кирпичной кладкой и хрустальными люстрами за эти годы принимали музыкантов и телеведущих: их фотографии по-прежнему висят на стене, рядом со столиками, где каждый вечер ужинают перед оперой.",
    ],
  },
  zh: {
    kicker: "我们的故事",
    title: "竞技场旁小巷里的传统餐馆",
    paragraphs: [
      "在维罗纳方言中，mèscola 是店主搅拌烩饭用的木勺，餐厅由此得名 La Vecia Mescola Dell'Oste，“店主的老木勺”。它藏身于 Vicolo Chiodo 小巷，距竞技场和布拉广场两百米，却远离游客的喧嚣。",
      "自 2012 年起，同一家人经营着一间不走捷径的维罗纳厨房：意面每天清晨手工制作，酱汁在店内熬煮，阿玛罗尼烩饭用 Vialone Nano 大米现点现做。酒窖里的每一瓶酒都来自瓦尔波利切拉的大小酒庄，逐瓶挑选。",
      "餐厅里有葡萄藤壁画、裸露砖墙和水晶吊灯，多年来接待过不少音乐家与电视名人：他们的照片至今挂在墙上，就在每晚歌剧开演前宾客用餐的餐桌旁。",
    ],
  },
  ja: {
    kicker: "私たちの物語",
    title: "アレーナから2分、路地裏のトラットリア",
    paragraphs: [
      "ヴェローナの方言で mèscola とは、店主がリゾットをかき混ぜる木のしゃもじのこと。店名の La Vecia Mescola Dell'Oste は「店主の古い木べら」という意味です。アレーナとブラ広場から200メートル、観光客の流れから外れた Vicolo Chiodo の路地に佇むトラットリアです。",
      "2012年から同じ家族が、近道をしないヴェローナ料理を続けています。パスタは毎朝手打ち、ソースは自家製、アマローネのリゾットは Vialone Nano 米で注文ごとに仕上げます。ワインはヴァルポリチェッラの大小のワイナリーから一本一本選んでいます。",
      "ブドウの蔦のフレスコ画、むき出しのレンガ、クリスタルのシャンデリアが飾る店内には、これまで音楽家やテレビの著名人も訪れました。その写真は今も壁に飾られ、毎晩オペラの前に食事を楽しむテーブルを見守っています。",
    ],
  },
};
