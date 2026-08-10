/* JOURNAL / REFLECTION */
(function(){
if(window.__JN__)return;window.__JN__=1;
var el=G.el,I=G.I;
function J(){set.journal=set.journal||{};return set.journal;}
window.saveJournal=function(){var e={a:$('jA').value.trim(),b:$('jB').value.trim(),c:$('jC').value.trim(),f:$('jF').value.trim()};
var n=0;for(var k in e)if(e[k])n++;
if(n<2)return sysMsg('REFLECT MORE',I('edit')+' Answer at least 2 questions.');
J()[today()]=e;var keys=Object.keys(J()).sort();if(keys.length>14)delete J()[keys[0]];
var x=Math.round(15*G.mult());set.xp+=x;set.attrXp.calm=(set.attrXp.calm||0)+10;save();
sysMsg('REFLECTION SAVED',I('leaf')+' +'+x+' XP • +10 CALM XP<br>The mind grows in silence.');renderJournal();};
var scr=el('div');scr.id='scrJournal';scr.className='screen';document.body.appendChild(scr);
window.renderJournal=function(){var t=today();var e=J()[t]||{a:'',b:'',c:'',f:''};
var h='<div class="btitle">Journal</div>';
h+='<div class="stitle">TONIGHT\'S REFLECTION</div><div class="igroup">';
h+='<div class="irow"><label class="f">WHAT DID YOU ACCOMPLISH?</label><textarea id="jA">'+esc(e.a)+'</textarea></div>';
h+='<div class="irow"><label class="f">WHAT WENT WRONG?</label><textarea id="jB">'+esc(e.b)+'</textarea></div>';
h+='<div class="irow"><label class="f">WHAT WILL YOU IMPROVE TOMORROW?</label><textarea id="jC">'+esc(e.c)+'</textarea></div>';
h+='<div class="irow"><label class="f">FREE THOUGHTS</label><textarea id="jF">'+esc(e.f)+'</textarea></div>';
h+='<div class="irow"><button class="btn fill" onclick="saveJournal()">💾 SAVE (+15 XP)</button></div></div>';
var ks=Object.keys(J()).sort().reverse().slice(0,7);
if(ks.length){h+='<div class="stitle">PAGES</div>';ks.forEach(function(k){var x=J()[k];h+='<div class="cmb"><div class="tt">'+k+'</div>'+(x.a?'<div class="ds">✔ '+esc(x.a.slice(0,60))+'</div>':'')+(x.c?'<div class="ds">→ '+esc(x.c.slice(0,60))+'</div>':'')+'</div>';});}
h+='<div class="row"><button class="btn" onclick="goHome()">BACK</button></div>';
scr.innerHTML=h;show('scrJournal');};
function jbtn(){if($('jnBtn'))return;var r=document.querySelector('#scrHome .row');if(r)r.insertAdjacentHTML('beforebegin','<button id="jnBtn" class="btn big" onclick="renderJournal()">📓 JOURNAL</button>');}
setInterval(jbtn,2000);setTimeout(jbtn,1200);
console.log('journal ok');
})();
