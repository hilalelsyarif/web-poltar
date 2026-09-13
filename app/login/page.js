"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [googleHref, setGoogleHref] = useState("#");

  const getBackendBase = () => {
    if (typeof window === "undefined") return "http://127.0.0.1:8000";
    if (window.location.hostname.includes("vercel.app")) {
      return "https://web-poltar-production.up.railway.app";
    }
    return window.location.origin;
  };

  useEffect(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    setGoogleHref(`${getBackendBase()}/api/auth/google?redirect_to=${encodeURIComponent(origin)}`);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${getBackendBase()}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("user_name", data.user.name);
        localStorage.setItem("user_role", data.user.role);

        if (data.user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      } else {
        setErrorMsg(data.message || "Email atau kata sandi tidak sesuai.");
      }
    } catch (err) {
      setErrorMsg(
        `Tidak dapat terhubung ke server backend (${getBackendBase()}). Pastikan server backend sedang aktif.`
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="ambient-bg min-h-screen flex items-center justify-center p-4 text-slate-100">
      <div className="w-full max-w-md glass-card p-8 relative z-10 shadow-2xl my-8 glow-border">
        {/* Logo & Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-[#090d16] rounded-xl border border-white/10 shadow-lg">
              <img
                src="/images/logopoltar.jpg"
                alt="Logo Poltar"
                className="w-12 h-12 object-contain mix-blend-screen"
              />
            </div>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Polisi <span className="text-rose-400">Taruna</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Portal Layanan &amp; Administrasi SMKN 2 Depok
          </p>
        </div>

        {/* Google Login for Students / General Users */}
        <div className="mb-5">
          <a
            href={googleHref}
            id="btnGoogleLogin"
            className="w-full bg-white hover:bg-slate-100 text-slate-900 font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-3 transition text-xs shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Masuk dengan Akun Google</span>
          </a>
        </div>

        <div className="relative my-5 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <span className="relative bg-[#0f172a] px-3 text-[11px] text-slate-400 rounded-full">
            atau Masuk sebagai Petugas
          </span>
        </div>

        {/* Manual Login Form for Staff/Admin */}
        <form id="formLogin" onSubmit={handleLogin} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-slate-300 mb-1 font-medium">Alamat Email :</label>
            <input
              type="email"
              id="login_email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="masukkan email admin"
            />
          </div>
          <div>
            <label className="block text-slate-300 mb-1 font-medium">Kata Sandi :</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="login_password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-950/80 border border-rose-700 text-rose-200 rounded-lg text-xs">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            id="btnLoginSubmit"
            disabled={submitting}
            className="w-full btn-primary text-xs !py-2.5 font-bold mt-2 disabled:opacity-50 cursor-pointer"
          >
            <span>{submitting ? "Memproses..." : "Masuk ke Panel Petugas"}</span>
          </button>
        </form>

        <div className="text-center mt-6 pt-4 border-t border-white/5">
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1.5 transition"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Kembali ke Beranda Utama</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
