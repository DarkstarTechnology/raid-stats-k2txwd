import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartBaseComponent } from '../chart-base/chart-base.component';

@Component({
  selector: 'app-peak-alliance-hours',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './peak-alliance-hours.component.html',
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeakAllianceHoursComponent extends ChartBaseComponent implements OnInit{ 

  constructor() {
    super();
  }

  ngOnInit(): void {
    
    
  }
}
