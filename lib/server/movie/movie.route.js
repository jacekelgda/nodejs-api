'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _movie = require('./movie.controller');

var _movie2 = _interopRequireDefault(_movie);

var _comment = require('./comment/comment.controller');

var _comment2 = _interopRequireDefault(_comment);

var _movie3 = require('./movie.validator');

var validationRules = _interopRequireWildcard(_movie3);

var _movie4 = require('./movie.service');

var _movie5 = _interopRequireDefault(_movie4);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/').post([(0, _expressValidation2.default)(validationRules.createMovie), _movie5.default], _movie2.default.create).get(_movie2.default.list);

router.route('/:movieId/comments').post(_comment2.default.add);

router.param('movieId', _movie2.default.load);

module.exports = router;