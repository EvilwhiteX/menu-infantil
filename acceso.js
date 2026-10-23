/* Ayuda contextual para empezar y guardar el perfil. */
function profileGateNeeded(action,view){
 const missing=!state.profiles.length;
 if(action==='nav')return missing&&!['settings','profiles'].includes(view)||view==='generate'&&!!profileReadiness();
 if(action==='welcome-go')return view==='generate'&&!!profileReadiness();
 return !!profileReadiness()&&['generate-family','generate-demo','blank-week','meal','choose-recipe','school-log','school-calendar','school-import','school-generate','school-generate-preview','school-complete-week','school-complete','review-menu','print-menu','print-shopping','share-menu-pdf','share-shopping-pdf','uncheck-all','go-today','prev-week','next-week'].includes(action);
}
function profileGateMarkup(){
 const missing=!state.profiles.length;
 return `<div class="modal-scrim" data-action="scrim"><section class="modal profile-gate" role="dialog" aria-modal="true" aria-labelledby="profile-gate-title" aria-describedby="profile-gate-description"><header class="modal-head"><h2 id="profile-gate-title">${missing?'Crea un perfil para empezar':'Completa tu perfil'}</h2><button type="button" class="icon-btn" data-action="close-modal" aria-label="Cerrar aviso">${icon('close')}</button></header><div class="modal-body"><span class="profile-gate-icon" aria-hidden="true">${icon('users')}</span><p id="profile-gate-description">${missing?'Necesitas crear un perfil antes de preparar menús y utilizar sus funciones.':'Completa los datos del perfil para continuar.'}</p></div><footer class="modal-foot"><button type="button" class="btn outline" data-action="close-modal">Ahora no</button><button type="button" class="btn primary" data-action="profile-gate-go">${missing?'Crear perfil':'Completar perfil'}</button></footer></section></div>`;
}
function profileFormSignature(form){return JSON.stringify([...new FormData(form).entries()]);}
function updateProfileSaveHint(form,initial=false){
 if(!form)return;const button=form.querySelector('button[type="submit"]'),hint=form.querySelector('[data-profile-save-hint]');if(!button||!hint)return;
 if(initial)form.dataset.savedSignature=profileFormSignature(form);
 const dirty=form.dataset.profileId==='new'||!form.dataset.profileId||profileFormSignature(form)!==form.dataset.savedSignature;
 hint.hidden=!dirty;hint.textContent=dirty?'Pulsa Guardar perfil para aplicar los cambios.':'';
 button.classList.toggle('profile-save-pending',dirty);
 if(dirty&&!button.classList.contains('profile-save-pulse'))button.classList.add('profile-save-pulse');
 if(!dirty)button.classList.remove('profile-save-pulse');
}
function installProfileAccessUX(){
 const oldForm=renderProfileForm;renderProfileForm=function(p){return oldForm(p).replace('<div id="profile-error"','<p class="profile-save-hint" data-profile-save-hint role="status" hidden></p><div id="profile-error"');};
 const oldModal=renderModal;renderModal=function(){return state.modal?.type==='profile-required'?profileGateMarkup():oldModal();};
 const oldRender=render;let gateWasOpen=false;render=function(){
  const gateOpen=state.modal?.type==='profile-required',draft=(gateOpen||gateWasOpen)?document.getElementById('profile-form'):null;
  oldRender();
  const fresh=document.getElementById('profile-form');
  if(draft&&fresh&&draft.dataset.profileId===fresh.dataset.profileId&&typeof fresh.replaceWith==='function')fresh.replaceWith(draft);
  updateProfileSaveHint(document.getElementById('profile-form'),!draft);
  gateWasOpen=gateOpen;
  // Keep blocked actions focusable so a click or keyboard activation can explain why.
  if(profileReadiness())for(const button of document.querySelectorAll?.('button[disabled][data-action]')||[]){if(profileGateNeeded(button.dataset.action,button.dataset.view)){button.disabled=false;button.setAttribute('aria-disabled','true');}}
 };
 document.addEventListener('click',event=>{
  const el=event.target.closest?.('[data-action]');if(!el)return;const action=el.dataset.action;
  if(action==='profile-gate-go'){
   event.preventDefault();event.stopImmediatePropagation();
   if(!state.profiles.length&&!onboardingPreferences(state.onboarding).hideWeek){if(!beginGuidedSetup('profile'))return;}
   else{editingProfileId=state.profiles.length?state.activeProfile:'new';state.modal=null;state.view='profiles';render();scrollProfileForm();}
   document.querySelector('#profile-form input[name="name"]')?.focus({preventScroll:true});return;
  }
  if(profileGateNeeded(action,el.dataset.view||el.dataset.step)){
   event.preventDefault();event.stopImmediatePropagation();if(state.modal?.type!=='profile-required')openModal('profile-required');
  }
 },true);
 for(const type of ['input','change'])document.addEventListener(type,event=>{const form=event.target.closest?.('#profile-form');if(form)updateProfileSaveHint(form);});
 document.addEventListener('click',event=>{const el=event.target.closest?.('[data-action]');if(['diet-add','diet-allergy-add','diet-remove'].includes(el?.dataset.action))updateProfileSaveHint(el.closest('#profile-form'));});
 document.addEventListener('animationend',event=>{if(event.animationName==='profile-save-attention')event.target.classList.remove('profile-save-pulse');});
}
