import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Cadastro - SocialAI">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div
                className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
                <div className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-8">
                    <div className="w-full max-w-md">
                        <div className="mb-8 text-center">
                            <TextLink href={route('home')} className="inline-block">
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                    SocialAI
                                </h1>
                            </TextLink>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                                Crie sua conta e comece a revolucionar suas redes sociais
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
                            <form onSubmit={submit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-gray-700 dark:text-gray-200">
                                        Nome
                                    </Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-900"
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Seu nome"
                                        required
                                        autoFocus
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-200">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-900"
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="seu@email.com"
                                        required
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-gray-700 dark:text-gray-200">
                                        Senha
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-900"
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="••••••••"
                                        required
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password_confirmation" className="text-gray-700 dark:text-gray-200">
                                        Confirmar Senha
                                    </Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-900"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        placeholder="••••••••"
                                        required
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-xl bg-purple-600 hover:bg-purple-700 text-white py-2.5"
                                >
                                    {processing ? (
                                        <LoaderCircle className="h-5 w-5 animate-spin" />
                                    ) : (
                                        'Criar Conta'
                                    )}
                                </Button>
                            </form>

                            <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
                                Já tem uma conta?{' '}
                                <TextLink
                                    href={route('login')}
                                    className="font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400"
                                >
                                    Faça login
                                </TextLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
