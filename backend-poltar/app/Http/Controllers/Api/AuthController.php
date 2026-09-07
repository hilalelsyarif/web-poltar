<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Cache;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    // 1. REGISTER SISWA (DENGAN VALIDASI DOMAIN EMAIL ASLI)
    public function register(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email:rfc,dns|max:255|unique:users', 
            'password' => 'required|string|min:6',
        ], [
            'email.email'  => 'Format email tidak valid atau domain email tidak ditemukan!',
            'email.unique' => 'Email ini sudah terdaftar!'
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role'     => 'user',
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Registrasi berhasil',
            'token'   => $token,
            'user'    => $user
        ], 201);
    }

    // 2. LOGIN MANUAL (SISWA & ADMIN)
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false, 
                'message' => 'Email atau Password salah!'
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login berhasil',
            'token'   => $token,
            'user'    => [
                'id'    => $user->id,
                'name'  => $user->name,
                'email' => $user->email,
                'role'  => $user->role ?? 'user'
            ]
        ]);
    }

    // 3. FITUR LUPA PASSWORD: KIRIM OTP KE EMAIL / LOG
    public function sendOtp(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Email tidak terdaftar di sistem!'], 404);
        }

        // Generate OTP 6 Digit
        $otp = rand(100000, 999999);
        
        // Simpan OTP ke cache selama 10 menit
        Cache::put('otp_' . $request->email, $otp, now()->addMinutes(10));

        try {
            Mail::raw("Kode OTP Reset Password Polisi Taruna SMKN 2 Depok Anda adalah: {$otp}\n\nKode berlaku selama 10 menit.", function ($message) use ($request) {
                $message->to($request->email)
                        ->subject('Kode OTP Reset Password - POLTAR SMKN 2 Depok');
            });

            return response()->json([
                'success' => true, 
                'message' => 'Kode OTP berhasil dikirim ke email kamu!'
            ]);
        } catch (\Exception $e) {
            // Mode Simulasi jika Mailer log / error SMTP
            return response()->json([
                'success' => true, 
                'message' => "Kode OTP dibuat: {$otp} (Simulasi Testing)",
                'dev_otp' => $otp
            ]);
        }
    }

    // 4. FITUR RESET PASSWORD: VERIFIKASI OTP & UBAH PASSWORD
    public function resetPasswordWithOtp(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'otp'      => 'required|numeric',
            'password' => 'required|string|min:6'
        ]);

        $cachedOtp = Cache::get('otp_' . $request->email);

        if (!$cachedOtp || $cachedOtp != $request->otp) {
            return response()->json(['success' => false, 'message' => 'Kode OTP salah atau sudah kedaluwarsa!'], 400);
        }

        $user = User::where('email', $request->email)->first();
        if ($user) {
            $user->update(['password' => Hash::make($request->password)]);
            Cache::forget('otp_' . $request->email);

            return response()->json(['success' => true, 'message' => 'Password berhasil diubah. Silakan login kembali!']);
        }

        return response()->json(['success' => false, 'message' => 'User tidak ditemukan!'], 404);
    }

    // 5. REDIRECT GOOGLE
    public function redirectToGoogle(Request $request)
    {
        $driver = Socialite::driver('google')->stateless();
        if ($request->has('redirect_to')) {
            $driver->with(['state' => base64_encode($request->get('redirect_to'))]);
        }
        return $driver->redirect();
    }

    // 6. CALLBACK GOOGLE
    public function handleGoogleCallback(Request $request)
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();

            $user = User::updateOrCreate([
                'email' => $googleUser->getEmail(),
            ], [
                'name'      => $googleUser->getName(),
                'google_id' => $googleUser->getId(),
                'password'  => Hash::make(rand(100000, 999999)),
                'role'      => 'user'
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            // Prioritas URL pengalihan kembali ke frontend:
            // 1. Parameter 'state' dari query (misalnya frontend berjalan di Vercel atau domain tertentu)
            // 2. Variabel environment FRONTEND_URL
            // 3. Fallback: domain backend saat ini (url('/')) atau http://127.0.0.1:5500 jika local
            $frontendUrl = null;
            if ($request->has('state')) {
                $decoded = base64_decode($request->get('state'), true);
                if ($decoded && filter_var($decoded, FILTER_VALIDATE_URL)) {
                    $frontendUrl = rtrim($decoded, '/');
                }
            }

            if (!$frontendUrl) {
                $frontendUrl = env('FRONTEND_URL');
            }

            if (!$frontendUrl) {
                $frontendUrl = app()->environment('local') ? 'http://127.0.0.1:5500' : url('/');
            }

            $frontendUrl = rtrim($frontendUrl, '/');
            return redirect("{$frontendUrl}/index.html?token={$token}&role={$user->role}&name=" . urlencode($user->name));
        } catch (\Exception $e) {
            return response()->json([
                'success' => false, 
                'message' => 'Gagal login via Google: ' . $e->getMessage()
            ], 500);
        }
    }
}