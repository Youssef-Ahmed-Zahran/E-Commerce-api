const { Product } = require("../models/Product");

// Http Methods / Verbs

/**
 *   @desc   Get All Product
 *   @route  /api/products
 *   @method  Get
 *   @access  public
 */
const getAllProduct = async (req, res) => {
  try {
    const qNew = req.query.new;
    const qCategory = req.query.category;

    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      products = await Product.find({ categories: { $in: [qCategory] } });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 *   @desc   Get Product By Id
 *   @route  /api/products/:id
 *   @method  Get
 *   @access  public
 */
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(404).json({ message: "product not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 *   @desc   Create New Products
 *   @route  /api/products
 *   @method  post
 *   @access  private (only admin)
 */
const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 *   @desc   Update Product By Id
 *   @route  /api/products/:id
 *   @method  Put
 *   @access  private (only admin)
 */
const updateProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } else {
      return res.status(404).json({ message: "product not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 *   @desc   Delete Product By Id
 *   @route  /api/products/:id
 *   @method  Delete
 *   @access  private (only admin)
 */
const deleteProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "user has been deleted successfully" });
    } else {
      return res.status(404).json({ message: "product not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getAllProduct,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
};
