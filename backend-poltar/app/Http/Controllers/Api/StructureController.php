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
            ]);

            $imagePath = '';
            if ($request->filled('image_base64')) {
                $imagePath = $request->input('image_base64');
            } elseif ($request->hasFile('image')) {
                $imageFile = $request->file('image');
                if (!$imageFile->isValid()) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Gagal mengunggah foto. Pastikan ukuran file tidak melebihi batas server.'
                    ], 422);
                }
                $imagePath = $this->imageToBase64($imageFile);
            } elseif ($request->filled('image') && is_string($request->input('image')) && str_starts_with($request->input('image'), 'data:image')) {
                $imagePath = $request->input('image');
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

            if ($request->filled('image_base64')) {
                $structure->image_path = $request->input('image_base64');
            } elseif ($request->hasFile('image')) {
                $imageFile = $request->file('image');
                if (!$imageFile->isValid()) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Gagal mengunggah foto. Pastikan ukuran file tidak melebihi batas server.'
                    ], 422);
                }
                // Konversi ke base64 data URL (tidak perlu filesystem)
                $structure->image_path = $this->imageToBase64($imageFile);
            } elseif ($request->filled('image') && is_string($request->input('image')) && str_starts_with($request->input('image'), 'data:image')) {
                $structure->image_path = $request->input('image');
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

    /**
     * Auto-seed template pengurus per angkatan jika data belum ada
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
     * Konversi file upload ke base64 data URL (compressed JPEG)
     * Solusi untuk Railway ephemeral filesystem
     */
    private function imageToBase64($file, int $maxWidth = 400, int $quality = 70): string
    {
        $mime = $file->getMimeType() ?: 'image/jpeg';
        $extension = strtolower($file->getClientOriginalExtension());

        // Coba compress dengan GD hanya jika semua fungsi GD yang diperlukan benar-benar ada
        if (
            extension_loaded('gd') &&
            function_exists('imagecreatetruecolor') &&
            function_exists('imagecopyresampled') &&
            function_exists('imagejpeg') &&
            function_exists('imagedestroy')
        ) {
            $source = null;
            try {
                if (in_array($extension, ['jpg', 'jpeg']) && function_exists('imagecreatefromjpeg')) {
                    $source = @\imagecreatefromjpeg($file->getRealPath());
                } elseif ($extension === 'png' && function_exists('imagecreatefrompng')) {
                    $source = @\imagecreatefrompng($file->getRealPath());
                } elseif ($extension === 'webp' && function_exists('imagecreatefromwebp')) {
                    $source = @\imagecreatefromwebp($file->getRealPath());
                } elseif (function_exists('imagecreatefromstring')) {
                    $raw = @file_get_contents($file->getRealPath());
                    if ($raw !== false) {
                        $source = @\imagecreatefromstring($raw);
                    }
                }

                if ($source) {
                    $origW = \imagesx($source);
                    $origH = \imagesy($source);

                    // Resize jika terlalu besar
                    if ($origW > $maxWidth) {
                        $newW = $maxWidth;
                        $newH = (int) round($origH * ($maxWidth / $origW));
                        $resized = \imagecreatetruecolor($newW, $newH);
                        \imagecopyresampled($resized, $source, 0, 0, 0, 0, $newW, $newH, $origW, $origH);
                        \imagedestroy($source);
                        $source = $resized;
                    }

                    // Output sebagai JPEG compressed
                    ob_start();
                    \imagejpeg($source, null, $quality);
                    $data = ob_get_clean();
                    \imagedestroy($source);

                    if (!empty($data)) {
                        return 'data:image/jpeg;base64,' . base64_encode($data);
                    }
                }
            } catch (Throwable $e) {
                // Abaikan error GD dan lanjutkan fallback ke base64 murni
            }
        }

        // Fallback: raw base64 tanpa server-side GD
        $data = file_get_contents($file->getRealPath());
        return 'data:' . $mime . ';base64,' . base64_encode($data);
    }
}