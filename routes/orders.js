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
  getMonthlyIncome,
} = require("../controller/orderController");

// Http Methods / Verbs

router
  .route("/")
  .get(verifyTokenAndAdmin, getAllOrders)
  .post(verifyTokenAndAuthorization, createOrder);

router.get("/income", verifyTokenAndAdmin, getMonthlyIncome);

router
  .route("/:id")
  .put(verifyTokenAndAdmin, updateOrderById)
  .delete(verifyTokenAndAdmin, deleteOrderById)
  .get(verifyTokenAndAuthorization, getOrderById);

module.exports = router;
