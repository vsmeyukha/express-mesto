const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const noSuchPageRouter = require('./routes/noSuchPage');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const { PORT = 3000 } = process.env;

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', usersRouter);

app.use('/', cardsRouter);

app.use('/', noSuchPageRouter);

app.listen(PORT, () => {});
