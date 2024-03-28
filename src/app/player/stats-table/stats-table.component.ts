import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap, tap } from 'rxjs/operators';
import { HttpErrorService } from '../../utils/http-error.service';
import { PlayerDialogComponent } from '../player-dialog/player-dialog.component';
import { PlayerStats, RaceFilter, StatsApi } from 'src/app/shared/interfaces';
import { endpoints } from 'src/app/shared/endpoints';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-stats-table',
  templateUrl: './stats-table.component.html',
  styleUrls: ['./stats-table.component.scss'],

})
export class StatsTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'race', 'avg_time', 'avg_position', 'participation'];
  statsDatabase: StatsHttpDatabase | null;
  data: PlayerStats[] = [];
  raceFilters: RaceFilter[] = [
    {label: 'Dragon', value: 'dragon', selected: true },
    {label: 'Plant', value: 'plant', selected: true },
    {label: 'Demon', value: 'demon', selected: true },
    {label: 'Gnome', value: 'gnome', selected: true },
    {label: 'Kobold', value: 'kobold', selected: true },
    {label: 'Undead', value: 'undead', selected: true },
    {label: 'Troll', value: 'troll', selected: true }
  ]
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  playerService = inject(PlayerService);
 
  dragonSelected = this.playerService.dragonSelected;
  plantSelected = this.playerService.plantSelected;
  demonSelected = this.playerService.demonSelected;
  gnomeSelected = this.playerService.gnomeSelected;
  koboldSelected = this.playerService.koboldSelected;
  undeadSelected = this.playerService.undeadSelected;
  trollSelected = this.playerService.trollSelected;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private _httpClient: HttpClient, public dialog: MatDialog, private errorService: HttpErrorService) {}

  ngAfterViewInit(): void {
    this.statsDatabase = new StatsHttpDatabase(this._httpClient, this.playerService);
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);


    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.statsDatabase!.getPlayerStats(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex)
            .pipe(
              catchError(err => observableOf({
                items: [],
                error: this.errorService.formatError(err)
              } as StatsApi)));
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;
          if (data === null) {
            console.log('data is null');
            return [];

          }

          this.resultsLength = data.total_count;
          console.log(data);
          this.data = data.items;
          console.log('data.items before return:', data.items); // Check if it's undefined
          return data.items;
        }),
        tap((data) => console.log('data inside tap:', data)) // Check if it's undefined)
      ).subscribe(data => (this.data = data));
  }
  showPlayerStats(player: PlayerStats) {
    const dialogRef = this.dialog.open(PlayerDialogComponent, { data: player});
  }

  toggleRaceFilter(raceVal: string) {
    this.playerService.toggleRaceFilter(raceVal);
  }
}

export class StatsHttpDatabase {
  constructor(private _httpClient: HttpClient, private playerService: PlayerService) {}

  getPlayerStats(sort: string, order: SortDirection, page: number): Observable<StatsApi> {
  
    const requestUrl = `${endpoints.PLAYER_STATS_URL}?sort=${sort}&order=${order}&races=${this.playerService.filterString()}&page=${page + 1}`;

    return this._httpClient.get<StatsApi>(requestUrl);
  }
}