from flask import Flask
from flask_restx import Api, Resource, Namespace
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

api = Api(app, version='1.0', title='TCC API', description='Backend API with Flask-RESTX', doc='/docs')

ns = Namespace('hello', description='Hello endpoints')
api.add_namespace(ns, path='/api/hello')

@ns.route('/')
class Hello(Resource):
    def get(self):
        return {'message': 'Hello from Flask-RESTX'}

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
