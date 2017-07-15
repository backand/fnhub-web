// angular
import { Routes } from '@angular/router';

// components
import { ModuleDetailComponent } from './detail/module-detail.component';

export const routes: Routes = [
  {
    path: ':slug',
    component: ModuleDetailComponent,
    data: {
      meta: {
        title: 'AUTH.SIGNIN.PAGE_TITLE',
        description: 'AUTH.SIGNIN.META_DESCRIPTION'
      }
    }
  }
];
