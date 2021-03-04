const mongoose = require('mongoose');
const user = require('./user');

const ownerSchema = new mongoose.Schema({
  type: mongoose.Schema.Types.ObjectId,
  ref: 'user',
  required: true,
});

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regex = /https?:\/\/[w{3}.]?[\S^а-яё]/gi; // ? экранируем оба слэша. далее к пути: получается, что \S ищет вообще все, кроме пробелов. значит, он нам подходит для поиска цифр, латинских букв и разных символов. но нам не нужны кириллические буквы. значит, мы их исключаем с помощью карета.
        return regex.test(v);
      },
      message: 'Ссылка на изображение недействительна!',
    },
  },
  owner: ownerSchema,
  likes: [ownerSchema], // ! у массивов дефолтное значение - пустой массив, это не нужно прописывать
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
