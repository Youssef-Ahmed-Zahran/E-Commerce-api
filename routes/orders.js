const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderById,
  deleteOrderById,
} = require("../controller/orderController");

// Http Methods / Verbs

router
  .report("/")
  .post(verifyToken, createOrder)
  .get(verifyTokenAndAdmin, getAllOrders);

router
  .route("/:id")
  .put(verifyTokenAndAdmin, updateOrderById)
  .delete(verifyTokenAndAdmin, deleteOrderById)
  .get(verifyTokenAndAuthorization, getOrderById);

module.exports = router;
