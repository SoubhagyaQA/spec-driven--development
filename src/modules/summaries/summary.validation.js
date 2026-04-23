const Joi = require("joi");

// Monthly Summary validation
const monthlySummarySchema = Joi.object({
  month: Joi.number().min(1).max(12).required().messages({
      "number.base": "Month must be a number",
      "any.required": "Month is required",
    }),

  year: Joi.number().min(2000).required().messages({
      "number.base": "Year must be a number",
      "any.required": "Year is required",
    }),
});

module.exports = {
  monthlySummarySchema,
};