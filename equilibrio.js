/* Bounded heuristic, not a clinical optimiser or a proof of feasibility. */
const SLOT_BUDGET={breakfast:.20,midmorning:.10,lunch:.30,snack:.15,dinner:.25};
function plannedSource(r){return r?.planningBasis?recipeById(r.planningBasis.sourceRecipeId):r;}
function ingredientBounds(i,t){
 const n=normalizedFood(i.name),scale=Math.min(2.4,Math.max(.8,(t.kcal/1000)**.7)),band=t.age<7?0:t.age<13?1:2;
 let lo=2,hi=200*scale;
 if(/almendra|nuez|cacahuete/.test(n)){lo=2;hi=12*scale;}
 else if(/levadura|impulsor/.test(n)){lo=.1;hi=2*scale;}
 else if(/tomillo seco/.test(n)){lo=.1;hi=1;}
 else if(n==='agua'){lo=.1;hi=250*scale;}
 else if(/picos de pan/.test(n)){lo=8*scale;hi=30*scale;}
 else if(/aceite/.test(n)){lo=2;hi=12*scale;}
 else if(/leche/.test(n)){lo=75;hi=t.age<4?250:300;}
 else if(/yogur/.test(n)){lo=60;hi=125;}
 else if(/queso/.test(n)){lo=10;hi=t.age<4?35:60;}
 else if(/huevo/.test(n)){lo=20;hi=[50,100,100][band];}
 else if(/merluza|salmon|bacalao|sardina|trucha|abadejo|rape/.test(n)){lo=25;hi=[60,90,130][band];}
 else if(/pollo|pavo|ternera|lomo|conejo|vacuno/.test(n)){lo=20;hi=[50,80,110][band];}
 else if(/lentejas cocidas|judias blancas cocidas|garbanzos cocidos/.test(n)){lo=40*scale;hi=130*scale;}
 else if(/arroz|pasta|macarrones|avena|harina|cuscus/.test(n)){lo=12*scale;hi=55*scale;}
 else if(/pan integral/.test(n)){lo=15*scale;hi=60*scale;}
 else if(i.group==='fruta'){lo=45*scale;hi=140*scale;}
 else if(/aguacate/.test(n)){lo=15*scale;hi=65*scale;}
 else if(/patata|boniato/.test(n)){lo=50*scale;hi=200*scale;}
 else {lo=25*scale;hi=150*scale;}
 return [Math.round(lo*10)/10,Math.round(hi*10)/10];
}
function quantifiedProposal(source,slot,t,budget,fruitName='Pera madura'){
 const batch=batchForRecipe(source);if(!batch)throw Error('Falta la ficha de cantidades de '+source.name);
 const ingredients=source.ingredients.map((original,n)=>{const i=normalizedFood(original.name)==='fruta madura de temporada'?{...original,name:fruitName}:original;const food=defaultCompositionReference(i);if(!food)throw Error('Falta referencia para '+i.name);return {...i,qty:batch.grams[n]/4,amountStatus:'propuesta estimada editable',unit:'g',foodId:food.id,foodState:food.weightState};});
 const add=(name,group,qty)=>{const food=defaultCompositionReference({name});if(!food)throw Error('Referencia no disponible: '+name);ingredients.push({name,group,qty,unit:'g',foodId:food.id,foodState:food.weightState});};
 const main=['lunch','dinner'].includes(slot);
 const additions=[];
 if(main&&!ingredients.some(i=>i.group==='fruta')){add(fruitName,'fruta',80);additions.push('fruta');}
 if(slot==='breakfast'&&!ingredients.some(i=>/leche|yogur/.test(normalizedFood(i.name)))){add(t.age<3?'Leche entera pasteurizada':'Leche pasteurizada sin azúcar','lacteos',150);additions.push('leche');}
 if(slot==='snack'&&!ingredients.some(i=>i.group==='lacteos')){add('Yogur natural sin azúcar','lacteos',125);additions.push('yogur');}
 if(main&&!ingredients.some(i=>/arroz|pasta|macarrones|patata|pan integral|quinoa|cuscus|boniato/.test(normalizedFood(i.name)))){add('Pan integral bajo en sal','cereales',25);additions.push('pan');}
 const kcal=ingredients.reduce((sum,i)=>sum+NUTRITION_BY_ID[i.foodId].nutrients.kcal.value*i.qty/100,0),factor=t.kcal*budget/kcal;
 for(const i of ingredients){const [lo,hi]=ingredientBounds(i,t);i.qty=Math.round(Math.max(lo,Math.min(hi,i.qty*factor))*10)/10;}
 const allergens=new Set(source.allergens);for(const i of ingredients){if(/leche|yogur|queso/.test(normalizedFood(i.name)))allergens.add('leche');if(/pan integral/.test(normalizedFood(i.name)))allergens.add('gluten');}
 // Catalog allergen keys are preserved; added accompaniments use the regulated key.
 const milkKey=ALLERGENS.find(([,label])=>/leche/i.test(label))?.[0],glutenKey=ALLERGENS.find(([,label])=>/gluten/i.test(label))?.[0];
 if(milkKey&&ingredients.some(i=>/leche|yogur|queso/.test(normalizedFood(i.name))))allergens.add(milkKey);
 if(glutenKey&&ingredients.some(i=>/pan integral/.test(normalizedFood(i.name))))allergens.add(glutenKey);
 return {...source,id:'',name:(source.name+(additions.length?' + '+additions.join(' y '):'')).slice(0,100),slot,ingredients,allergens:[...allergens],manual:false,allergensReviewed:false,
  planningBasis:{sourceRecipeId:source.id,modelVersion:BALANCE_VERSION,ageMonths:t.age*12+t.months,signature:t.signature,edited:false}};
}
const PLANNING_FOOD_CACHE=new Map();
function nutritionVector(r){
 const out=Object.fromEntries(NUTRITION_DATA.fields.map(f=>[f.key,0]));let complete=!!r?.ingredients?.length;
 for(const i of r?.ingredients||[]){if(i.unit!=='g'||!Number.isFinite(i.qty)||i.qty<=0||(!i.foodId&&!hasValidProductLabel(i))){complete=false;continue;}
  let food;try{const key=i.foodId&&!i.labelData?i.foodId+'|'+(i.retentionCode||''):null;food=key&&PLANNING_FOOD_CACHE.get(key);if(!food){food=resolveNutritionFood(i);if(key)PLANNING_FOOD_CACHE.set(key,food);}}catch{complete=false;continue;}
  for(const f of NUTRITION_DATA.fields){const cell=food.nutrients[f.key];if(cell?.status!=='value'||!Number.isFinite(cell.value)){complete=false;continue;}out[f.key]+=cell.value*i.qty/100;}
 }
 return {values:out,complete};
}
function addVectors(items){const out=Object.fromEntries(NUTRITION_DATA.fields.map(f=>[f.key,0]));for(const item of items)for(const key of Object.keys(out))out[key]+=item[key];return out;}
function infantAnimalUnits(recipes){let units=0;for(const r of recipes)for(const i of r.ingredients||[]){const n=normalizedFood(i.name);if(/pollo|pavo|ternera|lomo|conejo|vacuno|merluza|salmon|bacalao|sardina|trucha|abadejo|rape/.test(n))units+=(i.qty||0)/35;else if(/huevo/.test(n))units+=(i.qty||0)/50;}return units;}
function limitInfantAnimal(recipes,editable,t){
 if(t.age>=3)return;const fixed=recipes.filter(r=>!editable.includes(r)),fixedUnits=infantAnimalUnits(fixed),units=infantAnimalUnits(editable);
 if(!units)return;const factor=Math.min(1,Math.max(.01,1-fixedUnits)/units);
 for(const r of editable)for(const i of r.ingredients)if(/pollo|pavo|ternera|lomo|conejo|vacuno|merluza|salmon|bacalao|sardina|trucha|abadejo|rape|huevo/.test(normalizedFood(i.name)))i.qty=Math.max(.1,Math.floor(i.qty*factor*10)/10);
}
function planningLoss(recipes,t,fraction=1){
 const v=addVectors(recipes.map(r=>nutritionVector(r).values)),energy=v.kcal||1,kcal=t.kcal*fraction;
 const square=x=>x*x,below=(key,target,weight)=>weight*square(Math.max(0,1-v[key]/(target*fraction)));
 let loss=300*square(v.kcal/kcal-1);
 for(const [key,c,range] of [['carbs',4,t.carbs],['fat',9,t.fat]]){const pct=v[key]*c/energy;loss+=3000*square(Math.max(0,range[0]/100-pct,pct-range[1]/100));}
 loss+=below('protein',t.protein,5)+below('calcium',t.calcium,5)+below('iron',t.iron,8)+below('fiber',t.fiber,2)+below('vitaminB12',t.vitaminB12,1)+below('vitaminD',t.vitaminD,.2);
 loss+=50*square(Math.max(0,v.protein*4/energy-.20));
 loss+=50*square(Math.max(0,v.sodium/(t.sodium*fraction)-1))+100*square(Math.max(0,v.iron/(t.ironSafe*fraction)-1))+100*square(Math.max(0,v.vitaminD/(t.vitaminDUL*fraction)-1));
 let dairy=0,fruit=0;for(const r of recipes)for(const i of r.ingredients||[]){const n=normalizedFood(i.name);if(/leche|yogur/.test(n))dairy+=i.qty||0;if(/queso/.test(n))dairy+=(i.qty||0)*3;if(i.group==='fruta')fruit+=i.qty||0;}
 loss+=20*square(Math.max(0,dairy/((t.age<4?500:750)*fraction)-1));loss+=10*square(Math.max(0,fruit/((t.age<4?450:700)*fraction)-1));
 return loss;
}
function optimiseDay(recipes,editable,t,fraction){
 limitInfantAnimal(recipes,editable,t);
 let best=planningLoss(recipes,t,fraction);
 for(let pass=0;pass<8;pass++){let improved=false;for(const r of editable)for(const i of r.ingredients){const [boundLo,hi]=ingredientBounds(i,t),old=i.qty,lo=Math.min(boundLo,old);let chosen=old;
  for(const factor of [.82,1.18]){i.qty=Math.round(Math.max(lo,Math.min(hi,old*factor))*10)/10;if(t.age<3&&infantAnimalUnits(recipes)>Math.max(1,infantAnimalUnits(recipes.filter(r=>!editable.includes(r))))+1e-8)continue;const score=planningLoss(recipes,t,fraction);if(score<best-1e-7){best=score;chosen=i.qty;improved=true;}}
  i.qty=chosen;
 }if(!improved)break;}
 return best;
}
function generateQuantifiedWeek(old,seed,t){
 const previousSchoolContext=SCHOOL_PLANNING_CONTEXT;SCHOOL_PLANNING_CONTEXT=schoolPlanningEnabled()?DAYS.map((_,d)=>schoolMeal(d,'lunch')?schoolRecord(d,'lunch'):{text:'',groups:[]}):null;try{
 let best=null,bestScore=Infinity;const active=activeMeals(),budgetSum=active.reduce((s,[slot])=>s+SLOT_BUDGET[slot],0);
 // Different recipe candidates retain existing family quotas; optimisation never edits fixed meals.
 for(let attempt=0;attempt<8;attempt++){
  const fresh=buildFamilyWeek(old,seed+attempt),recipes={},all=[];let score=0,coveredFraction=0;
  for(let day=0;day<7;day++){const list=[],editable=[];let fraction=0;
   for(const [slot] of active){if(schoolMeal(day,slot)){const school=schoolRecord(day,slot);if(schoolPlanningEnabled()&&school.complete){list.push({ingredients:schoolIngredients(school)});fraction+=SLOT_BUDGET[slot]/budgetSum;}continue;}const m=fresh.days[day][slot];if(m.external)continue;const r=recipeById(m.recipeId);
    if(!r){score+=100;continue;}if(m.locked&&!nutritionVector(r).complete){score+=100;continue;}fraction+=SLOT_BUDGET[slot]/budgetSum;if(m.locked){list.push(r);continue;}
    const fruit=['Pera madura','Mandarina','Plátano maduro'][(day+attempt+(slot==='dinner'?1:0))%3],q=quantifiedProposal(r,slot,t,SLOT_BUDGET[slot]/budgetSum,fruit);recipes[day+'|'+slot]=q;list.push(q);editable.push(q);
   }
   if(list.length&&fraction>0)score+=optimiseDay(list,editable,t,fraction);all.push(...list);coveredFraction+=fraction;
  }
  // Weekly score is additional to daily scores; it cannot cancel a poor day.
  if(all.length&&coveredFraction>0)score+=planningLoss(all,t,coveredFraction)*4;
  if(score<bestScore){bestScore=score;best={fresh,recipes};}
 }
 if(!best)throw Error('No se pudo preparar una propuesta cuantificada.');return best;
 }finally{SCHOOL_PLANNING_CONTEXT=previousSchoolContext;}
}
function commitQuantifiedWeek(){
 try{const blocked=familyBlock();if(blocked)throw Error(blocked);const t=nutritionTargets();if(t.guard)throw Error('Revisa edad y peso con un profesional antes de generar.');
  const old=menu(),proposal=generateQuantifiedWeek(old,(old.seed||0)+1,t),custom={...state.customRecipes};
  for(const [key,r] of Object.entries(proposal.recipes)){const [day,slot]=key.split('|'),rid=id();custom[rid]={...r,id:rid};proposal.fresh.days[+day][slot].recipeId=rid;}
  proposal.fresh.ruleVersion='quantified-'+BALANCE_VERSION;if(schoolPlanningEnabled())proposal.fresh.schoolBasis=schoolWeekSignature();
  const next={...state,customRecipes:custom,menus:{...state.menus,[mealKey()]:proposal.fresh},view:'week',modal:null};
  const {modal,...stored}=next;localStorage.setItem(STORAGE_KEY,JSON.stringify(stored));state=next;varietyChange=null;render();notify('Propuesta con cantidades guardada. Consulta la revisión nutricional y los objetivos pendientes.');return true;
 }catch(error){notify(error.message+' Se conserva el menú anterior.');return false;}
}
function dayNutritionReview(day){
 const list=[],pending=[];let school=false;
 for(const [slot] of activeMeals()){
  if(schoolMeal(day,slot)){school=true;const record=schoolRecord(day,slot);if(record.entries.length)list.push({ingredients:schoolIngredients(record)});if(!record.complete)pending.push(slotLabel(slot)+' del colegio sin composición completa revisada');continue;}
  const {m,recipe:r}=mealData(day,slot);if(m.external){pending.push(slotLabel(slot)+' fuera de casa');continue;}if(!r){pending.push(slotLabel(slot)+' sin plato');continue;}
  const vector=nutritionVector(r);list.push(r);if(!vector.complete)pending.push(slotLabel(slot)+' con datos incompletos');
 }
 const vectors=list.map(nutritionVector),notes=[];if(profileMonths()<36&&infantAnimalUnits(list)>1.01)notes.push('Revisar carne, pescado y huevo del día: se supera el control conjunto de alternativas infantiles de la app.');return {values:addVectors(vectors.map(v=>v.values)),complete:pending.length===0&&vectors.every(v=>v.complete),pending,notes,school,
  stale:list.some(r=>r.planningBasis&&r.planningBasis.signature!==nutritionTargets().signature)};
}
function reviewRows(v,t){
 const energy=v.kcal||1,rows=[];
 const add=(key,reference,type,issue,unit)=>{const field=NUTRITION_DATA.fields.find(f=>f.key===key);rows.push({key,label:field.label,value:v[key],reference,type,issue,unit:unit||field.unit});};
 add('kcal',`${fmtNum(t.kcal)} kcal · ±10% app`,'AR',v.kcal<t.kcal*.9?'bajo':v.kcal>t.kcal*1.1?'alto':'');
 add('protein',`PRI ≥${fmtNum(t.protein)} g`,'PRI',v.protein<t.protein?'bajo':v.protein*4/energy>.20?'revisar proporción':'');
 for(const [key,k,range] of [['carbs',4,t.carbs],['fat',9,t.fat]]){const pct=v[key]*k/energy*100;add(key,`${range.join('–')}% energía · actual ${fmtNum(pct)}%`,'RI',pct<range[0]?'bajo':pct>range[1]?'alto':'');}
 for(const key of ['fiber','calcium','iron','vitaminD','vitaminB12'])add(key,`${['calcium','iron'].includes(key)?'PRI':'AI'} ${fmtNum(t[key])}`,'ref',v[key]<t[key]?'por debajo de referencia':key==='iron'&&v[key]>t.ironSafe?'supera nivel seguro':key==='vitaminD'&&v[key]>t.vitaminDUL?'supera UL':key==='calcium'&&v[key]>t.calcium*2?'revisar cantidad':'');
 add('sodium',`Segura y adecuada ${t.sodium} mg`,'control',v.sodium>t.sodium?'revisar exceso':'');
 add('salt',`Equivalente sodio ×2,5: ${fmtNum(t.sodium/400)} g`,'control',v.salt>t.sodium/400?'revisar exceso':'');
 add('sugars','Azúcares totales · sin objetivo mínimo','info','');return rows;
}
function reviewTable(v,t,complete){return `<div style="overflow-x:auto"><table class="balance-table"><thead><tr><th>Componente</th><th>Estimación</th><th>Referencia diaria</th><th>Revisión</th></tr></thead><tbody>${reviewRows(v,t).map(r=>`<tr><th scope="row">${h(r.label)}</th><td>${!complete&&r.value===0?'Sin dato completo':'≈ '+fmtNum(r.value)+' '+h(r.unit)}</td><td>${h(r.reference)}</td><td class="${complete&&r.issue?'form-error':''}">${complete?(r.issue?h(r.issue):r.type==='info'?'Informativo':'Sin aviso en este control'):'Parcial · sin cobertura total'}</td></tr>`).join('')}</tbody></table></div>`;}
function renderBalanceReview(){
 let t;try{t=nutritionTargets();}catch(e){return `<p class="form-error">${h(e.message)}</p>`;}
 const days=DAYS.map((_,day)=>dayNutritionReview(day)),complete=days.every(d=>d.complete),average=addVectors(days.map(d=>d.values));for(const key of Object.keys(average))average[key]/=7;
 const issues=complete?reviewRows(average,t).filter(r=>r.issue):[],dailyAlerts=days.filter(d=>d.notes.length||(d.complete&&reviewRows(d.values,t).some(r=>r.issue))).length;
 return `<section class="surface panel-pad balance-review" style="margin-top:20px"><h2>Revisión nutricional de la propuesta</h2><p class="${!complete||issues.length?'form-error':'selected-surface'}">${icon(!complete||issues.length?'alert':'sparkles')}${!complete?'Cobertura total pendiente · '+days.filter(d=>!d.complete).length+' días con información incompleta.':issues.length?'Objetivos pendientes: '+issues.map(r=>r.label).join(', ')+'.':'Sin avisos en los componentes calculados del promedio semanal.'}</p><p>${dailyAlerts?dailyAlerts+' días tienen valores que revisar. ':''}Composición estimada de lo planificado; no mide lo consumido ni certifica una dieta completa. No se ocultan ceros reales ni datos desconocidos.</p>${days.some(d=>d.stale)?'<p class="form-error">Hay propuestas calculadas con otros datos del perfil. Revisa o regenera; las cantidades guardadas se han conservado.</p>':''}${targetsMarkup(t)}<details class="family-recipe"><summary>Promedio diario de la semana${complete?'':' · suma parcial / 7'}</summary>${reviewTable(average,t,complete)}<p>El promedio orienta sobre ingesta habitual; no compensa excesos de un día con carencias de otro. Un valor inferior a PRI/AI no diagnostica una deficiencia.</p></details>${days.map((d,n)=>`<details class="family-recipe"><summary>${DAYS[n]} · ${d.complete?'cuantificado':'cobertura pendiente'}</summary>${[...d.pending,...d.notes].map(s=>`<p class="form-error">${h(s)}</p>`).join('')}${reviewTable(d.values,t,d.complete)}</details>`).join('')}</section>`;
}
function plannedAmountsMarkup(r){return `${r.planningBasis.signature!==nutritionTargets().signature?'<p class="form-error">Cantidades calculadas con otros datos del perfil. Revísalas antes de utilizarlas.</p>':''}<p><b>Alérgenos identificados:</b> ${r.allergens.map(key=>h(ALLERGENS.find(([k])=>k===key)?.[1]||key)).join(', ')||'ninguno identificado'}. Comprueba ingredientes y trazas.</p><details class="family-recipe"><summary>Cantidades propuestas · editar</summary><p>Gramos de ingredientes en el estado indicado, para esta toma. Estimación editorial ajustada con el modelo ${h(r.planningBasis.modelVersion)}; no es peso final cocinado. Se conservan sin cambios hasta que los edites o regeneres.</p><form class="planned-amounts" data-recipe-id="${h(r.id)}" data-week-key="${h(mealKey())}">${r.ingredients.map((i,n)=>`<div class="field"><label for="plan-${n}">${h(i.name)} · ${h(i.foodState)}</label><input id="plan-${n}" name="amount-${n}" value="${h(i.qty)}" type="number" min="0.1" max="10000" step="any" required inputmode="decimal"/></div>`).join('')}<button class="btn primary" type="submit">Guardar cantidades en esta toma</button><div class="planning-error" role="status"></div></form></details><ol>${r.steps.map(s=>`<li>${h(s)}</li>`).join('')}</ol><p>${h(r.safety)} Los acompañamientos de fruta se ofrecen maduros y con corte seguro; la leche y el yogur se sirven aparte. No añadas estos acompañamientos a la olla.</p>${nutritionMarkup(r)}`;}
function savePlannedAmounts(form){
 try{const m=state.modal,r=recipeById(form.dataset.recipeId);if(m?.type!=='meal'||mealKey()!==form.dataset.weekKey||mealData(m.day,m.slot).recipe?.id!==r?.id||!r?.planningBasis||mealData(m.day,m.slot).m.external)throw Error('La toma ha cambiado. Vuelve a abrirla.');
  const data=new FormData(form),ingredients=r.ingredients.map((i,n)=>{const qty=Number(data.get('amount-'+n));if(!Number.isFinite(qty)||qty<.1||qty>10000)throw Error('Cada cantidad debe estar entre 0,1 y 10.000 g.');return {...i,qty};}),rid=id();
  const days=menu().days.map((d,n)=>n===m.day?{...d,[m.slot]:{...d[m.slot],recipeId:rid}}:d),next={...state,customRecipes:{...state.customRecipes,[rid]:{...r,id:rid,ingredients,manual:true,planningBasis:{...r.planningBasis,edited:true}}},menus:{...state.menus,[mealKey()]:{...menu(),days}},modal:null};
  const {modal,...stored}=next;localStorage.setItem(STORAGE_KEY,JSON.stringify(stored));state=next;render();notify('Cantidades guardadas. Revisión nutricional y compra actualizadas.');
 }catch(e){form.querySelector('.planning-error').textContent=e.message;}
}
function replaceQuantifiedMeal(source,day,slot){
 try{const blocked=familyBlock();if(blocked)throw Error(blocked);if(schoolMeal(day,slot))throw Error('El colegio se registra manualmente.');const t=nutritionTargets();if(t.guard)throw Error('Revisa los datos del perfil antes de asignar cantidades.');
  const budget=activeMeals().reduce((sum,[s])=>sum+SLOT_BUDGET[s],0),r=quantifiedProposal(source,slot,t,SLOT_BUDGET[slot]/budget),rid=id(),days=menu().days.map((d,n)=>n===day?{...d,[slot]:{...d[slot],recipeId:rid,external:false}}:d);
  const next={...state,customRecipes:{...state.customRecipes,[rid]:{...r,id:rid}},menus:{...state.menus,[mealKey()]:{...menu(),days}},modal:null};const {modal,...stored}=next;localStorage.setItem(STORAGE_KEY,JSON.stringify(stored));state=next;render();notify('Plato sustituido con cantidades iniciales. Revisa el total del día.');return true;
 }catch(e){notify(e.message);return false;}
}
function schoolNutritionFields(day,slot='lunch'){const entries=state.schoolNutrition?.[schoolKey(day,slot)]||[];return `<details class="family-recipe"><summary>Añadir cantidades para la revisión nutricional · opcional</summary><p>Hasta 8 componentes, incluidos bebida y postre. Usa el alimento y estado que correspondan. El texto libre por sí solo no cuantifica el colegio; nunca se añade a la compra ni se compensan automáticamente las otras tomas.</p>${Array.from({length:8},(_,n)=>`<div class="form-row"><div class="field"><label for="sf-${n}">Componente ${n+1}</label><select id="sf-${n}" name="school-food-${n}">${nutritionFoodOptions(entries[n]?.foodId||'')}</select></div><div class="field"><label for="sg-${n}">Gramos</label><input id="sg-${n}" name="school-grams-${n}" type="number" min="0.1" max="5000" step="any" value="${entries[n]?.grams??''}"/></div></div>`).join('')}<label><input type="checkbox" name="school-complete" ${entries.length?'checked':''}/>He incluido todos los componentes de esta toma, con sus cantidades estimadas o medidas.</label></details><p class="form-error" id="school-nutrition-error" role="status"></p>`;}
function readSchoolNutrition(form){const d=new FormData(form),entries=[];for(let n=0;n<8;n++){const foodId=String(d.get('school-food-'+n)||''),raw=String(d.get('school-grams-'+n)||'').trim();if(!foodId&&!raw)continue;const grams=Number(raw);if(!Object.hasOwn(NUTRITION_BY_ID,foodId)||!raw||!Number.isFinite(grams)||grams<.1||grams>5000)throw Error('Cada componente del colegio necesita referencia y gramos válidos.');entries.push({foodId,grams});}if(entries.length&&!d.has('school-complete'))throw Error('Confirma que has incluido toda la comida del colegio.');return entries;}
function installBalance(){
 generateFamilyMenu=commitQuantifiedWeek;
 const oldDetails=recipeDetails;recipeDetails=function(r){return r?.planningBasis?plannedAmountsMarkup(r):oldDetails(r);};
 const oldBatch=batchForRecipe;batchForRecipe=function(r){return r?.planningBasis?null:oldBatch(r);};
 renderQuantifiedWeek=function(){return '';};
 const oldWeek=renderWeek;renderWeek=function(){return oldWeek().replace('</section>','</section>'+renderBalanceReview());};
 const oldForm=renderProfileForm;renderProfileForm=function(p){return oldForm(p).replace('<div class="divider"></div>',`<div class="form-row"><div class="field"><label for="nutrition-sex">Sexo para referencias nutricionales</label><select id="nutrition-sex" name="nutritionSex">${[['reference','Escenario de referencia (predeterminado)'],['male','Masculino'],['female','Femenino']].map(([v,s])=>`<option value="${v}" ${nutritionSex(p||{})===v?'selected':''}>${s}</option>`).join('')}</select></div><div class="field"><label for="nutrition-pal">Actividad habitual · PAL estimado</label><select id="nutrition-pal" name="nutritionPAL">${[['auto','Referencia por edad (predeterminado)'],['1.4','Baja · 1,4'],['1.6','Moderada · 1,6'],['1.8','Activa · 1,8'],['2','Muy activa · 2,0']].map(([v,s])=>`<option value="${v}" ${(p?.nutritionPAL||'auto')===v?'selected':''}>${s}</option>`).join('')}</select><small>Antes de 4 años: referencia 1,4. Son escenarios estimados, no medición de actividad.</small></div></div><div class="divider"></div>`);};
 const oldCriteria=familyCriteria;familyCriteria=function(){return oldCriteria().replace('No asigna gramos al generar ni evalúa cobertura de nutrientes.','La generación incorpora gramos propuestos y una revisión de 12 componentes; puede dejar objetivos pendientes.').replace('La calculadora estima los nutrientes de los pesos que introduces, con datos CIQUAL.','La calculadora utiliza las referencias publicadas y estimadas de cada ingrediente.');};
 const oldGuide=renderAgeGuide;renderAgeGuide=function(){return oldGuide().replace('No se calcula cobertura nutricional.','Consulta la revisión de componentes calculados; no cubre todas las necesidades nutricionales.');};
 const oldGenerate=renderGenerate;renderGenerate=function(){let text=oldGenerate().replace('La propuesta reparte familias de platos y evita repetir el mismo plato el mismo día. Conserva platos fijados y comidas externas.','La propuesta combina platos, asigna gramos editables y busca aproximarse a referencias nutricionales con límites de cantidad. Conserva platos fijados y comidas externas.');text=text.replace('La propuesta solo organiza las tomas de casa; no compensa ni evalúa la alimentación total del día.','La propuesta solo organiza las tomas de casa; el total espera el registro cuantificado del colegio.').replace('No determina cantidades ni evalúa nutrientes.','Las cantidades y los avisos se calculan con un modelo aproximado, sin validación clínica.');let targets;try{targets=targetsMarkup();}catch(e){targets='<p class="form-error">'+h(e.message)+'</p>';}return text.replace('<details class="family-recipe"><summary>Cómo se prepara la propuesta</summary>',targets+'<details class="family-recipe"><summary>Cómo se prepara la propuesta</summary>');};
 const oldSchool=schoolModal;schoolModal=function(day,slot='lunch'){return oldSchool(day,slot).replace('<button class="btn primary"',schoolNutritionFields(day,slot)+'<button class="btn primary"');};
 const oldSchoolPanel=renderSchool;renderSchool=function(){return oldSchoolPanel().replace('Queda fuera del menú de casa, la compra y el resumen.','Queda fuera de la compra. Puedes añadir cantidades y referencias para revisar el total del día.');};
 document.addEventListener('submit',e=>{if(!e.target.matches('.planned-amounts'))return;e.preventDefault();savePlannedAmounts(e.target);});
}
