"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";

interface PricingTier {
  name: string;
  description: string;
  price: string;
  frequency: string;
  featured: boolean;
  features: Array<{
    name: string;
    included: boolean;
  }>;
  cta: string;
}

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const tiers: PricingTier[] = [
    {
      name: "Starter",
      description: "Perfect for small websites and personal projects",
      price: billingCycle === "monthly" ? "$29" : "$290",
      frequency: billingCycle === "monthly" ? "/month" : "/year",
      featured: false,
      features: [
        { name: "5 Monitored URLs", included: true },
        { name: "30 Second Checks", included: true },
        { name: "Email Alerts", included: true },
        { name: "10 Global Monitoring Nodes", included: true },
        { name: "Slack Integrations", included: false },
        { name: "24/7 Support", included: false },
        { name: "API Access", included: false },
        { name: "Custom Checks", included: false },
      ],
      cta: "Get Started",
    },
    {
      name: "Professional",
      description: "Ideal for businesses and important services",
      price: billingCycle === "monthly" ? "$99" : "$990",
      frequency: billingCycle === "monthly" ? "/month" : "/year",
      featured: true,
      features: [
        { name: "25 Monitored URLs", included: true },
        { name: "10 Second Checks", included: true },
        { name: "Email & SMS Alerts", included: true },
        { name: "50 Global Monitoring Nodes", included: true },
        { name: "Slack & Teams Integrations", included: true },
        { name: "24/7 Support", included: true },
        { name: "API Access", included: true },
        { name: "Custom Checks", included: false },
      ],
      cta: "Get Started",
    },
    {
      name: "Enterprise",
      description: "For mission-critical applications and services",
      price: billingCycle === "monthly" ? "$299" : "$2990",
      frequency: billingCycle === "monthly" ? "/month" : "/year",
      featured: false,
      features: [
        { name: "Unlimited Monitored URLs", included: true },
        { name: "5 Second Checks", included: true },
        { name: "All Alert Channels", included: true },
        { name: "200+ Global Monitoring Nodes", included: true },
        { name: "All Integrations", included: true },
        { name: "Priority 24/7 Support", included: true },
        { name: "Advanced API Access", included: true },
        { name: "Custom Checks", included: true },
      ],
      cta: "Contact Sales",
    },
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Pricing Plans
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Choose the perfect plan for your monitoring needs
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 flex justify-center">
            <div className="relative bg-gray-100 dark:bg-gray-800 p-1 rounded-full inline-flex">
              <button
                type="button"
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  billingCycle === "monthly"
                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
                onClick={() => setBillingCycle("monthly")}
              >
                Monthly
              </button>
              <button
                type="button"
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  billingCycle === "yearly"
                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
                onClick={() => setBillingCycle("yearly")}
              >
                Yearly
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  -17%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl border ${
                tier.featured
                  ? "border-blue-600 dark:border-blue-500 shadow-xl"
                  : "border-gray-200 dark:border-gray-800 shadow-md"
              } overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1`}
            >
              {tier.featured && (
                <div className="absolute top-0 inset-x-0 bg-blue-600 dark:bg-blue-500 text-white text-xs font-medium px-2 py-1 text-center">
                  Most Popular
                </div>
              )}
              <div className={`p-6 ${tier.featured ? "pt-8" : ""}`}>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{tier.name}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{tier.description}</p>
                <p className="mt-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">{tier.price}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{tier.frequency}</span>
                </p>

                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature.name} className="flex items-start">
                      <div
                        className={`flex-shrink-0 mt-0.5 ${
                          feature.included ? "text-green-500 dark:text-green-400" : "text-gray-400 dark:text-gray-600"
                        }`}
                      >
                        {feature.included ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                      </div>
                      <span
                        className={`ml-2 text-sm ${
                          feature.included ? "text-gray-700 dark:text-gray-300" : "text-gray-500 dark:text-gray-500"
                        }`}
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  {tier.cta === "Contact Sales" ? (
                    <a
                      href="/pages/contactUs"
                      className="block w-full text-center px-4 py-3 rounded-md font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                    >
                      {tier.cta}
                    </a>
                  ) : (
                    <Link
                    href="/pages/authPage"
                    className={`block w-full text-center px-4 py-3 rounded-md font-medium transition-colors ${
                      tier.featured
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                    }`}
                  >
                    {tier.cta}
                  </Link>
                  
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise Contact */}
        <div className="mt-16 bg-gray-50 dark:bg-gray-900 rounded-xl p-6 md:p-8 md:flex items-center shadow-md">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Need a custom solution?</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Our enterprise plans offer custom features, dedicated support, and tailored monitoring solutions for your specific
              requirements.
            </p>
          </div>
          <div className="md:w-1/3 md:text-right">
            <a
              href="/pages/authPage"
              className="inline-block px-6 py-3 rounded-md font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              Contact Our Sales Team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
