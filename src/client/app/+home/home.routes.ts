// angular
import { Routes } from '@angular/router';

// components
import { HomeComponent } from './home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      meta: {
        title: 'HOME.PAGE_TITLE',
        override: true,
        description: 'HOME.META_DESCRIPTION'
      }
    }
  }
];
