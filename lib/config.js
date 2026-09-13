export function getBackendBase() {
  if (process.env.NEXT_PUBLIC_BACKEND_URL) {
    return process.env.NEXT_PUBLIC_BACKEND_URL;
  }
  if (typeof window === "undefined") {
    return "http://127.0.0.1:8000";
  }
  if (window.location.hostname.includes("vercel.app")) {
    return "https://web-poltar-production.up.railway.app";
  }
  // Local development: when accessed via port 3000, 3001, etc., point to Laravel on port 8000
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    if (window.location.port !== "8000") {
      return "http://127.0.0.1:8000";
    }
  }
  return window.location.origin;
}
