const Category = require("./category.model");

// Create
const createRepository = (data) => {
  return Category.create(data);
};
// Get All
const findAllRepository = (userId) => {
  return Category.find({ userId }).sort({ createdAt: -1 });
};
// Get One
const findByIdRepository = (id, userId) => {
  return Category.findOne({ _id: id, userId });
};
// Update
const updateRepository = (id, userId, data) => {
  return Category.findOneAndUpdate(
    { _id: id, userId },
    data,
    { new: true, runValidators: true }
  );
};
// Delete
const removeRepository = (id, userId) => {
  return Category.findOneAndDelete({ _id: id, userId });
};

module.exports = {
  createRepository,
  findAllRepository,
  findByIdRepository,
  updateRepository,
  removeRepository,
};