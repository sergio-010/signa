from datetime import datetime
from .database import db

class Brand(db.Model):
    """Modelo para la tabla de marcas"""
    __tablename__ = 'Brand'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    brandName = db.Column(db.String(255), nullable=False)
    trademarkOwner = db.Column(db.String(255), nullable=False)
    status = db.Column(db.Boolean, nullable=False, default=True)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f'<Brand {self.brandName}>'
    
    def to_dict(self):
        """Convertir el modelo a diccionario para serialización JSON"""
        return {
            'id': self.id,
            'brandName': self.brandName,
            'trademarkOwner': self.trademarkOwner,
            'status': self.status,
            'createdAt': self.createdAt.isoformat() if self.createdAt else None,
            'updatedAt': self.updatedAt.isoformat() if self.updatedAt else None
        }