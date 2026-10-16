/* Optional ingredient-level USDA factors; no automatic or duplicate correction. */
const RETENTION_BY_CODE=Object.fromEntries(RETENTION_DATA.records.map(r=>[r.code,r]));
function retentionChoices(foodId){
 if(!Object.hasOwn(NUTRITION_BY_ID,foodId))return [];const food=NUTRITION_BY_ID[foodId];if(/cocid/i.test(food.weightState))return [];
 const id=food.originalId||food.id.replace(/^ref-/,''),sets={
  '22000':['0101','0103','0105'],'36017':['0805','0856','0855'],
  '26044':['2302','2301','2402','2401'],'26043':['2302','2301','2402','2401'],'26036':['2452','2451','2552','2551'],
  'lomo':['1254'],'28204':['1254'],'6250':['0752'],'6254':['0752'],
  '4008':['3302','3308','3309'],'20385':['3751'],'20009':['3451','3455','3456','3464'],
  '9415':['0301','0302'],'9810':['0381','0384'],'9870':['0381','0384'],'9100':['0431','0432'],'9102':['0431','0432'],
  '19024':['2151','2152'],'19042':['2151','2152']
 };
 const others=['20020','20034','20044','20072','20061','20057','20016','20056'];
 return (sets[id]||(others.includes(id)?['3771','3775','3776','3784']:[])).map(code=>RETENTION_BY_CODE[code]);
}
function validRetention(code,foodId){if(typeof code!=='string'||!Object.hasOwn(RETENTION_BY_CODE,code)||!retentionChoices(foodId).some(r=>r.code===code))throw Error('El método de cocción no corresponde a esta referencia. Elige una referencia cruda compatible; no se vuelve a corregir una ya cocinada.');return code;}
function retentionOptions(foodId,selected=''){return '<option value="">Sin ajuste de cocción</option>'+retentionChoices(foodId).map(r=>`<option value="${r.code}" ${r.code===selected?'selected':''}>${h(r.label)}</option>`).join('');}
function retentionEditor(r,index,scope){const i=r.ingredients[index],selected=i.labelData?'':i.foodId||defaultCompositionReference(i)?.id||'',code=i.retentionCode||'',choices=retentionChoices(selected);return `<details class="family-recipe"><summary>Cocción · ajuste opcional</summary><label for="rf-${scope}-${h(r.id)}-${index}">Método aplicado a ${h(i.name)}</label><select id="rf-${scope}-${h(r.id)}-${index}" name="retention-${index}">${retentionOptions(selected,code)}</select><small data-retention-help>${choices.length?'Ajuste parcial USDA: calcio, hierro, sodio, sal equivalente y B12. Los demás componentes no se corrigen.':'Esta referencia no tiene un método compatible incorporado. Las etiquetas propias y referencias cocinadas conservan sus valores.'}</small></details>`;}
function insertRetentionEditors(html,r,scope){let index=0;return html.replace(/<\/fieldset>/g,()=>retentionEditor(r,index++,scope)+'</fieldset>');}
const BATCH_FORM_BEFORE_RETENTION=batchForm;
batchForm=function(r){return insertRetentionEditors(BATCH_FORM_BEFORE_RETENTION(r),r,'batch').replace('sus alimentos y estados.','sus alimentos, estados y métodos de cocción.');};
const NUTRITION_FORM_BEFORE_RETENTION=nutritionForm;
nutritionForm=function(r){return insertRetentionEditors(NUTRITION_FORM_BEFORE_RETENTION(r),r,'calc');};
const READ_REFERENCE_BEFORE_RETENTION=readIngredientReference;
readIngredientReference=function(data,index){const ref=READ_REFERENCE_BEFORE_RETENTION(data,index),code=String(data.get('retention-'+index)||'');if(code){if(ref.labelData)throw Error('Las etiquetas propias no admiten este ajuste de cocción.');ref.retentionCode=validRetention(code,ref.foodId);}return ref;};
const RESOLVE_BEFORE_RETENTION=resolveNutritionFood;
resolveNutritionFood=function(entry){const food=RESOLVE_BEFORE_RETENTION(entry);if(!entry.retentionCode)return food;const code=validRetention(entry.retentionCode,entry.foodId),row=RETENTION_BY_CODE[code],factors={...row.factors,salt:row.factors.sodium};return {...food,nutrients:Object.fromEntries(Object.entries(food.nutrients).map(([key,n])=>{const factor=factors[key];if(factor===undefined)return [key,n];return [key,{...n,value:n.value===null?null:n.value*factor,...(n.limit!==undefined?{limit:n.limit*factor}:{}),estimated:true,retentionApplied:true}];}))};};
const CALCULATE_BEFORE_RETENTION=calculateNutrition;
calculateNutrition=function(entries){const result=CALCULATE_BEFORE_RETENTION(entries);result.retentionRequested=entries.some(e=>e.retentionCode);for(const field of NUTRITION_DATA.fields)result.totals[field.key].retentionApplied=entries.some(e=>resolveNutritionFood(e).nutrients[field.key]?.retentionApplied);return result;};
const TABLE_BEFORE_RETENTION=nutritionTable;
nutritionTable=function(result){const table=TABLE_BEFORE_RETENTION(result).replace(/<dt>(.*?)<\/dt>/g,(match,label)=>{if(!result.retentionRequested)return match;const field=NUTRITION_DATA.fields.find(f=>label.startsWith(h(f.label)));if(!field||!result.totals[field.key].retentionApplied)return match;return match.replace('Incluye estimación','Estimado · ajuste de cocción parcial');});return (result.retentionRequested?'<p>Ajuste parcial en los componentes señalados. Energía, proteínas, hidratos, grasas, azúcares, fibra y vitamina D siguen sin corrección.</p>':'')+table;};
const PREPARATION_BEFORE_RETENTION=preparationFromBatch;
preparationFromBatch=function(batch,slot){const r=PREPARATION_BEFORE_RETENTION(batch,slot);batch.entries.forEach((e,n)=>{if(e.retentionCode)r.ingredients[n].retentionCode=validRetention(e.retentionCode,e.foodId);});return r;};
const PRESERVE_BEFORE_RETENTION=preserveIngredientReference;
preserveIngredientReference=function(previous,ingredient){const next=PRESERVE_BEFORE_RETENTION(previous,ingredient),matches=(previous?.ingredients||[]).filter(i=>i.name===ingredient.name&&i.unit===ingredient.unit);if(matches.length===1&&next.foodId&&matches[0].retentionCode)next.retentionCode=validRetention(matches[0].retentionCode,next.foodId);return next;};
const SOURCES_BEFORE_RETENTION=nutritionSourcesMarkup;
nutritionSourcesMarkup=function(entries){const rows=[...new Set(entries.filter(e=>e.retentionCode).map(e=>validRetention(e.retentionCode,e.foodId)))].map(c=>RETENTION_BY_CODE[c]);return SOURCES_BEFORE_RETENTION(entries)+(rows.length?`<details class="family-recipe"><summary>Factores de cocción utilizados · USDA 2007</summary><p>Ajuste por ingrediente, no por edad. Sal equivalente: se usa el factor de sodio. Vitamina D, energía, proteínas, hidratos, grasas, azúcares y fibra quedan sin ajuste.</p><ul>${rows.map(r=>`<li>${h(r.label)} · código ${r.code} · ${h(r.sourceName)} · calcio ${r.factors.calcium*100}%, hierro ${r.factors.iron*100}%, sodio ${r.factors.sodium*100}%, B12 ${r.factors.vitaminB12*100}% retenido.</li>`).join('')}</ul><a href="${RETENTION_DATA.url}" target="_blank" rel="noopener noreferrer">Tabla oficial USDA, Release 6 (2007)</a></details>`:'');};
document.addEventListener('change',event=>{const el=event.target;if(!el.matches?.('select[name^="food-"]'))return;const box=el.closest('fieldset'),select=box?.querySelector('select[name^="retention-"]');if(!select)return;select.innerHTML=retentionOptions(el.value);const help=box.querySelector('[data-retention-help]');if(help)help.textContent=retentionChoices(el.value).length?'Ajuste parcial USDA. Revisa el método; los demás componentes quedan sin corrección.':'Sin correspondencia incorporada. Se conservan los valores de la referencia.';});
