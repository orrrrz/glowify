# Glowify - Tu Asistente de Lectura en la Web

Inglés | [中文版](README_zh-CN.md) | [日本語版](README_ja.md)

## Actualizaciones (2025.01.02)

- Glowify está disponible en la tienda web de Google, puedes instalarlo [aquí](https://chromewebstore.google.com/detail/glowify-your-reading-assi/cponpggghojjgjglfpcagclobgcghjig?authuser=0&hl=es).

## Introducción
Glowify es una extensión de Chrome impulsada por tecnología LLM que mejora tu experiencia de lectura en línea al traducir, explicar y comentar el texto que seleccionas y su contexto circundante.

## Características
- **Traducción Contextual:** Traduce sin esfuerzo el texto seleccionado a tu idioma preferido para una experiencia de lectura más accesible.

- **Explicaciones Instantáneas:** Recibe explicaciones inmediatas para cualquier texto resaltado para mejorar tu comprensión.

- **Resaltar y Anotar:** Resalta sin problemas el texto en cualquier página web y añade comentarios. Tus anotaciones son persistentes y permanecerán intactas incluso después de recargar la página (requiere una base de datos de Notion, pero es opcional).

## Instalación

### 1. Instalar desde la tienda web de Google.
   Puedes instalarlo directamente desde [Google Web Store](https://chromewebstore.google.com/detail/glowify-your-reading-assi/cponpggghojjgjglfpcagclobgcghjig?authuser=0&hl=es).

### 2. Instalar desde el código fuente.

1. **Clona el Repositorio:**
   ```bash
   git clone https://github.com/orrrrz/glowify.git
   ```

   O puedes simplemente descargar el archivo zip desde [aquí](https://github.com/orrrrz/glowify/blob/master/release/glowify-v1.0.2.zip)

2. **Abre la Página de Extensiones de Chrome:**
   Navega a `chrome://extensions` en tu navegador Chrome.

3. **Habilita el Modo de Desarrollador:**
   Activa el interruptor "Modo de desarrollador" ubicado en la esquina superior derecha.

4. **Carga la Extensión Desempaquetada:**
   Haz clic en el botón "Cargar descomprimido" y selecciona la carpeta del repositorio clonado.

## Comenzando

### Uso Básico

Cuando Glowify esté correctamente instalado, deberías ver un ícono de Glowify en la barra de herramientas de tu navegador. Antes de que pueda ser útil, necesitas abrir la página de opciones y completar las configuraciones básicas, la más importante es la clave de API de LLM. Si deseas sincronizar tus resaltados con Notion, también necesitas configurar la base de datos y el token de Notion. Consulta la siguiente sección para más detalles.

Luego, simplemente selecciona algún texto y la barra de herramientas de Glowify aparecerá. Puedes elegir la acción que deseas realizar.

También puedes abrir el panel lateral desde el menú contextual, donde puedes ver, ocultar/mostrar o eliminar todos tus resaltados.

### Sincronización con Notion

1. **Crea una Integración de Notion:**
   - Visita [Integraciones de Notion](https://www.notion.so/my-integrations).
   - Haz clic en "Crear nueva integración" y obtén tu clave de API.

2. **Configura la Base de Datos de Notion:**
   - **Opción 1:** Crea manualmente una base de datos con las siguientes propiedades:
     - `excerpt` (Título)
     - `pageUrl` (URL)
     - `highlightId` (Texto enriquecido)
     - `pageTitle` (Texto enriquecido)
     - `comment` (Texto enriquecido)
     - `created` (Fecha)
     - `updated` (Fecha)
     - `occurrence` (Texto enriquecido)
   - **Opción 2:** [Recomendado] Clona la [Plantilla de Base de Datos de Notion de Glowify](https://www.notion.so/ce34483fe9d048a380d850d682fae25d?v=fff36e411feb814b8b80000c46bb500a).

3. **Configura Glowify:**
   - Navega a la página de opciones de Glowify.
   - Ingresa tu ID de Base de Datos de Notion y clave de API.
   - Haz clic en "Guardar" para finalizar la configuración.

## Soporte

Si encuentras algún problema o tienes preguntas, no dudes en abrir un problema en GitHub o enviarme un correo electrónico a [lcm.hust@gmail.com](mailto:lcm.hust@gmail.com).

## Licencia

Este proyecto está licenciado bajo la [Licencia MIT](LICENSE).
