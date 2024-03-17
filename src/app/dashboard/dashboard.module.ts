import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberCardsComponent } from './number-cards/number-cards.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';




@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    NumberCardsComponent,
    MatCardModule,
    MatDividerModule,
  ],
  providers: [DashboardService]
})
export class DashboardModule { }
