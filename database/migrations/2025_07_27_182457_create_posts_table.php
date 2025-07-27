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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('content');
            $table->enum('platform', ['instagram', 'twitter', 'facebook']);
            $table->enum('status', ['draft', 'scheduled', 'published'])->default('draft');
            $table->enum('post_type', ['promotional', 'educational', 'entertainment', 'news']);
            $table->string('business_name')->nullable();
            $table->text('business_description')->nullable();
            $table->enum('tone', ['professional', 'casual', 'friendly', 'humorous'])->nullable();
            $table->enum('length', ['short', 'medium', 'long'])->nullable();
            $table->json('hashtags')->nullable();
            $table->string('image_url')->nullable();
            $table->timestamp('scheduled_at')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->json('engagement_metrics')->nullable();
            $table->json('ai_generated_content')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
