import { Component, OnInit } from '@angular/core';
import {Venue} from '../models/venue';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
  public venues: Venue[];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.venues = this.router.getCurrentNavigation().extras.state.venues;
      }
    });
  }

  ngOnInit(): void { }
}
