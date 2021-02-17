const router = require('express').Router();

router.get('/:smth', (req, res) => {
  if (req.params.smth !== 'users' && req.params.smth !== 'cards') {
    res.status(404).send({ "message": "Запрашиваемый ресурс не найден" });
  }
});

module.exports = router;
