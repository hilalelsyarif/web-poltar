export function getBackendBase() {
  if (process.env.NEXT_PUBLIC_BACKEND_URL) {
    return process.env.NEXT_PUBLIC_BACKEND_URL;
  }
  // Default to live production backend on Railway
  return "https://web-poltar-production.up.railway.app";
}
