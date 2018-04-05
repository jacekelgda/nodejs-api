import express from 'express';
import movieController from './movie.controller';

const router = express.Router();


router.route('/')
  .post(movieController.create)
  .get(movieController.list);

module.exports = router;
