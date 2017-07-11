// angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-search-module',
  template: `<div class="input-group search-input">
  <input type="text" class="form-control" placeholder="find packages"  [(ngModel)]="searchQuery" [ngModelOptions]="{standalone: true}"  (keyup.enter)="searchModules()">
  <span class="input-group-btn" (click) = "searchModules()">
                      <i class="fa fa-search"></i>
                  </span>
</div>`
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  routeEvent: any;

  constructor(private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.routeEvent = this.route
      .queryParams
      .subscribe(params => {
        this.searchQuery = params['q'] || '';
      });
  }

  ngOnDestroy(): void {
    this.routeEvent.unsubscribe();
  }


  searchModules(): void {
    this.router.navigate(['/'], { queryParams: { q: this.searchQuery } });
  }

}
