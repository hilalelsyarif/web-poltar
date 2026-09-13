"use client";

import { useState, useEffect } from "react";

export default function Struktur() {
  const [selectedGen, setSelectedGen] = useState("18");
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generations = ["18", "19", "20", "21", "22"];

  useEffect(() => {
    let isMounted = true;
    async function fetchMembers() {
      setLoading(true);
      setError(null);
      try {
        const backendBase =
          typeof window !== "undefined" && window.location.hostname.includes("vercel.app")
            ? "https://web-poltar-production.up.railway.app"
            : typeof window !== "undefined"
            ? window.location.origin
            : "http://127.0.0.1:8000";

        const res = await fetch(`${backendBase}/api/structures/${selectedGen}`);
        if (!res.ok) throw new Error("Server response error");
        const json = await res.json();
        if (isMounted) {
          if (json.success && Array.isArray(json.data)) {
            setMembers(json.data);
          } else {
            setMembers([]);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(
            "Gagal mengambil data dari server backend. Pastikan server aktif jika ingin memuat data dinamis."
          );
          setMembers([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchMembers();
    return () => {
      isMounted = false;
    };
  }, [selectedGen]);

  return (
    <section id="struktur" className="py-16 border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="badge-pill mb-3">Struktur Organisasi</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Personel &amp; Kepengurusan</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Daftar anggota dan pengurus Polisi Taruna SMKN 2 Depok berdasarkan angkatan.
          </p>

          {/* Filter Angkatan Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {generations.map((gen) => (
              <button
                key={gen}
                type="button"
                id={`btn-gen-${gen}`}
                onClick={() => setSelectedGen(gen)}
                className={`tab-btn ${selectedGen === gen ? "is-active" : ""}`}
              >
                Angkatan {gen}
              </button>
            ))}
          </div>
        </div>

        {/* Structure Grid Container */}
        <div id="structureContainer" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 min-h-[160px]">
          {loading ? (
            <div className="col-span-1 sm:col-span-2 md:col-span-3 text-center py-10">
              <div className="inline-block w-6 h-6 border-2 border-rose-500 border-t-transparent rounded-full animate-spin mb-2"></div>
              <p className="text-slate-400 text-xs">Memuat data personel Angkatan {selectedGen}...</p>
            </div>
          ) : error ? (
            <div className="col-span-1 sm:col-span-2 md:col-span-3 text-center p-6 glass-card border-rose-900/30">
              <p className="text-rose-400 text-xs font-semibold mb-1">Koneksi backend belum terhubung</p>
              <p className="text-slate-400 text-[11px]">{error}</p>
            </div>
          ) : members.length > 0 ? (
            members.map((item, idx) => (
              <div key={idx} className="person-card group">
                <div className="w-24 h-24 mx-auto mb-3.5 rounded-full bg-slate-900 border-2 border-white/10 group-hover:border-rose-500/80 transition-colors flex items-center justify-center overflow-hidden shadow-lg">
                  {item.image_path ? (
                    <img
                      src={`/storage/${item.image_path}`}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-slate-500 text-2xl">👤</span>
                  )}
                </div>
                <h4 className="text-base font-bold text-white mb-1 tracking-tight">{item.name}</h4>
                <span className="inline-block px-2.5 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full mb-1">
                  {item.position}
                </span>
                <span className="text-[11px] text-slate-400 block mt-1">Angkatan {item.generation}</span>
              </div>
            ))
          ) : (
            <div className="col-span-1 sm:col-span-2 md:col-span-3 text-center p-8 glass-card">
              <p className="text-slate-400 text-xs">Belum ada data personel untuk Angkatan {selectedGen}.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
