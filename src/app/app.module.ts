import { NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';

import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule} from '@angular/material/dialog';
import { PlayerDialogComponent } from './player/player-dialog/player-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableResponsiveModule } from './shared/directives/mat-table-responsive/mat-table-responsive.module';
import { DatePipe } from '@angular/common';
import { StatsTableComponent } from './player/stats-table/stats-table.component';
import { SharedModule } from './shared/shared.module';
import { ColorSchemeSelectorComponent } from "./dashboard/color-scheme-selector.component";
import { NumberCardsComponent } from "./dashboard/number-cards/number-cards.component";

/* export function initData(playerDataInit: PlayerDataInitService) {
  return () => {
     return inject(PlayerDataInitService).observable.pipe(a);
  };
} */

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        DashboardComponent,
        PlayerDialogComponent,
        StatsTableComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatMenuModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        FormsModule,
        MatDividerModule,
        MatProgressBarModule,
        HttpClientModule,
        MatTableModule,
        MatRippleModule,
        MatSortModule,
        MatPaginatorModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        NgxChartsModule,
        MatSlideToggleModule,
        MatTableResponsiveModule,
        SharedModule,
        DatePipe,
        ColorSchemeSelectorComponent,
        NumberCardsComponent
    ]
})
export class AppModule { }
