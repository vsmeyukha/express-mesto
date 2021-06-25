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
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (!name || !about) {
        return res.status(400).send({
          message: 'Вы не заполнили обязательные поля',
        });
      } return res.status(500).send({
        message: `Ошибка сервера: ${err}`,
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

module.exports = {
  getAllUsers, getUserById, createUser, updateUser, updateAvatar,
};
