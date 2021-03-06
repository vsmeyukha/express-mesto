const User = require('../models/user');

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send(`Ошибка: ${err}`));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send('Нет пользователя с таким id');
      } return res.status(200).send(user);
    });
};

const createUser = (req, res) => {
  console.log(req);
  const { name, about, avatar } = req.body;

  // if (!name || !about) {
  //   return res.status(400).send('Заполните поля')
  // }
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => res.status(500).send(`Ошибка: ${err}. Пользователь не создан`));
};

const updateUser = (req, res) => {
  const { name, about } = req.body;

  const { _id = '' } = req.user;

  User.findByIdAndUpdate(
    _id,
    { name, about },
    { new: true }
  )
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => res.status(500).send(`Не удалось обновить профиль. Ошибка: ${err}`));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  const { _id = '' } = req.user;

  User.findByIdAndUpdate(_id, { avatar }, { new: true })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => res.status(500).send(`Не удалось обновить аватар. Ошибка: ${err}`));
};

module.exports = {
  getAllUsers, getUserById, createUser, updateUser, updateAvatar,
};
