import express from 'express';
import movieRoutes from './server/movie/movie.route';

const router = express.Router();

router.use('/movies', movieRoutes);

module.exports = router;
