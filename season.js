/* SEASON PASS */
(function(){
if(window.__SN__)return;window.__SN__=1;
var el=G.el,I=G.I;
var TIERS=[{x:100,r:'+1 SP',fn:function(){set.sp=(set.sp||0)+1;}},{x:250,r:'+2 💗',fn:function(){set.bond=set.bond||{};set.bond.hc=(set.bond.hc||0)+2;}},{x:450,r:'C-CORE',fn:function(){set.mats=set.mats||{};set.mats.C=(set.mats.C||0)+1;}},{x:700,r:'+2 SP',fn:function(){set.sp=(set.sp||0)+2;}},{x:1000,r:'FREEZE 🧊',fn:function(){set.freezes=(set.freezes||0)+1;}},{x:1400,r:'ROYAL THEME 👑',fn:function(){set.unlocked=set.unlocked||[];if(set.unlocked.indexOf('royal')<0)set.unlocked.push('royal');}},{x:1900,r:'+3 💗',fn:function(){set.bond=set.bond||{};set.bond.hc=(set.bond.hc||0)+3;}},{x:2500,r:'A-CORE',fn:function(){set.mats=set.mats||{};set.mats.A=(set.mats.A||0)+1;}},{x:3200,r:'+5 SP',fn:function(){set.sp=(set.sp||0)+5;}},{x:4000,r:'SEASON HERO BADGE',fn:function(){set.badges=set.badges||[];if(set.badges.indexOf('season')<0)set.badges.push('season');}}];
function SN(){set.season=set.season||{x0:totalXP(),claimed:0,start:today()};return set.season;}
window.claimTier=function(i){var s=SN();var sx=totalXP()-s.x0;if(i!==s.claimed||sx<TIERS[i].x)return;
TIERS[i].fn();s.claimed=i+1;save();sysMsg('TIER '+(i+1)+' UNLOCKED',I('gift')+' <b>'+TIERS[i].r+'</b>');renderSeason();};
var scr=el('div');scr.id='scrSeason';scr.className='screen';document.body.appendChild(scr);
window.renderSeason=function(){var s=SN();var sx=Math.max(0,totalXP()-s.x0);
var days=Math.max(0,30-Math.floor((Date.now()-new Date(s.start).getTime())/86400000));
var h='<div class="btitle">Season 01</div><div class="shpow" style="color:#bf5af2;text-shadow:0 0 14px #bf5af2">REBIRTH</div>';
h+='<div class="swpanel"><div class="ds" style="text-align:center">'+days+' days left • season XP: <b>'+sx+'</b></div></div>';
TIERS.forEach(function(t,i){var un=i<s.claimed,can=i===s.claimed&&sx>=t.x;
h+='<div class="skcard'+(un||can?'':' sklock')+'"><span class="sic" style="color:#bf5af2;border-color:#bf5af2">'+(i+1)+'</span><span style="flex:1"><div class="nm">'+t.r+'</div><div class="ds">'+t.x+' season XP</div></span>'+(un?'<span class="chip on">✔</span>':(can?'<button class="btn fill" onclick="claimTier('+i+')">CLAIM</button>':'<span class="chip">'+I('lock')+'</span>'))+'</div>';});
h+='<div class="row"><button class="btn" onclick="goHome()">BACK</button></div>';
scr.innerHTML=h;show('scrSeason');};
function sbtn(){if($('snBtn'))return;var r=document.querySelector('#scrHome .row');if(r)r.insertAdjacentHTML('beforebegin','<button id="snBtn" class="btn big" onclick="renderSeason()">🎫 SEASON</button>');}
setInterval(sbtn,2000);setTimeout(sbtn,1200);
console.log('season ok');
})();
