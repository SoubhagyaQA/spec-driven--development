const Joi = require("joi");

// CREATE
const categoryCreate = Joi.object({
  name: Joi.string().trim().lowercase().min(2).max(50).required(),
});

// GET ALL
const categoryGetAll = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  search: Joi.string().trim().optional(),
});

// PARAM ID
const categoryId = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

// UPDATE
const categoryUpdate = Joi.object({
  name: Joi.string().trim().min(2).max(50).optional(),
}).min(1);

// DELETE
const categoryRemove = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

module.exports = {
  categoryCreate,
  categoryGetAll,
  categoryId,
  categoryUpdate,
  categoryRemove,
};