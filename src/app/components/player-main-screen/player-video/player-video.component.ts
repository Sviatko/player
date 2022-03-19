import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {PlayerControls} from "../player-main-screen.component";

@Component({
  selector: 'app-player-video',
  templateUrl: './player-video.component.html',
  styleUrls: ['./player-video.component.scss']
})
export class PlayerVideoComponent implements OnInit, OnChanges {

  @Input() source?: string;
  @Input() isActive: boolean = false;
  public PlayerControls: PlayerControls;
  private isStopped:boolean = true;

  @ViewChild('videoPlayer')
  videoPlayer?: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes:SimpleChanges) {
    if (changes){
      if (changes['isActive'].currentValue){
        this.isStopped = false;
        this.videoPlayControl(PlayerControls.play)
      } else {
        this.isStopped = true;
        this.videoPlayControl(PlayerControls.stop)
      }
    }
   }

  public videoPlayControl(control: PlayerControls){
      switch (control) {
        case PlayerControls.play:
          if (this.isStopped) {
            if (this.isActive) this.videoPlayer?.nativeElement.load();
          }
          if (this.isActive) this.videoPlayer?.nativeElement.play();
          break;
        case PlayerControls.pause:
          this.isStopped = false;
          if (this.isActive) this.videoPlayer?.nativeElement.pause();
          break;
        case PlayerControls.stop:
          this.isStopped = true;
          this.videoPlayer?.nativeElement.pause();
          break;
    }
  }

}
