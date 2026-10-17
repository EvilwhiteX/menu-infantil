/* Lector aislado: los archivos permanecen en el dispositivo. */
importScripts('xlsx.mini.min.js','excel-colegio.js?v=0.19.0');
self.onmessage=event=>{try{self.postMessage({text:schoolWorkbookCSV(event.data)});}catch(e){self.postMessage({error:e.message||'No se puede leer el libro Excel.'});}};
