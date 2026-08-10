/* BOND SYSTEM v2 */
(function(){
if(window.__BOND__)return;window.__BOND__=1;
var el=G.el,I=G.I;
var st=el('style');st.textContent='.bdcard{border-radius:16px;padding:12px 14px;margin:10px 0;background:linear-gradient(165deg,var(--card2),var(--card) 60%);border:1px solid var(--glass-brd);display:flex;gap:12px;align-items:center}.bdcard .sic{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;flex:none;border:1px solid}.bdcard .nm{font-weight:800;font-size:14px}.bdcard .ds{font-size:11px;color:var(--mut)}.hcline{text-align:center;font-size:12px;letter-spacing:2px;color:#ff375f;font-weight:800;margin-top:8px}#crOv{position:fixed;inset:0;z-index:640;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.78);backdrop-filter:blur(10px);opacity:0;pointer-events:none;transition:opacity .3s}#crOv.on{opacity:1;pointer-events:auto}.crheart{position:absolute;animation:hUp 1.8s ease-out forwards;font-size:22px}@keyframes hUp{from{transform:translateY(0);opacity:1}to{transform:translateY(-140px);opacity:0}}.crname{font-family:Orbitron,sans-serif;letter-spacing:3px;color:#ff375f;text-shadow:0 0 16px #ff375f;margin-top:12px;text-align:center}';document.head.appendChild(st);
function CN(){return (set.ncr||'').trim()||'Your Crush';}
var RC={E:'#8e8e93',D:'#30d158',C:'#64d2ff',B:'#bf5af2',A:'#ff9f0a',S:'#ff453a'};
var UN={E:0,D:1,C:3,B:6,A:10,S:15};
var DEF=[
{id:'e1',r:'E',p:1,nm:'Happy text from {n}',ty:'text'},
{id:'e2',r:'E',p:1,nm:'Compliment from {n}',ty:'talk'},
{id:'d1',r:'D',p:2,nm:'Short call with {n}',ty:'talk'},
{id:'d2',r:'D',p:2,nm:'Walk with {n}',ty:'date'},
{id:'c1',r:'C',p:3,nm:'Hug from {n}',ty:'hug'},
{id:'c2',r:'C',p:3,nm:'Hold hands with {n}',ty:'hold'},
{id:'b1',r:'B',p:5,nm:'Coffee date with {n}',ty:'date'},
{id:'b2',r:'B',p:5,nm:'Gift for {n}',ty:'gift'},
{id:'a1',r:'A',p:8,nm:'Kiss from {n}',ty:'kiss'},
{id:'a2',r:'A',p:8,nm:'Full-day date with {n}',ty:'date'},
{id:'s1',r:'S',p:12,nm:'Confession to {n}',ty:'confess'}];
function B(){set.bond=set.bond||{hc:0,buys:0,cd:{},custom:[],bank:{},got:{dq:'',dg:'',stk:0}};set.bond.bank=set.bond.bank||{};return set.bond;}
function face(sz){var n=CN(),hc=0;for(var i=0;i<n.length;i++)hc=(hc*31+n.charCodeAt(i))|0;var hair=['#2b2b2b','#5b3b1e','#8a63c9','#b3541e','#1f4d8a'][Math.abs(hc)%5];
return '<svg viewBox="0 0 100 100" width="'+sz+'" height="'+sz+'"><circle cx="50" cy="50" r="30" fill="#f6d7b8"/><path d="M20 50a30 30 0 0 1 60 0c0-8-6-26-30-26s-30 18-30 26z" fill="'+hair+'"/><circle cx="40" cy="52" r="3" fill="#222"/><circle cx="60" cy="52" r="3" fill="#222"/><path d="M44 62q6 5 12 0" stroke="#c46a6a" stroke-width="2" fill="none"/><circle cx="34" cy="60" r="4" fill="#ff9aa2" opacity=".6"/><circle cx="66" cy="60" r="4" fill="#ff9aa2" opacity=".6"/></svg>';}
function hearts(k){var h='';for(var i=0;i<k;i++)h+='<span class="crheart" style="left:'+(20+Math.random()*60)+'%;top:'+(40+Math.random()*30)+'%;animation-delay:'+(Math.random()*0.8)+'s">💗</span>';return h;}
function line(){var L=['I believe in you!','You did amazing today','Rest now, my hero','One more step, together','I am proud of you'];return L[Math.floor(Math.random()*L.length)];}
function hugSVG(){return '<svg viewBox="0 0 140 100" width="190"><circle cx="55" cy="28" r="16" fill="#f6d7b8"/><circle cx="86" cy="31" r="15" fill="#e8b98a"/><rect x="40" y="44" width="30" height="42" rx="12" fill="#8a63c9"/><rect x="70" y="46" width="28" height="40" rx="12" fill="#0a84ff"/><path d="M45 55q25 -12 48 6" stroke="#f6d7b8" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M93 58q-25 14 -46 -2" stroke="#e8b98a" stroke-width="7" fill="none" stroke-linecap="round"/></svg>';}
function dateSVG(){return '<svg viewBox="0 0 140 110" width="180"><circle cx="50" cy="30" r="15" fill="#f6d7b8"/><circle cx="92" cy="32" r="14" fill="#e8b98a"/><rect x="37" y="45" width="26" height="45" rx="10" fill="#8a63c9"/><rect x="79" y="46" width="25" height="44" rx="10" fill="#0a84ff"/><path d="M63 62h16" stroke="#f6d7b8" stroke-width="6" stroke-linecap="round"/></svg>';}
var ov=el('div');ov.id='crOv';document.body.appendChild(ov);
function showScene(ty){var inner='';
if(ty==='kiss')inner='<div style="display:flex;align-items:center">'+face(115)+'<div style="margin-left:-20px;transform:rotate(8deg)">'+face(95)+'</div></div>'+hearts(7);
else if(ty==='hug')inner=hugSVG()+hearts(5);
else if(ty==='talk')inner=face(120)+'<div class="crname" style="font-size:12px">"'+line()+'"</div>'+hearts(2);
else if(ty==='date')inner=dateSVG()+hearts(4);
else if(ty==='gift')inner='<div style="display:flex;align-items:center">'+face(110)+'<div style="font-size:44px">🎁</div></div>'+hearts(3);
else if(ty==='hold')inner=dateSVG()+hearts(3);
else if(ty==='confess')inner=face(130)+hearts(12);
else inner=face(110)+hearts(3);
ov.innerHTML='<div style="display:flex;flex-direction:column;align-items:center;position:relative">'+inner+'<div class="crname">'+CN()+'</div></div>';
ov.classList.add('on');if(ty==='kiss'||ty==='talk'||ty==='confess')speak(CN()+'. '+line());
setTimeout(function(){ov.classList.remove('on');},3800);}
ov.addEventListener('click',function(){ov.classList.remove('on');});
window.buyBond=function(id){var b=B();var it=DEF.concat(b.custom).find(function(x){return x.id===id;});if(!it)return;
if(b.buys<UN[it.r])return sysMsg('BOND LOCKED',I('lock')+' Reach <b>Bond LV '+UN[it.r]+'</b> first.');
if(b.hc<it.p)return sysMsg('NOT ENOUGH HC',I('heart')+' Need <b>'+it.p+' 💗</b>.');
b.hc-=it.p;b.buys++;b.bank[it.id]=(b.bank[it.id]||0)+1;save();
sysMsg('SAVED TO BANK',I('heart')+' <b>'+esc(it.nm.replace('{n}',CN()))+'</b> stored.<br>Tap USE anytime to live it.');renderBond();};
window.useBond=function(id){var b=B();if(!(b.bank[id]>0))return;b.bank[id]--;save();var it=DEF.concat(b.custom).find(function(x){return x.id===id;});showScene(it.ty||'text');renderBond();};
window.addBondItem=function(){var b=B();var n=$('biName').value.trim(),r=$('biRank').value,p=parseInt($('biPrice').value)||1;
if(!n)return sysMsg('NAME?',I('warn')+' Item name required.');
b.custom.push({id:'u'+Date.now(),r:r,p:p,nm:n+' with {n}',ty:'talk'});save();$('biName').value='';renderBond();};
window.delBondItem=function(id){var b=B();b.custom=b.custom.filter(function(x){return x.id!==id;});save();renderBond();};
var scr=el('div');scr.id='scrBond';scr.className='screen';document.body.appendChild(scr);
function nextUn(buys){var n=[];Object.keys(UN).forEach(function(r){if(buys<UN[r])n.push(r+':'+UN[r]);});return n[0]||'MAX';}
window.renderBond=function(){var b=B();
var h='<div class="btitle">Bond with '+esc(CN())+'</div><div class="swpanel"><div class="hcline">'+I('heart')+' '+b.hc+' HEART CORES</div><div class="ds" style="text-align:center">BOND LV '+b.buys+' • next: '+nextUn(b.buys)+'</div></div>';
['E','D','C','B','A','S'].forEach(function(r){var items=DEF.concat(b.custom).filter(function(x){return x.r===r;});if(!items.length)return;
var lk=b.buys<UN[r];
h+='<div class="stitle" style="color:'+RC[r]+'">'+r+'-RANK'+(lk?' • LOCKED (LV '+UN[r]+')':'')+'</div>';
items.forEach(function(it){var bk=b.bank[it.id]||0;
h+='<div class="bdcard'+(lk?' sklock':'')+'"><span class="sic" style="border-color:'+RC[r]+';color:'+RC[r]+'">'+it.r+'</span><span style="flex:1"><div class="nm">'+esc(it.nm.replace('{n}',CN()))+'</div><div class="ds">'+it.p+' 💗'+(bk>0?' • banked: '+bk:'')+'</div></span>';
if(it.id.charAt(0)==='u')h+='<button class="btn" onclick="delBondItem(\''+it.id+'\')">✕</button>';
if(bk>0)h+='<button class="btn fill" onclick="useBond(\''+it.id+'\')">USE</button>';
h+='<button class="btn" onclick="buyBond(\''+it.id+'\')">BUY</button></div>';});});
h+='<div class="stitle">CUSTOM ITEM</div><div class="igroup"><div class="irow"><input id="biName" placeholder="Item name..."></div><div class="irow"><select id="biRank">'+Object.keys(UN).map(function(r){return '<option value="'+r+'">'+r+'</option>';}).join('')+'</select><input id="biPrice" type="number" value="2" style="width:70px"></div><div class="irow"><button class="btn" onclick="addBondItem()">✚ ADD</button></div></div>';
h+='<div class="row"><button class="btn" onclick="goHome()">BACK</button></div>';
scr.innerHTML=h;show('scrBond');};
function tick(){var b=B(),ch=false;
if(set.dq&&set.dq.claimed&&b.got.dq!==set.dq.d){b.got.dq=set.dq.d;b.hc+=1;ch=true;toast('+1 💗');}
if(set.dgDaily&&b.got.dg!==set.dgDaily){b.got.dg=set.dgDaily;b.hc+=2;ch=true;toast('+2 💗');}
if(set.streak>0&&set.streak%7===0&&b.got.stk!==set.streak){b.got.stk=set.streak;b.hc+=3;ch=true;toast('+3 💗');}
if(ch)save();}
setInterval(tick,4000);setTimeout(tick,1500);
function bbtn(){if($('bondBtn'))return;var r=document.querySelector('#scrHome .row');if(r)r.insertAdjacentHTML('beforebegin','<button id="bondBtn" class="btn big" onclick="renderBond()">💗 BOND</button>');}
setInterval(bbtn,2000);setTimeout(bbtn,1200);
console.log('crush ok');
})();
