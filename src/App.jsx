import React, { useEffect, useState } from 'react';
import ContactForm from './ContactForm';

const services = [
  'Audyt WESS instalacji OZE',
  'Diagnostyka PV: stringi, MPPT, falownik, clipping, zacienienie',
  'Pompy ciepĹ‚a: COP, taktowanie, krzywa grzewcza, grzaĹ‚ki',
  'Magazyny energii i systemy hybrydowe',
  'Analiza autokonsumpcji i strat energii',
  'Audyt rozliczeĹ„ energii',
  'Analiza rachunkĂłw i zgodnoĹ›ci z umowÄ…',
  'Identyfikacja bĹ‚Ä™dĂłw systemowych i rozliczeniowych',
  'Raport techniczny po pomiarach',
  'Wsparcie inwestora po problemach z instalacjÄ…'
];

const workflow = [
  'Obserwacja',
  'Dane i pomiary',
  'Hipoteza techniczna',
  'Weryfikacja',
  'Wniosek / raport'
];

const moneySignals = [
  'rachunki nie spadajÄ… mimo dziaĹ‚ajÄ…cej instalacji PV',
  'pompa ciepĹ‚a zuĹĽywa wiÄ™cej energii niĹĽ wynika z oczekiwaĹ„',
  'magazyn energii jest podĹ‚Ä…czony, ale nie poprawia realnej autokonsumpcji',
  'rozliczenie od sprzedawcy energii nie pasuje do danych z falownika'
];

const analysisTriggers = [
  'masz PV, ale nadal pĹ‚acisz zbyt duĹĽo za energiÄ™',
  'falownik nie pokazuje bĹ‚Ä™du, ale produkcja lub rozliczenie budzi wÄ…tpliwoĹ›ci',
  'pompa ciepĹ‚a dziaĹ‚a, lecz koszty ogrzewania sÄ… nieproporcjonalne',
  'chcesz przed reklamacjÄ… uporzÄ…dkowaÄ‡ dane i objawy technicznie'
];

const diagnosticScenarios = [
  {
    title: 'PV dziaĹ‚a, rachunki zostajÄ… wysokie',
    problem: 'Instalacja produkuje energiÄ™, ale klient nie widzi oczekiwanego efektu na kosztach.',
    check: 'PorĂłwnujemy produkcjÄ™, zuĹĽycie, autokonsumpcjÄ™, rozliczenie i moĹĽliwe straty systemowe.'
  },
  {
    title: 'Pompa ciepĹ‚a grzeje, ale pracuje drogo',
    problem: 'UrzÄ…dzenie utrzymuje temperaturÄ™, lecz pobĂłr energii sugeruje bĹ‚Ä™dne ustawienia lub tryb pracy.',
    check: 'Sprawdzamy objawy taktowania, krzywÄ… grzewczÄ…, grzaĹ‚ki i wpĹ‚yw sposobu uĹĽytkowania.'
  },
  {
    title: 'Magazyn energii nie daje efektu',
    problem: 'System hybrydowy jest zamontowany, ale nie poprawia wyraĹşnie bilansu energii.',
    check: 'Analizujemy Ĺ‚adowanie, rozĹ‚adowanie, priorytety pracy i zgodnoĹ›Ä‡ dziaĹ‚ania z celem inwestora.'
  }
];

const contactCtas = [
  {
    href: 'tel:+48691275254',
    label: 'ZadzwoĹ„ teraz',
    variant: 'phone'
  },
  {
    href: 'https://m.me/dlugi.dlugi.3',
    label: 'Napisz na Messengerze',
    variant: 'messenger',
    external: true
  },
  {
    href: 'mailto:kontakt@tdkproservice.pl',
    label: 'kontakt@tdkproservice.pl',
    variant: 'email'
  }
];

const siteUrl = 'https://www.tdkproservice.pl';

