/* DUNGEONS & BOSSES */
(function(){
if(window.__DG__)return;window.__DG__=1;
var el=G.el,I=G.I;
var st=el('style');st.textContent='.hpbar{height:10px;border-radius:5px;background:var(--card2);overflow:hidden;margin:6px 0}.hpbar i{display:block;height:100%}.hpbar.m i{background:linear-gradient(90deg,#ff453a,#ff8a80);box-shadow:0 0 8px #ff453a}.hpbar.p i{background:linear-gradient(90deg,#30d158,#a7f3c0);box-shadow:0 0 8px #30d158}.mname{font-family:Georgia,serif;font-style:italic;font-size:20px;text-align:center}.mhead.boss .mname{color:#ff453a;text-shadow:0 0 14px #ff453a}.dgrank{border:1px solid;border-radius:8px;padding:2px 10px;font-family:Orbitron,sans-serif;font-weight:800;letter-spacing:2px}.dgtop{display:flex;justify-content:space-between;align-items:center;margin:6px 0}.dmgbox{position:relative;height:0;text-align:center}.dmg{position:absolute;left:50%;animation:dmgUp .9s ease-out forwards;font-weight:800;color:#64d2ff;font-size:18px}.dmg.hurt{color:#ff453a}@keyframes dmgUp{from{transform:translate(-50%,0);opacity:1}to{transform:translate(-50%,-46px);opacity:0}}';document.head.appendChild(st);
var RC={E:'#8e8e93',D:'#30d158',C:'#64d2ff',B:'#bf5af2',A:'#ff9f0a',S:'#ff453a'};
var GT={E:{lvl:1,mp:10,mons:3,hp:3,atk:10,xp:2,win:20},D:{lvl:3,mp:15,mons:4,hp:4,atk:14,xp:3,win:30},C:{lvl:6,mp:20,mons:5,hp:5,atk:18,xp:4,win:45},B:{lvl:10,mp:30,mons:6,hp:6,atk:22,xp:5,win:70},A:{lvl:15,mp:40,mons:7,hp:8,atk:26,xp:7,win:100},S:{lvl:20,mp:60,mons:8,hp:10,atk:30,xp:10,win:150}};
var BOSSES=['Igris','Beru','Kasaka','Cerberus','Iron','Rakan','Baruka','Sillad','Tusk','Greed'];
var DG=null;
function mHP(){var s=set.stats||{vit:1};return 100+s.vit*10+levelOf()*5;}
function atk(){var s=set.stats||{str:1};return 1+Math.floor(s.str/5);}
function def(){var s=set.stats||{vit:1};return Math.floor(s.vit/3);}
var dscr=el('div');dscr.id='scrDungeon';dscr.className='screen';document.body.appendChild(dscr);
var gscr=el('div');gscr.id='scrGates';gscr.className='screen';document.body.appendChild(gscr);
window.renderGates=function(){G.mp();set.mats=set.mats||{E:0,D:0,C:0,B:0,A:0,S:0};
var h='<div class="btitle">Gates</div><div class="swpanel"><div class="swbar mp"><span>MP</span><div class="tr"><i style="width:'+Math.round(100*set.mp.cur/set.mp.max)+'%"></i></div><b>'+Math.floor(set.mp.cur)+'/'+set.mp.max+'</b></div><div class="swpts">CORES: '+Object.keys(set.mats).map(function(k){return k+'×'+set.mats[k];}).join(' • ')+'</div></div>';
Object.keys(GT).forEach(function(r){var g=GT[r],lk=levelOf()<g.lvl;
h+='<div class="skcard'+(lk?' sklock':'')+'"><span class="sic" style="color:'+RC[r]+';border-color:'+RC[r]+';font-family:Orbitron,sans-serif;font-weight:800">'+r+'</span><span style="flex:1"><div class="nm">'+r+'-RANK GATE'+(lk?' • LV '+g.lvl:'')+'</div><div class="ds">'+g.mons+' monsters + BOSS • '+g.mp+' MP</div></span><button class="btn" onclick="enterGate(\''+r+'\')">ENTER</button></div>';});
h+='<div class="row"><button class="btn" onclick="goHome()">BACK</button></div>';gscr.innerHTML=h;show('scrGates');};
window.enterGate=function(r){var g=GT[r];if(levelOf()<g.lvl)return sysMsg('LOCKED',I('lock')+' Requires LEVEL '+g.lvl);
G.mp();if(set.mp.cur<g.mp)return sysMsg('NOT ENOUGH MP',I('orb')+' Need '+g.mp+' MP.');
if(cards.length<8)return sysMsg('TOO WEAK',I('warn')+' Need at least <b>8 cards</b>.');
set.mp.cur-=g.mp;var red=['C','B','A','S'].indexOf(r)>-1&&Math.random()<0.12;
var pool=cards.slice().sort(function(){return Math.random()-.5;});var mons=[];for(var i=0;i<g.mons+1;i++)mons.push(pool[i%pool.length]);
DG={rank:r,red:red,mons:mons,bi:-1,boss:false,mhp:0,mmax:1,php:mHP(),over:false,lock:false};
if(red)sysMsg('RED GATE',I('warn')+' <b style="color:#ff453a">WARNING!</b> No escape. Rewards x3.');
save();next();};
function next(){DG.bi++;DG.lock=false;if(DG.bi>=DG.mons.length)return win();
DG.boss=DG.bi===DG.mons.length-1;var g=GT[DG.rank];DG.mhp=g.hp*(DG.boss?2:1);DG.mmax=DG.mhp;DG.round=Date.now();round();}
function opts(c){var cor=c.fa||c.back||c.front;var o=cards.filter(function(x){return x.id!==c.id&&(x.fa||x.back);}).sort(function(){return Math.random()-.5;}).slice(0,3).map(function(x){return x.fa||x.back;});
return{arr:[cor].concat(o).sort(function(){return Math.random()-.5;}),cor:cor};}
function round(){var c=DG.mons[DG.bi],o=opts(c);DG.opts=o.arr;DG.cor=o.cor;
var h='<div class="dgtop"><span class="dgrank" style="color:'+RC[DG.rank]+';border-color:'+RC[DG.rank]+'">'+(DG.red?'RED ':'')+DG.rank+'</span><span class="pos">WAVE '+(DG.bi+1)+'/'+DG.mons.length+'</span></div>';
h+='<div class="mhead'+(DG.boss?' boss':'')+'"><div class="mname">'+(DG.boss?I('skull'):'')+esc(DG.boss?BOSSES[hstr(c.id)%BOSSES.length]+' — '+c.front:c.front)+'</div>'+(DG.boss?'<div class="rar" style="color:#ff453a;text-align:center">BOSS</div>':'')+'<div class="hpbar m"><i style="width:'+Math.round(100*DG.mhp/DG.mmax)+'%"></i></div></div><div id="dmgBox" class="dmgbox"></div>';
h+='<div class="hpbar p"><i style="width:'+Math.round(100*Math.max(0,DG.php)/mHP())+'%"></i></div><div class="pos">HP '+Math.max(0,Math.round(DG.php))+'/'+mHP()+'</div>';
h+='<div class="word" onclick="speak(\''+esc(c.front)+'\')">'+esc(c.front)+'</div><div class="pos">choose the meaning</div><div style="display:block">';
o.arr.forEach(function(t,i){h+='<button class="btn big" onclick="dgPick('+i+')">'+esc(t)+'</button>';});
h+='</div><div class="row">'+(DG.red?'':'<button class="btn" onclick="dgExit()">FLEE</button>')+'</div>';
dscr.innerHTML=h;show('scrDungeon');}
function fdmg(t,hurt){var b=$('dmgBox');if(!b)return;var s=el('span','dmg'+(hurt?' hurt':''));s.textContent=t;b.appendChild(s);setTimeout(function(){s.remove();},900);}
window.dgPick=function(i){if(!DG||DG.over||DG.lock)return;var g=GT[DG.rank],t=today();
if(DG.opts[i]===DG.cor){var fast=(Date.now()-DG.round)<3000,d=atk()+(fast?1:0);DG.mhp-=d;fdmg('-'+d+(fast?'!':''),false);
set.rev++;set.days[t]=(set.days[t]||0)+1;set.quests.rev=(set.quests.rev||0)+1;set.xp+=Math.round(g.xp*G.mult());save();
if(DG.mhp<=0){DG.lock=true;setTimeout(next,400);}else round();
}else{var take=Math.max(5,g.atk-def());DG.php-=take;fdmg('-'+take,true);
if(DG.php<=0){DG.over=true;save();dscr.innerHTML='<div class="stitle" style="text-align:center">GATE FAILED</div><div class="word" style="color:#ff453a">You have been defeated...</div><div class="pos">The System will remember this.</div><div class="row"><button class="btn fill" onclick="renderGates()">RETRY</button><button class="btn" onclick="goHome()">HOME</button></div>';return;}
DG.lock=true;setTimeout(function(){DG.lock=false;round();},350);}};
window.dgExit=function(){DG=null;renderGates();};
function win(){DG.over=true;var g=GT[DG.rank],t=today();set.mats=set.mats||{E:0,D:0,C:0,B:0,A:0,S:0};set.mats[DG.rank]++;
var up={E:'D',D:'C',C:'B',B:'A',A:'S'};if(DG.rank!=='S'&&Math.random()<0.25)set.mats[up[DG.rank]]++;
var daily=set.dgDaily!==t;set.dgDaily=t;var x=Math.round(g.win*G.mult()*(DG.red?3:1)*(daily?2:1));set.xp+=x;
var box=Math.random()<(DG.red?0.5:0.2);if(box)openBox(true);save();
dscr.innerHTML='<div class="stitle" style="text-align:center">GATE CLEARED</div><div class="word" style="color:'+RC[DG.rank]+'">'+(DG.red?'RED ':'')+DG.rank+'-RANK BOSS SLAIN</div><div class="report"><b>LOOT</b><br>'+I('gem')+' +'+x+' XP'+(daily?' (first clear ×2)':'')+(DG.red?' (red ×3)':'')+'<br>'+I('box')+' +1 '+DG.rank+'-CORE'+(box?'<br>'+I('gift')+' Mystery Box!':'')+'</div><div class="row"><button class="btn fill" onclick="renderGates()">CONTINUE</button><button class="btn" onclick="goHome()">HOME</button></div>';
sysMsg('BOSS SLAIN',I('trophy')+' <b>+'+x+' XP</b>'+(box?'<br>Mystery Box!':''));}
function gbtn(){if($('gateBtn'))return;var r=document.querySelector('#scrHome .row');if(r)r.insertAdjacentHTML('beforebegin','<button id="gateBtn" class="btn big" onclick="renderGates()">🌌 GATES</button>');}
setInterval(gbtn,2000);setTimeout(gbtn,1200);
console.log('dungeon ok');
})();
