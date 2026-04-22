# 🏪 Envidriera - Backend

## 📌 Descripción

Envidriera es una plataforma web que permite a comercios crear su propia vidriera digital. Cada usuario puede registrarse, iniciar sesión y gestionar uno o varios negocios.

---

## 🚀 Tecnologías utilizadas

* Node.js
* Express
* MySQL
* Sequelize (ORM)
* JWT (autenticación)
* bcrypt (encriptación de contraseñas)

---

## 📁 Estructura del proyecto

```
src/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middleware/
 ├── config/
 └── server.js
```

---

## ⚙️ Configuración inicial

1. Clonar el repositorio
2. Instalar dependencias:

```
npm install
```

3. Crear archivo `.env`:

```
DB_NAME=envidriera
DB_USER=root
DB_PASSWORD=tu_password
DB_HOST=localhost
JWT_SECRET=secret123
```

4. Crear base de datos en MySQL:

```
CREATE DATABASE envidriera;
```

5. Ejecutar el servidor:

```
npm run dev
```

---

## 🔐 Autenticación

El sistema utiliza JWT para autenticar usuarios.

### Flujo:

1. Registro
2. Login
3. Recepción de token
4. Uso del token en rutas protegidas

---

## 📡 Endpoints

### 🧑‍💻 Registro

**POST** `/api/users/register`

Body:

```
{
  "name": "Diego",
  "email": "diego@test.com",
  "password": "123456"
}
```

---

### 🔐 Login

**POST** `/api/users/login`

Body:

```
{
  "email": "diego@test.com",
  "password": "123456"
}
```

Respuesta:

```
{
  "token": "JWT_TOKEN"
}
```

---

### 👤 Perfil (protegido)

**GET** `/api/users/profile`

Header:

```
Authorization: Bearer TOKEN
```

---

### 🏪 Crear negocio

**POST** `/api/business`

Header:

```
Authorization: Bearer TOKEN
```

Body:

```
{
  "name": "Mi tienda",
  "description": "Venta de ropa"
}
```

---

### 📋 Listar negocios del usuario

**GET** `/api/business`

Header:

```
Authorization: Bearer TOKEN
```

---

## 🔗 Relaciones

* Un usuario puede tener muchos negocios
* Cada negocio pertenece a un usuario

---

## 🧠 Conceptos implementados

* Autenticación con JWT
* Middleware de protección de rutas
* Encriptación de contraseñas
* Arquitectura MVC
* ORM con Sequelize

---

## ⚠️ Errores comunes

* 401 → Token inválido o faltante
* 404 → Ruta incorrecta
* 500 → Error en backend (revisar consola)

---

## 🛠️ Comandos útiles

```
npm run dev
rs (reiniciar nodemon)
```

---

## 📌 Estado actual del proyecto

✅ Registro de usuarios
✅ Login con JWT
✅ Middleware de autenticación
✅ Creación de negocios
✅ Listado de negocios por usuario

---

## 🚀 Próximos pasos

* Crear modelo Product
* Asociar productos a negocios
* Implementar CRUD completo
* Crear frontend en React

---

## 💡 Notas

Este proyecto forma parte de una práctica para construir un SaaS real desde cero, aplicando buenas prácticas de desarrollo backend.
