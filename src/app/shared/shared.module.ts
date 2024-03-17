import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableResponsiveModule } from './directives/mat-table-responsive/mat-table-responsive.module';
import { MatTableResponsiveDirective } from './directives/mat-table-responsive/mat-table-responsive.directive';
import { NavigationDirective } from './directives/navigation.directive';
import { ColorSchemeSelectorComponent } from './color-scheme-selector.component';
import { ChartBaseComponent } from './chart-base/chart-base.component';
import { ColorService } from './color.service';



@NgModule({
  declarations: [NavigationDirective],
  imports: [
    CommonModule, MatTableResponsiveModule,ColorSchemeSelectorComponent, ChartBaseComponent
  ],
  providers: [
    ColorService
  ],
  exports: [MatTableResponsiveDirective, NavigationDirective, ColorSchemeSelectorComponent, ChartBaseComponent]
})
export class SharedModule { }
