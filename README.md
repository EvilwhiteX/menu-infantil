# Menú Infantil V0.21.0

Prototipo de interfaz y organización de un menú semanal, compatible con móvil y PC. **No es un generador pediátrico validado ni una pauta alimentaria.**

Incluye platos ilustrativos, edición manual de tomas, bloqueo de platos, comidas externas, lista de compra y gráfico de aportes diarios y semanales. La generación propone gramos editables y revisa 12 componentes con referencias por edad y escenarios de peso, sexo y actividad. Puede dejar objetivos pendientes; no garantiza suficiencia individual. La generación de ejemplos se bloquea si el perfil declara restricciones.

Los perfiles y los menús se guardan en el navegador (localStorage), sin sincronización ni envío a un servidor. El repositorio solo contiene código y un perfil ficticio. Evita introducir datos clínicos sensibles. El gráfico muestra estimaciones de cantidades planificadas; no certifica una dieta completa.

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


## V0.9.0 — referencias completas (16/10/2026)

58 referencias completas, 12 componentes cada una: 696 celdas numéricas, 103 estimadas. Se conservan intactos los 53 registros y 636 datos/qualificadores originales de CIQUAL. Las nuevas referencias tienen identificadores `ref-` para no alterar cálculos históricos confirmados. No se modifica el almacenamiento privado ni se inventa lo comido en el colegio.

Se consultaron Mercadona, Ametller Origen y Condis. Las dos primeras no entregaron fichas numéricas comprobables en las páginas consultadas; no se atribuyen a esas marcas datos genéricos. Condis permitió comprobar crema We Natural, hélices Gallo, queso fresco Condis y Burgo de Arias sin sal añadida. En este último se prioriza el fabricante por discrepancia: Condis sal 0 g/hidratos 4 g, Arias sal 0,12 g/hidratos 3,5 g. Las unidades «ME» de algunos micronutrientes en Condis no se reinterpretan sin confirmación. Para Burgo de Arias, Arias confirma calcio 340 mg y B12 0,64 µg.

Cada celda conserva fuente, método y marca estimado/publicado. Límites CIQUAL: comparable USDA si cae dentro del límite original; en otro caso punto medio convencional del intervalo, explícitamente estimado, original conservado. No implica que ese punto sea el más probable. Trazas y ausencias: comparables USDA SR Legacy 2018; hidratos disponibles estimados como hidratos USDA menos fibra. Vitamina D de salmón cocinado y bacalao crudo con especies/estados comparables. Pasta seca de lenteja: micronutrientes/fibra de lenteja roja seca CIQUAL 20535; crema de cacahuete: 15053 tostado sin sal. Hierro/fibra/D del queso sin sal: yogur natural USDA, menor confianza por matriz distinta; se muestra la aproximación. Sodio de ese queso = sal × 400, derivado, no medición. Los ceros de las fuentes son valores publicados/redondeados o estimaciones del comparable, nunca ausencia convertida silenciosamente en cero.

Los 40 platos y 6 franjas tienen un lote calculable completo, pesos editoriales y referencia precargada editable de cada ingrediente. Fruta genérica = pera; leche genérica de mayores = entera como ejemplo, ambas decisiones visibles. No se fijan porciones pediátricas: dividir un lote es una elección explícita. No se completan con suposiciones perfiles, etiquetas privadas nuevas ni comidas desconocidas. Los datos privados incompletos siguen incompletos; el catálogo de referencia sí queda completo. No se han incorporado ingredientes de las anotaciones diagonales de las fotos.

Los valores completados son estimaciones de ingredientes, sin retención ni rendimiento de cocción y sin evaluación de suficiencia. No son composición medida del plato cocinado ni validación pediátrica. Revisar el envase real y alergias (la pasta Gallo puede contener soja; la crema debe ser fina sin trozos).

Fuentes verificadas:
- https://compraonline.condis.es/crema-we-natural-cacahuete-475-g/p/110438/es_ES
- https://compraonline.condis.es/helices-gallo-nature-lenteja-250-g/p/121986/es_ES
- https://compraonline.condis.es/queso-condis-fresco-pack-4-unidades-250-g/p/315106/es_ES
- https://compraonline.condis.es/queso-burgo-de-arias-sin-sal-3x72-g-216-g/p/315025/es_ES
- https://arias.es/productos/queso-fresco/burgo-de-arias-sin-sal-anadida-3x72-gramos/
- https://doi.org/10.57745/RDMHWY
- https://fdc.nal.usda.gov/download-datasets/ (SR Legacy abril 2018, dominio público/CC0)

