/* Integración aditiva; no modifica platos, calendarios ni perfiles guardados. */
for(const food of NEW_FOODS_V018){
 if(Object.hasOwn(NUTRITION_BY_ID,food.id))throw Error('Referencia duplicada: '+food.id);
 NUTRITION_DATA.foods.push(food);COMPLETED_REFERENCES.foods.push(food);
 NUTRITION_BY_ID[food.id]=food;COMPLETED_BY_ID[food.id]=food;
}
Object.assign(EXTRA_COMPOSITION.foods,NEW_EXTRA_V018);
Object.assign(RECIPE_BATCHES,NEW_BATCHES_V018);
const catalogNormalizeV018=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
const FOOD_NAMES_V018=Object.fromEntries(NEW_FOODS_V018.map(f=>[catalogNormalizeV018(f.label),f.id]));
Object.assign(FOOD_NAMES_V018,{'agua':'ref-18066','pasta de trigo':'ref-9810','bacalao fresco':'ref-26043'});
const CANDIDATES_BEFORE_V018=nutritionCandidates;
nutritionCandidates=function(name){const key=normalizedFood(name).trim();return Object.hasOwn(FOOD_NAMES_V018,key)?[NUTRITION_BY_ID[FOOD_NAMES_V018[key]]]:CANDIDATES_BEFORE_V018(name);};
const SCHOOL_ALIASES_V018=Object.fromEntries(Object.entries(SCHOOL_CATALOG_COVERAGE).map(([name,id])=>[catalogNormalizeV018(name),id]));
function schoolCatalogSearchNames(r){const id=r.baseRecipeId||r.id;return [r.name,...(r.catalogAliases||[]),...Object.entries(SCHOOL_CATALOG_COVERAGE).filter(([,target])=>target===id).map(([name])=>name)].join(' ');}
const SCHOOL_SUGGEST_BEFORE_V018=schoolSuggestTemplate;
schoolSuggestTemplate=function(name){const key=normalizedFood(name).trim();return SCHOOL_SUGGEST_BEFORE_V018(name)||(Object.hasOwn(SCHOOL_ALIASES_V018,key)?SCHOOL_ALIASES_V018[key]:'');};
function installSchoolCatalog(){
 const details=recipeDetails;
 recipeDetails=function(r){
  const role={first:'Primer plato',second:'Segundo plato',garnish:'Guarnición',other:'Alimento / acompañamiento'}[r?.menuRole];
  if(!role)return details(r);
  return `<section class="selected-surface"><strong>${h(role)} · elección manual</strong><p>Esta preparación se puede combinar con otras tomas. Por sí sola no se presenta como una comida completa.</p><p>${h(r.catalogNotes||'')}</p></section>`+details(r);
 };
 const preview=schoolPreviewComponentMarkup;
 schoolPreviewComponentMarkup=function(c){const r=c.templateId&&schoolTemplate(c.templateId);return preview(c)+(r?.catalogNotes?`<p class="school-component-note"><b>Propuesta casera para revisar:</b> ${h(r.catalogNotes)}</p>`:'');};
}
