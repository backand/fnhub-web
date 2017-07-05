// angular
import { Routes } from '@angular/router';

// components
import { SignInComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

export const routes: Routes = [
  {
    path: 'signin',
    component: SignInComponent,
    data: {
      meta: {
        title: 'AUTH.SIGNIN.PAGE_TITLE',
        description: 'AUTH.SIGNIN.META_DESCRIPTION'
      }
    }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: {
      meta: {
        title: 'AUTH.SIGNUP.PAGE_TITLE',
        description: 'AUTH.SIGNUP.META_DESCRIPTION'
      }
    }
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: {
      meta: {
        title: 'AUTH.FORGOT_PASSWORD.PAGE_TITLE',
        description: 'AUTH.FORGOT_PASSWORD.META_DESCRIPTION'
      }
    }
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    data: {
      meta: {
        title: 'AUTH.RESET_PASSWORD.PAGE_TITLE',
        description: 'AUTH.RESET_PASSWORD.META_DESCRIPTION'
      }
    }
  }
];
