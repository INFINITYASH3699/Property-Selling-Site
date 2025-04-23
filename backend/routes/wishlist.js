const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist
} = require('../controllers/wishlistController');

router.route('/')
  .get(protect, getWishlist)
  .delete(protect, clearWishlist);

router.route('/:propertyId')
  .post(protect, addToWishlist)
  .delete(protect, removeFromWishlist);

module.exports = router;