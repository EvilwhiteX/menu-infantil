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
