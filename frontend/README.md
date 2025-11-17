# Frontend (Vite + React + TypeScript + MUI)

## Setup Local (Windows PowerShell)

```powershell
cd frontend

# Instalar dependências
npm install

# Rodar dev server
npm run dev
```

- Dev server: `http://localhost:3000`
- Página inicial exibe os 5 cupcakes mais vendidos do backend.
- Rota de login disponível em `/login`.

## Dependências

- `react-router-dom` para navegação entre páginas.
- `@mui/material` para UI components.
- `axios` para chamadas HTTP (opcional, usando `fetch` por enquanto).

## Estrutura

```
frontend/src/
├── main.tsx           # Entry point
├── App.tsx            # Router setup
├── theme.ts           # MUI theme config
├── pages/
│   ├── Home.tsx       # Homepage com cupcakes
│   └── Login.tsx      # Página de login
└── styles.css
```
