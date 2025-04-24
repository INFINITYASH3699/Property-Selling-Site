// app/listings/page.js
'use client';

import { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'next/navigation';
import PropertyListings from '../../components/listings/PropertyListings';
import Pagination from '../../components/common/Pagination';
import { ListingsContext } from '../../context/ListingsContext';
import { motion } from 'framer-motion';

export default function Listings() {
  const searchParams = useSearchParams();
  const { pagination, getListings } = useContext(ListingsContext);

  // Get initial filters from URL query parameters
  useEffect(() => {
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

    // Fetch listings with filters
    getListings(page, initialFilters);
  }, [searchParams, getListings]);

  // Handle page change
  const handlePageChange = (page) => {
    getListings(page);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
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
        </motion.div>

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
