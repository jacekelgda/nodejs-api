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
    const message = err.errors.map(error => error.messages.join(', ')).join('AND  ');
    return res.status(err.status).json(`${err.statusText}: ${message}`);
  }

  return next(err);
});

module.exports = app;
