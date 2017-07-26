// angular
import { Component } from '@angular/core';
import { BackandService } from '@backand/angular2-sdk';
import { AppService} from '../shared/app.service';
import * as _ from 'lodash';


export interface User {
  fullName: string;
  email: string;
  password: string;
}

@Component({
  selector : 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  public model: User;
  public error: any;

  constructor(
    private backand: BackandService,
    private appService : AppService
  ) { }

  public ngOnInit() {
    this.error = '';
    this.model = {
      fullName: '',
      email: '',
      password: ''
    };
  }

  signup() {
    this.error = '';
    this.backand
      .signup(
      this.model.fullName,
      'last',
      this.model.email,
      this.model.password,
      this.model.password,
      {
        fullName: this.model.fullName
      }).then(
      data => {
        console.log(data);
        this.appService.redirect('/');
      },
      error => {
        console.error(error);
        this.error = _.get(error, 'data.error_description');
      });
  }
}
