import React, { useEffect, useState } from 'react';
import ContactForm from './ContactForm';

const services = [
  'Audyt WESS instalacji OZE',
  'Diagnostyka PV: stringi, MPPT, falownik, clipping, zacienienie',
  'Pompy ciepła: COP, taktowanie, krzywa grzewcza, grzałki',
  'Magazyny energii i systemy hybrydowe',
  'Analiza autokonsumpcji i strat energii',
  'Audyt rozliczeń energii',
  'Analiza rachunków i zgodności z umową',
  'Identyfikacja błędów systemowych i rozliczeniowych',
  'Raport techniczny po pomiarach',
  'Wsparcie inwestora po problemach z instalacją'
];

const workflow = [
  'Obserwacja',
  'Dane i pomiary',
  'Hipoteza techniczna',
  'Weryfikacja',
  'Wniosek / raport'
];

const moneySignals = [
  'rachunki nie spadają mimo działającej instalacji PV',
  'pompa ciepła zużywa więcej energii niż wynika z oczekiwań',
  'magazyn energii jest podłączony, ale nie poprawia realnej autokonsumpcji',
  'rozliczenie od sprzedawcy energii nie pasuje do danych z falownika'
];

const analysisTriggers = [
  'masz PV, ale nadal płacisz zbyt dużo za energię',
  'falownik nie pokazuje błędu, ale produkcja lub rozliczenie budzi wątpliwości',
  'pompa ciepła działa, lecz koszty ogrzewania są nieproporcjonalne',
  'chcesz przed reklamacją uporządkować dane i objawy technicznie'
];

const diagnosticScenarios = [
  {
    title: 'PV działa, rachunki zostają wysokie',
    problem: 'Instalacja produkuje energię, ale klient nie widzi oczekiwanego efektu na kosztach.',
    check: 'Porównujemy produkcję, zużycie, autokonsumpcję, rozliczenie i możliwe straty systemowe.'
  },
  {
    title: 'Pompa ciepła grzeje, ale pracuje drogo',
    problem: 'Urządzenie utrzymuje temperaturę, lecz pobór energii sugeruje błędne ustawienia lub tryb pracy.',
    check: 'Sprawdzamy objawy taktowania, krzywą grzewczą, grzałki i wpływ sposobu użytkowania.'
  },
  {
    title: 'Magazyn energii nie daje efektu',
    problem: 'System hybrydowy jest zamontowany, ale nie poprawia wyraźnie bilansu energii.',
    check: 'Analizujemy ładowanie, rozładowanie, priorytety pracy i zgodność działania z celem inwestora.'
  }
];

