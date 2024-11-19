"use client";

import React, { useState } from 'react';
import { Package, ChevronRight, ChevronLeft, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function ParcelPoint() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = ['/images/parcel-point-hero.jpg', '/images/parcel-point-hero.jpg', '/images/parcel-point-hero.jpg', '/images/parcel-point-hero.jpg'];

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
            <header className="py-4 px-6 bg-gray-100">
                <div className="max-w-7xl mx-auto">
                    <Link href="/" className="flex items-center gap-2 text-gray-900 hover:text-blue-600">
                        <ChevronLeft className="h-5 w-5" />
                        <span>Back to Squared Computing</span>
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-2 gap-12">
                    {/* Image Carousel */}
                    <div className="relative">
                        <img
                            src={images[currentImageIndex]}
                            alt="ParcelPoint Locker"
                            className="w-full aspect-square object-cover rounded-lg"
                        />
                        <button
                            onClick={() => setCurrentImageIndex(i => (i - 1 + images.length) % images.length)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
                        >
                            <ChevronLeft className="h-6 w-6 text-gray-900" />
                        </button>
                        <button
                            onClick={() => setCurrentImageIndex(i => (i + 1) % images.length)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
                        >
                            <ChevronRight className="h-6 w-6 text-gray-900" />
                        </button>
                        <div className="flex gap-2 justify-center mt-4">
                            {images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImageIndex(idx)}
                                    className={`h-2 w-2 rounded-full ${idx === currentImageIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Hero Content */}
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">Convenient Deliveries and Pickups, Anytime</h1>
                        <p className="text-lg text-gray-600 mb-8">
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
                            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg" onClick={handleDownload} >
                                Download Brochure
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl text-gray-900 font-bold text-center mb-12">How It Works</h2>
                    <div className="grid grid-cols-4 gap-8">
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
                            <div key={index} className="bg-white p-6 rounded-lg shadow">
                                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                                <h4 className="text-blue-600 mb-4">{step.subtitle}</h4>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Network Section */}
            <section className="py-16 bg-gray-100 text-center">
                <div className="max-w-3xl mx-auto px-6">
                    <p className="text-lg text-gray-600">
                        We're building a network of ParcelPoint lockers across Kenya, strategically located in
                        malls, residential areas, schools, and offices. This makes secure, convenient parcel pickup
                        and delivery easily accessible, wherever you are.
                    </p>
                    <button className="mt-8 bg-blue-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto">
                        <MapPin className="h-5 w-5" />
                        See our locations
                    </button>
                </div>
            </section>

            {/* Real Solutions Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl text-gray-900 font-bold mb-12 text-center">
                        Delivering Real Solutions with ParcelPoint
                    </h2>

                    {/* Missed Deliveries */}
                    <div className="grid grid-cols-2 gap-12 mb-16">
                        <div className="bg-gray-100 rounded-lg aspect-video"></div>
                        <div>
                            <h3 className="text-2xl text-gray-900 font-bold mb-4">
                                Missed Deliveries in a Busy Schedule
                            </h3>
                            <p className="text-gray-600">
                                In a fast-paced city life, missed deliveries are more than just an
                                inconvenience—they waste valuable time. ParcelPoint solves this problem
                                by offering 24/7 access to secure lockers. Whether you're at work, at
                                the gym, or running errands, your parcels are waiting for you at your
                                convenience. With a unique access code sent directly to your phone, you
                                can pick up your deliveries when it fits into your busy day.
                            </p>
                        </div>
                    </div>

                    {/* Inconvenient Locations */}
                    <div className="grid grid-cols-2 gap-12 mb-16">
                        <div>
                            <h3 className="text-2xl text-gray-900 font-bold mb-4">
                                Inconvenient Pickup Locations
                            </h3>
                            <p className="text-gray-600">
                                Living in a busy city means you're often juggling work, social
                                commitments, and family. The last thing you want is to trek across town
                                to find a parcel pickup point. ParcelPoint has strategically placed
                                lockers in high-traffic locations like malls, office buildings, and
                                residential complexes, so you can collect your parcels quickly without
                                wasting time. Whether it's on your way home or near your workplace,
                                there's a ParcelPoint locker just around the corner.
                            </p>
                        </div>
                        <div className="bg-gray-100 rounded-lg aspect-video"></div>
                    </div>

                    {/* Hassle-Free Payments */}
                    <div className="grid grid-cols-2 gap-12">
                        <div className="bg-gray-100 rounded-lg aspect-video"></div>
                        <div>
                            <h3 className="text-2xl text-gray-900 font-bold mb-4">
                                Hassle-Free Payments
                            </h3>
                            <p className="text-gray-600">
                                City dwellers often deal with long lines and frustrating payment
                                processes. ParcelPoint eliminates this by allowing you to pay for your
                                parcel pickup through M-Pesa directly at the locker, simplifying the
                                process. No more waiting for cashiers or dealing with complicated
                                payment steps—just a quick, secure transaction, so you can get your
                                parcel and get back to your day without delay.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl text-gray-900 font-bold mb-12 text-center">
                        Perfect Partners for ParcelPoint
                    </h2>
                    <div className="grid grid-cols-4 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="font-bold text-gray-900 mb-4">E-commerce Platforms</h3>
                            <p className="text-gray-600">
                                We partner with popular e-commerce platforms to streamline deliveries.
                                By offering ParcelPoint lockers as secure, convenient pickup points, we
                                enhance the shopping experience for customers and ensure timely
                                deliveries.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="font-bold text-gray-900 mb-4">Retail chains</h3>
                            <p className="text-gray-600">
                                We collaborate with retail stores and malls to place ParcelPoint
                                lockers at high-traffic locations. This allows customers to
                                conveniently pick up their online purchases, providing a seamless
                                delivery and pickup experience.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="font-bold text-gray-900 mb-4">Real Estate Developers</h3>
                            <p className="text-gray-600">
                                We work with developers of residential and commercial properties to
                                install ParcelPoint lockers in high-density areas. This solution brings
                                convenience to tenants, offering a secure and reliable parcel
                                management system.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="font-bold text-gray-900 mb-4">Courier & Logistics Companies</h3>
                            <p className="text-gray-600">
                                We team up with couriers and logistics providers to reduce delivery
                                inefficiencies. ParcelPoint lockers serve as reliable and secure
                                collection points, ensuring timely deliveries while minimizing missed
                                packages.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl text-gray-900 font-bold mb-12 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="grid grid-cols-2 gap-6">
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
                                answer: "Parcels can be stored for as long as it is convenient for you."
                            }
                        ].map((faq, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow">
                                <details>
                                    <summary className="font-bold text-gray-900 cursor-pointer list-none">
                                        ▸ {faq.question}
                                    </summary>
                                    <p className="mt-4 text-gray-900">
                                        {faq.answer}
                                    </p>
                                </details>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <p className="text-lg text-gray-900 mb-8">
                        ParcelPoint serves key industries like e-commerce, retail, logistics, and
                        real estate, offering secure and efficient parcel solutions. Contact us to
                        learn how we can streamline your parcel management.
                    </p>
                    <Link href="/#contact">
                        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg">
                            Get in touch
                        </button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-4 gap-8">
                        <div>
                            <h3 className="font-bold mb-4">Squared Computing</h3>
                            <p className="text-gray-400">
                                Informed firmware development and consulting services.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-bold mb-4">Services</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>Custom Firmware</li>
                                <li>Consulting</li>
                                <li>System Integration</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold mb-4">Products</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>Parcel Point</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold mb-4">Contact</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>info@squaredcomputing.co.ke</li>
                                <li>Nairobi, Kenya</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>© 2024 Squared Computing. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}