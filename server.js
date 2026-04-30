const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// API: kontakt
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Kontakt od:', name, email, message);
  // TODO: wysyłka maila
  res.json({ success: true, message: 'Dziękujemy za wiadomość!' });
});

// serwowanie plików z builda
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server działa na porcie ${PORT}`));
