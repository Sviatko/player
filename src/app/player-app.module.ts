import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PlayerRoutingModule } from './player-routing.module';
import { PlayerComponent } from './player.component';
import { PlayerControlsComponent } from './components/player-main-screen/player-controls/player-controls.component';
import { PlayerMainScreenComponent } from './components/player-main-screen/player-main-screen.component';
import {HttpClientModule} from "@angular/common/http";
import { PlayerImagesComponent } from './components/player-main-screen/player-images/player-images.component';
import { PlayerVideoComponent } from './components/player-main-screen/player-video/player-video.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import { PlayerHomeComponent } from './components/player-home/player-home.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    PlayerComponent,
    PlayerControlsComponent,
    PlayerMainScreenComponent,
    PlayerImagesComponent,
    PlayerVideoComponent,
    PlayerHomeComponent
  ],
  imports: [
    BrowserModule,
    PlayerRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [PlayerComponent]
})
export class PlayerAppModule { }
