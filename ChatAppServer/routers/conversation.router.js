const express = require('express');
const router = express.Router();
const conversations = require('../controllers/conversation.controller');

router.post('/conversation',conversations.makeConversations);
router.get('/conversation/:userId',conversations.getConversations);


module.exports = router;