'use client';

import { useState } from 'react';
import Link from 'next/link';
import { COMPANY_NAME } from '@/lib/constants';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '../theme';
import { useTheme } from 'next-themes';

interface NavItem {
  label: string;
  href?: string;
  onClick?: () => void;
  children?: NavItem[];
}

interface NavigationProps {
  onScrollToSection?: (sectionId: string) => void;
  logo?: React.ReactNode;
  className?: string;
}

export const Navigation = ({ 
  onScrollToSection, 
  logo, 
  className 
}: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';

  const navItems: NavItem[] = [
    {
      label: 'Services',
      children: [
        { label: 'HMI Development', href: '/services/hmi-development' },
        { label: 'Firmware Engineering', href: '/services/embedded-firmware' },
        { label: 'Hardware Design', href: '/services/embedded-systems-design' }
      ]
    },
    {
      label: 'Products',
      children: [
        { label: 'ParcelPoint', href: '/parcelpoint' }
      ]
    },
    {
      label: 'Case Studies',
      children: [
        { label: 'ParcelPoint', href: '/case-studies/parcelpoint' },
        { label: 'View All', onClick: () => onScrollToSection?.('portfolio') }
      ]
    },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', onClick: () => onScrollToSection?.('contact') }
  ];

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <header className={cn(
      "fixed w-full z-50 border-b",
      "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-gray-200 dark:border-gray-800",
      className
    )}>
      <nav className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            {logo || (
              <>
                <img
                  src="/images/squared/squared_computing_dark.png"
                  alt="Squared Computing Logo"
                  className="h-9 w-auto dark:hidden transition-transform group-hover:scale-105"
                />
                <img
                  src="/images/squared/squared_computing_light.png"
                  alt="Squared Computing Logo"
                  className="h-9 w-auto hidden dark:block transition-transform group-hover:scale-105"
                />
              </>
            )}
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {COMPANY_NAME}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.children ? (
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className="flex items-center px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {item.label}
                    <ChevronDown className="ml-1.5 h-4 w-4" />
                  </button>
                ) : item.href ? (
                  <Link
                    href={item.href}
                    className="block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={item.onClick}
                    className="block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {item.label}
                  </button>
                )}

                {/* Dropdown Menu */}
                {item.children && (
                  <div className="absolute left-0 mt-2 w-56 py-2 rounded-xl shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    {item.children.map((child) => (
                      child.href ? (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-500 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ) : (
                        <button
                          key={child.label}
                          onClick={child.onClick}
                          className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-500 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                        >
                          {child.label}
                        </button>
                      )
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Theme Toggle - Desktop */}
            <div className="ml-3">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Section */}
          <div className="md:hidden flex items-center">
            {/* Theme Toggle - Mobile */}
            <ThemeToggle />
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-2 p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-white hover:bg-emerald-50 dark:hover:bg-gray-800"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className="flex items-center justify-between w-full px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-white hover:bg-emerald-50 dark:hover:bg-gray-800"
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          activeDropdown === item.label ? "rotate-180" : ""
                        )}
                      />
                    </button>
                    {activeDropdown === item.label && (
                      <div className="pl-4">
                        {item.children.map((child) => (
                          child.href ? (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="block px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-white hover:bg-emerald-50 dark:hover:bg-gray-800"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ) : (
                            <button
                              key={child.label}
                              onClick={() => {
                                child.onClick?.();
                                setIsMenuOpen(false);
                              }}
                              className="block w-full text-left px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-white hover:bg-emerald-50 dark:hover:bg-gray-800"
                            >
                              {child.label}
                            </button>
                          )
                        ))}
                      </div>
                    )}
                  </>
                ) : item.href ? (
                  <Link
                    href={item.href}
                    className="block px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-white hover:bg-emerald-50 dark:hover:bg-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      item.onClick?.();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-white hover:bg-emerald-50 dark:hover:bg-gray-800"
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export type { NavItem, NavigationProps };