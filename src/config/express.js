import express from 'express';
import bodyParser from 'body-parser';
import validation from 'express-validation';

import routes from '../index.route';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', routes);
app.use((err, req, res, next) => {
  if (err instanceof validation.ValidationError) {
    const itemNotFound = err.errors.find(({ field }) => field.includes('__item'));
    if (itemNotFound) {
      return res.status(err.status).json(`${err.statusText}: Item not found`);
    }
    const itemsMax = err.errors.find(({ types }) => types.includes('array.max'));
    if (itemsMax) {
      return res.status(err.status).json(`${err.statusText}: Too many items`);
    }
    const message = err.errors.map(error => error.messages.join(', ')).join('AND  ');

    return res.status(err.status).json(`${err.statusText}: ${message}`);
  }

  return next(err);
});

module.exports = app;
