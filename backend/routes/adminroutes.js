const express = require('express');
const { adminSignup, loginUserController } = require('../controller/adminController');
const router = express.Router();

router.post('/signup', adminSignup);
router.post('/login', loginUserController);

module.exports = router;