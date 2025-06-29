"use client";
import React, { useState } from 'react';
import { 
  Building2, 
  Mail, 
  Phone, 
  Calendar, 
  MessageSquare,
  Github,
  Twitter,
  Linkedin,
  Globe,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<string>('general');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    // Handle form submission logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-500/10 to-transparent">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Let's Build Something Great Together
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Whether you're an enterprise looking for custom solutions or have general questions,
            our team is here to help you succeed.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Enterprise Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 mb-12">
          <div className="flex items-start space-x-6">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Building2 className="w-8 h-8 text-blue-500" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Enterprise Solutions
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Get a custom-tailored monitoring solution for your enterprise. Our dedicated team will work
                with you to create the perfect setup for your specific needs.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <FeatureCard
                  title="Custom Features"
                  description="Tailored monitoring solutions specific to your infrastructure"
                />
                <FeatureCard
                  title="Dedicated Support"
                  description="24/7 priority support from our expert team"
                />
                <FeatureCard
                  title="Advanced Analytics"
                  description="Deep insights and custom reporting capabilities"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Get in Touch
            </h2>
            
            {formSubmitted ? (
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Thank you for reaching out!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Type of Inquiry
                  </label>
                  <select
                    value={selectedInquiry}
                    onChange={(e) => setSelectedInquiry(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="general">General Question</option>
                    <option value="enterprise">Enterprise Inquiry</option>
                    <option value="demo">Schedule a Demo</option>
                    <option value="support">Technical Support</option>
                  </select>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors duration-200"
                >
                  Send Message
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </form>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Other Ways to Connect
            </h2>
            
            <div className="space-y-6">
              <ContactCard
                icon={<Calendar className="w-6 h-6 text-purple-500" />}
                title="Schedule a Demo"
                description="See our platform in action with a personalized demo"
                action="Book Now"
                onClick={() => setSelectedInquiry('demo')}
              />
              
              <ContactCard
                icon={<Phone className="w-6 h-6 text-green-500" />}
                title="Sales Inquiries"
                description="Talk to our sales team about enterprise solutions"
                action="Call Sales"
                onClick={() => {}}
              />
              
              <ContactCard
                icon={<MessageSquare className="w-6 h-6 text-blue-500" />}
                title="Technical Support"
                description="Get help from our technical support team"
                action="Open Ticket"
                onClick={() => setSelectedInquiry('support')}
              />
            </div>

            {/* Social Links */}
            <div className="mt-12">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <SocialLink icon={<Twitter />} href="#" label="Twitter" />
                <SocialLink icon={<Linkedin />} href="#" label="LinkedIn" />
                <SocialLink icon={<Github />} href="#" label="GitHub" />
                <SocialLink icon={<Globe />} href="#" label="Blog" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => {
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
};

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  onClick: () => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ icon, title, description, action, onClick }) => {
  return (
    <div className="flex items-start space-x-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-3">{description}</p>
        <button
          onClick={onClick}
          className="text-blue-500 hover:text-blue-600 font-medium flex items-center"
        >
          {action}
          <ArrowRight className="ml-1 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

interface SocialLinkProps {
  icon: React.ReactNode;
  href: string;
  label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ icon, href, label }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
      aria-label={label}
    >
      {icon}
    </a>
  );
};

export default ContactPage;