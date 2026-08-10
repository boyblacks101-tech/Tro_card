/* DAILY TOWER */
(function(){
if(window.__TW__)return;window.__TW__=1;
var el=G.el,I=G.I;
var TW=null;
function T(){set.tower=set.tower||{fl:1};return set.tower;}
var scr=el('div');scr.id='scrTower';scr.className='screen';document.body.appendChild(scr);
function opts(c){var cor=c.fa||c.back||c.front;var o=cards.filter(function(x){return x.id!==c.id&&(x.fa||x.back);}).sort(function(){return Math.random()-.5;}).slice(0,3).map(function(x){return x.fa||x.back;});
return{arr:[cor].concat(o).sort(function(){return Math.random()-.5;}),cor:cor};}
window.renderTower=function(){var t=T();
var h='<div class="btitle">Tower</div><div class="shpow" style="color:#ff9f0a;text-shadow:0 0 14px #ff9f0a">'+I('target')+' FLOOR '+Math.min(t.fl,100)+'/100</div>';
h+='<div class="swpanel"><div class="ds" style="text-align:center">Climb: every floor = 1 question.<br>Boss every 10 floors • 3 lives per run • 10 MP</div></div>';
if(t.fl>=100)h+='<div class="report">'+I('crown')+' TOWER CONQUERED! You are beyond S-Rank now.</div>';
h+='<div class="row"><button class="btn fill" onclick="twStart()">'+I('play')+' CLIMB</button><button class="btn" onclick="goHome()">BACK</button></div>';
scr.innerHTML=h;show('scrTower');};
window.twStart=function(){var t=T();if(t.fl>=100||TW)return;
G.mp();if(set.mp.cur<10)return sysMsg('NOT ENOUGH MP',I('orb')+' Need 10 MP.');
set.mp.cur-=10;save();TW={lives:3};round();};
function round(){var t=T();var c=cards[Math.floor(Math.random()*cards.length)];if(!c)return;
var o=opts(c);TW.opts=o.arr;TW.cor=o.cor;TW.boss=t.fl%10===0;
var h='<div class="dgtop"><span class="dgrank" style="color:#ff9f0a;border-color:#ff9f0a">FLOOR '+t.fl+(TW.boss?' • BOSS':'')+'</span><span class="pos" style="color:#ff375f">'+'♥'.repeat(TW.lives)+'</span></div>';
if(TW.boss)h+='<div class="mhead boss"><div class="mname">'+I('skull')+' GUARDIAN OF THE TOWER</div></div>';
h+='<div class="word" onclick="speak(\''+esc(c.front)+'\')">'+esc(c.front)+'</div><div class="pos">choose the meaning</div><div style="display:block">';
o.arr.forEach(function(x,i){h+='<button class="btn big" onclick="twPick('+i+')">'+esc(x)+'</button>';});
h+='</div>';scr.innerHTML=h;show('scrTower');}
window.twPick=function(i){if(!TW)return;var t=T();
if(TW.opts[i]===TW.cor){var x=Math.round((1+t.fl/10)*(TW.boss?5:1)*G.mult());set.xp+=x;set.rev++;set.days[today()]=(set.days[today()]||0)+1;
t.fl++;var drop='';if(TW.boss){set.mats=set.mats||{E:0,D:0,C:0,B:0,A:0,S:0};var r=['E','D','C','B','A','S'][Math.min(5,Math.floor(t.fl/20))];set.mats[r]++;drop=' +'+r+'-CORE';}
save();
if(t.fl>100){TW=null;set.xp+=500;save();sysMsg('TOWER CONQUERED',I('crown')+' <b>100 FLOORS CLEARED.</b><br>The System bows to you. +500 XP');renderTower();return;}
toast('+'+x+' XP'+drop);round();
}else{TW.lives--;if(TW.lives<=0){var f=t.fl;TW=null;sysMsg('YOU FELL',I('warn')+' Run ended at floor <b>'+f+'</b>.<br>The Tower waits for your return.');renderTower();return;}
toast('-1 ♥');round();}};
function wbtn(){if($('twBtn'))return;var r=document.querySelector('#scrHome .row');if(r)r.insertAdjacentHTML('beforebegin','<button id="twBtn" class="btn big" onclick="renderTower()">🗼 TOWER</button>');}
setInterval(wbtn,2000);setTimeout(wbtn,1200);
console.log('tower ok');
})();
