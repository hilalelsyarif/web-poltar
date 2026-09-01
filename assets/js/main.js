// ============================================================
// POLISI TARUNA SMKN 2 DEPOK — MAIN.JS
// Modern Frontend Logic & Backend API Integration
// ============================================================

const API_BASE_URL = 'http://127.0.0.1:8000/api';

// ---------- Inisialisasi Saat Dokumen Siap ----------
document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi AOS (Animate on Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 500, once: true, offset: 30 });
    }

    handleLoginRedirect();
    updateAuthNavbar();
    updateCopyrightYear();

    fetchStrukturAngkatan('18');
    loadMyReports();
});

// ============================================================
// 1. MODAL GAMBAR / LIGHTBOX
// ============================================================
function openModal(imgSrc) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    if (!modal || !modalImg) return;

    if (!imgSrc.startsWith("assets/")) {
        imgSrc = "assets/images/" + imgSrc;
    }

    modalImg.src = imgSrc;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    setTimeout(() => modal.classList.remove("opacity-0"), 10);
}

function closeModal() {
    const modal = document.getElementById("imageModal");
    if (!modal) return;
    modal.classList.add("opacity-0");
    setTimeout(() => {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
    }, 200);
}

// Keyboard ESC to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ============================================================
// 2. SIDEBAR MENU NAVIGASI (Off-canvas, mirip web SMKN 2)
// ============================================================
function openSidebar() {
    const sidebar = document.getElementById('sidebarMenu');
    const overlay = document.getElementById('sidebarOverlay');
    const btn = document.getElementById('sidebarToggleBtn');
    if (!sidebar) return;

    sidebar.classList.remove('-translate-x-full');
    sidebar.setAttribute('aria-hidden', 'false');

    if (overlay) {
        overlay.classList.remove('pointer-events-none');
        overlay.classList.add('opacity-100');
        overlay.classList.remove('opacity-0');
    }

    if (btn) btn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('overflow-hidden');
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebarMenu');
    const overlay = document.getElementById('sidebarOverlay');
    const btn = document.getElementById('sidebarToggleBtn');
    if (!sidebar) return;

    sidebar.classList.add('-translate-x-full');
    sidebar.setAttribute('aria-hidden', 'true');

    if (overlay) {
        overlay.classList.add('pointer-events-none');
        overlay.classList.remove('opacity-100');
        overlay.classList.add('opacity-0');
    }

    if (btn) btn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('overflow-hidden');
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebarMenu');
    if (!sidebar) return;
    const isOpen = !sidebar.classList.contains('-translate-x-full');
    isOpen ? closeSidebar() : openSidebar();
}

// Tutup sidebar dengan tombol ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeSidebar();
    }
});

// Tutup sidebar otomatis saat resize ke layar besar (opsional, jaga konsistensi state)
window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
        // biarkan tetap sesuai pilihan user; tidak dipaksa tertutup
    }
});

// ============================================================
// 3. NAVBAR SCROLLSPY
// ============================================================
const navSections = ['hero', 'about', 'visimisi', 'struktur', 'tugas', 'kegiatan', 'kontak'];

window.addEventListener('scroll', () => {
    let current = 'hero';
    navSections.forEach((id) => {
        const section = document.getElementById(id);
        if (section && window.scrollY >= section.offsetTop - 140) {
            current = id;
        }
    });

    document.querySelectorAll('.nav-link').forEach((link) => {
        link.classList.toggle('nav-active', link.getAttribute('href') === `#${current}`);
    });
});

// ============================================================
// 4. COPYRIGHT TAHUN OTOMATIS
// ============================================================
function updateCopyrightYear() {
    const year = new Date().getFullYear();

    const copyrightYear = document.getElementById("copyright-year");
    if (copyrightYear) {
        copyrightYear.innerHTML = `&copy; ${year} Polisi Taruna SMKN 2 Depok. All Rights Reserved.`;
    }

    const sidebarCopyright = document.getElementById("sidebarCopyright");
    if (sidebarCopyright) {
        sidebarCopyright.innerHTML = `&copy; ${year} Polisi Taruna SMKN 2 Depok`;
    }
}

