/* HOTFIXES */
(function(){
if(window.__FX__)return;window.__FX__=1;
/* 1) apostrophe-safe esc (fixes study crash on words like don't) */
var _e=window.esc;
window.esc=function(s){return _e(String(s==null?'':s)).replace(/'/g,'&#39;');};
/* 2) restore Awakening layers on top of ULTRA avatar */
var _b=window.boySVG;
window.boySVG=function(L){var s=_b(L);var a=set.awaken||0;if(!a)return s;var add='';
if(a>=1)add+='<circle cx="100" cy="100" r="88" fill="none" stroke="#64d2ff" stroke-width="1.5" opacity=".55" stroke-dasharray="2 7"/>';
if(a>=2)add+='<path d="M66 62q-8-16 4-26-2 12 8 16z" fill="#bf5af2" opacity=".85"/><path d="M134 62q8-16-4-26 2 12-8 16z" fill="#bf5af2" opacity=".85"/>';
if(a>=3)add+='<circle cx="100" cy="100" r="94" fill="none" stroke="#ffd60a" stroke-width="2" opacity=".7"/>';
return s.replace('</svg>',add+'</svg>');};
/* 3) custom themes work in QUICK settings */
var _q=window.qSet;
window.qSet=function(k,v){if(k==='theme'){var ct=(set.customThemes||{})[v];
if(ct){set.theme=v;save();var r=document.documentElement.style;for(var key in ct)r.setProperty('--'+key,ct[key]);openSetQ();return;}}
_q(k,v);};
/* 4) safety: never crash on missing speech */
var _sp=window.speak;
window.speak=function(t){try{_sp(t);}catch(e){}};
console.log('fix ok');
})();
