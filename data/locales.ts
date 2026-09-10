import type { SiteLang } from "@/data/translations";
import type { FaqItem } from "@/data/faq";
import { SITE_URL } from "@/lib/site";

export type Locale = SiteLang;

export const DEFAULT_LOCALE: Locale = "it";
export const LOCALES: Locale[] = ["it", "en", "de", "es", "fr", "pt", "ro", "ru", "zh", "ja"];
/** Lingue con un prefisso di URL (tutte tranne l'italiano, servito alla radice). */
export const SECONDARY_LOCALES: Locale[] = LOCALES.filter((l) => l !== DEFAULT_LOCALE);
/** La pagina eventi esiste solo dove c'è contenuto tradotto. */
export const ARENA_LOCALES: Locale[] = ["it", "en", "de"];

export const OG_LOCALE: Record<Locale, string> = {
  it: "it_IT", en: "en_GB", de: "de_DE", es: "es_ES", fr: "fr_FR",
  pt: "pt_PT", ro: "ro_RO", ru: "ru_RU", zh: "zh_CN", ja: "ja_JP",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as string[]).includes(value);
}

/** "/menu" → "/en/menu", "/" → "/en", "/#gallery" → "/en#gallery"; l'italiano resta alla radice. */
export function localePath(lang: Locale, path: string): string {
  if (lang === DEFAULT_LOCALE) return path;
  if (path === "/") return `/${lang}`;
  if (path.startsWith("/#")) return `/${lang}${path.slice(1)}`;
  return `/${lang}${path}`;
}

/** Rimuove il prefisso lingua da un pathname: "/en/menu" → "/menu", "/de" → "/". */
export function stripLocale(pathname: string): string {
  const m = pathname.match(/^\/([a-z]{2})(\/.*)?$/);
  if (m && isLocale(m[1]) && m[1] !== DEFAULT_LOCALE) return m[2] || "/";
  return pathname || "/";
}

export function localeFromPath(pathname: string): Locale {
  const m = pathname.match(/^\/([a-z]{2})(\/|$)/);
  return m && isLocale(m[1]) ? m[1] : DEFAULT_LOCALE;
}

export function arenaPath(lang: Locale): string {
  return ARENA_LOCALES.includes(lang) ? localePath(lang, "/arena") : "/arena";
}

/** Mappa hreflang completa (con self e x-default) per un percorso. */
export function hreflangMap(path: string, locales: Locale[] = LOCALES): Record<string, string> {
  const map: Record<string, string> = {};
  for (const l of locales) map[l] = `${SITE_URL}${localePath(l, path)}`;
  map["x-default"] = `${SITE_URL}${path}`;
  return map;
}

export type LocaleSeo = {
  home: { title: string; description: string };
  menu: { title: string; description: string };
  contatti: { title: string; description: string };
  faqKicker: string;
  faqTitle: string;
  faq: FaqItem[];
};

