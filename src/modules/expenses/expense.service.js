// const mongoose = require("mongoose");
// const Expense = require("./expense.model");

// // Create Expense
// const createExpense = async (userId, data) => {
//   const expense = await Expense.create({
//     amount: data.amount,
//     categoryId: data.categoryId,
//     date: data.date,
//     notes: data.notes,
//     userId,
//   });
//   return expense;
// };

// // Get All Expenses (with filters + pagination)
// const getExpenses = async (userId, query) => {
//   const { page = 1, limit = 10, categoryId, startDate, endDate } = query;
//   const filter = { userId };
//   if (categoryId) {
//     filter.categoryId = categoryId;
//   }
//   if (startDate && endDate) {
//     filter.date = {
//       $gte: new Date(startDate),
//       $lte: new Date(endDate),
//     };
//   }

//   const expenses = await Expense.find(filter)
//     .populate("categoryId", "name")
//     .sort({ date: -1 })
//     .skip((page - 1) * limit)
//     .limit(limit);

//   return expenses;
// };

// // Get One Expense
// const getExpenseById = async (userId, id) => {
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     throw new Error("Invalid expense ID");
//   }

//   const expense = await Expense.findOne({ _id: id, userId }).populate(
//     "categoryId",
//     "name"
//   );

//   if (!expense) {
//     throw new Error("Expense not found");
//   }
//   return expense;
// };

// // Update Expense
// const updateExpense = async (userId, id, data) => {
//   const expense = await Expense.findOneAndUpdate(
//     { _id: id, userId },
//     data,
//     { new: true, runValidators: true }
//   );

//   if (!expense) {
//     throw new Error("Expense not found");
//   }

//   return expense;
// };

// // Delete Expense
// const deleteExpense = async (userId, id) => {
//   const expense = await Expense.findOneAndDelete({
//     _id: id,
//     userId,
//   });

//   if (!expense) {
//     throw new Error("Expense not found");
//   }

//   return true;
// };

// module.exports = {
//   createExpense,
//   getExpenses,
//   getExpenseById,
//   updateExpense,
//   deleteExpense,
// };

const repo = require("./expense.repository");

// Create Expense
const createExpense = async (userId, data) => {
  const payload = {
    ...data,
    userId,
  };

  return repo.create(payload);
};

// Get All
const getExpenses = async (userId, query) => {
  const { page = 1, limit = 10 } = query;

  const filter = { userId };

  const options = {
    skip: (page - 1) * limit,
    limit: Number(limit),
  };

  return repo.findAll(filter, options);
};

// Get One
const getExpenseById = async (userId, id) => {
  const expense = await repo.findById(id, userId);

  if (!expense) {
    throw new Error("Expense not found");
  }

  return expense;
};

// Update
const updateExpense = async (userId, id, data) => {
  const expense = await repo.update(id, userId, data);

  if (!expense) {
    throw new Error("Expense not found");
  }

  return expense;
};

// Delete
const deleteExpense = async (userId, id) => {
  const expense = await repo.remove(id, userId);

  if (!expense) {
    throw new Error("Expense not found");
  }

  return true;
};

module.exports = {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};