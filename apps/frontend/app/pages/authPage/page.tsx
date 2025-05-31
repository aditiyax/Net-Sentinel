"use client";

import React from "react";
import {
  SignInButton,
  SignUpButton,
  SignedOut,
  SignedIn,
  useUser,
} from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Activity,
  LogIn,
  UserPlus,
  Zap,
  Shield,
  Clock,
  LayoutDashboard,
} from "lucide-react";

const AuthPage: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 md:p-6">
       
      </div>

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl space-y-12 text-center">
          <div className="space-y-6">
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Never Miss a Beat with Your Websites
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join thousands of developers who trust Net Sentinel's Monitoring Services to keep their
              websites running 24/7. Get instant alerts, detailed analytics, and
              peace of mind.
            </p>

            {/* Auth Buttons for Signed Out Users */}
            <SignedOut>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <SignInButton mode="modal">
                  <button className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-all duration-200 transform hover:scale-105">
                    <LogIn size={20} className="mr-2" />
                    Sign In
                  </button>
                </SignInButton>

                <SignUpButton mode="modal">
                  <button className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200 transform hover:scale-105">
                    <UserPlus size={20} className="mr-2" />
                    Sign Up Free
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>

            {/* Dashboard Button for Signed In Users */}
            <SignedIn>
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => {
                    if (user) {
                      router.push("/pages/dashboard");
                    } else {
                      window.location.reload();
                    }
                  }}
                  className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  <LayoutDashboard size={20} className="mr-2" />
                  Go to Dashboard
                </button>
              </div>
            </SignedIn>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-yellow-500" />}
              title="Real-time Monitoring"
              description="Get instant notifications when your websites go down. Stay ahead of issues before they impact your users."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-green-500" />}
              title="99.9% Accuracy"
              description="Trust our enterprise-grade monitoring system with proven reliability and precision alerts."
            />
            <FeatureCard
              icon={<Clock className="w-8 h-8 text-purple-500" />}
              title="Historical Data"
              description="Access detailed uptime history and performance metrics to optimize your websites."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-full">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export default AuthPage;
