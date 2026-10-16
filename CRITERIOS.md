> Actualización V0.14.0: consulta composición de 70 componentes y 80 platos; el generador mantiene evaluación orientativa de 12 componentes. Detalle vigente al final de este documento.

> Estado actual V0.13.0: generación cuantificada y revisión diaria/semanal parcial; ver [MODELO_NUTRICIONAL.md](MODELO_NUTRICIONAL.md). Las secciones anteriores conservadas describen versiones históricas y se subordinan al modelo vigente.

# Recetario y planificación familiar · V0.8.0

Edades de planificación: 12–203 meses (1–16 años inclusive). Consultado el 15 de octubre de 2026.

## Qué aporta esta versión

40 fichas de preparaciones domésticas con ingredientes, pasos y precauciones. Se basan en nombres de platos familiares; las composiciones son propuestas, no recetas familiares confirmadas. Incluyen variantes explícitas. Las anotaciones inferiores separadas por diagonales de las fotos no se incorporan.

Se conservan identificadores y menús antiguos. Sus fichas siguen indicando que no tienen preparación revisada. Los ingredientes de la compra no incluyen cantidades recomendadas: la familia introduce las que utiliza. No hay cálculo de energía ni nutrientes.

## Reglas de organización de la app

Para 14 comidas/cenas de casa se utiliza una plantilla editorial: 4 principales de legumbres, 3 de pescado, 2 de huevo, 2 de ave, 1 de carne roja y 2 de base vegetal. No se presenta como una frecuencia oficial de raciones ni como una pauta clínica. Los platos se cuentan por grupo principal; un plato puede contener además otros grupos. Se ajusta proporcionalmente a las tomas de casa disponibles, sin compensar el colegio. Los platos fijados pueden impedir cumplir el reparto.

Se evitan repeticiones de un plato el mismo día y se favorece variedad durante la semana. Se preservan las tomas ocultas, fijadas y externas; la exclusión del colegio prevalece sobre fijados. El catálogo automático no utiliza platos personalizados sin revisar. Si el usuario los fija, se conservan y aparecen en la revisión de preparación pendiente.

Con alergias o exclusiones declaradas no se genera ni se sustituye automáticamente. No se garantiza ausencia de trazas. Las etiquetas y la preparación real requieren revisión.

## Decisiones de preparación

- Texturas blandas, retirada de huesos/espinas y alimentos preparados según habilidades; supervisión sentada.
- Huevos, pollo y carnes completamente cocinados; lácteos pasteurizados y sin azúcar añadido en las propuestas.
- Cereales preferentemente integrales, con arroz blanco en este catálogo para menores de 3 años, siguiendo la indicación específica de Sanidad. No se utiliza bebida de arroz.
- Crema fina de cacahuete, pizza, fajita y arroz casero con huevo quedan para elección manual. La crema se ofrece solo si ya se tolera y no en cucharadas solas. No se automatiza la introducción de alérgenos.
- No se incluyen automáticamente embutidos, salchichas, especies de pescado indefinidas ni espinacas/acelgas sin control de cantidad. Esto no significa una prohibición general de todos ellos: es una limitación de este motor.
- La app detecta por nombres algunos ingredientes con recomendaciones específicas, pero no sustituye la revisión de recetas, productos o condiciones individuales.

## Fuentes oficiales y alcance

