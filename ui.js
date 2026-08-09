/* ============ TRO UI ENGINE v2 (icons) ============ */
(function(){
if(window.__UI__)return;window.__UI__=1;
function el(t,c){var d=document.createElement(t);if(c)d.className=c;return d;}

/* ---- injected icon css ---- */
var st=el('style');st.textContent='.icn{display:inline-flex;align-items:center;justify-content:center}.icn svg{width:1.15em;height:1.15em;vertical-align:-.18em;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}';document.head.appendChild(st);

/* ---- icon library ---- */
var ICONS={
home:'<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
dna:'<path d="M8 3c8 6 8 12 0 18"/><path d="M16 3c-8 6-8 12 0 18"/><path d="M9.5 7.5h5"/><path d="M9.5 16.5h5"/>',
plus:'<path d="M12 5v14M5 12h14"/>',
book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M20 17v5H6.5A2.5 2.5 0 0 1 4 19.5"/>',
gear:'<circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5 5l2.1 2.1M16.9 16.9 19 19M19 5l-2.1 2.1M7.1 16.9 5 19"/>',
play:'<path d="M7 4.5 20 12 7 19.5z"/>',
phones:'<path d="M4 14a8 8 0 0 1 16 0"/><rect x="3" y="14" width="4" height="7" rx="2"/><rect x="17" y="14" width="4" height="7" rx="2"/>',
dumbbell:'<path d="M7 7v10M17 7v10M3.5 9.5v5M20.5 9.5v5M7 12h10"/>',
cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/>',
galaxy:'<circle cx="12" cy="12" r="2.5"/><path d="M12 4.5c4.5 0 7.5 2.5 7.5 5.5"/><path d="M12 19.5c-4.5 0-7.5-2.5-7.5-5.5"/><path d="M19.5 14c0 3-2.5 5.5-5.5 5.5"/><path d="M4.5 10c0-3 2.5-5.5 5.5-5.5"/>',
users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c1-3.5 3.5-5.5 6.5-5.5s5.5 2 6.5 5.5"/><circle cx="17.5" cy="9" r="2.8"/><path d="M17.5 14.5c2.3.2 4 2 4.8 5"/>',
cart:'<circle cx="9.5" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/><path d="M3 4h2.5L8 16h10.5L21 8H6"/>',
bolt:'<path d="M13 2 4.5 13.5h6L10 22l8.5-11.5h-6z"/>',
search:'<circle cx="11" cy="11" r="7"/><path d="m20.5 20.5-4-4"/>',
lock:'<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
save:'<path d="M5 3h11l3 3v15H5z"/><path d="M8 3v5h7V3"/><rect x="8" y="14" width="8" height="7"/>',
x:'<path d="M6 6l12 12M18 6 6 18"/>',
chart:'<path d="M4 4v16h16"/><path d="M8 16v-5M12 16V7M16 16v-3"/>',
doc:'<path d="M6 3h12v18H6z"/><path d="M9.5 8h5M9.5 12h5M9.5 16h3"/>',
gift:'<rect x="3" y="8" width="18" height="4"/><path d="M5 12v9h14v-9"/><path d="M12 8v13"/><path d="M12 8c-2 0-4-1-4-2.8C8 3.6 9.3 3 10.2 3 12 3 12 6 12 8z"/><path d="M12 8c2 0 4-1 4-2.8C16 3.6 14.7 3 13.8 3 12 3 12 6 12 8z"/>',
ice:'<path d="M12 2v20M3.5 7l17 10M20.5 7l-17 10"/>',
flame:'<path d="M12 2.5c1 4.5 5.5 6 5.5 10.5a5.5 5.5 0 0 1-11 0C6.5 10 9 8.5 10 5.5c.8 1.5 2 2 2-3z"/>',
star:'<path d="m12 3 2.7 5.7 6.3.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.3-.9z"/>',
target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
trophy:'<path d="M8 4h8v6a4 4 0 0 1-8 0z"/><path d="M8 5H4.5c0 4 1.5 6 3.5 6"/><path d="M16 5h3.5c0 4-1.5 6-3.5 6"/><path d="M12 14v4M8 21h8"/>',
gem:'<path d="M7 3h10l4 6-9 12L3 9z"/><path d="M3 9h18M12 21 8.5 9 11 3M12 21l3.5-12L13 3"/>',
sword:'<path d="M14.5 17.5 3 6V3h3l11.5 11.5"/><path d="M13 19l6-6"/><path d="M16 16l4 4"/><path d="M19 21l2-2"/>',
skull:'<path d="M12 2.5a8 8 0 0 0-8 8c0 2.8 1.4 4.9 3.5 6.4V21h9v-4.1c2.1-1.5 3.5-3.6 3.5-6.4a8 8 0 0 0-8-8z"/><circle cx="9" cy="11" r="1.7"/><circle cx="15" cy="11" r="1.7"/>',
moon:'<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7.5 7.5 0 0 0 10.5 10.5z"/>',
brain:'<path d="M12 4a3.5 3.5 0 0 0-6 2.4A3.5 3.5 0 0 0 4 12a3.5 3.5 0 0 0 2 6.4A3.5 3.5 0 0 0 12 20z"/><path d="M12 4a3.5 3.5 0 0 1 6 2.4A3.5 3.5 0 0 1 20 12a3.5 3.5 0 0 1-2 6.4A3.5 3.5 0 0 1 12 20z"/>',
bell:'<path d="M6 9.5a6 6 0 0 1 12 0c0 5 2 6.5 2 6.5H4s2-1.5 2-6.5"/><path d="M10 19a2 2 0 0 0 4 0"/>',
clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
check:'<path d="m5 12.5 4.5 4.5L19 7"/>',
shield:'<path d="M12 2.5 20 5.5v6c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10v-6z"/>',
bag:'<path d="M5.5 8h13l1 13h-15z"/><path d="M9 10V6a3 3 0 0 1 6 0v4"/>',
drop:'<path d="M12 2.5s6.5 7 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 9.5 12 2.5 12 2.5z"/>',
case:'<rect x="3" y="7.5" width="18" height="13" rx="2"/><path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5"/><path d="M3 12.5h18"/>',
palette:'<path d="M12 3a9 9 0 1 0 .5 18c1.6 0 2.2-1 2.2-2s-.6-2.2 1.1-2.2H18a4 4 0 0 0 4-4C22 7.6 17.6 3 12 3z"/><circle cx="8" cy="10" r="1.1"/><circle cx="12" cy="7" r="1.1"/><circle cx="16" cy="10" r="1.1"/>',
upload:'<path d="M12 20V8M6.5 13.5 12 8l5.5 5.5"/><path d="M4 3.5h16"/>',
download:'<path d="M12 4v12M6.5 10.5 12 16l5.5-5.5"/><path d="M4 20.5h16"/>',
edit:'<path d="M4 20l1.2-4.5L16.7 4a2.2 2.2 0 0 1 3.2 3.2L8.5 18.8z"/>',
warn:'<path d="M12 3 2.5 20h19z"/><path d="M12 9.5V14M12 17v.5"/>',
bookopen:'<path d="M12 6.5C10 4.8 7 4.2 3 4.2v15c4 0 7 .6 9 2.3 2-1.7 5-2.3 9-2.3v-15c-4 0-7 .6-9 2.3z"/><path d="M12 6.5v15"/>',
heart:'<path d="M12 20.5S3.5 15 3.5 9.5C3.5 6.5 6 4.5 8.5 4.5c1.6 0 3 .8 3.5 2 .5-1.2 1.9-2 3.5-2 2.5 0 5 2 5 5 0 5.5-8.5 11-8.5 11z"/>',
crown:'<path d="M3 8.5 7.5 12 12 5.5 16.5 12 21 8.5V18H3z"/>',
key:'<circle cx="8" cy="15" r="4.5"/><path d="M11.5 11.5 20 3M16 7l3 3"/>',
box:'<path d="M12 2.8 21 7.8v8.4l-9 5-9-5V7.8z"/><path d="M3 7.8l9 5 9-5M12 12.8v8.4"/>',
spark:'<path d="M12 4l1.7 4.8L18.5 10.5l-4.8 1.7L12 17l-1.7-4.8L5.5 10.5l4.8-1.7z"/><path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/>',
leaf:'<path d="M4.5 19.5C4.5 10.5 12 4.5 20 4.5c0 8-6 15-15.5 15z"/><path d="M4.5 19.5C8 14 12 10 16 7.5"/>',
speak:'<path d="M4 10v4h3.5L13 18.5v-13L7.5 10z"/><path d="M16.5 9a4.5 4.5 0 0 1 0 6M19 6.5a8 8 0 0 1 0 11"/>',
orb:'<circle cx="12" cy="12" r="8.5"/><path d="M8 12a4 4 0 0 1 8 0"/><path d="M12 3.5V6"/>',
medal:'<circle cx="12" cy="14.5" r="5"/><path d="M9.5 10.5 6 3M14.5 10.5 18 3"/>'
};
window.icon=function(n){return '<span class="icn"><svg viewBox="0 0 24 24">'+(ICONS[n]||'')+'</svg></span>';};

/* ---- emoji -> icon map ---- */
var EMO={'🏠':'home','🧬':'dna','➕':'plus','✚':'plus','📚':'book','⚙':'gear','▶':'play','🎧':'phones','💪':'dumbbell','📅':'cal','🌌':'galaxy','👥':'users','🛍':'cart','⚡':'bolt','🔍':'search','🔒':'lock','💾':'save','✕':'x','📊':'chart','📈':'chart','📜':'doc','🎁':'gift','🧊':'ice','🔥':'flame','🎯':'target','🏆':'trophy','💎':'gem','💰':'gem','🗡':'sword','⚔':'sword','💀':'skull','👹':'skull','🌙':'moon','🧠':'brain','🔔':'bell','⏱':'clock','✅':'check','✔':'check','🛡':'shield','🎒':'bag','💧':'drop','💼':'case','🎨':'palette','📤':'upload','⬆':'upload','📥':'download','⬇':'download','📝':'edit','✏':'edit','':'warn','':'bookopen','❤':'heart','👑':'crown','🔑':'key','📦':'box','✨':'spark','🎉':'spark','🧘':'leaf','🌱':'leaf','🔊':'speak','🔮':'orb','🎖':'medal','🏅':'medal','🥇':'medal'};

/* ---- auto emoji->svg swap ---- */
function build(node){
var t=node.nodeValue.replace(/\uFE0F/g,'');var parent=node.parentNode;var frag=document.createDocumentFragment();var pos=0;
while(pos<t.length){
var best=-1,bk=null;
for(var k in EMO){var i=t.indexOf(k,pos);if(i>-1&&(best===-1||i<best)){best=i;bk=k;}}
if(best===-1){frag.appendChild(document.createTextNode(t.slice(pos)));break;}
if(best>pos)frag.appendChild(document.createTextNode(t.slice(pos,best)));
var s=el('span');s.innerHTML=window.icon(EMO[bk]);frag.appendChild(s.firstChild);
pos=best+bk.length;
}
parent.replaceChild(frag,node);
}
function scan(root){
if(!root)return;
if(root.nodeType===3){for(var k in EMO){if(root.nodeValue.indexOf(k)>-1){build(root);break;}}return;}
var walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:function(n){
var p=n.parentNode;if(p&&(/^(SCRIPT|STYLE)$/.test(p.tagName)))return NodeFilter.FILTER_REJECT;
return NodeFilter.FILTER_ACCEPT;}});
var nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
nodes.forEach(function(n){for(var k in EMO){if(n.nodeValue.indexOf(k)>-1){build(n);break;}}});
}
var busy=false;
var mo=new MutationObserver(function(){if(busy)return;busy=true;setTimeout(function(){scan(document.body);busy=false;},80);});
mo.observe(document.body,{childList:true,subtree:true});
scan(document.body);

