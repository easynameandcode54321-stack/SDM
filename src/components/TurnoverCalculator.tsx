import React, { useState, useId } from 'react';
import { Calculator, CheckCircle2, AlertTriangle, AlertCircle, RefreshCw, Info, HelpCircle } from 'lucide-react';
import { calculateTurnoverRate } from '../utils/hr-calculations';

export const TurnoverCalculator: React.FC = () => {
  const [departures, setDepartures] = useState<string>('6');
  const [totalEmployees, setTotalEmployees] = useState<string>('80');
  const [timePeriod, setTimePeriod] = useState<'tahunan' | 'kuartalan'>('tahunan');

  const departuresInputId = useId();
  const totalEmployeesInputId = useId();

  const numDepartures = departures === '' ? 0 : parseFloat(departures);
  const numTotalEmployees = totalEmployees === '' ? 0 : parseFloat(totalEmployees);

  const result = calculateTurnoverRate(numDepartures, numTotalEmployees);

  const handlePreset = (dep: number, tot: number) => {
    setDepartures(dep.toString());
    setTotalEmployees(tot.toString());
  };

  const handleReset = () => {
    setDepartures('0');
    setTotalEmployees('50');
  };

  // Status visual mapping
  const isGreen = result.status === 'low';
  const isRed = result.status === 'high';
  const isModerate = result.status === 'moderate';

  return (
    <section id="calculator-section" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 tracking-wide uppercase mb-2">
            <Calculator className="w-4 h-4" />
            <span>Alat Pengukur Metrik SDM</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Kalkulator Employee Turnover Rate
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Hitung rasio perputaran karyawan secara instan untuk mendeteksi stabilitas organisasi dan kesehatan budaya kerja.
          </p>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Box: Form Inputs & Presets */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <h3 className="text-base font-semibold text-slate-900">
                Input Data Karyawan
              </h3>
              
              {/* Period selection */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setTimePeriod('tahunan')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    timePeriod === 'tahunan'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tahunan
                </button>
                <button
                  type="button"
                  onClick={() => setTimePeriod('kuartalan')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    timePeriod === 'kuartalan'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Kuartalan
                </button>
              </div>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              {/* Input 1: Number of Departures */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor={departuresInputId} className="block text-sm font-medium text-slate-800">
                    Jumlah Karyawan Keluar (Departures)
                  </label>
                  <span className="text-xs text-slate-400">Orang</span>
                </div>
                <div className="relative">
                  <input
                    id={departuresInputId}
                    type="number"
                    min="0"
                    step="1"
                    value={departures}
                    onChange={(e) => setDepartures(e.target.value)}
                    placeholder="Contoh: 5"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all font-mono"
                    aria-describedby="departures-help"
                  />
                </div>
                <p id="departures-help" className="mt-1.5 text-xs text-slate-500">
                  Total karyawan yang resign, PHK, atau pensiun dalam periode {timePeriod}.
                </p>
              </div>

              {/* Input 2: Total Employees */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor={totalEmployeesInputId} className="block text-sm font-medium text-slate-800">
                    Total Jumlah Karyawan (Total Headcount)
                  </label>
                  <span className="text-xs text-slate-400">Orang</span>
                </div>
                <div className="relative">
                  <input
                    id={totalEmployeesInputId}
                    type="number"
                    min="1"
                    step="1"
                    value={totalEmployees}
                    onChange={(e) => setTotalEmployees(e.target.value)}
                    placeholder="Contoh: 100"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all font-mono"
                    aria-describedby="total-help"
                  />
                </div>
                <p id="total-help" className="mt-1.5 text-xs text-slate-500">
                  Rata-rata total staf aktif yang dipekerjakan selama periode {timePeriod}.
                </p>
              </div>

              {/* Quick Presets */}
              <div className="pt-2">
                <span className="text-xs font-medium text-slate-500 block mb-2">
                  Coba Skenario Simulasi Cepat:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handlePreset(4, 80)}
                    className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    Rendah: 4 / 80 (5.0%)
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePreset(13, 100)}
                    className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    Sedang: 13 / 100 (13.0%)
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePreset(26, 100)}
                    className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    Tinggi: 26 / 100 (26.0%)
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors ml-auto"
                    title="Reset kalkulator"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              {/* Formula note */}
              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-blue-900 flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Rumus Standar HR:</span> Turnover Rate (%) = (Karyawan Keluar ÷ Rata-rata Karyawan) × 100%
                </div>
              </div>
            </form>
          </div>

          {/* Right Box: Dynamic Calculation Result & Status Indicator */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900 pb-4 mb-6 border-b border-slate-100">
              Hasil Analisis & Status Indikator
            </h3>

            {result.status === 'invalid' ? (
              <div className="p-6 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm">Data Masukan Tidak Valid</h4>
                  <p className="text-xs mt-1 text-amber-800">
                    Silakan masukkan angka karyawan keluar (&ge; 0) dan total karyawan (&gt; 0) pada kolom formulir di sebelah kiri.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* Metric Display Card */}
                <div className={`p-6 rounded-2xl border transition-all ${
                  isGreen
                    ? 'bg-emerald-50/80 border-emerald-300'
                    : isRed
                    ? 'bg-rose-50/80 border-rose-300'
                    : 'bg-amber-50/80 border-amber-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Tingkat Turnover ({timePeriod})
                    </span>

                    {/* Status Indicator Badge: Green for low, Red for high, Amber for moderate */}
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-xs ${
                        isGreen
                          ? 'bg-emerald-600 text-white border-emerald-700'
                          : isRed
                          ? 'bg-rose-600 text-white border-rose-700'
                          : 'bg-amber-500 text-white border-amber-600'
                      }`}
                      data-testid="turnover-status-indicator"
                    >
                      {isGreen && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {isRed && <AlertCircle className="w-3.5 h-3.5" />}
                      {isModerate && <AlertTriangle className="w-3.5 h-3.5" />}
                      <span>
                        {isGreen ? 'STATUS HIJAU (RENDAH)' : isRed ? 'STATUS MERAH (TINGGI)' : 'STATUS KUNING (SEDANG)'}
                      </span>
                    </div>
                  </div>

                  {/* Big Number */}
                  <div className="mt-4 flex items-baseline gap-2">
                    <span
                      className={`text-5xl sm:text-6xl font-extrabold tracking-tight tabular-nums ${
                        isGreen ? 'text-emerald-700' : isRed ? 'text-rose-700' : 'text-amber-700'
                      }`}
                      data-testid="turnover-percentage-value"
                    >
                      {result.rate.toFixed(1)}%
                    </span>
                    <span className="text-sm font-semibold text-slate-600">
                      per {timePeriod}
                    </span>
                  </div>

                  {/* Visual Benchmark Scale */}
                  <div className="mt-5 pt-4 border-t border-slate-200/60">
                    <div className="flex justify-between text-xs text-slate-600 mb-1.5 font-medium">
                      <span>Skala Benchmark Industri</span>
                      <span>Target Ideal: &le;10%</span>
                    </div>
                    
                    {/* Visual Meter */}
                    <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden flex">
                      <div
                        className="bg-emerald-500 h-full transition-all duration-300"
                        style={{ width: '33.33%' }}
                        title="0 - 10%: Rendah (Sehat)"
                      />
                      <div
                        className="bg-amber-400 h-full transition-all duration-300"
                        style={{ width: '16.66%' }}
                        title="10 - 15%: Waspada"
                      />
                      <div
                        className="bg-rose-500 h-full transition-all duration-300"
                        style={{ width: '50%' }}
                        title="> 15%: Tinggi"
                      />
                    </div>
                    
                    <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                      <span>0%</span>
                      <span className="text-emerald-700 font-semibold">10% (Sehat)</span>
                      <span className="text-amber-700 font-semibold">15%</span>
                      <span className="text-rose-700 font-semibold">30%+</span>
                    </div>
                  </div>
                </div>

                {/* Description & Impact */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <div className="font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-slate-500" />
                    <span>Interpretasi Hasil: {result.label}</span>
                  </div>
                  <p>{result.description}</p>
                </div>

                {/* Recommended Next Actions */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Langkah Rekomendasi HR:
                  </h4>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${
                          isGreen ? 'bg-emerald-500' : isRed ? 'bg-rose-500' : 'bg-amber-500'
                        }`} />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};
