import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Entrar - SocialAI">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
                <div className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-8">
                    <div className="w-full max-w-md">
                        <div className="mb-8 text-center">
                            <TextLink href={route('home')} className="inline-block">
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                    SocialAI
                                </h1>
                            </TextLink>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                                Bem-vindo de volta! Entre para continuar.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
                            <form onSubmit={submit} className="space-y-6">
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
                                        autoFocus
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password" className="text-gray-700 dark:text-gray-200">
                                            Senha
                                        </Label>
                                        {canResetPassword && (
                                            <TextLink
                                                href={route('password.request')}
                                                className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400"
                                            >
                                                Esqueceu a senha?
                                            </TextLink>
                                        )}
                                    </div>
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

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        checked={data.remember}
                                        onCheckedChange={(checked) => setData('remember', checked as boolean)}
                                    />
                                    <Label htmlFor="remember" className="text-sm text-gray-600 dark:text-gray-300">
                                        Lembrar de mim
                                    </Label>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-xl bg-purple-600 hover:bg-purple-700 text-white py-2.5"
                                >
                                    {processing ? (
                                        <LoaderCircle className="h-5 w-5 animate-spin" />
                                    ) : (
                                        'Entrar'
                                    )}
                                </Button>
                            </form>

                            {status && (
                                <div className="mt-4 text-center text-sm font-medium text-green-600">
                                    {status}
                                </div>
                            )}

                            <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
                                Não tem uma conta?{' '}
                                <TextLink
                                    href={route('register')}
                                    className="font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400"
                                >
                                    Cadastre-se
                                </TextLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
