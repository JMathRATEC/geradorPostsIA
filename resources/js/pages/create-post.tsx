import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Modal } from '@/components/ui/modal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { ArrowLeft, Clock, Facebook, Image as ImageIcon, Instagram, RefreshCw, Send, Sparkles, TrendingUp, Twitter } from 'lucide-react';
import { useState } from 'react';
import { Textarea } from '../components/ui/textarea';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Criar Post',
        href: '/create-post',
    },
];

export default function CreatePost() {
    const [selectedPlatform, setSelectedPlatform] = useState<string>('');
    const [postType, setPostType] = useState<string>('');
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [isGeneratingImage, setIsGeneratingImage] = useState<boolean>(false);
    const [isGeneratingText, setIsGeneratingText] = useState<boolean>(false);
    const [generatedContent, setGeneratedContent] = useState<any>(null);
    const [generateImage, setGenerateImage] = useState<boolean>(false);
    const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('');
    const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        platform: '',
        post_type: '',
        business_name: '',
        business_description: '',
        tone: '',
        length: '',
        hashtags: [] as string[],
        image_url: '',
        status: 'draft',
        generate_image: false as boolean,
        generate_text: false as boolean,
    });

    const platforms = [
        { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
        { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'bg-gradient-to-r from-blue-400 to-blue-600' },
        { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'bg-gradient-to-r from-blue-600 to-blue-800' },
    ];

    const postTypes = [
        { id: 'promotional', name: 'Promocional', description: 'Anúncios e ofertas' },
        { id: 'educational', name: 'Educativo', description: 'Dicas e tutoriais' },
        { id: 'entertainment', name: 'Entretenimento', description: 'Conteúdo divertido' },
        { id: 'news', name: 'Notícias', description: 'Atualizações e novidades' },
    ];

    const generateImagePrompt = (isRegenerate = false) => {
        const businessContext = data.business_description || 'negócio';
        const toneContext = data.tone || 'profissional';
        const lengthContext = data.length || 'médio';

        // Variações para regeneração (mais concisas)
        const variations = [
            ', different style, unique perspective',
            ', new composition, fresh approach',
            ', alternative colors, different mood',
            ', modern twist, updated style',
            ', artistic variation, creative take',
        ];

        const variation = isRegenerate ? variations[Math.floor(Math.random() * variations.length)] : '';

        let prompt = '';

        switch (postType) {
            case 'promotional':
                prompt = `marketing image for ${businessContext}, modern design, ${toneContext} tone, social media, vibrant colors${variation}`;
                break;
            case 'educational':
                prompt = `educational infographic for ${businessContext}, ${toneContext} tone, learning content, clear design${variation}`;
                break;
            case 'entertainment':
                prompt = `fun social media image for ${businessContext}, creative design, ${toneContext} tone, entertainment${variation}`;
                break;
            case 'news':
                prompt = `news image for ${businessContext}, ${toneContext} tone, modern layout, breaking news${variation}`;
                break;
            default:
                prompt = `social media image for ${businessContext}, ${toneContext} tone, modern design${variation}`;
        }

        return prompt;
    };

    const generateTextPrompt = () => {
        const businessContext = data.business_description || 'negócio';
        const toneContext = data.tone || 'profissional';
        const lengthContext = data.length || 'médio';
        const platformContext = selectedPlatform || 'social media';

        const lengthInstructions = {
            short: 'Crie um post curto com 1-2 frases',
            medium: 'Crie um post médio com 3-4 frases',
            long: 'Crie um post longo com 5+ frases',
        };

        const toneInstructions = {
            professional: 'Use um tom profissional e formal',
            casual: 'Use um tom casual e descontraído',
            friendly: 'Use um tom amigável e acolhedor',
            humorous: 'Use um tom humorístico e divertido',
        };

        const typeInstructions = {
            promotional: 'Foque em promover produtos ou serviços',
            educational: 'Foque em educar e informar o público',
            entertainment: 'Foque em entreter e engajar o público',
            news: 'Foque em compartilhar notícias e atualizações',
        };

        let prompt = `Você é um especialista em marketing digital. ${lengthInstructions[lengthContext as keyof typeof lengthInstructions]}. ${toneInstructions[toneContext as keyof typeof toneInstructions]}. ${typeInstructions[postType as keyof typeof typeInstructions]}. `;
        prompt += `Crie um post para ${platformContext} sobre: ${businessContext}. `;
        prompt += `Inclua emojis relevantes e hashtags populares. Responda apenas com o texto do post.`;

        return prompt;
    };

    const generateImageWithAI = async (isRegenerate = false) => {
        console.log('Gerando imagem com IA:', { generateImage, isRegenerate });
        if (!generateImage) {
            console.log('Geração de imagem desabilitada');
            return null;
        }

        setIsGeneratingImage(true);
        try {
            const prompt = generateImagePrompt(isRegenerate);
            console.log('Prompt gerado:', prompt);

            const encodedPrompt = encodeURIComponent(prompt);
            const timestamp = Date.now();
            const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?v=${timestamp}`;

            console.log('URL da imagem:', imageUrl);

            // Testar se a imagem é válida
            const response = await fetch(imageUrl);
            console.log('Resposta da API de imagem:', response.status);

            if (response.ok) {
                console.log('Imagem gerada com sucesso:', imageUrl);
                setGeneratedImageUrl(imageUrl);
                setData('image_url', imageUrl);
                return imageUrl;
            } else {
                console.log('Falha ao gerar imagem:', response.status);
            }
        } catch (error) {
            console.error('Erro ao gerar imagem:', error);
        } finally {
            setIsGeneratingImage(false);
        }
        return null;
    };

    const generateTextWithAI = async () => {
        setIsGeneratingText(true);
        try {
            const prompt = generateTextPrompt();
            console.log('Prompt para IA:', prompt);

            // Tentar usar a API da Pollinations.AI
            const response = await fetch('https://text.pollinations.ai/openai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'user',
                            content: prompt,
                        },
                    ],
                    max_tokens: 500,
                    temperature: 0.7,
                }),
            });

            console.log('Status da resposta:', response.status);

            if (response.ok) {
                const data = await response.json();
                console.log('Resposta da API:', data);
                const generatedText = data.choices?.[0]?.message?.content;
                if (generatedText) {
                    console.log('Texto gerado pela IA:', generatedText);
                    return generatedText;
                }
            }

            console.log('API falhou, usando fallback');
            // Fallback se a API falhar
            return generateFallbackText();
        } catch (error) {
            console.error('Erro ao gerar texto:', error);
            console.log('Usando fallback devido ao erro');
            return generateFallbackText();
        } finally {
            setIsGeneratingText(false);
        }
    };

    const generateFallbackText = () => {
        const businessContext = data.business_description || 'nosso negócio';
        const toneContext = data.tone || 'profissional';
        const platformContext = selectedPlatform || 'social media';

        // Gerar texto mais contextual baseado nos parâmetros
        const toneEmojis = {
            professional: '💼',
            casual: '😊',
            friendly: '🤝',
            humorous: '😄',
        };

        const platformEmojis = {
            instagram: '📸',
            twitter: '🐦',
            facebook: '📘',
        };

        const emoji = toneEmojis[toneContext as keyof typeof toneEmojis] || '💡';
        const platformEmoji = platformEmojis[platformContext as keyof typeof platformEmojis] || '📱';

        const fallbackTexts = {
            promotional: `${emoji} Descubra como ${businessContext} pode transformar sua experiência! ${platformEmoji} Conectamos você com soluções inovadoras que fazem a diferença. #${businessContext.replace(/\s+/g, '')} #Inovação #Sucesso #Transformação`,
            educational: `${emoji} Aprenda com ${businessContext}! ${platformEmoji} Compartilhamos conhecimento valioso para seu crescimento. Conhecimento é o primeiro passo para o sucesso! #${businessContext.replace(/\s+/g, '')} #Educação #Aprendizado #Crescimento`,
            entertainment: `${emoji} Momentos especiais com ${businessContext}! ${platformEmoji} Acreditamos que diversão e sucesso andam juntos. Qual foi seu momento mais divertido hoje? #${businessContext.replace(/\s+/g, '')} #Diversão #Momentos #Alegria`,
            news: `${emoji} Novidades importantes sobre ${businessContext}! ${platformEmoji} Fique por dentro das últimas atualizações. O futuro está cheio de possibilidades! #${businessContext.replace(/\s+/g, '')} #Novidades #Atualizações #Futuro`,
        };

        return fallbackTexts[postType as keyof typeof fallbackTexts] || fallbackTexts.promotional;
    };

    const handleGenerateContent = async () => {
        setIsGenerating(true);

        // Atualizar dados do formulário
        setData({
            ...data,
            platform: selectedPlatform,
            post_type: postType,
            title: `Post ${postType} para ${selectedPlatform}`,
        });

        // Gerar texto com IA
        const generatedText = await generateTextWithAI();

        // Gerar imagem se a opção estiver marcada
        console.log('Verificando se deve gerar imagem:', {
            generateImage,
            selectedPlatform,
            postType,
            businessDescription: data.business_description,
        });
        if (generateImage) {
            console.log('Iniciando geração de imagem...');
            await generateImageWithAI(false);
        } else {
            console.log('Geração de imagem não solicitada');
        }

        // Extrair hashtags do texto gerado
        const hashtagRegex = /#\w+/g;
        const hashtags = generatedText.match(hashtagRegex) || ['#marketing', '#socialmedia', '#digital'];

        setGeneratedContent({
            caption: generatedText,
            hashtags: hashtags,
            bestTime: '19:30',
            suggestions: [
                'Adicione uma imagem relacionada ao tema',
                'Mencione uma estatística relevante',
                'Faça uma pergunta para engajar o público',
            ],
        });

        // Atualizar formulário com conteúdo gerado
        setData({
            ...data,
            platform: selectedPlatform,
            post_type: postType,
            title: `Post ${postType} para ${selectedPlatform}`,
            content: generatedText,
            hashtags: hashtags,
        });

        setIsGenerating(false);
    };

    const handleRegenerateImage = async () => {
        await generateImageWithAI(true);
    };

    const handleSavePost = () => {
        console.log('Estado atual:', {
            generateImage,
            generatedImageUrl,
            data: data,
        });

        // Atualizar o formulário com os dados corretos
        setData('generate_image', generateImage);
        setData('generate_text', true);
        setData('image_url', generateImage && generatedImageUrl ? generatedImageUrl : data.image_url);

        console.log('Dados que serão enviados:', {
            generate_image: generateImage,
            generate_text: true,
            image_url: generateImage && generatedImageUrl ? generatedImageUrl : data.image_url,
        });

        post(route('posts.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Criar Post - SocialAI" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" onClick={() => router.visit(route('dashboard'))}>
                            <ArrowLeft className="h-4 w-4" />
                            Voltar
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">Criar Novo Post</h1>
                            <p className="text-gray-600 dark:text-gray-400">Use IA para gerar conteúdo incrível</p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Formulário Principal */}
                    <div className="col-span-2 space-y-6">
                        {/* Seleção de Plataforma */}
                        <Card className="p-6">
                            <h2 className="mb-4 text-lg font-semibold">Escolha a Rede Social</h2>
                            <div className="grid gap-4 md:grid-cols-3">
                                {platforms.map((platform) => (
                                    <Button
                                        key={platform.id}
                                        variant={selectedPlatform === platform.id ? 'default' : 'outline'}
                                        className={`h-auto flex-col gap-2 p-4 ${selectedPlatform === platform.id ? platform.color : ''}`}
                                        onClick={() => setSelectedPlatform(platform.id)}
                                    >
                                        <platform.icon className="h-6 w-6" />
                                        <span>{platform.name}</span>
                                    </Button>
                                ))}
                            </div>
                        </Card>

                        {/* Tipo de Post */}
                        <Card className="p-6">
                            <h2 className="mb-4 text-lg font-semibold">Tipo de Conteúdo</h2>
                            <div className="grid gap-4 md:grid-cols-2">
                                {postTypes.map((type) => (
                                    <Button
                                        key={type.id}
                                        variant={postType === type.id ? 'default' : 'outline'}
                                        className="h-auto flex-col items-start gap-2 p-4"
                                        onClick={() => setPostType(type.id)}
                                    >
                                        <span className="font-medium">{type.name}</span>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">{type.description}</span>
                                    </Button>
                                ))}
                            </div>
                        </Card>

                        {/* Descrição do Negócio */}
                        <Card className="p-6">
                            <h2 className="mb-4 text-lg font-semibold">Sobre seu Negócio</h2>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="business">Nome do Negócio</Label>
                                    <Input
                                        id="business"
                                        placeholder="Ex: Tech Solutions"
                                        value={data.business_name}
                                        onChange={(e) => setData('business_name', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="description">Descrição do que você faz</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Descreva brevemente seu negócio, produtos ou serviços..."
                                        value={data.business_description}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('business_description', e.target.value)}
                                        rows={4}
                                    />
                                </div>
                            </div>
                        </Card>

                        {/* Configurações Avançadas */}
                        <Card className="p-6">
                            <h2 className="mb-4 text-lg font-semibold">Configurações Avançadas</h2>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="tone">Tom da Mensagem</Label>
                                    <Select value={data.tone} onValueChange={(value) => setData('tone', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o tom" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="professional">Profissional</SelectItem>
                                            <SelectItem value="casual">Casual</SelectItem>
                                            <SelectItem value="friendly">Amigável</SelectItem>
                                            <SelectItem value="humorous">Humorístico</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="length">Tamanho do Post</Label>
                                    <Select value={data.length} onValueChange={(value) => setData('length', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o tamanho" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="short">Curto (1-2 frases)</SelectItem>
                                            <SelectItem value="medium">Médio (3-4 frases)</SelectItem>
                                            <SelectItem value="long">Longo (5+ frases)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center space-x-2">
                                <Checkbox
                                    id="include-image"
                                    checked={generateImage}
                                    onCheckedChange={(checked) => {
                                        console.log('Checkbox alterado:', checked);
                                        setGenerateImage(checked as boolean);
                                    }}
                                />
                                <Label htmlFor="include-image">Gerar sugestão de imagem com IA</Label>
                            </div>
                            {generateImage && (
                                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    A IA irá gerar uma imagem baseada no tipo de conteúdo, descrição do negócio, tom e tamanho do post.
                                </div>
                            )}
                        </Card>

                        {/* Validação */}
                        {(!selectedPlatform || !postType || !data.business_description) && (
                            <div className="rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
                                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Complete os campos obrigatórios:</h3>
                                <ul className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                                    {!selectedPlatform && <li>• Selecione uma rede social</li>}
                                    {!postType && <li>• Escolha o tipo de conteúdo</li>}
                                    {!data.business_description && <li>• Descreva seu negócio</li>}
                                </ul>
                            </div>
                        )}

                        {/* Botão Gerar */}
                        <Button
                            className="h-12 w-full bg-purple-600 text-lg hover:bg-purple-700"
                            onClick={handleGenerateContent}
                            disabled={!selectedPlatform || !postType || !data.business_description || isGenerating}
                        >
                            {isGenerating ? (
                                <>
                                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                    {isGeneratingText ? 'Gerando Texto com IA...' : 'Gerando Conteúdo...'}
                                </>
                            ) : (
                                <>
                                    <Sparkles className="mr-2 h-5 w-5" />
                                    Gerar Post com IA
                                </>
                            )}
                        </Button>
                    </div>

                    {/* Preview e Resultados */}
                    <div className="space-y-6">
                        {/* Imagem Gerada */}
                        {generateImage && (generatedImageUrl || isGeneratingImage) && (
                            <Card className="p-6">
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <ImageIcon className="h-5 w-5 text-purple-600" />
                                        <h3 className="font-semibold">Imagem Gerada</h3>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleRegenerateImage}
                                        disabled={isGeneratingImage}
                                        className="h-8 w-8 p-0"
                                        title="Gerar nova imagem"
                                    >
                                        <RefreshCw className={`h-4 w-4 ${isGeneratingImage ? 'animate-spin' : ''}`} />
                                    </Button>
                                </div>
                                {isGeneratingImage ? (
                                    <div className="flex h-48 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                                        <div className="text-center">
                                            <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-2 border-purple-600 border-t-transparent"></div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Gerando nova imagem...</p>
                                        </div>
                                    </div>
                                ) : generatedImageUrl ? (
                                    <div className="space-y-3">
                                        <div className="group relative cursor-pointer" onClick={() => setIsImageModalOpen(true)}>
                                            <img
                                                src={generatedImageUrl}
                                                alt="Imagem gerada pela IA"
                                                className="h-48 w-full rounded-lg object-cover transition-transform group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/0 transition-colors group-hover:bg-black/20">
                                                <div className="text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                                                    Clique para ampliar
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            Imagem gerada automaticamente pela IA baseada no seu conteúdo
                                        </p>
                                    </div>
                                ) : null}
                            </Card>
                        )}

                        {/* Melhor Horário */}
                        <Card className="p-6">
                            <div className="mb-4 flex items-center gap-2">
                                <Clock className="h-5 w-5 text-purple-600" />
                                <h3 className="font-semibold">Melhor Horário</h3>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">19:30</div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Horário de maior engajamento</p>
                            </div>
                        </Card>

                        {/* Estatísticas */}
                        <Card className="p-6">
                            <div className="mb-4 flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-green-600" />
                                <h3 className="font-semibold">Expectativa</h3>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-sm">Alcance estimado</span>
                                    <span className="font-medium">2.5k - 5k</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm">Engajamento</span>
                                    <span className="font-medium">8-12%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm">Clicks</span>
                                    <span className="font-medium">150-300</span>
                                </div>
                            </div>
                        </Card>

                        {/* Conteúdo Gerado */}
                        {generatedContent && (
                            <Card className="p-6">
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="font-semibold">Conteúdo Gerado</h3>
                                    <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                                        <Sparkles className="h-3 w-3" />
                                        <span>Gerado por IA</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <Label className="text-sm font-medium">Legenda</Label>
                                        <div className="mt-2 rounded-lg border p-3 text-sm">{generatedContent.caption}</div>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium">Hashtags Sugeridas</Label>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {generatedContent.hashtags.map((tag: string, index: number) => (
                                                <span
                                                    key={index}
                                                    className="rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-600 dark:bg-purple-900 dark:text-purple-400"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            className="flex-1"
                                            variant="outline"
                                            onClick={() => {
                                                setData('status', 'scheduled');
                                                handleSavePost();
                                            }}
                                            disabled={processing}
                                        >
                                            <Send className="mr-2 h-4 w-4" />
                                            Agendar
                                        </Button>
                                        <Button
                                            className="flex-1"
                                            onClick={() => {
                                                setData('status', 'published');
                                                handleSavePost();
                                            }}
                                            disabled={processing}
                                        >
                                            <ImageIcon className="mr-2 h-4 w-4" />
                                            Publicar
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        )}
                    </div>
                </div>

                {/* Modal da Imagem */}
                <Modal isOpen={isImageModalOpen} onClose={() => setIsImageModalOpen(false)} title="Imagem Gerada pela IA">
                    <div className="flex justify-center">
                        <img src={generatedImageUrl} alt="Imagem gerada pela IA" className="max-h-[70vh] max-w-full rounded-lg object-contain" />
                    </div>
                </Modal>
            </div>
        </AppLayout>
    );
}
