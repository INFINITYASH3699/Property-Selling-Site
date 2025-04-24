// app/listings/PropertyCard.js
'use client';

import { useState, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, MapPin, Bed, Bath, ArrowRight, Square, BedDouble, Home, Tag, Clock, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { WishlistContext } from '../../context/WishlistContext';
import { AuthContext } from '../../context/AuthContext';

export default function PropertyCard({ property, viewType = 'grid' }) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isInWishlistState, setIsInWishlistState] = useState(isInWishlist(property._id));
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);

  // Format currency - Updated to use INR
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Handle wishlist toggle
  const handleWishlistToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      // Redirect to login or show login modal
      alert('Please login to add properties to your wishlist');
      return;
    }

    setIsWishlistLoading(true);
    try {
      if (isInWishlistState) {
        await removeFromWishlist(property._id);
        setIsInWishlistState(false);
      } else {
        await addToWishlist(property._id);
        setIsInWishlistState(true);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    } finally {
      setIsWishlistLoading(false);
    }
  };

  // Get the first image or a placeholder
  const mainImage = property.images && property.images.length > 0
    ? property.images[0].url
    : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop';

  // Format address
  const formatAddress = () => {
    if (!property.address) return 'Location not specified';

    const parts = [];
    if (property.address.city) parts.push(property.address.city);
    if (property.address.state) parts.push(property.address.state);

    return parts.join(', ');
  };

  // Format date (when the property was listed)
  const formatDate = (dateString) => {
    if (!dateString) return 'Recently added';

    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.round((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      return `${Math.floor(diffDays / 7)} weeks ago`;
    } else {
      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  };

  // Get status badge style
  const getStatusStyle = (status) => {
    switch(status) {
      case 'For Sale':
        return 'bg-primary-500 text-white';
      case 'For Rent':
        return 'bg-green-500 text-white';
      case 'Sold':
        return 'bg-red-500 text-white';
      case 'Pending':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  // Grid view card
  if (viewType === 'grid') {
    return (
      <motion.div
        className="bg-white rounded-xl overflow-hidden h-full shadow-property transition-all duration-300"
        whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/listings/${property._id}`} className="block h-full">
          <div className="flex flex-col h-full">
            {/* Image Section */}
            <div className="relative">
              {/* Property Image */}
              <div className="relative h-56 w-full overflow-hidden bg-gray-200">
                <Image
                  src={mainImage}
                  alt={property.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-in-out"
                  style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>

              {/* Location in image */}
              <div className="absolute bottom-3 left-3 text-white flex items-center">
                <MapPin size={16} className="mr-1" />
                <span className="text-sm font-medium">{formatAddress()}</span>
              </div>

              {/* Status Badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusStyle(property.status)}`}>
                  {property.status}
                </span>
              </div>

              {/* Featured Badge */}
              {property.featured && (
                <div className="absolute top-3 right-14 z-10">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-500 text-white">
                    Featured
                  </span>
                </div>
              )}

              {/* Wishlist Button */}
              <button
                onClick={handleWishlistToggle}
                disabled={isWishlistLoading}
                className={`absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-all ${
                  isInWishlistState ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                }`}
                aria-label={isInWishlistState ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  size={18}
                  className={isInWishlistState ? "fill-current" : ""}
                />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 flex-grow flex flex-col">
              {/* Date */}
              <div className="flex items-center text-xs text-gray-500 mb-1">
                <Clock size={14} className="mr-1" />
                <span>{formatDate(property.createdAt)}</span>
              </div>

              {/* Price */}
              <div className="font-bold text-xl text-primary-600 mb-1">
                {formatPrice(property.price)}
                {property.status === 'For Rent' && <span className="text-sm font-normal text-gray-500">/month</span>}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
                {property.title}
              </h3>

              {/* Features */}
              <div className="mt-auto border-t border-gray-100 pt-3 flex justify-between text-gray-600 text-sm">
                <div className="flex items-center">
                  <BedDouble size={16} className="mr-1 text-gray-400" />
                  <span>{property.bedrooms || 0}</span>
                </div>

                <div className="flex items-center">
                  <Bath size={16} className="mr-1 text-gray-400" />
                  <span>{property.bathrooms || 0}</span>
                </div>

                <div className="flex items-center">
                  <Square size={16} className="mr-1 text-gray-400" />
                  <span>{property.propertySize} sqft</span>
                </div>
              </div>
            </div>

            {/* View Details Button */}
            <div className="p-4 pt-0 mt-auto">
              <div className="flex items-center justify-center text-primary-600 font-medium text-sm hover:text-primary-700 transition-colors">
                View Details
                <ArrowRight size={16} className="ml-1" />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // List view card
  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-property transition-all duration-300"
      whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/listings/${property._id}`} className="block">
        <div className="flex flex-col md:flex-row">
          {/* Image section */}
          <div className="relative h-64 md:h-auto md:w-2/5 lg:w-1/3">
            {/* Property Image */}
            <div className="relative h-full w-full overflow-hidden bg-gray-200">
              <Image
                src={mainImage}
                alt={property.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700"
                style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r"></div>
            </div>

            {/* Status Badge */}
            <div className="absolute top-3 left-3 z-10">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusStyle(property.status)}`}>
                {property.status}
              </span>
            </div>

            {/* Featured Badge */}
            {property.featured && (
              <div className="absolute top-3 right-14 z-10">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-500 text-white">
                  Featured
                </span>
              </div>
            )}

            {/* Wishlist Button */}
            <button
              onClick={handleWishlistToggle}
              disabled={isWishlistLoading}
              className={`absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-all ${
                isInWishlistState ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
              }`}
              aria-label={isInWishlistState ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                size={18}
                className={isInWishlistState ? "fill-current" : ""}
              />
            </button>

            {/* Location on mobile */}
            <div className="absolute bottom-3 left-3 md:hidden text-white flex items-center">
              <MapPin size={16} className="mr-1" />
              <span className="text-sm font-medium">{formatAddress()}</span>
            </div>
          </div>

          {/* Content section */}
          <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
            <div>
              {/* Date */}
              <div className="flex items-center text-xs text-gray-500 mb-2">
                <Clock size={14} className="mr-1" />
                <span>{formatDate(property.createdAt)}</span>
              </div>

              {/* Price */}
              <div className="font-bold text-2xl text-primary-600 mb-1">
                {formatPrice(property.price)}
                {property.status === 'For Rent' && <span className="text-sm font-normal text-gray-500">/month</span>}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-800 mb-2">{property.title}</h3>

              {/* Location on desktop */}
              <div className="hidden md:flex items-center text-gray-600 mb-3">
                <MapPin size={16} className="mr-1" />
                <span className="text-sm">{formatAddress()}</span>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-4 line-clamp-2">
                {property.description}
              </p>
            </div>

            {/* Features and CTA */}
            <div className="flex flex-wrap justify-between items-center border-t border-gray-100 pt-4">
              <div className="flex flex-wrap gap-6 items-center text-gray-600">
                <div className="flex items-center">
                  <BedDouble size={18} className="mr-1 text-gray-500" />
                  <span className="mr-1">{property.bedrooms || 0}</span>
                  <span className="text-xs text-gray-400">Beds</span>
                </div>

                <div className="flex items-center">
                  <Bath size={18} className="mr-1 text-gray-500" />
                  <span className="mr-1">{property.bathrooms || 0}</span>
                  <span className="text-xs text-gray-400">Baths</span>
                </div>

                <div className="flex items-center">
                  <Square size={18} className="mr-1 text-gray-500" />
                  <span className="mr-1">{property.propertySize}</span>
                  <span className="text-xs text-gray-400">sqft</span>
                </div>
              </div>

              <div className="mt-4 md:mt-0">
                <span className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors">
                  View Details
                  <ArrowRight size={16} className="ml-1" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
