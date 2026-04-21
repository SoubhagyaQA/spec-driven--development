const Joi = require("joi");

// Create Expense
const createExpense = Joi.object({
  amount: Joi.number().positive().required().messages({
      "number.base": "Amount must be a number",
      "number.positive": "Amount must be greater than 0",
      "any.required": "Amount is required",
    }),
  categoryId: Joi.string().hex().length(24).required().messages({
      "string.length": "Invalid category ID",
      "any.required": "Category ID is required",
    }),
  date: Joi.date().max("now").required().messages({
      "date.max": "Date cannot be in the future",
      "any.required": "Date is required",
    }),
  notes: Joi.string().trim().max(200).allow("", null).optional(),
});

//Get All Expenses (filters + pagination)
const getAllExpense = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  categoryId: Joi.string().hex().length(24).optional(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().min(Joi.ref("startDate")).optional().messages({
      "date.min": "End date must be greater than start date",
    }),
});

// Get One Expense
const getOneExpense = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
      "string.length": "Invalid expense ID",
    }),
});

//Update Expense
const updateExpense = Joi.object({
  amount: Joi.number().positive().optional(),
  categoryId: Joi.string().hex().length(24).optional(),
  date: Joi.date().max("now").optional(),
  notes: Joi.string().trim().max(200).allow("", null).optional()}).min(1); 

// Delete Expense
const deleteExpense = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
      "string.length": "Invalid expense ID",
    }),
});

module.exports = {
  createExpense,
  getAllExpense,
  getOneExpense,
  updateExpense,
  deleteExpense,
};