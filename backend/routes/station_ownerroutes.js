const express = require('express');
const { registerUserController, loginUserController } = require('../controller/station_ownerController');
const router = express.Router();

router.post('/register', registerUserController);

router.post('/login', loginUserController);

module.exports = router;