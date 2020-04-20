import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LimeService } from './lime.service';
import { SingleChartResult } from './single-chart-result';

@Component({
  selector: 'xai-lime',
  template: `
    <ng-container *ngIf="limeService.results$ | async as results">
      <xai-lime-probabilities
        [results]="results.predictProbabilities"
        style="width: 25%;"
      ></xai-lime-probabilities>
      <xai-lime-chart
        [results]="results.exp"
        style="width: 50%;"
      ></xai-lime-chart>
      <xai-lime-feature-values
        style="width: 25%; "
        [featureValues]="results.featureValues"
      ></xai-lime-feature-values>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: flex;
        height: 100%;
      }
    `,
  ],
})
export class LimeComponent {
  constructor(public limeService: LimeService) {}
}
