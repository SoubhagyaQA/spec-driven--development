const repo = require("./category.repository");

// Create Category
const createCategory = async (userId, data) => {
  const payload = {
    ...data,
    userId,
  };

  return repo.create(payload);
};
// Get All Categories
const getCategories = async (userId) => {
  return repo.findAll(userId);
};
// Get One Category
const getCategoryById = async (userId, id) => {
  const category = await repo.findById(id, userId);

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};
// Update Category
const updateCategory = async (userId, id, data) => {
  const category = await repo.update(id, userId, data);

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};
// Delete Category
const deleteCategory = async (userId, id) => {
  const category = await repo.remove(id, userId);

  if (!category) {
    throw new Error("Category not found");
  }

  return true;
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};