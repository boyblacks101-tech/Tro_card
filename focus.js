/* FOCUS MODE (POMODORO) */
(function(){
if(window.__FC__)return;window.__FC__=1;
var el=G.el,I=G.I;
var F={end:0,total:0,run:false};
var st=el('style');st.textContent='.ftimer{font-family:Orbitron,sans-serif;font-size:46px;text-align:center;letter-spacing:4px;color:var(--acc);text-shadow:0 0 22px var(--acc);margin:12px 0}.ffig{display:flex;justify-content:center;filter:drop-shadow(0 0 14px var(--acc));animation:ffP 2s infinite}@keyframes ffP{50%{filter:drop-shadow(0 0 26px var(--acc))}}';document.head.appendChild(st);
var scr=el('div');scr.id='scrFocus';scr.className='screen';document.body.appendChild(scr);
function fmt(s){var m=Math.floor(s/60),x=Math.floor(s%60);return (m<10?'0':'')+m+':'+(x<10?'0':'')+x;}
function gain(m,full){return Math.max(1,Math.round(m*(full?2:1)*G.mult()));}
window.startFocus=function(min){F.total=min*60;F.end=Date.now()+F.total*1000;F.run=true;render();};
function finish(full){var m=F.total/60;var x=gain(m,full);set.xp+=x;set.attrXp.mind=(set.attrXp.mind||0)+m;save();
if(full)sysMsg('FOCUS COMPLETE',I('target')+' <b>'+m+' min deep work.</b><br>+'+x+' XP • +'+m+' MIND XP<br>Your character trained its mind.');
else sysMsg('DISTRACTED 💥',I('warn')+' Focus broken after '+m+' min.<br>+'+x+' XP (half rate). Stay stronger next time.');}
window.stopFocus=function(){if(!F.run)return;F.run=false;var left=Math.max(0,F.end-Date.now())/1000;var done=Math.round((F.total-left)/60);
if(done<1){render();return;}F.total=done*60;finish(false);render();};
var _sh=window.show;
window.show=function(id){if(F.run&&id!=='scrFocus'){var left=Math.max(0,F.end-Date.now())/1000;var done=Math.round((F.total-left)/60);F.run=false;if(done>=1)finish(false);}
_sh(id);};
setInterval(function(){if(!F.run)return;var left=(F.end-Date.now())/1000;
if(left<=0){F.run=false;finish(true);render();return;}
var t=$('ft');if(t)t.textContent=fmt(left);},1000);
function render(){var left=F.run?Math.max(0,(F.end-Date.now())/1000):0;
var h='<div class="btitle">Focus</div><div class="ffig">'+boySVG(levelOf())+'</div>';
h+='<div class="ftimer" id="ft">'+fmt(left)+'</div>';
h+='<div class="ds" style="text-align:center">'+(F.run?'Your character is in deep focus...<br>leaving this screen = distraction 💥':'Choose your battle length:')+'</div>';
if(!F.run)h+='<div class="row"><button class="btn" onclick="startFocus(15)">15m</button><button class="btn fill" onclick="startFocus(25)">25m</button><button class="btn" onclick="startFocus(45)">45m</button></div>';
else h+='<div class="row"><button class="btn" style="color:#ff453a;border-color:#662b2b" onclick="stopFocus()">GIVE UP</button></div>';
h+='<div class="ds" style="text-align:center;margin-top:10px">2 XP per minute • full rate on completion • +MIND XP</div>';
h+='<div class="row"><button class="btn" onclick="goHome()">BACK</button></div>';
scr.innerHTML=h;show('scrFocus');}
window.renderFocus=render;
function fbtn(){if($('fcBtn'))return;var r=document.querySelector('#scrHome .row');if(r)r.insertAdjacentHTML('beforebegin','<button id="fcBtn" class="btn big" onclick="renderFocus()">⏱ FOCUS</button>');}
setInterval(fbtn,2000);setTimeout(fbtn,1200);
console.log('focus ok');
})();
