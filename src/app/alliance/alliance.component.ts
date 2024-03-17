import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { AllianceKillsComponent } from "./alliance-kills/alliance-kills.component";
import { PeakAllianceHoursComponent } from "./peak-alliance-hours/peak-alliance-hours.component";
import { ColorService } from '../shared/color.service';

@Component({
    selector: 'app-alliance',
    standalone: true,
    templateUrl: './alliance.component.html',
    styleUrl: './alliance.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        AllianceKillsComponent,
        PeakAllianceHoursComponent
    ]
})
export class AllianceComponent {
  private colorService = inject(ColorService);

  colorScheme = this.colorService.selectedColorScheme;

  peakAllianceChart = {
    showXAxisLabel: true,
    showYAxisLabel: true,
    xAxisTitle: 'Time of Day',
    yAxisTitle: 'Number of Raids',
    legendTitle: 'Alliance',
    LegendPosition: LegendPosition.Right
}
 }
