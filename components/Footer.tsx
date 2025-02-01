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
    <footer className={`bg-white text-gray-600 py-12 px-4 border-t border-emerald-100 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <CircuitBoard className="h-6 w-6 text-emerald-600" />
              <span className="font-bold text-gray-800">{COMPANY_NAME}</span>
            </div>
            <p className="text-gray-600">
              {COMPANY_DESCRIPTION}
            </p>
          </div>

          {/* Dynamic Sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4 text-gray-800">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <Link 
                        href={link.href}
                        className="hover:text-emerald-600 transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <button
                        onClick={link.onClick}
                        className="hover:text-emerald-600 transition-colors"
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
            <h4 className="font-semibold mb-4 text-gray-800">Contact</h4>
            <ul className="space-y-2">
              <li className="break-words">{contactEmail}</li>
              <li>{contactLocation}</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-emerald-100 mt-12 pt-8 text-center text-gray-600">
          <p>© {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export type { FooterSection, FooterLink, FooterProps };