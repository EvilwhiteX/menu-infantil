# Recetario y planificación familiar · V0.5.0

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
