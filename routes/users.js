const router = require("express").Router();
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");
const {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  userStats,
} = require("../controller/userController");

// Http Methods / Verbs

router.route("/").get(verifyTokenAndAdmin, getAllUsers);

router.get("/stats", verifyTokenAndAdmin, userStats);

router
  .route("/:id")
  .get(verifyTokenAndAuthorization, getUserById)
  .put(verifyTokenAndAuthorization, updateUserById)
  .delete(verifyTokenAndAuthorization, deleteUserById);

module.exports = router;
