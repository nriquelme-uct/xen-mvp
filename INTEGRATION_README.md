# Xen-MVP - Integración Frontend-Backend

## 🚀 Descripción del Proyecto

Este es un MVP de una aplicación de gestión de fitness que incluye:
- **Backend**: API REST con Node.js, Express y MongoDB
- **Frontend**: React.js con Bootstrap
- **Funcionalidades**: Gestión de alimentos, entrenamientos y clientes

## 📋 Funcionalidades Implementadas

### Backend (API REST)
- ✅ Autenticación con JWT
- ✅ Gestión de usuarios
- ✅ CRUD de alimentos con información nutricional
- ✅ CRUD de entrenamientos con ejercicios
- ✅ CRUD de clientes
- ✅ Búsquedas y filtros avanzados
- ✅ Paginación
- ✅ Validación de datos con Joi
- ✅ Middleware de seguridad

### Frontend (React)
- ✅ Autenticación (login/register)
- ✅ Gestión de estado con Context API
- ✅ Formularios para crear alimentos y entrenamientos
- ✅ Tablas con filtros y búsquedas
- ✅ Interfaz responsive con Bootstrap
- ✅ Integración completa con la API

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js (v16 o superior)
- MongoDB (local o Atlas)
- npm o yarn

### 1. Configuración del Backend

```bash
# Navegar a la carpeta del backend
cd src/api

# Instalar dependencias
npm install

# Crear archivo de configuración
cp env.example .env

# Editar el archivo .env con tus configuraciones
# MONGO_URI=mongodb://localhost:27017/xen-mvp
# JWT_SECRET=tu_jwt_secret_muy_seguro_aqui
# PORT=3000

# Iniciar el servidor
npm run dev
```

### 2. Configuración del Frontend

```bash
# Navegar a la raíz del proyecto
cd ../..

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

## 🌐 URLs de Acceso

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Documentación API**: http://localhost:3000/api/v1

## 📚 Endpoints de la API

### Autenticación
- `POST /api/v1/users/register` - Registro de usuario
- `POST /api/v1/users/login` - Inicio de sesión

### Alimentos
- `GET /api/v1/foods` - Listar alimentos
- `POST /api/v1/foods` - Crear alimento
- `GET /api/v1/foods/:id` - Obtener alimento
- `PUT /api/v1/foods/:id` - Actualizar alimento
- `DELETE /api/v1/foods/:id` - Eliminar alimento
- `GET /api/v1/foods/search` - Buscar alimentos
- `GET /api/v1/foods/stats` - Estadísticas de alimentos

### Entrenamientos
- `GET /api/v1/trainings` - Listar entrenamientos
- `POST /api/v1/trainings` - Crear entrenamiento
- `GET /api/v1/trainings/:id` - Obtener entrenamiento
- `PUT /api/v1/trainings/:id` - Actualizar entrenamiento
- `DELETE /api/v1/trainings/:id` - Eliminar entrenamiento
- `PUT /api/v1/trainings/:id/complete` - Marcar como completado
- `GET /api/v1/trainings/search` - Buscar entrenamientos
- `GET /api/v1/trainings/stats` - Estadísticas de entrenamientos

### Clientes
- `GET /api/v1/clients` - Listar clientes
- `POST /api/v1/clients` - Crear cliente
- `GET /api/v1/clients/:id` - Obtener cliente
- `PUT /api/v1/clients/:id` - Actualizar cliente
- `DELETE /api/v1/clients/:id` - Eliminar cliente
- `GET /api/v1/clients/search` - Buscar clientes
- `GET /api/v1/clients/stats` - Estadísticas de clientes

## 🔧 Estructura del Proyecto

```
xen-mvp/
├── src/
│   ├── api/                    # Backend
│   │   ├── controllers/        # Controladores
│   │   ├── models/            # Modelos de MongoDB
│   │   ├── routes/            # Rutas de la API
│   │   ├── middleware/        # Middleware personalizado
│   │   ├── validators/        # Validadores Joi
│   │   └── app.js            # Servidor principal
│   ├── components/            # Componentes React
│   ├── contexts/              # Context API
│   ├── services/              # Servicios de API
│   └── main.jsx              # Punto de entrada React
├── package.json
└── README.md
```

## 🚀 Uso de la Aplicación

### 1. Registro e Inicio de Sesión
1. Ve a http://localhost:5173
2. Haz clic en "Registrarse" para crear una cuenta
3. O usa "Iniciar Sesión" si ya tienes una cuenta

### 2. Gestión de Alimentos
1. Ve a la pestaña "Food"
2. Usa "Lista de Alimentos" para ver todos los alimentos
3. Usa "Crear Alimento" para agregar nuevos alimentos
4. Filtra por categoría o busca por nombre

### 3. Gestión de Entrenamientos
1. Ve a la pestaña "Training"
2. Usa "Lista de Entrenamientos" para ver todos los entrenamientos
3. Usa "Crear Entrenamiento" para agregar nuevos entrenamientos
4. Marca entrenamientos como completados

## 🔒 Seguridad

- Todas las rutas (excepto auth) requieren autenticación JWT
- Contraseñas encriptadas con bcrypt
- Validación de datos en frontend y backend
- Headers de seguridad con Helmet
- CORS configurado correctamente

## 🐛 Solución de Problemas

### Error de conexión a MongoDB
- Verifica que MongoDB esté ejecutándose
- Revisa la URI de conexión en el archivo .env

### Error de CORS
- Asegúrate de que el frontend esté en el puerto 5173
- Verifica la configuración de CORS en el backend

### Error de autenticación
- Verifica que el JWT_SECRET esté configurado
- Revisa que el token se esté enviando correctamente

## 📝 Próximas Mejoras

- [ ] Dashboard con estadísticas
- [ ] Gráficos de progreso
- [ ] Exportación de datos
- [ ] Notificaciones push
- [ ] Modo offline
- [ ] Tests unitarios
- [ ] Documentación Swagger

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
