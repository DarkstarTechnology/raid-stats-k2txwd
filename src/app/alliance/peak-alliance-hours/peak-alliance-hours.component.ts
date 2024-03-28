import { Component, inject } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartBaseComponent } from '../../shared/chart-base/chart-base.component';
import { AllianceService } from '../alliance.service';
import { ColorService } from 'src/app/shared/color.service';
import {  MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-peak-alliance-hours',
  standalone: true,
  imports: [NgxChartsModule, MatCardModule],
  templateUrl: './peak-alliance-hours.component.html',
  styles: [`.chart-container { margin: 8px;}`]
})
export class PeakAllianceHoursComponent extends ChartBaseComponent {
  private colorService = inject(ColorService);
  private allianceService = inject(AllianceService);
  //xAxisTicks: any[] = ['00:00-06:00', '06:00-12:00', '12:00-18:00', '18:00-24:00'];
  peakAllianceHours = this.allianceService.peakRaidHoursAllianceFiltered;
  scheme: string = 'aqua';
  showXAxis = true;
  showYAxis = true;
  readonly selectedColor$ = this.colorService.colorSelected$;
  xAxisTickFormatting = (value) => {
    const rtn =  this.allianceService.xAxisMap[value];
    return rtn;
  };
  constructor() {
    super();
  }

}

