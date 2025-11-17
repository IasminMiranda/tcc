# Backend (Flask-RESTX) - Estrutura MVC

O backend está organizado em padrão MVC:
- `models/` → Modelos de dados (User, Cupcake)
- `controllers/` → Lógica de negócio
- `routes/` → Blueprints com endpoints

## Setup Local (Windows PowerShell)

```powershell
cd backend

# Criar virtual environment
python -m venv venv

# Ativar (se ExecutionPolicy permitir):
.\venv\Scripts\Activate.ps1

# Se bloqueado, usar Bypass temporário:
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force
.\venv\Scripts\Activate.ps1

# Instalar dependências
pip install -r requirements.txt

# Rodar app
python app.py
```

## Endpoints

- **Docs**: `http://localhost:5000/docs` (Swagger UI)
- **Hello**: `GET http://localhost:5000/api/hello/`
- **Login**: `POST http://localhost:5000/api/auth/login`
  - Body: `{"username": "test", "password": "password"}`
- **Top Selling Cupcakes**: `GET http://localhost:5000/api/cupcakes/top-selling`

## Banco de Dados

- Usa SQLite local: `backend/data.db` (criado automaticamente).
- Dados fake são seeded na primeira execução.
- **Usuário de teste**: `username: test`, `password: password`.
- **Cupcakes**: 5 top-selling com imagens do Unsplash.

