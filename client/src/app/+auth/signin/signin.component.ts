// angular
import { Component } from '@angular/core';
import { BackandService } from '@backand/angular2-sdk';
import {Router } from '@angular/router';

import * as _ from 'lodash';

@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SignInComponent {
  model: any = {};
  error: any;
  constructor(
    private backand: BackandService,
    private router : Router
  ) { }

  public ngOnInit() {
    this.error = '';
  }

  signin() {
    this.error = '';
    this
      .backand
      .signin(this.model.username, this.model.password).then(
      data => {
        console.log(data);
        this.router.navigate(['/']);
      },
      error => {
        console.error(error);
        this.error = _.get(error, 'data.error_description');
      });
  }

}
