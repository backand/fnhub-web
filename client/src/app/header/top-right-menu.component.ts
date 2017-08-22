import { Component, Input } from '@angular/core';

import { AuthService , AppService} from '../shared';

@Component({
  selector: 'top-right-menu',
  template: `<ul class="nav nav-pills {{containerClass}} right-nav">
   <li class="nav-item" *ngIf="!auth.isAuthorized()">
    <a class="nav-link" href="{{appService.getSigninUrl()}}">login</a>
  </li>
  <li class="nav-item"  *ngIf="!auth.isAuthorized()">
    <a class="nav-link active" href="{{appService.getSignupUrl()}}">signup</a>
  </li>
  <li class="nav-item" *ngIf="auth.isAuthorized()">
    <a class="nav-link" href="/users/{{auth.user.username}}">{{auth.user.username}}</a>
  </li>
  <li class="nav-item" *ngIf="auth.isAuthorized()">
    <a class="nav-link" href="" (click) = "logout($event)" >logout</a>
  </li>
</ul>`,
})
export class TopRightMenuComponent {
  @Input() containerClass: string;
  
  constructor(public auth: AuthService, public appService : AppService) { }
  /**
   * @description 
   * @memberof TopRightMenuComponent
   */
  public ngOnInit() { 
   
  }
  
  logout() {
    this.auth.logout();
  }
}

