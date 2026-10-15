const FAMILY_RULE_VERSION='familia-24-35m-v1';
const FAMILY_SOURCES=[
 ['Ministerio de Sanidad · Alimentación de 1 a 3 años','https://estilosdevidasaludable.sanidad.gob.es/alimentacionSaludable/lactancia/primeraInfancia/'],
 ['Canal Salut · Primera infancia','https://canalsalut.gencat.cat/ca/vida-saludable/alimentacio/saludable/primera-infancia/'],
 ['AESAN · Pescado y mercurio','https://www.aesan.gob.es/AECOSAN/docs/documentos/publicaciones/seguridad_alimentaria/RECOMENDACIONES_consumo_pescado_MERCURIO_AESAN_WEB.PDF'],
 ['AESAN · Hortalizas y nitratos','https://www.aesan.gob.es/AECOSAN/docs/documentos/para_consumidor/TRIPTICO_AESAN_RECOMENDACION_CONSUMO_HORTALIZAS_NITRATOS_.pdf'],
 ['AEP · Prevención de atragantamientos','https://www.aeped.es/actualidad/atragantamientos-navidad']
];
function profileMonths(p=profile()){return Number(p.ageYears)*12+Number(p.ageMonths||0);}
function familyEligible(p=profile()){const age=profileMonths(p);return Number.isInteger(age)&&age>=24&&age<=35;}
function familyBlock(){if(!familyEligible())return 'El planificador inicial está preparado para 24–35 meses. Para otras edades puedes crear un menú manual.';if(hasRestrictions())return 'Con alergias o alimentos excluidos declarados, la generación y las sustituciones automáticas siguen bloqueadas. Usa un menú manual revisado.';return '';}
function sourceLinks(){return `<ul>${FAMILY_SOURCES.map(([label,url])=>`<li><a href="${url}" target="_blank" rel="noopener noreferrer">${h(label)}</a></li>`).join('')}</ul>`;}
function recipeDetails(r){if(!r?.family)return '<p>Plato anterior o personalizado: preparación, cantidades y alérgenos pendientes de revisar.</p>';return `<div class="selected-surface"><strong>Preparación propuesta</strong><ol>${r.steps.map(step=>`<li>${h(step)}</li>`).join('')}</ol><p>${h(r.safety)}</p><p><b>Alérgenos de los ingredientes propuestos:</b> ${r.allergens.length?r.allergens.map(key=>h(ALLERGENS.find(([k])=>k===key)?.[1]||key)).join(', '):'ninguno identificado'}. Comprueba etiquetas y posibles trazas.</p><small>${h(r.adaptation)} No se asignan raciones por edad ni peso.</small></div>`;}
function renderRecipes(){return `<section class="surface panel-pad"><div class="subheading"><div><h2>Recetario familiar</h2><p>${FAMILY_RECIPES.length} preparaciones propuestas · referencia 24–35 meses</p></div>${icon('list')}</div><p>Basado en los platos de las fotos, con variantes identificadas. Ingredientes y preparación pendientes de tu confirmación; no son una transcripción de las recetas familiares.</p>${FAMILY_RECIPES.map(r=>`<details class="family-recipe"><summary><strong>${h(r.name)}</strong><small>${r.slots.map(slotLabel).join(' · ')}${r.automatic===false?' · Solo elección manual':''}</small></summary><p><b>Ingredientes:</b> ${r.ingredients.map(i=>h(i.name)).join(', ')}.</p>${recipeDetails(r)}</details>`).join('')}<details class="family-recipe"><summary>Fuentes y criterios</summary>${familyCriteria()}</details></section>`;}
function familyCriteria(){return `<p>Se priorizan ingredientes vegetales, legumbres, cereales preferentemente integrales (arroz blanco en esta franja de edad), agua y preparaciones sencillas. La cantidad servida se adapta al apetito y a las indicaciones individuales. Ofrece agua como bebida habitual; no se calculan tomas de leche ni lactancia.</p><p>El catálogo automático evita embutidos, salchichas, pescado de especie indeterminada, espinacas y acelgas sin control de cantidad, y alimentos enteros con riesgo de atragantamiento. No implica que todos estén prohibidos: es una limitación deliberada de esta versión.</p><p>La distribución de platos es una decisión de organización de la app, no una pauta oficial de raciones ni una evaluación de nutrientes. Sin cantidades no se calculan energía, hierro, calcio o cobertura nutricional.</p>${sourceLinks()}<small>Fuentes consultadas el 15/10/2026. Reglas ${FAMILY_RULE_VERSION}.</small>`;}
function buildFamilyWeek(old,seed){
 const days=DAYS.map(()=>Object.fromEntries(SLOTS.map(([slot])=>[slot,emptyMeal()]))),used={},proteinCounts={},dayProteins=DAYS.map(()=>new Set());
 const active=new Set(activeMeals().map(([slot])=>slot));let editableMain=0;
 for(let day=0;day<7;day++)for(const [slot] of SLOTS){const prev=old.days[day]?.[slot]||emptyMeal();if(slot==='lunch'&&schoolDay(day))continue;
  if(!active.has(slot)||prev.locked||prev.external){days[day][slot]={...prev};if(active.has(slot)&&!prev.external&&['lunch','dinner'].includes(slot)){const r=recipeById(prev.recipeId);if(r){used[r.id]=(used[r.id]||0)+1;if(r.family){proteinCounts[r.protein]=(proteinCounts[r.protein]||0)+1;dayProteins[day].add(r.protein);}}}continue;}
  if(['lunch','dinner'].includes(slot))editableMain++;
 }
 const weights={legumbres:4,pescado:3,huevo:2,ave:2,carne_roja:1,vegetal:2};
 // Reparto editorial proporcional a las tomas de casa; nunca compensa el comedor.
 const fixed=Object.values(proteinCounts).reduce((a,b)=>a+b,0),total=editableMain+fixed,quotas=Object.fromEntries(Object.entries(weights).map(([key,w])=>[key,Math.floor(total*w/14)]));
 let remainder=total-Object.values(quotas).reduce((a,b)=>a+b,0);
 const order=Object.keys(weights).sort((a,b)=>(total*weights[b]/14-quotas[b])-(total*weights[a]/14-quotas[a]));for(let i=0;i<remainder;i++)quotas[order[i%order.length]]++;
 const rank=r=>{let value=seed>>>0;for(const c of r.id)value=(Math.imul(value,31)+c.charCodeAt(0))>>>0;return value/4294967296;};
 for(let day=0;day<7;day++)for(const [slot] of activeMeals()){
  if(slot==='lunch'&&schoolDay(day))continue;const prev=old.days[day]?.[slot]||emptyMeal();if(prev.locked||prev.external)continue;
  const main=['lunch','dinner'].includes(slot),options=FAMILY_RECIPES.filter(r=>r.slots.includes(slot)&&r.automatic!==false);
  const score=r=>{const repeats=(used[r.id]||0)*12,other=Object.values(days[day]).some(m=>m.recipeId===r.id)?100:0;
   if(!main)return repeats+other+rank(r)+(day+seed)%3*.01;
   const deficit=(quotas[r.protein]||0)-(proteinCounts[r.protein]||0);
   return (deficit>0?-100-deficit*4:100+(proteinCounts[r.protein]||0)*10)+(dayProteins[day].has(r.protein)?40:0)+repeats+other+rank(r);
  };
  options.sort((a,b)=>score(a)-score(b));const chosen=options[0];if(!chosen)continue;days[day][slot]={recipeId:chosen.id,locked:false,external:false};used[chosen.id]=(used[chosen.id]||0)+1;
  if(main){proteinCounts[chosen.protein]=(proteinCounts[chosen.protein]||0)+1;dayProteins[day].add(chosen.protein);}
 }
 return {days,seed,kind:'family',createdAt:new Date().toISOString(),ruleVersion:FAMILY_RULE_VERSION};
}
function generateFamilyMenu(){const blocked=familyBlock();if(blocked){notify(blocked);return false;}const old=menu(),seed=(old.seed||0)+1,fresh=buildFamilyWeek(old,seed),next={...state,menus:{...state.menus,[mealKey()]:fresh},view:'week',modal:null};
 try{const {modal,...stored}=next;localStorage.setItem(STORAGE_KEY,JSON.stringify(stored));}catch{notify('No se pudo guardar la nueva semana. Se ha conservado el menú anterior.');return false;}
 state=next;varietyChange=null;render();notify('Semana preparada. Revisa los platos y su preparación antes de usarla.');return true;
}
function foodSafetyReview(){const issues=new Set(),age=profileMonths();let unknown=0;
 for(let day=0;day<7;day++)for(const [slot] of activeMeals()){const {m,recipe:r}=mealData(day,slot);if(m.external||!r)continue;if(!r.family)unknown++;
  const names=normalizedFood(r.name+' '+r.ingredients.map(i=>i.name).join(' '));
  if(age<120&&/\b(pez espada|emperador|atun rojo|lucio|tiburon|cazon|marrajo|tintorera)\b/.test(names))issues.add('Revisa el pescado: AESAN indica evitar especies de alto mercurio en menores de 10 años.');
  if(age<36&&/\b(espinacas?|acelgas?|borraja)\b/.test(names))issues.add('Hay hortalizas con recomendaciones específicas por nitratos. Sin cantidades, la app no puede comprobar el límite para esta edad.');
  const hits=(profile().restrictions||[]).filter(key=>(r.allergens||[]).includes(key));if(hits.length)issues.add('Hay platos con alérgenos declarados en el perfil. No los consideres aptos.');
 }
 return {issues:[...issues],unknown};
}
function renderFamilySafety(){const review=foodSafetyReview();if(!review.issues.length&&!review.unknown)return '';return `<section class="surface panel-pad" style="margin-top:20px"><h2>Revisión de preparación</h2>${review.issues.map(msg=>`<p class="form-error">${icon('alert')} ${h(msg)}</p>`).join('')}${review.unknown?`<p>${review.unknown} tomas contienen platos anteriores o personalizados sin ficha de preparación revisada.</p>`:''}<small>Las comprobaciones no detectan todos los riesgos, alérgenos ni trazas. Consulta las fichas del recetario y las etiquetas.</small></section>`;}
