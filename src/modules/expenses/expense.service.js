const repo = require("./expense.repository");

// Create Expense
const createExpense = async (userId, data) => {
  const payload = {
    ...data,
    userId,
  };
  return repo.createRepository(payload);
};
// Get All
const getExpenses = async (userId, query) => {
  const { page = 1, limit = 10 } = query;
  const filter = { userId };
  const options = {
    skip: (page - 1) * limit,
    limit: Number(limit),
  };

  return repo.findAllRepository(filter, options);
};
// Get One
const getExpenseById = async (userId, id) => {
  const expense = await repo.findByIdRepository(id, userId);

  if (!expense) {
    throw new Error("Expense not found");
  }
  return expense;
};
// Update
const updateExpense = async (userId, id, data) => {
  const expense = await repo.updateRepository(id, userId, data);

  if (!expense) {
    throw new Error("Expense not found");
  }
  return expense;
};
// Delete
const deleteExpense = async (userId, id) => {
  const expense = await repo.removeRepository(id, userId);

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