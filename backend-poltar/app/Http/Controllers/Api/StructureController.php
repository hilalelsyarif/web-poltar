<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Structure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage; // BARIS INI ANJIR YANG KURANG!
use Throwable;

class StructureController extends Controller
{
    // 1. Dapatkan semua data struktur
    public function index()
    {
        try {
            $structures = Structure::latest()->get();

            return response()->json([
                'success' => true,
                'data'    => $structures
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data struktur: ' . $e->getMessage()
            ], 500);
        }
    }

    // 2. Dapatkan data struktur per Angkatan
    public function getByGen($gen)
    {
        try {
            $structures = Structure::where('generation', (string) $gen)->get();

            return response()->json([
                'success'    => true,
                'generation' => (string) $gen,
                'data'       => $structures
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data angkatan: ' . $e->getMessage()
            ], 500);
        }
    }

    // 3. Tambah Data Anggota Baru
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name'       => 'required|string|max:255',
                'position'   => 'required|string|max:255',
                'generation' => 'required',
                'image'      => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048'
            ]);

            $imagePath = null;
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('structures', 'public');
            }

            $structure = Structure::create([
                'name'       => $request->name,
                'position'   => $request->position,
                'generation' => (string) $request->generation,
                'image_path' => $imagePath
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Data struktur berhasil ditambahkan',
                'data'    => $structure
            ], 201);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menyimpan data: ' . $e->getMessage()
            ], 500);
        }
    }

    // 4. Hapus Data Anggota (BEBAS ERROR CLASS NOT FOUND!)
    public function destroy($id)
    {
        try {
            $structure = Structure::find($id);
            if (!$structure) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data tidak ditemukan'
                ], 404);
            }

            // Hapus file foto dari folder storage jika ada
            if ($structure->image_path) {
                Storage::disk('public')->delete($structure->image_path);
            }

            $structure->delete();

            return response()->json([
                'success' => true,
                'message' => 'Data struktur berhasil dihapus'
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus data: ' . $e->getMessage()
            ], 500);
        }
    }
}