'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';

// --- TYPES ---
interface SlideData {
  id: number;
  category: string;
  title: string;
  subtitle: string;
  type: 'intro' | 'pillars' | 'architecture' | 'code' | 'metrics' | 'conclusion';
  notes: string;
  content: any;
}

// --- DATA: SLIDES CONTENT ---
const SLIDES: SlideData[] = [
  {
    id: 1,
    type: 'intro',
    category: 'Pemrograman Web • Pertemuan 01',
    title: 'Modern Web Architecture',
    subtitle: 'Prinsip desain rekayasa web modern: cepat, bersih, aksesibel, dan berorientasi pada pengalaman pengguna.',
    notes: 'Awali dengan menyapa audiens. Berikan gambaran singkat bagaimana teknologi web berkembang dari halaman statis ke arsitektur reaktif modern.',
    content: {
      meta: [
        { label: 'Pemateri', value: 'Senior Web Engineer' },
        { label: 'Modul', value: '01: Web Fundamentals' },
        { label: 'Tahun Akademik', value: '2026 / Genap' },
      ],
      tags: ['TypeScript', 'Next.js App Router', 'Tailwind CSS', 'Web Standards'],
    },
  },
  {
    id: 2,
    type: 'pillars',
    category: 'Fondasi Utama',
    title: 'Tiga Pilar Web Modern',
    subtitle: 'Keseimbangan antara struktur semantik, sistem desain terstandar, dan komputasi reaktif di sisi klien.',
    notes: 'Jelaskan mengapa pemisahan tanggung jawab (separation of concerns) tetap relevan namun kini disatukan dalam paradigma komponen terpadu.',
    content: {
      cards: [
        {
          no: '01',
          title: 'Semantic HTML5',
          subtitle: 'Struktur & Aksesibilitas',
          desc: 'Fondasi informasi yang ramah mesin pencari (SEO) dan teknologi asistif melalui standar W3C & ARIA roles.',
          badges: ['WCAG 2.1', 'SEO Ready', 'Strict Hierarchy'],
        },
        {
          no: '02',
          title: 'Utility Design Tokens',
          subtitle: 'Gaya & Responsivitas',
          desc: 'Penggunaan token desain konsisten dan CSS utility-first untuk meminimalisir CSS footprint dan mempercepat render.',
          badges: ['Light Blue Theme', 'Zero Dead CSS', 'Fluid Layout'],
        },
        {
          no: '03',
          title: 'Declarative State',
          subtitle: 'Reaktivitas & Type-Safety',
          desc: 'Manajemen state lokal yang terisolasi dengan pengetikan ketat TypeScript untuk stabilitas aplikasi berskala besar.',
          badges: ['React 19 Hooks', 'Strict Types', 'Optimistic UI'],
        },
      ],
    },
  },
  {
    id: 3,
    type: 'architecture',
    category: 'Alur Sistem',
    title: 'Siklus Request ke Render',
    subtitle: 'Proses perjalanan data dari pengetikan URL pada browser hingga rendering interaktif di layar.',
    notes: 'Jelaskan konsep hydration: bagaimana HTML statis cepat muncul, kemudian dihidupkan oleh bundle JavaScript.',
    content: {
      steps: [
        {
          step: '01',
          tag: 'Network',
          title: 'DNS & TLS Handshake',
          desc: 'Resolusi domain secara instan via CDN tepi (Edge) dengan enkripsi TLS 1.3 berkecepatan tinggi.',
        },
        {
          step: '02',
          tag: 'Server/Edge',
          title: 'Server Pre-rendering',
          desc: 'HTML dasar dirangkai di server untuk memangkas Time to First Byte (TTFB) secara drastis.',
        },
        {
          step: '03',
          tag: 'Browser',
          title: 'Streaming & First Paint',
          desc: 'Pengguna langsung melihat antarmuka visual tanpa menunggu seluruh JavaScript terunduh.',
        },
        {
          step: '04',
          tag: 'Client',
          title: 'Hydration & Events',
          desc: 'JavaScript menempelkan event listener pada DOM statis sehingga tombol dan navigasi menjadi reaktif.',
        },
      ],
    },
  },
  {
    id: 4,
    type: 'code',
    category: 'Implementasi Teknis',
    title: 'Komponen Bersih & Deklaratif',
    subtitle: 'Contoh penulisan komponen UI bergaya modern: ringkas, mudah dibaca, dan bebas dependensi berlebih.',
    notes: 'Tekankan bagaimana utility classes Tailwind dan TypeScript props membuat kode self-documenting.',
    content: {
      filename: 'PresentationBadge.tsx',
      highlight: 'Tailwind CSS + Strict TypeScript Props',
      code: `// Komponen UI Minimalis dengan Tema Light Blue
interface BadgeProps {
  label: string;
  status?: 'active' | 'draft';
  count?: number;
}

export function PresentationBadge({ label, status = 'active', count }: BadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200/70 text-sky-800 text-xs font-medium">
      <span className="relative flex h-2 w-2">
        {status === 'active' && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
        )}
        <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
      </span>
      <span>{label}</span>
      {count !== undefined && (
        <span className="px-1.5 py-0.2 rounded bg-sky-200/60 text-[10px] font-bold text-sky-900">
          {count}
        </span>
      )}
    </div>
  );
}`,
      insights: [
        'Prop-typing eksplisit mencegah runtime error',
        'Visual indicator dengan micro-animation pulsing sky-400',
        'Skema warna konsisten di keluarga light-blue (sky-50 hingga sky-800)',
      ],
    },
  },
  {
    id: 5,
    type: 'metrics',
    category: 'Indikator Keberhasilan',
    title: 'Core Web Vitals & Standar Mutu',
    subtitle: 'Aplikasi web modern diukur dari performa nyata pada perangkat pengguna nyata (Real User Metrics).',
    notes: 'Jelaskan bahwa estetika minimalis secara langsung mendukung pencapaian skor Core Web Vitals yang hijau sempurna.',
    content: {
      metrics: [
        { label: 'LCP (Largest Contentful Paint)', val: '< 1.2s', status: 'Optimal', sub: 'Kecepatan muncul elemen utama' },
        { label: 'INP (Interaction to Next Paint)', val: '< 50ms', status: 'Cepat', sub: 'Responsivitas saat interaksi klik' },
        { label: 'CLS (Cumulative Layout Shift)', val: '0.00', status: 'Stabil', sub: 'Tanpa pergeseran tata letak liar' },
        { label: 'Accessibility Ratio', val: '100%', status: 'Inklusif', sub: 'Sesuai standar kontras & navigasi' },
      ],
      points: [
        'CSS zero-runtime untuk rendering instan',
        'Tipografi proporsional dengan kontras minimal 4.5:1',
        'Ukuran aset terkontrol dengan format modern (SVG / AVIF)',
        'Navigasi keyboard terpadu tanpa jebakan fokus',
      ],
    },
  },
  {
    id: 6,
    type: 'conclusion',
    category: 'Rangkuman & Diskusi',
    title: 'Mulai Langkah Pertama Anda',
    subtitle: 'Kunci arsitektur web modern terletak pada kesederhanaan, performa, dan konsistensi estetika.',
    notes: 'Ajak audiens bertanya atau berdiskusi seputar tugas pemrograman web pekan pertama.',
    content: {
      quote: 'Kesederhanaan adalah puncak kecanggihan dalam rekayasa perangkat lunak.',
      author: 'Leonardo da Vinci / Design Philosophy',
      actions: [
        { label: 'Ulangi Slide', action: 'restart' },
        { label: 'Buka Grid Overview', action: 'overview' },
      ],
      resources: [
        { title: 'Dokumentasi Kuliah', desc: 'Silabus & modul praktikum Web 1' },
        { title: 'Standar W3C', desc: 'Pedoman HTML5 & aksesibilitas semantik' },
        { title: 'Tailwind CSS Docs', desc: 'Panduan utility token & layout modern' },
      ],
    },
  },
];

