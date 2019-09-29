import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {FoursquareService} from '../foursquare.service';
import {NavigationExtras, Router} from '@angular/router';
import {Venue} from '../models/venue';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(private geolocation: Geolocation, private foursquare: FoursquareService, public navCtrl: Router) { }

  ngOnInit() {
  }

  getLocation() {
    const ll = this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude, resp.coords.longitude);
      const venues = this.foursquare.getRestaurants(`${resp.coords.latitude}, ${resp.coords.longitude}`, 1000).subscribe(searchResults => {
        console.log('Got new search result:', searchResults.response.venues);

        // tslint:disable-next-line:no-shadowed-variable
        const navigationExtras: NavigationExtras = {
          state: { venues: searchResults.response.venues as Venue[],
          budget: 100}
        };

        this.navCtrl.navigateByUrl('results', navigationExtras);
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
}
