import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { SingleChartResult } from './single-chart-result';

@Component({
  selector: 'xai-lime-chart',
  template: `<ngx-charts-bar-horizontal
    *ngIf="results"
    [results]="results"
    [xScaleMax]="1"
    [xScaleMin]="-1"
    [xAxis]="true"
    [yAxis]="true"
    [customColors]="customColor(results)"
    [trimYAxisTicks]="false"
    [showDataLabel]="true"
  >
  </ngx-charts-bar-horizontal>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LimeChartComponent {
  @Input() results: SingleChartResult[];

  customColor = (results: SingleChartResult[]) => (name: string) =>
    results.find((r) => r.name === name).value > 0 ? '#ff7f0e' : '#1f77b4';
}
