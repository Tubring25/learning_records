"use strict";
exports.__esModule = true;
require("./style/index.less");
// 定义食物
var Food = /** @class */ (function () {
    function Food() {
        this.element = document.getElementById('food');
    }
    // 获取坐标
    Food.prototype.getX = function () {
        return this.element.offsetLeft;
    };
    Food.prototype.getY = function () {
        return this.element.offsetTop;
    };
    // 修改位置
    Food.prototype.change = function () {
        var top = Math.round(Math.random() * 29) * 10;
        var left = Math.round(Math.random() * 29) * 10;
        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
    };
    return Food;
}());
var food = new Food();
food.change();
