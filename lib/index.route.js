'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _movie = require('./server/movie/movie.route');

var _movie2 = _interopRequireDefault(_movie);

var _comment = require('./server/movie/comment/comment.route');

var _comment2 = _interopRequireDefault(_comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/movies', _movie2.default);
router.use('/comments', _comment2.default);

module.exports = router;