const Card = require('../models/card');

// ! возвращаем все карточки
const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send(`Ошибка: ${err}`));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error('NotFoundCardID'))
    .then((card) => res.status(200).send({
      message: `Удалено: ${card}`,
    }))
    .catch((err) => {
      const regex = /^[0-9a-fA-F]{24}$/;
      if (!regex.test(req.params.cardId)) {
        return res.status(400).send({
          message: 'Ошибка. Карточки не существует',
        });
      }
      if (err.message === 'NotFoundCardID') {
        return res.status(404).send({
          message: `Ошибка: ${err}. Нет такой карточки`,
        });
      }
      return res.status(500).send({
        message: `Ошибка: ${err}`,
      });
    });
};

const createCard = (req, res) => {
  const ownerId = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner: ownerId })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (!name || !link) {
        return res.status(400).send({
          message: `Ошибка: ${err}. Вы не заполнили обязательные поля`,
        });
      }
      return res.status(500).send({
        message: `Ошибка: ${err}`,
      });
    });
};

const likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
  .orFail(new Error('NotFoundCardID'))
  .then((card) => res.status(200).send({ data: card }))
  .catch((err) => {
    const regex = /^[0-9a-fA-F]{24}$/;
    if (!regex.test(req.params.cardId)) {
      return res.status(400).send({
        message: `Ошибка: ${err}. Id карточки не задан.`,
      });
    }
    if (err.message === 'NotFoundCardID') {
      return res.status(404).send({
        message: `Ошибка: ${err}. Нет такой карточки`,
      });
    }
    return res.status(500).send({
      message: `Ошибка: ${err}`,
    });
  });

const dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
  .orFail(new Error('NotFoundCardID'))
  .then((card) => res.status(200).send({ data: card }))
  .catch((err) => {
    const regex = /^[0-9a-fA-F]{24}$/;
    if (!regex.test(req.params.cardId)) {
      return res.status(400).send({
        message: `Ошибка: ${err}. Id карточки не задан.`,
      });
    }
    if (err.message === 'NotFoundCardID') {
      return res.status(404).send({
        message: `Ошибка: ${err}. Нет такой карточки`,
      });
    }
    return res.status(500).send({
      message: `Ошибка: ${err}`,
    });
  });

module.exports = {
  getAllCards, deleteCard, createCard, likeCard, dislikeCard,
};
