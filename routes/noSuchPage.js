const router = require('express').Router();

router.get('/:smth', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

router.all(['/', '/:smth'], (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = router;
