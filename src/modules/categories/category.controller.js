const {createCategory,getCategories,getCategoryById,updateCategory,deleteCategory} = require("./category.service");
// Create
const categoryCreate = async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (!req.body.name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }
    const category = await createCategory(userId, req.body);
    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// Get All
const getAllcategory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const categories = await getCategories(userId);
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};
// Get One
const getOnecategory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const category = await getCategoryById(userId, id);

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// Update
const updatecategory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    if (!req.body.name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const category = await updateCategory(userId, id, req.body);

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// Delete
const removecategory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    await deleteCategory(userId, id);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  categoryCreate,
  getAllcategory,
  getOnecategory,
  updatecategory,
  removecategory,
};