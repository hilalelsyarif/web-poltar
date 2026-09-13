export default function VisiMisi() {
  return (
    <section id="visimisi" className="py-16 border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="badge-pill mb-3">Visi &amp; Misi</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Arah &amp; Komitmen</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Landasan utama dalam menjalankan setiap program kerja dan pembinaan taruna.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* VISI */}
          <div className="glass-card p-6 sm:p-8">
            <div className="w-9 h-9 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Visi Utama</h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Mewujudkan lingkungan SMKN 2 Depok yang aman, tertib, dan berbudaya disiplin dengan membentuk
              taruna/taruni yang berintegritas tinggi, berakhlak mulia, dan siap bersaing.
            </p>
          </div>

          {/* MISI */}
          <div className="glass-card p-6 sm:p-8">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Misi Operasional</h3>
            <ul className="text-slate-300 text-xs sm:text-sm space-y-2.5 leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">•</span>
                <span>Membantu penegakan tata tertib sekolah secara adil, konsisten, dan edukatif.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">•</span>
                <span>Melaksanakan pembinaan fisik dan mental secara rutin dan terukur.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">•</span>
                <span>Membangun rasa persaudaraan, kepemimpinan, dan keteladanan di kalangan siswa.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
