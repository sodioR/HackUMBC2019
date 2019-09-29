import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SearchResults} from './models/search-results';
import {Venue} from './models/venue';

@Injectable({
  providedIn: 'root'
})
export class FoursquareService {
  constructor(private http: HttpClient) { }

  private clientId = '';
  private clientSecret = '';

  public queryLocations(latlon: string, radius: number, keywords: string = null) {
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
    return this.http.get<SearchResults>(urlString);
  }

  public getMenu(venueId: string) {
    return this.http.get(`https://api.foursquare.com/v2/venues/${venueId}/menu`
        + `?client_id=${this.clientId}&client_secret=${this.clientSecret}&v=20190901`);
  }

  public getRestaurants(latlon: string, radius: number, keywords: string = null) {
    return this.queryLocations(latlon, radius, keywords)
        /*.subscribe(searchResults => {
      console.log('Got new search result:', searchResults.response.venues);
      return searchResults.response.venues as Venue[];
    })*/;
  }

  public getAveragePrice(venue: Venue) {
    return this.getMenu(venue.id)/*.subscribe(menuObj => {
      console.log('Got new menu:', menuObj);
      const listPrices = this.findAllNode('prices', menuObj);
      console.log(listPrices);
      const regularPrices = this.findAllNode('price', menuObj);
      console.log(regularPrices);
    })*/;
  }
}