const documentTemplates = [
  {
    id: 'falownik-wysokie-napiecie',
    title: 'WyĹ‚Ä…czanie falownika / wysokie napiÄ™cie',
    when: 'Gdy falownik ogranicza moc, rozĹ‚Ä…cza siÄ™ lub pokazuje komunikaty zwiÄ…zane z wysokim napiÄ™ciem sieci.',
    concerns: 'Opisuje objawy pracy instalacji PV i proĹ›bÄ™ o technicznÄ… weryfikacjÄ™ parametrĂłw zasilania.',
    limits: 'Nie przesÄ…dza winy OSD ani instalatora i nie zastÄ™puje pomiarĂłw wykonanych przez uprawnionÄ… osobÄ™.',
    body: `MiejscowoĹ›Ä‡, data: [miejsce i data]

Nadawca:
[imiÄ™ i nazwisko]
[adres]
[numer PPE lub numer klienta, jeĹ›li dotyczy]
[telefon / email]

Adresat:
[nazwa OSD / sprzedawcy / serwisu]
[adres]

Temat: ZgĹ‚oszenie problemu z pracÄ… falownika PV - wysokie napiÄ™cie

DzieĹ„ dobry,

zgĹ‚aszam problem z pracÄ… instalacji fotowoltaicznej pod adresem: [adres instalacji].

Objawy:
- falownik okresowo ogranicza moc lub wyĹ‚Ä…cza siÄ™,
- w aplikacji / historii pracy widoczne sÄ… komunikaty dotyczÄ…ce napiÄ™cia sieci,
- problem wystÄ™puje najczÄ™Ĺ›ciej w godzinach: [godziny],
- problem wystÄ™puje w dniach / warunkach: [opis].

Podstawowe dane instalacji:
- moc instalacji PV: [kWp],
- model falownika: [model],
- data uruchomienia instalacji: [data],
- przyĹ‚Ä…cze: [jednofazowe / trĂłjfazowe].

ProszÄ™ o informacjÄ™, jakie dane naleĹĽy przekazaÄ‡ do dalszej weryfikacji oraz czy moĹĽliwe jest sprawdzenie parametrĂłw napiÄ™cia w punkcie przyĹ‚Ä…czenia.

ZaĹ‚Ä…czniki, jeĹ›li dostÄ™pne:
- zrzuty ekranu z aplikacji falownika,
- lista bĹ‚Ä™dĂłw,
- wykres napiÄ™cia,
- zdjÄ™cie tabliczki znamionowej falownika.

Z powaĹĽaniem,
[imiÄ™ i nazwisko]`
  },
  {
    id: 'sprawdzenie-napiecia-sieci',
    title: 'Wniosek o sprawdzenie napiÄ™cia sieci',
    when: 'Gdy wystÄ™pujÄ… powtarzalne problemy z napiÄ™ciem, wyĹ‚Ä…czaniem falownika lub nietypowÄ… pracÄ… urzÄ…dzeĹ„.',
    concerns: 'PorzÄ…dkuje proĹ›bÄ™ o sprawdzenie parametrĂłw napiÄ™cia w miejscu przyĹ‚Ä…czenia.',
    limits: 'Nie jest ekspertyzÄ… technicznÄ… i nie przesÄ…dza, jaka jest przyczyna problemu.',
    body: `MiejscowoĹ›Ä‡, data: [miejsce i data]

Nadawca:
[imiÄ™ i nazwisko]
[adres]
[numer PPE / numer licznika, jeĹ›li dostÄ™pny]
[telefon / email]

Adresat:
[nazwa OSD]
[adres]

Temat: Wniosek o sprawdzenie parametrĂłw napiÄ™cia sieci

DzieĹ„ dobry,

zwracam siÄ™ z proĹ›bÄ… o sprawdzenie parametrĂłw napiÄ™cia sieci w punkcie poboru energii:
[adres punktu poboru].

PowĂłd zgĹ‚oszenia:
- wystÄ™pujÄ… okresowe problemy z pracÄ… instalacji PV / urzÄ…dzeĹ„ elektrycznych,
- obserwujÄ™ objawy mogÄ…ce wskazywaÄ‡ na podwyĹĽszone lub niestabilne napiÄ™cie,
- problem wystÄ™puje w przybliĹĽeniu: [dni / godziny / warunki].

ProszÄ™ o informacjÄ™, czy moĹĽliwe jest wykonanie kontroli parametrĂłw jakoĹ›ci energii lub wskazanie procedury zgĹ‚oszenia takiej kontroli.

Dane pomocnicze:
- numer PPE: [numer],
- numer licznika: [numer],
- moc instalacji PV: [kWp],
- model falownika: [model],
- przykĹ‚adowe daty wystÄ…pienia problemu: [daty].

Z powaĹĽaniem,
[imiÄ™ i nazwisko]`
  },
  {
    id: 'reklamacja-rozliczenia-energii',
    title: 'Reklamacja rozliczenia energii',
    when: 'Gdy faktura, saldo, energia pobrana/oddana lub rozliczenie prosumenta wyglÄ…da niespĂłjnie.',
    concerns: 'Pomaga rzeczowo opisaÄ‡ rozbieĹĽnoĹ›Ä‡ i poprosiÄ‡ o wyjaĹ›nienie sposobu rozliczenia.',
    limits: 'Nie zastÄ™puje analizy umowy, taryfy ani indywidualnej porady prawnej.',
    body: `MiejscowoĹ›Ä‡, data: [miejsce i data]

Nadawca:
[imiÄ™ i nazwisko]
[adres]
[numer klienta / numer umowy]
[telefon / email]

Adresat:
[nazwa sprzedawcy energii]
[adres]

Temat: ProĹ›ba o wyjaĹ›nienie / reklamacja rozliczenia energii

DzieĹ„ dobry,

proszÄ™ o wyjaĹ›nienie rozliczenia energii dla punktu poboru:
[adres / numer PPE].

WÄ…tpliwoĹ›ci dotyczÄ… faktury / rozliczenia za okres:
[okres rozliczeniowy].

Opis problemu:
- kwota faktury wydaje siÄ™ niespĂłjna z deklarowanym zuĹĽyciem / produkcjÄ…,
- proszÄ™ o wyjaĹ›nienie sposobu uwzglÄ™dnienia energii oddanej i pobranej,
- proszÄ™ o wskazanie, jakie dane z licznika zostaĹ‚y przyjÄ™te do rozliczenia,
- proszÄ™ o informacjÄ™, czy zastosowano wĹ‚aĹ›ciwÄ… taryfÄ™ i warunki umowy.

Dane pomocnicze:
- numer faktury: [numer],
- okres rozliczeniowy: [okres],
- wskazania licznika, jeĹ›li dostÄ™pne: [dane],
- moc instalacji PV, jeĹ›li dotyczy: [kWp].

ProszÄ™ o pisemne wyjaĹ›nienie pozycji rozliczenia oraz wskazanie danych, na podstawie ktĂłrych naliczono kwotÄ™ faktury.

Z powaĹĽaniem,
[imiÄ™ i nazwisko]`
  },
  {
    id: 'weryfikacja-licznika',
    title: 'Wniosek o weryfikacjÄ™ licznika energii',
    when: 'Gdy wskazania licznika, aplikacji lub faktur budzÄ… wÄ…tpliwoĹ›ci i wymagajÄ… uporzÄ…dkowania.',
    concerns: 'Zbiera dane potrzebne do spokojnego zgĹ‚oszenia proĹ›by o sprawdzenie licznika lub odczytĂłw.',
    limits: 'Nie stwierdza uszkodzenia licznika i nie zastÄ™puje procedur operatora.',
    body: `MiejscowoĹ›Ä‡, data: [miejsce i data]

Nadawca:
[imiÄ™ i nazwisko]
[adres]
[numer PPE / numer licznika]
[telefon / email]

Adresat:
[nazwa OSD / sprzedawcy]
[adres]

Temat: Wniosek o weryfikacjÄ™ wskazaĹ„ licznika energii

DzieĹ„ dobry,

proszÄ™ o weryfikacjÄ™ wskazaĹ„ licznika energii dla punktu poboru:
[adres punktu poboru].

PowĂłd zgĹ‚oszenia:
- wskazania licznika / faktury / aplikacji budzÄ… wÄ…tpliwoĹ›ci,
- zauwaĹĽono rozbieĹĽnoĹ›Ä‡ pomiÄ™dzy zuĹĽyciem, produkcjÄ… lub rozliczeniem,
- problem dotyczy okresu: [okres].

ProszÄ™ o informacjÄ™:
- jakie wskazania licznika zostaĹ‚y przyjÄ™te do rozliczenia,
- czy moĹĽliwa jest kontrola poprawnoĹ›ci odczytu,
- czy wymagane sÄ… dodatkowe dokumenty lub zdjÄ™cia licznika.

ZaĹ‚Ä…czniki, jeĹ›li dostÄ™pne:
- zdjÄ™cia licznika,
- faktura,
- zrzuty ekranu z aplikacji,
- historia wskazaĹ„.

Z powaĹĽaniem,
[imiÄ™ i nazwisko]`
  },
  {
    id: 'opis-problemu-serwis-pv',
    title: 'Opis problemu technicznego dla serwisu PV',
    when: 'Gdy trzeba przekazaÄ‡ serwisowi konkretny, uporzÄ…dkowany opis objawĂłw instalacji PV.',
    concerns: 'Pomaga zebraÄ‡ dane o falowniku, objawach, czasie wystÄ™powania i zaĹ‚Ä…cznikach.',
    limits: 'Nie diagnozuje przyczyny problemu i nie zastÄ™puje wizyty serwisowej.',
    body: `MiejscowoĹ›Ä‡, data: [miejsce i data]

ZgĹ‚aszajÄ…cy:
[imiÄ™ i nazwisko]
[adres instalacji]
[telefon / email]

Adresat:
[nazwa serwisu / instalatora]

Temat: Opis problemu technicznego instalacji PV

DzieĹ„ dobry,

proszÄ™ o weryfikacjÄ™ problemu technicznego instalacji PV pod adresem:
[adres instalacji].

Podstawowe dane:
- moc instalacji PV: [kWp],
- model falownika: [model],
- liczba stringĂłw: [liczba],
- data uruchomienia: [data],
- czy instalacja ma magazyn energii: [tak/nie].

Opis objawĂłw:
- co siÄ™ dzieje: [opis],
- od kiedy wystÄ™puje problem: [data],
- jak czÄ™sto wystÄ™puje: [czÄ™stotliwoĹ›Ä‡],
- w jakich godzinach / warunkach: [opis],
- czy pojawiajÄ… siÄ™ komunikaty bĹ‚Ä™dĂłw: [tak/nie, jakie].

ZaĹ‚Ä…czniki:
- zrzuty ekranu z aplikacji,
- zdjÄ™cia falownika / zabezpieczeĹ„,
- historia bĹ‚Ä™dĂłw,
- wykres produkcji,
- zdjÄ™cia licznika, jeĹ›li dotyczy.

ProszÄ™ o informacjÄ™, jakie dane sÄ… jeszcze potrzebne do dalszej diagnostyki.

Z powaĹĽaniem,
[imiÄ™ i nazwisko]`
  }
];

