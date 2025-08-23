'use client';

import React from 'react';
import { Shield, Mail, ArrowLeft, Smartphone, Eye, Lock, UserCheck } from 'lucide-react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const PrivacyPolicyPage = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <Navigation onScrollToSection={() => {}} />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 bg-gradient-to-br from-white to-emerald-50 dark:from-gray-900 dark:to-emerald-950">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-6">
              <Shield className="h-10 w-10 text-emerald-600 dark:text-emerald-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              SquaredIoT Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Simple, transparent privacy practices for the SquaredIoT mobile app
            </p>
            <div className="mt-6 flex justify-center">
              <Link href="/" className="inline-flex items-center space-x-2 text-emerald-600 dark:text-emerald-500 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-emerald-200 dark:border-emerald-900 shadow-sm">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span><strong>Effective Date:</strong> {currentDate}</span>
              <span><strong>Last Updated:</strong> {currentDate}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* What We Collect */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 mb-8 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">What Information We Collect</h2>
            </div>
            
            <div className="space-y-6">
              <div className="border-l-4 border-emerald-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Account Information</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We collect your name, email address, and password when you create an account to associate and manage your IoT devices.
                </p>
              </div>
              
              <div className="border-l-4 border-emerald-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
                  <span>Camera Access</span>
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  The app requests camera permission only for QR code scanning to help you connect your devices. We do not store, save, or transmit any photos or videos from your camera.
                </p>
              </div>
            </div>
          </div>

          {/* How We Use Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 mb-8 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center">
                <Smartphone className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How We Use Your Information</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Account Information</h3>
                <p className="text-gray-600 dark:text-gray-300">Used to identify you and associate your IoT devices with your account</p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Camera</h3>
                <p className="text-gray-600 dark:text-gray-300">Used only for real-time QR code scanning - no images are stored</p>
              </div>
            </div>
          </div>

          {/* What We Don't Collect */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-8 mb-8 border border-red-200 dark:border-red-900/50">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What We Don't Collect</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Photos or videos from your camera',
                'Location data',
                'Personal files or documents',
                'Browsing history',
                'Contact information',
                'Any other personal information'
              ].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Data Security */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 mb-8 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center">
                <Lock className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Security</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Your account information is stored securely and protected with industry-standard security measures.
            </p>
          </div>

          {/* Your Rights */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 mb-8 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Rights</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-emerald-600 dark:bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">You can delete your account and associated data at any time</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-emerald-600 dark:bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">You can disable camera permission in your device settings (this will prevent QR code scanning)</p>
              </div>
            </div>
          </div>

          {/* Contact Us */}
          <div className="bg-gradient-to-r from-emerald-50 to-white dark:from-emerald-900/20 dark:to-gray-800 rounded-xl p-8 mb-8 border border-emerald-200 dark:border-emerald-900">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center">
                <Mail className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Us</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              If you have questions about this privacy policy, contact us at:
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                <a href="mailto:hello@squared.co.ke" className="text-emerald-600 dark:text-emerald-500 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors">
                  hello@squared.co.ke
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-5 w-5 flex items-center justify-center">
                  <div className="w-2 h-2 bg-emerald-600 dark:bg-emerald-500 rounded-full"></div>
                </div>
                <a href="https://squared.co.ke" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-500 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors">
                  squared.co.ke
                </a>
              </div>
            </div>
          </div>

          {/* Changes Section */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Changes</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We may update this policy occasionally. Continued use of the app means you accept any changes.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer
        sections={[
          {
            title: 'SquaredIoT App',
            links: [
              { label: 'Privacy Policy', href: '/squarediot/privacy-policy' },
              { label: 'Support', href: 'mailto:hello@squared.co.ke' }
            ]
          },
          {
            title: 'Company',
            links: [
              { label: 'About Us', href: '/#expertise' },
              { label: 'Services', href: '/#services' },
              { label: 'Contact', href: '/#contact' }
            ]
          }
        ]}
      />
    </div>
  );
};

export default PrivacyPolicyPage;