"use client";

export default function Hero({ onOpenModal }) {
  return (
    <header id="hero" className="pt-32 pb-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Hero Headline & Description */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 badge-pill">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <span>Korps Polisi Taruna SMKN 2 Depok</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Disiplin, Ketertiban, dan{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-400">
                Keteladanan Karakter.
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Membangun lingkungan sekolah yang kondusif melalui penegakan tata tertib yang konsisten,
              pembinaan fisik berkala, serta penanaman rasa tanggung jawab bersama.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a href="#about" className="btn-primary text-xs sm:text-sm">
                <span>Tentang Polisi Taruna</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <a href="#kontak" className="btn-secondary text-xs sm:text-sm">
                <span>Layanan Pengaduan</span>
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              className="img-showcase group relative cursor-pointer glow-border"
              onClick={() => onOpenModal && onOpenModal("/images/allanggota.jpg")}
            >
              <img
                src="/images/allanggota.jpg"
                alt="Foto Bersama Seluruh Anggota Polisi Taruna SMKN 2 Depok"
                className="w-full h-[320px] sm:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-black/30 to-transparent flex flex-col justify-end p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">Korps Polisi Taruna</h3>
                    <p className="text-xs text-slate-300">SMKN 2 Depok</p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-md bg-white/15 text-white backdrop-blur-md border border-white/20">
                    Perbesar Foto ↗
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Ringkasan Nilai Utama */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-14">
          <div className="glass-card p-5">
            <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-base font-bold text-white mb-1">Disiplin &amp; Kepatuhan</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Menjunjung tinggi ketepatan waktu, kerapihan seragam, dan kesadaran mematuhi norma tata tertib
              sekolah.
            </p>
          </div>

          <div className="glass-card p-5">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-base font-bold text-white mb-1">Integritas &amp; Keteladanan</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mengedepankan kejujuran, sikap saling menghargai, dan menjadi contoh yang baik bagi seluruh
              siswa.
            </p>
          </div>

          <div className="glass-card p-5">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-base font-bold text-white mb-1">Solidaritas &amp; Kekeluargaan</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mempererat hubungan persaudaraan antar-taruna secara positif, sehat, dan tanpa senioritas
              negatif.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
