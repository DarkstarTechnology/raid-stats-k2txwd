import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject, signal } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { AllianceKillsComponent } from "./alliance-kills/alliance-kills.component";
import { PeakAllianceHoursComponent } from "./peak-alliance-hours/peak-alliance-hours.component";
import { ColorService } from '../shared/color.service';
import { AlliancePieChartComponent } from './alliance-pie-chart/alliance-pie-chart.component';
import { MatCardModule } from '@angular/material/card';
import { Observable, Observer } from 'rxjs';
import { AllianceService } from './alliance.service';
import { FormControl } from '@angular/forms';
import { Alliance } from '../shared/interfaces';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {NgFor} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

export interface AllianceTab {
    label: string;
    content: string;
}

const initialAlliance: Alliance = {
    primary: ['Dragon','Plant'],
    secondary: ['Gnome','Undead'],
    tertiary: ['Demon','Kobold'],
    first_raid_date: 1711322512,
    id: 197,
    label: "DR-PL | GN-UN | DE-KO"
};

@Component({
    selector: 'app-alliance',
    standalone: true,
    templateUrl: './alliance.component.html',
    styleUrl: './alliance.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        AllianceKillsComponent,
        PeakAllianceHoursComponent,
        AlliancePieChartComponent,
        MatSelectModule,
        MatCardModule,
        MatFormFieldModule,
        NgFor,
        MatInputModule,
        FormsModule
    ]
})
export class AllianceComponent {
    selectedAlliance: number = initialAlliance.id;
    
    private colorService = inject(ColorService);
    private allianceService = inject(AllianceService);
    readonly selectedColor$ = this.colorService.colorSelected$;
    alliances = this.allianceService.alliances;
    peakAllianceChart = {
        showXAxisLabel: true,
        showYAxisLabel: true,
        xAxisTitle: 'Time of Day',
        yAxisTitle: 'Number of Raids',
        legendTitle: 'Alliance',
        LegendPosition: LegendPosition.Right
    }

    onSelected(event: Event) {
        const allianceId = parseInt((event.target as HTMLSelectElement).value);
        this.allianceService.allianceSelected(allianceId);
        this.selectedAlliance = allianceId;
    }
}
