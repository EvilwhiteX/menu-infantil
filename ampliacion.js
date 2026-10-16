/* Additive integration: existing menus retain their saved quantities and references. */
for(const food of NEW_FOODS_V016){
 if(Object.hasOwn(NUTRITION_BY_ID,food.id))throw Error('Referencia duplicada: '+food.id);
 NUTRITION_DATA.foods.push(food);COMPLETED_REFERENCES.foods.push(food);
 NUTRITION_BY_ID[food.id]=food;COMPLETED_BY_ID[food.id]=food;
}
Object.assign(EXTRA_COMPOSITION.foods,NEW_EXTRA_V016);
Object.assign(RECIPE_BATCHES,NEW_BATCHES_V016);
const FOOD_NAMES_V016=Object.fromEntries(NEW_FOODS_V016.map(f=>[f.label.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim(),f.id]));
Object.assign(FOOD_NAMES_V016,{'pasta integral (espirales)':'ref-9870','harina integral de trigo':'ref-9415'});
const CANDIDATES_BEFORE_V016=nutritionCandidates;
nutritionCandidates=function(name){const key=normalizedFood(name).trim();return Object.hasOwn(FOOD_NAMES_V016,key)?[NUTRITION_BY_ID[FOOD_NAMES_V016[key]]]:CANDIDATES_BEFORE_V016(name);};

// Match the state actually weighed, including new canned/processed foods.
const BATCH_STATE_BEFORE_V016=batchState;
batchState=function(i){const food=defaultCompositionReference(i);return food?.weightState||BATCH_STATE_BEFORE_V016(i);};

function recipeQuantitiesMarkup(r){
 const b=batchForRecipe(r),snapshot=!b&&r?.ingredients?.every(i=>i.unit==='g'&&Number.isFinite(i.qty)&&i.qty>0);
 if(!b&&!snapshot)return '';
 return `<section class="recipe-quantities"><h3>${b?'Ingredientes y cantidades del lote':'Cantidades guardadas'}</h3>${b?`<p>${h(b.yieldText||'Lote de cocina editable; el reparto se elige al servir.')}</p>`:''}<ul>${r.ingredients.map((i,n)=>{const grams=b?b.grams[n]:i.qty,piece=shoppingPiece(i),size=piece?PIECE_GRAMS[piece]:0,detail=size?' · ≈ '+fmtNum(grams/size)+' '+(piece==='huevo'?'huevos sin cáscara':'piezas medianas comestibles'):'';return `<li><b>${h(i.name)}</b>: ${fmtNum(grams)} g${h(detail)}<small> · ${h(batchState(i))}</small></li>`;}).join('')}</ul>${b?'<small>Pesos comestibles antes de preparar, salvo que se indique cocido o escurrido. Las piezas y el rendimiento son aproximados; los gramos son editables.</small>':''}${r.occasional?'<p><b>Opción ocasional · elección manual.</b></p>':''}</section>`;
}
function installCatalogExpansion(){
 const preview=referenceBatchPreview;
 referenceBatchPreview=function(r){return preview(r).replace('<summary>Composición</summary>','<summary>Composición</summary><p><b>Valores del lote completo.</b> No corresponden a una sola comida del niño.</p>');};
 // Preserve dough/batter ratios when a baking recipe is selected manually.
 const quantify=quantifiedProposal;
 quantifiedProposal=function(source,slot,t,budget,fruit){
  const r=quantify(source,slot,t,budget,fruit);
  if(['fam-pizza-champinones','fam-galletas-platano','fam-galletas-manzana','fam-bizcochitos-pera'].includes(source.baseRecipeId)){
   const b=batchForRecipe(source),factor=r.ingredients[0].qty/b.grams[0];
   for(let n=0;n<source.ingredients.length;n++)r.ingredients[n].qty=Math.max(.1,Math.round(b.grams[n]*factor*10)/10);
  }
  return r;
 };
 const previous=recipeDetails;
 recipeDetails=function(r){return recipeQuantitiesMarkup(r)+previous(r);};
 // The older culinary template was written before quantified batch composition.
 // Hide obsolete placeholder lines while retaining the sources and precautions.
 const culinary=culinaryRecipeDetails;
 culinaryRecipeDetails=function(r){return culinary(r).replace(/ · cantidad pendiente/g,'').replace('Sin composición nutricional calculada.','Consulta la composición y sus cantidades más abajo.');};
}
