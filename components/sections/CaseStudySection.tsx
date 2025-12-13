'use client';

import Link from 'next/link';
import { CheckCircle, ChevronRight } from 'lucide-react';

interface Feature {
  text: string;
}

interface CaseStudySectionProps {
  title: string;
  description: string;
  features: Feature[];
  imageUrl: string;
  linkUrl: string;
}

export const CaseStudySection = ({
  title = 'ParcelPoint Smart Locker System',
  description = 'We developed an automated parcel management solution that has significantly reduced deliveries and improved customer satisfaction.',
  features = [
    { text: 'Custom hardware design and manufacturing' },
    { text: 'Secure, reliable control system' },
    { text: 'Intuitive touchscreen interface' },
    { text: 'Mobile and desktop app integration' },
    { text: 'Cloud-based management system' },
    { text: 'M-PESA payment integration' }
  ],
  imageUrl = '/images/parcel-point/locker/1.jpeg',
  linkUrl = '/case-studies/parcelpoint'
}: Partial<CaseStudySectionProps>) => {
  return (
    <section id="portfolio" className="py-20 px-4 bg-emerald-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-900 dark:text-white">Case Study</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          See how our solutions make a real business impact
        </p>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-emerald-200 dark:border-emerald-900">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="mb-4 inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-400 rounded-full text-sm font-medium">
                Success Story
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {description}
              </p>
              <ul className="space-y-3 mb-6">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">{feature.text}</span>
                  </li>
                ))}
              </ul>
              <Link href={linkUrl}>
                <button className="inline-flex items-center space-x-2 bg-emerald-600 dark:bg-emerald-700 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors">
                  <span>View Case Study</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
            <img
              src={imageUrl}
              alt={title}
              className="rounded-lg shadow-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
