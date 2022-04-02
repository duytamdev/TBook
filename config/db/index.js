const mongoose = require('mongoose');

// const connect = async () => {
//   try {
//     await mongoose.connect('mongodb://localhost:27017/TBook_NodeJS');
//     console.log('connect success');
//   } catch (e) {
//     console.log(e);
//     console.log('connect failed');
//   }
// };
const password = 123;
const nameDatabase = 'TBook_NodeJS';

const connect = async () => {
  try {
    await mongoose.connect(`mongodb+srv://admin:${password}@cluster0.i9dag.mongodb.net/${nameDatabase}?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (e) {
    console.log(e);
    console.log('connect failed');
  }
};
module.exports = { connect };