Reproducción local: completar-catalogo-v090.py, archivo USDA SHA256 b80817294b8850530aaedf2e515c02593b1824f763a0ff356e5c2081643e6fd0. Auditoría completa investigacion-nutricion/auditoria-referencias-v090.json. Solo JS y documentación propios se publican, no fotos, archivos de usuario ni descargas de investigación.


## V0.10.0 — peso final medido

Se añade un peso neto final opcional al lote, introducido por el usuario tras cocinar o preparar y sin el recipiente. Rango 1–100.000 g. No se precarga un rendimiento ficticio. Se muestra peso final por parte y estimación por 100 g finales: nutrientes sumados de ingredientes × 100 / peso final medido. El cálculo mantiene límites, ausencias y señales de estimación.

Es una conversión de base de peso, sin factores de retención: no modela pérdidas de nutrientes ni lo realmente consumido. Solo resulta aplicable si se conserva toda la preparación; desechar caldo, grasa o componentes exige revisar la composición. El reparto supone mezcla homogénea y no equivale a una ración por edad. El texto lo explica junto al resultado. No se declara cerrada la retención ni la validación pediátrica.

Al guardar en biblioteca o toma se conserva cookedBatchGrams junto al reparto elegido. Copias JSON validan y restauran ese dato opcional; copias antiguas sin él siguen siendo válidas. La compra mantiene gramos de ingredientes en sus estados originales, no gramos cocinados. Reutilizar conserva el peso medido. Editar ingredientes crea una receta nueva sin trasladar el peso final antiguo.

Fuente metodológica: FAO/INFOODS, Recipes, https://www.fao.org/infoods/infoods/recipes/en/ y Food Composition Data, capítulo sobre cálculo de recetas, https://www.fao.org/4/y4705e/y4705e23.htm (consulta 16/10/2026): rendimiento y retención son cuestiones distintas. Se implementa medición de peso final y normalización; no factores de retención sin correspondencia con ingrediente y cocción.


## V0.11.0 — retención parcial por ingrediente

Se incorporan 36 métodos y 144 factores originales de USDA Table of Nutrient Retention Factors, Release 6 (2007), cuatro factores por método: calcio, hierro, sodio y B12. Sal equivalente usa el factor de sodio como derivación de la app; no se atribuye un factor de sal original a USDA. Energía, proteínas, hidratos, grasas, azúcares, fibra y vitamina D permanecen sin ajuste, expresamente indicado en los resultados. No hay valores inventados para los componentes sin factor ni validación pediátrica.

La tabla oficial no ofrece factores de vitamina D ni de macronutrientes. Aplicar el mismo porcentaje a todos los nutrientes sería incorrecto. Se elige el método de cada ingrediente de forma opcional y explícita; el valor predeterminado es «Sin ajuste de cocción». No se deduce la cocción por nombre de receta, edad o tiempo genérico. Las referencias ya cocidas y etiquetas propias no admiten factores de crudo. Solo se ofrecen correspondencias incorporadas y comprobables por alimento/estado: huevo, pollo, pescado según grupo de grasa, cerdo, vacuno picado, patata, tomate, verduras, zanahoria, harina, pasta de trigo, arroz y leche. No se aplica el método de pasta de trigo a la pasta de lentejas ni se asume otro tratamiento de legumbres ya cocidas.

Fórmula por componente: sumar gramos de cada ingrediente /100 × componente de referencia × factor específico cuando se ha elegido un método compatible. Se conservan intervalos y ausencias. Por 100 g finales, dividir esa suma por el peso final medido y multiplicar por 100. No se aplica un rendimiento ficticio ni se multiplica dos veces por cocción. Cada resultado con ajuste conserva marca de estimación; componentes no cubiertos se identifican. Desechar grasa, caldo o alimentos sigue dejando incompleto el modelo energético/macronutricional: no se presenta como una corrección completa de la receta.

