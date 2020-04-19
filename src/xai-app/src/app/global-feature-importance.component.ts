import { Component } from '@angular/core';
import { GlobalService } from './global.service';

@Component({
  selector: 'xai-global-feature-importance',
  template: `
    <div style="width: 100%; height: 100%;">
      <ngx-charts-bar-horizontal
        [results]="globalImportance$ | async"
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
})
export class GlobalFeatureImportanceComponent {
  globalImportance$ = this.globalService.globalImportance$;

  constructor(private globalService: GlobalService) {}

  colorScheme = {
    domain: ['#ff7f0e'],
  };
}
