"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs: FAQItem[] = [
    {
      question: "How does decentralized monitoring work?",
      answer: "Our platform uses a network of independent monitoring nodes distributed across the globe. When you add a service to monitor, multiple nodes check its status independently. This eliminates false positives because an outage is only reported when confirmed by multiple nodes, giving you reliable uptime data."
    },
    {
      question: "How many locations do you monitor from?",
      answer: "We currently monitor from over 200 independent nodes across 35 countries and 6 continents. This gives you comprehensive global coverage, allowing you to understand how your services perform in different regions."
    },
    {
      question: "What types of services can I monitor?",
      answer: "You can monitor websites, APIs, servers, databases, and any internet-accessible endpoint. We support HTTP/HTTPS, TCP, ICMP, UDP, and custom protocol checks. Our platform can also verify content, check SSL certificates, and monitor complex multi-step processes."
    },
    {
      question: "How quickly will I be notified of an outage?",
      answer: "Depending on your plan, we offer checks as frequent as every 5 seconds. Alerts are typically sent within 30 seconds of an outage being confirmed by multiple nodes, ensuring rapid response to genuine issues while avoiding false alarms."
    },
    {
      question: "What alert channels do you support?",
      answer: "We support email, SMS, push notifications, webhooks, Slack, Microsoft Teams, Discord, PagerDuty, OpsGenie, and custom integrations. You can set up different notification policies for different services or times of day."
    },
    {
      question: "Can I get historical uptime data?",
      answer: "Yes, all plans include historical uptime data. Professional and Enterprise plans offer extended history retention and detailed analytics. You can export reports or access the data through our API."
    },
    {
      question: "Is Net Sentinel suitable for enterprise use cases?",
      answer: "Absolutely. Our Enterprise plan includes dedicated support, custom SLAs, extended retention, and advanced features like custom monitoring nodes, private network monitoring, and guaranteed uptime for the monitoring platform itself."
    },
    {
      question: "How does your pricing work?",
      answer: "Our pricing is based on the number of endpoints monitored, check frequency, and features needed. We offer monthly and annual billing options, with discounts for annual commitments. All plans include our core decentralized monitoring technology."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Everything you need to know about Net Sentinel
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`border rounded-lg transition-all duration-300 ${
                openIndex === index 
                  ? 'border-blue-300 dark:border-blue-700 shadow-md' 
                  : 'border-gray-200 dark:border-gray-800'
              }`}
            >
              <button
                className="flex justify-between items-center w-full px-6 py-4 text-left"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  {faq.question}
                </span>
                <span className="ml-6 flex-shrink-0 text-gray-500 dark:text-gray-400">
                  {openIndex === index ? (
                    <ChevronUp className="h-6 w-6" />
                  ) : (
                    <ChevronDown className="h-6 w-6" />
                  )}
                </span>
              </button>
              <div 
                className={`transition-all duration-300 overflow-hidden ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-4 text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Still have questions?
          </p>
          <a
            href="/pages/contactUs"
            className="inline-block px-6 py-3 rounded-md font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;