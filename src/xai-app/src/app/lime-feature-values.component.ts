import { Component, Input } from '@angular/core';
import { FeatureValue } from './lime-response';

@Component({
  selector: 'xai-lime-feature-values',
  template: `
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [rowData]="featureValues"
      [columnDefs]="columnDefs"
      (gridSizeChanged)="onGridSizeChanged($event)"
    ></ag-grid-angular>
  `,
})
export class LimeFeatureValuesComponent {
  @Input() featureValues: FeatureValue[];

  columnDefs = [{ field: 'feature' }, { field: 'value' }];

  onGridSizeChanged(params: any) {
    params.api.sizeColumnsToFit();
  }
}
