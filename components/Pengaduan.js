"use client";

import { useState, useEffect } from "react";

export default function Pengaduan() {
  // Form Report state
  const [reporterName, setReporterName] = useState("");
  const [className, setClassName] = useState("");
  const [description, setDescription] = useState("");
  const [evidenceImg, setEvidenceImg] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [reportResult, setReportResult] = useState(null);

  // Form Track state
  const [ticketInput, setTicketInput] = useState("");
  const [tracking, setTracking] = useState(false);
  const [trackResult, setTrackResult] = useState(null);
  const [trackError, setTrackError] = useState(null);

  // My Reports state
  const [myReports, setMyReports] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      setIsLoggedIn(true);
      fetchMyReports(token);
    }
  }, []);

  const getBackendBase = () => {
    if (typeof window === "undefined") return "http://127.0.0.1:8000";
    if (window.location.hostname.includes("vercel.app")) {
      return "https://web-poltar-production.up.railway.app";
    }
    return window.location.origin;
  };

  const fetchMyReports = async (token) => {
    try {
      const res = await fetch(`${getBackendBase()}/api/user/reports`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setMyReports(data.data);
      }
    } catch (e) {
      // Backend offline or unreachable
    }
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setReportResult(null);

    const formData = new FormData();
    formData.append("reporter_name", reporterName);
    formData.append("class_name", className);
    formData.append("description", description);
    if (evidenceImg) {
      formData.append("evidence_img", evidenceImg);
    }

    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    const headers = { Accept: "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    try {
      const res = await fetch(`${getBackendBase()}/api/reports`, {
        method: "POST",
        headers,
        body: formData,
      });
      const result = await res.json();

      if (res.ok && result.success) {
        const ticketCode = result.data ? result.data.ticket_code : result.ticket_code;
        setReportResult({
          type: "success",
          ticketCode,
          message: "Laporan Berhasil Dicatat",
        });
        setReporterName("");
        setClassName("");
        setDescription("");
        setEvidenceImg(null);
        if (token) fetchMyReports(token);
      } else {
        let errorMsg = result.message || "Gagal mengirim laporan";
        if (result.errors) {
          errorMsg = Object.values(result.errors).flat().join(", ");
        }
        setReportResult({ type: "error", message: errorMsg });
      }
    } catch (err) {
      setReportResult({
        type: "error",
        message: err.message || "Gagal terhubung ke server backend.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleTrackReport = async (e) => {
    e.preventDefault();
    const code = ticketInput.trim().toUpperCase();
    if (!code) return;

    setTracking(true);
    setTrackResult(null);
    setTrackError(null);

    try {
      const res = await fetch(`${getBackendBase()}/api/reports/track/${code}`, {
        headers: { Accept: "application/json" },
      });
      const result = await res.json();

      if (res.ok && result.success) {
        setTrackResult(result.data);
      } else {
        setTrackError(
          result.message || "Kode tiket tidak ditemukan. Periksa kembali format kode tiket Anda."
        );
      }
    } catch (err) {
      setTrackError("Tidak dapat terhubung ke server backend.");
    } finally {
      setTracking(false);
    }
  };

  return (
    <section id="kontak" className="py-16 border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="badge-pill mb-3">Layanan Informasi</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Layanan Pengaduan &amp; Lacak Tiket
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Sampaikan masukan, laporan tata tertib, atau periksa perkembangan aduan Anda dengan aman dan
            mudah.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* FORM LAPORAN */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
              <div className="w-8 h-8 rounded-md bg-rose-500/10 text-rose-400 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Formulir Pengaduan</h3>
                <p className="text-[11px] text-slate-400">Isi data laporan dengan benar</p>
              </div>
            </div>

            <form id="formReport" onSubmit={handleSubmitReport} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-medium">Nama Pelapor :</label>
                <input
                  type="text"
                  id="reporter_name"
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  className="form-control"
                  placeholder="Nama lengkap Anda"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-medium">Kelas / Angkatan :</label>
                <input
                  type="text"
                  id="class_name"
                  required
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="form-control"
                  placeholder="Contoh: XI TKJ 1 / Angkatan 21"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-medium">Uraian Laporan :</label>
                <textarea
                  id="description"
                  rows="3"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-control"
                  placeholder="Tuliskan keterangan laporan secara jelas..."
                ></textarea>
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-medium">Lampiran Foto (Opsional):</label>
                <input
                  type="file"
                  id="evidence_img"
                  accept="image/*"
                  onChange={(e) => setEvidenceImg(e.target.files[0] || null)}
                  className="w-full text-slate-400 text-xs file:mr-3 file:py-1.5 file:px-3 file:border-0 file:bg-white/10 file:text-white file:rounded-md file:text-xs cursor-pointer"
                />
              </div>
              <button
                type="submit"
                id="btnSubmitReport"
                disabled={submitting}
                className="w-full btn-primary text-xs !py-2.5 font-bold mt-2 disabled:opacity-50"
              >
                <span>{submitting ? "Mengirim Laporan..." : "Kirim Laporan"}</span>
              </button>
            </form>

            {reportResult && (
              <div
                className={`mt-3 p-3 rounded-lg text-xs ${
                  reportResult.type === "success"
                    ? "bg-emerald-950/80 border border-emerald-700 text-emerald-300"
                    : "bg-rose-950/80 border border-rose-700 text-rose-200"
                }`}
              >
                {reportResult.type === "success" ? (
                  <>
                    <p className="font-bold">{reportResult.message}</p>
                    <p className="mt-1">
                      Nomor Tiket:{" "}
                      <span className="font-bold font-mono select-all text-rose-400">
                        {reportResult.ticketCode}
                      </span>
                    </p>
                  </>
                ) : (
                  <p>Error: {reportResult.message}</p>
                )}
              </div>
            )}
          </div>

          {/* CEK STATUS TIKET */}
          <div className="glass-card p-6 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                <div className="w-8 h-8 rounded-md bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Lacak Status Aduan</h3>
                  <p className="text-[11px] text-slate-400">Masukkan kode tiket laporan Anda</p>
                </div>
              </div>

              <form id="formTrack" onSubmit={handleTrackReport} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">
                    Kode Tiket (Format: POLTAR-XXXXX):
                  </label>
                  <input
                    type="text"
                    id="ticket_code_input"
                    required
                    value={ticketInput}
                    onChange={(e) => setTicketInput(e.target.value)}
                    className="form-control font-mono uppercase tracking-wider"
                    placeholder="POLTAR-XXXXX"
                  />
                </div>
                <button
                  type="submit"
                  disabled={tracking}
                  className="w-full btn-secondary text-xs !py-2.5 font-bold disabled:opacity-50"
                >
                  <span>{tracking ? "Mencari data tiket..." : "Cek Status Laporan"}</span>
                </button>
              </form>
            </div>

            {tracking && (
              <div className="mt-4 p-4 bg-[#090d16] border border-white/10 rounded-lg text-xs">
                <p className="text-slate-400 text-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span> Mencari data
                  tiket...
                </p>
              </div>
            )}

            {trackError && (
              <div className="mt-4 p-4 bg-[#090d16] border border-white/10 rounded-lg text-xs">
                <p className="text-rose-400 font-semibold text-xs">{trackError}</p>
              </div>
            )}

            {trackResult && (
              <div className="mt-4 p-4 bg-[#090d16] border border-white/10 rounded-lg text-xs space-y-2">
                <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-2">
                  <span className="text-rose-400 font-bold font-mono text-xs">{trackResult.ticket_code}</span>
                  {trackResult.status === "Pending" ? (
                    <span className="bg-amber-950 text-amber-400 border border-amber-600/70 px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
                      Menunggu Verifikasi
                    </span>
                  ) : trackResult.status === "Process" ? (
                    <span className="bg-sky-950 text-sky-400 border border-sky-600/70 px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
                      Sedang Diproses
                    </span>
                  ) : (
                    <span className="bg-emerald-950 text-emerald-400 border border-emerald-600/70 px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
                      Selesai Ditindaklanjuti
                    </span>
                  )}
                </div>
                <div className="space-y-1.5 text-xs">
                  <p className="text-slate-300">
                    <span className="text-slate-400 font-medium">Pelapor:</span>{" "}
                    {trackResult.reporter_name || "Anonim"} ({trackResult.class_name})
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    <span className="text-slate-400 font-medium">Isi Laporan:</span> {trackResult.description}
                  </p>
                  <p className="text-[11px] text-slate-500 pt-1.5 border-t border-white/5">
                    Waktu Lapor:{" "}
                    {trackResult.created_at
                      ? new Date(trackResult.created_at).toLocaleString("id-ID")
                      : "-"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIWAYAT LAPORAN SAYA */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
            <h3 className="text-sm font-bold text-white">Riwayat Aduan Saya</h3>
            <span className="text-[11px] text-slate-400">Khusus akun yang telah masuk</span>
          </div>
          <div id="myReportsContainer" className="text-xs">
            {!isLoggedIn ? (
              <p className="text-slate-500 text-xs py-2">
                Silakan masuk dengan akun Anda untuk melihat riwayat aduan yang pernah dikirimkan.
              </p>
            ) : myReports.length > 0 ? (
              myReports.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-slate-900/60 border border-white/10 rounded-lg mb-2 hover:border-white/20 transition"
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-bold text-rose-400 font-mono text-xs">{item.ticket_code}</span>
                    {item.status === "Done" ? (
                      <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/60">
                        Selesai
                      </span>
                    ) : item.status === "Process" ? (
                      <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-sky-950 text-sky-300 border border-sky-700/60">
                        Diproses
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-amber-950 text-amber-300 border border-amber-700/60">
                        Menunggu
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                  <span className="text-[11px] text-slate-500 block mt-1.5">
                    Kelas/Angkatan: {item.class_name}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 py-2">Belum ada riwayat laporan yang tercatat.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
