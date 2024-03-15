import { Injectable } from '@angular/core';
import { catchError, map, of, shareReplay, ReplaySubject, tap, groupBy, mergeMap, reduce } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpErrorService } from '../utils/http-error.service';
import { endpoints } from '../shared/endpoints';
import { DataStats, ChartSeries, Result, PeakRaidHoursAlliance, Kvp } from '../shared/interfaces';




@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  raidsByDay: any;

  constructor(private http: HttpClient, private errorService: HttpErrorService) {
  }

  dailyAllianceStatsResult$ = this.http.get<ChartSeries[]>(endpoints.ALLIANCE_DAILY_URL)
    .pipe(
      map(r => ({ data: r } as Result<ChartSeries[]>)),
      shareReplay(1),
      catchError(err => of({
        data: [],
        error: this.errorService.formatError(err)
      } as Result<ChartSeries[]>))
    );

  dbStatsResult$ = this.http.get<DataStats>(endpoints.DB_STATS_URL)
    .pipe(
      shareReplay(1)
    );

  peakRaidHoursAllianceResult$ = this.http.get<Result<PeakRaidHoursAlliance[]>>('your-api-url').pipe(
    map(result => {
      if (!result.data) {
        return { data: undefined };
      }
      const transformedData = this.transformData(result.data);
      return { data: transformedData };
    }),
    shareReplay(1),
    catchError(error => of({ data: undefined, error: error.message }))
  );


  transformData(data: PeakRaidHoursAlliance[]): ChartSeries[] {
    const timeWindowMap = {
      '00:00 - 06:00': 'Morning',
      '06:00 - 12:00': 'Forenoon',
      '12:00 - 18:00': 'Afternoon',
      '18:00 - 00:00': 'Evening'
    };

    const groupedData = data.reduce((acc, cur) => {
      const key = cur.race_group || 'Unknown';
      const timeWindow = timeWindowMap[cur.time_window || ''] || 'Unknown';
      const value = parseFloat(cur.peak_avg_raids?.toString() || '0');

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push({ name: timeWindow, value });
      return acc;
    }, {} as Record<string, Kvp[]>);

    return Object.entries(groupedData).map(([name, series]) => ({
      name,
      series: series.reduce((acc, cur) => {
        const existing = acc.find(item => item.name === cur.name);
        if (existing) {
          existing.value += cur.value;
        } else {
          acc.push({ ...cur, value: cur.value });
        }
        return acc;
      }, [] as Kvp[])
    }));
  }
}

