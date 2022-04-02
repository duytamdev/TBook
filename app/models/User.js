const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String },
});
module.exports = mongoose.model('User', User);
