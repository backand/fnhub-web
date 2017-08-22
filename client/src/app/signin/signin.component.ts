// angular
import { Component } from '@angular/core';
import { BackandService } from '@backand/angular2-sdk';
import { AppService, AuthService } from '../shared';
import * as _ from 'lodash';
import { BlockUI, NgBlockUI } from 'ng-block-ui';


@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SignInComponent {
  @BlockUI() blockUI: NgBlockUI;
  model: any = {};
  error: any;
  constructor(
    private backand: BackandService,
    public appService: AppService,
    private authService: AuthService
  ) { }

  public ngOnInit() {
    this.error = '';
  }

  signin() {
    this.blockUI.start();
    this.error = '';
    this
      .backand
      .signin(this.model.username, this.model.password).then(
      data => {
        this.authService.setUser();
        if (this.appService.hasGuid()) {
          this.appService.redirect('/module/' + this.appService.module + '/?guid=' + this.appService.guid);
        } else {
          this.appService.redirect('/');
        }
      },
      error => {
        console.error(error);
        this.error = _.get(error, 'data.error_description');
        this.blockUI.stop();
      });
  }

}
