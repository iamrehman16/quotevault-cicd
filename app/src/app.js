import express from 'express';
import dotenv from 'dotenv';
import quotesRouter from './routes/quotes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is healthy' });
});
app.use('/', quotesRouter);

export default app;
