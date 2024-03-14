import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

import { StatsTableComponent } from './player/stats-table/stats-table.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  
  {
    path: 'player',
    component: StatsTableComponent
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
