import { Component } from '@angular/core';
import { AppState } from '../app.service';
import * as _ from 'lodash';
import { BackandService } from '@backand/angular2-sdk';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(
    public appState: AppState,
    private backand: BackandService,
  ) {
    const route = window.location.pathname;
    this.appState.set('layout', _.startsWith(route, '/auth') ? 'center' : '');
  }

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
    this.backand.user.getUserDetails(true)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

}
