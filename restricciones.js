/* V0.27: filtros deterministas. No certifican etiquetas, trazas o cocina real. */
const DIET_FOODS=[];
function dietFood(id,label,refs,allergens=[],reviewed=true){DIET_FOODS.push({id,label,refs:refs.split(' ').filter(Boolean).map(x=>x.startsWith('ref-')?x:'ref-'+x),allergens,reviewed});}
dietFood('pasta-lenteja','Pasta de lenteja','9876 pasta-lenteja');
dietFood('tortilla-trigo','Tortilla de trigo para rellenar','7815',['gluten'],false);
dietFood('leche','Leche','19042 19024',['leche']);dietFood('agua','Agua','18066');
dietFood('lentejas','Lentejas','20360 20359');dietFood('judias-blancas','Judías blancas','20502 20501');dietFood('garbanzos','Garbanzos','20507 20516');
dietFood('arroz','Arroz','9100 9104 9102 9103');dietFood('pasta','Pasta de trigo','9870 9871 9810 9811',['gluten']);
dietFood('zanahoria','Zanahoria','20009');dietFood('calabacin','Calabacín','20020');dietFood('tomate','Tomate','20385');dietFood('cebolla','Cebolla','20034');dietFood('calabaza','Calabaza','20044');dietFood('guisantes','Guisantes','20072 20037');dietFood('judias-verdes','Judías verdes','20061');dietFood('patata','Patata','4008');
dietFood('merluza','Merluza','26044 26120',['pescado']);dietFood('salmon','Salmón','26036 26230',['pescado']);dietFood('bacalao','Bacalao','26043 26023',['pescado']);dietFood('huevo','Huevo','22000 22010',['huevo']);
dietFood('pollo','Pollo','36017 36018 36024 36022');dietFood('ternera','Ternera y vacuno','6250 6254 6116');dietFood('cerdo','Cerdo','28204 lomo');
dietFood('brocoli','Brócoli','20057');dietFood('coliflor','Coliflor','20016');dietFood('champinones','Champiñones','20056');dietFood('aguacate','Aguacate','13004');dietFood('platano','Plátano','13005');dietFood('pera','Pera','13397');dietFood('mandarina','Mandarina','13024');
dietFood('avena','Avena','32140',['gluten']);dietFood('pan','Pan integral','7110',['gluten'],false);dietFood('yogur','Yogur','19593',['leche']);dietFood('aceite','Aceite de oliva','17270');dietFood('harina-trigo','Harina de trigo','9415',['gluten']);
dietFood('queso','Queso','queso-sinsal queso-condis 19590 queso-tierno',['leche'],false);
dietFood('cacahuete','Cacahuete','cacahuete',['cacahuete']);
dietFood('manzana','Manzana','13039');dietFood('naranja','Naranja','13034');dietFood('kiwi','Kiwi','13021');dietFood('fresa','Fresa','13014');dietFood('melocoton','Melocotón','13398');dietFood('mango','Mango','13025');
dietFood('pimiento','Pimiento rojo','20087');dietFood('puerro','Puerro','20039');dietFood('berenjena','Berenjena','20053');dietFood('boniato','Boniato','4101');dietFood('quinoa','Quinoa','9341');dietFood('cuscus','Cuscús','9681',['gluten']);dietFood('pavo','Pavo fresco','36304');
dietFood('sardina','Sardina','26065',['pescado']);dietFood('trucha','Trucha','27009',['pescado']);dietFood('alubias-rojas','Alubias rojas','20524');dietFood('tofu','Tofu','20904',['soja']);dietFood('almendra','Almendra','15041',['frutos_cascara']);dietFood('nuez','Nuez','15005',['frutos_cascara']);
dietFood('pepino','Pepino','20210');dietFood('maiz','Maíz','20066');dietFood('esparragos','Espárragos','20279');dietFood('alcachofa','Alcachofa','20232');dietFood('col','Col verde','20069');dietFood('coles-bruselas','Coles de Bruselas','20058');dietFood('conejo','Conejo de granja','34001');
dietFood('impulsor','Impulsor para repostería','11046',[],false);dietFood('levadura','Levadura seca','11045');dietFood('atun','Atún','26181',['pescado']);
dietFood('pavo-lonchas','Pavo en lonchas','pavo99-lonchas',[],false);dietFood('pollo-lonchas','Pollo en lonchas','pollo99-lonchas',[],false);dietFood('picos','Picos de pan','picos-fibra',['gluten'],false);
dietFood('lechuga','Lechuga','20031');dietFood('abadejo','Abadejo','26129',['pescado']);dietFood('rape','Rape','26018',['pescado']);dietFood('tomillo','Tomillo','11038');
const DIET_GROUPS={trigo:['pasta','pan','harina-trigo','cuscus','tortilla-trigo','picos'],lacteos:['leche','yogur','queso'],leche:['leche','yogur','queso'],pollo:['pollo','pollo-lonchas'],pavo:['pavo','pavo-lonchas'],pescado:['merluza','salmon','bacalao','sardina','trucha','atun','abadejo','rape'],'frutos-cascara':['almendra','nuez']};
for(const [id,label] of [['trigo','Trigo y derivados'],['lacteos','Leche y derivados'],['pescado','Pescado'],['frutos-cascara','Frutos de cáscara']])DIET_FOODS.push({id,label,refs:[],allergens:[],reviewed:true,members:DIET_GROUPS[id]});
const DIET_BY_ID=new Map(DIET_FOODS.map(x=>[x.id,x]));
const DIET_BY_REF=new Map(DIET_FOODS.flatMap(f=>f.refs.map(id=>[id,f])));
let DIET_NAME_MAP=null;
function dietNames(){
 if(DIET_NAME_MAP)return DIET_NAME_MAP;const map=new Map();
 for(const r of AGE_RECIPES)for(const i of r.ingredients){const ref=defaultCompositionReference(i);if(ref&&DIET_BY_REF.has(ref.id))map.set(dietNorm(i.name),DIET_BY_REF.get(ref.id));}
 for(const f of Object.values(COMPLETED_BY_ID))map.set(dietNorm(f.label),DIET_BY_REF.get(f.id));
 for(const [name,id] of [['Leche entera pasteurizada','ref-19024'],['Leche pasteurizada sin azúcar','ref-19042'],['Yogur natural sin azúcar','ref-19593'],['Pera madura','ref-13397'],['Mandarina','ref-13024'],['Plátano maduro','ref-13005'],['Manzana','ref-13039']])map.set(dietNorm(name),DIET_BY_REF.get(id));
 DIET_NAME_MAP=map;return map;
}
const DIET_ALIASES={champinon:'champinones',champiñones:'champinones',champiñon:'champinones',salmon:'salmon',huevos:'huevo',kiwis:'kiwi',almendras:'almendra',nueces:'nuez',cacahuetes:'cacahuete',lacteos:'lacteos',leche:'leche',pasta:'pasta',pan:'pan',ternera:'ternera',vacuno:'ternera',pavo:'pavo',arroz:'arroz',calabacin:'calabacin',champinones:'champinones',lenteja:'lentejas',garbanzo:'garbanzos'};
function dietNorm(value){return normalizedFood(String(value||'')).trim().replace(/\s+/g,' ');}
let DIET_RECIPES_CACHE=null;
const DIET_SETTINGS_CACHE=new Map(),DIET_INGREDIENT_CACHE=new Map();
function dietRecipes(){return DIET_RECIPES_CACHE||(DIET_RECIPES_CACHE=FAMILY_RECIPES.filter(r=>!r.ageBand));}
function dietValidateList(value,allergy=false){
 if(!Array.isArray(value)||value.length>60)throw Error('Revisa la lista de alimentos y platos.');
 const seen=new Set();return value.map(x=>{if(!isRecord(x)||Object.keys(x).some(k=>!['kind','id'].includes(k))||!['food','recipe'].includes(x.kind)||typeof x.id!=='string'||allergy&&x.kind!=='food'||x.kind==='food'&&!DIET_BY_ID.has(x.id)||x.kind==='recipe'&&!dietRecipes().some(r=>r.id===x.id))throw Error('Hay una selección de alimentos o platos no válida.');const key=x.kind+'|'+x.id;if(seen.has(key))throw Error('Hay selecciones duplicadas.');seen.add(key);return {kind:x.kind,id:x.id};});
}
function dietSettings(p=profile()){
 p=p||{};
 const key=JSON.stringify([p.dietAvoid,p.dietOtherAllergies,p.excluded]);if(DIET_SETTINGS_CACHE.has(key))return DIET_SETTINGS_CACHE.get(key);
 try{const result={avoid:dietValidateList(p.dietAvoid===undefined?[]:p.dietAvoid),allergy:dietValidateList(p.dietOtherAllergies===undefined?[]:p.dietOtherAllergies,true),pending:String(p.excluded||'').trim()};if(DIET_SETTINGS_CACHE.size>128)DIET_SETTINGS_CACHE.clear();DIET_SETTINGS_CACHE.set(key,result);return result;}
 catch{return {avoid:[],allergy:[],pending:'Hay selecciones anteriores no válidas. Revisa y guarda el perfil.'};}
}
function dietActive(p=profile()){const d=dietSettings(p);return !!(d.avoid.length||d.allergy.length||p.restrictions?.length||d.pending);}
function dietHasAllergy(p=profile()){return !!(p.restrictions?.length||dietSettings(p).allergy.length);}
function dietConfigurationBlock(p=profile()){return dietSettings(p).pending?'Revisa en Perfiles los alimentos o platos pendientes de identificar y guarda el perfil.':'';}
function dietResolve(text,foodOnly=false){
 const n=dietNorm(text),food=DIET_FOODS.find(f=>n===dietNorm('Ingrediente · '+f.label)||n===dietNorm(f.label)||n===f.id)||DIET_BY_ID.get(DIET_ALIASES[n]);
 const recipes=foodOnly?[]:dietRecipes().filter(r=>n===dietNorm('Plato · '+r.name)||n===dietNorm(r.name));
 if(food&&recipes.length&&!/^ingrediente /.test(n)&&!/^plato /.test(n))return null;
 return food?{kind:'food',id:food.id}:recipes.length===1?{kind:'recipe',id:recipes[0].id}:null;
}
function dietItemLabel(x){return x.kind==='food'?DIET_BY_ID.get(x.id)?.label:dietRecipes().find(r=>r.id===x.id)?.name;}
function dietIngredientInfo(i){
 const key=i.foodId+'|'+i.name;if(!i.labelData&&DIET_INGREDIENT_CACHE.has(key))return DIET_INGREDIENT_CACHE.get(key);
 let food=null;try{food=i.foodId?NUTRITION_BY_ID[i.foodId]:defaultCompositionReference(i);}catch{}
 const provided=food?(DIET_BY_REF.get(food.id)||DIET_BY_REF.get('ref-'+food.id)):null,named=dietNames().get(dietNorm(i.name)),f=named||provided;
 // Una etiqueta personalizada o un comparable desconocido no acredita ausencia de alérgenos.
 const foods=[...new Set([named,provided].filter(Boolean))],ids=foods.map(f=>f.id);
 const result={food:f,allergens:[...new Set(foods.flatMap(f=>f.allergens))],known:!!named&&named.reviewed&&(!provided||provided.id===named.id)&&!i.labelData,keys:[...ids,...Object.entries(DIET_GROUPS).filter(([,v])=>v.some(id=>ids.includes(id))).map(([k])=>k)]};if(!i.labelData){if(DIET_INGREDIENT_CACHE.size>2000)DIET_INGREDIENT_CACHE.clear();DIET_INGREDIENT_CACHE.set(key,result);}return result;
}
function dietRecipeBase(r){if(r?.baseRecipeId)return r.baseRecipeId;const source=r?.planningBasis?.sourceRecipeId||r?.quantityBasis?.sourceRecipeId;if(source)return AGE_RECIPES.find(x=>x.id===source)?.baseRecipeId||source;return r?.id;}
function dietRecipeCheck(r,p=profile(),ingredientOnly=false){
 if(!dietActive(p))return {ok:true,reasons:[]};const d=dietSettings(p),reasons=[];
 if(d.pending)reasons.push('Restricciones pendientes de revisar');
 if(!r?.ingredients?.length)return {ok:false,reasons:[...reasons,'Ingredientes sin identificar']};
 if(!ingredientOnly&&d.avoid.some(x=>x.kind==='recipe'&&(x.id===dietRecipeBase(r)||dietNorm(r.name)===dietNorm(dietItemLabel(x)))))reasons.push('Plato excluido del perfil');
 const allergens=new Set(r.allergens||[]);let unknown=false;
 for(const i of r.ingredients){const info=dietIngredientInfo(i);if(!info.known)unknown=true;for(const a of info.allergens)allergens.add(a);
  for(const x of [...d.avoid,...d.allergy])if(x.kind==='food'&&info.keys.includes(x.id))reasons.push(dietItemLabel(x));
  if(!info.food&&(d.avoid.some(x=>x.kind==='food')||d.allergy.length))reasons.push('Ingrediente sin correspondencia revisada');
 }
 for(const a of p.restrictions||[])if(allergens.has(a))reasons.push(ALLERGENS.find(([k])=>k===a)?.[1]||a);
 if(dietHasAllergy(p)&&unknown)reasons.push('Información de ingredientes o alérgenos insuficiente');
 if(d.avoid.some(x=>x.kind==='food')&&unknown)reasons.push('Información insuficiente para comprobar los ingredientes excluidos');
 return {ok:!reasons.length,reasons:[...new Set(reasons)]};
}
function dietCanAdd(name,p=profile()){return dietRecipeCheck({ingredients:[{name}],allergens:[]},p,true).ok;}
function dietFruitName(name,p=profile()){return [name,'Pera madura','Mandarina','Plátano maduro','Manzana'].find(n=>dietCanAdd(n,p))||'';}
function dietEnsureRecipe(r,p=profile()){const check=dietRecipeCheck(r,p);if(!check.ok)throw Error('No se puede incluir '+r.name+': '+check.reasons.join(', ')+'.');return r;}
function dietFixedConflicts(old,p=profile(),allSaved=false){
 if(!dietActive(p))return [];const rows=[];
 for(let day=0;day<7;day++)for(const [slot] of activeMeals()){
  let r=null,school=false;const m=old.days?.[day]?.[slot]||emptyMeal();
  if(schoolMeal(day,slot)){school=true;const record=schoolRecord(day,slot);if(record.text||record.entries.length){r={name:record.text||'Comida del colegio',ingredients:schoolIngredients(record),allergens:[]};
    const named=dietSettings(p).avoid.filter(x=>x.kind==='recipe').some(x=>schoolCatalogLines(record.text).some(n=>dietNorm(n)===dietNorm(dietItemLabel(x))));
    if(named){rows.push({day,slot,school,reason:'Plato escolar excluido'});continue;}
    if(!record.complete){rows.push({day,slot,school,reason:'Información escolar incompleta para comprobar las restricciones'});continue;}
   }else{rows.push({day,slot,school,reason:'Falta revisar el menú del colegio'});continue;}
  }else if(allSaved||m.locked||m.external){r=recipeById(m.recipeId);if(!r)continue;}else continue;
  const check=dietRecipeCheck(r,p,school);if(!check.ok)rows.push({day,slot,school,reason:check.reasons.join(', ')});
 }
 return rows;
}
function dietAssertFixed(old){const rows=dietFixedConflicts(old);if(rows.length){const x=rows[0];throw Error(DAYS[x.day]+' · '+slotLabel(x.slot)+': '+x.reason+'. Revisa '+(x.school?'el registro con el colegio':'la comida conservada o su bloqueo')+' antes de generar.');}}
function dietControlsMarkup(p){
 const d=dietSettings(p),pending=[],avoid=[...d.avoid];
 for(const line of String(p?.excluded||'').split(/[\n;]/).map(x=>x.trim()).filter(Boolean)){const x=dietResolve(line);if(x&&!avoid.some(a=>a.kind===x.kind&&a.id===x.id))avoid.push(x);else if(!x)pending.push(line);}
 const chips=(items,field)=>items.map((x,n)=>`<span class="diet-chip"><span>${h(dietItemLabel(x))}<small>${field==='dietOtherAllergies'?'Alergia':x.kind==='recipe'?'Plato':'Ingrediente'}</small></span><button type="button" class="icon-btn" data-action="diet-remove" data-field="${field}" data-index="${n}" aria-label="Quitar ${h(dietItemLabel(x))}">${icon('close')}</button></span>`).join('');
 return `<section class="diet-controls" id="diet-controls"><h3>Alimentos y platos a evitar</h3><p>Excluye un ingrediente de todas las recetas o solo un plato concreto.</p><input type="hidden" name="dietAvoid" value="${h(JSON.stringify(avoid))}"/><input type="hidden" name="dietOtherAllergies" value="${h(JSON.stringify(d.allergy))}"/><div class="diet-chips" data-diet-chips="dietAvoid">${chips(avoid,'dietAvoid')}</div><label class="field" for="diet-search">Buscar ingrediente o plato<input id="diet-search" list="diet-options" autocomplete="off" placeholder="Por ejemplo: champiñones o tortilla de calabacín"/></label><datalist id="diet-options">${DIET_FOODS.map(f=>`<option value="Ingrediente · ${h(f.label)}"></option>`).join('')}${dietRecipes().map(r=>`<option value="Plato · ${h(r.name)}"></option>`).join('')}</datalist><button type="button" class="btn outline" data-action="diet-add">${icon('plus')}Añadir exclusión</button><label class="field diet-legacy" for="pf-excluded" ${pending.length?'':'hidden'}>Texto pendiente de identificar<textarea id="pf-excluded" name="excluded" rows="2" placeholder="Una selección por línea; utiliza el buscador para identificarla">${h(pending.join('\n'))}</textarea><small>El texto anterior se conserva. Identifica cada entrada con el buscador o corrígela antes de generar. Guarda el perfil para aplicar las selecciones.</small></label><h3>Otras alergias alimentarias</h3><p>Para un alimento que no aparezca en los grupos de arriba.</p><div class="diet-chips" data-diet-chips="dietOtherAllergies">${chips(d.allergy,'dietOtherAllergies')}</div><label class="field" for="diet-allergy-search">Buscar otro alimento alérgeno<input id="diet-allergy-search" list="diet-food-options" autocomplete="off" placeholder="Por ejemplo: kiwi o garbanzos"/></label><datalist id="diet-food-options">${DIET_FOODS.map(f=>`<option value="${h(f.label)}"></option>`).join('')}</datalist><button type="button" class="btn outline" data-action="diet-allergy-add">${icon('plus')}Añadir otra alergia</button><p class="diet-feedback" role="status" id="diet-feedback"></p><small>La app filtra ingredientes y alérgenos identificados. Comprueba etiquetas, trazas y la preparación real. Las fichas incompletas quedan fuera de la generación con alergias.</small></section>`;
}
function readDietForm(data,previous){
 const read=(name,allergy)=>{if(!data.has(name))return dietValidateList(previous?.[name]||[],allergy);let value;try{value=JSON.parse(data.get(name));}catch{throw Error('Revisa las selecciones de alimentos.');}return dietValidateList(value,allergy);};
 return {dietAvoid:read('dietAvoid',false),dietOtherAllergies:read('dietOtherAllergies',true)};
}
function installDietFilters(){
 const oldForm=renderProfileForm;renderProfileForm=function(p){return oldForm(p).replace(/<div class="field"[^>]*><label for="pf-excluded">[\s\S]*?<\/textarea><\/div>/,dietControlsMarkup(p)).replace('«Ninguna conocida» por defecto. Comprueba los ingredientes, las etiquetas y las posibles trazas. La app no certifica que una receta sea apta para sus alergias.','Selecciona las alergias conocidas. Se omiten sus alérgenos identificados y las fichas incompletas al generar. Comprueba etiquetas, trazas y preparación real.');};
 const oldSave=saveProfile;saveProfile=function(form){for(const id of ['diet-search','diet-allergy-search'])if(form.querySelector?.('#'+id)?.value.trim()){errorForm('profile-error','Pulsa Añadir para incluir la selección pendiente o vacía el buscador antes de guardar.');return false;}return oldSave(form);};
 const oldReusable=reusablePreparations;reusablePreparations=function(slot){return oldReusable(slot).filter(r=>dietRecipeCheck(r).ok);};
 const oldProposal=quantifiedProposal;quantifiedProposal=function(...args){return dietEnsureRecipe(oldProposal(...args));};
 const oldWeek=generateQuantifiedWeek;generateQuantifiedWeek=function(old,seed,t){dietAssertFixed(old);NUTRIENT_CHOICE_CACHE.clear();const result=oldWeek(old,seed,t);for(const r of Object.values(result.recipes))dietEnsureRecipe(r);return result;};
 const oldBackup=validateBackup;validateBackup=function(input){const result=oldBackup(input);for(const p of result.profiles){const raw=input.data.profiles.find(x=>x.id===p.id);p.dietAvoid=dietValidateList(raw.dietAvoid===undefined?[]:raw.dietAvoid);p.dietOtherAllergies=dietValidateList(raw.dietOtherAllergies===undefined?[]:raw.dietOtherAllergies,true);}return result;};
 notice=function(){if(!dietActive())return '';const d=dietSettings();return `<aside class="diet-summary" role="status"><b>Filtros del perfil activos</b><p>${h(d.pending?'Hay texto pendiente de identificar en Perfiles.':'Se omiten los alimentos, platos y alérgenos identificados. Comprueba etiquetas, trazas y preparación real.')}</p></aside>`;};
 const oldRenderWeek=renderWeek;renderWeek=function(){const html=oldRenderWeek();if(!dietActive())return html;const rows=dietFixedConflicts(menu(),profile(),true);return (rows.length?`<section class="surface panel-pad diet-conflicts"><h2>Revisa las restricciones de esta semana</h2><p>Se conservan tus comidas guardadas. Revisa estos conflictos antes de utilizarlas.</p><ul>${rows.map(x=>`<li>${h(DAYS[x.day]+' · '+slotLabel(x.slot)+': '+x.reason)}</li>`).join('')}</ul></section>`:'')+html;};
 const oldCriteria=familyCriteria;familyCriteria=function(){return oldCriteria().replace('Las alergias y exclusiones bloquean la generación.','La generación omite los alimentos, platos y alérgenos identificados del perfil. Con alergias no utiliza fichas con información insuficiente. Las trazas y la preparación real requieren revisión.');};
}
document.addEventListener('click',event=>{
 const el=event.target.closest?.('[data-action]');if(!el||!['diet-add','diet-allergy-add','diet-remove'].includes(el.dataset.action))return;
 const form=el.closest('form'),output=form?.querySelector('#diet-feedback');if(!form||!output)return;
 try{const allergy=el.dataset.action==='diet-allergy-add',field=el.dataset.action==='diet-remove'?el.dataset.field:allergy?'dietOtherAllergies':'dietAvoid';if(!['dietAvoid','dietOtherAllergies'].includes(field))return;const hidden=form.querySelector('[name="'+field+'"]'),items=dietValidateList(JSON.parse(hidden.value),field==='dietOtherAllergies');
  if(el.dataset.action==='diet-remove')items.splice(Number(el.dataset.index),1);else{const input=form.querySelector(allergy?'#diet-allergy-search':'#diet-search'),item=dietResolve(input.value,allergy);if(!item)throw Error('Elige una coincidencia de la lista para identificar exactamente el alimento o plato.');if(items.some(x=>x.kind===item.kind&&x.id===item.id))throw Error('Esa selección ya está añadida.');if(items.length>=60)throw Error('Máximo 60 selecciones por lista.');items.push(item);input.value='';}
  hidden.value=JSON.stringify(items);form.querySelector('[data-diet-chips="'+field+'"]').innerHTML=items.map((x,n)=>`<span class="diet-chip"><span>${h(dietItemLabel(x))}<small>${field==='dietOtherAllergies'?'Alergia':x.kind==='recipe'?'Plato':'Ingrediente'}</small></span><button type="button" class="icon-btn" data-action="diet-remove" data-field="${field}" data-index="${n}" aria-label="Quitar ${h(dietItemLabel(x))}">${icon('close')}</button></span>`).join('');output.classList.remove('form-error');output.textContent='Selección actualizada. Guarda el perfil para aplicarla.';
 }catch(error){output.classList.add('form-error');output.textContent=error.message;}
});
