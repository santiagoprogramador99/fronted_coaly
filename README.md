# Task Manager Frontend

Este proyecto es el frontend de un sistema de gestión de tareas. Permite a los usuarios gestionar, editar, eliminar, y marcar tareas como completadas o pendientes. Está construido con **React.js** y utiliza **Tailwind CSS** para el diseño. La aplicación está integrada con una API de backend para la gestión de las tareas.

## Funcionalidades

- **Pantalla principal con lista de tareas:**
  - Cada tarea muestra:
    - Título
    - Estado (completada o pendiente)
    - Fecha de creación
  - Botones para editar o eliminar una tarea.
  
- **Formulario para agregar una nueva tarea.**

- **Marcar tareas como completadas o pendientes** directamente desde la lista.

- **Filtro para visualizar tareas**:
  - Todas
  - Completadas
  - Pendientes
  
- **Diseño responsivo** para dispositivos de escritorio y móviles.

## Requerimientos técnicos

- **Librerías utilizadas:**
  - **React.js** para la creación de la interfaz de usuario.
  - **Tailwind CSS** para el diseño y estilización de la aplicación.
  - **Context API** para el manejo del estado global (o **Redux** si prefieres usarlo).
  
- **Integración con Backend:**
  - Las operaciones de la aplicación están conectadas con la API del backend (GET, POST, PUT, DELETE).
  
- **Manejo de errores:**
  - Los errores de la API se gestionan y muestran mensajes claros al usuario para una mejor experiencia.

## Instalación y ejecución del proyecto localmente

### Requisitos previos

- Tener **Node.js** y **npm** instalados en tu máquina.
  Puedes verificar si ya los tienes instalados ejecutando:
  ```bash
  node -v
  npm -v
