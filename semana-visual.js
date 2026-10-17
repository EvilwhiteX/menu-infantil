/* V0.20.0 · Ayuda escolar y grupos semanales. Sin cambios en los menús. */
function schoolModeHintMarkup(mode){return `<div class="school-mode-hint" id="school-mode-hint" role="status">${icon('info')}<p>${mode==='complement'?'Descarga la plantilla Excel o CSV, rellénala con los platos del menú del colegio y cárgala en la app. Después de revisar y guardar el archivo, los platos se incorporarán automáticamente a las fechas correspondientes del menú semanal.':'Añade manualmente los platos del colegio de cada día, según su menú semanal. Puedes escribirlos o elegir un plato igual o similar de la lista disponible en la app y adaptar su nombre a lo que se sirve.'}</p></div>`;}
const WEEK_FOOD_GROUPS=[
 ['carne','Carne y aves','#8c4d2e','#faeee4'],['pescado','Pescado y marisco','#176da1','#e5f5ff'],['huevo','Huevo','#926300','#fff5ce'],
 ['verduras','Verduras','#287040','#e5f5e8'],['legumbres','Legumbres','#8052a0','#f3e9fc'],['cereales','Cereales','#8b6517','#faf2da'],['tuberculos','Patata y tubérculos','#8b5b35','#f6eadf'],
 ['fruta','Fruta','#b13f50','#ffe9ed'],['lacteos','Lácteos','#276b91','#e8f3fc'],['frutossecos','Frutos secos y semillas','#916335','#f9efdf'],['grasas','Aceites y aguacate','#60751d','#f0f4d9']
];
function weeklyFoodIcon(key){
 const shapes={
 carne:'<path fill="#dec7a4" d="M19 26 9 13q-3 17 12 21m24-8 12-13q3 17-12 21"/><ellipse fill="#ad744d" cx="32" cy="34" rx="20" ry="21"/><path fill="#f7e7ce" d="M27 14h10l-2 15h-6z"/><ellipse fill="#edc4a2" cx="32" cy="44" rx="14" ry="10"/><circle cx="25" cy="32" r="2"/><circle cx="39" cy="32" r="2"/><circle cx="27" cy="43" r="1.5"/><circle cx="37" cy="43" r="1.5"/><path d="M28 49q4 3 8 0" fill="none" stroke="#744831" stroke-linecap="round" stroke-width="2"/>',
 aves:'<path fill="#d65d35" d="M27 18q-8-12 0-12 5-4 7 4 8-4 8 4l-5 8"/><ellipse fill="#f2c162" cx="32" cy="37" rx="19" ry="21"/><path fill="#e6a331" d="m38 35 17 6-17 5z"/><circle cx="35" cy="29" r="2.5"/><path d="M18 40q12 15 18 2" fill="none" stroke="#bc7d28" stroke-width="3" stroke-linecap="round"/>',
 pescado:'<path fill="#63b5df" d="M46 28 59 17v31L46 38Q21 61 8 33q15-29 38-5"/><path fill="#208bc1" d="m28 18 5-9 10 12m-14 27 5 9 9-12"/><circle cx="19" cy="30" r="2.5"/><path d="M12 38q5 4 8 0m14-13q-7 9 0 18" fill="none" stroke="#156991" stroke-width="2" stroke-linecap="round"/>',
 huevo:'<path fill="#fffdf3" stroke="#d4b458" stroke-width="2" d="M32 7C22 7 10 30 10 42a22 22 0 0 0 44 0C54 30 42 7 32 7Z"/><circle fill="#f3c344" cx="32" cy="42" r="13"/><circle cx="28" cy="40" r="1.5"/><circle cx="36" cy="40" r="1.5"/><path d="M28 46q4 3 8 0" fill="none" stroke="#966324" stroke-width="1.8" stroke-linecap="round"/>',
 verduras:'<path fill="#479b55" d="M21 33C0 30 8 10 21 17 17 0 44 0 42 17 59 9 65 33 44 34Z"/><path fill="#8cbd6a" d="M26 28h12l5 28H21z"/><path d="M32 31v20m0-10-9-7m9 8 10-7" fill="none" stroke="#327c3e" stroke-width="2.5" stroke-linecap="round"/>',
 legumbres:'<path fill="#b78acb" d="M37 11C14 4 3 30 13 48s38 12 40-5c2-13-15-8-14-16 0-7 10-12-2-16"/><path d="M35 21C20 21 18 43 33 46" fill="none" stroke="#805395" stroke-width="3" stroke-linecap="round"/><circle cx="20" cy="29" r="1.5"/><circle cx="26" cy="24" r="1.5"/>',
 cereales:'<path d="M32 9v48" fill="none" stroke="#a27d29" stroke-width="3" stroke-linecap="round"/><g fill="#e2bb55"><ellipse cx="25" cy="19" rx="5" ry="9" transform="rotate(-35 25 19)"/><ellipse cx="39" cy="19" rx="5" ry="9" transform="rotate(35 39 19)"/><ellipse cx="25" cy="33" rx="5" ry="9" transform="rotate(-35 25 33)"/><ellipse cx="39" cy="33" rx="5" ry="9" transform="rotate(35 39 33)"/><ellipse cx="32" cy="8" rx="4" ry="7"/></g>',
 tuberculos:'<path fill="#c99a6c" d="M18 13C2 26 9 50 25 55s32-9 31-26S36 0 18 13"/><g fill="#92663c"><ellipse cx="21" cy="26" rx="2" ry="3"/><ellipse cx="43" cy="23" rx="2" ry="3"/><ellipse cx="34" cy="43" rx="2" ry="3"/><circle cx="19" cy="43" r="1.5"/></g>',
 fruta:'<path fill="#db6470" d="M32 21C8 5 2 29 14 49q10 17 18 7 9 10 18-7 12-20-4-30-7-4-14 2"/><path d="M32 23V9" stroke="#8b623a" stroke-width="4" stroke-linecap="round"/><path fill="#65a05d" d="M33 14Q38-1 53 7 49 20 33 14"/><path d="M17 29q-5 7 0 15" fill="none" stroke="#ffe4df" stroke-width="3" stroke-linecap="round"/>',
 lacteos:'<path fill="#fffdf5" stroke="#75a4c1" stroke-width="2" d="M16 22 24 9h19l6 13v34H16Z"/><path fill="#8abbd6" d="M24 9h19v11H16m0 10h33v18H16"/><path fill="#fffdf5" d="M32 32q-12 12 0 12 12 0 0-12"/><path stroke="#6395b4" stroke-width="2" d="M43 9v11l6 2"/>',
 frutossecos:'<path fill="#b48a55" d="M32 7C8 15 2 43 19 54s39 1 35-20C51 20 41 12 32 7"/><path d="M32 13q-11 20 0 40m4-31 8 8m-15 7-9 8" fill="none" stroke="#7e5d34" stroke-width="2.5" stroke-linecap="round"/>',
 grasas:'<rect fill="#9bb35b" x="22" y="6" width="20" height="9" rx="3"/><path fill="#dbe4a1" stroke="#8fa343" stroke-width="2" d="M24 16h16v9q10 7 10 14v17H14V39q0-7 10-14Z"/><path fill="#a7bd5a" d="M16 36h32v18H16z"/><ellipse fill="#6d8834" cx="32" cy="43" rx="7" ry="9"/><path d="m31 33 7-6" stroke="#57712a" stroke-width="2"/>'
 };
 return `<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">${shapes[key]||''}</svg>`;
}
function weeklyFoodKeys(item){
 const ref=item.foodId&&NUTRITION_BY_ID[item.foodId],n=normalizedFood((item.name||'')+' '+(ref?.label||'')),groups=new Set();
 const rules=[['aves',/\b(pollo|pavo|aves?|gallina|pato|contramuslo|pechuga|jamoncitos? de pollo)\b/],['carne',/\b(ternera|vacuno|buey|cerdo|cordero|conejo|jamon|chorizo|salchich\w*|fiambre|embutido\w*)\b/],['pescado',/\b(pescado\w*|merluza|salmon|bacalao|abadejo|rape|atun|trucha|sardina\w*|dorada|lubina|caballa|lenguado|marisco\w*|gamba\w*|mejillon\w*|calamar\w*|sepia|boqueron\w*)\b/],['huevo',/\b(huevos?|tortilla\w*)\b/],['verduras',/\b(verdura\w*|hortaliza\w*|calabacin|calabaza|zanahoria\w*|tomate\w*|brocoli|coliflor|col|repollo|puerro\w*|judias verdes|lechuga|ensalada|pisto|espinaca\w*|acelga\w*|berenjena\w*|pepino|cebolla\w*|pimiento\w*|alcachofa\w*|esparrago\w*|champinon\w*|setas?)\b/],['legumbres',/\b(lenteja\w*|garbanzo\w*|alubia\w*|judias (blancas|rojas)|guisante\w*|tofu|soja)\b/],['cereales',/\b(arroz|pasta|avena|trigo|pan|harina|maiz|cuscus|quinoa|espelta|centeno|macarron\w*|espagueti\w*|fideo\w*)\b/],['tuberculos',/\b(patata\w*|boniato\w*|batata\w*|yuca)\b/],['fruta',/\b(fruta\w*|manzana\w*|pera\w*|platano\w*|naranja\w*|mandarina\w*|fresa\w*|melocoton\w*|nectarina\w*|melon|sandia|kiwi\w*|mango|uva\w*|ciruela\w*|albaricoque\w*|arandano\w*|frambuesa\w*)\b/],['lacteos',/\b(leche|yogur\w*|queso\w*|requeson|kefir)\b/],['frutossecos',/\b(cacahuete\w*|almendra\w*|nuez|nueces|avellana\w*|pistacho\w*|anacardo\w*|sesamo|tahini|semillas?|pipas)\b/],['grasas',/\b(aceite\w*|aguacate\w*|aceituna\w*)\b/]];
 for(const [key,re] of rules)if(re.test(n))groups.add(key==='aves'?'carne':key);
 // Explicit ingredient categories are a fallback, never classify potatoes as grain.
 if(['fruta','verduras','legumbres','lacteos'].includes(item.group))groups.add(item.group);
 if(item.group==='cereales'&&!groups.has('tuberculos'))groups.add('cereales');
 if(/\b(leche de|bebida (de |a base de |vegetal))\b/.test(n)&&/\b(soja|avena|almendra\w*|arroz|coco|vegetal)\b/.test(n))groups.delete('lacteos');
 return [...groups];
}
function weeklyFoodSummary(){
 const counts=Object.fromEntries(WEEK_FOOD_GROUPS.map(([k])=>[k,{home:0,school:0}]));let home=0,school=0,pending=0,unclassified=0;
 for(let day=0;day<7;day++)for(const [slot] of activeMeals()){
  const keys=new Set();let origin='home';
  if(schoolMeal(day,slot)){
   origin='school';const r=schoolRecord(day,slot);if(!r.text?.trim()&&!r.entries.length){pending++;continue;}
   school++;for(const entry of r.entries)for(const k of weeklyFoodKeys(entry))keys.add(k);
   // Only the announced names, not a guessed recipe, supply unquantified groups.
   for(const k of weeklyFoodKeys({name:r.text||''}))keys.add(k);
  }else{
   const {m,recipe:r}=mealData(day,slot);if(m.external){pending++;continue;}if(!r){pending++;continue;}
   home++;for(const item of r.ingredients||[])for(const k of weeklyFoodKeys(item))keys.add(k);
  }
  if(!keys.size)unclassified++;for(const k of keys)if(counts[k])counts[k][origin]++;
 }
 return {counts,home,school,pending,unclassified};
}
function renderWeeklyFoodSummary(){
 const d=weeklyFoodSummary();return `<section class="surface panel-pad weekly-food-summary" aria-labelledby="weekly-food-title"><div class="subheading"><div><span class="food-eyebrow">COLORES EN TU SEMANA</span><h2 id="weekly-food-title">¿Qué hay en nuestros platos?</h2><p>${h(weekLabel())} · ${d.home} comidas en casa${profile().school?' · '+d.school+' del colegio con datos conocidos':''}</p></div>${icon('smile')}</div><div class="weekly-food-grid">${WEEK_FOOD_GROUPS.map(([k,label,color,bg])=>{const n=d.counts[k];return `<div class="weekly-food-tile" style="--food-ink:${color};--food-bg:${bg}"><span class="weekly-food-picture">${weeklyFoodIcon(k)}</span><strong class="weekly-food-number">${n.home+n.school}</strong><span class="weekly-food-label">${label}</span><small>platos con este grupo</small>${profile().school?`<small class="weekly-food-sources">Casa ${n.home} · Colegio ${n.school}</small>`:''}</div>`;}).join('')}</div><p class="weekly-food-note">${icon('info')}Cada comida cuenta una vez por grupo, aunque repita ingredientes. Un mismo plato puede aparecer en varios grupos. Son apariciones en el menú, no unidades de alimentos, raciones ni cantidades consumidas.</p>${d.pending||d.unclassified?`<p class="weekly-food-pending">${d.pending?'Hay '+d.pending+' tomas sin información suficiente. ':''}${d.unclassified?d.unclassified+' comidas tienen ingredientes o nombres sin clasificar. ':''}El recuento de los datos conocidos es parcial.</p>`:''}</section>`;
}
function schoolMissingMenu(day,slot){
 if(!schoolComplement()||!schoolMeal(day,slot))return false;
 const current=state.menus[mealKey()];if(!current||current.kind==='manual'&&!current.days.some(d=>Object.values(d).some(m=>m.recipeId)))return false;
 const r=schoolRecord(day,slot);return !r.text?.trim()&&!r.entries.length;
}
function installWeeklyVisuals(){
 const previousCard=mealCard;mealCard=function(day,slot,mobile=false){
  if(!schoolMissingMenu(day,slot))return previousCard(day,slot,mobile);
  return `<button type="button" class="${mobile?'mobile-meal':'meal-cell'} meal-${slot} school-pending-card" data-action="school-import" data-month="${addDays(state.week,day).slice(0,7)}" aria-label="Cargar menú del colegio para ${h(slotLabel(slot))} del ${DAYS[day]}">${mobile?`<span class="meal-icon">${icon('upload')}</span><span class="mobile-meal-main">`:''}<span class="meal-heading">${h(slotLabel(slot))} · Colegio</span><span class="meal-name">Menú del colegio pendiente</span><span class="school-pending-message">${icon('info')}Esta toma aún no muestra los platos del colegio. Carga el Excel o CSV para actualizarla.</span>${mobile?'</span>':''}</button>`;
 };
 const previousWeek=renderWeek;renderWeek=function(){const original=previousWeek();let summary=renderWeeklyFoodSummary();if(profile().school)summary=summary.replace('Son apariciones en el menú, no unidades de alimentos, raciones ni cantidades consumidas.','Son apariciones en el menú, no unidades de alimentos, raciones ni cantidades consumidas. Los grupos del colegio proceden de los nombres y de las composiciones revisadas, que pueden ser orientativas.');return original+summary;};
 const previousSchoolModal=schoolModal;schoolModal=function(day,slot='lunch'){
  const html=previousSchoolModal(day,slot),picker=`<div class="school-manual-picker"><div class="field"><label for="school-manual-dish">Elegir un plato disponible · opcional</label><select id="school-manual-dish"><option value="">Busca un plato igual o similar</option>${familyCatalog().slice().sort((a,b)=>a.name.localeCompare(b.name,'es')).map(r=>`<option value="${h(r.name)}">${h(r.name)}</option>`).join('')}</select></div><button class="btn outline" type="button" data-action="school-add-name">${icon('plus')}Añadir al registro</button><small>Se añade el nombre para que lo adaptes. Elegir un plato similar no confirma sus ingredientes ni cantidades reales.</small><small id="school-name-status" role="status"></small></div>`;
  return html.replace('<div class="field"><label for="school-food">',picker+'<div class="field"><label for="school-food">');
 };
 const previousControls=saveSchoolControls;saveSchoolControls=function(el){previousControls(el);if(el.name==='school'&&el.checked){const estimates=el.closest?.('form')?.querySelector('[name="schoolEstimates"]');if(estimates)estimates.checked=true;}};
}
document.addEventListener('change',event=>{if(event.target.id==='school-mode'){const hint=document.getElementById('school-mode-hint');if(hint)hint.outerHTML=schoolModeHintMarkup(event.target.value);}});
document.addEventListener('click',event=>{
 const el=event.target.closest?.('[data-action]');if(el?.dataset.action!=='school-add-name')return;
 const select=document.getElementById('school-manual-dish'),input=document.getElementById('school-food'),status=document.getElementById('school-name-status');if(!select||!input||!status)return;
 const name=select.value;if(!name){status.textContent='Selecciona un plato de la lista.';return;}
 if(input.value.split('\n').some(line=>normalizedFood(line.trim())===normalizedFood(name))){status.textContent='Este plato ya está en el registro.';return;}
 const text=(input.value.trim()?input.value.trim()+'\n':'')+name;if(text.length>1500){status.textContent='El registro es demasiado largo. Revisa el texto antes de añadir otro plato.';return;}
 input.value=text;status.textContent='Nombre añadido. Adáptalo al plato del colegio y guarda el registro.';
});
