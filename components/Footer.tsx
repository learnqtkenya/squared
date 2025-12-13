import { CircuitBoard } from 'lucide-react';
import { COMPANY_NAME, COMPANY_DESCRIPTION } from '@/lib/constants';
import Link from 'next/link';

interface FooterLink {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  sections?: FooterSection[];
  contactEmail?: string;
  contactLocation?: string;
  className?: string;
}

const defaultSections: FooterSection[] = [
  {
    title: 'Services',
    links: [
      { label: 'Custom Firmware' },
      { label: 'Consulting' },
      { label: 'System Integration' }
    ]
  },
  {
    title: 'Products',
    links: [
      { label: 'Parcel Point', href: '/parcelpoint' }
    ]
  }
];

export const Footer = ({
  sections = defaultSections,
  contactEmail = 'hello@squared.co.ke',
  contactLocation = 'Nairobi, Kenya',
  className = ''
}: FooterProps) => {
  return (
    <footer className={`bg-gray-50 dark:bg-gray-950 text-gray-600 dark:text-gray-400 py-16 px-4 border-t border-gray-200 dark:border-gray-800 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <CircuitBoard className="h-7 w-7 text-emerald-600 dark:text-emerald-500" />
              <span className="font-bold text-lg text-gray-900 dark:text-white">{COMPANY_NAME}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {COMPANY_DESCRIPTION}
            </p>
          </div>

          {/* Dynamic Sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="font-bold mb-4 text-gray-900 dark:text-white">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <Link
                        href={link.href}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <button
                        onClick={link.onClick}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors"
                      >
                        {link.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4 text-gray-900 dark:text-white">Contact</h4>
            <ul className="space-y-3">
              <li className="break-words text-sm text-gray-600 dark:text-gray-400">{contactEmail}</li>
              <li className="text-sm text-gray-600 dark:text-gray-400">{contactLocation}</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export type { FooterSection, FooterLink, FooterProps };