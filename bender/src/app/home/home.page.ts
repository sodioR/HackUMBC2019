import { Component } from '@angular/core';
import {NavController} from '@ionic/angular';
import {SearchPage} from '../search/search.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public navCtrl: NavController) {}
}
