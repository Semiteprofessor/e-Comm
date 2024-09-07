const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../utils/verifyToken.util");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProducts,
} = require("../cores/product.core");

const router = require("express").Router();

// CREATE PRODUCT ROUTE
router.post("/create", verifyTokenAndAdmin, createProduct);

// UPDATE PRODUCT ROUTE
router.post("/update/:id", verifyTokenAndAdmin, updateProduct);

// DELETE PRODUCT ROUTE
router.delete("/delete/:id", verifyTokenAndAdmin, deleteProduct);

// GET PRODUCT ROUTE
router.get("/find/:id", getProduct);

// GET PRODUCTS ROUTE
router.get("/", getProducts);
