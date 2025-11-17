from flask_restx import Namespace, Resource, fields
from flask import request
from controllers.auth import login

auth_ns = Namespace('auth', description='Authentication')

login_model = auth_ns.model('Login', {
    'username': fields.String(required=True),
    'password': fields.String(required=True)
})


@auth_ns.route('/login')
class LoginResource(Resource):
    @auth_ns.expect(login_model, validate=True)
    def post(self):
        data = request.json or {}
        return login(data)
