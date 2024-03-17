import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartBaseComponent } from '../../shared/chart-base/chart-base.component';
import { DashboardService } from '../../dashboard/dashboard.service';
import { takeUntil } from 'rxjs';
import { AllianceComponent } from '../alliance.component';
import { AllianceService } from '../alliance.service';

@Component({
  selector: 'app-peak-alliance-hours',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './peak-alliance-hours.component.html',

})
export class PeakAllianceHoursComponent extends ChartBaseComponent {

  private allianceService = inject(AllianceService);
  //xAxisTicks: any[] = ['00:00-06:00', '06:00-12:00', '12:00-18:00', '18:00-24:00'];
  peakAllianceHours = this.allianceService.peakRaidHoursAlliance;
  scheme: string;
  showXAxis = true;
  showYAxis = true;
  xAxisTickFormatting = (value) => {
    const rtn =  this.allianceService.xAxisMap[value];
    return rtn;
  };
  constructor() {
    super();
  }

}

