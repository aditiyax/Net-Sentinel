"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  content: string;
  author: {
    name: string;
    role: string;
    company: string;
    image: string;
  };
}

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      content:
        "NetSentinel's decentralized monitoring has transformed how we monitor our global infrastructure. We've eliminated false positives and gained insights we never had before.",
      author: {
        name: "Sarah Johnson",
        role: "CTO",
        company: "TechNova Inc.",
        image:
          "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
    },
    {
      id: 2,
      content:
        "The distributed monitoring approach provides us with confidence that our services are truly up. No more worrying about the monitoring system itself being a point of failure.",
      author: {
        name: "Michael Rodriguez",
        role: "DevOps Lead",
        company: "CloudSphere",
        image:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
    },
    {
      id: 3,
      content:
        "We've been able to improve our SLAs by 15% since switching to NetSentinel. The real-time alerts and global coverage have been game-changing for our operations.",
      author: {
        name: "Emily Chen",
        role: "Engineering Director",
        company: "Quantum Software",
        image:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
    },
    {
      id: 4,
      content:
        "As a fintech company, reliability is non-negotiable. NetSentinel's consensus-based monitoring has virtually eliminated all false alarms we used to get with our previous provider.",
      author: {
        name: "David Wilson",
        role: "VP of Engineering",
        company: "FinanceFlow",
        image:
          "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const maxVisibleItems = 2;
  const totalPages = Math.ceil(testimonials.length / maxVisibleItems);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (testimonialsRef.current) {
      observer.observe(testimonialsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        nextTestimonial();
      }, 6000);

      return () => clearInterval(interval);
    }
  }, [isVisible, activeIndex]);

  const visibleTestimonials = testimonials.slice(
    activeIndex * maxVisibleItems,
    Math.min((activeIndex + 1) * maxVisibleItems, testimonials.length)
  );

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div
        ref={testimonialsRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Join hundreds of companies that trust Net Sentinel for their
            mission-critical monitoring
          </p>
        </div>

        <div
          className={`relative transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-500 transform ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                <blockquote>
                  <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    "{testimonial.content}"
                  </div>
                  <footer className="mt-6 flex items-center">
                    <img
                      src={testimonial.author.image}
                      alt={testimonial.author.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {testimonial.author.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.author.role}, {testimonial.author.company}
                      </div>
                    </div>
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                  activeIndex === index
                    ? "bg-blue-600 dark:bg-blue-500"
                    : "bg-gray-300 dark:bg-gray-700"
                }`}
                aria-label={`Go to testimonial page ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrow Navigation (Desktop) */}
          <div className="hidden md:block">
            <button
              onClick={prevTestimonial}
              className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Logos */}
        {/* Logos */}
        <div className="mt-16">
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
            Trusted by industry-leading companies
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {[
              { name: "Techspire", logo: "🌀" },
              { name: "NovaEdge", logo: "✨" },
              { name: "Cloudnetic", logo: "☁️" },
              { name: "ByteBridge", logo: "🧱" },
              { name: "QuantaSoft", logo: "🔬" },
              { name: "Zentrix Labs", logo: "🧠" },
            ].map((company, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center text-center filter grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              >
                <div className="text-3xl mb-1">{company.logo}</div>
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  {company.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
