const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const {
  registerUserValidation,
  loginUserValidation,
} = require("../validations/user.vdn");
const CryptoJS = require("crypto-js");

const register = async (req, res) => {
  const { error } = registerUserValidation(req.body);
  if (error !== undefined)
    return res.status(401).json({
      status: true,
      message: error.details[0].message || "Bad request",
    });
  try {
    const { name, username, email, password } = req.body;
    const alreadyExist = await User.find({ email });
    if (alreadyExist.length > 0) {
      res.status(401).json({ status: false, message: "User already exist" });
    }
    await User.create({
      name,
      username,
      email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SECRET
      ).toString(),
    });

    res.status(200).json({
      status: true,
      message: "User registration successful",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "User registration failed" + error,
    });
  }
};

const login = async (req, res) => {
  const { error } = loginUserValidation(req.body);

  try {
    const { email, password } = req.body;
    const userExist = User.findOne({ email });

    if (!userExist) {
      res.status(401).json({
        status: false,
        message: "Invalid credentials!",
      });
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      userExist.password,
      process.env.PASS_SECRET
    );

    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    OriginalPassword !== password &&
      res.status(401).json("Invalid credentials!");

    const accessToken = jwt.sign(
      {
        id: userExist._id,
        isAdmin: userExist.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // const {password, ...info} = userExist._doc;

    res.status(200).json({
      status: true,
      message: "User logged in successfully",
      userExist,
      accessToken,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "User registration failed" + error,
    });
  }
};

module.exports = { register, login };
