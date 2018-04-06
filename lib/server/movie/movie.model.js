'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MovieSchema = new _mongoose2.default.Schema({
  title: String,
  meta: Object,
  comments: [{
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'comment'
  }]
});

MovieSchema.statics = {
  get: function get(id) {
    return this.findById(id);
  },
  list: function list() {
    return this.find();
  }
};

module.exports = _mongoose2.default.model('Movie', MovieSchema);