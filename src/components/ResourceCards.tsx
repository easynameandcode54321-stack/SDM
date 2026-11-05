import React, { useState } from 'react';
import { Search, BookOpen, Clock, X, ChevronRight, CheckCircle2 } from 'lucide-react';
import { HR_RESOURCES, filterResources, ResourceItem } from '../utils/hr-calculations';

export const ResourceCards: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);

  // Filter by search text
  const searchedList = filterResources(HR_RESOURCES, searchQuery);

  // Filter by category if set
  const filteredResources = searchedList.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.categoryPillText.toLowerCase() === activeCategory.toLowerCase();
  });

  const categories = [
    { id: 'all', label: 'Semua Topik' },
    { id: 'Talent Acquisition', label: 'Talent Acquisition' },
    { id: 'Employee Engagement', label: 'Employee Engagement' },
    { id: 'DEI & Wellbeing', label: 'DEI & Wellbeing' },
    { id: 'Performance Metrics', label: 'Performance Metrics' }
  ];

  return (
    <section id="resources-section" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 tracking-wide uppercase mb-2">
              <BookOpen className="w-4 h-4" />
              <span>Direktori Wawasan Strategis</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Pusat Panduan & Strategi SDM
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Pelajari panduan terkurasi untuk Digital Recruitment, Retention Strategies, dan Inclusive Culture guna memperkuat pondasi organisasi Anda.
            </p>
          </div>

          {/* Functional Text Search Bar */}
          <div className="w-full md:w-80 shrink-0">
            <label htmlFor="resource-search-input" className="sr-only">
              Cari panduan SDM
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                id="resource-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari: rekrutmen, retensi..."
                className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                  aria-label="Bersihkan pencarian"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-6 text-xs no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
          {searchQuery && (
            <span className="text-xs text-slate-500 ml-2 whitespace-nowrap">
              Ditemukan {filteredResources.length} hasil untuk &quot;{searchQuery}&quot;
            </span>
          )}
        </div>

        {/* Resources Grid */}
        {filteredResources.length === 0 ? (
          <div className="py-12 px-6 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center max-w-lg mx-auto">
            <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h3 className="text-base font-bold text-slate-800">Tidak ada panduan yang cocok</h3>
            <p className="text-xs text-slate-500 mt-1">
              Coba kata kunci pencarian lain seperti &quot;rekrutmen&quot;, &quot;retensi&quot;, atau &quot;budaya&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              Reset Filter Pencarian
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-blue-400 hover:shadow-md transition-all group"
              >
                <div>
                  {/* Clean unboxed metadata with typographic separator */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3 font-medium">
                    <span className="text-blue-700 font-semibold">{item.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{item.readTime}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Tingkat {item.difficulty}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h3>

                  {/* Summary */}
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>

                  {/* Key Takeaways */}
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Poin Strategis Utama:
                    </span>
                    <ul className="space-y-1.5">
                      {item.keyPoints.slice(0, 2).map((point, idx) => (
                        <li key={idx} className="text-xs text-slate-700 flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer Action */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500 font-mono">
                    {item.frameworks[0]}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedResource(item)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 group-hover:text-blue-800 transition-colors"
                  >
                    <span>Baca Rincian</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal / Drawer for detailed reading */}
        {selectedResource && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-resource-title"
          >
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="text-blue-700 font-bold">{selectedResource.category}</span>
                  <span>·</span>
                  <span>{selectedResource.readTime}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedResource(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  aria-label="Tutup jendela rincian"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4">
                <h3 id="modal-resource-title" className="text-2xl font-bold text-slate-900">
                  {selectedResource.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                  {selectedResource.summary}
                </p>
              </div>

              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Panduan & Praktik Implementasi:
                </h4>
                <div className="space-y-3">
                  {selectedResource.keyPoints.map((point, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs sm:text-sm text-slate-800 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Framework & Metodologi Terkait:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedResource.frameworks.map((fw, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 rounded-md"
                    >
                      {fw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedResource(null)}
                  className="px-5 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Tutup Panduan
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
