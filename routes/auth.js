const router = require("express").Router();
const { register, login } = require("../controller/authController");

// Http Methods / Verbs

// api/auth/register
router.post("/register", register);

// api/auth/login
router.post("/login", login);

module.exports = router;
