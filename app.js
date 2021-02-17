const express = require('express');
const path = require('path');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const noSuchPageRouter = require('./routes/noSuchPage');

const app = express();

const { PORT = 3000 } = process.env;

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', usersRouter);

app.use('/', cardsRouter);

app.use('/', noSuchPageRouter);

app.listen(PORT, () => {
  console.log(`Слушаем на порту: ${PORT}`);
});