/* ---- containers ---- */
var wrap=el('div');wrap.id='toastWrap';document.body.appendChild(wrap);

var ov=el('div');ov.id='sysOv';
ov.innerHTML='<div class="syswin"><div class="syshead"><i></i><span id="sysTitle">NOTIFICATION</span></div><div class="sysbody" id="sysBody"></div><button class="btn fill sysbtn" id="sysBtn">CONFIRM</button></div>';
document.body.appendChild(ov);

var lv=el('div');lv.id='lvlOv';
lv.innerHTML='<div class="lvlring" id="lvlNum">1</div><div class="lvltitle">LEVEL UP</div>';
document.body.appendChild(lv);

/* ---- sfx ---- */
var AC=null;
function sfx(kind){try{
AC=AC||new (window.AudioContext||window.webkitAudioContext)();
if(AC.state==='suspended')AC.resume();
var o=AC.createOscillator(),g=AC.createGain();o.connect(g);g.connect(AC.destination);
var t=AC.currentTime;
if(kind==='ok'){o.frequency.setValueAtTime(660,t);o.frequency.setValueAtTime(880,t+.09);}
else if(kind==='lvl'){o.frequency.setValueAtTime(523,t);o.frequency.setValueAtTime(659,t+.12);o.frequency.setValueAtTime(784,t+.24);o.frequency.setValueAtTime(1046,t+.36);}
else{o.frequency.setValueAtTime(440,t);}
g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.12,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+.5);
o.start(t);o.stop(t+.55);}catch(e){}}

