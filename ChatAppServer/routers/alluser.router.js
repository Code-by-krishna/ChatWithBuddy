const express = require('express');
const Alluser = require('../controllers/alluser.controller');
const router = express.Router();


router.get('/:userId',Alluser.Fetchuser);




module.exports = router;