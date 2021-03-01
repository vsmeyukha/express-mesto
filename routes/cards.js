const router = require('express').Router();
const { getCards, getSingleCard } = require('../controllers/cards');

router.get('/cards', getCards);

router.get('/cards/:id', getSingleCard);

module.exports = router;
