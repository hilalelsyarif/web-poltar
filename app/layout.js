import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata = {
  title: "Polisi Taruna | SMKN 2 Depok",
  description:
    "Portal Resmi Korps Polisi Taruna (POLTAR) SMKN 2 Depok — Penegak kedisiplinan, ketertiban, dan pembinaan karakter taruna.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo-poltar.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/logo-poltar.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`scroll-smooth ${plusJakarta.variable} ${jetbrainsMono.variable}`}>
      <body className="ambient-bg text-slate-100 min-h-screen font-sans selection:bg-rose-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
