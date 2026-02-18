 Sistema de Clasificación Automática de Objetos
Calculadora de Impacto Hídrico - Versión 2.0


Descripción General

Sistema que evalúa objetos cotidianos según su huella hídrica y necesidad, clasificándolos en 3 categorías:
-Consumo Innecesario
-Uso Moderado
-Uso Responsable

Estructura del Código

mdjdiiriso
datos.js              Base de datos de objetos
clasificador.js       Motor de clasificación
index.html           Interfaz principal
perfil.html          Perfil del usuario
login.html           Autenticación
css                  Estilos
README.md            Documentación


Cómo Funciona

El sistema evalúa en 3 pasos:

1. Impacto Hídrico:
- Bajo (≤100L) | Medio (101-1000L) | Alto (>1000L)

2. Nivel de Necesidad:**
1: No esencial | 2: Útil | 3: Necesario

3. Clasificación:
Alto impacto + baja necesidad = Consumo innecesario
Impacto variable + necesidad media = Uso moderado
Cualquier impacto + alta necesidad =Uso responsable

Resultado

El sistema retorna:

javascript

nombre: "laptop",
litros: 20000,
impacto: "alto",
necesidad: "necesario",
categoria: "uso responsable",
explicacion: "Es un producto necesario..."

Funciones Principales

clasificarObjeto(objeto, litros)Clasificar un objeto
clasificarMultiples(lista)Clasificar varios
obtenerEstadisticas(array)Estadísticas de categorías

Interfaz

Calculadora (index.html):
Seleccionar producto
Ver clasificación automática
Mensaje educativo personalizado
Historial de búsquedas

Perfil (perfil.html):
Foto de perfil personalizable
Gráficos de categorías
Estadísticas de uso
Historial completo


 Casos de Ejemplo

Objeto Litros Necesidad Resultado

Refresco 250 No esencial Consumo Innecesario
Laptop 20,000 Necesario Uso Responsable
Lápiz 5 Necesario Uso Responsable



Agregar Nuevos Objetos

En datos.js:
javascript
const datos = 

  nuevoProducto: 500  // litros


En clasificador.js:
javascript
tblNecesidad['nuevoProducto'] = 2; nivel de necesidad


**Versión**: 2.0 | **Estado**: Completamente funcional | **Última actualización**: 14 febrero 2026
