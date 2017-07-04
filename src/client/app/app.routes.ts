// angular
import { Routes } from '@angular/router';
// libs
import { MetaGuard } from '@ngx-meta/core';
// components
import { ChangeLanguageComponent } from './change-language.component';
export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: './+home/home.module#HomeModule'
      },
      {
        path: 'auth',
        loadChildren: './+auth/auth.module#AuthModule'
      }
    ],
    canActivateChild: [MetaGuard],
    data: {
      i18n: {
        isRoot: true
      }
    }
  },
  {
    path: 'change-language/:languageCode',
    component: ChangeLanguageComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
