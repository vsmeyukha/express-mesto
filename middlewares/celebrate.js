const { celebrate, Joi } = require('celebrate');
const mongoose = require('mongoose');

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.custom((value, helpers) => {
      if (mongoose.Types.ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('неправильный ID');
    }),
  }),
});

module.exports = { validateUserId };
