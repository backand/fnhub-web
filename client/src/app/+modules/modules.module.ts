// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Http, HttpModule } from '@angular/http';

// routes & components
import { routes } from './modules.routes';
import { ModuleDetailComponent } from './detail/module-detail.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpModule
  ],
  declarations: [
    ModuleDetailComponent
  ]
})
export class ModulesModule {
}
