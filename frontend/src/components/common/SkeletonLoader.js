// src/components/common/SkeletonLoader.js
import React from 'react';

export function PropertyCardSkeleton({ viewType = 'grid' }) {
  if (viewType === 'grid') {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden h-full animate-pulse">
        {/* Image placeholder */}
        <div className="bg-gray-200 h-48 w-full"></div>

        {/* Content */}
        <div className="p-4">
          {/* Price */}
          <div className="h-7 bg-gray-200 rounded w-1/3 mb-2"></div>

          {/* Title */}
          <div className="h-5 bg-gray-200 rounded w-5/6 mb-3"></div>

          {/* Location */}
          <div className="flex items-center mb-3">
            <div className="h-4 w-4 bg-gray-200 rounded-full mr-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>

          {/* Features */}
          <div className="border-t border-gray-100 pt-3 flex justify-between">
            <div className="flex items-center">
              <div className="h-4 w-4 bg-gray-200 rounded-full mr-1"></div>
              <div className="h-4 bg-gray-200 rounded w-12 mr-3"></div>

              <div className="h-4 w-4 bg-gray-200 rounded-full mr-1"></div>
              <div className="h-4 bg-gray-200 rounded w-12"></div>
            </div>

            <div className="flex items-center">
              <div className="h-4 w-4 bg-gray-200 rounded-full mr-1"></div>
              <div className="h-4 bg-gray-200 rounded w-12"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // List view skeleton
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      <div className="flex flex-col md:flex-row">
        {/* Image section */}
        <div className="bg-gray-200 h-60 md:h-auto md:w-1/3"></div>

        {/* Content section */}
        <div className="p-5 md:p-6 flex-1">
          {/* Price */}
          <div className="h-7 bg-gray-200 rounded w-1/4 mb-2"></div>

          {/* Title */}
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>

          {/* Location */}
          <div className="flex items-center mb-3">
            <div className="h-4 w-4 bg-gray-200 rounded-full mr-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>

          {/* Description */}
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>

          {/* Features */}
          <div className="border-t border-gray-100 pt-4 flex justify-between">
            <div className="flex space-x-4">
              <div className="h-5 bg-gray-200 rounded w-20"></div>
              <div className="h-5 bg-gray-200 rounded w-20"></div>
              <div className="h-5 bg-gray-200 rounded w-20"></div>
            </div>

            <div className="h-5 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PropertyListingSkeleton({ count = 6, viewType = 'grid' }) {
  return (
    <div className={
      viewType === 'grid'
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        : "flex flex-col space-y-6"
    }>
      {Array(count).fill(0).map((_, index) => (
        <PropertyCardSkeleton key={index} viewType={viewType} />
      ))}
    </div>
  );
}

export function PropertyDetailSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Image gallery skeleton */}
      <div className="bg-gray-200 h-72 md:h-96 w-full rounded-lg mb-8"></div>

      {/* Title and price */}
      <div className="mb-6">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-7 bg-gray-200 rounded w-1/3"></div>
      </div>

      {/* Details section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Left column - Features */}
        <div className="md:col-span-2">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {Array(4).fill(0).map((_, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg">
                <div className="h-5 bg-gray-200 rounded mb-2 w-1/2 mx-auto"></div>
                <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto"></div>
              </div>
            ))}
          </div>

          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4 mt-6"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>

          {/* Amenities */}
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
            {Array(6).fill(0).map((_, index) => (
              <div key={index} className="flex items-center">
                <div className="h-4 w-4 bg-gray-200 rounded-full mr-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column - Contact box */}
        <div>
          <div className="bg-gray-100 p-5 rounded-lg">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4 mx-auto"></div>
            <div className="h-16 bg-gray-200 rounded-full w-16 mb-3 mx-auto"></div>
            <div className="h-5 bg-gray-200 rounded w-2/3 mb-2 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4 mx-auto"></div>
            <div className="h-10 bg-gray-200 rounded mb-3"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
