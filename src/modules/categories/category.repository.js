const Category = require("./category.model");

// Create
const create = (data) => {
  return Category.create(data);
};

// Get All
const findAll = (userId) => {
  return Category.find({ userId }).sort({ createdAt: -1 });
};

// Get One
const findById = (id, userId) => {
  return Category.findOne({ _id: id, userId });
};

// Update
const update = (id, userId, data) => {
  return Category.findOneAndUpdate(
    { _id: id, userId },
    data,
    { new: true, runValidators: true }
  );
};

// Delete
const remove = (id, userId) => {
  return Category.findOneAndDelete({ _id: id, userId });
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
};