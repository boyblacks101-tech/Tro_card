/* FINAL BOSS: YOUR OLD SELF + TIMELINE */
(function(){
if(window.__FB__)return;window.__FB__=1;
var el=G.el,I=G.I;
function SN(){if(!set.snap){set.snap={d:today(),xp:set.xp||0,rev:set.rev||0,best:set.best||0,lv:levelOf()};save();}return set.snap;}
function sinceRev(){var s=SN(),n=0,sd=new Date(s.d).getTime();for(var k in set.days){if(new Date(k).getTime()>=sd)n+=set.days[k];}return n;}
function bossHP(){var s=SN();return 100+Math.min(400,s.rev);}
window.claimSelf=function(){var s=SN();if(sinceRev()<bossHP()||set.snapSlain===s.d)return;
set.snapSlain=s.d;var x=Math.round(300*G.mult());set.xp+=x;
set.snap={d:today(),xp:totalXP(),rev:set.rev||0,best:set.best||0,lv:levelOf()};
save();sysMsg('OLD SELF DEFEATED',I('crown')+' You have beaten who you were.<br>+'+x+' XP<br><br>A new opponent appears: <b>today\'s you</b>.');renderBoss();};
var scr=el('div');scr.id='scrBoss';scr.className='screen';document.body.appendChild(scr);
window.renderBoss=function(){var s=SN();var dmg=Math.min(bossHP(),sinceRev());var dead=dmg>=bossHP();
var h='<div class="btitle">Final Boss</div>';
h+='<div class="cmb" style="text-align:center;border-color:#ff453a;box-shadow:0 0 20px -8px #ff453a"><div class="tt" style="color:#ff453a">'+I('skull')+' THE OLD YOU — '+s.d+'</div><div style="display:flex;justify-content:center;gap:20px;align-items:center;margin:10px 0"><div style="filter:grayscale(1) opacity(.7)">'+boySVG(s.lv)+'</div><div style="font-family:Orbitron,sans-serif;color:#ff453a;font-size:20px">VS</div><div>'+boySVG(levelOf())+'</div></div>';
h+='<div class="hpbar m"><i style="width:'+Math.round(100*(1-dmg/bossHP()))+'%"></i></div><div class="ds">BOSS HP '+Math.max(0,bossHP()-dmg)+'/'+bossHP()+' — every review since '+s.d+' deals damage</div>';
h+=dead?'<button class="btn fill" style="margin-top:10px" onclick="claimSelf()">'+I('sword')+' FINISH HIM</button>':'<div class="ds" style="margin-top:8px">Keep living. Your progress is the sword.</div>';
h+='</div>';
h+='<div class="cmb"><div class="tt" style="color:#64d2ff">'+I('clock')+' TIMELINE — LOOK HOW FAR</div>';
h+='<div class="irow">LEVEL: <b>'+s.lv+'</b> → <b style="color:#30d158">'+levelOf()+'</b></div>';
h+='<div class="irow">TOTAL XP: <b>'+s.xp+'</b> → <b style="color:#30d158">'+totalXP()+'</b></div>';
h+='<div class="irow">REVIEWS: <b>'+s.rev+'</b> → <b style="color:#30d158">'+(set.rev||0)+'</b></div>';
h+='<div class="irow">BEST STREAK: <b>'+s.best+'</b> → <b style="color:#30d158">'+(set.best||0)+'</b></div>';
h+='<div class="irow">SHADOWS: <b>0</b> → <b style="color:#30d158">'+((set.shadows&&set.shadows.list.length)||0)+'</b></div></div>';
h+='<div class="report" style="text-align:center">'+I('target')+' Not against others.<br><b>Beat yesterday\'s you.</b></div>';
h+='<div class="row"><button class="btn" onclick="goHome()">BACK</button></div>';
scr.innerHTML=h;show('scrBoss');};
function bbtn(){if($('fbBtn'))return;var r=document.querySelector('#scrHome .row');if(r)r.insertAdjacentHTML('beforebegin','<button id="fbBtn" class="btn big" onclick="renderBoss()">🐉 SELF</button>');}
setInterval(bbtn,2000);setTimeout(bbtn,1200);
console.log('finalboss ok');
})();
