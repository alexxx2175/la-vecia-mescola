/* eslint-disable react/no-unescaped-entities -- testo legale con virgolette tipografiche */
import Link from "next/link";
import { LegalArticle, LegalSection } from "@/components/pages/LegalArticle";
import { LEGAL } from "@/data/legal";
import { legalPath } from "@/data/locales";

type Lang = "it" | "en";

export function PrivacyPolicyContent({ lang }: { lang: Lang }) {
  const cookieHref = legalPath(lang, "/cookie-policy");
  const updated = lang === "it" ? "Ultimo aggiornamento: 10 settembre 2026" : "Last updated: 10 September 2026";

  if (lang === "en") {
    return (
      <LegalArticle title="Privacy Policy" updated={updated}>
        <p>
          This notice explains how {LEGAL.legalName} processes the personal data of visitors to
          www.laveciamescola.com and of guests who contact the restaurant, in accordance with Regulation (EU)
          2016/679 (GDPR) and Italian Legislative Decree 196/2003.
        </p>
        <LegalSection title="1. Data controller">
          <p>
            {LEGAL.legalName}, {LEGAL.address}, VAT number IT{LEGAL.vat}, REA {LEGAL.rea}. Email:{" "}
            <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>. Phone: {LEGAL.phone}.
          </p>
        </LegalSection>
        <LegalSection title="2. Data we process, purposes and legal bases">
          <ul>
            <li>
              <strong>Browsing data.</strong> The hosting provider records, for security and to keep the service
              running, the IP address, date and time of the request, the pages requested and the browser type. Legal
              basis: the controller's legitimate interest in the security of the site (art. 6(1)(f) GDPR). Kept for
              the technical time needed and, in any case, for no longer than 12 months.
            </li>
            <li>
              <strong>Data you give us when you contact us</strong> by phone, WhatsApp or email: name, phone number,
              email address, date, time and number of guests for a booking, dietary requirements you choose to tell
              us. Legal basis: steps taken at your request before entering a contract and performance of the
              reservation (art. 6(1)(b)). Kept until the booking date and for the administrative time needed
              afterwards, then deleted; accounting records are kept for the periods required by law.
            </li>
            <li>
              <strong>Statistics (Google Analytics 4).</strong> Only if you accept statistics cookies in the banner,
              we collect aggregated data on how the site is used (pages viewed, approximate location, device). Legal
              basis: your consent (art. 6(1)(a)), which you can withdraw at any time from "Cookie preferences" in the
              footer. Details in the <Link href={cookieHref}>Cookie policy</Link>.
            </li>
            <li>
              <strong>Google Maps.</strong> The map on the contact page is loaded only when you click "Show the
              map"; from that moment Google may process your data under its own privacy policy.
            </li>
          </ul>
          <p>We do not carry out profiling or automated decision-making, and we do not sell personal data.</p>
        </LegalSection>
        <LegalSection title="3. Recipients">
          <p>Data may be processed on our behalf by:</p>
          <ul>
            <li>Vercel Inc. (USA), which hosts the website;</li>
            <li>Google Ireland Ltd, for Google Analytics (with consent) and Google Maps (on request);</li>
            <li>Meta Platforms Ireland Ltd, when you choose to contact us via WhatsApp, Instagram or Facebook.</li>
          </ul>
          <p>
            Some of these providers are established in the United States. Transfers take place under the EU-US Data
            Privacy Framework or the Standard Contractual Clauses adopted by the European Commission.
          </p>
        </LegalSection>
        <LegalSection title="4. Your rights">
          <p>
            You may at any time ask for access to your data, rectification, erasure, restriction of processing,
            portability, and you may object to processing based on legitimate interest or withdraw consent (arts.
            15-22 GDPR). Write to <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>. You also have the right to
            lodge a complaint with the Italian supervisory authority, Garante per la protezione dei dati personali (
            <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">
              www.garanteprivacy.it
            </a>
            ).
          </p>
        </LegalSection>
        <LegalSection title="5. Minors and updates">
          <p>
            The site is not aimed at children under 14. This notice may be updated: the date at the top shows the
            current version.
          </p>
        </LegalSection>
      </LegalArticle>
    );
  }

  return (
    <LegalArticle title="Privacy Policy" updated={updated}>
      <p>
        Questa informativa descrive come {LEGAL.legalName} tratta i dati personali di chi visita
        www.laveciamescola.com e di chi contatta il ristorante, ai sensi del Regolamento (UE) 2016/679 (GDPR) e del
        D.Lgs. 196/2003.
      </p>
      <LegalSection title="1. Titolare del trattamento">
        <p>
          {LEGAL.legalName}, {LEGAL.address}, P.IVA {LEGAL.vat}, REA {LEGAL.rea}. Email:{" "}
          <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>. Telefono: {LEGAL.phone}.
        </p>
      </LegalSection>
      <LegalSection title="2. Dati trattati, finalità e basi giuridiche">
        <ul>
          <li>
            <strong>Dati di navigazione.</strong> Il fornitore di hosting registra, per sicurezza e per il
            funzionamento del servizio, l'indirizzo IP, data e ora della richiesta, le pagine richieste e il tipo di
            browser. Base giuridica: legittimo interesse del titolare alla sicurezza del sito (art. 6, par. 1, lett.
            f GDPR). Conservazione: per il tempo tecnico necessario e comunque non oltre 12 mesi.
          </li>
          <li>
            <strong>Dati che ci fornisci contattandoci</strong> per telefono, WhatsApp o email: nome, numero di
            telefono, indirizzo email, data, ora e numero di coperti della prenotazione, eventuali esigenze
            alimentari che scegli di comunicarci. Base giuridica: misure precontrattuali adottate su tua richiesta ed
            esecuzione della prenotazione (art. 6, par. 1, lett. b). Conservazione: fino alla data della prenotazione
            e per il tempo amministrativo successivo, poi cancellazione; i documenti contabili sono conservati per i
            termini di legge.
          </li>
          <li>
            <strong>Statistiche (Google Analytics 4).</strong> Solo se accetti i cookie statistici nel banner,
            raccogliamo dati aggregati sull'uso del sito (pagine viste, area geografica approssimativa, dispositivo).
            Base giuridica: il tuo consenso (art. 6, par. 1, lett. a), revocabile in ogni momento da "Preferenze
            cookie" nel piè di pagina. Dettagli nella <Link href={cookieHref}>Cookie policy</Link>.
          </li>
          <li>
            <strong>Google Maps.</strong> La mappa nella pagina contatti viene caricata solo quando premi "Mostra la
            mappa"; da quel momento Google può trattare i tuoi dati secondo la propria informativa.
          </li>
        </ul>
        <p>Non effettuiamo profilazione né decisioni automatizzate e non vendiamo dati personali.</p>
      </LegalSection>
      <LegalSection title="3. Destinatari">
        <p>I dati possono essere trattati per nostro conto da:</p>
        <ul>
          <li>Vercel Inc. (USA), che ospita il sito web;</li>
          <li>Google Ireland Ltd, per Google Analytics (con consenso) e Google Maps (su richiesta);</li>
          <li>Meta Platforms Ireland Ltd, quando scegli di contattarci tramite WhatsApp, Instagram o Facebook.</li>
        </ul>
        <p>
          Alcuni fornitori hanno sede negli Stati Uniti: i trasferimenti avvengono sulla base dell'EU-US Data Privacy
          Framework o delle Clausole contrattuali standard adottate dalla Commissione europea.
        </p>
      </LegalSection>
      <LegalSection title="4. I tuoi diritti">
        <p>
          Puoi chiedere in ogni momento l'accesso ai tuoi dati, la rettifica, la cancellazione, la limitazione del
          trattamento, la portabilità, opporti al trattamento fondato sul legittimo interesse o revocare il consenso
          (artt. 15-22 GDPR), scrivendo a <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>. Hai inoltre il diritto
          di proporre reclamo al Garante per la protezione dei dati personali (
          <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">
            www.garanteprivacy.it
          </a>
          ).
        </p>
      </LegalSection>
      <LegalSection title="5. Minori e aggiornamenti">
        <p>
          Il sito non è rivolto a minori di 14 anni. L'informativa può essere aggiornata: la data in alto indica la
          versione in vigore.
        </p>
      </LegalSection>
    </LegalArticle>
  );
}
