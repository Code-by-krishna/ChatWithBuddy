const express = require('express');
const router = express.Router();
const authanticateUser = require('../controllers/auth.controller');

router.post('/register',authanticateUser.registration);
router.post('/login',authanticateUser.login);
router.post('/verify-otp',authanticateUser.OTPVerification);



module.exports = router;