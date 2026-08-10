/* DAILY WHEEL */
(function(){
if(window.__WH__)return;window.__WH__=1;
var el=G.el,I=G.I;
var PR=[
{nm:'+50 XP',w:30,c:'#30d158',fn:function(){set.xp+=50;}},
{nm:'+100 XP',w:8,c:'#ffd60a',fn:function(){set.xp+=100;}},
{nm:'+1 💗',w:12,c:'#ff375f',fn:function(){set.bond=set.bond||{};set.bond.hc=(set.bond.hc||0)+1;}},
{nm:'Random CORE',w:15,c:'#64d2ff',fn:function(){set.mats=set.mats||{E:0,D:0,C:0,B:0,A:0,S:0};var r=['E','D','C','B','A','S'][Math.floor(Math.random()*6)];set.mats[r]++;}},
{nm:'Full MP',w:15,c:'#0a84ff',fn:function(){G.mp();set.mp.cur=set.mp.max;}},
{nm:'Mystery Box',w:10,c:'#bf5af2',fn:function(){openBox(true);}},
{nm:'Freeze 🧊',w:4,c:'#ff9f0a',fn:function(){set.freezes=(set.freezes||0)+1;}},
{nm:'System smiles',w:6,c:'#8e8e93',fn:function(){}}
];
function pick(){var tot=PR.reduce(function(a,p){return a+p.w;},0);var r=Math.random()*tot;for(var i=0;i<PR.length;i++){r-=PR[i].w;if(r<=0)return i;}return 0;}
var st=el('style');st.textContent='.wheel{width:230px;height:230px;border-radius:50%;margin:16px auto;position:relative;background:conic-gradient('+PR.map(function(p,i){return p.c+' '+(i*45)+'deg '+((i+1)*45)+'deg';}).join(',')+');transition:transform 3s cubic-bezier(.2,.8,.2,1);box-shadow:0 0 30px -8px var(--acc)}.wheel:after{content:"";position:absolute;left:50%;top:-8px;transform:translateX(-50%);border:10px solid transparent;border-top:14px solid var(--txt)}.wheel .lb{position:absolute;left:50%;top:50%;font-size:9px;font-weight:800;color:#000;text-shadow:0 0 4px #fff}';document.head.appendChild(st);
var scr=el('div');scr.id='scrWheel';scr.className='screen';document.body.appendChild(scr);
var spinning=false;
window.spin=function(){if(spinning)return;var t=today();set.wheel=set.wheel||{d:'',n:0};
if(set.wheel.d!==t)set.wheel={d:t,n:0};
if(set.wheel.n>0){if(set.xp<30)return sysMsg('NO XP',I('warn')+' Extra spin costs 30 XP.');set.xp-=30;}
set.wheel.n++;save();spinning=true;
var i=pick();var rot=1800+(360-(i*45+22.5));var w=$('wheelEl');if(w)w.style.transform='rotate('+rot+'deg)';
setTimeout(function(){spinning=false;PR[i].fn();save();sysMsg('WHEEL RESULT',I('spark')+' <b>'+PR[i].nm+'</b>');renderWheel();},3100);};
window.renderWheel=function(){var t=today();set.wheel=set.wheel||{d:'',n:0};if(set.wheel.d!==t)set.wheel={d:t,n:0};
var h='<div class="btitle">Daily Wheel</div><div class="wheel" id="wheelEl">'+PR.map(function(p,i){var a=i*45+22.5;return '<span class="lb" style="transform:translate(-50%,-50%) rotate('+a+'deg) translateY(-88px)">'+p.nm.split(' ')[0]+'</span>';}).join('')+'</div>';
h+='<div class="ds" style="text-align:center">'+(set.wheel.n===0?'FREE spin available! 🎁':'Extra spin: 30 XP')+'</div>';
h+='<div class="row"><button class="btn fill" onclick="spin()">'+I('spark')+' SPIN</button><button class="btn" onclick="goHome()">BACK</button></div>';
scr.innerHTML=h;show('scrWheel');};
function wbtn(){if($('whBtn'))return;var r=document.querySelector('#scrHome .row');if(r)r.insertAdjacentHTML('beforebegin','<button id="whBtn" class="btn big" onclick="renderWheel()">🎡 WHEEL</button>');}
setInterval(wbtn,2000);setTimeout(wbtn,1200);
console.log('wheel ok');
})();
