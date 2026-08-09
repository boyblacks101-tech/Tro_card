/* ============ TRO GAME v1: DAILY QUEST + PENALTY ZONE ============ */
(function(){
if(window.__GAME__)return;window.__GAME__=1;
function el(t,c){var d=document.createElement(t);if(c)d.className=c;return d;}
var I=function(n){return window.icon?window.icon(n):'';};

var st=el('style');st.textContent='.dqbox{background:linear-gradient(165deg,var(--card2),var(--card) 60%);border:1px solid var(--glass-brd);border-radius:16px;padding:12px 14px;margin:10px 0}.dqrow{display:flex;align-items:center;gap:10px;padding:7px 0;font-size:13px;color:var(--mut);font-weight:600}.dqrow .cb{width:20px;height:20px;border-radius:6px;border:2px solid var(--bord);display:flex;align-items:center;justify-content:center;flex:none;color:#fff;font-size:12px}.dqrow.ok{color:var(--txt)}.dqrow.ok .cb{background:var(--acc);border-color:var(--acc);box-shadow:0 0 8px var(--acc)}.dqbox.done{border-color:var(--acc);box-shadow:0 0 18px -6px var(--acc)}.dqpen{margin-top:10px;border:1px solid #ff453a;border-radius:12px;padding:10px 12px;background:rgba(255,69,58,.08);box-shadow:0 0 16px -6px #ff453a;color:#ff8a80;font-size:12px;font-weight:700;letter-spacing:1px}.dqpen b{color:#ff453a}';
document.head.appendChild(st);

function ensureDQ(){set.dq=set.dq||{d:'',done:{rev:false,nw:false,habit:false,mood:false},claimed:false,pen:{state:'none'}};
set.dq.done=set.dq.done||{rev:false,nw:false,habit:false,mood:false};set.dq.pen=set.dq.pen||{state:'none'};return set.dq;}

function flags(){var t=today();return{rev:(set.days[t]||0)>=20,nw:(set.quests.new||0)>=5,habit:set.habits.some(function(h){return h.done&&h.done[t];}),mood:!!set.mood[t]};}
function allDone(q){return q.done.rev&&q.done.nw&&q.done.habit&&q.done.mood;}

/* ---- boot: day transition ---- */
(function(){var q=ensureDQ();var t=today();
if(q.d&&q.d!==t){
 if(!allDone(q)){
  if(q.pen.state==='active'){set.xp=Math.max(0,set.xp-50);q.pen.state='executed';sysMsg('PENALTY EXECUTED',I('skull')+' You failed the Penalty Quest.<br><b style="color:#ff453a">-50 XP</b>');}
  else{q.pen.state='active';sysMsg('WARNING',I('warn')+' You have failed the Daily Quest.<br>A <b style="color:#ff453a">PENALTY QUEST</b> has been issued.<br>Review 40 cards today to clear it.');}
 }else{q.pen.state='none';}
 q.d=t;q.done={rev:false,nw:false,habit:false,mood:false};q.claimed=false;save();
}else if(!q.d){q.d=t;save();}
})();

/* ---- ticker ---- */
function tick(){var q=ensureDQ();var t=today();if(q.d!==t)return;
var f=flags();var ch=false;
for(var k in f){if(f[k]&&!q.done[k]){q.done[k]=true;ch=true;}}
if(q.pen.state==='active'&&(set.days[t]||0)>=40){q.pen.state='done';set.xp+=30;sysMsg('PENALTY CLEARED',I('ice')+' Penalty complete. <b>+30 XP</b> returned.');ch=true;}
if(!q.claimed&&allDone(q)){q.claimed=true;set.xp+=50;if(window.ensureStats){window.ensureStats();set.statPoints+=2;}sysMsg('DAILY QUEST COMPLETE',I('spark')+' You have grown stronger.<br><b>+50 XP • +2 STAT POINTS</b>');ch=true;}
if(ch)save();
dqRender();}

/* ---- panel on home ---- */
var host=null;
function dqRender(){var q=ensureDQ();var t=today();if(q.d!==t)return;
if(!host){host=el('div');host.id='dqHost';var qb=$('questBox');if(qb)qb.parentNode.insertBefore(host,qb.nextSibling);}
var rows=[['rev','book','Review 20 cards'],['nw','spark','Learn 5 new cards'],['habit','dumbbell','Complete 1 self-quest'],['mood','heart','Log your mood']];
var h='<div class="stitle">DAILY QUEST</div><div class="dqbox'+(allDone(q)?' done':'')+'">';
rows.forEach(function(r){var ok=q.done[r[0]];h+='<div class="dqrow'+(ok?' ok':'')+'"><span class="cb">'+(ok?'✓':'')+'</span>'+I(r[1])+'<span>'+r[2]+'</span></div>';});
if(q.pen.state==='active')h+='<div class="dqpen">'+I('skull')+' <b>PENALTY:</b> review 40 cards ('+Math.min(40,set.days[t]||0)+'/40)</div>';
if(q.pen.state==='executed')h+='<div class="dqpen">'+I('skull')+' PENALTY EXECUTED: -50 XP</div>';
if(q.pen.state==='done')h+='<div class="dqpen" style="border-color:var(--acc);color:var(--acc);background:none">'+I('check')+' PENALTY CLEARED</div>';
h+='</div>';host.innerHTML=h;}

var _rh=window.refreshHome;
window.refreshHome=function(){_rh();dqRender();};
setInterval(tick,4000);
setTimeout(function(){dqRender();tick();},1500);
console.log('game v1 ok');
})();
