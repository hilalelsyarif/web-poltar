export default function VisiMisi() {
  return (
    <section id="visimisi" className="py-20 sm:py-24 border-t border-white/5 relative overflow-hidden bg-[#050811]/60">
      {/* Subtle Ambient Background */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-80 h-80 bg-rose-500/5 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-80 h-80 bg-amber-500/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16" data-aos="fade-up">
          <div className="badge-pill mb-3">Visi &amp; Misi</div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">Arah &amp; Komitmen</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2.5 leading-relaxed">
            Landasan utama dalam menjalankan setiap program kerja dan pembinaan taruna.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* VISI CARD */}
          <div className="glass-card relative overflow-hidden p-7 sm:p-10 flex flex-col justify-between group hover:border-rose-500/40 hover:shadow-2xl hover:shadow-rose-950/20 transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-rose-400 to-transparent" />

            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-rose-500/20 transition-all duration-300 shadow-lg shadow-rose-950/20">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-rose-400/90 font-bold px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
                  Target Jangka Panjang
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-rose-300 transition-colors">
                Visi Utama
              </h3>

              <div className="relative p-5 sm:p-6 rounded-xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed italic font-light">
                  &ldquo;Mewujudkan lingkungan SMKN 2 Depok yang aman, tertib, dan berbudaya disiplin dengan membentuk
                  taruna/taruni yang berintegritas tinggi, berakhlak mulia, dan siap bersaing.&rdquo;
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-2 text-xs text-slate-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <span>Fondasi Pembinaan Karakter Taruna</span>
            </div>
          </div>

          {/* MISI CARD */}
          <div className="glass-card relative overflow-hidden p-7 sm:p-10 flex flex-col justify-between group hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-950/20 transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-transparent" />

            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-300 shadow-lg shadow-amber-950/20">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400/90 font-bold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                  Aksi Berkelanjutan
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-amber-300 transition-colors">
                Misi Operasional
              </h3>

              <ul className="space-y-3.5">
                <li className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-amber-500/30 hover:bg-white/[0.05] transition-all duration-200">
                  <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-400 font-bold text-xs flex items-center justify-center font-mono mt-0.5">
                    01
                  </span>
                  <span className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Membantu penegakan tata tertib sekolah secara adil, konsisten, dan edukatif.
                  </span>
                </li>

                <li className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-amber-500/30 hover:bg-white/[0.05] transition-all duration-200">
                  <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-400 font-bold text-xs flex items-center justify-center font-mono mt-0.5">
                    02
                  </span>
                  <span className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Melaksanakan pembinaan fisik dan mental secara rutin dan terukur.
                  </span>
                </li>

                <li className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-amber-500/30 hover:bg-white/[0.05] transition-all duration-200">
                  <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-400 font-bold text-xs flex items-center justify-center font-mono mt-0.5">
                    03
                  </span>
                  <span className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Membangun rasa persaudaraan, kepemimpinan, dan keteladanan di kalangan siswa.
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-2 text-xs text-slate-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>Langkah Nyata Penegakan Disiplin</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
