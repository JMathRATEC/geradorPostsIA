<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Services\PollinationsAIService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'content' => $post->content,
                    'platform' => $post->platform,
                    'status' => $post->status,
                    'published_at' => $post->published_at?->toISOString(),
                    'image_url' => $post->image_url,
                    'engagement' => $post->engagement_metrics ?? [
                        'likes' => 0,
                        'comments' => 0,
                        'shares' => 0
                    ],
                    'formatted_status' => $post->formatted_status,
                    'formatted_platform' => $post->formatted_platform,
                ];
            });

        return Inertia::render('posts', [
            'posts' => $posts
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'platform' => 'required|in:instagram,twitter,facebook',
            'post_type' => 'required|in:promotional,educational,entertainment,news',
            'business_name' => 'nullable|string|max:255',
            'business_description' => 'nullable|string',
            'tone' => 'nullable|in:professional,casual,friendly,humorous',
            'length' => 'nullable|in:short,medium,long',
            'hashtags' => 'nullable|array',
            'image_url' => 'nullable|url',
            'scheduled_at' => 'nullable|date',
            'ai_generated_content' => 'nullable|array',
        ]);

        $validated['user_id'] = Auth::id();
        $validated['status'] = $request->input('status', 'draft');

        $aiService = new PollinationsAIService();
        $postData = $request->all();

        // Gerar conteúdo com IA se não foi fornecido
        $aiGeneratedContent = [
            'caption' => $validated['content'],
            'hashtags' => $validated['hashtags'] ?? ['#marketing', '#socialmedia', '#digital'],
            'best_time' => '19:30',
            'suggestions' => [
                'Adicione uma imagem relacionada ao tema',
                'Mencione uma estatística relevante',
                'Faça uma pergunta para engajar o público'
            ]
        ];

        // Gerar imagem com IA se solicitado
        $imageUrl = $request->image_url;
        Log::info('URL da imagem recebida:', ['image_url' => $imageUrl]);
        
        if ($request->has('generate_image') && $request->generate_image) {
            $imagePrompt = $aiService->generateImagePrompt($postData);
            $generatedImageUrl = $aiService->generateImage($imagePrompt);
            if ($generatedImageUrl) {
                $imageUrl = $generatedImageUrl;
                $validated['image_url'] = $generatedImageUrl;
                Log::info('Imagem gerada pela IA:', ['generated_url' => $generatedImageUrl]);
            }
        }
        
        Log::info('URL final da imagem:', ['final_image_url' => $imageUrl]);
        $validated['image_url'] = $imageUrl;

        // Gerar texto com IA se solicitado
        if ($request->has('generate_text') && $request->generate_text) {
            $textPrompt = $aiService->generateTextPrompt($postData);
            $generatedText = $aiService->generateText($textPrompt);
            if ($generatedText) {
                $aiGeneratedContent['caption'] = $generatedText;
                $validated['content'] = $generatedText;
                
                // Extrair hashtags do texto gerado
                preg_match_all('/#\w+/', $generatedText, $matches);
                if (!empty($matches[0])) {
                    $validated['hashtags'] = $matches[0];
                    $aiGeneratedContent['hashtags'] = $matches[0];
                }
            }
        }

        $validated['ai_generated_content'] = $aiGeneratedContent;

        // Simular métricas de engajamento
        $validated['engagement_metrics'] = [
            'likes' => rand(50, 500),
            'comments' => rand(5, 50),
            'shares' => rand(2, 25)
        ];

        $post = Post::create($validated);

        return redirect()->route('posts.index')->with('success', 'Post criado com sucesso!');
    }

    public function show(Post $post)
    {
        return Inertia::render('post-show', [
            'post' => $post
        ]);
    }

    public function edit(Post $post)
    {
        return Inertia::render('posts/edit', [
            'post' => $post
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'platform' => 'required|in:instagram,twitter,facebook',
            'status' => 'required|in:draft,scheduled,published',
            'scheduled_at' => 'nullable|date',
        ]);

        $post->update($validated);

        return redirect()->route('posts.index')->with('success', 'Post atualizado com sucesso!');
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return redirect()->route('posts.index')->with('success', 'Post excluído com sucesso!');
    }

    public function duplicate(Post $post)
    {
        $newPost = $post->replicate();
        $newPost->title = $post->title . ' (Cópia)';
        $newPost->status = 'draft';
        $newPost->published_at = null;
        $newPost->scheduled_at = null;
        $newPost->engagement_metrics = null;
        $newPost->save();

        return redirect()->route('posts.index')->with('success', 'Post duplicado com sucesso!');
    }
}
