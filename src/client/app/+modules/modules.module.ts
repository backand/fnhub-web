// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// routes & components
import { routes } from './modules.routes';
import { ModuleDetailComponent } from './detail/module-detail.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ModuleDetailComponent
  ]
})
export class ModulesModule {
}
