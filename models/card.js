const mongoose = require('mongoose');

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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  //! по поводу лайков есть сомнения, что это правильный код
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    // ! тут еще значение по умолчанию
  }],
  createdAt: {
    type: Date,
    // ! тут еще значение по умолчанию
  },
});

module.exports = mongoose.model('card', cardSchema);
