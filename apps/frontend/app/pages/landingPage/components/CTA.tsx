"use client";
import React from 'react';
import { ArrowRight } from 'lucide-react';

const CTA: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to experience reliable uptime monitoring?
        </h2>
        <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
          Join hundreds of companies who trust Net Sentinel to keep their services running smoothly.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <a 
            href="/pages/authPage" 
            className="px-8 py-4 text-lg font-medium rounded-md bg-white text-blue-700 hover:bg-gray-100 transition-colors duration-200 shadow-md hover:shadow-lg inline-flex items-center justify-center"
          >
            Start Your Free Trial
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
          <a 
            href="/pages/contactUs" 
            className="px-8 py-4 text-lg font-medium rounded-md border-2 border-white text-white hover:bg-white/10 transition-colors duration-200 inline-flex items-center justify-center"
          >
            Schedule a Demo
          </a>
        </div>
        
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { metric: '99.9%', label: 'Accuracy' },
            { metric: '200+', label: 'Monitoring Nodes' },
            { metric: '5 Sec', label: 'Check Frequency' },
            { metric: '24/7', label: 'Support' },
          ].map((item, index) => (
            <div key={index} className="bg-white/10 rounded-lg px-4 py-6">
              <div className="text-2xl md:text-3xl font-bold text-white">{item.metric}</div>
              <div className="text-sm text-blue-100">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTA;