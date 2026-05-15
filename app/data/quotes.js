export const defaultQuotes = [
  "The only limit to our realization of tomorrow is our doubts of today.",
  "Do not wait to strike till the iron is hot; but make it hot by striking.",
  "Life is 10% what happens to us and 90% how we react to it.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Believe you can and you're halfway there.",
  "Act as if what you do makes a difference. It does.",
  "The only way to do great work is to love what you do.",
  "The best time to plant a tree was 20 years ago. The second best time is now.",
  "You miss 100% of the shots you don’t take.",
  "Change your life today. Don't gamble on the future, act now, without delay.",
];

export let quotes = [...defaultQuotes];

export const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

export const addQuote = (quote) => {
  quotes.push(quote);
  return quote;
};

export const resetQuotes = () => {
  quotes = [...defaultQuotes];
};
