# Menú del colegio · V0.20.0

## Corrección de importación V0.17.1

Los comparables automáticos se limitan a los nombres y alias exactos reconocidos. Una coincidencia parcial no permite deducir ingredientes ni añadir guarniciones. Las referencias elegidas manualmente siguen disponibles y requieren revisión.

En JSON, `templateId: ""` significa «Solo texto / sin referencia»: no se sustituye por sugerencias ni por correspondencias guardadas de la biblioteca. Se conserva al exportar y volver a importar. Omitir ese campo permite buscar una correspondencia o comparable exacto. Todas las correspondencias importadas se muestran sin revisar hasta aceptarlas.

Los platos preparados desde fotografías para este proyecto se traducen al español antes de importar. Los nombres destinados a la app y a sus exportaciones deben estar en español. La aplicación no incorpora un traductor automático de archivos externos.

## Uso

1. En Perfiles, activa Tomas en el colegio y selecciona Comida y sus días habituales.
2. En Cómo usar el menú del colegio elige Registro manual plato por plato o Automático con Tabla Excel/CSV. Guarda el perfil completo para aplicar los cambios y activar los botones de archivo. La opción Usar cantidades orientativas permite incorporar las composiciones revisadas; desactivada, se utilizan los grupos reconocidos.
3. En Mi semana → Menú del colegio → Cargar menú, selecciona mes y año y carga un archivo escolar JSON, un Excel .xlsx, un CSV UTF-8 o pega una tabla. También puedes cargarlo desde el bloque mensual del perfil guardado.
4. Revisa las fechas. Las fechas existentes están desmarcadas para evitar sustituciones accidentales. Revisa los comparables y abre sus cantidades; puedes cambiar la referencia, el factor de cantidad, los gramos y retirar ingredientes. Los nombres ambiguos pueden quedar sin cuantificar.
5. Marca como completas únicamente las fechas que incluyen toda la comida anunciada. Acepta la revisión y guarda. Importar no regenera comidas familiares ni sustituye registros de lo servido.
6. Generar Menú prepara la semana con el colegio como parte fija. Completar huecos conserva comidas existentes. Desde Ver mes puedes completar huecos del mes o revisar la opción de regenerar sus tomas no fijadas. Las comidas externas, las fijadas y las fechas de otros meses se conservan.

Ver mes permite editar fechas, indicar Come en casa o Sin información, exportar el mes, repetir una semana concreta en un intervalo y consultar la biblioteca privada. Un espacio vacío nunca significa festivo. Repetir una semana abre una revisión: no sobrescribe fechas existentes directamente.

Los datos se guardan en este navegador y en sus exportaciones. No se publican en GitHub. El archivo mensual es distinto de la copia completa de seguridad: solo contiene el calendario escolar y se asigna al perfil activo al importarlo. Las copias completas incluyen calendarios y biblioteca; las copias anteriores siguen admitidas y mantienen Registro manual plato por plato por defecto.

## Fotografía mensual

La V0.17.0 no incluye OCR directo. Fotografía el documento completo y legible, con mes, año y fechas, y pide en tu chat que lo convierta al formato de este documento. Revisa cualquier celda ambigua. No hace falta publicar otra versión de la app cada mes.

Una petición útil es: «Transcribe este menú al archivo menu-infantil-colegio, formatVersion 1, según MENU_COLEGIO.md. Traduce los nombres al español y conserva las fechas y el significado del original. No inventes celdas, ingredientes reales ni cantidades medidas. Separa primero, segundo, guarnición, postre y otros. Usa solo templateId existentes o foodId conocidos; las aproximaciones deben quedar visibles para revisar. Ante dudas conserva el texto sin cuantificar. No incluyas datos personales del menor».

## CSV / tabla de Excel

Cabecera recomendada:

