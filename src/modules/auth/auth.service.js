const repo = require("./auth.repository");
const bcrypt = require("bcrypt");
const jwt = require("../../utils/jwt");

// Register
const register = async (data) => {
  const { name, email, password } = data;

  const existingUser = await repo.findByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await repo.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
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

  const token = jwt.generateToken({ id: user._id });

  return {
    user,
    token,
  };
};

module.exports = {
  register,
  login,
};