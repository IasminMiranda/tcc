from flask import request
from models import SessionLocal
from models.user import User


def login(data):
    """Handle login logic."""
    username = data.get('username')
    password = data.get('password')
    session = SessionLocal()
    try:
        user = session.query(User).filter_by(username=username).first()
        if not user or not user.check_password(password):
            return {'success': False, 'message': 'Credenciais inválidas'}, 401
        return {
            'success': True,
            'message': 'Login bem-sucedido',
            'user': {'username': user.username},
            'token': 'fake-jwt-token'
        }, 200
    finally:
        session.close()
