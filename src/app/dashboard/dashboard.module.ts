import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberCardsComponent } from './number-cards/number-cards.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { NavigationDirective } from '../shared/directives/navigation.directive';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    NumberCardsComponent,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    SharedModule
  ],
  providers: [DashboardService]
})
export class DashboardModule { }
