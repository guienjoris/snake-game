import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Food } from '../food/food.component';
import { outsideGrid } from '../grid.utils';
import { Snake } from '../snake/snake.component';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  constructor() {}
  lastRenderTime = 0;
  gameOver = false;
  gameMap: any;
  SNAKE_SPEED = 1;
  snake = new Snake();
  food = new Food(this.snake);
  ngOnInit(): void {
    this.snake.listenToInputs();
  }

  ngAfterViewInit() {
    this.gameMap = document.querySelector('.game-map');
  }

  start(currentTime: any) {
    if (this.gameOver) return console.log('Game Over');

    window.requestAnimationFrame(this.start.bind(this));
    const secondsSinceLastRender = (currentTime - this.lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / this.snakeSpeed) return;
    this.lastRenderTime = currentTime;
    // console.log("rendering");
    this.update();
    this.draw();
  }

  get snakeSpeed() {
    const score = this.food.currentScore;
    if (score < 10) return 4;
    if (score > 10 && score < 15) return 5;
    if (score > 15 && score < 20) return 6;
    return 7;
  }

  dpadMovement(direction: string) {
    this.snake.input.setDirection(direction);
  }

  update() {
    this.snake.update();
    this.food.update();
    this.checkDeath();
  }

  draw() {
    this.gameMap.innerHTML = '';
    this.snake.draw(this.gameMap);
    this.food.draw(this.gameMap);
  }

  checkDeath() {
    this.gameOver =
      outsideGrid(this.snake.getSnakeHead()) || this.snake.snakeIntersection();
    if (!this.gameOver) return;
    this.gameMap.classList.add('blur');
  }

  restart() {
    window.location.reload();
  }
}
