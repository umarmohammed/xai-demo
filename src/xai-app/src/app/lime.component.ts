import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LimeService } from './lime.service';

@Component({
  selector: 'xai-lime',
  template: `
    <div
      class="flex-container"
      *ngIf="limeService.results$ | async as results"
      [class.hidden]="limeService.loading$ | async"
    >
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
    </div>
    <mat-spinner
      class="spinner"
      [class.show]="limeService.loading$ | async"
    ></mat-spinner>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: flex;
        height: 100%;
      }

      .flex-container {
        display: flex;
        height: 100%;
        width: 100%;
      }

      .hidden {
        display: none;
      }
    `,
  ],
})
export class LimeComponent {
  constructor(public limeService: LimeService) {}
}
