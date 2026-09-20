export default function WajibJanjiPoltar() {
  const delapanWajib = [
    "Bersikap Ramah Tamah Terhadap Guru, Orang Tua, dan Masyarakat",
    "Bersikap Sopan Santun Terhadap Guru, Orang Tua, dan Masyarakat",
    "Menjunjung Tinggi Hak Asasi Manusia",
    "Menjaga Kehormatan Diri di Muka Umum",
    "Senantiasa Menjadi Contoh Dalam Sikap dan Perkataan",
    "Tidak Sekali-kali Merugikan Sekolah dan Organisasi",
    "Tidak Sekali-kali Melakukan Bullying",
    "Menjadi Contoh dan Pelopor Tata Tertib Sekolah",
  ];

  const janjiPoltar = [
    "Akan Menjalankan Kewajiban Terhadap Tuhan Yang Maha Esa",
    "Mentaati Tata Tertib Sekolah dan Menjadi Pelopor Dalam Penegakan Disiplin Sekolah",
    "Menjunjung Tinggi Almamater SMK Negeri 2 Kota Depok Dengan Prestasi dan Akhlakul Karimah",
    "Melaksanakan Program Kerja Poltar SMK Negeri 2 Kota Depok Dengan Penuh Tanggung Jawab",
    "Menjadi Teladan Bagi Taruna dan Taruni SMK Negeri 2 Kota Depok Dalam Sikap, Disiplin, Perkataan, dan Tingkah Laku",
    "Rela Meluangkan Waktu, Pikiran, dan Tenaga Untuk Kepentingan Poltar SMK Negeri 2 Kota Depok",
  ];

  return (
    <section
      id="wajib-poltar"
      className="py-16 sm:py-24 border-t border-white/5 relative overflow-hidden bg-[#050811]/70"
    >
      {/* Subtle Ambient Background Light */}
      <div className="absolute top-1/2 left-8 -translate-y-1/2 w-80 h-80 bg-rose-600/10 blur-[110px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-8 -translate-y-1/2 w-80 h-80 bg-amber-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16" data-aos="fade-up">
          <div className="badge-pill mb-3 inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span>Pedoman &amp; Ikrar Korps</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            8 Wajib &amp; Janji Poltar
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2.5 leading-relaxed">
            Landasan moral, pedoman sikap kedisiplinan, serta ikrar komitmen anggota Korps Polisi Taruna SMKN 2 Depok.
          </p>
        </div>

        {/* 2-Column Side-by-Side Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* KOLOM KIRI: 8 WAJIB POLTAR */}
          <div
            className="glass-card relative overflow-hidden p-6 sm:p-8 flex flex-col justify-between group hover:border-rose-500/40 hover:shadow-2xl hover:shadow-rose-950/20 transition-all duration-300"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {/* Top Red Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-rose-400 to-transparent" />

            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-400 flex items-center justify-center group-hover:scale-105 group-hover:bg-rose-500/20 transition-all duration-300 shadow-lg shadow-rose-950/20 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-rose-300 transition-colors">
                      8 WAJIB POLTAR
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-400">Pedoman Sikap &amp; Perilaku</p>
                  </div>
                </div>
              </div>

              {/* Numbered List */}
              <ol className="space-y-2.5 sm:space-y-3">
                {delapanWajib.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 p-2.5 sm:p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-rose-500/30 hover:bg-white/[0.04] transition-all duration-200 group/item"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-400 font-bold text-xs flex items-center justify-center font-mono mt-0.5 group-hover/item:scale-105 group-hover/item:bg-rose-500/25 transition-all">
                      {index + 1}
                    </span>
                    <span className="text-slate-200 text-xs sm:text-sm leading-relaxed font-normal">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Card Footer */}
            <div className="pt-4 mt-6 border-t border-white/10 flex items-center gap-2 text-xs text-slate-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <span>Fondasi Pembinaan Karakter &amp; Disiplin</span>
            </div>
          </div>

          {/* KOLOM KANAN: JANJI POLTAR */}
          <div
            id="janji-poltar"
            className="glass-card relative overflow-hidden p-6 sm:p-8 flex flex-col justify-between group hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-950/20 transition-all duration-300"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {/* Top Amber Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-transparent" />

            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400 flex items-center justify-center group-hover:scale-105 group-hover:bg-amber-500/20 transition-all duration-300 shadow-lg shadow-amber-950/20 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors">
                      JANJI POLTAR
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-400">Ikrar Kehormatan &amp; Pengabdian</p>
                  </div>
                </div>
              </div>

              {/* Numbered List */}
              <ol className="space-y-2.5 sm:space-y-3">
                {janjiPoltar.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 p-2.5 sm:p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-amber-500/30 hover:bg-white/[0.04] transition-all duration-200 group/item"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 font-bold text-xs flex items-center justify-center font-mono mt-0.5 group-hover/item:scale-105 group-hover/item:bg-amber-500/25 transition-all">
                      {index + 1}
                    </span>
                    <span className="text-slate-200 text-xs sm:text-sm leading-relaxed font-normal">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Card Footer */}
            <div className="pt-4 mt-6 border-t border-white/10 flex items-center gap-2 text-xs text-slate-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>Komitmen &amp; Janji Setia Kepada Almamater</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
