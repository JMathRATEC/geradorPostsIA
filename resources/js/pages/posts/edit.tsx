import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { ArrowLeft, Facebook, Instagram, Twitter } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/posts',
    },
    {
        title: 'Editar Post',
        href: '/posts/edit',
    },
];

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

export default function EditPost({ post }: { post: any }) {
    const { data, setData, put, processing, errors } = useForm({
        title: post.title || '',
        content: post.content || '',
        platform: post.platform || '',
        post_type: post.post_type || '',
        business_name: post.business_name || '',
        business_description: post.business_description || '',
        tone: post.tone || '',
        length: post.length || '',
        hashtags: post.hashtags || [],
        image_url: post.image_url || '',
        status: post.status || 'draft',
        scheduled_at: post.scheduled_at || '',
    });

    const handleUpdate = () => {
        put(route('posts.update', post.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Post - SocialAI" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" onClick={() => router.visit(route('posts.index'))}>
                            <ArrowLeft className="h-4 w-4" />
                            Voltar
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">Editar Post</h1>
                            <p className="text-gray-600 dark:text-gray-400">Atualize as informações do seu post</p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Formulário Principal */}
                    <div className="col-span-2 space-y-6">
                        {/* Informações Básicas */}
                        <Card className="p-6">
                            <h2 className="mb-4 text-lg font-semibold">Informações Básicas</h2>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="title">Título do Post</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Digite o título do post"
                                    />
                                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="content">Conteúdo</Label>
                                    <Textarea
                                        id="content"
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        placeholder="Digite o conteúdo do post"
                                        rows={6}
                                    />
                                    {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
                                </div>
                            </div>
                        </Card>

                        {/* Configurações */}
                        <Card className="p-6">
                            <h2 className="mb-4 text-lg font-semibold">Configurações</h2>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="platform">Plataforma</Label>
                                    <Select value={data.platform} onValueChange={(value) => setData('platform', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione a plataforma" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {platforms.map((platform) => (
                                                <SelectItem key={platform.id} value={platform.id}>
                                                    {platform.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.platform && <p className="mt-1 text-sm text-red-600">{errors.platform}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="status">Status</Label>
                                    <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">Rascunho</SelectItem>
                                            <SelectItem value="scheduled">Agendado</SelectItem>
                                            <SelectItem value="published">Publicado</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                                </div>
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
                        </Card>

                        {/* Botões de Ação */}
                        <div className="flex gap-4">
                            <Button className="flex-1 bg-purple-600 hover:bg-purple-700" onClick={handleUpdate} disabled={processing}>
                                {processing ? 'Salvando...' : 'Salvar Alterações'}
                            </Button>
                            <Button variant="outline" onClick={() => router.visit(route('posts.index'))} disabled={processing}>
                                Cancelar
                            </Button>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="space-y-6">
                        <Card className="p-6">
                            <h3 className="mb-4 font-semibold">Preview do Post</h3>
                            <div className="space-y-4">
                                <div>
                                    <Label className="text-sm font-medium">Título</Label>
                                    <div className="mt-2 rounded-lg border p-3 text-sm">{data.title || 'Título do post aparecerá aqui'}</div>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium">Conteúdo</Label>
                                    <div className="mt-2 rounded-lg border p-3 text-sm">{data.content || 'Conteúdo do post aparecerá aqui'}</div>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium">Plataforma</Label>
                                    <div className="mt-2 flex items-center gap-2">
                                        {data.platform && (
                                            <>
                                                {(() => {
                                                    const platform = platforms.find((p) => p.id === data.platform);
                                                    return platform?.icon ? <platform.icon className="h-4 w-4" /> : null;
                                                })()}
                                                <span className="text-sm capitalize">{data.platform}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium">Status</Label>
                                    <div className="mt-2">
                                        <span
                                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                                data.status === 'published'
                                                    ? 'bg-green-100 text-green-800'
                                                    : data.status === 'scheduled'
                                                      ? 'bg-blue-100 text-blue-800'
                                                      : 'bg-gray-100 text-gray-800'
                                            }`}
                                        >
                                            {data.status === 'published' ? 'Publicado' : data.status === 'scheduled' ? 'Agendado' : 'Rascunho'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
