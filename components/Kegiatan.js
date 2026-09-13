"use client";

export default function Kegiatan({ onOpenModal }) {
  return (
    <section id="kegiatan" className="py-16 border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="badge-pill mb-3">Galeri &amp; Dokumentasi</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Dokumentasi Kegiatan</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Foto kegiatan pembinaan fisik, baris berbaris, dan pengawalan acara sekolah.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* DOK 1 */}
          <div
            className="glass-card overflow-hidden cursor-pointer group"
            onClick={() => onOpenModal && onOpenModal("/images/PBB.jpg")}
          >
            <div className="h-64 overflow-hidden relative">
              <img
                src="/images/PBB.jpg"
                alt="Latihan Peraturan Baris Berbaris"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent opacity-80"></div>
              <span className="absolute bottom-3 right-3 text-xs bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-white/90 border border-white/10">
                Lihat Foto ↗
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-base font-bold text-white mb-1">Latihan Peraturan Baris Berbaris (PBB)</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Latihan pembentukan sikap tampang, keseragaman gerakan, dan kekompakan barisan secara berkala.
              </p>
            </div>
          </div>

          {/* DOK 2 */}
          <div
            className="glass-card overflow-hidden cursor-pointer group"
            onClick={() => onOpenModal && onOpenModal("/images/binsik.jpg")}
          >
            <div className="h-64 overflow-hidden relative">
              <img
                src="/images/binsik.jpg"
                alt="Pembinaan Fisik (Binsik)"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent opacity-80"></div>
              <span className="absolute bottom-3 right-3 text-xs bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-white/90 border border-white/10">
                Lihat Foto ↗
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-base font-bold text-white mb-1">Pembinaan Fisik (Binsik)</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Latihan jasmani rutin untuk menjaga ketahanan fisik, stamina, dan kebugaran tubuh anggota.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
