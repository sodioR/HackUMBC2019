import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoursquareService {
  constructor(private http: HttpClient) { }

  clientId = '';
  clientSecret = '';

  queryLocations(latlon: string, radius: number, keywords: string = null) {
    console.log('query locations called... querying foursquare');
    let urlString;
    if (keywords !== null) {
      urlString = 'https://api.foursquare.com/v2/venues/search'
          + `?client_id=${this.clientId}&client_secret=${this.clientSecret}&v=20190901&categoryId=4d4b7105d754a06374d81259`
          + `&ll=${latlon}&radius=${radius}&query=${keywords}`;
    } else {
      urlString = 'https://api.foursquare.com/v2/venues/search'
          + `?client_id=${this.clientId}&client_secret=${this.clientSecret}&v=20190901&categoryId=4d4b7105d754a06374d81259`
          + `&ll=${latlon}&radius=${radius}`;
    }
    return this.http.get(urlString);
  }

  getMenu(venueId: string) {
    return this.http.get(`https://api.foursquare.com/v2/venues/${venueId}/menu`
        + `?client_id=${this.clientId}&client_secret=${this.clientSecret}&v=20190901`);
  }
}
