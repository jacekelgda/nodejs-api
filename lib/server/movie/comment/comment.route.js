'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _comment = require('./comment.controller');

var _comment2 = _interopRequireDefault(_comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/').get(_comment2.default.list).post(_comment2.default.create);

router.route('/:commentId').get(_comment2.default.get);

router.param('commentId', _comment2.default.load);

module.exports = router;