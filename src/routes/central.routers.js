const router = require("express").Router();

router.use("/auth", require("../modules/auth/auth.route"));
router.use("/expenses", require("../modules/expenses/expense.route"));
router.use("/categories", require("../modules/categories/category.route"));
router.use("/summaries", require("../modules/summaries/summary.route"));

module.exports = router;