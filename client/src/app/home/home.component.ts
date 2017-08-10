import {
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackandService } from '@backand/angular2-sdk';
import * as _ from 'lodash';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaginationInstance } from 'ngx-pagination';

import { AppState } from '../app.service';
import { Title } from './title';
import { FiltersSidebarComponent } from '../modal-sidebars/filters-sidebar.component';

import { AppService } from '../shared/app.service';
import { Constants } from '../app.constants';

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
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class HomeComponent implements OnInit {
  searchQuery: string;
  routeEvent: any;
  modules: any = [];
  selected_languages: string;
  filter: any;
  isLoading: boolean;
  public pager: PaginationInstance = {
    itemsPerPage: Constants.RECORD_PER_PAGE,
    currentPage: 1,
    totalItems: Constants.RECORD_PER_PAGE
  };

  constructor(
    private router: Router,
    private backand: BackandService,
    private route: ActivatedRoute,
    private appService: AppService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.routeEvent = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.searchQuery = params['q'] || '';
        this.searchModules(1);
      });

    this.filter = this.appService.filterEmmiter$.subscribe(filter => {
      console.warn('selected_languages', filter);
      this.selected_languages = filter;
      let lng = _.isArray(filter) ? filter.join(',') : (_.isString(filter) ? filter : '');
      this.router.navigate(['/'], { queryParams: { l: lng, q: this.searchQuery } });
    });

  }

  ngOnDestroy(): void {
    // if (!!this.filter) this.filter.unsubscribe();
  }

  searchModules(page: number): void {
    this.isLoading = true;
    this.backand.fn.post("keywordsSearch", {
      "q": this.searchQuery,
      "languages": this.selected_languages,
      "pageSize": this.pager.itemsPerPage,
      "pageNumber": page
    }).then((res: any) => {
      this.modules = _.get(res, 'data') || [];
      this.pager.totalItems = this.pager.totalItems;
      if (this.modules.length >= this.pager.itemsPerPage && page >= this.pager.currentPage) {
        this.pager.totalItems = this.pager.totalItems + 20;
        console.log('Increament page counter');
      }
      if (page < this.pager.currentPage && page > 1) {
        this.pager.totalItems = this.pager.totalItems - 20;
        console.log('Decrease page counter');
      }
      this.isLoading = false;
      this.pager.currentPage = page;
      console.log(this.pager.totalItems, this.pager.currentPage, page);
    }, err => this.isLoading = false);
  }

  open() {
    const modalRef = this.modalService.open(FiltersSidebarComponent, {
      windowClass: 'left white',
      container: '.page-home'
    });
  }

  onPageChange(number: number) {
    this.searchModules(number);
  }
}
