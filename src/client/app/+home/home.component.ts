// angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackandService } from '@backand/angular2-sdk';
import * as _ from 'lodash';
@Component({
  styleUrls: ['home.component.scss'],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  searchQuery: string;
  routeEvent: any;
  modules: any = [];

  constructor(private backand: BackandService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.routeEvent = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.searchQuery = params['q'] || '';
        this.searchModules();
      });
  }

  ngOnDestroy(): void {
    this.routeEvent.unsubscribe();
  }

  searchModules(): void {
    this.backand.fn.get("keywordsSearch", {
      "q": this.searchQuery
    }).then((res: any) => {
      this.modules = _.get(res, 'data.data');
    })
  }


}
