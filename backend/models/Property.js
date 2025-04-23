const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  address: {
    street: String,
    city: {
      type: String,
      required: [true, 'Please add a city']
    },
    state: {
      type: String,
      required: [true, 'Please add a state']
    },
    zipCode: String,
    country: {
      type: String,
      required: [true, 'Please add a country'],
      default: 'US'
    }
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  bedrooms: {
    type: Number,
    required: [true, 'Please specify number of bedrooms']
  },
  bathrooms: {
    type: Number,
    required: [true, 'Please specify number of bathrooms']
  },
  propertySize: {
    type: Number,
    required: [true, 'Please specify property size in square feet']
  },
  propertyType: {
    type: String,
    required: [true, 'Please specify property type'],
    enum: ['Apartment', 'House', 'Condo', 'Villa', 'Land', 'Commercial', 'Other']
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['For Sale', 'For Rent', 'Sold', 'Pending'],
    default: 'For Sale'
  },
  images: [
    {
      public_id: String,
      url: String
    }
  ],
  amenities: [String],
  yearBuilt: Number,
  garage: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add indexing for better search performance
PropertySchema.index({ 
  title: 'text', 
  'address.city': 'text', 
  'address.state': 'text',
  description: 'text',
  propertyType: 1, 
  price: 1, 
  bedrooms: 1,
  status: 1
});

module.exports = mongoose.model('Property', PropertySchema);