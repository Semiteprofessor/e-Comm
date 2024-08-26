const productModel = require("../models/product.model");

const createProduct = async (req, res) => {
  try {
    const { title, desc, img, categories, size, color, price, inStock } =
      req.body;
    await productModel.create({
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
