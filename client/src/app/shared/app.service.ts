import { Injectable } from '@angular/core';

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
  constructor() { }
  /**
   * @description returns languages
   * @returns Array
   * @memberof AppService
   */
  public getLanguages() {
    return this.languages;
  }

}