"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [activeNav, setActiveNav] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Read auth token & user from localStorage if present
    const token = localStorage.getItem("auth_token");
    const name = localStorage.getItem("user_name");
    const role = localStorage.getItem("user_role");

    if (token && name) {
      setUser({ token, name, role });
    }

    // Scrollspy & Scroll blur
    const navSections = ["hero", "about", "visimisi", "struktur", "tugas", "kegiatan", "kontak"];
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      let current = "hero";
      navSections.forEach((id) => {
        const section = document.getElementById(id);
        if (section && window.scrollY >= section.offsetTop - 140) {
          current = id;
        }
      });
      setActiveNav(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    if (window.confirm("Apakah Anda ingin keluar dari akun?")) {
      localStorage.clear();
      setUser(null);
      window.location.reload();
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* NAVBAR */}
      <nav
        id="navbar"
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#050811]/90 backdrop-blur-xl border-b border-white/10 shadow-xl shadow-black/40 py-2.5 sm:py-3"
            : "bg-[#050811]/60 backdrop-blur-md border-b border-white/5 py-3.5 sm:py-4"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center gap-2 max-w-7xl px-3 sm:px-6 py-3 sm:py-3.5">
          {/* Left: Hamburger (3 baris) + Brand */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              id="sidebarToggleBtn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-expanded={sidebarOpen}
              aria-controls="sidebarMenu"
              aria-label="Buka menu navigasi"
              className="flex-shrink-0 p-2 text-gray-300 hover:text-white rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500/50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <div className="flex items-center space-x-1.5 p-1.5 bg-gradient-to-r from-white/[0.08] to-white/[0.03] rounded-xl border border-white/15 shadow-inner flex-shrink-0">
              <img
                src="/images/logodudep.jpg"
                alt="Logo SMKN 2 Depok"
                className="h-6 sm:h-7 w-auto mix-blend-screen"
              />
              <img
                src="/images/logokorps.jpg"
                alt="Korps Taruna"
                className="h-6 sm:h-7 w-auto mix-blend-screen hidden sm:block"
              />
              <img
                src="/images/logopoltar.jpg"
                alt="Logo Polisi Taruna"
                className="h-6 sm:h-7 w-auto mix-blend-screen hidden sm:block"
              />
            </div>

            <div className="min-w-0 hidden sm:block">
              <span className="font-extrabold text-sm sm:text-base tracking-wider text-white block leading-tight truncate">
                POLISI TARUNA
              </span>
              <span className="text-[10px] sm:text-xs text-amber-400 font-bold tracking-widest block truncate font-mono">
                SMKN 2 DEPOK
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            <a
              href="#hero"
              className={`nav-link ${activeNav === "hero" ? "nav-active text-white" : "text-slate-300"}`}
            >
              Beranda
            </a>
            <a
              href="#about"
              className={`nav-link ${activeNav === "about" ? "nav-active text-white" : "text-slate-300"}`}
            >
              Profil
            </a>
            <a
              href="#visimisi"
              className={`nav-link ${activeNav === "visimisi" ? "nav-active text-white" : "text-slate-300"}`}
            >
              Visi &amp; Misi
            </a>
            <a
              href="#struktur"
              className={`nav-link ${activeNav === "struktur" ? "nav-active text-white" : "text-slate-300"}`}
            >
              Struktur
            </a>
            <a
              href="#tugas"
              className={`nav-link ${activeNav === "tugas" ? "nav-active text-white" : "text-slate-300"}`}
            >
              Tugas Pokok
            </a>
            <a
              href="#kegiatan"
              className={`nav-link ${activeNav === "kegiatan" ? "nav-active text-white" : "text-slate-300"}`}
            >
              Dokumentasi
            </a>
            <a
              href="#kontak"
              className={`nav-link ${activeNav === "kontak" ? "nav-active text-white" : "text-slate-300"}`}
            >
              Layanan Pengaduan
            </a>
          </div>

          {/* Right: Panel Admin / Nama Akun — selalu di tempatnya */}
          <div id="navAuthContainer" className="flex-shrink-0">
            {user ? (
              <div className="flex items-center gap-1.5 sm:gap-2">
                {user.role === "admin" && (
                  <a
                    href="/admin"
                    title="Panel Admin"
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs px-2.5 sm:px-3 py-1.5 rounded-lg transition inline-flex items-center gap-1.5 shadow-sm flex-shrink-0"
                  >
                    <svg
                      className="w-3.5 h-3.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="hidden sm:inline">Panel Admin</span>
                  </a>
                )}
                <button
                  onClick={handleLogout}
                  title="Keluar"
                  className="bg-white/10 hover:bg-rose-900/60 text-slate-200 hover:text-white text-xs px-2.5 sm:px-3 py-1.5 rounded-lg border border-white/10 transition inline-flex items-center gap-1 sm:gap-1.5 max-w-[38vw] sm:max-w-none"
                >
                  <span className="max-w-[70px] sm:max-w-[100px] truncate">{user.name}</span>
                  <span className="text-slate-400 hidden sm:inline">&middot; Keluar</span>
                </button>
              </div>
            ) : (
              <a href="/login" className="btn-primary text-xs !py-2 !px-3 sm:!px-4">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                <span className="hidden sm:inline">Masuk</span>
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* SIDEBAR OVERLAY */}
      <div
        id="sidebarOverlay"
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* SIDEBAR DRAWER (Menu Navigasi) */}
      <aside
        id="sidebarMenu"
        aria-hidden={!sidebarOpen}
        className={`fixed top-0 left-0 h-full w-[280px] sm:w-80 max-w-[85vw] bg-[#050811]/95 backdrop-blur-2xl border-r border-white/10 z-[70] transition-transform duration-300 ease-out flex flex-col shadow-2xl ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between gap-2 px-4 sm:px-5 py-4 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <img
              src="/images/logopoltar.jpg"
              alt="Logo Polisi Taruna"
              className="h-9 w-9 rounded-lg object-cover flex-shrink-0 border border-white/10"
            />
            <div className="min-w-0">
              <span className="font-bold text-sm text-white block leading-tight truncate">
                POLISI TARUNA
              </span>
              <span className="text-[10px] text-amber-400 font-semibold tracking-wider block truncate">
                SMKN 2 DEPOK
              </span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Tutup menu"
            className="flex-shrink-0 w-9 h-9 rounded-full bg-white/5 hover:bg-rose-900/50 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-1 text-sm">
          <a
            href="#hero"
            onClick={() => setSidebarOpen(false)}
            className={`nav-link sidebar-link ${activeNav === "hero" ? "sidebar-active" : ""}`}
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10m-9 11h4"
              />
            </svg>
            <span>Beranda</span>
          </a>
          <a
            href="#about"
            onClick={() => setSidebarOpen(false)}
            className={`nav-link sidebar-link ${activeNav === "about" ? "sidebar-active" : ""}`}
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span>Profil</span>
          </a>
          <a
            href="#visimisi"
            onClick={() => setSidebarOpen(false)}
            className={`nav-link sidebar-link ${activeNav === "visimisi" ? "sidebar-active" : ""}`}
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385m0-10A7.968 7.968 0 0114.5 4c1.255 0 2.443.29 3.5.804v10a7.968 7.968 0 00-3.5-.804c-1.669 0-3.218.51-4.5 1.385"
              />
            </svg>
            <span>Visi &amp; Misi</span>
          </a>
          <a
            href="#struktur"
            onClick={() => setSidebarOpen(false)}
            className={`nav-link sidebar-link ${activeNav === "struktur" ? "sidebar-active" : ""}`}
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4"
              />
            </svg>
            <span>Struktur</span>
          </a>
          <a
            href="#tugas"
            onClick={() => setSidebarOpen(false)}
            className={`nav-link sidebar-link ${activeNav === "tugas" ? "sidebar-active" : ""}`}
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
            <span>Tugas Pokok</span>
          </a>
          <a
            href="#kegiatan"
            onClick={() => setSidebarOpen(false)}
            className={`nav-link sidebar-link ${activeNav === "kegiatan" ? "sidebar-active" : ""}`}
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M4 6h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1z"
              />
            </svg>
            <span>Dokumentasi</span>
          </a>
          <a
            href="#kontak"
            onClick={() => setSidebarOpen(false)}
            className={`nav-link sidebar-link ${activeNav === "kontak" ? "sidebar-active" : ""}`}
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span>Layanan Pengaduan</span>
          </a>
        </nav>

        {/* Sidebar Footer */}
        <div className="px-4 sm:px-5 py-4 border-t border-white/10 flex-shrink-0">
          <p className="text-[11px] text-slate-500" id="sidebarCopyright">
            &copy; {currentYear} Polisi Taruna SMKN 2 Depok
          </p>
        </div>
      </aside>
    </>
  );
}
