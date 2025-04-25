const express = require('express');
const router = express.Router();
const {
  getPropertiesByCity,
  getPropertiesByState,
  getPropertiesInCity,
  getPropertiesInState,
  getAllLocations
} = require('../controllers/locationController');

// Get all locations data
router.route('/').get(getAllLocations);

// Routes for cities
router.route('/cities').get(getPropertiesByCity);
router.route('/cities/:city').get(getPropertiesInCity);

// Routes for states
router.route('/states').get(getPropertiesByState);
router.route('/states/:state').get(getPropertiesInState);

module.exports = router;
