"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { pengurusData, generations } from "@/data/pengurusData";
import { getBackendBase } from "@/lib/config";

export default function StrukturOrg() {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedGen, setSelectedGen] = useState("18");
  const [activeModalPerson, setActiveModalPerson] = useState(null);
  const [currentData, setCurrentData] = useState(pengurusData["18"]);

  // Set isMounted to true after client hydration completes
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Sync data whenever generation changes, active only after component mounts in browser
  useEffect(() => {
    if (!isMounted) return;

    let isSubscribed = true;
    const localGenData = pengurusData[selectedGen] || pengurusData["18"];
    setCurrentData(localGenData);

    async function syncBackendData() {
      try {
        const backendBase = getBackendBase();
        const res = await fetch(`${backendBase}/api/structures/${selectedGen}`);
        if (!res.ok) return;
        const json = await res.json();

        if (isSubscribed && json.success && Array.isArray(json.data) && json.data.length > 0) {
          const backendList = json.data;
          const genNum = parseInt(selectedGen, 10);
          const isAkt18Or19 = genNum === 18 || genNum === 19;

          let wadan1 = null;
          let dan = null;
          let wadan2 = null;
          const pimpinanLain = [];

          const pktKetua = [];
          const pktAnggota = [];
          const sekBen = [];
          const divisiOps = [];
          const anggota = [];

          backendList.forEach((item) => {
            const rawName = (item.name || "").trim();
            const nameLower = rawName.toLowerCase();
            const rawPos = (item.position || "").trim();
            const posLower = rawPos.toLowerCase();

            // Abaikan seluruh data dummy lama buatan AI
            const isDummyName = [
              "muhammad rifqi",
              "fathur rahman",
              "aditya pratama",
              "bagas maulana",
              "dwi cahyo",
              "reza pahlevi",
            ].includes(nameLower);

            const isDummyPos =
              posLower.includes("danton") ||
              posLower.includes("provost") ||
              posLower.includes("patroli") ||
              posLower.includes("komandan batalyon");

            if (isDummyName || isDummyPos) {
              return;
            }

            // Aturan ketat: Linmas hanya untuk Angkatan 18 & 19
            if (!isAkt18Or19 && posLower.includes("linmas")) {
              return;
            }

            const personObj = {
              id: item.id || `be-${item.name}-${rawPos}`,
              name: item.name,
              position: rawPos, // Render MURNI apa adanya
              generation: item.generation || selectedGen,
              image:
                item.image_url ||
                (item.image_path ? `${backendBase}/storage/${item.image_path}` : "/images/placeholder.jpg"),
            };

            // 1. Pimpinan Komando (Wadanpol 1/Wadanki 1, Danpol/Danki, Wadanpol 2/Wadanki 2)
            if (
              posLower.includes("wadanpol 1") ||
              posLower.includes("wadanki 1") ||
              posLower.includes("wadan 1") ||
              posLower.includes("wadanki i") ||
              posLower.includes("wadanpol i") ||
              posLower.includes("wakil 1")
            ) {
              wadan1 = personObj;
            } else if (
              posLower.includes("wadanpol 2") ||
              posLower.includes("wadanki 2") ||
              posLower.includes("wadan 2") ||
              posLower.includes("wadanki ii") ||
              posLower.includes("wadanpol ii") ||
              posLower.includes("wakil 2")
            ) {
              wadan2 = personObj;
            } else if (
              (posLower.includes("danpol") ||
                posLower.includes("danki") ||
                posLower.includes("komandan")) &&
              !posLower.includes("wadan") &&
              !posLower.includes("wadanki") &&
              !posLower.includes("wakil")
            ) {
              dan = personObj;
            } else if (
              posLower.includes("danpol") ||
              posLower.includes("danki") ||
              posLower.includes("komandan") ||
              posLower.includes("wadan") ||
              posLower.includes("wadanki")
            ) {
              pimpinanLain.push(personObj);
            }
            // 2. Penegak Kedisiplinan Taruna (PKT)
            else if (posLower.includes("pkt") || posLower.includes("kedisiplinan")) {
              if (posLower.includes("ketua")) {
                pktKetua.push(personObj);
              } else {
                pktAnggota.push(personObj);
              }
            }
            // 3. Sekretaris & Bendahara
            else if (posLower.includes("sekretaris") || posLower.includes("bendahara")) {
              sekBen.push(personObj);
            }
            // 5. Anggota (Khusus Angkatan 18 & 19)
            else if (
              isAkt18Or19 &&
              (posLower === "anggota" || posLower.startsWith("anggota "))
            ) {
              anggota.push(personObj);
            }
            // 4. Divisi Operasional (TIK, Jasmani, Humas, Linmas)
            else {
              divisiOps.push(personObj);
            }
          });

          // Urutan Pimpinan: Wadanpol 1 (kiri), Danpol (tengah), Wadanpol 2 (kanan)
          const pimpinanResult = [wadan1, dan, wadan2, ...pimpinanLain].filter(Boolean);

          const hasAnyValidData =
            pimpinanResult.length > 0 ||
            pktKetua.length > 0 ||
            pktAnggota.length > 0 ||
            sekBen.length > 0 ||
            divisiOps.length > 0 ||
            anggota.length > 0;

          if (hasAnyValidData) {
            setCurrentData({
              pimpinan: pimpinanResult.length > 0 ? pimpinanResult : localGenData.pimpinan,
              pkt: [...pktKetua, ...pktAnggota].length > 0 ? [...pktKetua, ...pktAnggota] : localGenData.pkt,
              sekretarisBendahara: sekBen.length > 0 ? sekBen : localGenData.sekretarisBendahara,
              divisiOperasional: divisiOps.length > 0 ? divisiOps : (localGenData.divisiOperasional || localGenData.divisiLain),
              anggota: isAkt18Or19 ? (anggota.length > 0 ? anggota : (localGenData.anggota || [])) : [],
            });
          }
        }
      } catch (err) {
        // Fallback otomatis ke localGenData jika jaringan/server bermasalah
      }
    }

    syncBackendData();

    return () => {
      isSubscribed = false;
    };
  }, [selectedGen, isMounted]);

  // Modal open / close handlers
  const handleOpenModal = (person) => {
    setActiveModalPerson(person);
  };

  const handleCloseModal = () => {
    setActiveModalPerson(null);
  };

  // Keyboard accessibility: Tutup modal dengan Escape
  useEffect(() => {
    if (!isMounted) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleCloseModal();
    };
    if (activeModalPerson) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalPerson, isMounted]);

  // SSR / Pre-hydration Shell (Mencegah Hydration Mismatch 100%)
  if (!isMounted) {
    return (
      <section id="struktur" className="section-padding relative overflow-hidden bg-slate-950/60 min-h-[500px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              Struktur Organisasi
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Personel &amp; Kepengurusan
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Daftar komando dan pengurus Korps Polisi Taruna SMKN 2 Depok berdasarkan hierarki dan divisi penugasan.
            </p>
          </div>

          <div className="w-full flex justify-center items-center py-20">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-slate-400 text-xs font-medium tracking-wide">
                Memuat data struktur organisasi...
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const pimpinanList = currentData?.pimpinan || [];
  const pktList = currentData?.pkt || [];
  const sekBenList = currentData?.sekretarisBendahara || [];
  const divisiOpsList = currentData?.divisiOperasional || currentData?.divisiLain || [];
  const anggotaList = currentData?.anggota || [];

  const genNum = parseInt(selectedGen, 10);
  const isAkt18Or19 = genNum === 18 || genNum === 19;

  return (
    <section id="struktur" className="section-padding relative overflow-hidden bg-slate-950/60">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-rose-600/5 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-1/4 w-[500px] h-[250px] bg-amber-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            Struktur Organisasi
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Personel &amp; Kepengurusan
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Daftar komando dan pengurus Korps Polisi Taruna SMKN 2 Depok berdasarkan hierarki dan divisi penugasan.
          </p>

          {/* Angkatan Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {generations.map((gen) => (
              <button
                key={gen}
                id={`btn-gen-${gen}`}
                type="button"
                onClick={() => setSelectedGen(gen)}
                className={
                  selectedGen === gen
                    ? "px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer bg-rose-600 text-white shadow-lg shadow-rose-600/30 border border-rose-500 scale-105"
                    : "px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer bg-slate-900/80 text-slate-400 border border-white/10 hover:text-white hover:border-white/20 hover:bg-slate-800/80"
                }
              >
                Angkatan {gen}
              </button>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 1. PIMPINAN KOMANDO (Wadanpol 1, Danpol, Wadanpol 2)     */}
        {/* ======================================================== */}
        <div className="mb-14">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-500/40" />
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-amber-400 flex items-center gap-2">
              <span>⭐</span> PIMPINAN KOMANDO
            </h3>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-500/40" />
          </div>

          <div className="w-full flex flex-wrap justify-center gap-6">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {pimpinanList.map((person, idx) => {
                const isDanpolOrDanki =
                  person.position?.toLowerCase().includes("danpol") ||
                  person.position?.toLowerCase().includes("danki") ||
                  (person.position?.toLowerCase().includes("komandan") &&
                    !person.position?.toLowerCase().includes("wadan") &&
                    !person.position?.toLowerCase().includes("wadanki") &&
                    !person.position?.toLowerCase().includes("wakil")) ||
                  idx === 1;

                return (
                  <div
                    key={person.id || idx}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleOpenModal(person)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleOpenModal(person);
                      }
                    }}
                    title="Klik untuk melihat foto"
                    className={
                      isDanpolOrDanki
                        ? "w-full cursor-pointer group relative rounded-2xl p-6 text-center transition-all duration-300 flex flex-col justify-between bg-gradient-to-b from-amber-500/15 via-slate-900/95 to-slate-900 border-2 border-amber-500/70 shadow-2xl shadow-amber-500/15 md:-translate-y-2 md:scale-105 z-10"
                        : "w-full cursor-pointer group relative rounded-2xl p-6 text-center transition-all duration-300 flex flex-col justify-between bg-slate-900/80 border border-white/10 hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/5 backdrop-blur-md"
                    }
                  >
                    {isDanpolOrDanki && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-widest shadow-md">
                        Pimpinan Tertinggi
                      </div>
                    )}

                    <div>
                      {/* Photo */}
                      <div
                        className={
                          isDanpolOrDanki
                            ? "relative mx-auto rounded-full overflow-hidden group-hover:scale-105 transition-transform duration-300 shadow-xl border-2 mb-4 w-28 h-28 border-amber-400/80 shadow-amber-500/30"
                            : "relative mx-auto rounded-full overflow-hidden group-hover:scale-105 transition-transform duration-300 shadow-xl border-2 mb-4 w-24 h-24 border-white/20 group-hover:border-amber-400/60"
                        }
                      >
                        <Image
                          src={person.image || "/images/placeholder.jpg"}
                          alt={person.name}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                          </svg>
                        </div>
                      </div>

                      {/* Full Name */}
                      <h4 className="text-lg font-bold text-white mb-1.5 tracking-tight group-hover:text-amber-300 transition-colors">
                        {person.name}
                      </h4>

                      {/* Position: Pure string as-is */}
                      <div className="mb-2">
                        <span
                          className={
                            isDanpolOrDanki
                              ? "inline-block px-3 py-1 rounded-full text-xs font-semibold border bg-amber-500/15 text-amber-300 border-amber-500/30"
                              : "inline-block px-3 py-1 rounded-full text-xs font-semibold border bg-amber-500/10 text-amber-200 border border-amber-500/20"
                          }
                        >
                          {person.position}
                        </span>
                      </div>
                    </div>

                    <span className="text-[11px] text-slate-400 font-mono block mt-2">
                      Angkatan {person.generation || selectedGen}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. PENEGAK KEDISIPLINAN TARUNA (PKT)                     */}
        {/* ======================================================== */}
        <div className="mb-14">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-sky-500/40" />
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-sky-400 flex items-center gap-2">
              <span>🛡️</span> PENEGAK KEDISIPLINAN TARUNA (PKT)
            </h3>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-sky-500/40" />
          </div>

          <div className="w-full flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
            {pktList.map((person, idx) => {
              const isKetuaPkt =
                person.position?.toLowerCase().includes("ketua") || idx === 0;

              return (
                <div
                  key={person.id || idx}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleOpenModal(person)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleOpenModal(person);
                    }
                  }}
                  title="Klik untuk melihat foto"
                  className={
                    isKetuaPkt
                      ? "w-full sm:w-64 md:w-72 rounded-2xl p-5 text-center transition-all duration-300 backdrop-blur-md group flex flex-col justify-between cursor-pointer bg-slate-900/90 border-2 border-sky-500/60 shadow-xl shadow-sky-500/10 hover:border-sky-400"
                      : "w-full sm:w-64 md:w-72 rounded-2xl p-5 text-center transition-all duration-300 backdrop-blur-md group flex flex-col justify-between cursor-pointer bg-slate-900/80 border border-white/10 hover:border-sky-500/50 hover:shadow-lg hover:shadow-sky-500/10"
                  }
                >
                  <div>
                    {/* Photo */}
                    <div
                      className={
                        isKetuaPkt
                          ? "relative w-24 h-24 mx-auto rounded-full overflow-hidden group-hover:scale-105 transition-transform duration-300 shadow-lg border-2 mb-3.5 border-sky-400/80 shadow-sky-500/20"
                          : "relative w-24 h-24 mx-auto rounded-full overflow-hidden group-hover:scale-105 transition-transform duration-300 shadow-lg border-2 mb-3.5 border-white/15 group-hover:border-sky-500/70"
                      }
                    >
                      <Image
                        src={person.image || "/images/placeholder.jpg"}
                        alt={person.name}
                        width={112}
                        height={112}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                        </svg>
                      </div>
                    </div>

                    {/* Name */}
                    <h4 className="text-base font-bold text-white mb-1.5 tracking-tight group-hover:text-sky-300 transition-colors">
                      {person.name}
                    </h4>

                    {/* Position: Pure string as-is */}
                    <div className="mb-2">
                      <span
                        className={
                          isKetuaPkt
                            ? "inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-sky-500/25 text-sky-200 border border-sky-400/50 shadow-sm"
                            : "inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-sky-500/15 text-sky-300 border border-sky-500/30"
                        }
                      >
                        {person.position}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] text-slate-400 font-mono block mt-2">
                    Angkatan {person.generation || selectedGen}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. SEKRETARIS & BENDAHARA                                */}
        {/* ======================================================== */}
        <div className="mb-14">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-emerald-500/40" />
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-2">
              <span>📋</span> SEKRETARIS &amp; BENDAHARA
            </h3>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-emerald-500/40" />
          </div>

          <div className="w-full flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
            {sekBenList.map((person, idx) => (
              <div
                key={person.id || idx}
                role="button"
                tabIndex={0}
                onClick={() => handleOpenModal(person)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleOpenModal(person);
                  }
                }}
                title="Klik untuk melihat foto"
                className="w-full sm:w-64 md:w-72 bg-slate-900/80 border border-white/10 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 rounded-2xl p-5 text-center transition-all duration-300 backdrop-blur-md group flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Photo */}
                  <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden group-hover:scale-105 transition-transform duration-300 shadow-lg border-2 border-white/15 group-hover:border-emerald-500/70 mb-3.5">
                    <Image
                      src={person.image || "/images/placeholder.jpg"}
                      alt={person.name}
                      width={112}
                      height={112}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                    </div>
                  </div>

                  {/* Name */}
                  <h4 className="text-base font-bold text-white mb-1.5 tracking-tight group-hover:text-emerald-300 transition-colors">
                    {person.name}
                  </h4>

                  {/* Position: Pure string as-is */}
                  <div className="mb-2">
                    <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      {person.position}
                    </span>
                  </div>
                </div>

                <span className="text-[11px] text-slate-400 font-mono block mt-2">
                  Angkatan {person.generation || selectedGen}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. DIVISI OPERASIONAL (TIK, Jasmani, Humas, Linmas)      */}
        {/* ======================================================== */}
        <div className="mb-14">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-purple-500/40" />
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-purple-400 flex items-center gap-2">
              <span>⚡</span> DIVISI OPERASIONAL
            </h3>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-purple-500/40" />
          </div>

          <div className="w-full flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
            {divisiOpsList.map((person, idx) => (
              <div
                key={person.id || idx}
                role="button"
                tabIndex={0}
                onClick={() => handleOpenModal(person)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleOpenModal(person);
                  }
                }}
                title="Klik untuk melihat foto"
                className="w-full sm:w-60 md:w-64 bg-slate-900/80 border border-white/10 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 rounded-2xl p-5 text-center transition-all duration-300 backdrop-blur-md group flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Photo */}
                  <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden group-hover:scale-105 transition-transform duration-300 shadow-lg border-2 border-white/15 group-hover:border-purple-500/70 mb-3.5">
                    <Image
                      src={person.image || "/images/placeholder.jpg"}
                      alt={person.name}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                    </div>
                  </div>

                  {/* Name */}
                  <h4 className="text-sm sm:text-base font-bold text-white mb-1.5 tracking-tight group-hover:text-purple-300 transition-colors">
                    {person.name}
                  </h4>

                  {/* Position: Pure string as-is */}
                  <div className="mb-2">
                    <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30">
                      {person.position}
                    </span>
                  </div>
                </div>

                <span className="text-[11px] text-slate-400 font-mono block mt-2">
                  Angkatan {person.generation || selectedGen}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 5. ANGGOTA (Khusus Angkatan 18 & 19)                      */}
        {/* ======================================================== */}
        {isAkt18Or19 && anggotaList.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-rose-500/40" />
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-rose-400 flex items-center gap-2">
                <span>👥</span> ANGGOTA
              </h3>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-rose-500/40" />
            </div>

            <div className="w-full flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
              {anggotaList.map((person, idx) => (
                <div
                  key={person.id || idx}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleOpenModal(person)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleOpenModal(person);
                    }
                  }}
                  title="Klik untuk melihat foto"
                  className="w-full sm:w-60 md:w-64 bg-slate-900/80 border border-white/10 hover:border-rose-500/50 hover:shadow-xl hover:shadow-rose-500/10 rounded-2xl p-5 text-center transition-all duration-300 backdrop-blur-md group flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {/* Photo */}
                    <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden group-hover:scale-105 transition-transform duration-300 shadow-lg border-2 border-white/15 group-hover:border-rose-500/70 mb-3.5">
                      <Image
                        src={person.image || "/images/placeholder.jpg"}
                        alt={person.name}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                        </svg>
                      </div>
                    </div>

                    {/* Name */}
                    <h4 className="text-sm sm:text-base font-bold text-white mb-1.5 tracking-tight group-hover:text-rose-300 transition-colors">
                      {person.name}
                    </h4>

                    {/* Position: Pure string as-is */}
                    <div className="mb-2">
                      <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                        {person.position}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] text-slate-400 font-mono block mt-2">
                    Angkatan {person.generation || selectedGen}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 6. POP-UP / MODAL FOTO HD PENGURUS                       */}
      {/* ======================================================== */}
      {activeModalPerson && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300"
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-md w-full bg-slate-900 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl text-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button (X) */}
            <button
              type="button"
              id="btn-close-modal"
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer focus:outline-none"
              aria-label="Tutup modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-rose-500/20 blur-2xl pointer-events-none rounded-full" />

            {/* HD Photo */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-2xl overflow-hidden shadow-2xl border-2 border-white/25 mb-5 mt-2">
              <Image
                src={activeModalPerson.image || "/images/placeholder.jpg"}
                alt={activeModalPerson.name}
                width={240}
                height={240}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>

            {/* Full Name */}
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-2">
              {activeModalPerson.name}
            </h3>

            {/* Position: Pure string as-is */}
            <div className="mb-4">
              <span className="inline-block px-4 py-1 rounded-full text-xs sm:text-sm font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                {activeModalPerson.position}
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-slate-300 mb-6">
              <span>Korps POLTAR</span>
              <span className="text-slate-500">•</span>
              <span>Angkatan {activeModalPerson.generation || selectedGen}</span>
            </div>

            <div className="pt-4 border-t border-white/10 text-[11px] text-slate-400">
              SMKN 2 Depok — Penegak Disiplin &amp; Pembinaan Karakter Taruna
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
