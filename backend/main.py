import os
from flask import Flask, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from dotenv import load_dotenv

from app.database import init_db, db
from app.routers.brands import brands_bp

# Cargar variables de entorno
load_dotenv()

def create_app():

    """Factory function para crear la aplicación Flask"""
    app = Flask(__name__)
    
    # Configuración CORS para permitir requests desde el frontend
    CORS(app, origins=[
        "http://localhost:3000", 
        "http://127.0.0.1:3000",
        "https://signa-jhk5.vercel.app",
        "https://*.vercel.app",
        "https://heartfelt-insight-production-3a55.up.railway.app"
    ])
    
    # Inicializar la base de datos
    init_db(app)
    
    # Inicializar Flask-Migrate
    migrate = Migrate(app, db)
    
    # Registrar blueprints
    app.register_blueprint(brands_bp)
    
    # Ruta de salud
    @app.route('/health', methods=['GET'])
    def health_check():
        return jsonify({
            'status': 'healthy',
            'message': 'Backend API está funcionando correctamente'
        }), 200
    
    # Ruta raíz
    @app.route('/', methods=['GET'])
    def root():
        return jsonify({
            'message': 'API de Marcas - Backend Python Flask',
            'version': '1.0.0',
            'endpoints': {
                'brands': '/api/brands',
                'health': '/health'
            }
        }), 200
    
    # Manejo de errores
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            'error': 'Endpoint no encontrado'
        }), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        db.session.rollback()
        return jsonify({
            'error': 'Error interno del servidor'
        }), 500
    
    return app

if __name__ == '__main__':
    # Crear la aplicación
    app = create_app()
    
    # Crear las tablas si no existen
    with app.app_context():
        db.create_all()
        print("✅ Tablas de base de datos creadas/verificadas")
    
    print("🚀 Iniciando servidor Flask...")
    print("📡 API disponible en: http://127.0.0.1:5000")
    print("📋 Endpoints disponibles:")
    print("  - GET  /health")
    print("  - GET  /api/brands")
    print("  - POST /api/brands")
    print("  - GET  /api/brands/<id>")
    print("  - PUT  /api/brands/<id>")
    print("  - DELETE /api/brands/<id>")
    
    app.run(
        host='0.0.0.0',
        port=int(os.getenv('PORT', 5000)),
        debug=os.getenv('FLASK_ENV') == 'development'
    )