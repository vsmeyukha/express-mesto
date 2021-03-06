const router = require('express').Router();

const { getAllCards, deleteCard, createCard, likeCard, dislikeCard } = require('../controllers/cardsDB');

router.get('/cards', getAllCards);

router.post('/cards', createCard);

router.delete('/cards/:cardId', deleteCard);

router.put('/cards/:cardId/likes', likeCard);

router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
