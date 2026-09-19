<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;

class AdminChangePasswordTest extends TestCase
{
    use RefreshDatabase;

    public function test_unauthenticated_user_cannot_change_password(): void
    {
        $response = $this->postJson('/api/admin/change-password', [
            'current_password' => 'oldpass123',
            'new_password' => 'newpass123',
            'new_password_confirmation' => 'newpass123',
        ]);

        $response->assertStatus(401);
    }

    public function test_admin_fails_with_wrong_current_password(): void
    {
        $user = User::factory()->create([
            'password' => Hash::make('correct-old-password'),
            'role' => 'admin',
        ]);

        Sanctum::actingAs($user);

        $response = $this->postJson('/api/admin/change-password', [
            'current_password' => 'wrong-old-password',
            'new_password' => 'supersecret123',
            'new_password_confirmation' => 'supersecret123',
        ]);

        $response->assertStatus(422);
        $response->assertJson([
            'success' => false,
            'message' => 'Password saat ini yang Anda masukkan salah!'
        ]);
    }

    public function test_admin_fails_when_confirmation_does_not_match(): void
    {
        $user = User::factory()->create([
            'password' => Hash::make('correct-old-password'),
            'role' => 'admin',
        ]);

        Sanctum::actingAs($user);

        $response = $this->postJson('/api/admin/change-password', [
            'current_password' => 'correct-old-password',
            'new_password' => 'supersecret123',
            'new_password_confirmation' => 'mismatched123',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['new_password']);
    }

    public function test_admin_successfully_changes_password(): void
    {
        $user = User::factory()->create([
            'password' => Hash::make('oldpassword123'),
            'role' => 'admin',
        ]);

        Sanctum::actingAs($user);

        $response = $this->postJson('/api/admin/change-password', [
            'current_password' => 'oldpassword123',
            'new_password' => 'newpassword456',
            'new_password_confirmation' => 'newpassword456',
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'success' => true,
            'message' => 'Password administrator berhasil diperbarui!'
        ]);

        // Refresh user and verify password was updated and hashed
        $user->refresh();
        $this->assertTrue(Hash::check('newpassword456', $user->password));
        $this->assertFalse(Hash::check('oldpassword123', $user->password));
    }
}