function setMetaTag(name, content, attribute = 'name') {
  let tag = document.head.querySelector(`meta[${attribute}="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setCanonical(pathname) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', `${siteUrl}${pathname}`);
}

function setStructuredData(schema) {
  const id = 'page-structured-data';
  let script = document.getElementById(id);

  if (!schema) {
    if (script) {
      script.remove();
    }
    return;
  }

  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schema);
}

function usePageMeta({ title, description, pathname, keywords, schema }) {
  useEffect(() => {
    document.title = title;
    setMetaTag('description', description);
    if (keywords) {
      setMetaTag('keywords', keywords);
    }
    setMetaTag('og:title', title, 'property');
    setMetaTag('og:description', description, 'property');
    setMetaTag('og:type', 'website', 'property');
    setMetaTag('og:url', `${siteUrl}${pathname}`, 'property');
    setCanonical(pathname);
    setStructuredData(schema);
  }, [title, description, pathname, keywords, schema]);
}

function ContactCtas({ className = '' }) {
  return (
    <div className={`contact-ctas ${className}`.trim()} aria-label="Szybki kontakt">
      {contactCtas.map((cta) => (
        <a
          className={`contact-cta contact-cta--${cta.variant}`}
          href={cta.href}
          key={cta.href}
          rel={cta.external ? 'noopener noreferrer' : undefined}
          target={cta.external ? '_blank' : undefined}
        >
          {cta.label}
        </a>
      ))}
    </div>
  );
}

function ContactSectionLinks() {
  return (
    <div className="contact-links" aria-label="Kontakt bezpoĹ›redni">
      <a className="contact-link contact-link--phone" href="tel:+48691275254">+48 691 275 254</a>
      <a className="contact-link contact-link--messenger" href="https://m.me/dlugi.dlugi.3" rel="noopener noreferrer" target="_blank">
        Messenger jako szybka wiadomoĹ›Ä‡
      </a>
      <a className="contact-link contact-link--email" href="mailto:kontakt@tdkproservice.pl">kontakt@tdkproservice.pl</a>
      <p className="contact-fallback">
        W przypadku problemĂłw z dostarczeniem wiadomoĹ›ci prosimy o kontakt telefoniczny lub Messenger.
      </p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <strong>TDK&ProService Dawid ZabĹ‚otny</strong>
      <a href="/dawid-zablotny">Dawid ZabĹ‚otny - autor i wĹ‚aĹ›ciciel</a>
      <a href="/wzory-pism">Wzory pism i zgĹ‚oszeĹ„</a>
      <a href="mailto:kontakt@tdkproservice.pl">kontakt@tdkproservice.pl</a>
      <a href="tel:+48691275254">+48 691 275 254</a>
      <span>SĹ‚upsk / DarĹ‚owo | Pomorskie | Polska</span>
    </footer>
  );
}

function HomePage() {
  usePageMeta({
    title: 'TDK&ProService | Diagnostyka OZE i Audyt RozliczeĹ„ Energii',
    description: 'Diagnostyka instalacji PV, pomp ciepĹ‚a, magazynĂłw energii oraz audyt rozliczeĹ„ energii. TDK&ProService Dawid ZabĹ‚otny.',
    pathname: '/'
  });

  return (
    <main className="site-shell">
      <section className="hero" id="top">
        <div className="hero__content">
          <p className="eyebrow">Diagnostyka techniczna energii</p>
          <h1>TDK&ProService</h1>
          <p className="hero__subtitle">Diagnostyka systemowa OZE, pomp ciepĹ‚a i magazynĂłw energii</p>
          <p className="hero__lead">
            Nie zgadujemy. Sprawdzamy. Instalacja moĹĽe dziaĹ‚aÄ‡, a jednoczeĹ›nie generowaÄ‡ straty.
            Dlatego analizujemy caĹ‚y ukĹ‚ad: projekt, montaĹĽ, konfiguracjÄ™, sieÄ‡, sterowanie i sposĂłb uĹĽytkowania.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#kontakt">ZgĹ‚oĹ› instalacjÄ™ do analizy</a>
            <a className="button button--secondary" href="#zakres">Zobacz zakres pracy</a>
          </div>
          <ContactCtas className="contact-ctas--hero" />
          <p className="contact-note">Odpowiadamy moĹĽliwie szybko. Pilne sprawy najlepiej telefonicznie.</p>
          <p className="contact-fallback contact-fallback--hero">
            JeĹ›li nie otrzymasz odpowiedzi mailowej, skontaktuj siÄ™ telefonicznie lub przez Messenger.
          </p>
        </div>
        <div className="hero__panel" aria-label="Obszary diagnostyki">
          <span>PV</span>
          <span>Pompy ciepĹ‚a</span>
          <span>Magazyny energii</span>
          <span>Rozliczenia</span>
        </div>
      </section>

      <section className="section section--problem">
        <div className="section__header">
          <p className="eyebrow">Problem rynku</p>
          <h2>Instalacja dziaĹ‚a â‰  dziaĹ‚a poprawnie</h2>
        </div>
        <p className="large-copy">
          Brak bĹ‚Ä™du na falowniku nie oznacza braku strat. Pompa ciepĹ‚a moĹĽe grzaÄ‡, ale pracowaÄ‡
          nieefektywnie. Magazyn energii moĹĽe byÄ‡ podĹ‚Ä…czony, ale Ĺşle wykorzystany. Rachunki mogÄ…
          siÄ™ nie zgadzaÄ‡ mimo poprawnej pracy urzÄ…dzeĹ„.
        </p>
      </section>

      <section className="section money-section">
        <div className="section__header">
          <p className="eyebrow">Koszty i straty</p>
          <h2>Problem czÄ™sto widaÄ‡ dopiero na rachunku</h2>
          <p>
            UrzÄ…dzenie moĹĽe pracowaÄ‡, aplikacja moĹĽe pokazywaÄ‡ produkcjÄ™, a mimo tego system nadal
            generuje koszty. Dlatego patrzymy nie tylko na sprzÄ™t, ale teĹĽ na bilans energii,
            rozliczenie, ustawienia i sposĂłb uĹĽytkowania.
          </p>
        </div>
        <div className="signal-grid">
          {moneySignals.map((signal) => (
            <article className="signal-card" key={signal}>
              <span className="service-card__marker" />
              <p>{signal}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section decision-section">
        <div className="decision-panel">
          <div>
            <p className="eyebrow">Kiedy sprawdziÄ‡ system</p>
            <h2>Kiedy warto zrobiÄ‡ analizÄ™ online</h2>
            <p>
              WstÄ™pna analiza pomaga uporzÄ…dkowaÄ‡ objawy, liczby i kierunek dalszej diagnostyki
              zanim podejmiesz rozmowÄ™ z serwisem, instalatorem, sprzedawcÄ… energii albo operatorem.
            </p>
          </div>
          <div className="decision-list">
            {analysisTriggers.map((trigger) => (
              <p key={trigger}>{trigger}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section scenarios-section">
        <div className="section__header">
          <p className="eyebrow">Scenariusze diagnostyczne</p>
          <h2>Co realnie sprawdzamy</h2>
          <p>
            Bez wskazywania winnych na starcie. Najpierw porzÄ…dkujemy objawy, dane i zaleĹĽnoĹ›ci,
            a dopiero pĂłĹşniej wskazujemy moĹĽliwe przyczyny strat.
          </p>
        </div>
        <div className="scenario-grid">
          {diagnosticScenarios.map((scenario) => (
            <article className="scenario-card" key={scenario.title}>
              <h3>{scenario.title}</h3>
              <p><strong>Problem:</strong> {scenario.problem}</p>
              <p><strong>Sprawdzamy:</strong> {scenario.check}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="zakres">
        <div className="section__header">
          <p className="eyebrow">Zakres techniczny</p>
          <h2>Zakres pracy</h2>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service}>
              <span className="service-card__marker" />
              <p>{service}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section online-analysis-section">
        <div className="online-analysis-card">
          <div className="online-analysis-card__content">
            <p className="eyebrow">Raport techniczny online</p>
            <h2>Analiza kosztĂłw energii online</h2>
            <p>
              WypeĹ‚nij formularz i wygeneruj wstÄ™pny raport techniczny dotyczÄ…cy kosztĂłw energii,
              pracy instalacji PV i moĹĽliwych strat.
            </p>
            <p>
              Raport PDF generowany jest automatycznie na podstawie danych wejĹ›ciowych i moĹĽe
              stanowiÄ‡ pierwszy etap peĹ‚nej diagnostyki technicznej.
            </p>
          </div>
          <a
            className="button button--primary online-analysis-card__button"
            href="/analiza-online"
          >
            Rozpocznij analizÄ™ online
          </a>
        </div>
      </section>

      <section className="section online-analysis-section">
        <div className="online-analysis-card document-entry-card">
          <div className="online-analysis-card__content">
            <p className="eyebrow">Dokumenty praktyczne</p>
            <h2>Praktyczne wzory pism</h2>
            <p>
              Masz problem z wyĹ‚Ä…czaniem falownika, wysokim napiÄ™ciem albo rozliczeniem energii?
              PrzygotowaliĹ›my spokojne wzory zgĹ‚oszeĹ„, ktĂłre pomagajÄ… opisaÄ‡ problem technicznie
              i bez chaosu.
            </p>
            <ul className="document-entry-list">
              <li>zgĹ‚oszenie wyĹ‚Ä…czania falownika / wysokiego napiÄ™cia,</li>
              <li>wniosek o sprawdzenie napiÄ™cia sieci,</li>
              <li>reklamacja rozliczenia energii.</li>
            </ul>
          </div>
          <div className="document-entry-actions">
            <a className="button button--primary online-analysis-card__button" href="/wzory-pism">
              Zobacz wzory pism
            </a>
            <a className="contact-link contact-link--small" href="/strefa-dokumentow">
              Strefa dokumentĂłw
            </a>
          </div>
        </div>
      </section>

      <section className="section expert-section">
        <div>
          <p className="eyebrow">Ekspert</p>
          <h2>Kim jest Dawid ZabĹ‚otny</h2>
        </div>
        <div className="expert-section__content">
          <p>
            Dawid ZabĹ‚otny specjalizuje siÄ™ w analizie rzeczywistej pracy instalacji OZE oraz
            weryfikacji rozliczeĹ„ energii. ĹÄ…czy diagnostykÄ™ instalacji PV, falownikĂłw, magazynĂłw
            energii LiFePO4 i termowizjÄ™ z analizÄ… danych pomiÄ™dzy licznikiem, operatorem sieci
            i sprzedawcÄ… energii.
          </p>
          <a className="contact-link contact-link--small" href="/dawid-zablotny">
            WiÄ™cej o autorze i metodyce TDK&ProService
          </a>
          <blockquote>
            JeĹ›li instalacja dziaĹ‚a, a rachunki siÄ™ nie zgadzajÄ… â€” problem moĹĽe nie byÄ‡ w sprzÄ™cie.
            Problem moĹĽe byÄ‡ w systemie.
          </blockquote>
        </div>
      </section>

      <section className="section media-section">
        <div className="media-card">
          <div>
            <p className="eyebrow">Media</p>
            <h2>W mediach</h2>
          </div>
          <div className="media-card__content">
            <p>
              Dawid ZabĹ‚otny byĹ‚ cytowany jako ekspert w ogĂłlnopolskim portalu Fakt.pl w temacie
              problemĂłw rynku fotowoltaiki i realnych doĹ›wiadczeĹ„ uĹĽytkownikĂłw.
            </p>
            <a
              className="button button--secondary media-card__button"
              href="https://www.fakt.pl/pieniadze/nie-tylko-przemyslaw-czarnek-rozczarowany-fotowoltaika-na-to-skarza-sie-ludzie/g6y4crj"
              rel="noopener noreferrer"
              target="_blank"
            >
              Zobacz publikacjÄ™
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <p className="eyebrow">Metodyka</p>
          <h2>Jak pracujemy</h2>
          <p>
            Decyzje techniczne powinny wynikaÄ‡ z danych, nie z narracji. Nie wskazujemy winnych.
            Oceniamy ukĹ‚ad, zaleĹĽnoĹ›ci i skutki.
          </p>
        </div>
        <div className="timeline">
          {workflow.map((step, index) => (
            <article className="timeline-card" key={step}>
              <span>{index + 1}</span>
              <h3>{step}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="section contact-section" id="kontakt">
        <div className="section__header">
          <p className="eyebrow">Kontakt</p>
          <h2>ZgĹ‚oĹ› instalacjÄ™ do analizy</h2>
          <p>
            Opisz typ instalacji, objawy, falownik lub pompÄ™, lokalizacjÄ™ i dostÄ™pne dane.
            Odezwiemy siÄ™ z informacjÄ…, jakie dane bÄ™dÄ… potrzebne do dalszej weryfikacji.
          </p>
          <p className="contact-note">Odpowiadamy moĹĽliwie szybko. Pilne sprawy najlepiej telefonicznie.</p>
          <p className="contact-fallback">
            JeĹ›li nie otrzymasz odpowiedzi mailowej, skontaktuj siÄ™ telefonicznie lub przez Messenger.
          </p>
          <ContactSectionLinks />
        </div>
        <ContactForm />
      </section>

      <Footer />
    </main>
  );
}

function FounderPage() {
  usePageMeta({
    title: 'Dawid ZabĹ‚otny - diagnostyka OZE i TDK&ProService',
    description: 'Dawid ZabĹ‚otny, wĹ‚aĹ›ciciel TDK&ProService. Diagnostyka instalacji PV, pomp ciepĹ‚a, magazynĂłw energii i rozliczeĹ„ energii.',
    pathname: '/dawid-zablotny'
  });

  return (
    <main className="site-shell">
      <section className="author-hero">
        <div>
          <p className="eyebrow">Autor i wĹ‚aĹ›ciciel</p>
          <h1>Dawid ZabĹ‚otny</h1>
          <p className="hero__subtitle">TDK&ProService - diagnostyka techniczna energii</p>
          <p className="hero__lead">
            Za TDK&ProService stoi praktyka terenowa i analiza rzeczywistych przypadkĂłw: instalacji
            PV, pomp ciepĹ‚a, magazynĂłw energii oraz rozliczeĹ„ energii. Celem pracy nie jest efektowna
            obietnica, tylko sprawdzenie, czy ukĹ‚ad dziaĹ‚a logicznie i gdzie mogÄ… powstawaÄ‡ straty.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="/#kontakt">Skontaktuj siÄ™</a>
            <a className="button button--secondary" href="/">WrĂłÄ‡ do strony gĹ‚Ăłwnej</a>
          </div>
        </div>
        <aside className="author-card" aria-label="Profil TDK&ProService">
          <span>TDK&ProService</span>
          <strong>Dawid ZabĹ‚otny</strong>
          <p>SĹ‚upsk / DarĹ‚owo | Pomorskie | Polska</p>
          <p>PV | Pompy ciepĹ‚a | Magazyny energii | Rozliczenia</p>
        </aside>
      </section>

      <section className="section author-method">
        <div>
          <p className="eyebrow">Metodyka</p>
          <h2>Obserwacja â†’ dane â†’ weryfikacja â†’ wniosek</h2>
        </div>
        <div className="author-method__content">
          <p>
            TDK&ProService zaczyna od objawĂłw i danych: zuĹĽycia energii, produkcji PV, faktur,
            ustawieĹ„ urzÄ…dzeĹ„, historii pracy instalacji i informacji od uĹĽytkownika. Dopiero potem
            powstaje hipoteza techniczna i wskazanie, co trzeba sprawdziÄ‡ dalej.
          </p>
          <p>
            WstÄ™pne raporty online KODEKS sÄ… screeningiem kierunkowym. Nie zastÄ™pujÄ… peĹ‚nej
            diagnostyki technicznej, pomiarĂłw, oglÄ™dzin ani opinii rzeczoznawczej.
          </p>
        </div>
      </section>

      <section className="section author-section">
        <div className="section__header">
          <p className="eyebrow">Zakres pracy</p>
          <h2>Obszary diagnostyki</h2>
        </div>
        <div className="trust-grid">
          <article className="trust-card">
            <h3>Instalacje PV</h3>
            <p>Analiza produkcji, falownikĂłw, stringĂłw, MPPT, clippingu, zacienienia i dopasowania instalacji do zuĹĽycia.</p>
          </article>
          <article className="trust-card">
            <h3>Pompy ciepĹ‚a</h3>
            <p>Ocena objawĂłw pracy: taktowanie, grzaĹ‚ki, krzywa grzewcza, ustawienia i wpĹ‚yw sposobu uĹĽytkowania na koszty.</p>
          </article>
          <article className="trust-card">
            <h3>Magazyny energii</h3>
            <p>Weryfikacja roli magazynu w autokonsumpcji, sterowaniu i ograniczaniu kosztĂłw utraconej energii.</p>
          </article>
          <article className="trust-card">
            <h3>Rozliczenia energii</h3>
            <p>PorĂłwnanie faktur, profilu zuĹĽycia, produkcji i moĹĽliwych ĹşrĂłdeĹ‚ rozbieĹĽnoĹ›ci miÄ™dzy pracÄ… systemu a kosztami.</p>
          </article>
        </div>
      </section>

      <section className="section media-section">
        <div className="media-card">
          <div>
            <p className="eyebrow">Media / Publikacje</p>
            <h2>Wzmianki i materiaĹ‚y</h2>
          </div>
          <div className="media-card__content">
            <p>
              Dawid ZabĹ‚otny byĹ‚ cytowany jako ekspert w ogĂłlnopolskim portalu Fakt.pl w temacie
              problemĂłw rynku fotowoltaiki i doĹ›wiadczeĹ„ uĹĽytkownikĂłw. Kolejne publikacje i wzmianki
              mogÄ… byÄ‡ dodawane w tej sekcji bez zmiany charakteru strony.
            </p>
            <div className="publication-list">
              <a
                className="publication-item"
                href="https://www.fakt.pl/pieniadze/nie-tylko-przemyslaw-czarnek-rozczarowany-fotowoltaika-na-to-skarza-sie-ludzie/g6y4crj"
                rel="noopener noreferrer"
                target="_blank"
              >
                Fakt.pl - wypowiedĹş ekspercka o rynku fotowoltaiki
              </a>
              <span className="publication-item publication-item--placeholder">Miejsce na przyszĹ‚e publikacje</span>
              <span className="publication-item publication-item--placeholder">Miejsce na wzmianki medialne</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section author-section">
        <div className="section__header">
          <p className="eyebrow">Zasady komunikacji</p>
          <h2>Bez obietnic bez danych</h2>
          <p>
            TDK&ProService nie obiecuje oszczÄ™dnoĹ›ci bez analizy danych i nie nazywa prostego
            formularza peĹ‚nym audytem. JeĹĽeli dostÄ™pne sÄ… tylko dane podstawowe, wynik jest
            traktowany jako sygnaĹ‚ kierunkowy i pierwszy etap rozmowy technicznej.
          </p>
        </div>
      </section>

      <section className="section contact-section" id="kontakt">
        <div className="section__header">
          <p className="eyebrow">Kontakt</p>
          <h2>Kontakt z TDK&ProService</h2>
          <p>
            JeĹ›li chcesz sprawdziÄ‡ instalacjÄ™, rachunki albo wstÄ™pny raport KODEKS, opisz krĂłtko
            sytuacjÄ™ i dostÄ™pne dane. Pilne sprawy najlepiej kierowaÄ‡ telefonicznie lub przez Messenger.
          </p>
          <ContactSectionLinks />
        </div>
        <ContactForm />
      </section>

      <Footer />
    </main>
  );
}

function DocumentTemplateCard({ template }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');

  const copyTemplate = async () => {
    try {
      await navigator.clipboard.writeText(template.body);
      setCopyStatus('Skopiowano treĹ›Ä‡ wzoru.');
    } catch {
      setCopyStatus('Nie udaĹ‚o siÄ™ skopiowaÄ‡ automatycznie. Zaznacz treĹ›Ä‡ rÄ™cznie.');
      setIsOpen(true);
    }
  };

  return (
    <article className="document-card">
      <div className="document-card__header">
        <div>
          <p className="eyebrow">WzĂłr pisma</p>
          <h3>{template.title}</h3>
        </div>
      </div>
      <dl className="document-meta">
        <div>
          <dt>Kiedy uĹĽyÄ‡</dt>
          <dd>{template.when}</dd>
        </div>
        <div>
          <dt>Czego dotyczy</dt>
          <dd>{template.concerns}</dd>
        </div>
        <div>
          <dt>Czego nie gwarantuje</dt>
          <dd>{template.limits}</dd>
        </div>
      </dl>
      <div className="document-actions">
        <button type="button" className="button button--secondary" onClick={() => setIsOpen((value) => !value)}>
          {isOpen ? 'Ukryj wzĂłr' : 'PokaĹĽ wzĂłr'}
        </button>
        <button type="button" className="button button--primary" onClick={copyTemplate}>
          Kopiuj treĹ›Ä‡
        </button>
      </div>
      {copyStatus && <p className="copy-status">{copyStatus}</p>}
      {isOpen && <pre className="template-preview">{template.body}</pre>}
    </article>
  );
}

function DocumentsPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Czy wzory pism TDK&ProService sÄ… poradÄ… prawnÄ…?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nie. Wzory majÄ… charakter techniczno-informacyjny i pomagajÄ… uporzÄ…dkowaÄ‡ opis problemu. Nie zastÄ™pujÄ… porady prawnej ani analizy konkretnej sprawy.'
        }
      },
      {
        '@type': 'Question',
        name: 'Czy wzĂłr trzeba dostosowaÄ‡ do swojej sytuacji?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tak. KaĹĽdy wzĂłr zawiera miejsca na dane klienta, numer PPE, opis objawĂłw i zaĹ‚Ä…czniki. TreĹ›Ä‡ naleĹĽy dopasowaÄ‡ do rzeczywistych danych.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do czego sĹ‚uĹĽÄ… wzory pism OZE i energii?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SĹ‚uĹĽÄ… do spokojnego opisania problemĂłw takich jak wysokie napiÄ™cie, wyĹ‚Ä…czanie falownika, reklamacja rozliczenia energii, weryfikacja licznika lub zgĹ‚oszenie do serwisu PV.'
        }
      }
    ]
  };

  usePageMeta({
    title: 'Wzory pism OZE, OSD i energia | TDK&ProService',
    description: 'Praktyczne wzory pism dotyczÄ…ce OZE, OSD, wysokiego napiÄ™cia, falownika, reklamacji energii i licznika. MateriaĹ‚y techniczno-informacyjne TDK&ProService.',
    pathname: '/wzory-pism',
    keywords: 'OSD, falownik, wysokie napiÄ™cie, reklamacja energii, licznik energii, wzĂłr pisma OZE, instalacja PV',
    schema: faqSchema
  });

  return (
    <main className="site-shell">
      <section className="documents-hero">
        <div>
          <p className="eyebrow">Strefa dokumentĂłw</p>
          <h1>Wzory pism dla spraw OZE i energii</h1>
          <p className="hero__subtitle">Spokojne formularze do uporzÄ…dkowania problemu technicznego</p>
          <p className="hero__lead">
            PoniĹĽsze wzory pomagajÄ… opisaÄ‡ problem, zebraÄ‡ dane i przygotowaÄ‡ rzeczowÄ… komunikacjÄ™
            z OSD, sprzedawcÄ… energii lub serwisem PV. Nie sÄ… poradÄ… prawnÄ…, nie zastÄ™pujÄ… peĹ‚nej
            diagnostyki i wymagajÄ… dostosowania do konkretnej sytuacji.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#wzory">Zobacz wzory</a>
            <a className="button button--secondary" href="/">WrĂłÄ‡ do strony gĹ‚Ăłwnej</a>
          </div>
        </div>
        <aside className="documents-note" aria-label="Informacja o zakresie wzorĂłw">
          <strong>Zakres</strong>
          <p>Techniczno-informacyjne wzory do opisania problemu.</p>
          <p>Bez automatycznych decyzji, bez agresywnych roszczeĹ„, bez udawania porady prawnej.</p>
        </aside>
      </section>

      <section className="section documents-intro">
        <div className="section__header">
          <p className="eyebrow">Jak korzystaÄ‡</p>
          <h2>Najpierw dane, potem wysyĹ‚ka</h2>
        </div>
        <div className="documents-rules">
          <article>
            <h3>UzupeĹ‚nij konkrety</h3>
            <p>Wpisz adres, numer PPE, okres rozliczeniowy, model falownika, daty i objawy.</p>
          </article>
          <article>
            <h3>Dodaj zaĹ‚Ä…czniki</h3>
            <p>Zrzuty ekranu, faktury, zdjÄ™cia licznika i historia bĹ‚Ä™dĂłw pomagajÄ… ograniczyÄ‡ chaos.</p>
          </article>
          <article>
            <h3>Zachowaj spokojny ton</h3>
            <p>Rzeczowy opis problemu zwykle dziaĹ‚a lepiej niĹĽ emocjonalne oskarĹĽenia.</p>
          </article>
        </div>
      </section>

      <section className="section" id="wzory">
        <div className="section__header">
          <p className="eyebrow">Biblioteka</p>
          <h2>Podstawowe wzory</h2>
          <p>
            KaĹĽdy wzĂłr moĹĽna podejrzeÄ‡ albo skopiowaÄ‡. Przed wysĹ‚aniem sprawdĹş dane, usuĹ„ puste
            pola i dopasuj opis do swojej sytuacji.
          </p>
        </div>
        <div className="document-list">
          {documentTemplates.map((template) => (
            <DocumentTemplateCard key={template.id} template={template} />
          ))}
        </div>
      </section>

      <section className="section contact-section" id="kontakt">
        <div className="section__header">
          <p className="eyebrow">Wsparcie</p>
          <h2>Nie wiesz, ktĂłre pismo wybraÄ‡?</h2>
          <p>
            JeĹ›li problem dotyczy pracy instalacji, napiÄ™cia, rozliczeĹ„ lub licznika, moĹĽesz opisaÄ‡
            sytuacjÄ™. TDK&ProService pomoĹĽe uporzÄ…dkowaÄ‡ dane potrzebne do dalszej diagnostyki.
          </p>
          <ContactSectionLinks />
        </div>
        <ContactForm />
      </section>

      <Footer />
    </main>
  );
}

function KodeksOnlinePage() {
  usePageMeta({
    title: 'WstÄ™pna ocena systemu OZE | TDK&ProService KODEKS',
    description: 'WstÄ™pna ocena systemu OZE za 149,99 zĹ‚. Screening techniczno-energetyczny na podstawie danych uĹĽytkownika, obsĹ‚ugiwany przez system KODEKS.',
    pathname: '/analiza-online',
    keywords: 'wstÄ™pna ocena OZE, analiza kosztĂłw energii, screening PV, KODEKS, TDK&ProService, raport PDF OZE'
  });

  return (
    <main className="site-shell">
      <section className="kodeks-hero">
        <div>
          <p className="eyebrow">KODEKS online</p>
          <h1>WstÄ™pna ocena systemu OZE</h1>
          <p className="hero__subtitle">Screening techniczno-energetyczny na podstawie danych uĹĽytkownika</p>
          <p className="hero__lead">
            Wprowadzasz podstawowe dane o zuĹĽyciu energii, cenie energii i pracy instalacji PV.
            System przygotowuje wstÄ™pny PDF z przeliczeniem kosztĂłw i kierunkowÄ… interpretacjÄ….
          </p>
          <div className="hero__actions">
            <a
              className="button button--primary"
              href="https://api.tdkproservice.pl"
              rel="noopener noreferrer"
              target="_blank"
            >
              Rozpocznij wstÄ™pnÄ… ocenÄ™
            </a>
            <a className="button button--secondary" href="/">
              WrĂłÄ‡ do strony gĹ‚Ăłwnej
            </a>
          </div>
        </div>
        <aside className="kodeks-price-card" aria-label="Cena wstÄ™pnej oceny KODEKS">
          <span>WstÄ™pna ocena KODEKS</span>
          <strong>149,99 zĹ‚</strong>
          <p>PDF z podstawowym przeliczeniem kosztĂłw, interpretacjÄ… kierunkowÄ… i listÄ… obszarĂłw do dalszej weryfikacji.</p>
        </aside>
      </section>

      <section className="section kodeks-section">
        <div className="section__header">
          <p className="eyebrow">Zakres</p>
          <h2>Co obejmuje analiza</h2>
        </div>
        <div className="trust-grid">
          <article className="trust-card">
            <h3>Dane wejĹ›ciowe</h3>
            <p>ZuĹĽycie miesiÄ™czne, cena energii, moc instalacji PV i miesiÄ™czna produkcja PV.</p>
          </article>
          <article className="trust-card">
            <h3>Podstawowe przeliczenie</h3>
            <p>PorĂłwnanie kosztu energii przed i po uwzglÄ™dnieniu deklarowanej produkcji PV.</p>
          </article>
          <article className="trust-card">
            <h3>Interpretacja kierunkowa</h3>
            <p>Wskazanie, czy dane sugerujÄ… obszary wymagajÄ…ce dalszego sprawdzenia.</p>
          </article>
          <article className="trust-card">
            <h3>PDF dla zgĹ‚oszenia</h3>
            <p>Raport generowany przez system KODEKS dziaĹ‚ajÄ…cy w tle.</p>
          </article>
        </div>
      </section>

      <section className="section author-method">
        <div>
          <p className="eyebrow">WaĹĽne</p>
          <h2>To nie jest peĹ‚ny audyt techniczny</h2>
        </div>
        <div className="author-method__content">
          <p>
            Wynik opiera siÄ™ na danych wpisanych w formularzu i ma charakter wstÄ™pny. PeĹ‚na
            diagnostyka wymaga faktur, danych z falownika, historii pracy instalacji, sposobu
            zuĹĽycia energii i czasem pomiarĂłw lub oglÄ™dzin.
          </p>
          <p>
            Formularz i PDF obsĹ‚ugiwane sÄ… przez system KODEKS dziaĹ‚ajÄ…cy w tle. Dla klienta
            najwaĹĽniejszy jest prosty proces: dane, pĹ‚atnoĹ›Ä‡, PDF i dalszy kontakt, jeĹ›li wynik
            wymaga wyjaĹ›nienia.
          </p>
        </div>
      </section>

      <section className="section online-analysis-section">
        <div className="online-analysis-card">
          <div className="online-analysis-card__content">
            <p className="eyebrow">Start</p>
            <h2>PrzejdĹş do formularza KODEKS</h2>
            <p>
              Po klikniÄ™ciu przejdziesz do bezpiecznego formularza obsĹ‚ugiwanego przez system
              KODEKS. Po uzupeĹ‚nieniu danych zgĹ‚oszenie zostanie zapisane w procesie KODEKS.
            </p>
          </div>
          <a
            className="button button--primary online-analysis-card__button"
            href="https://api.tdkproservice.pl"
            rel="noopener noreferrer"
            target="_blank"
          >
            Rozpocznij wstÄ™pnÄ… ocenÄ™
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function App() {
  const pathname = window.location.pathname.replace(/\/$/, '') || '/';

  if (pathname === '/analiza-online' || pathname === '/kodeks') {
    return <KodeksOnlinePage />;
  }

  if (pathname === '/dawid-zablotny' || pathname === '/o-mnie') {
    return <FounderPage />;
  }

  if (pathname === '/wzory-pism' || pathname === '/strefa-dokumentow') {
    return <DocumentsPage />;
  }

  return <HomePage />;
}

