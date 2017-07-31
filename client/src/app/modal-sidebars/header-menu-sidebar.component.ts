import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'header-menu-sidebar',
  template: `<div class="clearfix">
              <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
                  <span class="fa fa-times"></span>
                </button>
            </div>
            <div class="clearfix">
              <top-right-menu [containerClass]="'flex-column'"></top-right-menu>
              <div class="dropdown-divider"></div>
              <top-menu [containerClass]="'flex-column'"></top-menu>
            </div>`
})
export class HeaderMenuSidebarComponent {

  constructor(public activeModal: NgbActiveModal) { }
  /**
   * @description 
   * @memberof HeaderMenuSidebarComponent
   */
  public ngOnInit() { }
}

