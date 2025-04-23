// src/hooks/useListings.js
'use client'; // Mark this as a Client Component

import { useEffect, useState } from 'react';
import { MOCK_LISTINGS } from '../constants/config';

export default function useListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate an API call with mock data
    const fetchListings = async () => {
      try {
        // Simulate a delay (e.g., 1 second) to mimic an API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setListings(MOCK_LISTINGS);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  return { listings, loading, error };
}