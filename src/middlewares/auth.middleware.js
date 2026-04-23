/*const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware; */ 

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