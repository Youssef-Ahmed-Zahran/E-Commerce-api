const { Order } = require("../models/Order");

// Http Methods / Verbs

/**
 *   @desc   Get All Orders
 *   @route  /api/orders
 *   @method  Get
 *   @access  private (only admin)
 */
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 *   @desc   Get Ordeer By Id
 *   @route  /api/orders/:id
 *   @method  Get
 *   @access  private (only admin & User himself)
 */
const getOrderById = async (req, res) => {
  try {
    const order = await Order.find({ userId: req.params.id });
    if (order) {
      return res.status(200).json(order);
    } else {
      return res.status(404).json({ message: "Order not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 *   @desc   Create New Order
 *   @route  /api/orders
 *   @method  post
 *   @access  private (User himself)
 */
const createOrder = async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 *   @desc   Update Order By Id
 *   @route  /api/orders/:id
 *   @method  Put
 *   @access  private (only admin)
 */
const updateOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } else {
      return res.status(404).json({ message: "order not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 *   @desc   Delete Order By Id
 *   @route  /api/orders/:id
 *   @method  Delete
 *   @access  private (only admin)
 */
const deleteOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "order has been deleted successfully" });
    } else {
      return res.status(404).json({ message: "order not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// GET MONTHLY INCOME

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderById,
  deleteOrderById,
};
