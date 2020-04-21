import { Component, OnInit } from '@angular/core';
import { GlobalFeatureShapingService } from './global-feature-shaping.service';
import { curveStep } from 'd3-shape';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'xai-global-feature-shaping',
  template: `<div
    *ngIf="globalFeatureShapingResponse$ | async as response"
    style="height:100%; width: 100%;display: flex; flex-direction: column; align-items: center"
  >
    <mat-form-field>
      <mat-select
        [value]="selectedFeature$ | async"
        (selectionChange)="onSelectionChange($event)"
      >
        <mat-option *ngFor="let feature of features$ | async" [value]="feature">
          {{ feature }}
        </mat-option>
      </mat-select>
    </mat-form-field>
    <div
      style="flex: 1; width:100%"
      *ngIf="featureShapingLine$ | async as featureShapingLine"
    >
      <ngx-charts-line-chart
        [results]="featureShapingLine.results"
        [xAxis]="true"
        [yAxis]="true"
        [yScaleMin]="featureShapingLine.yScaleMin"
        [yScaleMax]="featureShapingLine.yScaleMax"
        [yAxisLabel]="featureShapingLine.yAxisLabel"
        [showYAxisLabel]="true"
        [curve]="curveStep"
        [scheme]="lineColorScheme"
      >
      </ngx-charts-line-chart>
    </div>
    <div
      style="flex: 1; width: 100%"
      *ngIf="featureShapingBar$ | async as featureShapingBar"
    >
      <ngx-charts-bar-vertical
        [scheme]="barColorScheme"
        [results]="featureShapingBar.results"
        [showYAxisLabel]="true"
        [xAxis]="true"
        [yAxis]="true"
        [yAxisLabel]="featureShapingBar.yAxisLabel"
      >
      </ngx-charts-bar-vertical>
    </div>
  </div>`,
})
export class GlobalFeatureShapingComponent {
  curveStep = curveStep;
  globalFeatureShapingResponse$ = this.featureShapingService
    .globalFeatureShapingResponse$;
  featureShapingLine$ = this.featureShapingService.featureShapingLine$;
  featureShapingBar$ = this.featureShapingService.featureShapingBar$;
  features$ = this.featureShapingService.features$;
  selectedFeature$ = this.featureShapingService.selectedFeature$;

  lineColorScheme = { domain: ['#1f77b4'] };
  barColorScheme = {
    domain: ['#ff7f0e'],
  };

  constructor(private featureShapingService: GlobalFeatureShapingService) {}

  onSelectionChange(selectionChange: MatSelectChange) {
    this.featureShapingService.selectFeature(selectionChange.value);
  }
}
