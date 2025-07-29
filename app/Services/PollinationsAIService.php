<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PollinationsAIService
{
    private const IMAGE_API_BASE = 'https://image.pollinations.ai';
    private const TEXT_API_BASE = 'https://text.pollinations.ai';

    /**
     * Gera uma imagem baseada no prompt fornecido
     */
    public function generateImage(string $prompt): ?string
    {
        try {
            $encodedPrompt = urlencode($prompt);
            $timestamp = time();
            $imageUrl = self::IMAGE_API_BASE . "/prompt/{$encodedPrompt}?model=flux&v={$timestamp}";
            
            // Verificar se a URL da imagem é válida
            $response = Http::timeout(30)->get($imageUrl);
            
            if ($response->successful()) {
                return $imageUrl;
            }
            
            Log::warning('Falha ao gerar imagem com Pollinations.AI', [
                'prompt' => $prompt,
                'status' => $response->status(),
                'response' => $response->body()
            ]);
            
            return null;
        } catch (\Exception $e) {
            Log::error('Erro ao gerar imagem com Pollinations.AI', [
                'prompt' => $prompt,
                'error' => $e->getMessage()
            ]);
            
            return null;
        }
    }

    /**
     * Gera texto usando a API da Pollinations.AI
     */
    public function generateText(string $prompt, string $model = 'gpt-3.5-turbo'): ?string
    {
        try {
            $response = Http::timeout(30)->post(self::TEXT_API_BASE . '/openai', [
                'model' => $model,
                'messages' => [
                    [
                        'role' => 'user',
                        'content' => $prompt
                    ]
                ],
                'max_tokens' => 500,
                'temperature' => 0.7
            ]);
            
            if ($response->successful()) {
                $data = $response->json();
                return $data['choices'][0]['message']['content'] ?? null;
            }
            
            Log::warning('Falha ao gerar texto com Pollinations.AI', [
                'prompt' => $prompt,
                'status' => $response->status(),
                'response' => $response->body()
            ]);
            
            return null;
        } catch (\Exception $e) {
            Log::error('Erro ao gerar texto com Pollinations.AI', [
                'prompt' => $prompt,
                'error' => $e->getMessage()
            ]);
            
            return null;
        }
    }

    /**
     * Lista os modelos disponíveis para geração de texto
     */
    public function getTextModels(): array
    {
        try {
            $response = Http::timeout(10)->get(self::TEXT_API_BASE . '/models');
            
            if ($response->successful()) {
                return $response->json();
            }
            
            return [];
        } catch (\Exception $e) {
            Log::error('Erro ao obter modelos de texto da Pollinations.AI', [
                'error' => $e->getMessage()
            ]);
            
            return [];
        }
    }

    /**
     * Lista os modelos disponíveis para geração de imagem
     */
    public function getImageModels(): array
    {
        try {
            $response = Http::timeout(10)->get(self::IMAGE_API_BASE . '/models');
            
            if ($response->successful()) {
                return $response->json();
            }
            
            return [];
        } catch (\Exception $e) {
            Log::error('Erro ao obter modelos de imagem da Pollinations.AI', [
                'error' => $e->getMessage()
            ]);
            
            return [];
        }
    }

    /**
     * Gera um prompt otimizado para imagem baseado nos parâmetros do post
     */
    public function generateImagePrompt(array $postData): string
    {
        $businessContext = $postData['business_description'] ?? 'negócio';
        $toneContext = $postData['tone'] ?? 'profissional';
        $postType = $postData['post_type'] ?? 'general';
        
        $prompts = [
            'promotional' => "professional marketing image for {$businessContext}, modern design, {$toneContext} tone, clean layout, social media post, high quality, vibrant colors, marketing content",
            'educational' => "educational infographic for {$businessContext}, informative design, {$toneContext} tone, professional layout, learning content, clear typography, educational material",
            'entertainment' => "fun and engaging social media image for {$businessContext}, creative design, {$toneContext} tone, eye-catching visuals, entertainment content, colorful design",
            'news' => "news announcement image for {$businessContext}, professional design, {$toneContext} tone, modern layout, breaking news style, current events",
            'general' => "professional social media image for {$businessContext}, {$toneContext} tone, modern design, clean layout, social media post"
        ];
        
        return $prompts[$postType] ?? $prompts['general'];
    }

    /**
     * Gera um prompt otimizado para texto baseado nos parâmetros do post
     */
    public function generateTextPrompt(array $postData): string
    {
        $businessContext = $postData['business_description'] ?? 'negócio';
        $toneContext = $postData['tone'] ?? 'profissional';
        $lengthContext = $postData['length'] ?? 'médio';
        $postType = $postData['post_type'] ?? 'general';
        $platform = $postData['platform'] ?? 'social media';
        
        $lengthInstructions = [
            'short' => 'Crie um post curto com 1-2 frases',
            'medium' => 'Crie um post médio com 3-4 frases',
            'long' => 'Crie um post longo com 5+ frases'
        ];
        
        $toneInstructions = [
            'professional' => 'Use um tom profissional e formal',
            'casual' => 'Use um tom casual e descontraído',
            'friendly' => 'Use um tom amigável e acolhedor',
            'humorous' => 'Use um tom humorístico e divertido'
        ];
        
        $typeInstructions = [
            'promotional' => 'Foque em promover produtos ou serviços',
            'educational' => 'Foque em educar e informar o público',
            'entertainment' => 'Foque em entreter e engajar o público',
            'news' => 'Foque em compartilhar notícias e atualizações'
        ];
        
        $prompt = "Você é um especialista em marketing digital. {$lengthInstructions[$lengthContext]}. {$toneInstructions[$toneContext]}. {$typeInstructions[$postType]}. ";
        $prompt .= "Crie um post para {$platform} sobre: {$businessContext}. ";
        $prompt .= "Inclua emojis relevantes e hashtags populares. Responda apenas com o texto do post.";
        
        return $prompt;
    }
} 