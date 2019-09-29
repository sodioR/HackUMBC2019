import {Component, Input, OnInit} from '@angular/core';
import {Venue} from '../../models/venue';
import {FoursquareService} from '../../foursquare.service';
import {retry} from 'rxjs/operators';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.scss'],
})
export class VenueComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  public _venue: Venue;

  public averagePrice = null;

  findValuesHelper(obj, key) {
    let list = [ ];
    if (!obj) { return list; }
    if (obj instanceof Array) {
      // tslint:disable-next-line:forin
      for (const i in obj) {
        list = list.concat(this.findValuesHelper(obj[i], key));
      }
      return list;
    }
    if (obj[key]) { list.push(obj[key]); }

    if ((typeof obj === 'object')) {
      const children = Object.keys(obj);
      if (children.length > 0) {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < children.length; i++) {
          list = list.concat(this.findValuesHelper(obj[children[i]], key));
        }
      }
    }
    return list;
  }

  @Input() set venue(v: Venue) {
    this._venue = v;
    this.averagePrice = null;
    this.foursquare.getMenu(v.id).pipe(retry(2)).subscribe(resp => {
      console.log('Got new menu:', resp);
      const listPrices = this.findValuesHelper(resp, 'prices');
      console.log(listPrices);
      const regularPrices = this.findValuesHelper(resp, 'price');
      console.log(regularPrices);

      let totalPrice = 0;
      let numPrices = 0;

      for (const price of regularPrices) {
        numPrices++;
        totalPrice += +price;
      }

      for (const prices of listPrices) {
        for (const price of prices) {
          numPrices++;
          totalPrice += +price;
        }
      }

      this.averagePrice = totalPrice / numPrices;
    });
  }

  constructor(private foursquare: FoursquareService) { }

  ngOnInit() {}
}
