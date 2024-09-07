const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../utils/verifyToken.util");
const { createOrder, updateOrder, deleteOrder, getOrder, getOrders } = require("../cores/order.core");

const router = require("express").Router();

// CREATE ORDER ROUTE
router.post("/create", verifyToken, createOrder);

// UPDATE ORDER ROUTE
router.post("/update/:id", verifyTokenAndAdmin, updateOrder);

// DELETE ORDER ROUTE
router.delete("/delete/:id", verifyTokenAndAdmin, deleteOrder);

// GET ORDER ROUTE
router.get("/find/:id", getOrder);

// GET ORDERS ROUTE
router.get("/", getOrders);
