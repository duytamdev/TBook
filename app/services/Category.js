const Category = require('../models/Category');

module.exports.update = async (id, dataUpdated) => {
  await Category.updateOne({ _id: id }, dataUpdated);
};
module.exports.save = async (category) => {
  await category.save();
};
