"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Lock,
  Upload,
  Trash2,
  AlertCircle
} from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import { MotionDiv } from "@/components/MotionWrapper";

// Profile page skeleton loader
const ProfileSkeletonLoader = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header skeleton */}
        <div className="mb-6">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
        </div>

        {/* Profile card skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row">
            {/* Avatar skeleton */}
            <div className="flex justify-center mb-6 md:mb-0">
              <div className="h-32 w-32 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            </div>

            {/* Details skeleton */}
            <div className="md:ml-8 flex-grow">
              <div className="h-7 w-48 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse mb-3"></div>
              <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mb-6"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex">
                    <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse mr-3"></div>
                    <div className="flex-grow">
                      <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mb-2"></div>
                      <div className="h-5 w-full bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Edit profile form skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="h-6 w-40 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse mb-6"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index}>
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mb-2"></div>
                <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
              </div>
            ))}
          </div>

          <div className="h-12 w-32 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse ml-auto"></div>
        </div>

        {/* Change password section skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="h-6 w-48 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse mb-6"></div>

          <div className="space-y-6 mb-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index}>
                <div className="h-4 w-36 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mb-2"></div>
                <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
              </div>
            ))}
          </div>

          <div className="h-12 w-48 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse ml-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default function ProfilePage() {
  const { user, loading: authLoading, isAuthenticated, updateUserProfile } = useContext(AuthContext);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  // Populate user data when available
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        bio: user.bio || ''
      });

      // If user has a profile image
      if (user.profileImage && user.profileImage.url) {
        setProfileImagePreview(user.profileImage.url);
      }

      // Simulate minimum loading time for skeleton
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [user]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle password form changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle profile image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  // Remove selected profile image
  const removeSelectedImage = () => {
    setProfileImage(null);
    setProfileImagePreview(user?.profileImage?.url || null);
  };

  // Submit profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: '', text: '' });

    try {
      // In a real app, you would upload the image and update profile here
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock success response
      setMessage({
        type: 'success',
        text: 'Profile updated successfully!'
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to update profile. Please try again.'
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Submit password change
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({
        type: 'error',
        text: 'New passwords do not match.'
      });
      return;
    }

    setIsChangingPassword(true);
    setMessage({ type: '', text: '' });

    try {
      // In a real app, you would update the password here
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock success response
      setMessage({
        type: 'success',
        text: 'Password changed successfully!'
      });

      // Reset password form
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error("Error changing password:", error);
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to change password. Please try again.'
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Render skeleton while loading
  if (authLoading || isLoading) {
    return <ProfileSkeletonLoader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          My Profile
        </h1>

        {/* Profile Overview Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row">
            <div className="flex justify-center mb-6 md:mb-0">
              <div className="relative h-32 w-32 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                {profileImagePreview ? (
                  <Image
                    src={profileImagePreview}
                    alt={user?.name || "User"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <User size={48} className="text-gray-400 dark:text-gray-500" />
                  </div>
                )}
              </div>
            </div>

            <div className="md:ml-8 flex-grow">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {user?.name || "User"}
              </h2>
              <p className="text-blue-600 dark:text-blue-400 mb-6">
                {user?.role === "admin"
                  ? "Administrator"
                  : user?.role === "agent"
                    ? "Agent"
                    : "User"}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                    <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-gray-800 dark:text-gray-200">{user?.email || "Not provided"}</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                    <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="text-gray-800 dark:text-gray-200">{formData.phone || "Not provided"}</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                    <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                    <p className="text-gray-800 dark:text-gray-200">{formData.location || "Not provided"}</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                    <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                    <p className="text-gray-800 dark:text-gray-200">
                      {user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "Unknown"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Form */}
        <MotionDiv
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Edit className="h-5 w-5 mr-2" />
            Edit Profile
          </h2>

          {message.text && (
            <div className={`p-4 mb-6 rounded-md ${
              message.type === 'success'
                ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400'
            }`}>
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                {message.text}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none cursor-not-allowed"
                  placeholder="Your email address"
                  disabled
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="City, State"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell us about yourself"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Profile Image
                </label>
                <div className="flex items-center space-x-4">
                  <div className="h-20 w-20 relative rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                    {profileImagePreview ? (
                      <Image
                        src={profileImagePreview}
                        alt="Profile preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <User size={32} className="text-gray-400 dark:text-gray-500" />
                      </div>
                    )}
                  </div>

                  <div className="flex-grow">
                    <div className="flex flex-wrap gap-3">
                      <label className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Image
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleImageChange}
                          accept="image/*"
                        />
                      </label>

                      {profileImage && (
                        <button
                          type="button"
                          onClick={removeSelectedImage}
                          className="inline-flex items-center px-4 py-2 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-md text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/50 focus:outline-none"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      Recommended: Square image, at least 300x300px
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75 disabled:cursor-not-allowed"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </MotionDiv>

        {/* Change Password Form */}
        <MotionDiv
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Lock className="h-5 w-5 mr-2" />
            Change Password
          </h2>

          <form onSubmit={handlePasswordSubmit}>
            <div className="space-y-6 mb-6">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your current password"
                  required
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Create a new password"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm your new password"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75 disabled:cursor-not-allowed"
                disabled={isChangingPassword}
              >
                {isChangingPassword ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        </MotionDiv>
      </div>
    </div>
  );
}
