"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getBackendBase } from "@/lib/config";
import { getDefaultPengurusFlatList } from "@/data/pengurusData";

export default function AdminPage() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [reports, setReports] = useState([]);
  const [structures, setStructures] = useState(() => getDefaultPengurusFlatList());
  const [loadingReports, setLoadingReports] = useState(true);
  const [loadingStructures, setLoadingStructures] = useState(false);

  // Form add structure
  const [structName, setStructName] = useState("");
  const [structPosition, setStructPosition] = useState("");
  const [structGen, setStructGen] = useState("");
  const [structImage, setStructImage] = useState(null);
  const [submittingStruct, setSubmittingStruct] = useState(false);
  const [structAlert, setStructAlert] = useState(null);

  // Edit structure state & filter
  const [editingPerson, setEditingPerson] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPosition, setEditPosition] = useState("");
  const [editGen, setEditGen] = useState("");
  const [editImage, setEditImage] = useState(null);
  const [submittingEdit, setSubmittingEdit] = useState(false);
  const [editAlert, setEditAlert] = useState(null);
  const [adminGenFilter, setAdminGenFilter] = useState("all");

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
      if (res.ok && result.success && Array.isArray(result.data) && result.data.length > 0) {
        setStructures(result.data);
      } else {
        setStructures((prev) => (prev && prev.length > 0 ? prev : getDefaultPengurusFlatList()));
      }
    } catch (err) {
      console.warn("Could not fetch structures from backend, keeping default list:", err);
      setStructures((prev) => (prev && prev.length > 0 ? prev : getDefaultPengurusFlatList()));
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
    setSubmittingStruct(true);
    setStructAlert(null);

    const formData = new FormData();
    formData.append("name", structName);
    formData.append("position", structPosition);
    formData.append("generation", structGen);
    if (structImage) {
      formData.append("image", structImage);
    }

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

  const openEditModal = (person) => {
    setEditingPerson(person);
    setEditName(person.name || "");
    setEditPosition(person.position || "");
    setEditGen(person.generation || "");
    setEditImage(null);
    setEditAlert(null);
  };

  const closeEditModal = () => {
    setEditingPerson(null);
    setEditAlert(null);
  };

  const submitUpdateStructure = async (e) => {
    e.preventDefault();
    if (!editingPerson) return;
    setSubmittingEdit(true);
    setEditAlert(null);

    const formData = new FormData();
    formData.append("name", editName);
    formData.append("position", editPosition);
    formData.append("generation", editGen);
    if (editImage) {
      formData.append("image", editImage);
    }

    const isNumericId = Number.isInteger(Number(editingPerson.id)) && !isNaN(Number(editingPerson.id));
    const url = isNumericId
      ? `${getBackendBase()}/api/structures/${editingPerson.id}`
      : `${getBackendBase()}/api/structures`;

    try {
      const res = await fetch(url, {
        method: "POST", // POST endpoint supports multipart file updates or creating new personnel
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const result = await res.json();

      if (res.ok && result.success) {
        alert(`Data personel "${editName}" berhasil diperbarui.`);
        setEditingPerson(null);
        loadStructures();
      } else {
        throw new Error(result.message || "Gagal memperbarui data personel.");
      }
    } catch (err) {
      setEditAlert({ type: "error", message: `Error: ${err.message}` });
    } finally {
      setSubmittingEdit(false);
    }
  };

  const deleteStructure = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus data personel ini?")) return;

    const isNumericId = Number.isInteger(Number(id)) && !isNaN(Number(id));
    if (!isNumericId) {
      setStructures((prev) => prev.filter((item) => item.id !== id));
      alert("Data personel berhasil dihapus.");
      return;
    }

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
                list="admin-position-suggestions"
                value={structPosition}
                onChange={(e) => setStructPosition(e.target.value)}
                className="form-control"
                placeholder="Pilih atau ketik jabatan..."
              />
              <datalist id="admin-position-suggestions">
                <option value="Wadanki 1" />
                <option value="Danki" />
                <option value="Wadanki 2" />
                <option value="Wadanpol 1" />
                <option value="Danpol" />
                <option value="Wadanpol 2" />
                <option value="Ketua PKT" />
                <option value="PKT" />
                <option value="Sekretaris" />
                <option value="Bendahara" />
                <option value="TIK" />
                <option value="Jasmani" />
                <option value="Humas" />
                <option value="Linmas" />
                <option value="Anggota" />
              </datalist>
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
              <label className="block text-slate-300 mb-1 font-medium">Foto Profil (Opsional)</label>
              <input
                type="file"
                id="struct_image"
                accept="image/*"
                onChange={(e) => setStructImage(e.target.files[0] || null)}
                className="w-full text-slate-400 text-xs file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:bg-white/10 file:text-white file:text-xs cursor-pointer"
              />
              <p className="text-[10px] text-slate-500 mt-1">Gunakan default jika belum ada foto</p>
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
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
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

            {/* Filter Angkatan Tabs & Sync Button */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs w-full sm:w-auto">
              <span className="text-[11px] text-slate-400 mr-1">Filter Angkatan:</span>
              {["all", "18", "19", "20", "21", "22"].map((gen) => (
                <button
                  key={gen}
                  type="button"
                  onClick={() => setAdminGenFilter(gen)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                    adminGenFilter === gen
                      ? "bg-rose-600 text-white font-bold"
                      : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {gen === "all" ? "Semua" : `Akt. ${gen}`}
                </button>
              ))}
              <button
                type="button"
                onClick={loadStructures}
                disabled={loadingStructures}
                className="ml-auto sm:ml-2 flex items-center gap-1.5 px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-slate-300 hover:text-white transition text-xs cursor-pointer disabled:opacity-50"
                title="Sinkronkan data dari server backend"
              >
                <span className={loadingStructures ? "animate-spin inline-block" : ""}>🔄</span>
                <span>{loadingStructures ? "Sinkronisasi..." : "Sinkronkan"}</span>
              </button>
            </div>
          </div>

          {(() => {
            const filteredStructures = structures.filter(
              (item) =>
                adminGenFilter === "all" ||
                String(item.generation) === String(adminGenFilter)
            );

            return (
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
                    ) : filteredStructures.length > 0 ? (
                      filteredStructures.map((item, idx) => (
                        <tr key={item.id || idx} className="hover:bg-white/5 transition border-b border-white/5">
                          <td className="p-3">
                            <img
                              src={
                                item.image_url ||
                                (item.image_path
                                  ? `${getBackendBase()}/storage/${item.image_path}`
                                  : "/images/placeholder.jpg")
                              }
                              alt={item.name}
                              className="w-10 h-10 object-cover rounded-full border border-white/20"
                            />
                          </td>
                          <td className="p-3 font-semibold text-white">{item.name}</td>
                          <td className="p-3 text-amber-400 font-medium">
                            <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs">
                              {item.position}
                            </span>
                          </td>
                          <td className="p-3 text-slate-300 font-mono">Angkatan {item.generation}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => openEditModal(item)}
                                className="bg-sky-950/80 hover:bg-sky-900 text-sky-200 border border-sky-700/60 px-2.5 py-1 rounded-md transition text-xs cursor-pointer inline-flex items-center gap-1"
                                title="Edit nama, jabatan, atau ganti foto"
                              >
                                <span>✏️</span>
                                <span>Edit / Foto</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteStructure(item.id)}
                                className="bg-rose-950 hover:bg-rose-900 text-rose-200 border border-rose-800/80 px-2.5 py-1 rounded-md transition text-xs cursor-pointer"
                              >
                                Hapus
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="p-6 text-center text-slate-500">
                          Belum ada data personel untuk {adminGenFilter === "all" ? "semua angkatan" : `Angkatan ${adminGenFilter}`}.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            );
          })()}
        </div>

        {/* Modal Edit Personel & Upload Foto */}
        {editingPerson && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative max-w-lg w-full bg-slate-900 border border-white/20 rounded-2xl p-6 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-base">✏️</span>
                  <h3 className="text-sm font-bold text-white">Edit Data Personel &amp; Foto</h3>
                </div>
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
                  aria-label="Tutup modal"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={submitUpdateStructure} className="space-y-4 text-xs">
                {/* Current Photo Preview */}
                <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10">
                  <img
                    src={
                      editingPerson.image_url ||
                      (editingPerson.image_path
                        ? `${getBackendBase()}/storage/${editingPerson.image_path}`
                        : "/images/placeholder.jpg")
                    }
                    alt={editingPerson.name}
                    className="w-14 h-14 object-cover rounded-full border-2 border-amber-400/60 shadow"
                  />
                  <div>
                    <span className="text-[11px] text-slate-400 block mb-0.5">Sedang Mengedit:</span>
                    <strong className="text-white text-sm block">{editingPerson.name}</strong>
                    <span className="text-amber-400 text-xs font-mono">{editingPerson.position} • Angkatan {editingPerson.generation}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="form-control"
                    placeholder="Nama personel"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Jabatan / Posisi *</label>
                  <input
                    type="text"
                    required
                    list="admin-position-suggestions"
                    value={editPosition}
                    onChange={(e) => setEditPosition(e.target.value)}
                    className="form-control"
                    placeholder="Pilih atau ketik jabatan..."
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Angkatan *</label>
                  <input
                    type="number"
                    required
                    value={editGen}
                    onChange={(e) => setEditGen(e.target.value)}
                    className="form-control"
                    placeholder="Contoh: 22"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">
                    Upload / Ganti Foto Profil (Opsional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEditImage(e.target.files[0] || null)}
                    className="w-full text-slate-400 text-xs file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:bg-white/10 file:text-white file:text-xs cursor-pointer"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    Pilih file gambar jika ingin mengganti foto saat ini.
                  </p>
                </div>

                {editAlert && (
                  <div
                    className={`p-2.5 rounded-lg text-xs ${
                      editAlert.type === "success"
                        ? "bg-emerald-950/80 border border-emerald-700 text-emerald-300"
                        : "bg-rose-950/80 border border-rose-700 text-rose-200"
                    }`}
                  >
                    {editAlert.message}
                  </div>
                )}

                <div className="flex gap-2 justify-end pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs transition cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={submittingEdit}
                    className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition cursor-pointer disabled:opacity-50"
                  >
                    {submittingEdit ? "Menyimpan..." : "Simpan Perubahan"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
