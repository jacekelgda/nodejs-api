import express from 'express';
import commentsController from './comment.controller';

const router = express.Router();

router.route('/')
  .get(commentsController.list)
  .post(commentsController.create);

router.route('/:commentId')
  .get(commentsController.get);

router.param('commentId', commentsController.load);

module.exports = router;
