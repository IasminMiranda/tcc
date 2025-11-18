from flask_restx import Namespace, Resource, fields
from controllers.user import get_all_users, update_user_role

user_ns = Namespace('users', description='User management')

user_model = user_ns.model('User', {
    'id': fields.Integer,
    'username': fields.String,
    'role': fields.String
})

role_update_model = user_ns.model('RoleUpdate', {
    'role': fields.String
})

@user_ns.route('/')
class UserList(Resource):
    @user_ns.marshal_list_with(user_model)
    def get(self):
        return get_all_users()

@user_ns.route('/<int:user_id>/role')
class UserRole(Resource):
    @user_ns.expect(role_update_model)
    def put(self, user_id):
        data = user_ns.payload
        return update_user_role(user_id, data.get('role'))
