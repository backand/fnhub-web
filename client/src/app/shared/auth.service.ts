import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { BackandService } from '@backand/angular2-sdk';

@Injectable()
export class AuthService {
  private user;
  private prefix = 'BACKAND';
  private delimiter = '__________';

  constructor(private backand: BackandService) {
    /*
    var key = "user";
    console.log(`${this.prefix}_${key}`);
    let item = localStorage.getItem(`${this.prefix}_${key}`);
    if (!item) {
      //return item
    }
    else {
      let [type, val] = item.split(this.delimiter);
      if (type != 'JSON') {
        item = val;
      }
      else {
        item = JSON.parse(val);
      }
    }*/
  }

  /**
   * Check, if user already authorized.
   * @description Should return Observable with true or false values
   * @returns {boolean}
   * @memberOf AuthService
   */
  public isAuthorized() {
    let token_type: string = <string>_.get(this.user, 'token_type');
    if (token_type == 'AnonymousToken' || !token_type) {
      return false;
    } else {
      return true
    }
  }

  /**
   * Get access token
   * @description Should return access token in Observable from e.g.
   * localStorage
   * @returns {Observable<string>}
   */
  public getAccessToken(): Observable<string> {
    return;
  }

  /**
  * logout
  * @description logout current user , set useAnonymousAuth, and reload page
  * @returns void
  * @memberOf AuthService
  */
  public logout(): void {
    this.backand.signout();
    this.backand.useAnonymousAuth();
    this.clear();
    location.reload(true);
  }

  /**
    * setUser
    * @description set current User to localStorage
    * @returns void
    * @memberOf AuthService
    */
  public setUser(): void {
    this.backand.user.getUserDetails()
      .then(res => {
        this.user = res.data;
      })
      .catch(err => {
        this.user = null;
      });
  }

  /**
   * setUser
   * @description set current User to localStorage
   * @returns void
   * @memberOf AuthService
   */
  public getUser(user: any): void {
    return this.user;
  }


  /**
  * clear localStorage
  */
  private clear() {
  }

}
