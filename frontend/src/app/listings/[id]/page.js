// app/listings/[id]/page.js
'use client';

import { useState, useEffect, useContext } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { Heart, MapPin, Bed, Bath, Square, Calendar, Share2, Printer, ArrowLeft, User, Mail, Phone } from 'lucide-react';
import { ListingsContext } from '@/context/ListingsContext';
import { WishlistContext } from '@/context/WishlistContext';
import { AuthContext } from '@/context/AuthContext';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { getListing, error, loading } = useContext(ListingsContext);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const { isAuthenticated } = useContext(AuthContext);
  
  const [property, setProperty] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isInWishlistState, setIsInWishlistState] = useState(false);
  
  // Fetch property details
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getListing(id);
        setProperty(data);
        setIsInWishlistState(isInWishlist(id));
      } catch (err) {
        console.error('Error fetching property:', err);
      }
    };
    
    fetchProperty();
  }, [id, getListing, isInWishlist]);
  
  // Handle wishlist toggle
  const handleWishlistToggle = async () => {
    if (!isAuthenticated) {
      alert('Please login to add properties to your wishlist');
      return;
    }
    
    try {
      if (isInWishlistState) {
        await removeFromWishlist(id);
        setIsInWishlistState(false);
      } else {
        await addToWishlist(id);
        setIsInWishlistState(true);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };
  
  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  // Format address
  const formatAddress = () => {
    if (!property || !property.address) return 'Location not specified';
    
    const parts = [];
    if (property.address.street) parts.push(property.address.street);
    if (property.address.city) parts.push(property.address.city);
    if (property.address.state) parts.push(property.address.state);
    
    return parts.join(', ');
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Property</h2>
        <p className="mb-8">{error}</p>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <ArrowLeft size={16} className="mr-2" />
          Go Back
        </button>
      </div>
    );
  }
  
  if (!property) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
        <p className="mb-8">The property you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => router.push('/listings')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Listings
        </button>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Property Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <button
                onClick={() => router.back()}
                className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-2"
              >
                <ArrowLeft size={16} className="mr-1" />
                Back
              </button>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {property.title}
              </h1>
              <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                <MapPin size={16} className="mr-1" />
                <span>{formatAddress()}</span>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-col md:items-end">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
                {formatPrice(property.price)}
                {property.status === 'For Rent' && <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/month</span>}
              </div>
              <div className="flex items-center mt-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full mr-2 ${
                  property.status === 'For Sale' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                  property.status === 'For Rent' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                  property.status === 'Sold' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                }`}>
                  {property.status}
                </span>
                {property.featured && (
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                    Featured
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              {property.images && property.images.length > 0 ? (
                <>
                  {/* Main Image */}
                  <div className="relative rounded-lg overflow-hidden mb-4 h-[400px] md:h-[500px]">
                    <Image
                      src={property.images[selectedImage].url}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                    <button
                      onClick={handleWishlistToggle}
                      className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Heart
                        size={20}
                        className={isInWishlistState ? "fill-pink-500 text-pink-500" : "text-gray-600 dark:text-gray-400"} 
                      />
                    </button>
                  </div>
                  
                  {/* Thumbnails */}
                  {property.images.length > 1 && (
                    <div className="grid grid-cols-5 gap-2">
                      {property.images.map((image, index) => (
                        <div 
                          key={index}
                          className={`relative cursor-pointer rounded-md overflow-hidden h-20 ${
                            selectedImage === index ? 'ring-2 ring-blue-500' : ''
                          }`}
                          onClick={() => setSelectedImage(index)}
                        >
                          <Image
                            src={image.url}
                            alt={`Thumbnail ${index}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="relative rounded-lg bg-gray-200 dark:bg-gray-700 mb-4 h-[400px] flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">No images available</p>
                </div>
              )}
            </div>
            
            {/* Property Details */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Property Details
              </h2>
              
              {/* Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Bed size={24} className="text-blue-500 mb-2" />
                  <span className="text-gray-600 dark:text-gray-300 text-sm">Bedrooms</span>
                  <span className="font-bold text-gray-900 dark:text-white">{property.bedrooms}</span>
                </div>
                
                <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Bath size={24} className="text-blue-500 mb-2" />
                  <span className="text-gray-600 dark:text-gray-300 text-sm">Bathrooms</span>
                  <span className="font-bold text-gray-900 dark:text-white">{property.bathrooms}</span>
                </div>
                
                <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Square size={24} className="text-blue-500 mb-2" />
                  <span className="text-gray-600 dark:text-gray-300 text-sm">Area</span>
                  <span className="font-bold text-gray-900 dark:text-white">{property.propertySize} sq ft</span>
                </div>
                
                <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Calendar size={24} className="text-blue-500 mb-2" />
                  <span className="text-gray-600 dark:text-gray-300 text-sm">Year Built</span>
                  <span className="font-bold text-gray-900 dark:text-white">{property.yearBuilt || 'N/A'}</span>
                </div>
              </div>
              
              {/* Description */}
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Description
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 whitespace-pre-line">
                {property.description}
              </p>
              
              {/* Additional Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Property Details
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Property ID:</span>
                      <span className="text-gray-900 dark:text-white font-medium">{property._id}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Property Type:</span>
                      <span className="text-gray-900 dark:text-white font-medium">{property.propertyType}</span>
                    </li>
                    {property.garage !== undefined && (
                      <li className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Garage:</span>
                        <span className="text-gray-900 dark:text-white font-medium">{property.garage} Spaces</span>
                      </li>
                    )}
                    <li className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Listed on:</span>
                      <span className="text-gray-900 dark:text-white font-medium">{formatDate(property.createdAt)}</span>
                    </li>
                  </ul>
                </div>
                
                {/* Amenities */}
                {property.amenities && property.amenities.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Amenities
                    </h3>
                    <ul className="grid grid-cols-2 gap-2">
                      {property.amenities.map((amenity, index) => (
                        <li key={index} className="flex items-center text-gray-600 dark:text-gray-400">
                          <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
                            {/* Actions */}
                            <div className="flex flex-wrap gap-3">
                <button className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <Share2 size={16} className="mr-2" />
                  Share
                </button>
                <button className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <Printer size={16} className="mr-2" />
                  Print
                </button>
                <button
                  onClick={handleWishlistToggle}
                  className={`inline-flex items-center px-4 py-2 border rounded-md ${
                    isInWishlistState 
                      ? 'bg-pink-50 border-pink-300 text-pink-700 dark:bg-pink-900/30 dark:border-pink-800 dark:text-pink-400'
                      : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  <Heart 
                    size={16} 
                    className={`mr-2 ${isInWishlistState ? 'fill-pink-500 text-pink-500' : ''}`} 
                  />
                  {isInWishlistState ? 'Saved to Wishlist' : 'Save to Wishlist'}
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Column - Contact and Similar Properties */}
          <div className="lg:col-span-1">
            {/* Agent/Contact Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Contact Agent
              </h2>
              
              <div className="flex items-center mb-4">
                <div className="h-14 w-14 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3">
                  <User size={24} className="text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {property.createdBy?.name || 'Property Agent'}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {property.createdBy?.role === 'admin' ? 'Administrator' : 'Real Estate Agent'}
                  </p>
                </div>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="(123) 456-7890"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="I'm interested in this property..."
                    defaultValue={`I'm interested in ${property.title}. Please contact me with more information.`}
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                >
                  Send Message
                </button>
              </form>
              
              {/* Direct Contact Info */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Or contact directly:
                </h3>
                <div className="space-y-2">
                  <a href={`mailto:${property.createdBy?.email || 'agent@example.com'}`} className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    <Mail size={16} className="mr-2" />
                    {property.createdBy?.email || 'agent@example.com'}
                  </a>
                  <a href="tel:+11234567890" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    <Phone size={16} className="mr-2" />
                    (123) 456-7890
                  </a>
                </div>
              </div>
            </div>
            
            {/* Property Location Map Placeholder */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Property Location
              </h2>
              
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400 text-center p-4">
                  Map view will be available soon
                </p>
              </div>
              
              <p className="mt-3 text-gray-600 dark:text-gray-400">
                {formatAddress()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}