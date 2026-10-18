'use strict';
(() => {
 const input=document.getElementById('buscar'),clear=document.getElementById('clear'),status=document.getElementById('search-status');
 const articles=[...document.querySelectorAll('.chapter')];
 const normalize=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('es');
 const searchable=articles.map(el=>({el,text:normalize(el.textContent)}));
 function filter(){const words=normalize(input.value).trim().split(/\s+/).filter(Boolean);let count=0;for(const {el,text} of searchable){el.hidden=!words.every(w=>text.includes(w));if(!el.hidden)count++;}status.textContent=words.length?count+' de '+articles.length+' secciones coinciden con tu búsqueda.':articles.length+' secciones. Elige un tema o escribe lo que necesitas.';document.getElementById('no-results').hidden=count!==0;}
 input.addEventListener('input',filter);clear.addEventListener('click',()=>{input.value='';filter();input.focus();});
 function showHash(){let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}const target=document.getElementById(id);if(!target)return;if(target.classList.contains('chapter')){input.value='';filter();target.hidden=false;requestAnimationFrame(()=>{target.scrollIntoView({block:'start'});target.focus({preventScroll:true});});}}
 document.addEventListener('click',event=>{const link=event.target.closest('a[href^="#"]');if(!link)return;const target=document.getElementById(link.getAttribute('href').slice(1));if(!target)return;if(target.classList.contains('chapter')){input.value='';filter();}if(location.hash===link.hash)showHash();});
 window.addEventListener('hashchange',showHash);filter();showHash();
})();
