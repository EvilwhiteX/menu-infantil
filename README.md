# Menú Infantil V0.2

Prototipo de interfaz y organización de un menú semanal, compatible con móvil y PC. **No es un generador pediátrico validado ni una pauta alimentaria.**

Incluye platos ilustrativos, edición manual de tomas, bloqueo de platos, comidas externas, lista de compra y gráfico descriptivo de grupos. Las cantidades solo se suman cuando el usuario las introduce; no se calculan raciones por edad o peso. La generación de ejemplos se bloquea si el perfil declara restricciones.

Los perfiles y los menús se guardan en el navegador (localStorage), sin sincronización ni envío a un servidor. El repositorio solo contiene código y un perfil ficticio. Evita introducir datos clínicos sensibles. El gráfico no evalúa el equilibrio nutricional.

## Uso

Abre la aplicación en GitHub Pages o sirve la carpeta completa desde un servidor estático. No requiere instalación ni claves. El generador PDF y la fuente se incluyen en la carpeta; sus licencias están en `THIRD-PARTY-LICENSES.txt`.

## Versión recuperada

Basada en el archivo V0.2 de previsualización. Se corrigieron dos cadenas con saltos de línea inválidos que impedían ejecutar JavaScript. La personalización nutricional, la seguridad por edad, los alérgenos y las raciones requieren desarrollo y validación profesional antes de cualquier uso alimentario real.

## Actualización V0.2.1

- Días de comedor configurables por perfil (de lunes a viernes por defecto).
- El almuerzo escolar desaparece del menú de casa. Un diario independiente permite anotar manualmente lo comido, por perfil, semana y día. No participa en compras, generación ni gráfico de platos de casa; no se utiliza para compensar otras tomas.
- Texto normal, grande y muy grande; color principal personalizado y cuatro colores sugeridos. Contraste automático del color de acento y del texto de botones. Se mantienen los modos día y noche.
- Interfaz simplificada y autoría con enlace de correo, a petición del autor.
- Conserva los datos locales de V0.2. No incorpora un algoritmo de equilibrio nutricional ni raciones pediátricas validadas.

## Actualización V0.2.2

Tarjetas de día separadas y columnas adaptadas al ancho disponible. Etiquetas de tomas con colores suaves y menos texto repetido. Logo vectorial de mandarina con hoja verde y nombre Menú Infantil. Conserva ajustes y registros locales.


### V0.2.3
El color principal genera una paleta común para fondos, bordes, navegación, selectores y botones en modo día y noche. Se mantienen las etiquetas de comidas y los colores informativos.


### V0.2.4
Comedor con guardado inmediato en perfiles existentes, acceso a registro manual desde cada día y exclusión prioritaria sobre platos fijados. Engranaje simétrico nuevo. Revisión de presencia de grupos por ingredientes, con avisos de ausencias y revisión incompleta; no valida nutrientes, raciones ni equilibrio nutricional.

### V0.2.5 · Revisión de código

- Eliminar identifica el perfil mostrado y conserva el perfil activo cuando se borra otro. Limpia sus menús, diario y marcas de compra.
- Restablecer recupera todas las tomas originales, aunque se hubieran ocultado previamente.
- Las semanas nuevas de perfiles con restricciones o alimentos excluidos empiezan en blanco; tampoco se ofrecen sustituciones automáticas en esos perfiles.
- Los fallos de almacenamiento muestran un error sin confirmaciones falsas de guardado.
- Recuperación de referencias, fechas, contenedores y semanas incompletas de datos locales antiguos, conservando los datos válidos.
- Sin cambios de diseño ni incorporación de servicios externos.

### V0.3.0 · Copias de seguridad

En Ajustes, **Exportar copia** descarga un archivo JSON con perfiles, semanas, platos propios, registros escolares, marcas de compra y apariencia. **Restaurar copia** permite elegir ese archivo en el mismo dispositivo o en otro. Se valida el formato, las referencias y los campos antes de mostrar un resumen y pedir confirmación para sustituir los datos actuales. No mezcla datos. La escritura se completa antes de cambiar el estado de la app; si falla, conserva los datos anteriores.

Los archivos se procesan localmente, sin subirse a GitHub ni a un servidor. El archivo contiene los datos de los perfiles: debe guardarse en un lugar privado. Formato de copia 1, límite de 10 MB. No convierte el prototipo en un generador pediátrico validado.

### V0.3.1 · Compartir el menú en PDF

En **Mi semana → Compartir PDF**, la app prepara el menú de la semana y abre el selector nativo del dispositivo cuando el navegador admite compartir archivos. Las aplicaciones disponibles dependen del dispositivo. Si no se admite esta función o el navegador la bloquea, ofrece **Descargar PDF** para guardarlo o adjuntarlo manualmente. Cancelar el selector no descarga ni envía nada.

El PDF incluye el nombre del perfil, la semana, las tomas visibles y las anotaciones del colegio. No incluye edad, peso, estatura, restricciones ni una copia completa de los datos. Se genera localmente, con texto seleccionable y continuación en varias páginas para anotaciones largas. Solo se comparte cuando el usuario selecciona un destino y confirma en el sistema.