El método se conserva por ingrediente al guardar preparaciones/tomas, reutilizar y hacer/restaurar copias. Cambiar la referencia en un formulario restablece su método a «Sin ajuste» y exige revisión. Las copias rechazan métodos desconocidos, de otro alimento, asociados a etiqueta o a una referencia cocida. Los menús históricos sin método conservan sus cálculos. La compra mantiene los gramos de ingredientes originales.

Fuentes: https://www.ars.usda.gov/ARSUserFiles/80400535/Data/retn/retn06.pdf (diciembre 2007, introducción/metodología y tabla), datos originales https://www.ars.usda.gov/ARSUserFiles/80400535/Data/retn/retn06.txt, y https://www.fao.org/4/y4705e/y4705e23.htm. Consulta 16/10/2026. Fuente USDA de dominio público. No se publica el PDF íntegro. Factores reproducibles con preparar-retencion-v0110.py; SHA256 del original 5b71867f6649e801db3bf88c6cd1887b0673e853d4ba94aa0af2b3c091e983f9. Nombres españoles son traducciones editoriales, con denominación inglesa/código original y fechas por factor preservados.


## V0.12.0 — ampliación contrastada con Bognár (2002)

Cinco perfiles alternativos: huevo duro (tabla 2, columna boil A), pescado blanco hervido y pescado graso hervido, solo sólido (A) o plato con todo el líquido y jugos (B), tablas 20 y 22. 43 factores numéricos explícitos, extraídos del original y contrastados visualmente con cabeceras, columnas y notas; se conservan página PDF 45/63/65, tabla, columna y procedencia. D y B12 son estimaciones sombreadas en la fuente, indicado en la app. Los guiones «no existente» no se convierten en factores. No se incorporan los factores de pollo porque la tabla 12 y sus notas distinguen carne con piel, carne sola y pechuga: aplicar sin más esos factores a la pechuga del catálogo sería incorrecto.

No se acumulan Bognár y USDA en un ingrediente: se elige un único código/perfil. Se conservan los 36 métodos USDA y los cálculos históricos. Los nuevos perfiles son opcionales, solo para referencias crudas compatibles de huevo, merluza/bacalao fresco (<5% grasa) y salmón (>5%). Las etiquetas propias y referencias cocidas siguen excluidas. Los factores de vitamina D, proteínas y grasas corresponden a esos perfiles, no a cualquier receta ni técnica de cocción. Los azúcares no reciben un factor independiente inventado. La fibra solo se ajusta donde hay valor explícito.

Si cambia un macronutriente, la energía se estima por el cambio respecto a la energía de referencia: ΔE = 4 Δproteínas + 4 Δhidratos + 9 Δgrasas + 2 Δfibra. Las demás contribuciones energéticas se suponen constantes. Son coeficientes del anexo XIV del Reglamento UE 1169/2011, aplicados por la app; no son un factor de retención energética publicado por Bognár. Si faltan valores cuantificados necesarios o el resultado es negativo, la energía queda sin dato completo; nunca se fuerza a cero. Mantener la energía sin cambiar cuando se reducen proteínas/grasas resultaría incoherente. No se modela absorción de aceite, sal añadida al agua ni pérdidas de otras contribuciones; el resultado sigue siendo parcial y no constituye un etiquetado legal ni validación clínica.

Las fuentes y coberturas se muestran dinámicamente: método, factores, valores estimados en origen y estado A/B. Se conserva la selección en preparaciones, tomas, copias y resumen semanal mediante el campo retentionCode existente. Cambiar alimento sigue restableciendo el método y exige revisión. No se modifican menús ni perfiles existentes.

Fuente original: Antal Bognár, BFE-R-02-03, 2002, DOI 10.5445/IR/9642002, https://publikationen.bibliothek.kit.edu/9642002 y texto https://publikationen.bibliothek.kit.edu/9642002/1928. Fuente de energía: https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX%3A32011R1169, anexo XIV. Consulta 16/10/2026. FOODfiles NZ fue consultado como candidato; no incorporado ni instalado. Se publican solo hechos numéricos seleccionados, traducciones y código propios con atribución; no el libro/PDF ni sus imágenes. Reproducción preparar-bognar-v0120.py; PDF SHA256 0d7b7fbc2326b74ac67122f00abc949a1a594a17dbd7e0ec588f45f5f709e491.


## V0.13.0 · Propuestas cuantificadas

