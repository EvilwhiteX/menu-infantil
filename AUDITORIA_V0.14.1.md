# Revisión de código · V0.14.1

Fecha: 16 de octubre de 2026. Base: V0.14.0.

## Alcance

Revisión estática de los módulos propios y del código integrado en `index.html`: estado y almacenamiento, perfiles, escuela, menús, generación y sustitución, gramajes, composición y etiquetas, retención de cocción, preparaciones, compra, presentación, impresión/PDF y copias. Se comprobaron también los esquemas de los archivos de datos, identificadores, referencias de ingredientes, pesos, estados numéricos y alérgenos declarados. Las bibliotecas PDF y la fuente se conservan como dependencias con licencia; no se han reescrito ni se afirma una auditoría exhaustiva de su código de terceros.

## Fallos corregidos

1. **Compra equivocada con nombres repetidos.** La selección por nombre podía prevalecer sobre el identificador del producto. Ahora se usa el identificador exacto; la compatibilidad por nombre solo se aplica si existe una coincidencia única.
2. **Tamaño guardado sin validar al mostrarlo.** Un tamaño manipulado o corrupto podía introducir atributos en el formulario. Se admite únicamente un número entre 1 y 5.000 g, con valor inicial seguro y escape al mostrarlo.
3. **Piezas sugeridas para productos compuestos.** La búsqueda por fragmentos confundía preparados o cremas con alimentos en piezas. Ahora reconoce nombres simples y sus variantes, sin inventar piezas para productos compuestos.
4. **Guardado no atómico en varios cambios.** Perfiles, platos manuales, controles de colegio, fijación/comidas externas, semana en blanco, desmarcado y restablecimiento podían modificar el estado antes de confirmar la escritura. Ahora la sustitución se realiza después de guardar. Si falla, se conservan los datos previos; los controles de colegio y compra vuelven al estado guardado.
5. **Diferencias entre formularios y copias.** Se refuerzan límites de nombre, ingrediente, peso, estatura, restricciones, grupos y formato para evitar crear registros que después no admitiera la restauración. La edición manual comprueba también la semana y la toma.
6. **Ajustes locales inconsistentes.** Una clave de toma desconocida podía evitar la recuperación de las cinco tomas cuando todas estaban desactivadas. Se conservan únicamente las claves admitidas y se reparan los ajustes visuales no válidos.
7. **Componentes adicionales con cantidades inválidas.** No se admiten contribuciones de gramos negativos, cero o superiores al límite. Se muestran como información incompleta, sin restar nutrientes ni convertir ausencias en ceros.
8. **Propiedades heredadas en nombres.** Los diccionarios de alimentos, alias y piezas comprueban propiedades propias. Nombres como `constructor` o `__proto__` se tratan como ingredientes desconocidos, sin acceder a funciones heredadas.
9. **Presupuesto semanal del generador.** Excluye del objetivo parcial las comidas externas y las tomas fijadas sin cantidades y composición completas. No utiliza esas ausencias como una ingesta de cero para compensarlas con otros platos. La evaluación diaria y semanal usa la misma fracción conocida. Los registros escolares siguen siendo manuales y no se incluyen en la compra.
10. **Marcas antiguas y versión al imprimir.** El PDF utiliza el mismo estado de comprado que la pantalla, incluidas las marcas anteriores. La impresión muestra la versión vigente.

## Verificación

- Reproducción previa de ocho fallos; sus ocho pruebas fallaban en la base y pasan con las correcciones.
- Doce comprobaciones específicas de regresión y esquemas, incluidas las fracciones conocidas del generador y nombres de propiedades heredadas.
- Análisis sintáctico de todos los archivos JavaScript y del código integrado en el HTML.
- Regresión de perfiles, colegio, restricciones, eliminación con mínimo de un perfil, copias, fallos de almacenamiento, recuperación local, compra, escape y contraste de paleta.
- Comprobación de 480 presentaciones de 80 platos, referencias de ingredientes, 78 referencias completas y 70 componentes consultables; suma de día/semana y distinción entre información incompleta, intervalos y ceros publicados.
- Generación en límites de edad con y sin colegio; referencias para las 192 edades mensuales y tres escenarios de sexo. Conservación de platos fijados, externos y ocultos, límites de cantidades y restauración de propuestas.
- Regresiones de etiquetas, fuentes, cocción, retención USDA/Bognár, preparaciones y compartir PDF. PDF real de menú y compra, incluida la marca antigua de comprado.
- Navegador local con perfil ficticio: edición manual, compra de patata de 300 g, marca conservada al recargar, activación del colegio y nueva generación sin comida escolar. Sin errores de consola en esos flujos.

Las pruebas se ejecutan con datos ficticios. No se publican perfiles, copias privadas, fotografías ni archivos de investigación.

## Límites

Esta revisión reduce fallos reproducibles; no demuestra ausencia de cualquier error. No constituye validación clínica, revisión profesional individual ni garantía de suficiencia nutricional. Los datos estimados conservan su carácter orientativo. Los menús existentes no se recalculan al actualizar y se mantiene la clave de almacenamiento y el formato de copia compatible.
