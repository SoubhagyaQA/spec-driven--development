const Joi = require("joi");
const categoryCreate = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "Category name is required",
      "string.min": "Category must be at least 2 characters",
      "string.max": "Category cannot exceed 50 characters",
    }),
});
// Get All (with optional pagination)
const categoryGetAll = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  search: Joi.string().trim().optional(),
});
// Validate ID param
const categoryGetOne = Joi.object({
  id: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.length": "Invalid category ID",
      "any.required": "Category ID is required",
    }),
});
// Update Category
const categoryUpdate = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "Category name is required",
    }),
});
//Delete Category
const categoryRemove = Joi.object({
  id: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.length": "Invalid category ID",
    }),
});

module.exports = {
  categoryCreate,
  categoryGetAll,
  categoryGetOne,
  categoryUpdate,
  categoryRemove,
};