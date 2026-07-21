# Halo Armory — Catálogo Táctico de Armas y Vehículos

Aplicación web dinámica y responsiva sobre el universo de **Halo**: un catálogo
público de armas y vehículos, con panel de administrador (login) para gestionar
el contenido (CRUD completo).

- **Frontend:** React + Vite
- **Backend:** Django + Django REST Framework + JWT
- **Base de datos:** MySQL (relacional, 2 tablas: `Weapon` y `Vehicle`)

---

## 1. Estructura del proyecto

```
halo-armory/
├── backend/        → API REST en Django (MySQL)
└── frontend/        → SPA en React (Vite)
```

## 2. Modelo de datos

Dos tablas relacionadas por el mismo dominio (catálogo), cada una con 6 campos
y 4 tipos de datos distintos:

| Tabla     | Campo                | Tipo                     |
|-----------|-----------------------|--------------------------|
| Weapon    | nombre                | varchar                  |
|           | tipo                  | varchar (choices)        |
|           | dano                  | int                      |
|           | fecha_introduccion    | date                     |
|           | descripcion           | text                     |
|           | imagen_url            | varchar (url)            |
| Vehicle   | nombre                | varchar                  |
|           | tipo                  | varchar (choices)        |
|           | capacidad             | int                      |
|           | fecha_introduccion    | date                     |
|           | descripcion           | text                     |
|           | imagen_url            | varchar (url)            |

## 3. Backend — puesta en marcha local

```bash
cd backend
python3 -m venv venv
source venv/bin/activate          # En Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Crea tu base de datos en MySQL (usando tu cliente MySQL, phpMyAdmin, etc.):

```sql
CREATE DATABASE halo_armory CHARACTER SET utf8mb4;
CREATE USER 'halo_user'@'%' IDENTIFIED BY 'TU_PASSWORD_AQUI';
GRANT ALL PRIVILEGES ON halo_armory.* TO 'halo_user'@'%';
FLUSH PRIVILEGES;
```

Copia el archivo de variables de entorno y ajusta tus credenciales:

```bash
cp .env.example .env
```

Edita `.env` con tus datos de conexión (`DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`).

Corre las migraciones (esto también sembrará el catálogo inicial de armas y
vehículos automáticamente) y crea tu usuario administrador:

```bash
python3 manage.py migrate
python3 manage.py createsuperuser
python3 manage.py runserver
```

La API quedará disponible en `http://127.0.0.1:8000/api/`.

### Endpoints principales

| Método | Ruta                     | Descripción                              | Auth requerida |
|--------|--------------------------|-------------------------------------------|----------------|
| GET    | `/api/weapons/`          | Listar armas                              | No             |
| POST   | `/api/weapons/`          | Crear arma                                | Sí (admin)     |
| PUT    | `/api/weapons/{id}/`     | Editar arma                               | Sí (admin)     |
| DELETE | `/api/weapons/{id}/`     | Eliminar arma                             | Sí (admin)     |
| GET    | `/api/vehicles/`         | Listar vehículos                          | No             |
| POST/PUT/DELETE | `/api/vehicles/...` | Igual que weapons                     | Sí (admin)     |
| POST   | `/api/auth/login/`       | Login (usuario + contraseña) → JWT        | No             |
| POST   | `/api/auth/refresh/`     | Refrescar access token                    | No             |
| GET    | `/api/auth/me/`          | Datos del usuario autenticado             | Sí             |

También tienes disponible `/admin/` — el panel de administración nativo de
Django, con tu mismo superusuario.

## 4. Frontend — puesta en marcha local

```bash
cd frontend
npm install
cp .env.example .env       # ajusta VITE_API_URL si tu backend corre en otra URL
npm run dev
```

Abre `http://localhost:5173`. Inicia sesión en "Acceso Admin" con el
superusuario que creaste en el backend para gestionar el catálogo.

Para generar el build de producción:

```bash
npm run build
```

Esto genera la carpeta `dist/`, lista para desplegar en Netlify (u otra
plataforma de hosting estático).

## 5. Notas para el despliegue en producción

- **Backend (Render/Railway):** configura las variables de entorno del
  `.env.example` en el panel del servicio, además de una base de datos MySQL
  gestionada (Railway y Render ofrecen add-ons de MySQL/PlanetScale). No
  olvides poner `DEBUG=False` y agregar el dominio real en `ALLOWED_HOSTS`.
- **CORS:** agrega la URL final de tu frontend (ej. `https://tu-app.netlify.app`)
  a `CORS_ALLOWED_ORIGINS` en el `.env` del backend.
- **Frontend (Netlify):** configura `VITE_API_URL` apuntando a la URL pública
  de tu backend (ej. `https://tu-backend.onrender.com/api`) como variable de
  entorno del sitio en Netlify, y usa `npm run build` con carpeta de
  publicación `dist`.
- Recuerda crear el superusuario de producción (`python manage.py createsuperuser`)
  directamente en el servidor desplegado, ya que las credenciales de prueba
  locales no deben usarse en producción.
