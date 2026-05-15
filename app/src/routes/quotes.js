import express from 'express';
import { getRandomQuote, addQuote } from '../data/quotes.js';

const router = express.Router();

router.get('/getQuote', (req, res) => {
  res.json({ quote: getRandomQuote() });
});

router.post('/setQuote', (req, res) => {
  const { quote } = req.body;

  if (!quote || typeof quote !== 'string') {
    return res.status(400).json({ error: 'A valid quote string is required.' });
  }

  addQuote(quote);
  res.status(201).json({ message: 'Quote added successfully.', quote });
});

export default router;
