import { Routes } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';
import { HomeComponent } from './home';


export const ROUTES: Routes = [
  { path: '',      component: HomeComponent ,  canActivateChild: [MetaGuard]},
  { path: 'home',  component: HomeComponent },
  { path: 'auth', loadChildren: './+auth/#AuthModule' },
  { path: 'detail', loadChildren: './+detail#DetailModule'},
  { path: 'module', loadChildren: './+modules/modules.module#ModulesModule' },
  { path: '**',    component: NoContentComponent },
];