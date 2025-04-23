// app/listings/page.js
'use client';

import { useState } from 'react';
import PropertyListings from '../../components/listings/PropertyListings';
import Pagination from '../../components/common/Pagination';
import { MOCK_LISTINGS } from '../../constants/config';

const ITEMS_PER_PAGE = 6;

export default function listings() {
  const [listings, setListings] = useState(MOCK_LISTINGS);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (query) => {
    const filteredListings = MOCK_LISTINGS.filter(
      (listing) =>
        listing.title.toLowerCase().includes(query.toLowerCase()) ||
        listing.location.toLowerCase().includes(query.toLowerCase())
    );
    setListings(filteredListings);
    setCurrentPage(1); // Reset to the first page after search
  };

  const handleFilter = (filters) => {
    const filteredListings = MOCK_LISTINGS.filter((listing) => {
      return (
        (!filters.minPrice || listing.price >= filters.minPrice) &&
        (!filters.maxPrice || listing.price <= filters.maxPrice) &&
        (!filters.bedrooms || listing.bedrooms >= filters.bedrooms) &&
        (!filters.bathrooms || listing.bathrooms >= filters.bathrooms)
      );
    });
    setListings(filteredListings);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(listings.length / ITEMS_PER_PAGE);
  const paginatedListings = listings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div>
      <main className="px-4">
        <PropertyListings listings={paginatedListings} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  );
}