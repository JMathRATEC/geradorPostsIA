import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { Calendar, Facebook, Heart, Instagram, MessageCircle, MoreHorizontal, Plus, Search, Share2, Twitter } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/posts',
    },
];

const platformIcons = {
    instagram: Instagram,
    twitter: Twitter,
    facebook: Facebook,
};

const statusColors = {
    published: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    scheduled: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    draft: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
};

const statusLabels = {
    published: 'Publicado',
    scheduled: 'Agendado',
    draft: 'Rascunho',
};

export default function Posts({ posts }: { posts: any[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [platformFilter, setPlatformFilter] = useState('all');
    const [deletePostId, setDeletePostId] = useState<number | null>(null);

    const { delete: deletePost, processing } = useForm();

    const filteredPosts = posts.filter((post) => {
        const matchesSearch =
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.content.toLowerCase().includes(searchTerm.toLowerCase());
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
            minute: '2-digit',
        });
    };

    const getPlatformIcon = (platform: string) => {
        const IconComponent = platformIcons[platform as keyof typeof platformIcons];
        return IconComponent ? <IconComponent className="h-4 w-4" /> : null;
    };

    const handleEdit = (postId: number) => {
        router.visit(route('posts.edit', postId));
    };

    const handleDuplicate = (postId: number) => {
        router.post(route('posts.duplicate', postId));
    };

    const handleDelete = (postId: number) => {
        if (confirm('Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita.')) {
            deletePost(route('posts.destroy', postId));
        }
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
                    <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => router.visit(route('create-post'))}>
                        <Plus className="mr-2 h-4 w-4" />
                        Novo Post
                    </Button>
                </div>

                {/* Filtros */}
                <Card className="p-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
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
                                        src={post.image_url || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop'}
                                        alt={post.title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                {/* Conteúdo */}
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-start justify-between">
                                        <div className="min-w-0 flex-1">
                                            <h3 className="truncate text-lg font-semibold">{post.title}</h3>
                                            <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{post.content}</p>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleEdit(post.id)}>Editar</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDuplicate(post.id)}>Duplicar</DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-red-600"
                                                    onClick={() => handleDelete(post.id)}
                                                    disabled={processing}
                                                >
                                                    {processing && deletePostId === post.id ? 'Excluindo...' : 'Excluir'}
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    {/* Metadados */}
                                    <div className="mt-3 flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            {getPlatformIcon(post.platform)}
                                            <span className="text-sm text-gray-600 capitalize dark:text-gray-400">{post.platform}</span>
                                        </div>
                                        <Badge className={statusColors[post.status as keyof typeof statusColors]}>
                                            {statusLabels[post.status as keyof typeof statusLabels]}
                                        </Badge>
                                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                            <Calendar className="h-4 w-4" />
                                            {formatDate(post.published_at)}
                                        </div>
                                    </div>

                                    {/* Engajamento */}
                                    {post.status === 'published' && post.engagement && (
                                        <div className="mt-3 flex items-center gap-4">
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
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                <Search className="h-6 w-6 text-gray-400" />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold">Nenhum post encontrado</h3>
                            <p className="mb-4 text-gray-600 dark:text-gray-400">Tente ajustar os filtros ou criar um novo post.</p>
                            <Button onClick={() => router.visit(route('create-post'))} className="bg-purple-600 hover:bg-purple-700">
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
