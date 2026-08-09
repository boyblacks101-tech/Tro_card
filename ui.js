/* ============ TRO UI ENGINE v3 ============ */
(function(){
if(window.__UI__)return;window.__UI__=1;
function el(t,c){var d=document.createElement(t);if(c)d.className=c;return d;}

var st=el('style');st.textContent='.icn{display:inline-flex;align-items:center;justify-content:center}.icn svg{width:1.15em;height:1.15em;vertical-align:-.18em;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}#yBoy svg{animation:swFloat 3.2s ease-in-out infinite}@keyframes swFloat{50%{transform:translateY(-6px)}}.swpanel{margin:10px 0;padding:14px;border-radius:16px;background:linear-gradient(165deg,var(--card2),var(--card) 60%);border:1px solid var(--glass-brd)}.swbar{display:flex;align-items:center;gap:8px;margin:7px 0;font-size:11px;letter-spacing:1px;color:var(--dim);font-weight:700}.swbar .tr{flex:1;height:8px;border-radius:4px;background:var(--card2);overflow:hidden}.swbar .tr i{display:block;height:100%}.swbar.hp i{background:linear-gradient(90deg,#ff453a,#ff8a80);box-shadow:0 0 8px #ff453a}.swbar.mp i{background:linear-gradient(90deg,#0a84ff,#64d2ff);box-shadow:0 0 8px #0a84ff}.swbar.sta i{background:linear-gradient(90deg,#ffd60a,#ffe97a);box-shadow:0 0 8px #ffd60a}.swbar b{width:46px;text-align:right;color:var(--txt)}.swstats{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-top:10px}.swstat{background:var(--card2);border:1px solid var(--glass-brd);border-radius:10px;padding:6px 10px;font-size:12px;font-weight:700;letter-spacing:1px}.swstat button{background:var(--acc);border:none;color:#fff;border-radius:6px;width:18px;height:18px;font-weight:800;margin-left:6px}.swpts{text-align:center;margin-top:8px;font-size:11px;letter-spacing:2px;color:var(--acc);font-weight:800}';document.head.appendChild(st);

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

/* ---- emoji map (unicode escapes = ضد خرابی) ---- */
var EMO={'\uD83C\uDFE0':'home','\uD83E\uDDEC':'dna','\u2795':'plus','\u271A':'plus','\uD83D\uDCDA':'book','\u2699':'gear','\u25B6':'play','\uD83C\uDFA7':'phones','\uD83D\uDCAA':'dumbbell','\uD83D\uDCC5':'cal','\uD83C\uDF0C':'galaxy','\uD83D\uDC65':'users','\uD83D\uDECD':'cart','\u26A1':'bolt','\uD83D\uDD0D':'search','\uD83D\uDD12':'lock','\uD83D\uDCBE':'save','\u2715':'x','\uD83D\uDCCA':'chart','\uD83D\uDCC8':'chart','\uD83D\uDCDC':'doc','\uD83C\uDF81':'gift','\uD83E\uDDCA':'ice','\uD83D\uDD25':'flame','\uD83C\uDFAF':'target','\uD83C\uDFC6':'trophy','\uD83D\uDC8E':'gem','\uD83D\uDCB0':'gem','\uD83D\uDDE1':'sword','\u2694':'sword','\uD83D\uDC80':'skull','\uD83D\uDC79':'skull','\uD83C\uDF19':'moon','\uD83E\uDDE0':'brain','\uD83D\uDD14':'bell','\u23F1':'clock','\u2705':'check','\u2714':'check','\uD83D\uDEE1':'shield','\uD83C\uDF92':'bag','\uD83D\uDCA7':'drop','\uD83D\uDCBC':'case','\uD83C\uDFA8':'palette','\uD83D\uDCE4':'upload','\u2B06':'upload','\uD83D\uDCE5':'download','\u2B07':'download','\uD83D\uDCDD':'edit','\u270F':'edit','\u26A0':'warn','\uD83D\uDCD6':'bookopen','\u2764':'heart','\uD83D\uDC51':'crown','\uD83D\uDD11':'key','\uD83D\uDCE6':'box','\u2728':'spark','\uD83C\uDF89':'spark','\uD83E\uDDDC':'leaf','\uD83C\uDF31':'leaf','\uD83D\uDD0A':'speak','\uD83D\uDD2E':'orb','\uD83C\uDF96':'medal','\uD83C\uDFC5':'medal','\uD83E\uDD47':'medal'};

function build(node){
var t=node.nodeValue.replace(/\uFE0F/g,'');var parent=node.parentNode;var frag=document.createDocumentFragment();var pos=0;
while(pos<t.length){
var best=-1,bk=null;
for(var k in EMO){if(!k.length)continue;var i=t.indexOf(k,pos);if(i>-1&&(best===-1||i<best)){best=i;bk=k;}}
if(best===-1||!bk){frag.appendChild(document.createTextNode(t.slice(pos)));break;}
if(best>pos)frag.appendChild(document.createTextNode(t.slice(pos,best)));
var s=el('span');s.innerHTML=window.icon(EMO[bk]);frag.appendChild(s.firstChild);
pos=best+bk.length;
}
parent.replaceChild(frag,node);
}
function scan(root){
if(!root)return;
if(root.nodeType===3){for(var k in EMO){if(k.length&&root.nodeValue.indexOf(k)>-1){build(root);break;}}return;}
var walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:function(n){
var p=n.parentNode;if(p&&(/^(SCRIPT|STYLE)$/.test(p.tagName)))return NodeFilter.FILTER_REJECT;
return NodeFilter.FILTER_ACCEPT;}});
var nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
nodes.forEach(function(n){for(var k in EMO){if(k.length&&n.nodeValue.indexOf(k)>-1){build(n);break;}}});
}
var busy=false;
var mo=new MutationObserver(function(){if(busy)return;busy=true;setTimeout(function(){scan(document.body);busy=false;},80);});
mo.observe(document.body,{childList:true,subtree:true});
scan(document.body);

