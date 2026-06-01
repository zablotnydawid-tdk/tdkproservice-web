import React, { useState } from 'react';

const FORM_ACTION =
  import.meta.env.VITE_KODEKS_FORM_URL || 'https://api.tdkproservice.pl/form-analyze';

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    consumption_kwh: '',
    price_per_kwh: '',
    pv_power_kw: '',
    pv_monthly_production_kwh: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const openMailClient = payload => {
    const subject = encodeURIComponent('Zgłoszenie ze strony TDK&ProService');
    const body = encodeURIComponent(
      `Imię: ${payload.name}\nEmail: ${payload.email}\nTelefon: ${payload.phone}\nOpis problemu: ${payload.message}`
    );

    window.location.href = `mailto:kontakt@tdkproservice.pl?subject=${subject}&body=${body}`;
  };

  const handleSubmit = e => {
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      message: form.message.trim(),
      consumption_kwh: form.consumption_kwh,
      price_per_kwh: form.price_per_kwh,
      pv_power_kw: form.pv_power_kw,
      pv_monthly_production_kwh: form.pv_monthly_production_kwh
    };

    if (
      !payload.name ||
      !payload.email ||
      !payload.phone ||
      !payload.message ||
      !payload.consumption_kwh ||
      !payload.price_per_kwh ||
      !payload.pv_power_kw ||
      !payload.pv_monthly_production_kwh
    ) {
      e.preventDefault();
      setStatus('Uzupełnij wymagane pola.');
      return;
    }

    setStatus('Przekierowuję do bezpiecznego zgłoszenia i płatności...');
  };

  return (
    <section className="contact-card">
      <form className="contact-form" method="post" action={FORM_ACTION} onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Imię"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          type="tel"
          placeholder="Telefon"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          name="consumption_kwh"
          type="number"
          min="0"
          step="0.01"
          placeholder="Miesięczne zużycie energii [kWh]"
          value={form.consumption_kwh}
          onChange={handleChange}
          required
        />
        <input
          name="price_per_kwh"
          type="number"
          min="0"
          step="0.01"
          placeholder="Cena energii [zł/kWh]"
          value={form.price_per_kwh}
          onChange={handleChange}
          required
        />
        <input
          name="pv_power_kw"
          type="number"
          min="0"
          step="0.01"
          placeholder="Moc instalacji PV [kWp]"
          value={form.pv_power_kw}
          onChange={handleChange}
          required
        />
        <input
          name="pv_monthly_production_kwh"
          type="number"
          min="0"
          step="0.01"
          placeholder="Miesięczna produkcja PV [kWh]"
          value={form.pv_monthly_production_kwh}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Opis problemu"
          value={form.message}
          onChange={handleChange}
          required
        />
        <button type="submit">
          Wyślij zgłoszenie
        </button>
      </form>
      {status && <p className="form-status">{status}</p>}
      {status && (
        <div className="form-fallback-actions" aria-label="Kontakt alternatywny">
          <button type="button" onClick={() => openMailClient(form)}>
            Wyślij opis mailem
          </button>
          <a href="tel:+48691275254">Zadzwoń: +48 691 275 254</a>
          <a href="https://m.me/dlugi.dlugi.3" rel="noopener noreferrer" target="_blank">
            Messenger
          </a>
        </div>
      )}
    </section>
  );
}
