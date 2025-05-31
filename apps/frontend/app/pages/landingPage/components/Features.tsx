"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Globe, Shield, Clock, Zap, AArrowDown as CPU, Check } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Why Choose Net-Sentinel?
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Our decentralized network provides reliable monitoring free from single points of failure.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Globe className="w-6 h-6" />}
            title="Global Coverage"
            description="Monitor from hundreds of nodes distributed across the globe for true worldwide coverage."
            index={0}
          />
          <FeatureCard 
            icon={<Shield className="w-6 h-6" />}
            title="Trustless Verification"
            description="Multiple independent nodes verify each status, eliminating false positives."
            index={1}
          />
          <FeatureCard 
            icon={<Clock className="w-6 h-6" />}
            title="Real-time Alerts"
            description="Get instant notifications through multiple channels when issues are detected."
            index={2}
          />
          <FeatureCard 
            icon={<Zap className="w-6 h-6" />}
            title="Lightning Fast"
            description="Our optimized monitoring stack detects issues in milliseconds, not minutes."
            index={3}
          />
          <FeatureCard 
            icon={<CPU className="w-6 h-6" />}
            title="Smart Monitoring"
            description="AI-powered analysis to distinguish between real outages and network glitches."
            index={4}
          />
          <FeatureCard 
            icon={<Check className="w-6 h-6" />}
            title="99.9% SLA"
            description="We guarantee our monitoring service with industry-leading SLAs."
            index={5}
          />
        </div>
        
        <FeatureShowcase />
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
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
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <div 
      ref={ref}
      className={`bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-md transition-all duration-700 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
        <div className="text-blue-600 dark:text-blue-400">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
};

const FeatureShowcase: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
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
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <div 
      ref={ref}
      className={`mt-24 bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
    >
      <div className="p-6 md:p-8 md:flex items-center">
        <div className="md:w-1/2 md:pr-8 mb-6 md:mb-0">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Global Monitoring Network
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Our decentralized monitoring network spans across 6 continents with over 200 independent nodes, providing the most reliable uptime monitoring available.
          </p>
          <ul className="space-y-3">
            {[
              'Multiple verification points', 
              'Consensus-based alerting', 
              'Regional performance metrics', 
              'No central point of failure'
            ].map((item, index) => (
              <li 
                key={index} 
                className="flex items-center text-gray-700 dark:text-gray-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <span className="mr-2 text-green-500 dark:text-green-400">
                  <Check className="w-5 h-5" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="md:w-1/2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-inner p-4">
            {/* World map with monitoring points */}
            <div className="aspect-video relative bg-gray-100 dark:bg-gray-900 rounded overflow-hidden">
              <div className="absolute inset-0 opacity-20 dark:opacity-40">
                {/* Simplified world map background */}
                <div className="absolute w-full h-full bg-blue-500 opacity-10"></div>
                <div className="absolute w-3/4 h-1/2 top-1/4 left-1/8 bg-gray-500 opacity-20 rounded-full"></div>
                <div className="absolute w-1/2 h-1/3 top-1/3 left-1/4 bg-gray-600 opacity-20 rounded-full"></div>
              </div>
              
              {/* Monitoring nodes (dots) */}
              {Array.from({ length: 24 }).map((_, i) => {
                const top = 20 + Math.random() * 60;
                const left = 10 + Math.random() * 80;
                const size = 2 + Math.random() * 4;
                const delay = Math.random() * 5;
                
                return (
                  <div
                    key={i}
                    className="absolute rounded-full bg-blue-500 dark:bg-blue-400"
                    style={{
                      top: `${top}%`,
                      left: `${left}%`,
                      width: `${size}px`,
                      height: `${size}px`,
                      animation: `pulse 2s infinite ${delay}s`
                    }}
                  ></div>
                );
              })}
              
              {/* Connection lines */}
              {Array.from({ length: 12 }).map((_, i) => {
                const startTop = 20 + Math.random() * 60;
                const startLeft = 10 + Math.random() * 80;
                const endTop = 20 + Math.random() * 60;
                const endLeft = 10 + Math.random() * 80;
                const delay = Math.random() * 3;
                
                return (
                  <div
                    key={`line-${i}`}
                    className="absolute bg-blue-400 dark:bg-blue-500 opacity-30 h-px"
                    style={{
                      top: `${startTop}%`,
                      left: `${startLeft}%`,
                      width: `${Math.hypot(endLeft - startLeft, endTop - startTop)}%`,
                      transform: `rotate(${Math.atan2(endTop - startTop, endLeft - startLeft) * 180 / Math.PI}deg)`,
                      transformOrigin: 'left center',
                      animation: `fadeInOut 4s infinite ${delay}s`
                    }}
                  ></div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;