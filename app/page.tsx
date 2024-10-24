import React from 'react';
import { Package, Code, Users, ChevronRight, CheckCircle, Terminal } from 'lucide-react';

const SquaredComputingWebsite = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm fixed w-full z-50">
        <nav className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Terminal className="text-blue-600 h-8 w-8" />
              <span className="text-xl font-bold">Squared Computing</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="hover:text-blue-600">Training</a>
              <a href="#products" className="hover:text-blue-600">Products</a>
              <a href="#about" className="hover:text-blue-600">About</a>
              <a href="#contact" className="hover:text-blue-600">Contact</a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                Empowering Developers in Kenya
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Expert training in C++ and Qt framework, combined with innovative software solutions for modern businesses.
              </p>
              <div className="flex space-x-4">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Get Started
                </button>
                <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                  View Courses
                </button>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <Terminal className="h-16 w-16 text-blue-600 mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Featured Training</h3>
              <div className="space-y-4">
                {['Advanced C++ Programming', 'Qt Framework Mastery', 'GUI Development'].map((course) => (
                  <div key={course} className="flex items-center space-x-3">
                    <CheckCircle className="text-green-500 h-5 w-5" />
                    <span>{course}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Services */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Training Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'C++ Programming',
                icon: <Code className="h-8 w-8 text-blue-600" />,
                description: 'Comprehensive C++ training from basics to advanced concepts'
              },
              {
                title: 'Qt Framework',
                icon: <Terminal className="h-8 w-8 text-blue-600" />,
                description: 'Master cross-platform application development with Qt'
              },
              {
                title: 'Custom Training',
                icon: <Users className="h-8 w-8 text-blue-600" />,
                description: 'Tailored training programs for companies and teams'
              }
            ].map((service) => (
              <div key={service.title} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Products</h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="flex items-center space-x-4 mb-6">
                <Package className="h-10 w-10 text-blue-600" />
                <h3 className="text-2xl font-bold">Parcel Point</h3>
              </div>
              <p className="text-gray-600 mb-6">
                A comprehensive parcel storage management system designed for modern businesses.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  'Secure Storage',
                  'Customer Notifications',
                  'Easy Payments Integration',
                  'Analytics Dashboard'
                ].map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <CheckCircle className="text-green-500 h-5 w-5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <button className="mt-8 flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <span>Learn more about Parcel Point</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Interested in our training programs or products? We'd love to hear from you.
          </p>
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input 
                type="text" 
                placeholder="Name" 
                className="p-2 border rounded-lg"
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="p-2 border rounded-lg"
              />
            </div>
            <textarea 
              placeholder="Message" 
              className="w-full p-2 border rounded-lg mb-4"
              rows={4}
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full">
              Send Message
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Terminal className="h-6 w-6" />
                <span className="font-bold">Squared Computing</span>
              </div>
              <p className="text-gray-400">
                Empowering developers through quality training and innovative solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Training</h4>
              <ul className="space-y-2 text-gray-400">
                <li>C++ Programming</li>
                <li>Qt Framework</li>
                <li>Custom Solutions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Parcel Point</li>
                <li>Documentation</li>
                <li>API Access</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>info@squaredcomputing.co.ke</li>
                <li>Nairobi, Kenya</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Squared Computing Limited. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SquaredComputingWebsite;