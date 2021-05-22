// 定义食物
export default class Food {
  // 定义属性表示事物所对应的元素是
  element: HTMLElement

  constructor() {
    this.element = document.getElementById('food')!;
  }

  // 获取坐标
  getX() {
    return this.element.offsetLeft
  }
  getY() {
    return this.element.offsetTop
  }

  // 修改位置
  change() {
    let top = Math.round(Math.random() * 29) * 10
    let left = Math.round(Math.random() * 29) * 10
    this.element.style.left = left + 'px'
    this.element.style.top = top + 'px'
  }

}

