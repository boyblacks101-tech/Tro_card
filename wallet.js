/* WALLET / INVENTORY */
(function(){
if(window.__WL__)return;window.__WL__=1;
var el=G.el,I=G.I;
var NM={e1:'Happy text',e2:'Compliment',d1:'Short call',d2:'Walk',c1:'Hug',c2:'Hold hands',b1:'Coffee date',b2:'Gift',a1:'Kiss',a2:'Full-day date',s1:'Confession'};
var scr=el('div');scr.id='scrWallet';scr.className='screen';document.body.appendChild(scr);
window.renderWallet=function(){
var b=set.bond||{hc:0,bank:{}};var bank=b.bank||{};
var h='<div class="btitle">Wallet</div>';
h+='<div class="swpanel"><div class="swpts">'+I('trophy')+' LV '+levelOf()+' • '+totalXP()+' XP • RANK '+rankOf()+'</div><div class="ds" style="text-align:center">'+(set.title||'no title equipped')+'</div></div>';
h+='<div class="cmb"><div class="tt">'+I('bag')+' CURRENCIES & POINTS</div>'
+'<div class="irow">'+I('spark')+' Skill Points: <b>'+(set.sp||0)+'</b> • Stat Points: <b>'+(set.statPoints||0)+'</b></div>'
+'<div class="irow">'+I('heart')+' Heart Cores: <b>'+(b.hc||0)+'</b></div>'
+'<div class="irow">'+I('box')+' CORES: '+Object.keys(set.mats||{}).map(function(k){return k+'×'+set.mats[k];}).join(' • ')+'</div>'
+'<div class="irow">'+I('ice')+' Freezes: <b>'+(set.freezes||0)+'</b> • '+I('drop')+' Potions: <b>'+((set.inv&&set.inv.pot)||0)+'</b></div></div>';
var bk=Object.keys(bank).filter(function(k){return bank[k]>0;});
h+='<div class="cmb"><div class="tt" style="color:#ff375f">'+I('heart')+' BOND BANK (with '+( (set.ncr||'').trim()||'your crush' )+')</div>';
h+=bk.length?bk.map(function(k){return '<div class="irow">'+I('heart')+' '+esc(NM[k]||'Custom item')+' ×<b>'+bank[k]+'</b></div>';}).join(''):'<div class="ds">nothing banked yet — buy from BOND shop</div>';
h+='</div>';
h+='<div class="cmb"><div class="tt" style="color:#bf5af2">'+I('moon')+' ASSETS</div>'
+'<div class="irow">'+I('skull')+' Shadows: <b>'+((set.shadows&&set.shadows.list.length)||0)+'</b></div>'
+'<div class="irow">'+I('crown')+' Titles: <b>'+((set.titles&&set.titles.length)||0)+'</b> • '+I('key')+' Class: <b>'+(set.cls||'—')+'</b> • '+I('heart')+' Companion: <b>'+((set.pet&&set.pet.id)||'—')+'</b></div>'
+'<div class="irow">'+I('palette')+' Themes: <b>'+(((set.unlocked&&set.unlocked.length)||0)+1)+'</b> + custom '+Object.keys(set.customThemes||{}).length+'</div>'
+'<div class="irow">'+I('spark')+' Awakening: <b>'+(set.awaken||0)+'/3</b> • '+I('sword')+' Shadow Blade: <b>'+(set.blade?'✔':'—')+'</b></div></div>';
h+='<div class="cmb"><div class="tt" style="color:#30d158">'+I('chart')+' RECORDS</div>'
+'<div class="irow">'+I('flame')+' Best streak: <b>'+(set.best||0)+'</b> • '+I('bolt')+' Best combo: <b>x'+(set.bestCombo||0)+'</b></div>'
+'<div class="irow">'+I('target')+' Tower: <b>F'+Math.max(0,((set.tower&&set.tower.fl)||1)-1)+'</b> • '+I('sword')+' Arena: <b>'+((set.arena&&set.arena.w)||0)+'W / '+((set.arena&&set.arena.l)||0)+'L</b> • '+((set.arena&&set.arena.pts)||0)+' pts</div>'
+'<div class="irow">'+I('doc')+' Story: <b>'+(set.story||0)+'/15</b> • '+I('gift')+' Boxes opened: <b>'+(set.boxes||0)+'</b> • '+I('skull')+' Demons slain: <b>'+((set.demon&&set.demon.kills)||0)+'</b></div></div>';
h+='<div class="row"><button class="btn" onclick="goHome()">BACK</button></div>';
scr.innerHTML=h;show('scrWallet');};
function wbtn(){if($('wlBtn'))return;var r=document.querySelector('#scrHome .row');if(r)r.insertAdjacentHTML('beforebegin','<button id="wlBtn" class="btn big" onclick="renderWallet()">👛 WALLET</button>');}
setInterval(wbtn,2000);setTimeout(wbtn,1200);
console.log('wallet ok');
})();
