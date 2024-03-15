import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberCardsComponent } from './number-cards/number-cards.component';
import { ColorSchemeSelectorComponent } from './color-scheme-selector.component';
import { PeakAllianceHoursComponent } from './peak-alliance-hours/peak-alliance-hours.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { AllianceKillsComponent } from './alliance-kills/alliance-kills.component';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    NumberCardsComponent,
    ColorSchemeSelectorComponent,
    PeakAllianceHoursComponent,
    MatCardModule,
    MatDividerModule,
    AllianceKillsComponent
  ],
  providers: [DashboardService]
})
export class DashboardModule { }
