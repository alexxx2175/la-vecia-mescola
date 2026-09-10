/**
 * Estratti di recensioni pubbliche su Google (profilo "La Vecia Mescola", Verona),
 * riportate con nome come mostrato su Google. Aggiornare periodicamente
 * rating e conteggio da Google Maps.
 */
export const GOOGLE_REVIEWS_URL = "https://www.google.com/maps?cid=7870716361863865033";

export const GOOGLE_RATING = { value: 4.6, count: 2512, asOf: "2026-09-10" };

export type Review = {
  author: string;
  rating: number;
  year: number;
  text: string;
};

export const REVIEWS: Review[] = [
  {
    author: "Mauro Z.",
    rating: 5,
    year: 2026,
    text: "Ottimo locale in centro a Verona. Atmosfera elegante con un tovagliato bianco, una rosa rossa e una luce di design. Cibo della tradizione locale di buona fattura come il risotto con radicchio e Amarone e ricercato come gli gnocchi di ricotta con tartufo. Da ritornare!",
  },
  {
    author: "Alessandro P.",
    rating: 5,
    year: 2025,
    text: "A due passi da piazza Bra ma lontano dal caos turistico. La sala è elegante e curata, il servizio professionale e piacevole. Ho mangiato il miglior baccalà alla vicentina di Verona! Una perla a Verona.",
  },
  {
    author: "Flavio M.",
    rating: 5,
    year: 2026,
    text: "Locale con cucina tipica, servizio veloce e ottimo. I primi ottimi, sia i bigoli con ragù di asino sia le caramelle, la cheesecake ha chiuso in bellezza. Grande scelta di vini locali, anche al calice.",
  },
  {
    author: "Ilaria E.",
    rating: 5,
    year: 2026,
    text: "Location rustica ma elegante, illuminazione molto piacevole, personale disponibile ed educato. Cucina ottima: il prezzo è adeguato alla qualità e a tutto ciò che questo ristorante offre. Per piacevolissime cene con amici o in coppia.",
  },
  {
    author: "Gianmarco I.",
    rating: 5,
    year: 2026,
    text: "Piccola chicca in quel di Verona, in zona centrale vicino all'Arena ma lontano dalla folla. Servizio eccellente, equilibrato rapporto qualità prezzo. Tagliata superlativa.",
  },
  {
    author: "Moira",
    rating: 5,
    year: 2026,
    text: "Abbiamo cenato io e mio marito prima del concerto all'Arena: staff gentile, delle squisite tagliatelle al tartufo e altre bontà. Lo consiglio vivamente, ci ritorneremo presto.",
  },
];
