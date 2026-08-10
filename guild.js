/* GUILD */
(function(){
if(window.__GD__)return;window.__GD__=1;
var el=G.el,I=G.I;
function GD(){return set.guild||null;}
window.createGuild=function(){var n=$('gdName').value.trim();if(!n)return sysMsg('NAME?',I('warn')+' Guild name required.');
var mem=RIVALS.slice().sort(function(){return Math.random()-.5;}).slice(0,4).map(function(p){return{nm:p,xp:0};});
set.guild={name:n,mem:mem,raid:{hp:300,max:300,day:''}};save();
sysMsg('GUILD FOUNDED',I('shield')+' <b>'+esc(n)+'</b> is born. 4 hunters joined you.');renderGuild();};
var scr=el('div');scr.id='scrGuild';scr.className='screen';document.body.appendChild(scr);
window.renderGuild=function(){var g=GD();
var h='<div class="btitle">Guild</div>';
if(!g){h+='<div class="report">'+I('shield')+' Found a guild. Hunt together.<br>If a member slacks, the raid suffers.</div><div class="igroup"><div class="irow"><input id="gdName" placeholder="guild name"></div><div class="irow"><button class="btn fill" onclick="createGuild()">🏰 FOUND GUILD</button></div></div>';}
else{var t=today();
if(g.raid.day!==t){g.raid.day=t;var md=0;g.mem.forEach(function(m){var d=10+Math.floor(Math.random()*20);m.xp+=d;md+=d;});g.raid.hp-=md;save();}
var yourD=set.days[t]||0;var left=Math.max(0,g.raid.hp-yourD);
h+='<div class="cmb"><div class="tt" style="color:#30d158">'+I('shield')+' '+esc(g.name)+'</div>';
h+='<div class="irow">'+I('users')+' Members: <b>'+(g.mem.length+1)+'</b> • your damage today: <b>'+yourD+'</b></div>';
h+='<div class="stitle" style="color:#ff453a">GUILD RAID BOSS</div><div class="hpbar m"><i style="width:'+Math.round(100*left/g.raid.max)+'%"></i></div><div class="ds">'+left+'/'+g.raid.max+' — your reviews deal damage!</div>';
if(left<=0){g.raid={hp:g.raid.max+150,max:g.raid.max+150,day:t};var x=Math.round(80*G.mult());set.xp+=x;set.mats=set.mats||{E:0,D:0,C:0,B:0,A:0,S:0};set.mats.C++;save();sysMsg('RAID BOSS SLAIN',I('trophy')+' The guild triumphs!<br>+'+x+' XP • +1 C-CORE');}
h+=g.mem.map(function(m){return '<div class="irow">'+I('users')+' '+esc(m.nm)+' — <b>'+m.xp+' XP</b></div>';}).join('')+'</div>';}
h+='<div class="row"><button class="btn" onclick="goHome()">BACK</button></div>';
scr.innerHTML=h;show('scrGuild');};
function gbtn(){if($('gdBtn'))return;var r=document.querySelector('#scrHome .row');if(r)r.insertAdjacentHTML('beforebegin','<button id="gdBtn" class="btn big" onclick="renderGuild()">🏰 GUILD</button>');}
setInterval(gbtn,2000);setTimeout(gbtn,1200);
console.log('guild ok');
})();
