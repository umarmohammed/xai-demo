import { Component } from '@angular/core';
import { GlobalFeatureShapingService } from './global-feature-shaping.service';
import { curveStep } from 'd3-shape';

@Component({
  selector: 'xai-global-feature-shaping',
  template: `<div
    *ngIf="featureShaping$ | async as featureShaping"
    style="height:100%; width: 100%;display: flex; flex-direction: column; align-items: center"
  >
    <h3>{{ featureShaping.title }}</h3>
    <div style="flex: 1; width:100%">
      <ngx-charts-line-chart
        [results]="featureShaping.results"
        [xAxis]="true"
        [yAxis]="true"
        [autoscale]="true"
        [yScaleMin]="featureShaping.yScaleMin"
        [yScaleMax]="featureShaping.yScaleMax"
        [yAxisLabel]="featureShaping.yAxisLabel"
        [showYAxisLabel]="true"
        [curve]="curveStep"
        [scheme]="colorScheme"
      >
      </ngx-charts-line-chart>
    </div>
  </div>`,
})
export class GlobalFeatureShapingComponent {
  curveStep = curveStep;

  featureShaping$ = this.featureShapingService.featureShaping$;

  colorScheme = { domain: ['#1f77b4'] };

  constructor(private featureShapingService: GlobalFeatureShapingService) {}
}
