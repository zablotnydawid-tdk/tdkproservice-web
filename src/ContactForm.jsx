import React, { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const openMailClient = payload => {
    const subject = encodeURIComponent('Zgłoszenie instalacji do analizy');
    const body = encodeURIComponent(
      `Imię i nazwisko: ${payload.name}\nEmail: ${payload.email}\n\nWiadomość:\n${payload.message}`
    );

    window.location.href = `mailto:kontakt@tdkproservice.pl?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim()
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus('Uzupełnij wymagane pola.');
      return;
    }

    openMailClient(payload);
    setStatus('Dziękujemy. Zgłoszenie zostało przygotowane w programie pocztowym.');
  };

  return (
    <section className="contact-card">
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Imię i nazwisko"
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
        <textarea
          name="message"
          placeholder="Typ instalacji, objawy, lokalizacja, dostępne dane"
          value={form.message}
          onChange={handleChange}
          required
        />
        <button type="submit">
          Wyślij zgłoszenie
        </button>
      </form>
      {status && <p className="form-status">{status}</p>}
    </section>
  );
}
