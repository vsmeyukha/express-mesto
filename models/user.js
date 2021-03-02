const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    milength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regex = /https?:\/\/[w{3}.]?[\S^а-яё]/gi; // ? экранируем оба слэша. далее к пути: получается, что \S ищет вообще все, кроме пробелов. значит, он нам подходит для поиска цифр, латинских букв и разных символов. но нам не нужны кириллические буквы. значит, мы их исключаем с помощью карета.
        return regex.test(v);
      },
      message: 'Ссылка на аватар недействительна!',
    },
  },
});

module.exports = mongoose.model('user', userSchema);

// TODO написать регулярку для функции валидации ссылок.
// TODO написать функцию валидации ссылок.
// TODO разобраться с лайками
// TODO разобраться с createdAt
