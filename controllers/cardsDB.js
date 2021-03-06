const Card = require('../models/card');

// ! возвращаем все карточки
const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send(`Ошибка: ${err}`));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send('Нет такой карточки');
      } return res.status(200).send(`Удалено: ${card}`);
    });
};

const createCard = (req, res) => {
  const ownerId = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner: ownerId })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => res.status(500).send(`Ошибка: ${err}. Карточка не создана`));
};

const likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
  .then((card) => res.status(200).send({ data: card }))
  .catch((err) => res.status(500).send(`Не удалось поставить лайк: ${err}`));

const dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
  .then((card) => res.status(200).send({ data: card }))
  .catch((err) => res.status(500).send(`Не удалось удалить лайк: ${err}`));

module.exports = {
  getAllCards, deleteCard, createCard, likeCard, dislikeCard,
};
