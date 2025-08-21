# 🏢 Sistema de Gestión de Marcas - Signa

Este es un monorepo que contiene una aplicación completa para la gestión de marcas comerciales, desarrollada con **Next.js** (frontend) y **Flask** (backend).

## � Información de la Prueba Técnica

### 🌐 a) Link de Acceso Público

- **Frontend (Interfaz de Usuario)**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000`

> **Nota**: Para acceso público, la aplicación debe desplegarse en servicios como Vercel (frontend) y Railway/Render (backend)

### 📚 b) Librerías Utilizadas

#### Frontend (Next.js)

```json
{
  "@hookform/resolvers": "^5.2.1",
  "@radix-ui/react-dropdown-menu": "^2.1.2",
  "@radix-ui/react-icons": "^1.3.2",
  "@radix-ui/react-label": "^2.1.7",
  "@radix-ui/react-select": "^2.2.6",
  "@radix-ui/react-separator": "^1.1.0",
  "@radix-ui/react-slot": "^1.2.3",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "lucide-react": "^0.462.0",
  "next": "^15.0.3",
  "next-themes": "^0.4.3",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-hook-form": "^7.62.0",
  "react-hot-toast": "^2.4.1",
  "tailwind-merge": "^2.5.5",
  "tailwindcss-animate": "^1.0.7",
  "zod": "^4.0.17"
}
```

#### Backend (Flask)

```txt
Flask==3.0.0
Flask-SQLAlchemy==3.1.1
Flask-Migrate==4.0.5
Flask-CORS==4.0.0
python-dotenv==1.0.0
marshmallow==3.20.1
```

### � c) Endpoints del CRUD

| Método   | Endpoint          | Descripción                  | Parámetros                                                |
| -------- | ----------------- | ---------------------------- | --------------------------------------------------------- |
| `GET`    | `/health`         | Estado de salud del servidor | -                                                         |
| `GET`    | `/api/brands`     | Obtener todas las marcas     | `?page=1&per_page=6`                                      |
| `POST`   | `/api/brands`     | Crear nueva marca            | Body: `{brandName, trademarkOwner, status}`               |
| `GET`    | `/api/brands/:id` | Obtener marca específica     | URL: `id`                                                 |
| `PUT`    | `/api/brands/:id` | Actualizar marca             | URL: `id`, Body: `{brandName?, trademarkOwner?, status?}` |
| `DELETE` | `/api/brands/:id` | Eliminar marca               | URL: `id`                                                 |

```
signa/
├── 🌐 Frontend (Next.js)
│   ├── src/
│   │   ├── app/                 # App Router de Next.js
│   │   │   ├── actions/         # Server Actions para API
│   │   │   ├── records/         # Páginas de gestión de marcas
│   │   │   └── ...
│   │   ├── components/          # Componentes reutilizables
│   │   │   ├── Table.tsx        # Tabla de marcas
│   │   │   ├── Modal.tsx        # Modal para formularios
│   │   │   └── ...
│   │   └── services/            # Servicios para API
│   │       └── brandService.ts  # Cliente HTTP para backend
│   └── package.json
│
├── 🐍 Backend (Flask + SQLAlchemy)
│   ├── app/
│   │   ├── database.py          # Configuración de base de datos
│   │   ├── models.py            # Modelo Brand
│   │   ├── schemas.py           # Validación con Marshmallow
│   │   └── routers/
│   │       └── brands.py        # Endpoints CRUD
│   ├── main.py                  # Aplicación principal
│   └── requirements.txt
│
└── README.md                    # Este archivo
```

---

## 🚀 Instalación y Ejecución

### Prerrequisitos

- **Node.js** 18+
- **Python** 3.8+
- **Git**

### Método 1: Script Automático (Recomendado)

#### Windows:

```bash
setup.bat
```

#### macOS/Linux:

```bash
chmod +x setup.sh
./setup.sh
```

### Método 2: Configuración Manual

#### Frontend:

```bash
npm install
npm run dev
```

#### Backend:

```bash
cd backend
python -m venv venv
source venv/Scripts/activate  # Windows
source venv/bin/activate       # macOS/Linux
pip install -r requirements.txt
python main.py
```

## 🗄️ Base de Datos

**PostgreSQL (Neon)**:

```env
DATABASE_URL="postgresql://neondb_owner:npg_TvSknfYmOX45@ep-withered-rain-admo5nv7-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
```

- **Frontend**: Se conecta al backend Flask vía API REST
- **Backend**: Se conecta directamente a PostgreSQL vía SQLAlchemy (con fallback a SQLite para desarrollo)

## 🌍 Variables de Entorno

### Frontend (`.env`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Backend (`.env`)

```env
DATABASE_URL="postgresql://..."
FLASK_ENV=development
FLASK_DEBUG=True
```

## �️ Tecnologías

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, React Hook Form, Zod
- **Backend**: Flask, SQLAlchemy, Marshmallow, Flask-CORS
- **Base de Datos**: PostgreSQL (Neon) con fallback SQLite
- **Arquitectura**: API REST, Separación Frontend/Backend

## �📋 Funcionalidades

- ✅ **CRUD completo de marcas**
- ✅ **Paginación**
- ✅ **Validación de formularios**
- ✅ **Manejo de errores**
- ✅ **API REST**
- ✅ **Base de datos compartida**
- ✅ **Interfaz responsive**

---

**Desarrollado para Signa - Prueba Técnica** 🚀
