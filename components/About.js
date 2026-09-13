export default function About() {
  return (
    <section id="about" className="py-16 border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="badge-pill mb-3">Profil Organisasi</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Tentang Polisi Taruna</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Mengenal peran dan tujuan Korps Polisi Taruna SMKN 2 Depok dalam membina kedisiplinan sekolah.
          </p>
        </div>

        <div className="glass-card p-6 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 flex justify-center">
              <div className="p-4 bg-[#090d16] rounded-2xl border border-white/10 shadow-xl relative group">
                <div className="absolute inset-0 bg-rose-500/10 rounded-2xl blur-xl group-hover:bg-rose-500/20 transition-all"></div>
                <img
                  src="/images/logopoltar.jpg"
                  alt="Logo Polisi Taruna"
                  className="w-40 h-40 object-contain relative z-10"
                />
              </div>
            </div>

            <div className="md:col-span-8 space-y-4 text-left">
              <span className="badge-pill-gold text-xs">Organisasi Sekolah</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">POLTAR</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Polisi taruna atau yang biasa dikenal dengan POLTAR merupakan organisasi serta EKSKUL yang
                bergerak di lingkungan sekolah. Fungsi dari Polisi Taruna sendiri adalah Menertibkan,
                Mendisiplinkan serta bertanggung jawab di dalam lingkungan Sekolah.
              </p>
              <p className="text-slate-400 text-xs leading-relaxed">
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
