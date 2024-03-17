import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllianceKillsComponent } from './alliance-kills/alliance-kills.component';
import { PeakAllianceHoursComponent } from './peak-alliance-hours/peak-alliance-hours.component';
import { AllianceComponent } from './alliance.component';
import { AllianceService } from './alliance.service';

@NgModule
({
  declarations: [],
  imports: [
    CommonModule,
    AllianceComponent,
    AllianceKillsComponent,
    PeakAllianceHoursComponent
  ],
  providers: [AllianceService]
})
export class AllianceModule {}