Ver [modelo, referencias, supuestos y límites](MODELO_NUTRICIONAL.md). Cantidades iniciales por ingrediente, edición en cada toma y revisión de 12 componentes por día y promedio semanal. Perfil con sexo de referencia y PAL; energía aproximada con peso cuando está indicado. Menús anteriores conservados. Colegio manual, con composición opcional para evaluar el total sin incluirlo en la compra. No garantiza todos los objetivos ni rellena desconocidos privados con números ficticios.


## V0.14.0 · Uso diario, compra y catálogo ampliado

- Botón Hoy junto a la semana: vuelve a la semana y día actuales.
- Aviso general al pie, antes de la autoría: «Cantidades y valores orientativos. Consulta siempre con su pediatra.» Los avisos de alergias y controles concretos se mantienen.
- Compra con gramos/unidades, usos reales por toma y detalle de platos/días. Una repetición del ingrediente dentro de una toma no duplica su contador. Cantidades desconocidas no se inventan.
- Agrupación por secciones de supermercado, manteniendo separados los estados crudos/cocidos y los productos identificados. «Ya tengo» descuenta existencias por ingrediente, perfil y semana, sin modificar el menú ni sus nutrientes. Las marcas anteriores de comprado siguen disponibles y se pueden desmarcar.
- Piezas aproximadas con peso comestible por pieza editable; valores iniciales editoriales (patata 150 g, zanahoria 80 g, cebolla 150 g, plátano 120 g, manzana 150 g, pera 160 g, mandarina 80 g, naranja 150 g, kiwi 80 g, huevo 50 g). No se presentan como unidades oficiales ni pesos brutos exactos. No se inventan mermas de pelado. Yogur: propuesta de formato 125 g; leche: propuesta de envase 1 L. Los formatos pueden variar y deben comprobarse.
- Leche g↔ml solo como conversión aproximada con densidad 1,03 g/ml, FAO/INFOODS Density Database v2 (leche líquida, UK 6th): https://www.fao.org/fileadmin/templates/food_composition/documents/density_DB_v2_0_01.pdf . Otras masas/volúmenes no se convierten sin referencia; crudo y cocido no se suman como si fueran el mismo estado.
- Gráfico nutricional con Día/Semana, selector de día y actualización al editar. Semana = suma de siete días; promedio diario separado. Cada componente tiene su unidad y, solo cuando existe, referencia apropiada. Proteína PRI no es un máximo; sal y azúcares no tienen mínimo artificial. Datos ausentes/intervalos/trazas no pasan a cero; los ceros publicados se conservan.
- Se sustituye el círculo de categorías por barras de aporte; la revisión de variedad sigue disponible. La revisión extensa y las fuentes quedan plegadas. Los límites diarios de vitamina D/hierro siguen generando avisos visibles en el gráfico.
- Colegio: el plato anotado se ve en una celda del mismo estilo que las demás y continúa en impresión/PDF. Sigue sin entrar en compra ni compensación automática. Sin cantidades y referencias, el total nutricional queda parcial.
- 80 preparaciones diferentes (40 nuevas), con 480 presentaciones en seis etapas; no son 480 recetas distintas. Cada nueva preparación incluye ingredientes, lote de pesos, pasos, alérgenos identificados y precauciones. Nuevos frutos secos solo en preparaciones de elección manual, molidos finos y sin trozos.
- 78 referencias de alimentos (20 nuevas) y 70 componentes consultables: 12 del cálculo previo + 58 campos adicionales de CIQUAL. Incluye minerales, vitaminas y fracciones de ácidos grasos/azúcares. Son componentes parcialmente solapados y no deben sumarse entre sí. Las nuevas 240 celdas principales tienen valores publicados o estimados, identificados por campo. Los 4524 datos adicionales conservan calificadores originales; los productos sin correspondencia directa usan comparables explícitos. Etiquetas privadas sin estos nuevos campos siguen incompletas, sin rellenarlas artificialmente.
- Los 58 campos adicionales son consulta de composición; no amplían automáticamente los objetivos clínicos del generador, que sigue evaluando los 12 componentes anteriores. No se aplican factores de cocción nuevos a dichos campos. Agua representa humedad de los ingredientes, sin bebida ni absorción/evaporación estimadas.
- Fuente: Anses. 2025. Ciqual French food composition table, versión 2025-11-03, https://doi.org/10.57745/RDMHWY . Original preservado; licencia/atribución https://ciqual.anses.fr/cms/en/node/22 . No hay aval institucional de recetas ni software. Nuevos alimentos genéricos, sin atribución falsa a Mercadona, Ametller o Condis.
- Recetario con búsqueda y carga de fichas al abrirlas; textos principales simplificados. Los lotes tienen cuatro partes editoriales iniciales editables, no raciones pediátricas prescritas.
- Conserva menús históricos, fuentes originales, etiquetas, preparaciones y apariencia. Copias incluyen existencias y tamaños elegidos, validados estrictamente. Solo código y documentación se publican; no perfiles, fotos ni copias privadas.

