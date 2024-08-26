const Product = require("../models/product.model");

const createProduct = async (req, res) => {
  try {
    const { title, desc, img, categories, size, color, price, inStock } =
      req.body;
    await Product.create({
      title,
      desc,
      img,
      categories,
      size,
      color,
      price,
      inStock,
    });

    res.status(200).json({
      status: true,
      message: "Product created successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      Message: "Error creating product",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params._id;
    await Product.findByIdAndUpdate(
      productId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      status: true,
      message: "Product updated successfully",
    });
  } catch (error) {}
  res.status(500).json({
    status: false,
    Message: "Error creating product",
  });
};
