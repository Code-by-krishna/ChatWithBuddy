const express = require('express');
const router = express.Router();
const messages = require('../controllers/message.controller')

router.post('/message',messages.makeMessages);
router.get('/message/:conversationId',messages.getMessages);




module.exports = router;