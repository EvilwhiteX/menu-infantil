/* Three optional steps. This guide never creates profiles or generates menus. */
function welcomeGuideMarkup(){
 const steps=[
  {number:1,icon:'users',title:'Crea su perfil',text:'En Perfiles → Añadir, indica su nombre, fecha de nacimiento, sexo y actividad. Marca las tomas que hace en el colegio.',action:'profile',button:'Crear perfil'},
  {number:2,icon:'settings',title:'Hazla tuya',text:'En Ajustes, elige colores, tamaño de letra, modo noche y las comidas que quieres mostrar. Puedes cambiarlo cuando quieras.',action:'settings',button:'Personalizar'},
  {number:3,icon:'wand',title:'Prepara la semana',text:'En Generar, pulsa Generar menú. Después puedes cambiar los platos y ajustar sus cantidades.',action:'generate',button:'Ir a Generar'}
 ];
 return `<div class="modal-scrim welcome-scrim" data-action="scrim"><section class="modal welcome-guide" role="dialog" aria-modal="true" aria-labelledby="welcome-title" aria-describedby="welcome-description"><header class="modal-head welcome-head"><div class="welcome-intro"><span class="welcome-mandarin" aria-hidden="true">${mandarinLogo()}</span><div><p class="welcome-kicker">¡Bienvenido a Menú Infantil!</p><h2 id="welcome-title">Tu primera semana en 3 pasos</h2><p id="welcome-description">Empieza por aquí. Es más fácil de lo que parece.</p></div></div><button type="button" class="icon-btn" data-action="close-modal" aria-label="Cerrar primeros pasos">${icon('close')}</button></header><div class="modal-body welcome-body"><ol class="welcome-steps">${steps.map(step=>`<li class="welcome-step"><div class="welcome-step-top"><span class="welcome-number" aria-label="Paso ${step.number}">${step.number}</span><span class="welcome-step-icon" aria-hidden="true">${icon(step.icon)}</span></div><h3>${step.title}</h3><p>${step.text}</p><button type="button" class="btn outline" data-action="welcome-go" data-step="${step.action}">${step.button}${icon('chevronright')}</button></li>`).join('')}</ol><p class="welcome-reminder">Siempre encontrarás esta guía en <strong>Ajustes → Ayuda</strong>.</p></div><footer class="modal-foot welcome-foot"><button type="button" class="btn outline" data-action="close-modal">Ahora no</button><button type="button" class="btn primary welcome-start" data-action="welcome-go" data-step="profile">Empezar: crear perfil ${icon('chevronright')}</button></footer></section></div>`;
}
function welcomeShortcut(){
 const preferences=onboardingPreferences(state.onboarding);if(preferences.hideWeek)return '';
 return `<aside class="welcome-shortcut hero-welcome" aria-label="Primeros pasos"><button type="button" class="btn outline" data-action="welcome-open"><span>Primeros pasos</span></button></aside>`;
}
function rememberWelcome(){
 state.onboarding={...onboardingPreferences(state.onboarding),seen:true,autoOpen:false};
 try{const {modal,...stored}=state;localStorage.setItem(STORAGE_KEY,JSON.stringify(stored));return true;}
 catch{notify('No se pudo recordar tu elección. La guía puede aparecer de nuevo al abrir la app.');return false;}
}
function focusWelcome(){document.querySelector('.welcome-start')?.focus({preventScroll:true});}
function installWelcomeGuide(){
 const oldModal=renderModal;renderModal=function(){return state.modal?.type==='welcome'?welcomeGuideMarkup():oldModal();};

 const oldSettings=renderSettings;renderSettings=function(){return oldSettings().replace('<h2>Tus datos</h2>',`<h2>Ayuda</h2></div><p>¿Quieres saber por dónde empezar?</p><button type="button" class="btn outline" data-action="welcome-open"><span aria-hidden="true">🍊</span>Primeros pasos</button><section class="manual-access" aria-labelledby="manual-title"><h3 id="manual-title">Manual de uso</h3><p>Aprende paso a paso con capturas: uso básico, opciones avanzadas y soluciones a dudas frecuentes.</p><div class="manual-links"><a class="btn outline" href="guia.html?v=0.27.0" target="_blank" rel="noopener">${icon('list')}Abrir guía<span class="sr-only"> (nueva pestaña)</span></a><a class="btn primary" href="manual-menu-infantil.pdf" download="Manual-Menu-Infantil-V0.27.0.pdf">${icon('download')}Descargar manual en PDF</a></div><small>También puedes guardar el PDF para consultarlo sin conexión.</small></section><label class="feature-row" style="margin-top:18px"><span><b>😎 Ya domino la app</b><small>Ocultar «Primeros pasos» de Mi semana. Puedes volver a mostrarlo cuando quieras.</small></span><input type="checkbox" class="switch" data-action="welcome-toggle" aria-label="Ocultar Primeros pasos de Mi semana" ${onboardingPreferences(state.onboarding).hideWeek?'checked':''}/></label><div class="divider"></div><div class="subheading"><h2>Tus datos</h2>`);};
 const oldClose=closeModal;closeModal=function(){if(state.modal?.type!=='welcome')return oldClose();state.modal=null;rememberWelcome();render();document.querySelector('[data-action="welcome-open"]')?.focus({preventScroll:true});};
 document.addEventListener('click',event=>{
  const el=event.target.closest?.('[data-action]');if(!el)return;
  if(el.dataset.action==='welcome-open'){openModal('welcome');focusWelcome();return;}
  if(el.dataset.action==='welcome-hide'){rememberWelcome();render();return;}
  if(el.dataset.action!=='welcome-go'||state.modal?.type!=='welcome')return;
  const step=el.dataset.step;if(!['profile','settings','generate'].includes(step))return;
  beginGuidedSetup(step);return;
 });
 document.addEventListener('change',event=>{
  const el=event.target;if(el.dataset?.action!=='welcome-toggle')return;
  const preferences=onboardingPreferences(state.onboarding),next={...state,onboarding:{...preferences,hideWeek:el.checked}};
  if(commitUserState(next))render();else el.checked=preferences.hideWeek;
 });
 // Keep keyboard navigation inside the guide while it is open.
 document.addEventListener('keydown',event=>{
  if(state.modal?.type!=='welcome'||event.key!=='Tab')return;
  const buttons=[...(document.querySelector('.welcome-guide')?.querySelectorAll('button:not([disabled])')||[])],first=buttons[0],last=buttons.at(-1);if(!first)return;
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
  else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
 });
 const preferences=onboardingPreferences(state.onboarding);
 if(!preferences.seen&&preferences.autoOpen){state.modal={type:'welcome'};setTimeout(focusWelcome,0);}
}
