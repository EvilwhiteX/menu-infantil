/* Transcripción de referencias institucionales. No asigna raciones a las recetas. */
const PORTION_SOURCES={
 school:{title:'ASPCAT · Tabla orientativa de gramajes para las escuelas',version:'Mayo 2020',page:'1',url:'https://scientiasalut.gencat.cat/bitstream/handle/11351/12100/taula_orientativa_gramatges_funcio_grup_edat_recomenacions_escoles_2020.pdf?sequence=1&isAllowed=y',sha256:'63f9d981d90f6ab284f352f2d5f664d5a3ba9ea32e378fd24512df71cda38c0e'},
 infant:{title:'ASPCAT · La alimentación saludable en la primera infancia',version:'2022',page:'21 (página 12 del PDF a doble página); contexto en 34',url:'https://scientiasalut.gencat.cat/bitstream/handle/11351/9237.3/alimentacio_saludable_primera_infancia_2022_cas.pdf',sha256:'dd7a0cd696fc8854fcb45bb16997aead6c8c7413464c5196a5bc4048f307e46c'},
 consensus:{title:'AESAN · Consenso de primer ciclo de educación infantil',version:'2025',page:'29–33',url:'https://www.aesan.gob.es/dam/jcr:0e479e65-2e4c-4532-b19c-b7436dad8a05/ALIMENTACION_PRIMER_CICLO_EI.pdf',sha256:'793927573ec0b54fc465b7c2f7e37792ccd5830b3372cfc9ea466c28354ff9e2'}
};
const SCHOOL_PORTION_BANDS=[{min:36,max:83,label:'3–6 años'},{min:84,max:155,label:'7–12 años'},{min:156,max:191,label:'13–15 años'},{min:192,max:227,label:'16–18 años'}];
const SCHOOL_PORTIONS=[
 ['Hortalizas · principal','g','crudo',[[100,120],[120,150],[150,200],[200,250]]],
 ['Hortalizas · guarnición','g','crudo',[[50,60],[60,100],[100,120],[120,150]]],
 ['Fruta fresca','g','crudo',[[90,120],[120,150],[150,200],[175,250]]],
 ['Legumbres · principal','g','seco, antes de cocer',[[30,50],[50,60],[60,80],[80,100]]],
 ['Legumbres · guarnición','g','seco, antes de cocer',[[15,20],[20,30],[30,40],[40,50]]],
 ['Patata · principal','g','crudo',[[150,200],[200,250],[250,300],[250,300]]],
 ['Patata · guarnición','g','crudo',[[80,90],[90,100],[100,150],[150,200]]],
 ['Arroz o pasta · principal','g','seco, antes de cocer',[[50,60],[60,80],[80,90],[90,100]]],
 ['Arroz o pasta · sopa o guarnición','g','seco, antes de cocer',[[20,25],[25,30],[30,35],[35,50]]],
 ['Pescado · filete','g','crudo',[[50,60],[70,90],[100,130],[100,130]]],
 ['Huevo','ud','pequeño en 3–6 años',[[1,1],[1,2],[2,2],[2,2]]],
 ['Carne · pieza sin hueso o picada','g','crudo, sin hueso',[[40,50],[60,80],[90,110],[90,110]]],
 ['Pollo, conejo o piezas con hueso','g','crudo, peso bruto',[[50,65],[75,100],[115,140],[115,140]]],
 ['Yogur natural','g','producto tal cual',[[50,100],[100,100],[100,150],[100,150]]],
 ['Queso · para gratinar o acompañar pasta','g','producto tal cual',[[10,10],[15,15],[20,20],[20,20]]]
].map(([label,unit,weightState,values],i)=>({id:'aspcat-2020-'+i,label,unit,weightState,values,source:'school',scope:'comedor escolar',review:'Transcripción contrastada visualmente; interpretación clínica pendiente',automatic:false}));
const INFANT_PORTIONS=[
 {label:'Legumbres',min:30,max:30,unit:'g',weightState:'seco; la fuente indica 60–70 g cocidos como referencia, no como conversión universal'},
 {label:'Pollo, pavo, cerdo o ternera',min:30,max:35,unit:'g',weightState:'la tabla no explicita aquí el estado de peso'},
 {label:'Pescado',min:30,max:35,unit:'g',weightState:'la tabla no explicita aquí el estado de peso'},
 {label:'Huevo',min:1,max:1,unit:'ud',weightState:'pequeño o mediano; pesar sin cáscara para calcular nutrientes'}
].map((r,i)=>({...r,id:'aspcat-2022-'+i,source:'infant',scope:'orientación diaria condicionada, no cantidad por comida',minMonths:12,maxMonths:35,automatic:false,review:'Transcripción contrastada visualmente; interpretación clínica pendiente'}));
function portionReferencesForMonths(age){if(!Number.isInteger(age)||age<12||age>203)return null;if(age<36)return {kind:'infant',rows:INFANT_PORTIONS,source:PORTION_SOURCES.infant};const index=SCHOOL_PORTION_BANDS.findIndex(b=>age>=b.min&&age<=b.max);return index<0?null:{kind:'school',band:SCHOOL_PORTION_BANDS[index],rows:SCHOOL_PORTIONS.map(r=>({...r,min:r.values[index][0],max:r.values[index][1]})),source:PORTION_SOURCES.school};}
function renderPortionReferences(age=profileMonths()){
 const data=portionReferencesForMonths(age);if(!data)return '';
 const context=data.kind==='infant'?'<p><b>Referencia diaria, con condiciones:</b> la tabla supone 250 ml/día de leche de vaca y excluye del cálculo la proteína de otros alimentos. La propia guía indica que el contexto de lactancia cambia su interpretación. Carne, pescado y huevo son alternativas; no se suman esas cantidades ni se repiten en cada comida. Las legumbres tienen una consideración distinta y la guía no propone limitarlas igual que la carne.</p><p>Para fruta, hortalizas y cereales no se han inventado gramajes fijos. Esta referencia requiere interpretación individual y no se aplica al menú automáticamente.</p>':'<p><b>Referencia de comedor escolar · '+h(data.band.label)+'.</b> Son cantidades orientativas por preparación o componente, no una pauta diaria del hogar. Un plato mixto no debe sumar sin más todas las filas de platos principales. Se respeta el apetito y se diferencia peso bruto de parte comestible.</p>';
 return `<details class="family-recipe"><summary>Consultar cantidades de referencia por edad</summary>${context}<dl class="portion-reference">${data.rows.map(r=>`<div><dt><b>${h(r.label)}</b></dt><dd>${fmtNum(r.min)}${r.max!==r.min?'–'+fmtNum(r.max):''} ${h(r.unit)} · ${h(r.weightState)}</dd></div>`).join('')}</dl><small>Transcripción de fuente oficial, sin revisión profesional individual. No asigna gramos a tus recetas. ${h(data.source.version)} · página ${h(data.source.page)}.</small><p><a href="${data.source.url}" target="_blank" rel="noopener noreferrer">Ver documento y notas originales</a></p></details>`;
}
