import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-chart-base',
  standalone: true,
  imports: [],
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartBaseComponent implements OnDestroy { 
  @Input() xAxisLabel: string = '';
  @Input() yAxisLabel: string = '';
  @Input() legendTitle: string = '';
  @Input() colorScheme: string = '';
  @Input() showLegend: boolean = false;
  protected destroy$ = new Subject<void>();
  chartData: any[];
    
    legend: boolean = true;
    legendPosition: LegendPosition = LegendPosition.Right;
    showLabels: boolean = true;
    animations: boolean = true;
    xAxis: boolean = true;
    yAxis: boolean = true;
    showYAxisLabel: boolean = false;
    showXAxisLabel: boolean = false;
    showGridLines = false;
    gradient: boolean = true;
    schemeType: ScaleType = ScaleType.Ordinal;

    timeline: boolean = false;
    chartView: [number, number] = [700, 300];
    
     
        cardColor: string = '#20262d';
        xScaleMin: any;

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
