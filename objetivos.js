/* References for healthy population groups. App tolerances are not clinical cut-offs. */
const BALANCE_VERSION='0.15.0';
const BALANCE_SOURCES=[
 ['EFSA · DRV summary 2017 · tables 1–3, 5, 7, 9, 11, 17','https://www.efsa.europa.eu/sites/default/files/2017_09_DRVs_summary_report.pdf'],
 ['EFSA · Energy 2013 · growth and PAL','https://doi.org/10.2903/j.efsa.2013.3005'],
 ['SACN · Energy 2011 · table 19, p.106 · Henry weight equations (MJ)','https://assets.publishing.service.gov.uk/media/5a7edb37ed915d74e33f2d8f/SACN_Dietary_Reference_Values_for_Energy.pdf'],
 ['EFSA · Sodium 2019 · table 11','https://doi.org/10.2903/j.efsa.2019.5778'],
 ['EFSA · Iron safe levels 2024','https://doi.org/10.2903/j.efsa.2024.8819'],
 ['EFSA · Vitamin D upper levels 2023','https://doi.org/10.2903/j.efsa.2023.8145'],
 ['OMS · Alimentación saludable','https://www.who.int/en/news-room/fact-sheets/detail/healthy-diet'],
 ['AESAN · Alimentación saludable y sostenible','https://www.aesan.gob.es/actualidad/publicaciones-nutricion/recomendaciones-dieteticas-saludables-y-sostenibles-complementadas-con-recomendaciones-de-actividad-fisica-para-la-poblacion-espanola']
];
// Table 1: [male,female] MJ/day at PAL 1.4 (1–9) or 1.6 (10–16).
const ENERGY_MJ=[[3.3,3.0],[4.3,4.0],[4.9,4.6],[5.3,4.9],[5.6,5.2],[5.9,5.5],[6.3,5.8],[6.7,6.2],[7.0,6.6],[8.1,7.6],[8.5,8.0],[9.1,8.4],[9.8,8.8],[10.5,9.1],[11.3,9.3],[11.9,9.5]];
const PROTEIN_PRI=[[1,1.14,1.14],[1.5,1.03,1.03],[2,.97,.97],[3,.90,.90],[4,.86,.86],[5,.85,.85],[6,.89,.89],[7,.91,.91],[8,.92,.92],[9,.92,.92],[10,.91,.91],[11,.91,.90],[12,.90,.89],[13,.90,.88],[14,.89,.87],[15,.88,.85],[16,.87,.84]];
const BODY_REFERENCES=[[4,12.2,11.5,11.9],[7,19.2,18.7,19],[11,29,28.4,28.7],[15,44,45.1,44.6],[18,64.1,56.4,60.3]];
function nutritionSex(p){return ['male','female'].includes(p.nutritionSex)?p.nutritionSex:'reference';}
function sexValue(pair,sex){return sex==='male'?pair[0]:sex==='female'?pair[1]:(pair[0]+pair[1])/2;}
function nutritionTargets(p=profile()){
 const age=Number(p.ageYears),months=Number(p.ageMonths||0),sex=nutritionSex(p);
 if(!Number.isInteger(age)||age<1||age>16||!Number.isInteger(months)||months<0||months>11)throw Error('Revisa la edad del perfil.');
 const pal=p.nutritionPAL&&p.nutritionPAL!=='auto'?Number(p.nutritionPAL):age<4?1.4:1.6;
 if(![1.4,1.6,1.8,2].includes(pal)||(age<4&&pal!==1.4))throw Error('Antes de 4 años se utiliza PAL de referencia 1,4.');
 const ref=BODY_REFERENCES.find(row=>age<row[0]),referenceWeight=sex==='male'?ref[1]:sex==='female'?ref[2]:ref[3];
 const actualWeight=String(p.weight??'').trim()!==''?Number(p.weight):null;
 if(actualWeight!==null&&(!Number.isFinite(actualWeight)||actualWeight<1||actualWeight>250))throw Error('Revisa el peso del perfil.');
 const baseline=sexValue(ENERGY_MJ[age-1],sex)*238.83*pal/(age<10?1.4:1.6);
 let kcal=baseline;
 if(actualWeight!==null){
  const equations=age<3?[[.255,-.141],[.246,-.0965]]:age<10?[[.0937,2.15],[.0842,2.12]]:[[.0769,2.43],[.0465,3.18]];
  kcal=sexValue(equations.map(([a,b])=>(a*actualWeight+b)*pal*1.01*238.83),sex);
 }
 // Conservative application guards, NOT diagnostic growth thresholds.
 const guard=actualWeight!==null&&(actualWeight<referenceWeight*.5||actualWeight>referenceWeight*2||kcal<baseline*.6||kcal>baseline*1.6)||kcal<500||kcal>5000;
 const row=PROTEIN_PRI.filter(row=>row[0]<=age+months/12).at(-1),protein=sexValue(row.slice(1),sex)*(actualWeight??referenceWeight);
 const iron=age<7?7:sex==='male'||age<12?11:13;
 return {age,months,sex,pal,weight:actualWeight??referenceWeight,referenceWeight,actualWeight,kcal,protein,
  carbs:[45,60],fat:age<4?[35,40]:[20,35],fiber:age<4?10:age<7?14:age<11?16:age<15?19:21,
  calcium:age<4?450:age<11?800:1150,iron,vitaminD:15,vitaminB12:age<7?1.5:age<11?2.5:age<15?3.5:4,
  sodium:age<4?1100:age<7?1300:age<11?1700:2000,ironSafe:age<4?10:age<7?15:age<11?20:age<15?30:35,vitaminDUL:age<11?50:100,
  guard,energyMethod:actualWeight===null?'Tabla EFSA por año cumplido y sexo; PAL escalado cuando difiere del de la tabla.':'Henry por peso (MJ), PAL y +1% para crecimiento; variante de peso, sin estatura.',
  signature:JSON.stringify([age,months,sex,pal,actualWeight])};
}
function targetsMarkup(t=nutritionTargets()){
 return `<details class="family-recipe"><summary>Necesidades orientativas · ${fmtNum(t.kcal)} kcal/día</summary><p>${t.sex==='reference'?'Escenario predeterminado: media de ambos sexos para energía y proteína; hierro de la referencia femenina desde 12 años. No es un grupo oficial de EFSA.':'Referencia '+(t.sex==='male'?'masculina':'femenina')+'.'} PAL ${t.pal}. ${t.actualWeight===null?'Sin peso medido: proteína con peso poblacional de referencia '+fmtNum(t.weight)+' kg; no se ha rellenado el peso del perfil.':'Peso indicado: '+fmtNum(t.weight)+' kg.'} ${h(t.energyMethod)} La estatura guardada no interviene en esta ecuación.</p><p>Proteína PRI ${fmtNum(t.protein)} g/día (no es un máximo); hidratos ${t.carbs.join('–')}% y grasa ${t.fat.join('–')}% de energía; fibra AI ${t.fiber} g; calcio PRI ${t.calcium} mg; hierro PRI ${t.iron} mg; D AI 15 µg y B12 AI ${t.vitaminB12} µg. D presupone síntesis cutánea mínima.</p><p>Son referencias para población sana. No incluyen enfermedad, crecimiento individual, lactancia materna ni suplementos. Se respeta hambre y saciedad: las cantidades no son una obligación de terminar. Cambia sexo de referencia, actividad y peso en Perfiles.</p>${t.guard?'<p class="form-error">Los datos quedan fuera de los márgenes de uso automático de este prototipo. Revisa el perfil con un profesional; se bloquea la generación cuantificada.</p>':''}<details><summary>Fuentes y límites</summary><p>Tolerancia de energía ±10%, aviso de proteína &gt;20% de energía y calcio &gt;200%: criterios de revisión de la app, no umbrales clínicos oficiales. Sodio se compara con ingesta segura y adecuada, no con un mínimo que haya que alcanzar ni un UL. Hierro: nivel seguro, no UL ni objetivo a maximizar. Los promedios semanales no ocultan días con exceso.</p><p>Solo se calculan 12 componentes. No se verifica la totalidad de necesidades: faltan, entre otros, yodo, zinc, vitaminas A/C/E/K, folato y ácidos grasos esenciales. Los azúcares son totales, sin estimación de azúcares libres. No se prescriben suplementos.</p><ul>${BALANCE_SOURCES.map(([title,url])=>`<li><a href="${url}" target="_blank" rel="noopener noreferrer">${h(title)}</a></li>`).join('')}</ul></details></details>`;
}
