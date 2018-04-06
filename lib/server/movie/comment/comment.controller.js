'use strict';

var _comment = require('./comment.model');

var _comment2 = _interopRequireDefault(_comment);

var _movie = require('../movie.model');

var _movie2 = _interopRequireDefault(_movie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var add = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var comment;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            comment = new _comment2.default({
              text: req.body.text,
              movie: req.movie
            });
            _context.next = 3;
            return comment.save();

          case 3:
            req.movie.comments.push(comment);
            req.movie.save().then(function () {
              return res.json(comment);
            }).catch(function (e) {
              return next(e);
            });

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function add(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var create = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var movie, comment;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _movie2.default.get(req.body.movieId);

          case 2:
            movie = _context2.sent;
            comment = new _comment2.default({
              text: req.body.text,
              movie: movie
            });
            _context2.next = 6;
            return comment.save();

          case 6:
            movie.comments.push(comment);
            movie.save().then(function () {
              return res.json(comment);
            }).catch(function (e) {
              return next(e);
            });

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function create(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var load = function load(req, res, next, id) {
  _comment2.default.get(id).then(function (comment) {
    req.comment = comment;
    return next();
  }).catch(function (e) {
    return next(e);
  });
};

var get = function get(req, res) {
  return res.json(req.comment);
};

var list = function list(req, res, next) {
  var _req$query = req.query,
      _req$query$filterBy = _req$query.filterBy,
      filterBy = _req$query$filterBy === undefined ? null : _req$query$filterBy,
      _req$query$filterId = _req$query.filterId,
      filterId = _req$query$filterId === undefined ? null : _req$query$filterId;

  _comment2.default.list(filterBy, filterId).then(function (comments) {
    return res.json(comments);
  }).catch(function (e) {
    return next(e);
  });
};

module.exports = {
  create: create,
  add: add,
  list: list,
  load: load,
  get: get
};