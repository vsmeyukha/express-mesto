const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const noSuchPageRouter = require('./routes/noSuchPage');

// ! импортируем роутер взаимодействия с базой пользователей
const usersRouterDB = require('./routes/usersDB');

// ! импортируем роутер взаимодействия с базой карточек
const cardsRouterDB = require('./routes/cardsDB');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => console.log('Подключено к базе данных'));

app.use(helmet());

// ! почему bodyParser перечеркнут?
app.use(bodyParser.json());

// ! почему такой код добавляет айдишник к каждому запросу?
// ! не написано же res.send и далее по тексту.просто объявлено.
// ! тем более, как мы можем прописывать на бэке, каким должен быть req ???
app.use((req, res, next) => {
  req.user = {
    _id: '60408bf9e910ee3a814fde4c', // вставьте сюда _id созданного в предыдущем пункте пользователя 60408bf9e910ee3a814fde4c
  };

  next();
});

app.use('/', usersRouterDB);

app.use('/', cardsRouterDB);

app.use('/', noSuchPageRouter);

app.listen(PORT, () => {});
