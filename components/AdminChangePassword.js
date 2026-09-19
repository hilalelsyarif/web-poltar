"use client";

import { useState } from "react";
import { getBackendBase } from "@/lib/config";

export default function AdminChangePassword({ token, onSessionExpired }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null); // { type: 'success' | 'error', message: string }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);

    // Validasi client-side dasar
    if (!currentPassword) {
      setAlert({ type: "error", message: "Harap masukkan Password Saat Ini." });
      return;
    }

    if (newPassword.length < 6) {
      setAlert({ type: "error", message: "Password Baru harus memiliki minimal 6 karakter." });
      return;
    }

    if (newPassword !== confirmPassword) {
      setAlert({ type: "error", message: "Konfirmasi Password Baru tidak cocok dengan Password Baru." });
      return;
    }

    setLoading(true);

    try {
      const authToken = token || (typeof window !== "undefined" ? localStorage.getItem("auth_token") : null);

      const res = await fetch(`${getBackendBase()}/api/admin/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
          new_password_confirmation: confirmPassword,
        }),
      });

      const data = await res.json();

      if (res.status === 401) {
        setAlert({ type: "error", message: "Sesi Anda telah kedaluwarsa. Silakan login kembali." });
        if (onSessionExpired) onSessionExpired();
        return;
      }

      if (res.ok && data.success) {
        setAlert({
          type: "success",
          message: data.message || "Password Administrator berhasil diperbarui!",
        });
        // Reset form
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        const errorMsg =
          data.message ||
          (data.errors && Object.values(data.errors).flat().join(" ")) ||
          "Gagal mengubah password. Silakan periksa kembali data Anda.";
        setAlert({ type: "error", message: errorMsg });
      }
    } catch (err) {
      setAlert({
        type: "error",
        message: "Terjadi kesalahan jaringan atau server backend sedang offline.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="ubah-password" className="glass-card p-6 scroll-mt-6">
      {/* Card Header */}
      <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-wide">Ubah Password Administrator</h2>
            <p className="text-[11px] text-slate-400">
              Perbarui kata sandi akun admin untuk menjaga keamanan akses panel
            </p>
          </div>
        </div>
      </div>

      {/* Alert Notification / Toast */}
      {alert && (
        <div
          role="alert"
          className={`flex items-start justify-between gap-2 p-3.5 rounded-xl text-xs mb-5 transition-all ${
            alert.type === "success"
              ? "bg-emerald-950/80 border border-emerald-700 text-emerald-200"
              : "bg-rose-950/80 border border-rose-700 text-rose-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {alert.type === "success" ? (
              <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-rose-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
            <span className="font-medium">{alert.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setAlert(null)}
            className="text-slate-400 hover:text-white p-0.5"
            aria-label="Tutup notifikasi"
          >
            ✕
          </button>
        </div>
      )}

      {/* Form Ubah Password */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Input 1: Password Saat Ini */}
          <div>
            <label className="block text-slate-300 mb-1.5 font-medium">
              Password Saat Ini <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="form-control !pr-10"
                placeholder="Masukkan password saat ini..."
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs p-1"
                aria-label={showCurrent ? "Sembunyikan password" : "Tampilkan password"}
              >
                {showCurrent ? "👁️" : "🙈"}
              </button>
            </div>
          </div>

          {/* Input 2: Password Baru */}
          <div>
            <label className="block text-slate-300 mb-1.5 font-medium">
              Password Baru <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                required
                minLength={6}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-control !pr-10"
                placeholder="Minimal 6 karakter..."
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs p-1"
                aria-label={showNew ? "Sembunyikan password" : "Tampilkan password"}
              >
                {showNew ? "👁️" : "🙈"}
              </button>
            </div>
          </div>

          {/* Input 3: Konfirmasi Password Baru */}
          <div>
            <label className="block text-slate-300 mb-1.5 font-medium">
              Konfirmasi Password Baru <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control !pr-10"
                placeholder="Ulangi password baru..."
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs p-1"
                aria-label={showConfirm ? "Sembunyikan password" : "Tampilkan password"}
              >
                {showConfirm ? "👁️" : "🙈"}
              </button>
            </div>
          </div>
        </div>

        {/* Submit Action */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <p className="text-[11px] text-slate-400">
            Pastikan password baru Anda kuat dan belum pernah digunakan sebelumnya.
          </p>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary !text-xs !py-2 !px-4 disabled:opacity-50 inline-flex items-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Perbarui Password</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
