import {Component, EventEmitter, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Media, MediaService} from "../../providers/media-service.service";
import {OnsignageMediaServiceService} from "../../providers/onsignage-media-service.service";
import {first, interval, Subscription} from "rxjs";
import {PlayerVideoComponent} from "./player-video/player-video.component";

@Component({
  selector: 'app-player-main-screen',
  templateUrl: './player-main-screen.component.html',
  styleUrls: ['./player-main-screen.component.scss'],
  providers: [{provide: MediaService, useExisting: OnsignageMediaServiceService}]
})
export class PlayerMainScreenComponent implements OnInit {
  @Output() playingStopped = new EventEmitter<boolean>();
  @ViewChildren(PlayerVideoComponent) players: QueryList<PlayerVideoComponent>;
  PlayerControls = PlayerControls
  DEFAULT_CONTROLS_TIMEOUT = 2000 //sec
  public screenId: string = '';
  public playlist: Media[] = [];
  public isLoaded = false;
  public activeSlide = -1;
  public isPlayingNow = true;
  public currentVideoState: PlayerControls = PlayerControls.stop;
  public currentTimeMarker = 0;
  public currentSlideDuration = 0;
  public intervalSubscribe!: Subscription;
  public isPlayerControlsHidden = false;
  public isPlayerControlsPinned = false;
  private hidingControlsTimeout?: number;
  private elem: any;

  constructor(private route: ActivatedRoute,
              private mediaService: OnsignageMediaServiceService,
              private router: Router) {
  }

  ngOnInit() {
    this.screenId = this.route.snapshot.paramMap.get('id')!;
    this.elem = document.documentElement;
    this.getList();
  }

  private getList() {
    this.mediaService.getPlaylist(this.screenId).pipe(first()).subscribe(list => {
      this.isLoaded = true;
      if (list.length) {
       if(!this.checkNewList(list)) {
         console.log('got new list')
         if (this.intervalSubscribe) {this.intervalSubscribe.unsubscribe();}
         this.setNextSlide();
         this.showNextSlide()
       }
      }
    });
  }

  private checkNewList(list: Media[]): boolean {
    let isEqual = true;
    if (list.length != this.playlist.length) {
      isEqual = false
    } else {
      for (let i = 0; i < list.length; i++) {
        if (!this.isMediaEqual(list[i], this.playlist[i])) {
          isEqual = false;
          break;
        }
      }
    }
    if (!isEqual) {
      this.playlist = list;
      this.activeSlide = 0;
    }
    return isEqual;
  }

  public trackMedia(index: number, media: Media) {
    return media.name+media.path;
  }

  private isMediaEqual(a: Media, b: Media): boolean {
    const props1 = Object.getOwnPropertyNames(a);
    const props2 = Object.getOwnPropertyNames(b);

    if (props1.length !== props2.length) {
      return false;
    }
    for (let i = 0; i < props1.length; i += 1) {
      const prop = props1[i];
      // @ts-ignore
      if (a[prop] !== b[prop]) {
        return false;
      }
    }
    return true;
  }

  private showNextSlide() {
    this.currentSlideDuration = this.playlist[this.activeSlide].duration;
    this.intervalSubscribe = interval(1000).subscribe(() => {
      if (this.currentVideoState == PlayerControls.play) {
        this.currentTimeMarker++
        if (this.currentTimeMarker > this.currentSlideDuration) {
          this.setNextSlide();
          this.intervalSubscribe.unsubscribe();
          this.showNextSlide();
          this.hideControls();
        }
      }
    })
  }

  private setNextSlide(previous?: boolean) {
    this.currentTimeMarker = 0;
    if (previous) {
      this.activeSlide = this.activeSlide > 0 ? this.activeSlide - 1 : this.playlist.length - 1;
    } else {
      if (this.activeSlide < (this.playlist.length - 1)){
        this.activeSlide += 1;
      } else {
        this.activeSlide = 0;
        this.getList();
      }
      this.activeSlide = this.activeSlide < (this.playlist.length - 1) ? this.activeSlide + 1 : 0;
    }
    this.currentSlideDuration = this.playlist[this.activeSlide].duration;
    this.currentVideoState = PlayerControls.play;

  }

  public playerControls(playerControls: PlayerControls) {
    switch (playerControls) {
      case PlayerControls.play:
        this.playPausePlaying();
        this.currentVideoState = this.currentVideoState == PlayerControls.play ? PlayerControls.pause : PlayerControls.play;
        break;
      case PlayerControls.stop:
        this.stopPlaying();
        this.currentVideoState = PlayerControls.stop;
        break;
      case PlayerControls.next:
        this.previousNextPlaying(false);
        this.currentVideoState = PlayerControls.play;
        break;
      case PlayerControls.previous:
        this.previousNextPlaying(true);
        this.currentVideoState = PlayerControls.play;
        break;
      case PlayerControls.pin:
        this.isPlayerControlsPinned = !this.isPlayerControlsPinned;
        clearTimeout(this.hidingControlsTimeout);
        break;
      case PlayerControls.close:
        this.router.navigate(['/home']);
        break;
      case PlayerControls.fullScreen:
        this.openFullscreen();
        break;
    }
    this.players.forEach(player => player.videoPlayControl(this.currentVideoState))
  }

  public stopPlaying() {
    this.intervalSubscribe.unsubscribe();
    this.currentVideoState = PlayerControls.stop;
    this.currentTimeMarker = 0;
    this.playingStopped.next(true);
  }

  public playPausePlaying() {
  }

  public previousNextPlaying(playPrevious: boolean) {
    this.intervalSubscribe.unsubscribe();
    this.setNextSlide(playPrevious);
    this.showNextSlide();
  }

  public keyDown(event: KeyboardEvent) {
    if (event.key == ' ') {
      this.playerControls(PlayerControls.play);
    }
  }

  public mousemove() {
    this.isPlayerControlsHidden = false;
    this.hideControls()
  }

  private hideControls() {
    clearTimeout(this.hidingControlsTimeout);
    if (!this.isPlayerControlsPinned) {
      this.hidingControlsTimeout = setTimeout(() => {
        this.isPlayerControlsHidden = true;
      }, this.DEFAULT_CONTROLS_TIMEOUT)
    }
  }

  private openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }

}

export enum PlayerControls {
  play = 'play',
  pause = 'pause',
  stop = 'stop',
  next = 'next',
  previous = 'previous',
  pin = 'pin',
  fullScreen = 'fullScreen',
  close = 'close'
}
