# 🧁 Loja de Cupcakes - TCC

Aplicação full-stack para venda de cupcakes.

## Estrutura do Projeto

```
tcc/
├── frontend/       # React + TypeScript + MUI (Vite)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx       # Homepage com cupcakes mais vendidos
│   │   │   └── Login.tsx      # Página de login
│   │   ├── App.tsx            # Router
│   │   ├── theme.ts           # MUI theme
│   │   └── main.tsx           # Entry point
│   ├── package.json
│   ├── vite.config.ts
│   └── README.md
│
├── backend/        # Flask-RESTX (MVC)
│   ├── models/
│   │   ├── user.py            # Modelo User
│   │   └── cupcake.py         # Modelo Cupcake + dados fake
│   ├── controllers/
│   │   ├── auth.py            # Lógica de autenticação
│   │   └── cupcake.py         # Lógica de cupcakes
│   ├── routes/
│   │   ├── auth.py            # Endpoints de auth
│   │   └── cupcake.py         # Endpoints de cupcakes
│   ├── app.py                 # App principal
│   ├── requirements.txt
│   └── README.md
│
└── README.md (este arquivo)
```

## Quick Start

### Backend

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```

**API**: `http://localhost:5000/docs`

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

**App**: `http://localhost:3000`

## Credenciais de Teste

- **Username**: `test`
- **Password**: `password`

## Endpoints

| Método | URL | Descrição |
|--------|-----|-----------|
| POST | `/api/auth/login` | Login com username/password |
| GET | `/api/cupcakes/top-selling` | Top 5 cupcakes da semana |
| GET | `/api/hello/` | Endpoint de teste |

## Tecnologias

### Frontend
- React 18 + TypeScript
- Material-UI (MUI) 5
- Vite
- React Router DOM 6

### Backend
- Flask 2.3
- Flask-RESTX 1.3
- SQLAlchemy 2.0
- Flask-CORS
- SQLite (local)

## Desenvolvimento

As imagens dos cupcakes são carregadas do **Unsplash** (URLs públicas). Se preferir usar bucket próprio (AWS S3, Google Cloud Storage), posso configurar.

Dados são mantidos em `backend/data.db` (SQLite local) — nenhum banco externo requerido.
