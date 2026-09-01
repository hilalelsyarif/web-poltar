<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class ReportController extends Controller
{
    // 1. SIMPAN LAPORAN (NANGKAP USER_ID JIKA USER SEDANG LOGIN)
    public function store(Request $request)
    {
        $request->validate([
            'reporter_name' => 'nullable|string|max:100',
            'class_name'    => 'required|string|max:20',
            'description'   => 'required|string',
            'evidence_img'  => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('evidence_img')) {
            $imagePath = $request->file('evidence_img')->store('reports', 'public');
        }

        $ticketCode = 'POLTAR-' . strtoupper(Str::random(5));

        // Nangkep user_id kalo user lagi login pake token Sanctum
        $userId = Auth::guard('sanctum')->user() ? Auth::guard('sanctum')->user()->id : null;

        $report = Report::create([
            'user_id'       => $userId, // <--- DISIMPAN DI SINI
            'ticket_code'   => $ticketCode,
            'reporter_name' => $request->reporter_name ?? 'Anonim',
            'class_name'    => $request->class_name,
            'description'   => $request->description,
            'evidence_img'  => $imagePath,
            'status'        => 'Pending',
        ]);

        return response()->json([
            'success'     => true,
            'message'     => 'Laporan berhasil dikirim!',
            'ticket_code' => $ticketCode,
            'data'        => $report
        ], 201);
    }

    // 2. FUNGSI KHUSUS RIWAYAT LAPORAN SAYA (BACA DARI TOKEN USER)
    public function userReports(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Unauthenticated'], 401);
        }

        $reports = Report::where('user_id', $user->id)
                         ->latest()
                         ->get();

        return response()->json([
            'success' => true,
            'data'    => $reports
        ]);
    }

    // 3. CEK STATUS TIKET (MANUAL TRACKING)
    public function checkStatus($ticket_code)
    {
        $report = Report::where('ticket_code', $ticket_code)->first();

        if (!$report) {
            return response()->json([
                'success' => false,
                'message' => 'Kode tiket tidak ditemukan!'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data'    => $report
        ], 200);
    }
}