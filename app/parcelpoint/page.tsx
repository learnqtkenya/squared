"use client";

import React, { useState } from 'react';
import { Package, ChevronRight, ChevronLeft, MapPin } from 'lucide-react';
import Link from 'next/link';
import LocationModal from './LocationModal';
import CouponAd from '@/components/CouponAd';
import { Footer } from '@/components/Footer';


const ParcelPoint = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const images = ['/images/parcel-point/locker/1.jpeg', '/images/parcel-point/locker/2.jpeg', '/images/parcel-point/locker/3.jpeg'];

    const handleDownload = async () => {
        try {
            const response = await fetch("/brochures/parcel-point-brochure.pdf");
            if (!response.ok) throw new Error('Brochure not found');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'ParcelPoint-Brochure.pdf';
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        } catch (error) {
            console.error('Download failed:', error);
            alert('The brochure is currently unavailable. Please try again later.');
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            {/* Header */}
            <header className="py-4 px-4 sm:px-6 bg-white dark:bg-gray-900 border-b border-emerald-100 dark:border-emerald-900/50">
                <div className="max-w-7xl mx-auto">
                    <Link href="/" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-500">
                        <ChevronLeft className="h-5 w-5" />
                        <span>Back to Squared Computing</span>
                    </Link>
                </div>
            </header>

            {/* Logo Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                <div className="flex items-center justify-center gap-4">
                    <img
                        src="/images/parcel-point/parcel_point_dark.png"
                        alt="ParcelPoint Logo"
                        className="h-16 w-auto dark:hidden"
                    />
                    <img
                        src="/images/parcel-point/parcel_point_light.png"
                        alt="ParcelPoint Logo"
                        className="h-16 w-auto hidden dark:block"
                    />
                    <div className="flex flex-col">
                        <span className="text-3xl text-gray-900 dark:text-white font-bold">ParcelPoint</span>
                        <span className="text-sm tracking-widest text-emerald-600 dark:text-emerald-500">DROP • PAY • PICK</span>
                    </div>
                </div>
            </div>

            {/* CouponAd Ad */}
            <CouponAd />

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Image Carousel */}
                    <div className="relative">
                        <img
                            src={images[currentImageIndex]}
                            alt="ParcelPoint Locker"
                            className="w-full aspect-square object-cover rounded-lg shadow-sm border border-emerald-100 dark:border-emerald-900"
                        />
                        <button
                            onClick={() => setCurrentImageIndex(i => (i - 1 + images.length) % images.length)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 p-2 rounded-full shadow-sm border border-emerald-100 dark:border-emerald-900"
                        >
                            <ChevronLeft className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
                        </button>
                        <button
                            onClick={() => setCurrentImageIndex(i => (i + 1) % images.length)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 p-2 rounded-full shadow-sm border border-emerald-100 dark:border-emerald-900"
                        >
                            <ChevronRight className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
                        </button>
                        <div className="flex gap-2 justify-center mt-4">
                            {images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImageIndex(idx)}
                                    className={`h-2 w-2 rounded-full ${idx === currentImageIndex ? 'bg-emerald-600 dark:bg-emerald-500' : 'bg-emerald-200 dark:bg-emerald-900'}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Hero Content */}
                    <div className="space-y-6">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Convenient Deliveries and Pickups, Anytime</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            A secure, smart parcel locker system designed for seamless last-mile delivery.
                            Strategically placed in residential communities, commercial centers, schools,
                            and offices for ultimate convenience.
                        </p>
                        <div className="space-y-6">
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                ParcelPoint makes parcel deliveries and pickups effortless and secure. Deliverers drop off
                                parcels into smart lockers, and recipients retrieve them at their convenience using a unique
                                access code sent to their phone.
                            </p>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                For personal use, you can store items securely and pick them up later. Simply drop your parcel
                                or items, make a quick M-Pesa payment, and use your code to access the locker anytime.
                            </p>
                            <button
                                className="bg-emerald-600 dark:bg-emerald-700 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors shadow-sm"
                                onClick={handleDownload}
                            >
                                Download Brochure
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="bg-emerald-50 dark:bg-gray-800 py-12 sm:py-16 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl sm:text-3xl text-gray-900 dark:text-white font-bold text-center mb-8 sm:mb-12">How It Works</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {[
                            {
                                title: "1. Deliver or Store Your Parcel",
                                subtitle: "Convenient Drop-Off",
                                description: "Couriers or individuals can deposit parcels securely at ParcelPoint lockers, available in malls, residential areas, schools, and offices."
                            },
                            {
                                title: "2. Access Code Sent",
                                subtitle: "Hassle-Free Notifications",
                                description: "The recipient gets a unique 6-digit code via SMS as soon as a parcel is stored, ensuring only they can access it."
                            },
                            {
                                title: "3. Pay at Pickup",
                                subtitle: "Quick MPESA Payments",
                                description: "Recipients pay securely with MPESA when picking up their parcels—simple, fast, and reliable."
                            },
                            {
                                title: "4. Flexible Pickup",
                                subtitle: "24/7 Access",
                                description: "Pick up your parcel anytime using the access code—no missed deliveries, no waiting."
                            }
                        ].map((step, index) => (
                            <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-emerald-200 dark:border-emerald-900">
                                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                                <h4 className="text-emerald-600 dark:text-emerald-500 mb-4">{step.subtitle}</h4>
                                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Network Section */}
            <section className="py-12 sm:py-16 bg-white dark:bg-gray-900 text-center">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <p className="text-2xl text-gray-600 dark:text-gray-300">
                        We're building a network of ParcelPoint lockers across Kenya, strategically located in
                        malls, residential areas, schools, and offices. This makes secure, convenient parcel pickup
                        and delivery easily accessible, wherever you are.
                    </p>
                    <button
                        className="mt-8 bg-emerald-600 dark:bg-emerald-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors shadow-sm"
                        onClick={() => setIsLocationModalOpen(true)}
                    >
                        <MapPin className="h-5 w-5" />
                        See our locations
                    </button>
                </div>
            </section>

            {/* Real Solutions Section */}
            <section className="py-12 sm:py-16 bg-emerald-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl sm:text-3xl text-gray-900 dark:text-white font-bold mb-8 sm:mb-12 text-center">
                        Delivering Real Solutions with ParcelPoint
                    </h2>

                    <div className="space-y-8 sm:space-y-16">
                        {/* Missed Deliveries */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                            <img
                                src="/images/parcel-point/other/missed-deliveries.png"
                                alt="Person retrieving parcel from locker"
                                className="w-full aspect-video object-cover rounded-lg shadow-sm border border-emerald-200 dark:border-emerald-900"
                            />
                            <div>
                                <h3 className="text-xl sm:text-2xl text-gray-900 dark:text-white font-bold mb-4">
                                    Missed Deliveries in a Busy Schedule
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    In a fast-paced city life, missed deliveries are more than just an
                                    inconvenience—they waste valuable time. ParcelPoint solves this problem
                                    by offering 24/7 access to secure lockers. Whether you're at work, at
                                    the gym, or running errands, your parcels are waiting for you at your
                                    convenience.
                                </p>
                            </div>
                        </div>

                        {/* Convenient Locations */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                            <img
                                src="/images/parcel-point/other/inconvenient-locations.png"
                                alt="ParcelPoint locker locations"
                                className="lg:order-2 w-full aspect-video object-cover rounded-lg shadow-sm border border-emerald-200 dark:border-emerald-900"
                            />
                            <div className="lg:order-1">
                                <h3 className="text-xl sm:text-2xl text-gray-900 dark:text-white font-bold mb-4">
                                    Convenient Pickup Locations
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Living in a busy city means you're often juggling work, social
                                    commitments, and family. The last thing you want is to trek across town
                                    to find a parcel pickup point. ParcelPoint has strategically placed
                                    lockers in high-traffic locations like malls, office buildings, and
                                    residential complexes.
                                </p>
                            </div>
                        </div>

                        {/* Easy Payments */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                            <img
                                src="/images/parcel-point/other/hassle-free-payments.png"
                                alt="M-Pesa payment at ParcelPoint locker"
                                className="w-full aspect-video object-cover rounded-lg shadow-sm border border-emerald-200 dark:border-emerald-900"
                            />
                            <div>
                                <h3 className="text-xl sm:text-2xl text-gray-900 dark:text-white font-bold mb-4">
                                    Hassle-Free Payments
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    City dwellers often deal with long lines and frustrating payment
                                    processes. ParcelPoint eliminates this by allowing you to pay for your
                                    parcel pickup through M-Pesa directly at the locker, simplifying the
                                    process.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section className="bg-white dark:bg-gray-900 py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl sm:text-3xl text-gray-900 dark:text-white font-bold mb-8 sm:mb-12 text-center">
                        Perfect Partners for ParcelPoint
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {[
                            {
                                title: "E-commerce Platforms",
                                description: "We partner with popular e-commerce platforms to streamline deliveries."
                            },
                            {
                                title: "Retail chains",
                                description: "We collaborate with retail stores and malls to place ParcelPoint lockers at high-traffic locations."
                            },
                            {
                                title: "Real Estate Developers",
                                description: "We work with developers of residential and commercial properties to install ParcelPoint lockers."
                            },
                            {
                                title: "Courier & Logistics Companies",
                                description: "We team up with couriers and logistics providers to reduce delivery inefficiencies."
                            }
                        ].map((partner, index) => (
                            <div key={index} className="bg-emerald-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-emerald-200 dark:border-emerald-900">
                                <h3 className="font-bold text-gray-900 dark:text-white mb-4">{partner.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{partner.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Service Models Section */}
            <section className="py-12 sm:py-16 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-3xl text-gray-900 dark:text-white font-bold mb-4">
                            Choose Your ParcelPoint Model
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Whether you want to partner with us, own your own system, or have us manage everything,
                            we have a model that fits your needs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* ParcelPoint-Owned Model */}
                        <div className="bg-emerald-50 dark:bg-gray-800 rounded-xl p-6 sm:p-8 border-2 border-emerald-200 dark:border-emerald-700 relative">
                            <div className="absolute top-4 right-4 bg-emerald-600 dark:bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                Recommended
                            </div>
                            <div className="mb-6">
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    We Fully Own
                                </h3>
                                <p className="text-emerald-600 dark:text-emerald-500 font-medium">Rental Income Model</p>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Perfect for:</h4>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                                        Property owners who want reliable rental income from ParcelPoint without any investment or operational responsibility
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">What You Provide:</h4>
                                    <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
                                        <li>• Secure space for the locker (we pay rent)</li>
                                        <li>• Basic power supply</li>
                                        <li>• Help promote the service</li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">What We Handle:</h4>
                                    <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
                                        <li>• All equipment and installation</li>
                                        <li>• Maintenance and support</li>
                                        <li>• Customer service</li>
                                        <li>• All operational costs</li>
                                    </ul>
                                </div>

                                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Our Arrangement:</h4>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 dark:text-gray-300">We pay you</span>
                                        <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-500">Rent</span>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Monthly rent for the physical space where locker is installed</p>
                                </div>
                            </div>

                            <button
                                className="w-full bg-emerald-600 dark:bg-emerald-500 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors font-medium"
                                onClick={() => window.open('https://wa.me/254759777587?text=I\'m interested in the ParcelPoint rental model where you pay rent for space and handle all operations. I\'d like to learn more about the rental arrangement.', '_blank')}
                            >
                                Rent My Space
                            </button>
                        </div>

                        {/* Customer-Owned Model */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 border-2 border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-colors">
                            <div className="mb-6">
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    Buy & Own Outright
                                </h3>
                                <p className="text-emerald-600 dark:text-emerald-500 font-medium">One-Time Purchase Model</p>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Perfect for:</h4>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                                        Real estate developers, large businesses, and organizations wanting complete ownership and control
                                    </p>
                                </div>

                                <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">How It Works:</h4>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                                        <strong>Pay once, own forever.</strong> You purchase the complete locker system at a fixed price and it becomes your property. No ongoing fees to us.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">What You Get:</h4>
                                    <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
                                        <li>• Complete locker system (yours to keep)</li>
                                        <li>• Desktop monitoring dashboard</li>
                                        <li>• 1 year free support & updates</li>
                                        <li>• White-label branding option</li>
                                        <li>• Local data (SMS-only, no cloud)</li>
                                        <li>• All installation documentation</li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Your Ongoing Costs:</h4>
                                    <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
                                        <li>• Power supply (standard electrical)</li>
                                        <li>• Safaricom SIM (~KES 1,000/month)</li>
                                        <li>• Optional support: $75/hour after year 1</li>
                                        <li>• <strong>No fees to ParcelPoint</strong></li>
                                    </ul>
                                </div>

                                <div className="bg-emerald-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Your Revenue:</h4>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                                        <strong>Keep 100% of all revenue.</strong> Set your own pricing, offer as paid service, or provide free to tenants/customers. It's your business.
                                    </p>
                                </div>
                            </div>

                            <button
                                className="w-full bg-gray-900 dark:bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-500 transition-colors font-medium"
                                onClick={() => window.open('mailto:hello@squared.co.ke?subject=ParcelPoint System Purchase Inquiry&body=I\'m interested in purchasing a complete ParcelPoint locker system for full ownership. Please provide pricing and technical details.', '_blank')}
                            >
                                Get Purchase Quote
                            </button>
                        </div>

                        {/* Partnered Model */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 border-2 border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-colors">
                            <div className="mb-6">
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    We Manage, You Earn
                                </h3>
                                <p className="text-emerald-600 dark:text-emerald-500 font-medium">Revenue Sharing Model</p>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Perfect for:</h4>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                                        Schools, offices, and community centers wanting passive income from lockers
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Your Role:</h4>
                                    <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
                                        <li>• Provide rent-free space</li>
                                        <li>• Keep locker area clean & safe</li>
                                        <li>• Promote ParcelPoint to users</li>
                                        <li>• Help identify new locations</li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Our Role:</h4>
                                    <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
                                        <li>• Provide & maintain equipment</li>
                                        <li>• Handle all technical support</li>
                                        <li>• Manage customer service</li>
                                        <li>• Process all payments</li>
                                    </ul>
                                </div>

                                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Revenue Split:</h4>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">70% / 30%</div>
                                        <p className="text-xs text-gray-600 dark:text-gray-300">ParcelPoint / Partner</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                className="w-full bg-blue-600 dark:bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium"
                                onClick={() => window.open('https://wa.me/254759777587?text=I\'m interested in the ParcelPoint revenue sharing model with 70/30 split. I can provide free space and would like to discuss the partnership details.', '_blank')}
                            >
                                Become a Partner
                            </button>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Not sure which model is right for you? We'll help you choose the best option for your specific needs.
                        </p>
                        <button
                            className="bg-emerald-600 dark:bg-emerald-500 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors font-medium inline-flex items-center gap-2"
                            onClick={() => window.open('https://wa.me/254759777587?text=I\'m interested in ParcelPoint and would like to discuss the different service models.', '_blank')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                            </svg>
                            Get Free Consultation
                        </button>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-12 sm:py-16 bg-emerald-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl sm:text-3xl text-gray-900 dark:text-white font-bold mb-8 sm:mb-12 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                question: "How do I pick up my parcel from a ParcelPoint locker?",
                                answer: "Use the unique 6-digit code sent to your phone via SMS to retrieve your parcel."
                            },
                            {
                                question: "Can I store my items in a ParcelPoint locker?",
                                answer: "Yes, you can store items securely and pick them up later using the access code sent on storage."
                            },
                            {
                                question: "How do I make a payment for my parcel?",
                                answer: "Payments are made through M-Pesa directly at the locker for a quick and secure transaction."
                            },
                            {
                                question: "Where are ParcelPoint lockers located?",
                                answer: "Our lockers are strategically placed in malls, residential areas, schools, and offices across Kenya."
                            },
                            {
                                question: "What if I miss my pickup?",
                                answer: "Your parcel remains secure in the locker until you're able to collect it."
                            },
                            {
                                question: "Can I send a parcel to a ParcelPoint locker?",
                                answer: "Yes, you can send parcels to any ParcelPoint location for secure storage and pickup."
                            },
                            {
                                question: "Is ParcelPoint available in all cities in Kenya?",
                                answer: "We're continuously expanding our network across major cities in Kenya."
                            },
                            {
                                question: "How long can I leave my parcel in a ParcelPoint locker?",
                                answer: "Parcels can be stored for up to 3 days from the time of delivery. You'll receive SMS reminder at 2 days after delivery. If not collected within 3 days, our team will retrieve the parcel and contact you to arrange an alternative delivery option."
                            }
                        ].map((faq, index) => (
                            <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-emerald-200 dark:border-emerald-900">
                                <details className="group">
                                    <summary className="font-bold text-gray-900 dark:text-white cursor-pointer list-none flex items-center">
                                        <span className="group-open:rotate-90 transition-transform text-emerald-600 dark:text-emerald-500">▸</span>
                                        <span className="ml-2">{faq.question}</span>
                                    </summary>
                                    <p className="mt-4 text-gray-600 dark:text-gray-300 pl-6">
                                        {faq.answer}
                                    </p>
                                </details>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Contact Section */}
            <section className="bg-white dark:bg-gray-900 py-12 sm:py-16 border-t border-emerald-100 dark:border-emerald-900/50">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
                    <p className="text-2xl text-gray-900 dark:text-white mb-8">
                        ParcelPoint serves key industries like e-commerce, retail, logistics, and
                        real estate, offering secure and efficient parcel solutions. Contact us to
                        learn how we can streamline your parcel management.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href="mailto:hello@squared.co.ke?subject=ParcelPoint%20Inquiry"
                            className="bg-emerald-600 dark:bg-emerald-700 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors shadow-sm flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                            Email Us
                        </a>
                        <a
                            href="https://wa.me/254759777587?text=I'm%20interested%20in%20ParcelPoint."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-600 dark:bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors shadow-sm flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                            </svg>
                            WhatsApp Us
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer
                sections={[
                    {
                        title: 'Features',
                        links: [
                            { label: '24/7 Access' },
                            { label: 'Secure Storage' },
                            { label: 'M-PESA Integration' }
                        ]
                    },
                    {
                        title: 'Company',
                        links: [
                            { label: 'About Us', href: '/#about' },
                            { label: 'Services', href: '/#services' },
                            { label: 'Contact', href: '/#contact' }
                        ]
                    }
                ]}
            />
            <LocationModal
                isOpen={isLocationModalOpen}
                onClose={() => setIsLocationModalOpen(false)}
            />
        </div>
    );
}

export default ParcelPoint;