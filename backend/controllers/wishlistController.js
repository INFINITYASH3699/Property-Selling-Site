const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Wishlist = require('../models/Wishlist');
const Property = require('../models/Property');

// @desc    Get user's wishlist
// @route   GET /api/wishlist
// @access  Private
exports.getWishlist = asyncHandler(async (req, res, next) => {
  let wishlist = await Wishlist.findOne({ user: req.user.id }).populate({
    path: 'properties',
    select: 'title price images address propertyType bedrooms bathrooms status'
  });
  
  if (!wishlist) {
    // Create empty wishlist if not exists
    wishlist = await Wishlist.create({
      user: req.user.id,
      properties: []
    });
  }
  
  res.status(200).json({
    success: true,
    count: wishlist.properties.length,
    data: wishlist
  });
});

// @desc    Add property to wishlist
// @route   POST /api/wishlist/:propertyId
// @access  Private
exports.addToWishlist = asyncHandler(async (req, res, next) => {
  // Check if property exists
  const property = await Property.findById(req.params.propertyId);
  
  if (!property) {
    return next(new ErrorResponse(`Property not found with id of ${req.params.propertyId}`, 404));
  }
  
  // Find or create wishlist
  let wishlist = await Wishlist.findOne({ user: req.user.id });
  
  if (!wishlist) {
    wishlist = await Wishlist.create({
      user: req.user.id,
      properties: [req.params.propertyId]
    });
  } else {
    // Don't add duplicates
    if (!wishlist.properties.includes(req.params.propertyId)) {
      wishlist.properties.push(req.params.propertyId);
      await wishlist.save();
    }
  }
  
  res.status(200).json({
    success: true,
    data: wishlist
  });
});

// @desc    Remove property from wishlist
// @route   DELETE /api/wishlist/:propertyId
// @access  Private
exports.removeFromWishlist = asyncHandler(async (req, res, next) => {
  let wishlist = await Wishlist.findOne({ user: req.user.id });
  
  if (!wishlist) {
    return next(new ErrorResponse(`Wishlist not found`, 404));
  }
  
  // Filter out the property to remove
  wishlist.properties = wishlist.properties.filter(
    property => property.toString() !== req.params.propertyId
  );
  
  await wishlist.save();
  
  res.status(200).json({
    success: true,
    data: wishlist
  });
});

// @desc    Clear wishlist
// @route   DELETE /api/wishlist
// @access  Private
exports.clearWishlist = asyncHandler(async (req, res, next) => {
  let wishlist = await Wishlist.findOne({ user: req.user.id });
  
  if (!wishlist) {
    return next(new ErrorResponse(`Wishlist not found`, 404));
  }
  
  wishlist.properties = [];
  await wishlist.save();
  
  res.status(200).json({
    success: true,
    data: {}
  });
});