const express = require("express");
const expenseController = require("./expense.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");
const {createExpense,getAllExpense,getOneExpense,updateExpense,deleteExpense} = require("./expense.validation");
const router = express.Router();

// Public route: Create expense (we want to allow unauthenticated users to create expenses, but they will be associated with userId): null)
router.post("/create-expense", validate(createExpense), expenseController.createExpenseController);

// Protect all other routes
router.use(authMiddleware);

router.get("/get-expenses", validate(getAllExpense, "query"), expenseController.getAllExpensesController);
router.get("/get-expense/:id", validate(getOneExpense, "params"), expenseController.getOneExpenseController);
router.put("/update-expense/:id", validate(updateExpense, "params"), expenseController.updateExpenseController);
router.delete("/delete-expense/:id", validate(deleteExpense, "params"), expenseController.deleteExpenseController);

// If there were any other protected routes, we would add router.use(authMiddleware) here

module.exports = router;