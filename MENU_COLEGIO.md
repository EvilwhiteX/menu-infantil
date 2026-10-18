# Menú del colegio · V0.24.0

En **Perfiles**, activa **Tomas en el colegio**, elige las comidas y los días y guarda el perfil. Cada perfil mantiene sus propios registros y calendario.

## Registro manual plato por plato

Abre la toma escolar desde **Mi semana**. Escribe los platos, uno por línea, o selecciónalos en **Elegir un plato disponible**. Después de cada selección pulsa **Añadir al registro**. La app no permite guardar mientras quede una selección pendiente de añadir.

**Usar ingredientes y cantidades orientativas del catálogo** permite estimar los platos seleccionados. Verás las referencias, gramos, nutrientes y fichas antes de guardar. Se estima el conjunto como una misma comida. Las cantidades corresponden al estado de cada ingrediente; no son el peso final cocinado ni una medición del colegio.

**Reconocer platos ya escritos** busca coincidencias exactas. Un nombre parecido no confirma sus ingredientes. Los nombres desconocidos quedan pendientes y no se consideran cero. Si prefieres conservar solo el texto, desactiva la estimación.

Puedes introducir tus propias cantidades desde **Añadir cantidades para la revisión nutricional**. Las cantidades manuales guardadas tienen prioridad y se conservan.

Para completar registros antiguos, utiliza **Completar valores desde el catálogo** en el bloque del colegio. La revisión afecta a la semana visible y solo ofrece coincidencias exactas y completas. No cambia automáticamente los registros con cantidades manuales.

## Automático con tabla Excel/CSV

1. Selecciona este modo y guarda el perfil.
2. En **Configurar menú del colegio**, elige mes y año.
3. Descarga la plantilla Excel o CSV y rellénala con los platos en español.
4. Pulsa **Cargar archivo**. Revisa fechas, tipos de día, platos y referencias antes de confirmar.

La plantilla contiene: **fecha**, **tipo_dia**, **primero**, **segundo**, **guarnicion**, **postre**, **otros** y **observaciones**. Conserva las cabeceras y escribe `colegio`, `casa` o `desconocido` en tipo_dia. No uses fórmulas, enlaces ni celdas combinadas. No incluyas datos personales del menor.

Una celda vacía no se interpreta como festivo. Usa **Come en casa** para indicar explícitamente que no hay comedor en una fecha. Revisa las fechas cuando una semana abarque dos meses.

**Usar cantidades orientativas del colegio** habilita las estimaciones revisadas del calendario importado. Si lo desactivas, los nombres permanecen y las comidas sin cantidades no tienen un total nutricional completo.

Puedes consultar **Ver mes cargado**, exportarlo o repetir una semana cuando el colegio repita sus platos. Cada mes se carga desde la app; no necesitas instalar una nueva versión.

## Ajustar las comidas de casa

Guardar el colegio conserva las comidas de casa existentes. Después pulsa **Generar menú** para preparar una nueva propuesta con los datos escolares completos y revisados. Los platos fijados y las comidas externas se conservan.

Los registros completos estimados desde el catálogo también participan en la generación en modo manual. Los datos parciales o desactualizados se muestran como pendientes. Si cambias el colegio después de generar, la app avisa de que debes revisar o preparar de nuevo el menú.

Revisa siempre los objetivos pendientes. La app intenta aproximar los aportes y la variedad, pero puede no alcanzar todos los objetivos. No modifica lo que sirve el colegio ni confirma la receta, las trazas, los alérgenos o lo que ha comido el niño.

Las comidas escolares no se añaden a la compra. Las copias de seguridad incluyen tanto el calendario previsto como los registros y sus cantidades. Guarda esas copias en un lugar privado.
