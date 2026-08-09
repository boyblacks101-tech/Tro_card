/* DAILY QUEST + PENALTY ZONE */
(function(){
if(window.__DQ__)return;window.__DQ__=1;
var el=G.el,I=G.I;
var st=el('style');st.textContent='.dqbox{background:linear-gradient(165deg,var(--card2),var(--card) 60%);border:1px solid var(--glass-brd);border-radius:16px;padding:12px 14px;margin:10px 0}.dqrow{display:flex;align-items:center;gap:10px;padding:7px 0;font-size:13px;color:var(--mut);font-weight:600}.dqrow .cb{width:20px;height:20px;border-radius:6px;border:2px solid var(--bord);display:flex;align-items:center;justify-content:center;flex:none;color:#fff;font-size:12px}.dqrow.ok{color:var(--txt)}.dqrow.ok .cb{background:var(--acc);border-color:var(--acc);box-shadow:0 0 8px var(--acc)}.dqbox.done{border-color:var(--acc);box-shadow:0 0 18px -6px var(--acc)}.dqpen{margin-top:10px;border:1px solid #ff453a;border-radius:12px;padding:10px 12px;background:rgba(255,69,58,.08);box-shadow:0 0 16px -6px #ff453a;color:#ff8a80;font-size:12px;font-weight:700;letter-spacing:1px}.dqpen b{color:#ff453a}';document.head.appendChild(st);
function edq(){set.dq=set.dq||{d:'',done:{rev:false,nw:false,habit:false,mood:false},claimed:false,pen:{state:'none'}};set.dq.done=set.dq.done||{rev:false,nw:false,habit:false,mood:false};set.dq.pen=set.dq.pen||{state:'none'};return set.dq;}
function flags(){var t=today();return{rev:(set.days[t]||0)>=20,nw:(set.quests.new||0)>=5,habit:set.habits.some(function(h){return h.done&&h.done[t];}),mood:!!set.mood[t]};}
function need(){return G.has('ironWill')?3:4;}
function all(q){var n=0;for(var k in q.done)if(q.done[k])n++;return n>=need();}
(function(){var q=edq(),t=today();
if(q.d&&q.d!==t){if(!all(q)){if(q.pen.state==='active'){set.xp=Math.max(0,set.xp-50);q.pen.state='executed';sysMsg('PENALTY EXECUTED',I('skull')+' You failed the Penalty Quest.<br><b style="color:#ff453a">-50 XP</b>');}else{q.pen.state='active';sysMsg('WARNING',I('warn')+' You failed the Daily Quest.<br><b style="color:#ff453a">PENALTY QUEST</b> issued: review 40 cards today.');}}else q.pen.state='none';
q.d=t;q.done={rev:false,nw:false,habit:false,mood:false};q.claimed=false;save();}
else if(!q.d){q.d=t;save();}})();
var host=null;
function render(){var q=edq(),t=today();if(q.d!==t)return;
if(!host){host=el('div');host.id='dqHost';var qb=$('questBox');if(qb)qb.parentNode.insertBefore(host,qb.nextSibling);}
var rows=[['rev','book','Review 20 cards'],['nw','spark','Learn 5 new cards'],['habit','dumbbell','Complete 1 self-quest'],['mood','heart','Log your mood']];
var h='<div class="stitle">DAILY QUEST'+(need()<4?' (IRON WILL)':'')+'</div><div class="dqbox'+(all(q)?' done':'')+'">';
rows.forEach(function(r){var ok=q.done[r[0]];h+='<div class="dqrow'+(ok?' ok':'')+'"><span class="cb">'+(ok?'✓':'')+'</span>'+I(r[1])+'<span>'+r[2]+'</span></div>';});
if(q.pen.state==='active')h+='<div class="dqpen">'+I('skull')+' <b>PENALTY:</b> review 40 ('+Math.min(40,set.days[t]||0)+'/40)</div>';
if(q.pen.state==='executed')h+='<div class="dqpen">'+I('skull')+' PENALTY EXECUTED: -50 XP</div>';
if(q.pen.state==='done')h+='<div class="dqpen" style="border-color:var(--acc);color:var(--acc);background:none">'+I('check')+' PENALTY CLEARED</div>';
h+='</div>';host.innerHTML=h;}
function tick(){var q=edq(),t=today();if(q.d!==t){render();return;}
var f=flags(),ch=false;for(var k in f)if(f[k]&&!q.done[k]){q.done[k]=true;ch=true;}
if(q.pen.state==='active'&&(set.days[t]||0)>=40){q.pen.state='done';set.xp+=Math.round(30*G.mult());sysMsg('PENALTY CLEARED',I('ice')+' <b>+30 XP</b> returned.');ch=true;}
if(!q.claimed&&all(q)){q.claimed=true;var x=Math.round(50*G.mult());set.xp+=x;if(window.ensureStats){window.ensureStats();set.statPoints+=2;}sysMsg('DAILY QUEST COMPLETE',I('spark')+' <b>+'+x+' XP • +2 STAT POINTS</b>');ch=true;}
if(ch)save();render();}
var _rh=window.refreshHome;window.refreshHome=function(){_rh();render();};
setInterval(tick,4000);setTimeout(tick,1500);
console.log('dq ok');
})();
