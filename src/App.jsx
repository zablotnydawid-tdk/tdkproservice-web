import React, { useEffect } from 'react';
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

function usePageMeta({ title, description, pathname }) {
  useEffect(() => {
    document.title = title;
    setMetaTag('description', description);
    setMetaTag('og:title', title, 'property');
    setMetaTag('og:description', description, 'property');
    setMetaTag('og:type', 'website', 'property');
    setMetaTag('og:url', `${siteUrl}${pathname}`, 'property');
    setCanonical(pathname);
  }, [title, description, pathname]);
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
      <a href="mailto:kontakt@tdkproservice.pl">kontakt@tdkproservice.pl</a>
      <a href="tel:+48691275254">+48 691 275 254</a>
      <span>Słupsk | Pomorskie | Polska</span>
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
            href="https://api.tdkproservice.pl"
            rel="noopener noreferrer"
            target="_blank"
          >
            Rozpocznij analizę online
          </a>
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
          <p>Słupsk | Pomorskie | Polska</p>
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

export default function App() {
  const pathname = window.location.pathname.replace(/\/$/, '') || '/';

  if (pathname === '/dawid-zablotny' || pathname === '/o-mnie') {
    return <FounderPage />;
  }

  return <HomePage />;
}
