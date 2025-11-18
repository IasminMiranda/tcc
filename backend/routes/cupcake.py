from flask_restx import Namespace, Resource, fields
from controllers.cupcake import get_top_selling_cupcakes
from models.cupcake import Cupcake

cupcake_ns = Namespace('cupcakes', description='Cupcake endpoints')

cupcake_model = cupcake_ns.model('Cupcake', {
    'id': fields.Integer,
    'name': fields.String,
    'description': fields.String,
    'price': fields.Float,
    'image_url': fields.String,
    'sales_count': fields.Integer,
    'stock': fields.Integer
})

@cupcake_ns.route('/')
class AllCupcakes(Resource):
    @cupcake_ns.marshal_list_with(cupcake_model)
    def get(self):
        from models import SessionLocal
        session = SessionLocal()
        try:
            cupcakes = session.query(Cupcake).all()
            return cupcakes
        finally:
            session.close()

@cupcake_ns.route('/<int:cupcake_id>/reduce-stock')
class ReduceStock(Resource):
    @cupcake_ns.expect(cupcake_ns.model('ReduceStock', {'quantity': fields.Integer}))
    def post(self, cupcake_id):
        from models import SessionLocal
        session = SessionLocal()
        data = cupcake_ns.payload
        try:
            cupcake = session.query(Cupcake).filter_by(id=cupcake_id).first()
            if not cupcake:
                return {'message': 'Cupcake não encontrado'}, 404
            qty = data.get('quantity', 1)
            if cupcake.stock < qty:
                return {'message': 'Estoque insuficiente'}, 400
            cupcake.stock -= qty
            session.commit()
            return {'message': 'Estoque atualizado', 'stock': cupcake.stock}
        finally:
            session.close()

@cupcake_ns.route('/top-selling')
class TopSellingCupcakes(Resource):
    @cupcake_ns.marshal_list_with(cupcake_model)
    def get(self):
        """Get top 5 selling cupcakes."""
        return get_top_selling_cupcakes()
