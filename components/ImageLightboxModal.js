"use client";

import { useEffect } from "react";

export default function ImageLightboxModal({ isOpen, imageSrc, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.classList.add("overflow-hidden");
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen, onClose]);

  if (!isOpen || !imageSrc) return null;

  return (
    <div
      id="imageModal"
      className="fixed inset-0 z-[100] bg-black/90 flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <button
        className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center transition focus:outline-none"
        onClick={onClose}
        aria-label="Tutup preview gambar"
      >
        ✕
      </button>
      <img
        id="modalImg"
        src={imageSrc}
        alt="Preview Gambar"
        className="max-w-full sm:max-w-[90%] max-h-[85vh] object-contain rounded-xl border border-white/20 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
