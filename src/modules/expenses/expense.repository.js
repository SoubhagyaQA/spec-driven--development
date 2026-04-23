const repo  = require("./expense.model");

// Create
const createRepository = (data) => {
  return repo.create(data);
};
// Get All
const findAllRepository = (filter, options) => {
  return repo.find(filter)
    .skip(options.skip)
    .limit(options.limit)
    .sort({ date: -1 });
};
// Get One
const findByIdRepository = (id, userId) => {
  return repo.findOne({ _id: id, userId });
};
// Update
const updateRepository = (id, userId, data) => {
  return repo.findOneAndUpdate(
    { _id: id, userId },
    data,
    { new: true, runValidators: true }
  );
};
// Delete
const removeRepository = (id, userId) => {
  return repo.findOneAndDelete({ _id: id, userId });
};

module.exports = {
  createRepository,
  findAllRepository,
  findByIdRepository,
  updateRepository,
  removeRepository,
};