# ATV02-DW-REACT — Pokédex

Projeto desenvolvido para a **Atividade 02** da disciplina de Desenvolvimento Web III — Fatec Registro (DSM), Prof. Diego Max.

## 📋 Sobre o Projeto

Pokédex construída com **Next.js 14** e **React**, consumindo a [PokéAPI](https://pokeapi.co/) (API pública e gratuita).

## ✅ Requisitos Atendidos

| Requisito | Implementação |
|---|---|
| Projeto em React + Next.js | ✅ Next.js 14 com App Router |
| Consumo de API pública | ✅ PokéAPI (`https://pokeapi.co/api/v2/`) |
| UI componentizada | ✅ `Header`, `PokemonCard`, `TypeBadge`, `LoadingSpinner` |
| CSS Modules | ✅ Cada componente possui seu próprio `.module.css` |
| CSS Global | ✅ `src/app/globals.css` (variáveis, reset, body, scrollbar) |
| `useState` | ✅ Usado na listagem (`pokemons`, `loading`, `offset`, `search`) |
| `useEffect` | ✅ Busca inicial da lista e busca de detalhes do pokémon |
| Props | ✅ `PokemonCard` recebe `pokemon`; `TypeBadge` recebe `type` e `large`; `Header` recebe `search` e `onSearch`; `LoadingSpinner` recebe `small` |
| Lista de registros | ✅ Grid com os primeiros 20 pokémons + botão "Carregar mais" |
| Registro único | ✅ Página `/pokemon/[name]` com stats, habilidades, descrição, info |

## 🚀 Como Rodar

```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## 🗂️ Estrutura do Projeto

```
src/
├── app/
│   ├── globals.css            # CSS global (variáveis, reset, tema)
│   ├── layout.js              # Layout raiz com metadata
│   ├── page.js                # Página inicial — listagem de pokémons
│   ├── page.module.css
│   └── pokemon/[name]/
│       ├── page.js            # Página de detalhes do pokémon
│       └── page.module.css
└── components/
    ├── Header/
    │   ├── Header.js          # Cabeçalho com busca (recebe props)
    │   └── Header.module.css
    ├── PokemonCard/
    │   ├── PokemonCard.js     # Card clicável (recebe pokemon via props)
    │   └── PokemonCard.module.css
    ├── TypeBadge/
    │   ├── TypeBadge.js       # Badge de tipo (recebe type via props)
    │   └── TypeBadge.module.css
    └── LoadingSpinner/
        ├── LoadingSpinner.js  # Spinner pokébola animada (recebe small via props)
        └── LoadingSpinner.module.css
```

## 🌐 API Utilizada

- **PokéAPI** — https://pokeapi.co/
  - `GET /api/v2/pokemon?limit=20&offset=0` → lista de pokémons
  - `GET /api/v2/pokemon/{name}` → detalhes de um pokémon
  - `GET /api/v2/pokemon-species/{name}` → descrição e espécie
