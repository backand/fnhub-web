// angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackandService } from '@backand/angular2-sdk';
import * as _ from 'lodash';

@Component({
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.scss']
})
export class ModuleDetailComponent implements OnInit {
  routeEvent: any;
  moduleId: any;
  module: any;

  constructor(private backand: BackandService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.routeEvent = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.moduleId = params['slug'] || '';
        this.getModule();
      });
  }

  ngOnDestroy() {
    this.routeEvent.unsubscribe();
  }

  getModule() {
    this.backand.fn.get("getModule", {
      "id": this.moduleId
    }).then((res: any) => {
      this.module = _.get(res, 'data');
    })
  }


}
