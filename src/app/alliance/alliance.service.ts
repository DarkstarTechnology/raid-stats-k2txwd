import { Injectable, computed, inject } from '@angular/core';
import { endpoints } from '../shared/endpoints';
import { BehaviorSubject, catchError, map, of, shareReplay, switchMap, tap } from 'rxjs';
import { Alliance, ChartSeries, DateChartSeries, Kvp, PeakRaidHoursAlliance, Result } from '../shared/interfaces';
import { HttpClient } from '@angular/common/http';
import { HttpErrorService } from '../utils/http-error.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class AllianceService {

  private http = inject(HttpClient);
  private errorService = inject(HttpErrorService);
  constructor() { }

  private allianceSelectedSubject = new BehaviorSubject<number>(197);
  readonly allianceSelected$ = this.allianceSelectedSubject.asObservable();

  alliancesResult$ = this.http.get<Alliance[]>(endpoints.ALLIANCE_URL)
  .pipe(
    map(r => ({ data: r } as Result<Alliance[]>)),
    shareReplay(1),
    catchError(err => of({
      data: [],
      error: this.errorService.formatError(err)
    } as Result<Alliance[]>))
  );
  private alliancesResult = toSignal(this.alliancesResult$, { initialValue: ({ data: [] } as Result<Alliance[]>) });
  alliances = computed(() => this.alliancesResult().data);
  alliancesError = computed(() => this.alliancesResult().error);

  readonly totalAllianceStatsFilteredResult$ = this.allianceSelected$
  .pipe(
    switchMap(allianceId => {
      const url = `${endpoints.ALLIANCE_TOTAL_URL}?alliance=${allianceId}`;
      return this.http.get<Kvp[]>(url)
      .pipe(
        map(r => ({ data: r } as Result<Kvp[]>)),
        catchError(err => of({
          data: [],
          error: this.errorService.formatError(err)
        } as Result<Kvp[]>))
      );
    }),
  );
  private totalAllianceStatsFilteredResult = toSignal(this.totalAllianceStatsFilteredResult$, { initialValue: ({ data: [] } as Result<Kvp[]>) });
  totalAllianceStatsFiltered = computed(() => this.totalAllianceStatsFilteredResult().data);
  totalAllianceStatsFilteredError = computed(() => this.totalAllianceStatsFilteredResult().error);

  readonly dailyAllianceStatsFilteredResult$ = this.allianceSelected$
  .pipe(
    switchMap(allianceId => {
      const url = `${endpoints.ALLIANCE_DAILY_URL}?alliance=${allianceId}`;
      return this.http.get<DateChartSeries[]>(url)
      .pipe(
        map(r => ({ data: r } as Result<DateChartSeries[]>)),
        catchError(err => of({
          data: [],
          error: this.errorService.formatError(err)
        } as Result<DateChartSeries[]>))
      );
    }),
  );
  private dailyAllianceStatsFilteredResult = toSignal(this.dailyAllianceStatsFilteredResult$, { initialValue: ({ data: [] } as Result<DateChartSeries[]>) });
  dailyAllianceStatsFiltered = computed(() => this.dailyAllianceStatsFilteredResult().data);
  dailyAllianceStatsFilteredError = computed(() => this.dailyAllianceStatsFilteredResult().error);

  readonly peakRaidHoursAllianceFilteredResult$ = this.allianceSelected$
  .pipe(
    switchMap(allianceId => {
      const url = `${endpoints.PEAK_RAID_HOURS_ALLIANCE_URL}?alliance=${allianceId}`;
      return this.http.get<PeakRaidHoursAlliance[]>(url)
      .pipe(
        map(r => ({ data: r } as Result<PeakRaidHoursAlliance[]>)),
        map(result => {
          if (!result.data) {
            return { data: undefined } as Result<ChartSeries[]>;
          }
          const transformedData = this.transformData(result.data);
          return { data: transformedData } as Result<ChartSeries[]>;
        }),
        catchError(error => of({ data: [], error: this.errorService.formatError(error) } as Result<ChartSeries[]>))
      );
    }),
  );
  private peakRaidHoursAllianceFilteredResult = toSignal(this.peakRaidHoursAllianceFilteredResult$, { initialValue: ({ data: [] } as Result<ChartSeries[]>) });
  peakRaidHoursAllianceFiltered = computed(() => this.peakRaidHoursAllianceFilteredResult().data);
  peakRaidHoursAllianceFilteredError = computed(() => this.peakRaidHoursAllianceFilteredResult().error);
  

  totalAllianceStatsResult$ = this.http.get<Kvp[]>(endpoints.ALLIANCE_TOTAL_URL)
  .pipe(
    map(r => ({ data: r } as Result<Kvp[]>)),
    shareReplay(1),
    catchError(err => of({
      data: [],
      error: this.errorService.formatError(err)
    } as Result<Kvp[]>))
  );

  private totalAllianceStatsResult = toSignal(this.totalAllianceStatsResult$, { initialValue: ({ data: [] } as Result<Kvp[]>) });
  totalAllianceStats = computed(() => this.totalAllianceStatsResult().data);
  totalAllianceStatsError = computed(() => this.totalAllianceStatsResult().error);
  
  dailyAllianceStatsResult$ = this.http.get<DateChartSeries[]>(endpoints.ALLIANCE_DAILY_URL)
  .pipe(
    map(r => ({ data: r } as Result<DateChartSeries[]>)),
    shareReplay(1),
    catchError(err => of({
      data: [],
      error: this.errorService.formatError(err)
    } as Result<DateChartSeries[]>))
  );

  private dailyAllianceStatsResult = toSignal(this.dailyAllianceStatsResult$, { initialValue: ({ data: [] } as Result<DateChartSeries[]>) });
  dailyAllianceStats = computed(() => this.dailyAllianceStatsResult().data);
  dailyAllianceStatsError = computed(() => this.dailyAllianceStatsResult().error);
 
  xAxisMap = {
    1710028800: 'Morning',
    1710050400: 'Noon',
    1710072000: 'Evening',
    1710093600: 'Night'
  }
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

  allianceSelected(allianceId: number) {
    this.allianceSelectedSubject.next(allianceId);
  }
}
const morning = 1710028800;
const noon = 1710050400;
const evening = 1710072000;
const night = 1710093600;
