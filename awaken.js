/* AWAKENING */
(function(){
if(window.__AW__)return;window.__AW__=1;
var el=G.el,I=G.I;
var ST=[{lv:20,nm:'AWAKEN I',ds:'Awakened Body: +10% XP',xp:.10,mp:0},
{lv:40,nm:'AWAKEN II',ds:"Ruler's Aura: +5% XP, +15 MP",xp:.05,mp:15},
{lv:60,nm:'AWAKEN III',ds:"Monarch's Will: +10% XP, +10 MP",xp:.10,mp:10}];
function AW(){set.awaken=set.awaken||0;return set.awaken;}
var _mu=G.mult;G.mult=function(){var b=0;for(var i=0;i<AW();i++)b+=ST[i].xp;return _mu()+b;};
var _mm=G.mpMax;G.mpMax=function(){var b=0;for(var i=0;i<AW();i++)b+=ST[i].mp;return _mm()+b;};
var _bs=window.boySVG;
window.boySVG=function(L){var s=_bs(L);var a=AW();if(!a)return s;var add='';
if(a>=1)add+='<circle cx="100" cy="100" r="88" fill="none" stroke="#64d2ff" stroke-width="1.5" opacity=".55" stroke-dasharray="2 7"/>';
if(a>=2)add+='<path d="M66 62q-8-16 4-26-2 12 8 16z" fill="#bf5af2" opacity=".85"/><path d="M134 62q8-16-4-26 2 12-8 16z" fill="#bf5af2" opacity=".85"/>';
if(a>=3)add+='<circle cx="100" cy="100" r="94" fill="none" stroke="#ffd60a" stroke-width="2" opacity=".7"/><path d="M80 8l5 8 7-10 7 10 5-8v11H80z" fill="#ffd60a"/>';
return s.replace('</svg>',add+'</svg>');};
var ov=el('div');ov.style.cssText='position:fixed;inset:0;z-index:700;display:flex;flex-direction:column;align-items:center;justify-content:center;background:radial-gradient(circle,rgba(0,0,0,.3),#000 90%);opacity:0;pointer-events:none;transition:opacity .4s';
document.body.appendChild(ov);
function ceremony(s){ov.innerHTML='<div style="font-family:Orbitron,sans-serif;font-size:26px;letter-spacing:6px;color:#fff;text-shadow:0 0 30px #64d2ff">'+s.nm+'</div><div style="margin-top:10px;font-size:13px;color:#98a8b8;text-align:center;padding:0 30px">'+s.ds+'</div><div style="margin-top:16px;font-size:11px;letter-spacing:3px;color:#64d2ff">THE SYSTEM RECOGNIZES YOUR GROWTH</div>';
ov.style.opacity=1;ov.style.pointerEvents='auto';if(navigator.vibrate)navigator.vibrate([80,50,80]);
setTimeout(function(){ov.style.opacity=0;ov.style.pointerEvents='none';},3500);}
ov.addEventListener('click',function(){ov.style.opacity=0;ov.style.pointerEvents='none';});
function check(){var a=AW();if(a<3&&levelOf()>=ST[a].lv){set.awaken=a+1;set.statPoints=(set.statPoints||0)+5;set.sp=(set.sp||0)+2;save();ceremony(ST[a]);sysMsg(ST[a].nm,I('spark')+' <b>'+ST[a].ds+'</b><br>+5 STAT POINTS • +2 SP');}}
var scr=el('div');scr.id='scrAwaken';scr.className='screen';document.body.appendChild(scr);
window.renderAwaken=function(){var a=AW();
var h='<div class="btitle">Awakening</div><div class="shpow" style="color:#64d2ff;text-shadow:0 0 14px #64d2ff">'+I('spark')+' STAGE '+a+'/3</div>';
ST.forEach(function(s,i){var un=a>i;
h+='<div class="skcard'+(un?'':' sklock')+'"><span class="sic" style="color:#64d2ff;border-color:#64d2ff">'+I('spark')+'</span><span style="flex:1"><div class="nm">'+s.nm+' (LV '+s.lv+')</div><div class="ds">'+s.ds+'</div></span>'+(un?'<span class="chip on">✔</span>':'<span class="chip">'+I('lock')+'</span>')+'</div>';});
h+=a<3?'<div class="report">Next awakening at <b>LV '+ST[a].lv+'</b>.<br>Current: LV '+levelOf()+'</div>':'<div class="report">'+I('crown')+' Fully awakened. You stand among Monarchs.</div>';
h+='<div class="row"><button class="btn" onclick="tabTo(\'you\')">BACK</button></div>';
scr.innerHTML=h;show('scrAwaken');};
function abtn(){if($('awBtn'))return;var a=$('attrBox');if(a)a.insertAdjacentHTML('beforebegin','<button id="awBtn" class="btn big" onclick="renderAwaken()">'+I('spark')+' AWAKEN</button>');}
setInterval(function(){check();abtn();},4000);setTimeout(function(){check();abtn();},1500);
console.log('awaken ok');
})();
