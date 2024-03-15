import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartBaseComponent } from '../chart-base/chart-base.component';
import { DashboardService } from '../dashboard.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-peak-alliance-hours',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './peak-alliance-hours.component.html',

})
export class PeakAllianceHoursComponent extends ChartBaseComponent implements OnInit{ 
  
  private dashboardService = inject(DashboardService);

  peakAllianceHours = this.dashboardService.peakRaidHoursAlliance;
  scheme: string;
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.dashboardService.selectedScheme$.pipe(takeUntil(this.destroy$)).subscribe((scheme) => {
      this.scheme = scheme;
    } );
    
  }
}
