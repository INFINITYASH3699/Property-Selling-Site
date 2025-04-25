"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Home,
  Building,
  Key,
  MapPin,
  Shield,
  ThumbsUp,
  ArrowRight,
  Users,
  Clock,
  Star,
  ArrowUpRight,
  CheckCircle2,
  BedDouble,
  Bath,
  Square,
  Phone,
} from "lucide-react";
import { MotionDiv, MotionH1, MotionP } from "../components/MotionWrapper";

export default function HomePage() {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Updated with light theme */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background image with gradient overlay - Lightened gradient */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
            alt="Luxury property"
            fill
            priority
            quality={90}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-white/30"></div>
        </div>

        {/* Hero content - Updated with dark text for light theme */}
        <div className="container mx-auto px-4 md:px-8 relative z-10 py-20">
          <div className="max-w-4xl">
            <MotionH1
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Find Your Dream Home With{" "}
              <span className="text-primary-600">Varad Properties</span>
            </MotionH1>
            <MotionP
              className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Luxury homes, exclusive properties, and personalized service to
              match your lifestyle across India
            </MotionP>

            {/* Search Bar - Updated with improved styling for light theme */}
            <MotionDiv
              className="border border-gray-300 p-4 lg:p-5 rounded-2xl shadow-xl mb-8 md:mb-0 max-w-3xl bg-white/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by location, property type, or features..."
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 text-gray-800 outline-none focus:ring-2 focus:ring-primary-500 transition-all border border-gray-200"
                  />
                </div>
                <button className="bg-primary-600 hover:bg-primary-700 font-medium md:text-lg px-8 py-4 rounded-xl transition duration-300 flex-shrink-0 flex items-center justify-center">
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-sm text-gray-500 mr-2">Popular:</span>
                {["Mumbai", "Delhi", "Bangalore", "Villas", "Apartments"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 cursor-pointer"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </MotionDiv>
          </div>

          {/* Property Stats - Updated with light theme styling */}
          <MotionDiv
            className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12 max-w-4xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              {
                label: "Properties",
                value: "1,500+",
                icon: <Building className="w-6 h-6" />,
              },
              {
                label: "Happy Clients",
                value: "5,000+",
                icon: <Users className="w-6 h-6" />,
              },
              {
                label: "Cities Covered",
                value: "15+",
                icon: <MapPin className="w-6 h-6" />,
              },
              {
                label: "Satisfaction",
                value: "98%",
                icon: <Star className="w-6 h-6" />,
              },
            ].map((stat, index) => (
              <MotionDiv
                key={index}
                variants={itemVariants}
                className="bg-white/90 backdrop-blur-lg p-4 rounded-xl text-center border border-gray-200 shadow-md"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-2 rounded-full bg-primary-100">
                    <div className="text-primary-600">{stat.icon}</div>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </MotionDiv>
            ))}
          </MotionDiv>
        </div>

        {/* Wave divider - Updated color */}
        <div className="absolute bottom-0 left-0 right-0 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full"
          >
            <path
              fill="currentColor"
              fillOpacity="1"
              d="M0,288L80,282.7C160,277,320,267,480,224C640,181,800,107,960,96C1120,85,1280,139,1360,165.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Featured Properties - Already light theme */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Properties
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl">
                Discover our handpicked selection of premium properties
              </p>
            </div>
            <Link
              href="/listings"
              className="mt-4 md:mt-0 inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
            >
              View All Properties
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Luxury Villa with Pool",
                location: "Juhu, Mumbai",
                price: "₹3,95,00,000",
                image:
                  "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop",
                beds: 5,
                baths: 6,
                sqft: "6,500",
                type: "For Sale",
                featured: true,
              },
              {
                title: "Modern Downtown Apartment",
                location: "MG Road, Bangalore",
                price: "₹2,85,00,000",
                image:
                  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop",
                beds: 3,
                baths: 3,
                sqft: "3,200",
                type: "For Sale",
              },
              {
                title: "Oceanfront Beach House",
                location: "Goa",
                price: "₹6,50,00,000",
                image:
                  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop",
                beds: 4,
                baths: 5,
                sqft: "4,800",
                type: "For Sale",
                featured: true,
              },
            ].map((property, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-property transition-transform duration-300 hover:-translate-y-2 group"
              >
                {/* Property Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                  {/* Property Status */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary-500 text-white">
                      {property.type}
                    </span>
                  </div>

                  {/* Featured Tag */}
                  {property.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 text-sm font-medium rounded-full bg-yellow-500 text-white">
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Location */}
                  <div className="absolute bottom-4 left-4 text-white flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">
                      {property.location}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
                    {property.title}
                  </h3>
                  <p className="text-2xl font-bold text-primary-600 mb-4">
                    {property.price}
                  </p>

                  <div className="flex justify-between text-gray-600 border-t pt-4">
                    <div className="flex items-center">
                      <BedDouble className="mr-1 h-5 w-5 text-gray-500" />
                      <span>{property.beds}</span>
                      <span className="text-xs ml-1">Beds</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="mr-1 h-5 w-5 text-gray-500" />
                      <span>{property.baths}</span>
                      <span className="text-xs ml-1">Baths</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="mr-1 h-5 w-5 text-gray-500" />
                      <span>{property.sqft}</span>
                      <span className="text-xs ml-1">Sq Ft</span>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <Link
                    href="/listings"
                    className="block text-center bg-gray-50 hover:bg-gray-100 border border-primary-500 text-primary-600 font-medium px-4 py-3 rounded-lg transition duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Already light theme */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive real estate solutions tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Home className="h-12 w-12 text-primary-600" />,
                title: "Residential Properties",
                desc: "Find your dream home with our extensive portfolio of residential properties ranging from apartments to luxury homes.",
              },
              {
                icon: <Building className="h-12 w-12 text-primary-600" />,
                title: "Commercial Real Estate",
                desc: "Premium office spaces, retail outlets, and industrial properties for businesses looking to establish or expand.",
              },
              {
                icon: <Key className="h-12 w-12 text-primary-600" />,
                title: "Property Management",
                desc: "Professional property management services to maintain and enhance the value of your real estate investments.",
              },
            ].map((service, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-gray-100"
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="p-3 bg-primary-50 rounded-full">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-center">{service.desc}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Updated to light theme */}
      <section className="py-20 px-4 bg-primary-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Why Choose Varad Properties
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              With over 15 years of experience, we deliver exceptional service
              and results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <MapPin className="h-10 w-10" />,
                title: "Local Expertise",
                desc: "Deep understanding of local real estate markets to help you make informed decisions.",
              },
              {
                icon: <Shield className="h-10 w-10" />,
                title: "Trusted Advisor",
                desc: "Honest, transparent guidance from certified real estate professionals.",
              },
              {
                icon: <ThumbsUp className="h-10 w-10" />,
                title: "Client Satisfaction",
                desc: "98% client satisfaction rate with personalized service tailored to your needs.",
              },
            ].map((feature, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 bg-white rounded-xl overflow-hidden relative shadow-sm border border-gray-100"
              >
                <div className="absolute -right-4 -bottom-4 opacity-10">
                  <svg
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                    fill="none"
                  >
                    <path
                      d="M50 0C77.6142 0 100 22.3858 100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0Z"
                      fill="#4F46E5"
                    />
                  </svg>
                </div>
                <div className="mb-6">
                  <div className="p-3 bg-primary-100 rounded-full inline-block text-primary-600">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Already light theme */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Client Testimonials
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear what our satisfied clients have to say
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Varad Properties found us our dream home within our budget. Their knowledge and professionalism made the process smooth and stress-free.",
                name: "Ravi & Priya Sharma",
                location: "Mumbai, MH",
                avatar: "RS",
              },
              {
                quote:
                  "As a first-time homebuyer, I was nervous about the process. The team at Varad Properties guided me through every step with patience and expertise.",
                name: "Ankit Patel",
                location: "Bangalore, KA",
                avatar: "AP",
              },
              {
                quote:
                  "We've worked with several real estate firms, but Varad Properties stands out for their personalized approach and attention to detail.",
                name: "Sanjana & Rohit Verma",
                location: "Delhi, DL",
                avatar: "SV",
              },
            ].map((testimonial, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 bg-white rounded-xl shadow-property relative"
              >
                <div className="absolute -top-5 left-8">
                  <div className="text-5xl text-primary-400">"</div>
                </div>
                <p className="text-gray-600 italic mb-6 pt-4">
                  {testimonial.quote}
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-4 text-primary-700 font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Already light theme */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our simple process to help you find your perfect property
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Search className="h-10 w-10 text-primary-600" />,
                title: "Search Properties",
                desc: "Browse our extensive collection of properties based on your preferences.",
                step: "01",
              },
              {
                icon: <Clock className="h-10 w-10 text-primary-600" />,
                title: "Schedule Viewing",
                desc: "Book appointments to visit the properties that interest you.",
                step: "02",
              },
              {
                icon: <Shield className="h-10 w-10 text-primary-600" />,
                title: "Financial Guidance",
                desc: "Get expert advice on financing options and loan processes.",
                step: "03",
              },
              {
                icon: <Key className="h-10 w-10 text-primary-600" />,
                title: "Close the Deal",
                desc: "Complete the paperwork and receive the keys to your new property.",
                step: "04",
              },
            ].map((process, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-white rounded-xl shadow-sm relative"
              >
                <div className="absolute -right-3 -top-3 bg-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                  {process.step}
                </div>
                <div className="mb-4 bg-primary-50 p-4 rounded-full inline-block">
                  {process.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {process.title}
                </h3>
                <p className="text-gray-600">{process.desc}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Updated to light theme */}
      <section className="py-20 px-4 bg-primary-50 text-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-70">
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop"
            alt="Background pattern"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
              Ready to Find Your Dream Property?
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Schedule a consultation with one of our real estate experts today
              and take the first step towards your new home.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/listings"
                className="bg-white/50 hover:bg-white/20 font-medium px-8 py-4 border border-white/70 rounded-lg transition duration-300 flex items-center justify-center"
              >
                <Building className="w-5 h-5 mr-2" />
                Browse Properties
              </Link>
              <Link
                href="/contact"
                className="bg-white text-gray-900 hover:bg-gray-100 font-medium px-8 py-4 rounded-lg transition duration-300 flex items-center justify-center border border-gray-200"
              >
                <Phone className="w-5 h-5 mr-2" />
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter - Already light theme */}
      <section className="py-16 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Stay Updated
          </h3>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter for the latest property listings and
            real estate insights
          </p>
          <div className="flex flex-col sm:flex-row max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-l-lg border-gray-300 border focus:outline-none focus:ring-2 focus:ring-primary-500 sm:rounded-r-none"
            />
            <button className="bg-primary-600 hover:bg-primary-700 font-medium px-6 py-3 border border-gray-300 rounded-lg sm:rounded-l-none mt-2 sm:mt-0 transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
