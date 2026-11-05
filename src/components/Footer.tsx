import React from 'react';
import { Users, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand & Mission */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs">
                <Users className="w-4 h-4" />
              </div>
              <span>TalentaHub SDM</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Platform interaktif Manajemen Sumber Daya Manusia masa depan. Menghubungkan analisis metrik tenaga kerja, siklus retensi talenta, dan budaya organisasi yang sehat serta inklusif.
            </p>
          </div>

          {/* Nav Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Fitur Interaktif
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('calculator-section')}
                  className="hover:text-white transition-colors"
                >
                  Kalkulator Turnover Rate
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('roadmap-section')}
                  className="hover:text-white transition-colors"
                >
                  Roadmap 5 Siklus Karyawan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('quiz-section')}
                  className="hover:text-white transition-colors"
                >
                  Kuis HR Mitos vs Fakta
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('resources-section')}
                  className="hover:text-white transition-colors"
                >
                  Pusat Panduan & Strategi
                </button>
              </li>
            </ul>
          </div>

          {/* Principles */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Prinsip Manajemen SDM Modern
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p>• <strong className="text-slate-300">People-First:</strong> Mengutamakan rasa aman psikologis dan penghargaan atas kontribusi nyata.</p>
              <p>• <strong className="text-slate-300">Data-Informed:</strong> Pengambilan keputusan hiring & retensi yang didukung metrik kuantitatif.</p>
              <p>• <strong className="text-slate-300">Continuous Growth:</strong> Menyiapkan tenaga kerja adaptif melalui pembelajaran berkelanjutan.</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} TalentaHub SDM. Panduan Praktik Manajemen Sumber Daya Manusia.
          </div>
          <div className="flex items-center gap-1">
            <span>Didedikasikan untuk kemajuan praktisi SDM & budaya kerja Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
