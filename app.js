const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { login, createUser } = require('./controllers/usersDB');
const { auth } = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');

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

app.use(cookieParser());

// ! почему bodyParser перечеркнут?
app.use(bodyParser.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/', usersRouterDB);

app.use('/', cardsRouterDB);

app.use('/', noSuchPageRouter);

app.use(errorHandler);

app.listen(PORT, () => {});
