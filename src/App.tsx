/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TurnoverCalculator } from './components/TurnoverCalculator';
import { LifecycleRoadmap } from './components/LifecycleRoadmap';
import { HrQuiz } from './components/HrQuiz';
import { ResourceCards } from './components/ResourceCards';
import { Footer } from './components/Footer';

export default function App() {
  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onExplore={handleNavigate} />

        {/* 2. Employee Turnover Calculator */}
        <TurnoverCalculator />

        {/* 3. Interactive Lifecycle Roadmap */}
        <LifecycleRoadmap />

        {/* 4. HR Trivia Quiz */}
        <HrQuiz />

        {/* 5. Resource Cards with Filter & Search */}
        <ResourceCards />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
