const express = require('express');
const router = express.Router();
const profiles = require('../controllers/profile.controller');
const upload = require('../multer/connection');


router.post('/edit/profile',upload.single("avatar"),profiles.EditProfile);
router.post('/upload',profiles.UploadFile);




module.exports = router;