import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SteamLoginComponent } from './steam-login/steam-login.component';
import { SteamProfileComponent } from './steam-profile/steam-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export function getBaseUrl(){
  return document.getElementsByTagName('base')[0].href;
}

@NgModule({
  declarations: [AppComponent, SteamLoginComponent, SteamProfileComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, NgbModule],
  providers: [{provide: 'BASE_URL', useFactory: getBaseUrl}],
  bootstrap: [AppComponent],
})
export class AppModule {}
