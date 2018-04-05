import express from 'express';
import movieRoute from './server/movie/movie.route';
import commentRoute from './server/movie/comment/comment.route';

const router = express.Router();

router.use('/movies', movieRoute);
router.use('/comments', commentRoute);

module.exports = router;
