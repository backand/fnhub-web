import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackandService } from '@backand/angular2-sdk';
import * as _ from 'lodash';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLargeDirective } from './x-large';

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

  constructor(
    private backand: BackandService,
    private route: ActivatedRoute
  ){}

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
      this.modules = _.get(res, 'data');
    })
  }
}
