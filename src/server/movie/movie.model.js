import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({ title: String });

MovieSchema.statics = {
  list() {
    return this.find();
  },
};

module.exports = mongoose.model('Movie', MovieSchema);
