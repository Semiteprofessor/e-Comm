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
    const cartId = 
    try {
        
    } catch (error) {
        
    }
};
