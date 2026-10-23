# Alimentos, platos y alergias · V0.27.0

En **Perfiles**, las selecciones identificadas permiten generar con las opciones compatibles del catálogo.

- **Alimentos y platos a evitar:** busca y pulsa **Añadir exclusión**. Ingrediente excluye sus preparaciones; Plato excluye esa receta y todas sus variantes por edad.
- **Alergias conocidas:** selecciona los grupos correspondientes. Para otro alimento del catálogo utiliza **Otras alergias alimentarias → Añadir otra alergia**.
- **Guarda el perfil** después de añadir o quitar selecciones. Una búsqueda escrita todavía no está añadida.
- El texto de perfiles anteriores se conserva para identificarlo y revisarlo antes de generar. No se ignoran las entradas desconocidas.

El filtro comprueba ingredientes, alérgenos identificados y acompañamientos añadidos al generar. Las recetas con información insuficiente quedan fuera si no se pueden comprobar las alergias o ingredientes excluidos. También se filtran las sustituciones y la reutilización de preparaciones guardadas. Los datos nutricionales se calculan a partir de la propuesta resultante; pueden quedar objetivos pendientes o no haber suficientes alternativas.

Las comidas guardadas no se reescriben al cambiar restricciones. Los conflictos se muestran en Mi semana. Una comida fijada, externa identificada o escolar incompatible requiere revisión antes de conservarla en una nueva generación. Si falta información del colegio para comprobar los filtros, debe completarse; modificar la cena no resuelve ese conflicto. Si no hay alternativas, se conserva el menú anterior.

El catálogo no analiza la marca que compras, las trazas ni la cocina del centro. Comprueba las etiquetas, los subingredientes y la preparación real. No se certifica que una receta sea apta para una alergia. La información sobre posibles presencias no intencionadas se distingue de los ingredientes: [AESAN, información sobre alergias alimentarias](https://www.aesan.gob.es/AECOSAN/docs/documentos/seguridad_alimentaria/gestion_riesgos/Cuadriptico_Alergias_Alimentarias_interactivo.pdf).

Las selecciones pertenecen a cada perfil y se incluyen en Exportar copia. Las copias anteriores siguen siendo compatibles.
