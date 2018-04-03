import express from 'express';
import validation from 'express-validation';
import zombieController from './zombie.controller';
import * as validationRules from './zombie.validator';
import * as stock from './zombie.service';

const router = express.Router();

router.route('/')
  .post(validation(validationRules.createZombie), zombieController.create)
  .get(zombieController.list);

router.route('/:zombieId')
  .get(stock.fetchItems, zombieController.get)
  .delete(zombieController.remove);

router.route('/:zombieId/items')
  .post([stock.attachItem, validation(validationRules.addItem)], zombieController.addItem)
  .delete(stock.attachItem, zombieController.removeItem);

router.param('zombieId', zombieController.load);

module.exports = router;
