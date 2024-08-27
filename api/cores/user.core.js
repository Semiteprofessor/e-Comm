const User = require("../models/user.model");

const updateUser = async (req, res, next) => {
  const { password } = req.body;
  if (password) {
    password = CryptoJS.AES.encrypt(
      password,
      process.env.PASS_SECRET
    ).toString();
  }

  try {
    const { userId } = req.params._id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUser = async (req, res, next) => {
  const { userId } = req.params._id;
  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSingleUser = async (req, res, next) => {
  const { userId } = req.params._id;
  try {
    const user = await User.findById(userId);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllUsers = async (req, res, next) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUserStatistics = async (req, res, next) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getSingleUser,
  getAllUsers,
  getUserStatistics,
};
