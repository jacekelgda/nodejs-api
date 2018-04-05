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
  list() {
    return this.find();
  },
};

module.exports = mongoose.model('Comment', CommentSchema);
