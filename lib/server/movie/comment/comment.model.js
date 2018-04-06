'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CommentSchema = new _mongoose2.default.Schema({
  text: String,
  movie: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    fer: 'movie'
  }
});

CommentSchema.statics = {
  get: function get(id) {
    return this.findById(id);
  },
  list: function list() {
    var filterBy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var filterId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    return filterBy ? this.find().where(filterBy).equals(filterId).exec() : this.find();
  }
};

module.exports = _mongoose2.default.model('Comment', CommentSchema);