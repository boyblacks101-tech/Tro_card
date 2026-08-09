const THEMES={
purple:{acc:'#8a63c9',bord:'#4c3a6b',mut:'#a78fd4',dim:'#8d84a0',txt:'#ece7f6',bg:'#000000'},
ocean:{acc:'#58a6d6',bord:'#2b4d66',mut:'#8fc3e0',dim:'#849aa8',txt:'#e7f1f7',bg:'#000408'},
blood:{acc:'#d66a6a',bord:'#662b2b',mut:'#e09a9a',dim:'#a88484',txt:'#f7e7e7',bg:'#080000'},
forest:{acc:'#66d69a',bord:'#2b6647',mut:'#9ae0bb',dim:'#84a894',txt:'#e7f7ee',bg:'#000804'},
gold:{acc:'#d6b458',bord:'#66512b',mut:'#e0c48f',dim:'#a89a84',txt:'#f7f0e7',bg:'#080500'},
mono:{acc:'#cccccc',bord:'#4c4c4c',mut:'#b8b8b8',dim:'#909090',txt:'#f2f2f2',bg:'#000000'},
sakura:{acc:'#e08bc0',bord:'#6b3a5a',mut:'#e8aed4',dim:'#a8849a',txt:'#f7e7f1',bg:'#080005'}};
const FS={s:['28px','17px'],m:['34px','19px'],l:['40px','22px']};
const RANKS=[[0,'Rookie'],[100,'Word Hunter'],[250,'Lexicon Learner'],[500,'Vocab Knight'],[900,'Memory Baron'],[1400,'Word Wizard'],[2000,'Lexicon Lord'],[3000,'Word Master']];
const RIVALS=['Ava','Kian','Lily','Omid','Nora','Reza','Maya','Arman','Sara','Ben'];
const RIVAL_RATE={chill:[5,20],normal:[15,45],brutal:[30,80]};
const OB=[['🖤','Tro Card','Your personal word universe. Dark, calm, yours.'],['🧠','Smart Review','FSRS schedules each word exactly when you are about to forget it.'],['🎮','Play To Learn','Quests, combos, leagues, mystery boxes — study never felt like this.']];
const LADDER=[10,20,30,'box',50,'freeze',100];
const QUESTS=[
{id:'rev10',label:'Review 10 cards',target:10,key:'rev',xp:20},
{id:'new5',label:'Learn 5 new cards',target:5,key:'new',xp:25},
{id:'perf5',label:'5 perfect answers',target:5,key:'perf',xp:30}];
const SHOP=[
{id:'freeze',name:'🧊 Streak Freeze',price:150,desc:'Protects streak for one missed day'},
{id:'box',name:'🎁 Mystery Box',price:100,desc:'Random reward inside'}];
const BADGES=[['🌱','First Step'],['📚','Collector'],['🔥','Week Flame'],['💯','Reviewer'],['🏆','LVL 5'],['💪','Slayer'],['🎧','Listener'],['📅','Exam Ready']];
