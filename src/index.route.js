import express from 'express';
import zombiesRoute from './server/zombie/zombie.route';

const router = express.Router();
router.use('/zombies', zombiesRoute);

module.exports = router;
