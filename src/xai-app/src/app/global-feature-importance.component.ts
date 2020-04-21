import { Component } from '@angular/core';
import { GlobalService } from './global.service';

@Component({
  selector: 'xai-global-feature-importance',
  template: `
    <div class="flex-container">
      <div
        style="width: 100%; height: 100%;"
        *ngIf="globalImportance$ | async as globalImportance"
      >
        <ngx-charts-bar-horizontal
          [results]="globalImportance"
          [xScaleMax]="1"
          [xScaleMin]="0"
          [yAxis]="true"
          [trimYAxisTicks]="false"
          [showDataLabel]="true"
          [scheme]="colorScheme"
        >
        </ngx-charts-bar-horizontal>
      </div>
      <mat-spinner
        class="spinner"
        [class.show]="loading$ | async"
      ></mat-spinner>
    </div>
  `,
  styles: [
    `
      .flex-container {
        display: flex;
        height: 100%;
      }
    `,
  ],
})
export class GlobalFeatureImportanceComponent {
  globalImportance$ = this.globalService.globalImportance$;
  loading$ = this.globalService.globalImportanceLoading$;

  constructor(private globalService: GlobalService) {}

  colorScheme = {
    domain: ['#ff7f0e'],
  };
}
