/* RECOVERY MODE */
(function(){
if(window.__RC__)return;window.__RC__=1;
var el=G.el,I=G.I;
var QS=['Drink a glass of water','Walk 10 minutes','Read 2 pages','Clean your desk'];
function RC(){set.recover=set.recover||{last:'',mode:false,done:[]};set.recover.done=set.recover.done||[];return set.recover;}
var _g=window.gradeIt;
window.gradeIt=function(g){_g(g);RC().last=today();};
(function(){var r=RC(),t=today();
if(r.last&&r.last!==t&&!r.mode){
var gap=Math.round((new Date(t)-new Date(r.last))/86400000);
if(gap>=3){r.mode=true;r.done=[];if(set.dq)set.dq.pen={state:'none'};save();
setTimeout(function(){sysMsg('RECOVERY MODE',I('leaf')+' You were away '+gap+' days.<br>No guilt. No penalty. Just small steps back.');},2500);}
}
r.last=r.last||t;})();
window.rcDone=function(i){var r=RC();if(!r.mode||r.done.indexOf(i)>-1)return;r.done.push(i);set.xp+=10;
if(r.done.length>=QS.length){r.mode=false;set.xp+=30;save();sysMsg('WELCOME BACK',I('spark')+' Fully recovered. <b>+40 XP total</b>. The System missed you.');}
else save();render();};
var host=null;
function render(){var r=RC();if(!r.mode){if(host)host.innerHTML='';return;}
if(!host){host=el('div');host.id='rcHost';var a=$('questBox');if(a)a.parentNode.insertBefore(host,a.nextSibling);}
var h='<div class="cmb" style="border-color:#30d158"><div class="tt" style="color:#30d158">'+I('leaf')+' RECOVERY MODE — small steps</div>';
QS.forEach(function(q,i){var ok=r.done.indexOf(i)>-1;
h+='<div style="display:flex;align-items:center;gap:8px;margin:8px 0;font-size:13px;color:'+(ok?'#30d158':'var(--txt)')+'">'+(ok?I('check'):I('drop'))+'<span>'+q+'</span>'+(ok?'':'<button class="btn" style="margin-left:auto" onclick="rcDone('+i+')">DONE</button>')+'</div>';});
h+='<div class="ds">complete all 4 → back to normal + bonus</div></div>';
host.innerHTML=h;}
var _rh=window.refreshHome;window.refreshHome=function(){_rh();render();};
setTimeout(render,1600);
console.log('recover ok');
})();