Pruebas: 192 edades mensuales y tres escenarios de sexo; 38 generaciones en límites de edad con/sin colegio; 480 lotes y correspondencias; 240 valores principales nuevos y 4524 celdas adicionales cotejados con el original; suma diaria/semanal y parcialidad; compra, existencias, marcas antiguas, copias y fallos atómicos; conservación de platos y límites; fuentes/retención, etiquetas y PDF. Navegador local con datos ficticios: Hoy, generar, Día/Semana, compra de patatas, descontar 100 g, búsqueda de pavo y celda escolar visible. PDF real de menú/compra generado, extraído y renderizado. Sin validación clínica ni garantía de dieta completa.


## V0.14.1 · Revisión y correcciones

- Se corrige la marca de compra cuando dos productos distintos tienen el mismo nombre. Los tamaños guardados se validan antes de mostrarlos; no se interpretan como HTML.
- Las piezas aproximadas solo se proponen para alimentos identificables, sin confundir «crema de patata» o «preparado» con piezas de patata o pera.
- Los guardados de perfiles, platos manuales, cambios de colegio, fijación/comidas externas, semana en blanco, desmarcado y restablecimiento conservan los datos anteriores si falla la escritura del navegador.
- Los formularios comprueban límites compatibles con las copias. La edición manual rechaza una toma que ya no corresponde a la semana abierta. Se reparan ajustes locales inválidos sin permitir cero tomas activas.
- Los componentes adicionales no aceptan gramos negativos, cero o fuera de rango. Los nombres de ingredientes no acceden a propiedades heredadas de los diccionarios de referencias.
- La puntuación del generador excluye comidas externas y platos fijados sin composición completa, tanto en el día como en la semana. Se conservan esos platos; el total sigue pendiente y no se intenta compensar lo desconocido.
- El PDF de compra conserva las marcas antiguas de comprado. La impresión muestra la versión actual.

Se conserva el almacenamiento local y el diseño. Las cantidades de menús anteriores no se recalculan al abrir la app. Ver [AUDITORIA_V0.14.1.md](AUDITORIA_V0.14.1.md) para alcance, pruebas y límites de esta revisión.


## V0.14.2 · Ajustes visuales

«Hoy» se agrupa con la selección de semana. Autoría centrada. Se retira el texto secundario del aviso de variedad positivo, conservando los avisos de información incompleta. En Generar las tres acciones se muestran antes de la explicación y las guías. Las tres herramientas del recetario se agrupan bajo «Guías y herramientas», con cabeceras de color principal y contraste adaptado, separadas de los platos. Se mantiene el modelo de cálculo 0.14.1 y los datos guardados.


## V0.15.0 · Perfil visible y tomas escolares

- Recetario: «Platos disponibles» y número de platos con el nombre y la edad del perfil activo. Las guías y la pantalla Generar también identifican el perfil.
- Añadir perfil desplaza la pantalla hasta el formulario, sin abrir automáticamente el teclado del móvil.
- «Tomas en el colegio» permite elegir Desayuno, Media mañana y Comida. Las tomas elegidas comparten los días seleccionados, de lunes a domingo; no se activan otras tomas por defecto.
- Cada combinación de perfil, semana, día y toma tiene su propio texto y, opcionalmente, cantidades y referencias para la composición. Los textos se muestran directamente en las celdas y en impresión/PDF.
- Las tomas escolares sustituyen cualquier plato previsto o fijado en esas celdas. No se generan, no se reutilizan preparaciones allí ni se incluyen en la compra o el resumen de casa. La generación no intenta compensarlas con las demás tomas.
- La revisión diaria/semanal y el gráfico solo completan cada toma escolar cuando tiene ingredientes y cantidades declarados. Un texto libre mantiene el aporte total pendiente. Los registros escolares nunca entran en la compra.
- Compatibilidad: los perfiles y copias anteriores conservan únicamente la Comida como toma escolar. Sus registros mantienen la misma clave y no se trasladan a desayuno o media mañana. Las nuevas copias incluyen la selección y los tres registros independientes.

