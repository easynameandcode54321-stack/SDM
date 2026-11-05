/**
 * Pure calculation logic, data structures, and utilities for HR tools
 */

export interface TurnoverResult {
  rate: number;
  status: 'low' | 'moderate' | 'high' | 'invalid';
  label: string;
  badgeClass: string;
  dotColor: string;
  description: string;
  recommendations: string[];
}

export function calculateTurnoverRate(departures: number, totalEmployees: number): TurnoverResult {
  if (totalEmployees <= 0 || isNaN(totalEmployees) || isNaN(departures) || departures < 0) {
    return {
      rate: 0,
      status: 'invalid',
      label: 'Data Belum Valid',
      badgeClass: 'text-slate-600 bg-slate-100 border-slate-200',
      dotColor: 'bg-slate-400',
      description: 'Masukkan jumlah karyawan total lebih dari 0 dan jumlah keluar minimal 0.',
      recommendations: ['Pastikan kedua angka terisi dengan benar.']
    };
  }

  const rawRate = (departures / totalEmployees) * 100;
  const rate = Math.round(rawRate * 10) / 10;

  if (rate <= 10) {
    return {
      rate,
      status: 'low',
      label: 'Tingkat Turnover Rendah (Sehat)',
      badgeClass: 'text-emerald-800 bg-emerald-50 border-emerald-200',
      dotColor: 'bg-emerald-500',
      description: 'Turnover berada di bawah batas wajar industri (<10%). Retensi talenta Anda berjalan sangat baik dan budaya kerja stabil.',
      recommendations: [
        'Pertahankan program apresiasi karyawan berkala.',
        'Lakukan evaluasi kepuasan kerja (eNPS) tahunan untuk menjaga momentum.',
        'Identifikasi talenta kunci (high performers) untuk suksesi kepemimpinan.'
      ]
    };
  } else if (rate <= 15) {
    return {
      rate,
      status: 'moderate',
      label: 'Tingkat Turnover Sedang (Waspada)',
      badgeClass: 'text-amber-800 bg-amber-50 border-amber-200',
      dotColor: 'bg-amber-500',
      description: 'Turnover berada dalam kisaran rata-rata nasional (10% - 15%). Beberapa divisi mungkin mengalami beban kerja berlebih.',
      recommendations: [
        'Lakukan wawancara keluar (exit interview) yang mendalam untuk menemukan pola penyebab.',
        'Kaji ulang daya saing kompensasi & tunjangan terhadap pasar.',
        'Tingkatkan komunikasi terbuka antara manajer lini dan anggota tim.'
      ]
    };
  } else {
    return {
      rate,
      status: 'high',
      label: 'Tingkat Turnover Tinggi (Perlu Perhatian)',
      badgeClass: 'text-rose-800 bg-rose-50 border-rose-200',
      dotColor: 'bg-rose-500',
      description: 'Turnover melebihi 15%, berpotensi menguras biaya rekrutmen hingga 33% gaji tahunan per karyawan dan mengganggu produktivitas.',
      recommendations: [
        'Audit kepemimpinan dan manajemen tim di departemen dengan turnover tertinggi.',
        'Bangun jalur karier (career path) dan kesempatan belajar yang transparan.',
        'Terapkan program retensi proaktif dan tinjau beban kerja serta work-life balance.'
      ]
    };
  }
}

export interface LifecycleStage {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  iconName: string;
  summary: string;
  kpis: string[];
  bestPractices: string[];
  keyTools: string[];
  actionChecklist: string[];
}

