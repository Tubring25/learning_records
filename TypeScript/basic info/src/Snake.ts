export default class Snake {
  head: HTMLElement
  bodies: HTMLCollection
  element: HTMLElement

  constructor() {
    this.element = document.getElementById('snake')!
    this.head = document.querySelector('#snake>div') as HTMLElement
    this.bodies = document.getElementById('snake')!.getElementsByTagName('div')
  }
  getX():number {
    return this.head.offsetLeft
  }
  getY():number {
    return this.head.offsetTop
  }

  setX(value: number) {
    this.head.style.left = value + 'px'
  }
  setY(value: number) {
    this.head.style.top = value + 'px'
  }

  // 蛇增加身体
  addBody(){
    this.element.insertAdjacentHTML("beforeend", `<div></div>`)
  }
}