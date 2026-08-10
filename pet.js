/* COMPANION */
(function(){
if(window.__PT__)return;window.__PT__=1;
var el=G.el,I=G.I;
var P=[
{id:'igris',nm:'Igris',ic:'sword',ds:'The loyal knight',xp:.05,mp:0,lv:5,ab:'Loyalty',ads:'+10 XP daily'},
{id:'beru',nm:'Beru',ic:'skull',ds:'The ant king',xp:0,mp:8,lv:10,ab:'Swarm',ads:'3 free reviews'},
{id:'tusk',nm:'Tusk',ic:'orb',ds:'The wise mage',xp:.02,mp:10,lv:8,ab:'Wisdom',ads:'Full MP restore'}
];
function PT(){set.pet=set.pet||{id:'',xp:0};return set.pet;}
function P_(){return P.find(function(x){return x.id===PT().id;});}
function plv(){return Math.floor(PT().xp/100)+1;}
var _mu=G.mult;G.mult=function(){var p=P_();return _mu()+(p?p.xp+Math.min(.1,plv()*.01):0);};
var _mm=G.mpMax;G.mpMax=function(){var p=P_();return _mm()+(p?p.mp:0);};
window.choosePet=function(id){var t=PT();if(t.id)return;var p=P.find(function(x){return x.id===id;});if(!p)return;
if(levelOf()<p.lv)return sysMsg('LOCKED',I('lock')+' '+p.nm+' trusts you at <b>LV '+p.lv+'</b>.');
t.id=id;save();sysMsg('COMPANION',I(p.ic)+' <b>'+p.nm+'</b> now walks beside you.');renderPet();injectPet();};
window.petAb=function(){var p=P_();if(!p)return;if(set.petAb===today())return sysMsg('LIMIT',I('clock')+' Once per day.');
set.petAb=today();var t=today();
if(p.id==='igris')set.xp+=Math.round(10*G.mult());
if(p.id==='beru'){set.days[t]=(set.days[t]||0)+3;set.quests.rev=(set.quests.rev||0)+3;set.rev+=3;}
if(p.id==='tusk'){G.mp();set.mp.cur=set.mp.max;}
save();sysMsg(p.ab.toUpperCase(),I(p.ic)+' '+p.ads);renderPet();};
var scr=el('div');scr.id='scrPet';scr.className='screen';document.body.appendChild(scr);
window.renderPet=function(){var t=PT();
var h='<div class="btitle">Companion</div>';
if(P_())h+='<div class="swpanel"><div class="hcline" style="color:#30d158">'+I(P_().ic)+' '+P_().nm+' — LV '+plv()+'</div><div class="swbar sta"><span>XP</span><div class="tr"><i style="width:'+(t.xp%100)+'%"></i></div><b>'+t.xp+'</b></div><div class="ds" style="text-align:center">+1% XP per companion level</div></div>';
P.forEach(function(p){var un=t.id===p.id;
h+='<div class="skcard'+(t.id&&!un?' sklock':'')+'"><span class="sic" style="color:#30d158;border-color:#30d158">'+I(p.ic)+'</span><span style="flex:1"><div class="nm">'+p.nm+(un?' ✔':'')+'</div><div class="ds">'+p.ds+' • +'+Math.round(p.xp*100)+'% XP • +'+p.mp+' MP • unlock LV '+p.lv+'<br>'+p.ab+': '+p.ads+'</div></span>';
if(!t.id)h+='<button class="btn" onclick="choosePet(\''+p.id+'\')">BOND</button>';
else if(un)h+='<button class="btn fill" onclick="petAb()">'+(set.petAb===today()?'USED':p.ab.toUpperCase())+'</button>';
h+='</div>';});
h+='<div class="row"><button class="btn" onclick="tabTo(\'you\')">BACK</button></div>';
scr.innerHTML=h;show('scrPet');};
function tick(){var t=PT();if(!t.id)return;var d=set.rev-(set.petLastRev||0);if(d>0){t.xp+=d;save();}set.petLastRev=set.rev;}
function injectPet(){var yc=document.querySelector('.youcard');if(!yc)return;var tg=$('petTag');if(!tg){tg=el('div');tg.id='petTag';tg.style.cssText='font-size:11px;letter-spacing:2px;color:#30d158;font-weight:800;margin-top:4px';yc.appendChild(tg);}
var p=P_();tg.innerHTML=p?I(p.ic)+' '+p.nm+' LV'+plv():'';}
var _ry=window.renderYou;window.renderYou=function(){_ry();injectPet();};
function pbtn(){if($('petBtn'))return;var a=$('attrBox');if(a)a.insertAdjacentHTML('beforebegin','<button id="petBtn" class="btn big" onclick="renderPet()">'+I('heart')+' COMPANION</button>');}
setInterval(function(){tick();pbtn();},4000);setTimeout(function(){tick();pbtn();injectPet();},1500);
console.log('pet ok');
})();
