import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SteamLoginComponent } from './steam-login/steam-login.component';
import { SteamProfileComponent } from './steam-profile/steam-profile.component';

const routes: Routes = [
  {
    path: 'login',
    component: SteamLoginComponent,
  },
  {
    path: 'profile',
    component: SteamProfileComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
