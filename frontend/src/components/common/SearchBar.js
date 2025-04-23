'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for suggestions (replace with real data from your backend)
  const mockSuggestions = [
    'Modern Apartment in New York',
    'Luxury Villa in Los Angeles',
    'Cozy Cottage in Seattle',
    'Family Home in Chicago',
    'Beach House in Miami',
  ];

  // Debounce search input
  useEffect(() => {
    if (query.trim() === '') {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    const timer = setTimeout(() => {
      const filteredSuggestions = mockSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setIsLoading(false);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    onSearch(''); // Optionally trigger a search with an empty query
  };

  return (
    <div className="relative flex justify-center my-8">
      <form onSubmit={handleSearch} className="w-full max-w-md relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by title or location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Search Icon */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          {/* Clear Button */}
          {query && (
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

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute top-12 w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <ul className="py-2">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => {
                  setQuery(suggestion);
                  onSearch(suggestion);
                  setSuggestions([]);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute top-12 w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className="px-4 py-2 text-gray-700 flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </div>
        </div>
      )}
    </div>
  );
}