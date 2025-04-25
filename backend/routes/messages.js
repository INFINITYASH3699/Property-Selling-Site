const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getConversations,
  getMessages,
  sendMessage,
  getUnreadCount,
  markAsRead
} = require('../controllers/messageController');

// Get conversations and unread count
router.route('/conversations').get(protect, getConversations);
router.route('/unread').get(protect, getUnreadCount);

// Routes for specific conversations
router.route('/:userId')
  .get(protect, getMessages)
  .post(protect, sendMessage);

// Mark messages as read
router.route('/:userId/read').put(protect, markAsRead);

module.exports = router;
