from flask_restx import Namespace, Resource, fields
from flask import request
from models import SessionLocal
from models.user import User

register_ns = Namespace('register', description='User registration')

register_model = register_ns.model('Register', {
    'username': fields.String(required=True),
    'password': fields.String(required=True),
    'cep': fields.String(required=True),
    'street': fields.String(required=True),
    'number': fields.String(required=True),
    'complement': fields.String(required=False),
    'city': fields.String(required=True)
})

@register_ns.route('/')
class RegisterResource(Resource):
    @register_ns.expect(register_model, validate=True)
    def post(self):
        data = request.json or {}
        username = data.get('username')
        password = data.get('password')
        cep = data.get('cep')
        street = data.get('street')
        number = data.get('number')
        complement = data.get('complement')
        city = data.get('city')

        # Validação de senha: mínimo 7 caracteres e pelo menos um número
        if not password or len(password) <= 6 or not any(c.isdigit() for c in password):
            return {'success': False, 'message': 'A senha deve ter mais de 6 caracteres e conter pelo menos um número'}, 400
        # Verifica se o usuario cadastrou o endereço completo
        if not cep or not street or not number or not city:
            return {'success': False, 'message': 'Endereço obrigatório'}, 400
        session = SessionLocal()
        try:
            if session.query(User).filter_by(username=username).first():
                return {'success': False, 'message': 'Usuário já existe'}, 400
            user = User(username=username, password_hash=User.hash_password(password), role='user', cep=cep, street=street, number=number, complement=complement, city=city)
            session.add(user)
            session.commit()
            return {'success': True, 'message': 'Usuário cadastrado com sucesso'}
        finally:
            session.close()
