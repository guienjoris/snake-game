import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  lastRenderTime = 0;
  gameOver = false;
  gameBoard: any;
  SNAKE_SPEED = 1;

  constructor() {}

  ngOnInit(): void {}
}
