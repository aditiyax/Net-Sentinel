"use client";
import React from 'react';
import { Activity, ChevronRight, Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';
import { useTheme } from 'next-themes';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <Activity className="h-8 w-8 text-blue-400 mr-2" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
                Net Sentinel
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              The most reliable decentralized monitoring platform for your websites, APIs, and services. Get accurate alerts with no false positives.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={<Facebook className="h-5 w-5" />} />
              <SocialLink href="#" icon={<Twitter className="h-5 w-5" />} />
              <SocialLink href="#" icon={<Linkedin className="h-5 w-5" />} />
              <SocialLink href="#" icon={<Github className="h-5 w-5" />} />
              <SocialLink href="#" icon={<Instagram className="h-5 w-5" />} />
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <FooterLink href="#features">Features</FooterLink>
              <FooterLink href="#pricing">Pricing</FooterLink>
              <FooterLink href="#">API Documentation</FooterLink>
              <FooterLink href="#">Status Page</FooterLink>
              <FooterLink href="#">Integrations</FooterLink>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <FooterLink href="#">About Us</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Blog</FooterLink>
              <FooterLink href="#">Press</FooterLink>
              <FooterLink href="#">Partners</FooterLink>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <FooterLink href="#">Help Center</FooterLink>
              <FooterLink href="#">Contact Us</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms of Service</FooterLink>
              <FooterLink href="#">FAQ</FooterLink>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Net Sentinel. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex items-center text-sm text-gray-400">
              <span className="flex items-center mr-4">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                All Systems Operational
              </span>
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                Status Page
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon }) => {
  return (
    <a
      href={href}
      className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  );
};

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => {
  return (
    <li>
      <a 
        href={href} 
        className="text-gray-400 hover:text-white transition-colors flex items-center group"
      >
        <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
        {children}
      </a>
    </li>
  );
};

export default Footer;