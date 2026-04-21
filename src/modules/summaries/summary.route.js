const express = require("express");
const controller = require("./summary.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");
const { monthlySummarySchema } = require("./summary.validation");

const router = express.Router();

// Protect routes
router.use(authMiddleware);

router.get("/monthly-summary",authMiddleware,validate(monthlySummarySchema),controller.monthlySummary);
router.get("/trends", authMiddleware, /*validate(trendsSchema),*/ controller.trends);

module.exports = router;