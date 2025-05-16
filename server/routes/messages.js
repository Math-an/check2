const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

const { protect } = require('../middleware/auth');

// Use controller functions for routes
router.get('/', protect, messageController.getAllMessages); // GET all messages
router.post('/', protect, messageController.createMessage); // POST a new message
router.get('/:id', protect, messageController.getMessageById); // GET a single message or thread

module.exports = router;