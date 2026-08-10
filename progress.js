/* PRO PROGRESS */
(function(){
if(window.__PG__)return;window.__PG__=1;
var el=G.el;
var scr=el('div');scr.id='scrProgress';scr.className='screen';document.body.appendChild(scr);
window.renderProgress=function(){
var h='<div class="btitle">Progress</div>';
h+='<canvas id="pgBars" width="320" height="110" style="width:100%"></canvas><div class="pos">reviews — last 14 days</div>';
h+='<canvas id="pgXp" width="320" height="110" style="width:100%"></canvas><div class="pos">cumulative XP — last 14 days</div>';
h+='<div class="row"><canvas id="pgRadar" width="160" height="160"></canvas><canvas id="pgDonut" width="140" height="140"></canvas></div>';
h+='<div class="pos">attribute radar • accuracy</div>';
h+='<div class="row"><button class="btn" onclick="goHome()">BACK</button></div>';
scr.innerHTML=h;show('scrProgress');
var acc=(getComputedStyle(document.documentElement).getPropertyValue('--acc')||'#0a84ff').trim();
var v=[];for(var i=13;i>=0;i--)v.push(set.days[new Date(Date.now()-i*86400000).toDateString()]||0);
var mx=Math.max(4,Math.max.apply(null,v));var x=$('pgBars').getContext('2d');
v.forEach(function(n,i){var bh=(n/mx)*90;x.fillStyle=acc;x.globalAlpha=.35+.65*(n/mx);x.fillRect(8+i*22,105-bh,16,bh);});x.globalAlpha=1;
var dk=[];for(var i=13;i>=0;i--)dk.push(new Date(Date.now()-i*86400000).toDateString());
var cum=0;var cv=dk.map(function(k){cum+=((set.dx&&set.dx[k])||0);return cum;});
var cm=Math.max(10,cv[cv.length-1]);var y=$('pgXp').getContext('2d');y.strokeStyle=acc;y.lineWidth=2;y.beginPath();
cv.forEach(function(n,i){var px=8+i*23,py=105-(n/cm)*90;i?y.lineTo(px,py):y.moveTo(px,py);});y.stroke();
var r=$('pgRadar').getContext('2d');var A=['mind','body','calm','work','create'];var vals=A.map(function(a){return Math.min(1,((set.attrXp&&set.attrXp[a])||0)/200);});
r.translate(80,80);r.strokeStyle=acc;r.fillStyle=acc;
r.beginPath();for(var i=0;i<5;i++){var an=-Math.PI/2+i*2*Math.PI/5;i?r.lineTo(Math.cos(an)*60,Math.sin(an)*60):r.moveTo(Math.cos(an)*60,Math.sin(an)*60);}r.closePath();r.globalAlpha=.3;r.stroke();
r.beginPath();for(var i=0;i<5;i++){var an=-Math.PI/2+i*2*Math.PI/5;var rr=8+vals[i]*52;i?r.lineTo(Math.cos(an)*rr,Math.sin(an)*rr):r.moveTo(Math.cos(an)*rr,Math.sin(an)*rr);}r.closePath();r.globalAlpha=.5;r.fill();r.globalAlpha=1;
var d=$('pgDonut').getContext('2d');var ok=0,rv=0;for(var q in set.qstats){ok+=set.qstats[q].ok;rv+=set.qstats[q].rev;}
var ac=rv?ok/rv:0;d.lineWidth=14;d.strokeStyle='#2c2c2e';d.beginPath();d.arc(70,70,50,0,7);d.stroke();
d.strokeStyle=acc;d.beginPath();d.arc(70,70,50,-Math.PI/2,-Math.PI/2+ac*6.283);d.stroke();
d.fillStyle=acc;d.font='16px Orbitron,sans-serif';d.textAlign='center';d.fillText(Math.round(ac*100)+'%',70,76);};
function pbtn(){if($('pgBtn'))return;var r=document.querySelector('#scrHome .row');if(r)r.insertAdjacentHTML('beforebegin','<button id="pgBtn" class="btn big" onclick="renderProgress()">📈 PROGRESS</button>');}
setInterval(pbtn,2000);setTimeout(pbtn,1200);
console.log('progress ok');
})();
