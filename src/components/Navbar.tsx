import React from 'react';
import { Users, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Brand wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-slate-900 font-bold tracking-tight text-lg whitespace-nowrap shrink-0 group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-blue-800 transition-colors">
              <Users className="w-4 h-4" />
            </div>
            <span>TalentaHub SDM</span>
          </a>

          {/* Zone 2: Single-line navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => onNavigate('calculator-section')}
              className="hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Kalkulator Turnover
            </button>
            <button
              onClick={() => onNavigate('roadmap-section')}
              className="hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Siklus Karyawan
            </button>
            <button
              onClick={() => onNavigate('quiz-section')}
              className="hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Kuis HR (Mitos & Fakta)
            </button>
            <button
              onClick={() => onNavigate('resources-section')}
              className="hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Pusat Panduan
            </button>
          </nav>

          {/* Zone 3: 1 Primary CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('calculator-section')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 active:bg-blue-900 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
            >
              <span>Uji Metrik SDM</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
