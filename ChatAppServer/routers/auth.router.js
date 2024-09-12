const express = require('express');
const router = express.Router();
const authanticateUser = require('../controllers/auth.controller');

router.post('/register',authanticateUser.registration);
router.post('/login',authanticateUser.login);
router.post('/verify-otp',authanticateUser.OTPVerification);
router.post('/verify-email',authanticateUser.EmailVerification)



module.exports = router;