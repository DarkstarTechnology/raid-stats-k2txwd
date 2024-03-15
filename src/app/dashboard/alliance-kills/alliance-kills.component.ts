import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ChartBaseComponent } from '../chart-base/chart-base.component';
import { LegendPosition, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { DashboardService } from '../dashboard.service';
import * as d3 from 'd3';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-alliance-kills',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './alliance-kills.component.html',
 
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
  curve = d3.curveCatmullRom;

  scheme: string = 'vivid';
  roundDomains = true;
  shortDate = new Intl.DateTimeFormat("en", {
    dateStyle: "short"
  }as Intl.DateTimeFormatOptions) ;
  xAxisTickFormatting = (value) => {
    const date = new Date(value);
    
    const shortUTCDate = this.shortDate.format(date);
    return shortUTCDate;
  };
  ngOnInit(): void {
    this.dashboardService.dailyAllianceStatsResult$.subscribe((result) => {
      this.lineChartData = result.data;
      
  });
  this.dashboardService.selectedScheme$.pipe(takeUntil(this.destroy$)).subscribe((scheme) => {
    this.scheme = scheme;
  } );

  }
}
