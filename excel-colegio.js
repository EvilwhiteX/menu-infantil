/* Excel se procesa localmente; no evalúa fórmulas ni envía el libro. */
const SCHOOL_HEADERS=['fecha','tipo_dia','primero','segundo','guarnicion','postre','otros','observaciones'];
function schoolTemplateRows(month){if(!schoolMonthValid(month))throw Error('Elige un mes válido.');return [SCHOOL_HEADERS,...schoolMonthDates(month).filter(d=>(parseDate(d).getDay()+6)%7<5).map(d=>[d,'desconocido','','','','','',''])];}
function schoolRowsCSV(rows){return rows.map(row=>row.map(cell=>'"'+String(cell??'').replace(/"/g,'""')+'"').join(';')).join('\r\n');}
function downloadSchoolCSV(month){schoolDownload('\uFEFF'+schoolRowsCSV(schoolTemplateRows(month)),'plantilla-colegio-'+month+'.csv','text/csv;charset=utf-8');}
function schoolExcelWorkbook(month){
 if(typeof XLSX==='undefined')throw Error('No se pudo cargar la herramienta de Excel. Puedes usar CSV.');
 const workbook=XLSX.utils.book_new(),sheet=XLSX.utils.aoa_to_sheet(schoolTemplateRows(month));
 sheet['!cols']=[{wch:14},{wch:16},{wch:34},{wch:34},{wch:30},{wch:24},{wch:24},{wch:55}];sheet['!autofilter']={ref:sheet['!ref']};
 XLSX.utils.book_append_sheet(workbook,sheet,'Menú del colegio');
 const instructions=[['Cómo rellenar el menú del colegio'],['Mes',month],['1','Conserva las fechas. Escribe los nombres de los platos en español.'],['2','tipo_dia: colegio, casa o desconocido. No deduzcas festivos de las celdas vacías.'],['3','Separa primero, segundo, guarnición, postre y otros. Deja vacío lo que no se anuncia.'],['4','No inventes pesos ni ingredientes reales del colegio. Añade dudas en observaciones.'],['5','No uses fórmulas, celdas combinadas ni varias tablas. Conserva la fila de cabeceras.'],['6','Guarda como .xlsx y cárgalo en la app; revisa las fechas y las estimaciones antes de confirmar.'],['7','No incluyas datos personales del menor ni cambies las columnas.']];
 const help=XLSX.utils.aoa_to_sheet(instructions);help['!cols']=[{wch:12},{wch:115}];XLSX.utils.book_append_sheet(workbook,help,'Instrucciones');return workbook;
}
function downloadSchoolExcel(month){try{const bytes=XLSX.write(schoolExcelWorkbook(month),{type:'array',bookType:'xlsx',compression:true});schoolDownload(bytes,'plantilla-colegio-'+month+'.xlsx','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');}catch(e){notify(e.message);}}
function schoolWorkbookCSV(bytes){
 const book=XLSX.read(bytes,{type:'array',sheetRows:35,cellFormula:true,cellDates:false,bookVBA:false}),names=book.SheetNames.filter(n=>n!=='Instrucciones');
 if(names.length!==1)throw Error('El Excel debe contener una sola tabla de menú; utiliza la plantilla.');
 const sheet=book.Sheets[names[0]],range=XLSX.utils.decode_range(sheet['!fullref']||sheet['!ref']||'A1:A1');
 if(range.s.r!==0||range.s.c!==0||range.e.r>31||range.e.c>8||sheet['!merges']?.length)throw Error('Usa una tabla con cabeceras en la primera fila, hasta 31 fechas y sin celdas combinadas.');
 const rows=XLSX.utils.sheet_to_json(sheet,{header:1,raw:true,defval:'',blankrows:false});
 for(const key of Object.keys(sheet)){if(key[0]==='!')continue;const cell=sheet[key];if(cell.f||cell.F||cell.l)throw Error('Retira las fórmulas y enlaces del menú antes de cargarlo.');if(String(cell.v??'').length>1500)throw Error('Hay una celda demasiado larga.');}
 for(let n=1;n<rows.length;n++){const row=rows[n];if(typeof row[0]==='number'){const date=XLSX.SSF.parse_date_code(row[0],{date1904:book.Workbook?.WBProps?.date1904===true});if(!date||date.H||date.M||date.S)throw Error('Revisa las fechas del Excel.');row[0]=String(date.y).padStart(4,'0')+'-'+String(date.m).padStart(2,'0')+'-'+String(date.d).padStart(2,'0');}if(row.length!==rows[0].length){while(row.length<rows[0].length)row.push('');if(row.length>rows[0].length)throw Error('Una fila contiene columnas adicionales.');}}
 const text=schoolRowsCSV(rows);if(text.length>1024*1024)throw Error('La tabla del menú es demasiado grande.');return text;
}
function readSchoolExcel(file){return new Promise(async(resolve,reject)=>{let worker,timer;try{if(file.size>5*1024*1024)throw Error('El Excel supera el límite de 5 MB.');const bytes=await file.arrayBuffer();if(typeof Worker==='undefined'){resolve(schoolWorkbookCSV(bytes));return;}worker=new Worker('excel-colegio-worker.js?v=0.19.0');timer=setTimeout(()=>{worker.terminate();reject(Error('No se pudo leer el Excel a tiempo. Prueba con la plantilla o con CSV.'));},12000);worker.onmessage=e=>{clearTimeout(timer);worker.terminate();e.data.error?reject(Error(e.data.error)):resolve(e.data.text);};worker.onerror=()=>{clearTimeout(timer);worker.terminate();reject(Error('No se pudo leer el Excel. Utiliza la plantilla o CSV.'));};worker.postMessage(bytes,[bytes]);}catch(e){clearTimeout(timer);worker?.terminate();reject(e);}});}
