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

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => res.status(500).send(`Ошибка: ${err}. Пользователь не создан`));
};

module.exports = { getAllUsers, getUserById, createUser };
