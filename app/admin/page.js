"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [reports, setReports] = useState([]);
  const [structures, setStructures] = useState([]);
  const [loadingReports, setLoadingReports] = useState(true);
  const [loadingStructures, setLoadingStructures] = useState(true);

  // Form add structure
  const [structName, setStructName] = useState("");
  const [structPosition, setStructPosition] = useState("");
  const [structGen, setStructGen] = useState("");
  const [structImage, setStructImage] = useState(null);
  const [submittingStruct, setSubmittingStruct] = useState(false);
  const [structAlert, setStructAlert] = useState(null);

  const getBackendBase = () => {
    if (typeof window === "undefined") return "http://127.0.0.1:8000";
    if (window.location.hostname.includes("vercel.app")) {
      return "https://web-poltar-production.up.railway.app";
    }
    return window.location.origin;
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("auth_token");
    const role = localStorage.getItem("user_role");

    if (!savedToken || role !== "admin") {
      router.push("/login");
      return;
    }

    setToken(savedToken);
    loadReports(savedToken);
    loadStructures();
  }, [router]);

  const handleLogout = () => {
    if (window.confirm("Apakah Anda ingin mengakhiri sesi Administrator?")) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_role");
      localStorage.removeItem("user_name");
      router.push("/login");
    }
  };

  const loadReports = async (authToken = token) => {
    if (!authToken) return;
    setLoadingReports(true);
    try {
      const res = await fetch(`${getBackendBase()}/api/admin/reports`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      const result = await res.json();
      if (res.ok && result.success && Array.isArray(result.data)) {
        setReports(result.data);
      } else {
        setReports([]);
      }
    } catch (err) {
      setReports([]);
    } finally {
      setLoadingReports(false);
    }
  };

  const loadStructures = async () => {
    setLoadingStructures(true);
    try {
      const res = await fetch(`${getBackendBase()}/api/structures`, {
        headers: { Accept: "application/json" },
      });
      const result = await res.json();
      if (res.ok && result.success && Array.isArray(result.data)) {
        setStructures(result.data);
      } else {
        setStructures([]);
      }
    } catch (err) {
      setStructures([]);
    } finally {
      setLoadingStructures(false);
    }
  };

  const updateStatus = async (ticketCode, newStatus) => {
    try {
      const res = await fetch(`${getBackendBase()}/api/admin/reports/${ticketCode}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        alert(`Status tiket ${ticketCode} berhasil diubah ke ${newStatus}.`);
        loadReports(token);
      } else {
        alert(result.message || "Gagal mengubah status laporan.");
      }
    } catch (err) {
      alert("Terjadi kegagalan komunikasi dengan server backend.");
    }
  };

  const submitStructure = async (e) => {
    e.preventDefault();
    if (!structImage) {
      alert("Pilih foto profil!");
      return;
    }

    setSubmittingStruct(true);
    setStructAlert(null);

    const formData = new FormData();
    formData.append("name", structName);
    formData.append("position", structPosition);
    formData.append("generation", structGen);
    formData.append("image", structImage);

    try {
      const res = await fetch(`${getBackendBase()}/api/structures`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const result = await res.json();

      if (res.ok && result.success) {
        setStructAlert({ type: "success", message: "Data personel berhasil ditambahkan." });
        setStructName("");
        setStructPosition("");
        setStructGen("");
        setStructImage(null);
        loadStructures();
      } else {
        throw new Error(result.message || "Gagal menyimpan data personel.");
      }
    } catch (err) {
      setStructAlert({ type: "error", message: `Error: ${err.message}` });
    } finally {
      setSubmittingStruct(false);
    }
  };

  const deleteStructure = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus data personel ini?")) return;

    try {
      const res = await fetch(`${getBackendBase()}/api/structures/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const resResult = await res.json();
      if (res.ok && resResult.success) {
        alert("Data personel berhasil dihapus.");
        loadStructures();
      } else {
        alert(resResult.message || "Gagal menghapus data.");
      }
    } catch (err) {
      alert("Terjadi kegagalan komunikasi dengan server backend.");
    }
  };

  return (
    <div className="ambient-bg text-slate-100 p-4 sm:p-6 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6 my-2">
        {/* Header */}
        <header className="flex flex-wrap gap-4 justify-between items-center glass-card p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#090d16] rounded-xl border border-white/10">
              <img
                src="/images/logopoltar.jpg"
                alt="Logo Polisi Taruna"
                className="h-8 w-8 object-contain mix-blend-screen"
              />
            </div>
            <div>
              <span className="badge-pill text-[11px] mb-0.5">Administrator</span>
              <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Panel Pengelolaan Polisi Taruna
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap text-xs">
            <Link href="/" className="btn-secondary !py-2 !px-3 text-xs">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span>Beranda Utama</span>
            </Link>
            <button
              onClick={() => {
                loadReports();
                loadStructures();
              }}
              className="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 px-3 py-2 rounded-lg transition inline-flex items-center gap-1.5 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Muat Ulang</span>
            </button>
            <button
              onClick={handleLogout}
              className="bg-rose-950/60 hover:bg-rose-900 text-rose-200 border border-rose-800/60 px-3.5 py-2 rounded-lg transition font-medium cursor-pointer inline-flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Keluar</span>
            </button>
          </div>
        </header>

        {/* Section 1: Form Input Personel Struktur */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
            <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Tambah Personel Struktur</h2>
              <p className="text-[11px] text-slate-400">
                Tambahkan data anggota kepengurusan ke angkatan yang sesuai
              </p>
            </div>
          </div>

          <form
            id="formStructure"
            onSubmit={submitStructure}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs"
          >
            <div>
              <label className="block text-slate-300 mb-1 font-medium">Nama Lengkap *</label>
              <input
                type="text"
                id="struct_name"
                required
                value={structName}
                onChange={(e) => setStructName(e.target.value)}
                className="form-control"
                placeholder="Contoh: Hilal El Syarif"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-medium">Jabatan / Posisi *</label>
              <input
                type="text"
                id="struct_position"
                required
                value={structPosition}
                onChange={(e) => setStructPosition(e.target.value)}
                className="form-control"
                placeholder="Contoh: Ketua / Komandan Poltar"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-medium">Angkatan (Angka) *</label>
              <input
                type="number"
                id="struct_gen"
                required
                value={structGen}
                onChange={(e) => setStructGen(e.target.value)}
                className="form-control"
                placeholder="Contoh: 22"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-medium">Foto Profil *</label>
              <input
                type="file"
                id="struct_image"
                accept="image/*"
                required
                onChange={(e) => setStructImage(e.target.files[0] || null)}
                className="w-full text-slate-400 text-xs file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:bg-white/10 file:text-white file:text-xs cursor-pointer"
              />
            </div>
            <div className="sm:col-span-2 md:col-span-4 pt-1">
              <button
                type="submit"
                id="btnSubmitStruct"
                disabled={submittingStruct}
                className="w-full btn-primary text-xs !py-2.5 font-bold cursor-pointer disabled:opacity-50"
              >
                <span>{submittingStruct ? "Menyimpan..." : "Simpan Data Personel"}</span>
              </button>
            </div>
          </form>

          {structAlert && (
            <div
              className={`mt-3 p-3 rounded-lg text-xs ${
                structAlert.type === "success"
                  ? "bg-emerald-950/80 border border-emerald-700 text-emerald-300"
                  : "bg-rose-950/80 border border-rose-700 text-rose-200"
              }`}
            >
              {structAlert.message}
            </div>
          )}
        </div>

        {/* Section 2: Tabel Pengaduan Masuk */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-bold text-white">Daftar Pengaduan Siswa</h2>
                <p className="text-[11px] text-slate-400">Kelola dan perbarui status laporan yang masuk</p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400 uppercase text-[11px] border-b border-white/10 font-semibold">
                <tr>
                  <th className="p-3">Kode Tiket</th>
                  <th className="p-3">Pelapor &amp; Kelas</th>
                  <th className="p-3">Uraian Laporan</th>
                  <th className="p-3">Bukti</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Tindakan</th>
                </tr>
              </thead>
              <tbody id="adminReportTable" className="divide-y divide-white/5 text-slate-300">
                {loadingReports ? (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-slate-500">
                      Memuat data pengaduan...
                    </td>
                  </tr>
                ) : reports.length > 0 ? (
                  reports.map((item, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition border-b border-white/5">
                      <td className="p-3 font-semibold text-rose-400 font-mono select-all">
                        {item.ticket_code}
                      </td>
                      <td className="p-3">
                        <strong className="text-white">{item.reporter_name || "Anonim"}</strong>
                        <br />
                        <span className="text-slate-400 text-[11px]">{item.class_name}</span>
                      </td>
                      <td className="p-3 max-w-xs text-slate-300 leading-relaxed">
                        {item.description}
                      </td>
                      <td className="p-3">
                        {item.evidence_img ? (
                          <a
                            href={`${getBackendBase()}/storage/${item.evidence_img}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-rose-400 hover:text-rose-300 inline-flex items-center gap-1 font-medium"
                          >
                            <span>Lihat Foto</span> ↗
                          </a>
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>
                      <td className="p-3">
                        {item.status === "Done" ? (
                          <span className="text-emerald-400 font-semibold bg-emerald-950/80 px-2.5 py-1 border border-emerald-700/60 rounded-full text-[10px]">
                            Selesai
                          </span>
                        ) : item.status === "Process" ? (
                          <span className="text-sky-400 font-semibold bg-sky-950/80 px-2.5 py-1 border border-sky-700/60 rounded-full text-[10px]">
                            Diproses
                          </span>
                        ) : (
                          <span className="text-amber-400 font-semibold bg-amber-950/80 px-2.5 py-1 border border-amber-700/60 rounded-full text-[10px]">
                            Menunggu
                          </span>
                        )}
                      </td>
                      <td className="p-3 space-x-1 whitespace-nowrap">
                        <button
                          onClick={() => updateStatus(item.ticket_code, "Process")}
                          className="bg-sky-950 hover:bg-sky-900 text-sky-200 border border-sky-700 px-2.5 py-1 rounded-md text-xs transition cursor-pointer"
                        >
                          Proses
                        </button>
                        <button
                          onClick={() => updateStatus(item.ticket_code, "Done")}
                          className="bg-emerald-950 hover:bg-emerald-900 text-emerald-200 border border-emerald-700 px-2.5 py-1 rounded-md text-xs transition cursor-pointer"
                        >
                          Selesai
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-6 text-center text-slate-500">
                      Belum ada laporan pengaduan masuk.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Daftar Anggota Terdaftar */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Daftar Personel Struktur</h2>
              <p className="text-[11px] text-slate-400">Data kepengurusan yang tampil di halaman publik</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400 uppercase text-[11px] border-b border-white/10 font-semibold">
                <tr>
                  <th className="p-3">Foto</th>
                  <th className="p-3">Nama</th>
                  <th className="p-3">Jabatan</th>
                  <th className="p-3">Angkatan</th>
                  <th className="p-3">Aksi</th>
                </tr>
              </thead>
              <tbody id="adminStructureTable" className="divide-y divide-white/5 text-slate-300">
                {loadingStructures ? (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-slate-500">
                      Memuat data struktur...
                    </td>
                  </tr>
                ) : structures.length > 0 ? (
                  structures.map((item, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition border-b border-white/5">
                      <td className="p-3">
                        <img
                          src={
                            item.image_path
                              ? `${getBackendBase()}/storage/${item.image_path}`
                              : "/images/logopoltar.jpg"
                          }
                          alt={item.name}
                          className="w-9 h-9 object-cover rounded-lg border border-white/10"
                        />
                      </td>
                      <td className="p-3 font-semibold text-white">{item.name}</td>
                      <td className="p-3 text-amber-400 font-medium">{item.position}</td>
                      <td className="p-3 text-slate-300">Angkatan {item.generation}</td>
                      <td className="p-3">
                        <button
                          onClick={() => deleteStructure(item.id)}
                          className="bg-rose-950 hover:bg-rose-900 text-rose-200 border border-rose-800/80 px-2.5 py-1 rounded-md transition text-xs cursor-pointer"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-6 text-center text-slate-500">
                      Belum ada data personel terdaftar.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
