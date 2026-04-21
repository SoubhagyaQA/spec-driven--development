const router = require("express").Router();
const ctrl = require("./auth.controller");
const validate = require("../../middlewares/validate.middleware");

const {registerSchema,loginSchema} = require("./auth.validation");

router.post("/register", validate(registerSchema), ctrl.registerUser);
router.post("/login", validate(loginSchema), ctrl.loginUser);

module.exports = router;