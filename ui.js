/* ============ TRO UI ENGINE ============ */
(function(){
if(window.__UI__)return;window.__UI__=1;
function el(t,c){var d=document.createElement(t);if(c)d.className=c;return d;}

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
window.toast=function(msg){var t=el('div','toast');t.textContent=msg;wrap.appendChild(t);
setTimeout(function(){t.classList.add('out');setTimeout(function(){t.remove();},320);},2200);};

/* ---- system window ---- */
var sysQ=[],sysBusy=false;
function pump(){if(sysBusy||!sysQ.length)return;sysBusy=true;var m=sysQ.shift();
$('sysTitle').textContent=m[0];$('sysBody').textContent=m[1];
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
console.log('ui engine ok');
})();
