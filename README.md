# Vista de Podcast con Next.js, React, Redux y Local Storage Cache

Esta aplicación es una vista de podcast construida utilizando Next.js, React y Redux. Además, se utiliza Local Storage para cachear datos. La aplicación cuenta con las funciones de desarrollo, construcción y modo de producción, y cumple con los requisitos mínimos de Node.js v16.

## Características

- Vista Principal: Muestra una lista de podcasts disponibles.
- Detalles de un Podcast: Muestra información detallada sobre un podcast específico.
- Detalles de un Capítulo: Muestra información detallada sobre un capítulo de un podcast.

## Requisitos Previos

- Node.js v16: Asegúrate de tener Node.js v16 instalado en tu sistema.
- npm: Gestor de paquetes de Node.js. Se utiliza para instalar dependencias y ejecutar comandos.

## Instalación

1. Clona este repositorio: `git clone https://github.com/tu-usuario/tu-repositorio.git`
2. Navega al directorio del proyecto: `cd tu-repositorio`
3. Instala las dependencias: `npm install`

## Comandos Disponibles

- Desarrollo: `npm run dev` - Inicia el servidor de desarrollo.
- Construcción: `npm run build` - Compila el proyecto para producción.
- Modo Producción: `npm run start` - Inicia la aplicación en modo de producción.

## Estructura del Proyecto

El proyecto está estructurado de la siguiente manera:

├── /components # Componentes React reutilizables
├── /pages # Páginas de la aplicación
├── /redux # Configuración de Redux y acciones
├── /styles # Estilos CSS
├── /utils # Utilidades y funciones auxiliares
└── /public # Archivos públicos
