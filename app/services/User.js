/**
 * service: tầng giao tiếp với database
 */
const userModel = require('../models/User');

exports.login = async (username) => userModel.findOne({ username });
exports.register = async (username, password) => {
  const user = new userModel({ username, password });
  return await user.save();
};
