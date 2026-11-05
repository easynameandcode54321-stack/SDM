import React, { useState } from 'react';
import { ArrowDown, Sparkles, TrendingDown, UsersRound, Award } from 'lucide-react';

interface HeroProps {
  onExplore: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  const [imgError, setImgError] = useState(false);
  const heroImgSrc = '/src/assets/images/hero_hr_management_1793886952403.jpg';

  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200 pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Subtle background ambient glow */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -z-10 w-80 h-80 bg-slate-100 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Proposition and CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 mb-4 tracking-wide uppercase">
              <span className="w-2 h-0.5 bg-blue-600 rounded"></span>
              <span>Platform Edukasi & Alat Analisis Praktis</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15] text-balance">
              Masa Depan Manajemen SDM: Mengubah Data Menjadi Kekuatan Talenta
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Era baru pengelolaan Sumber Daya Manusia menuntut keseimbangan antara empati kemanusiaan dan presisi data analitik. Eksplorasi metrik turnover, optimalkan siklus karier karyawan, uji wawasan kerja, dan temukan strategi retensi terbaik.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onExplore('calculator-section')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 active:bg-blue-900 rounded-xl shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                <span>Hitung Turnover Tim Anda</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={() => onExplore('roadmap-section')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-xl transition-all"
              >
                <span>Pelajari 5 Siklus SDM</span>
              </button>

              <button
                onClick={() => onExplore('quiz-section')}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 text-sm font-medium text-blue-700 hover:text-blue-800 hover:bg-blue-50/70 rounded-xl transition-colors"
              >
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Kuis Mitos HR</span>
              </button>
            </div>

            {/* Micro proof points */}
            <div className="mt-10 pt-6 border-t border-slate-100 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono tabular-nums">&lt;10%</div>
                <div className="text-xs text-slate-500 mt-0.5">Benchmark Turnover Sehat</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono tabular-nums">+82%</div>
                <div className="text-xs text-slate-500 mt-0.5">Retensi via Onboarding Baik</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono tabular-nums">5 Tahap</div>
                <div className="text-xs text-slate-500 mt-0.5">Siklus Hidup Terstruktur</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Image */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100 aspect-16/10 lg:aspect-4/3 group">
              {!imgError ? (
                <img
                  src={heroImgSrc}
                  alt="Tim profesional berdiskusi strategi manajemen SDM di ruang pertemuan modern"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800 text-white text-center">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                    <UsersRound className="w-8 h-8 text-blue-300" />
                  </div>
                  <h3 className="text-lg font-bold">Kolaborasi Strategis SDM</h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-xs">
                    Masa Depan Manajemen Sumber Daya Manusia berbasis Data & Budaya Inklusif.
                  </p>
                </div>
              )}

              {/* Quiet overlay label */}
              <div className="absolute bottom-3 left-3 right-3 p-3 bg-white/95 backdrop-blur-sm rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                  <span className="font-semibold text-slate-900">Strategi SDM Terintegrasi</span>
                </div>
                <span className="text-slate-500">People Operations 4.0</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