Comprobado con las siete combinaciones posibles de tomas escolares, separación por perfil/semana, generación y compra, conservación de registros antiguos, copia/restauración, fallo de almacenamiento, impresión/PDF y navegador móvil. No se modifican las tablas científicas ni se atribuye validación clínica al prototipo.


## V0.15.1 · Bienvenida en tres pasos

Guía opcional «Tu primera semana en 3 pasos»: Crear perfil, Personalizar e Ir a Generar. Los botones abren las pantallas reales; nunca crean perfiles ni generan menús automáticamente. Crear perfil lleva al formulario de un perfil nuevo. Los textos usan los nombres actuales de navegación y acciones.

En una instalación nueva se presenta la guía al abrir la app por primera vez. «Ahora no», el cierre, Escape o el fondo la descartan y recuerdan la elección en este navegador. Las instalaciones anteriores reciben solo una invitación discreta en Mi semana, sin ventana automática. El acceso «Primeros pasos» permanece en Mi semana y en Ajustes → Ayuda. Ocultar la invitación no elimina ese acceso.

Usa la mandarina existente, los colores y el tamaño de texto elegidos, presentación móvil/escritorio y navegación por teclado dentro de la ventana. La preferencia de bienvenida es local al navegador; no se exporta con las copias y se conserva al restaurar una. Si no se puede guardar, la guía permite continuar e informa de que podría volver a aparecer. No se modifican perfiles, menús, cantidades ni cálculos nutricionales.


## V0.15.2 · Ocultar Primeros pasos

Ajustes → Ayuda incluye el interruptor «😎 Ya domino la app». Activado oculta tanto la invitación como el botón Primeros pasos de Mi semana; desactivado los vuelve a mostrar. La guía permanece accesible desde Ayuda. La elección se recuerda en este navegador, se conserva al cerrar la guía y restaurar copias, y no modifica perfiles ni menús. Si falla el guardado, el interruptor conserva la selección anterior.


## V0.16.0 · Catálogo ampliado

120 preparaciones diferentes, con 720 presentaciones en seis franjas de edad y 93 referencias de alimentos. Se añaden 40 platos y 15 referencias, conservando los identificadores y los menús guardados.

Incluye verduras y legumbres con alcachofas, espárragos, coles, champiñones y maíz; conejo de granja, pavo fresco, pollo y vacuno; espirales, tortillas, pizza, galletas blandas, bizcochitos, compotas y otros desayunos/meriendas. Las fichas muestran pesos comestibles del lote, preparación, alérgenos, precauciones, composición y piezas aproximadas cuando procede. Los rendimientos son editoriales, sin ensayo de cocina; no se inventa un peso final cocinado.

Diez preparaciones son de elección manual: atún, pizza con masa, loncheados, piquitos y repostería casera. Es una decisión editorial del generador, no una prohibición sanitaria por edad. Los loncheados usan productos concretos con 99% de carne; eso no elimina su sal ni los equipara a carne fresca. Piquitos: revisar dureza y habilidades de masticación; para los pequeños, pan blando y actualización de la referencia. Atún: referencia específica Thunnus albacares; comprobar la especie, alternar pescados y conservar las recomendaciones AESAN sobre mercurio.

Los 180 campos principales nuevos (149 publicados y 31 estimados) tienen valor publicado o estimado, con procedencia por campo. Los 870 campos adicionales preservan los calificadores CIQUAL: datos desconocidos no equivalen a cero. Las etiquetas comerciales solo aportan lo que publican; sus micronutrientes no declarados se aproximan con alimentos comparables, identificados con ≈. No se certifica cobertura de todas las necesidades ni se sustituye la revisión profesional.


## V0.17.0 · Menú del colegio mensual

