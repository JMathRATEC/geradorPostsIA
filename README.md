# 🚀 SocialAI - Gerador de Posts com IA

Uma ferramenta moderna e inteligente para gerar postagens para redes sociais utilizando inteligência artificial. O SocialAI oferece sugestões de legendas, hashtags, agendamento e análise de melhores horários para postagem.

## ✨ Funcionalidades

### 🤖 **Geração de Conteúdo com IA**

- Criação automática de legendas otimizadas
- Sugestão inteligente de hashtags relevantes
- Geração de conteúdo personalizado por tipo de post
- Configuração de tom e estilo da mensagem

### 📱 **Suporte a Múltiplas Redes Sociais**

- **Instagram** - Posts visuais e stories
- **Twitter** - Tweets e threads
- **Facebook** - Posts para páginas e grupos

### 📊 **Análise e Otimização**

- Análise de melhores horários para postagem
- Estatísticas de engajamento esperado
- Sugestões de alcance e performance
- Histórico de posts e métricas

### 🎨 **Interface Moderna**

- Design responsivo e intuitivo
- Suporte a tema claro/escuro
- Dashboard com estatísticas em tempo real
- Navegação fluida e acessível

### 📅 **Agendamento e Gestão**

- Agendamento de posts para horários otimizados
- Gestão completa de rascunhos e publicações
- Filtros avançados por status e plataforma
- Busca inteligente em todo o conteúdo

## 🛠️ Tecnologias Utilizadas

### **Backend**

- **Laravel 11** - Framework PHP robusto e moderno
- **Inertia.js** - SPA sem a complexidade de APIs
- **MySQL/PostgreSQL** - Banco de dados relacional

### **Frontend**

- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática para maior confiabilidade
- **Tailwind CSS** - Framework CSS utilitário
- **Lucide React** - Ícones modernos e consistentes

### **UI/UX**

- **Radix UI** - Componentes acessíveis e customizáveis
- **Headless UI** - Componentes sem estilos pré-definidos
- **Framer Motion** - Animações suaves e profissionais

### **Ferramentas de Desenvolvimento**

- **Vite** - Build tool rápida e moderna
- **ESLint** - Linting de código JavaScript/TypeScript
- **Pest** - Framework de testes PHP

## 🚀 Instalação e Configuração

### **Pré-requisitos**

- PHP 8.2 ou superior
- Composer 2.0 ou superior
- Node.js 18 ou superior
- MySQL 8.0 ou PostgreSQL 13

### **1. Clone o Repositório**

```bash
git clone https://github.com/seu-usuario/geradorPostsIA.git
cd geradorPostsIA
```

### **2. Instale as Dependências PHP**

```bash
composer install
```

### **3. Configure o Ambiente**

```bash
cp .env.example .env
php artisan key:generate
```

### **4. Configure o Banco de Dados**

Edite o arquivo `.env` com suas configurações de banco:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=socialai
DB_USERNAME=root
DB_PASSWORD=
```

### **5. Execute as Migrações**

```bash
php artisan migrate
```

### **6. Instale as Dependências JavaScript**

```bash
npm install
```

### **7. Compile os Assets**

```bash
npm run dev
```

### **8. Inicie o Servidor**

```bash
php artisan serve
```

Acesse `http://localhost:8000` no seu navegador.

## 📁 Estrutura do Projeto

```
geradorPostsIA/
├── app/
│   ├── Http/Controllers/     # Controladores da aplicação
│   ├── Models/              # Modelos Eloquent
│   └── Providers/           # Service Providers
├── resources/
│   ├── js/
│   │   ├── components/      # Componentes React reutilizáveis
│   │   ├── layouts/         # Layouts da aplicação
│   │   ├── pages/           # Páginas da aplicação
│   │   └── types/           # Definições TypeScript
│   └── views/               # Templates Blade
├── routes/                  # Definições de rotas
├── database/                # Migrações e seeders
└── config/                  # Arquivos de configuração
```

## 🎯 Como Usar

### **1. Dashboard**

- Visualize estatísticas rápidas dos seus posts
- Acesse funcionalidades principais
- Monitore performance geral

### **2. Criar Novo Post**

- Selecione a rede social desejada
- Escolha o tipo de conteúdo
- Descreva seu negócio
- Configure parâmetros avançados
- Gere conteúdo com IA

### **3. Gerenciar Posts**

- Visualize todos os posts criados
- Filtre por status e plataforma
- Edite ou exclua posts
- Monitore engajamento

## 🔧 Configuração Avançada

### **Variáveis de Ambiente**

```env
# Configurações de IA (futuro)
AI_PROVIDER=openai
AI_API_KEY=your-api-key

# Configurações de Redes Sociais (futuro)
INSTAGRAM_API_KEY=your-instagram-key
TWITTER_API_KEY=your-twitter-key
FACEBOOK_API_KEY=your-facebook-key
```

### **Personalização de Temas**

O projeto suporta temas personalizados através do Tailwind CSS. Edite `resources/css/app.css` para customizar cores e estilos.

## 🧪 Testes

### **Executar Testes PHP**

```bash
php artisan test
```

### **Executar Testes JavaScript**

```bash
npm run test
```

**Desenvolvido com ❤️**
