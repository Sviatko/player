import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlayerMainScreenComponent} from "./components/player-main-screen/player-main-screen.component";
import {PlayerHomeComponent} from "./components/player-home/player-home.component";

const routes: Routes = [

  {
    path: 'screen/:id',
    component: PlayerMainScreenComponent
  },
  {
    path: 'home',
    component: PlayerHomeComponent
  },
  {
    path: '',
    redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule { }
