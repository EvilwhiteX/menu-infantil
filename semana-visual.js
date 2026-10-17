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
 // Explicit absences do not establish the presence of an ingredient.
 const absences=n.match(/\bsin\s+(?:huevos?|leche|lacteos?|carne|pescado|frutos secos)(?:\s+(?:ni|y)\s+(?:huevos?|leche|lacteos?|carne|pescado|frutos secos))*/g)||[];
 for(const phrase of absences)for(const [key,re] of [['huevo',/\bhuevos?\b/],['lacteos',/\b(leche|lacteos?)\b/],['carne',/\bcarne\b/],['pescado',/\bpescado\b/],['frutossecos',/\bfrutos secos\b/]])if(re.test(phrase))groups.delete(key);
 return [...groups];
}
function schoolRecordHasMenu(record){
 if(record.entries?.length)return true;
 const text=normalizedFood(record.text||'').trim();
 return !!text&&!['sin informacion','pendiente','pendiente de anotar','menu pendiente','menu del colegio pendiente','sin definir','desconocido'].includes(text);
}
let weeklyFoodMode='week';
function weeklyFoodSummary(selectedDay=null){
 const counts=Object.fromEntries(WEEK_FOOD_GROUPS.map(([k])=>[k,{home:0,school:0}]));let home=0,school=0,pending=0,unclassified=0;
 for(let day=0;day<7;day++)if(selectedDay===null||selectedDay===day)for(const [slot] of activeMeals()){
  const keys=new Set();let origin='home';
  if(schoolMeal(day,slot)){
   origin='school';const r=schoolRecord(day,slot);if(!schoolRecordHasMenu(r)){pending++;continue;}
   school++;for(const entry of r.entries)for(const k of weeklyFoodKeys(entry))keys.add(k);
   // Only the announced names, not a guessed recipe, supply unquantified groups.
   for(const name of (r.text||'').split(/[·;,\n]+/))for(const k of weeklyFoodKeys({name}))keys.add(k);
  }else{
   const {m,recipe:r}=mealData(day,slot);if(m.external){pending++;continue;}if(!r){pending++;continue;}
   home++;for(const item of r.ingredients||[])for(const k of weeklyFoodKeys(item))keys.add(k);
  }
  if(!keys.size)unclassified++;for(const k of keys)if(counts[k])counts[k][origin]++;
 }
 return {counts,home,school,pending,unclassified};
}
function renderWeeklyFoodSummary(){
 const isDay=weeklyFoodMode==='day',day=Math.max(0,Math.min(6,state.selectedDay)),d=weeklyFoodSummary(isDay?day:null),period=isDay?DAYS[day]+' · '+parseDate(addDays(state.week,day)).getDate()+' de '+MONTHS[parseDate(addDays(state.week,day)).getMonth()]:weekLabel();
 return `<section class="surface panel-pad weekly-food-summary" aria-labelledby="weekly-food-title"><div class="subheading"><div><h2 id="weekly-food-title">Qué comerá ${h(profile().name)} con este menú</h2><p>${h(period)} · ${d.home} ${d.home===1?'comida en casa':'comidas en casa'}${profile().school?' · '+d.school+' del colegio con datos conocidos':''}</p></div><div class="chart-toggle" role="group" aria-label="Periodo del resumen de alimentos"><button class="btn ${isDay?'primary':'outline'}" data-action="food-chart-mode" data-mode="day" aria-pressed="${isDay}">Mostrar día</button><button class="btn ${isDay?'outline':'primary'}" data-action="food-chart-mode" data-mode="week" aria-pressed="${!isDay}">Semana</button></div></div>${isDay?`<div class="chart-days" role="group" aria-label="Día del resumen de alimentos">${DAYS.map((name,n)=>`<button data-action="food-chart-day" data-day="${n}" class="pill ${day===n?'selected':''}" aria-label="Ver alimentos del ${name}" aria-pressed="${day===n}">${name.slice(0,3)}</button>`).join('')}</div>`:''}<div class="weekly-food-grid">${WEEK_FOOD_GROUPS.map(([k,label,color,bg])=>{const n=d.counts[k];return `<div class="weekly-food-tile" style="--food-ink:${color};--food-bg:${bg}"><span class="weekly-food-picture">${weeklyFoodIcon(k)}</span><strong class="weekly-food-number">${n.home+n.school}</strong><span class="weekly-food-label">${label}</span><small>comidas con este grupo</small>${profile().school?`<small class="weekly-food-sources">Casa ${n.home} · Colegio ${n.school}</small>`:''}</div>`;}).join('')}</div><p class="weekly-food-note">${icon('info')}Cada comida cuenta una vez por grupo, aunque repita ingredientes. Un mismo plato puede aparecer en varios grupos. Son apariciones en el menú, no unidades de alimentos, raciones ni cantidades consumidas.${profile().school?' Los grupos del colegio proceden de los nombres y de las composiciones revisadas, que pueden ser orientativas.':''}</p>${d.pending||d.unclassified?`<p class="weekly-food-pending">${d.pending?'Hay '+d.pending+(d.pending===1?' toma sin información suficiente. ':' tomas sin información suficiente. '):''}${d.unclassified?d.unclassified+(d.unclassified===1?' comida tiene ingredientes o nombres sin clasificar. ':' comidas tienen ingredientes o nombres sin clasificar. '):''}El recuento de los datos conocidos es parcial.</p>`:''}</section>`;
}
function schoolMissingMenu(day,slot){
 if(!schoolComplement()||!schoolMeal(day,slot))return false;
 return !schoolRecordHasMenu(schoolRecord(day,slot));
}
function schoolPendingWeekMarkup(){
 const pending=DAYS.flatMap((_,day)=>activeMeals().filter(([slot])=>schoolMissingMenu(day,slot)).map(([slot])=>({day,slot,month:addDays(state.week,day).slice(0,7)})));
 if(!pending.length)return '';
 const months=[...new Set(pending.map(p=>p.month))];
 return `<aside class="school-week-pending" aria-label="Menú del colegio pendiente"><div>${icon('info')}<div><strong>Falta el menú del colegio</strong><p>${pending.length===1?'Hay una toma escolar pendiente en esta semana.':'Hay '+pending.length+' tomas escolares pendientes en esta semana.'} Carga el Excel o CSV para mostrar los platos del colegio en esas fechas. Las comidas de casa se conservan.</p></div></div><div class="toolbar">${months.map(month=>`<button type="button" class="btn outline" data-action="school-import" data-month="${month}">${icon('upload')}Cargar menú${months.length>1?' de '+h(MONTHS[+month.slice(5)-1]):' del colegio'}</button>`).join('')}</div></aside>`;
}
function colorfulNavigationIcon(key){
 const drawings={
 week:['#e8f3fc','<rect x="9" y="13" width="46" height="43" rx="10" fill="#fffdf6" stroke="#70a6c8" stroke-width="2"/><path fill="#70a6c8" d="M9 26V23q0-10 10-10h26q10 0 10 10v3z"/><path d="M21 8v13m22-13v13" stroke="#426e9a" stroke-width="4" stroke-linecap="round"/><rect x="17" y="33" width="11" height="11" rx="3" fill="#f4cb65"/><path d="m35 40 5 5 9-10" fill="none" stroke="#72a36a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>'],
 generate:['#f3e9fc','<path d="m17 51 26-26" stroke="#9b78bc" stroke-width="10" stroke-linecap="round"/><path d="m38 30 7-7" stroke="#eadcf4" stroke-width="7"/><path fill="#e9b94f" d="m23 8 3 8 8 3-8 3-3 8-3-8-8-3 8-3zm26 26 2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/><circle fill="#75af9b" cx="49" cy="12" r="4"/>'],
 shopping:['#faeee4','<path fill="#dca469" d="m8 27 7 27h34l7-27z"/><path d="m19 28 8-17m18 17-8-17" stroke="#91633c" stroke-width="4" stroke-linecap="round"/><path fill="#de7880" d="M23 27c-10-9-15 5-7 13 4 4 6 0 7 1 6 4 12-10 5-15-2-1-4 0-5 1"/><path fill="#74a36a" d="m22 26 1-9q9 0 8 6z"/><path d="m34 33 11 0m-8 8h7" stroke="#fff0cf" stroke-width="4" stroke-linecap="round"/>'],
 recipes:['#e5f5e8','<rect x="12" y="9" width="41" height="47" rx="8" fill="#7aaf88"/><path d="M20 9v47" stroke="#548c66" stroke-width="3"/><rect x="26" y="17" width="20" height="27" rx="5" fill="#fffdf3"/><path d="M33 23v15m-4-15v6q4 5 8 0v-6m4 0v15" stroke="#daaa60" stroke-width="2.5" stroke-linecap="round"/><path d="m32 51 6-2 6 2V44H32z" fill="#edbca4"/>'],
 profiles:['#ffe9ed','<path fill="#8cb7d3" d="M5 54V44q0-12 14-12 14 0 14 12v10z"/><circle fill="#edbd95" cx="19" cy="23" r="11"/><path fill="#946643" d="M8 21q1-17 15-10 8 3 7 12l-8-7-4 6-10 2z"/><path fill="#c49acb" d="M31 54V43q0-12 14-12 14 0 14 12v11z"/><circle fill="#f1ccab" cx="45" cy="22" r="11"/><path fill="#76563e" d="M34 21q-1-15 12-13 13 2 10 18l-7-11-7 5z"/><g fill="#524839"><circle cx="16" cy="24" r="1"/><circle cx="23" cy="24" r="1"/><circle cx="42" cy="24" r="1"/><circle cx="49" cy="24" r="1"/></g>'],
 settings:['#f0f4d9','<path d="m27 7 10 0 2 8 7 4 8-2 5 9-6 6 0 8 6 6-5 9-9-2-6 4-2 7H27l-2-7-7-4-8 2-5-9 6-6v-8l-6-6 5-9 8 2 7-4z" transform="translate(0 -3) scale(1 .93)" fill="#a899c4"/><circle cx="32" cy="30" r="15" fill="#fffdf4"/><circle cx="32" cy="30" r="9" fill="#81b3a5"/>']
 };
 const [bg,shape]=drawings[key]||drawings.week;
 return `<span class="colorful-nav-picture" style="--nav-picture-bg:${bg}" aria-hidden="true"><svg viewBox="0 0 64 64" focusable="false">${shape}</svg></span>`;
}
function installWeeklyVisuals(){
 const previousCard=mealCard;mealCard=function(day,slot,mobile=false){
  if(!schoolMissingMenu(day,slot))return previousCard(day,slot,mobile);
  return `<button type="button" class="${mobile?'mobile-meal':'meal-cell'} meal-${slot} school-pending-card" data-action="school-import" data-month="${addDays(state.week,day).slice(0,7)}" aria-label="Cargar menú del colegio para ${h(slotLabel(slot))} del ${DAYS[day]}">${mobile?`<span class="meal-icon">${icon('upload')}</span><span class="mobile-meal-main">`:''}<span class="meal-heading">${h(slotLabel(slot))} · Colegio</span><span class="meal-name">Menú del colegio pendiente</span><span class="school-pending-message">${icon('info')}Esta toma aún no muestra los platos del colegio. Carga el Excel o CSV para actualizarla.</span>${mobile?'</span>':''}</button>`;
 };
 const previousNutritionChart=renderNutritionChart;renderNutritionChart=function(){return renderWeeklyFoodSummary()+previousNutritionChart();};
 const previousWeek=renderWeek;renderWeek=function(){const original=previousWeek();return original.replace('<div class="week-grid-wrap">',schoolPendingWeekMarkup()+'<div class="week-grid-wrap">');};
 const previousSchoolModal=schoolModal;schoolModal=function(day,slot='lunch'){
  const html=previousSchoolModal(day,slot),picker=`<div class="school-manual-picker"><div class="field"><label for="school-manual-dish">Elegir un plato disponible · opcional</label><select id="school-manual-dish" aria-describedby="school-name-status"><option value="">Busca un plato igual o similar</option>${familyCatalog().slice().sort((a,b)=>a.name.localeCompare(b.name,'es')).map(r=>`<option value="${h(r.name)}">${h(r.name)}</option>`).join('')}</select></div><button class="btn outline" type="button" data-action="school-add-name">${icon('plus')}Añadir al registro</button><small>Se añade el nombre para que lo adaptes. Elegir un plato similar no confirma sus ingredientes ni cantidades reales.</small><small id="school-name-status" class="school-name-status" data-step="idle" role="status">Si eliges un plato de la lista, pulsa «Añadir al registro» y después guarda los cambios.</small></div>`;
  return html.replace('<div class="field"><label for="school-food">',picker+'<div class="field"><label for="school-food">');
 };
 const previousControls=saveSchoolControls;saveSchoolControls=function(el){previousControls(el);if(el.name==='school'&&el.checked){const estimates=el.closest?.('form')?.querySelector('[name="schoolEstimates"]');if(estimates)estimates.checked=true;}};
}
document.addEventListener('change',event=>{if(event.target.id==='school-mode'){const hint=document.getElementById('school-mode-hint');if(hint)hint.outerHTML=schoolModeHintMarkup(event.target.value);}});
function schoolNamePending(select){return !!select?.value&&select.dataset?.addedName!==select.value;}
function updateSchoolNameStep(form,animate=false){
 const select=form?.querySelector?.('#school-manual-dish');if(!select)return true;
 const pending=schoolNamePending(select),status=form.querySelector('#school-name-status'),button=form.querySelector('[data-action="school-add-name"]');
 if(status){status.textContent=pending?'Pulsa «Añadir al registro» para incluir el plato y después guarda los cambios.':select.value?'Plato añadido. Todo correcto, puedes guardar cambios.':'Si eliges un plato de la lista, pulsa «Añadir al registro» y después guarda los cambios.';status.dataset.step=pending?'pending':select.value?'done':'idle';}
 for(const save of form.querySelectorAll('button[type="submit"]')){if(pending){if(!save.dataset.nameGuard)save.dataset.nameGuard=save.disabled?'keep':'release';save.disabled=true;}else if(save.dataset.nameGuard){if(save.dataset.nameGuard==='release')save.disabled=false;delete save.dataset.nameGuard;}}
 if(button){if(!pending)button.classList.remove('school-add-reminder');else if(animate){button.classList.remove('school-add-reminder');void button.offsetWidth;button.classList.add('school-add-reminder');}}
 return !pending;
}
function schoolNameCanSave(form){const ready=updateSchoolNameStep(form);if(!ready)form.querySelector('[data-action="school-add-name"]')?.focus();return ready;}
document.addEventListener('change',event=>{const select=event.target;if(select.id!=='school-manual-dish')return;delete select.dataset.addedName;updateSchoolNameStep(select.closest('form'),true);});
document.addEventListener('input',event=>{const input=event.target;if(input.id!=='school-food')return;const form=input.closest('form'),select=form?.querySelector('#school-manual-dish');if(select&&!input.value.trim())delete select.dataset.addedName;updateSchoolNameStep(form);});
document.addEventListener('click',event=>{
 const el=event.target.closest?.('[data-action]');if(el?.dataset.action!=='school-add-name')return;
 const select=document.getElementById('school-manual-dish'),input=document.getElementById('school-food'),status=document.getElementById('school-name-status');if(!select||!input||!status)return;
 const name=select.value;if(!name){status.textContent='Selecciona un plato de la lista.';return;}
 const already=input.value.split('\n').some(line=>normalizedFood(line.trim())===normalizedFood(name));
 const text=already?input.value:(input.value.trim()?input.value.trim()+'\n':'')+name;
 if(text.length>1500){status.textContent='El registro es demasiado largo. Acórtalo antes de añadir el plato.';if(status.dataset)status.dataset.step='pending';return;}
 input.value=text;if(!select.dataset)select.dataset={};select.dataset.addedName=name;
 const form=select.closest?.('form');if(form)updateSchoolNameStep(form);else status.textContent='Plato añadido. Todo correcto, puedes guardar cambios.';
});

document.addEventListener('click',event=>{
 const el=event.target.closest?.('[data-action]');if(!el)return;
 if(el.dataset.action==='food-chart-mode'){weeklyFoodMode=el.dataset.mode==='day'?'day':'week';render();document.querySelector('.weekly-food-summary')?.scrollIntoView({block:'start'});}
 if(el.dataset.action==='food-chart-day'){const day=Number(el.dataset.day);if(Number.isInteger(day)&&day>=0&&day<7){state.selectedDay=day;save();render();document.querySelector('.weekly-food-summary')?.scrollIntoView({block:'start'});}}
});
