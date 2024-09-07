const router = require("express").Router();

const {
  updateUser,
  deleteUser,
  getSingleUser,
  getAllUsers,
  getUserStatistics,
} = require("../cores/user.core");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../utils/verifyToken.util");

// UPDATE USER
router.put("/:id", verifyTokenAndAuthorization, updateUser);

// DELETE USER
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

// GET USER
router.get("/find/:id", verifyTokenAndAdmin, getSingleUser);

// GET USERS
router.get("/", verifyTokenAndAdmin, getAllUsers);

// GET USER STATISTICS
router.get("/stats", verifyTokenAndAdmin, getUserStatistics);
