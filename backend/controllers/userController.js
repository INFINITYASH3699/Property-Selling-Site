const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const cloudinary = require('../config/cloudinary');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Create user
// @route   POST /api/users
// @access  Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user
  });
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

  // If user has a profile image, delete it from Cloudinary
  if (user.profileImage && user.profileImage.public_id) {
    try {
      await cloudinary.uploader.destroy(user.profileImage.public_id);
    } catch (error) {
      console.error(`Failed to delete profile image: ${error.message}`);
    }
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Upload user profile image
// @route   PUT /api/users/:id/photo
// @access  Private/Admin
exports.uploadUserPhoto = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

  if (!req.file) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  // Check file size
  if (req.file.size > 1000000) {
    return next(new ErrorResponse(`Please upload an image less than 1MB`, 400));
  }

  // Delete previous image if exists
  if (user.profileImage && user.profileImage.public_id) {
    try {
      await cloudinary.uploader.destroy(user.profileImage.public_id);
    } catch (error) {
      console.error(`Failed to delete previous profile image: ${error.message}`);
    }
  }

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'profiles',
      width: 150,
      crop: 'scale'
    });

    // Update user
    user.profileImage = {
      public_id: result.public_id,
      url: result.secure_url
    };

    await user.save();

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    return next(new ErrorResponse(`Problem with file upload: ${error.message}`, 500));
  }
});