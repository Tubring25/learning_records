
// 记分牌
export default class ScorePanel {
  score: number = 0;
  level: number = 1;
  scoreEle: HTMLElement;
  levelEle: HTMLElement;
  // 限制等级
  maxLevel: number
  upScore: number

  constructor(maxlevel: number = 10, upScore: number = 10) {
    this.scoreEle = document.getElementById('score')!
    this.levelEle = document.getElementById('level')!
    this.maxLevel = maxlevel
    this.upScore = upScore
  }

  // 设置加分方法
  addScore () {
    // 分数自增
    this.scoreEle.innerHTML = ++this.score + ''
    if(this.score % this.upScore === 0) {
      this.levelUp()
    }
  }


  // 等级提升
  levelUp() {
    if(this.level < this.maxLevel ) {
      this.levelEle.innerHTML = ++this.level + ''
    }
  }
}
