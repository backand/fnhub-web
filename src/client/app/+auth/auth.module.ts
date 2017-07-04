// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// libs
// import { I18NRouterModule } from '@ngx-i18n-router/core';

// routes & components
import { routes } from './auth.routes';
import { SignInComponent } from './signin.component';
import { SignupComponent } from './signup.component';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ResetPasswordComponent } from './reset-password.component';

@NgModule({
  imports: [
    CommonModule,
    // I18NRouterModule.forChild(routes, 'about')
    RouterModule.forChild(routes)
  ],
  declarations: [
    SignInComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ]
})
export class AuthModule {
}
