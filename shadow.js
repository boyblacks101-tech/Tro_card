/* SHADOW ARMY */
(function(){
if(window.__SH__)return;window.__SH__=1;
var el=G.el,I=G.I;
var st=el('style');st.textContent='.shcard{border-radius:14px;padding:10px 14px;margin:8px 0;background:linear-gradient(165deg,var(--card2),var(--card) 60%);border:1px solid var(--glass-brd);display:flex;justify-content:space-between;align-items:center;font-size:13px}.shcard .rk{font-size:9px;letter-spacing:2px;font-weight:800}.shpow{text-align:center;font-family:Orbitron,sans-serif;color:#bf5af2;letter-spacing:3px;text-shadow:0 0 14px #bf5af2;font-size:18px;margin:8px 0}';document.head.appendChild(st);
var RW={SOLDIER:1,ELITE:2,COMMANDER:4,MARSHAL:8};
var RC2={SOLDIER:'#8e8e93',ELITE:'#64d2ff',COMMANDER:'#bf5af2',MARSHAL:'#ffd60a'};
function SH(){set.shadows=set.shadows||{list:[],hunt:''};return set.shadows;}
function rkOf(iv){return iv>=180?'MARSHAL':iv>=90?'COMMANDER':iv>=45?'ELITE':'SOLDIER';}
function power(){return SH().list.reduce(function(a,s){return a+RW[s.rk];},0);}
var _mm=G.mpMax;G.mpMax=function(){return _mm()+SH().list.length*2;};
var _mu=G.mult;G.mult=function(){return Math.min(1.5,_mu()+Math.min(0.2,SH().list.length*0.01));};
function extract(){var sh=SH(),ch=false;
cards.forEach(function(c){var s=c.srs&&c.srs.q1;if(!s)return;if((s.interval||0)>=21&&!sh.list.some(function(x){return x.id===c.id;})){
sh.list.push({id:c.id,nm:c.front,rk:rkOf(s.interval),d:today()});ch=true;
sysMsg('ARISE',I('skull')+' <b>'+esc(c.front)+'</b> has been extracted as a SHADOW.<br>It now fights for you.');}});
if(ch)save();}
window.trialShadow=function(){var sh=SH();if(sh.list.length)return;var c=cards[Math.floor(Math.random()*cards.length)];if(!c)return sysMsg('NO CARDS',I('warn')+' Add cards first.');
sh.list.push({id:c.id,nm:c.front,rk:'SOLDIER',d:today()});save();sysMsg('TRIAL SHADOW',I('skull')+' The System grants a trial shadow: <b>'+esc(c.front)+'</b>');renderArmy();};
window.hunt=function(){var sh=SH();if(sh.hunt===today())return sysMsg('LIMIT',I('clock')+' The army hunts once per day.');
if(!sh.list.length)return sysMsg('NO SHADOWS',I('moon')+' Extract shadows first.');
sh.hunt=today();var p=power(),x=Math.round(p*2*G.mult());set.xp+=x;set.league.me=(set.league.me||0)+x;
var core=null;if(Math.random()<0.3){var r=['E','D','C','B','A','S'][Math.floor(Math.random()*6)];set.mats=set.mats||{E:0,D:0,C:0,B:0,A:0,S:0};set.mats[r]++;core=r;}
save();sysMsg('HUNT COMPLETE',I('moon')+' The army returns.<br><b>+'+x+' XP</b>'+(core?'<br>+'+I('box')+' 1 '+core+'-CORE':''));renderArmy();};
var scr=el('div');scr.id='scrArmy';scr.className='screen';document.body.appendChild(scr);
window.renderArmy=function(){var sh=SH();
var h='<div class="btitle">Shadow Army</div><div class="shpow">'+I('moon')+' POWER '+power()+'</div>';
h+='<div class="swpanel"><div class="ds" style="text-align:center">'+sh.list.length+' shadows • each: +2 MP & +1% XP</div></div>';
if(!sh.list.length)h+='<div class="report">No shadows yet.<br>Master a word (21+ day interval) to extract it — or summon a trial shadow.</div><div class="row"><button class="btn fill" onclick="trialShadow()">'+I('skull')+' TRIAL SUMMON</button></div>';
['MARSHAL','COMMANDER','ELITE','SOLDIER'].forEach(function(rk){var ls=sh.list.filter(function(s){return s.rk===rk;});if(!ls.length)return;
h+='<div class="stitle" style="color:'+RC2[rk]+'">'+rk+' — '+ls.length+'</div>';
ls.forEach(function(s){h+='<div class="shcard"><span>'+I('skull')+' <i style="font-style:italic">'+esc(s.nm)+'</i></span><span class="rk" style="color:'+RC2[rk]+'">'+s.rk+' +'+RW[s.rk]+'</span></div>';});});
h+='<div class="row"><button class="btn fill" onclick="hunt()">'+I('moon')+' HUNT (1/day)</button><button class="btn" onclick="goHome()">BACK</button></div>';
scr.innerHTML=h;show('scrArmy');};
function abtn(){if($('armyBtn'))return;var r=document.querySelector('#scrHome .row');if(r)r.insertAdjacentHTML('beforebegin','<button id="armyBtn" class="btn big" onclick="renderArmy()">🌑 ARMY</button>');}
setInterval(function(){extract();abtn();},4000);setTimeout(function(){extract();abtn();},1500);
console.log('shadow ok');
})();
