// app/dashboard/page.js
"use client";

import { useState, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ListingsContext } from "@/context/ListingsContext";
import { AuthContext } from "@/context/AuthContext";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import {
  Home,
  User,
  Heart,
  Settings,
  MessageSquare,
  Plus,
  Edit,
  Trash2,
  Eye,
  Bed,
  Bath,
  Square,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { getMyListings, deleteListing } = useContext(ListingsContext);
  const {
    user,
    isAuthenticated,
    isAgent,
    isAdmin,
    loading: authLoading,
  } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState("properties");
  const [myListings, setMyListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  // Fetch user's properties
  const fetchPropertiesRef = useRef(false);

  useEffect(() => {
    // Prevent multiple re-renders from causing infinite API calls
    if (
      !fetchPropertiesRef.current &&
      isAuthenticated &&
      (isAgent || isAdmin) &&
      !authLoading
    ) {
      const fetchMyProperties = async () => {
        if (!isAuthenticated || !isAgent) return;

        try {
          setIsLoading(true);
          console.log("Fetching my properties...");
          const properties = await getMyListings();
          setMyListings(properties);
          console.log("Properties fetched successfully:", properties.length);
        } catch (err) {
          setError("Failed to fetch your properties");
          console.error("Error fetching properties:", err);
        } finally {
          setIsLoading(false);
          // Mark as fetched to prevent multiple calls
          fetchPropertiesRef.current = true;
        }
      };

      fetchMyProperties();
    }
  }, [isAuthenticated, isAgent, isAdmin, authLoading]);

  // Handle property delete
  const handleDeleteProperty = async () => {
    if (!propertyToDelete) return;

    try {
      await deleteListing(propertyToDelete);
      setMyListings(
        myListings.filter((property) => property._id !== propertyToDelete)
      );
      setShowDeleteModal(false);
      setPropertyToDelete(null);
    } catch (err) {
      setError("Failed to delete property");
      console.error(err);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in the useEffect
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              {/* User Profile Summary */}
              <div className="flex items-center mb-6">
                <div className="h-14 w-14 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                  {user?.profileImage?.url ? (
                    <Image
                      src={user.profileImage.url}
                      alt={user.name}
                      width={56}
                      height={56}
                      className="rounded-full"
                    />
                  ) : (
                    <User
                      size={24}
                      className="text-blue-600 dark:text-blue-400"
                    />
                  )}
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 dark:text-white">
                    {user?.name || "User"}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {user?.role === "admin"
                      ? "Administrator"
                      : user?.role === "agent"
                        ? "Agent"
                        : "User"}
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                <Link
                  href="/dashboard/profile"
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === "profile"
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <User size={18} className="mr-3" />
                  My Profile
                </Link>

                {(isAgent || isAdmin) && (
                  <button
                    onClick={() => setActiveTab("properties")}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === "properties"
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    }`}
                  >
                    <Home size={18} className="mr-3" />
                    My Properties
                  </button>
                )}

                <Link
                  href="/dashboard/wishlist"
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === "wishlist"
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <Heart size={18} className="mr-3" />
                  Wishlist
                </Link>

                <Link
                  href="/dashboard/messages"
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === "messages"
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <MessageSquare size={18} className="mr-3" />
                  Messages
                </Link>

                <Link
                  href="/dashboard/settings"
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === "settings"
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <Settings size={18} className="mr-3" />
                  Settings
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              {/* Properties Tab */}
              {activeTab === "properties" && (
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-0">
                      My Properties
                    </h2>

                    <Link
                      href="/properties/create"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                    >
                      <Plus size={16} className="mr-2" />
                      Add New Property
                    </Link>
                  </div>

                  {error && (
                    <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-md mb-4">
                      {error}
                    </div>
                  )}

                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <LoadingSpinner />
                    </div>
                  ) : myListings.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
                        <Home
                          size={32}
                          className="text-gray-500 dark:text-gray-400"
                        />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        No Properties Found
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        You haven't added any properties yet.
                      </p>
                      <Link
                        href="/properties/create"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                      >
                        <Plus size={16} className="mr-2" />
                        Add Your First Property
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {myListings.map((property) => (
                        <div
                          key={property._id}
                          className="flex flex-col md:flex-row border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                        >
                          {/* Property Image */}
                          <div className="relative h-48 md:h-auto md:w-48 bg-gray-200 dark:bg-gray-700">
                            {property.images && property.images.length > 0 ? (
                              <Image
                                src={property.images[0].url}
                                alt={property.title}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                <Home
                                  size={32}
                                  className="text-gray-400 dark:text-gray-500"
                                />
                              </div>
                            )}
                            <div className="absolute top-2 left-2">
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  property.status === "For Sale"
                                    ? "bg-blue-500 text-white"
                                    : property.status === "For Rent"
                                      ? "bg-green-500 text-white"
                                      : property.status === "Sold"
                                        ? "bg-red-500 text-white"
                                        : "bg-yellow-500 text-white"
                                }`}
                              >
                                {property.status}
                              </span>
                            </div>
                          </div>

                          {/* Property Details */}
                          <div className="flex-1 p-4 flex flex-col">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                {property.title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400 mb-2 line-clamp-1">
                                {property.address?.city},{" "}
                                {property.address?.state}
                              </p>

                              <div className="flex items-center space-x-4 mb-3">
                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                  <Bed size={16} className="mr-1" />
                                  <span className="text-sm">
                                    {property.bedrooms} Beds
                                  </span>
                                </div>
                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                  <Bath size={16} className="mr-1" />
                                  <span className="text-sm">
                                    {property.bathrooms} Baths
                                  </span>
                                </div>
                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                  <Square size={16} className="mr-1" />
                                  <span className="text-sm">
                                    {property.propertySize} sqft
                                  </span>
                                </div>
                              </div>

                              <div className="mb-3">
                                <span className="font-bold text-lg text-blue-600 dark:text-blue-400">
                                  {formatPrice(property.price)}
                                </span>
                              </div>

                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                Added on {formatDate(property.createdAt)}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                              <Link
                                href={`/listings/${property._id}`}
                                className="inline-flex items-center px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                              >
                                <Eye size={14} className="mr-1" />
                                View
                              </Link>

                              <Link
                                href={`/properties/edit/${property._id}`}
                                className="inline-flex items-center px-3 py-1.5 text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/50"
                              >
                                <Edit size={14} className="mr-1" />
                                Edit
                              </Link>

                              <button
                                onClick={() => {
                                  setPropertyToDelete(property._id);
                                  setShowDeleteModal(true);
                                }}
                                className="inline-flex items-center px-3 py-1.5 text-xs bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md hover:bg-red-100 dark:hover:bg-red-900/50"
                              >
                                <Trash2 size={14} className="mr-1" />
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    My Profile
                  </h2>

                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md mb-6">
                    <p className="text-blue-700 dark:text-blue-400">
                      Profile page is currently under development. Check back
                      soon!
                    </p>
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === "wishlist" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    My Wishlist
                  </h2>

                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md mb-6">
                    <p className="text-blue-700 dark:text-blue-400">
                      Wishlist page is currently under development. Check back
                      soon!
                    </p>
                  </div>
                </div>
              )}

              {/* Messages Tab */}
              {activeTab === "messages" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    My Messages
                  </h2>

                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md mb-6">
                    <p className="text-blue-700 dark:text-blue-400">
                      Messages page is currently under development. Check back
                      soon!
                    </p>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Account Settings
                  </h2>

                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md mb-6">
                    <p className="text-blue-700 dark:text-blue-400">
                      Settings page is currently under development. Check back
                      soon!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this property? This action cannot
              be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setPropertyToDelete(null);
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProperty}
                className="px-4 py-2 bg-red-600 border border-transparent rounded-md text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
