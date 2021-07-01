const Card = require('../models/card');

// ! возвращаем все карточки
const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send(`Ошибка: ${err}`));
};

const deleteCard = (req, res) => {
  const ownerID = req.user._id;
  console.log(`ownerID: ${ownerID}`);
  console.log(`req.user: ${req.user}`);

  Card.findOneAndRemove({
    _id: req.params.cardId,
    owner: ownerID,
  })
    .orFail(new Error('NotFoundCardID'))
    .then((card) => {
      console.log(`card.owner: ${card.owner}`);
      console.log(`card: ${card}`);
      console.log(`typeof card.owner: ${typeof card.owner}`);
      console.log(`typeof card.owner toString: ${typeof String(card.owner)}`);
      if (String(card.owner) !== ownerID) {
        return Promise.reject(new Error('нельзя удалить чужую карточку'));
      }
      return res.status(200).send({
        message: 'Карточка успешно удалена',
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
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

// const deleteCard = (req, res) => {
//   const ownerID = req.user._id;
//   console.log(`ownerID: ${ownerID}`);
//   console.log(`req.user: ${req.user}`);
//   Card.findById(req.params.cardId)
//     .orFail(new Error('NotFoundCardID'))
//     .then((card) => {
//       console.log(`card.owner: ${card.owner}`);
//       console.log(`card: ${card}`);
//       if (card.owner !== ownerID) {
//         return Promise.reject(new Error('нельзя удалить чужую карточку'));
//       }
//       Card.remove({ _id: req.params.cardId });
//       return res.status(200).send({
//         message: 'Карточка успешно удалена',
//       });
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         return res.status(400).send({
//           message: 'Ошибка. Карточки не существует',
//         });
//       }
//       if (err.message === 'NotFoundCardID') {
//         return res.status(404).send({
//           message: `Ошибка: ${err}. Нет такой карточки`,
//         });
//       }
//       return res.status(500).send({
//         message: `Ошибка: ${err}`,
//       });
//     });
// };

const createCard = (req, res) => {
  const ownerId = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner: ownerId })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
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
    if (err.name === 'CastError') {
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
    if (err.name === 'CastError') {
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
