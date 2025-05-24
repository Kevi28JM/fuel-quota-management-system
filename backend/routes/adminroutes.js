const express = require('express');
const router = express.Router();
const { adminSignup, loginUserController, getAdminReports } = require('../controller/adminController');

router.post('/signup', adminSignup);
router.post('/login', loginUserController);
router.get('/reports', getAdminReports);

module.exports = router;