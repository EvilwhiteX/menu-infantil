/* Catalog organisation and bounded choice preferences. Saved meals are never rewritten. */
Object.assign(RECIPE_BATCHES,NEW_BATCHES_V025);
const CATALOG_CATEGORIES=[['pescado','Pescado'],['legumbres','Legumbres y tofu'],['huevo','Huevo'],['carne','Carne y aves'],['verduras','Verduras y guarniciones'],['cereales','Cereales y pan'],['lacteos','Lácteos y combinaciones'],['fruta','Fruta'],['otros','Otras preparaciones']];
const CATALOG_NUTRIENTS=[['vitaminD','Vitamina D'],['iron','Hierro'],['calcium','Calcio'],['fiber','Fibra'],['vitaminB12','Vitamina B12'],['protein','Proteínas']];
let catalogFilters={category:'all',nutrient:'all',query:''};
const CATALOG_COMPOSITION_CACHE=new Map(),NUTRIENT_CHOICE_CACHE=new Map();
function catalogCategory(r){
 const name=normalizedFood(r.name).trim();
 // Legacy "vegetal" metadata also covers breakfasts. Classify their actual preparation first.
 if(/^(pan\b|tostad\w*\b|avena\b|tortitas\b|galletas\b|bizcochitos\b|pizza\b|fajita\b|arroz con leche\b)/.test(name))return 'cereales';
 if(/^(yogur\b|crema de queso\b|leche\b)/.test(name))return 'lacteos';
 if(/^(compota\b|naranja y\b)/.test(name))return 'fruta';
 if(r.menuRole==='garnish')return 'verduras';
 if(['pescado','legumbres','huevo'].includes(r.protein))return r.protein;
 if(['ave','carne_roja','carne_procesada'].includes(r.protein))return 'carne';
 if(/^(arroz\b|pasta\b|espirales\b|quinoa\b|cuscus\b)/.test(name))return 'cereales';
 return ['verduras','cereales','lacteos','fruta'].includes(r.group)?r.group:'otros';
}
function catalogComposition(r){
 if(CATALOG_COMPOSITION_CACHE.has(r.id))return CATALOG_COMPOSITION_CACHE.get(r.id);
 const entries=referenceBatchEntries(r),result=calculateNutrition(entries),scale=100/result.grams;
 const data={grams:result.grams,per100:Object.fromEntries(NUTRITION_DATA.fields.map(f=>{const v=result.totals[f.key];return [f.key,{value:v.value===null?null:v.value*scale,estimated:v.estimated===true,unit:f.unit}];}))};
 CATALOG_COMPOSITION_CACHE.set(r.id,data);return data;
}
function nutrientChoiceScore(r,slot,t,budget){
 const key=r.id+'|'+slot+'|'+t.signature+'|'+budget;
 if(NUTRIENT_CHOICE_CACHE.has(key))return NUTRIENT_CHOICE_CACHE.get(key);
 const v=nutritionVector(quantifiedProposal(r,slot,t,budget)).values;
 // A limited tie-break within existing variety quotas, never a prescription or extra fish meal.
 const score=6*Math.min(1,v.vitaminD/(t.vitaminD*.35))+3*Math.min(1,v.iron/(t.iron*.30))+1.5*Math.min(1,v.calcium/(t.calcium*.30))+Math.min(1,v.fiber/(t.fiber*.30));
 if(NUTRIENT_CHOICE_CACHE.size>=4000)NUTRIENT_CHOICE_CACHE.clear();
 NUTRIENT_CHOICE_CACHE.set(key,score);return score;
}
function catalogNutrientMarkup(r){
 const d=catalogComposition(r);return `<small>Aportes por 100 g de ingredientes</small><span class="catalog-nutrient-list">${CATALOG_NUTRIENTS.map(([key,label])=>{const v=d.per100[key];return `<span>${h(label)}: <b>${v.value===null?'Sin dato completo':'≈ '+h(fmtNum(v.value))+' '+h(v.unit)}</b></span>`;}).join('')}</span>`;
}
function balancedCatalogMarkup(){
 const catalog=familyCatalog(),selected=CATALOG_CATEGORIES.find(([k])=>k===catalogFilters.category),nutrient=CATALOG_NUTRIENTS.find(([k])=>k===catalogFilters.nutrient);
 const card=r=>`<details class="family-recipe catalog-recipe" data-catalog-recipe="${h(r.id)}" data-category="${catalogCategory(r)}" data-search="${h(normalizedFood(schoolCatalogSearchNames(r)+' '+r.ingredients.map(i=>i.name).join(' ')))}"><summary><strong>${h(r.name)}</strong><small>${h(CATALOG_CATEGORIES.find(([k])=>k===catalogCategory(r))?.[1]||'')} · ${r.slots.map(slotLabel).join(' · ')}${r.automatic===false?' · Elección manual':''}</small>${catalogNutrientMarkup(r)}</summary><div data-catalog-body></div></details>`;
 const sorted=[...catalog].sort((a,b)=>{if(nutrient){const av=catalogComposition(a).per100[nutrient[0]].value,bv=catalogComposition(b).per100[nutrient[0]].value;if(av!==bv)return (bv??-1)-(av??-1);}return a.name.localeCompare(b.name,'es');});
 const groups=nutrient?[['all',nutrient[1]+' · de mayor a menor']]:CATALOG_CATEGORIES;
 return `<section class="surface panel-pad"><h2>Recetario por categorías y nutrientes</h2><p>${catalog.length} platos disponibles para ${h(profile().name)} de ${h(ageLabel(profile()))}.</p><div class="catalog-filters"><label class="field">Buscar plato o ingrediente<input type="search" id="catalog-search" value="${h(catalogFilters.query)}" placeholder="Por ejemplo: sardina, lentejas, avena"/></label><div class="form-row"><div class="field"><label for="catalog-category">Categoría</label><select id="catalog-category"><option value="all">Todas las categorías</option>${CATALOG_CATEGORIES.filter(([key])=>catalog.some(r=>catalogCategory(r)===key)).map(([key,label])=>`<option value="${key}" ${catalogFilters.category===key?'selected':''}>${label}</option>`).join('')}</select></div><div class="field"><label for="catalog-nutrient">Ordenar por aporte de</label><select id="catalog-nutrient"><option value="all">Categoría y nombre</option>${CATALOG_NUTRIENTS.map(([key,label])=>`<option value="${key}" ${catalogFilters.nutrient===key?'selected':''}>${label}</option>`).join('')}</select></div></div><p class="catalog-scale">Comparación por <b>100 g de ingredientes en sus estados indicados</b>, sin deducir el peso final cocinado. No son raciones ni una clasificación de alimentos aptos para alergias. Los valores son estimados; consulta las fuentes de cada ficha.</p><p id="catalog-result-count" role="status"></p></div>${groups.map(([key,label])=>`<section data-catalog-group><h3 class="catalog-heading">${h(nutrient?label:selected?.[1]||label)}</h3>${sorted.filter(r=>nutrient||catalogCategory(r)===key).map(card).join('')}</section>`).join('')}<p id="catalog-empty" hidden>No hay platos que coincidan con estos filtros. Prueba otra categoría o búsqueda.</p><details class="family-recipe"><summary>Ver fuentes y criterios</summary>${familyCriteria()}<p>La vitamina D puede seguir por debajo de referencia aunque se varíe el pescado. No se aumentan raciones ni se indican suplementos para completar una barra.</p></details><section class="recipe-tools" aria-label="Guías y herramientas"><h3>Guías y herramientas</h3>${renderAgeGuide()}${savedPreparationLibrary()}${nutritionLibrary()}</section></section>`;
}
function filterBalancedCatalog(){
 const root=document.getElementById('catalog-search');if(!root)return;
 const term=normalizedFood(root.value).trim();let count=0;
 for(const row of document.querySelectorAll('.catalog-recipe')){row.hidden=!(row.dataset.search.includes(term)&&(catalogFilters.category==='all'||row.dataset.category===catalogFilters.category));if(!row.hidden)count++;}
 for(const group of document.querySelectorAll('[data-catalog-group]'))group.hidden=![...group.querySelectorAll('.catalog-recipe')].some(r=>!r.hidden);
 const status=document.getElementById('catalog-result-count');if(status)status.textContent=count+' '+(count===1?'plato encontrado':'platos encontrados');
 const empty=document.getElementById('catalog-empty');if(empty)empty.hidden=count!==0;
}
function installBalancedCatalog(){
 renderRecipes=balancedCatalogMarkup;
 const previousRender=render;render=function(){previousRender();if(state.view==='recipes')filterBalancedCatalog();};
 document.addEventListener('input',e=>{if(e.target.id==='catalog-search'){catalogFilters.query=e.target.value;filterBalancedCatalog();}});
 document.addEventListener('change',e=>{if(!['catalog-category','catalog-nutrient'].includes(e.target.id))return;const key=e.target.id==='catalog-category'?'category':'nutrient';catalogFilters[key]=e.target.value;render();document.getElementById(e.target.id)?.focus({preventScroll:true});});
}
