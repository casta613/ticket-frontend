import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import {NavigationOperatorComponent} from './components/navigation-operator/navigation-operator.component';

@NgModule({
  declarations: [
    NavigationComponent,
    FooterComponent,
    NavigationOperatorComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavigationComponent,
    FooterComponent,
    NavigationOperatorComponent
  ]
})
export class SharedModule { }
