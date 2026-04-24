const { verifyToken } = require("../utils/jwt");
const { errorResponse } = require("../utils/response");
const STATUS = require("../utils/statusCodes");
const MSG = require("../utils/messages");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    //Check header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return errorResponse(
        res,
        MSG.ERROR.UNAUTHORIZED || "Unauthorized",
        STATUS.UNAUTHORIZED
      );
    }
    //Extract token
    const token = authHeader.split(" ")[1];
    // Verify token using your util
    const decoded = verifyToken(token);
    //CRITICAL CHECK
    if (!decoded || !decoded.id) {
      return errorResponse(
        res,
        "Invalid token payload",
        STATUS.UNAUTHORIZED
      );
    }
    // Attach user
    req.user = decoded;

    next();
  } catch (error) {
    return errorResponse(
      res,
      "Invalid or expired token",
      STATUS.UNAUTHORIZED
    );
  }
};

module.exports = authMiddleware;