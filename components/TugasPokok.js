export default function TugasPokok() {
  return (
    <section id="tugas" className="py-20 border-t border-white/5 relative overflow-hidden">
      {/* Floating Ambient Background Light */}
      <div className="floating-accent w-72 h-72 bg-rose-600 top-10 -left-20"></div>
      <div
        className="floating-accent w-80 h-80 bg-amber-500 bottom-0 -right-24"
        style={{ animationDelay: "-4s" }}
      ></div>

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="badge-pill mb-3 inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span>Tugas &amp; Tanggung Jawab</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Program &amp; Tugas Pokok
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Peran strategis dan program kerja rutin yang dijalankan Korps Polisi Taruna SMKN 2 Depok.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* TUGAS 1: Gerakan Disiplin Taruna */}
          <div className="task-card group" style={{ "--card-glow": "rgba(225, 29, 72, 0.2)" }}>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="task-icon-box bg-rose-500/10 border border-rose-500/20 text-rose-400 shadow-lg shadow-rose-900/20">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div className="flex items-center gap-2 flex-wrap justify-end">
                <span className="task-tag bg-rose-500/15 text-rose-300 border border-rose-500/30 inline-flex items-center gap-1.5">
                  <span className="live-dot bg-rose-400"></span> Gerbang Pagi
                </span>
                <span className="text-[11px] text-slate-400 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 font-mono">
                  05.40 - 07.00 WIB
                </span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-rose-300 transition-colors">
              Gerakan Disiplin Taruna (GDT)
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
              GDT adalah singkatan dari Gerakan Disiplin Taruna Kegiatan ini biasa dilakukan untuk
              mendisiplinkan dan menindak taruna/i yang melanggar peraturan dan tata tertib di sekolah.
            </p>

            <div className="space-y-2 pt-3 border-t border-white/10 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-rose-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Pemeriksaan kelengkapan seragam, topi, dasi, dan kerapihan rambut</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-rose-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Pencatatan kedisiplinan dan ketepatan waktu hadir</span>
              </div>
            </div>
          </div>

          {/* TUGAS 2: Patroli & Ketertiban Area */}
          <div className="task-card group" style={{ "--card-glow": "rgba(245, 158, 11, 0.2)" }}>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="task-icon-box bg-amber-500/10 border border-amber-500/20 text-amber-400 shadow-lg shadow-amber-900/20">
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
              <div className="flex items-center gap-2 flex-wrap justify-end">
                <span className="task-tag bg-amber-500/15 text-amber-300 border border-amber-500/30 inline-flex items-center gap-1.5">
                  <span className="live-dot bg-amber-400"></span> Patroli Area
                </span>
                <span className="text-[11px] text-slate-400 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 font-mono">
                  Jam Efektif
                </span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
              SWEEPING
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
              Sweping bertujuan untuk menggerakkan Taruna/I secara menyeluruh. Agar segera mengikuti kegiatan
              seperti upacara, apel, dzikir dan lain sebagainya.
            </p>

            <div className="space-y-2 pt-3 border-t border-white/10 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-amber-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>
                  Patroli keseluruhan lingkungan sekolah demi efisiensi waktu serta memastikan kegiatan berjalan
                  lancar.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-amber-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Mencegah Taruna/Taruni bolos kegiatan seperti upacara dan lain sebagainya.</span>
              </div>
            </div>
          </div>

          {/* TUGAS 3: Pengawalan Upacara & Apel */}
          <div className="task-card group" style={{ "--card-glow": "rgba(59, 130, 246, 0.2)" }}>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="task-icon-box bg-blue-500/10 border border-blue-500/20 text-blue-400 shadow-lg shadow-blue-900/20">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                  />
                </svg>
              </div>
              <div className="flex items-center gap-2 flex-wrap justify-end">
                <span className="task-tag bg-blue-500/15 text-blue-300 border border-blue-500/30 inline-flex items-center gap-1.5">
                  <span className="live-dot bg-blue-400"></span> Seremonial
                </span>
                <span className="text-[11px] text-slate-400 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 font-mono">
                  Senin &amp; Hari Besar
                </span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
              Pengawalan Upacara &amp; Apel
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
              Mengatur barisan, merapikan formasi tiap kelas, dan menjaga kekhidmatan upacara bendera.
            </p>

            <div className="space-y-2 pt-3 border-t border-white/10 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-blue-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Pengondisian barisan dan kerapihan formasi lapangan</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-blue-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>
                  Memastikan tidak ada yang ngobrol ataupun bercanda saat upacara/apel berlangsung
                </span>
              </div>
            </div>
          </div>

          {/* TUGAS 4: Pembinaan Karakter & Jasmani */}
          <div className="task-card group" style={{ "--card-glow": "rgba(168, 85, 247, 0.2)" }}>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="task-icon-box bg-purple-500/10 border border-purple-500/20 text-purple-400 shadow-lg shadow-purple-900/20">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex items-center gap-2 flex-wrap justify-end">
                <span className="task-tag bg-purple-500/15 text-purple-300 border border-purple-500/30 inline-flex items-center gap-1.5">
                  <span className="live-dot bg-purple-400"></span> Pembinaan
                </span>
                <span className="text-[11px] text-slate-400 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 font-mono">
                  Rutin Mingguan
                </span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
              Latihan PBB &amp; Pembinaan Jasmani
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
              Pengembangan fisik, mental, dan kepemimpinan untuk membentuk karakter taruna yang berintegritas.
            </p>

            <div className="space-y-2 pt-3 border-t border-white/10 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-purple-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Latihan Peraturan Baris Berbaris (PBB) dasar &amp; variasi</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-purple-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Pembinaan Fisik (Binsik) dan ketahanan stamina</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
