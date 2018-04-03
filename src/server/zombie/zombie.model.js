import mongoose from 'mongoose';

const ZombieSchema = new mongoose.Schema({
  name: String,
  created: { type: Date, default: Date.now },
  items: [{ id: Number, price: Number, name: String }],
}, {
  toJSON: {
    virtuals: true,
  },
});

ZombieSchema.statics = {
  get(id) {
    return this.findById(id);
  },
  list() {
    return this.find();
  },
};

ZombieSchema.virtual('PLN').get(function () {
  const totalCost = this.items.length > 0
    ? this.items
      .map(({ price }) => price)
      .reduce((x, y) => x + y)
    : 0;

  return totalCost;
});

module.exports = mongoose.model('Zombie', ZombieSchema);
