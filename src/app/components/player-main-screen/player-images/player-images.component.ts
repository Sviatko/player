import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-player-images',
  templateUrl: './player-images.component.html',
  styleUrls: ['./player-images.component.scss']
})
export class PlayerImagesComponent implements OnInit {
  @Input() source?: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
