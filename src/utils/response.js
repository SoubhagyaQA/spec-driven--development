// // Success Response
// const successResponse = (res, data = {}, message = "Success", statusCode = 200) => {
//   return res.status(statusCode).json({
//     success: true,
//     message,
//     data,
//   });
// };

// // Error Response
// const errorResponse = (res, message = "Something went wrong", statusCode = 500, errors = []) => {
//   return res.status(statusCode).json({
//     success: false,
//     message,
//     errors,
//   });
// };

// module.exports = {
//   successResponse,
//   errorResponse,
// };

const STATUS = require("./statusCodes");

const successResponse = (res, data, message, status = STATUS.OK) => {
  return res.status(status).json({
    success: true,
    statusCode: status,
    message,
    data,
  });
};

const errorResponse = (res, message, status, errors = []) => {
  return res.status(status).json({
    success: false,
    statusCode: status,
    message,
    errors,
  });
};

module.exports = {
  successResponse,
  errorResponse,
};