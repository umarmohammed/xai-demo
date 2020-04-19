import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home.component';
import { LocalComponent } from './local.component';
import { CommonModule } from '@angular/common';
import { ModelLoadedGuard } from './model-loaded.guard';
import { AgGridModule } from 'ag-grid-angular';
import { DataGridComponent } from './data-grid.component';
import { LimeComponent } from './lime.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LimeChartComponent } from './lime.chart.component';
import { LimeProbabilitiesComponent } from './lime-probabilities.component';
import { ShellComponent } from './shell.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: 'local', component: LocalComponent },
      { path: '', redirectTo: 'local', pathMatch: 'full' },
    ],
    canActivateChild: [ModelLoadedGuard],
  },
  { path: 'home', component: HomeComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LocalComponent,
    DataGridComponent,
    LimeComponent,
    LimeChartComponent,
    LimeProbabilitiesComponent,
    ShellComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AgGridModule.withComponents([]),
    NgxChartsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
