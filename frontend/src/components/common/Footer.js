// src/components/common/Footer.js
import Link from "next/link";
import { MapPin, Phone, Mail, ArrowUp } from "lucide-react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-white text-gray-800 relative border-t border-gray-200">
      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-primary-600 hover:bg-primary-700 p-3 rounded-full shadow-lg transition-all duration-300 z-20 ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>


      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div>
            <div className="flex items-center mb-6">
              <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center mr-2 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-5 h-5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-bold">
                <span className="text-primary-600">Varad</span>Properties
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Your trusted partner in finding the perfect property across India.
              We provide exceptional real estate services tailored to your
              needs.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-gray-700">
                <MapPin size={18} className="mr-2 text-primary-600" />
                <span>123 Real Estate Avenue, Mumbai, India</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Phone size={18} className="mr-2 text-primary-600" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Mail size={18} className="mr-2 text-primary-600" />
                <span>info@varadproperties.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Property Listings", path: "/listings" },
                { name: "About Us", path: "/about" },
                { name: "Contact Us", path: "/contact" },
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Terms of Service", path: "/terms" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-gray-700 hover:text-primary-600 transition-colors flex items-center"
                  >
                    <span className="mr-2">›</span> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Property Types</h3>
            <ul className="space-y-3">
              {[
                {
                  name: "Residential Properties",
                  path: "/listings?type=residential",
                },
                {
                  name: "Commercial Spaces",
                  path: "/listings?type=commercial",
                },
                { name: "Luxury Villas", path: "/listings?type=villa" },
                { name: "Apartments", path: "/listings?type=apartment" },
                { name: "Plots & Land", path: "/listings?type=land" },
                { name: "Rental Properties", path: "/listings?status=rent" },
              ].map((type) => (
                <li key={type.name}>
                  <Link
                    href={type.path}
                    className="text-gray-700 hover:text-primary-600 transition-colors flex items-center"
                  >
                    <span className="mr-2">›</span> {type.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Stay Updated</h3>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter for the latest property listings and
              market insights.
            </p>
            <form className="mb-6">
              <div className="flex flex-col space-y-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-inner"
                />
                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 px-4 py-3 rounded-lg transition duration-300 font-medium shadow-md hover:shadow-lg"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-600 hover:text-primary-600 transition-colors bg-gray-100 p-2 rounded-full shadow-md hover:shadow-lg border border-gray-200"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-primary-600 transition-colors bg-gray-100 p-2 rounded-full"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-primary-600 transition-colors bg-gray-100 p-2 rounded-full"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-primary-600 transition-colors bg-gray-100 p-2 rounded-full"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-gray-200 text-center text-gray-600">
          <p>&copy; {currentYear} Varad Properties. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
