'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _config = require('../../config/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res, next) {
  _axios2.default.get(_config.omdb.url + '/?t=' + req.body.title + '&apikey=' + _config.omdb.key).then(function (movieMeta) {
    req.movieMeta = movieMeta.data;
    return next();
  }).catch(function () {
    return next();
  });
};