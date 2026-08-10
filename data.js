const THEMES={
ios:{acc:'#0a84ff',bord:'#2c3e50',mut:'#98a8b8',dim:'#8e8e93',txt:'#f2f2f7',bg:'#000000',card:'#1c1c1e',card2:'#2c2c2e'},
light:{acc:'#007aff',bord:'#d1d1d6',mut:'#3c3c43',dim:'#8e8e93',txt:'#000000',bg:'#f2f2f7',card:'#ffffff',card2:'#e5e5ea'},
purple:{acc:'#8a63c9',bord:'#4c3a6b',mut:'#a78fd4',dim:'#8d84a0',txt:'#ece7f6',bg:'#000000',card:'#17111f',card2:'#241a35'},
ocean:{acc:'#58a6d6',bord:'#2b4d66',mut:'#8fc3e0',dim:'#849aa8',txt:'#e7f1f7',bg:'#000408',card:'#0d1b26',card2:'#16303f'},
blood:{acc:'#ff453a',bord:'#662b2b',mut:'#e09a9a',dim:'#a88484',txt:'#f7e7e7',bg:'#080000',card:'#26100f',card2:'#3f1a18'},
forest:{acc:'#30d158',bord:'#2b6647',mut:'#9ae0bb',dim:'#84a894',txt:'#e7f7ee',bg:'#000804',card:'#0d2618',card2:'#163f27'},
gold:{acc:'#ffd60a',bord:'#66512b',mut:'#e0c48f',dim:'#a89a84',txt:'#f7f0e7',bg:'#080500',card:'#26200d',card2:'#3f3516'},
mono:{acc:'#ffffff',bord:'#4c4c4c',mut:'#b8b8b8',dim:'#909090',txt:'#f2f2f2',bg:'#000000',card:'#1c1c1c',card2:'#2c2c2c'},
sakura:{acc:'#ff375f',bord:'#6b3a5a',mut:'#e8aed4',dim:'#a8849a',txt:'#f7e7f1',bg:'#080005',card:'#26101c',card2:'#3f1a2e'},
neon:{acc:'#39ff14',bord:'#1e5c1e',mut:'#9ae09a',dim:'#7ba87b',txt:'#eaffea',bg:'#000800',card:'#0d1f0d',card2:'#163016'},
cyber:{acc:'#00e5ff',bord:'#005f66',mut:'#8fdbe6',dim:'#7fa8ad',txt:'#e6fbff',bg:'#00080a',card:'#0d2226',card2:'#163a40'},
royal:{acc:'#c9a227',bord:'#6b5a1e',mut:'#e0cf8f',dim:'#a89a74',txt:'#f7f0dd',bg:'#0a0800',card:'#262008',card2:'#3f350f'},
rose:{acc:'#ff6b9d',bord:'#6b2b4a',mut:'#e09ac0',dim:'#a88494',txt:'#f7e7f0',bg:'#080004',card:'#26101c',card2:'#3f1a2e'},
galaxy:{acc:'#7c4dff',bord:'#3a2b66',mut:'#b8a0e6',dim:'#8d84a8',txt:'#efe7ff',bg:'#040008',card:'#150d26',card2:'#221a3f'},
olympus:{acc:'#ffd700',bord:'#8a7a2b',mut:'#e6d8a0',dim:'#a8a084',txt:'#fffbe7',bg:'#0a0800',card:'#262008',card2:'#3f350f'}};
const PREMIUM=['galaxy','olympus'];
const FS={s:['28px','17px'],m:['34px','19px'],l:['40px','22px']};
const RANKS=[[0,'Rookie'],[100,'Word Hunter'],[250,'Lexicon Learner'],[500,'Vocab Knight'],[900,'Memory Baron'],[1400,'Word Wizard'],[2000,'Lexicon Lord'],[3000,'Word Master']];
const RIVALS=['Ava','Lily','Maya','Sara','Ben','Jack','Emma','Noah','Zoe','Luke','Owen','Ruby','Leo','Nina','Adam','Cora','Eli','Fiona','Gwen','Hugo'];
const RIVAL_RATE={chill:[5,20],normal:[15,45],brutal:[30,80]};
const ATTRS=[['mind','🧠','Mind'],['body','💪','Body'],['calm','🧘','Calm'],['work','💼','Work'],['create','🎨','Create']];
const OB=[['🗡️','Troviruses up','You have been chosen as a Player. Level up your words, your body, your self.'],['🧬','Status Window','Every action gives XP. Watch your character grow from weak to S-Rank.'],['📜','Patch Notes','Each week, the app writes the update notes of YOU.'],];
const LADDER=[10,20,30,'box',50,'freeze',100];
const QUESTS=[
{id:'rev10',label:'Review 10 cards',target:10,key:'rev',xp:20},
{id:'new5',label:'Learn 5 new cards',target:5,key:'new',xp:25},
{id:'perf5',label:'5 perfect answers',target:5,key:'perf',xp:30}];
const SHOP=[
{id:'freeze',name:'🧊 Streak Freeze',price:150,desc:'Protects streak for one missed day'},
{id:'box',name:'🎁 Mystery Box',price:100,desc:'Random reward inside'}];
const BADGES=[['🌱','First Step'],['📚','Collector'],['🔥','Week Flame'],['💯','Reviewer'],['🏆','LVL 5'],['💪','Slayer'],['🎧','Listener'],['📅','Exam Ready']];
console.log('data ok');
