"use client";

import React, { useState } from 'react';
import { Package, ChevronRight, ChevronLeft, MapPin } from 'lucide-react';
import Link from 'next/link';
import LocationModal from './LocationModal';
import CouponAd from '@/components/CouponAd';

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
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="py-4 px-4 sm:px-6 bg-white border-b border-emerald-100">
                <div className="max-w-7xl mx-auto">
                    <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-emerald-600">
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
                        className="h-16 w-auto"
                    />
                    <div className="flex flex-col">
                        <span className="text-3xl text-gray-900 font-bold">ParcelPoint</span>
                        <span className="text-sm tracking-widest text-emerald-600">DROP • PAY • PICK</span>
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
                            className="w-full aspect-square object-cover rounded-lg shadow-sm border border-emerald-100"
                        />
                        <button
                            onClick={() => setCurrentImageIndex(i => (i - 1 + images.length) % images.length)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-sm border border-emerald-100"
                        >
                            <ChevronLeft className="h-6 w-6 text-emerald-600" />
                        </button>
                        <button
                            onClick={() => setCurrentImageIndex(i => (i + 1) % images.length)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-sm border border-emerald-100"
                        >
                            <ChevronRight className="h-6 w-6 text-emerald-600" />
                        </button>
                        <div className="flex gap-2 justify-center mt-4">
                            {images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImageIndex(idx)}
                                    className={`h-2 w-2 rounded-full ${idx === currentImageIndex ? 'bg-emerald-600' : 'bg-emerald-200'}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Hero Content */}
                    <div className="space-y-6">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Convenient Deliveries and Pickups, Anytime</h1>
                        <p className="text-lg text-gray-600">
                            A secure, smart parcel locker system designed for seamless last-mile delivery.
                            Strategically placed in residential communities, commercial centers, schools,
                            and offices for ultimate convenience.
                        </p>
                        <div className="space-y-6">
                            <p className="text-lg text-gray-600">
                                ParcelPoint makes parcel deliveries and pickups effortless and secure. Deliverers drop off
                                parcels into smart lockers, and recipients retrieve them at their convenience using a unique
                                access code sent to their phone.
                            </p>
                            <p className="text-lg text-gray-600">
                                For personal use, you can store items securely and pick them up later. Simply drop your parcel
                                or items, make a quick M-Pesa payment, and use your code to access the locker anytime.
                            </p>
                            <button
                                className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
                                onClick={handleDownload}
                            >
                                Download Brochure
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="bg-emerald-50 py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl sm:text-3xl text-gray-900 font-bold text-center mb-8 sm:mb-12">How It Works</h2>
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
                            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-emerald-200">
                                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                                <h4 className="text-emerald-600 mb-4">{step.subtitle}</h4>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Network Section */}
            <section className="py-12 sm:py-16 bg-white text-center">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <p className="text-2xl text-gray-600">
                        We're building a network of ParcelPoint lockers across Kenya, strategically located in
                        malls, residential areas, schools, and offices. This makes secure, convenient parcel pickup
                        and delivery easily accessible, wherever you are.
                    </p>
                    <button
                        className="mt-8 bg-emerald-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto hover:bg-emerald-700 transition-colors shadow-sm"
                        onClick={() => setIsLocationModalOpen(true)}
                    >
                        <MapPin className="h-5 w-5" />
                        See our locations
                    </button>
                </div>
            </section>

            {/* Real Solutions Section */}
            <section className="py-12 sm:py-16 bg-emerald-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl sm:text-3xl text-gray-900 font-bold mb-8 sm:mb-12 text-center">
                        Delivering Real Solutions with ParcelPoint
                    </h2>

                    <div className="space-y-8 sm:space-y-16">
                        {/* Missed Deliveries */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                            <img
                                src="/images/parcel-point/other/missed-deliveries.png"
                                alt="Person retrieving parcel from locker"
                                className="w-full aspect-video object-cover rounded-lg shadow-sm border border-emerald-200"
                            />
                            <div>
                                <h3 className="text-xl sm:text-2xl text-gray-900 font-bold mb-4">
                                    Missed Deliveries in a Busy Schedule
                                </h3>
                                <p className="text-gray-600">
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
                                className="lg:order-2 w-full aspect-video object-cover rounded-lg shadow-sm border border-emerald-200"
                            />
                            <div className="lg:order-1">
                                <h3 className="text-xl sm:text-2xl text-gray-900 font-bold mb-4">
                                    Convenient Pickup Locations
                                </h3>
                                <p className="text-gray-600">
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
                                className="w-full aspect-video object-cover rounded-lg shadow-sm border border-emerald-200"
                            />
                            <div>
                                <h3 className="text-xl sm:text-2xl text-gray-900 font-bold mb-4">
                                    Hassle-Free Payments
                                </h3>
                                <p className="text-gray-600">
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
            <section className="bg-white py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl sm:text-3xl text-gray-900 font-bold mb-8 sm:mb-12 text-center">
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
                            <div key={index} className="bg-emerald-50 p-6 rounded-lg shadow-sm border border-emerald-200">
                                <h3 className="font-bold text-gray-900 mb-4">{partner.title}</h3>
                                <p className="text-gray-600">{partner.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-12 sm:py-16 bg-emerald-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl sm:text-3xl text-gray-900 font-bold mb-8 sm:mb-12 text-center">
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
                            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-emerald-200">
                                <details className="group">
                                    <summary className="font-bold text-gray-900 cursor-pointer list-none flex items-center">
                                        <span className="group-open:rotate-90 transition-transform text-emerald-600">▸</span>
                                        <span className="ml-2">{faq.question}</span>
                                    </summary>
                                    <p className="mt-4 text-gray-600 pl-6">
                                        {faq.answer}
                                    </p>
                                </details>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Contact Section */}
            <section className="bg-white py-12 sm:py-16 border-t border-emerald-100">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
                    <p className="text-2xl text-gray-900 mb-8">
                        ParcelPoint serves key industries like e-commerce, retail, logistics, and
                        real estate, offering secure and efficient parcel solutions. Contact us to
                        learn how we can streamline your parcel management.
                    </p>
                    <Link href="/#contact">
                        <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm">
                            Get in touch
                        </button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white text-gray-600 py-8 sm:py-12 border-t border-emerald-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div>
                            <h3 className="font-bold text-gray-900 mb-4">Squared Computing</h3>
                            <p className="text-gray-600">
                                Informed firmware development and consulting services.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-900 mb-4">Services</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>Custom Firmware</li>
                                <li>Consulting</li>
                                <li>System Integration</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-900 mb-4">Products</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>Parcel Point</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-900 mb-4">Contact</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li className="break-words">hello@squared.co.ke</li>
                                <li>Nairobi, Kenya</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-emerald-100 mt-8 pt-8 text-center text-gray-600">
                        <p>© {new Date().getFullYear()} Squared Computing. All rights reserved.</p>
                    </div>
                </div>
            </footer>
            <LocationModal
                isOpen={isLocationModalOpen}
                onClose={() => setIsLocationModalOpen(false)}
            />
        </div>
    );
}

export default ParcelPoint;