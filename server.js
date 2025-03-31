// server.js
const express = require('express');
const mercury = require('@postlight/mercury-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing url query parameter.' });
  }

  try {
    const result = await mercury.parse(url);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to parse article.', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Mercury Parser running on port ${PORT}`);
});
