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
