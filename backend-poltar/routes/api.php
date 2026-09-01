<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\Api\PublicController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\StructureController;
use App\Models\Report;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes - Polisi Taruna SMKN 2 Depok
|--------------------------------------------------------------------------
*/

// ================= 1. PUBLIC ROUTES (Dapat diakses Publik / Tanpa Login) =================
Route::post('/reports', [ReportController::class, 'store']);
Route::get('/reports/track/{ticket_code}', [ReportController::class, 'checkStatus']);
Route::get('/activities', [PublicController::class, 'getActivities']);

// ROUTE STRUKTUR ORGANISASI (Bisa dibaca index.html & Admin Dashboard)
Route::get('/structures', [StructureController::class, 'index']);
Route::get('/structures/{gen}', [StructureController::class, 'getByGen']);


// ================= 2. AUTH ROUTES (Login, Register & Google OAuth) =================
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/auth/google', [AuthController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [AuthController::class, 'handleGoogleCallback']);


// ================= 3. PROTECTED ROUTES (Wajib Bearer Token / Sanctum) =================
Route::middleware(['auth:sanctum'])->group(function () {

    // --- USER / SISWA PRIVILEGES ---
    // Riwayat Laporan Saya (Mengambil laporan milik user yang sedang login)
    Route::get('/user/reports', function (Request $request) {
        $reports = Report::where('user_id', $request->user()->id)
            ->orWhere('reporter_name', $request->user()->name)
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data'    => $reports
        ]);
    });

    // --- ADMIN PRIVILEGES ---
    // 1. Get All Reports (Untuk Dashboard Admin)
    Route::get('/admin/reports', function () {
        return response()->json([
            'success' => true, 
            'data'    => Report::latest()->get()
        ]);
    });

    // 2. Update Status Laporan (Pending / Process / Done)
    Route::patch('/admin/reports/{ticket_code}', function (Request $request, $ticket_code) {
        $report = Report::where('ticket_code', $ticket_code)->first();
        if ($report) {
            $report->update(['status' => $request->status]);
            return response()->json(['success' => true, 'message' => 'Status laporan berhasil diperbarui']);
        }
        return response()->json(['success' => false, 'message' => 'Tiket tidak ditemukan'], 404);
    });

    // 3. Tambah & Hapus Anggota Struktur Komando (Diarahkan langsung ke StructureController)
    Route::post('/structures', [StructureController::class, 'store']);
    Route::delete('/structures/{id}', [StructureController::class, 'destroy']);
});