const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// ! получаем всех пользователей
const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send(`Ошибка: ${err}`));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('NotFoundID'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'Айди неправильный',
        });
      }
      if (err.message === 'NotFoundID') {
        return res.status(404).send({
          message: 'Такого пользователя нет в базе',
          err: err.message,
        });
      }
      return res.status(500).send({
        message: `Ошибка сервера: ${err}`,
      });
    });
};

const createUser = (req, res) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((encryptedPassword) => {
      User.create({
        email,
        password: encryptedPassword,
        name,
        about,
        avatar,
      })
        .then((user) => res.status(200).send({ data: user }))
        .catch((err) => {
          if (!email || !password) {
            return res.status(400).send({
              message: 'Вы не заполнили обязательные поля!',
            });
          } return res.status(500).send({
            message: `Ошибка сервера: ${err}`,
          });
        });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;

  const { _id = '' } = req.user;

  User.findByIdAndUpdate(
    _id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new Error('NotFoundID'))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Вы не заполнили обязательные поля',
        });
      }
      if (err.message === 'NotFoundID') {
        return res.status(404).send({
          message: 'Пользователя, которого вы пытаетесь отредактировать, нет в базе',
        });
      }
      return res.status(500).send(
        {
          message: `Ошибка: ${err}. Пользователь не обновлен`,
        },
      );
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  const { _id = '' } = req.user;

  User.findByIdAndUpdate(
    _id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new Error('NotFoundID'))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Вы не заполнили обязательные поля',
        });
      }
      if (err.message === 'NotFoundID') {
        return res.status(404).send({
          message: 'Пользователя, чей аватар вы пытаетесь изменить, нет в базе',
        });
      }
      return res.status(500).send({
        message: `Ошибка: ${err}. Аватар не обновлен`,
      });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          const token = jwt.sign(
            { _id: user._id },
            'very-secret-key',
            { expiresIn: '7d' },
          );

          res.cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
          })
            .status(201).send({
              message: 'Аутентификация прошла успешно',
            });
        });
    })
    .catch((err) => {
      console.log(err);
      if (err.message === 'NotFoundUser') {
        return res.status(401).send({
          message: 'Неправильные почта или пароль',
        });
      }
      return res.status(500).send({
        message: `Ошибка сервера: ${err}`,
      });
    });
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id).select('+password')
    .orFail(new Error('NotFoundID'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'Айди неправильный',
        });
      }
      if (err.message === 'NotFoundID') {
        return res.status(404).send({
          message: 'Такого пользователя нет в базе',
          err: err.message,
        });
      }
      return res.status(500).send({
        message: `Ошибка сервера: ${err}`,
      });
    });
};

// const login = (req, res) => {
//   const { email, password } = req.body;

//   User.findOne({ email })
//     .orFail(new Error('NotFoundUser'))
//     .then((user) => bcrypt.compare(password, user.password))
//     .then((matched) => {
//       if (!matched) {
//         return Promise.reject(new Error('Неправильные почта или пароль'));
//       }
//       const token = jwt.sign(
//         { _id: user._id },
//         'very secret key',
//         { expiresIn: '7d' },
//       );
//       return res.status(201).send({
//         token,
//         message: 'Аутентификация прошла успешно',
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       if (err.message === 'NotFoundUser') {
//         return res.status(401).send({
//           message: `Неправильные поста или пароль. Ошибка: ${err}`,
//         });
//       }
//       return res.status(500).send({
//         message: `Ошибка сервера: ${err}`,
//       });
//     });
// };

module.exports = {
  getAllUsers, getUserById, createUser, updateUser, updateAvatar, login, getCurrentUser,
};
