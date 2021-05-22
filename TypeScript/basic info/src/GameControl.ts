import Food from './Food'
import Snake from './Snake'
import ScorePanel from './Score'

export default class GameControl {
  snake: Snake
  scorePanel: ScorePanel
  food: Food
  direction: string = 'ArrowRight'

  constructor() {
    this.snake = new Snake()
    this.scorePanel = new ScorePanel()
    this.food = new Food()

    this.init()
  }

  init() {
    document.addEventListener('keydown', this.keydownHandler)
    // this.run()
  }
  testFun():void {
    console.log(123123)
  }
  keydownHandler(event: KeyboardEvent) {
    console.log('llllllllllll')
    this.direction = event.key
    this.testFun()
  }
  
  run() {
    let X:number = this.snake.getX()
    let Y:number = this.snake.getY()
    switch (this.direction) {
      
      case "ArrowUp":
        Y -= 10
        break
      case "ArrowDown":
        Y += 10
        break
      case "ArrowLeft":
        X -= 10
        break
      case "ArrowRight":
        X += 10
        break
    }
    this.snake.setX(X)
    this.snake.setY(Y)
    setTimeout(this.run.bind(this), 300)
  }
}