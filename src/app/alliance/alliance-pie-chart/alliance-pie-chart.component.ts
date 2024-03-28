import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ChartBaseComponent } from 'src/app/shared/chart-base/chart-base.component';
import { ColorService } from 'src/app/shared/color.service';
import { AllianceService } from '../alliance.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-alliance-pie-chart',
  standalone: true,
  imports: [
    AsyncPipe,
    MatCardModule,
    NgxChartsModule,
  ],
  templateUrl: './alliance-pie-chart.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlliancePieChartComponent extends ChartBaseComponent{ 
  view: [number, number] = [700, 350];
  
  constructor() {
    super();
  }

  private allianceService = inject(AllianceService);
  totalAllianceStats = this.allianceService.totalAllianceStatsFiltered;

  private colorService = inject(ColorService);
  readonly selectedColor$ = this.colorService.colorSelected$;


}
