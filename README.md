# Saylor Damasceno - Portfolio

Portfolio interativo com efeitos de partículas holográficas, desenvolvido com Next.js 14, Three.js e React Three Fiber.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![Three.js](https://img.shields.io/badge/Three.js-r158-black?style=flat-square&logo=three.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=flat-square&logo=docker)

## Sobre

Tech Lead com 15+ anos de experiência em Engenharia de Software, especialista em:

- **Back-end Development** - PHP, Node.js, Software Architecture
- **AI & LLMs** - LangChain, RAG, OpenAI, Azure AI
- **Cloud** - AWS, Azure, Infraestrutura Escalável
- **Liderança** - Engineering Teams, Product Strategy

## Features

- Sistema de partículas 3D com física de molas e Perlin noise
- Texto holográfico renderizado com WebGL shaders
- Navegação por scroll entre seções
- HUD otimizado para recrutadores
- Custom cursor com efeitos de hover
- SEO otimizado + llms.txt para indexação por LLMs
- Totalmente responsivo

## Tech Stack

| Categoria | Tecnologia |
|-----------|------------|
| Framework | Next.js 14 |
| 3D Engine | Three.js + React Three Fiber |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Language | TypeScript |
| Deploy | Docker |

## Quick Start

### Com Docker (Recomendado)

```bash
docker compose up
```

Acesse: http://localhost:3333

### Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev
```

Acesse: http://localhost:3000

## Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx          # Página principal com navegação
│   ├── layout.tsx        # Layout com meta tags SEO
│   └── globals.css       # Estilos globais
├── components/
│   ├── ParticleText.tsx  # Texto de partículas holográficas
│   ├── Scene.tsx         # Canvas 3D com Three.js
│   ├── HUD.tsx           # Interface para recrutadores
│   └── CustomCursor.tsx  # Cursor personalizado
└── hooks/
    ├── useMousePosition.ts
    └── useFPS.ts
```

## Contato

- **Email:** saylorgabriel@hotmail.com
- **LinkedIn:** [in/saylordamasceno](https://linkedin.com/in/saylordamasceno)
- **GitHub:** [saylorgabriel](https://github.com/saylorgabriel)

## Licença

MIT
