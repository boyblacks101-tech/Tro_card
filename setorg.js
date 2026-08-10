/* SETTINGS ORGANIZER */
(function(){
if(window.__SO__)return;window.__SO__=1;
var el=G.el;
function applyT(){var t=THEMES[set.theme]||THEMES.ios;var r=document.documentElement.style;
for(var k in t)r.setProperty('--'+k,t[k]);var f=FS[set.fs]||FS.m;r.setProperty('--ws',f[0]);r.setProperty('--ms',f[1]);}
var scr=el('div');scr.id='scrSetQ';scr.className='screen';document.body.appendChild(scr);
window.openSetQ=function(){
var h='<div class="btitle">Settings</div>';
h+='<div class="row"><button class="btn fill">QUICK ⚡</button><button class="btn" onclick="openSettings();show(\'scrSettings\')">FULL ⚙️</button></div>';
h+='<div class="stitle">APPEARANCE</div><div class="igroup"><div class="irow"><label class="f">THEME</label><select onchange="qSet(\'theme\',this.value)">'+Object.keys(THEMES).map(function(k){return '<option value="'+k+'"'+(set.theme===k?' selected':'')+'>'+k+(((set.unlocked||[]).indexOf(k)<0&&k!=='ios'&&(set.theme!==k))?' 🔒':'')+'</option>';}).join('')+Object.keys(set.customThemes||{}).map(function(k){return '<option value="'+k+'"'+(set.theme===k?' selected':'')+'>'+k+'</option>';}).join('')+'</select></div><div class="irow"><label class="f">FONT SIZE</label><select onchange="qSet(\'fs\',this.value)">'+['s','m','l'].map(function(k){return '<option value="'+k+'"'+(set.fs===k?' selected':'')+'>'+k+'</option>';}).join('')+'</select></div></div>';
h+='<div class="stitle">STUDY</div><div class="igroup"><div class="irow"><label class="f">NEW CARDS/DAY</label><input type="number" value="'+(set.newPerDay||10)+'" onchange="set.newPerDay=parseInt(this.value)||10;save()"></div><div class="irow"><label class="f">SESSION</label><select onchange="set.sess=parseInt(this.value);save()">'+[10,20,0].map(function(v){return '<option value="'+v+'"'+((set.sess==null?10:set.sess)===v?' selected':'')+'>'+(v||'All')+'</option>';}).join('')+'</select></div><div class="irow"><label class="f">SPEECH SPEED</label><select onchange="set.rate=parseFloat(this.value);save()">'+['0.7','0.85','1'].map(function(v){return '<option value="'+v+'"'+((set.rate||0.85)==v?' selected':'')+'>'+v+'</option>';}).join('')+'</select></div></div>';
h+='<div class="stitle">PROFILE</div><div class="igroup"><div class="irow"><label class="f">NAME</label><input value="'+esc(set.name||'')+'" onchange="set.name=this.value;save()"></div><div class="irow"><label class="f">CRUSH (NCR)</label><input value="'+esc(set.ncr||'')+'" onchange="set.ncr=this.value;save()"></div></div>';
h+='<div class="row"><button class="btn" onclick="goHome()">BACK</button></div>';
scr.innerHTML=h;show('scrSetQ');};
window.qSet=function(k,v){set[k]=v;save();if(k==='theme'||k==='fs')applyT();openSetQ();};
var _tb=window.tabTo;
window.tabTo=function(t){_tb(t);if(t==='settings')openSetQ();};
console.log('setorg ok');
})();
