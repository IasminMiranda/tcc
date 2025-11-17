# Backend structure after MVC refactor

```
backend/
├── app.py              # Main Flask app entry point
├── requirements.txt
├── data.db             # SQLite local DB (auto-created)
├── models/
│   ├── __init__.py
│   ├── user.py         # User model
│   └── cupcake.py      # Cupcake model
├── controllers/
│   ├── __init__.py
│   ├── auth.py         # Auth controller
│   └── cupcake.py      # Cupcake controller
├── routes/
│   ├── __init__.py
│   ├── auth.py         # Auth routes blueprint
│   └── cupcake.py      # Cupcake routes blueprint
└── README.md
```

This is a cleaner, more maintainable structure.
