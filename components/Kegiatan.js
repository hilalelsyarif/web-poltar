"use client";

export default function Kegiatan({ onOpenModal }) {
  return (
    <section id="kegiatan" className="py-20 sm:py-24 border-t border-white/5 relative overflow-hidden bg-[#050811]/40">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16" data-aos="fade-up">
          <div className="badge-pill mb-3">Galeri &amp; Dokumentasi</div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">Dokumentasi Kegiatan</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2.5 leading-relaxed">
            Foto kegiatan pembinaan fisik, baris berbaris, dan pengawalan acara sekolah.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* DOK 1 */}
          <div
            className="glass-card relative overflow-hidden rounded-2xl cursor-pointer group hover:border-rose-500/40 hover:shadow-2xl hover:shadow-rose-950/20 transition-all duration-300"
            data-aos="fade-up"
            data-aos-delay="100"
            onClick={() => onOpenModal && onOpenModal("/images/PBB.jpg")}
          >
            <div className="h-72 overflow-hidden relative">
              <img
                src="/images/PBB.jpg"
                alt="Latihan Peraturan Baris Berbaris"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-black/20 to-transparent opacity-90"></div>
              <span className="absolute bottom-3.5 right-3.5 text-xs bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-white font-semibold border border-white/20 group-hover:bg-rose-500 group-hover:border-rose-400 transition-colors shadow-lg">
                Lihat Foto ↗
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-rose-300 transition-colors">
                Latihan Peraturan Baris Berbaris (PBB)
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Latihan pembentukan sikap tampang, keseragaman gerakan, dan kekompakan barisan secara berkala.
              </p>
            </div>
          </div>

          {/* DOK 2 */}
          <div
            className="glass-card relative overflow-hidden rounded-2xl cursor-pointer group hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-950/20 transition-all duration-300"
            data-aos="fade-up"
            data-aos-delay="200"
            onClick={() => onOpenModal && onOpenModal("/images/binsik.jpg")}
          >
            <div className="h-72 overflow-hidden relative">
              <img
                src="/images/binsik.jpg"
                alt="Pembinaan Fisik (Binsik)"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-black/20 to-transparent opacity-90"></div>
              <span className="absolute bottom-3.5 right-3.5 text-xs bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-white font-semibold border border-white/20 group-hover:bg-amber-500 group-hover:border-amber-400 transition-colors shadow-lg">
                Lihat Foto ↗
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-amber-300 transition-colors">
                Pembinaan Fisik (Binsik)
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Latihan jasmani rutin untuk menjaga ketahanan fisik, stamina, dan kebugaran tubuh anggota.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
