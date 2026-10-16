> Actualización V0.14.0: consulta composición de 70 componentes y 80 platos; el generador mantiene evaluación orientativa de 12 componentes. Detalle vigente al final de este documento.

# Modelo cuantificado V0.13.0

Propuesta aproximada para población sana de 12 a 203 meses. No acredita suficiencia individual, no diagnostica deficiencias y no garantiza apetito ni crecimiento. Los organismos citados no avalan el software, las recetas ni los gramajes generados. No se recomienda usarlo para patología, dietas de adelgazamiento, embarazo o suplementación.

## Referencias implementadas

- EFSA, DRV summary 2017, tablas 1–3, 5, 7, 9, 11 y 17: energía por año cumplido y sexo, proteína PRI por kg, hidratos y grasa RI, fibra AI, calcio/hierro PRI, D/B12 AI. PDF: https://www.efsa.europa.eu/sites/default/files/2017_09_DRVs_summary_report.pdf . Las edades intermedias usan el último punto publicado de proteína, sin interpolación presentada como oficial.
- Con peso indicado: Henry, variante solo peso en MJ, tabla 19 p.106 de SACN 2011: https://assets.publishing.service.gov.uk/media/5a7edb37ed915d74e33f2d8f/SACN_Dietary_Reference_Values_for_Energy.pdf . Masculino: <3 años 0,255W−0,141; 3–<10 0,0937W+2,15; 10–<18 0,0769W+2,43. Femenino: 0,246W−0,0965; 0,0842W+2,12; 0,0465W+3,18. Se emplean exclusivamente las columnas MJ, no la columna kcal (constante masculina <3 discordante en la publicación). Multiplicar MJ por 238,83, PAL y 1,01 para crecimiento, según método EFSA 2013 https://doi.org/10.2903/j.efsa.2013.3005 . No se utiliza estatura en esta variante. No es una medición del gasto.
- Sin peso: tabla de energía por año cumplido; se escala por cociente PAL cuando difiere del PAL publicado. Proteína con peso por grupo de tabla 17, identificado como referencia poblacional, sin rellenar el peso medido del perfil. PAL predeterminado 1,4 antes de 4 años y 1,6 después. Son escenarios, no actividad observada. Antes de 4 se limita a 1,4.
- Sexo no indicado: media de referencias M/F para energía y proteína, peso conjunto de tabla 17, hierro femenino desde 12 años. Es un escenario editorial explícito, no otro grupo oficial. El usuario puede elegir M/F.
- Sodio seguro y adecuado EFSA 2019 tabla 11: 1100/1300/1700/2000 mg para 1–3/4–6/7–10/11–17. https://doi.org/10.2903/j.efsa.2019.5778 . No es UL ni mínimo que se deba completar añadiendo sal. Sal equivalente = sodio ×2,5.
- Hierro: niveles seguros, no UL, 10/15/20/30/35 mg en 1–3/4–6/7–10/11–14/15–17; https://doi.org/10.2903/j.efsa.2024.8819 . D: UL 50 µg antes de 11 años y 100 desde 11; https://doi.org/10.2903/j.efsa.2023.8145 . Se revisan por día, no se ocultan con el promedio.
- Orientación alimentaria: OMS https://www.who.int/en/news-room/fact-sheets/detail/healthy-diet y AESAN https://www.aesan.gob.es/actualidad/publicaciones-nutricion/recomendaciones-dieteticas-saludables-y-sostenibles-complementadas-con-recomendaciones-de-actividad-fisica-para-la-poblacion-espanola . No se aplican los límites de azúcares libres a los azúcares totales del catálogo.

## Algoritmo y gramajes editoriales

Se comparan ocho semanas candidatas del motor de variedad existente. Cada plato recibe pesos positivos con la referencia de alimento/estado del catálogo. Se añaden acompañamientos identificados (fruta concreta alternada, leche o yogur y, cuando falta farináceo, pan). Los acompañamientos se sirven aparte. Se ajustan cantidades por búsqueda acotada, hasta ocho pasadas por día. La puntuación considera energía diaria, distribución de hidratos y grasa, proteína, calcio, hierro, fibra, D, B12, sodio y límites de hierro/D. La evaluación semanal es adicional a la diaria, no la sustituye. Es una heurística; no prueba óptimo global ni viabilidad de todos los objetivos.

Los límites por ingrediente y la distribución 20/10/30/15/25% entre cinco tomas son decisiones de la app, no raciones oficiales. Se normaliza la distribución entre tomas activas; el colegio conserva su presupuesto externo y no se rellena ni se compensa. Hay límites de masa para evitar crecer indefinidamente una porción intentando cubrir un micronutriente. Fruta, legumbres, cereales y lácteos no se aumentan sin límite para corregir D o hierro. El límite de lácteos es un término de penalización, no una prescripción.

