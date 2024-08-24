const Cart = require("../models/cart.model");

const addToCart = async (req, res) => {
  const { carts } = req.body;
  try {
    const newCart = await Cart.create({
      carts,
    });
    res.status(200).json({
      status: true,
      message: "Cart added successfully",
      newCart,
    });
  } catch (error) {
    res.status(500).json({
      status: true,
      message: "Error adding cart",
    });
  }
};

const updateCart = async (req, res) => {
  const cartId = req.params._id;
  try {
    await Cart.findByIdAndUpdate(cartId, { $set: req.body }, { new: true });
    res.status(200).json({
      status: true,
      message: "Cart updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: true,
      message: "Error updating cart",
    });
  }
};

const deleteCart = async (req, res) => {
  const cartId = req.params._id;
  try {
    await Cart.findByIdAndDelete(cartId);
    res.status(200).json({
      status: true,
      message: "Cart deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: true,
      message: "Error deleting cart",
    });
  }
};

const getCart = async (req, res) => {
  const cartId = req.params._id;
  try {
    const cart = Cart.findById(cartId);

    res.status(200).json({
      status: true,
      message: "Single Cart fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: true,
      message: "Error fetching single cart",
    });
  }
};

const getCarts = async (req, res) => {
  try {
    const carts = Cart.find();
    res.status(200).json({
      status: true,
      message: "Cart fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: true,
      message: "Error fetching cart",
    });
  }
};

module.exports = {
  addToCart,
  updateCart,
  deleteCart,
  getCart,
  getCarts,
};
