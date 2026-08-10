/* REST SYSTEM */
(function(){
if(window.__RS__)return;window.__RS__=1;
var el=G.el,I=G.I;
function R(){set.rest=set.rest||{last:0,buff:0};return set.rest;}
var _mu=G.mult;G.mult=function(){return _mu()+((R().buff||0)>Date.now()?0.1:0);};
window.doRest=function(){var r=R(),now=Date.now();
if(now-r.last<6*3600000){var h=Math.ceil((6*3600000-(now-r.last))/3600000);return sysMsg('NOT TIRED YET',I('clock')+' You can rest again in <b>'+h+'h</b>.');}
r.last=now;r.buff=now+3600000;G.mp();set.mp.cur=set.mp.max;save();
sysMsg('RESTED',I('moon')+' Even hunters need rest.<br><b>MP restored • +10% XP for 1 hour</b>');};
function rbtn(){if($('restBtn'))return;var r=document.querySelector('#scrHome .row');if(r)r.insertAdjacentHTML('beforebegin','<button id="restBtn" class="btn big" onclick="doRest()">🛌 REST</button>');}
setInterval(function(){rbtn();if($('restBtn'))$('restBtn').style.borderColor=((R().buff||0)>Date.now()?'var(--acc)':'');},2000);
setTimeout(rbtn,1200);
console.log('rest ok');
})();
