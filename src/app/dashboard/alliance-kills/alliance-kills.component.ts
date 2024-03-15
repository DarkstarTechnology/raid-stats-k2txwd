import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ChartBaseComponent } from '../chart-base/chart-base.component';
import { LegendPosition, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-alliance-kills',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './alliance-kills.component.html',
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllianceKillsComponent extends ChartBaseComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {
    super();
  }
 
  cards: any; // Update with the correct type
  isLoading = true;

  view: [number, number] = [350, 350];
  // options
  lineChartData: any[];

  override legendPosition: LegendPosition = LegendPosition.Below;

  override schemeType: ScaleType = ScaleType.Ordinal;

  lineChartView: [number, number] = [700, 300];

  lineScheme = 'vivid';
  roundDomains = true;
  xAxisTickFormatting = (value) => {
    const date = new Date(value);
    const options = { year: '2-digit', month: 'short', day: '2-digit' } as Intl.DateTimeFormatOptions;
    const shortUTCDate = date.toLocaleDateString('en-US', options);
    return shortUTCDate;
  };
  ngOnInit(): void {
    this.dashboardService.dailyAllianceStatsResult$.subscribe((result) => {
      this.lineChartData = result.data;
      
  });
  }



}
