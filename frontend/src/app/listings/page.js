// app/listings/page.js
'use client';

import { useState, useEffect, useContext, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PropertyListings from '../../components/listings/PropertyListings';
import Pagination from '../../components/common/Pagination';
import { ListingsContext } from '../../context/ListingsContext';
import { MotionDiv } from '../../components/MotionWrapper';

// Create a client component that uses useSearchParams
function ListingsContent() {
  const searchParams = useSearchParams();
  const { pagination, getListings } = useContext(ListingsContext);

  // Get initial filters from URL query parameters
  const initialFetchRef = useRef(false);

  useEffect(() => {
    // Prevent multiple re-renders causing multiple API calls
    if (initialFetchRef.current) {
      // Only process URL changes after initial load
      const initialFilters = {};

      // Check for search query
      const q = searchParams.get('q');
      if (q) initialFilters.query = q;

      // Check for property type
      const propertyType = searchParams.get('type');
      if (propertyType) initialFilters.propertyType = propertyType;

      // Check for status
      const status = searchParams.get('status');
      if (status) initialFilters.status = status;

      // Check for bedrooms
      const bedrooms = searchParams.get('bedrooms');
      if (bedrooms) initialFilters.bedrooms = bedrooms;

      // Check for price ranges
      const minPrice = searchParams.get('minPrice');
      if (minPrice) initialFilters.minPrice = minPrice;

      const maxPrice = searchParams.get('maxPrice');
      if (maxPrice) initialFilters.maxPrice = maxPrice;

      // Get page number
      const page = parseInt(searchParams.get('page'), 10) || 1;

      // Only fetch if actual URL params have changed
      if (Object.keys(initialFilters).length > 0 || page > 1) {
        getListings(page, initialFilters);
      }
    } else {
      // First run, just mark as initialized
      initialFetchRef.current = true;
    }
  }, [searchParams]);

  // Handle page change
  const handlePageChange = (page) => {
    getListings(page);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Property Listings
          </h1>
          <p className="text-lg text-gray-600">
            Find your dream property among our curated listings
          </p>
        </MotionDiv>

        <PropertyListings />

        {pagination.totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function Listings() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 flex justify-center items-center">
          <div className="text-center">
            <h2 className="text-xl font-medium text-gray-600">Loading listings...</h2>
          </div>
        </div>
      </div>
    }>
      <ListingsContent />
    </Suspense>
  );
}
