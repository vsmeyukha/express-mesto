const path = require('path');
const getDataFromFile = require('../helpers/files');

const dataPath = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = (req, res) => getDataFromFile(dataPath)
  .then((users) => res.status(200).send(users))
  .catch((err) => res.status(500).send(`Ошибочка вышла: ${err}`));

const getProfile = (req, res) => getDataFromFile(dataPath)
  .then((users) => users.find((user) => user._id === req.params.id))
  .then((user) => {
    if (!user) {
      return res.status(404).send({ message: 'Нет пользователя с таким id' });
    } return res.status(200).send(user);
  })
  .catch((err) => res.status(500).send(`Ошибка: ${err}`));

module.exports = { getUsers, getProfile };
