import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  text: String,
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    fer: 'movie',
  },
});

CommentSchema.statics = {
  get(id) {
    return this.findById(id);
  },
  list(filterBy = null, filterId = null) {
    return filterBy ? this.find()
      .where(filterBy)
      .equals(filterId)
      .exec() : this.find();
  },
};

module.exports = mongoose.model('Comment', CommentSchema);
