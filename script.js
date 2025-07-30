const idioms = [
  {word: "否极泰来（pǐ jí tài lái）", explanation: "坏运到极点，好运就来了。", usage: "表示情况即将好转。", example: "只要坚持下去，否极泰来，终有一天会成功。", synonym: "苦尽甘来", antonym: "乐极生悲"},
  {word: "胼手胝足（pián shǒu zhī zú）", explanation: "形容劳动艰辛，手脚磨起茧子。", usage: "强调勤劳奋斗的辛苦。", example: "他靠着胼手胝足的努力，终于创业成功。", synonym: "呕心沥血、任劳任怨", antonym: "养尊处优"},
  {word: "平步青云（píng bù qīng yún）", explanation: "比喻人一下子升得很高，仕途顺利。", usage: "形容前途发展迅速。", example: "他工作没几年就升为总经理，真是平步青云。", synonym: "步步高升", antonym: "一落千丈"},
  {word: "萍水相逢（píng shuǐ xiāng féng）", explanation: "指偶然相遇的人。", usage: "形容人与人之间的偶遇。", example: "我们萍水相逢，却结下深厚情谊。", synonym: "邂逅、偶遇", antonym: "久别重逢"},
  {word: "破镜重圆（pò jìng chóng yuán）", explanation: "比喻夫妻离散后重聚。", usage: "形容感情破裂后又恢复。", example: "他们多年后破镜重圆，令人动容。", synonym: "重修旧好", antonym: "分道扬镳"},
  {word: "扑朔迷离（pū shuò mí lí）", explanation: "形容事情复杂难辨，真假难分。", usage: "用于形容情况复杂。", example: "案件线索扑朔迷离，难以侦破。", synonym: "错综复杂", antonym: "一清二楚"},
  {word: "凄风苦雨（qī fēng kǔ yǔ）", explanation: "形容天气恶劣，也比喻环境凄凉。", usage: "用于描写困苦或悲凉的情境。", example: "在凄风苦雨中，他独自流浪街头。", synonym: "风雨交加", antonym: "风和日丽"},
  {word: "欺世盗名（qī shì dào míng）", explanation: "指用虚假手段骗取名誉。", usage: "批评虚伪作风。", example: "他满口仁义道德，其实是欺世盗名。", synonym: "沽名钓誉", antonym: "实至名归"},
  {word: "歧路亡羊（qí lù wáng yáng）", explanation: "比喻方向多容易迷失。", usage: "比喻事情复杂容易误入歧途。", example: "他一时不慎，在歧路亡羊中浪费了人生。", synonym: "迷失方向", antonym: "目标明确"},
  {word: "棋逢对手（qí féng duì shǒu）", explanation: "比喻双方实力相当。", usage: "形容势均力敌。", example: "两位高手对弈，真是棋逢对手。", synonym: "势均力敌", antonym: "旗鼓不敌"},
  {word: "旗开得胜（qí kāi dé shèng）", explanation: "比喻事情一开始就取得胜利。", usage: "用于开局顺利。", example: "比赛一开始我们就领先，真是旗开得胜。", synonym: "开门见喜", antonym: "出师不利"},
  {word: "杞人忧天（qǐ rén yōu tiān）", explanation: "比喻无谓的担忧。", usage: "讽刺多余的担心。", example: "他整天杞人忧天，担心末日来临。", synonym: "庸人自扰", antonym: "未雨绸缪"},
  {word: "气贯长虹（qì guàn cháng hóng）", explanation: "形容正气浩然，气势宏大。", usage: "称赞正义之气势。", example: "他怒斥贪官，气贯长虹，令人佩服。", synonym: "浩气长存", antonym: "苟且偷安"},
  {word: "气急败坏（qì jí bài huài）", explanation: "因愤怒或焦急而失去冷静。", usage: "描述失控的情绪。", example: "他看到试卷丢了，气急败坏地大喊大叫。", synonym: "大发雷霆", antonym: "镇定自若"},
  {word: "气势磅礴（qì shì páng bó）", explanation: "形容气势雄伟浩大。", usage: "用于形容自然景观或场面。", example: "这首交响乐气势磅礴，震撼人心。", synonym: "浩浩荡荡", antonym: "气息奄奄"},
  {word: "气吞山河（qì tūn shān hé）", explanation: "形容气概雄伟、声势浩大。", usage: "比喻豪情壮志。", example: "将军出征，气吞山河，士气大振。", synonym: "气势磅礴", antonym: "胆小如鼠"},
  {word: "弃暗投明（qì àn tóu míng）", explanation: "比喻抛弃错误，投向正义。", usage: "常用于形容思想转变。", example: "他痛改前非，弃暗投明。", synonym: "改邪归正", antonym: "执迷不悟"},
  {word: "弃如敝屣（qì rú bì xǐ）", explanation: "像丢弃破鞋一样抛弃。", usage: "形容毫不珍惜地抛弃。", example: "他对旧友弃如敝屣，令人寒心。", synonym: "翻脸无情", antonym: "珍而重之"},
  {word: "千锤百炼（qiān chuí bǎi liàn）", explanation: "形容长期艰苦的锻炼或反复修炼。", usage: "用于作品、技术或意志锤炼。", example: "他的演讲稿千锤百炼，令人赞赏。", synonym: "精雕细琢", antonym: "粗制滥造"},
  {word: "千夫所指（qiān fū suǒ zhǐ）", explanation: "被很多人指责、谴责。", usage: "多用于负面评价。", example: "他贪污被揭，成了千夫所指。", synonym: "人人喊打", antonym: "众望所归"},
  {word: "千钧一发（qiān jūn yī fà）", explanation: "比喻情势极其危急。", usage: "用于关键时刻或危机描述。", example: "关键时刻他挺身而出，解救千钧一发的局面。", synonym: "危在旦夕", antonym: "安如泰山"},
  {word: "千里鹅毛（qiān lǐ é máo）", explanation: "比喻礼物微薄却情意深重。", usage: "用于赠礼表达心意。", example: "这份小礼虽然简单，却是千里鹅毛，敬请收下。", synonym: "礼轻情意重", antonym: "厚礼轻情"},
  {word: "千篇一律（qiān piān yī lǜ）", explanation: "文章或说话内容格式单一，无变化。", usage: "多用作批评内容无新意。", example: "这部小说情节千篇一律，毫无亮点。", synonym: "千人一面", antonym: "推陈出新"},
  {word: "千丝万缕（qiān sī wàn lǚ）", explanation: "形容关系复杂或事物牵连广泛。", usage: "形容复杂联系。", example: "他们之间千丝万缕的联系令人难以理清。", synonym: "错综复杂", antonym: "一清二楚"},
  {word: "千载一时（qiān zǎi yī shí）", explanation: "千年才有一次的时机，比喻机会非常难得。", usage: "用于强调宝贵机会。", example: "这次合作是千载一时的好机会，不能错过。", synonym: "万中无一", antonym: "司空见惯"},
  {word: "阡陌纵横（qiān mò zòng héng）", explanation: "形容田地分布得井然有序，四通八达。", usage: "多用于描写农村风景。", example: "这片田野阡陌纵横，美不胜收。", synonym: "井然有序", antonym: "杂乱无章"},
  {word: "牵强附会（qiān qiǎng fù huì）", explanation: "把无关的事强扯在一起解释。", usage: "用于批评不合理解释。", example: "你这么解释太牵强附会了，没道理。", synonym: "强词夺理", antonym: "合情合理"},
  {word: "前车之鉴（qián chē zhī jiàn）", explanation: "比喻前人的失败可以作为后人的教训。", usage: "用于警惕他人或自己。", example: "他因贪财锒铛入狱，真是前车之鉴。", synonym: "引以为戒", antonym: "重蹈覆辙"},
  {word: "前倨后恭（qián jù hòu gōng）", explanation: "先傲慢后恭敬，形容人势利。", usage: "批评人态度变化大。", example: "他得知我升职后前倨后恭，真可笑。", synonym: "趋炎附势", antonym: "始终如一"},
  {word: "前仆后继（qián pū hòu jì）", explanation: "前面的倒下，后面的继续冲上去，形容不怕牺牲、英勇奋斗。", usage: "多用于革命、抗争等场合。", example: "烈士们前仆后继，争取国家独立。", synonym: "奋勇当先", antonym: "畏缩不前"}
];



