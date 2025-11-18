from models import SessionLocal
from models.user import User


def get_all_users():
    session = SessionLocal()
    try:
        users = session.query(User).all()
        return [
            {
                'id': u.id,
                'username': u.username,
                'role': u.role
            } for u in users
        ]
    finally:
        session.close()


def update_user_role(user_id, new_role):
    session = SessionLocal()
    try:
        user = session.query(User).filter_by(id=user_id).first()
        if not user:
            return {'success': False, 'message': 'Usuário não encontrado'}, 404
        user.role = new_role
        session.commit()
        return {'success': True, 'message': 'Role atualizada', 'user': {'id': user.id, 'role': user.role}}
    finally:
        session.close()


def create_admin_user():
    session = SessionLocal()
    try:
        if session.query(User).filter_by(username='admin').first():
            return  # Já existe
        admin = User(
            username='admin',
            password_hash=User.hash_password('admin123'),
            role='admin'
        )
        session.add(admin)
        session.commit()
    finally:
        session.close()
