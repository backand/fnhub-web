import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackandService } from '@backand/angular2-sdk';
import * as _ from 'lodash';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLargeDirective } from './x-large';

import { AppService } from '../shared/app.service';

@Component({
  /**
   * The selector is what angular internally uses
   * for `document.querySelectorAll(selector)` in our index.html
   * where, in this case, selector is the string 'home'.
   */
  selector: 'home',  // <home></home>
  /**
   * We need to tell Angular's Dependency Injection which providers are in our app.
   */
  providers: [
    Title
  ],
  /**
   * Our list of styles in our component. We may add more to compose many styles together.
   */
  styleUrls: ['./home.component.scss'],
  /**
   * Every Angular template is first compiled by the browser before Angular runs it's compiler.
   */
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  searchQuery: string;
  routeEvent: any;
  modules: any = [];
  selected_languages: any = [];
  languages: any = [];


  constructor(
    private router: Router,
    private backand: BackandService,
    private route: ActivatedRoute,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.languages = this.appService.getLanguages();
    this.routeEvent = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.searchQuery = params['q'] || '';
        let l = params['l'] || '';
        if(l){
          this.selected_languages = l.split(",");
        }
        this.searchModules();
      });
  }

  ngOnDestroy(): void {
    this.routeEvent.unsubscribe();
  }

  selectLanguage(l: string, event): void {
    event.preventDefault();
    var index = _.findIndex(this.selected_languages, (o: any) => { return _.lowerCase(o) == _.lowerCase(l); });
    if(index >=0){
      this.selected_languages.splice(index, 1);
    }else{
      this.selected_languages.push(l);
    }
    
    this.selected_languages = _.uniq(this.selected_languages);
    this.setSelectedLanguage(l);

    let ls = _.cloneDeep(this.selected_languages);
    ls = ls.join(',');
    this.router.navigate(['/'], { queryParams: { l: ls, q: this.searchQuery } });
  }

  searchModules(): void {
    this.backand.fn.post("keywordsSearch", {
      "q": this.searchQuery,
      "languages": this.selected_languages
    }).then((res: any) => {
      this.modules = _.get(res, 'data');
    })
  }

  private setSelectedLanguage(sl: string) {
    this.languages = _.map(this.languages, (l: any) => {
      var index = _.findIndex(this.selected_languages, (o: any) => { return _.lowerCase(o) == _.lowerCase(l.key); });
      l.selected = index >= 0 ? true : false;
      return l;
    });
  }
}
