const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const noSuchPageRouter = require('./routes/noSuchPage');

// ! импортируем роутер взаимодействия с базой пользователей
const usersRouterDB = require('./routes/usersDB');

// ! импортируем роутер взаимодей=ствия с базой карточек
const cardsRouterDB = require('./routes/cardsDB');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => console.log('Подключено к базе данных'));

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '60408bf9e910ee3a814fde4c', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use('/', usersRouterDB);

app.use('/', cardsRouterDB);

app.use('/', noSuchPageRouter);

app.listen(PORT, () => {});