Calendario privado por perfil y fecha, importación revisada JSON/CSV/Excel pegado, biblioteca de correspondencias y repetición de una semana. Solo registrar conserva la generación anterior. Complementar en casa incluye los grupos escolares conocidos y, opcionalmente, cantidades orientativas revisadas como parte fija del día. Los nombres ambiguos siguen pendientes; no se inventan especies, datos ausentes o cantidades medidas. Nueve comparables sencillos evitan añadir guarniciones de una receta familiar a un componente escolar; no cambian las 120 preparaciones del recetario.

Generación semanal, completar huecos y preparación del mes con guardado único: conserva comidas fijadas/externas y fechas fuera del mes. Menú previsto y registro de lo servido separados; cada toma se suma una sola vez y nunca entra en la compra. Copias anteriores compatibles y nueva biblioteca incluida en copias/exportaciones. Las fotos se convierten en archivo desde el chat; no hay OCR directo ni publicación mensual de datos.

Instrucciones, formato de archivos, supuestos y límites en [MENU_COLEGIO.md](MENU_COLEGIO.md).

## V0.17.1 · Correspondencias escolares revisables

La importación deja de relacionar platos con recetas por coincidencias parciales que pueden añadir ingredientes o guarniciones. Conserva los comparables exactos y la selección manual. En JSON, `templateId: ""` mantiene «Solo texto / sin referencia», también frente a la biblioteca y al exportar e importar de nuevo. Se reconocen abadejo y ave como grupos sin inventar una especie concreta. Los archivos preparados desde fotografías para este proyecto utilizan nombres en español; no hay traducción automática dentro de la app. No cambia los menús ni las composiciones que ya estaban guardados.


## V0.18.0 · Platos del colegio en el catálogo general

51 fichas nuevas y 66 nombres cubiertos con equivalencias: 171 preparaciones, 1026 adaptaciones y 99 referencias. Las preparaciones sencillas conservan sus ingredientes propios, sin añadir guarniciones de otra receta. Cada ficha incluye lote editable, pasos, alérgenos, precauciones, adaptación por edad y cálculo de composición. Se distingue la propuesta casera de la receta real, que un nombre no permite conocer. Las guarniciones y platos sueltos están disponibles por elección manual y no se generan solos como comidas completas. Recetas anteriores, perfiles y calendarios guardados se conservan.

Regla del proyecto: incorporar las preparaciones nuevas descubiertas al catálogo común, en español y con la ficha completa, tras comprobar equivalencias. No implica publicar automáticamente entradas privadas de usuarios. Detalles, mapa de nombres, fuentes y límites en [CATALOGO_COLEGIO.md](CATALOGO_COLEGIO.md).


## V0.19.0 · Inicio guiado, perfiles y Excel

Primera visita sin perfiles de demostración: la guía conserva los tres pasos al navegar, avanza después de guardar el perfil y de generar correctamente, y se puede pausar. «Ya domino la app» desactiva tanto los primeros pasos como el acompañamiento.

Fecha de nacimiento completa, sexo para referencias y actividad obligatorios al guardar. La edad se calcula por calendario y se actualiza al volver a la app o cambiar de día; no modifica las cantidades históricas. Los perfiles anteriores conservan sus datos, pero requieren completar estos campos antes de generar. El rango del planificador sigue siendo de 12 a 203 meses; fuera del rango se conserva el historial. Perfil activo con confirmación del color elegido y edición con icono y desplazamiento al formulario.

En Perfiles → Tomas en el colegio se elige «Registro manual plato por plato» o «Automático con Tabla Excel/CSV». Guarda el perfil completo para activar el bloque mensual con descarga Excel/CSV, carga revisada y vista del mes. La tabla .xlsx se lee localmente en un trabajador con límite de tiempo; no se sube a ningún servidor. Los botones del colegio y completar huecos están en la barra superior de Generar. No se modifica el motor de complementación ni se inventan datos reales a partir del nombre de un plato.

«Reiniciar App y borrar datos», en rojo, abre una confirmación con opción de exportar copia y cancelar. Solo la confirmación final sustituye los datos de esta app en el navegador y vuelve a la bienvenida vacía.

Consulta [GUIA_INICIO.md](GUIA_INICIO.md) y [MENU_COLEGIO.md](MENU_COLEGIO.md). SheetJS CE 0.20.3 está incluido localmente con licencia Apache 2.0; no requiere CDN en uso.


## V0.20.0 · Ayuda escolar y semana visual

