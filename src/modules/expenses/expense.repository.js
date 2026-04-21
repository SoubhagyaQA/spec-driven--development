// const Expense = require("./expense.model");

// const createExpense = (data) => Expense.create(data);

// const findAll = (filter, options) =>
//   Expense.find(filter)
//     .skip(options.skip)
//     .limit(options.limit)
//     .sort({ date: -1 });

// const findByIdExpense = (id, userId) =>
//   Expense.findOne({ _id: id, userId });

// const updateExpense = (id, userId, data) =>
//   Expense.findOneAndUpdate({ _id: id, userId }, data, {
//     new: true,
//     runValidators: true,
//   });

// const removeExpense = (id, userId) =>
//   Expense.findOneAndDelete({ _id: id, userId });

// module.exports = {
//   createExpense,
//   findAll,
//   findByIdExpense,
//   updateExpense,
//   removeExpense,
// };

const Expense = require("./expense.model");

// Create
const createRepository = (data) => {
  return Expense.create(data);
};

// Get All
const findAllRepository = (filter, options) => {
  return Expense.find(filter)
    .skip(options.skip)
    .limit(options.limit)
    .sort({ date: -1 });
};

// Get One
const findByIdRepository = (id, userId) => {
  return Expense.findOne({ _id: id, userId });
};

// Update
const updateRepository = (id, userId, data) => {
  return Expense.findOneAndUpdate(
    { _id: id, userId },
    data,
    { new: true, runValidators: true }
  );
};

// Delete
const removeRepository = (id, userId) => {
  return Expense.findOneAndDelete({ _id: id, userId });
};

module.exports = {
  createRepository,
  findAllRepository,
  findByIdRepository,
  updateRepository,
  removeRepository,
};