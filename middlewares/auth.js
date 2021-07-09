const jwt = require('jsonwebtoken');
const NotFoundUserError = require('../errors/notFoundUserError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).send({ message: 'Необходимо авторизоваться' });
  }

  let payload;

  try {
    payload = jwt.verify(token, 'very-secret-key');
  } catch (err) {
    return next(new NotFoundUserError('Неверный токен'));
  }

  req.user = payload;

  next();
};

module.exports = { auth };
