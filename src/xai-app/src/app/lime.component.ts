import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LimeService } from './lime.service';
import { SingleChartResult } from './single-chart-result';

@Component({
  selector: 'xai-lime',
  template: `
    <ng-container *ngIf="limeService.results$ | async as results">
      <xai-lime-probabilities
        [results]="results.predictProbabilities"
      ></xai-lime-probabilities>
      <xai-lime-chart [results]="results.exp"></xai-lime-chart>
      <xai-lime-feature-values
        [featureValues]="results.featureValues"
      ></xai-lime-feature-values>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: grid;
        grid-template-columns: 300px 1fr 300px;
        height: 100%;
      }
    `,
  ],
})
export class LimeComponent {
  constructor(public limeService: LimeService) {}
}
