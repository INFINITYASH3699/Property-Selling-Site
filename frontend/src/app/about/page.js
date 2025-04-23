// app/about/page.js
import Image from 'next/image';

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">About Premier Properties</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We are a leading real estate agency dedicated to helping you find your dream home since 2005.
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            At Premier Properties, we believe everyone deserves to find their perfect home. Our mission is to provide exceptional service through honesty, integrity, and expertise in every transaction.
          </p>
          <p className="text-gray-600">
            Whether you're buying your first home, selling a property, or investing in real estate, our team of experienced professionals is here to guide you through every step of the process.
          </p>
        </div>
        <div className="relative h-64 md:h-full">
          <div className="bg-blue-100 absolute inset-0 rounded-lg overflow-hidden">
            {/* Placeholder for an image - in production, replace with your actual image */}
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-blue-800">Team Image</span>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Jane Smith", role: "Principal Broker", experience: "15+ years" },
            { name: "John Doe", role: "Senior Agent", experience: "10+ years" },
            { name: "Sarah Johnson", role: "Commercial Specialist", experience: "12+ years" }
          ].map((member, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-500">Photo</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-blue-600">{member.role}</p>
              <p className="text-gray-600 mt-2">{member.experience} experience</p>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Integrity", desc: "We believe in honest communication and transparency in every transaction." },
            { title: "Excellence", desc: "We strive to exceed expectations with personalized service and attention to detail." },
            { title: "Community", desc: "We're committed to giving back to the communities where we live and work." }
          ].map((value, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">What Our Clients Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { quote: "Premier Properties helped us find our dream home faster than we thought possible. Their knowledge of the market was invaluable.", author: "The Wilson Family" },
            { quote: "The team went above and beyond during our selling process. Their marketing strategy helped us get top dollar for our home.", author: "Robert & Lisa M." }
          ].map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
              <p className="text-gray-800 font-medium">— {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-blue-600 text-white p-8 rounded-lg text-center">
        <h2 className="text-3xl font-semibold mb-4">Ready to find your dream home?</h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Contact our team today to schedule a consultation. We're here to help you with all your real estate needs.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300">
          Contact Us
        </button>
      </div>
    </div>
  );
}