export const LIFECYCLE_STAGES: LifecycleStage[] = [
  {
    id: 'recruitment',
    order: 1,
    title: 'Recruitment',
    subtitle: 'Penarikan & Seleksi Talenta Unggul',
    iconName: 'UserPlus',
    summary: 'Tahap awal menarik kandidat yang tepat dan selaras dengan nilai-nilai perusahaan (culture fit) menggunakan platform digital & data-driven hiring.',
    kpis: ['Time-to-Hire (<30 hari)', 'Cost-per-Hire', 'Offer Acceptance Rate (>85%)', 'Candidate Net Promoter Score'],
    bestPractices: [
      'Gunakan Applicant Tracking System (ATS) untuk screening terstruktur dan transparan.',
      'Terapkan structured interview berbasis kompetensi agar terbebas dari bias subjektif.',
      'Perkuat Employer Branding lewat platform karir dan media sosial profesional.'
    ],
    keyTools: ['ATS (Greenhouse, Lever, KitaLulus)', 'LinkedIn Talent Solutions', 'Platform Asesmen Psikotes Digital'],
    actionChecklist: [
      'Buat Job Description yang akurat dan berbasis output.',
      'Sediakan timeline rekrutmen yang jelas kepada kandidat.',
      'Gunakan rubrik penilaian standar antar pewawancara.'
    ]
  },
  {
    id: 'onboarding',
    order: 2,
    title: 'Onboarding',
    subtitle: 'Integrasi Cepat & Adaptasi Budaya',
    iconName: 'Compass',
    summary: 'Proses menyambut karyawan baru secara terstruktur dalam 90 hari pertama agar cepat mencapai produktivitas penuh dan merasa dihargai.',
    kpis: ['New Hire Turnover 90 Hari (<5%)', 'Time to Productivity', 'Onboarding Satisfaction Score (>90%)'],
    bestPractices: [
      'Siapkan checklist 30-60-90 hari dengan ekspektasi hasil kerja yang jelas.',
      'Pasangkan karyawan baru dengan "Buddy" rekan kerja untuk adaptasi sosial.',
      'Sediakan akses perangkat, software, dan dokumentasi sebelum hari pertama (pre-boarding).'
    ],
    keyTools: ['Notion / Confluence Knowledge Base', 'LMS Onboarding Portals', 'Slack / Teams Integration'],
    actionChecklist: [
      'Kirimkan welcome kit dan email instruksi hari pertama sebelum mulai kerja.',
      'Jadwalkan sesi 1-on-1 mingguan dengan manajer langsung.',
      'Review progres 30 hari untuk menjawab pertanyaan dan kendala kerja.'
    ]
  },
  {
    id: 'development',
    order: 3,
    title: 'Development',
    subtitle: 'Pengembangan Kompetensi & Jalur Karier',
    iconName: 'TrendingUp',
    summary: 'Investasi berkesinambungan dalam peningkatan keterampilan (upskilling & reskilling) karyawan agar mampu menghadapi tantangan bisnis masa depan.',
    kpis: ['Rata-rata Jam Pelatihan per Karyawan', 'Tingkat Promosi Internal (>30%)', 'Tingkat Retensi Pasca-Pelatihan'],
    bestPractices: [
      'Susun Individual Development Plan (IDP) yang selaras dengan target perusahaan.',
      'Terapkan model 70-20-10 (70% pengalaman kerja, 20% mentoring, 10% kursus formal).',
      'Fasilitasi program mentorship lintas departemen untuk transfer wawasan.'
    ],
    keyTools: ['Learning Management System (LMS)', 'Platform Micro-learning (Coursera, Udemy Business)', 'Software Manajemen OKR'],
    actionChecklist: [
      'Lakukan Training Need Analysis (TNA) secara periodik.',
      'Sediakan anggaran belajar tahunan yang fleksibel untuk setiap karyawan.',
      'Berikan proyek riil untuk mempraktikkan keterampilan baru.'
    ]
  },
  {
    id: 'retention',
    order: 4,
    title: 'Retention',
    subtitle: 'Keterlibatan, Apresiasi & Kesejahteraan',
    iconName: 'ShieldCheck',
    summary: 'Strategi menjaga karyawan terbaik tetap termotivasi, merasa dihargai, dan memiliki komitmen jangka panjang terhadap misi organisasi.',
    kpis: ['Employee Turnover Rate (<10%)', 'Employee Net Promoter Score (eNPS)', 'Tingkat Kehadiran & Partisipasi'],
    bestPractices: [
      'Tinjau kompensasi dan tunjangan secara kompetitif berkala.',
      'Buka ruang komunikasi psikologis yang aman melalui rutin 1-on-1 dan town hall.',
      'Dukung kesejahteraan holistik (kesehatan mental, fisik, dan fleksibilitas kerja).'
    ],
    keyTools: ['Pulse Survey Platforms (Culture Amp, Officevibe)', 'Platform Reward & Recognition', 'Wellness Programs'],
    actionChecklist: [
      'Lakukan survei kepuasan berkala dan tindak lanjuti masukan secara nyata.',
      'Berikan pengakuan atas pencapaian kecil maupun besar secara publik.',
      'Tinjau beban kerja agar mencegah terjadinya burnout tim.'
    ]
  },
  {
    id: 'offboarding',
    order: 5,
    title: 'Offboarding',
    subtitle: 'Transisi Profesional & Jaringan Alumni',
    iconName: 'LogOut',
    summary: 'Mengakhiri hubungan kerja secara bermartabat, memastikan transfer pengetahuan tuntas, dan membangun jaringan alumni yang positif.',
    kpis: ['Tingkat Kelengkapan Exit Interview (>95%)', 'Penyelesaian Handover Aset (100%)', 'Glassdoor Company Rating'],
    bestPractices: [
      'Jalankan exit interview yang objektif dan rahasia untuk memetik insight.',
      'Pastikan proses hand-over pekerjaan terdokumentasi rapi.',
      'Pertahankan hubungan baik untuk potensi "boomerang employee" atau rujukan bisnis.'
    ],
    keyTools: ['Digital Exit Survey Tools', 'Checklist Manajemen Aset IT & Legal', 'Grup Komunitas Alumni Perusahaan'],
    actionChecklist: [
      'Jadwalkan sesi serah terima dokumen dan login sistem dengan aman.',
      'Lakukan wawancara keluar dengan pendekatan mendengarkan tanpa menghakimi.',
      'Selesaikan hak administratif dan surat keterangan kerja tepat waktu.'
    ]
  }
];

