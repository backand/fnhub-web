// angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackandService } from '@backand/angular2-sdk';
import * as _ from 'lodash';

import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


import { AppService } from '../../shared/app.service';

@Component({
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.scss']
})
export class ModuleDetailComponent implements OnInit {
  routeEvent: any;
  moduleName: string;
  module: any = {
    keywords: []
  };
  module_detail: string;
  moduleAuthor: object = {};
  languages: Array<Object> = [];

  constructor(private backand: BackandService,
    private route: ActivatedRoute,
    private appService: AppService,
    private http: Http) {
  }

  ngOnInit(): void {
    this.languages = _.clone(this.appService.getLanguages());
    this.routeEvent = this.route.params.subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.moduleName = params['slug'] || '';
      this.getModule();
    });
  }

  ngOnDestroy() {
    this.routeEvent.unsubscribe();
  }

  private getModule(): void {

    this.http.get(`http://localhost:8000/api/module/${this.moduleName}`)
      .map(response => response.json())
      .subscribe(res => {
        this.module = _.get(res, 'data.data[0]');
        if (this.module.githubRepo) {
          let readmeUri = _.replace(this.module.githubRepo, /github.com/gi, 'raw.githubusercontent.com') + '/master/README.md';
          this.readMDfile(readmeUri);
        } else {
          this.module_detail = 'No description found';
        }
        this.moduleAuthor = _.get(res, 'data.relatedObjects.users.' + this.module.creator);
        this.setSelectedLanguages(this.module.language);

        this.module.keywords = this.transformKeywords(this.module.keywords);
      });

  }

  private readMDfile(mdFileUri: string): void {
    this.backand.fn.get("mdToHtml", {
      "mdFileUri": mdFileUri //"https://github.com/ivogabe/gulp-typescript/blob/master/readme.md"
    }).then((res: any) => {
      this.module_detail = res.data;
    });
  }

  private setSelectedLanguages(languages: string): void {
    let ls = _.split(languages, ',');
    ls = _.map(ls, _.lowerCase);
    _.forEach(this.languages, (l: any) => {
      if (_.indexOf(ls, l.key) >= 0) {
        l.isSelected = true;
      } else {
        l.isSelected = false;
      }
    })
  }

  private transformKeywords(keywords: string) {
    let ls = _.split(keywords, ',');
    return ls || [];
  }


}
