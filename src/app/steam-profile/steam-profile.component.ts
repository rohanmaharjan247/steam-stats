import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SteamService } from '../services/steam.service';

@Component({
  selector: 'app-steam-profile',
  templateUrl: './steam-profile.component.html',
  styleUrls: ['./steam-profile.component.css'],
})
export class SteamProfileComponent implements OnInit {
  stats: any;
  platformInfo: any;

  weaponStats: any;
  mapStats: any;

  page = 1;
  pageMap = 1;
  pageSize = 10;
  pageSizeMap = 10;
  constructor(
    private _steamService: SteamService,
    private avRouter: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {
    this.avRouter.queryParams.subscribe((data: any) => {
      if (data != undefined && data != null && Object.keys(data).length > 0) {
        if (localStorage.getItem('steamId') == undefined)
          localStorage.setItem('steamId', data.steamid);
      } else this.router.navigate(['/login']);
    });
  }

  ngOnInit(): void {
    this.getPlayerProfile();
    this.getProfileSegment();
  }

  authenticate() {
    this._steamService.authenticate().subscribe((data: any) => {
      console.log('authenticated');
    });
  }

  getPlayerProfile() {
    this._steamService.getProfile().subscribe((data: any) => {
      console.log('Player profile', data);
      this.stats = data.data.segments[0].stats;
      this.platformInfo = data.data.platformInfo;
      this.title.setTitle(
        `${this.platformInfo.platformUserHandle}'s Profile - CSGO Stats`
      );
      console.log(this.stats, 'stats');
    });
  }

  getProfileSegment() {
    this._steamService
      .getProfileStatsSegment('weapon')
      .subscribe((data: any) => {
        console.log('player segment', data);
        this.weaponStats = data.data;
      });
      this._steamService.getProfileStatsSegment('map').subscribe((data:any)=>{
        console.log('player map segment', data);
        this.mapStats = data.data;
      })
  }

  logout(){
    localStorage.removeItem('steamId');
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  checkKeys(key: string) {
    switch (key.toLowerCase()) {
      case 'wlpercentage':
      case 'timeplayed':
      case 'matchesplayed':
      case 'kd':
      case 'kills':
      case 'mvp':
      case 'wins':
        return false;
      default:
        return true;
    }
  }

  checkOverview(key: string) {
    switch (key.toLowerCase()) {
      case 'wlpercentage':
      case 'timeplayed':
      case 'matchesplayed':
      case 'kd':
      case 'kills':
      case 'mvp':
      case 'wins':
        return true;
      default:
        return false;
    }
  }

  getStatsKeys() {
    console.log(this.stats);
    let statKeys = Object.keys(this.stats[0].stats);
    console.log(statKeys);
  }
}
