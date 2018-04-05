import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  title: String,
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comment',
  }],
});

MovieSchema.statics = {
  get(id) {
    return this.findById(id);
  },
  list() {
    return this.find();
  },
};

module.exports = mongoose.model('Movie', MovieSchema);
