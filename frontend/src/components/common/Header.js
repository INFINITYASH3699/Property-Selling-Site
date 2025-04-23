"use client";

import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Heart, User, LogOut, Plus, ChevronDown, Home } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import { WishlistContext } from "@/context/WishlistContext";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Get auth context
  const { user, isAuthenticated, isAgent, logout, loading: authLoading } = useContext(AuthContext);
  const { wishlist } = useContext(WishlistContext);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close the dropdown when clicking outside
      if (showUserDropdown && !event.target.closest(".user-dropdown")) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showUserDropdown]);

  // Handle sign out
  const handleSignOut = async () => {
    await logout();
    setShowUserDropdown(false);
    router.push("/");
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-md dark:bg-gray-900/90" : "bg-white dark:bg-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 py-3 lg:py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-8 h-8 text-blue-500"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              <span className="text-blue-500">Varad</span>Properties
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {[
                { name: "Home", path: "/" },
                { name: "Listings", path: "/listings" },
                { name: "About", path: "/about" },
                { name: "Contact", path: "/contact" },
              ].map((item) => {
                const isActive = pathname === item.path || 
                  (item.path !== "/" && pathname.startsWith(item.path));

                return (
                  <li key={item.name}>
                    <Link
                      href={item.path}
                      className={`text-gray-700 dark:text-gray-300 font-medium transition-colors relative group ${
                        isActive
                          ? "text-blue-500 dark:text-blue-400 font-semibold"
                          : "hover:text-blue-500 dark:hover:text-blue-400"
                      }`}
                    >
                      {item.name}
                      <span
                        className={`absolute -bottom-2 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full ${
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
          <div className="flex items-center space-x-4">
            {/* Add Property Button (for authenticated agents/admins) */}
            {isAuthenticated && isAgent && (
              <Link
                href="/properties/create"
                className="hidden md:flex items-center px-3 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Property
              </Link>
            )}

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="relative text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              <Heart className="w-6 h-6" />
              {wishlist && wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Authentication Button/User Menu */}
            {authLoading ? (
              // Loading state
              <div className="w-8 h-8 rounded-full animate-pulse bg-gray-200 dark:bg-gray-700"></div>
            ) : isAuthenticated ? (
              // Authenticated: Show user dropdown
              <div className="relative user-dropdown">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center overflow-hidden">
                    {user?.profileImage?.url ? (
                      <Image
                        src={user.profileImage.url}
                        alt={user.name}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 text-blue-500" />
                    )}
                  </div>
                  <div className="hidden md:block">
                    <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </div>
                </button>

                {/* User Dropdown Menu */}
                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                    </div>
                    
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setShowUserDropdown(false)}
                    >
                      <div className="flex items-center">
                        <Home className="w-4 h-4 mr-2" />
                        Dashboard
                      </div>
                    </Link>
                    
                    <Link
                      href="/dashboard?tab=profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setShowUserDropdown(false)}
                    >
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        My Profile
                      </div>
                    </Link>
                    
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <div className="flex items-center">
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Not authenticated: Show login/register button
              <Link
                href="/login"
                className="hidden md:flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
            >
              {isMobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700">
            <ul className="space-y-4 mt-4">
              {[
                { name: "Home", path: "/" },
                { name: "Listings", path: "/listings" },
                { name: "About", path: "/about" },
                { name: "Contact", path: "/contact" },
              ].map((item) => {
                const isActive = pathname === item.path || 
                  (item.path !== "/" && pathname.startsWith(item.path));

                return (
                  <li key={item.name}>
                    <Link
                      href={item.path}
                      className={`block text-gray-700 dark:text-gray-300 font-medium ${
                        isActive
                          ? "text-blue-500 dark:text-blue-400 font-semibold"
                          : "hover:text-blue-500 dark:hover:text-blue-400"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
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
                        className="flex items-center text-gray-700 dark:text-gray-300 font-medium hover:text-blue-500 dark:hover:text-blue-400"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Property
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      href="/dashboard"
                      className="flex items-center text-gray-700 dark:text-gray-300 font-medium hover:text-blue-500 dark:hover:text-blue-400"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Home className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center text-red-600 dark:text-red-400 font-medium"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    href="/login"
                    className="flex w-full items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}