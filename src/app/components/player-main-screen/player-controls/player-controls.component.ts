import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlayerControls} from "../player-main-screen.component";

@Component({
  selector: 'app-player-controls',
  templateUrl: './player-controls.component.html',
  styleUrls: ['./player-controls.component.scss']
})
export class PlayerControlsComponent implements OnInit {
  @Output() control = new EventEmitter<PlayerControls>();
  @Input()  timePassed:number = 0;
  @Input()  timeDuration:number = 10;
  @Input()  fileName?:string = '';
  @Input()  isPlaying:boolean = true;
  @Input()  isHide:boolean = false;
  @Input()  isPinned:boolean = false;
  public PlayerControls = PlayerControls;

  constructor() { }

  ngOnInit(): void {
  }

  public playerControl(pc: PlayerControls) {
    this.control.next(pc);
  }

}
