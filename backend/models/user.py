from sqlalchemy import Column, Integer, String
from werkzeug.security import check_password_hash, generate_password_hash
from models import Base



class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String(80), unique=True, nullable=False)
    password_hash = Column(String(200), nullable=False)
    role = Column(String(20), nullable=False, default='user')
    cep = Column(String(20), nullable=True)
    street = Column(String(120), nullable=True)
    number = Column(String(10), nullable=True)
    complement = Column(String(120), nullable=True)
    city = Column(String(80), nullable=True)

    def check_password(self, password: str) -> bool:
        return check_password_hash(self.password_hash, password)
    
    @staticmethod
    def hash_password(password: str) -> str:
        return generate_password_hash(password)
