'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _index = require('../index.route');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use('/api', _index2.default);
app.use(function (err, req, res, next) {
  if (err instanceof _expressValidation2.default.ValidationError) {
    var message = err.errors.map(function (error) {
      return error.messages.join(', ');
    }).join('AND  ');
    return res.status(err.status).json(err.statusText + ': ' + message);
  }

  return next(err);
});

module.exports = app;