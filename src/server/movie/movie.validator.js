import Joi from 'joi';

module.exports = {
  createMovie: {
    body: {
      title: Joi.string().required(),
    },
  },
};
