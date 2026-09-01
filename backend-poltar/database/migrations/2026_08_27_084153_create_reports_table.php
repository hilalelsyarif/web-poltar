<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('reports', function (Blueprint $table) {
        $table->id();
        $table->string('ticket_code')->unique();
        $table->string('reporter_name')->nullable();
        $table->string('class_name');
        $table->text('description');
        $table->string('evidence_img')->nullable();
        $table->enum('status', ['Pending', 'Process', 'Done'])->default('Pending');
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
