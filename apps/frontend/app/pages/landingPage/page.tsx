"use client";
import React from 'react';
import { ThemeProvider } from "../../../components/ThemeProvider";
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';

function LandingPage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-300">
        {/* <Header /> */}
        <main>
          <Hero />
          <Features />
          <HowItWorks />
          <Pricing />
          <Testimonials />
          <FAQ />
          <CTA />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default LandingPage;