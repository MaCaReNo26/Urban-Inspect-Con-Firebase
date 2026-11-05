# UrbanInspect - Sistema de Inspección Urbana

Aplicación móvil híbrida desarrollada con **Ionic Framework (Standalone Components)** y **Capacitor**, diseñada para inspectores de campo encargados de registrar, geolocalizar, fotografiar y dar seguimiento a incidencias urbanas (baches, luminarias dañadas, etc.).

---

## Características Principales y Arquitectura
- **Listado y Paginación Remota (Tab 1):** Consumo de datos desde una API REST en la nube (**MockAPI**) con soporte de *Infinite Scroll* y *Pull-to-Refresh* manual para evitar problemas de caché en dispositivos móviles.
- **Registro en Campo (Tab 2):** Formulario con validaciones estrictas, captura de coordenadas reales mediante `@capacitor/geolocation`, consulta meteorológica en tiempo real con **Open-Meteo API**, y compresión inteligente de evidencias fotográficas para evitar errores de servidor (*HTTP 413 Payload Too Large*).
- **Seguimiento Local (Tab 3):** Almacenamiento privado y persistente en el dispositivo mediante `@capacitor/preferences` para marcar incidencias prioritarias sin saturar el servidor central.
- **Gestión de Estados (Modal de Detalles):** Visualización detallada de la incidencia con opción de actualizar estados (*Pendiente* ➔ *En Proceso* ➔ *Resuelta*) requiriendo obligatoriamente una observación de cierre.
- **Diseño Monocromático Profesional:** Interfaz adaptada con una paleta de colores basada en negro y rojo, iconos personalizados y *Splash Screen* nativa generada con `@capacitor/assets`.

---

## Requisitos e Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/MaCaReNo26/Urban-Inspect-Con-Firebase.git
   cd urbaninspect


## Tecnologías utilizadas

- **Ionic:** desarrollo de la interfaz de la aplicación móvil.
- **Angular:** estructura y lógica de la aplicación.
- **Capacitor:** integración y generación de la aplicación para Android.
- **MockAPI:** servicio utilizado para gestionar los datos de las incidencias.

## Ejecución del proyecto

Instalar las dependencias:

```bash
npm install
```

Ejecutar la aplicación en el navegador:

```bash
ionic serve
```

---

- **Autenticación y Gestión de Usuarios (Firebase Authentication):** Registro de usuarios e inicio de sesión mediante correo electrónico y contraseña, con validación de credenciales, cierre de sesión y protección de las rutas principales para permitir el acceso únicamente a usuarios autenticados.
- **Despliegue Web (Firebase Hosting):** Publicación de la aplicación web mediante Firebase Hosting, proporcionando acceso remoto a través de un dominio HTTPS.

- 

## Firebase: Autenticación y Hosting

El proyecto integra Firebase para gestionar la autenticación de usuarios y facilitar el despliegue de la aplicación web.

### Firebase Authentication

Se utiliza el servicio de autenticación de Firebase con correo electrónico y contraseña. Entre sus funcionalidades se encuentran:

- Registro de nuevos usuarios.
- Inicio de sesión.
- Validación de credenciales.
- Protección de las rutas principales mediante un guard de autenticación.
- Cierre de sesión.

### Firebase Hosting

La aplicación web se encuentra desplegada mediante Firebase Hosting y puede accederse desde el siguiente enlace:

**Aplicación web:** https://urbaninspect-e6875.web.app

### Comandos para actualizar el despliegue

```bash
npm install
ionic build
firebase deploy --only hosting

