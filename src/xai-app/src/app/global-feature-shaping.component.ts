import { Component } from '@angular/core';
import { GlobalFeatureShapingService } from './global-feature-shaping.service';
import { curveStep } from 'd3-shape';

@Component({
  selector: 'xai-global-feature-shaping',
  template: `<div
    *ngIf="globalFeatureShapingResponse$ | async as response"
    style="height:100%; width: 100%;display: flex; flex-direction: column; align-items: center"
  >
    <h3>{{ response.layout.title.text }}</h3>
    <div
      style="flex: 1; width:100%"
      *ngIf="featureShapingLine$ | async as featureShapingLine"
    >
      <ngx-charts-line-chart
        [results]="featureShapingLine.results"
        [xAxis]="true"
        [yAxis]="true"
        [autoscale]="true"
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

  lineColorScheme = { domain: ['#1f77b4'] };
  barColorScheme = {
    domain: ['#ff7f0e'],
  };

  constructor(private featureShapingService: GlobalFeatureShapingService) {}
}
