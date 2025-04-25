const Property = require('../models/Property');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get property count by cities
// @route   GET /api/locations/cities
// @access  Public
exports.getPropertiesByCity = asyncHandler(async (req, res, next) => {
  const cities = await Property.aggregate([
    {
      $group: {
        _id: '$address.city',
        count: { $sum: 1 },
        state: { $first: '$address.state' },
        properties: { $push: '$$ROOT' }
      }
    },
    {
      $project: {
        _id: 0,
        city: '$_id',
        count: 1,
        state: 1,
        // Get a sample image from the first property in each city
        image: {
          $cond: {
            if: { $gt: [{ $size: { $arrayElemAt: ['$properties.images', 0] } }, 0] },
            then: { $arrayElemAt: [{ $arrayElemAt: ['$properties.images', 0] }, 0] },
            else: null
          }
        }
      }
    },
    { $sort: { count: -1 } }
  ]);

  res.status(200).json({
    success: true,
    count: cities.length,
    data: cities
  });
});

// @desc    Get property count by states
// @route   GET /api/locations/states
// @access  Public
exports.getPropertiesByState = asyncHandler(async (req, res, next) => {
  const states = await Property.aggregate([
    {
      $group: {
        _id: '$address.state',
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        state: '$_id',
        count: 1
      }
    },
    { $sort: { count: -1 } }
  ]);

  res.status(200).json({
    success: true,
    count: states.length,
    data: states
  });
});

// @desc    Get properties by specific city
// @route   GET /api/locations/cities/:city
// @access  Public
exports.getPropertiesInCity = asyncHandler(async (req, res, next) => {
  const { city } = req.params;

  // Query parameters for pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;

  // Create case-insensitive regex for city name
  const cityRegex = new RegExp(city, 'i');

  // Query count
  const total = await Property.countDocuments({ 'address.city': cityRegex });

  // Get properties
  const properties = await Property.find({ 'address.city': cityRegex })
    .populate('createdBy', 'name email')
    .skip(startIndex)
    .limit(limit)
    .sort('-createdAt');

  // Pagination
  const pagination = {};
  if (startIndex + limit < total) {
    pagination.next = { page: page + 1, limit };
  }
  if (startIndex > 0) {
    pagination.prev = { page: page - 1, limit };
  }

  res.status(200).json({
    success: true,
    count: properties.length,
    pagination,
    totalPages: Math.ceil(total / limit),
    total,
    data: properties
  });
});

// @desc    Get properties by specific state
// @route   GET /api/locations/states/:state
// @access  Public
exports.getPropertiesInState = asyncHandler(async (req, res, next) => {
  const { state } = req.params;

  // Query parameters for pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;

  // Create case-insensitive regex for state name
  const stateRegex = new RegExp(state, 'i');

  // Query count
  const total = await Property.countDocuments({ 'address.state': stateRegex });

  // Get properties
  const properties = await Property.find({ 'address.state': stateRegex })
    .populate('createdBy', 'name email')
    .skip(startIndex)
    .limit(limit)
    .sort('-createdAt');

  // Pagination
  const pagination = {};
  if (startIndex + limit < total) {
    pagination.next = { page: page + 1, limit };
  }
  if (startIndex > 0) {
    pagination.prev = { page: page - 1, limit };
  }

  res.status(200).json({
    success: true,
    count: properties.length,
    pagination,
    totalPages: Math.ceil(total / limit),
    total,
    data: properties
  });
});

// @desc    Get all locations data (cities and states with counts)
// @route   GET /api/locations
// @access  Public
exports.getAllLocations = asyncHandler(async (req, res, next) => {
  // Get cities with counts
  const cities = await Property.aggregate([
    {
      $group: {
        _id: '$address.city',
        count: { $sum: 1 },
        state: { $first: '$address.state' },
        properties: { $push: '$$ROOT' }
      }
    },
    {
      $project: {
        _id: 0,
        city: '$_id',
        count: 1,
        state: 1,
        // Get a sample image from the first property in each city
        image: {
          $cond: {
            if: { $gt: [{ $size: { $arrayElemAt: ['$properties.images', 0] } }, 0] },
            then: { $arrayElemAt: [{ $arrayElemAt: ['$properties.images', 0] }, 0] },
            else: null
          }
        }
      }
    },
    { $sort: { count: -1 } }
  ]);

  // Get states with counts
  const states = await Property.aggregate([
    {
      $group: {
        _id: '$address.state',
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        state: '$_id',
        count: 1
      }
    },
    { $sort: { count: -1 } }
  ]);

  res.status(200).json({
    success: true,
    data: {
      cities,
      states
    }
  });
});
