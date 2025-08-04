const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");
const {
  getAllCart,
  getCartById,
  createCart,
  updateCartById,
  deleteCartById,
} = require("../controller/cartController");

// Http Methods / Verbs

router
  .route("/")
  .post(verifyTokenAndAuthorization, createCart)
  .get(verifyTokenAndAdmin, getAllCart);

router
  .route("/:id")
  .get(verifyTokenAndAuthorization, getCartById)
  .put(verifyTokenAndAuthorization, updateCartById)
  .delete(verifyTokenAndAuthorization, deleteCartById);

module.exports = router;
