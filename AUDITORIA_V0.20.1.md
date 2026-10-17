# Auditoría de Menú Infantil V0.20.1

Fecha: 17 de octubre de 2026. Revisión del código actual y de las seis secciones: Mi semana, Generar, Compra, Recetario, Perfiles y Ajustes. Pruebas de escritura sobre perfiles sintéticos locales; los datos del navegador publicado se conservan.

## Fallos reproducidos y corregidos

| Área | Problema | Corrección y comprobación |
| --- | --- | --- |
| Móvil y letra grande | El formulario de perfiles y la navegación podían superar el ancho de 320 px. | Mínimos de cuadrícula ajustados, botones y textos flexibles; seis secciones sin desbordamiento en la matriz final. |
| Ventanas | El foco permanecía detrás del diálogo y Tab podía salir hacia el fondo. | Foco dentro, fondo inerte, ciclo Tab/Mayús+Tab, restauración del foco y conservación del desplazamiento. Confirmación de borrado probada abriendo y cancelando. |
| Guía | Una guía pausada podía ser difícil de retomar sin perfiles; reiniciarla tras Ya domino la app dejaba los pasos ocultos. | Acceso global compacto y reactivación explícita. Recorrido real con creación de perfil ficticio, ajustes, generación y llegada al menú. |
| Colegio | Elegir solo texto podía volver a asignar cantidades desde la biblioteca. | La selección expresa vacía prevalece; se verifican cero entradas y ausencia de revisión cuantitativa. |
| Lectura de archivos | Una lectura cancelada o su error podían llegar tarde y afectar otra revisión. | Invalidación al cerrar y comprobación del identificador antes de aplicar resultados o errores. |
| Importación | Filas JSON nulas provocaban un error técnico; un CSV con texto tras cerrar comillas se aceptaba ambiguamente. | Validación de filas y celdas, mensajes en español y conservación del estado previo. |
| Sustituciones | Un perfil antiguo incompleto podía obtener cantidades automáticas mediante una sustitución. | La misma validación de perfil que en generación protege la acción y explica qué campo falta. La edición manual y los datos históricos se conservan. |
| Compra | Sal, agua y hierbas podían aparecer junto a aceites y frutos secos. | Clasificación específica y fallback Otros; ampliación de nombres conocidos de pescadería, carnicería y panadería. |
| Resumen de grupos | Nombres como Tortilla sin huevo o Pan sin leche ni huevo podían sumar esos grupos. | Se respetan ausencias explícitas sin eliminar el huevo de otro plato anunciado por separado. |
| Presentación | Iconos informativos y foco podían perder claridad con ciertos colores. | Iconos en línea, contenedores flexibles y foco visible con el color de contraste de la paleta. |

## Verificación funcional

Dieciocho suites terminadas correctamente: revisión V0.20.1, etiquetas, preparaciones guardadas, peso cocinado, retención, Bognár, visual V0.20, flujo V0.19, app, auditoría previa, regresión de catálogo, catálogo, experiencia, colegio, equilibrio, PDF, calendario y los menús escolares de septiembre/octubre. Los fixtures antiguos de pruebas de dominio se actualizaron para cargar los módulos actuales y usar perfiles sintéticos; la validación real de entrada se prueba por separado y permanece activa.

Incluye 192 edades, límites de generación, siete combinaciones de tomas escolares, guardados atómicos y errores de almacenamiento, importación/revisión mensual, copias, recetas, etiquetas, cantidades y PDF. Sintaxis de los 39 módulos JavaScript correcta. Catálogo conservado: 171 preparaciones, 1026 variantes y 99 referencias; fuentes y fórmulas nutricionales sin cambios.

## Verificación visual y de interacción

Matriz final: 6 secciones × 4 anchos efectivos (320, 390, 768 y 1280 px) × 2 temas (claro/oscuro) × 3 tamaños de texto (normal/grande/muy grande) = 144 vistas. Se comprueba el ancho efectivo después de emularlo. Sin desbordamiento horizontal de la página, campos/botones fuera del ancho ni identificadores duplicados en esas vistas.

Además: fichas y calculadora del recetario desplegadas, composición de alimentos, edición de toma, registro escolar, calendario, repetición de semana, revisión de importación, guía y confirmaciones. Se revisaron etiquetas de campos, navegación por teclado, cancelación y regreso al control de origen. Exportación de copia y resumen de restauración comprobados sin sustituir datos. Capturas y matriz detallada se conservan en el checkpoint local; no incluyen datos reales del usuario.

Las capturas completas se inspeccionan junto con capturas de detalle; algunas herramientas de captura de viewport recortan el ancho emulado, por lo que los límites se contrastan con la geometría del documento y las capturas completas. La emulación temporal se retira al finalizar.

## Límites

Pruebas realizadas en el navegador Chromium disponible, con emulación de tamaños. No se ejecutó un Safari/iOS físico ni todos los navegadores y dispositivos posibles. La auditoría verifica el funcionamiento del software; no valida clínicamente el generador ni garantiza ausencia de fallos futuros. El reinicio destructivo y la restauración efectiva se comprueban en pruebas aisladas; en el navegador se cancelaron para conservar los datos.