// --- COMPONENT UTILS (INLINE ICONS TO AVOID MISSING PACKAGES) ---
function IconChevronLeft({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  );
}

function IconChevronRight({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}

function IconGrid({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  );
}

function IconFullscreen({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
    </svg>
  );
}

function IconNotes({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    </svg>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function PresentationApp() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showOverview, setShowOverview] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const totalSlides = SLIDES.length;
  const currentSlide = SLIDES[currentSlideIndex];

  // Navigation callbacks
  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const jumpToSlide = (idx: number) => {
    setCurrentSlideIndex(idx);
    setShowOverview(false);
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        setCurrentSlideIndex(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setCurrentSlideIndex(totalSlides - 1);
      } else if (e.key.toLowerCase() === 'o') {
        e.preventDefault();
        setShowOverview((v) => !v);
      } else if (e.key.toLowerCase() === 'n') {
        e.preventDefault();
        setShowNotes((v) => !v);
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'Escape') {
        setShowOverview(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [nextSlide, prevSlide, totalSlides]);

  // Presentation stopwatch
  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formattedTimer = useMemo(() => {
    const mins = Math.floor(timerSeconds / 60);
    const secs = timerSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }, [timerSeconds]);

  // Fullscreen support
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
      }
    }
  };

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const handleCopyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const progressPercent = ((currentSlideIndex + 1) / totalSlides) * 100;

  return (
    <div className="min-h-screen w-full bg-[#f4f9fd] text-slate-800 flex flex-col font-sans select-none antialiased relative overflow-x-hidden selection:bg-sky-200 selection:text-sky-900">
      {/* Ambient Light Blue Glows */}
      <div className="fixed -top-40 -left-40 w-96 h-96 rounded-full bg-sky-200/40 blur-3xl pointer-events-none -z-10" />
      <div className="fixed -bottom-40 -right-40 w-96 h-96 rounded-full bg-blue-200/30 blur-3xl pointer-events-none -z-10" />

      {/* TOP BAR / HEADER */}
      <header className="h-16 px-6 sm:px-10 bg-white/80 backdrop-blur-md border-b border-sky-100 flex items-center justify-between sticky top-0 z-30 shadow-[0_2px_10px_rgba(2,132,199,0.03)]">
        {/* Brand / Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-sky-400 flex items-center justify-center text-white shadow-sm shadow-sky-500/20">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
            </svg>
          </div>
          <div className="flex items-baseline gap-2">
            <h1 className="text-sm font-semibold text-slate-900 tracking-tight">Presentation Deck</h1>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[11px] font-medium bg-sky-100/70 text-sky-700 border border-sky-200/60">
              Light Blue Minimalist
            </span>
          </div>
        </div>

        {/* Center: Slide indicator & Overview Button */}
        <button
          onClick={() => setShowOverview(true)}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 hover:bg-sky-100/80 border border-sky-200/70 text-xs font-semibold text-sky-800 transition cursor-pointer shadow-xs"
          title="Lihat Daftar Slide (Shortcut: O)"
        >
          <IconGrid className="w-3.5 h-3.5 text-sky-600" />
          <span>
            Slide <span className="text-sky-600 font-bold">{String(currentSlideIndex + 1).padStart(2, '0')}</span> / {String(totalSlides).padStart(2, '0')}
          </span>
        </button>

        {/* Right Tools: Stopwatch, Notes, Fullscreen */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Stopwatch */}
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-white border border-slate-200/80 text-slate-600 hover:border-sky-200 hover:text-sky-700 transition cursor-pointer"
            title="Klik untuk Pause/Resume Timer"
          >
            <span className={`w-2 h-2 rounded-full ${isTimerRunning ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
            <span>{formattedTimer}</span>
          </button>

          {/* Notes Toggle */}
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`p-2 rounded-lg text-xs font-medium transition cursor-pointer ${
              showNotes
                ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/20'
                : 'bg-white hover:bg-sky-50 text-slate-600 border border-slate-200/80 hover:border-sky-200'
            }`}
            title="Catatan Pembicara (Shortcut: N)"
          >
            <IconNotes />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-white hover:bg-sky-50 text-slate-600 border border-slate-200/80 hover:border-sky-200 transition cursor-pointer"
            title="Layar Penuh (Shortcut: F)"
          >
            <IconFullscreen />
          </button>
        </div>
      </header>

      {/* TOP PROGRESS LINE */}
      <div className="w-full bg-sky-100/50 h-1 relative">
        <div
          className="h-full bg-gradient-to-r from-sky-400 to-sky-600 transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* PRESENTATION CANVAS */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8 md:p-12 relative max-w-6xl mx-auto w-full">
        {/* Left Arrow Floating Button */}
        <button
          onClick={prevSlide}
          disabled={currentSlideIndex === 0}
          className={`hidden md:flex absolute left-2 lg:left-0 z-20 w-11 h-11 rounded-full items-center justify-center transition shadow-sm backdrop-blur-md cursor-pointer ${
            currentSlideIndex === 0
              ? 'opacity-30 cursor-not-allowed bg-white/40 text-slate-400 border border-slate-200'
              : 'bg-white/90 text-sky-700 hover:bg-sky-50 border border-sky-100 hover:scale-105 active:scale-95 shadow-sky-100'
          }`}
          title="Slide Sebelumnya (←)"
        >
          <IconChevronLeft />
        </button>

        {/* Slide Card Container */}
        <div className="w-full min-h-[500px] max-h-[700px] bg-white/95 backdrop-blur-xl rounded-3xl border border-sky-100/90 shadow-[0_8px_30px_rgb(2,132,199,0.06)] p-6 sm:p-10 md:p-12 flex flex-col justify-between relative overflow-hidden transition-all duration-200">
          {/* Subtle Watermark Slide Number */}
          <div className="absolute right-6 bottom-4 text-sky-100/50 font-black text-8xl md:text-9xl pointer-events-none select-none tracking-tighter">
            {String(currentSlideIndex + 1).padStart(2, '0')}
          </div>

          {/* Top Category Tag */}
          <div className="flex items-center justify-between border-b border-sky-50 pb-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                {currentSlide.category}
              </span>
            </div>
            <div className="text-xs font-medium text-slate-400">
              Bagian {currentSlideIndex + 1} dari {totalSlides}
            </div>
          </div>

          {/* DYNAMIC SLIDE CONTENT */}
          <div className="flex-1 flex flex-col justify-center py-2">
            {/* 1. INTRO / COVER */}
            {currentSlide.type === 'intro' && (
              <div className="space-y-6 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200/80 text-xs font-semibold text-sky-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  Kuliah Pemrograman Web • Materi Pekan 1
                </div>

                <div className="space-y-3">
                  <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    {currentSlide.title}
                  </h2>
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                    {currentSlide.subtitle}
                  </p>
                </div>

                {/* Meta details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-sky-50">
                  {currentSlide.content.meta.map((item: any, i: number) => (
                    <div key={i} className="p-3.5 rounded-2xl bg-sky-50/50 border border-sky-100/80">
                      <div className="text-[11px] font-semibold text-sky-600 uppercase tracking-wider">{item.label}</div>
                      <div className="text-sm font-bold text-slate-800 mt-0.5">{item.value}</div>
                    </div>
                  ))}
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs text-slate-400 font-medium mr-1">Stack:</span>
                  {currentSlide.content.tags.map((tag: string, i: number) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white border border-sky-200/60 text-sky-800 shadow-2xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 2. PILLARS */}
            {currentSlide.type === 'pillars' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{currentSlide.title}</h2>
                  <p className="text-sm text-slate-600 mt-1">{currentSlide.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  {currentSlide.content.cards.map((card: any, i: number) => (
                    <div
                      key={i}
                      className="p-5 rounded-2xl bg-gradient-to-b from-sky-50/50 to-white border border-sky-100/90 hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-black text-sky-400">{card.no}</span>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white border border-sky-100 text-sky-700">
                            {card.subtitle}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-slate-800 mb-2">{card.title}</h3>
                        <p className="text-xs text-slate-600 leading-relaxed mb-4">{card.desc}</p>
                      </div>

                      <div className="space-y-1.5 pt-3 border-t border-sky-100/60">
                        {card.badges.map((b: string, bIdx: number) => (
                          <div key={bIdx} className="flex items-center gap-2 text-xs text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. ARCHITECTURE PIPELINE */}
            {currentSlide.type === 'architecture' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{currentSlide.title}</h2>
                  <p className="text-sm text-slate-600 mt-1">{currentSlide.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                  {currentSlide.content.steps.map((st: any, i: number) => (
                    <div
                      key={i}
                      className="p-5 rounded-2xl bg-white border border-sky-100 relative group hover:border-sky-300 transition shadow-2xs"
                    >
                      <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 text-xs font-bold flex items-center justify-center mb-3">
                        {st.step}
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-sky-600 block mb-1">
                        {st.tag}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 mb-2">{st.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. CODE PREVIEW */}
            {currentSlide.type === 'code' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{currentSlide.title}</h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">{currentSlide.subtitle}</p>
                  </div>
                  <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200/60 self-start">
                    {currentSlide.content.highlight}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-1">
                  <div className="lg:col-span-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm overflow-hidden text-slate-200">
                    <div className="px-4 py-2 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        </div>
                        <span className="text-xs font-mono text-slate-400 ml-2">{currentSlide.content.filename}</span>
                      </div>
                      <button
                        onClick={() => handleCopyCode(currentSlide.content.code)}
                        className="text-xs font-medium text-slate-400 hover:text-white px-2 py-0.5 rounded hover:bg-slate-700 transition cursor-pointer"
                      >
                        {copiedCode ? <span className="text-emerald-400">✓ Tersalin</span> : 'Salin Kode'}
                      </button>
                    </div>

                    <div className="p-4 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-sky-200/90">
                      <pre>
                        <code>{currentSlide.content.code}</code>
                      </pre>
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex flex-col justify-center space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-sky-700">Analisis Komponen:</h4>
                    {currentSlide.content.insights.map((point: string, idx: number) => (
                      <div key={idx} className="p-3 rounded-xl bg-sky-50/60 border border-sky-100 flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-sky-500/10 text-sky-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-xs text-slate-700 font-medium leading-normal">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 5. METRICS */}
            {currentSlide.type === 'metrics' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{currentSlide.title}</h2>
                  <p className="text-sm text-slate-600 mt-1">{currentSlide.subtitle}</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {currentSlide.content.metrics.map((m: any, i: number) => (
                    <div key={i} className="p-4 rounded-2xl bg-gradient-to-b from-sky-50/40 to-white border border-sky-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-semibold text-sky-600 uppercase tracking-wide">Status</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-sky-100 text-sky-800">
                          {m.status}
                        </span>
                      </div>
                      <div className="text-2xl font-black text-slate-900 mb-1">{m.val}</div>
                      <div className="text-xs font-bold text-slate-700 mb-0.5">{m.label}</div>
                      <p className="text-[11px] text-slate-500">{m.sub}</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100/80">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-sky-700 mb-2">Praktik Terbaik:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    {currentSlide.content.points.map((pt: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 6. CONCLUSION */}
            {currentSlide.type === 'conclusion' && (
              <div className="text-center max-w-2xl mx-auto space-y-6 py-4">
                <div className="w-16 h-16 rounded-2xl bg-sky-100/70 border border-sky-200/80 flex items-center justify-center mx-auto text-sky-600 shadow-sm">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                <div className="space-y-2">
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">{currentSlide.title}</h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light italic">
                    &ldquo;{currentSlide.content.quote}&rdquo;
                  </p>
                  <p className="text-xs text-sky-700 font-semibold">{currentSlide.content.author}</p>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => jumpToSlide(0)}
                    className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-sky-600/20 transition cursor-pointer"
                  >
                    Ulangi dari Awal
                  </button>
                  <button
                    onClick={() => setShowOverview(true)}
                    className="px-5 py-2.5 rounded-xl bg-white hover:bg-sky-50 text-sky-800 border border-sky-200 font-semibold text-xs sm:text-sm transition cursor-pointer"
                  >
                    Semua Slide
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* PRESENTER NOTES DRAWER */}
          {showNotes && (
            <div className="mt-3 p-3.5 rounded-xl bg-sky-50 border border-sky-200/80 text-sky-900 text-xs flex items-start gap-2.5">
              <IconNotes className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-sky-800 mr-1.5">Catatan Presenter:</span>
                <span className="text-slate-700 leading-relaxed">{currentSlide.notes}</span>
              </div>
            </div>
          )}

          {/* SLIDE FOOTER HINTS */}
          <div className="border-t border-sky-50 pt-3 mt-4 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline">Navigasi:</span>
              <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-[11px] font-mono text-slate-600">←</kbd>
              <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-[11px] font-mono text-slate-600">→</kbd>
              <span className="hidden md:inline text-slate-300">|</span>
              <span className="hidden md:inline">
                Overview: <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-[11px] font-mono text-slate-600">O</kbd>
              </span>
            </div>
            <div className="font-medium text-sky-600/80">
              Clean Light Blue Theme
            </div>
          </div>
        </div>

        {/* Right Arrow Floating Button */}
        <button
          onClick={nextSlide}
          disabled={currentSlideIndex === totalSlides - 1}
          className={`hidden md:flex absolute right-2 lg:right-0 z-20 w-11 h-11 rounded-full items-center justify-center transition shadow-sm backdrop-blur-md cursor-pointer ${
            currentSlideIndex === totalSlides - 1
              ? 'opacity-30 cursor-not-allowed bg-white/40 text-slate-400 border border-slate-200'
              : 'bg-white/90 text-sky-700 hover:bg-sky-50 border border-sky-100 hover:scale-105 active:scale-95 shadow-sky-100'
          }`}
          title="Slide Berikutnya (→ / Spasi)"
        >
          <IconChevronRight />
        </button>
      </main>

      {/* FLOATING CONTROLLER DOCK (BOTTOM) */}
      <footer className="p-4 pb-6 flex items-center justify-center sticky bottom-0 z-30 pointer-events-none">
        <nav
          aria-label="Kontrol Presentasi"
          className="pointer-events-auto bg-white/90 backdrop-blur-lg border border-sky-200/80 shadow-lg shadow-sky-900/[0.05] rounded-2xl px-4 py-2 flex items-center gap-3 sm:gap-4"
        >
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            disabled={currentSlideIndex === 0}
            className={`p-2 rounded-xl transition cursor-pointer ${
              currentSlideIndex === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-sky-700 hover:bg-sky-50'
            }`}
            title="Sebelumnya"
          >
            <IconChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5 px-2">
            {SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => jumpToSlide(idx)}
                className={`transition-all duration-200 rounded-full cursor-pointer ${
                  currentSlideIndex === idx ? 'w-7 h-2 bg-sky-500' : 'w-2 h-2 bg-sky-200 hover:bg-sky-300'
                }`}
                title={`Pindah ke slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            disabled={currentSlideIndex === totalSlides - 1}
            className={`p-2 rounded-xl transition cursor-pointer ${
              currentSlideIndex === totalSlides - 1 ? 'text-slate-300 cursor-not-allowed' : 'text-sky-700 hover:bg-sky-50'
            }`}
            title="Berikutnya"
          >
            <IconChevronRight className="w-5 h-5" />
          </button>

          <div className="w-px h-5 bg-sky-100 mx-1 hidden sm:block" />

          {/* Overview button */}
          <button
            onClick={() => setShowOverview(true)}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-sky-700 hover:bg-sky-50 transition cursor-pointer"
          >
            <IconGrid className="w-3.5 h-3.5 text-sky-600" />
            <span>Overview</span>
          </button>
        </nav>
      </footer>

      {/* MODAL: OVERVIEW GRID */}
      {showOverview && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white rounded-3xl border border-sky-100 shadow-2xl max-w-4xl w-full p-6 sm:p-8 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-sky-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Daftar Slide Presentasi</h3>
                <p className="text-xs text-slate-500">Pilih slide untuk berpindah langsung</p>
              </div>
              <button
                onClick={() => setShowOverview(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
                title="Tutup (Esc)"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto py-5 pr-1">
              {SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => jumpToSlide(idx)}
                  className={`text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    currentSlideIndex === idx
                      ? 'bg-sky-50 border-sky-400 ring-2 ring-sky-300'
                      : 'bg-white border-slate-200/80 hover:border-sky-200 hover:bg-sky-50/30'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">
                        Slide {String(idx + 1).padStart(2, '0')}
                      </span>
                      {currentSlideIndex === idx && (
                        <span className="text-[10px] font-bold text-white bg-sky-500 px-1.5 py-0.2 rounded-full">
                          Aktif
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 line-clamp-1">{s.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{s.subtitle}</p>
                  </div>
                  <div className="text-[11px] text-sky-700/80 font-medium pt-3 mt-2 border-t border-sky-100/60">
                    {s.category}
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-sky-100 flex justify-end">
              <button
                onClick={() => setShowOverview(false)}
                className="px-4 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-semibold transition cursor-pointer"
              >
                Tutup Overview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
