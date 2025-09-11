# API de Gestión de Idols, Bandas y Empresas

## Descripción
API REST para gestionar información de idols, bandas y empresas del mundo del K-pop y entretenimiento.

## Base URL
```
http://localhost:3000/api/v1
```

## Autenticación
Todas las rutas (excepto login/register) requieren un token JWT en el header:
```
Authorization: Bearer <token>
```

## Endpoints

### Usuarios

#### POST /users/register
Registrar un nuevo usuario
```json
{
  "username": "usuario123",
  "password": "password123"
}
```

#### POST /users/login
Iniciar sesión
```json
{
  "username": "usuario123",
  "password": "password123"
}
```

### Empresas

#### POST /companies
Crear una nueva empresa
```json
{
  "name": "SM Entertainment",
  "koreanName": "에스엠엔터테인먼트",
  "englishName": "SM Entertainment",
  "foundedDate": "1995-02-14",
  "ceo": "Lee Soo-man",
  "headquarters": "Seoul, South Korea",
  "country": "South Korea",
  "businessType": "Entertainment"
}
```

#### GET /companies
Obtener todas las empresas (con paginación)
```
GET /companies?page=1&limit=10&isActive=true&country=South Korea
```

#### GET /companies/:id
Obtener empresa por ID

#### PUT /companies/:id
Actualizar empresa

#### DELETE /companies/:id
Eliminar empresa

#### GET /companies/:id/bands
Obtener bandas de una empresa

#### GET /companies/:id/idols
Obtener idols de una empresa

#### GET /companies/:id/stats
Obtener estadísticas de una empresa

#### GET /companies/search?q=SM
Buscar empresas

### Bandas

#### POST /bands
Crear una nueva banda
```json
{
  "name": "Red Velvet",
  "koreanName": "레드벨벳",
  "englishName": "Red Velvet",
  "debutDate": "2014-08-01",
  "companyId": "64f8a1b2c3d4e5f6a7b8c9d0",
  "fandomName": "ReVeluv",
  "genre": "K-pop",
  "totalMembers": 5
}
```

#### GET /bands
Obtener todas las bandas
```
GET /bands?page=1&limit=10&companyId=64f8a1b2c3d4e5f6a7b8c9d0&isActive=true&genre=K-pop
```

#### GET /bands/:id
Obtener banda por ID

#### PUT /bands/:id
Actualizar banda

#### DELETE /bands/:id
Eliminar banda

#### POST /bands/:id/members
Agregar miembro a una banda
```json
{
  "idolId": "64f8a1b2c3d4e5f6a7b8c9d1"
}
```

#### DELETE /bands/:id/members/:idolId
Remover miembro de una banda

#### GET /bands/search?q=Red Velvet
Buscar bandas

### Idols

#### POST /idols
Crear un nuevo idol
```json
{
  "name": "Irene",
  "stageName": "아이린",
  "realName": "Bae Joo-hyun",
  "birthDate": "1991-03-29",
  "nationality": "South Korean",
  "position": "Leader, Main Rapper, Lead Dancer, Visual",
  "specialty": "Dance, Rap",
  "height": 158,
  "weight": 44,
  "bloodType": "A+",
  "zodiacSign": "Aries",
  "bandId": "64f8a1b2c3d4e5f6a7b8c9d0",
  "companyId": "64f8a1b2c3d4e5f6a7b8c9d0"
}
```

#### GET /idols
Obtener todos los idols
```
GET /idols?page=1&limit=10&bandId=64f8a1b2c3d4e5f6a7b8c9d0&companyId=64f8a1b2c3d4e5f6a7b8c9d0&isActive=true
```

#### GET /idols/:id
Obtener idol por ID

#### PUT /idols/:id
Actualizar idol

#### DELETE /idols/:id
Eliminar idol

#### GET /idols/search?q=Irene
Buscar idols

## Códigos de Respuesta

- `200` - Éxito
- `201` - Creado exitosamente
- `400` - Error de validación
- `401` - No autorizado
- `404` - No encontrado
- `500` - Error del servidor

## Ejemplos de Uso

### Flujo típico de creación:

1. **Crear empresa:**
```bash
curl -X POST http://localhost:3000/api/v1/companies \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "SM Entertainment",
    "koreanName": "에스엠엔터테인먼트",
    "ceo": "Lee Soo-man",
    "country": "South Korea"
  }'
```

2. **Crear banda:**
```bash
curl -X POST http://localhost:3000/api/v1/bands \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Red Velvet",
    "companyId": "<company_id>",
    "fandomName": "ReVeluv"
  }'
```

3. **Crear idol:**
```bash
curl -X POST http://localhost:3000/api/v1/idols \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Irene",
    "stageName": "아이린",
    "bandId": "<band_id>",
    "companyId": "<company_id>"
  }'
```

4. **Agregar idol a banda:**
```bash
curl -X POST http://localhost:3000/api/v1/bands/<band_id>/members \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "idolId": "<idol_id>"
  }'
``` 