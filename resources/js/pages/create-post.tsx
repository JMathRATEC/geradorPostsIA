import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { ArrowLeft, Instagram, Twitter, Facebook, Sparkles, Hash, Calendar, Image as ImageIcon, Send, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

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
    const [description, setDescription] = useState<string>('');
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [generatedContent, setGeneratedContent] = useState<any>(null);

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

    const handleGenerateContent = async () => {
        setIsGenerating(true);
        // Simular geração de conteúdo com IA
        setTimeout(() => {
            setGeneratedContent({
                caption: '🚀 Transforme sua presença digital com nossas soluções inovadoras! 💡 Descubra como a tecnologia pode revolucionar seu negócio e conectar você com seu público de forma autêntica e impactante. #Inovação #Tecnologia #TransformaçãoDigital #Sucesso #Futuro',
                hashtags: ['#Inovação', '#Tecnologia', '#TransformaçãoDigital', '#Sucesso', '#Futuro', '#MarketingDigital'],
                bestTime: '19:30',
                suggestions: [
                    'Adicione uma imagem relacionada ao tema',
                    'Mencione uma estatística relevante',
                    'Faça uma pergunta para engajar o público'
                ]
            });
            setIsGenerating(false);
        }, 2000);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Criar Post - SocialAI" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" onClick={() => router.visit('/dashboard')}>
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
                                        variant={selectedPlatform === platform.id ? "default" : "outline"}
                                        className={`h-auto p-4 flex-col gap-2 ${selectedPlatform === platform.id ? platform.color : ''}`}
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
                                        variant={postType === type.id ? "default" : "outline"}
                                        className="h-auto p-4 flex-col items-start gap-2"
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
                                    <Input id="business" placeholder="Ex: Tech Solutions" />
                                </div>
                                <div>
                                    <Label htmlFor="description">Descrição do que você faz</Label>
                                    <Textarea 
                                        id="description"
                                        placeholder="Descreva brevemente seu negócio, produtos ou serviços..."
                                        value={description}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
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
                                    <Select>
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
                                    <Select>
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
                                <Checkbox id="include-image" />
                                <Label htmlFor="include-image">Gerar sugestão de imagem com IA</Label>
                            </div>
                        </Card>

                        {/* Botão Gerar */}
                        <Button 
                            className="w-full bg-purple-600 hover:bg-purple-700 h-12 text-lg"
                            onClick={handleGenerateContent}
                            disabled={!selectedPlatform || !postType || !description || isGenerating}
                        >
                            {isGenerating ? (
                                <>
                                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                    Gerando Conteúdo...
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
                        {/* Melhor Horário */}
                        <Card className="p-6">
                            <div className="flex items-center gap-2 mb-4">
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
                            <div className="flex items-center gap-2 mb-4">
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
                                <h3 className="mb-4 font-semibold">Conteúdo Gerado</h3>
                                <div className="space-y-4">
                                    <div>
                                        <Label className="text-sm font-medium">Legenda</Label>
                                        <div className="mt-2 rounded-lg border p-3 text-sm">
                                            {generatedContent.caption}
                                        </div>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium">Hashtags Sugeridas</Label>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {generatedContent.hashtags.map((tag: string, index: number) => (
                                                <span key={index} className="rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-600 dark:bg-purple-900 dark:text-purple-400">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button className="flex-1" variant="outline">
                                            <Send className="mr-2 h-4 w-4" />
                                            Agendar
                                        </Button>
                                        <Button className="flex-1">
                                            <ImageIcon className="mr-2 h-4 w-4" />
                                            Publicar
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 