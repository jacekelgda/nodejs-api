'use strict';

var _movie = require('./movie.model');

var _movie2 = _interopRequireDefault(_movie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var load = function load(req, res, next, id) {
  _movie2.default.get(id).then(function (movie) {
    req.movie = movie;
    return next();
  }).catch(function (e) {
    return next(e);
  });
};

var create = function create(req, res, next) {
  var movie = new _movie2.default({
    title: req.body.title,
    meta: req.movieMeta
  });
  movie.save().then(function (savedMovie) {
    return res.json(savedMovie);
  }).catch(function (e) {
    return next(e);
  });
};

var list = function list(req, res, next) {
  _movie2.default.list().then(function (movies) {
    return res.json(movies);
  }).catch(function (e) {
    return next(e);
  });
};

module.exports = { load: load, create: create, list: list };