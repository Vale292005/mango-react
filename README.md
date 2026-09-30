# 🥭 MANGOA - Frontend (Plataforma de Reservas Web)

¡Bienvenido al repositorio **Frontend** de **MANGOA**! Esta es la aplicación web para la consulta y gestión de alojamientos y reservas, desarrollada con **React** y **Vite**, integrada de forma segura mediante **JWT** con el servicio Backend en Spring Boot.

---

## 🚀 Tecnologías Utilizadas

- **Framework Frontend:** [React](https://react.dev/) (JavaScript ES6+)
- **Herramienta de Construcción:** [Vite](https://vitejs.dev/)
- **Navegación / Rutado:** React Router DOM
- **Cliente HTTP:** Axios / Fetch API
- **Estilos:** HTML5, CSS3 / Bootstrap 5
- **Integración Backend:** Java, Spring Boot 3, Spring Security, JWT (JSON Web Tokens)

---

## ✨ Características Principales

- **Exploración de Alojamientos:** Interfaz dinámica para la búsqueda, filtrado y consulta de detalles de propiedades.
- **Autenticación y Seguridad con JWT:**
  - Formulario de Inicio de Sesión y Registro.
  - Almacenamiento y gestión de tokens de acceso (`Bearer Token`) en el cliente.
  - Interceptores HTTP para enviar el token JWT automáticamente en las peticiones protegidas.
- **Manejo de Roles y Permisos:** Control de acceso en vistas y componentes según el rol del usuario (Cliente / Administrador).
- **Diseño Responsivo:** Adaptado para una navegación fluida en todos los dispositivos.

---

## 🛠️ Requisitos Previos

Asegúrate de contar con las siguientes herramientas en tu entorno local:

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [npm](https://www.npmjs.com/) o [pnpm](https://pnpm.io/)
- Servidor **Backend de Mangoa** (Spring Boot 3) en ejecución.

---

## 📦 Instalación y Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/Vale292005/mango-react.git](https://github.com/Vale292005/mango-react.git)
   cd mango-react