let current = 0;
const card = document.getElementById('idiom-card');

function render() {
  const i = idioms[current];
  card.innerHTML = `
    <h1>${i.word}</h1>
    <p><strong>解释：</strong>${i.explanation}</p>
    <p><strong>用途：</strong>${i.usage}</p>
    <p><strong>例句：</strong>${i.example}</p>
    <p><strong>近义词：</strong>${i.synonym}</p>
    <p><strong>反义词：</strong>${i.antonym}</p>
    <p style="text-align:right;">${current + 1} / ${idioms.length}</p>
  `;
}
function next() {
  if (current < idioms.length - 1) current++;
  render();
}
function prev() {
  if (current > 0) current--;
  render();
}
render();

// Quiz section
let quizIndex = 0;
let correctCount = 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
function generateQuiz() {
  quizIndex++;
  const correct = idioms[Math.floor(Math.random() * idioms.length)];
  const wrong = shuffle(idioms.filter(i => i.word !== correct.word)).slice(0, 3);
  const options = shuffle([correct, ...wrong]);

  document.getElementById('quiz-question').innerHTML = `📘 解释：<strong>${correct.explanation}</strong><br>请选择正确的成语：`;
  const quizOptions = document.getElementById('quiz-options');
  quizOptions.innerHTML = '';

  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.innerText = opt.word;
    btn.style.display = 'block';
    btn.style.margin = '6px 0';
    btn.onclick = () => {
      if (opt.word === correct.word) {
        document.getElementById('quiz-result').innerHTML = "✅ 回答正确！";
        correctCount++;
      } else {
        document.getElementById('quiz-result').innerHTML = `❌ 回答错误，正确答案是：<strong>${correct.word}</strong>`;
      }
      updateProgress();
    };
    quizOptions.appendChild(btn);
  });

  document.getElementById('quiz-result').innerText = "";
}
function nextQuiz() {
  generateQuiz();
}
function updateProgress() {
  document.getElementById('quiz-progress').innerText = `已答：${quizIndex}题，正确：${correctCount}题`;
}
generateQuiz();

