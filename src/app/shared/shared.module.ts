import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [LoadingComponent, HeaderComponent],
  imports: [
    CommonModule
  ],
  exports: [LoadingComponent, HeaderComponent]
})
export class SharedModule { }