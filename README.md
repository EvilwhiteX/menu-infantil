# Menú Infantil V0.8.0

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

### V0.3.2 · Compra, perfiles y porcentajes

- **Compra → Compartir PDF** prepara la lista completa con grupos, cantidades introducidas y marcas de comprado. Usa el selector nativo cuando está disponible y la descarga como alternativa.
- Azul por defecto para instalaciones nuevas y al restablecer; se conserva el color que ya esté guardado en cada navegador.
- Todos los perfiles, incluido el de demostración, se pueden eliminar desde **Perfiles → Editar → Eliminar**. Una confirmación dentro de la app identifica el perfil; siempre queda uno. Si falla el guardado, se conservan los datos.
- Bajo el gráfico aparecen barras con el porcentaje de platos de cada categoría. Los ceros se muestran en rojo y se identifica el caso sin platos. Los porcentajes redondeados pueden no sumar exactamente 100; no describen nutrientes ni raciones.
- Google Drive no se ha integrado ni activado: sigue disponible la copia local de seguridad.

### V0.4.0 · Recetario familiar y reglas locales

40 fichas con ingredientes, pasos, alérgenos identificados y adaptación de textura. Cuatro preparaciones se reservan para elección manual. Las recetas son propuestas basadas en nombres de platos familiares, no recetas exactas confirmadas. No se publican las fotografías.

**Generar → Generar semana familiar** utiliza reglas de variedad para perfiles de 24–35 meses sin alergias ni alimentos excluidos. Conserva platos fijados, comidas externas, tomas ocultas y diario escolar; no genera la comida de los días de comedor. Mantiene los menús históricos y las copias previas. No usa servicios de IA ni envía perfiles fuera del navegador.

La app ofrece un recetario consultable y una revisión limitada de ingredientes con advertencias específicas. No calcula raciones ni nutrientes y no certifica adecuación pediátrica. El reparto semanal es una plantilla editorial, no una pauta oficial. Detalles, fuentes y limitaciones en [CRITERIOS.md](CRITERIOS.md).


### V0.5.0 · De 1 a 16 años

El generador y las sustituciones admiten edades de 12 a 203 meses (hasta 16 años y 11 meses). Hay 40 platos con seis adaptaciones de presentación: 12–23 meses, 24–35 meses, 3–6, 7–12, 13–15 y 16 años. No son 240 recetas diferentes. Las franjas organizan la interfaz; las reglas de seguridad usan meses exactos.

Las fichas incluyen composición culinaria, estado de los ingredientes antes de utilizarlos, alérgenos identificados, preparación y enlaces oficiales. Se utiliza arroz blanco antes de 3 años e integral después; las texturas se adaptan a capacidades individuales. Los avisos de pescado distinguen menores de 10 años y 10–14 años; se añade precaución sobre bebidas energéticas.

Cada adaptación tiene un identificador estable. Los menús históricos conservan sus ingredientes al cambiar la edad del perfil; las fichas anteriores o de otra etapa se señalan para revisión. Se conserva el colegio separado y el bloqueo automático ante restricciones.

**Alcance pendiente:** no se han creado composiciones nutricionales cuantificadas ni raciones pediátricas. Los campos de cantidad y nutrientes siguen sin valor validado, en lugar de rellenarlos con estimaciones. La revisión profesional de recetas y reglas numéricas prevista en la especificación inicial sigue pendiente. No se certifica adecuación nutricional por ampliar la edad.


### V0.6.0 · Composición y referencias de cantidades

En **Recetario → Composición de alimentos · por 100 g** se consultan 49 alimentos y 12 componentes de ANSES-CIQUAL 2025. En cada ficha, **Calcular composición de esta receta** estima los nutrientes a partir de los alimentos y gramos que se seleccionan e introducen explícitamente. Es un cálculo de ingredientes, sin rendimientos ni factores de retención de cocción; no prescribe una ración por edad. Los pesos de esta calculadora son temporales y no modifican el menú ni la compra.

Dentro de **Preparación para… → Consultar cantidades de referencia por edad** se muestran referencias de ASPCAT: escolares de 3 años en adelante e infantiles diarias con sus condiciones para menores de 3. Se enlazan las tablas y sus notas, sin convertirlas en gramajes automáticos de las recetas.

La calculadora conserva límites «menor que», trazas y datos ausentes; no convierte lo desconocido en cero. Los productos sin equivalencia identificada requieren comprobar el alimento real. No se han validado clínicamente las recetas ni se certifica cobertura de necesidades. Investigación, licencias, metodología y pendientes en [FUENTES_NUTRICION.md](FUENTES_NUTRICION.md).


## V0.7.0 · cantidades de cocina y reparto confirmado

