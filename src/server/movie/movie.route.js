import express from 'express';
import validation from 'express-validation';
import movieController from './movie.controller';
import * as validationRules from './movie.validator';

const router = express.Router();

router.route('/')
  .post(validation(validationRules.createMovie), movieController.create)
  .get(movieController.list);

module.exports = router;
