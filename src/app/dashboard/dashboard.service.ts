import { Injectable, computed, inject, signal } from '@angular/core';
import { catchError, map, of, shareReplay, ReplaySubject, tap, groupBy, mergeMap, reduce, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpErrorService } from '../utils/http-error.service';
import { endpoints } from '../shared/endpoints';
import { DataStats, ChartSeries, Result, PeakRaidHoursAlliance, Kvp, ColorScheme } from '../shared/interfaces';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';



@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  raidsByDay: any;
  selectedScheme$ = new BehaviorSubject<string>('aqua');
  selectedColorScheme = signal<string>('aqua');

  private http = inject(HttpClient);
  private errorService = inject(HttpErrorService);

  constructor() {
   
  }

  xAxisMap = {
    1710028800: 'Morning',
    1710050400: 'Noon',
    1710072000: 'Evening',
    1710093600: 'Night'
  }

  colorSchemeSelected(colorScheme: string) {
    this.selectedColorScheme.set(colorScheme);
    this.selectedScheme$.next(colorScheme);
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

  peakRaidHoursAllianceResult$ = this.http.get<PeakRaidHoursAlliance[]>(endpoints.PEAK_RAID_HOURS_ALLIANCE_URL).pipe(
    tap(raw => console.log('raw', raw)),
    map(result => ({ data: result } as Result<PeakRaidHoursAlliance[]>)),
    map(result => {
      if (!result.data) {
        return { data: undefined } as Result<ChartSeries[]>;
      }
      const transformedData = this.transformData(result.data);
      return { data: transformedData } as Result<ChartSeries[]>;
    }),
    tap(postMap => console.log('postMap', postMap)),
    shareReplay(1),
    catchError(error => of({ data: [], error: this.errorService.formatError(error) } as Result<ChartSeries[]>))
  );
  private peakRaidHoursAllianceResult = toSignal(this.peakRaidHoursAllianceResult$, { initialValue: ({ data: [] } as Result<ChartSeries[]>) });
  peakRaidHoursAlliance = computed(() => this.peakRaidHoursAllianceResult().data);
  peakRaidHoursAllianceError = computed(() => this.peakRaidHoursAllianceResult().error);
  transformData(data: PeakRaidHoursAlliance[]): ChartSeries[] {
    
    const timeWindowMap = {
      '00:00 - 06:00': morning,
      '06:00 - 12:00': noon,
      '12:00 - 18:00': evening,
      '18:00 - 00:00': night
    };

    const groupedData = data.reduce((acc, cur) => {
      const key = cur.race_group || 'Unknown';
      const timeWindow = timeWindowMap[cur.time_window || ''] || 'Unknown';
      //const timeWindow = cur.time_window || 'Unknown';
      const value = parseFloat(cur.peak_avg_raids?.toString() || '0');

      if (!acc[timeWindow]) {
        acc[timeWindow] = [];
      }

      acc[timeWindow].push({ name: key, value });
      return acc;
    }, {} as Record<string, Kvp[]>);
    console.log('groupedData', groupedData);
    const returnVal = Object.entries(groupedData).map(([name, series]) => ({
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
    console.log('returnVal', returnVal);
    return returnVal;
  }
}

const morning = 1710028800;
const noon = 1710050400;
const evening = 1710072000;
const night = 1710093600;
