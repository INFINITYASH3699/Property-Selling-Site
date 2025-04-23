const Property = require('../models/Property');
const cloudinary = require('../config/cloudinary');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const fs = require('fs');
const path = require('path');

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
exports.getProperties = asyncHandler(async (req, res, next) => {
  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit', 'q'];
  removeFields.forEach(param => delete reqQuery[param]);
  
  // Create query string
  let queryStr = JSON.stringify(reqQuery);
  
  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
  
  // Finding resource
  let query = Property.find(JSON.parse(queryStr)).populate('createdBy', 'name email');
  
  // Text search
  if (req.query.q) {
    query = query.find({ $text: { $search: req.query.q } });
  }
  
  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }
  
  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }
  
  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Property.countDocuments(JSON.parse(queryStr));
  
  query = query.skip(startIndex).limit(limit);
  
  // Executing query
  const properties = await query;
  
  // Pagination result
  const pagination = {};
  
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }
  
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }
  
  res.status(200).json({
    success: true,
    count: properties.length,
    pagination,
    totalPages: Math.ceil(total / limit),
    data: properties
  });
});

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
exports.getProperty = asyncHandler(async (req, res, next) => {
  const property = await Property.findById(req.params.id).populate('createdBy', 'name email');
  
  if (!property) {
    return next(new ErrorResponse(`Property not found with id of ${req.params.id}`, 404));
  }
  
  res.status(200).json({
    success: true,
    data: property
  });
});

// @desc    Create new property
// @route   POST /api/properties
// @access  Private (Admin, Agent)
exports.createProperty = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.createdBy = req.user.id;
  
  // Handle amenities if it's a string
  if (req.body.amenities && typeof req.body.amenities === 'string') {
    req.body.amenities = req.body.amenities.split(',').map(item => item.trim());
  }
  
  // Process images if uploaded
  const uploadedImages = [];
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      try {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'properties',
        });
        
        uploadedImages.push({
          public_id: result.public_id,
          url: result.secure_url
        });
        
        // Remove temp file
        fs.unlinkSync(file.path);
      } catch (error) {
        return next(new ErrorResponse(`Error uploading image: ${error.message}`, 500));
      }
    }
  }
  
  if (uploadedImages.length > 0) {
    req.body.images = uploadedImages;
  }
  
  const property = await Property.create(req.body);
  
  res.status(201).json({
    success: true,
    data: property
  });
});

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private (Admin, Agent)
exports.updateProperty = asyncHandler(async (req, res, next) => {
  let property = await Property.findById(req.params.id);
  
  if (!property) {
    return next(new ErrorResponse(`Property not found with id of ${req.params.id}`, 404));
  }
  
  // Make sure user is property owner or admin
  if (property.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this property`, 401));
  }
  
  // Handle amenities if it's a string
  if (req.body.amenities && typeof req.body.amenities === 'string') {
    req.body.amenities = req.body.amenities.split(',').map(item => item.trim());
  }
  
  property = await Property.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  res.status(200).json({
    success: true,
    data: property
  });
});

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private (Admin, Agent)
exports.deleteProperty = asyncHandler(async (req, res, next) => {
  const property = await Property.findById(req.params.id);
  
  if (!property) {
    return next(new ErrorResponse(`Property not found with id of ${req.params.id}`, 404));
  }
  
  // Make sure user is property owner or admin
  if (property.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this property`, 401));
  }
  
  // Delete images from Cloudinary
  if (property.images && property.images.length > 0) {
    for (const image of property.images) {
      try {
        await cloudinary.uploader.destroy(image.public_id);
      } catch (error) {
        console.error(`Failed to delete image ${image.public_id} from Cloudinary`);
      }
    }
  }
  
  await property.deleteOne();
  
  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get logged in user properties
// @route   GET /api/properties/my-properties
// @access  Private
exports.getMyProperties = asyncHandler(async (req, res, next) => {
  const properties = await Property.find({ createdBy: req.user.id });
  
  res.status(200).json({
    success: true,
    count: properties.length,
    data: properties
  });
});

// @desc    Upload images for property
// @route   POST /api/properties/:id/images
// @access  Private (Admin, Agent)
exports.uploadImages = asyncHandler(async (req, res, next) => {
  const property = await Property.findById(req.params.id);
  
  if (!property) {
    return next(new ErrorResponse(`Property not found with id of ${req.params.id}`, 404));
  }
  
  // Make sure user is property owner or admin
  if (property.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this property`, 401));
  }
  
  if (!req.files || req.files.length === 0) {
    return next(new ErrorResponse(`Please upload at least one image`, 400));
  }
  
  const uploadedImages = [];
  for (const file of req.files) {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'properties',
      });
      
      uploadedImages.push({
        public_id: result.public_id,
        url: result.secure_url
      });
      
      // Remove temp file
      fs.unlinkSync(file.path);
    } catch (error) {
      return next(new ErrorResponse(`Error uploading image: ${error.message}`, 500));
    }
  }
  
  // Add to existing images
  property.images = [...property.images, ...uploadedImages];
  await property.save();
  
  res.status(200).json({
    success: true,
    data: property
  });
});

// @desc    Delete property image
// @route   DELETE /api/properties/:id/images/:imageId
// @access  Private (Admin, Agent)
exports.deletePropertyImage = asyncHandler(async (req, res, next) => {
  const property = await Property.findById(req.params.id);
  
  if (!property) {
    return next(new ErrorResponse(`Property not found with id of ${req.params.id}`, 404));
  }
  
  // Make sure user is property owner or admin
  if (property.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this property`, 401));
  }
  
  // Find image by public_id
  const imageIndex = property.images.findIndex(
    img => img.public_id === req.params.imageId
  );
  
  if (imageIndex === -1) {
    return next(new ErrorResponse(`Image not found`, 404));
  }
  
  // Delete from Cloudinary
  try {
    await cloudinary.uploader.destroy(property.images[imageIndex].public_id);
  } catch (error) {
    return next(new ErrorResponse(`Error deleting image from storage: ${error.message}`, 500));
  }
  
  // Remove from array
  property.images.splice(imageIndex, 1);
  await property.save();
  
  res.status(200).json({
    success: true,
    data: property
  });
});