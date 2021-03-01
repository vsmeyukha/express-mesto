const path = require('path');
const getDataFromFile = require('../helpers/files');

const dataPath = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) => getDataFromFile(dataPath)
  .then((cards) => res.status(200).send(cards))
  .catch((err) => res.status(500).send(`Ошибочка вышла: ${err}`));

const getSingleCard = (req, res) => getDataFromFile(dataPath)
  .then((cards) => cards.find((card) => card._id === req.params.id))
  .then((card) => {
    if (!card) {
      return res.status(404).send({ message: 'Нет карточки с таким id' });
    } return res.status(200).send(card);
  })
  .catch((err) => res.status(500).send(`Ошибка: ${err}`));

module.exports = { getCards, getSingleCard };
