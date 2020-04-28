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
import { AuthGuard } from './auth.guard';
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
import { LimeFeatureValuesComponent } from './lime-feature-values.component';
import { GlobalComponent } from './global.component';
import { GlobalFeatureInfoComponent } from './global-feature-info.component';
import { MatTabsModule } from '@angular/material/tabs';
import { GlobalFeatureImportanceComponent } from './global-feature-importance.component';
import { DataGridSelectedDirective } from './data-grid-selected.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DataGridRowVisibleDirective } from './data-grid-row-visible.directive';
import { GlobalFeatureShapingComponent } from './global-feature-shaping.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { UploadTextModelComponent } from './upload-text-model.component';
import { LoginComponent } from './login.component';
import { AmplifyService } from '@flowaccount/aws-amplify-angular';
import { MatInputModule } from '@angular/material/input';

import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ModelLoadedGuard } from './model-loaded.guard';
import { SignupComponent } from './signup.component';
import { LogOutButton } from './logout-button.component';
import { ExplainabilityComponent } from './explainability.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'explain',
        component: ExplainabilityComponent,
        children: [
          { path: 'local', component: LocalComponent },
          {
            path: 'global',
            component: GlobalComponent,
            children: [
              { path: 'feature-info', component: GlobalFeatureInfoComponent },
              {
                path: 'feature-importance',
                component: GlobalFeatureImportanceComponent,
              },
              {
                path: 'feature-shaping',
                component: GlobalFeatureShapingComponent,
              },
              { path: '', redirectTo: 'feature-info', pathMatch: 'full' },
            ],
          },
          { path: '', redirectTo: 'local', pathMatch: 'full' },
        ],
      },
      { path: '', redirectTo: 'explain', pathMatch: 'full' },
    ],
    canActivateChild: [ModelLoadedGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', component: HomeComponent, canActivate: [AuthGuard] },
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
    LimeFeatureValuesComponent,
    GlobalComponent,
    GlobalFeatureInfoComponent,
    GlobalFeatureImportanceComponent,
    GlobalFeatureShapingComponent,
    DataGridSelectedDirective,
    DataGridRowVisibleDirective,
    UploadTextModelComponent,
    LoginComponent,
    SignupComponent,
    LogOutButton,
    ExplainabilityComponent,
  ],
  imports: [
    CommonModule,
    AmplifyUIAngularModule,
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
    MatTabsModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  providers: [AmplifyService],
  bootstrap: [AppComponent],
})
export class AppModule {}
