// angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search-module',
  template: `<div class="input-group search-input">
  <input type="text" class="form-control" placeholder="find packages"  [(ngModel)]="searchQuery" [ngModelOptions]="{standalone: true}"  (keyup.enter)="searchModules()">
  <span class="input-group-btn" (click) = "searchModules()">
                      <i class="fa fa-search"></i>
                  </span>
</div>`
})
export class SearchComponent {
  searchQuery: string = '';

  constructor(private router: Router) {
  }

  searchModules() {
    this.router.navigate(['/'], { queryParams: { q: this.searchQuery } });
  }

}
