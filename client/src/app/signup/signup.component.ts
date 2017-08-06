// angular
import { Component, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { BackandService } from '@backand/angular2-sdk';
import { AppService } from '../shared/app.service';
import * as _ from 'lodash';
import { RecaptchaComponent } from 'ng-recaptcha';


export interface User {
  fullName: string;
  email: string;
  password: string;
}

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  @ViewChild(RecaptchaComponent) reCaptcha: RecaptchaComponent;
  public model: User;
  public error: any;
  public captchaResponse: any;

  constructor(
    private backand: BackandService,
    private appService: AppService,
    private http: Http
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
        fullName: this.model.fullName,
        code: this.captchaResponse
      }).then(
      data => {
        console.log(data);
        this.appService.redirect('/');
      },
      error => {
        this.error = _.get(error, 'data.error_description');
      });
  }

  resolved(captchaResponse: string) {
    this.captchaResponse = captchaResponse;
  }

}
