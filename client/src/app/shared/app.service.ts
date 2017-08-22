import { Injectable } from '@angular/core';
import { BackandService } from '@backand/angular2-sdk';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
@Injectable()
export class AppService {
  module: string;
  guid: string;
  signinUrl: string = '/auth/signin';
  signupUrl: string = '/auth/signup';
  private filterEmmiter = new Subject<any>();
  filterEmmiter$ = this.filterEmmiter.asObservable();
  //Array of languages in which module is used.
  private languages: Array<object> =
  [{
    id: 1,
    name: 'JavaScript',
    key: 'javascript'
  },
  {
    id: 2,
    name: 'PHP',
    key: 'php'
  },
  {
    id: 3,
    name: 'Python',
    key: 'python'
  },
  {
    id: 4,
    name: 'Java',
    key: 'java'
  }, {
    id: 5,
    name: 'Node',
    key: 'node'
  }];

  /**
   * Creates an instance of AppService.
   * @memberof AppService
   */
  constructor(private backand: BackandService, private route: ActivatedRoute) {
    this.backand.init({
      appName: 'funhub',
      anonymousToken: 'f10673bb-d12a-4245-8eca-312add606059',
      signUpToken: 'ccf8dfb2-1d5e-4f23-98c3-ae5bef9a2971'
    });
    this.route
      .queryParams
      .debounceTime(200)
      .subscribe(params => {
        console.log('Check route for guid & module', params);
        this.guid = params['guid'] || '';
        this.module = params['module'] || '';
        if (this.guid && this.module) {
          let query = '/?module=' + this.module + '&guid=' + this.guid;
          this.signinUrl = this.signinUrl + query;
          this.signupUrl = this.signupUrl + query;
        }
      });

  }

  /**
   * 
   * @param filter 
   */
  onFilterChange(filter: any): void {
    this.filterEmmiter.next(filter);
  }

  /**
   * @description returns languages
   * @returns Array
   * @memberof AppService
   */
  public getLanguages() {
    return this.languages;
  }
  /**
   * @function redirect
   * @description redirects to URL either internal or external
   * @param url 
   */
  public redirect(url: string) {
    window.location.href = url;
    return false;
  }

  /**
   * @function hasGuid
   * @description check if guid & module exists in url. if both are present and loggedIn then redirect to module page
   * @memberof AppService
   * 
   * @returns Boolean
   */
  public hasGuid() {
    return this.module && this.guid;
  }

  /**
   * @description 
   * @returns 
   * @memberof AppService
   */
  public getSigninUrl(){
    return this.signinUrl;
  }
  /**
   * @description 
   * @returns 
   * @memberof AppService
   */
  public getSignupUrl(){
    return this.signupUrl;
  }

}