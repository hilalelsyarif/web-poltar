export default function About() {
  return (
    <section id="about" className="py-20 sm:py-24 border-t border-white/5 relative overflow-hidden bg-[#050811]/40">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16" data-aos="fade-up">
          <div className="badge-pill mb-3">Profil Organisasi</div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">Tentang Polisi Taruna</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2.5 leading-relaxed">
            Mengenal peran dan tujuan Korps Polisi Taruna SMKN 2 Depok dalam membina kedisiplinan sekolah.
          </p>
        </div>

        <div className="glass-card relative overflow-hidden p-7 sm:p-12 border border-white/10 shadow-2xl hover:border-white/20 transition-all duration-300" data-aos="fade-up" data-aos-delay="150">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="md:col-span-4 flex justify-center">
              <div className="p-5 bg-[#060a14] rounded-2xl border border-white/15 shadow-2xl relative group">
                <div className="absolute inset-0 bg-rose-500/15 rounded-2xl blur-xl group-hover:bg-rose-500/30 transition-all duration-300"></div>
                <img
                  src="/images/logopoltar.jpg"
                  alt="Logo Polisi Taruna"
                  className="w-40 sm:w-48 h-40 sm:h-48 object-contain relative z-10 transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="md:col-span-8 space-y-4 text-left">
              <span className="badge-pill-gold text-xs">Organisasi Sekolah</span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">POLTAR</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                Polisi taruna atau yang biasa dikenal dengan POLTAR merupakan organisasi serta EKSKUL yang
                bergerak di lingkungan sekolah. Fungsi dari Polisi Taruna sendiri adalah Menertibkan,
                Mendisiplinkan serta bertanggung jawab di dalam lingkungan Sekolah.
              </p>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-normal">
                Melalui kegiatan Peraturan Baris Berbaris (PBB), Pembinaan Fisik (Binsik), serta pembekalan
                kepemimpinan, anggota dipersiapkan untuk memiliki mental yang kuat, siap berkontribusi positif di
                sekolah, dunia kerja, maupun jenjang pendidikan lanjutan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
