'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _supertestAsPromised = require('supertest-as-promised');

var _supertestAsPromised2 = _interopRequireDefault(_supertestAsPromised);

var _mongodbMemoryServer = require('mongodb-memory-server');

var _mongodbMemoryServer2 = _interopRequireDefault(_mongodbMemoryServer);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _index = require('../../index');

var _index2 = _interopRequireDefault(_index);

var _movie = require('./movie.model');

var _movie2 = _interopRequireDefault(_movie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var mongoServer = void 0;
jest.mock('axios');

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

describe('GET /api/movies/', function () {
  it('should get all movies', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(done) {
      var movie1, movie2;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              movie1 = new _movie2.default({ title: 'Some movie 1' });
              movie2 = new _movie2.default({ title: 'Some movie 2' });
              _context3.next = 4;
              return movie1.save();

            case 4:
              _context3.next = 6;
              return movie2.save();

            case 6:
              (0, _supertestAsPromised2.default)(_index2.default).get('/api/movies').expect(_httpStatus2.default.OK).then(function (res) {
                expect(res.body).toHaveLength(2);
                done();
              }).catch(done);

            case 7:
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

describe('POST /api/movies/', function () {
  it('should create movie', function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(done) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _axios2.default.get.mockResolvedValue({ data: { Title: 'Blade Runner' } });
              (0, _supertestAsPromised2.default)(_index2.default).post('/api/movies').send({ title: 'Blade Runner' }).expect(_httpStatus2.default.OK).then(function (res) {
                expect(res.body.title).toEqual('Blade Runner');
                expect(res.body.meta.Title).toEqual('Blade Runner');
                done();
              }).catch(done);

            case 2:
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

  it('should validate title param', function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(done) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              (0, _supertestAsPromised2.default)(_index2.default).post('/api/movies').expect(_httpStatus2.default.BAD_REQUEST).then(function (res) {
                expect(res.body).toEqual('Bad Request: "title" is required');
                done();
              }).catch(done);

            case 1:
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

describe('POST /api/movies/{movieId}/comments', function () {
  it('should add comment', function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(done) {
      var movie;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              movie = new _movie2.default({ title: 'Matrix', meta: { Title: 'Matrix' } });
              _context6.next = 3;
              return movie.save();

            case 3:
              (0, _supertestAsPromised2.default)(_index2.default).post('/api/movies/' + movie._id + '/comments') // eslint-disable-line
              .send({ text: 'Matrix was ok... I guess...' }).expect(_httpStatus2.default.OK).then(function (res) {
                expect(res.body.text).toEqual('Matrix was ok... I guess...');
                done();
              }).catch(done);

            case 4:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    }));

    return function (_x4) {
      return _ref6.apply(this, arguments);
    };
  }());
});