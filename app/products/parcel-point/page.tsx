'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import {
    Package,
    ChevronLeft,
    Bell,
    Shield,
    CreditCard,
    BarChart4,
    Smartphone,
    Building,
    Users,
    Clock,
    Download
} from 'lucide-react';
import { COMPANY_NAME } from '@/lib/constants';

const features = [
    {
        icon: <Shield className="h-6 w-6 text-blue-600" />,
        title: 'Secure Storage',
        description: 'Proven security systems protect parcels 24/7 with individual compartment locking mechanisms.'
    },
    {
        icon: <CreditCard className="h-6 w-6 text-blue-600" />,
        title: 'Easy Payments',
        description: 'Seamless integration with popular payment gateways for hassle-free transactions and automated billing.'
    },
    {
        icon: <Bell className="h-6 w-6 text-blue-600" />,
        title: 'Smart Notifications',
        description: 'Automated SMS notifications keep recipients informed about their parcel status in real-time.'
    },
    {
        icon: <BarChart4 className="h-6 w-6 text-blue-600" />,
        title: 'Analytics Dashboard',
        description: 'Comprehensive analytics and reporting tools for tracking usage patterns and optimizing operations.'
    },
    {
        icon: <Smartphone className="h-6 w-6 text-blue-600" />,
        title: 'Mobile App',
        description: 'User-friendly mobile application for convenient parcel management on the go.'
    },
    {
        icon: <Building className="h-6 w-6 text-blue-600" />,
        title: 'Property Integration',
        description: 'Seamless integration with existing property management systems and security protocols.'
    },
    {
        icon: <Users className="h-6 w-6 text-blue-600" />,
        title: 'Multi-tenant Support',
        description: 'Support for multiple users and roles with customizable access levels and permissions.'
    },
    {
        icon: <Clock className="h-6 w-6 text-blue-600" />,
        title: '24/7 Access',
        description: 'Round-the-clock access to parcels with secure authentication mechanisms.'
    }
];

const benefits = [
    {
        title: 'For Property Managers',
        points: [
            'Reduce staff workload in handling deliveries',
            'Improve tenant satisfaction with 24/7 parcel access',
            'Generate additional revenue through service fees',
            'Minimize liability with secure chain of custody'
        ]
    },
    {
        title: 'For Residents',
        points: [
            'Convenient 24/7 parcel collection',
            'Real-time delivery notifications',
            'Secure storage for valuable items',
            'Contact-free delivery experience'
        ]
    },
    {
        title: 'For Delivery Services',
        points: [
            'Streamlined delivery process',
            'Reduced failed delivery attempts',
            'Digital proof of delivery',
            'Time and cost savings'
        ]
    }
];

export default function ParcelPoint() {
    const [imageError, setImageError] = useState(false);
    const [downloadError, setDownloadError] = useState(false);
    // const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/learnqtkenya';

    const handleDownload = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`brochures/parcel-point-brochure.pdf`);
            if (!response.ok) {
                throw new Error('Brochure not found');
            }
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
            setDownloadError(true);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white shadow-sm p-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2 text-gray-900 hover:text-blue-600">
                        <ChevronLeft className="h-5 w-5" />
                        <span>Back to {COMPANY_NAME}</span>
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-20 pb-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center space-x-3 justify-center mb-6">
                        <Package className="h-10 w-10 text-blue-600" />
                        <h1 className="text-4xl font-bold text-gray-900">ParcelPoint</h1>
                    </div>
                    <p className="text-xl text-gray-700 text-center max-w-2xl mx-auto mb-12">
                        A comprehensive smart locker system designed for modern real estates,
                        revolutionizing parcel management for properties of all sizes.
                    </p>
                    <div className="aspect-video relative rounded-xl overflow-hidden shadow-xl">
                        {!imageError ? (
                            <Image
                                src={`images/parcel-point-hero.jpg`}
                                alt="ParcelPoint System Overview"
                                fill
                                className="object-cover"
                                priority
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <Package className="h-20 w-20 text-gray-400" />
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                        Comprehensive Features
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow"
                            >
                                <div className="mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-700">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 px-4 bg-gray-100">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                        Benefits for Everyone
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-sm"
                            >
                                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                                    {benefit.title}
                                </h3>
                                <ul className="space-y-3">
                                    {benefit.points.map((point, idx) => (
                                        <li key={idx} className="flex items-start space-x-2">
                                            <div className="mt-1">
                                                <div className="h-2 w-2 bg-blue-600 rounded-full" />
                                            </div>
                                            <span className="text-gray-700">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900">
                        Ready to Transform Your Parcel Management?
                    </h2>
                    <p className="text-gray-700 mb-8 max-w-xl mx-auto">
                        Get in touch to learn more about how ParcelPoint can benefit your property
                        and receive a customized quote.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Link
                            href="/#contact"
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                        >
                            Contact Us
                        </Link>
                        <button
                            onClick={handleDownload}
                            className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-2"
                            disabled={downloadError}
                        >
                            <Download className="h-5 w-5" />
                            <span>{downloadError ? 'Brochure Unavailable' : 'Download Brochure'}</span>
                        </button>
                    </div>
                    {downloadError && (
                        <p className="text-red-500 mt-2 text-sm">
                            The brochure is currently unavailable. Please contact us for more information.
                        </p>
                    )}
                </div>
            </section>
        </div>
    );
}