/* FACTORY RESET */
(function(){
if(window.__RS__)return;window.__RS__=1;
var el=G.el,I=G.I;
var armed=false;
window.factoryReset=function(){
if(!armed){armed=true;var b=$('rsBtn');if(b)b.innerHTML='⚠️ SURE? TAP AGAIN';
sysMsg('WARNING',I('warn')+' <b>FACTORY RESET</b> erases EVERYTHING:<br>cards, XP, levels, shadows, bonds, titles, stats...<br>You will restart as the Weakest Hunter.<br><br>Tap the button again within 5s to confirm.');
setTimeout(function(){armed=false;var b2=$('rsBtn');if(b2)b2.innerHTML='♻️ RESET';},5000);return;}
localStorage.clear();location.reload();};
function rbtn(){if($('rsBtn'))return;var r=document.querySelector('#scrHome .row');if(r)r.insertAdjacentHTML('beforebegin','<button id="rsBtn" class="btn big" style="color:#ff453a;border-color:#662b2b" onclick="factoryReset()">♻️ RESET</button>');}
setInterval(rbtn,2000);setTimeout(rbtn,1200);
console.log('rest ok');
})();
