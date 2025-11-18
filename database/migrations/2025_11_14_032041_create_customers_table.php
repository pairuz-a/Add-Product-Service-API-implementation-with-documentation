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
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('company');
            $table->string('phone', 20);
            $table->string('email')->unique();
            $table->string('country');
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->boolean('is_member')->default(false);
            $table->string('avatar')->nullable();
            $table->timestamp('last_active_at')->nullable();
            $table->timestamps();
            $table->softDeletes(); // For soft delete functionality
            
            // Indexes for better performance
            $table->index('status');
            $table->index('is_member');
            $table->index('last_active_at');
            $table->index('email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};