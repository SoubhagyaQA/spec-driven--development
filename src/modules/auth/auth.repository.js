const User = require("../users/user.model");

// Create
const create = (data) => {
  return User.create(data);
};

const findByEmail = (email) => {
  return User.findOne({ email });
};

const findById = (id) => {
  return User.findById(id);
};

module.exports = {
  create,
  findByEmail,
  findById,
};