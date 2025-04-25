// components/common/SkeletonLoader.js
"use client";

import { MotionDiv } from "../MotionWrapper";

// Property Card Skeleton
export function PropertyCardSkeleton({ viewType = "grid", count = 6 }) {
  // Generate multiple skeletons
  const skeletons = Array.from({ length: count }).map((_, i) => (
    <SkeletonItem key={i} viewType={viewType} delay={i * 0.05} />
  ));

  return (
    <div
      className={
        viewType === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "flex flex-col space-y-6"
      }
    >
      {skeletons}
    </div>
  );
}

// Individual Skeleton
function SkeletonItem({ viewType, delay = 0 }) {
  if (viewType === "grid") {
    return (
      <MotionDiv
        className="bg-white rounded-xl overflow-hidden h-full shadow-property border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.3 }}
      >
        <div className="flex flex-col h-full">
          {/* Image Skeleton */}
          <div className="relative h-56 w-full bg-gray-200 animate-pulse"></div>

          {/* Content */}
          <div className="p-4 flex-grow flex flex-col">
            {/* Date */}
            <div className="h-3 w-20 bg-gray-200 rounded animate-pulse mb-3"></div>

            {/* Price */}
            <div className="h-6 w-32 bg-gray-300 rounded animate-pulse mb-3"></div>

            {/* Title */}
            <div className="h-5 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>

            {/* Features */}
            <div className="mt-auto border-t border-gray-200 pt-3 flex justify-between">
              <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Button */}
          <div className="p-4 pt-0">
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </MotionDiv>
    );
  }

  // List view skeleton
  return (
    <MotionDiv
      className="bg-white rounded-xl overflow-hidden shadow-property border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      <div className="flex flex-col md:flex-row">
        {/* Image skeleton */}
        <div className="relative h-64 md:h-auto md:w-2/5 lg:w-1/3 bg-gray-200 animate-pulse"></div>

        {/* Content skeleton */}
        <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
          <div>
            {/* Date */}
            <div className="h-3 w-20 bg-gray-200 rounded animate-pulse mb-3"></div>

            {/* Price */}
            <div className="h-6 w-32 bg-gray-300 rounded animate-pulse mb-3"></div>

            {/* Title */}
            <div className="h-5 w-48 bg-gray-200 rounded animate-pulse mb-3"></div>

            {/* Location */}
            <div className="h-4 w-40 bg-gray-200 rounded animate-pulse mb-4"></div>

            {/* Description */}
            <div className="space-y-2 mb-4">
              <div className="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3 w-5/6 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Features and Button */}
          <div className="flex flex-wrap justify-between items-center border-t border-gray-200 pt-4">
            <div className="flex gap-4">
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}

// Detail Page Skeleton
export function PropertyDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - 2/3 width on desktop */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <div className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>

          {/* Title and Price */}
          <div className="space-y-4">
            <div className="h-8 w-3/4 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-6 w-48 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center p-4 border rounded-lg">
                <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse mb-2"></div>
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="space-y-3 mt-6">
            <div className="h-5 w-40 bg-gray-300 rounded animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-3 mt-6">
            <div className="h-5 w-40 bg-gray-300 rounded animate-pulse"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-6 w-full bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - 1/3 width on desktop */}
        <div className="space-y-6">
          {/* Agent Card */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center mb-4">
              <div className="h-16 w-16 bg-gray-200 rounded-full animate-pulse mr-4"></div>
              <div className="space-y-2">
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Map */}
          <div className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>

          {/* Similar Properties */}
          <div className="space-y-4">
            <div className="h-5 w-40 bg-gray-300 rounded animate-pulse"></div>
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-lg border shadow-sm">
                <div className="h-32 w-full bg-gray-200 rounded animate-pulse mb-3"></div>
                <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyCardSkeleton;
