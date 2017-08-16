import {
  LocationStrategy,
  PathLocationStrategy,
  Location
} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { CookieModule } from 'ngx-cookie';

import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  Routes,
  PreloadAllModules,
} from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';

//third party modules
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms'
import { NgxPaginationModule } from 'ngx-pagination';

// App is our top level component
import { AppComponent } from './app.component';
import { SearchComponent } from './search';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { HomeComponent } from './home';
import {
  HeaderComponent,
  TopMenuComponent,
  TopRightMenuComponent
} from './header';
import {
  HeaderMenuSidebarComponent,
  FiltersSidebarComponent
} from './modal-sidebars';
import {
  LanguageFilterComponent
} from './filters';
import { SignInComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


import { SharedModule } from './shared/shared.module';
import { AppService, AuthService } from './shared';
import { BackandService } from '@backand/angular2-sdk';

import '../styles/styles.scss';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

// Route config let's you map routes to components
const routes: Routes = [
  {
    path: 'features',
    children: []
  },
  {
    path: 'auth/:action',
    children: []
  },
  {
    path: 'module/:action',
    children: []
  },
  {
    path: 'users/:action',
    children: []
  },
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    HeaderMenuSidebarComponent,
    FiltersSidebarComponent,
    TopMenuComponent,
    TopRightMenuComponent,
    SignInComponent,
    SignupComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    LanguageFilterComponent,
    SearchComponent
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    SharedModule.forRoot(),
    NgbModule.forRoot(),
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    NgxPaginationModule,
    CookieModule.forRoot()
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS,
    BackandService,
    AppService,
    AuthService,
    NgbActiveModal
  ],
  entryComponents: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SignInComponent,
    SignupComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    HeaderMenuSidebarComponent,
    FiltersSidebarComponent,
    SearchComponent
  ]
})
export class AppModule {
  private componentsMap: any = {
    'module': [],
    'signin': [SignInComponent],
    'signup': [SignupComponent],
    'forgot_password': [ForgotPasswordComponent],
    'reset_password': [ResetPasswordComponent],
    'default': [HomeComponent],
    'app_search_module': [SearchComponent],
    'users': []
  };
  constructor(
    public appRef: ApplicationRef,
    public appState: AppState,
    private backand: BackandService,
    private appService: AppService,
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.setUser();
  }

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    /**
     * Set state
     */
    this.appState._state = store.state;
    /**
     * Set input values
     */
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    /**
     * Save state
     */
    const state = this.appState._state;
    store.state = state;
    /**
     * Recreate root elements
     */
    store.disposeOldHosts = createNewHosts(cmpLocation);
    /**
     * Save input values
     */
    store.restoreInputValues = createInputTransfer();
    /**
     * Remove styles
     */
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    /**
     * Display new elements
     */
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

  ngDoBootstrap(appRef: ApplicationRef) {
    const bootCmps = document.querySelectorAll('[data-comp-id]');
    appRef.bootstrap(HeaderComponent);
    for (const i in bootCmps) {
      if (bootCmps.hasOwnProperty(i)) {
        let cmp = bootCmps[i].getAttribute('data-comp-id');
        _.forEach(this.componentsMap[cmp], (r) => {
          appRef.bootstrap(r);
        })
      }
    }
  }

}