/* ---- toast ---- */
window.toast=function(msg){var t=el('div','toast');t.innerHTML=msg;wrap.appendChild(t);
setTimeout(function(){t.classList.add('out');setTimeout(function(){t.remove();},320);},2200);};

/* ---- system window ---- */
var sysQ=[],sysBusy=false;
function pump(){if(sysBusy||!sysQ.length)return;sysBusy=true;var m=sysQ.shift();
$('sysTitle').textContent=m[0];$('sysBody').innerHTML=m[1];
ov.classList.add('on');sfx('ok');if(navigator.vibrate)navigator.vibrate(20);}
window.sysMsg=function(title,body){sysQ.push([title,body]);pump();};
$('sysBtn').onclick=function(){ov.classList.remove('on');sysBusy=false;setTimeout(pump,220);};
ov.addEventListener('click',function(e){if(e.target===ov)$('sysBtn').click();});

/* ---- جایگزینی alert قدیمی ---- */
window.alert=function(msg){window.sysMsg('NOTIFICATION',String(msg));};

/* ---- تشخیص خودکار Level Up ---- */
var lastLvl=null;
setInterval(function(){if(typeof levelOf!=='function')return;var L=levelOf();
if(lastLvl===null){lastLvl=L;return;}
if(L>lastLvl){lastLvl=L;window.levelFX(L);}else{lastLvl=L;}},1500);

window.levelFX=function(L){$('lvlNum').textContent=L;lv.classList.add('on');sfx('lvl');
if(navigator.vibrate)navigator.vibrate([60,40,60]);
setTimeout(function(){lv.classList.remove('on');},2200);};
lv.addEventListener('click',function(){lv.classList.remove('on');});
console.log('ui engine v2 ok');
})();
