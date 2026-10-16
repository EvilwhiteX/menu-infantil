/* Extend references without changing original/private nutrient schemas. */
for(const food of NEW_FOODS_V014){NUTRITION_DATA.foods.push(food);NUTRITION_BY_ID[food.id]=food;COMPLETED_REFERENCES.foods.push(food);COMPLETED_BY_ID[food.id]=food;}
Object.assign(RECIPE_BATCHES,NEW_BATCHES_V014);
const CANDIDATES_BEFORE_V014=nutritionCandidates;
const NEW_FOOD_NAMES=Object.fromEntries(NEW_FOODS_V014.map(f=>[f.label.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase(),f.id]));
nutritionCandidates=function(name){const key=normalizedFood(name).trim();return Object.hasOwn(NEW_FOOD_NAMES,key)?[NUTRITION_BY_ID[NEW_FOOD_NAMES[key]]]:CANDIDATES_BEFORE_V014(name);};
function extraIngredientComposition(i){
 const result={};const ref=i.foodId&&!i.labelData?EXTRA_COMPOSITION.foods[i.foodId]||EXTRA_COMPOSITION.foods['ref-'+i.foodId]:null;
 const validWeight=Number.isFinite(i.qty)&&i.qty>0&&i.qty<=100000&&i.unit==='g';
 for(const field of EXTRA_COMPOSITION.fields){const n=ref?.values[field.key];result[field.key]={value:n?.status==='value'&&validWeight?n.value*i.qty/100:null,upper:n?.status==='lt'&&validWeight?n.limit*i.qty/100:null,status:validWeight?n?.status||'missing':'missing',estimated:!!ref?.estimated};}
 return result;
}
function extraCompositionForIngredients(ingredients){
 const totals=Object.fromEntries(EXTRA_COMPOSITION.fields.map(f=>[f.key,{value:0,upper:0,missing:0,known:0,estimated:false,bounded:false}]));
 for(const i of ingredients){const values=extraIngredientComposition(i);for(const f of EXTRA_COMPOSITION.fields){const n=values[f.key],t=totals[f.key];if(n.value!==null){t.value+=n.value;t.upper+=n.value;t.known++;}else if(n.upper!==null){t.upper+=n.upper;t.bounded=true;t.known++;}else t.missing++;t.estimated||=n.estimated;}}
 return totals;
}
