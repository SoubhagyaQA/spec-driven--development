// module.exports = (err, req, res, next) => {
//   console.error(err);
//   res.status(500).json({ msg: "Server Error" });
// };

const { errorResponse } = require("../utils/response");
const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map(e => e.message);
    return errorResponse(res, "Validation Error", 400, errors);
  }
  // Duplicate key error
  if (err.code === 11000) {
    return errorResponse(res, "Duplicate value found", 409);
  }
  // Custom error
  if (err.message) {
    return errorResponse(res, err.message, 400);
  }
  return errorResponse(res, "Internal Server Error", 500);
};

module.exports = errorHandler;