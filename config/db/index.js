const mongoose = require('mongoose');
require('dotenv').config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (e) {
    console.log('connect failed', e);
  }
};
module.exports = { connect };
