export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-20 pb-14 border-t border-white/10 bg-[#03060d] relative overflow-hidden">
      {/* Subtle Top Glow & Tactical Light */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-rose-500/60 to-transparent"></div>
      <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[550px] h-32 bg-rose-500/10 blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Col 1: Brand & Info */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1.5 p-2 bg-gradient-to-r from-white/[0.08] to-white/[0.03] rounded-xl border border-white/15 shadow-inner">
                <img src="/images/logodudep.jpg" alt="Logo SMKN 2 Depok" className="h-8 w-auto mix-blend-screen" />
                <img src="/images/logokorps.jpg" alt="Korps Taruna" className="h-8 w-auto mix-blend-screen" />
                <img src="/logo-poltar.png" alt="Logo Polisi Taruna" className="h-8 w-auto" />
              </div>
              <div>
                <span className="font-extrabold text-base tracking-wider text-white block leading-tight font-sans">
                  POLISI TARUNA
                </span>
                <span className="text-xs text-amber-400 font-bold tracking-widest block font-mono">
                  SMKN 2 DEPOK
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md font-normal">
              Korps penegak kedisiplinan, pembinaan jasmani, serta pembentukan karakter taruna/taruni yang
              berintegritas, tangguh, dan berwibawa di lingkungan SMKN 2 Kota Depok.
            </p>
            <div className="pt-2">
              <a
                href="https://instagram.com/poltar2depok"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-rose-500/15 border border-white/10 hover:border-rose-500/40 text-slate-300 hover:text-white transition-all text-xs font-semibold group shadow-lg shadow-black/40"
              >
                <svg
                  className="w-4 h-4 text-rose-400 fill-current group-hover:scale-110 transition-transform"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>
                  Ikuti Instagram Resmi: <strong className="text-white">@poltar2depok</strong>
                </span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (Tautan Cepat) */}
          <div className="lg:col-span-3 space-y-3.5 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
              <span>Tautan Cepat</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a
                  href="#hero"
                  className="hover:text-rose-400 transition-colors inline-flex items-center gap-2 py-0.5 group"
                >
                  <span className="text-rose-500/70 group-hover:text-rose-400 group-hover:translate-x-1 transition-transform font-mono text-sm leading-none">
                    &rsaquo;
                  </span>
                  <span>Beranda Utama</span>
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-rose-400 transition-colors inline-flex items-center gap-2 py-0.5 group"
                >
                  <span className="text-rose-500/70 group-hover:text-rose-400 group-hover:translate-x-1 transition-transform font-mono text-sm leading-none">
                    &rsaquo;
                  </span>
                  <span>Profil Korps</span>
                </a>
              </li>
              <li>
                <a
                  href="#wajib-poltar"
                  className="hover:text-rose-400 transition-colors inline-flex items-center gap-2 py-0.5 group"
                >
                  <span className="text-rose-500/70 group-hover:text-rose-400 group-hover:translate-x-1 transition-transform font-mono text-sm leading-none">
                    &rsaquo;
                  </span>
                  <span>8 Wajib &amp; Janji Poltar</span>
                </a>
              </li>
              <li>
                <a
                  href="#struktur"
                  className="hover:text-rose-400 transition-colors inline-flex items-center gap-2 py-0.5 group"
                >
                  <span className="text-rose-500/70 group-hover:text-rose-400 group-hover:translate-x-1 transition-transform font-mono text-sm leading-none">
                    &rsaquo;
                  </span>
                  <span>Struktur Kepengurusan</span>
                </a>
              </li>
              <li>
                <a
                  href="#tugas"
                  className="hover:text-rose-400 transition-colors inline-flex items-center gap-2 py-0.5 group"
                >
                  <span className="text-rose-500/70 group-hover:text-rose-400 group-hover:translate-x-1 transition-transform font-mono text-sm leading-none">
                    &rsaquo;
                  </span>
                  <span>Program &amp; Tugas Pokok</span>
                </a>
              </li>
              <li>
                <a
                  href="#kegiatan"
                  className="hover:text-rose-400 transition-colors inline-flex items-center gap-2 py-0.5 group"
                >
                  <span className="text-rose-500/70 group-hover:text-rose-400 group-hover:translate-x-1 transition-transform font-mono text-sm leading-none">
                    &rsaquo;
                  </span>
                  <span>Galeri Dokumentasi</span>
                </a>
              </li>
              <li>
                <a
                  href="#kontak"
                  className="hover:text-rose-400 transition-colors inline-flex items-center gap-2 py-0.5 group"
                >
                  <span className="text-rose-500/70 group-hover:text-rose-400 group-hover:translate-x-1 transition-transform font-mono text-sm leading-none">
                    &rsaquo;
                  </span>
                  <span>Layanan Pengaduan</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Address (Sekretariat & Lokasi) */}
          <div className="lg:col-span-4 space-y-3.5 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Sekretariat &amp; Lokasi</span>
            </h4>
            <div className="space-y-3 text-xs text-slate-400 leading-relaxed">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5 border border-amber-500/20">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <span>
                  SMKN 2 Kota Depok, Jl. Abdul Wahab No.1, Sawangan Lama, Kec. Sawangan, Kota Depok, Jawa Barat
                  16517
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="w-7 h-7 rounded-lg bg-white/5 text-slate-300 flex items-center justify-center flex-shrink-0 border border-white/10">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span>Senin &ndash; Jumat, 06.15 &ndash; 16.00 WIB</span>
              </div>
              <div className="pt-1">
                <a
                  href="https://maps.google.com/?q=SMKN+2+Depok"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 hover:text-amber-200 transition text-[11px] font-semibold group shadow-sm"
                >
                  <svg
                    className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                  <span>Lihat Peta di Google Maps ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Watermark & Back to Top */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p id="copyright-year">
              &copy; {currentYear} Korps Polisi Taruna SMKN 2 Depok. Hak Cipta Dilindungi.
            </p>
            <span className="hidden sm:inline text-white/20">|</span>
            <p className="text-slate-400 inline-flex items-center gap-1.5 flex-wrap justify-center">
              <span>Dibuat oleh <span className="text-slate-200 font-medium">Hilal El Syarif</span></span>
              <a
                href="https://instagram.com/hilalelsyrf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-rose-400 hover:text-rose-300 transition-colors font-medium hover:underline ml-0.5"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>@hilalelsyrf</span>
              </a>
            </p>
          </div>
          <a href="#hero" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition group">
            <span>Kembali ke Atas</span>
            <svg
              className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
