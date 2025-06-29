"use client";
import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Server, Globe, Bell, Check } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const steps = [
    {
      title: "Connect Your Endpoints",
      description: "Add your websites, APIs, or services to our platform with a simple URL or IP address.",
      icon: <Globe className="w-6 h-6" />,
    },
    {
      title: "Deploy Monitoring Nodes",
      description: "Our decentralized network automatically assigns monitoring nodes across different regions.",
      icon: <Server className="w-6 h-6" />,
    },
    {
      title: "Real-Time Verification",
      description: "Multiple nodes verify each status to eliminate false positives through consensus.",
      icon: <Check className="w-6 h-6" />,
    },
    {
      title: "Get Instant Alerts",
      description: "Receive notifications via email, Slack, SMS, or webhooks when issues are detected.",
      icon: <Bell className="w-6 h-6" />,
    }
  ];
  
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
  
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 4000);
      
      return () => clearInterval(interval);
    }
  }, [isVisible, steps.length]);

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            How It Works
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Our decentralized approach ensures reliable monitoring with no single point of failure.
          </p>
        </div>
        
        <div 
          ref={ref}
          className="md:flex items-center rounded-xl overflow-hidden shadow-lg"
        >
          {/* Animated Illustration */}
          <div 
            className={`md:w-1/2 bg-white dark:bg-gray-800 p-8 transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
            }`}
          >
            <div className="relative h-64 md:h-80">
              {/* Network Visualization */}
              <div className="absolute inset-0">
                {/* Simulated network of nodes and connections */}
                <div className="relative w-full h-full">
                  {/* Client */}
                  <div className="absolute top-1/2 left-1/6 transform -translate-y-1/2">
                    <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center border-2 border-blue-500 dark:border-blue-400">
                      <div className={`text-blue-600 dark:text-blue-400 transition-opacity duration-500 ${activeStep === 0 ? 'opacity-100' : 'opacity-50'}`}>
                        {steps[0].icon}
                      </div>
                    </div>
                    <div className="mt-2 text-center text-sm font-medium text-gray-900 dark:text-white">
                      You
                    </div>
                  </div>
                  
                  {/* Platform */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center border-2 border-blue-500 dark:border-blue-400">
                      <div className={`text-blue-600 dark:text-blue-400 transition-opacity duration-500 ${activeStep === 1 ? 'opacity-100' : 'opacity-50'}`}>
                        {steps[1].icon}
                      </div>
                    </div>
                    <div className="mt-2 text-center text-sm font-medium text-gray-900 dark:text-white">
                      Net Sentinel
                    </div>
                  </div>
                  
                  {/* Monitoring Nodes */}
                  {Array.from({ length: 5 }).map((_, i) => {
                    const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
                    const radius = 120;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    
                    return (
                      <div 
                        key={i}
                        className="absolute"
                        style={{
                          top: `calc(50% + ${y}px)`,
                          left: `calc(50% + ${x}px)`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        <div 
                          className={`w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center border-2 transition-colors duration-500 ${
                            activeStep === 2 ? 'border-green-500 dark:border-green-400' : 'border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          <div className={`transition-opacity duration-500 ${activeStep === 2 ? 'text-green-600 dark:text-green-400 opacity-100' : 'text-gray-500 dark:text-gray-400 opacity-70'}`}>
                            <Server className="w-5 h-5" />
                          </div>
                        </div>
                        <div className="mt-1 text-center text-xs font-medium text-gray-700 dark:text-gray-300">
                          Node {i+1}
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Client Notification */}
                  <div className="absolute top-1/2 left-5/6 transform -translate-y-1/2">
                    <div className={`w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center border-2 transition-colors duration-500 ${
                      activeStep === 3 ? 'border-blue-500 dark:border-blue-400' : 'border-gray-300 dark:border-gray-600'
                    }`}>
                      <div className={`transition-opacity duration-500 ${activeStep === 3 ? 'text-blue-600 dark:text-blue-400 opacity-100' : 'text-gray-500 dark:text-gray-400 opacity-70'}`}>
                        {steps[3].icon}
                      </div>
                    </div>
                    <div className="mt-2 text-center text-sm font-medium text-gray-900 dark:text-white">
                      Alerts
                    </div>
                  </div>
                  
                  {/* Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full">
                    {/* Client to Platform */}
                    <line 
                      x1="16.67%" y1="50%" 
                      x2="50%" y2="50%" 
                      className={`stroke-2 transition-all duration-500 ${activeStep >= 0 ? 'stroke-blue-500 dark:stroke-blue-400' : 'stroke-gray-300 dark:stroke-gray-700'}`}
                      strokeDasharray="5,5"
                      style={{
                        animation: activeStep === 0 ? 'dashMove 1s linear infinite' : 'none'
                      }}
                    />
                    
                    {/* Platform to Nodes */}
                    {Array.from({ length: 5 }).map((_, i) => {
                      const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
                      const innerRadius = 0;
                      const outerRadius = 120;
                      const x1 = 50 + innerRadius * Math.cos(angle);
                      const y1 = 50 + innerRadius * Math.sin(angle);
                      const x2 = 50 + outerRadius * Math.cos(angle);
                      const y2 = 50 + outerRadius * Math.sin(angle);
                      
                      return (
                        <line 
                          key={i}
                          x1={`${x1}%`} y1={`${y1}%`}
                          x2={`${x2}%`} y2={`${y2}%`}
                          className={`stroke-2 transition-all duration-500 ${activeStep >= 1 ? 'stroke-blue-500 dark:stroke-blue-400' : 'stroke-gray-300 dark:stroke-gray-700'}`}
                          strokeDasharray="5,5"
                          style={{
                            animation: activeStep === 1 ? `dashMove 1s linear infinite ${i * 0.2}s` : 'none'
                          }}
                        />
                      );
                    })}
                    
                    {/* Nodes to Platform (Verification) */}
                    {Array.from({ length: 5 }).map((_, i) => {
                      const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
                      const innerRadius = 0;
                      const outerRadius = 120;
                      const x1 = 50 + innerRadius * Math.cos(angle);
                      const y1 = 50 + innerRadius * Math.sin(angle);
                      const x2 = 50 + outerRadius * Math.cos(angle);
                      const y2 = 50 + outerRadius * Math.sin(angle);
                      
                      return (
                        <line 
                          key={`back-${i}`}
                          x1={`${x2}%`} y1={`${y2}%`}
                          x2={`${x1}%`} y2={`${y1}%`}
                          className={`stroke-2 transition-all duration-500 ${activeStep >= 2 ? 'stroke-green-500 dark:stroke-green-400' : 'stroke-gray-300 dark:stroke-gray-700'}`}
                          strokeDasharray="5,5"
                          style={{
                            animation: activeStep === 2 ? `dashMoveReverse 1s linear infinite ${i * 0.2}s` : 'none'
                          }}
                        />
                      );
                    })}
                    
                    {/* Platform to Alert */}
                    <line 
                      x1="50%" y1="50%" 
                      x2="83.33%" y2="50%" 
                      className={`stroke-2 transition-all duration-500 ${activeStep >= 3 ? 'stroke-blue-500 dark:stroke-blue-400' : 'stroke-gray-300 dark:stroke-gray-700'}`}
                      strokeDasharray="5,5"
                      style={{
                        animation: activeStep === 3 ? 'dashMove 1s linear infinite' : 'none'
                      }}
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Steps */}
          <div 
            className={`md:w-1/2 bg-blue-600 dark:bg-blue-800 text-white p-8 transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            }`}
          >
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className={`transition-all duration-500 ${
                    activeStep === index 
                      ? 'opacity-100 bg-white/10 p-4 rounded-lg' 
                      : 'opacity-70 hover:opacity-90'
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-colors duration-300 ${
                      activeStep === index 
                        ? 'bg-white text-blue-600' 
                        : 'bg-white/20 text-white'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{step.title}</h3>
                      <p className="mt-1 text-sm text-white/80">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <a 
                href="/pages/authPage" 
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-md font-medium hover:bg-blue-50 transition-colors duration-200"
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;