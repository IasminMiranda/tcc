from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime, timedelta
from models import Base


class Cupcake(Base):
    __tablename__ = 'cupcakes'
    id = Column(Integer, primary_key=True)
    name = Column(String(120), nullable=False)
    description = Column(String(500))
    price = Column(Float, nullable=False)
    image_url = Column(String(500), nullable=False)
    sales_count = Column(Integer, default=0)  # Total sales in last 7 dias
    stock = Column(Integer, default=0)  # Quantidade em estoque
    created_at = Column(DateTime, default=datetime.utcnow)


# Fake data: 5 top-selling cupcakes with images from Unsplash
import random
FAKE_CUPCAKES = [
    {
        'name': 'Maravilha de chocolate',
        'description': 'Delicioso bolo de chocolate com ganache meio amargo',
        'price': 15.00,
        'image_url': 'https://images.unsplash.com/photo-1640806353257-6c408529d822',
        'sales_count': 156,
        'stock': random.randint(8, 25)
    },
    {
        'name': 'Sonho de baunilha',
        'description': 'Bolo clássico de baunilha com cobertura de manteiga',
        'price': 12.00,
        'image_url': 'https://images.unsplash.com/photo-1519869325930-281384150729',
        'sales_count': 142,
        'stock': random.randint(8, 25)
    },
    {
        'name': 'Morandelícia',
        'description': 'Fofinho de chocolate recheado de morangos frescos',
        'price': 16.50,
        'image_url': 'https://images.unsplash.com/photo-1691775755581-0abf87ca44d5',
        'sales_count': 138,
        'stock': random.randint(8, 25)
    },
    {
        'name': 'Limonada',
        'description': 'Explosão cítrica de limão',
        'price': 13.20,
        'image_url': 'https://images.unsplash.com/photo-1608847567708-1e0b5a46eb13',
        'sales_count': 125,
        'stock': random.randint(8, 25)
    },
    {
        'name': 'Red Velvet',
        'description': 'Bolo red velvet clássico com cobertura de cream cheese colorido',
        'price': 17.23,
        'image_url': 'https://images.unsplash.com/photo-1761751361544-33eeb10a624d',
        'sales_count': 118,
        'stock': random.randint(8, 25)
    },
    {
        'name': 'Cenoura com Chocolate',
        'description': 'Bolo de cenoura fofinho com cobertura de chocolate',
        'price': 14.61,
        'image_url': 'https://media.istockphoto.com/id/2195474569/pt/foto/carrot-cake-cupcakes-for-easter-carrot-cupcakes-with-cream-cheese-frosting-decorated-with.jpg?s=1024x1024&w=is&k=20&c=8kPGfNCdqweyS5Is1shEi7afpn-zKB6Uaisc4ILe8Bw=',
        'sales_count': 80,
        'stock': random.randint(8, 25)
    },
    {
        'name': 'Coco Tropical',
        'description': 'Cupcake de coco com recheio cremoso',
        'price': 13.67,
        'image_url': 'https://plus.unsplash.com/premium_photo-1671405925073-81d5831e6aee?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'sales_count': 65,
        'stock': random.randint(8, 25)
    },
    {
        'name': 'Framboesa Fresh',
        'description': 'Cupcake de baunilha com geleia de framboesa',
        'price': 15.50,
        'image_url': 'https://images.unsplash.com/photo-1684246524258-fbf58649c291?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'sales_count': 72,
        'stock': random.randint(8, 25)
    },
    {
        'name': 'Caramelo Salgado',
        'description': 'Cupcake de caramelo com toque de flor de sal',
        'price': 16.21,
        'image_url': 'https://images.unsplash.com/photo-1601045263606-b31b202de911?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'sales_count': 90,
        'stock': random.randint(8, 25)
    },
    {
        'name': 'Limão Siciliano',
        'description': 'Cupcake cítrico com raspas de limão siciliano',
        'price': 13.80,
        'image_url': 'https://media.istockphoto.com/id/171253810/pt/foto/lima-bolinho.jpg?s=1024x1024&w=is&k=20&c=HrQFOGNow3pDKUghZevaN6iJ7qjDemsgcPicNI73_0M=',
        'sales_count': 60,
        'stock': random.randint(8, 25)
    },
    {
        'name': 'Nutella Dream',
        'description': 'Cupcake recheado com creme de Nutella',
        'price': 17.50,
        'image_url': 'https://media.istockphoto.com/id/1003313046/pt/foto/cupcakes-with-nutella-topping.jpg?s=1024x1024&w=is&k=20&c=kOklPyS9zDZ9McK-n2r29bPHxRKl51EJgBrAtq8OhMA=',
        'sales_count': 110,
        'stock': random.randint(8, 25)
    },
    {
        'name': 'Paçoca Lovers',
        'description': 'Cupcake de amendoim com paçoca crocante',
        'price': 14.42,
        'image_url': 'https://media.istockphoto.com/id/813859676/pt/foto/cupcake-isolated-on-white-rear.jpg?s=1024x1024&w=is&k=20&c=iTdZiyUEJpZezZruv8bZIks6EeuyjfNkM2uQa-kml8s=',
        'sales_count': 55,
        'stock': random.randint(8, 25)
    },
    {
        'name': 'Café Gourmet',
        'description': 'Cupcake de café com cobertura de chantilly',
        'price': 15.94,
        'image_url': 'https://images.unsplash.com/photo-1588789022657-362b4d94a9f1?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'sales_count': 77,
        'stock': random.randint(8, 25)
    }
]
