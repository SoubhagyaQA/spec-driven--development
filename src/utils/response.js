// const { formatDateTime } = require("./moment");

// // common formatter
// const formatData = (data) => {
//   if (!data) return data;

//   if (Array.isArray(data)) {
//     return data.map(formatData);
//   }

//   // Object
//   if (typeof data === "object") {
//     const obj = {};

//     for (let key in data) {
//       let value = data[key];

//       // remove sensitive fields
//       if (key === "password" || key === "__v") continue;

//       // format date fields
//       if (key === "createdAt" || key === "updatedAt" || key === "deletedAt") {
//         obj[key] = formatDateTime(value);
//       }
//       // recursion for nested object
//       else if (typeof value === "object" && value !== null) {
//         obj[key] = formatData(value);
//       }
//       // normal value
//       else {
//         obj[key] = value;
//       } 
//     }
//     return obj;
//   }
//   return data;
// };
const STATUS = require("./statusCodes");
//this is for success response
const successResponse = (res, data, message, status = STATUS.OK) => {
  return res.status(status).json({
    success: true,
    statusCode: status,
    message,
    data,
  });
};

//this is for error response
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