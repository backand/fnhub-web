// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
//import { BackandService } from '@backand/angular2-sdk';

// libs
// import { I18NRouterModule } from '@ngx-i18n-router/core';

// routes & components
import { routes } from './home.routes';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    // I18NRouterModule.forChild(routes, 'home')
    RouterModule.forChild(routes)
  ],
  declarations: [HomeComponent],
  //providers: [BackandService]
})
export class HomeModule {
}
