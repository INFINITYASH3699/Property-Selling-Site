const Message = require('../models/Message');
const User = require('../models/User');
const Property = require('../models/Property');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get conversations for a user
// @route   GET /api/messages/conversations
// @access  Private
exports.getConversations = asyncHandler(async (req, res, next) => {
  // Get unique users the current user has conversed with
  const sentMessageUsers = await Message.aggregate([
    { $match: { sender: req.user._id } },
    { $group: { _id: '$recipient' } }
  ]);

  const receivedMessageUsers = await Message.aggregate([
    { $match: { recipient: req.user._id } },
    { $group: { _id: '$sender' } }
  ]);

  // Combine and deduplicate user IDs
  const userIds = [...new Set([
    ...sentMessageUsers.map(item => item._id.toString()),
    ...receivedMessageUsers.map(item => item._id.toString())
  ])];

  // For each conversation partner, get the latest message and unread count
  const conversations = [];

  for (const userId of userIds) {
    // Get latest message
    const latestMessage = await Message.findOne({
      $or: [
        { sender: req.user._id, recipient: userId },
        { sender: userId, recipient: req.user._id }
      ]
    }).sort({ createdAt: -1 });

    // Get unread count
    const unreadCount = await Message.countDocuments({
      sender: userId,
      recipient: req.user._id,
      read: false
    });

    // Get user details
    const user = await User.findById(userId).select('name email profileImage');

    if (user && latestMessage) {
      conversations.push({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          profileImage: user.profileImage
        },
        latestMessage: {
          _id: latestMessage._id,
          text: latestMessage.text,
          createdAt: latestMessage.createdAt,
          read: latestMessage.read,
          isFromUser: latestMessage.sender.toString() === userId
        },
        unreadCount
      });
    }
  }

  // Sort by latest message
  conversations.sort((a, b) => {
    return new Date(b.latestMessage.createdAt) - new Date(a.latestMessage.createdAt);
  });

  res.status(200).json({
    success: true,
    count: conversations.length,
    data: conversations
  });
});

// @desc    Get messages between two users
// @route   GET /api/messages/:userId
// @access  Private
exports.getMessages = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  // Verify user exists
  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${userId}`, 404));
  }

  // Get messages between users, sorted by date
  const messages = await Message.find({
    $or: [
      { sender: req.user._id, recipient: userId },
      { sender: userId, recipient: req.user._id }
    ]
  }).sort({ createdAt: 1 });

  // Mark messages as read
  await Message.updateMany(
    { sender: userId, recipient: req.user._id, read: false },
    { read: true }
  );

  res.status(200).json({
    success: true,
    count: messages.length,
    data: messages
  });
});

// @desc    Send a message to a user
// @route   POST /api/messages/:userId
// @access  Private
exports.sendMessage = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const { text, propertyId } = req.body;

  // Validate text
  if (!text || text.trim() === '') {
    return next(new ErrorResponse('Message text is required', 400));
  }

  // Verify recipient exists
  const recipient = await User.findById(userId);
  if (!recipient) {
    return next(new ErrorResponse(`User not found with id of ${userId}`, 404));
  }

  // If propertyId is provided, verify property exists
  if (propertyId) {
    const property = await Property.findById(propertyId);
    if (!property) {
      return next(new ErrorResponse(`Property not found with id of ${propertyId}`, 404));
    }
  }

  // Create message
  const message = await Message.create({
    sender: req.user._id,
    recipient: userId,
    text,
    propertyId: propertyId || undefined
  });

  res.status(201).json({
    success: true,
    data: message
  });
});

// @desc    Get unread message count for logged in user
// @route   GET /api/messages/unread
// @access  Private
exports.getUnreadCount = asyncHandler(async (req, res, next) => {
  const unreadCount = await Message.countDocuments({
    recipient: req.user._id,
    read: false
  });

  res.status(200).json({
    success: true,
    data: { unreadCount }
  });
});

// @desc    Mark messages as read
// @route   PUT /api/messages/:userId/read
// @access  Private
exports.markAsRead = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  // Mark all messages from this user as read
  const result = await Message.updateMany(
    { sender: userId, recipient: req.user._id, read: false },
    { read: true }
  );

  res.status(200).json({
    success: true,
    data: { modifiedCount: result.modifiedCount }
  });
});
