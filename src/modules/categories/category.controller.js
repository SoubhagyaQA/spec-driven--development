const service = require("./category.service");
const { successResponse } = require("../../utils/response");
const STATUS = require("../../utils/statusCodes");
const MSG = require("../../utils/messages");

// Create
const createCategory = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const category = await service.createCategory(userId, req.body);

    return successResponse(
      res,
      category,
      MSG.SUCCESS.CREATED,
      STATUS.CREATED
    );
  } catch (err) {
    next(err);
  }
};

// Get All
const getAllCategory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const categories = await service.getCategories(userId);

    return successResponse(
      res,
      categories,
      MSG.SUCCESS.FETCHED,
      STATUS.OK
    );
  } catch (err) {
    next(err);
  }
};

// Get One
const getOneCategory= async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const category = await service.getCategoryById(userId, id);

    return successResponse(
      res,
      category,
      MSG.SUCCESS.FETCHED,
      STATUS.OK
    );
  } catch (err) {
    next(err);
  }
};

// Update
const updateCategory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const category = await service.updateCategory(
      userId,
      id,
      req.body
    );

    return successResponse(
      res,
      category,
      MSG.SUCCESS.UPDATED,
      STATUS.OK
    );
  } catch (err) {
    next(err);
  }
};

// Delete
const deleteCategory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    await service.deleteCategory(userId, id);

    return successResponse(
      res,
      null,
      MSG.SUCCESS.DELETED,
      STATUS.OK
    );
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCategory,
  getAllCategory,
  getOneCategory,
  updateCategory,
  deleteCategory,
};