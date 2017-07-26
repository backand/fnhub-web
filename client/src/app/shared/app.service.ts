import { Injectable } from '@angular/core';
import { BackandService } from '@backand/angular2-sdk';
@Injectable()
export class AppService {
  //Array of languages in which module is used.
  private languages: Array<object> = [{
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
    id: 3,
    name: 'Java',
    key: 'java'
  }];

  /**
   * Creates an instance of AppService.
   * @memberof AppService
   */
  constructor(
    private backand: BackandService
  ) {
    this.backand.init({
      appName: 'funhub',
      anonymousToken: 'f10673bb-d12a-4245-8eca-312add606059',
      signUpToken: 'ccf8dfb2-1d5e-4f23-98c3-ae5bef9a2971'
    });
  }
  /**
   * @description returns languages
   * @returns Array
   * @memberof AppService
   */
  public getLanguages() {
    return this.languages;
  }

  public redirect(url: string) {
    window.location.href = url;
    return false;
  }

}