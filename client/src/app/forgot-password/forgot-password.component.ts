// angular
import { Component } from '@angular/core';
import { BackandService } from '@backand/angular2-sdk';
import { AppService, AuthService} from '../shared';
import * as _ from 'lodash';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector : 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  @BlockUI() blockUI: NgBlockUI;
  model: any = {};
  error: any;
  constructor(
    private backand: BackandService,
    private appService : AppService,
    private authService: AuthService
  ) { }

  public ngOnInit() {
    this.error = '';
  }

  requestResetPassword() {
    this.blockUI.start();
    this.error = '';
    this.backand.requestResetPassword(this.model.username)
    .then(data => {
        this.appService.redirect('/');
        this.blockUI.stop();
      },
      error => {
        console.error(error);
        this.error = _.get(error, 'data.error_description') || _.get(error, 'data');
        this.blockUI.stop();
      });
  }
  
}
