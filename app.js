const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const noSuchPageRouter = require('./routes/noSuchPage');

// ! импортируем роутер взаимодействия с базой пользователей
const usersRouterDB = require('./routes/usersDB');

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const { PORT = 3000 } = process.env;

app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', usersRouter);

app.use('/', usersRouterDB);

app.use('/', cardsRouter);

app.use('/', noSuchPageRouter);

app.listen(PORT, () => {});