const contactCtas = [
  {
    href: 'tel:+48691275254',
    label: 'Zadzwoń teraz',
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
    title: 'Wyłączanie falownika / wysokie napięcie',
    when: 'Gdy falownik ogranicza moc, rozłącza się lub pokazuje komunikaty związane z wysokim napięciem sieci.',
    concerns: 'Opisuje objawy pracy instalacji PV i prośbę o techniczną weryfikację parametrów zasilania.',
    limits: 'Nie przesądza winy OSD ani instalatora i nie zastępuje pomiarów wykonanych przez uprawnioną osobę.',
    body: `Miejscowość, data: [miejsce i data]

Nadawca:
[imię i nazwisko]
[adres]
[numer PPE lub numer klienta, jeśli dotyczy]
[telefon / email]

Adresat:
[nazwa OSD / sprzedawcy / serwisu]
[adres]

Temat: Zgłoszenie problemu z pracą falownika PV - wysokie napięcie

Dzień dobry,

zgłaszam problem z pracą instalacji fotowoltaicznej pod adresem: [adres instalacji].

Objawy:
- falownik okresowo ogranicza moc lub wyłącza się,
- w aplikacji / historii pracy widoczne są komunikaty dotyczące napięcia sieci,
- problem występuje najczęściej w godzinach: [godziny],
- problem występuje w dniach / warunkach: [opis].

Podstawowe dane instalacji:
- moc instalacji PV: [kWp],
- model falownika: [model],
- data uruchomienia instalacji: [data],
- przyłącze: [jednofazowe / trójfazowe].

Proszę o informację, jakie dane należy przekazać do dalszej weryfikacji oraz czy możliwe jest sprawdzenie parametrów napięcia w punkcie przyłączenia.

Załączniki, jeśli dostępne:
- zrzuty ekranu z aplikacji falownika,
- lista błędów,
- wykres napięcia,
- zdjęcie tabliczki znamionowej falownika.

Z poważaniem,
[imię i nazwisko]`
  },
  {
    id: 'sprawdzenie-napiecia-sieci',
    title: 'Wniosek o sprawdzenie napięcia sieci',
    when: 'Gdy występują powtarzalne problemy z napięciem, wyłączaniem falownika lub nietypową pracą urządzeń.',
    concerns: 'Porządkuje prośbę o sprawdzenie parametrów napięcia w miejscu przyłączenia.',
    limits: 'Nie jest ekspertyzą techniczną i nie przesądza, jaka jest przyczyna problemu.',
    body: `Miejscowość, data: [miejsce i data]

Nadawca:
[imię i nazwisko]
[adres]
[numer PPE / numer licznika, jeśli dostępny]
[telefon / email]

Adresat:
[nazwa OSD]
[adres]

Temat: Wniosek o sprawdzenie parametrów napięcia sieci

Dzień dobry,

zwracam się z prośbą o sprawdzenie parametrów napięcia sieci w punkcie poboru energii:
[adres punktu poboru].

Powód zgłoszenia:
- występują okresowe problemy z pracą instalacji PV / urządzeń elektrycznych,
- obserwuję objawy mogące wskazywać na podwyższone lub niestabilne napięcie,
- problem występuje w przybliżeniu: [dni / godziny / warunki].

Proszę o informację, czy możliwe jest wykonanie kontroli parametrów jakości energii lub wskazanie procedury zgłoszenia takiej kontroli.

Dane pomocnicze:
- numer PPE: [numer],
- numer licznika: [numer],
- moc instalacji PV: [kWp],
- model falownika: [model],
- przykładowe daty wystąpienia problemu: [daty].

Z poważaniem,
[imię i nazwisko]`
  },
  {
    id: 'reklamacja-rozliczenia-energii',
    title: 'Reklamacja rozliczenia energii',
    when: 'Gdy faktura, saldo, energia pobrana/oddana lub rozliczenie prosumenta wygląda niespójnie.',
    concerns: 'Pomaga rzeczowo opisać rozbieżność i poprosić o wyjaśnienie sposobu rozliczenia.',
    limits: 'Nie zastępuje analizy umowy, taryfy ani indywidualnej porady prawnej.',
    body: `Miejscowość, data: [miejsce i data]

Nadawca:
[imię i nazwisko]
[adres]
[numer klienta / numer umowy]
[telefon / email]

Adresat:
[nazwa sprzedawcy energii]
[adres]

Temat: Prośba o wyjaśnienie / reklamacja rozliczenia energii

Dzień dobry,

proszę o wyjaśnienie rozliczenia energii dla punktu poboru:
[adres / numer PPE].

Wątpliwości dotyczą faktury / rozliczenia za okres:
[okres rozliczeniowy].

Opis problemu:
- kwota faktury wydaje się niespójna z deklarowanym zużyciem / produkcją,
- proszę o wyjaśnienie sposobu uwzględnienia energii oddanej i pobranej,
- proszę o wskazanie, jakie dane z licznika zostały przyjęte do rozliczenia,
- proszę o informację, czy zastosowano właściwą taryfę i warunki umowy.

Dane pomocnicze:
- numer faktury: [numer],
- okres rozliczeniowy: [okres],
- wskazania licznika, jeśli dostępne: [dane],
- moc instalacji PV, jeśli dotyczy: [kWp].

Proszę o pisemne wyjaśnienie pozycji rozliczenia oraz wskazanie danych, na podstawie których naliczono kwotę faktury.

Z poważaniem,
[imię i nazwisko]`
  },
  {
    id: 'weryfikacja-licznika',
    title: 'Wniosek o weryfikację licznika energii',
    when: 'Gdy wskazania licznika, aplikacji lub faktur budzą wątpliwości i wymagają uporządkowania.',
    concerns: 'Zbiera dane potrzebne do spokojnego zgłoszenia prośby o sprawdzenie licznika lub odczytów.',
    limits: 'Nie stwierdza uszkodzenia licznika i nie zastępuje procedur operatora.',
    body: `Miejscowość, data: [miejsce i data]

Nadawca:
[imię i nazwisko]
[adres]
[numer PPE / numer licznika]
[telefon / email]

Adresat:
[nazwa OSD / sprzedawcy]
[adres]

Temat: Wniosek o weryfikację wskazań licznika energii

Dzień dobry,

proszę o weryfikację wskazań licznika energii dla punktu poboru:
[adres punktu poboru].

Powód zgłoszenia:
- wskazania licznika / faktury / aplikacji budzą wątpliwości,
- zauważono rozbieżność pomiędzy zużyciem, produkcją lub rozliczeniem,
- problem dotyczy okresu: [okres].

Proszę o informację:
- jakie wskazania licznika zostały przyjęte do rozliczenia,
- czy możliwa jest kontrola poprawności odczytu,
- czy wymagane są dodatkowe dokumenty lub zdjęcia licznika.

Załączniki, jeśli dostępne:
- zdjęcia licznika,
- faktura,
- zrzuty ekranu z aplikacji,
- historia wskazań.

Z poważaniem,
[imię i nazwisko]`
  },
  {
    id: 'opis-problemu-serwis-pv',
    title: 'Opis problemu technicznego dla serwisu PV',
    when: 'Gdy trzeba przekazać serwisowi konkretny, uporządkowany opis objawów instalacji PV.',
    concerns: 'Pomaga zebrać dane o falowniku, objawach, czasie występowania i załącznikach.',
    limits: 'Nie diagnozuje przyczyny problemu i nie zastępuje wizyty serwisowej.',
    body: `Miejscowość, data: [miejsce i data]

Zgłaszający:
[imię i nazwisko]
[adres instalacji]
[telefon / email]

Adresat:
[nazwa serwisu / instalatora]

Temat: Opis problemu technicznego instalacji PV

Dzień dobry,

proszę o weryfikację problemu technicznego instalacji PV pod adresem:
[adres instalacji].

Podstawowe dane:
- moc instalacji PV: [kWp],
- model falownika: [model],
- liczba stringów: [liczba],
- data uruchomienia: [data],
- czy instalacja ma magazyn energii: [tak/nie].

Opis objawów:
- co się dzieje: [opis],
- od kiedy występuje problem: [data],
- jak często występuje: [częstotliwość],
- w jakich godzinach / warunkach: [opis],
- czy pojawiają się komunikaty błędów: [tak/nie, jakie].

Załączniki:
- zrzuty ekranu z aplikacji,
- zdjęcia falownika / zabezpieczeń,
- historia błędów,
- wykres produkcji,
- zdjęcia licznika, jeśli dotyczy.

Proszę o informację, jakie dane są jeszcze potrzebne do dalszej diagnostyki.

Z poważaniem,
[imię i nazwisko]`
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
    <div className="contact-links" aria-label="Kontakt bezpośredni">
      <a className="contact-link contact-link--phone" href="tel:+48691275254">+48 691 275 254</a>
      <a className="contact-link contact-link--messenger" href="https://m.me/dlugi.dlugi.3" rel="noopener noreferrer" target="_blank">
        Messenger jako szybka wiadomość
      </a>
      <a className="contact-link contact-link--email" href="mailto:kontakt@tdkproservice.pl">kontakt@tdkproservice.pl</a>
      <p className="contact-fallback">
        W przypadku problemów z dostarczeniem wiadomości prosimy o kontakt telefoniczny lub Messenger.
      </p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <strong>TDK&ProService Dawid Zabłotny</strong>
      <a href="/dawid-zablotny">Dawid Zabłotny - autor i właściciel</a>
      <a href="/wzory-pism">Wzory pism i zgłoszeń</a>
      <a href="mailto:kontakt@tdkproservice.pl">kontakt@tdkproservice.pl</a>
      <a href="tel:+48691275254">+48 691 275 254</a>
      <span>Słupsk / Darłowo | Pomorskie | Polska</span>
    </footer>
  );
}

