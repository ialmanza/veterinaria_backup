# Aplicación de Gestión de Perros - Veterinaria

Esta aplicación web está diseñada para gestionar de manera eficiente la información de perros en una veterinaria. Ofrece funcionalidades avanzadas como el seguimiento del historial médico, comparación de peso, adopciones y más, todo presentado en una interfaz intuitiva y fácil de usar.

## Características Principales
- **Gestión de Perros**: Registro, edición y eliminación de datos de los perros.
- **Historial Médico**: Seguimiento de vacunas y variaciones de peso a lo largo del tiempo.
- **Sistema de Adopciones**: Administración de perros disponibles para adopción.
- **Visualización Gráfica**: Gráficos interactivos para analizar datos médicos.
- **Filtros Avanzados**: Filtrado de perros por criterios como estado (adoptado, fallecido).
- **Interfaz Dinámica**: Ventanas modales para la edición y eliminación de perros.

## Tecnologías Utilizadas
- **Frontend:** Angular
- **Backend:** Supabase
- **Base de Datos:** Postgres (a través de Supabase)
- **Styling:** Tailwind CSS y Material Design

## Cómo Ejecutar el Proyecto
Sigue estos pasos para clonar, instalar y ejecutar el proyecto en tu máquina local:

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/ialmanza/veterinaria_backup.git
2. **Instalar las dependencias**:
   cd veterinaria_backup
   npm install
3. **Iniciar la aplicación**:
   ng serve
4. Abre tu navegador y navega a http://localhost:4200.
   
## Estructura del Proyecto

- `veterinaria_backup/`
  - `src/`
    - `app/`
      - `components/`
        - `crear-perro/` - Componente para crear un perro.
        - `editar/`
          - `dialog-content-edit-example-dialog/`
        - `comparar-peso/` - Comparación de pesos entre periodos.
        - `filtrar-por/` - Filtrar perros por estado.
        - `grafico/` - Gráficos interactivos.
        - `listar-perros/` - Listado de todos los perros.
        - `menu/` - Menú principal.
        - `navigation/` - Navegación de la aplicación.
        - `adoptado/` - Gestión de perros adoptados.
        - `perro-muerto/` - Gestión de perros fallecidos.
        - `ventana-modal-editar-perro/` - Modal para editar perro.
          - `dialog-content-edit-example-dialog/`
        - `ventana-modal-eliminar-perro/` - Modal para eliminar perro.
          - `dialog-animations-example-dialog/`
    - `services/` - Servicios para manejar datos.
    - `models/` - Modelos de datos.
  - `assets/` - Archivos estáticos (imágenes, estilos).
  - `environments/` - Configuración de entornos.


## Contribuciones
¡Tu colaboración es bienvenida! Sigue estos pasos para contribuir:
1. Hacer un fork del repositorio
2. Crear una nueva rama
   git checkout -b nombre-de-tu-rama
3. Realizar los cambios necesarios
4. Realizar un commit con un mensaje descriptivo:
  git commit -m "Descripción de los cambios"
5. Enviar un Pull Request.

## Licencia
Este proyecto está licenciado bajo la MIT License.

## Agradecimientos
Un agradecimiento especial a todos los que apoyaron en el desarrollo de este proyecto, incluyendo recursos de la comunidad y documentación de Angular y Supabase.
