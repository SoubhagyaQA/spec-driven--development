const express = require("express");
const controller = require("./summary.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");
const { monthlySummarySchema } = require("./summary.validation");

const router = express.Router();

/* 
->Optional auth: Try to attach user if token exists, but don't block if it doesn't
 ->Actually the user wants it "like this" (meaning public routes first)
 ->But summaries ALWAYS need a filter. If no userId, it will just search for userId: null.
 */


router.get("/monthly-summary", validate(monthlySummarySchema, "query"), controller.monthlySummary);
router.get("/trends", controller.trends);

// If there were any other protected routes, we would add router.use(authMiddleware) here

module.exports = router;