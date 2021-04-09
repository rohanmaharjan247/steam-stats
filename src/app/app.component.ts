import { Component, OnInit } from '@angular/core';
import { SteamService } from './services/steam.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'steam-stats';
  constructor(private _steamService: SteamService){

  }

  ngOnInit(){
    this._steamService.test().subscribe((data:any)=>{
      console.log(data);
    })
  } 
}
