// angular
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService } from './app.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [AppService]
    }
  }


}
