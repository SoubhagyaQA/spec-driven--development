const repo = require("./auth.repository");
const bcrypt = require("bcrypt");
const jwtUtil = require("../../utils/jwt");

// Register
const register = async (data) => {
  const { name, email, password, phone } = data;

  const existingUser = await repo.findByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await repo.create({
    name,
    email,
    password: hashedPassword,
    phone,
  });

  const userObj = user.toObject();
  delete userObj.password;

  return userObj;
};

// Login
const login = async (data) => {
  const { email, password } = data;

  const user = await repo.findByEmail(email);
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwtUtil.generateToken(user);

  const userObj = user.toObject();
  delete userObj.password;

  return {
    user: userObj,
    token,
  };
};

module.exports = {
  register,
  login,
};