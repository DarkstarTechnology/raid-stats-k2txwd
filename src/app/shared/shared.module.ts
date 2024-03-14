import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableResponsiveModule } from './directives/mat-table-responsive/mat-table-responsive.module';
import { MatTableResponsiveDirective } from './directives/mat-table-responsive/mat-table-responsive.directive';
import { NavigationDirective } from './directives/navigation.directive';



@NgModule({
  declarations: [NavigationDirective],
  imports: [
    CommonModule, MatTableResponsiveModule
  ],
  exports: [MatTableResponsiveDirective, NavigationDirective]
})
export class SharedModule { }
