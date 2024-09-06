const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../utils/verifyToken.util");
const {
  addToCart,
  deleteCart,
  updateCart,
  getCarts,
  getCart,
} = require("../cores/cart.core");

const router = require("express").Router();

// CREATE CART ROUTE
router.post("/add", verifyToken, addToCart);

// UPDATE CART ROUTE
router.post("/update/:id", verifyTokenAndAuthorization, updateCart);

// DELETE CART ROUTE
router.delete("/delete/:id", verifyTokenAndAuthorization, deleteCart);

// GET CART ROUTE
router.get("/find/:id", verifyTokenAndAuthorization, getCart);

// GET CARTS ROUTE
router.get("/", verifyTokenAndAdmin, getCarts);

module.exports = router;
