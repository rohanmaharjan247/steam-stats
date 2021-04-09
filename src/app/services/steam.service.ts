import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SteamService {
  apiUrl = '';

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.apiUrl = baseUrl;
  }

  test() {
    return this.http.get(`${this.apiUrl}test`);
  }

  getProfile() {
    return this.http.get(`${this.apiUrl}player-profile`, {
      params: new HttpParams().set('steamid', localStorage.getItem('steamId')),
    });
  }

  getProfileStatsSegment(segmentType: string) {
    return this.http.get(`${this.apiUrl}player-profile-segment`, {
      params: new HttpParams()
        .set('steamid', localStorage.getItem('steamId'))
        .set('segment', segmentType),
    });
  }

  login() {
    return this.http.get(`${this.apiUrl}auth/steam`);
  }

  authenticate() {
    return this.http.get(`${this.apiUrl}auth/steam/authenticate`);
  }
}
