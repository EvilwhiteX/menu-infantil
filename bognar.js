/* Alternative coherent profiles: never multiply USDA and Bognár on one ingredient. */
for(const row of BOGNAR_DATA.records)RETENTION_BY_CODE[row.code]=row;
const CHOICES_BEFORE_BOGNAR=retentionChoices;
retentionChoices=function(foodId){const choices=CHOICES_BEFORE_BOGNAR(foodId);if(!Object.hasOwn(NUTRITION_BY_ID,foodId))return choices;const f=NUTRITION_BY_ID[foodId];if(/cocid/i.test(f.weightState))return choices;const code=f.originalId||f.id.replace(/^ref-/,''),extra=code==='22000'?['bg02-boil']:['26043','26044'].includes(code)?['bg20-boil-A','bg20-boil-B']:code==='26036'?['bg22-boil-A','bg22-boil-B']:[];return [...choices,...extra.map(id=>RETENTION_BY_CODE[id])];};
const RESOLVE_BEFORE_ENERGY_DELTA=resolveNutritionFood;
resolveNutritionFood=function(entry){const adjusted=RESOLVE_BEFORE_ENERGY_DELTA(entry),row=RETENTION_BY_CODE[entry.retentionCode];if(!row?.energyDelta)return adjusted;const raw=RESOLVE_BEFORE_RETENTION(entry),coeff={protein:4,carbs:4,fat:9,fiber:2},changed=Object.keys(coeff).filter(k=>row.factors[k]!==undefined&&row.factors[k]!==1);if(!changed.length)return adjusted;
 const nutrients={...adjusted.nutrients},energy=raw.nutrients.kcal;let value=energy.value;
 if(energy.status!=='value'||changed.some(k=>raw.nutrients[k].status!=='value'))nutrients.kcal={raw:null,status:'missing',value:null,estimated:true,retentionApplied:true};
 else{for(const key of changed)value+=coeff[key]*raw.nutrients[key].value*(row.factors[key]-1);nutrients.kcal=value>=0?{...energy,value,estimated:true,retentionApplied:true,energyDerived:true}:{raw:null,status:'missing',value:null,estimated:true,retentionApplied:true};}
 return {...adjusted,nutrients};
};
