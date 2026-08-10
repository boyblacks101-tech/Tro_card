/* MAIN MENU + SHOP UPGRADE */
(function(){
if(window.__MN__)return;window.__MN__=1;
var el=G.el,I=G.I;
var st=el('style');st.textContent='#fab{position:fixed;right:14px;bottom:92px;z-index:30;width:52px;height:52px;border-radius:50%;background:var(--acc);color:#fff;border:none;font-size:20px;box-shadow:0 0 20px -4px var(--acc)}';document.head.appendChild(st);
var CAT=[
['BATTLE ⚔️',[['Gates','renderGates()'],['Tower','renderTower()'],['Arena','renderArena()'],['Focus','renderFocus()'],['Final Boss','renderBoss()']]],
['POWER ⚡',[['Skills','renderSkills()'],['Shadow Army','renderArmy()'],['Class','renderClass()'],['Awaken','renderAwaken()'],['Titles','renderTitles()'],['Demon','goHome()']]],
['LIFE 💗',[['Bond','renderBond()'],['Goals','renderGoals()'],['Journal','renderJournal()'],['Day Cycle','renderDay()'],['Wheel','renderWheel()'],['Quest Editor','nav("scrHabits");renderHabits()']]],
['SYSTEM ⚙️',[['Wallet','renderWallet()'],['Stats','nav("scrStats");renderStats()'],['League','renderLeague()'],['Shop','renderShop()'],['Smart Notify','renderNotif()'],['Settings','openSettings();show("scrSettings")']]]];
var scr=el('div');scr.id='scrMenu';scr.className='screen';document.body.appendChild(scr);
window.renderMenu=function(){var h='<div class="btitle">Menu</div>';
CAT.forEach(function(c){h+='<div class="stitle">'+c[0]+'</div><div class="row" style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
c[1].forEach(function(b){h+='<button class="btn" style="margin:0;width:100%" onclick="show(\'scrHome\');'+b[1]+'">'+b[0]+'</button>';});
h+='</div>';});
h+='<div class="row"><button class="btn" onclick="goHome()">BACK</button></div>';
scr.innerHTML=h;show('scrMenu');};
function fab(){if($('fab'))return;var f=el('button');f.id='fab';f.innerHTML=I('gear');f.onclick=renderMenu;document.body.appendChild(f);}
setInterval(fab,2000);setTimeout(fab,1200);
/* shop with premium themes */
window.buyTheme=function(k,p){p=p||200;if((set.unlocked||[]).indexOf(k)>-1)return;if(set.xp<p)return alert('Not enough XP');set.xp-=p;set.unlocked.push(k);save();renderShop();};
window.renderShop=function(){$('shopXp').textContent=set.xp;
var h=SHOP.map(function(s){return '<div class="shopitem"><span><div class="nm">'+s.name+'</div><div class="pr">'+s.desc+'</div></span><button class="btn" onclick="buy(\''+s.id+'\','+s.price+')">'+s.price+' XP</button></div>';}).join('');
h+=Object.keys(THEMES).filter(function(k){return k!=='ios';}).map(function(k){var un=(set.unlocked||[]).indexOf(k)>-1;var pr=(typeof PREMIUM!=='undefined'&&PREMIUM.indexOf(k)>-1)?1000:200;
return '<div class="shopitem"><span><div class="nm">🎨 '+k+(pr>200?' 👑':'')+'</div><div class="pr">'+(un?'Unlocked':(pr>200?'PREMIUM':'Locked'))+'</div></span>'+(un?'<span class="chip on">✔</span>':'<button class="btn" onclick="buyTheme(\''+k+'\','+pr+')">'+pr+' XP</button>')+'</div>';}).join('');
h+='<div class="shopitem"><span><div class="nm">🧊 Freezes owned</div></span><b>'+(set.freezes||0)+'</b></div>';
$('shopBox').innerHTML=h;show('scrShop');};
console.log('menu ok');
})();
