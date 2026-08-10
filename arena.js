/* ARENA */
(function(){
if(window.__AR__)return;window.__AR__=1;
var el=G.el,I=G.I;
var RA=['BRONZE','SILVER','GOLD','PLATINUM','DIAMOND','CHAMPION'];
var TH=[0,30,80,150,300,600];
var RC={'BRONZE':'#cd7f32','SILVER':'#c0c0c0','GOLD':'#ffd60a','PLATINUM':'#64d2ff','DIAMOND':'#bf5af2','CHAMPION':'#ff453a'};
function A(){set.arena=set.arena||{pts:0,w:0,l:0,d:'',n:0};return set.arena;}
function myRank(){var r=0;TH.forEach(function(t,i){if(A().pts>=t)r=i;});return RA[r];}
var AR=null;
var scr=el('div');scr.id='scrArena';scr.className='screen';document.body.appendChild(scr);
function opts(c){var cor=c.fa||c.back||c.front;var o=cards.filter(function(x){return x.id!==c.id&&(x.fa||x.back);}).sort(function(){return Math.random()-.5;}).slice(0,3).map(function(x){return x.fa||x.back;});
return{arr:[cor].concat(o).sort(function(){return Math.random()-.5;}),cor:cor};}
window.renderArena=function(){var a=A();if(a.d!==today()){a.d=today();a.n=0;save();}
var h='<div class="btitle">Arena</div><div class="shpow" style="color:'+RC[myRank()]+';text-shadow:0 0 14px '+RC[myRank()]+'">'+I('sword')+' '+myRank()+'</div>';
h+='<div class="swpanel"><div class="ds" style="text-align:center">W '+a.w+' • L '+a.l+' • '+a.pts+' pts<br>'+(3-a.n)+' fights left today</div></div>';
if(a.n<3)h+='<div class="row"><button class="btn fill" onclick="arenaStart()">'+I('sword')+' FIND OPPONENT</button></div>';
h+='<div class="row"><button class="btn" onclick="goHome()">BACK</button></div>';
scr.innerHTML=h;show('scrArena');};
window.arenaStart=function(){var a=A();if(a.n>=3)return sysMsg('LIMIT',I('clock')+' 3 fights per day.');
AR={nm:RIVALS[Math.floor(Math.random()*RIVALS.length)],hp:5,my:5,ch:(set.rivals.diff==='brut'?0.7:set.rivals.diff==='chill'?0.4:0.55)};
round();};
function round(){var c=cards[Math.floor(Math.random()*cards.length)];if(!c)return;
var o=opts(c);AR.opts=o.arr;AR.cor=o.cor;
var h='<div class="dgtop"><span class="dgrank" style="color:'+RC[myRank()]+';border-color:'+RC[myRank()]+'">ARENA</span><span class="pos">vs '+AR.nm+'</span></div>';
h+='<div class="hpbar m"><i style="width:'+AR.hp*20+'%"></i></div><div class="pos">'+AR.nm+' '+AR.hp+'/5</div>';
h+='<div class="hpbar p"><i style="width:'+AR.my*20+'%"></i></div><div class="pos">YOU '+AR.my+'/5</div>';
h+='<div class="word" onclick="speak(\''+esc(c.front)+'\')">'+esc(c.front)+'</div><div class="pos">answer to attack!</div><div style="display:block">';
o.arr.forEach(function(x,i){h+='<button class="btn big" onclick="arPick('+i+')">'+esc(x)+'</button>';});
h+='</div>';scr.innerHTML=h;show('scrArena');}
window.arPick=function(i){if(!AR)return;var nm=AR.nm;
if(AR.opts[i]===AR.cor){AR.hp--;toast('You strike!');if(AR.hp>0&&Math.random()<AR.chance)AR.my--;}
else{AR.my--;toast(nm+' strikes!');}
if(AR.hp<=0){var a=A();a.w++;a.n++;var g=10+Math.floor(a.pts/50);a.pts+=g;var x=Math.round(g*2*G.mult());set.xp+=x;set.league.me=(set.league.me||0)+x;AR=null;save();
sysMsg('VICTORY',I('trophy')+' You defeated <b>'+nm+'</b>!<br>+'+g+' pts • +'+x+' XP');renderArena();return;}
if(AR.my<=0){var a2=A();a2.l++;a2.n++;a2.pts=Math.max(0,a2.pts-5);AR=null;save();
sysMsg('DEFEAT',I('skull')+' <b>'+nm+'</b> wins this time.<br>-5 pts. Train harder.');renderArena();return;}
round();};
function abtn(){if($('arBtn'))return;var r=document.querySelector('#scrHome .row');if(r)r.insertAdjacentHTML('beforebegin','<button id="arBtn" class="btn big" onclick="renderArena()">🏟️ ARENA</button>');}
setInterval(abtn,2000);setTimeout(abtn,1200);
console.log('arena ok');
})();
