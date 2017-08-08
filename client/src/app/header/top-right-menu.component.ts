import { Component, Input } from '@angular/core';

import { AuthService } from '../shared';
@Component({
  selector: 'top-right-menu',
  template: `<ul class="nav  {{containerClass}} right-nav">
  <li class="nav-item"  *ngIf="!auth.isAuthorized()">
    <a class="nav-link active" href="/auth/signup">signup</a>
  </li>
  <li class="nav-item" *ngIf="!auth.isAuthorized()">
    <a class="nav-link" href="/auth/signin">login</a>
  </li>
  <li class="nav-item" *ngIf="auth.isAuthorized()">
    <a class="nav-link" href="" (click) = "logout($event)" >logout</a>
  </li>
</ul>`,
})
export class TopRightMenuComponent {
  @Input() containerClass: string;
  
  constructor(public auth: AuthService) { }
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

