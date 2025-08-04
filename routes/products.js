const router = require("express").Router();
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");
const {
  getAllProduct,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
} = require("../controller/productController");

// Http Methods / Verbs

router.route("/").post(verifyTokenAndAdmin, createProduct).get(getAllProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(verifyTokenAndAdmin, updateProductById)
  .delete(verifyTokenAndAdmin, deleteProductById);

module.exports = router;
