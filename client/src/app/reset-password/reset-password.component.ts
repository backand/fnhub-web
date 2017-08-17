// angular
import { Component } from '@angular/core';
import { BackandService } from '@backand/angular2-sdk';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService, AuthService } from '../shared';
import * as _ from 'lodash';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  @BlockUI() blockUI: NgBlockUI;
  model: any = {};
  error: any;
  routeEvent: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private backand: BackandService,
    private appService : AppService,
    private authService: AuthService
  ) { }

  public ngOnInit() {
    this.error = '';
    this.routeEvent = this.route
    .queryParams
    .debounceTime(200)
    .subscribe(params => {
      console.log('Route has changes with - ',params );
      // Defaults to 0 if no query param provided.
      this.model.resetToken = params['token'] || '';
    });
  }

  resetPassword() {
    this.blockUI.start();
    this.error = '';
    this.backand.resetPassword(this.model.password, this.model.resetToken)
    .then(data => {
        this.appService.redirect('/auth/signin');
        this.blockUI.stop();
      },
      error => {
        console.error(error);
        this.error = _.get(error, 'data.error_description') || _.get(error, 'data');
        this.blockUI.stop();
      });
  }
}
