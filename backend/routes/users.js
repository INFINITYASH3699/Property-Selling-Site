const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { uploadProfileImage } = require('../middleware/upload');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  uploadUserPhoto
} = require('../controllers/userController');

// Routes
router
  .route('/')
  .get(protect, authorize('admin'), getUsers)
  .post(protect, authorize('admin'), createUser);

router
  .route('/:id')
  .get(protect, authorize('admin'), getUser)
  .put(protect, authorize('admin'), updateUser)
  .delete(protect, authorize('admin'), deleteUser);

router
  .route('/:id/photo')
  .put(protect, authorize('admin'), uploadProfileImage, uploadUserPhoto);

module.exports = router;