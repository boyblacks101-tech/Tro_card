/* LIFE HUB */
(function(){
if(window.__LF__)return;window.__LF__=1;
var el=G.el,I=G.I;
var PRE=[['Shower','🚿','body',10],['Workout 20m','💪','body',20],['Read 10 pages','📖','mind',15],['Drink 8 water','💧','body',10],['Sleep before 23','😴','calm',20],['Cold shower','🧊','body',15],['Meditate 5m','🧘','calm',15],['Walk outside','🚶','calm',10],['No sugar today','🍬','body',15],['Skincare','✨','calm',10]];
var scr=el('div');scr.id='scrLife';scr.className='screen';document.body.appendChild(scr);
window.lifeAdd=function(n,ic,at,xp){set.habits.push({id:'h'+Date.now()+Math.floor(Math.random()*999),name:n,icon:ic,attr:at,xp:parseInt(xp)||15,done:{},streak:0,last:''});save();sysMsg('QUEST ADDED',I('check')+' <b>'+esc(n)+'</b> joined your daily quests.');renderLife();};
window.lifeAddC=function(){var n=$('lfName').value.trim();if(!n)return;lifeAdd(n,$('lfIcon').value||'✅',$('lfAttr').value,$('lfXp').value);};
window.lifeSpeak=function(){var c=cards[Math.floor(Math.random()*cards.length)];if(!c)return;speak(c.front);if(c.example)setTimeout(function(){speak(c.example);},1200);};
window.renderLife=function(){
var fa=cards.filter(function(c){return c.fa;}).length;var ex=cards.filter(function(c){return c.example;}).length;
var h='<div class="btitle">Life Hub</div>';
h+='<div class="stitle">LANGUAGE 🌍</div><div class="cmb"><div class="irow">'+I('book')+' Cards: <b>'+cards.length+'</b> • FA meaning: <b>'+fa+'</b> • Examples: <b>'+ex+'</b></div><div class="irow">'+I('speak')+' Speed: <select onchange="set.rate=parseFloat(this.value);save()"><option value="0.7">Slow</option><option value="0.85">Normal</option><option value="1">Fast</option></select></div><div class="irow"><button class="btn" onclick="lifeSpeak()">🎧 PRACTICE NOW</button></div></div>';
h+='<div class="stitle">SELF-UPGRADE QUESTS ⬆️</div><div class="row" style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
PRE.forEach(function(p){h+='<button class="btn" style="margin:0;width:100%" onclick="lifeAdd(\''+p[0]+'\',\''+p[1]+'\',\''+p[2]+'\','+p[3]+')">'+p[1]+' '+p[0]+'</button>';});
h+='</div>';
h+='<div class="stitle">CUSTOM TASK</div><div class="igroup"><div class="irow"><input id="lfName" placeholder="task name"></div><div class="irow"><input id="lfIcon" maxlength="4" value="✅" style="width:80px"> <select id="lfAttr">'+ATTRS.map(function(a){return '<option value="'+a[0]+'">'+a[2]+'</option>';}).join('')+'</select> <input id="lfXp" type="number" value="15" style="width:70px"></div><div class="irow"><button class="btn fill" onclick="lifeAddC()">✚ ADD</button></div></div>';
h+='<div class="row"><button class="btn" onclick="goHome()">BACK</button></div>';
scr.innerHTML=h;show('scrLife');};
function lbtn(){if($('lfBtn'))return;var r=document.querySelector('#scrHome .row');if(r)r.insertAdjacentHTML('beforebegin','<button id="lfBtn" class="btn big" onclick="renderLife()">🌱 LIFE</button>');}
setInterval(lbtn,2000);setTimeout(lbtn,1200);
console.log('life ok');
})();
