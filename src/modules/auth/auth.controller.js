const service = require("./auth.service");
const { successResponse } = require("../../utils/response");
const STATUS = require("../../utils/statusCodes");
const MSG = require("../../utils/messages");

// Register
const registerController = async (req, res, next) => {
  try {
    const user = await service.register(req.body);

    return successResponse(
      res,
      user,
      MSG.SUCCESS.CREATED,
      STATUS.CREATED
    );
  } catch (err) {
    next(err);
  }
};

// Login
const loginController = async (req, res, next) => {
  try {
    const data = await service.login(req.body);

    return successResponse(
      res,  
      data,
      MSG.SUCCESS.FETCHED,
      STATUS.OK
    );
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerController,
  loginController,
};