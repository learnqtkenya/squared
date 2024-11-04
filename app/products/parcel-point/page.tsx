'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Package,
    ChevronLeft,
    Clock,
    Shield,
    CreditCard,
    Building,
    Smartphone,
    Users,
    ShoppingBag,
    Download
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/CustomCard';

const features = [
    {
        icon: <Clock className="h-6 w-6 text-blue-600" />,
        title: '24/7 Access',
        description: 'Recipients can pick up parcels at any time, with lockers available day and night.'
    },
    {
        icon: <Smartphone className="h-6 w-6 text-blue-600" />,
        title: 'SMS Notification & Secure Access',
        description: 'Each parcel delivery generates an SMS with a unique 6-digit code for secure retrieval.'
    },
    {
        icon: <CreditCard className="h-6 w-6 text-blue-600" />,
        title: 'Real-Time Payment Integration',
        description: 'Simple MPESA payment prompt allows recipients to make payments quickly and securely upon pickup.'
    },
    {
        icon: <Shield className="h-6 w-6 text-blue-600" />,
        title: 'Durable Design',
        description: 'Weather-resistant lockers built with high-quality materials for both indoor and outdoor installations.'
    }
];

const markets = [
    {
        icon: <Building className="h-6 w-6 text-blue-600" />,
        title: 'Residential Complexes',
        description: 'Ideal for apartment buildings and gated communities with high package volume.'
    },
    {
        icon: <ShoppingBag className="h-6 w-6 text-blue-600" />,
        title: 'Retail & E-commerce',
        description: 'Shopping malls and collection points can reduce missed deliveries and increase satisfaction.'
    },
    {
        icon: <Users className="h-6 w-6 text-blue-600" />,
        title: 'Educational Institutions',
        description: 'Universities and schools benefit from convenient and secure pickup for students and staff.'
    },
    {
        icon: <Building className="h-6 w-6 text-blue-600" />,
        title: 'Corporate Offices',
        description: 'Perfect for corporations with significant employee counts for personal and business deliveries.'
    }
];

const benefits = [
    {
        title: 'For Customers',
        points: [
            'Convenience with 24/7 pickup access',
            'Security through SMS notifications and access codes',
            'Flexible payment via MPESA integration'
        ]
    },
    {
        title: 'For Couriers & E-commerce',
        points: [
            'Cost savings by minimizing re-deliveries',
            'Optimized delivery routes with centralized systems',
            'Enhanced customer experience and satisfaction'
        ]
    }
];

export default function ParcelPoint() {
    const [imageError, setImageError] = useState(false);
    const [downloadError, setDownloadError] = useState(false);

    const handleDownload = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
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
            setDownloadError(true);
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Navigation */}
            <nav className="bg-white shadow-sm p-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2 text-gray-900 hover:text-blue-600">
                        <ChevronLeft className="h-5 w-5" />
                        <span>Back to Squared Computing</span>
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-16 pb-12 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="flex items-center space-x-3 justify-center mb-6">
                        <Package className="h-12 w-12 text-blue-600" />
                        <h1 className="text-5xl font-bold text-gray-900">ParcelPoint</h1>
                    </div>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-12">
                        A secure, smart parcel locker system designed for seamless last-mile delivery.
                        Strategically placed in residential communities, commercial centers, schools,
                        and offices for ultimate convenience.
                    </p>
                    
                    {/* Hero Image */}
                    <div className="relative w-full aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl mb-12">
                        {!imageError ? (
                            <Image
                                src="/images/parcel-point-hero.jpg"
                                alt="ParcelPoint Smart Locker System"
                                fill
                                className="object-cover"
                                onError={() => setImageError(true)}
                                priority
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <Package className="h-20 w-20 text-gray-400" />
                            </div>
                        )}
                    </div>

                    {/* Download Button */}
                    <div className="flex justify-center space-x-4 mb-8">
                        <button
                            onClick={handleDownload}
                            className="flex items-center space-x-2 px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={downloadError}
                        >
                            <Download className="h-5 w-5" />
                            <span>{downloadError ? 'Brochure Unavailable' : 'Download Brochure'}</span>
                        </button>
                    </div>
                    {downloadError && (
                        <p className="text-red-500 text-sm">
                            The brochure is currently unavailable. Please contact us for more information.
                        </p>
                    )}
                </div>
            </section>

            {/* How it Works */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">How It Works</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {['Delivery', 'Pickup Process', 'Secure Payment', 'Package Retrieval'].map((step, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mb-4">
                                        {index + 1}
                                    </div>
                                    <CardTitle className="text-xl text-gray-900">{step}</CardTitle>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Key Features</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} className="hover:shadow-lg transition-shadow">
                                <CardContent className="pt-6">
                                    <div className="mb-4">{feature.icon}</div>
                                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                                    <p className="text-gray-700">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Target Markets */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Target Markets</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {markets.map((market, index) => (
                            <Card key={index} className="hover:shadow-lg transition-shadow">
                                <CardContent className="pt-6">
                                    <div className="mb-4">{market.icon}</div>
                                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{market.title}</h3>
                                    <p className="text-gray-700">{market.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Benefits</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {benefits.map((benefit, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle className="text-gray-900">{benefit.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {benefit.points.map((point, idx) => (
                                            <li key={idx} className="flex items-start space-x-2">
                                                <div className="mt-2">
                                                    <div className="h-2 w-2 bg-blue-600 rounded-full" />
                                                </div>
                                                <span className="text-gray-700">{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900">Get Started with ParcelPoint</h2>
                    <p className="text-gray-700 mb-8">
                        Ready to transform your parcel management? Contact us to learn more about
                        ParcelPoint and discuss implementation options for your property.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Link
                            href="/#contact"
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Contact Us
                        </Link>
                        <button
                            onClick={handleDownload}
                            className="flex items-center space-x-2 px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={downloadError}
                        >
                            <Download className="h-5 w-5" />
                            <span>Download Brochure</span>
                        </button>
                    </div>
                    {downloadError && (
                        <p className="text-red-500 text-sm mt-2">
                            The brochure is currently unavailable. Please contact us for more information.
                        </p>
                    )}
                </div>
            </section>
        </div>
    );
}