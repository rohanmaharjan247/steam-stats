import { Component, OnInit } from '@angular/core';
import { SteamService } from '../services/steam.service';

@Component({
  selector: 'app-steam-login',
  templateUrl: './steam-login.component.html',
  styleUrls: ['./steam-login.component.css']
})
export class SteamLoginComponent implements OnInit {

  authUrl = '';

  constructor(private _steamService: SteamService) { }

  ngOnInit(): void {
    this.login();
  }

  login(){
    this._steamService.login().subscribe((data:any)=>{
      console.log(data);
      this.authUrl = data;
    })
  }

}
