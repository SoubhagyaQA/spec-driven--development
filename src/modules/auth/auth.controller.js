// const bcrypt = require("bcryptjs");
// const User = require("../users/user.model");
// const { generateToken } = require("../../utils/jwt");

// const registerUser = async (req, res) => {
//   try {
//     const { name, email, phone, password} = req.body;
//     const existingUser = await User.findOne({ email });
//     if (existingUser) 
//       return res.status(400).json({msg:'User already exists'});

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await User.create({
//       name,
//       email,
//       phone,
//       password: hashedPassword
//     });
//     res.status(200).json({ status: 201, msg: 'User registered successfully' });
//   } catch (err) { 
//     res.status(500).json({ status: 500, msg: 'Server error', error: err.message });
//   }
// };

// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ msg: "Invalid creds" });
//     }
//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       return res.status(400).json({ msg: "Invalid creds" });
//     }
//     const token = generateToken(user);
//     return res.status(200).json({
//      msg: "User login successfully",
//       user: {id: user._id},
//       token,
//     });

//   } catch (err) {
//     return res.status(500).json({msg: 'Server error',error: err.message});
//   }
// };

// module.exports = {
//   registerUser,
//   loginUser,
// };

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