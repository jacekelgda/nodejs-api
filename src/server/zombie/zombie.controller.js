import axios from 'axios';
import Zombie from './zombie.model';
import { exchange } from '../../config/config';

const load = (req, res, next, id) => {
  Zombie.get(id)
    .then((zombie) => {
      req.body.__zombie = zombie;
      return next();
    })
    .catch(e => next(e));
};

const create = (req, res, next) => {
  const zombie = new Zombie({
    name: req.body.name,
  });
  zombie.save()
    .then(saved => res.json(saved))
    .catch(e => next(e));
};

const remove = (req, res, next) => {
  req.body.__zombie.remove()
    .then(() => res.json(req.body.__zombie))
    .catch(e => next(e));
};

const removeItem = (req, res, next) => {
  req.body.__zombie.items.splice(req.body.__zombie.items.indexOf(req.body.__item.id), 1);
  req.body.__zombie.save()
    .then(() => res.json(req.body.__item))
    .catch(e => next(e));
};

const list = (req, res, next) => {
  Zombie.list()
    .then(zombies => res.json(zombies))
    .catch(e => next(e));
};

const addItem = (req, res, next) => {
  req.body.__zombie.items.push(req.body.__item);
  req.body.__zombie.save()
    .then(() => res.json(req.body.__item))
    .catch(e => next(e));
};

const get = (req, res) => {
  // @todo: move to service
  axios.get(exchange.url)
    .then((response) => {
      const rates = response.data[0].rates.filter(rate => ['USD', 'EUR'].includes(rate.code));
      const { ask: rateUsd } = rates.find(({ code }) => code === 'USD');
      const { ask: rateEur } = rates.find(({ code }) => code === 'EUR');
      const { PLN } = req.body.__zombie;
      res.json({
        EUR: PLN / rateEur,
        USD: PLN / rateUsd,
        PLN,
        ...req.body.__zombie._doc,
      });
    });
};

module.exports = {
  load,
  create,
  list,
  addItem,
  get,
  removeItem,
  remove,
};
