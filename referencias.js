/* Completion layer; immutable original tables and private records remain available. */
for(const food of COMPLETED_REFERENCES.foods){NUTRITION_DATA.foods.push(food);NUTRITION_BY_ID[food.id]=food;}
const COMPLETED_BY_ID=Object.fromEntries(COMPLETED_REFERENCES.foods.map(f=>[f.id,f]));
nutritionFoodOptions=function(selected='',suggestions=[]){const foods=COMPLETED_REFERENCES.foods,ids=new Set(suggestions.map(f=>f.id)),option=f=>`<option value="${h(f.id)}" ${f.id===selected?'selected':''}>${h(f.label+' · '+f.weightState)}</option>`;return '<option value="">Selecciona el alimento y su estado</option>'+(selected&&NUTRITION_BY_ID[selected]&&!COMPLETED_BY_ID[selected]?option(NUTRITION_BY_ID[selected]):'')+(suggestions.length?'<optgroup label="Referencias propuestas">'+suggestions.map(option).join('')+'</optgroup>':'')+'<optgroup label="Referencias completas · publicadas y estimadas">'+foods.filter(f=>!ids.has(f.id)).map(option).join('')+'</optgroup>';};
nutritionLibrary=function(){return `<details class="family-recipe"><summary>Composición de alimentos · por 100 g</summary><p>58 referencias · 12 componentes. Publicados y estimados identificados por campo. Las referencias genéricas no son análisis de la marca que compras. Consulta el envase: puede cambiar.</p><form class="nutrition-library"><div class="field"><label for="nutrition-library-food">Alimento</label><select name="food" id="nutrition-library-food" required>${nutritionFoodOptions('ref-queso-sinsal')}</select></div><button class="btn outline" type="submit">Consultar composición</button><div class="nutrition-output" aria-live="polite">${sourceFoodComposition(COMPLETED_BY_ID['ref-queso-sinsal'])}</div></form></details>`;};
const ORIGINAL_NUTRITION_CANDIDATES=nutritionCandidates;
nutritionCandidates=function(name){
 const key=normalizedFood(name).trim(),special={
  'pasta 100% lenteja':'ref-pasta-lenteja','queso fresco pasteurizado bajo en sal':'ref-queso-sinsal',
  'crema 100% cacahuete sin trozos':'ref-cacahuete','lomo de cerdo fresco':'ref-lomo',
  'fruta madura de temporada':'ref-13397'
 };
 if(special[key])return [COMPLETED_BY_ID[special[key]]];
 return ORIGINAL_NUTRITION_CANDIDATES(name).map(f=>COMPLETED_BY_ID['ref-'+f.id]);
};
function defaultCompositionReference(i){return nutritionCandidates(i.name)[0]||null;}
const ORIGINAL_NUTRIENT_CELL=nutrientCell;
nutrientCell=function(n){return (n?.estimated?'≈ ':'')+ORIGINAL_NUTRIENT_CELL(n);};
const ORIGINAL_COMPOSITION=sourceFoodComposition;
sourceFoodComposition=function(food){
 if(!COMPLETED_BY_ID[food.id])return ORIGINAL_COMPOSITION(food);
 return `<p><b>${h(food.label)}</b> · ${h(food.weightState)} · por 100 g comestibles.</p><dl class="nutrient-grid">${NUTRITION_DATA.fields.map(f=>{const n=food.nutrients[f.key];return `<div><dt>${h(f.label)}</dt><dd><b>${h(nutrientCell(n))} ${h(f.unit)}</b><small>${n.estimated?'Estimado':'Publicado'} · ${h(n.provenance.source)}<br/>${h(n.provenance.method)}${n.original&&n.original.status!=='value'?'<br/>Original: '+h(ORIGINAL_NUTRIENT_CELL(n.original)):''}</small></dd></div>`;}).join('')}</dl><p>${h(food.notes||'Composición genérica; el alimento comprado puede variar. Los límites originales no equivalen al punto estimado.')}</p><p><a href="${h(food.sourceUrl)}" target="_blank" rel="noopener noreferrer">Fuente de referencia</a>${food.availabilityUrl&&food.availabilityUrl!==food.sourceUrl?` · <a href="${h(food.availabilityUrl)}" target="_blank" rel="noopener noreferrer">Producto en el supermercado</a>`:''}</p>`;
};
const ORIGINAL_CALCULATE_NUTRITION=calculateNutrition;
calculateNutrition=function(entries){
 const result=ORIGINAL_CALCULATE_NUTRITION(entries);
 for(const field of NUTRITION_DATA.fields){result.totals[field.key].estimated=entries.some(e=>resolveNutritionFood(e).nutrients[field.key]?.estimated);}
 return result;
};
const ORIGINAL_NUTRITION_TABLE=nutritionTable;
nutritionTable=function(result){return ORIGINAL_NUTRITION_TABLE(result).replace(/<dt>(.*?)<\/dt>/g,(match,label)=>{const field=NUTRITION_DATA.fields.find(f=>h(f.label)===label);return '<dt>'+label+(field&&result.totals[field.key].estimated?'<small>Incluye estimación</small>':'')+'</dt>';});};
const ORIGINAL_SOURCE_MARKUP=nutritionSourcesMarkup;
nutritionSourcesMarkup=function(entries){
 const refs=[...new Set(entries.map(e=>e.foodId).filter(id=>COMPLETED_BY_ID[id]))].map(id=>COMPLETED_BY_ID[id]);
 const others=entries.filter(e=>!COMPLETED_BY_ID[e.foodId]);
 return (others.length?ORIGINAL_SOURCE_MARKUP(others):'')+(refs.length?`<details class="family-recipe"><summary>Fuentes y estimaciones de las referencias</summary><p>Datos por 100 g del estado indicado. ≈ identifica campos estimados. No son análisis del plato terminado.</p>${refs.map(f=>`<details><summary>${h(f.label)}</summary>${sourceFoodComposition(f)}</details>`).join('')}</details>`:'');
};
function referenceBatchEntries(r){const batch=batchForRecipe(r);return r.ingredients.map((i,n)=>({foodId:defaultCompositionReference(i)?.id,grams:batch.grams[n]}));}
function referenceBatchPreview(r){if(!batchForRecipe(r))return '';const entries=referenceBatchEntries(r);return `<details class="family-recipe"><summary>Composición orientativa del lote · 12 componentes</summary><p>Pesos de cocina propuestos y referencias precargadas. Fruta de temporada: pera como ejemplo. Leche genérica de mayores: entera como referencia editable. No son cantidades por edad ni datos de lo consumido.</p>${nutritionTable(calculateNutrition(entries))}${nutritionSourcesMarkup(entries)}</details>`;}
const ORIGINAL_BATCH_MARKUP=batchMarkup;
batchMarkup=function(r){return referenceBatchPreview(r)+ORIGINAL_BATCH_MARKUP(r);};
const ORIGINAL_BATCH_FORM=batchForm;
batchForm=function(r){let html=ORIGINAL_BATCH_FORM(r);r.ingredients.forEach((i,n)=>{const ref=defaultCompositionReference(i);if(ref)html=html.replace(labelFoodOptions('',nutritionCandidates(i.name)),labelFoodOptions(ref.id,nutritionCandidates(i.name)));});return html.replaceAll('Referencia de composición (opcional)','Referencia de composición · editable').replaceAll('Sin coincidencia, el total queda incompleto; no se considera cero.','Los campos ≈ son estimaciones. Comprueba que el producto y su estado coincidan.');};
const ORIGINAL_NUTRITION_FORM=nutritionForm;
nutritionForm=function(r){let html=ORIGINAL_NUTRITION_FORM(r);if(!batchForRecipe(r))return html;r.ingredients.forEach((i,n)=>{const ref=defaultCompositionReference(i);if(ref&&!i.foodId&&!i.labelData)html=html.replace(labelFoodOptions('',nutritionCandidates(i.name)),labelFoodOptions(ref.id,nutritionCandidates(i.name)));if(i.qty==null)html=html.replace(`name="grams-${n}" type="number" min="0.01" max="100000" step="any" value=""`,`name="grams-${n}" type="number" min="0.01" max="100000" step="any" value="${batchForRecipe(r).grams[n]}"`);});return '<p><b>Precargado: lote de cocina propuesto, no ración infantil.</b> Puedes sustituir pesos y referencias antes de calcular.</p>'+html;};
