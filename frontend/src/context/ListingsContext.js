import { createContext, useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

// Set API URL with fallback for development
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Log API URL at startup
console.log("ListingsContext initialized with API_URL:", API_URL);

export const ListingsContext = createContext();

export const ListingsProvider = ({ children }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
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
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  };

  // Get all listings with filters
  const getListings = async (page = 1, filterParams = {}) => {
    setLoading(true);
    setError(null);

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

      // Try to get listings from the API
      try {
        console.log(
          `Fetching listings from: ${API_URL}/properties${queryParams}`
        );
        const res = await api.get(`/properties${queryParams}`, getConfig());

        if (res.data && res.data.success) {
          setListings(res.data.data);
          setPagination({
            currentPage: page,
            totalPages: res.data.totalPages || Math.ceil(res.data.count / 9),
            totalItems: res.data.count,
          });
          setFilters(filterParams);
          setLoading(false);
          console.log("Listings fetched successfully:", res.data.data.length);
          return res.data;
        } else {
          console.warn("Unexpected API response format:", res.data);
          throw new Error("Unexpected API response format");
        }
      } catch (apiError) {
        console.warn("API call failed, using fallback mock data:", apiError);
        console.log(
          "Error details:",
          apiError.response?.data || apiError.message
        );

        // Log API connection information
        console.log("API URL:", API_URL);
        console.log("Query params:", queryParams);
        console.log("Auth token:", token ? "Present" : "Not present");

        // Fallback to mock data for development
        const mockResponse = await getMockListings(filterParams);

        setListings(mockResponse.data);
        setPagination({
          currentPage: page,
          totalPages:
            mockResponse.totalPages || Math.ceil(mockResponse.count / 9),
          totalItems: mockResponse.count,
        });
        setFilters(filterParams);
        setLoading(false);
        console.log("Using mock data instead:", mockResponse.data.length);
        return mockResponse;
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching listings");
      setLoading(false);
      throw err;
    }
  };

  // Mock data function for development/fallback
  const getMockListings = async (filterParams = {}) => {
    // Add a slight delay to simulate network request
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Our mock data
    const allMockListings = [
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
          state: "Maharashtra",
        },
        images: [
          {
            url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop",
          },
        ],
        featured: true,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
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
          state: "Karnataka",
        },
        images: [
          {
            url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop",
          },
        ],
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
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
          state: "Delhi",
        },
        images: [
          {
            url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop",
          },
        ],
        featured: true,
        createdAt: new Date(
          Date.now() - 14 * 24 * 60 * 60 * 1000
        ).toISOString(), // 14 days ago
      },
      {
        _id: "prop4",
        title: "Penthouse with Terrace Garden",
        description:
          "Luxurious penthouse with private terrace garden and panoramic city views",
        price: 55000000, // Price in INR
        propertyType: "Apartment",
        status: "For Sale",
        bedrooms: 4,
        bathrooms: 4.5,
        propertySize: 3800,
        address: {
          city: "Mumbai",
          state: "Maharashtra",
        },
        images: [
          {
            url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop",
          },
        ],
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      },
      {
        _id: "prop5",
        title: "Riverside Villa in Goa",
        description:
          "Stunning villa with private access to the river, perfect for vacation home",
        price: 65000000, // Price in INR
        propertyType: "Villa",
        status: "For Sale",
        bedrooms: 5,
        bathrooms: 5,
        propertySize: 5000,
        address: {
          city: "Panjim",
          state: "Goa",
        },
        images: [
          {
            url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2074&auto=format&fit=crop",
          },
        ],
        featured: true,
        createdAt: new Date(
          Date.now() - 21 * 24 * 60 * 60 * 1000
        ).toISOString(), // 21 days ago
      },
      {
        _id: "prop6",
        title: "Commercial Space in Tech Park",
        description: "Prime commercial space in Bangalore's leading tech park",
        price: 75000000, // Price in INR
        propertyType: "Commercial",
        status: "For Sale",
        bedrooms: 0,
        bathrooms: 4,
        propertySize: 6000,
        address: {
          city: "Bangalore",
          state: "Karnataka",
        },
        images: [
          {
            url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop",
          },
        ],
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      },
      {
        _id: "prop7",
        title: "Smart Home in Hyderabad",
        description: "Fully automated smart home with cutting-edge technology",
        price: 40000000, // Price in INR
        propertyType: "House",
        status: "For Sale",
        bedrooms: 4,
        bathrooms: 3,
        propertySize: 3200,
        address: {
          city: "Hyderabad",
          state: "Telangana",
        },
        images: [
          {
            url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
          },
        ],
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      },
      {
        _id: "prop8",
        title: "Beachfront Property in Chennai",
        description: "Rare beachfront property with stunning sea views",
        price: 85000000, // Price in INR
        propertyType: "Villa",
        status: "For Sale",
        bedrooms: 6,
        bathrooms: 6,
        propertySize: 7000,
        address: {
          city: "Chennai",
          state: "Tamil Nadu",
        },
        images: [
          {
            url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
          },
        ],
        featured: true,
        createdAt: new Date(
          Date.now() - 10 * 24 * 60 * 60 * 1000
        ).toISOString(), // 10 days ago
      },
      {
        _id: "prop9",
        title: "Heritage Haveli in Jaipur",
        description:
          "Restored heritage property with traditional Rajasthani architecture",
        price: 70000000, // Price in INR
        propertyType: "House",
        status: "For Sale",
        bedrooms: 8,
        bathrooms: 7,
        propertySize: 8000,
        address: {
          city: "Jaipur",
          state: "Rajasthan",
        },
        images: [
          {
            url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
          },
        ],
        createdAt: new Date(
          Date.now() - 45 * 24 * 60 * 60 * 1000
        ).toISOString(), // 45 days ago
      },
    ];

    // Filter the mock data based on parameters
    let filteredListings = [...allMockListings];

    // Apply search filter
    if (filterParams.query) {
      const query = filterParams.query.toLowerCase();
      filteredListings = filteredListings.filter(
        (listing) =>
          listing.title.toLowerCase().includes(query) ||
          listing.description.toLowerCase().includes(query) ||
          listing.address.city.toLowerCase().includes(query) ||
          listing.address.state.toLowerCase().includes(query) ||
          listing.propertyType.toLowerCase().includes(query)
      );
    }

    // Apply property type filter
    if (filterParams.propertyType && filterParams.propertyType !== "any") {
      filteredListings = filteredListings.filter(
        (listing) => listing.propertyType === filterParams.propertyType
      );
    }

    // Apply price range filters
    if (filterParams.minPrice) {
      filteredListings = filteredListings.filter(
        (listing) => listing.price >= Number(filterParams.minPrice)
      );
    }

    if (filterParams.maxPrice) {
      filteredListings = filteredListings.filter(
        (listing) => listing.price <= Number(filterParams.maxPrice)
      );
    }

    // Apply bedroom filter
    if (filterParams.bedrooms && filterParams.bedrooms !== "any") {
      filteredListings = filteredListings.filter(
        (listing) => listing.bedrooms >= Number(filterParams.bedrooms)
      );
    }

    // Apply bathroom filter
    if (filterParams.bathrooms && filterParams.bathrooms !== "any") {
      filteredListings = filteredListings.filter(
        (listing) => listing.bathrooms >= Number(filterParams.bathrooms)
      );
    }

    // Apply status filter
    if (filterParams.status) {
      filteredListings = filteredListings.filter(
        (listing) => listing.status === filterParams.status
      );
    }

    // Calculate pagination
    const totalItems = filteredListings.length;
    const totalPages = Math.ceil(totalItems / 9);
    const currentPage = filterParams.page || 1;
    const startIndex = (currentPage - 1) * 9;
    const endIndex = startIndex + 9;
    const paginatedListings = filteredListings.slice(startIndex, endIndex);

    return {
      success: true,
      data: paginatedListings,
      count: totalItems,
      totalPages: totalPages,
    };
  };

  // Get single listing
  const getListing = async (id) => {
    setLoading(true);
    setError(null);

    try {
      // Try to get the listing from the API
      try {
        const res = await api.get(`/properties/${id}`, getConfig());

        if (res.data && res.data.success) {
          setLoading(false);
          return res.data.data;
        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (apiError) {
        console.warn("API call failed, using fallback mock data:", apiError);

        // Fallback to mock data
        // Find the listing in our mock data
        const mockListings = await getMockListings();
        const mockListing = mockListings.data.find(
          (listing) => listing._id === id
        );

        if (mockListing) {
          setLoading(false);
          return mockListing;
        } else {
          // Create a detailed mock listing if ID not found
          const detailedMockListing = {
            _id: id,
            title: "Luxury Villa with Swimming Pool",
            description:
              "This stunning villa features a large swimming pool, spacious living areas, and beautiful gardens. Perfect for a family looking for comfort and luxury.",
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
              country: "India",
            },
            amenities: [
              "Swimming Pool",
              "Garden",
              "Security System",
              "Home Theater",
              "Smart Home",
              "Air Conditioning",
            ],
            featured: true,
            createdAt: new Date(
              Date.now() - 30 * 24 * 60 * 60 * 1000
            ).toISOString(), // 30 days ago
            images: [
              {
                _id: "img1",
                url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop",
              },
              {
                _id: "img2",
                url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop",
              },
              {
                _id: "img3",
                url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
              },
            ],
          };

          setLoading(false);
          return detailedMockListing;
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching listing");
      setLoading(false);
      throw err;
    }
  };

  // Get my listings (for authenticated users)
  const getMyListings = async () => {
    // Don't set loading if already fetched
    const cacheKey = "user_properties";
    const cachedData = sessionStorage.getItem(cacheKey);

    // Try to get from cache first
    if (cachedData) {
      try {
        const parsedData = JSON.parse(cachedData);
        // Use cached data if it's less than 5 minutes old
        const cacheTime = parsedData.timestamp;
        const now = Date.now();
        if (now - cacheTime < 5 * 60 * 1000) {
          // 5 minutes
          console.log("Using cached properties data");
          return parsedData.listings;
        }
      } catch (e) {
        console.warn("Error parsing cached data:", e);
        // Continue with API fetch if cache parse fails
      }
    }

    setLoading(true);
    try {
      // Try to get the user's listings from the API
      try {
        console.log("Fetching user properties from API");
        const res = await api.get("/properties/my-properties", getConfig());

        if (res.data && res.data.success) {
          setLoading(false);

          // Cache the response
          try {
            sessionStorage.setItem(
              cacheKey,
              JSON.stringify({
                listings: res.data.data,
                timestamp: Date.now(),
              })
            );
          } catch (e) {
            console.warn("Failed to cache properties:", e);
          }

          return res.data.data;
        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (apiError) {
        console.warn("API call failed, using fallback mock data:", apiError);

        // Mock user listings for development
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
              state: "Telangana",
            },
            images: [
              {
                url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop",
              },
            ],
            createdAt: new Date(
              Date.now() - 60 * 24 * 60 * 60 * 1000
            ).toISOString(), // 60 days ago
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
              state: "Maharashtra",
            },
            images: [
              {
                url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
              },
            ],
            createdAt: new Date(
              Date.now() - 90 * 24 * 60 * 60 * 1000
            ).toISOString(), // 90 days ago
          },
        ];

        setLoading(false);

        // Cache the mock data too
        try {
          sessionStorage.setItem(
            cacheKey,
            JSON.stringify({
              listings: myListings,
              timestamp: Date.now(),
            })
          );
        } catch (e) {
          console.warn("Failed to cache mock data:", e);
        }

        return myListings;
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching your listings");
      setLoading(false);
      throw err;
    }
  };

  // Create a new listing
  const createListing = async (listingData, images) => {
    try {
      // Try to create the listing via API
      try {
        const formData = new FormData();

        // Add listing data
        Object.keys(listingData).forEach((key) => {
          if (key === "amenities" && Array.isArray(listingData[key])) {
            formData.append(key, JSON.stringify(listingData[key]));
          } else {
            formData.append(key, listingData[key]);
          }
        });

        // Add images
        if (images && images.length > 0) {
          images.forEach((image) => {
            formData.append("images", image);
          });
        }

        const res = await api.post("/properties", formData, {
          ...getConfig(),
          headers: {
            ...getConfig().headers,
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.data && res.data.success) {
          return res.data.data;
        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (apiError) {
        console.warn(
          "API call failed, using fallback mock response:",
          apiError
        );

        // Simulate API call for development
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Return mock response with generated ID
        return {
          ...listingData,
          _id: "new-" + Math.random().toString(36).substr(2, 9),
          images: images.map((_, index) => ({
            _id: `img-${index}`,
            url: URL.createObjectURL(images[index]),
          })),
          createdAt: new Date().toISOString(),
        };
      }
    } catch (err) {
      throw new Error(err.response?.data?.error || "Error creating listing");
    }
  };

  // Update a listing
  const updateListing = async (id, listingData) => {
    try {
      // Try to update the listing via API
      try {
        const res = await api.put(
          `/properties/${id}`,
          listingData,
          getConfig()
        );

        if (res.data && res.data.success) {
          return res.data.data;
        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (apiError) {
        console.warn(
          "API call failed, using fallback mock response:",
          apiError
        );

        // Simulate API call for development
        await new Promise((resolve) => setTimeout(resolve, 600));

        // Return updated listing
        return {
          ...listingData,
          _id: id,
          updatedAt: new Date().toISOString(),
        };
      }
    } catch (err) {
      throw new Error(err.response?.data?.error || "Error updating listing");
    }
  };

  // Delete a listing
  const deleteListing = async (id) => {
    try {
      // Try to delete via API
      try {
        const res = await api.delete(`/properties/${id}`, getConfig());

        if (res.data && res.data.success) {
          return true;
        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (apiError) {
        console.warn(
          "API call failed, using fallback mock response:",
          apiError
        );

        // Simulate API call for development
        await new Promise((resolve) => setTimeout(resolve, 500));
        return true;
      }
    } catch (err) {
      throw new Error(err.response?.data?.error || "Error deleting listing");
    }
  };

  // Upload images to an existing listing
  const uploadListingImages = async (id, images) => {
    try {
      // Try to upload images via API
      try {
        const formData = new FormData();

        // Add images
        if (images && images.length > 0) {
          images.forEach((image) => {
            formData.append("images", image);
          });
        }

        const res = await api.post(`/properties/${id}/images`, formData, {
          ...getConfig(),
          headers: {
            ...getConfig().headers,
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.data && res.data.success) {
          return res.data;
        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (apiError) {
        console.warn(
          "API call failed, using fallback mock response:",
          apiError
        );

        // Simulate API call for development
        await new Promise((resolve) => setTimeout(resolve, 700));

        // Return mock result
        return {
          success: true,
          images: images.map((_, index) => ({
            _id: `new-img-${index}`,
            url: URL.createObjectURL(images[index]),
          })),
        };
      }
    } catch (err) {
      throw new Error(err.response?.data?.error || "Error uploading images");
    }
  };

  // Delete an image from a listing
  const deleteListingImage = async (propertyId, imageId) => {
    try {
      // Try to delete image via API
      try {
        const res = await api.delete(
          `/properties/${propertyId}/images/${imageId}`,
          getConfig()
        );

        if (res.data && res.data.success) {
          return { success: true };
        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (apiError) {
        console.warn(
          "API call failed, using fallback mock response:",
          apiError
        );

        // Simulate API call for development
        await new Promise((resolve) => setTimeout(resolve, 300));
        return { success: true };
      }
    } catch (err) {
      throw new Error(err.response?.data?.error || "Error deleting image");
    }
  };

  // Initialize - load listings on first render only
  const initialLoadRef = useRef(false);

  useEffect(() => {
    // Only fetch listings if not already loaded
    if (!initialLoadRef.current) {
      initialLoadRef.current = true;
      getListings();
    }
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
