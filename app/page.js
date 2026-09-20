"use client";

import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WajibJanjiPoltar from "@/components/WajibJanjiPoltar";
import StrukturOrg from "@/components/StrukturOrg";
import TugasPokok from "@/components/TugasPokok";
import Kegiatan from "@/components/Kegiatan";
import Pengaduan from "@/components/Pengaduan";
import Footer from "@/components/Footer";
import ImageLightboxModal from "@/components/ImageLightboxModal";

export default function Home() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState("");

  // Tangkap token dari Google OAuth callback (?token=...&role=...&name=...)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      const role = params.get("role");
      const name = params.get("name");

      if (token) {
        localStorage.setItem("auth_token", token);
        if (name) localStorage.setItem("user_name", name);
        if (role) localStorage.setItem("user_role", role);

        // Bersihkan query params dari URL tanpa reload
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);

        // Force re-render komponen agar Pengaduan mendeteksi login
        window.dispatchEvent(new Event("storage"));
      }
    }
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 800, // durasi animasi (ms)
      once: true,    // animasi hanya berjalan sekali saat di-scroll
      easing: "ease-out-cubic",
    });
  }, []);

  const handleOpenModal = (imgSrc) => {
    setLightboxImg(imgSrc);
    setLightboxOpen(true);
  };

  const handleCloseModal = () => {
    setLightboxOpen(false);
    setLightboxImg("");
  };

  return (
    <div className="relative min-h-screen">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Hero onOpenModal={handleOpenModal} />
        <About />
        <WajibJanjiPoltar />
        <StrukturOrg />
        <TugasPokok />
        <Kegiatan onOpenModal={handleOpenModal} />
        <Pengaduan />
      </main>

      {/* Footer */}
      <Footer />

      {/* Image Lightbox Modal */}
      <ImageLightboxModal
        isOpen={lightboxOpen}
        imageSrc={lightboxImg}
        onClose={handleCloseModal}
      />
    </div>
  );
}
