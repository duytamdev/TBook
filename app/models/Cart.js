const mongoose = require('mongoose');

const { Schema } = mongoose;
const SchemaTypes = mongoose.Schema.Types;

const Cart = new Schema({
  userId: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
  },
  products: [
    {
      productId: { type: SchemaTypes.ObjectId, ref: 'Book' },
      quantity: Number,
      name: String,
      price: Number,
    },
  ],
  total: Number,
  status: { type: String, default: 'Đang chuẩn bị' },
  modifiedOn: {
    type: Date,
    default: Date.now,
  },

}, { timestamps: true });
module.exports = mongoose.model('Cart', Cart);