En menores de 3 años se limita conjuntamente carne/pescado/huevo de los nuevos platos: fracciones de 35 g de carne/pescado o 50 g de huevo suman como máximo una unidad/día. Interpretación conservadora de las alternativas diarias de ASPCAT 2022, p.21, con contexto de 250 ml leche y proteína de otros alimentos excluida de la tabla original; no se confunde con una ración por cada comida. El uso de gramos crudos y la fracción de huevo son supuestos editoriales y no una equivalencia clínica validada. Fuente y condiciones: https://scientiasalut.gencat.cat/bitstream/handle/11351/9237.3/alimentacio_saludable_primera_infancia_2022_cas.pdf . Un plato fijado nunca se cambia para cumplir este límite; sus desviaciones quedan pendientes de revisión individual.

Tolerancia de energía ±10%, aviso de proteína >20% de energía y de calcio >200% de PRI: controles editoriales, no umbrales diagnósticos ni UL. Un PRI no es un máximo; una AI no permite diagnosticar carencia al quedar por debajo. La generación puede guardar una propuesta con objetivos pendientes, claramente indicada. No debe llamarse dieta completamente equilibrada o validada.

## Datos guardados y cobertura

Los nuevos platos son copias privadas de las cantidades y sus fuentes, conservadas aunque cambie el perfil. No se reescribe ningún menú histórico, toma fijada, receta propia o etiqueta. Se permite editar gramos; la compra y la revisión se recalculan. Al cambiar edad, peso, sexo o actividad se avisa de propuestas anteriores. Cambiar el perfil no cambia retroactivamente sus gramos.

El colegio permanece manual. Un texto libre no permite afirmar cobertura total. Se pueden introducir hasta ocho componentes con referencia, estado y gramos, confirmando que se ha incluido la comida completa. Son cantidades declaradas por el usuario, no verificadas por el colegio. Se suman solo a la revisión nutricional, nunca a la compra ni al ajuste automático de las tomas de casa. Una comida externa desconocida deja el día pendiente. El promedio semanal solo se compara como total cuando los siete días están cuantificados.

Un cero real en un ingrediente se conserva. Sin referencia, cantidad o dato compatible no se inventa una ingestión: la cobertura queda pendiente. Los 12 componentes actuales no incluyen todos los nutrientes: faltan yodo, zinc, selenio, potasio, vitaminas A/C/E/K, folato, otras vitaminas B y ácidos grasos esenciales, entre otros. Agua, lactancia, suplementos y consumo real no están cuantificados. Las pérdidas de cocción solo se aplican si existe un perfil elegido, según las versiones previas; el generador no adivina un método. Los gramajes no han pasado ensayo de cocina.

Por tanto, esta versión NO completa la petición de garantizar todas las necesidades de cada niño cada día. Pendientes: ampliar composición y referencias a todos los componentes relevantes, validar recetas y raciones con un profesional pediátrico, comprobar viabilidad de restricciones y necesidades individuales y ensayar platos cocinados. No se crean suplementos ni valores ficticios para mostrar un 100%.

## Verificación

Tablas contrastadas visualmente en los PDF oficiales. Pruebas de fórmulas independientes, 192 edades mensuales y ambos sexos/escenario, generación en 38 escenarios de límites de edad con/sin colegio, ingredientes positivos, objetivos finitos, estimación energética acotada, ceros legítimos, límites diarios, conservación de fijos/externos, copias, edición y fallo de almacenamiento. Regresión de datos, etiquetas, retención, cocción, preparaciones, compra y PDF. No equivale a validación profesional ni ensayo clínico.


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


## V0.14.1 · Fracción conocida y datos inválidos

La optimización diaria y la puntuación semanal utilizan la misma suma de fracciones de tomas conocidas en casa. Las comidas externas y los platos fijados sin composición completa se conservan, pero no se incluyen como cero ni se intenta compensar su presupuesto con las demás tomas. Su información sigue pendiente en la revisión y el gráfico. La comida escolar continúa como registro manual, independiente de la compra y de la optimización.

Los campos adicionales rechazan cantidades no positivas o fuera de rango. Los ceros publicados, las trazas, los límites y los datos ausentes siguen diferenciados. No se cambian tablas científicas, objetivos institucionales ni factores de cocción en esta revisión. Los menús antiguos mantienen sus cantidades y procedencia; solo las nuevas propuestas usan el modelo 0.14.1.


## V0.15.0 · Tres tomas escolares independientes

El modelo admite desayuno, media mañana y comida escolares. Usa la selección de tomas y días del perfil en todos los puntos: generación, sustitución, preparaciones, compra, composición diaria/semanal y salidas de impresión/PDF. La optimización omite el presupuesto de cada toma escolar; no utiliza el texto ni sus cantidades para compensar automáticamente el resto de comidas.

Los registros cuantificados de cada toma se suman una sola vez en el gráfico y la revisión total. Si falta cualquiera, la cobertura sigue pendiente. El desayuno y la media mañana usan claves adicionales, manteniendo las claves históricas de comida. Las copias anteriores se interpretan como solo comida escolar; se validan los nuevos campos y las claves de toma al restaurar. No cambian las referencias institucionales ni los valores de alimentos.
