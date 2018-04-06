'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _supertestAsPromised = require('supertest-as-promised');

var _supertestAsPromised2 = _interopRequireDefault(_supertestAsPromised);

var _mongodbMemoryServer = require('mongodb-memory-server');

var _mongodbMemoryServer2 = _interopRequireDefault(_mongodbMemoryServer);

var _index = require('../../../index');

var _index2 = _interopRequireDefault(_index);

var _movie = require('../movie.model');

var _movie2 = _interopRequireDefault(_movie);

var _comment = require('./comment.model');

var _comment2 = _interopRequireDefault(_comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var mongoServer = void 0;

beforeEach(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var uri;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          mongoServer = new _mongodbMemoryServer2.default();
          _context.next = 3;
          return mongoServer.getConnectionString();

        case 3:
          uri = _context.sent;
          _context.next = 6;
          return _mongoose2.default.connect(uri);

        case 6:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
})));

afterEach(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _mongoose2.default.disconnect();
          mongoServer.stop();

        case 2:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, undefined);
})));

describe('POST /api/comments', function () {
  it('should add comment', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(done) {
      var movie;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              movie = new _movie2.default({ title: 'Movie' });
              _context3.next = 3;
              return movie.save();

            case 3:

              (0, _supertestAsPromised2.default)(_index2.default).post('/api/comments').send({ text: 'Comment to Movie', movieId: movie._id }) // eslint-disable-line
              .expect(_httpStatus2.default.OK).then(function (res) {
                expect(res.body.text).toEqual('Comment to Movie');
                done();
              }).catch(done);

            case 4:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function (_x) {
      return _ref3.apply(this, arguments);
    };
  }());
});

describe('GET /api/comments', function () {
  it('should list all comments', function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(done) {
      var movie, comment1, comment2;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              movie = new _movie2.default({ title: 'Movie 1' });
              comment1 = new _comment2.default({ text: 'Comment to Movie 1', movie: movie });
              _context4.next = 4;
              return comment1.save();

            case 4:
              movie.comments.push(comment1);
              comment2 = new _comment2.default({ text: 'New comment to Movie 1', movie: movie });
              _context4.next = 8;
              return comment2.save();

            case 8:
              movie.comments.push(comment2);
              _context4.next = 11;
              return movie.save();

            case 11:

              (0, _supertestAsPromised2.default)(_index2.default).get('/api/comments').expect(_httpStatus2.default.OK).then(function (res) {
                expect(res.body).toHaveLength(2);
                done();
              }).catch(done);

            case 12:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function (_x2) {
      return _ref4.apply(this, arguments);
    };
  }());

  it('should list comments by filter', function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(done) {
      var movie1, comment1, comment2, movie2, comment3, comment4;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              movie1 = new _movie2.default({ title: 'Movie 1' });
              comment1 = new _comment2.default({ text: 'Comment to Movie 1', movie: movie1 });
              _context5.next = 4;
              return comment1.save();

            case 4:
              movie1.comments.push(comment1);
              comment2 = new _comment2.default({ text: 'New comment to Movie 1', movie: movie1 });
              _context5.next = 8;
              return comment2.save();

            case 8:
              movie1.comments.push(comment2);
              _context5.next = 11;
              return movie1.save();

            case 11:
              movie2 = new _movie2.default({ title: 'Movie 2' });
              comment3 = new _comment2.default({ text: 'Comment to Movie 2', movie: movie2 });
              _context5.next = 15;
              return comment3.save();

            case 15:
              movie2.comments.push(comment3);
              comment4 = new _comment2.default({ text: 'New comment to Movie 2', movie: movie2 });
              _context5.next = 19;
              return comment4.save();

            case 19:
              movie2.comments.push(comment4);
              _context5.next = 22;
              return movie2.save();

            case 22:

              (0, _supertestAsPromised2.default)(_index2.default).get('/api/comments').query({ filterBy: 'movie', filterId: '' + movie1._id }) // eslint-disable-line
              .expect(_httpStatus2.default.OK).then(function (res) {
                expect(res.body).toHaveLength(2);
                done();
              }).catch(done);

            case 23:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    }));

    return function (_x3) {
      return _ref5.apply(this, arguments);
    };
  }());
});