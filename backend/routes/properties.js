const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { uploadPropertyImages } = require('../middleware/upload');
const {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  getMyProperties,
  uploadImages,
  deletePropertyImage
} = require('../controllers/propertyController');

// Routes
router.route('/')
  .get(getProperties)
  .post(protect, authorize('admin', 'agent'), uploadPropertyImages, createProperty);

router.route('/my-properties')
  .get(protect, getMyProperties);

router.route('/:id')
  .get(getProperty)
  .put(protect, authorize('admin', 'agent'), updateProperty)
  .delete(protect, authorize('admin', 'agent'), deleteProperty);

router.route('/:id/images')
  .post(protect, authorize('admin', 'agent'), uploadPropertyImages, uploadImages);

router.route('/:id/images/:imageId')
  .delete(protect, authorize('admin', 'agent'), deletePropertyImage);

module.exports = router;