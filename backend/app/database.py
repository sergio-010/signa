import os
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Inicializar SQLAlchemy
db = SQLAlchemy()

def init_db(app):
    """Inicializar la base de datos con la aplicación Flask"""
    
    # Intentar usar PostgreSQL primero, si no funciona usar SQLite
    database_url = os.getenv('DATABASE_URL')
    
    if database_url and database_url.startswith('postgresql://'):
        # Si psycopg2 no está disponible, usar SQLite como fallback
        try:
            import psycopg2
            app.config['SQLALCHEMY_DATABASE_URI'] = database_url
            print("✅ Usando PostgreSQL (Neon)")
        except ImportError:
            print("⚠️  psycopg2 no disponible, usando SQLite como fallback")
            app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///brands.db'
    else:
        # Usar SQLite por defecto para desarrollo
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///brands.db'
        print("🔧 Usando SQLite para desarrollo")
    
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
        'pool_pre_ping': True,
        'pool_recycle': 300,
    }
    
    # Inicializar la base de datos con la app
    db.init_app(app)
    
    return db