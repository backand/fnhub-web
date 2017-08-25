import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { AppService } from '../shared/app.service';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'language-filter',
  template: `<div class="sidebar-item">
        <div class="sidebar-item-heading">Language</div>
        <ul class="nav flex-column">
          <li class="nav-item" *ngFor="let language of languages">
            <a class="nav-link px-0" [ngClass]="{'text-primary': language.selected}" href="#" (click)="selectLanguage(language.key,  $event)"><i class="fa fa-caret-right fa-fw" aria-hidden="true" [style.visibility]="language.selected ? 'visible': 'hidden' "></i>{{language.name}} <i  aria-hidden="true" *ngIf="language.selected" class="fa fa-times pull-right"></i></a>
          </li>
        </ul>
      </div>`
})
export class LanguageFilterComponent {
  @Input() source: string;
  @Output() onSelectLanuage = new EventEmitter<string>();

  searchQuery: string;
  routeEvent: any;
  modules: any = [];
  selected_languages: any = [];
  languages: any = [];


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService,
  ) { }

  ngOnInit(): void {
    this.languages = this.appService.getLanguages();
    this.routeEvent = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        let l = params['l'] || '';
        if (l) {
          this.selected_languages =  _.isString(l) ?  l.split(",") : [];
          this.updateLanguages();
        }
      });
  }

  ngOnDestroy(): void {
    this.routeEvent.unsubscribe();
  }

  selectLanguage(l: string, event): void {
    event.preventDefault();
    this.parseLanguageFilter(l);

    this.selected_languages = _.uniq(this.selected_languages);
    this.updateLanguages();

    let ls = _.cloneDeep(this.selected_languages);

    if (this.source === 'modal') {
      this.onSelectLanuage.emit(ls);
      return;
    }
    this.appService.onFilterChange(ls);
  }

  private parseLanguageFilter(ls: any) {
    if (_.isString(ls)) {
      this.setSelectedLang(ls)
    } else if (_.isArray(ls)) {
      _.forEach(ls, (l) => this.setSelectedLang(l));
    }
  }

  private setSelectedLang(l: any) {
    var index = _.findIndex(this.selected_languages, (o: any) => { return _.lowerCase(o) == _.lowerCase(l); });
    if (index >= 0) {
      this.selected_languages.splice(index, 1);
    } else {
      this.selected_languages.push(l);
    }
  }

  private updateLanguages() {
    this.languages = _.map(this.languages, (l: any) => {
      var index = _.findIndex(this.selected_languages, (o: any) => { return _.lowerCase(o) == _.lowerCase(l.key); });
      l.selected = index >= 0 ? true : false;
      return l;
    });
  }

}

