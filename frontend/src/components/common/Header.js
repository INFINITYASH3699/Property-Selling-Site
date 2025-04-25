"use client";

import { useState, useEffect, useContext, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Heart,
  User,
  LogOut,
  Plus,
  ChevronDown,
  Home,
  Search,
  Menu,
  X,
  MapPin,
  Building,
} from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import { WishlistContext } from "@/context/WishlistContext";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { MotionDiv } from "../MotionWrapper";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchInputRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const userDropdownRef = useRef(null);

  // Get auth context
  const { user, isAuthenticated, isAgent, logout, loading: authLoading } =
    useContext(AuthContext);
  const { wishlist } = useContext(WishlistContext);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside for mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        event.target.id !== "mobile-menu-button"
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuRef]);

  // Handle click outside for user dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target) &&
        !event.target.closest(".user-dropdown-trigger")
      ) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userDropdownRef]);

  // Focus search input when search bar is shown
  useEffect(() => {
    if (showSearchBar && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearchBar]);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchInputRef.current.value.trim();
    if (query) {
      router.push(`/listings?q=${encodeURIComponent(query)}`);
      setShowSearchBar(false);
    }
  };

  // Handle sign out
  const handleSignOut = async () => {
    await logout();
    setShowUserDropdown(false);
    router.push("/");
  };

  const navItems = [
    { name: "Home", path: "/", icon: <Home className="w-5 h-5 mr-2" /> },
    {
      name: "Properties",
      path: "/listings",
      icon: <Building className="w-5 h-5 mr-2" />,
    },
    { name: "Locations", path: "/locations", icon: <MapPin className="w-5 h-5 mr-2" /> },
    { name: "About", path: "/about", icon: <User className="w-5 h-5 mr-2" /> },
    { name: "Contact", path: "/contact", icon: <Search className="w-5 h-5 mr-2" /> },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 py-3 lg:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-1 z-10">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              <span className="text-primary-600">Varad</span>Properties
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex space-x-8">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.path ||
                  (item.path !== "/" && pathname.startsWith(item.path));

                return (
                  <li key={item.name}>
                    <Link
                      href={item.path}
                      className={`text-gray-700 font-medium transition-colors relative group ${
                        isActive
                          ? "text-primary-600 font-semibold"
                          : "hover:text-primary-600"
                      }`}
                    >
                      {item.name}
                      <span
                        className={`absolute -bottom-2 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full ${
                          isActive ? "w-full" : ""
                        }`}
                      ></span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right side elements */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Search Button */}
            <button
              onClick={() => setShowSearchBar(true)}
              className="text-gray-700 hover:text-primary-600 transition-colors p-2 rounded-full hover:bg-gray-100"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Add Property Button (for authenticated agents/admins) */}
            {isAuthenticated && isAgent && (
              <Link
                href="/properties/create"
                className="hidden md:flex items-center px-3 py-2 text-sm font-medium bg-green-600 rounded-lg hover:bg-green-700 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Property
              </Link>
            )}

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="relative text-gray-700 hover:text-primary-600 transition-colors p-2 rounded-full hover:bg-gray-100"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist && wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Authentication Button/User Menu */}
            {authLoading ? (
              // Loading state
              <div className="w-8 h-8 rounded-full animate-pulse bg-gray-200"></div>
            ) : isAuthenticated ? (
              // Authenticated: Show user dropdown
              <div className="relative user-dropdown">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center space-x-2 focus:outline-none user-dropdown-trigger"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center overflow-hidden border border-primary-200">
                    {user?.profileImage?.url ? (
                      <Image
                        src={user.profileImage.url}
                        alt={user.name}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 text-primary-600" />
                    )}
                  </div>
                  <div className="hidden md:block">
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </div>
                </button>

                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {showUserDropdown && (
                    <MotionDiv
                      ref={userDropdownRef}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-1 z-50 border border-gray-200 ring-1 ring-black/5"
                    >
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-semibold text-gray-900">
                          {user?.name}
                        </p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>

                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        <div className="flex items-center">
                          <Home className="w-4 h-4 mr-2" />
                          Dashboard
                        </div>
                      </Link>

                      <Link
                        href="/dashboard?tab=profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          My Profile
                        </div>
                      </Link>

                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <div className="flex items-center">
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </div>
                      </button>
                    </MotionDiv>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // Not authenticated: Show login/register button
              <Link
                href="/login"
                className="hidden md:flex items-center px-4 py-2 text-sm font-medium bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
              >
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              id="mobile-menu-button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-700 hover:text-primary-600 p-2 rounded-full hover:bg-gray-100"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar Modal */}
        <AnimatePresence>
          {showSearchBar && (
            <MotionDiv
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20"
              onClick={() => setShowSearchBar(false)}
            >
              <MotionDiv
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="bg-white w-full max-w-2xl mx-4 rounded-lg shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Search Properties</h2>
                    <button
                      onClick={() => setShowSearchBar(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <form onSubmit={handleSearch} className="flex">
                    <div className="relative flex-grow">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search by location, property type, or features..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-primary-600 hover:bg-primary-700 font-medium px-6 py-3 rounded-r-lg transition duration-300"
                    >
                      Search
                    </button>
                  </form>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-2">Popular searches:</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Apartments in Mumbai",
                        "Villas in Bangalore",
                        "Houses in Delhi",
                        "Luxury Homes",
                        "Rental Properties",
                      ].map((term) => (
                        <button
                          key={term}
                          onClick={() => {
                            if (searchInputRef.current) {
                              searchInputRef.current.value = term;
                              handleSearch({ preventDefault: () => {} });
                            }
                          }}
                          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </MotionDiv>
            </MotionDiv>
          )}
        </AnimatePresence>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <MotionDiv
              ref={mobileMenuRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden bg-white border-t border-gray-100 mt-4 rounded-lg shadow-lg"
            >
              <nav className="py-4">
                <ul className="space-y-3 px-4">
                  {navItems.map((item) => {
                    const isActive =
                      pathname === item.path ||
                      (item.path !== "/" && pathname.startsWith(item.path));

                    return (
                      <li key={item.name}>
                        <Link
                          href={item.path}
                          className={`flex items-center py-2 px-3 rounded-lg ${
                            isActive
                              ? "bg-primary-50 text-primary-700 font-semibold"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.icon}
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}

                  {/* Conditional mobile menu items */}
                  {isAuthenticated ? (
                    <>
                      {isAgent && (
                        <li>
                          <Link
                            href="/properties/create"
                            className="flex items-center py-2 px-3 rounded-lg bg-green-600"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Plus className="w-5 h-5 mr-2" />
                            Add Property
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link
                          href="/dashboard"
                          className="flex items-center py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Home className="w-5 h-5 mr-2" />
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            handleSignOut();
                            setIsMobileMenuOpen(false);
                          }}
                          className="flex w-full items-center py-2 px-3 rounded-lg text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="w-5 h-5 mr-2" />
                          Sign Out
                        </button>
                      </li>
                    </>
                  ) : (
                    <li>
                      <Link
                        href="/login"
                        className="flex items-center py-2 px-3 rounded-lg bg-primary-600"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <User className="w-5 h-5 mr-2" />
                        Sign In
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            </MotionDiv>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
