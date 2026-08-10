/* NCR ASSISTANT */
(function(){
if(window.__AS__)return;window.__AS__=1;
var el=G.el;
function CN(){return (set.ncr||'').trim()||'Your Coach';}
var MSGS=['I believe in you, {n}!','You are stronger than yesterday, {n}.','Just 10 minutes. Start small, {n}.','The System chose you for a reason, {n}.','Rest is part of training too, {n}.','One review. That is all it takes to begin, {n}.','I am proud of you, {n}.','Do not fight the whole mountain. One step, {n}.'];
function face(sz){var n=CN(),hc=0;for(var i=0;i<n.length;i++)hc=(hc*31+n.charCodeAt(i))|0;var hair=['#2b2b2b','#5b3b1e','#8a63c9','#b3541e','#1f4d8a'][Math.abs(hc)%5];
return '<svg viewBox="0 0 100 100" width="'+sz+'" height="'+sz+'"><circle cx="50" cy="50" r="30" fill="#f6d7b8"/><path d="M20 50a30 30 0 0 1 60 0c0-8-6-26-30-26s-30 18-30 26z" fill="'+hair+'"/><circle cx="40" cy="52" r="3" fill="#222"/><circle cx="60" cy="52" r="3" fill="#222"/><path d="M44 62q6 5 12 0" stroke="#c46a6a" stroke-width="2" fill="none"/><circle cx="34" cy="60" r="4" fill="#ff9aa2" opacity=".6"/><circle cx="66" cy="60" r="4" fill="#ff9aa2" opacity=".6"/></svg>';}
var cur='';
function pickMsg(){cur=MSGS[Math.floor(Math.random()*MSGS.length)].replace('{n}',CN());return cur;}
var ov=el('div');ov.style.cssText='position:fixed;left:0;right:0;bottom:0;z-index:620;background:linear-gradient(170deg,var(--card2),var(--card));border-top:1px solid var(--acc);border-radius:24px 24px 0 0;padding:20px;transform:translateY(110%);transition:transform .35s;box-shadow:0 -10px 40px -10px var(--acc)';document.body.appendChild(ov);
function draw(){ov.innerHTML='<div style="display:flex;gap:14px;align-items:center">'+face(70)+'<div style="flex:1"><div style="font-family:Orbitron,sans-serif;font-size:11px;letter-spacing:2px;color:var(--acc)">'+esc(CN())+'</div><div style="font-size:15px;margin-top:6px;line-height:1.6">'+esc(cur)+'</div></div></div><div class="row"><button class="btn fill" onclick="assistRead()">🔊 READ</button><button class="btn" onclick="assistNext()">🔄 NEW</button><button class="btn" onclick="closeAssist()">✕</button></div>';}
window.openAssist=function(){pickMsg();draw();ov.style.transform='translateY(0)';};
window.closeAssist=function(){ov.style.transform='translateY(110%)';};
window.assistRead=function(){speak(cur);};
window.assistNext=function(){pickMsg();draw();};
(function(){var t=today();if(new Date().getHours()>=19&&set.assistDay!==t){set.assistDay=t;save();setTimeout(openAssist,4000);}})();
var st=el('style');st.textContent='#afab{position:fixed;left:14px;bottom:92px;z-index:30;width:52px;height:52px;border-radius:50%;background:#ff375f;border:none;box-shadow:0 0 20px -4px #ff375f;display:flex;align-items:center;justify-content:center;overflow:hidden}';document.head.appendChild(st);
function ab(){if($('afab'))return;var f=el('button');f.id='afab';f.innerHTML=face(36);f.onclick=openAssist;document.body.appendChild(f);}
setInterval(ab,2000);setTimeout(ab,1200);
console.log('assist ok');
})(); 
