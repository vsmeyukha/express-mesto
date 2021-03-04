const router = require('express').Router();

const { getAllCards, deleteCard, createCard } = require('../controllers/cardsDB');

router.get('/cards', getAllCards);

router.post('/cards', createCard);

router.delete('/cards/:cardId', deleteCard);

module.exports = router;
