// components/LocationsPageContent.js
"use client";

import { useState, useEffect, useContext, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Search, ChevronRight } from "lucide-react";
import { ListingsContext } from "@/context/ListingsContext";
import { MotionDiv } from "@/components/MotionWrapper";

// Skeleton loader
const LocationsSkeletonLoader = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="mb-10">
      <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mb-3"></div>
      <div className="h-4 w-full md:w-2/3 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
    </div>
    <div className="h-14 w-full bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mb-10"></div>
    <div className="mb-10">
      <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mb-6"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
          ></div>
        ))}
      </div>
    </div>
    <div>
      <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mb-6"></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-16 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  </div>
);

// Card components
const LocationCard = ({ location, propertyCount, imageUrl, index }) => (
  <MotionDiv
    className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group h-48"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05, duration: 0.3 }}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10"></div>
    <Image
      src={imageUrl || "/path/to/fallback-image.jpg"}
      alt={location}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-110"
    />
    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
      <h3 className="text-white font-bold text-lg mb-1">{location}</h3>
      <p className="text-white/80 text-sm">{propertyCount} Properties</p>
    </div>
  </MotionDiv>
);

const StateCard = ({ state, propertyCount, index }) => (
  <MotionDiv
    className="bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center hover:shadow-md transition-shadow duration-300"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05, duration: 0.3 }}
  >
    <div className="flex items-center">
      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
        <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      </div>
      <div>
        <h3 className="font-medium text-gray-900 dark:text-white">{state}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {propertyCount} listings
        </p>
      </div>
    </div>
    <ChevronRight className="h-5 w-5 text-gray-400" />
  </MotionDiv>
);

// Main component logic
export default function LocationsPageContent() {
  const { getListings } = useContext(ListingsContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [locations, setLocations] = useState([]);

  // Fetch data
  useEffect(() => {
    const fetchLocationsData = async () => {
      try {
        setIsLoading(true);
        const response = await getListings();
        const locationsData = processListingsForLocations(response.data || []);
        setLocations(locationsData);
      } catch (err) {
        setError("Failed to load locations. Please try again later.");
      } finally {
        setTimeout(() => setIsLoading(false), 1000);
      }
    };

    fetchLocationsData();
    // eslint-disable-next-line
  }, [getListings]);

  // Locations processor
  const processListingsForLocations = (listings) => {
    const cities = {};
    const states = {};

    listings.forEach((listing) => {
      if (listing.address) {
        const city = listing.address.city;
        if (city) {
          if (!cities[city]) {
            cities[city] = {
              name: city,
              count: 0,
              state: listing.address.state || "",
              image:
                listing.images && listing.images.length > 0
                  ? listing.images[0].url
                  : null,
            };
          }
          cities[city].count++;
          if (
            !cities[city].image &&
            listing.images &&
            listing.images.length > 0
          ) {
            cities[city].image = listing.images[0].url;
          }
        }
        const state = listing.address.state;
        if (state) {
          if (!states[state]) {
            states[state] = { name: state, count: 0 };
          }
          states[state].count++;
        }
      }
    });
    return {
      cities: Object.values(cities).sort((a, b) => b.count - a.count),
      states: Object.values(states).sort((a, b) => b.count - a.count),
    };
  };

  // Search handler
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/listings?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Demo city images
  const cityImages = useMemo(
    () => ({
      Mumbai:
        "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=2070&auto=format&fit=crop",
      Delhi:
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop",
      Bangalore:
        "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=2089&auto=format&fit=crop",
      Hyderabad:
        "https://images.unsplash.com/photo-1563448927272-976d73d27a5f?q=80&w=2070&auto=format&fit=crop",
      Chennai:
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2070&auto=format&fit=crop",
      Kolkata:
        "https://images.unsplash.com/photo-1536421469767-80559bb6f5e1?q=80&w=2070&auto=format&fit=crop",
      Pune: "https://images.unsplash.com/photo-1625128723776-57c90c6f1280?q=80&w=2070&auto=format&fit=crop",
      Jaipur:
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2070&auto=format&fit=crop",
    }),
    []
  );

  // Fallback
  const fallbackLocations = useMemo(
    () => ({
      cities: [
        {
          name: "Mumbai",
          count: 24,
          state: "Maharashtra",
          image: cityImages["Mumbai"],
        },
        {
          name: "Delhi",
          count: 18,
          state: "Delhi",
          image: cityImages["Delhi"],
        },
        {
          name: "Bangalore",
          count: 15,
          state: "Karnataka",
          image: cityImages["Bangalore"],
        },
        {
          name: "Hyderabad",
          count: 12,
          state: "Telangana",
          image: cityImages["Hyderabad"],
        },
        {
          name: "Chennai",
          count: 10,
          state: "Tamil Nadu",
          image: cityImages["Chennai"],
        },
        {
          name: "Kolkata",
          count: 9,
          state: "West Bengal",
          image: cityImages["Kolkata"],
        },
        {
          name: "Pune",
          count: 8,
          state: "Maharashtra",
          image: cityImages["Pune"],
        },
        {
          name: "Jaipur",
          count: 7,
          state: "Rajasthan",
          image: cityImages["Jaipur"],
        },
      ],
      states: [
        { name: "Maharashtra", count: 32 },
        { name: "Delhi", count: 18 },
        { name: "Karnataka", count: 15 },
        { name: "Telangana", count: 12 },
        { name: "Tamil Nadu", count: 10 },
        { name: "West Bengal", count: 9 },
        { name: "Rajasthan", count: 7 },
        { name: "Gujarat", count: 6 },
      ],
    }),
    [cityImages]
  );

  const displayLocations = useMemo(
    () =>
      locations.cities && locations.cities.length > 0
        ? locations
        : fallbackLocations,
    [locations, fallbackLocations]
  );

  if (isLoading) return <LocationsSkeletonLoader />;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Explore Properties by Location
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Browse our extensive collection of properties across different cities
          and states in India. Find your dream home in your preferred location.
        </p>
      </div>
      {/* Search Box */}
      <div className="max-w-3xl mx-auto mb-12">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search for a city or state..."
            className="w-full p-4 pl-12 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute top-0 left-0 h-full flex items-center pl-4">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <button
            type="submit"
            className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-300"
          >
            Search
          </button>
        </form>
      </div>
      {/* Error message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4 mb-8 rounded-md">
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}
      {/* Featured Cities */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Popular Cities
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayLocations.cities.slice(0, 8).map((city, index) => (
            <Link
              key={city.name}
              href={`/listings?q=${encodeURIComponent(city.name)}`}
            >
              <LocationCard
                location={city.name}
                propertyCount={city.count}
                imageUrl={
                  city.image ||
                  cityImages[city.name] ||
                  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop"
                }
                index={index}
              />
            </Link>
          ))}
        </div>
      </div>
      {/* States */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Browse by State
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayLocations.states.map((state, index) => (
            <Link
              key={state.name}
              href={`/listings?q=${encodeURIComponent(state.name)}`}
            >
              <StateCard
                state={state.name}
                propertyCount={state.count}
                index={index}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
