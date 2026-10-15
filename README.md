# Menú Infantil V0.2

Prototipo de interfaz y organización de un menú semanal, compatible con móvil y PC. **No es un generador pediátrico validado ni una pauta alimentaria.**

Incluye platos ilustrativos, edición manual de tomas, bloqueo de platos, comidas externas, lista de compra y gráfico descriptivo de grupos. Las cantidades solo se suman cuando el usuario las introduce; no se calculan raciones por edad o peso. La generación de ejemplos se bloquea si el perfil declara restricciones.

Los perfiles y los menús se guardan en el navegador (localStorage), sin sincronización ni envío a un servidor. El repositorio solo contiene código y un perfil ficticio. Evita introducir datos clínicos sensibles. El gráfico no evalúa el equilibrio nutricional.

## Uso

Abre la aplicación en GitHub Pages o sirve `index.html` desde un servidor estático. No requiere instalación, dependencias ni claves.

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
