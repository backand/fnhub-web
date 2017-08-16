// angular
import { Component } from '@angular/core';
import { BackandService } from '@backand/angular2-sdk';
import { AppService} from '../shared/app.service';
import * as _ from 'lodash';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector : 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SignInComponent {
  @BlockUI() blockUI: NgBlockUI;
  model: any = {};
  error: any;
  constructor(
    private backand: BackandService,
    private appService : AppService
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
        console.log(data);
        this.appService.redirect('/');
        this.blockUI.stop();
      },
      error => {
        console.error(error);
        this.error = _.get(error, 'data.error_description');
        this.blockUI.stop();
      });
  }

}
