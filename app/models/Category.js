const mongoose = require('mongoose');
// eslint-disable-next-line camelcase
const mongoose_delete = require('mongoose-delete');

const { Schema } = mongoose;

const Category = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now },
}, {
  timestamps: true,
});
Category.plugin(mongoose_delete);
Category.plugin(mongoose_delete, { overrideMethods: 'all', deletedAt: true });
module.exports = mongoose.model('Category', Category);
