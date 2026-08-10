/* BESTIARY */
(function(){
if(window.__BS__)return;window.__BS__=1;
var el=G.el,I=G.I;
function rar(iv){return iv>=180?['MYTHIC','#ffd60a']:iv>=90?['ELITE','#bf5af2']:iv>=45?['RARE','#64d2ff']:iv>=21?['SHADOW','#8e8e93']:['TAMED','#30d158'];}
var scr=el('div');scr.id='scrBest';scr.className='screen';document.body.appendChild(scr);
window.renderBest=function(){
var h='<div class="btitle">Bestiary</div><div class="ds" style="text-align:center">The book of beasts you have tamed</div>';
var list=cards.filter(function(c){return c.srs&&c.srs.q1&&c.srs.q1.interval>=7;}).sort(function(a,b){return b.srs.q1.interval-a.srs.q1.interval;});
h+='<div class="swpanel"><div class="swpts">'+I('bookopen')+' '+list.length+' beasts tamed • '+((set.shadows&&set.shadows.list.length)||0)+' shadows</div></div>';
list.slice(0,30).forEach(function(c){var iv=c.srs.q1.interval;var r=rar(iv);var sh=set.shadows&&set.shadows.list.some(function(s){return s.id===c.id;});
h+='<div class="shcard"><span>'+I(sh?'skull':'box')+' <i style="font-style:italic">'+esc(c.front)+'</i></span><span class="rk" style="color:'+r[1]+'">'+(sh?'SHADOW':r[0])+' • '+iv+'d</span></div>';});
if(!list.length)h+='<div class="report">No beasts yet.<br>Review a card until its interval passes 7 days to tame it.</div>';
h+='<div class="row"><button class="btn" onclick="goHome()">BACK</button></div>';
scr.innerHTML=h;show('scrBest');};
function bbtn(){if($('bsBtn'))return;var r=document.querySelector('#scrHome .row');if(r)r.insertAdjacentHTML('beforebegin','<button id="bsBtn" class="btn big" onclick="renderBest()">📖 BESTIARY</button>');}
setInterval(bbtn,2000);setTimeout(bbtn,1200);
console.log('best ok');
})();