```text
fecha;tipo_dia;primero;segundo;guarnicion;postre;otros;observaciones
2026-10-19;colegio;Lentejas con verduras;Tortilla francesa;;Fruta;;Revisar cantidades orientativas
2026-10-20;casa;;;;;;Día en casa
2026-10-21;desconocido;;;;;;Documento poco legible
```

Se aceptan fechas AAAA-MM-DD o DD/MM/AAAA. Todas deben pertenecer al mes elegido y no repetirse. Delimitadores: punto y coma, coma o tabulación. Los campos que contienen delimitadores o saltos de línea necesitan comillas CSV; una comilla interior se duplica. Se admite UTF-8 con BOM. La plantilla descargable crea las fechas de lunes a viernes del mes como desconocidas; no infiere festivos. La columna opcional completa admite sí/true/1, pero la revisión siempre permite corregirla.

## Archivo mensual JSON

```json
{
  "app": "menu-infantil-colegio",
  "formatVersion": 1,
  "month": "2026-10",
  "days": [
    {
      "date": "2026-10-19",
      "kind": "school",
      "complete": false,
      "notes": "Ejemplo de formato: revisar contra la fotografía",
      "components": [
        {"role": "first", "name": "Lentejas con verduras", "templateId": "escolar-lentejas", "portion": 1},
        {"role": "second", "name": "Tortilla francesa", "templateId": "escolar-tortilla", "portion": 1},
        {"role": "dessert", "name": "Fruta", "templateId": "escolar-fruta", "portion": 1}
      ]
    }
  ]
}
```

Límite: 1 MB, 1–31 fechas distintas del mismo mes, años 2000–2099. kind: school, home o unknown. Las fechas home/unknown usan components vacío. Roles: first, second, garnish, dessert, other. Hasta ocho componentes; nombre de hasta 180 caracteres; observaciones de hasta 1500.

templateId es opcional. Se aceptan los baseRecipeId del recetario existente y estos nueve comparables escolares:

| templateId | Comparable editorial |
|---|---|
| escolar-fruta | Fruta fresca usando pera como comparable, sin afirmar que el postre sea pera |
| escolar-yogur | Yogur natural sin azúcar |
| escolar-tortilla | Huevo y aceite; sin añadir guarniciones |
| escolar-pollo | Pechuga de pollo y aceite; sin añadir guarniciones |
| escolar-merluza | Merluza y aceite; solo cuando está identificada esa especie |
| escolar-arroz-tomate | Arroz blanco, tomate y aceite |
| escolar-pasta-tomate | Pasta de trigo, tomate y aceite |
| escolar-lentejas | Lentejas cocidas, zanahoria, cebolla y aceite; sin carne ni arroz |
| escolar-garbanzos | Garbanzos cocidos, zanahoria, cebolla y aceite; sin carne |

Estos comparables utilizan las referencias genéricas publicadas/estimadas que ya existen en el proyecto. Sus recetas y cantidades son supuestos editoriales sin validación clínica, no información real del colegio. Se muestran antes de aceptarlos. Los pesos de los ingredientes son crudos o cocidos según cada referencia; no se declara peso final del plato.

portion, entre 0.25 y 2, multiplica la propuesta orientativa dentro de los límites del modelo. Si se dispone de cantidades, puede aportarse entries: [{"foodId":"ref-20360","grams":100}]. Deben emplearse foodId existentes y pesos en su estado de referencia. Hasta 45 ingredientes por componente, cada uno entre 0.1 y 5000 g. No introduzcas gramos cocinados contra una referencia cruda. Las cantidades aportadas no se recalculan como receta del catálogo. El archivo no debe atribuir a mediciones lo que son estimaciones.

La revisión en pantalla es obligatoria también para JSON. Los campos reviewed del archivo no autorizan el guardado por sí mismos. Una referencia desconocida se rechaza; un nombre sin referencia puede guardarse y deja la composición pendiente.

## Cálculo y límites

La comida escolar permanece fija. Los grupos reconocidos contribuyen a la distribución semanal y a evitar repeticiones innecesarias del plato o proteína principal en la cena. Verduras y frutas no se prohíben por aparecer en otras tomas. La plantilla de frecuencias sigue siendo editorial.

