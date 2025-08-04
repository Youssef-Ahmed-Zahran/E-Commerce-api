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
    const orders = await Order.find()
      .populate("userId", ["_id", "username"])
      .populate("products.productId", ["_id", "title"]);
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
    const order = await Order.findById(req.params.id)
      .populate("userId")
      .populate("products.productId");
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
 *   @access  private (only admin & User himself)
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
      )
        .populate("userId", ["_id", "username"])
        .populate("products.productId", ["_id", "title"]);
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

/**
 *   @desc   GET MONTHLY INCOME
 *   @route  /api/orders/income
 *   @method  Get
 *   @access  private (only admin)
 */
const getMonthlyIncome = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderById,
  deleteOrderById,
  getMonthlyIncome,
};
