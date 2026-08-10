/* LANGUAGE ROOM + DRAWER */
(function(){
if(window.__LG2__)return;window.__LG2__=1;
var el=G.el,I=G.I;
var st=el('style');st.textContent='#lgVeil{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:610;opacity:0;pointer-events:none;transition:opacity .3s}#lgVeil.on{opacity:1;pointer-events:auto}#lgDrawer{position:fixed;top:0;bottom:0;right:0;width:78%;max-width:300px;background:linear-gradient(200deg,var(--card2),var(--card));z-index:615;transform:translateX(105%);transition:transform .35s;padding:20px;overflow-y:auto;border-left:1px solid var(--acc);box-shadow:-10px 0 40px -10px var(--acc)}#lgDrawer.on{transform:translateX(0)}#lgDrawer .btn{width:100%;margin:6px 0}.lgflip{min-height:190px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(165deg,var(--card2),var(--card));border:1px solid var(--acc);border-radius:20px;padding:18px;margin:12px 0;box-shadow:0 0 24px -8px var(--acc);cursor:pointer;text-align:center}';
document.head.appendChild(st);
var veil=el('div');veil.id='lgVeil';document.body.appendChild(veil);
var dr=el('div');dr.id='lgDrawer';document.body.appendChild(dr);
veil.onclick=function(){dr.classList.remove('on');veil.classList.remove('on');};
window.lgToggle=function(){dr.classList.toggle('on');veil.classList.toggle('on');};
dr.innerHTML='<div class="btitle">Language</div>'
+'<button class="btn fill" onclick="lgToggle();startStudy(false)">▶ STUDY MODE</button>'
+'<button class="btn" onclick="lgToggle();startStudy(true)">💪 HARD WORDS</button>'
+'<button class="btn" onclick="lgToggle();startPodcast()">🎧 PODCAST</button>'
+'<button class="btn" onclick="lgToggle();tabTo(\'add\')">➕ ADD CARD</button>'
+'<button class="btn" onclick="lgToggle();nav(\'scrBulk\')">⚡ BULK ADD</button>'
+'<button class="btn" onclick="lgToggle();tabTo(\'browse\')">📚 BROWSE</button>'
+'<button class="btn" onclick="lgToggle();speakWotd()">🔊 WORD OF THE DAY</button>'
+'<button class="btn" onclick="lgToggle();renderLife()">🌍 LANG SETTINGS</button>'
+'<button class="btn" onclick="lgToggle();goHome()">🏠 HOME</button>';
var scr=el('div');scr.id='scrLang';scr.className='screen';document.body.appendChild(scr);
var Q=[],cur=null,flipped=false,ses=0;
function loadQ(){Q=due().sort(function(){return Math.random()-.5;});if(!Q.length)Q=cards.slice().sort(function(){return Math.random()-.5;}).slice(0,10);}
function next(){flipped=false;if(!Q.length)loadQ();cur=Q.shift()||null;render();}
window.lgFlip=function(){flipped=true;if(cur)speak(cur.front);render();};
window.lgSpeak=function(){if(cur)speak(cur.front);};
window.lgGrade=function(g){if(!cur)return;gradeIt(g);ses++;next();};
function render(){
var h='<div class="dgtop"><button class="btn" onclick="lgToggle()">☰</button><span class="dgrank" style="color:var(--acc);border-color:var(--acc)">LANGUAGE ROOM</span><span class="pos">'+ses+' done</span></div>';
h+='<div class="statgrid"><div class="statcard"><b>'+cards.length+'</b><span>CARDS</span></div><div class="statcard"><b>'+due().length+'</b><span>DUE</span></div><div class="statcard"><b>'+((set.dx&&set.dx[today()])||0)+'</b><span>XP TODAY</span></div></div>';
if(cur){h+='<div class="lgflip" onclick="lgFlip()"><div class="word" style="font-size:30px">'+esc(cur.front)+'</div>'+(flipped?'<div class="meaning" style="margin-top:10px">'+esc(cur.back||'')+'</div><div class="fa" style="margin-top:6px">'+esc(cur.fa||'')+'</div>'+(cur.example?'<div class="pos" style="margin-top:8px;font-style:italic">"'+esc(cur.example)+'"</div>':''):'<div class="pos" style="margin-top:12px">tap to flip 🔄</div>')+'</div>';
h+=flipped?'<div class="row"><button class="btn" onclick="lgGrade(1)">AGAIN</button><button class="btn" onclick="lgGrade(2)">HARD</button><button class="btn fill" onclick="lgGrade(3)">GOOD</button><button class="btn fill" onclick="lgGrade(4)">EASY</button></div>'
:'<div class="row"><button class="btn fill" onclick="lgFlip()">🔄 FLIP</button><button class="btn" onclick="lgSpeak()">🔊</button></div>';}
else h+='<div class="report">No cards yet. Add some from the drawer ☰</div>';
h+='<div class="row"><button class="btn" onclick="goHome()">BACK</button></div>';
scr.innerHTML=h;show('scrLang');}
window.renderLang=function(){ses=0;loadQ();next();};
function lbtn(){if($('lgBtn'))return;var r=document.querySelector('#scrHome .row');if(r)r.insertAdjacentHTML('beforebegin','<button id="lgBtn" class="btn big" onclick="renderLang()">🌐 LANG</button>');}
setInterval(lbtn,2000);setTimeout(lbtn,1200);
console.log('lang ok');
})();
