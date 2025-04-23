// context/WishlistContext.js
import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { user, token, isAuthenticated } = useContext(AuthContext);

  const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
  });

  // Get auth header
  const getConfig = () => {
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  };

  // Get wishlist
  const getWishlist = async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    try {
      const res = await api.get('/wishlist', getConfig());
      setWishlist(res.data.data.properties || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching wishlist');
      console.error('Wishlist error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add to wishlist
  const addToWishlist = async (propertyId) => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    try {
      const res = await api.post(`/wishlist/${propertyId}`, {}, getConfig());
      setWishlist(res.data.data.properties || []);
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Error adding to wishlist');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Remove from wishlist
  const removeFromWishlist = async (propertyId) => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    try {
      const res = await api.delete(`/wishlist/${propertyId}`, getConfig());
      setWishlist(res.data.data.properties || []);
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Error removing from wishlist');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Clear wishlist
  const clearWishlist = async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    try {
      await api.delete('/wishlist', getConfig());
      setWishlist([]);
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Error clearing wishlist');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Check if a property is in wishlist
  const isInWishlist = (propertyId) => {
    return wishlist.some(item => item._id === propertyId || item === propertyId);
  };

  // Load wishlist when user changes
  useEffect(() => {
    if (isAuthenticated) {
      getWishlist();
    } else {
      setWishlist([]);
    }
  }, [isAuthenticated, user]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        error,
        getWishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};