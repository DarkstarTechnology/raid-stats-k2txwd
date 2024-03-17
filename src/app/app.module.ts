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
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule} from '@angular/material/dialog';
import { PlayerDialogComponent } from './player/player-dialog/player-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DatePipe } from '@angular/common';
import { StatsTableComponent } from './player/stats-table/stats-table.component';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AllianceModule } from './alliance/alliance.module';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        PlayerDialogComponent,
        StatsTableComponent,

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


        HttpClientModule,
        MatTableModule,
        MatRippleModule,
        MatSortModule,
        MatPaginatorModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        NgxChartsModule,


        SharedModule,
        DatePipe,
        DashboardModule,
        AllianceModule
    ]
})
export class AppModule { }
