import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { BarChart3, Calendar, Clock, Facebook, Hash, Image, Instagram, Twitter } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard - SocialAI" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header com Estatísticas Rápidas */}
                <div className="grid gap-6 md:grid-cols-4">
                    <Card className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900">
                                <Image className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Posts Gerados</p>
                                <h3 className="text-2xl font-bold">24</h3>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Agendados</p>
                                <h3 className="text-2xl font-bold">12</h3>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
                                <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Engajamento</p>
                                <h3 className="text-2xl font-bold">89%</h3>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-orange-100 p-3 dark:bg-orange-900">
                                <Hash className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Hashtags</p>
                                <h3 className="text-2xl font-bold">156</h3>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Área Principal */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Seção de Criação de Conteúdo */}
                    <Card className="col-span-2 p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Criar Novo Post</h2>
                            <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => router.visit(route('create-post'))}>
                                Novo Post
                            </Button>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-xl border p-4">
                                <h3 className="mb-2 font-medium">Redes Sociais</h3>
                                <div className="flex gap-2">
                                    <Button variant="outline" className="flex items-center gap-2">
                                        <Instagram className="h-4 w-4" />
                                        Instagram
                                    </Button>
                                    <Button variant="outline" className="flex items-center gap-2">
                                        <Twitter className="h-4 w-4" />
                                        Twitter
                                    </Button>
                                    <Button variant="outline" className="flex items-center gap-2">
                                        <Facebook className="h-4 w-4" />
                                        Facebook
                                    </Button>
                                </div>
                            </div>
                            <div className="rounded-xl border p-4">
                                <h3 className="mb-2 font-medium">Melhor Horário</h3>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-purple-600" />
                                    <span>Hoje às 19:30</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Próximos Agendamentos */}
                    <Card className="p-6">
                        <h2 className="mb-4 text-xl font-semibold">Próximos Posts</h2>
                        <div className="space-y-4">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="flex items-center gap-4 rounded-lg border p-4">
                                    <div className="h-12 w-12 rounded-lg bg-gray-100 dark:bg-gray-800"></div>
                                    <div>
                                        <p className="font-medium">Post #{item}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Hoje, 19:30</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Análise e Histórico */}
                <div className="grid gap-6 lg:grid-cols-2">
                    <Card className="p-6">
                        <h2 className="mb-4 text-xl font-semibold">Análise de Desempenho</h2>
                        <div className="h-[200px] rounded-lg bg-gray-100 dark:bg-gray-800">
                            {/* Aqui você pode adicionar um gráfico de desempenho */}
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h2 className="mb-4 text-xl font-semibold">Hashtags Populares</h2>
                        <div className="flex flex-wrap gap-2">
                            {['#marketing', '#socialmedia', '#digital', '#content', '#trending'].map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-600 dark:bg-purple-900 dark:text-purple-400"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
