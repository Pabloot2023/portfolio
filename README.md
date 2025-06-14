# Portafolio de Andrés

rollback a https://github.com/Pabloot2023/portfolio-andres/commit/dbd577377d15dc2578179aee85faf2f4070ae77f

Muestra automáticamente los repositorios que contienen un archivo `project.config.json` con información del proyecto.

Desarrollado en Next.js + TailwindCSS, y desplegado en Vercel.

Este proyecto fue renombrado correctamente.

se modifica project.config.json v3.1

# Portfolio Personal

## CI/CD Pipeline

Este proyecto utiliza GitHub Actions para implementar un pipeline de CI/CD que:

- Ejecuta tests automatizados con Playwright
- Despliega automáticamente a Vercel cuando los tests pasan
- Previene deploys a producción si hay errores en los tests

### Workflow

1. **Tests**: Se ejecutan en cada push y pull request
   - Verifica el funcionamiento del tema claro/oscuro
   - Asegura la correcta navegación
   - Valida la responsividad

2. **Deploy**: Se ejecuta solo en pushes a main
   - Requiere que todos los tests pasen
   - Despliega automáticamente a Vercel
   - Mantiene la calidad del código en producción

   cambio neutro para test visual
