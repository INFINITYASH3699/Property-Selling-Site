const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  properties: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Property'
    }
  ]
}, {
  timestamps: true
});

// Prevent duplicate properties in wishlist
WishlistSchema.pre('save', async function(next) {
  // Remove duplicates from properties array
  if (this.properties.length > 0) {
    this.properties = [...new Set(this.properties.map(p => p.toString()))];
  }
  next();
});

module.exports = mongoose.model('Wishlist', WishlistSchema);