export const LOCALE_SEO: Record<Locale, LocaleSeo> = {
  it: {
    home: {
      title: "La Vecia Mescola Dell'Oste | Ristorante storico nel centro di Verona",
      description:
        "La Vecia Mescola Dell'Oste, trattoria storica nel centro di Verona a 2 minuti dall'Arena. Pasta fresca fatta in casa, risotto all'Amarone, bistecca Chateaubriand. Prenota su WhatsApp.",
    },
    menu: {
      title: "Menu | La Vecia Mescola Dell'Oste, Ristorante Tipico a Verona",
      description:
        "Scopri il menu de La Vecia Mescola: pasta fresca fatta in casa, risotto all'Amarone, bistecca Chateaubriand e cucina veneta autentica. A 2 minuti dall'Arena di Verona. Vicolo Chiodo 4.",
    },
    contatti: {
      title: "Contatti e Prenotazioni | La Vecia Mescola Dell'Oste, Verona",
      description:
        "Prenota un tavolo alla Vecia Mescola su WhatsApp: +39 392 869 9275. Vicolo Chiodo 4, Verona, a 2 minuti dall'Arena. Aperto tutti i giorni a pranzo e cena.",
    },
    faqKicker: "Domande frequenti",
    faqTitle: "Ristorante tipico a Verona, vicino all'Arena",
    faq: [], // la home italiana usa HOME_FAQ (data/faq.ts)
  },
  en: {
    home: {
      title: "La Vecia Mescola Dell'Oste | Traditional Restaurant in Verona near the Arena",
      description:
        "Historic trattoria in Verona's old town, 2 minutes from the Arena. Handmade fresh pasta, Amarone risotto, Chateaubriand steak and Valpolicella wines. Book on WhatsApp.",
    },
    menu: {
      title: "Menu | La Vecia Mescola, Traditional Venetian Restaurant in Verona",
      description:
        "Full menu with prices: handmade fresh pasta, Amarone risotto, Chateaubriand, Venetian classics and desserts. Vicolo Chiodo 4, 2 minutes from the Arena di Verona.",
    },
    contatti: {
      title: "Contact & Reservations | La Vecia Mescola, Verona",
      description:
        "Book a table at La Vecia Mescola on WhatsApp: +39 392 869 9275. Vicolo Chiodo 4, Verona, 2 minutes from the Arena. Open every day for lunch and dinner.",
    },
    faqKicker: "Frequently asked questions",
    faqTitle: "Traditional restaurant in Verona, near the Arena",
    faq: [
      { q: "Where can I eat near the Arena di Verona?", a: "La Vecia Mescola Dell'Oste is at Vicolo Chiodo 4, about 200 metres (a 2-minute walk) from the Arena di Verona. It is ideal for dinner before an opera or concert. Open every day, all day. Book on WhatsApp: +39 392 869 9275." },
      { q: "What is the best traditional restaurant in Verona?", a: "La Vecia Mescola Dell'Oste is one of Verona's best-loved traditional restaurants: authentic Venetian cooking in the historic centre, fresh pasta made every morning, Amarone risotto and a wine list built around Valpolicella. Vicolo Chiodo 4, 37121 Verona." },
      { q: "Where can I try Amarone risotto in Verona?", a: "Our Amarone risotto is made with Vialone Nano IGP rice slowly cooked with Amarone della Valpolicella DOCG, Treviso radicchio and Venetian cheese fondue. It costs €18 per person, minimum 2 people, and is the restaurant's signature dish." },
      { q: "Is there a romantic restaurant in Verona's old town?", a: "Yes. La Vecia Mescola is known for its intimate atmosphere: exposed brick, frescoes, soft lighting and attentive service, in the city of Romeo and Juliet. Perfect for anniversaries and special dinners." },
      { q: "Where can I eat homemade fresh pasta in Verona?", a: "At La Vecia Mescola the pasta is made in-house every day: bigoli, pappardelle, tagliolini, lasagne and filled caramelle, with selected flours and fresh local eggs." },
      { q: "How do I book a table?", a: "Send a WhatsApp message to +39 392 869 9275 or call the same number. We are open every day: Monday to Thursday 12:00–22:30, Friday and Saturday 12:00–23:00, Sunday 12:00–22:00. On Arena show nights we recommend booking in advance." },
    ],
  },
  de: {
    home: {
      title: "La Vecia Mescola Dell'Oste | Traditionelles Restaurant in Verona nahe der Arena",
      description:
        "Historische Trattoria in der Altstadt von Verona, 2 Gehminuten von der Arena. Hausgemachte frische Pasta, Amarone-Risotto, Chateaubriand und Weine aus dem Valpolicella. Reservierung per WhatsApp.",
    },
    menu: {
      title: "Speisekarte | La Vecia Mescola, traditionelles Restaurant in Verona",
      description:
        "Komplette Speisekarte mit Preisen: hausgemachte Pasta, Amarone-Risotto, Chateaubriand, venezianische Klassiker und Desserts. Vicolo Chiodo 4, 2 Minuten von der Arena di Verona.",
    },
    contatti: {
      title: "Kontakt & Reservierung | La Vecia Mescola, Verona",
      description:
        "Tisch reservieren bei La Vecia Mescola per WhatsApp: +39 392 869 9275. Vicolo Chiodo 4, Verona, 2 Minuten von der Arena. Täglich mittags und abends geöffnet.",
    },
    faqKicker: "Häufige Fragen",
    faqTitle: "Traditionelles Restaurant in Verona, nahe der Arena",
    faq: [
      { q: "Wo kann man in der Nähe der Arena di Verona essen?", a: "La Vecia Mescola Dell'Oste liegt in der Vicolo Chiodo 4, etwa 200 Meter (2 Gehminuten) von der Arena di Verona entfernt. Ideal für das Abendessen vor der Oper oder einem Konzert. Täglich durchgehend geöffnet. Reservierung per WhatsApp: +39 392 869 9275." },
      { q: "Welches ist das beste traditionelle Restaurant in Verona?", a: "La Vecia Mescola Dell'Oste gehört zu den beliebtesten traditionellen Restaurants Veronas: authentische venezianische Küche in der Altstadt, jeden Morgen frisch gemachte Pasta, Amarone-Risotto und eine Weinkarte rund um das Valpolicella. Vicolo Chiodo 4, 37121 Verona." },
      { q: "Wo gibt es Amarone-Risotto in Verona?", a: "Unser Amarone-Risotto wird aus Vialone-Nano-Reis IGP zubereitet, langsam mit Amarone della Valpolicella DOCG, Radicchio aus Treviso und venezianischer Käsefondue gegart. Es kostet 18 € pro Person, mindestens 2 Personen, und ist das Signature-Gericht des Hauses." },
      { q: "Gibt es ein romantisches Restaurant in der Altstadt von Verona?", a: "Ja. La Vecia Mescola ist bekannt für seine intime Atmosphäre: Sichtziegel, Fresken, gedämpftes Licht und aufmerksamer Service, mitten in der Stadt von Romeo und Julia. Perfekt für Jahrestage und besondere Abende." },
      { q: "Wo bekommt man hausgemachte frische Pasta in Verona?", a: "Bei La Vecia Mescola wird die Pasta jeden Tag im Haus gemacht: Bigoli, Pappardelle, Tagliolini, Lasagne und gefüllte Caramelle, aus ausgewähltem Mehl und frischen Eiern aus der Region." },
      { q: "Wie reserviere ich einen Tisch?", a: "Schreiben Sie eine WhatsApp-Nachricht an +39 392 869 9275 oder rufen Sie dieselbe Nummer an. Geöffnet täglich: Montag bis Donnerstag 12:00–22:30, Freitag und Samstag 12:00–23:00, Sonntag 12:00–22:00. An Vorstellungsabenden in der Arena empfehlen wir eine frühzeitige Reservierung." },
    ],
  },
  es: {
    home: {
      title: "La Vecia Mescola Dell'Oste | Restaurante típico en Verona junto a la Arena",
      description:
        "Trattoria histórica en el centro de Verona, a 2 minutos de la Arena. Pasta fresca casera, risotto al Amarone, Chateaubriand y vinos de Valpolicella. Reserva por WhatsApp.",
    },
    menu: {
      title: "Menú | La Vecia Mescola, restaurante típico véneto en Verona",
      description:
        "Menú completo con precios: pasta fresca casera, risotto al Amarone, Chateaubriand, clásicos vénetos y postres. Vicolo Chiodo 4, a 2 minutos de la Arena de Verona.",
    },
    contatti: {
      title: "Contacto y reservas | La Vecia Mescola, Verona",
      description:
        "Reserva mesa en La Vecia Mescola por WhatsApp: +39 392 869 9275. Vicolo Chiodo 4, Verona, a 2 minutos de la Arena. Abierto todos los días, comida y cena.",
    },
    faqKicker: "Preguntas frecuentes",
    faqTitle: "Restaurante típico en Verona, cerca de la Arena",
    faq: [
      { q: "¿Dónde comer cerca de la Arena de Verona?", a: "La Vecia Mescola Dell'Oste está en Vicolo Chiodo 4, a unos 200 metros (2 minutos a pie) de la Arena de Verona. Ideal para cenar antes de la ópera o de un concierto. Abierto todos los días con horario continuo. Reservas por WhatsApp: +39 392 869 9275." },
      { q: "¿Cuál es el mejor restaurante típico de Verona?", a: "La Vecia Mescola Dell'Oste es uno de los restaurantes tradicionales más queridos de Verona: cocina véneta auténtica en el centro histórico, pasta fresca hecha cada mañana, risotto al Amarone y una carta de vinos centrada en el Valpolicella. Vicolo Chiodo 4, 37121 Verona." },
      { q: "¿Dónde probar el risotto al Amarone en Verona?", a: "Nuestro risotto al Amarone se prepara con arroz Vialone Nano IGP cocinado lentamente con Amarone della Valpolicella DOCG, radicchio de Treviso y fondue véneta. Cuesta 18 € por persona, mínimo 2 personas, y es el plato emblema del restaurante." },
      { q: "¿Hay un restaurante romántico en el casco antiguo de Verona?", a: "Sí. La Vecia Mescola es conocida por su ambiente íntimo: ladrillo visto, frescos, luz tenue y servicio atento, en la ciudad de Romeo y Julieta. Perfecto para aniversarios y cenas especiales." },
      { q: "¿Dónde comer pasta fresca casera en Verona?", a: "En La Vecia Mescola la pasta se hace en casa cada día: bigoli, pappardelle, tagliolini, lasaña y caramelle rellenas, con harinas seleccionadas y huevos frescos de la zona." },
      { q: "¿Cómo reservo una mesa?", a: "Envía un mensaje de WhatsApp al +39 392 869 9275 o llama al mismo número. Abrimos todos los días: de lunes a jueves 12:00–22:30, viernes y sábado 12:00–23:00, domingo 12:00–22:00. Las noches de espectáculo en la Arena recomendamos reservar con antelación." },
    ],
  },
  fr: {
    home: {
      title: "La Vecia Mescola Dell'Oste | Restaurant traditionnel à Vérone près des Arènes",
      description:
        "Trattoria historique dans le centre de Vérone, à 2 minutes des Arènes. Pâtes fraîches maison, risotto à l'Amarone, Chateaubriand et vins de la Valpolicella. Réservation par WhatsApp.",
    },
    menu: {
      title: "Menu | La Vecia Mescola, restaurant vénitien traditionnel à Vérone",
      description:
        "Menu complet avec les prix : pâtes fraîches maison, risotto à l'Amarone, Chateaubriand, classiques vénitiens et desserts. Vicolo Chiodo 4, à 2 minutes des Arènes de Vérone.",
    },
    contatti: {
      title: "Contact et réservations | La Vecia Mescola, Vérone",
      description:
        "Réservez une table à La Vecia Mescola par WhatsApp : +39 392 869 9275. Vicolo Chiodo 4, Vérone, à 2 minutes des Arènes. Ouvert tous les jours, midi et soir.",
    },
    faqKicker: "Questions fréquentes",
    faqTitle: "Restaurant traditionnel à Vérone, près des Arènes",
    faq: [
      { q: "Où manger près des Arènes de Vérone ?", a: "La Vecia Mescola Dell'Oste se trouve Vicolo Chiodo 4, à environ 200 mètres (2 minutes à pied) des Arènes de Vérone. Idéal pour dîner avant l'opéra ou un concert. Ouvert tous les jours en continu. Réservation par WhatsApp : +39 392 869 9275." },
      { q: "Quel est le meilleur restaurant traditionnel de Vérone ?", a: "La Vecia Mescola Dell'Oste est l'un des restaurants traditionnels les plus appréciés de Vérone : cuisine vénitienne authentique dans le centre historique, pâtes fraîches préparées chaque matin, risotto à l'Amarone et une carte des vins centrée sur la Valpolicella. Vicolo Chiodo 4, 37121 Vérone." },
      { q: "Où goûter le risotto à l'Amarone à Vérone ?", a: "Notre risotto à l'Amarone est préparé avec du riz Vialone Nano IGP cuit lentement avec de l'Amarone della Valpolicella DOCG, du radicchio de Trévise et une fondue de fromage vénitienne. Il coûte 18 € par personne, minimum 2 personnes, et c'est le plat signature de la maison." },
      { q: "Y a-t-il un restaurant romantique dans le centre historique de Vérone ?", a: "Oui. La Vecia Mescola est connue pour son atmosphère intime : briques apparentes, fresques, lumière tamisée et service attentionné, dans la ville de Roméo et Juliette. Parfait pour un anniversaire ou un dîner spécial." },
      { q: "Où manger des pâtes fraîches maison à Vérone ?", a: "À La Vecia Mescola, les pâtes sont faites maison chaque jour : bigoli, pappardelle, tagliolini, lasagnes et caramelle farcies, avec des farines sélectionnées et des œufs frais de la région." },
      { q: "Comment réserver une table ?", a: "Envoyez un message WhatsApp au +39 392 869 9275 ou appelez le même numéro. Ouvert tous les jours : du lundi au jeudi 12h–22h30, vendredi et samedi 12h–23h, dimanche 12h–22h. Les soirs de spectacle aux Arènes, nous conseillons de réserver à l'avance." },
    ],
  },
  pt: {
    home: {
      title: "La Vecia Mescola Dell'Oste | Restaurante tradicional em Verona junto à Arena",
      description:
        "Trattoria histórica no centro de Verona, a 2 minutos da Arena. Massa fresca caseira, risotto ao Amarone, Chateaubriand e vinhos de Valpolicella. Reserve por WhatsApp.",
    },
    menu: {
      title: "Menu | La Vecia Mescola, restaurante véneto tradicional em Verona",
      description:
        "Menu completo com preços: massa fresca caseira, risotto ao Amarone, Chateaubriand, clássicos vénetos e sobremesas. Vicolo Chiodo 4, a 2 minutos da Arena de Verona.",
    },
    contatti: {
      title: "Contactos e reservas | La Vecia Mescola, Verona",
      description:
        "Reserve mesa no La Vecia Mescola por WhatsApp: +39 392 869 9275. Vicolo Chiodo 4, Verona, a 2 minutos da Arena. Aberto todos os dias, almoço e jantar.",
    },
    faqKicker: "Perguntas frequentes",
    faqTitle: "Restaurante tradicional em Verona, perto da Arena",
    faq: [
      { q: "Onde comer perto da Arena de Verona?", a: "O La Vecia Mescola Dell'Oste fica na Vicolo Chiodo 4, a cerca de 200 metros (2 minutos a pé) da Arena de Verona. Ideal para jantar antes da ópera ou de um concerto. Aberto todos os dias em horário contínuo. Reservas por WhatsApp: +39 392 869 9275." },
      { q: "Qual é o melhor restaurante tradicional de Verona?", a: "O La Vecia Mescola Dell'Oste é um dos restaurantes tradicionais mais apreciados de Verona: cozinha véneta autêntica no centro histórico, massa fresca feita todas as manhãs, risotto ao Amarone e uma carta de vinhos centrada no Valpolicella. Vicolo Chiodo 4, 37121 Verona." },
      { q: "Onde provar o risotto ao Amarone em Verona?", a: "O nosso risotto ao Amarone é feito com arroz Vialone Nano IGP cozinhado lentamente com Amarone della Valpolicella DOCG, radicchio de Treviso e fondue de queijo véneta. Custa 18 € por pessoa, mínimo 2 pessoas, e é o prato emblemático da casa." },
      { q: "Há um restaurante romântico no centro histórico de Verona?", a: "Sim. O La Vecia Mescola é conhecido pelo ambiente íntimo: tijolo à vista, frescos, luz suave e serviço atento, na cidade de Romeu e Julieta. Perfeito para aniversários e jantares especiais." },
      { q: "Onde comer massa fresca caseira em Verona?", a: "No La Vecia Mescola a massa é feita em casa todos os dias: bigoli, pappardelle, tagliolini, lasanha e caramelle recheadas, com farinhas selecionadas e ovos frescos da região." },
      { q: "Como reservo uma mesa?", a: "Envie uma mensagem de WhatsApp para +39 392 869 9275 ou ligue para o mesmo número. Abrimos todos os dias: segunda a quinta 12:00–22:30, sexta e sábado 12:00–23:00, domingo 12:00–22:00. Nas noites de espetáculo na Arena recomendamos reservar com antecedência." },
    ],
  },
  ro: {
    home: {
      title: "La Vecia Mescola Dell'Oste | Restaurant tradițional în Verona, lângă Arenă",
      description:
        "Trattoria istorică în centrul Veronei, la 2 minute de Arenă. Paste proaspete de casă, risotto cu Amarone, Chateaubriand și vinuri din Valpolicella. Rezervă pe WhatsApp.",
    },
    menu: {
      title: "Meniu | La Vecia Mescola, restaurant venețian tradițional în Verona",
      description:
        "Meniu complet cu prețuri: paste proaspete de casă, risotto cu Amarone, Chateaubriand, clasice venețiene și deserturi. Vicolo Chiodo 4, la 2 minute de Arena din Verona.",
    },
    contatti: {
      title: "Contact și rezervări | La Vecia Mescola, Verona",
      description:
        "Rezervă o masă la La Vecia Mescola pe WhatsApp: +39 392 869 9275. Vicolo Chiodo 4, Verona, la 2 minute de Arenă. Deschis zilnic, prânz și cină.",
    },
    faqKicker: "Întrebări frecvente",
    faqTitle: "Restaurant tradițional în Verona, lângă Arenă",
    faq: [
      { q: "Unde pot mânca lângă Arena din Verona?", a: "La Vecia Mescola Dell'Oste se află pe Vicolo Chiodo 4, la circa 200 de metri (2 minute de mers pe jos) de Arena din Verona. Ideal pentru cină înainte de operă sau de un concert. Deschis zilnic, program continuu. Rezervări pe WhatsApp: +39 392 869 9275." },
      { q: "Care este cel mai bun restaurant tradițional din Verona?", a: "La Vecia Mescola Dell'Oste este unul dintre cele mai apreciate restaurante tradiționale din Verona: bucătărie venețiană autentică în centrul istoric, paste proaspete făcute în fiecare dimineață, risotto cu Amarone și o listă de vinuri centrată pe Valpolicella. Vicolo Chiodo 4, 37121 Verona." },
      { q: "Unde pot gusta risotto cu Amarone în Verona?", a: "Risotto-ul nostru cu Amarone se prepară din orez Vialone Nano IGP gătit lent cu Amarone della Valpolicella DOCG, radicchio de Treviso și fondue de brânză venețiană. Costă 18 € de persoană, minimum 2 persoane, și este preparatul emblematic al restaurantului." },
      { q: "Există un restaurant romantic în centrul vechi al Veronei?", a: "Da. La Vecia Mescola este cunoscut pentru atmosfera intimă: cărămidă aparentă, fresce, lumină difuză și servire atentă, în orașul lui Romeo și Julieta. Perfect pentru aniversări și cine speciale." },
      { q: "Unde pot mânca paste proaspete de casă în Verona?", a: "La La Vecia Mescola pastele se fac în casă în fiecare zi: bigoli, pappardelle, tagliolini, lasagna și caramelle umplute, din făinuri selecționate și ouă proaspete locale." },
      { q: "Cum rezerv o masă?", a: "Trimite un mesaj pe WhatsApp la +39 392 869 9275 sau sună la același număr. Suntem deschiși zilnic: luni–joi 12:00–22:30, vineri și sâmbătă 12:00–23:00, duminică 12:00–22:00. În serile cu spectacol la Arenă recomandăm rezervarea din timp." },
    ],
  },
  ru: {
    home: {
      title: "La Vecia Mescola Dell'Oste | Традиционный ресторан в Вероне рядом с Ареной",
      description:
        "Историческая траттория в центре Вероны, в 2 минутах от Арены. Домашняя свежая паста, ризотто с Амароне, шатобриан и вина Вальполичеллы. Бронирование в WhatsApp.",
    },
    menu: {
      title: "Меню | La Vecia Mescola, традиционный венетский ресторан в Вероне",
      description:
        "Полное меню с ценами: домашняя свежая паста, ризотто с Амароне, шатобриан, венетская классика и десерты. Vicolo Chiodo 4, в 2 минутах от Арены Вероны.",
    },
    contatti: {
      title: "Контакты и бронирование | La Vecia Mescola, Верона",
      description:
        "Забронируйте столик в La Vecia Mescola в WhatsApp: +39 392 869 9275. Vicolo Chiodo 4, Верона, в 2 минутах от Арены. Открыто ежедневно, обед и ужин.",
    },
    faqKicker: "Частые вопросы",
    faqTitle: "Традиционный ресторан в Вероне рядом с Ареной",
    faq: [
      { q: "Где поесть рядом с Ареной Вероны?", a: "La Vecia Mescola Dell'Oste находится по адресу Vicolo Chiodo 4, примерно в 200 метрах (2 минуты пешком) от Арены Вероны. Идеально для ужина перед оперой или концертом. Открыто ежедневно без перерыва. Бронирование в WhatsApp: +39 392 869 9275." },
      { q: "Какой лучший традиционный ресторан в Вероне?", a: "La Vecia Mescola Dell'Oste — один из самых любимых традиционных ресторанов Вероны: настоящая венетская кухня в историческом центре, свежая паста, которую готовят каждое утро, ризотто с Амароне и винная карта на основе вин Вальполичеллы. Vicolo Chiodo 4, 37121 Верона." },
      { q: "Где попробовать ризотто с Амароне в Вероне?", a: "Наше ризотто с Амароне готовят из риса Vialone Nano IGP, медленно томлёного с вином Amarone della Valpolicella DOCG, радиккио из Тревизо и венетским сырным фондю. Стоимость 18 € с человека, минимум 2 персоны. Это фирменное блюдо ресторана." },
      { q: "Есть ли романтический ресторан в старом городе Вероны?", a: "Да. La Vecia Mescola известна своей уютной атмосферой: открытая кирпичная кладка, фрески, мягкий свет и внимательный сервис в городе Ромео и Джульетты. Идеально для годовщин и особых ужинов." },
      { q: "Где поесть домашнюю свежую пасту в Вероне?", a: "В La Vecia Mescola пасту делают своими руками каждый день: биголи, паппарделле, тальолини, лазанья и фаршированные карамелле из отборной муки и свежих местных яиц." },
      { q: "Как забронировать столик?", a: "Напишите в WhatsApp на номер +39 392 869 9275 или позвоните по нему же. Мы открыты ежедневно: понедельник–четверг 12:00–22:30, пятница и суббота 12:00–23:00, воскресенье 12:00–22:00. В вечера спектаклей на Арене советуем бронировать заранее." },
    ],
  },
  zh: {
    home: {
      title: "La Vecia Mescola Dell'Oste | 维罗纳竞技场旁的传统餐厅",
      description:
        "维罗纳老城的历史悠久小餐馆，距竞技场步行2分钟。每日手工鲜意面、阿玛罗尼烩饭、夏多布里昂牛排与瓦尔波利切拉葡萄酒。通过 WhatsApp 预订。",
    },
    menu: {
      title: "菜单 | La Vecia Mescola，维罗纳传统威尼托餐厅",
      description:
        "含价格的完整菜单：手工鲜意面、阿玛罗尼烩饭、夏多布里昂牛排、威尼托经典菜与甜点。地址 Vicolo Chiodo 4，距维罗纳竞技场2分钟。",
    },
    contatti: {
      title: "联系与预订 | La Vecia Mescola，维罗纳",
      description:
        "通过 WhatsApp 预订 La Vecia Mescola 餐位：+39 392 869 9275。地址 Vicolo Chiodo 4，维罗纳，距竞技场2分钟。每日午餐和晚餐营业。",
    },
    faqKicker: "常见问题",
    faqTitle: "维罗纳竞技场旁的传统餐厅",
    faq: [
      { q: "维罗纳竞技场附近哪里可以用餐？", a: "La Vecia Mescola Dell'Oste 位于 Vicolo Chiodo 4，距维罗纳竞技场约200米（步行2分钟）。是观看歌剧或音乐会前用餐的理想选择。每日营业，全天不打烊。WhatsApp 预订：+39 392 869 9275。" },
      { q: "维罗纳最好的传统餐厅是哪家？", a: "La Vecia Mescola Dell'Oste 是维罗纳最受喜爱的传统餐厅之一：老城中心的正宗威尼托菜，每天清晨手工制作的鲜意面、阿玛罗尼烩饭，以及以瓦尔波利切拉为核心的酒单。地址：Vicolo Chiodo 4, 37121 Verona。" },
      { q: "在维罗纳哪里可以品尝阿玛罗尼烩饭？", a: "我们的阿玛罗尼烩饭选用 Vialone Nano IGP 大米，以 Amarone della Valpolicella DOCG 葡萄酒慢煮，配特雷维索菊苣和威尼托奶酪浓汁。每位18欧元，两人起点，是餐厅的招牌菜。" },
      { q: "维罗纳老城有浪漫的餐厅吗？", a: "有。La Vecia Mescola 以温馨的氛围著称：裸露砖墙、壁画、柔和灯光和贴心服务，就在罗密欧与朱丽叶之城。非常适合纪念日和特别的晚餐。" },
      { q: "在维罗纳哪里可以吃到手工鲜意面？", a: "La Vecia Mescola 每天在店内手工制作意面：bigoli、pappardelle、tagliolini、千层面和带馅的 caramelle，选用优质面粉和本地新鲜鸡蛋。" },
      { q: "如何预订餐位？", a: "请发送 WhatsApp 消息至 +39 392 869 9275，或拨打同一号码。每日营业：周一至周四 12:00–22:30，周五和周六 12:00–23:00，周日 12:00–22:00。竞技场有演出的晚上建议提前预订。" },
    ],
  },
  ja: {
    home: {
      title: "La Vecia Mescola Dell'Oste | アレーナ近くのヴェローナ伝統レストラン",
      description:
        "ヴェローナ旧市街の歴史あるトラットリア。アレーナから徒歩2分。毎日手打ちの生パスタ、アマローネのリゾット、シャトーブリアン、ヴァルポリチェッラのワイン。WhatsAppで予約。",
    },
    menu: {
      title: "メニュー | La Vecia Mescola ヴェローナのヴェネト伝統料理",
      description:
        "価格付きの全メニュー：手打ち生パスタ、アマローネのリゾット、シャトーブリアン、ヴェネトの定番料理とデザート。Vicolo Chiodo 4、ヴェローナのアレーナから2分。",
    },
    contatti: {
      title: "お問い合わせ・ご予約 | La Vecia Mescola ヴェローナ",
      description:
        "La Vecia Mescola のご予約はWhatsAppで：+39 392 869 9275。Vicolo Chiodo 4、ヴェローナ、アレーナから2分。毎日ランチとディナー営業。",
    },
    faqKicker: "よくあるご質問",
    faqTitle: "アレーナ近くのヴェローナ伝統レストラン",
    faq: [
      { q: "ヴェローナのアレーナ近くで食事ができる場所は？", a: "La Vecia Mescola Dell'Oste は Vicolo Chiodo 4 にあり、アレーナ・ディ・ヴェローナから約200メートル（徒歩2分）です。オペラやコンサートの前のディナーに最適。毎日通し営業。WhatsAppでご予約：+39 392 869 9275。" },
      { q: "ヴェローナで最も評判の良い伝統的なレストランは？", a: "La Vecia Mescola Dell'Oste はヴェローナで最も愛される伝統レストランのひとつです。旧市街での本格ヴェネト料理、毎朝手打ちする生パスタ、アマローネのリゾット、ヴァルポリチェッラを中心としたワインリストが自慢です。住所：Vicolo Chiodo 4, 37121 Verona。" },
      { q: "ヴェローナでアマローネのリゾットが食べられるのは？", a: "当店のアマローネのリゾットは Vialone Nano IGP 米を Amarone della Valpolicella DOCG でじっくり炊き、トレヴィーゾのラディッキオとヴェネト風チーズフォンデュを合わせます。お一人18ユーロ、2名様より。当店の看板料理です。" },
      { q: "ヴェローナ旧市街にロマンチックなレストランはありますか？", a: "はい。La Vecia Mescola は、むき出しのレンガ、フレスコ画、柔らかな照明、行き届いたサービスによる親密な雰囲気で知られています。ロミオとジュリエットの街で、記念日や特別なディナーに最適です。" },
      { q: "ヴェローナで手打ち生パスタが食べられるのは？", a: "La Vecia Mescola では毎日店内でパスタを手打ちしています。ビーゴリ、パッパルデッレ、タリオリーニ、ラザニア、詰め物入りのカラメッレなど、厳選した小麦粉と地元の新鮮な卵を使用しています。" },
      { q: "テーブルの予約方法は？", a: "WhatsApp（+39 392 869 9275）にメッセージを送るか、同じ番号にお電話ください。毎日営業：月曜〜木曜 12:00–22:30、金曜・土曜 12:00–23:00、日曜 12:00–22:00。アレーナで公演がある夜は事前のご予約をおすすめします。" },
    ],
  },
};
