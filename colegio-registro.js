/* Explicit catalog estimates for school logs. Never infer recipes from similar names. */
const SCHOOL_CATALOG_LIMIT=12;
function schoolCatalogLines(text){return String(text||'').split(/\n/).map(s=>s.trim()).filter(Boolean);}
function schoolCatalogRecipe(id,p=profile()){return familyCatalog(p).find(r=>r.baseRecipeId===id);}
function schoolCatalogMatches(text,p=profile()){
 const found=[],missing=[];for(const name of schoolCatalogLines(text)){
  const matches=familyCatalog(p).filter(r=>normalizedFood(r.name).trim()===normalizedFood(name).trim());
  if(matches.length===1){if(!found.includes(matches[0].baseRecipeId))found.push(matches[0].baseRecipeId);}else missing.push(name);
 }return {ids:found,missing};
}
function schoolCatalogEstimate(ids,text,slot='lunch',p=profile()){
 if(!Array.isArray(ids)||!ids.length||ids.length>SCHOOL_CATALOG_LIMIT)throw Error('Añade entre 1 y 12 platos del catálogo para esta toma.');
 const readiness=profileReadiness(p);if(readiness)throw Error(readiness);
 const t=nutritionTargets(p);if(t.guard)throw Error('Revisa el peso, la edad y la actividad del perfil antes de estimar cantidades.');
 const lines=schoolCatalogLines(text).map(n=>normalizedFood(n).trim()),recipes=[...new Set(ids)].map(id=>schoolCatalogRecipe(id,p));
 if(recipes.some(r=>!r))throw Error('Algún plato no está disponible para la edad del perfil. Revisa la selección.');
 const selected=recipes.filter(r=>lines.includes(normalizedFood(r.name).trim()));
 if(!selected.length)throw Error('Conserva el nombre del plato elegido o vuelve a seleccionarlo para estimarlo.');
 const initial=selected.flatMap(r=>{
  const batch=batchForRecipe(r);if(!batch||batch.grams.length!==r.ingredients.length)throw Error('Falta la ficha de cantidades de '+r.name+'.');
  return r.ingredients.map((i,n)=>{const food=i.foodId?NUTRITION_BY_ID[i.foodId]:defaultCompositionReference(i),grams=batch.grams[n]/4;
   if(!food||!Number.isFinite(grams)||grams<=0)throw Error('Falta una referencia o cantidad en '+r.name+'.');
   return {foodId:food.id,grams,group:i.group||'otros',name:i.name};
  });
 });
 if(initial.length>160)throw Error('Hay demasiados ingredientes en esta toma; revísala en partes.');
 const energy=nutritionVector({ingredients:initial.map(i=>({...i,qty:i.grams,unit:'g'}))}).values.kcal;
 if(!(energy>0))throw Error('No se puede estimar la energía de estos platos.');
 // One budget for the whole selected meal. No extra bread, fruit or side dishes are invented.
 const scale=Math.max(.25,Math.min(2,t.kcal*SLOT_BUDGET[slot]/energy));
 const merged=new Map();for(const i of initial){const [lo,hi]=ingredientBounds(i,t),grams=Math.round(Math.max(Math.min(lo,i.grams),Math.min(hi,i.grams*scale))*10)/10;const previous=merged.get(i.foodId);if(previous)previous.grams=Math.round((previous.grams+grams)*10)/10;else merged.set(i.foodId,{foodId:i.foodId,grams,group:i.group});}const entries=[...merged.values()];if(entries.length>45)throw Error('Esta toma supera 45 referencias distintas. Revisa los platos elegidos.');
 const missing=schoolCatalogLines(text).filter(n=>!selected.some(r=>normalizedFood(r.name).trim()===normalizedFood(n).trim()));
 return {text:String(text),recipeIds:selected.map(r=>r.baseRecipeId),names:selected.map(r=>r.name),entries,complete:missing.length===0,basis:t.signature,missing};
}
function schoolCatalogValidate(value,profiles,logs){
 if(value===undefined)return {};if(!isRecord(value)||Object.keys(value).length>10000)throw Error('Registros del catálogo no válidos.');
 const out={};for(const [key,v] of Object.entries(value)){
  const a=key.split('|'),p=profiles.find(p=>p.id===a[0]);
  if(!p||![3,4].includes(a.length)||!schoolDate(a[1])||startWeek(parseDate(a[1]))!==a[1]||!/^[0-6]$/.test(a[2])||a.length===4&&!['breakfast','midmorning'].includes(a[3]))throw Error('Fecha o perfil de registro del catálogo no válido.');
  if(!isRecord(v)||typeof v.text!=='string'||v.text.length>1500||v.text!==logs[key]||typeof v.complete!=='boolean'||typeof v.basis!=='string'||v.basis.length>300)throw Error('Texto o base de estimación escolar no válido.');
  if(!Array.isArray(v.recipeIds)||!v.recipeIds.length||v.recipeIds.length>SCHOOL_CATALOG_LIMIT||new Set(v.recipeIds).size!==v.recipeIds.length||v.recipeIds.some(id=>typeof id!=='string'||!FAMILY_RECIPES.some(r=>!r.ageBand&&r.id===id)))throw Error('Recetas escolares no válidas.');
  if(!Array.isArray(v.names)||v.names.length!==v.recipeIds.length||v.names.some(n=>typeof n!=='string'||!n.trim()||n.length>180))throw Error('Nombres escolares no válidos.');
  if(!Array.isArray(v.entries)||!v.entries.length||v.entries.length>45)throw Error('Ingredientes escolares no válidos.');
  const entries=v.entries.map(e=>{if(!isRecord(e)||typeof e.foodId!=='string'||!Object.hasOwn(NUTRITION_BY_ID,e.foodId)||!Number.isFinite(e.grams)||e.grams<.1||e.grams>5000||!['fruta','verduras','legumbres','lacteos','cereales','proteinas','otros'].includes(e.group))throw Error('Cantidad escolar no válida.');return {foodId:e.foodId,grams:e.grams,group:e.group};});
  out[key]={text:v.text,recipeIds:[...v.recipeIds],names:[...v.names],entries,complete:v.complete,basis:v.basis};
 }return out;
}
function schoolPlanningEnabled(){return schoolComplement()||!!profile().school&&Object.keys(state.schoolCatalogLogs||{}).some(k=>k.startsWith(mealKey()+'|'));}
function schoolCatalogFormKey(form){return (form.dataset.weekKey||mealKey())+'|'+form.dataset.day+((form.dataset.slot||'lunch')==='lunch'?'':'|'+form.dataset.slot);}
function schoolCatalogDraft(form){
 if(!form._schoolCatalogIds){const old=state.schoolCatalogLogs?.[schoolCatalogFormKey(form)];form._schoolCatalogIds=old?[...old.recipeIds]:[];}
 return form._schoolCatalogIds;
}
function schoolCatalogRecipeInfo(r){return `<p><b>Ingredientes de la receta de referencia:</b> ${r.ingredients.map(i=>h(i.name)).join(', ')}.</p><p><b>Alérgenos identificados:</b> ${r.allergens.map(k=>h(ALLERGENS.find(([id])=>id===k)?.[1]||k)).join(', ')||'ninguno identificado'}. Comprueba ingredientes y trazas del colegio.</p><ol>${r.steps.map(s=>`<li>${h(s)}</li>`).join('')}</ol><p>${h(r.safety||'')}</p>`;}
function schoolCatalogSummary(record){
 const ingredients=schoolIngredients({...record,estimated:true}),extra=extraCompositionForIngredients(ingredients);
 return `<p><strong>≈ Estimación del catálogo</strong> · ${record.names.map(h).join(' · ')}</p><p>Gramos comestibles en el estado indicado por cada referencia; no son el peso final cocinado ni una cantidad medida en el colegio.</p><details class="family-recipe"><summary>Ver gramos, nutrientes y fichas</summary><ul>${record.entries.map(e=>`<li>${h(NUTRITION_BY_ID[e.foodId].label)} · <b>${h(fmtNum(e.grams))} g</b> · ${h(NUTRITION_BY_ID[e.foodId].weightState||'')}</li>`).join('')}</ul>${nutritionTable(calculateNutrition(record.entries))}<details class="family-recipe"><summary>Otros componentes disponibles</summary><dl class="nutrient-grid">${EXTRA_COMPOSITION.fields.map(f=>`<div><dt>${h(f.label)}</dt><dd>${h(chartValue(extra[f.key],f.unit))}</dd></div>`).join('')}</dl></details>${nutritionSourcesMarkup(record.entries)}${record.recipeIds.map(id=>{const r=schoolCatalogRecipe(id);return r?`<details class="family-recipe"><summary>${h(r.name)} · ficha del catálogo</summary>${schoolCatalogRecipeInfo(r)}</details>`:'';}).join('')}</details>${record.complete?'':'<p class="danger-text">Faltan referencias para: '+record.missing.map(h).join(' · ')+'. El total sigue pendiente y no se compensa lo desconocido.</p>'}`;
}
function schoolCatalogRefresh(form){
 const output=form.querySelector('#school-catalog-preview'),use=form.querySelector('[name="school-use-catalog"]');if(!output||!use)return;
 const ids=schoolCatalogDraft(form);if(!use.checked){output.innerHTML='<p>Se conserva el registro de texto y, si las introduces, tus cantidades manuales.</p>';return;}
 if(!ids.length){output.innerHTML='<p>Elige un plato y pulsa «Añadir al registro» para incluir sus ingredientes y cantidades orientativas. Para nombres ya escritos, puedes buscar coincidencias exactas.</p>';return;}
 try{output.innerHTML=schoolCatalogSummary(schoolCatalogEstimate(ids,form.querySelector('#school-food').value,form.dataset.slot||'lunch'));}catch(e){output.innerHTML='<p class="danger-text">'+h(e.message)+'</p>';}
}
function readSchoolCatalogForm(form,text){
 const use=form.querySelector?.('[name="school-use-catalog"]');if(!use?.checked||!text.trim())return null;
 const ids=schoolCatalogDraft(form);if(!ids.length)return null;
 const record=schoolCatalogEstimate(ids,text,form.dataset.slot||'lunch');delete record.missing;return record;
}
function schoolCatalogRecoveryRows(){
 const rows=[];for(let day=0;day<7;day++)for(const slot of SCHOOL_SLOTS){
  const key=schoolKey(day,slot),text=state.schoolLogs[key];if(!schoolMeal(day,slot)||!text||state.schoolNutrition?.[key]?.length||state.schoolCatalogLogs?.[key])continue;
  const match=schoolCatalogMatches(text);let estimate=null,error='';try{if(match.ids.length)estimate=schoolCatalogEstimate(match.ids,text,slot);}catch(e){error=e.message;}
  rows.push({key,day,slot,text,estimate,error,missing:match.missing});
 }return rows;
}
function schoolCatalogReviewSignature(){return JSON.stringify([state.activeProfile,state.week,state.schoolLogs,state.schoolNutrition,state.schoolCatalogLogs,nutritionTargets().signature]);}
function schoolCatalogRecoveryMarkup(){
 const rows=schoolCatalogRecoveryRows();return schoolDialog(`<p>Revisa los registros de <b>la semana visible</b>. Solo se aplican coincidencias exactas y completas. Las cantidades manuales se conservan. No se cambia el texto ni se prepara de nuevo el menú de casa.</p><form id="school-catalog-recovery-form">${rows.map((r,n)=>`<section class="selected-surface"><h3>${DAYS[r.day]} · ${h(slotLabel(r.slot))}</h3><p>${h(r.text)}</p>${r.estimate&&r.estimate.complete?`<label><input type="checkbox" name="catalog-recover" value="${n}" checked/>Aplicar esta estimación</label>${schoolCatalogSummary(r.estimate)}`:`<p class="danger-text">${h(r.error||'Sin coincidencia exacta para: '+(r.missing.join(' · ')||r.text))}. Revisa este registro individualmente.</p>`}</section>`).join('')||'<p>No hay registros de texto pendientes de completar en esta semana.</p>'}<p class="form-error" id="school-catalog-recovery-error" role="status"></p><button class="btn primary" type="submit" ${rows.some(r=>r.estimate?.complete)?'':'disabled'}>Aplicar estimaciones seleccionadas</button></form>`,'Completar valores desde el catálogo',true);
}
function installSchoolLogCatalog(){
 const oldRecord=schoolRecord;schoolRecord=function(day,slot='lunch',p=profile()){
  const key=p.id+'|'+state.week+'|'+day+(slot==='lunch'?'':'|'+slot),estimate=state.schoolCatalogLogs?.[key];
  if(!estimate||state.schoolNutrition?.[key]?.length||estimate.text!==state.schoolLogs?.[key])return oldRecord(day,slot,p);
  const stale=estimate.basis!==nutritionTargets(p).signature;
  return {text:estimate.text,entries:estimate.entries,complete:estimate.complete&&!stale&&nutritionVector({ingredients:schoolIngredients(estimate)}).complete,estimated:true,source:stale?'≈ Catálogo · perfil cambiado, revisa la estimación':'≈ Estimación del catálogo',groups:schoolGroups(estimate.text),basis:estimate.basis,stale};
 };
 const oldModal=schoolModal;schoolModal=function(day,slot='lunch'){
  const key=schoolKey(day,slot),manual=!!state.schoolNutrition?.[key]?.length;
  const block=`<section class="school-catalog-box"><label><input type="checkbox" name="school-use-catalog" ${manual?'disabled':'checked'}/>Usar ingredientes y cantidades orientativas del catálogo</label><p>${manual?'Este registro tiene cantidades introducidas manualmente: se conservan.':'Se estima el conjunto de platos como una misma toma; no se añaden guarniciones ni se asigna una comida completa a cada plato. No confirma la receta, los alérgenos ni lo servido en el colegio.'}</p><button type="button" class="btn outline" data-action="school-catalog-match" ${manual?'disabled':''}>Reconocer platos ya escritos</button><div id="school-catalog-preview" aria-live="polite"></div></section>`;
  const html=oldModal(day,slot).replace('Se añade el nombre para que lo adaptes. Elegir un plato similar no confirma sus ingredientes ni cantidades reales.','Se añaden el nombre y, si activas la estimación, los ingredientes y cantidades del catálogo. Revisa siempre las diferencias con el colegio.');
  return html.replace('Con «Automático con Tabla Excel/CSV», los datos conocidos se utilizan en las siguientes propuestas.','Las estimaciones completas del catálogo y del menú escolar se tienen en cuenta al generar las comidas de casa.').replace('nunca se añade a la compra ni se compensan automáticamente las otras tomas.','nunca se añade a la compra. Las estimaciones completas del catálogo y del menú escolar se tienen en cuenta al generar las comidas de casa.').replace('<details class="family-recipe"><summary>Añadir cantidades para la revisión nutricional · opcional</summary>',block+'<details class="family-recipe"><summary>Añadir cantidades para la revisión nutricional · opcional</summary>');
 };
 const oldRender=render;render=function(){oldRender();const form=document.getElementById('school-form');if(form)schoolCatalogRefresh(form);};
 const oldPanel=schoolPanel;schoolPanel=function(){return oldPanel().replace('<div class="school-list">','<div class="toolbar"><button type="button" class="btn outline" data-action="school-catalog-recover">Completar valores desde el catálogo</button></div><p>Las cantidades conocidas de los registros manuales del catálogo también se tienen en cuenta al generar las comidas de casa. Revisa los objetivos pendientes después de generar.</p><div class="school-list">');};
 renderSchool=schoolPanel;
 const oldBalanceReview=renderBalanceReview;renderBalanceReview=function(){const html=oldBalanceReview();if(schoolPlanningEnabled()&&!menu().schoolBasis&&Object.keys(state.schoolCatalogLogs||{}).some(k=>k.startsWith(mealKey()+'|')))return html.replace('<h2>Revisión nutricional de la propuesta</h2>','<h2>Revisión nutricional de la propuesta</h2><p class="school-mode-hint">Has guardado estimaciones del colegio. Las comidas de casa actuales se conservan: genera de nuevo el menú para ajustarlas con esos datos y revisa los objetivos pendientes.</p>');return html;};
 const oldRenderModal=renderModal;renderModal=function(){return state.modal?.type==='school-catalog-recovery'?schoolCatalogRecoveryMarkup():oldRenderModal();};
 document.addEventListener('click',event=>{
  const el=event.target.closest?.('[data-action]');if(!el)return;
  if(el.dataset.action==='school-catalog-recover'){openModal('school-catalog-recovery',{catalogSignature:schoolCatalogReviewSignature()});return;}
  if(!['school-add-name','school-catalog-match'].includes(el.dataset.action))return;
  const form=el.closest?.('form');if(!form)return;
  const use=form.querySelector('[name="school-use-catalog"]');if(!use||use.disabled)return;
  if(el.dataset.action==='school-catalog-match')form._schoolCatalogIds=schoolCatalogMatches(form.querySelector('#school-food').value).ids;
  else{const select=form.querySelector('#school-manual-dish');if(select.dataset.addedName!==select.value)return;const r=familyCatalog().find(r=>r.name===select.value);if(r&&!schoolCatalogDraft(form).includes(r.baseRecipeId))form._schoolCatalogIds.push(r.baseRecipeId);}
  schoolCatalogRefresh(form);
 });
 document.addEventListener('input',event=>{const form=event.target.closest?.('form');if(form?.id!=='school-form')return;if(/^school-grams-/.test(event.target.name)){const use=form.querySelector('[name="school-use-catalog"]');if(use&&!use.disabled)use.checked=false;schoolCatalogRefresh(form);}else if(event.target.id==='school-food')schoolCatalogRefresh(form);});
 document.addEventListener('change',event=>{if(event.target.name==='school-use-catalog')schoolCatalogRefresh(event.target.closest('form'));else if(/^school-food-/.test(event.target.name)){const form=event.target.closest('form'),use=form?.querySelector('[name="school-use-catalog"]');if(use&&!use.disabled)use.checked=false;if(form)schoolCatalogRefresh(form);}});
 document.addEventListener('submit',event=>{
  const form=event.target;if(form.id!=='school-catalog-recovery-form')return;event.preventDefault();
  try{if(state.modal?.catalogSignature!==schoolCatalogReviewSignature())throw Error('Los datos han cambiado. Vuelve a abrir la revisión.');const rows=schoolCatalogRecoveryRows(),indices=new FormData(form).getAll('catalog-recover').map(Number);if(!indices.length)throw Error('Selecciona al menos un registro.');
   const logs={...state.schoolCatalogLogs};for(const n of indices){const r=rows[n];if(!r?.estimate?.complete||state.schoolNutrition?.[r.key]?.length)throw Error('La revisión ha cambiado. Vuelve a abrirla.');const e={...r.estimate};delete e.missing;logs[r.key]=e;}
   if(!commitUserState({...state,schoolCatalogLogs:logs,modal:null}))throw Error('No se pudo guardar. Se conservan los registros anteriores.');render();notify('Estimaciones guardadas. Genera de nuevo las comidas de casa para tenerlas en cuenta.');
  }catch(e){form.querySelector('#school-catalog-recovery-error').textContent=e.message;}
 });
}