// ============================================================
// 5. AUTENTIKASI: REDIRECT, NAVBAR STATE, LOGOUT
// ============================================================
function handleLoginRedirect() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const name = urlParams.get('name');
    const role = urlParams.get('role');

    if (token && name) {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_name', decodeURIComponent(name));
        localStorage.setItem('user_role', role || 'user');

        const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.replaceState({ path: cleanUrl }, '', cleanUrl);

        if (typeof Swal !== 'undefined') {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil Masuk',
                text: `Selamat datang, ${decodeURIComponent(name)}.`,
                background: '#0f172a',
                color: '#f8fafc',
                confirmButtonColor: '#e11d48'
            });
        }

        updateAuthNavbar();
    }
}

function updateAuthNavbar() {
    const token = localStorage.getItem('auth_token');
    const name = localStorage.getItem('user_name');
    const role = localStorage.getItem('user_role');

    const navContainer = document.getElementById('navAuthContainer');
    if (!token || !name) return;

    const adminBtnHtml = role === 'admin' ? `
        <a href="admin.html" title="Panel Admin"
            class="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs px-2.5 sm:px-3 py-1.5 rounded-lg transition inline-flex items-center gap-1.5 shadow-sm flex-shrink-0">
            <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span class="hidden sm:inline">Panel Admin</span>
        </a>
    ` : '';

    const loggedInHtml = `
        <div class="flex items-center gap-1.5 sm:gap-2">
            ${adminBtnHtml}
            <button onclick="handleLogout()" title="Keluar"
                class="bg-white/10 hover:bg-rose-900/60 text-slate-200 hover:text-white text-xs px-2.5 sm:px-3 py-1.5 rounded-lg border border-white/10 transition inline-flex items-center gap-1 sm:gap-1.5 max-w-[38vw] sm:max-w-none">
                <span class="max-w-[70px] sm:max-w-[100px] truncate">${name}</span>
                <span class="text-slate-400 hidden sm:inline">&middot; Keluar</span>
            </button>
        </div>
    `;

    if (navContainer) navContainer.innerHTML = loggedInHtml;
}

function handleLogout() {
    if (typeof Swal === 'undefined') {
        localStorage.clear();
        window.location.reload();
        return;
    }
    Swal.fire({
        title: 'Konfirmasi Keluar',
        text: "Apakah Anda ingin keluar dari akun?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#e11d48',
        cancelButtonColor: '#1e293b',
        confirmButtonText: 'Ya, Keluar',
        cancelButtonText: 'Batal',
        background: '#0f172a',
        color: '#f8fafc'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear();
            window.location.reload();
        }
    });
}

// ============================================================
// 6. LAYANAN PENGADUAN: KIRIM LAPORAN
// ============================================================
async function submitReport(event) {
    event.preventDefault();

    const btn = document.getElementById('btnSubmitReport');
    const alertBox = document.getElementById('reportAlert');
    const token = localStorage.getItem('auth_token');

    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span>Mengirim Laporan...</span>';
    }
    if (alertBox) alertBox.classList.add('hidden');

    const formData = new FormData();
    formData.append('reporter_name', document.getElementById('reporter_name').value);
    formData.append('class_name', document.getElementById('class_name').value);
    formData.append('description', document.getElementById('description').value);

    const fileInput = document.getElementById('evidence_img');
    if (fileInput && fileInput.files[0]) {
        formData.append('evidence_img', fileInput.files[0]);
    }

    const headers = { 'Accept': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    try {
        const response = await fetch(`${API_BASE_URL}/reports`, {
            method: 'POST',
            headers: headers,
            body: formData
        });

        const result = await response.json();

        if (response.ok && result.success) {
            const ticketCode = result.data ? result.data.ticket_code : result.ticket_code;

            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'success',
                    title: 'Laporan Diterima',
                    html: `
                        <p class="text-xs text-slate-300 mb-2">Terima kasih atas partisipasi Anda dalam menjaga ketertiban.</p>
                        <div class="p-3 bg-slate-900 border border-white/10 rounded-lg text-center my-3">
                            <span class="text-[11px] text-slate-400 block mb-1">Nomor Tiket Anda:</span>
                            <span class="text-base font-bold text-rose-400 font-mono select-all">${ticketCode}</span>
                        </div>
                        <p class="text-[11px] text-slate-400">Simpan kode tiket ini untuk mengecek perkembangan status laporan.</p>
                    `,
                    background: '#0f172a',
                    color: '#f8fafc',
                    confirmButtonColor: '#e11d48'
                });
            } else if (alertBox) {
                alertBox.className = "mt-3 p-3 rounded-lg text-xs bg-emerald-950/80 border border-emerald-700 text-emerald-300";
                alertBox.innerHTML = `
                    <p class="font-bold">Laporan Berhasil Dicatat</p>
                    <p class="mt-1">Nomor Tiket: <span class="font-bold font-mono select-all">${ticketCode}</span></p>
                `;
                alertBox.classList.remove('hidden');
            }

            document.getElementById('formReport').reset();

            if (typeof loadMyReports === 'function') {
                loadMyReports();
            }
        } else {
            let errorMsg = result.message || 'Gagal mengirim laporan';
            if (result.errors) {
                errorMsg = Object.values(result.errors).flat().join(', ');
            }
            throw new Error(errorMsg);
        }
    } catch (error) {
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                icon: 'error',
                title: 'Pengiriman Gagal',
                text: error.message,
                background: '#0f172a',
                color: '#f8fafc',
                confirmButtonColor: '#e11d48'
            });
        } else if (alertBox) {
            alertBox.className = "mt-3 p-3 rounded-lg text-xs bg-rose-950/80 border border-rose-700 text-rose-200";
            alertBox.innerHTML = `Error: ${error.message}`;
            alertBox.classList.remove('hidden');
        }
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<span>Kirim Laporan</span>';
        }
    }
}

