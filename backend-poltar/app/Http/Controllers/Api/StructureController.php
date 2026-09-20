<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Structure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Throwable;

class StructureController extends Controller
{
    /**
     * Auto-seed template pengurus bersih per angkatan
     */
    private function seedDefaultsForGen(string $gen): void
    {
        $genNum = (int) $gen;
        $isAkt22 = $genNum === 22;
        $isAkt18Or19 = $genNum === 18 || $genNum === 19;

        $items = [];

        // Khusus Angkatan 22 (Data Personel Resmi)
        if ($isAkt22) {
            $akt22Items = [
                ['name' => 'Rasya Walisyani', 'position' => 'Wadanki 1'],
                ['name' => 'M. Bagas Alghifari', 'position' => 'Danki'],
                ['name' => 'Nurul Hafidz', 'position' => 'Wadanki 2'],
                ['name' => 'Arifianto Ilham', 'position' => 'Ketua PKT'],
                ['name' => 'Hilal El Syarif', 'position' => 'PKT'],
                ['name' => 'Ramadhan Jothi', 'position' => 'PKT'],
                ['name' => 'Keysha Adinda N', 'position' => 'Sekretaris'],
                ['name' => 'Masayu Queensha', 'position' => 'Sekretaris'],
                ['name' => 'Aryabima Suyatna', 'position' => 'Bendahara'],
                ['name' => 'Djessica Putri', 'position' => 'Bendahara'],
                ['name' => 'Rendy Arifianto', 'position' => 'TIK'],
                ['name' => 'Jasmine Malika', 'position' => 'TIK'],
                ['name' => 'Syafa Annafi', 'position' => 'TIK'],
                ['name' => 'Abqary Muhammad', 'position' => 'Jasmani'],
                ['name' => 'Jonathyan Febrian', 'position' => 'Jasmani'],
                ['name' => 'Dimas Akbar', 'position' => 'Jasmani'],
                ['name' => 'Babyna Syasyabila', 'position' => 'Humas'],
                ['name' => 'Kayla Satira', 'position' => 'Humas'],
            ];

            foreach ($akt22Items as $item) {
                Structure::create([
                    'name'       => $item['name'],
                    'position'   => $item['position'],
                    'generation' => (string) $gen,
                    'image_path' => '',
                ]);
            }
            return;
        }

        // 1. Pimpinan Komando (Akt 18 - 21)
        $items[] = ['position' => 'Wadanpol 1'];
        $items[] = ['position' => 'Danpol'];
        $items[] = ['position' => 'Wadanpol 2'];

        // 2. PKT (1 Ketua + 3 Anggota = 4 slot)
        $items[] = ['position' => 'Ketua PKT'];
        $items[] = ['position' => 'PKT'];
        $items[] = ['position' => 'PKT'];
        $items[] = ['position' => 'PKT'];

        // 3. Sekretaris & Bendahara
        $items[] = ['position' => 'Sekretaris'];
        $items[] = ['position' => 'Bendahara'];

        // 4. Divisi Operasional (TIK 2, Jasmani 2, Humas 2, Linmas 2 jika 18/19)
        $items[] = ['position' => 'TIK'];
        $items[] = ['position' => 'TIK'];
        $items[] = ['position' => 'Jasmani'];
        $items[] = ['position' => 'Jasmani'];
        $items[] = ['position' => 'Humas'];
        $items[] = ['position' => 'Humas'];

        if ($isAkt18Or19) {
            $items[] = ['position' => 'Linmas'];
            $items[] = ['position' => 'Linmas'];
        }

        // 5. Anggota (Khusus Akt 18 & 19 - 3 slot)
        if ($isAkt18Or19) {
            $items[] = ['position' => 'Anggota'];
            $items[] = ['position' => 'Anggota'];
            $items[] = ['position' => 'Anggota'];
        }

        foreach ($items as $item) {
            Structure::create([
                'name'       => 'Nama Personel',
                'position'   => $item['position'],
                'generation' => (string) $gen,
                'image_path' => '',
            ]);
        }
    }

    /**
     * 1. Dapatkan semua data struktur (Auto-seed jika kosong)
     */
    public function index()
    {
        try {
            if (Structure::count() === 0) {
                foreach (['18', '19', '20', '21', '22'] as $gen) {
                    $this->seedDefaultsForGen($gen);
                }
            }

            $structures = Structure::orderBy('generation', 'asc')->get();

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

    /**
     * 2. Dapatkan data struktur per Angkatan (Auto-seed jika angkatan kosong)
     */
    public function getByGen($gen)
    {
        try {
            $genStr = (string) $gen;
            $count = Structure::where('generation', $genStr)->count();

            if ($count === 0 && in_array($genStr, ['18', '19', '20', '21', '22'])) {
                $this->seedDefaultsForGen($genStr);
            }

            $structures = Structure::where('generation', $genStr)->get();

            return response()->json([
                'success'    => true,
                'generation' => $genStr,
                'data'       => $structures
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data angkatan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * 3. Tambah Data Anggota Baru (POST)
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name'       => 'required|string|max:255',
                'position'   => 'required|string|max:255',
                'generation' => 'required',
                'image'      => 'nullable|image|mimes:jpeg,png,jpg,webp|max:4096'
            ]);

            $imagePath = '';
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('structures', 'public');
            }

            $structure = Structure::create([
                'name'       => $request->name,
                'position'   => $request->position,
                'generation' => (string) $request->generation,
                'image_path' => $imagePath ?? ''
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

    /**
     * 4. Update Data Anggota (PUT / PATCH / POST dengan multipart)
     */
    public function update(Request $request, $id)
    {
        try {
            $structure = Structure::find($id);
            if (!$structure) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data personel tidak ditemukan'
                ], 404);
            }

            $request->validate([
                'name'       => 'nullable|string|max:255',
                'position'   => 'nullable|string|max:255',
                'generation' => 'nullable',
                'image'      => 'nullable|image|mimes:jpeg,png,jpg,webp|max:4096'
            ]);

            if ($request->has('name') && !empty($request->name)) {
                $structure->name = $request->name;
            }

            if ($request->has('position') && !empty($request->position)) {
                $structure->position = $request->position;
            }

            if ($request->has('generation') && !empty($request->generation)) {
                $structure->generation = (string) $request->generation;
            }

            if ($request->hasFile('image')) {
                // Hapus foto lama jika ada di storage
                if ($structure->image_path && Storage::disk('public')->exists($structure->image_path)) {
                    Storage::disk('public')->delete($structure->image_path);
                }

                $structure->image_path = $request->file('image')->store('structures', 'public');
            }

            $structure->save();

            return response()->json([
                'success' => true,
                'message' => 'Data personel berhasil diperbarui',
                'data'    => $structure
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui data: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * 5. Hapus Data Anggota (DELETE)
     */
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
            if ($structure->image_path && Storage::disk('public')->exists($structure->image_path)) {
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