"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Trash2,
  Home,
  Bed,
  Bath,
  Square,
  ExternalLink,
  AlertCircle,
  X
} from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import { WishlistContext } from "@/context/WishlistContext";
import { MotionDiv } from "@/components/MotionWrapper";

// Wishlist skeleton loader
const WishlistSkeletonLoader = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header skeleton */}
      <div className="flex justify-between items-center mb-8">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
        <div className="h-10 w-28 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
      </div>

      {/* Wishlist items skeletons */}
      <div className="grid grid-cols-1 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Image skeleton */}
              <div className="h-48 md:h-auto md:w-72 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>

              {/* Content skeleton */}
              <div className="flex-1 p-6">
                <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mb-3"></div>
                <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mb-4"></div>

                {/* Property features skeleton */}
                <div className="flex space-x-4 mb-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                  ))}
                </div>

                <div className="h-6 w-32 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse mb-4"></div>

                {/* Actions skeleton */}
                <div className="flex space-x-3 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                  <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state skeleton */}
      <div className="hidden bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
        <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse mx-auto mb-4"></div>
        <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mx-auto mb-3"></div>
        <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mx-auto mb-6"></div>
        <div className="h-10 w-40 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mx-auto"></div>
      </div>
    </div>
  );
};

export default function WishlistPage() {
  const { user, loading: authLoading, isAuthenticated } = useContext(AuthContext);
  const { getWishlist, removeFromWishlist, loading: wishlistLoading } = useContext(WishlistContext);
  const router = useRouter();

  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [propertyToRemove, setPropertyToRemove] = useState(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  // Load wishlist data
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!isAuthenticated) return;

      try {
        setIsLoading(true);
        setError(null);

        // In a real app, we would use getWishlist() to fetch from API
        // For now, we'll use mock data or simulate a fetch

        // Mock wishlist data for development
        const mockWishlist = [
          {
            _id: "wish1",
            property: {
              _id: "prop1",
              title: "Modern Villa in Mumbai",
              description: "A beautiful modern villa with all amenities",
              price: 35000000, // Price in INR
              propertyType: "Villa",
              status: "For Sale",
              bedrooms: 4,
              bathrooms: 3,
              propertySize: 3500,
              address: {
                city: "Mumbai",
                state: "Maharashtra",
              },
              images: [
                {
                  url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop",
                },
              ],
              createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
            },
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
          },
          {
            _id: "wish2",
            property: {
              _id: "prop3",
              title: "Garden House in Delhi",
              description: "Beautiful house with spacious garden",
              price: 45000000, // Price in INR
              propertyType: "House",
              status: "For Sale",
              bedrooms: 5,
              bathrooms: 4,
              propertySize: 4000,
              address: {
                city: "Delhi",
                state: "Delhi",
              },
              images: [
                {
                  url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop",
                },
              ],
              createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
            },
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
          },
        ];

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        setWishlistItems(mockWishlist);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
        setError("Failed to load wishlist. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, [isAuthenticated]);

  // Handle removing from wishlist
  const handleRemoveFromWishlist = async (propertyId) => {
    setShowRemoveConfirm(false);
    setPropertyToRemove(null);

    try {
      // In a real app, we would call the API
      // await removeFromWishlist(propertyId);

      // For now, just filter out the item from state
      setWishlistItems(prev => prev.filter(item => item.property._id !== propertyId));
    } catch (err) {
      console.error("Error removing from wishlist:", err);
      setError("Failed to remove from wishlist. Please try again.");
    }
  };

  // Format currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Show skeleton loader while loading
  if (authLoading || isLoading) {
    return <WishlistSkeletonLoader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">
          My Wishlist
        </h1>

        <Link
          href="/listings"
          className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Browse Properties
        </Link>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4 mb-6 rounded-md">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
            <p className="text-red-700 dark:text-red-400">{error}</p>
          </div>
        </div>
      )}

      {/* Wishlist content */}
      {wishlistItems.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
            <Heart className="h-8 w-8 text-gray-500 dark:text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Your Wishlist is Empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You haven't added any properties to your wishlist yet.
          </p>
          <Link
            href="/listings"
            className="inline-flex items-center px-5 py-2.5 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Browse Properties
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {wishlistItems.map((item, index) => (
            <MotionDiv
              key={item._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Property Image */}
                <div className="relative h-48 md:h-auto md:w-72 bg-gray-200 dark:bg-gray-700">
                  {item.property.images && item.property.images.length > 0 ? (
                    <Image
                      src={item.property.images[0].url}
                      alt={item.property.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Home size={32} className="text-gray-400 dark:text-gray-500" />
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        item.property.status === "For Sale"
                          ? "bg-blue-500 text-white"
                          : item.property.status === "For Rent"
                            ? "bg-green-500 text-white"
                            : item.property.status === "Sold"
                              ? "bg-red-500 text-white"
                              : "bg-yellow-500 text-white"
                      }`}
                    >
                      {item.property.status}
                    </span>
                  </div>
                </div>

                {/* Property Details */}
                <div className="flex-1 p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {item.property.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {item.property.address?.city}, {item.property.address?.state}
                  </p>

                  {/* Property Features */}
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Bed size={16} className="mr-1" />
                      <span className="text-sm">{item.property.bedrooms} Beds</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Bath size={16} className="mr-1" />
                      <span className="text-sm">{item.property.bathrooms} Baths</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Square size={16} className="mr-1" />
                      <span className="text-sm">{item.property.propertySize} sqft</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      {formatPrice(item.property.price)}
                    </span>
                  </div>

                  {/* Added date */}
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    Added to wishlist on {formatDate(item.createdAt)}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                    <Link
                      href={`/listings/${item.property._id}`}
                      className="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-md text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 focus:outline-none"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      View Details
                    </Link>

                    <button
                      onClick={() => {
                        setPropertyToRemove(item.property._id);
                        setShowRemoveConfirm(true);
                      }}
                      className="inline-flex items-center px-4 py-2 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-md text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/50 focus:outline-none"
                    >
                      <Trash2 size={16} className="mr-2" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {showRemoveConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Remove from Wishlist
              </h3>
              <button
                onClick={() => {
                  setShowRemoveConfirm(false);
                  setPropertyToRemove(null);
                }}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to remove this property from your wishlist?
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowRemoveConfirm(false);
                  setPropertyToRemove(null);
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
              >
                Cancel
              </button>

              <button
                onClick={() => handleRemoveFromWishlist(propertyToRemove)}
                className="px-4 py-2 bg-red-600 border border-transparent rounded-md text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
