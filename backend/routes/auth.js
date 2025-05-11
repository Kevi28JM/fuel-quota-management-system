const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);

router.post("/admin-signup", authController.adminSignup);

module.exports = router;
