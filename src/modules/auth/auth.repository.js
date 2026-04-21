const User = require("../users/user.model");

// Create
const create = (data) => {
  return User.create(data);
};

// Find by email
const findByEmail = (email) => {
  return User.findOne({ email });
};

// Find by ID
const findById = (id) => {
  return User.findById(id);
};

module.exports = {
  create,
  findByEmail,
  findById,
};