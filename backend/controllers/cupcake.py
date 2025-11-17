from models import SessionLocal
from models.cupcake import Cupcake, FAKE_CUPCAKES


def get_top_selling_cupcakes():
    """Get top 5 selling cupcakes from last 7 days."""
    session = SessionLocal()
    try:
        cupcakes = session.query(Cupcake).order_by(Cupcake.sales_count.desc()).limit(5).all()
        if not cupcakes:
            return []
        return [
            {
                'id': c.id,
                'name': c.name,
                'description': c.description,
                'price': c.price,
                'image_url': c.image_url,
                'sales_count': c.sales_count,
                'stock': c.stock
            }
            for c in cupcakes
        ]
    finally:
        session.close()


def seed_cupcakes():
    """Seed fake cupcakes if table is empty."""
    session = SessionLocal()
    try:
        if session.query(Cupcake).count() == 0:
            for fake_cupcake in FAKE_CUPCAKES:
                if 'stock' not in fake_cupcake:
                    from random import randint
                    fake_cupcake['stock'] = randint(8, 25)
                cupcake = Cupcake(**fake_cupcake)
                session.add(cupcake)
            session.commit()
    finally:
        session.close()
