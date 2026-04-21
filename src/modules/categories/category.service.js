const mongoose = require("mongoose");
const Category = require("./category.model");

// Create Category
const createCategory = async (userId, data) => {
  try {
    const category = await Category.create({
      name: data.name,
      userId,
    });
    return category;
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Category already exists");
    }
    throw error;
  }
};

// Get All Categories
const getCategories = async (userId) => {
  return Category.find({ userId }).sort({ createdAt: -1 });
};

// Get Category by ID
const getCategoryById = async (userId, categoryId) => {
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    throw new Error("Invalid category ID");
  }

  const category = await Category.findOne({
    _id: categoryId,
    userId,
  });

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

// Update Category
const updateCategory = async (userId, categoryId, data) => {
  const category = await Category.findOneAndUpdate(
    { _id: categoryId, userId },
    { name: data.name },
    { new: true, runValidators: true }
  );
  if (!category) {
    throw new Error("Category not found");
  }
  return category;
};

// Delete Category
const deleteCategory = async (userId, categoryId) => {
  const category = await Category.findOneAndDelete({
    _id: categoryId,
    userId,
  });

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