const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const {
  hashPassword,
  generateOtp,
  comparePassword,
} = require("../utils/helpers");

const User = require("../models/user.model");
const {
  registerUserValidation,
  loginUserValidation,
} = require("../validations/user.vdn");
const CryptoJS = require("crypto-js");

const register = async (req, res) => {
  //create user
  const { error } = registerUserValidation(req.body);
  if (error !== undefined) {
    res.status(400).json({
      status: true,
      message: error.details[0].message || "Bad request",
    });
    return;
  }

  try {
    const { name, username, email, password } = req.body;
    const checkIfUserExist = await User.findOne({ email: email });

    if (checkIfUserExist) {
      res.status(400).json({
        status: false,
        message: "User already exist!",
      });
      return;
    }

    const { hash } = await hashPassword(password);
    await User.create({
      name,
      username,
      email,
      password: hash,
    });

    res.status(201).json({
      status: true,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || "Internal server error",
    });
  }
};

const login = async (req, res) => {
  //login user
  const { email, password } = req.body;
  try {
    if (!email || !password) throw new Error("All fields are required");
    const user = await User.findOne({ email: email });
    if (!user) throw new Error("Invalid email or password");

    const dataToaddInMyPayload = {
      email: user.email,
      _id: uuidv4(),
    };

    const compareHash = await bcrypt.compare(
      password,
      user.password,
      function (err, result) {
        if (err) {
          console.error("Error comparing passwords:", err);
        }

        if (!result) {
          console.log("Passwords do not match");
        } else {
          console.log("Passwords match");
        }
      }
    );
    const token = jwt.sign(dataToaddInMyPayload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.setHeader("Authorization", "Bearer " + token);

    return res.status(200).json({
      status: true,
      message: "User logged in successfully",
      data: user,
      token: token,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message || "Internal server error",
    });
  }
};

module.exports = { register, login };
