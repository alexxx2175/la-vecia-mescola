/* eslint-disable react/no-unescaped-entities -- testo legale con virgolette tipografiche */
import Link from "next/link";
import { LegalArticle, LegalSection } from "@/components/pages/LegalArticle";
import { LEGAL } from "@/data/legal";
import { legalPath } from "@/data/locales";
import { OpenCookiePreferencesButton } from "@/components/ui/OpenCookiePreferencesButton";

type Lang = "it" | "en";

const BROWSER_GUIDES = [
  { name: "Chrome", href: "https://support.google.com/chrome/answer/95647" },
  { name: "Safari", href: "https://support.apple.com/it-it/guide/safari/sfri11471/mac" },
  { name: "Firefox", href: "https://support.mozilla.org/it/kb/Gestione%20dei%20cookie" },
  { name: "Edge", href: "https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" },
];

export function CookiePolicyContent({ lang }: { lang: Lang }) {
  const privacyHref = legalPath(lang, "/privacy-policy");
  const updated = lang === "it" ? "Ultimo aggiornamento: 10 settembre 2026" : "Last updated: 10 September 2026";
  const gaCookie = `_ga_${LEGAL.gaId.replace("G-", "")}`;

  if (lang === "en") {
    return (
      <LegalArticle title="Cookie Policy" updated={updated}>
        <p>
          This page explains which cookies and similar technologies www.laveciamescola.com uses, why, and how you can
          control them. The controller is {LEGAL.legalName} (see the{" "}
          <Link href={privacyHref}>Privacy policy</Link>).
        </p>
        <LegalSection title="1. What cookies are">
          <p>
            Cookies are small text files stored on your device by websites you visit. Similar technologies, such as
            the browser's local storage, serve the same purpose. Technical cookies are needed for the site to work
            and do not require consent; statistics and third-party cookies are used only if you accept them.
          </p>
        </LegalSection>
        <LegalSection title="2. Cookies and storage used by this site">
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Purpose</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>cookie-consent</td>
                  <td>Technical (local storage)</td>
                  <td>Remembers your cookie choice so the banner is not shown again</td>
                  <td>6 months</td>
                </tr>
                <tr>
                  <td>site-lang</td>
                  <td>Technical (local storage)</td>
                  <td>Remembers the language you selected</td>
                  <td>Until deleted</td>
                </tr>
                <tr>
                  <td>_ga</td>
                  <td>Statistics, Google Analytics 4 (Google Ireland Ltd)</td>
                  <td>Distinguishes visitors to produce aggregated usage statistics. Set only with your consent</td>
                  <td>2 years</td>
                </tr>
                <tr>
                  <td>{gaCookie}</td>
                  <td>Statistics, Google Analytics 4</td>
                  <td>Keeps the session state for this property. Set only with your consent</td>
                  <td>2 years</td>
                </tr>
                <tr>
                  <td>Google Maps cookies (e.g. NID, CONSENT)</td>
                  <td>Third party, Google</td>
                  <td>Set by Google only after you click "Show the map" on the contact page</td>
                  <td>Set by Google</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Google Analytics is loaded only after you accept statistics cookies. How Google uses data:{" "}
            <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
              policies.google.com/technologies/partner-sites
            </a>
            . Links to WhatsApp, Instagram, Facebook and Tripadvisor take you to services governed by their own
            policies; this site does not embed their trackers.
          </p>
        </LegalSection>
        <LegalSection title="3. How to manage your choice">
          <p>
            On your first visit a banner lets you accept or reject statistics cookies, with the same prominence. You
            can change your choice at any time from "Cookie preferences" in the footer or with the button below; we
            ask again after 6 months.
          </p>
          <OpenCookiePreferencesButton label="Cookie preferences" />
          <p>You can also block or delete cookies from your browser settings:</p>
          <ul>
            {BROWSER_GUIDES.map((g) => (
              <li key={g.name}>
                <a href={g.href} target="_blank" rel="noopener noreferrer">
                  {g.name}
                </a>
              </li>
            ))}
          </ul>
        </LegalSection>
      </LegalArticle>
    );
  }

  return (
    <LegalArticle title="Cookie Policy" updated={updated}>
      <p>
        Questa pagina spiega quali cookie e tecnologie simili usa www.laveciamescola.com, perché, e come puoi
        controllarli. Il titolare è {LEGAL.legalName} (vedi la <Link href={privacyHref}>Privacy policy</Link>).
      </p>
      <LegalSection title="1. Cosa sono i cookie">
        <p>
          I cookie sono piccoli file di testo che i siti salvano sul tuo dispositivo. Tecnologie simili, come il
          local storage del browser, hanno la stessa funzione. I cookie tecnici servono al funzionamento del sito e
          non richiedono consenso; quelli statistici e di terze parti vengono usati solo se li accetti.
        </p>
      </LegalSection>
      <LegalSection title="2. Cookie e memorizzazioni usate da questo sito">
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Tipo</th>
                <th>Finalità</th>
                <th>Durata</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>cookie-consent</td>
                <td>Tecnico (local storage)</td>
                <td>Ricorda la tua scelta sui cookie per non mostrare di nuovo il banner</td>
                <td>6 mesi</td>
              </tr>
              <tr>
                <td>site-lang</td>
                <td>Tecnico (local storage)</td>
                <td>Ricorda la lingua che hai scelto</td>
                <td>Fino alla cancellazione</td>
              </tr>
              <tr>
                <td>_ga</td>
                <td>Statistico, Google Analytics 4 (Google Ireland Ltd)</td>
                <td>Distingue i visitatori per produrre statistiche aggregate d'uso. Impostato solo con il tuo consenso</td>
                <td>2 anni</td>
              </tr>
              <tr>
                <td>{gaCookie}</td>
                <td>Statistico, Google Analytics 4</td>
                <td>Mantiene lo stato della sessione per questa proprietà. Impostato solo con il tuo consenso</td>
                <td>2 anni</td>
              </tr>
              <tr>
                <td>Cookie di Google Maps (es. NID, CONSENT)</td>
                <td>Terze parti, Google</td>
                <td>Impostati da Google solo dopo che premi "Mostra la mappa" nella pagina contatti</td>
                <td>Definita da Google</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Google Analytics viene caricato solo dopo l'accettazione dei cookie statistici. Come Google utilizza i
          dati:{" "}
          <a href="https://policies.google.com/technologies/partner-sites?hl=it" target="_blank" rel="noopener noreferrer">
            policies.google.com/technologies/partner-sites
          </a>
          . I link a WhatsApp, Instagram, Facebook e Tripadvisor portano a servizi regolati dalle rispettive
          informative; questo sito non incorpora i loro strumenti di tracciamento.
        </p>
      </LegalSection>
      <LegalSection title="3. Come gestire la tua scelta">
        <p>
          Alla prima visita un banner ti permette di accettare o rifiutare i cookie statistici, con pari evidenza.
          Puoi cambiare scelta in ogni momento da "Preferenze cookie" nel piè di pagina o con il pulsante qui sotto;
          te lo richiediamo dopo 6 mesi.
        </p>
        <OpenCookiePreferencesButton label="Preferenze cookie" />
        <p>Puoi anche bloccare o cancellare i cookie dalle impostazioni del browser:</p>
        <ul>
          {BROWSER_GUIDES.map((g) => (
            <li key={g.name}>
              <a href={g.href} target="_blank" rel="noopener noreferrer">
                {g.name}
              </a>
            </li>
          ))}
        </ul>
      </LegalSection>
    </LegalArticle>
  );
}
