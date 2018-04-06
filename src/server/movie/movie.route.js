import express from 'express';
import validation from 'express-validation';
import movieController from './movie.controller';
import commentController from './comment/comment.controller';
import * as validationRules from './movie.validator';
import fetchMeta from './movie.service';

const router = express.Router();

router.route('/')
  .post([validation(validationRules.createMovie), fetchMeta], movieController.create)
  .get(movieController.list);

router.route('/:movieId/comments')
  .post(commentController.add);

router.param('movieId', movieController.load);

module.exports = router;
