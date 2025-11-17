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
        'price': 17.00,
        'image_url': 'https://images.unsplash.com/photo-1761751361544-33eeb10a624d',
        'sales_count': 118,
        'stock': random.randint(8, 25)
    }
]
