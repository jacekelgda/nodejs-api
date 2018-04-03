import axios from 'axios';
import { stock } from '../../config/config';

// @todo: add axios-cache-adapter

const attachItem = (req, res, next) => {
  axios
    .get(`${stock.url}/api/items`)
    .then(({ items }) => {
      req.body.__item = items.find(({ id }) => id === req.body.id);
      return next();
    })
    .catch(() => next());
};

const fetchItems = (req, res, next) => {
  axios
    .get(`${stock.url}/api/items`)
    .then(({ items }) => {
      req.__items = items;
      return next();
    })
    .catch(() => next());
};

module.exports = { attachItem, fetchItems };
