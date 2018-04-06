'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('./config/express');

var _express2 = _interopRequireDefault(_express);

var _config = require('./config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (_config2.default.env !== _config2.default.testEnv) {
  _mongoose2.default.connect(_config2.default.mongo.host);
  _mongoose2.default.connection.on('error', function () {
    throw new Error('unable to connect to database: ' + _config2.default.mongo.host);
  });
}

if (!module.parent) {
  _express2.default.listen(_config2.default.port);
}
module.exports = _express2.default;