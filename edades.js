/* Adaptaciones culinarias por edad. No prescribe cantidades ni calcula nutrientes. */
const AGE_SOURCE_DATE='2026-10-15';
const AGE_SOURCES={
 sanidad:{title:'Sanidad · Alimentación de 1 a 3 años',url:'https://estilosdevidasaludable.sanidad.gob.es/alimentacionSaludable/lactancia/primeraInfancia/',version:'Página consultada 15/10/2026'},
 infancia:{title:'Canal Salut · Primera infancia',url:'https://canalsalut.gencat.cat/ca/vida-saludable/alimentacio/saludable/primera-infancia/',version:'Página consultada 15/10/2026'},
 escolar:{title:'ASPCAT · Alimentación en la etapa escolar',url:'https://salutpublica.gencat.cat/web/.content/minisite/aspcat/promocio_salut/alimentacio_saludable/02Publicacions/pub_alim_inf/guia_alimentacio_saludable_etapa_escolar/guia_alimentacio_etapa_escolar_plecs.pdf',version:'Guía 2020 · apartados 2.4 y 4; páginas impresas 22–23 y 50–53'},
 mercurio:{title:'AESAN · Mercurio en pescado',url:'https://www.aesan.gob.es/AECOSAN/docs/documentos/publicaciones/seguridad_alimentaria/RECOMENDACIONES_consumo_pescado_MERCURIO_AESAN_WEB.PDF',version:'Folleto 2019 · página 1'},
 nitratos:{title:'AESAN · Nitratos en hortalizas',url:'https://www.aesan.gob.es/AECOSAN/docs/documentos/para_consumidor/TRIPTICO_AESAN_RECOMENDACION_CONSUMO_HORTALIZAS_NITRATOS_.pdf',version:'Folleto junio 2021 · tabla de recomendaciones'},
 energeticas:{title:'AESAN · Bebidas energéticas',url:'https://www.aesan.gob.es/en/actualidad/actualidad-noticias/recomendaciones_bebidas_energeticas',version:'Recomendaciones 2022 · consulta 15/10/2026'}
};
// Franjas para presentar las fichas; los umbrales de cada regla se aplican por meses.
const AGE_BANDS=[
 {id:'12m',min:12,max:23,label:'1 año · 12–23 meses',texture:'Adaptar progresivamente la textura a sus habilidades. Ofrecer alimentos blandos que se aplasten fácilmente, legumbres aplastadas y carne desmenuzada; acompañar sentado y sin distracciones.',sources:['sanidad','infancia']},
 {id:'24m',min:24,max:35,label:'2 años · 24–35 meses',texture:'Ofrecer trozos blandos y manejables según su capacidad de masticación. Aplastar alimentos redondos como garbanzos y guisantes; retirar partes duras y acompañar sentado.',sources:['sanidad','infancia']},
 {id:'3a',min:36,max:83,label:'3–6 años',texture:'Ajustar cortes y consistencia a la capacidad individual. En los más pequeños, mantener fruta dura cocida o rallada y evitar frutos secos enteros. La edad por sí sola no garantiza una masticación segura.',sources:['sanidad','escolar']},
 {id:'7a',min:84,max:155,label:'7–12 años',texture:'Presentación familiar y uso progresivo de cubiertos. Retirar espinas y huesos y adaptar los cortes si existen dificultades para masticar.',sources:['escolar']},
 {id:'13a',min:156,max:191,label:'13–15 años',texture:'Presentación familiar. Favorecer la participación en la compra y la cocina; ajustar lo servido al apetito, sin imponer terminar el plato.',sources:['escolar','energeticas']},
 {id:'16a',min:192,max:203,label:'16 años',texture:'Presentación familiar y participación en la planificación. Respetar hambre y saciedad; no usar esta app para dietas restrictivas ni objetivos de peso.',sources:['escolar','energeticas']}
];
const AGE_RULES=[
 {id:'familia-12m',min:12,max:35,source:'sanidad',locator:'Introducción y alimentos de desayuno',kind:'orientacion',text:'Alimentación familiar variada, con adaptación individual de preparación.'},
 {id:'arroz-blanco-3',min:12,max:35,source:'sanidad',locator:'Cereales',kind:'seleccion',text:'Usar arroz blanco antes de 3 años.'},
 {id:'integrales-3',min:36,max:203,source:'escolar',locator:'Apartado 2: cereales y programación de menús',kind:'preferencia',text:'Priorizar cereales integrales.'},
 {id:'textura-infantil',min:12,max:71,source:'sanidad',locator:'Vegetales/frutas, consejos y desayunos',kind:'preparacion',text:'Adaptar alimentos duros o redondos; no ofrecer frutos secos enteros a los pequeños.'},
 {id:'mercurio-evitar',min:12,max:119,source:'mercurio',locator:'Página 1, población vulnerable 0–10',kind:'advertencia',text:'Evitar pez espada/emperador, atún rojo, tiburón y lucio antes de 10 años.'},
 {id:'mercurio-limitar',min:120,max:179,source:'mercurio',locator:'Página 1, población 10–14',kind:'advertencia',text:'Entre 10 y 14 años, limitar esas especies a 120 g al mes. La app no controla el consumo mensual.'},
 {id:'borraja-3',min:12,max:35,source:'nitratos',locator:'Tabla: borraja',kind:'advertencia',text:'No incluir borraja antes de 3 años.'},
 {id:'hojas-infantil',min:12,max:35,source:'nitratos',locator:'Tabla: espinacas/acelgas, 1–3 años',kind:'advertencia',text:'Espinacas y acelgas requieren control de cantidad y contexto de salud. No entran en la generación automática.'},
 {id:'apetito',min:12,max:203,source:'escolar',locator:'Apartado 4, páginas impresas 50–53',kind:'orientacion',text:'Respetar hambre y saciedad; la app no fija una cantidad que haya que terminar.'},
 {id:'energeticas-menores',min:12,max:203,source:'energeticas',locator:'Recomendaciones de consumo',kind:'advertencia',text:'Las bebidas energéticas no se recomiendan en niños y adolescentes.'}
].map(r=>({...r,unit:r.id==='mercurio-limitar'?'g/mes':null,checkedAt:AGE_SOURCE_DATE,review:'Fuente contrastada; implementación sin validación clínica profesional'}));
function ageBandForMonths(months){return Number.isInteger(months)?AGE_BANDS.find(b=>months>=b.min&&months<=b.max):undefined;}
function ageRulesForMonths(months){return AGE_RULES.filter(r=>months>=r.min&&months<=r.max);}
function ageIngredient(i,band){
 let name=i.name;if(band.min>=36)name=name.replace(/Arroz blanco/g,'Arroz integral').replace('Leche entera pasteurizada','Leche pasteurizada sin azúcar');
 const foodState=/cocid/i.test(name)?'cocido':/pasteuriz|yogur|queso|pan |crema 100|tortilla de trigo/i.test(name)?'producto listo para usar':/aceite|agua/i.test(name)?'tal como se utiliza':'antes de cocinar o preparar';
 return {...i,name,qty:null,foodState,amountStatus:'sin cantidad de referencia validada'};
}
function ageSteps(base,band){return base.steps.map(step=>band.min<84?step:step.replace('Aplastar ligeramente las legumbres y ajustar la textura antes de servir.','Servir con las verduras y ajustar la consistencia al gusto.').replace('Aplastar los guisantes.','').replace('cocidos y aplastados','cocidos').replace('lentejas cocidas y aplastadas','lentejas cocidas'));
}
const AGE_RECIPES=AGE_BANDS.flatMap(band=>FAMILY_RECIPES.map(base=>({
 ...base,id:'v05-'+band.id+'-'+base.id,baseRecipeId:base.id,ageBand:band.id,minMonths:band.min,maxMonths:band.max,
 ingredients:base.ingredients.map(i=>ageIngredient(i,band)),allergens:[...base.allergens],slots:[...base.slots],photo:[...base.photo],
 steps:[...ageSteps(base,band),band.texture],
 safety:band.min<84?base.safety:base.safety.replace('Servir sentado y bajo supervisión. Adaptar textura y cortes a sus habilidades; no ofrecer piezas duras o redondas enteras.','Revisar higiene, cocción y conservación; retirar huesos y espinas. Adaptar la textura si existen dificultades para masticar.'),
 adaptation:'Composición culinaria propuesta para '+band.label+'. Ajustar a habilidades y apetito. No se asignan gramos ni nutrientes.',
 sourceRefs:[...new Set([...band.sources,...(band.min<36?['sanidad']:['escolar']),...(base.protein==='pescado'?['mercurio']:[])])],
 ruleIds:AGE_RULES.filter(r=>r.min<=band.max&&r.max>=band.min).map(r=>r.id),compositionStatus:'propuesta culinaria; no receta institucional',nutrition:null,clinicallyValidated:false
})));
// Los identificadores previos siguen disponibles para menús y copias históricas.
FAMILY_RECIPES.push(...AGE_RECIPES);
