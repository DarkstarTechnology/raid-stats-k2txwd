import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { DashboardService } from './dashboard.service';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { Raid } from '../shared/interfaces';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject<void>();
    raids: Raid[] = [];
    oldestRaid: string;

    totalRaids: number;
    totalPlayers: number;
    avgRaidsPerDay: number;
    highestRaidsInDay: string;
    cards: any; // Update with the correct type
    isLoading = true;
    chartData: any[];
    view: [number, number] = [350, 350];
    // options
    lineChartData: any[];
    legend: boolean = true;
    legendPosition: LegendPosition = LegendPosition.Below;
    legendTitle: any = 'Alliances';
    showLabels: boolean = true;
    animations: boolean = true;
    xAxis: boolean = true;
    yAxis: boolean = true;
    showYAxisLabel: boolean = false;
    showXAxisLabel: boolean = false;
    showGridLines = false;
    yScaleMin: number = 5;
    schemeType: ScaleType = ScaleType.Ordinal;
    xAxisTickCount: number = 5;
    xAxisLabel: string = 'Day';
    yAxisLabel: string = 'Raids';
    timeline: boolean = false;
    lineChartView: [number, number] = [700, 300];
    colorScheme = 'aqua';
        lineScheme = 'vivid';
        roundDomains = true;
        xAxisTickFormatting = (value) => {
                const date = new Date(value);
                const options = { year: '2-digit', month: 'short', day: '2-digit' } as Intl.DateTimeFormatOptions;
                const shortUTCDate = date.toLocaleDateString('en-US', options);
                return shortUTCDate;
        };
        /* colorScheme = {
        domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
    }; */
        cardColor: string = '#20262d';
        xScaleMin: any;

    constructor(
        private dashboardService: DashboardService,
        private router: Router
        
    ) {}

    ngOnInit() {
        //exportIndexedDB('RaidDatabase');
       this.dashboardService.dailyAllianceStatsResult$.subscribe((result) => {
            this.lineChartData = result.data;
            
        });
        this.dashboardService.dbStatsResult$.subscribe((result) => {
            this.totalRaids = result.total_raids;
            this.totalPlayers = result.total_players;
            this.avgRaidsPerDay = result.avg_raids_day ?? 0;
            this.oldestRaid = result.oldest_raid_date ? this.formatDateFromUnixTimestamp(result.oldest_raid_date.getDate()) : 'N/A';
            this.calculateChartData();
            this.isLoading = false;
        });
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    

    onSelect(event) {
        console.log(event);
    }
    onActivate(data): void {
        console.log('Activate', JSON.parse(JSON.stringify(data)));
    }

    onDeactivate(data): void {
        console.log('Deactivate', JSON.parse(JSON.stringify(data)));
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
                value: this.avgRaidsPerDay.toFixed(2),
            },
            {
                name: 'Total Players',
                value: this.totalPlayers,
            },
        ];
    }

    groupByDay(objects: Raid[]): Record<string, Raid[]> {
        return objects.reduce((acc, obj) => {
            // Convert Unix timestamp to Date object
            const date = new Date(obj.date * 1000); // Convert to milliseconds
            // Format date as a string 'YYYY-MM-DD'
            const dateKey = date.toISOString().split('T')[0];

            // Group by this formatted date string
            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(obj);

            return acc;
        }, {} as Record<string, Raid[]>);
    }

    formatDateFromUnixTimestamp(timestamp: number): string {
        // Convert Unix timestamp to milliseconds
        const unixTimestampMilliseconds = timestamp * 1000;
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

    groupRaidsByDay(objects: Raid[]): Record<string, Raid[]> {
        return objects.reduce((acc, obj) => {
            // Ensure the date is a Date object
            const date = new Date(obj.date);
            // Create a date string key in the format YYYY-MM-DD to represent the day
            const dateKey = date.toISOString().split('T')[0];

            // If the key doesn't exist, initialize it with an empty array
            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }

            // Add the current object to the array for the calculated date key
            acc[dateKey].push(obj);

            return acc;
        }, {} as Record<string, Raid[]>);
    }

    roundUnixTimestampToDay(timestamp: number): number {
        // Convert Unix timestamp to milliseconds
        let date = new Date(timestamp * 1000);

        // Check if time is greater than or equal to 12:00:00 AM
        if (date.getHours() > 0 || date.getMinutes() > 0 || date.getSeconds() > 0) {
            // Increment date by one day
            date.setDate(date.getDate() + 1);
        }

        // Set time to 12:00:00 AM
        date.setHours(0, 0, 0, 0);

        // Convert date back to Unix timestamp and return
        return Math.round(date.getTime());
    }
}
