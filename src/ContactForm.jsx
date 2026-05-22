import React, { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const openMailClient = payload => {
    const subject = encodeURIComponent('Zgłoszenie ze strony TDK&ProService');
    const body = encodeURIComponent(
      `Imię: ${payload.name}\nEmail: ${payload.email}\nTelefon: ${payload.phone}\nOpis problemu: ${payload.message}`
    );

    window.location.href = `mailto:kontakt@tdkproservice.pl?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      message: form.message.trim()
    };

    if (!payload.name || !payload.email || !payload.phone || !payload.message) {
      setStatus('Uzupełnij wymagane pola.');
      return;
    }

    openMailClient(payload);
    setStatus(
      'Zgłoszenie zostało przygotowane do wysyłki. Jeśli nie otrzymasz odpowiedzi, skontaktuj się telefonicznie lub przez Messenger.'
    );
  };

  return (
    <section className="contact-card">
      <form className="contact-form" onSubmit={handleSubmit}>
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
          <a href="tel:+48691275254">Zadzwoń: +48 691 275 254</a>
          <a href="https://m.me/dlugi.dlugi.3" rel="noopener noreferrer" target="_blank">
            Messenger
          </a>
        </div>
      )}
    </section>
  );
}
