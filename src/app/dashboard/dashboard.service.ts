import { Injectable } from '@angular/core';
import { catchError, map, of, shareReplay, ReplaySubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpErrorService } from '../utils/http-error.service';
import { endpoints } from '../shared/endpoints';
import { DbStats, LineChartSeries, Result } from '../shared/interfaces';




@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  raidsByDay: any;

  constructor(private http: HttpClient, private errorService: HttpErrorService) {
  }

  dailyAllianceStatsResult$ = this.http.get<LineChartSeries[]>(endpoints.ALLIANCE_DAILY_URL)
    .pipe(
      map(r => ({ data: r } as Result<LineChartSeries[]>)),
      shareReplay(1),
      catchError(err => of({
        data: [],
        error: this.errorService.formatError(err)
      } as Result<LineChartSeries[]>))
    );

  dbStatsResult$ = this.http.get<DbStats>(endpoints.DB_STATS_URL)
    .pipe(
      
      shareReplay(1)
      
    );
}