Perfiles explica manual y automático con un bloque informativo que cambia al seleccionar el modo. El registro manual permite añadir nombres del catálogo y adaptarlos, sin asumir que la receta del colegio coincide. Activar Tomas en el colegio marca las cantidades orientativas en el formulario; se guarda al guardar el perfil. La desactivación posterior se respeta, con explicación de que no se utilizarán las estimaciones escolares (los datos registrados con cantidades propias permanecen).

Las tomas escolares sin información en modo automático muestran un aviso y acceso a cargar el archivo. Se sustituye por el menú anunciado al guardar esa fecha; las tomas de casa y el modo manual mantienen su comportamiento. Una fecha incompleta o desconocida del archivo sigue pendiente. Un registro real ya conocido tiene prioridad y no recibe un aviso de menú incorrecto.

Los selectores mensuales del bloque del perfil y de las ventanas se ajustan al ancho disponible, incluidos los controles nativos de WebKit. Revisados a 320 y 390 píxeles y en escritorio.

Después de los gráficos, «¿Qué hay en nuestros platos?» presenta once grupos con ilustraciones SVG locales, colores y cifras: carne/aves, pescado/marisco, huevo, verduras, legumbres, cereales, tubérculos, fruta, lácteos, frutos secos/semillas y aceites/aguacate. Cada toma visible se cuenta una vez por grupo, aunque repita ingredientes, y puede pertenecer a varios. Se distingue casa/colegio, se señalan datos pendientes y se excluyen de la clasificación los alimentos desconocidos. Son apariciones en comidas, no unidades de huevo, raciones, consumos ni objetivos nutricionales. Las composiciones escolares revisadas pueden ser orientativas. No altera gramos, compras, menús ni cálculos nutricionales.


## V0.20.1 · Auditoría de código, interfaz y accesibilidad

Corregidos desbordamientos con texto muy grande, navegación móvil estrecha, foco y teclado en ventanas, reactivación y pausa de la guía, exclusión expresa de cantidades escolares, cancelación de lecturas e importaciones mal formadas. Las sustituciones automáticas requieren los mismos campos obligatorios que la generación. La compra clasifica correctamente agua, sal y hierbas, y el resumen de grupos respeta expresiones como «sin huevo». No cambian las referencias ni las fórmulas nutricionales.

Se revisaron las seis secciones en 144 combinaciones de ancho, tema y tamaño de texto, además de formularios, ventanas y flujos con datos sintéticos. Dieciocho suites funcionales y sintaxis de 39 módulos. Alcance, correcciones y límites en AUDITORIA_V0.20.1.md.


## V0.20.2 · Avisos escolares y resumen diario

El aviso del colegio no depende de que la semana ya esté inicializada. Un bloque visible sobre el calendario informa de las tomas pendientes de toda la semana, incluso cuando el móvil muestra sábado o domingo. Cada toma escolar pendiente conserva su propio aviso y acceso a cargar el mes. Los textos de estado como Sin información no equivalen a un menú cargado. Los registros reales y las fechas conocidas no se marcan como pendientes; las fechas explícitamente de casa se respetan. Al revisar y guardar platos para las fechas pendientes, desaparecen sus avisos.

El bloque ilustrado aparece antes del gráfico nutricional con el título «Qué comerá [nombre del perfil] con este menú». Mostrar día permite elegir uno de los siete días; Semana recupera el recuento completo. Cada comida cuenta una vez por grupo. El modo de este bloque es independiente del modo del gráfico nutricional; ambos comparten el día seleccionado en el menú. Sin cambios en cantidades, datos guardados ni fórmulas nutricionales.

La barra inferior de móvil y tableta utiliza seis ilustraciones SVG locales con colores suaves: calendario, varita, cesta, recetario, perfiles y ajustes. Conserva sus nombres, acciones, indicador de página activa y navegación por teclado. No necesita imágenes remotas. Verificación: 19 suites, sintaxis de 39 módulos y 144 vistas en Chromium; Safari/iOS físico no probado.


## V0.21.0 · Nueva cabecera

Marca centrada con mandarina, Menú en negro e Infantil en azul. Mi semana muestra «La semana de [perfil]» en un bloque azul suave. El selector Perfil activo aparece después de la presentación y antes del calendario; conserva los perfiles y menús guardados. El cambio de tema sigue en la cabecera y la versión puede consultarse en Ajustes. El resto de secciones comparte la nueva presentación, con su título propio.
