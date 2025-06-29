"use client";
import React, { useEffect, useState } from 'react';
import { Activity, Shield, BarChart } from 'lucide-react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 -z-10"></div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <div 
            className={`md:w-1/2 mb-12 md:mb-0 transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Decentralized <span className="text-blue-600 dark:text-blue-400">Uptime</span> Monitoring
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
              Monitor your services from multiple locations worldwide with our trustless, decentralized monitoring network.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a 
                href="/pages/authPage" 
                className="px-8 py-3 text-base font-medium rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 shadow-md hover:shadow-lg text-center"
              >
                Start Monitoring
              </a>
              <a 
                href="#how-it-works" 
                className="px-8 py-3 text-base font-medium rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 text-center"
              >
                Learn More
              </a>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">99.9%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">200+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Nodes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">24/7</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Monitoring</div>
              </div>
            </div>
          </div>
          
          {/* Hero Image/Animation */}
          <div 
            className={`md:w-1/2 transition-all duration-1000 delay-300 transform ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="relative">
              {/* Dashboard Mockup */}
              <div className="rounded-lg shadow-xl bg-white dark:bg-gray-800 p-4 md:p-6">
                <div className="mb-4 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Service Status</h3>
                  <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded-full flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                    All Systems Operational
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Animated status items */}
                  {['API Service', 'Web Frontend', 'Database Cluster', 'Auth Service'].map((service, index) => (
                    <StatusItem 
                      key={service}
                      name={service}
                      status="operational"
                      delay={index * 0.2}
                    />
                  ))}
                </div>
                
                {/* Activity Graph */}
                <div className="mt-6">
                  <div className="h-24 bg-gray-50 dark:bg-gray-900 rounded overflow-hidden">
                    <div className="flex items-end h-full px-2">
                      {[35, 45, 55, 40, 50, 65, 70, 60, 75, 80, 65, 70].map((height, i) => (
                        <div 
                          key={i}
                          className="w-full bg-blue-500 dark:bg-blue-600 rounded-t mx-px"
                          style={{ 
                            height: `${height}%`,
                            animation: `growUp 2s ease-out ${i * 0.1}s forwards`
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <FloatingIcon 
                icon={<Activity className="w-6 h-6 text-blue-500" />} 
                className="absolute -top-4 -left-4 bg-white dark:bg-gray-800"
                delay={0.5}
              />
              <FloatingIcon 
                icon={<Shield className="w-6 h-6 text-green-500" />} 
                className="absolute top-1/4 -right-4 bg-white dark:bg-gray-800"
                delay={0.7}
              />
              <FloatingIcon 
                icon={<BarChart className="w-6 h-6 text-purple-500" />} 
                className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800"
                delay={0.9}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface StatusItemProps {
  name: string;
  status: 'operational' | 'degraded' | 'down';
  delay: number;
}

const StatusItem: React.FC<StatusItemProps> = ({ name, status, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);
  
  const statusColor = 
    status === 'operational' ? 'bg-green-500' :
    status === 'degraded' ? 'bg-yellow-500' : 'bg-red-500';
  
  return (
    <div 
      className={`flex justify-between items-center p-3 rounded-md bg-gray-50 dark:bg-gray-900 transition-all duration-500 transform ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
      }`}
    >
      <span className="text-gray-800 dark:text-gray-200">{name}</span>
      <div className="flex items-center">
        <span className={`w-2 h-2 ${statusColor} rounded-full mr-2`}></span>
        <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">{status}</span>
      </div>
    </div>
  );
};

interface FloatingIconProps {
  icon: React.ReactNode;
  className: string;
  delay: number;
}

const FloatingIcon: React.FC<FloatingIconProps> = ({ icon, className, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div 
      className={`${className} p-3 rounded-full shadow-lg transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
      }`}
      style={{ animation: `float 3s ease-in-out ${delay}s infinite alternate` }}
    >
      {icon}
    </div>
  );
};

export default Hero;