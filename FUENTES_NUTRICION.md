# Datos nutricionales y cantidades · V0.6.0

Investigación y contraste: 15/10/2026. Aplicación familiar de 12 a 203 meses. Esta documentación distingue datos de composición, referencias de cantidades y revisión clínica.

## Fuentes contrastadas

| Fuente | Información aprovechada | Límites de aplicación |
|---|---|---|
| [ASPCAT, gramajes escolares, mayo 2020](https://scientiasalut.gencat.cat/bitstream/handle/11351/12100/taula_orientativa_gramatges_funcio_grup_edat_recomenacions_escoles_2020.pdf?sequence=1&isAllowed=y), página 1 | Rangos de alimentos para 3–6, 7–12, 13–15 y 16–18 años; unidades, crudo, peso bruto y sin hueso | Orientación de comedor escolar. No es una tabla de ingredientes de cada receta ni de ingesta diaria del hogar. La app limita su consulta a sus edades 1–16. |
| [ASPCAT, primera infancia, 2022](https://scientiasalut.gencat.cat/bitstream/handle/11351/9237.3/alimentacio_saludable_primera_infancia_2022_cas.pdf), página impresa 21 y contexto en 34 | Orientaciones diarias para 12 meses a 3 años con notas sobre leche y otras fuentes proteicas | No multiplicar por comida ni sumar las alternativas de carne, pescado y huevo. El contexto de lactancia/leche modifica la interpretación. En algunos alimentos la tabla no explicita el estado de peso: no se inventa. |
| [AESAN, consenso de primer ciclo de educación infantil, 2025](https://www.aesan.gob.es/dam/jcr:0e479e65-2e4c-4532-b19c-b7436dad8a05/ALIMENTACION_PRIMER_CICLO_EI.pdf), páginas 29–33 | Contexto actual de los menús de 1–3 años y la supervisión profesional de menús escolares | Sus frecuencias de comidas escolares no se extrapolan a cinco tomas diarias del hogar. No valida las recetas de esta app. |
| [ANSES, CIQUAL 2025](https://doi.org/10.57745/RDMHWY) | Composición de alimentos por 100 g de parte comestible en el estado indicado | Datos de alimentos de Francia. No garantizan equivalencia con una marca, corte, queso o producto español concreto; se conserva la denominación original. |
| [USDA, FoodData Central](https://fdc.nal.usda.gov/download-datasets/) y [licencia](https://fdc.nal.usda.gov/api-guide/) | Alternativa pública CC0; descargado SR Legacy 2018 para disponibilidad de contraste | No incorporada a esta versión para evitar mezclar definiciones y estados sin verificar equivalencias. No se ha realizado una concordancia exhaustiva entre bases. |
| [Public Health England, CoFID 2021](https://www.gov.uk/government/publications/composition-of-foods-integrated-dataset-cofid) | Alternativa oficial identificada | No incorporada. Sus alimentos y versiones necesitan correspondencia específica. |
| [AESAN/BEDCA, condiciones de uso](https://www.bedca.net/bdpub/UsoBD.pdf) | Referencia española y comprobación de condiciones | No se ha incorporado su base ni se ha solicitado autorización. No se presume que cualquier reutilización electrónica esté permitida; la fuente distingue usos y exige atribución. |
| [EFSA, valores de referencia dietéticos](https://www.efsa.europa.eu/en/topics/topic/dietary-reference-values) | Distinción entre valores científicos poblacionales y objetivos individuales | No se usan los valores EFSA como objetivos automáticos para cada niño, ni para calcular suplementos o diagnosticar carencias. |

Esta es una selección de fuentes pertinentes verificadas, no una afirmación de haber revisado toda publicación existente.

## Datos de composición incorporados

**Anses. 2025. Table de composition nutritionnelle des aliments Ciqual.** Versión de datos 03/11/2025, archivo francés. [Repositorio oficial](https://doi.org/10.57745/RDMHWY); [condiciones de reutilización](https://ciqual.anses.fr/cms/en/node/22).

- Archivo original verificado con MD5 `0d9758ce23f3f13dd63a005bc1bb4f2c`, coincidente con el repositorio de origen.
- Subconjunto: 49 alimentos y 12 componentes: energía (kcal, Reglamento UE 1169/2011), proteínas (N × 6,25), hidratos, grasas, azúcares, fibra, sal, calcio, hierro, sodio y vitaminas D y B12.
- Por registro se conserva código CIQUAL, denominación original, etiqueta de presentación en español, estado, base de 100 g, cadena original y valor normalizado de cada componente.
- Las denominaciones españolas facilitan la selección; no acreditan identidad entre productos. Pan genérico no demuestra que un pan sea bajo en sal. Pechuga no representa cualquier pieza de pollo. El queso fresco, una tortilla comercial, una crema concreta o una fruta sin especificar no se emparejan por una suposición automática.
- No se usan logotipos institucionales ni se declara aval de ANSES.

## Cálculo disponible

En el recetario se consultan datos por 100 g. En las fichas de platos se puede abrir **Calcular composición de esta receta**:

1. Seleccionar explícitamente el alimento de referencia y su estado para cada ingrediente.
2. Introducir gramos medidos de parte comestible, en ese mismo estado.
3. Confirmar que se han comprobado las correspondencias y calcular.

La fórmula por componente es la suma de `gramos introducidos / 100 × valor de la fuente`. No se convierten automáticamente ml a g, huevos a gramos, peso bruto a neto, ni alimento crudo a cocido.

Un dato ausente o «trazas» sin cantidad deja incompleto ese componente; no se sustituye por cero. Un valor «menor que» conserva su límite y produce un intervalo acotado en la suma. Las cifras son estimaciones de los ingredientes seleccionados, sin modelos de variabilidad entre marcas o muestras.

El resultado es para toda la preparación introducida. Sumar pesos en diferentes estados no determina el peso final del plato. Sin rendimientos y factores de retención verificados, el cálculo no representa un análisis del plato tras cocinarlo ni de lo realmente consumido. Los pesos de esta calculadora no se guardan ni se transfieren a la compra; los pesos que se quieran conservar en el menú se introducen mediante su editor de platos.

## Cantidades por edad: lo que permite y lo que no permite la evidencia

Las tablas originales se han leído y contrastado visualmente, con sus notas. La app ofrece su consulta contextual y enlaza los originales. Su transcripción no equivale a una revisión profesional de las recetas.

La tabla infantil contiene condiciones sobre la leche y la aportación de otras fuentes proteicas; la escolar diferencia principal y guarnición. Un plato mixto no se construye sumando todas las cantidades de todos los principales. Tampoco se puede escalar linealmente una receta adulta por edad ni tomar el punto medio de cada rango como ración pediátrica validada.

Por ello, la generación conserva las cantidades sin asignar. El colegio sigue siendo un diario separado; no se usa para estimar ni compensar ingestas, nutrientes o compra.

## Revisión pendiente para un generador con cantidades automáticas

- Confirmar la receta real: gramos base, estado de todos los ingredientes, producto/corte, subingredientes y número de raciones reales.
- Revisar profesionalmente qué referencias corresponden a cada receta y etapa, considerando apetito, contexto de leche/lactancia y necesidades individuales.
- Documentar rendimientos, retención y correspondencias entre alimentos cuando sean necesarios.
- Revisar la distribución completa del día y de la semana, con datos de consumo suficientes, antes de afirmar cobertura de necesidades.

Una búsqueda bibliográfica no sustituye esa revisión. No se han asignado revisores profesionales ficticios ni marcado las recetas como clínicamente aprobadas.


## Ampliación de la investigación · V0.7.0 · 15/10/2026

Se han vuelto a contrastar fuentes primarias españolas, europeas e internacionales. Esta búsqueda no se declara exhaustiva de todo Internet y no equivale a una revisión clínica de un menor.

| Fuente contrastada | Aplicación y límite |
|---|---|
| [FAO/INFOODS, Food composition data, capítulo 10](https://www.fao.org/4/y4705e/y4705e15.htm), apartado «Calculation of composition of composite prepared dishes» | Suma por ingrediente, identificación y trazabilidad. Para describir el plato cocinado se requieren peso final y tratamiento del rendimiento/retención. La app no inventa esos factores ni llama «análisis del plato terminado» a la suma inicial. |
| [EFSA, Dietary reference values](https://www.efsa.europa.eu/en/topics/topic/dietary-reference-values), apartados introductorios y preguntas frecuentes | Las referencias poblacionales no son objetivos nutricionales individuales. No se fijan calorías por edad ni se prescribe suplementación. |
| [Canal Salut, primera infancia](https://canalsalut.gencat.cat/ca/vida-saludable/alimentacio/saludable/primera-infancia/) y tabla ASPCAT 2022 ya conservada | Contexto de leche y orientación diaria, alternativas animales y apetito. No multiplicar la cantidad diaria de carne/pescado por cada comida. |
| [Canal Salut, alimentación infantil y juvenil](https://canalsalut.gencat.cat/ca/vida-saludable/alimentacio/saludable/infants-joves/) | Apetito y participación en las cantidades; sin extrapolar un mismo reparto de un lote a todas las edades. |
| [AESAN, oferta en centros educativos](https://aesan.gob.es/nutricion/mejora-oferta-alimentaria) y [RD 315/2025, texto consolidado BOE](https://boe.es/buscar/act.php?id=BOE-A-2025-7659) | Ámbito escolar, supervisión y frecuencias de lunes a viernes. No se importa su frecuencia como requisito de toda la semana doméstica. No se afirma que esta app cumpla la normativa de un servicio de comedor. |
| [NHS, Autumn lentil soup](https://www.nhs.uk/best-start-in-life/baby/recipes-and-meal-ideas/autumn-lentil-soup/) | La receta especifica porciones y una edad de 7–9 meses. Se contrastó como ejemplo de receta cuantificada; NO se importan sus porciones a niños de 1–16 años. |
| [NHS, Fabulous fish pie](https://www.nhs.uk/healthier-families/recipes/fabulous-fish-pie/) | Ejemplo de cantidades para una receta familiar. No acredita que una cuarta parte sea la dosis adecuada para un niño de cualquier edad. No se atribuyen a esta fuente los pesos de nuestras recetas. |
| [NHS, conservación y recalentado](https://www.nhs.uk/best-start-in-life/baby/weaning/safe-weaning/storing-and-reheating-food/) | Referencia de conservación para preparar por lotes. Enlazada para consulta; la app no controla temperaturas ni fechas de conservación. |

### Qué se ha cuantificado

Las 40 preparaciones tienen un **lote culinario propuesto por la app**, con gramos editables y estado de pesaje. No son recetas oficiales, cantidades confirmadas por la familia, raciones por edad ni lotes ensayados en cocina. `fichas-datos.js` conserva origen, versión, ausencia de dosis por edad y revisión pendiente. Los mismos pesos iniciales de cocina se mantienen entre etapas; cambian los ingredientes/presentación que ya correspondían a la edad (por ejemplo el arroz). No hay escalado médico oculto.

El usuario decide el reparto, revisa y confirma los pesos. Solo entonces puede guardar una parte en una toma concreta del menú. Se conservan gramos, estado y los códigos CIQUAL que haya elegido. La compra, los PDF y las copias locales conservan esa información. No se asigna automáticamente el lote completo a un menor ni se genera la comida escolar.

El alimento de referencia empieza sin seleccionar. Es necesario comprobar corte, especie, producto y estado. Si el queso fresco español, la pasta 100 % de lenteja, una fruta indefinida, la crema de cacahuete o cualquier otro ingrediente no están representados con fidelidad, se pueden guardar sus gramos, pero **la estimación nutricional permanece incompleta**. No se usa un queso francés distinto o una pasta de trigo para cerrar artificialmente el cálculo.

El resumen de composición de la semana solo calcula las cantidades y referencias guardadas por el usuario. Una toma o ingrediente sin datos deja incompleto el día; no se presenta como consumo real, diagnóstico de carencia ni cobertura de necesidades. Las comidas del colegio y externas quedan fuera de ese ámbito.

### Qué la búsqueda no puede confirmar

No se ha obtenido mediante Internet la receta exacta cocinada por la familia, el peso final de cada lote ni cuánto se sirve y consume realmente. Tampoco se ha realizado una revisión profesional individual. Esos puntos siguen pendientes para afirmar adecuación pediátrica o análisis del plato cocinado. La app permite registrar cantidades verificables sin atribuirles una validación inexistente.


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
