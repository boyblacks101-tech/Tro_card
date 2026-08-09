/* CRAFTING FORGE */
(function(){
if(window.__CR__)return;window.__CR__=1;
var el=G.el,I=G.I;
var REC=[
{id:'pot',nm:'Focus Potion',ds:'XP x1.5 for 30 min (stored)',cost:{E:2},ic:'drop'},
{id:'mana',nm:'Mana Crystal',ds:'Fully restore MP now',cost:{C:1},ic:'orb'},
{id:'shield',nm:'Streak Shield',ds:'+1 Streak Freeze',cost:{B:2},ic:'shield'},
{id:'orb',nm:'Re-evaluation Orb',ds:'Reset stats, refund all points',cost:{A:2,S:1},ic:'spark'},
{id:'blade',nm:'Shadow Blade',ds:'Permanent +5% XP',cost:{S:2},ic:'sword'}
];
function can(c){for(var k in c)if((set.mats[k]||0)<c[k])return false;return true;}
function pay(c){for(var k in c)set.mats[k]-=c[k];}
function ctxt(c){return Object.keys(c).map(function(k){return k+'×'+c[k];}).join(' + ');}
var _mu=G.mult;G.mult=function(){return _mu()+((set.potUntil||0)>Date.now()?0.5:0)+(set.blade?0.05:0);};
window.usePot=function(){set.inv=set.inv||{pot:0};if(!set.inv.pot)return sysMsg('EMPTY',I('warn')+' No potions.');
set.inv.pot--;set.potUntil=Date.now()+1800000;save();sysMsg('FOCUS POTION',I('drop')+' <b>XP x1.5</b> for 30 min.');renderCraft();};
window.craft=function(id){set.mats=set.mats||{E:0,D:0,C:0,B:0,A:0,S:0};var r=REC.find(function(x){return x.id===id;});if(!r)return;
if(r.id==='blade'&&set.blade)return sysMsg('OWNED',I('sword')+' Already equipped.');
if(!can(r.cost))return sysMsg('MATERIALS?',I('warn')+' Need <b>'+ctxt(r.cost)+'</b>. Go clear some Gates!');
pay(r.cost);set.inv=set.inv||{pot:0};
if(id==='pot')set.inv.pot++;
if(id==='mana'){G.mp();set.mp.cur=set.mp.max;}
if(id==='shield')set.freezes=(set.freezes||0)+1;
if(id==='orb'){var s=set.stats||{},tot=0;['str','agi','int','per','vit'].forEach(function(k){tot+=((s[k]||1)-1);s[k]=1;});set.statPoints=(set.statPoints||0)+tot;}
if(id==='blade')set.blade=1;
save();sysMsg('CRAFTED',I(r.ic)+' <b>'+r.nm+'</b><br>'+r.ds);renderCraft();};
var scr=el('div');scr.id='scrCraft';scr.className='screen';document.body.appendChild(scr);
window.renderCraft=function(){set.mats=set.mats||{E:0,D:0,C:0,B:0,A:0,S:0};set.inv=set.inv||{pot:0};
var h='<div class="btitle">Forge</div><div class="swpanel"><div class="swpts">CORES: '+Object.keys(set.mats).map(function(k){return k+'×'+set.mats[k];}).join(' • ')+'</div><div class="ds" style="text-align:center;margin-top:6px">Potions: '+set.inv.pot+(set.inv.pot>0?' <button class="btn" onclick="usePot()">USE</button>':'')+(set.blade?'<br>'+I('sword')+' Shadow Blade equipped (+5% XP)':'')+'</div></div>';
REC.forEach(function(r){var ok=can(r.cost),owned=(r.id==='blade'&&set.blade);
h+='<div class="skcard'+(ok||owned?'':' sklock')+'"><span class="sic" style="color:#ffd60a;border-color:#ffd60a">'+I(r.ic)+'</span><span style="flex:1"><div class="nm">'+r.nm+'</div><div class="ds">'+r.ds+'</div><div class="rar" style="color:#ffd60a">'+ctxt(r.cost)+'</div></span>'+(owned?'<span class="chip on">✔</span>':'<button class="btn" onclick="craft(\''+r.id+'\')">CRAFT</button>')+'</div>';});
h+='<div class="row"><button class="btn" onclick="goHome()">BACK</button></div>';
scr.innerHTML=h;show('scrCraft');};
function cbtn(){if($('craftBtn'))return;var r=document.querySelector('#scrHome .row');if(r)r.insertAdjacentHTML('beforebegin','<button id="craftBtn" class="btn big" onclick="renderCraft()">⚒️ FORGE</button>');}
setInterval(cbtn,2000);setTimeout(cbtn,1200);
console.log('craft ok');
})();
