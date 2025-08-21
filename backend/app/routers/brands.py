from flask import Blueprint, request, jsonify
from marshmallow import ValidationError
from sqlalchemy.exc import SQLAlchemyError

from ..database import db
from ..models import Brand
from ..schemas import brand_schema, brands_schema, brand_create_schema, brand_update_schema

# Crear blueprint para las rutas de marcas
brands_bp = Blueprint('brands', __name__, url_prefix='/api/brands')

@brands_bp.route('/', methods=['GET'])
def get_brands():
    """Obtener todas las marcas con paginación"""
    try:
        # Parámetros de paginación
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 6, type=int)
        
        # Consulta paginada
        brands_paginated = Brand.query.paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        # Serializar los datos
        brands_data = brands_schema.dump(brands_paginated.items)
        
        return jsonify({
            'brands': brands_data,
            'totalPages': brands_paginated.pages,
            'currentPage': page,
            'total': brands_paginated.total,
            'error': None
        }), 200
        
    except Exception as e:
        return jsonify({
            'brands': [],
            'totalPages': 1,
            'error': f'Error al obtener las marcas: {str(e)}'
        }), 500

@brands_bp.route('/<int:brand_id>', methods=['GET'])
def get_brand(brand_id):
    """Obtener una marca específica por ID"""
    try:
        brand = Brand.query.get_or_404(brand_id)
        brand_data = brand_schema.dump(brand)
        
        return jsonify({
            'brand': brand_data,
            'error': None
        }), 200
        
    except Exception as e:
        return jsonify({
            'brand': None,
            'error': f'Error al obtener la marca: {str(e)}'
        }), 404

@brands_bp.route('/', methods=['POST'])
def create_brand():
    """Crear una nueva marca"""
    try:
        # Validar los datos de entrada
        brand_data = brand_create_schema.load(request.json)
        
        # Crear nueva marca
        new_brand = Brand(
            brandName=brand_data['brandName'],
            trademarkOwner=brand_data['trademarkOwner'],
            status=brand_data['status']
        )
        
        # Guardar en la base de datos
        db.session.add(new_brand)
        db.session.commit()
        
        # Serializar la respuesta
        result = brand_schema.dump(new_brand)
        
        return jsonify({
            'brand': result,
            'error': None
        }), 201
        
    except ValidationError as e:
        return jsonify({
            'brand': None,
            'error': f'Datos inválidos: {e.messages}'
        }), 400
        
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({
            'brand': None,
            'error': f'Error de base de datos: {str(e)}'
        }), 500

@brands_bp.route('/<int:brand_id>', methods=['PUT'])
def update_brand(brand_id):
    """Actualizar una marca existente"""
    try:
        # Buscar la marca
        brand = Brand.query.get_or_404(brand_id)
        
        # Validar los datos de entrada
        brand_data = brand_update_schema.load(request.json)
        
        # Actualizar los campos proporcionados
        for key, value in brand_data.items():
            setattr(brand, key, value)
        
        # Guardar cambios
        db.session.commit()
        
        # Serializar la respuesta
        result = brand_schema.dump(brand)
        
        return jsonify({
            'brand': result,
            'error': None
        }), 200
        
    except ValidationError as e:
        return jsonify({
            'brand': None,
            'error': f'Datos inválidos: {e.messages}'
        }), 400
        
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({
            'brand': None,
            'error': f'Error de base de datos: {str(e)}'
        }), 500

@brands_bp.route('/<int:brand_id>', methods=['DELETE'])
def delete_brand(brand_id):
    """Eliminar una marca"""
    try:
        # Buscar la marca
        brand = Brand.query.get_or_404(brand_id)
        
        # Eliminar la marca
        db.session.delete(brand)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'error': None
        }), 200
        
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': f'Error al eliminar la marca: {str(e)}'
        }), 500