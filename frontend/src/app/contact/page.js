// app/contact/page.js
'use client';
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    propertyType: 'residential'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('Thank you! Your message has been sent. We will contact you shortly.');
      // In a real app, you would send the data to your backend here
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're here to help with all your real estate needs. Reach out to us today.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Get in Touch</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Our Office</h3>
                <p className="text-gray-600">123 Real Estate Blvd, Suite 456<br />New York, NY 10001</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Phone className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Phone</h3>
                <p className="text-gray-600">+1 234 567 890</p>
                <p className="text-gray-600">Toll-free: 1-800-REAL-EST</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Email</h3>
                <p className="text-gray-600">info@premierproperties.com</p>
                <p className="text-gray-600">sales@premierproperties.com</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Hours</h3>
                <p className="text-gray-600">Monday - Friday: 9AM - 6PM</p>
                <p className="text-gray-600">Saturday: 10AM - 4PM</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="font-medium text-gray-800 mb-3">Connect With Us</h3>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                <a 
                  key={social} 
                  href="#" 
                  className="bg-gray-200 h-10 w-10 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition duration-300"
                >
                  <span className="sr-only">{social}</span>
                  {/* Placeholder for social icons */}
                  <div className="h-5 w-5 flex items-center justify-center text-sm">{social[0].toUpperCase()}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send Us a Message</h2>
          
          {submitMessage ? (
            <div className="bg-green-100 text-green-700 p-4 rounded-md mb-6">
              {submitMessage}
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">I'm interested in:</label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="residential">Residential Properties</option>
                    <option value="commercial">Commercial Properties</option>
                    <option value="selling">Selling My Property</option>
                    <option value="rental">Rental Properties</option>
                    <option value="other">Other Services</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
      
      {/* Map Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Find Us</h2>
        <div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
          {/* Replace this with an actual map component in production */}
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <p>Map Location Placeholder - integrate with Google Maps or similar service</p>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "What areas do you service?", a: "We primarily serve the greater New York metropolitan area, including all five boroughs, Long Island, Westchester, and parts of New Jersey and Connecticut." },
            { q: "How quickly can I expect a response?", a: "We aim to respond to all inquiries within 24 hours during business days. For urgent matters, please call our office directly." },
            { q: "Do you offer virtual consultations?", a: "Yes! We provide virtual consultations via Zoom or your preferred video conferencing platform. Just mention this preference when you contact us." }
          ].map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}