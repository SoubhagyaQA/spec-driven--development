const express = require("express");
const expenseController = require("./expense.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");
const {createExpense,getAllExpense,getOneExpense,updateExpense,deleteExpense} = require("./expense.validation");
const router = express.Router();

// Protect all routes
router.use(authMiddleware);

router.post("/create-expense",validate(createExpense), expenseController.createExpenseController);
router.get("/get-expenses",authMiddleware, validate(getAllExpense), expenseController.getAllExpensesController);
router.get("/get-expense/:id",authMiddleware, validate(getOneExpense), expenseController.getOneExpenseController);
router.put("/update-expense/:id", authMiddleware, validate(updateExpense), expenseController.updateExpenseController);
router.delete("/delete-expense/:id", authMiddleware, validate(deleteExpense), expenseController.deleteExpenseController);

module.exports = router;