La optimización incorpora numéricamente una toma escolar solo si tiene composición completa en los 12 componentes del modelo y, para un menú previsto, todas sus partes están revisadas y marcadas como completas. Si faltan datos, no convierte la comida en cero ni redistribuye su presupuesto desconocido hacia las demás tomas. Los aportes parciales conocidos sí se muestran como parciales en la revisión y el gráfico.

La estimación de cada componente reparte el 30% editorial de energía asignado a la comida entre las partes declaradas (pesos relativos: primero 0.40, segundo 0.35, guarnición 0.10, postre 0.15 y otro 0.10), normalizando solo para crear una propuesta inicial. No determina lo servido. El escalado inicial está limitado y se aplican límites de ingredientes; el factor manual es 0.25–2. No se generan nuevos objetivos clínicos ni factores de cocción. La biblioteca conserva los supuestos revisados.

Un registro cuantificado tiene prioridad sobre la estimación de esa toma. Un texto registrado distinto del menú anunciado invalida su estimación para esa fecha. Nunca se suman el registro y el menú previsto como dos comidas. La compra excluye siempre las tomas escolares.

Al cambiar los datos del perfil, las estimaciones anteriores quedan señaladas hasta revisarlas. Si cambia el menú escolar después de preparar comidas de casa, se avisa: las comidas guardadas no se reescriben. No se mide lo consumido ni se garantiza una dieta completa. Se mantienen los bloqueos de generación con alergias o exclusiones y los controles por edad.


## V0.18.0 · Platos del colegio en el catálogo general

51 fichas nuevas y 66 nombres cubiertos con equivalencias: 171 preparaciones, 1026 adaptaciones y 99 referencias. Las preparaciones sencillas conservan sus ingredientes propios, sin añadir guarniciones de otra receta. Cada ficha incluye lote editable, pasos, alérgenos, precauciones, adaptación por edad y cálculo de composición. Se distingue la propuesta casera de la receta real, que un nombre no permite conocer. Las guarniciones y platos sueltos están disponibles por elección manual y no se generan solos como comidas completas. Recetas anteriores, perfiles y calendarios guardados se conservan.

Regla del proyecto: incorporar las preparaciones nuevas descubiertas al catálogo común, en español y con la ficha completa, tras comprobar equivalencias. No implica publicar automáticamente entradas privadas de usuarios. Detalles, mapa de nombres, fuentes y límites en [CATALOGO_COLEGIO.md](CATALOGO_COLEGIO.md).


## Plantilla Excel real · V0.19.0

En el perfil guardado con modo automático, elige mes y año y pulsa Descargar plantilla Excel. Incluye «Menú del colegio» con las fechas de lunes a viernes y «Instrucciones». Rellena los nombres en español, marca tipo_dia como colegio/casa/desconocido y conserva las columnas. Cargar archivo → Revisar importación → aceptar revisión → Guardar fechas seleccionadas. El archivo también puede descargarse desde la ventana de importación. No hace falta otra versión de la app cada mes.

Se admite .xlsx de hasta 5 MB y una sola tabla de hasta 31 fechas; CSV/JSON mantiene el límite de 1 MB. Se rechazan fórmulas, enlaces de celda, celdas combinadas y varias hojas de datos. La hoja «Instrucciones» se ignora. Se admiten fechas ISO y fechas nativas de Excel. El procesamiento Excel se realiza en un trabajador local con límite de 12 segundos. Si el documento no cumple el formato, utiliza la plantilla o CSV.

Los controles del colegio se aplican al pulsar Guardar perfil; cambiar un selector no guarda un perfil incompleto. Cambiar de manual a automático no borra calendarios ni genera comidas. «Usar cantidades orientativas» sigue siendo una opción separada. Los archivos importados requieren revisión; nombres, ingredientes reales, alérgenos y cantidades del comedor no se deducen con certeza de un nombre.


