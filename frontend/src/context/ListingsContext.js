// context/ListingsContext.js
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const ListingsContext = createContext();

export const ListingsProvider = ({ children }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  
  const { token } = useContext(AuthContext);

  // Set up axios instance
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

  // Get all listings with filters
  const getListings = async (page = 1, filterParams = {}) => {
    setLoading(true);
    try {
      // Build query params
      let queryParams = `?page=${page}&limit=9`;

      if (filterParams.query) {
        queryParams += `&q=${filterParams.query}`;
      }

      if (filterParams.propertyType && filterParams.propertyType !== "any") {
        queryParams += `&propertyType=${filterParams.propertyType}`;
      }

      if (filterParams.minPrice) {
        queryParams += `&price[gte]=${filterParams.minPrice}`;
      }

      if (filterParams.maxPrice) {
        queryParams += `&price[lte]=${filterParams.maxPrice}`;
      }

      if (filterParams.bedrooms && filterParams.bedrooms !== "any") {
        queryParams += `&bedrooms=${filterParams.bedrooms}`;
      }

      if (filterParams.bathrooms && filterParams.bathrooms !== "any") {
        queryParams += `&bathrooms=${filterParams.bathrooms}`;
      }

      if (filterParams.status) {
        queryParams += `&status=${filterParams.status}`;
      }

      const res = await api.get(`/properties${queryParams}`);

      setListings(res.data.data);
      setPagination({
        currentPage: page,
        totalPages: res.data.totalPages || Math.ceil(res.data.count / 9),
      });
      setFilters(filterParams);
      setLoading(false);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching listings");
      setLoading(false);
      throw err;
    }
  };

  // Get single listing
  const getListing = async (id) => {
    setLoading(true);
    try {
      const res = await api.get(`/properties/${id}`);
      setLoading(false);
      return res.data.data;
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching listing");
      setLoading(false);
      throw err;
    }
  };

  // Get my listings (for authenticated users)
  const getMyListings = async () => {
    setLoading(true);
    try {
      const res = await api.get('/properties/my-properties', getConfig());
      setLoading(false);
      return res.data.data;
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching your listings");
      setLoading(false);
      throw err;
    }
  };

  // Create a new listing
  const createListing = async (listingData, images) => {
    try {
      // Create FormData for image upload
      const formData = new FormData();

      // Handle address as a nested object
      if (listingData.address) {
        for (const key in listingData.address) {
          formData.append(`address[${key}]`, listingData.address[key]);
        }
        delete listingData.address;
      }

      // Handle amenities as an array
      if (listingData.amenities) {
        if (Array.isArray(listingData.amenities)) {
          listingData.amenities.forEach(item => {
            formData.append('amenities', item);
          });
        } else if (typeof listingData.amenities === 'string') {
          listingData.amenities.split(',').forEach(item => {
            formData.append('amenities', item.trim());
          });
        }
        delete listingData.amenities;
      }

      // Add all other listing data to formData
      for (const key in listingData) {
        formData.append(key, listingData[key]);
      }

      // Add images
      if (images && images.length > 0) {
        images.forEach(image => {
          formData.append('images', image);
        });
      }

      const res = await api.post('/properties', formData, getConfig());
      return res.data.data;
    } catch (err) {
      throw new Error(err.response?.data?.error || "Error creating listing");
    }
  };

  // Update a listing
  const updateListing = async (id, listingData) => {
    try {
      // Format the data - if we have nested objects or arrays, the backend expects them in a specific format
      const formattedData = { ...listingData };
      
      // Convert amenities to array if it's a string
      if (typeof formattedData.amenities === 'string') {
        formattedData.amenities = formattedData.amenities.split(',').map(item => item.trim());
      }

      const res = await api.put(`/properties/${id}`, formattedData, getConfig());
      return res.data.data;
    } catch (err) {
      throw new Error(err.response?.data?.error || "Error updating listing");
    }
  };

  // Delete a listing
  const deleteListing = async (id) => {
    try {
      await api.delete(`/properties/${id}`, getConfig());
      return true;
    } catch (err) {
      throw new Error(err.response?.data?.error || "Error deleting listing");
    }
  };

  // Upload images to an existing listing
  const uploadListingImages = async (id, images) => {
    try {
      const formData = new FormData();

      images.forEach((image) => {
        formData.append("images", image);
      });

      const res = await api.post(`/properties/${id}/images`, formData, getConfig());
      return res.data.data;
    } catch (err) {
      throw new Error(err.response?.data?.error || "Error uploading images");
    }
  };

  // Delete an image from a listing
  const deleteListingImage = async (propertyId, imageId) => {
    try {
      const res = await api.delete(`/properties/${propertyId}/images/${imageId}`, getConfig());
      return res.data.data;
    } catch (err) {
      throw new Error(err.response?.data?.error || "Error deleting image");
    }
  };

  // Initialize - load listings on first render
  useEffect(() => {
    getListings();
  }, []);

  return (
    <ListingsContext.Provider
      value={{
        listings,
        loading,
        error,
        pagination,
        filters,
        getListings,
        getListing,
        getMyListings,
        createListing,
        updateListing,
        deleteListing,
        uploadListingImages,
        deleteListingImage,
        setFilters,
      }}
    >
      {children}
    </ListingsContext.Provider>
  );
};