export interface QuizQuestion {
  id: number;
  statement: string;
  context: string;
  options: {
    label: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  sourceOrFact: string;
}

export const HR_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    statement: 'Mitos atau Fakta: Gaji tinggi adalah satu-satunya faktor utama yang membuat karyawan loyal dan bertahan lama di perusahaan.',
    context: 'Banyak pemilik bisnis beranggapan kenaikan kompensasi finansial sudah cukup menyelesaikan seluruh masalah retensi tim.',
    options: [
      { label: 'Fakta: Uang adalah motivasi terpenting karyawan.', isCorrect: false },
      { label: 'Mitos: Lingkungan kerja, apresiasi, dan jalur karier lebih menentukan.', isCorrect: true }
    ],
    explanation: 'Riset dari Gallup dan Harvard Business Review menunjukkan bahwa alasan nomor satu karyawan mengundurkan diri adalah hubungan dengan atasan langsung, ketiadaan apresiasi, dan minimnya peluang berkembang—bukan semata-mata nominal gaji.',
    sourceOrFact: 'Fakta Gallup: 70% variasi keterlibatan tim dipengaruhi oleh kualitas manajer langsung.'
  },
  {
    id: 2,
    statement: 'Mitos atau Fakta: Onboarding terstruktur dapat meningkatkan retensi karyawan baru hingga lebih dari 50%.',
    context: 'Seringkali perusahaan hanya memberikan orientasi 1 hari lalu langsung melepas karyawan baru bekerja tanpa pendampingan.',
    options: [
      { label: 'Fakta: Onboarding terstruktur melipatgandakan kepuasan & retensi.', isCorrect: true },
      { label: 'Mitos: Onboarding panjang hanya membuang waktu produktif.', isCorrect: false }
    ],
    explanation: 'Studi Brandon Hall Group membuktikan bahwa organisasi dengan proses onboarding terstruktur meningkatkan retensi karyawan baru sebesar 82% dan produktivitas hingga lebih dari 70%.',
    sourceOrFact: 'Fakta HR: Karyawan yang mengalami onboarding buruk 2x lebih mungkin mencari pekerjaan baru dalam 6 bulan.'
  },
  {
    id: 3,
    statement: 'Mitos atau Fakta: Karyawan yang sering melakukan "multitasking" memiliki produktivitas dan fokus yang jauh lebih tinggi.',
    context: 'Di era kerja serba cepat, banyak iklan lowongan kerja masih meminta kemampuan multitasking ekstrem.',
    options: [
      { label: 'Fakta: Multitasking menandakan kerja cepat dan tangkas.', isCorrect: false },
      { label: 'Mitos: Otak beralih konteks (context switching) menurunkan produktivitas hingga 40%.', isCorrect: true }
    ],
    explanation: 'Riset psikologi kognitif American Psychological Association (APA) menunjukkan bahwa manusia tidak memproses beberapa tugas analitis sekaligus, melainkan berpindah-pindah tugas cepat (task-switching). Ini memicu kelelahan mental dan menurunkan efisiensi hingga 40%.',
    sourceOrFact: 'Fakta Kognitif: Single-tasking dengan time-blocking menghasilkan akurasi dan output lebih tinggi.'
  }
];

