'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { COMPANY_NAME } from '@/lib/constants';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '../ThemeToggle';
import { useTheme } from 'next-themes';

interface NavItem {
  label: string;
  href?: string;
  sectionId?: string;
  children?: NavItem[];
}

interface HeaderProps {
  logo?: React.ReactNode;
  className?: string;
}

export const Header = ({ logo, className }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const navItems: NavItem[] = [
    {
      label: 'Services',
      children: [
        { label: 'Hardware Design', sectionId: 'services' },
        { label: 'Firmware Development', sectionId: 'services' },
        { label: 'IoT Solutions', sectionId: 'services' },
        { label: 'Qt Development', sectionId: 'services' }
      ]
    },
    {
      label: 'Solutions',
      children: [
        { label: 'Embedded Systems', sectionId: 'expertise' },
        { label: 'Custom Electronics', sectionId: 'expertise' },
        { label: 'Industrial IoT', sectionId: 'expertise' },
        { label: 'Prototyping', sectionId: 'expertise' }
      ]
    },
    { 
      label: 'Products', 
      children: [
        { label: 'ParcelPoint', href: '/parcelpoint' }
      ]
    },
    { 
      label: 'Blog', 
      children: [
        { label: 'All Posts', href: '/blog' },
        { label: 'Archives', href: '/blog/archives' },
        { label: 'Categories', href: '/blog/categories' }
      ]
    },
    { label: 'Contact', sectionId: 'contact' }
  ];

  // Handle navigation - either scroll to section on home page or navigate to home page with section
  const handleNavigation = (item: NavItem) => {
    if (item.href) {
      // Direct link navigation
      router.push(item.href);
      setIsMenuOpen(false);
      return;
    }

    if (item.sectionId) {
      if (isHomePage) {
        // On home page - scroll to section
        const element = document.getElementById(item.sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // On other pages - navigate to home page with hash
        router.push(`/#${item.sectionId}`);
      }
      setIsMenuOpen(false);
    }
  };

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const renderNavItem = (item: NavItem, isMobile = false) => {
    if (item.children) {
      return (
        <div key={item.label} className={isMobile ? "" : "relative group"}>
          <button
            onClick={() => isMobile ? toggleDropdown(item.label) : undefined}
            className={cn(
              "flex items-center px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-white hover:bg-emerald-50 dark:hover:bg-gray-800",
              isMobile ? "justify-between w-full" : ""
            )}
          >
            {item.label}
            <ChevronDown className={cn(
              "ml-1 h-4 w-4",
              isMobile && activeDropdown === item.label ? "rotate-180" : "",
              isMobile ? "transition-transform" : ""
            )} />
          </button>

          {/* Desktop Dropdown */}
          {!isMobile && (
            <div className="absolute left-0 mt-1 w-48 py-2 rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white dark:bg-gray-900 border-emerald-100 dark:border-gray-800">
              {item.children.map((child) => (
                child.href ? (
                  <Link
                    key={child.label}
                    href={child.href}
                    className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-white hover:bg-emerald-50 dark:hover:bg-gray-800"
                  >
                    {child.label}
                  </Link>
                ) : (
                  <button
                    key={child.label}
                    onClick={() => handleNavigation(child)}
                    className="block w-full text-left px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-white hover:bg-emerald-50 dark:hover:bg-gray-800"
                  >
                    {child.label}
                  </button>
                )
              ))}
            </div>
          )}

          {/* Mobile Dropdown */}
          {isMobile && activeDropdown === item.label && (
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
                    onClick={() => handleNavigation(child)}
                    className="block w-full text-left px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-white hover:bg-emerald-50 dark:hover:bg-gray-800"
                  >
                    {child.label}
                  </button>
                )
              ))}
            </div>
          )}
        </div>
      );
    }

    // Single nav item (no children)
    return item.href ? (
      <Link
        key={item.label}
        href={item.href}
        className="block px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-white hover:bg-emerald-50 dark:hover:bg-gray-800"
        onClick={() => isMobile && setIsMenuOpen(false)}
      >
        {item.label}
      </Link>
    ) : (
      <button
        key={item.label}
        onClick={() => handleNavigation(item)}
        className={cn(
          "px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-white hover:bg-emerald-50 dark:hover:bg-gray-800",
          isMobile ? "block w-full text-left" : "block"
        )}
      >
        {item.label}
      </button>
    );
  };

  return (
    <header className={cn(
      "fixed w-full z-50 border-b",
      "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-emerald-100 dark:border-gray-800",
      className
    )}>
      <nav className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            {logo || (
              <>
                <img
                  src="/images/squared/squared_computing_dark.png"
                  alt="Squared Computing Logo"
                  className="h-8 w-auto dark:hidden"
                />
                <img
                  src="/images/squared/squared_computing_light.png"
                  alt="Squared Computing Logo"
                  className="h-8 w-auto hidden dark:block"
                />
              </>
            )}
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              {COMPANY_NAME}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => renderNavItem(item, false))}
            
            {/* Theme Toggle - Desktop */}
            <div className="ml-2">
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
            {navItems.map((item) => renderNavItem(item, true))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;