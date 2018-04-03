import Joi from 'joi';

module.exports = {
  contextRequest: true,
  createZombie: {
    body: {
      name: Joi.string().required(),
    },
  },
  addItem: {
    body: {
      __item: Joi.object().required(),
      __zombie: {
        items: Joi.array().required().min(0).max(4),
      },
    },
  },
};