/* ---- SHADOW HUNTER avatar (جایگزین آدمک) ---- */
function hunterSVG(L){
var m=Math.min(1,Math.max(0,(L-1)/29));
var acc=(getComputedStyle(document.documentElement).getPropertyValue('--acc')||'#0a84ff').trim();
var cloak='#0c111d',cloak2='#101a2e',voidc='#04060b';
var aura='<circle cx="100" cy="100" r="'+Math.round(58+22*m)+'" fill="'+acc+'" opacity="'+(0.05+0.13*m).toFixed(2)+'"/><circle cx="100" cy="100" r="'+Math.round(66+22*m)+'" fill="none" stroke="'+acc+'" stroke-width="1" stroke-dasharray="3 7" opacity="'+(0.15+0.35*m).toFixed(2)+'"/>';
var parts='<circle cx="62" cy="70" r="1.6" fill="'+acc+'" opacity=".5"/><circle cx="140" cy="60" r="1.2" fill="'+acc+'" opacity=".4"/><circle cx="52" cy="120" r="1.2" fill="'+acc+'" opacity=".35"/><circle cx="150" cy="118" r="1.6" fill="'+acc+'" opacity=".45"/>';
var crown=m>=0.8?'<path d="M82 10l5 7 6.5-9 6.5 9 5-7v9h-23z" fill="'+acc+'" opacity=".9"/>':'';
var runes=m>=0.5?'<path d="M78 100l4 6-4 6" stroke="'+acc+'" stroke-width="1.2" fill="none" opacity=".6"/><path d="M122 100l-4 6 4 6" stroke="'+acc+'" stroke-width="1.2" fill="none" opacity=".6"/>':'';
var eyes='<circle cx="94" cy="47" r="'+(3.4+1.4*m)+'" fill="'+acc+'" opacity=".25"/><circle cx="106" cy="47" r="'+(3.4+1.4*m)+'" fill="'+acc+'" opacity=".25"/><circle cx="94" cy="47" r="'+(1.8+0.8*m)+'" fill="'+acc+'"/><circle cx="106" cy="47" r="'+(1.8+0.8*m)+'" fill="'+acc+'"/>';
return '<svg viewBox="0 0 200 190" width="170" height="161">'+aura+parts+crown
+'<path d="M100 58C78 62 70 78 66 96l-6 54c14 10 28 14 40 14s26-4 40-14l-6-54c-4-18-12-34-34-38z" fill="'+cloak+'" stroke="'+acc+'" stroke-opacity=".35"/>'
+'<path d="M74 66 60 74l6 14 14-8z" fill="'+cloak2+'" stroke="'+acc+'" stroke-opacity=".4"/>'
+'<path d="M126 66l14 8-6 14-14-8z" fill="'+cloak2+'" stroke="'+acc+'" stroke-opacity=".4"/>'
+'<path d="M100 20c-16 0-26 12-26 26 0 10 5 16 10 20h32c5-4 10-10 10-20 0-14-10-26-26-26z" fill="'+cloak+'" stroke="'+acc+'" stroke-opacity=".35"/>'
+'<ellipse cx="100" cy="47" rx="15" ry="12" fill="'+voidc+'"/>'+eyes
+'<path d="M100 84l6 8-6 8-6-8z" fill="none" stroke="'+acc+'" stroke-width="1.5" opacity=".8"/>'
+'<rect x="84" y="120" width="32" height="5" rx="2.5" fill="'+acc+'" opacity=".7"/>'
+runes
+'<path d="M141 106l12-5 2 5-12 5z" fill="#cfd8ea" opacity=".8"/><path d="M139 108l-5 2" stroke="#cfd8ea" stroke-width="2" opacity=".8"/>'
+'</svg>';
}
window.boySVG=hunterSVG;

