"use client";

export default function Hero({ onOpenModal }) {
  return (
    <header id="hero" className="relative pt-32 sm:pt-36 pb-20 sm:pb-24 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#050811] via-[#081024] to-[#050811] border-b border-white/5">
      {/* Ambient Floating Radial Lights & Tactical Grid */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-rose-600/15 via-blue-600/10 to-amber-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 tactical-grid-bg opacity-30 pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Hero Headline & Description */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-rose-950/60 to-slate-900/80 border border-rose-500/30 text-rose-300 text-xs font-bold tracking-wide shadow-lg shadow-rose-950/40 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
              </span>
              <span className="tracking-wider uppercase text-[11px] sm:text-xs">Korps Polisi Taruna SMKN 2 Depok</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
              Disiplin, Ketertiban, dan{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-amber-400">
                Keteladanan Karakter.
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-normal">
              Membangun lingkungan sekolah yang kondusif melalui penegakan tata tertib yang konsisten,
              pembinaan fisik berkala, serta penanaman rasa tanggung jawab bersama.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a href="#about" className="btn-primary text-xs sm:text-sm group">
                <span>Tentang Polisi Taruna</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <a href="#kontak" className="btn-secondary text-xs sm:text-sm group">
                <span>Layanan Pengaduan</span>
                <svg className="w-4 h-4 text-slate-400 group-hover:text-amber-400 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Right: High Quality Team Photo Showcase */}
          <div className="lg:col-span-6">
            <div
              className="group relative cursor-pointer rounded-2xl overflow-hidden border border-white/15 bg-slate-900/60 shadow-2xl shadow-black/80 transition-all duration-500 hover:border-rose-500/40 hover:shadow-rose-950/30"
              onClick={() => onOpenModal && onOpenModal("/images/allanggota.jpg")}
            >
              {/* Corner tactical accents */}
              <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-rose-500/70 z-20 pointer-events-none" />
              <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-rose-500/70 z-20 pointer-events-none" />
              <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-rose-500/70 z-20 pointer-events-none" />
              <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-rose-500/70 z-20 pointer-events-none" />

              <img
                src="/images/allanggota.jpg"
                alt="Foto Bersama Seluruh Anggota Polisi Taruna SMKN 2 Depok"
                className="w-full h-[320px] sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-black/30 to-transparent flex flex-col justify-end p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">Korps Polisi Taruna</h3>
                    <p className="text-xs text-amber-400 font-mono font-medium">SMKN 2 Depok</p>
                  </div>
                  <span className="text-xs px-3 py-1.5 rounded-lg bg-white/10 text-white backdrop-blur-md border border-white/20 font-semibold group-hover:bg-rose-500 group-hover:border-rose-400 transition-all duration-200 shadow-lg">
                    Perbesar Foto ↗
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Ringkasan Nilai Utama */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 sm:mt-20">
          <div className="glass-card p-6 sm:p-7 hover:border-rose-500/30 group">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-rose-500/20 transition-all duration-300 shadow-lg shadow-rose-950/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-rose-300 transition-colors">
              Disiplin &amp; Kepatuhan
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Menjunjung tinggi ketepatan waktu, kerapihan seragam, dan kesadaran mematuhi norma tata tertib
              sekolah.
            </p>
          </div>

          <div className="glass-card p-6 sm:p-7 hover:border-amber-500/30 group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-300 shadow-lg shadow-amber-950/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-amber-300 transition-colors">
              Integritas &amp; Keteladanan
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Mengedepankan kejujuran, sikap saling menghargai, dan menjadi contoh yang baik bagi seluruh
              siswa.
            </p>
          </div>

          <div className="glass-card p-6 sm:p-7 hover:border-blue-500/30 group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/25 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300 shadow-lg shadow-blue-950/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-1 tracking-tight group-hover:text-blue-300 transition-colors">
              Solidaritas &amp; Kekeluargaan
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Mempererat hubungan persaudaraan antar-taruna secara positif, sehat, dan tanpa senioritas
              negatif.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
