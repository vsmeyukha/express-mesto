const Card = require('../models/card');

// ! возвращаем все карточки
const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send(`Ошибка: ${err}`));
};

const deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send('Нет такой карточки');
      } return res.status(200).send(card);
    });
};

const createCard = (req, res) => {
  console.log(req.user._id);
  const { name, link } = req.body;

  Card.create({ name, link })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => res.status(500).send(`Ошибка: ${err}. Карточка не создана`));
};

module.exports = { getAllCards, deleteCard, createCard };