40 lotes culinarios editoriales editables, separados de las referencias por edad. El usuario confirma pesos, estado, correspondencia de alimentos y reparto; puede guardar una parte en una toma. Compra, PDF y copias conservan cantidades y estados. El resumen de nutrientes de casa marca los días incompletos cuando falta algún peso o referencia. Sin cálculo de necesidades individuales, raciones automáticas por edad ni validación clínica. Detalles y límites en `FUENTES_NUTRICION.md`.


## V0.7.1 · preparaciones reutilizables y referencias ampliadas

- «Guardar en mis preparaciones» conserva una parte del lote elegida y revisada por el usuario, sin alterar la semana. Se consulta en Recetario → Mis preparaciones guardadas.
- Desde una toma del menú se puede usar una preparación guardada con sus gramos, estados y correspondencias CIQUAL. Se exige una nueva revisión explícita; se comprueban la etapa original, las tomas admitidas, el perfil y la semana actuales. Colegio, comidas externas y perfiles con restricciones no admiten esta reutilización.
- Reutilizar no modifica la receta guardada ni los otros menús. Conserva el bloqueo de la toma. Los registros viajan en la copia local, sin sincronización externa.
- La biblioteca crece de 49 a 53 referencias (636 celdas de componentes): tortilla de trigo para rellenar, leche semidesnatada pasteurizada, agua del grifo y pasta a base de lenteja roja cocida sin sal. Son alimentos de referencia genéricos; la pasta cocida no se vincula automáticamente a «pasta 100 % lenteja» seca. Queso fresco, crema 100 % cacahuete y otros productos siguen requiriendo una correspondencia fiable.
- Las nuevas filas proceden del mismo archivo original CIQUAL 2025, con integridad verificada. Conservan códigos 7815, 19042, 18066 y 9876, nombres originales, estados y calificadores. No se sustituyen ausencias por ceros ni se atribuye aval institucional.
- Se contrastaron las [condiciones de CIQUAL](https://ciqual.anses.fr/cms/en/node/22). Como referencia para una futura transcripción de productos, la [Comisión Europea explica](https://food.ec.europa.eu/food-safety/labelling-and-nutrition/food-information-consumers-legislation/nutrition-labelling_en) que la información puede expresarse por 100 g o 100 ml; esta versión no importa etiquetas ni convierte ml en g.
- Continúan pendientes los productos no representados, el ensayo real de las recetas, rendimientos/retención y la revisión profesional antes de afirmar adecuación pediátrica automática. Guardar un reparto no lo valida por edad.


## V0.8.0 · etiquetas de productos · 16/10/2026

En «Cantidades para cocinar y repartir» o «Calcular composición de esta receta», cada ingrediente permite elegir «Mi producto · datos de su etiqueta por 100 g». Se transcriben producto/marca, estado, fecha y los componentes que figuren en la etiqueta. La transcripción es una fuente del usuario, independiente de CIQUAL: no entra en la tabla pública ni obtiene aval institucional.

Solo se admite la base de 100 g y pesos en gramos. Etiquetas por 100 ml o por ración se rechazan, sin suponer densidad ni tamaños de ración. Energía en kcal (no kJ), minerales en mg, vitaminas D/B12 en µg. No se copian porcentajes de VRN. Referencia contrastada: [Comisión Europea, información nutricional en etiquetas](https://food.ec.europa.eu/food-safety/labelling-and-nutrition/food-information-consumers-legislation/nutrition-labelling_en), apartados sobre declaración obligatoria/voluntaria y base por 100 g o 100 ml. La app usa un subconjunto de componentes; no reproduce ni certifica toda la declaración legal.

Se aceptan coma decimal, valores «menor que» y «trazas». Vacío significa sin dato; no se rellenan fibra, hierro, sodio o vitaminas ausentes ni se derivan unos componentes de otros. Un cero escrito se calcula como el cero declarado en la etiqueta, no como una medición analítica sin redondeo. Los datos de etiqueta tienen redondeos y tolerancias que esta calculadora no modela; no se aplican como objetivos clínicos.

La comprobación rechaza valores negativos/no numéricos, unidades incompatibles con 100 g, fechas imposibles y errores manifiestos de composición. No detecta toda equivocación de transcripción ni certifica el producto. Cambiar un dato invalida el resultado y exige confirmar de nuevo.

Se pueden sumar referencias CIQUAL y etiquetas dentro de la misma receta, mostrando por separado sus fuentes. Al guardar una preparación o una parte para una toma, se conserva una copia de la etiqueta y sus valores originales; reutilizar no cambia otros menús. La compra y los PDF identifican el producto/marca; las copias JSON mantienen además los datos de composición. No se transmite la etiqueta a un servidor ni se publica en GitHub. Si solo se calcula sin guardar, sus datos son temporales.

Al editar únicamente los gramos de un ingrediente con nombre y unidad sin cambios, se conserva su correspondencia. Cambiar el ingrediente o la unidad deja pendiente la correspondencia anterior, sin convertir ml a g. El recetario y las referencias por edad siguen sin constituir validación pediátrica ni raciones automáticas.
