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
  private captcha_verify_site_url = 'https://www.google.com/recaptcha/api/siteverify';

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

  private signup() {
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
        this.error = _.get(error, 'data.error_description');
      });
  }

  resolved(captchaResponse: string) {
    this.captchaResponse = captchaResponse;
  }

  validateCaptcha() {
    this.verifyCaptcha()
      .subscribe((result) => {
        console.log('Verify Captcha Response', result);
        if(result.status == '200'){
          this.signup();
        }
      }, (error)=>{
        this.error = "Unable to verify captcha. Please try again";
        this.reCaptcha.reset();
      });
  }

  private verifyCaptcha() {
    return this.http
      .post(this.captcha_verify_site_url, {
        secret: '6LdOyykUAAAAACTuPM1CnAfQY5-ECWrn_0ojCAUO',
        response: this.captchaResponse
      })
      .map((response) => response.json());
  }

}
