import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, Search, Filter, Calendar, Heart, MessageCircle, Share2, MoreHorizontal, Instagram, Twitter, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/posts',
    },
];

// Dados mockados para demonstração
const mockPosts = [
    {
        id: 1,
        title: 'Como a IA está revolucionando o marketing digital',
        content: 'Descubra como as tecnologias de inteligência artificial estão transformando a forma como fazemos marketing digital...',
        platform: 'instagram',
        status: 'published',
        publishedAt: '2024-01-15T10:30:00Z',
        engagement: {
            likes: 245,
            comments: 18,
            shares: 12
        },
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop'
    },
    {
        id: 2,
        title: '5 dicas para aumentar o engajamento nas redes sociais',
        content: 'Aprenda estratégias comprovadas para aumentar significativamente o engajamento da sua audiência...',
        platform: 'twitter',
        status: 'scheduled',
        publishedAt: '2024-01-16T14:00:00Z',
        engagement: {
            likes: 89,
            comments: 7,
            shares: 3
        },
        image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=300&fit=crop'
    },
    {
        id: 3,
        title: 'O futuro do conteúdo digital em 2024',
        content: 'Explore as tendências que estão moldando o futuro do conteúdo digital e como se preparar...',
        platform: 'facebook',
        status: 'draft',
        publishedAt: null,
        engagement: {
            likes: 0,
            comments: 0,
            shares: 0
        },
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop'
    },
    {
        id: 4,
        title: 'Guia completo: Marketing de influência',
        content: 'Tudo que você precisa saber sobre marketing de influência e como implementar em sua estratégia...',
        platform: 'instagram',
        status: 'published',
        publishedAt: '2024-01-14T09:15:00Z',
        engagement: {
            likes: 567,
            comments: 45,
            shares: 23
        },
        image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'
    }
];

const platformIcons = {
    instagram: Instagram,
    twitter: Twitter,
    facebook: Facebook
};

const statusColors = {
    published: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    scheduled: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    draft: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
};

const statusLabels = {
    published: 'Publicado',
    scheduled: 'Agendado',
    draft: 'Rascunho'
};

export default function Posts() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [platformFilter, setPlatformFilter] = useState('all');

    const filteredPosts = mockPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             post.content.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
        const matchesPlatform = platformFilter === 'all' || post.platform === platformFilter;
        
        return matchesSearch && matchesStatus && matchesPlatform;
    });

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Não publicado';
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getPlatformIcon = (platform: string) => {
        const IconComponent = platformIcons[platform as keyof typeof platformIcons];
        return IconComponent ? <IconComponent className="h-4 w-4" /> : null;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts - SocialAI" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Posts</h1>
                        <p className="text-gray-600 dark:text-gray-400">Gerencie todos os seus posts</p>
                    </div>
                    <Button 
                        className="bg-purple-600 hover:bg-purple-700"
                        onClick={() => router.visit('/create-post')}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Novo Post
                    </Button>
                </div>

                {/* Filtros */}
                <Card className="p-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <Input
                                    placeholder="Buscar posts..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos</SelectItem>
                                    <SelectItem value="published">Publicados</SelectItem>
                                    <SelectItem value="scheduled">Agendados</SelectItem>
                                    <SelectItem value="draft">Rascunhos</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={platformFilter} onValueChange={setPlatformFilter}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Plataforma" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todas</SelectItem>
                                    <SelectItem value="instagram">Instagram</SelectItem>
                                    <SelectItem value="twitter">Twitter</SelectItem>
                                    <SelectItem value="facebook">Facebook</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </Card>

                {/* Lista de Posts */}
                <div className="grid gap-4">
                    {filteredPosts.map((post) => (
                        <Card key={post.id} className="p-6">
                            <div className="flex items-start gap-4">
                                {/* Imagem */}
                                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                                    <img 
                                        src={post.image} 
                                        alt={post.title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                {/* Conteúdo */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-lg truncate">{post.title}</h3>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">
                                                {post.content}
                                            </p>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>Editar</DropdownMenuItem>
                                                <DropdownMenuItem>Duplicar</DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600">Excluir</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    {/* Metadados */}
                                    <div className="flex items-center gap-4 mt-3">
                                        <div className="flex items-center gap-2">
                                            {getPlatformIcon(post.platform)}
                                            <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                                                {post.platform}
                                            </span>
                                        </div>
                                        <Badge className={statusColors[post.status as keyof typeof statusColors]}>
                                            {statusLabels[post.status as keyof typeof statusLabels]}
                                        </Badge>
                                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                            <Calendar className="h-4 w-4" />
                                            {formatDate(post.publishedAt)}
                                        </div>
                                    </div>

                                    {/* Engajamento */}
                                    {post.status === 'published' && (
                                        <div className="flex items-center gap-4 mt-3">
                                            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                                <Heart className="h-4 w-4" />
                                                {post.engagement.likes}
                                            </div>
                                            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                                <MessageCircle className="h-4 w-4" />
                                                {post.engagement.comments}
                                            </div>
                                            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                                <Share2 className="h-4 w-4" />
                                                {post.engagement.shares}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Estado vazio */}
                {filteredPosts.length === 0 && (
                    <Card className="p-12 text-center">
                        <div className="mx-auto max-w-md">
                            <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                                <Search className="h-6 w-6 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Nenhum post encontrado</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Tente ajustar os filtros ou criar um novo post.
                            </p>
                            <Button 
                                onClick={() => router.visit('/create-post')}
                                className="bg-purple-600 hover:bg-purple-700"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Criar Primeiro Post
                            </Button>
                        </div>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
} 