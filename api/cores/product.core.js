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

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params._id;
    await Product.findByIdAndDelete(productId);
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

const getSingleProduct = async (req, res) => {
  try {
    const productId = req.params._id;
    const product = await Product.findById(productId);
    res.status(200).json({
      status: true,
      message: "Single Product fetched successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      Message: "Error fetching single product",
    });
  }
};

const getProducts = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sor({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json({
      status: true,
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      Message: "Error fetching product",
    });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  getProducts,
};
