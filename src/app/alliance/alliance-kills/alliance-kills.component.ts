import { Component, OnInit, inject } from '@angular/core';
import { ChartBaseComponent } from '../../shared/chart-base/chart-base.component';
import { LegendPosition, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { AllianceService } from '../alliance.service';
import { ColorService } from 'src/app/shared/color.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-alliance-kills',
  standalone: true,
  imports: [NgxChartsModule, MatCardModule],
  templateUrl: './alliance-kills.component.html',
  styles: [`::ng-deep .ngx-charts { text{fill: #fff!important; }} 
  
  .line-chart-container { padding-bottom: 42px; overflow-x: auto; } `]
 
})
export class AllianceKillsComponent extends ChartBaseComponent {
  private colorService = inject(ColorService);
  private allianceService = inject(AllianceService);
  constructor() {
    super();
  }
  dailyAllianceStats = this.allianceService.dailyAllianceStatsFiltered;
 

  view: [number, number] = [350, 350];
  // options
  lineChartData: any[];

  override legendPosition: LegendPosition = LegendPosition.Below;

  override schemeType: ScaleType = ScaleType.Ordinal;

  lineChartView: [number, number] = [700, 300];
  override timeline: boolean = false;
  maxXAxisTickLength: number = 8;

  readonly selectedColor$ = this.colorService.colorSelected$;
  roundDomains = false;
  shortDate = new Intl.DateTimeFormat("en", {
    dateStyle: "long"
  }as Intl.DateTimeFormatOptions) ;

  xAxisTickFormatting = (value) => {
    const date = new Date(value);

    const shortUTCDate = this.shortDate.format(date);
    return date.toLocaleDateString('en-US', {month: '2-digit', day: '2-digit'});
  };

}