function HomePage() {
  usePageMeta({
    title: 'TDK&ProService | Diagnostyka OZE i Audyt Rozliczeń Energii',
    description: 'Diagnostyka instalacji PV, pomp ciepła, magazynów energii oraz audyt rozliczeń energii. TDK&ProService Dawid Zabłotny.',
    pathname: '/'
  });

  return (
    <main className="site-shell">
      <section className="hero" id="top">
        <div className="hero__content">
          <p className="eyebrow">Diagnostyka techniczna energii</p>
          <h1>TDK&ProService</h1>
          <p className="hero__subtitle">Diagnostyka systemowa OZE, pomp ciepła i magazynów energii</p>
          <p className="hero__lead">
            Nie zgadujemy. Sprawdzamy. Instalacja może działać, a jednocześnie generować straty.
            Dlatego analizujemy cały układ: projekt, montaż, konfigurację, sieć, sterowanie i sposób użytkowania.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#kontakt">Zgłoś instalację do analizy</a>
            <a className="button button--secondary" href="#zakres">Zobacz zakres pracy</a>
          </div>
          <ContactCtas className="contact-ctas--hero" />
          <p className="contact-note">Odpowiadamy możliwie szybko. Pilne sprawy najlepiej telefonicznie.</p>
          <p className="contact-fallback contact-fallback--hero">
            Jeśli nie otrzymasz odpowiedzi mailowej, skontaktuj się telefonicznie lub przez Messenger.
          </p>
        </div>
        <div className="hero__panel" aria-label="Obszary diagnostyki">
          <span>PV</span>
          <span>Pompy ciepła</span>
          <span>Magazyny energii</span>
          <span>Rozliczenia</span>
        </div>
      </section>

      <section className="section section--problem">
        <div className="section__header">
          <p className="eyebrow">Problem rynku</p>
          <h2>Instalacja działa ≠ działa poprawnie</h2>
        </div>
        <p className="large-copy">
          Brak błędu na falowniku nie oznacza braku strat. Pompa ciepła może grzać, ale pracować
          nieefektywnie. Magazyn energii może być podłączony, ale źle wykorzystany. Rachunki mogą
          się nie zgadzać mimo poprawnej pracy urządzeń.
        </p>
      </section>

      <section className="section money-section">
        <div className="section__header">
          <p className="eyebrow">Koszty i straty</p>
          <h2>Problem często widać dopiero na rachunku</h2>
          <p>
            Urządzenie może pracować, aplikacja może pokazywać produkcję, a mimo tego system nadal
            generuje koszty. Dlatego patrzymy nie tylko na sprzęt, ale też na bilans energii,
            rozliczenie, ustawienia i sposób użytkowania.
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
            <p className="eyebrow">Kiedy sprawdzić system</p>
            <h2>Kiedy warto zrobić analizę online</h2>
            <p>
              Wstępna analiza pomaga uporządkować objawy, liczby i kierunek dalszej diagnostyki
              zanim podejmiesz rozmowę z serwisem, instalatorem, sprzedawcą energii albo operatorem.
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
            Bez wskazywania winnych na starcie. Najpierw porządkujemy objawy, dane i zależności,
            a dopiero później wskazujemy możliwe przyczyny strat.
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
            <h2>Analiza kosztów energii online</h2>
            <p>
              Wypełnij formularz i wygeneruj wstępny raport techniczny dotyczący kosztów energii,
              pracy instalacji PV i możliwych strat.
            </p>
            <p>
              Raport PDF generowany jest automatycznie na podstawie danych wejściowych i może
              stanowić pierwszy etap pełnej diagnostyki technicznej.
            </p>
          </div>
          <a
            className="button button--primary online-analysis-card__button"
            href="/analiza-online"
          >
            Rozpocznij analizę online
          </a>
        </div>
      </section>

      <section className="section online-analysis-section">
        <div className="online-analysis-card document-entry-card">
          <div className="online-analysis-card__content">
            <p className="eyebrow">Dokumenty praktyczne</p>
            <h2>Praktyczne wzory pism</h2>
            <p>
              Masz problem z wyłączaniem falownika, wysokim napięciem albo rozliczeniem energii?
              Przygotowaliśmy spokojne wzory zgłoszeń, które pomagają opisać problem technicznie
              i bez chaosu.
            </p>
            <ul className="document-entry-list">
              <li>zgłoszenie wyłączania falownika / wysokiego napięcia,</li>
              <li>wniosek o sprawdzenie napięcia sieci,</li>
              <li>reklamacja rozliczenia energii.</li>
            </ul>
          </div>
          <div className="document-entry-actions">
            <a className="button button--primary online-analysis-card__button" href="/wzory-pism">
              Zobacz wzory pism
            </a>
            <a className="contact-link contact-link--small" href="/strefa-dokumentow">
              Strefa dokumentów
            </a>
          </div>
        </div>
      </section>

      <section className="section expert-section">
        <div>
          <p className="eyebrow">Ekspert</p>
          <h2>Kim jest Dawid Zabłotny</h2>
        </div>
        <div className="expert-section__content">
          <p>
            Dawid Zabłotny specjalizuje się w analizie rzeczywistej pracy instalacji OZE oraz
            weryfikacji rozliczeń energii. Łączy diagnostykę instalacji PV, falowników, magazynów
            energii LiFePO4 i termowizję z analizą danych pomiędzy licznikiem, operatorem sieci
            i sprzedawcą energii.
          </p>
          <a className="contact-link contact-link--small" href="/dawid-zablotny">
            Więcej o autorze i metodyce TDK&ProService
          </a>
          <blockquote>
            Jeśli instalacja działa, a rachunki się nie zgadzają — problem może nie być w sprzęcie.
            Problem może być w systemie.
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
              Dawid Zabłotny był cytowany jako ekspert w ogólnopolskim portalu Fakt.pl w temacie
              problemów rynku fotowoltaiki i realnych doświadczeń użytkowników.
            </p>
            <a
              className="button button--secondary media-card__button"
              href="https://www.fakt.pl/pieniadze/nie-tylko-przemyslaw-czarnek-rozczarowany-fotowoltaika-na-to-skarza-sie-ludzie/g6y4crj"
              rel="noopener noreferrer"
              target="_blank"
            >
              Zobacz publikację
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <p className="eyebrow">Metodyka</p>
          <h2>Jak pracujemy</h2>
          <p>
            Decyzje techniczne powinny wynikać z danych, nie z narracji. Nie wskazujemy winnych.
            Oceniamy układ, zależności i skutki.
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
          <h2>Zgłoś instalację do analizy</h2>
          <p>
            Opisz typ instalacji, objawy, falownik lub pompę, lokalizację i dostępne dane.
            Odezwiemy się z informacją, jakie dane będą potrzebne do dalszej weryfikacji.
          </p>
          <p className="contact-note">Odpowiadamy możliwie szybko. Pilne sprawy najlepiej telefonicznie.</p>
          <p className="contact-fallback">
            Jeśli nie otrzymasz odpowiedzi mailowej, skontaktuj się telefonicznie lub przez Messenger.
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
    title: 'Dawid Zabłotny - diagnostyka OZE i TDK&ProService',
    description: 'Dawid Zabłotny, właściciel TDK&ProService. Diagnostyka instalacji PV, pomp ciepła, magazynów energii i rozliczeń energii.',
    pathname: '/dawid-zablotny'
  });

  return (
    <main className="site-shell">
      <section className="author-hero">
        <div>
          <p className="eyebrow">Autor i właściciel</p>
          <h1>Dawid Zabłotny</h1>
          <p className="hero__subtitle">TDK&ProService - diagnostyka techniczna energii</p>
          <p className="hero__lead">
            Za TDK&ProService stoi praktyka terenowa i analiza rzeczywistych przypadków: instalacji
            PV, pomp ciepła, magazynów energii oraz rozliczeń energii. Celem pracy nie jest efektowna
            obietnica, tylko sprawdzenie, czy układ działa logicznie i gdzie mogą powstawać straty.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="/#kontakt">Skontaktuj się</a>
            <a className="button button--secondary" href="/">Wróć do strony głównej</a>
          </div>
        </div>
        <aside className="author-card" aria-label="Profil TDK&ProService">
          <span>TDK&ProService</span>
          <strong>Dawid Zabłotny</strong>
          <p>Słupsk / Darłowo | Pomorskie | Polska</p>
          <p>PV | Pompy ciepła | Magazyny energii | Rozliczenia</p>
        </aside>
      </section>

      <section className="section author-method">
        <div>
          <p className="eyebrow">Metodyka</p>
          <h2>Obserwacja → dane → weryfikacja → wniosek</h2>
        </div>
        <div className="author-method__content">
          <p>
            TDK&ProService zaczyna od objawów i danych: zużycia energii, produkcji PV, faktur,
            ustawień urządzeń, historii pracy instalacji i informacji od użytkownika. Dopiero potem
            powstaje hipoteza techniczna i wskazanie, co trzeba sprawdzić dalej.
          </p>
          <p>
            Wstępne raporty online KODEKS są screeningiem kierunkowym. Nie zastępują pełnej
            diagnostyki technicznej, pomiarów, oględzin ani opinii rzeczoznawczej.
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
            <p>Analiza produkcji, falowników, stringów, MPPT, clippingu, zacienienia i dopasowania instalacji do zużycia.</p>
          </article>
          <article className="trust-card">
            <h3>Pompy ciepła</h3>
            <p>Ocena objawów pracy: taktowanie, grzałki, krzywa grzewcza, ustawienia i wpływ sposobu użytkowania na koszty.</p>
          </article>
          <article className="trust-card">
            <h3>Magazyny energii</h3>
            <p>Weryfikacja roli magazynu w autokonsumpcji, sterowaniu i ograniczaniu kosztów utraconej energii.</p>
          </article>
          <article className="trust-card">
            <h3>Rozliczenia energii</h3>
            <p>Porównanie faktur, profilu zużycia, produkcji i możliwych źródeł rozbieżności między pracą systemu a kosztami.</p>
          </article>
        </div>
      </section>

      <section className="section media-section">
        <div className="media-card">
          <div>
            <p className="eyebrow">Media / Publikacje</p>
            <h2>Wzmianki i materiały</h2>
          </div>
          <div className="media-card__content">
            <p>
              Dawid Zabłotny był cytowany jako ekspert w ogólnopolskim portalu Fakt.pl w temacie
              problemów rynku fotowoltaiki i doświadczeń użytkowników. Kolejne publikacje i wzmianki
              mogą być dodawane w tej sekcji bez zmiany charakteru strony.
            </p>
            <div className="publication-list">
              <a
                className="publication-item"
                href="https://www.fakt.pl/pieniadze/nie-tylko-przemyslaw-czarnek-rozczarowany-fotowoltaika-na-to-skarza-sie-ludzie/g6y4crj"
                rel="noopener noreferrer"
                target="_blank"
              >
                Fakt.pl - wypowiedź ekspercka o rynku fotowoltaiki
              </a>
              <span className="publication-item publication-item--placeholder">Miejsce na przyszłe publikacje</span>
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
            TDK&ProService nie obiecuje oszczędności bez analizy danych i nie nazywa prostego
            formularza pełnym audytem. Jeżeli dostępne są tylko dane podstawowe, wynik jest
            traktowany jako sygnał kierunkowy i pierwszy etap rozmowy technicznej.
          </p>
        </div>
      </section>

      <section className="section contact-section" id="kontakt">
        <div className="section__header">
          <p className="eyebrow">Kontakt</p>
          <h2>Kontakt z TDK&ProService</h2>
          <p>
            Jeśli chcesz sprawdzić instalację, rachunki albo wstępny raport KODEKS, opisz krótko
            sytuację i dostępne dane. Pilne sprawy najlepiej kierować telefonicznie lub przez Messenger.
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
      setCopyStatus('Skopiowano treść wzoru.');
    } catch {
      setCopyStatus('Nie udało się skopiować automatycznie. Zaznacz treść ręcznie.');
      setIsOpen(true);
    }
  };

  return (
    <article className="document-card">
      <div className="document-card__header">
        <div>
          <p className="eyebrow">Wzór pisma</p>
          <h3>{template.title}</h3>
        </div>
      </div>
      <dl className="document-meta">
        <div>
          <dt>Kiedy użyć</dt>
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
          {isOpen ? 'Ukryj wzór' : 'Pokaż wzór'}
        </button>
        <button type="button" className="button button--primary" onClick={copyTemplate}>
          Kopiuj treść
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
        name: 'Czy wzory pism TDK&ProService są poradą prawną?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nie. Wzory mają charakter techniczno-informacyjny i pomagają uporządkować opis problemu. Nie zastępują porady prawnej ani analizy konkretnej sprawy.'
        }
      },
      {
        '@type': 'Question',
        name: 'Czy wzór trzeba dostosować do swojej sytuacji?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tak. Każdy wzór zawiera miejsca na dane klienta, numer PPE, opis objawów i załączniki. Treść należy dopasować do rzeczywistych danych.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do czego służą wzory pism OZE i energii?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Służą do spokojnego opisania problemów takich jak wysokie napięcie, wyłączanie falownika, reklamacja rozliczenia energii, weryfikacja licznika lub zgłoszenie do serwisu PV.'
        }
      }
    ]
  };

  usePageMeta({
    title: 'Wzory pism OZE, OSD i energia | TDK&ProService',
    description: 'Praktyczne wzory pism dotyczące OZE, OSD, wysokiego napięcia, falownika, reklamacji energii i licznika. Materiały techniczno-informacyjne TDK&ProService.',
    pathname: '/wzory-pism',
    keywords: 'OSD, falownik, wysokie napięcie, reklamacja energii, licznik energii, wzór pisma OZE, instalacja PV',
    schema: faqSchema
  });

  return (
    <main className="site-shell">
      <section className="documents-hero">
        <div>
          <p className="eyebrow">Strefa dokumentów</p>
          <h1>Wzory pism dla spraw OZE i energii</h1>
          <p className="hero__subtitle">Spokojne formularze do uporządkowania problemu technicznego</p>
          <p className="hero__lead">
            Poniższe wzory pomagają opisać problem, zebrać dane i przygotować rzeczową komunikację
            z OSD, sprzedawcą energii lub serwisem PV. Nie są poradą prawną, nie zastępują pełnej
            diagnostyki i wymagają dostosowania do konkretnej sytuacji.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#wzory">Zobacz wzory</a>
            <a className="button button--secondary" href="/">Wróć do strony głównej</a>
          </div>
        </div>
        <aside className="documents-note" aria-label="Informacja o zakresie wzorów">
          <strong>Zakres</strong>
          <p>Techniczno-informacyjne wzory do opisania problemu.</p>
          <p>Bez automatycznych decyzji, bez agresywnych roszczeń, bez udawania porady prawnej.</p>
        </aside>
      </section>

      <section className="section documents-intro">
        <div className="section__header">
          <p className="eyebrow">Jak korzystać</p>
          <h2>Najpierw dane, potem wysyłka</h2>
        </div>
        <div className="documents-rules">
          <article>
            <h3>Uzupełnij konkrety</h3>
            <p>Wpisz adres, numer PPE, okres rozliczeniowy, model falownika, daty i objawy.</p>
          </article>
          <article>
            <h3>Dodaj załączniki</h3>
            <p>Zrzuty ekranu, faktury, zdjęcia licznika i historia błędów pomagają ograniczyć chaos.</p>
          </article>
          <article>
            <h3>Zachowaj spokojny ton</h3>
            <p>Rzeczowy opis problemu zwykle działa lepiej niż emocjonalne oskarżenia.</p>
          </article>
        </div>
      </section>

      <section className="section" id="wzory">
        <div className="section__header">
          <p className="eyebrow">Biblioteka</p>
          <h2>Podstawowe wzory</h2>
          <p>
            Każdy wzór można podejrzeć albo skopiować. Przed wysłaniem sprawdź dane, usuń puste
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
          <h2>Nie wiesz, które pismo wybrać?</h2>
          <p>
            Jeśli problem dotyczy pracy instalacji, napięcia, rozliczeń lub licznika, możesz opisać
            sytuację. TDK&ProService pomoże uporządkować dane potrzebne do dalszej diagnostyki.
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
    title: 'Wstępna ocena systemu OZE | TDK&ProService KODEKS',
    description: 'Wstępna ocena systemu OZE za 39,99 zł. Screening techniczno-energetyczny na podstawie danych użytkownika, obsługiwany przez system KODEKS.',
    pathname: '/analiza-online',
    keywords: 'wstępna ocena OZE, analiza kosztów energii, screening PV, KODEKS, TDK&ProService, raport PDF OZE'
  });

  return (
    <main className="site-shell">
      <section className="kodeks-hero">
        <div>
          <p className="eyebrow">KODEKS online</p>
          <h1>Wstępna ocena systemu OZE</h1>
          <p className="hero__subtitle">Screening techniczno-energetyczny na podstawie danych użytkownika</p>
          <p className="hero__lead">
            Wprowadzasz podstawowe dane o zużyciu energii, cenie energii i pracy instalacji PV.
            System przygotowuje wstępny PDF z przeliczeniem kosztów i kierunkową interpretacją.
          </p>
          <div className="hero__actions">
            <a
              className="button button--primary"
              href="https://api.tdkproservice.pl"
              rel="noopener noreferrer"
              target="_blank"
            >
              Rozpocznij wstępną ocenę
            </a>
            <a className="button button--secondary" href="/">
              Wróć do strony głównej
            </a>
          </div>
        </div>
        <aside className="kodeks-price-card" aria-label="Cena wstępnej oceny KODEKS">
          <span>Wstępna ocena KODEKS</span>
          <strong>39,99 zł</strong>
          <p>PDF z podstawowym przeliczeniem kosztów, interpretacją kierunkową i listą obszarów do dalszej weryfikacji.</p>
        </aside>
      </section>

      <section className="section kodeks-section">
        <div className="section__header">
          <p className="eyebrow">Zakres</p>
          <h2>Co obejmuje analiza</h2>
        </div>
        <div className="trust-grid">
          <article className="trust-card">
            <h3>Dane wejściowe</h3>
            <p>Zużycie miesięczne, cena energii, moc instalacji PV i miesięczna produkcja PV.</p>
          </article>
          <article className="trust-card">
            <h3>Podstawowe przeliczenie</h3>
            <p>Porównanie kosztu energii przed i po uwzględnieniu deklarowanej produkcji PV.</p>
          </article>
          <article className="trust-card">
            <h3>Interpretacja kierunkowa</h3>
            <p>Wskazanie, czy dane sugerują obszary wymagające dalszego sprawdzenia.</p>
          </article>
          <article className="trust-card">
            <h3>PDF dla zgłoszenia</h3>
            <p>Raport generowany przez system KODEKS działający w tle.</p>
          </article>
        </div>
      </section>

      <section className="section author-method">
        <div>
          <p className="eyebrow">Ważne</p>
          <h2>To nie jest pełny audyt techniczny</h2>
        </div>
        <div className="author-method__content">
          <p>
            Wynik opiera się na danych wpisanych w formularzu i ma charakter wstępny. Pełna
            diagnostyka wymaga faktur, danych z falownika, historii pracy instalacji, sposobu
            zużycia energii i czasem pomiarów lub oględzin.
          </p>
          <p>
            Formularz i PDF obsługiwane są przez system KODEKS działający w tle. Dla klienta
            najważniejszy jest prosty proces: dane, płatność, PDF i dalszy kontakt, jeśli wynik
            wymaga wyjaśnienia.
          </p>
        </div>
      </section>

      <section className="section online-analysis-section">
        <div className="online-analysis-card">
          <div className="online-analysis-card__content">
            <p className="eyebrow">Start</p>
            <h2>Przejdź do formularza KODEKS</h2>
            <p>
              Po kliknięciu przejdziesz do bezpiecznego formularza obsługiwanego przez system
              KODEKS. Po uzupełnieniu danych zgłoszenie zostanie zapisane w procesie KODEKS.
            </p>
          </div>
          <a
            className="button button--primary online-analysis-card__button"
            href="https://api.tdkproservice.pl"
            rel="noopener noreferrer"
            target="_blank"
          >
            Rozpocznij wstępną ocenę
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
