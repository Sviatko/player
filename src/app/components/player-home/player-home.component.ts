import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-player-home',
  templateUrl: './player-home.component.html',
  styleUrls: ['./player-home.component.scss']
})
export class PlayerHomeComponent implements OnInit {
  public screenId:string = '0f127773-529f-4ff8-b211-af9e5c22a5bc'

  constructor() { }

  ngOnInit(): void {
  }

  public play(home: NgForm) {

  }
}
