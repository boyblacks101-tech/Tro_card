/* STREAK MULTIPLIER + HABIT COMBOS */
(function(){
if(window.__CB__)return;window.__CB__=1;
var el=G.el,I=G.I;
function streakMult(){return Math.min(0.5,(set.streak||0)*0.02);}
function comboNow(){var t=today();var n=0,st=[];
st.push([!!(set.mood&&set.mood[t]),'MOOD']);
st.push([set.habits.some(function(h){return h.done&&h.done[t];}),'QUEST']);
st.push([(set.days[t]||0)>=10,'STUDY']);
st.push([(set.quests.new||0)>=3,'LEARN']);
st.forEach(function(x){if(x[0])n++;});return{n:n,st:st};}
function comboMult(){var n=comboNow().n;return n>=4?0.4:n===3?0.2:n===2?0.1:0;}
var _mu=G.mult;G.mult=function(){return _mu()+streakMult()+comboMult();};
var st=el('style');st.textContent='.cmb{background:linear-gradient(165deg,var(--card2),var(--card) 60%);border:1px solid var(--glass-brd);border-radius:16px;padding:10px 14px;margin:10px 0}.cmb .tt{font-family:Orbitron,sans-serif;font-size:11px;letter-spacing:2px;color:#ff9f0a}.cmb .ch{display:flex;gap:6px;margin-top:8px;flex-wrap:wrap}.cmb .cp{border:1px solid var(--bord);border-radius:999px;padding:4px 10px;font-size:10px;font-weight:700;letter-spacing:1px;color:var(--dim)}.cmb .cp.on{border-color:#ff9f0a;color:#ff9f0a;box-shadow:0 0 8px -2px #ff9f0a}';document.head.appendChild(st);
var host=null;
function render(){if(!host){host=el('div');host.id='cmbHost';var qb=$('questBox');if(qb)qb.parentNode.insertBefore(host,qb.nextSibling);}
var c=comboNow();var tot=1+streakMult()+comboMult();
var h='<div class="cmb"><div class="tt">'+I('flame')+' STREAK x'+(1+streakMult()).toFixed(2)+' • COMBO x'+tot.toFixed(2)+'</div><div class="ch">';
c.st.forEach(function(x){h+='<span class="cp'+(x[0]?' on':'')+'">'+x[1]+'</span>';});
h+='</div><div class="ds" style="margin-top:6px">'+(c.n>=4?'🔥 FULL COMBO +40%!':c.n>=2?'Chain '+c.n+'/4 — keep going!':'Complete the chain for bonus XP')+'</div></div>';
host.innerHTML=h;}
var _rh=window.refreshHome;window.refreshHome=function(){_rh();render();};
setTimeout(render,1500);
console.log('combo ok');
})();