export interface ResourceItem {
  id: string;
  title: string;
  category: string;
  categoryPillText: string;
  summary: string;
  keyPoints: string[];
  readTime: string;
  difficulty: 'Pemula' | 'Menengah' | 'Lanjutan';
  frameworks: string[];
}

export const HR_RESOURCES: ResourceItem[] = [
  {
    id: 'digital-recruitment',
    title: 'Digital Recruitment',
    category: 'Rekrutmen Modern',
    categoryPillText: 'Talent Acquisition',
    summary: 'Transformasi strategi rekrutmen konvensional ke platform digital berbasis data, pemanfaatan AI screening etis, dan employer branding interaktif.',
    keyPoints: [
      'Integrasi Applicant Tracking System (ATS) untuk memangkas time-to-hire hingga 35%.',
      'Pemanfaatan structured scorecard interview untuk meminimalkan unconscious bias.',
      'Strategi Employer Value Proposition (EVP) di media digital untuk menjaring kandidat pasif unggulan.'
    ],
    readTime: '5 min baca',
    difficulty: 'Menengah',
    frameworks: ['EVP Framework', 'Competency-Based Interviewing', 'ATS Automation']
  },
  {
    id: 'retention-strategies',
    title: 'Retention Strategies',
    category: 'Manajemen Retensi',
    categoryPillText: 'Employee Engagement',
    summary: 'Metode proaktif menjaga talenta terbaik tetap termotivasi melalui budaya apresiasi, kompensasi adaptif, dan pertumbuhan karier terstruktur.',
    keyPoints: [
      'Penerapan stay interview 6 bulan sekali untuk mendeteksi potensi turnover sebelum terjadi.',
      'Sistem penghargaan non-moneter berkala (peer-to-peer recognition) yang memupuk rasa memiliki.',
      'Desain kerja fleksibel (hybrid work) yang terbukti menaikkan loyalitas dan kesejahteraan tim.'
    ],
    readTime: '6 min baca',
    difficulty: 'Lanjutan',
    frameworks: ['Stay Interview Protocol', 'Total Rewards Model', 'Job Demands-Resources (JD-R)']
  },
  {
    id: 'inclusive-culture',
    title: 'Inclusive Culture',
    category: 'Budaya & Organisasi',
    categoryPillText: 'DEI & Wellbeing',
    summary: 'Membangun lingkungan kerja yang menghargai keberagaman, memberikan keamanan psikologis (psychological safety), dan kesetaraan kesempatan bagi semua.',
    keyPoints: [
      'Menciptakan ruang aman psikologis di mana karyawan bebas mengajukan ide tanpa takut dihakimi.',
      'Transparansi kriteria evaluasi kinerja untuk menjamin keadilan remunerasi dan promosi.',
      'Pelatihan kepemimpinan inklusif bagi jajaran manajer untuk menekan mikroagresi di tempat kerja.'
    ],
    readTime: '4 min baca',
    difficulty: 'Pemula',
    frameworks: ['Amy Edmondson Psychological Safety', 'DEI Maturity Index', 'Equitable Performance Matrix']
  },
  {
    id: 'performance-analytics',
    title: 'People Analytics & OKR',
    category: 'Analisis & Kinerja',
    categoryPillText: 'Performance Metrics',
    summary: 'Pendekatan pengambilan keputusan SDM berbasis metrik kinerja terukur, pemetaan OKR (Objectives and Key Results), serta deteksi dini beban kerja.',
    keyPoints: [
      'Penyusunan OKR departemen yang selaras langsung dengan visi strategis organisasi.',
      'Analisis eNPS dan sentiment survey untuk mengukur denyut keterlibatan tim secara kuantitatif.',
      'Dashboard metrik HR real-time untuk memprediksi risiko turnover dan kebutuhan hiring.'
    ],
    readTime: '7 min baca',
    difficulty: 'Lanjutan',
    frameworks: ['OKR Methodology', 'Predictive Attrition Modeling', 'Continuous Feedback Loops']
  }
];

export function filterResources(resources: ResourceItem[], query: string): ResourceItem[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return resources;

  return resources.filter((item) => {
    return (
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.category.toLowerCase().includes(normalizedQuery) ||
      item.summary.toLowerCase().includes(normalizedQuery) ||
      item.keyPoints.some((p) => p.toLowerCase().includes(normalizedQuery)) ||
      item.frameworks.some((f) => f.toLowerCase().includes(normalizedQuery))
    );
  });
}
