# Menú del colegio · V0.17.0

## Uso

1. En Perfiles, activa Tomas en el colegio y selecciona Comida y sus días habituales.
2. En Cómo usar el menú del colegio elige Solo registrar (comportamiento anterior) o Complementar en casa. La opción Usar cantidades orientativas permite incorporar las composiciones revisadas; desactivada, se utilizan los grupos reconocidos.
3. En Mi semana → Menú del colegio → Cargar menú, selecciona mes y año y carga un archivo escolar JSON, un CSV UTF-8 o pega una tabla de Excel.
4. Revisa las fechas. Las fechas existentes están desmarcadas para evitar sustituciones accidentales. Revisa los comparables y abre sus cantidades; puedes cambiar la referencia, el factor de cantidad, los gramos y retirar ingredientes. Los nombres ambiguos pueden quedar sin cuantificar.
5. Marca como completas únicamente las fechas que incluyen toda la comida anunciada. Acepta la revisión y guarda. Importar no regenera comidas familiares ni sustituye registros de lo servido.
6. Generar Menú prepara la semana con el colegio como parte fija. Completar huecos conserva comidas existentes. Desde Ver mes puedes completar huecos del mes o revisar la opción de regenerar sus tomas no fijadas. Las comidas externas, las fijadas y las fechas de otros meses se conservan.

Ver mes permite editar fechas, indicar Come en casa o Sin información, exportar el mes, repetir una semana concreta en un intervalo y consultar la biblioteca privada. Un espacio vacío nunca significa festivo. Repetir una semana abre una revisión: no sobrescribe fechas existentes directamente.

Los datos se guardan en este navegador y en sus exportaciones. No se publican en GitHub. El archivo mensual es distinto de la copia completa de seguridad: solo contiene el calendario escolar y se asigna al perfil activo al importarlo. Las copias completas incluyen calendarios y biblioteca; las copias anteriores siguen admitidas y mantienen Solo registrar por defecto.

## Fotografía mensual

La V0.17.0 no incluye OCR directo. Fotografía el documento completo y legible, con mes, año y fechas, y pide en tu chat que lo convierta al formato de este documento. Revisa cualquier celda ambigua. No hace falta publicar otra versión de la app cada mes.

Una petición útil es: «Transcribe este menú al archivo menu-infantil-colegio, formatVersion 1, según MENU_COLEGIO.md. Conserva los nombres originales y las fechas. No inventes celdas, ingredientes reales ni cantidades medidas. Separa primero, segundo, guarnición, postre y otros. Usa solo templateId existentes o foodId conocidos; las aproximaciones deben quedar visibles para revisar. Ante dudas conserva el texto sin cuantificar. No incluyas datos personales del menor».

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
