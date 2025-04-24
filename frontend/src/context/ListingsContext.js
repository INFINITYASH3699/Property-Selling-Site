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

      // Using mock data for now since we're focusing on frontend changes
      // In a production app, this would be a real API call
      // const res = await api.get(`/properties${queryParams}`);

      // Simulate API response with mock data
      const mockResponse = {
        data: [
          {
            _id: "prop1",
            title: "Modern Villa in Mumbai",
            description: "A beautiful modern villa with all amenities",
            price: 35000000, // Price in INR
            propertyType: "Villa",
            status: "For Sale",
            bedrooms: 4,
            bathrooms: 3,
            propertySize: 3500,
            address: {
              city: "Mumbai",
              state: "Maharashtra"
            },
            images: [
              { url: "https://is1-2.housingcdn.com/4f2250e8/9a3ba28eaa3475a8d913a38f59668790/v0/fs/sanjivani_snehal_apartment-chinchwad_1-pune-sanjivani_reality.jpeg" }
            ],
            featured: true
          },
          {
            _id: "prop2",
            title: "Luxury Apartment in Bangalore",
            description: "Spacious apartment with city view",
            price: 25000000, // Price in INR
            propertyType: "Apartment",
            status: "For Sale",
            bedrooms: 3,
            bathrooms: 2,
            propertySize: 2000,
            address: {
              city: "Bangalore",
              state: "Karnataka"
            },
            images: [
              { url: "https://archipro.com.au/images/cdn-images/width%3D3840%2Cquality%3D80/images/s1/article/building/Form-Apartments-Port-Coogee-by-Stiebel-Eltron-.jpg/eyJlZGl0cyI6W3sidHlwZSI6InpwY2YiLCJvcHRpb25zIjp7ImJveFdpZHRoIjoxOTIwLCJib3hIZWlnaHQiOjE1NTgsImNvdmVyIjp0cnVlLCJ6b29tV2lkdGgiOjIzMTcsInNjcm9sbFBvc1giOjU2LCJzY3JvbGxQb3NZIjozMywiYmFja2dyb3VuZCI6InJnYigxMTUsMTQwLDE5NCkiLCJmaWx0ZXIiOjZ9fSx7InR5cGUiOiJmbGF0dGVuIiwib3B0aW9ucyI6eyJiYWNrZ3JvdW5kIjoiI2ZmZmZmZiJ9fV0sInF1YWxpdHkiOjg3LCJ0b0Zvcm1hdCI6ImpwZyJ9" }
            ]
          },
          {
            _id: "prop3",
            title: "Garden House in Delhi",
            description: "Beautiful house with spacious garden",
            price: 45000000, // Price in INR
            propertyType: "House",
            status: "For Sale",
            bedrooms: 5,
            bathrooms: 4,
            propertySize: 4000,
            address: {
              city: "Delhi",
              state: "Delhi"
            },
            images: [
              { url: "https://images.nobroker.in/img/5ba3f029714b56aa085747fe/5ba3f029714b56aa085747fe_75932_435888_large.jpg" }
            ]
          }
        ],
        totalPages: 3,
        count: 27
      };

      // Add a slight delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 500));

      setListings(mockResponse.data);
      setPagination({
        currentPage: page,
        totalPages: mockResponse.totalPages || Math.ceil(mockResponse.count / 9),
      });
      setFilters(filterParams);
      setLoading(false);
      return mockResponse;
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
      // In a production app, this would call the real API
      // Simulate with mock data for now
      await new Promise(resolve => setTimeout(resolve, 300));

      const mockListing = {
        _id: id,
        title: "Luxury Villa with Swimming Pool",
        description: "This stunning villa features a large swimming pool, spacious living areas, and beautiful gardens. Perfect for a family looking for comfort and luxury.",
        price: 47500000, // Price in INR
        propertyType: "Villa",
        status: "For Sale",
        bedrooms: 5,
        bathrooms: 4,
        propertySize: 4500,
        yearBuilt: 2020,
        garage: 2,
        address: {
          street: "123 Luxury Lane",
          city: "Mumbai",
          state: "Maharashtra",
          zipCode: "400001",
          country: "India"
        },
        amenities: ["Swimming Pool", "Garden", "Security System", "Home Theater", "Smart Home", "Air Conditioning"],
        featured: true,
        images: [
          {
            _id: "img1",
            url: "https://is1-2.housingcdn.com/4f2250e8/9a3ba28eaa3475a8d913a38f59668790/v0/fs/sanjivani_snehal_apartment-chinchwad_1-pune-sanjivani_reality.jpeg"
          },
          {
            _id: "img2",
            url: "https://images.nobroker.in/img/5ba3f029714b56aa085747fe/5ba3f029714b56aa085747fe_75932_435888_large.jpg"
          }
        ]
      };

      setLoading(false);
      return mockListing;
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
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 300));

      const myListings = [
        {
          _id: "myProp1",
          title: "My Investment Property",
          description: "A great investment opportunity",
          price: 28000000, // Price in INR
          propertyType: "Apartment",
          status: "For Sale",
          bedrooms: 2,
          bathrooms: 2,
          propertySize: 1200,
          address: {
            city: "Hyderabad",
            state: "Telangana"
          },
          images: [
            { url: "https://is1-2.housingcdn.com/4f2250e8/9a3ba28eaa3475a8d913a38f59668790/v0/fs/sanjivani_snehal_apartment-chinchwad_1-pune-sanjivani_reality.jpeg" }
          ]
        },
        {
          _id: "myProp2",
          title: "My Rental Property",
          description: "Perfect for families looking to rent",
          price: 35000, // Price in INR per month
          propertyType: "House",
          status: "For Rent",
          bedrooms: 3,
          bathrooms: 2,
          propertySize: 1800,
          address: {
            city: "Pune",
            state: "Maharashtra"
          },
          images: [
            { url: "https://images.nobroker.in/img/5ba3f029714b56aa085747fe/5ba3f029714b56aa085747fe_75932_435888_large.jpg" }
          ]
        }
      ];

      setLoading(false);
      return myListings;
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching your listings");
      setLoading(false);
      throw err;
    }
  };

  // Create a new listing
  const createListing = async (listingData, images) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      // Return mock response with generated ID
      return {
        ...listingData,
        _id: "new-" + Math.random().toString(36).substr(2, 9),
        images: images.map((_, index) => ({
          _id: `img-${index}`,
          url: URL.createObjectURL(images[index])
        }))
      };
    } catch (err) {
      throw new Error(err.response?.data?.error || "Error creating listing");
    }
  };

  // Update a listing
  const updateListing = async (id, listingData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600));

      // Return updated listing
      return {
        ...listingData,
        _id: id
      };
    } catch (err) {
      throw new Error(err.response?.data?.error || "Error updating listing");
    }
  };

  // Delete a listing
  const deleteListing = async (id) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return true;
    } catch (err) {
      throw new Error(err.response?.data?.error || "Error deleting listing");
    }
  };

  // Upload images to an existing listing
  const uploadListingImages = async (id, images) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 700));

      // Return mock result
      return {
        success: true,
        images: images.map((_, index) => ({
          _id: `new-img-${index}`,
          url: URL.createObjectURL(images[index])
        }))
      };
    } catch (err) {
      throw new Error(err.response?.data?.error || "Error uploading images");
    }
  };

  // Delete an image from a listing
  const deleteListingImage = async (propertyId, imageId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      return { success: true };
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
