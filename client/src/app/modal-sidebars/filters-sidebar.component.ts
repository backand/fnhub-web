import { Component, Input, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../shared/app.service';
import * as _ from 'lodash';

@Component({
  selector: 'filters-sidebar',
  template: ` 
    <div class="clearfix">
            <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
                <span class="fa fa-times"></span>
              </button>
          </div>
    <div class="sidebar p-a-xs">
    <nav>
    <language-filter [source]="'modal'" (onSelectLanuage)="onSelectLanuage($event)"></language-filter>
    </nav>
    <div class="fixed-bottom p-a b-t text-center" style="border-top: solid 1px #e1e1e1;left:-10px;right:-10px;">
      <button type="button" class="btn btn-primary p-x-lg" (click)="applyFilter()">APPLY</button>
    </div>
    
    </div>`
})
export class FiltersSidebarComponent {
  private selected_languages : string;
  constructor(
    public activeModal: NgbActiveModal,
    private appService: AppService) { }
  /**
   * @description 
   * @memberof FiltersSidebarComponent
   */
  public ngOnInit() {
  }

  onSelectLanuage(l: string) {
    this.selected_languages = l;
  }

  applyFilter():void{
     this.appService.onFilterChange(this.selected_languages);
     this.activeModal.close();
  }

}

