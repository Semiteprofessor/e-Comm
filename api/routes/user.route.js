const router = require("express").Router();

const { updateUser, deleteUser } = require("../cores/user.core");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../utils/verifyToken.util");

// UPDATE USER
router.put("/:id", verifyTokenAndAuthorization, updateUser);

// DELETE USER
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

// DELETE USER
router.get("/:id", verifyTokenAndAuthorization, deleteUser);