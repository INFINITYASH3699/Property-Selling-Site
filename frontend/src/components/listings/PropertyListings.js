"use client";

import { useState, useEffect, useRef, useContext } from "react";
import { motion } from "framer-motion";
import PropertyCard from "../../app/listings/PropertyCard";
import LoadingSpinner from "../common/LoadingSpinner";
import { ChevronDown, ChevronUp, Filter, Search, X } from "lucide-react";
import { ListingsContext } from "../../context/ListingsContext";

export default function PropertyListings() {
  const { listings, loading, error, pagination, getListings } =
    useContext(ListingsContext);

  const [localFilters, setLocalFilters] = useState({
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
    propertyType: "any",
    query: "",
  });
  const [view, setView] = useState("grid"); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState("newest");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const filterDropdownRef = useRef(null);
  const filterButtonRef = useRef(null);

  // Mock data for suggestions
  const mockSuggestions = [
    "Modern Apartment in New York",
    "Luxury Villa in Los Angeles",
    "Cozy Cottage in Seattle",
    "Family Home in Chicago",
    "Beach House in Miami",
  ];

  // Close filter dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target) &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(event.target)
      ) {
        setShowFilterDropdown(false);
      }
    }

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Remove event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterDropdownRef, filterButtonRef]);

  // Handle search input with debounce
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSuggestions([]);
      return;
    }

    setIsTyping(true);

    // Simulate API call delay
    const timer = setTimeout(() => {
      const filteredSuggestions = mockSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setIsTyping(false);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Apply all filters and search
  const applyFilters = () => {
    // Collect all filter parameters
    const filtersToApply = {
      ...localFilters,
      query: searchQuery || localFilters.query,
    };

    // Clean up empty filters
    Object.keys(filtersToApply).forEach((key) => {
      if (filtersToApply[key] === "" || filtersToApply[key] === "any") {
        delete filtersToApply[key];
      }
    });

    // Call API with filters
    getListings(1, filtersToApply);
  };

  const handleSearch = (e) => {
    e && e.preventDefault();
    setLocalFilters({
      ...localFilters,
      query: searchQuery,
    });
    applyFilters();
    setSuggestions([]);
  };

  const handleClear = () => {
    setSearchQuery("");
    setSuggestions([]);
    setLocalFilters({
      ...localFilters,
      query: "",
    });
    applyFilters();
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearchQuery(suggestion);
    setLocalFilters({
      ...localFilters,
      query: suggestion,
    });
    setSuggestions([]);
    applyFilters();
  };

  const handleFilter = (newFilters) => {
    setLocalFilters({
      ...localFilters,
      ...newFilters,
    });
    setShowFilterDropdown(false);

    // Apply the new filters
    const filtersToApply = {
      ...localFilters,
      ...newFilters,
      query: searchQuery,
    };

    // Clean up empty filters
    Object.keys(filtersToApply).forEach((key) => {
      if (filtersToApply[key] === "" || filtersToApply[key] === "any") {
        delete filtersToApply[key];
      }
    });

    getListings(1, filtersToApply);
  };

  const resetFilters = () => {
    setLocalFilters({
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
      bathrooms: "",
      propertyType: "any",
      query: "",
    });
    setSearchQuery("");
    getListings(1, {});
  };

  // Handle pagination
  const handlePageChange = (page) => {
    getListings(page, localFilters);
  };

  // Handle sort change
  const handleSortChange = (sortValue) => {
    setSortBy(sortValue);
    // Currently sorting is done client-side, but you could also sort server-side by adding a sort parameter to getListings
  };

  // Loading state
  if (loading) return <LoadingSpinner />;

  // Error state
  if (error) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
        <p className="mb-4">{error}</p>
        <button
          onClick={() => getListings(1, {})}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  // No results state
  if (listings.length === 0) {
    return (
      <div className="p-8">
        {/* Search Bar */}
        <div className="relative flex justify-center my-8">
          <form onSubmit={handleSearch} className="w-full max-w-md relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* Search Icon */}
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              {/* Clear Button */}
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X size={18} className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="relative mb-4">
          <button
            ref={filterButtonRef}
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm"
          >
            <Filter size={18} className="mr-2" />
            Filters
            {showFilterDropdown ? (
              <ChevronUp size={18} className="ml-1" />
            ) : (
              <ChevronDown size={18} className="ml-1" />
            )}
          </button>

          {showFilterDropdown && (
            <div
              ref={filterDropdownRef}
              className="absolute mt-2 w-full bg-white rounded-lg border border-gray-200 shadow-lg z-30"
            >
              <FilterDropdown
                initialFilters={localFilters}
                onFilter={handleFilter}
              />
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 text-center mt-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            No properties found
          </h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your filters to find more properties
          </p>
          <button
            onClick={resetFilters}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Reset Filters
          </button>
        </div>
      </div>
    );
  }

  // Apply sort function to listings
  const sortedListings = [...listings].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <div className="p-4 lg:p-8">
      {/* Filter Toggle and Sort Controls */}
      <div className="mb-6 bg-white rounded-lg shadow-sm p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
          {/* Property Count */}
          <h2 className="text-xl font-bold text-gray-800">
            {listings.length} Properties Available
          </h2>

          {/* Search Bar - Positioned in the middle */}
          <div className="relative flex-grow max-w-md mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by title or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {/* Search Icon */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                {/* Clear Button */}
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <X
                      size={18}
                      className="text-gray-400 hover:text-gray-600"
                    />
                  </button>
                )}
              </div>
            </form>

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <div className="absolute top-12 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <ul className="py-2">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelectSuggestion(suggestion)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Loading Spinner */}
            {isTyping && (
              <div className="absolute top-12 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="px-4 py-2 text-gray-700 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                </div>
              </div>
            )}
          </div>

          {/* Controls: View Toggle, Sort, Filters */}
          <div className="flex flex-wrap gap-2 items-center">
            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setView("grid")}
                className={`flex-1 flex justify-center items-center px-4 py-2 text-sm rounded-md ${
                  view === "grid"
                    ? "bg-white text-blue-500 shadow-sm"
                    : "text-gray-600"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
                Grid
              </button>
              <button
                onClick={() => setView("list")}
                className={`flex-1 flex justify-center items-center px-4 py-2 text-sm rounded-md ${
                  view === "list"
                    ? "bg-white text-blue-500 shadow-sm"
                    : "text-gray-600"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
                List
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <button
                ref={filterButtonRef}
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm"
              >
                <Filter size={18} className="mr-2" />
                Filters
                {showFilterDropdown ? (
                  <ChevronUp size={18} className="ml-1" />
                ) : (
                  <ChevronDown size={18} className="ml-1" />
                )}
              </button>

              {showFilterDropdown && (
                <div
                  ref={filterDropdownRef}
                  className="absolute right-0 mt-2 w-64 md:w-96 bg-white rounded-lg border border-gray-200 shadow-lg z-30"
                >
                  <FilterDropdown
                    initialFilters={localFilters}
                    onFilter={handleFilter}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Property Listings */}
      <motion.div
        className={
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "flex flex-col space-y-6"
        }
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {sortedListings.map((property, index) => (
          <motion.div
            key={property._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            <PropertyCard property={property} viewType={view} />
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

// Filter Dropdown Component
function FilterDropdown({ initialFilters, onFilter }) {
  const [filterState, setFilterState] = useState({
    minPrice: initialFilters?.minPrice || "",
    maxPrice: initialFilters?.maxPrice || "",
    bedrooms: initialFilters?.bedrooms || "",
    bathrooms: initialFilters?.bathrooms || "",
    propertyType: initialFilters?.propertyType || "any",
  });

  // Update local state when initialFilters change
  useEffect(() => {
    setFilterState({
      minPrice: initialFilters?.minPrice || "",
      maxPrice: initialFilters?.maxPrice || "",
      bedrooms: initialFilters?.bedrooms || "",
      bathrooms: initialFilters?.bathrooms || "",
      propertyType: initialFilters?.propertyType || "any",
    });
  }, [initialFilters]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    onFilter(filterState);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleFilterSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Min Price */}
          <div>
            <label
              htmlFor="minPrice"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Min Price
            </label>
            <input
              type="number"
              id="minPrice"
              placeholder="Min Price"
              value={filterState.minPrice}
              onChange={(e) =>
                setFilterState({ ...filterState, minPrice: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Max Price */}
          <div>
            <label
              htmlFor="maxPrice"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Max Price
            </label>
            <input
              type="number"
              id="maxPrice"
              placeholder="Max Price"
              value={filterState.maxPrice}
              onChange={(e) =>
                setFilterState({ ...filterState, maxPrice: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Bedrooms */}
          <div>
            <label
              htmlFor="bedrooms"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Bedrooms
            </label>
            <select
              id="bedrooms"
              value={filterState.bedrooms}
              onChange={(e) =>
                setFilterState({ ...filterState, bedrooms: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="any">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>

          {/* Property Type */}
          <div>
            <label
              htmlFor="propertyType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Property Type
            </label>
            <select
              id="propertyType"
              value={filterState.propertyType}
              onChange={(e) =>
                setFilterState({ ...filterState, propertyType: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="any">Any Type</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Condo">Condo</option>
              <option value="Villa">Villa</option>
              <option value="Land">Land</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>
        </div>

        {/* Apply Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Apply Filters
        </button>
      </form>
    </div>
  );
}

// Pagination Component
function Pagination({ currentPage, totalPages, onPageChange }) {
  const maxDisplayedPages = 5;

  // Calculate range of pages to display
  let startPage = Math.max(1, currentPage - Math.floor(maxDisplayedPages / 2));
  let endPage = Math.min(totalPages, startPage + maxDisplayedPages - 1);

  // Adjust start if we're near the end
  if (endPage === totalPages) {
    startPage = Math.max(1, endPage - maxDisplayedPages + 1);
  }

  // Generate page numbers
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="flex items-center space-x-2">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md ${
          currentPage === 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
        }`}
      >
        &laquo;
      </button>

      {/* First page if not in range */}
      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            1
          </button>
          {startPage > 2 && (
            <span className="px-2 py-1 text-gray-500">...</span>
          )}
        </>
      )}

      {/* Page numbers */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md ${
            currentPage === page
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Last page if not in range */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="px-2 py-1 text-gray-500">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next button */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
        }`}
      >
        &raquo;
      </button>
    </div>
  );
}
