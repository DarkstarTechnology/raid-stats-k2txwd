import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartBaseComponent } from '../chart-base/chart-base.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-number-cards',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './number-cards.component.html',
})
export class NumberCardsComponent extends ChartBaseComponent implements OnInit { 
  constructor(private dashboardService: DashboardService) {
    super();
  }
  view: [number, number] = [350, 350];
  oldestRaid: string;
  avg = '';
  totalRaids: number;
  totalPlayers: number;
  avgRaidsPerDay: number;
  highestRaidsInDay: string;
  databaseStats$ = this.dashboardService.dbStatsResult$;
  selectedColor = this.dashboardService.selectedColorScheme;
  selectedScheme: string;
  ngOnInit(): void {
    this.dashboardService.selectedScheme$.pipe(takeUntil(this.destroy$)).subscribe((scheme) => {
      this.selectedScheme = scheme;
    } );
    this.dashboardService.dbStatsResult$.pipe(takeUntil(this.destroy$)).subscribe((result) => {
      this.totalRaids = result[0].total_raids;
      this.totalPlayers = result[0].total_players;
      this.avgRaidsPerDay = result[0].avg_raids_day;
      const oldestRaidVar = new Date(result[0].oldest_raid_date);
      this.oldestRaid = this.formatDateFromUnixTimestamp(oldestRaidVar.getTime()) ?? '';
      this.calculateChartData();
      
  });
}

calculateChartData() {
  this.chartData = [
      {
          name: 'Total Raids',
          value: this.totalRaids,
      },
      {
          name: 'Oldest Raid',
          value: this.oldestRaid,
      },
      {
          name: 'Daily Avg',
          value: this.avgRaidsPerDay,
      },
      {
          name: 'Total Players',
          value: this.totalPlayers,
      },
  ];
}

formatDateFromUnixTimestamp(timestamp: number): string {
  // Convert Unix timestamp to milliseconds
  const unixTimestampMilliseconds = timestamp;
  // Create a new Date object from the Unix timestamp
  const date = new Date(unixTimestampMilliseconds);
  const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
  ];
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const monthName = monthNames[monthIndex];
  return `${day}.${monthName}`;
}
}