/* ---- Status Window: HP/MP/STA + Stat Points ---- */
function ensureStats(){set.stats=set.stats||{str:1,agi:1,int:1,per:1,vit:1};set.statPoints=set.statPoints||0;}
window.assignStat=function(k){ensureStats();if(!(set.statPoints>0))return;set.stats[k]++;set.statPoints--;save();renderYou();};
var swx=null;
function enhanceYou(){
ensureStats();
if(!swx){swx=el('div');swx.id='swExtra';var yc=document.querySelector('.youcard');if(yc)yc.parentNode.insertBefore(swx,yc.nextSibling);}
var L=levelOf(),s=set.stats;
var hp=100+s.vit*10+L*5,mp=50+s.int*5+L*3,sta=80+s.agi*6+s.str*4;
var h='<div class="swpanel">';
h+='<div class="swbar hp"><span>HP</span><div class="tr"><i style="width:100%"></i></div><b>'+hp+'</b></div>';
h+='<div class="swbar mp"><span>MP</span><div class="tr"><i style="width:100%"></i></div><b>'+mp+'</b></div>';
h+='<div class="swbar sta"><span>STA</span><div class="tr"><i style="width:100%"></i></div><b>'+sta+'</b></div>';
h+='<div class="swstats">';
[['str','STR'],['agi','AGI'],['int','INT'],['per','PER'],['vit','VIT']].forEach(function(a){
h+='<span class="swstat">'+a[1]+' '+s[a[0]]+(set.statPoints>0?'<button onclick="assignStat(\''+a[0]+'\')">+</button>':'')+'</span>';});
h+='</div>';
if(set.statPoints>0)h+='<div class="swpts">+'+set.statPoints+' STAT POINTS AVAILABLE</div>';
h+='</div>';
swx.innerHTML=h;
}
var _ry=window.renderYou;
window.renderYou=function(){_ry();enhanceYou();};

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
window.alert=function(msg){window.sysMsg('NOTIFICATION',String(msg));};

/* ---- Level Up watcher (+3 stat points) ---- */
var lastLvl=null;
setInterval(function(){if(typeof levelOf!=='function')return;var L=levelOf();
if(lastLvl===null){lastLvl=L;return;}
if(L>lastLvl){lastLvl=L;ensureStats();set.statPoints+=3;save();window.levelFX(L);window.toast('+3 STAT POINTS');}
else{lastLvl=L;}},1500);

window.levelFX=function(L){$('lvlNum').textContent=L;lv.classList.add('on');sfx('lvl');
if(navigator.vibrate)navigator.vibrate([60,40,60]);
setTimeout(function(){lv.classList.remove('on');},2200);};
lv.addEventListener('click',function(){lv.classList.remove('on');});
console.log('ui engine v3 ok');
})();
