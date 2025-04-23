// app/listings/PropertyCard.js
'use client';

import { useState, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, MapPin, Bed, Bath, ArrowRight, Square } from 'lucide-react';
import { motion } from 'framer-motion';
import { WishlistContext } from '../../context/WishlistContext';
import { AuthContext } from '../../context/AuthContext';

export default function PropertyCard({ property, viewType = 'grid' }) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isInWishlistState, setIsInWishlistState] = useState(isInWishlist(property._id));
  
  // Format currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
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
    }
  };
  
  // Get the first image or a placeholder
  const mainImage = property.images && property.images.length > 0 
    ? property.images[0].url 
    : '/images/placeholder-property.jpg';
    
  // Format address
  const formatAddress = () => {
    if (!property.address) return 'Location not specified';
    
    const parts = [];
    if (property.address.city) parts.push(property.address.city);
    if (property.address.state) parts.push(property.address.state);
    
    return parts.join(', ');
  };

  // Grid view card
  if (viewType === 'grid') {
    return (
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden h-full"
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/listings/${property._id}`}>
          <div className="relative">
            {/* Status Badge */}
            <div className="absolute top-3 left-3 z-10">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                property.status === 'For Sale' ? 'bg-blue-500 text-white' :
                property.status === 'For Rent' ? 'bg-green-500 text-white' :
                property.status === 'Sold' ? 'bg-red-500 text-white' :
                'bg-yellow-500 text-white'
              }`}>
                {property.status}
              </span>
            </div>
            
            {/* Featured Badge */}
            {property.featured && (
              <div className="absolute top-3 right-14 z-10">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-500 text-white">
                  Featured
                </span>
              </div>
            )}
            
            {/* Wishlist Heart */}
            <button 
              onClick={handleWishlistToggle}
              className="absolute top-3 right-3 z-10 p-1.5 bg-white rounded-full text-gray-700 hover:text-pink-500 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-pink-500 focus:outline-none transition-all"
            >
              <Heart 
                size={20} 
                className={isInWishlistState ? "fill-pink-500 text-pink-500" : ""} 
              />
            </button>
            
            {/* Property Image */}
            <div className="relative h-48 w-full">
              <Image 
                src={mainImage}
                alt={property.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300"
                style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
              />
            </div>
          </div>
          
          {/* Content */}
          <div className="p-4">
            {/* Price */}
            <div className="font-bold text-xl text-blue-600 dark:text-blue-400 mb-1">
              {formatPrice(property.price)}
              {property.status === 'For Rent' && <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/month</span>}
            </div>
            
            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-1">{property.title}</h3>
            
            {/* Location */}
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
              <MapPin size={16} className="mr-1" />
              <span className="text-sm">{formatAddress()}</span>
            </div>
            
            {/* Features */}
            <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-3">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Bed size={16} className="mr-1" />
                <span className="text-sm mr-3">{property.bedrooms} Beds</span>
                
                <Bath size={16} className="mr-1" />
                <span className="text-sm">{property.bathrooms} Baths</span>
              </div>
              
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Square size={16} className="mr-1" />
                <span className="text-sm">{property.propertySize} sqft</span>
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
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/listings/${property._id}`}>
        <div className="flex flex-col md:flex-row">
          {/* Image section */}
          <div className="relative h-60 md:h-auto md:w-1/3">
            {/* Status Badge */}
            <div className="absolute top-3 left-3 z-10">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                property.status === 'For Sale' ? 'bg-blue-500 text-white' :
                property.status === 'For Rent' ? 'bg-green-500 text-white' :
                property.status === 'Sold' ? 'bg-red-500 text-white' :
                'bg-yellow-500 text-white'
              }`}>
                {property.status}
              </span>
            </div>
            
            {/* Featured Badge */}
            {property.featured && (
              <div className="absolute top-3 right-14 z-10">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-500 text-white">
                  Featured
                </span>
              </div>
            )}
            
            {/* Wishlist Heart */}
            <button 
              onClick={handleWishlistToggle}
              className="absolute top-3 right-3 z-10 p-1.5 bg-white rounded-full text-gray-700 hover:text-pink-500 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-pink-500 focus:outline-none transition-all"
            >
              <Heart 
                size={20} 
                className={isInWishlistState ? "fill-pink-500 text-pink-500" : ""} 
              />
            </button>
            
            {/* Property Image */}
            <Image 
              src={mainImage}
              alt={property.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-300"
              style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
            />
          </div>
          
          {/* Content section */}
          <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
            <div>
              {/* Price */}
              <div className="font-bold text-xl text-blue-600 dark:text-blue-400 mb-1">
                {formatPrice(property.price)}
                {property.status === 'For Rent' && <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/month</span>}
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{property.title}</h3>
              
              {/* Location */}
              <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                <MapPin size={16} className="mr-1" />
                <span className="text-sm">{formatAddress()}</span>
              </div>
              
              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {property.description}
              </p>
            </div>
            
            {/* Features and CTA */}
            <div className="flex flex-wrap justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex space-x-4 items-center text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <Bed size={18} className="mr-1" />
                  <span>{property.bedrooms} Beds</span>
                </div>
                
                <div className="flex items-center">
                  <Bath size={18} className="mr-1" />
                  <span>{property.bathrooms} Baths</span>
                </div>
                
                <div className="flex items-center">
                  <Square size={18} className="mr-1" />
                  <span>{property.propertySize} sqft</span>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0">
                <span className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300">
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