## Ayuda de uso y avisos · V0.20.0

El bloque de información del perfil explica el modo seleccionado antes del texto de complementación. En un registro diario puedes elegir un nombre del catálogo, añadirlo al texto y corregirlo. No se copian ingredientes o cantidades de una receta parecida sin revisión.

Al activar Tomas en el colegio, Usar cantidades orientativas se activa en el formulario. Puedes desactivarlo y guardar. En automático, desactivarlo excluye las cantidades estimadas del menú previsto; no elimina cantidades que hayas registrado expresamente como servidas. Los cambios del formulario se aplican al guardar el perfil completo, conservando los datos anteriores si falla la escritura.

Un espacio escolar pendiente en una semana preparada muestra «Esta toma aún no muestra los platos del colegio. Carga el Excel o CSV para actualizarla» y abre la carga del mes correspondiente. Solo afecta a las tomas configuradas como colegio en modo automático. Al revisar y guardar los platos de esa fecha desaparece el aviso. La carga parcial no da por resueltas otras fechas, ni deduce festivos o datos ausentes. Un registro real conocido prevalece. Cargar el archivo sigue sin regenerar las comidas de casa.

El nuevo recuento semanal incluye los grupos reconocidos por los nombres escolares y las composiciones revisadas disponibles; estas últimas pueden ser estimaciones. No sustituye el gráfico nutricional ni equivale a raciones. Las tomas sin información se indican como pendientes. Las fechas y los nombres se muestran con las reglas existentes, en español.


## Revisión V0.20.1

En la revisión de una fila, elegir expresamente Sin cantidades / solo texto elimina la referencia de esa fila aunque exista una correspondencia guardada con el mismo nombre. No se recuperan sus gramos por detrás de la elección. La biblioteca sigue disponible para otras asignaciones.

Cerrar la carga o cambiar de lectura invalida las operaciones pendientes. Ni un resultado ni un error antiguo deben sustituir la revisión actual. Se rechazan filas JSON nulas y contenido no válido después de cerrar una celda CSV entre comillas, con mensajes comprensibles. Los datos guardados se conservan hasta confirmar una importación válida.


## Avisos reforzados V0.20.2

El aviso escolar pendiente se evalúa incluso antes de inicializar una semana. En automático, la semana muestra un aviso general con el número de tomas escolares sin información y un botón de carga; cada toma pendiente muestra también su aviso. Así no desaparece de la vista general al seleccionar un día sin colegio. Una semana que cruce dos meses ofrece la carga de cada mes pendiente.

Un texto de estado como Pendiente de anotar, Sin información o Menú del colegio pendiente no se considera un plato real. La presencia de nombres reales o cantidades válidas en un registro sí resuelve el aviso de esa toma, aunque no proceda de un Excel. Una fecha marcada como casa queda fuera del aviso. Los platos conocidos se conservan y la carga parcial solo resuelve las fechas que realmente se guardan.

El resumen ilustrado se sitúa antes del nutricional y permite recuentos de Día/Semana; distingue casa/colegio y sigue señalando información pendiente. No cambia el cálculo nutricional ni añade comidas escolares a la lista de compra.


## Actualización V0.22.0

El campo de fecha de nacimiento se adapta al ancho disponible, incluidos móviles. Los avisos de error vacíos no ocupan espacio ni dibujan bandas rojas; los errores con contenido siguen visibles.

En el registro manual del colegio, al seleccionar un plato de la lista, pulsa «Añadir al registro» antes de guardar. El botón se destaca durante cuatro segundos; el mensaje rojo recuerda el paso pendiente. Cuando el plato está añadido aparece «Plato añadido. Todo correcto, puedes guardar cambios.» en verde y se permite guardar. Cambiar la selección exige añadirla de nuevo. La escritura manual continúa disponible, se evitan duplicados y se respeta la preferencia de reducir animaciones.
