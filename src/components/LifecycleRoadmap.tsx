import React, { useState } from 'react';
import {
  UserPlus,
  Compass,
  TrendingUp,
  ShieldCheck,
  LogOut,
  CheckSquare,
  Square,
  ArrowRight,
  ArrowLeft,
  Target,
  Wrench,
  Sparkles
} from 'lucide-react';
import { LIFECYCLE_STAGES, LifecycleStage } from '../utils/hr-calculations';

export const LifecycleRoadmap: React.FC = () => {
  const [selectedStageId, setSelectedStageId] = useState<string>('recruitment');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const activeStage: LifecycleStage =
    LIFECYCLE_STAGES.find((s) => s.id === selectedStageId) || LIFECYCLE_STAGES[0];

  const activeIndex = LIFECYCLE_STAGES.findIndex((s) => s.id === activeStage.id);

  const toggleCheck = (itemKey: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemKey]: !prev[itemKey]
    }));
  };

  const goToNext = () => {
    if (activeIndex < LIFECYCLE_STAGES.length - 1) {
      setSelectedStageId(LIFECYCLE_STAGES[activeIndex + 1].id);
    }
  };

  const goToPrev = () => {
    if (activeIndex > 0) {
      setSelectedStageId(LIFECYCLE_STAGES[activeIndex - 1].id);
    }
  };

  // Icon renderer helper
  const renderIcon = (name: string, className: string) => {
    switch (name) {
      case 'UserPlus':
        return <UserPlus className={className} />;
      case 'Compass':
        return <Compass className={className} />;
      case 'TrendingUp':
        return <TrendingUp className={className} />;
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      case 'LogOut':
        return <LogOut className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  return (
    <section id="roadmap-section" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 tracking-wide uppercase mb-2">
            <Compass className="w-4 h-4" />
            <span>Siklus Hidup Karyawan Terintegrasi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Roadmap 5 Tahap Employee Lifecycle
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Klik salah satu dari 5 tahap di bawah untuk melihat rincian strategi, indikator performa utama (KPI), dan checklist implementasi praktis.
          </p>
        </div>

        {/* 5-Stage Interactive Clickable Timeline */}
        <div className="relative mb-12">
          
          {/* Connector horizontal line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-8 right-8 -translate-y-1/2 h-1 bg-slate-200 -z-0" />

          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 relative z-10"
            role="tablist"
            aria-label="Tahapan Siklus Karyawan"
          >
            {LIFECYCLE_STAGES.map((stage, idx) => {
              const isSelected = stage.id === activeStage.id;
              const isPast = idx < activeIndex;

              return (
                <button
                  key={stage.id}
                  role="tab"
                  id={`tab-${stage.id}`}
                  aria-selected={isSelected}
                  aria-controls={`panel-${stage.id}`}
                  onClick={() => setSelectedStageId(stage.id)}
                  className={`flex flex-col items-center text-center p-4 rounded-2xl border transition-all cursor-pointer group focus-visible:outline-2 focus-visible:outline-blue-700 ${
                    isSelected
                      ? 'bg-blue-50/90 border-blue-600 shadow-md ring-2 ring-blue-600/20 translate-y-[-2px]'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {/* Step Badge & Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                      isSelected
                        ? 'bg-blue-700 text-white shadow-sm'
                        : isPast
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                    }`}
                  >
                    {renderIcon(stage.iconName, 'w-6 h-6')}
                  </div>

                  {/* Stage Order & Title */}
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Tahap 0{stage.order}
                  </span>
                  <span
                    className={`text-sm sm:text-base font-bold mt-0.5 ${
                      isSelected ? 'text-blue-900' : 'text-slate-800'
                    }`}
                  >
                    {stage.title}
                  </span>
                  <span className="text-[11px] text-slate-500 mt-1 line-clamp-1 hidden sm:block">
                    {stage.subtitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Detail Area Updating On Stage Click */}
        <div
          id={`panel-${activeStage.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeStage.id}`}
          className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-xs transition-all"
        >
          {/* Header of Active Stage */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-slate-200 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider">
                <span>Tahap 0{activeStage.order} dari 05</span>
                <span>•</span>
                <span>Employee Journey Framework</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                {activeStage.title}: {activeStage.subtitle}
              </h3>
            </div>

            {/* Stage Quick Step Navigation */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goToPrev}
                disabled={activeIndex === 0}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Tahap Sebelumnya"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sebelumnya</span>
              </button>
              <button
                type="button"
                onClick={goToNext}
                disabled={activeIndex === LIFECYCLE_STAGES.length - 1}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-xs"
                aria-label="Tahap Selanjutnya"
              >
                <span className="hidden sm:inline">Selanjutnya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Stage Summary Description */}
          <div className="mb-8 p-4 sm:p-5 bg-white rounded-xl border border-slate-200 text-slate-700 leading-relaxed text-sm sm:text-base">
            <span className="font-semibold text-slate-900 block mb-1">
              Fokus Utama Tahap {activeStage.title}:
            </span>
            <p>{activeStage.summary}</p>
          </div>

          {/* 3-Column Detailed Breakdown: KPIs, Best Practices, Tools */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            
            {/* Box 1: KPI Metrik */}
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3">
                <Target className="w-4 h-4 text-blue-600" />
                <span>Indikator KPI Kunci</span>
              </div>
              <ul className="space-y-2">
                {activeStage.kpis.map((kpi, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{kpi}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Box 2: Best Practices */}
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Praktik Terbaik (Best Practices)</span>
              </div>
              <ul className="space-y-2">
                {activeStage.bestPractices.map((bp, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{bp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Box 3: Modern HR Tech & Tools */}
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3">
                <Wrench className="w-4 h-4 text-purple-600" />
                <span>Alat & Teknologi Pendukung</span>
              </div>
              <ul className="space-y-2">
                {activeStage.keyTools.map((tool, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>{tool}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Interactive Action Checklist for HR Teams */}
          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Checklist Aksi Mandiri: Tahap {activeStage.title}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Centang item yang sudah diterapkan di perusahaan Anda untuk mengaudit kesiapan operasional.
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {activeStage.actionChecklist.map((task, idx) => {
                const itemKey = `${activeStage.id}-item-${idx}`;
                const isChecked = !!checkedItems[itemKey];

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleCheck(itemKey)}
                    className={`w-full flex items-start gap-3 p-3 rounded-lg border text-left text-xs sm:text-sm transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-blue-50/70 border-blue-200 text-slate-900'
                        : 'bg-slate-50/50 border-slate-200 text-slate-700 hover:bg-slate-100/70'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0 text-blue-700">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-blue-700" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                    <span className={isChecked ? 'line-through text-slate-500' : 'text-slate-800'}>
                      {task}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
