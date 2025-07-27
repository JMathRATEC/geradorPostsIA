import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Bem-vindo ao SocialAI">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 to-purple-50 p-6 text-gray-800 lg:justify-center lg:p-8 dark:from-gray-900 dark:to-gray-800 dark:text-white">
                <header className="mb-6 w-full max-w-[335px] text-sm lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-full bg-purple-600 px-6 py-2 text-sm font-medium text-white hover:bg-purple-700 transition-colors"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-full px-6 py-2 text-sm font-medium text-gray-700 hover:bg-purple-100 transition-colors dark:text-gray-200 dark:hover:bg-gray-700"
                                >
                                    Entrar
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-full bg-purple-600 px-6 py-2 text-sm font-medium text-white hover:bg-purple-700 transition-colors"
                                >
                                    Cadastrar
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <main className="flex w-full max-w-6xl flex-col-reverse lg:flex-row items-center gap-12 px-4">
                    <div className="flex-1 text-center lg:text-left">
                        <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Revolucione Suas Redes Sociais com IA
                        </h1>
                        <p className="text-lg lg:text-xl mb-8 text-gray-600 dark:text-gray-300">
                            Crie conteúdo envolvente para suas redes sociais usando o poder da Inteligência Artificial.
                            Gere legendas, hashtags e descubra os melhores horários para suas postagens.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link
                                href={route('register')}
                                className="rounded-full bg-purple-600 px-8 py-3 text-lg font-medium text-white hover:bg-purple-700 transition-colors"
                            >
                                Começar Agora
                            </Link>
                            <a
                                href="#features"
                                className="rounded-full bg-white px-8 py-3 text-lg font-medium text-purple-600 hover:bg-purple-50 transition-colors border-2 border-purple-600 dark:bg-transparent dark:hover:bg-gray-800"
                            >
                                Saiba Mais
                            </a>
                        </div>
                    </div>

<div className="flex-1">
    <div className="relative w-full h-[400px] flex items-center justify-center">
        <div className="smartphone-container">
            <div className="smartphone">
                <div className="smartphone-notch"></div>
                <div className="smartphone-screen">
                    <div className="gallery-grid">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="gallery-item">
                                <div className="post-preview">
                                    <div className="post-image"></div>
                                    <div className="post-overlay">
                                        <div className="post-caption"></div>
                                        <div className="post-hashtags"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="ai-suggestion-overlay">
                        <div className="ai-badge">
                            <span className="ai-icon">✨</span>
                            <span className="ai-text">IA Sugerindo...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

                </main>

                <section className="mt-20 w-full max-w-6xl px-4">
                    <h2 className="text-2xl lg:text-3xl font-bold text-center mb-12">
                        Funcionalidades Principais
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Geração de Conteúdo",
                                description: "Crie legendas únicas e envolventes com IA"
                            },
                            {
                                title: "Hashtags Inteligentes",
                                description: "Sugestões de hashtags relevantes para seu nicho"
                            },
                            {
                                title: "Agendamento Otimizado",
                                description: "Descubra os melhores horários para suas postagens"
                            }
                        ].map((feature, index) => (
                            <div key={index} className="p-6 rounded-xl bg-white shadow-xl dark:bg-gray-800">
                                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

<style>{`
    .smartphone-container {
        position: relative;
        width: 280px;
        height: auto;
        perspective: 1000px;
        margin: 0 auto;
    }

    @media (max-width: 768px) {
        .smartphone-container {
            width: 220px;
            height: auto;
        }
    }

    .smartphone {
        position: relative;
        width: 100%;
        height: 100%;
        background: #1a1a1a;
        border-radius: 40px;
        padding: 12px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        animation: float 6s ease-in-out infinite;
        transform-style: preserve-3d;
    }

    .smartphone-notch {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 120px;
        height: 25px;
        background: #1a1a1a;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        z-index: 10;
    }

    .smartphone-screen {
        position: relative;
        width: 100%;
        height: 100%;
        background: #fff;
        border-radius: 32px;
        overflow: hidden;
    }

    .gallery-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
        padding: 8px;
        animation: scroll 15s linear infinite;
    }

    .gallery-item {
        aspect-ratio: 1;
        border-radius: 12px;
        overflow: hidden;
        position: relative;
    }

    .post-preview {
        width: 100%;
        height: 100%;
        position: relative;
        background: #f0f0f0;
        animation: shimmer 2s infinite;
    }

    .post-image {
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg,
            #e6e6e6 25%,
            #f0f0f0 25%,
            #f0f0f0 50%,
            #e6e6e6 50%,
            #e6e6e6 75%,
            #f0f0f0 75%,
            #f0f0f0);
        background-size: 20px 20px;
        animation: move-bg 3s linear infinite;
    }

    .post-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 8px;
        background: rgba(0,0,0,0.5);
        backdrop-filter: blur(4px);
    }

    .post-caption {
        height: 8px;
        width: 70%;
        background: rgba(255,255,255,0.5);
        border-radius: 4px;
        margin-bottom: 4px;
    }

    .post-hashtags {
        height: 6px;
        width: 90%;
        background: rgba(255,255,255,0.3);
        border-radius: 3px;
    }

    .ai-suggestion-overlay {
        position: absolute;
        top: 16px;
        right: 16px;
        animation: pulse 2s infinite;
    }

    .ai-badge {
        background: rgba(147,51,234,0.9);
        padding: 8px 12px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        gap: 6px;
        box-shadow: 0 4px 12px rgba(147,51,234,0.3);
    }

    .ai-icon {
        font-size: 16px;
    }

    .ai-text {
        color: white;
        font-size: 12px;
        font-weight: 500;
    }

    @keyframes float {
        0%, 100% { transform: translateY(0) rotate3d(1, 1, 1, 0deg); }
        50% { transform: translateY(-20px) rotate3d(1, 1, 1, 2deg); }
    }

    @keyframes scroll {
        0% { transform: translateY(0); }
        100% { transform: translateY(-50%); }
    }

    @keyframes shimmer {
        0% { opacity: 1; }
        50% { opacity: 0.7; }
        100% { opacity: 1; }
    }

    @keyframes move-bg {
        0% { background-position: 0 0; }
        100% { background-position: 40px 40px; }
    }

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }

    .dark .smartphone-screen {
        background: #2a2a2a;
    }

    .dark .post-preview {
        background: #333;
    }

    .dark .post-image {
        background: linear-gradient(45deg,
            #2a2a2a 25%,
            #333 25%,
            #333 50%,
            #2a2a2a 50%,
            #2a2a2a 75%,
            #333 75%,
            #333);
    }
`}</style>
        </>
    );
}
