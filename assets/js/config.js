// ============================================================
// POLISI TARUNA SMKN 2 DEPOK — GLOBAL CONFIG
// ============================================================

(function () {
    const origin = window.location.origin;

    // Jika dibuka langsung via file:/// atau port live server 5500, arahkan ke local 8000
    const isFileProtocol = window.location.protocol === 'file:';
    const isLiveServer = window.location.port === '5500' || window.location.port === '3000';

    if (isFileProtocol || isLiveServer) {
        window.BACKEND_BASE_URL = 'http://127.0.0.1:8000';
    } else if (window.location.hostname.includes('vercel.app')) {
        // Jika frontend di-host di Vercel, backend diarahkan ke Railway
        window.BACKEND_BASE_URL = 'https://web-poltar-production.up.railway.app';
    } else {
        // Otomatis mengikuti domain host (baik di Railway, domain sendiri, ataupun localhost)
        window.BACKEND_BASE_URL = origin;
    }

    window.API_BASE_URL = `${window.BACKEND_BASE_URL}/api`;

    console.log(`[POLTAR CONFIG] Backend: ${window.BACKEND_BASE_URL}`);
})();
