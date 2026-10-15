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
