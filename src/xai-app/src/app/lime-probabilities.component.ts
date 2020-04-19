import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { SingleChartResult } from './single-chart-result';

@Component({
  selector: 'xai-lime-probabilities',
  template: `
    <div class="container">
      <h3 class="title">Prediction Probabilities</h3>
      <ngx-charts-bar-horizontal
        [results]="results"
        [xScaleMax]="1"
        [xScaleMin]="0"
        [yAxis]="true"
        [trimYAxisTicks]="false"
        [showDataLabel]="true"
        [scheme]="colorScheme"
      >
      </ngx-charts-bar-horizontal>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .container {
        height: 50%;
      }

      .title {
        text-align: center;
      }
    `,
  ],
})
export class LimeProbabilitiesComponent {
  @Input() results: SingleChartResult[];

  colorScheme = {
    domain: ['#1f77b4', '#ff7f0e'],
  };
}
