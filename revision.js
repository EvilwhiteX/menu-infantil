/* V0.20.1 · Foco de diálogos y conservación de la posición al editarlos. */
function focusDescriptor(node){if(!node?.tagName)return null;return {tag:node.tagName,id:node.id||'',name:node.getAttribute('name')||'',action:node.dataset?.action||'',data:{...node.dataset}};}
function matchingFocus(root,description){
 if(!root||!description)return null;
 return [...root.querySelectorAll('button,input,select,textarea,a[href],summary,[tabindex]')].find(node=>{
  if(node.disabled||!node.getClientRects().length)return false;
  if(description.id)return node.id===description.id;
  if(description.action)return node.dataset.action===description.action&&Object.entries(description.data).every(([k,v])=>node.dataset[k]===v);
  return description.name&&node.tagName===description.tag&&node.getAttribute('name')===description.name;
 });
}
function dialogFocusable(dialog){return [...dialog.querySelectorAll('button,input,select,textarea,a[href],summary,[tabindex]')].filter(node=>!node.disabled&&node.type!=='hidden'&&node.getAttribute('tabindex')!=='-1'&&node.getClientRects().length&&getComputedStyle(node).visibility!=='hidden');}
function installRevisionUX(){
 if(typeof document.getElementById('app')?.querySelectorAll!=='function')return;
 const previousRender=render;let opener=null,previousKey='';
 render=function(){
  const before=document.querySelector('[role="dialog"]'),active=focusDescriptor(document.activeElement),inside=!!before?.contains(document.activeElement),scroll=before?.querySelector('.modal-body')?.scrollTop||0;
  if(!before&&state.modal)opener=active;
  previousRender();
  const dialog=document.querySelector('[role="dialog"]'),shell=document.querySelector('.app-shell'),key=state.modal?JSON.stringify([state.modal.type,state.modal.day,state.modal.slot,state.modal.index,state.modal.month]):'';
  if(shell)shell.inert=!!dialog;
  document.documentElement.classList.toggle('modal-open',!!dialog);
  if(dialog){
   dialog.setAttribute('tabindex','-1');
   const target=inside&&key===previousKey?matchingFocus(dialog,active):null;
   (target||dialog.querySelector('[data-action="close-modal"]')||dialog).focus({preventScroll:true});
   if(key===previousKey&&dialog.querySelector('.modal-body'))dialog.querySelector('.modal-body').scrollTop=scroll;
  }else if(before){matchingFocus(document,opener)?.focus({preventScroll:true});opener=null;}
  previousKey=key;
 };
 document.addEventListener('keydown',event=>{
  if(event.key!=='Tab'||event.defaultPrevented)return;const dialog=document.querySelector('[role="dialog"]');if(!dialog)return;
  const focusable=dialogFocusable(dialog),first=focusable[0],last=focusable.at(-1);
  if(!first){event.preventDefault();dialog.focus();return;}
  if(!dialog.contains(document.activeElement)||document.activeElement===dialog){event.preventDefault();(event.shiftKey?last:first).focus();}
  else if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
  else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
 });
}
