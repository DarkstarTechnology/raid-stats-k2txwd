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

  

  colorSchemeSelected(colorScheme: string) {
    this.selectedColorScheme.set(colorScheme);
    this.selectedScheme$.next(colorScheme);
  }



  dbStatsResult$ = this.http.get<DataStats>(endpoints.DB_STATS_URL)
    .pipe(
      shareReplay(1)
    );


}


