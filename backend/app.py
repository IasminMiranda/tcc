from flask import Flask
from flask_restx import Api, Resource, Namespace
from flask_cors import CORS

from models import init_db, Base, engine
from models.user import User
from controllers.cupcake import seed_cupcakes
from routes.auth import auth_ns
from routes.cupcake import cupcake_ns
from routes.register import register_ns

app = Flask(__name__)
CORS(app)

api = Api(app, version='1.0', title='TCC API', description='Backend API with Flask-RESTX', doc='/docs')

# Initialize database
init_db()

# Seed fake user and cupcakes
session_local = __import__('models', fromlist=['SessionLocal']).SessionLocal
session = session_local()
try:
    if not session.query(User).filter_by(username='test').first():
        from models.user import User
        user = User(username='test', password_hash=User.hash_password('password'))
        session.add(user)
        session.commit()
finally:
    session.close()

seed_cupcakes()

api.add_namespace(auth_ns, path='/api/auth')
api.add_namespace(cupcake_ns, path='/api/cupcakes')
api.add_namespace(register_ns, path='/api/auth/register')

# Hello namespace (test endpoint)
hello_ns = Namespace('hello', description='Hello endpoints')

@hello_ns.route('/')
class Hello(Resource):
    def get(self):
        return {'message': 'Hello from Flask-RESTX'}

api.add_namespace(hello_ns, path='/api/hello')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
