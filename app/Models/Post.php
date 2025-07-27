<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'content',
        'platform',
        'status',
        'post_type',
        'business_name',
        'business_description',
        'tone',
        'length',
        'hashtags',
        'image_url',
        'scheduled_at',
        'published_at',
        'engagement_metrics',
        'ai_generated_content',
    ];

    protected $casts = [
        'hashtags' => 'array',
        'engagement_metrics' => 'array',
        'ai_generated_content' => 'array',
        'scheduled_at' => 'datetime',
        'published_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getFormattedStatusAttribute(): string
    {
        return match($this->status) {
            'published' => 'Publicado',
            'scheduled' => 'Agendado',
            'draft' => 'Rascunho',
            default => $this->status
        };
    }

    public function getFormattedPlatformAttribute(): string
    {
        return match($this->platform) {
            'instagram' => 'Instagram',
            'twitter' => 'Twitter',
            'facebook' => 'Facebook',
            default => $this->platform
        };
    }
}
