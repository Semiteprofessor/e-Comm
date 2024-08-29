const User = require("../models/user.model");
const { registerUserValidation } = require("../validations/user.vdn");
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
        process.env.PASS_SEC
      ).toString(),
    });
  } catch (error) {}
};