- [Ministerio de Sanidad: alimentación de 1 a 3 años](https://estilosdevidasaludable.sanidad.gob.es/alimentacionSaludable/lactancia/primeraInfancia/). Base de alimentos, arroz blanco antes de 3 años, agua, textura y acompañamiento de las comidas. No se convierten sus orientaciones en gramos automáticos.
- [Canal Salut: primera infancia](https://canalsalut.gencat.cat/ca/vida-saludable/alimentacio/saludable/primera-infancia/). Patrón familiar y respuesta a hambre/saciedad; adaptación de alimentos. No se trata la lactancia como equivalente automático a una cantidad de lácteos.
- [AESAN: mercurio en pescado](https://www.aesan.gob.es/AECOSAN/docs/documentos/publicaciones/seguridad_alimentaria/RECOMENDACIONES_consumo_pescado_MERCURIO_AESAN_WEB.PDF). Exclusión de especies de alto mercurio y selección de merluza, salmón y bacalao en las recetas nuevas.
- [AESAN: hortalizas y nitratos](https://www.aesan.gob.es/AECOSAN/docs/documentos/para_consumidor/TRIPTICO_AESAN_RECOMENDACION_CONSUMO_HORTALIZAS_NITRATOS_.pdf). Sin cantidades medidas no se comprueba el límite individual; estas verduras se apartan de la generación automática.
- [AEP: prevención de atragantamientos](https://www.aeped.es/actualidad/atragantamientos-navidad). Precaución con frutos secos enteros, uvas y otros alimentos de riesgo.

Las fuentes respaldan las orientaciones indicadas; no han revisado, aprobado ni certificado esta app o sus recetas. Esta versión no es un generador pediátrico validado.


## Ampliación V0.5.0: edades y trazabilidad

`edades.js` registra las fuentes, versión o fecha, localización, población en meses, tipo de regla, unidad cuando procede y estado de revisión. Las fuentes se han contrastado para las orientaciones indicadas; no existe validación clínica profesional de la implementación.

Se conservan 40 recetas de base históricas y se crean seis adaptaciones estables por receta. La selección del generador y del editor utiliza únicamente el catálogo de la etapa del perfil. La edad exacta, la etapa y la versión de reglas se guardan con las semanas nuevas y se conservan en las copias. Al cambiar de edad, un menú ya guardado no cambia de ingredientes ni de preparación; si procede se advierte que pertenece a otra etapa.

Para 12–35 meses se conserva arroz blanco; a partir de 36 meses se propone integral. Las fichas infantiles añaden preparación blanda y adaptación de alimentos redondos. La edad no sustituye la valoración de la capacidad de masticación. En etapas posteriores se priorizan presentación familiar, participación y respeto del apetito.

Fuentes añadidas:

- [ASPCAT: guía escolar 2020](https://salutpublica.gencat.cat/web/.content/minisite/aspcat/promocio_salut/alimentacio_saludable/02Publicacions/pub_alim_inf/guia_alimentacio_saludable_etapa_escolar/guia_alimentacio_etapa_escolar_plecs.pdf), apartados 2.4 y 4. Variedad familiar, participación y acompañamiento respetuoso; no se extrapolan las frecuencias del comedor escolar a todas las tomas del hogar.
- [AESAN: recomendaciones sobre bebidas energéticas](https://www.aesan.gob.es/en/actualidad/actualidad-noticias/recomendaciones_bebidas_energeticas). Aviso para niños y adolescentes; no se genera ninguna receta con estas bebidas.

Las especies de alto mercurio se excluyen del catálogo automático para todas las etapas. En platos personalizados se advierte de evitarlas antes de 10 años; entre 10 y 14 años se informa del límite de 120 g/mes, sin afirmar que se controla ese consumo mensual. La app no conoce todo lo consumido fuera de ella.

### Composición culinaria frente a composición nutricional

Los ingredientes y sus pasos son propuestas culinarias de la app, no recetas publicadas o aprobadas por esas instituciones. Se registra su estado de preparación; no se realizan conversiones de crudo a cocido ni se suman cantidades incompatibles. No se ha incorporado una base de nutrientes ni se han inventado gramajes por edad. La especificación inicial exige revisar profesionalmente las tablas numéricas antes de incorporarlas; esa revisión y las raciones verificadas siguen pendientes. Tampoco se afirma que todas las subcomposiciones comerciales o trazas estén identificadas.

Las franjas de presentación no son baremos de necesidades nutricionales. El reparto semanal sigue siendo editorial y no cambia artificialmente sus cantidades según la edad. Los porcentajes del gráfico siguen representando platos por categoría.


## Datos cuantitativos V0.6.0

Se añade consulta de 49 alimentos y 12 componentes de ANSES-CIQUAL 2025, junto a una calculadora de ingredientes con pesos introducidos y elección explícita del alimento y estado. Esta función sí calcula estimaciones nutricionales; no asigna cantidades al generar ni calcula necesidades individuales. Las limitaciones descritas arriba para el generador se mantienen.

También se añaden referencias institucionales de cantidades, con contexto, unidades, población y notas; no se aplican automáticamente a las recetas. Las tablas se han contrastado visualmente. La revisión profesional de las recetas y sus cantidades sigue pendiente.

Detalles y fuentes: [FUENTES_NUTRICION.md](FUENTES_NUTRICION.md). El colegio continúa fuera de la compra, cálculo y organización del menú de casa.


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


## V0.14.1 · Correcciones de revisión

Se mantienen las orientaciones y el diseño aprobados. Se corrigen la identidad de compra, los tamaños y piezas estimadas, la persistencia atómica, los límites de formularios y los ajustes locales. La generación no utiliza como cero una comida externa ni una toma fijada sin composición completa. Detalles y pruebas en [AUDITORIA_V0.14.1.md](AUDITORIA_V0.14.1.md).


## V0.15.0 · Colegio por toma

La misma regla escolar se aplica a Desayuno, Media mañana y Comida según la selección del perfil y sus días comunes. Se excluyen de la planificación de casa, las sustituciones y la compra, conservando un registro independiente y visible. No se inventa el contenido del colegio ni se compensan las demás comidas. Los perfiles previos solo tienen Comida seleccionada hasta que el usuario lo amplíe.


## V0.16.0 · Catálogo ampliado

120 preparaciones diferentes, con 720 presentaciones en seis franjas de edad y 93 referencias de alimentos. Se añaden 40 platos y 15 referencias, conservando los identificadores y los menús guardados.

Incluye verduras y legumbres con alcachofas, espárragos, coles, champiñones y maíz; conejo de granja, pavo fresco, pollo y vacuno; espirales, tortillas, pizza, galletas blandas, bizcochitos, compotas y otros desayunos/meriendas. Las fichas muestran pesos comestibles del lote, preparación, alérgenos, precauciones, composición y piezas aproximadas cuando procede. Los rendimientos son editoriales, sin ensayo de cocina; no se inventa un peso final cocinado.

Diez preparaciones son de elección manual: atún, pizza con masa, loncheados, piquitos y repostería casera. Es una decisión editorial del generador, no una prohibición sanitaria por edad. Los loncheados usan productos concretos con 99% de carne; eso no elimina su sal ni los equipara a carne fresca. Piquitos: revisar dureza y habilidades de masticación; para los pequeños, pan blando y actualización de la referencia. Atún: referencia específica Thunnus albacares; comprobar la especie, alternar pescados y conservar las recomendaciones AESAN sobre mercurio.

Los 180 campos principales nuevos tienen valor publicado o estimado, con procedencia por campo. Los 870 campos adicionales preservan los calificadores CIQUAL: datos desconocidos no equivalen a cero. Las etiquetas comerciales solo aportan lo que publican; sus micronutrientes no declarados se aproximan con alimentos comparables, identificados con ≈. No se certifica cobertura de todas las necesidades ni se sustituye la revisión profesional.


## V0.17.0 · Menú del colegio mensual

Calendario privado por perfil y fecha, importación revisada JSON/CSV/Excel pegado, biblioteca de correspondencias y repetición de una semana. Solo registrar conserva la generación anterior. Complementar en casa incluye los grupos escolares conocidos y, opcionalmente, cantidades orientativas revisadas como parte fija del día. Los nombres ambiguos siguen pendientes; no se inventan especies, datos ausentes o cantidades medidas. Nueve comparables sencillos evitan añadir guarniciones de una receta familiar a un componente escolar; no cambian las 120 preparaciones del recetario.

Generación semanal, completar huecos y preparación del mes con guardado único: conserva comidas fijadas/externas y fechas fuera del mes. Menú previsto y registro de lo servido separados; cada toma se suma una sola vez y nunca entra en la compra. Copias anteriores compatibles y nueva biblioteca incluida en copias/exportaciones. Las fotos se convierten en archivo desde el chat; no hay OCR directo ni publicación mensual de datos.

Instrucciones, formato de archivos, supuestos y límites en [MENU_COLEGIO.md](MENU_COLEGIO.md).
