# Backend (Flask-RESTX)

Local setup (Windows PowerShell):

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```

- API docs available at `http://localhost:5000/docs` while running.
- Example endpoint: `GET http://localhost:5000/api/hello/` returns a greeting.
