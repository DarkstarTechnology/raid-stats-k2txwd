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
export class DashboardComponent  {
colorScheme: string;
onColorSchemeChange($event: Event) {
throw new Error('Method not implemented.');
}
    private unsubscribe$ = new Subject<void>();
   
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
