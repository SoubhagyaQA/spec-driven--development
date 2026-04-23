const express = require("express");
const categoryController = require("./category.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");
const {categoryId,categoryCreate,categoryGetAll,categoryGetOne,categoryUpdate,categoryRemove} = require("./category.validation");
const router = express.Router();

// Public route: Create category(we want to allow unauthenticated users to create categories, but they will be associated with userId): null)
router.post("/category-creates", validate(categoryCreate), categoryController.createCategory);

// Protected routes: All others
router.use(authMiddleware);

router.get("/getall-category", validate(categoryGetAll, "query"), categoryController.getAllCategory);
router.get("/category/:id", validate(categoryId, "params"), categoryController.getOneCategory);
router.put("/update-category/:id", validate(categoryId, "params"), validate(categoryUpdate), categoryController.updateCategory);
router.delete("/category/:id", validate(categoryId, "params"), categoryController.deleteCategory);

// If there were any other protected routes, we would add router.use(authMiddleware) here
module.exports = router;