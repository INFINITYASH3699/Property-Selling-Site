// app/page.js
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
} from "lucide-react";

export default function home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        {/* Background image placeholder - replace with your actual image */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700">
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <div className="relative flex flex-col items-center justify-center h-full text-center px-4 md:px-8">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight max-w-4xl">
            Find Your Perfect Home With Varad Properties
          </h1>
          <p className="text-xl md:text-2xl text-white mb-10 max-w-2xl opacity-90">
            Luxury homes, exclusive properties, and personalized service to
            match your lifestyle
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-3xl bg-white p-2 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row">
              <div className="flex-grow flex items-center px-4 py-2">
                <Search className="h-5 w-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search by location, property type, or features..."
                  className="w-full outline-none text-gray-700"
                />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md mt-2 md:mt-0 transition duration-300">
                Search
              </button>
            </div>
          </div>

          {/* Property Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-12 text-white">
            {[
              { label: "Properties", value: "1,500+" },
              { label: "Customers", value: "5,000+" },
              { label: "Cities", value: "15+" },
              { label: "Satisfaction", value: "98%" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base opacity-80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our handpicked selection of premium properties
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Luxury Villa with Pool",
                location: "Beverly Hills, CA",
                price: "$5,250,000",
                beds: 5,
                baths: 6,
                sqft: "6,500",
                type: "For Sale",
              },
              {
                title: "Modern Downtown Penthouse",
                location: "Manhattan, NY",
                price: "$3,800,000",
                beds: 3,
                baths: 3.5,
                sqft: "3,200",
                type: "For Sale",
              },
              {
                title: "Oceanfront Beach House",
                location: "Malibu, CA",
                price: "$8,750,000",
                beds: 4,
                baths: 5,
                sqft: "4,800",
                type: "For Sale",
              },
            ].map((property, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Property Image Placeholder */}
                <div className="relative h-64 bg-blue-100">
                  <div className="absolute top-0 right-0 bg-blue-600 text-white text-sm font-bold px-3 py-1 m-4 rounded-md">
                    {property.type}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{property.location}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {property.title}
                  </h3>
                  <p className="text-2xl font-bold text-blue-600 mb-4">
                    {property.price}
                  </p>

                  <div className="flex justify-between text-gray-600 border-t pt-4">
                    <div className="text-center">
                      <div className="font-bold">{property.beds}</div>
                      <div className="text-xs">Beds</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold">{property.baths}</div>
                      <div className="text-xs">Baths</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold">{property.sqft}</div>
                      <div className="text-xs">Sq Ft</div>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <Link
                    href="/listings"
                    className="block text-center bg-white border border-blue-600 text-blue-600 font-medium px-4 py-2 rounded-md hover:bg-blue-50 transition duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/listings"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-md transition duration-300"
            >
              View All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive real estate solutions tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Home className="h-10 w-10 text-blue-600" />,
                title: "Residential Properties",
                desc: "Find your dream home with our extensive portfolio of residential properties ranging from apartments to luxury homes.",
              },
              {
                icon: <Building className="h-10 w-10 text-blue-600" />,
                title: "Commercial Real Estate",
                desc: "Premium office spaces, retail outlets, and industrial properties for businesses looking to establish or expand.",
              },
              {
                icon: <Key className="h-10 w-10 text-blue-600" />,
                title: "Property Management",
                desc: "Professional property management services to maintain and enhance the value of your real estate investments.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="p-6 bg-gray-50 rounded-lg hover:shadow-md transition duration-300"
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Varad Properties
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              With over 15 years of experience, we deliver exceptional service
              and results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <MapPin className="h-10 w-10 text-white" />,
                title: "Local Expertise",
                desc: "Deep understanding of local real estate markets to help you make informed decisions.",
              },
              {
                icon: <Shield className="h-10 w-10 text-white" />,
                title: "Trusted Advisor",
                desc: "Honest, transparent guidance from certified real estate professionals.",
              },
              {
                icon: <ThumbsUp className="h-10 w-10 text-white" />,
                title: "Client Satisfaction",
                desc: "98% client satisfaction rate with personalized service tailored to your needs.",
              },
            ].map((feature, index) => (
              <div key={index} className="p-6 bg-blue-700 rounded-lg">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="opacity-90">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
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
                name: "Jennifer & David Smith",
                location: "New York, NY",
              },
              {
                quote:
                  "As a first-time homebuyer, I was nervous about the process. The team at Varad Properties guided me through every step with patience and expertise.",
                name: "Michael Johnson",
                location: "Los Angeles, CA",
              },
              {
                quote:
                  "We've worked with several real estate firms, but Varad Properties stands out for their personalized approach and attention to detail.",
                name: "Sarah & Robert Williams",
                location: "Chicago, IL",
              },
            ].map((testimonial, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  {/* Profile Image Placeholder */}
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-bold">
                      {testimonial.name[0]}
                    </span>
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
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-white border-t">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Schedule a consultation with one of our real estate experts today
            and take the first step towards your new home.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/listings"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-md transition duration-300"
            >
              Browse Properties
            </Link>
            <Link
              href="/contact"
              className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium px-8 py-3 rounded-md transition duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 px-4 bg-gray-100">
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
              className="flex-grow px-4 py-3 rounded-l-md border-gray-300 border focus:outline-none focus:ring-2 focus:ring-blue-600 sm:rounded-r-none"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md sm:rounded-l-none mt-2 sm:mt-0 transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
