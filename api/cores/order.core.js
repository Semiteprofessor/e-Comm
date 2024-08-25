const Order = require("../models/order.model");

const createOrder = async (req, res) => {
  try {
    const { product, amount, address, status } = req.body;
    const newOrder = await Order.create({
      product,
      amount,
      address,
      status,
    });
    res
      .status(200)
      .json({ status: true, message: "Order created successfully", newOrder });
  } catch (error) {
    res.status(500).json({
      status: true,
      message: "Error creating order",
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params._id;
    const updateOrder = await Order.findByIdAndUpdate(
      orderId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      status: true,
      message: "Order updated successfully",
      updateOrder,
    });
  } catch (error) {
    res.status(500).json({
      status: true,
      message: "Error updating order",
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params._id;
    await Order.findByIdAndDelete(orderId);

    res.status(200).json({
      status: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: true,
      message: "Error deleting order",
    });
  }
};

const getOrder = async (req, res) => {
  try {
    const orderId = req.params._id;
    const order = await Order.findById();

    res.status(200).json({
      status: true,
      message: "Single Order fetched successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      status: true,
      message: "Error fetching single order",
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json({
      status: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    res.status(500).json({
      status: true,
      message: "Error fetching order",
    });
  }
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getOrders,
};