// ============================================================
// 7. RIWAYAT LAPORAN SAYA
// ============================================================
async function loadMyReports() {
    const token = localStorage.getItem('auth_token');
    const container = document.getElementById('myReportsContainer');
    if (!container) return;

    if (!token) {
        container.innerHTML = '<p class="text-slate-500 text-xs py-2">Silakan masuk dengan akun Anda untuk melihat riwayat aduan yang pernah dikirimkan.</p>';
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/user/reports`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const result = await response.json();

        if (result.success && result.data && result.data.length > 0) {
            container.innerHTML = result.data.map(item => {
                const statusBadge = item.status === 'Done'
                    ? '<span class="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/60">Selesai</span>'
                    : item.status === 'Process'
                        ? '<span class="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-sky-950 text-sky-300 border border-sky-700/60">Diproses</span>'
                        : '<span class="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-amber-950 text-amber-300 border border-amber-700/60">Menunggu</span>';

                return `
                    <div class="p-3.5 bg-slate-900/60 border border-white/10 rounded-lg mb-2 hover:border-white/20 transition">
                        <div class="flex justify-between items-center mb-1.5">
                            <span class="font-bold text-rose-400 font-mono text-xs">${item.ticket_code}</span>
                            ${statusBadge}
                        </div>
                        <p class="text-xs text-slate-300 leading-relaxed">${item.description}</p>
                        <span class="text-[11px] text-slate-500 block mt-1.5">Kelas/Angkatan: ${item.class_name}</span>
                    </div>
                `;
            }).join('');
        } else {
            container.innerHTML = '<p class="text-xs text-slate-500 py-2">Belum ada riwayat laporan yang tercatat.</p>';
        }
    } catch (err) {
        console.warn("Riwayat laporan belum tersedia (server offline).");
    }
}

// ============================================================
// 8. LACAK STATUS ADUAN
// ============================================================
async function trackReport(event) {
    event.preventDefault();

    const ticketCode = document.getElementById('ticket_code_input').value.trim().toUpperCase();
    const resultBox = document.getElementById('trackResult');

    resultBox.classList.remove('hidden');
    resultBox.innerHTML = '<p class="text-slate-400 text-xs flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span> Mencari data tiket...</p>';

    try {
        const response = await fetch(`${API_BASE_URL}/reports/track/${ticketCode}`, {
            headers: { 'Accept': 'application/json' }
        });
        const result = await response.json();

        if (response.ok && result.success) {
            const data = result.data;
            let statusBadge = '';

            if (data.status === 'Pending') {
                statusBadge = '<span class="bg-amber-950 text-amber-400 border border-amber-600/70 px-2.5 py-0.5 rounded-full text-[10px] font-semibold">Menunggu Verifikasi</span>';
            } else if (data.status === 'Process') {
                statusBadge = '<span class="bg-sky-950 text-sky-400 border border-sky-600/70 px-2.5 py-0.5 rounded-full text-[10px] font-semibold">Sedang Diproses</span>';
            } else {
                statusBadge = '<span class="bg-emerald-950 text-emerald-400 border border-emerald-600/70 px-2.5 py-0.5 rounded-full text-[10px] font-semibold">Selesai Ditindaklanjuti</span>';
            }

            resultBox.innerHTML = `
                <div class="flex justify-between items-center border-b border-white/10 pb-2 mb-2">
                    <span class="text-rose-400 font-bold font-mono text-xs">${data.ticket_code}</span>
                    ${statusBadge}
                </div>
                <div class="space-y-1.5 text-xs">
                    <p class="text-slate-300"><span class="text-slate-400 font-medium">Pelapor:</span> ${data.reporter_name || 'Anonim'} (${data.class_name})</p>
                    <p class="text-slate-300 leading-relaxed"><span class="text-slate-400 font-medium">Isi Laporan:</span> ${data.description}</p>
                    <p class="text-[11px] text-slate-500 pt-1.5 border-t border-white/5">Waktu Lapor: ${new Date(data.created_at).toLocaleString('id-ID')}</p>
                </div>
            `;
        } else {
            resultBox.innerHTML = `<p class="text-rose-400 font-semibold text-xs">${result.message || 'Kode tiket tidak ditemukan. Periksa kembali format kode tiket Anda.'}</p>`;
        }
    } catch (error) {
        resultBox.innerHTML = `<p class="text-rose-400 text-xs">Tidak dapat terhubung ke server backend lokal.</p>`;
    }
}

// ============================================================
// 9. STRUKTUR ORGANISASI PER ANGKATAN
// ============================================================
async function fetchStrukturAngkatan(gen, e = null) {
    if (e) e.preventDefault();

    document.querySelectorAll('.tab-btn').forEach((btn) => btn.classList.remove('is-active'));
    const activeBtn = document.getElementById(`btn-gen-${gen}`);
    if (activeBtn) activeBtn.classList.add('is-active');

    const container = document.getElementById('structureContainer');
    if (!container) return;

    // Loading State
    container.innerHTML = `
        <div class="col-span-1 sm:col-span-2 md:col-span-3 text-center py-10">
            <div class="inline-block w-6 h-6 border-2 border-rose-500 border-t-transparent rounded-full animate-spin mb-2"></div>
            <p class="text-slate-400 text-xs">Memuat data personel Angkatan ${gen}...</p>
        </div>
    `;

    try {
        const res = await fetch(`${API_BASE_URL}/structures/${gen}`);
        if (!res.ok) throw new Error("Server response error");
        const result = await res.json();

        if (result.success && result.data && result.data.length > 0) {
            container.innerHTML = result.data.map((item) => `
                <div class="person-card group">
                    <div class="w-24 h-24 mx-auto mb-3.5 rounded-full bg-slate-900 border-2 border-white/10 group-hover:border-rose-500/80 transition-colors flex items-center justify-center overflow-hidden shadow-lg">
                        ${item.image_path
                    ? `<img src="http://127.0.0.1:8000/storage/${item.image_path}" alt="${item.name}" class="w-full h-full object-cover">`
                    : '<span class="text-slate-500 text-2xl">👤</span>'}
                    </div>
                    <h4 class="text-base font-bold text-white mb-1 tracking-tight">${item.name}</h4>
                    <span class="inline-block px-2.5 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full mb-1">
                        ${item.position}
                    </span>
                    <span class="text-[11px] text-slate-400 block mt-1">Angkatan ${item.generation}</span>
                </div>
            `).join('');
        } else {
            container.innerHTML = `
                <div class="col-span-1 sm:col-span-2 md:col-span-3 text-center p-8 glass-card">
                    <p class="text-slate-400 text-xs">Belum ada data personel untuk Angkatan ${gen}.</p>
                </div>
            `;
        }
    } catch (err) {
        // Fallback jika backend belum jalan / offline
        container.innerHTML = `
            <div class="col-span-1 sm:col-span-2 md:col-span-3 text-center p-6 glass-card border-rose-900/30">
                <p class="text-rose-400 text-xs font-semibold mb-1">Koneksi backend lokal belum aktif</p>
                <p class="text-slate-400 text-[11px]">Jalankan server backend Laravel (http://127.0.0.1:8000) untuk memuat data personel secara dinamis.</p>
            </div>
        `;
    }
}