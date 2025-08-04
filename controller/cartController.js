const { Cart } = require("../models/Cart");

// Http Methods / Verbs

/**
 *   @desc   Get All Cart
 *   @route  /api/carts
 *   @method  Get
 *   @access  private (only admin)
 */
const getAllCart = async (req, res) => {
  try {
    const carts = await User.find();
    res.status(200).json(carts);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 *   @desc   Get Cart By Id
 *   @route  /api/carts/:id
 *   @method  Get
 *   @access  private (only admin & User himself)
 */
const getCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (cart) {
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Cart not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 *   @desc   Create New Cart
 *   @route  /api/carts
 *   @method  post
 *   @access  private (User himself)
 */
const createCart = async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 *   @desc   Update Cart By Id
 *   @route  /api/carts/:id
 *   @method  Put
 *   @access  private (only admin & User himself)
 */
const updateCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (cart) {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCart);
    } else {
      return res.status(404).json({ message: "Cart not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 *   @desc   Delete Cart By Id
 *   @route  /api/carts/:id
 *   @method  Delete
 *   @access  private (only admin & User himself)
 */
const deleteCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (cart) {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "cart has been deleted successfully" });
    } else {
      return res.status(404).json({ message: "Cart not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getAllCart,
  getCartById,
  createCart,
  updateCartById,
  deleteCartById,
};
