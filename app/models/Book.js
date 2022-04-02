const mongoose = require('mongoose');
// eslint-disable-next-line camelcase
const mongoose_delete = require('mongoose-delete');

const { Schema } = mongoose;
const SchemaTypes = mongoose.Schema.Types;
const Book = new Schema({
  name: { type: String },
  price: { type: Number },
  image: { type: String },
  country: { type: String },
  author: { type: String },
  publicationDate: { type: String },
  description: { type: String },
  available: { type: Boolean, default: true },
  quantity: { type: Number, default: 100 },
  category: { type: SchemaTypes.ObjectId, ref: 'Category' },
  date: { type: Date, default: Date.now },
}, {
  timestamps: true,
});
Book.index({ name: 'text' });
Book.plugin(mongoose_delete);
Book.plugin(mongoose_delete, { overrideMethods: 'all', deletedAt: true });
module.exports = mongoose.model('Book', Book);
