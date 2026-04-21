/*const {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} = require("./expense.service");

// Create
const createExpenseController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const expense = await createExpense(userId, req.body);

    res.status(201).json({
      success: true,
      data: expense,
    });
  } catch (err) {
    next(err);
  }
};

// Get All
const getAllExpensesController = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const expenses = await getExpenses(userId, req.query);

    res.status(200).json({
      success: true,
      data: expenses,
    });
  } catch (err) {
    next(err);
  }
};

// Get One
const getOneExpenseController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const expense = await getExpenseById(userId, id);

    res.status(200).json({
      success: true,
      data: expense,
    });
  } catch (err) {
    next(err);
  }
};

// Update
const updateExpenseController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const expense = await updateExpense(userId, id, req.body);

    res.status(200).json({
      success: true,
      data: expense,
    });
  } catch (err) {
    next(err);
  }
};

// Delete
const deleteExpenseController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    await deleteExpense(userId, id);

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createExpenseController,
  getAllExpensesController,
  getOneExpenseController,
  updateExpenseController,
  deleteExpenseController,
};*/


const service = require("./expense.service");
const { successResponse } = require("../../utils/response");
const STATUS = require("../../utils/statusCodes");
const MSG = require("../../utils/messages");

// Create Expense
const createExpenseController = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const expense = await service.createExpense(userId, req.body);

    return successResponse(
      res,
      expense,
      MSG.SUCCESS.CREATED,
      STATUS.CREATED
    );
  } catch (err) {
    next(err);
  }
};

// Get All Expenses
const getAllExpensesController = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const expenses = await service.getExpenses(userId, req.query);

    return successResponse(
      res,
      expenses,
      MSG.SUCCESS.FETCHED,
      STATUS.OK
    );
  } catch (err) {
    next(err);
  }
};

// Get Single Expense
const getOneExpenseController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const expense = await service.getExpenseById(userId, id);

    return successResponse(
      res,
      expense,
      MSG.SUCCESS.FETCHED,
      STATUS.OK
    );
  } catch (err) {
    next(err);
  }
};

// Update Expense
const updateExpenseController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const expense = await service.updateExpense(
      userId,
      id,
      req.body
    );

    return successResponse(
      res,
      expense,
      MSG.SUCCESS.UPDATED,
      STATUS.OK
    );
  } catch (err) {
    next(err);
  }
};

// Delete Expense
const deleteExpenseController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    await service.deleteExpense(userId, id);

    return successResponse(
      res,
      null,
      MSG.SUCCESS.DELETED,
      STATUS.OK
    );
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createExpenseController,
  getAllExpensesController,
  getOneExpenseController,
  updateExpenseController,
  deleteExpenseController,
};