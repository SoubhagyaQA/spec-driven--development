const express = require("express");
const categoryController = require("./category.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");
const {categoryCreate,categoryGetAll,categoryGetOne,categoryUpdate,categoryRemove} = require("./category.validation");
const router = express.Router();
// Protect all routes
router.use(authMiddleware);

router.post("/category-creates",validate(categoryCreate), categoryController.createCategory);
router.get("/getall-category", authMiddleware,validate(categoryGetAll),categoryController.getAllCategory);
router.get("/category/:id", authMiddleware,validate(categoryGetOne),categoryController.getOneCategory);
router.put("/update-category/:id",authMiddleware,validate(categoryGetOne),validate(categoryUpdate),categoryController.updateCategory);
router.delete("/category/:id",authMiddleware,validate(categoryRemove),categoryController.deleteCategory);

module.exports = router;