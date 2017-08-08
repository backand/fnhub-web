import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { BackandService } from '@backand/angular2-sdk';

import { AppState } from '../app.service';
import { AuthService } from '../shared';
import { HeaderMenuSidebarComponent } from '../modal-sidebars/header-menu-sidebar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  constructor(
    public appState: AppState,
    private backand: BackandService,
    private modalService: NgbModal,
    private auth : AuthService
  ) {
    const route = window.location.pathname;
    this.appState.set('layout', _.startsWith(route, '/auth') ? 'center' : '');
  }
  /**
   * @description 
   * @memberof HeaderComponent
   */
  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }
  /**
   * @description 
   * @memberof HeaderComponent
   */
  open() {
    const modalRef = this.modalService.open(HeaderMenuSidebarComponent, {
      windowClass: 'right dark',
      container: '.app-header'
    });
  }
}
