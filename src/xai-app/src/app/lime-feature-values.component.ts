import { Component, Input } from '@angular/core';
import { FeatureValue } from './lime-response';
import { AgGridEvent } from 'ag-grid-community';

@Component({
  selector: 'xai-lime-feature-values',
  template: `
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine lime-feature-values"
      [rowData]="featureValues"
      [columnDefs]="columnDefs"
      (gridSizeChanged)="onGridSizeChanged($event)"
      [rowClassRules]="rowClassRules"
    ></ag-grid-angular>
  `,
})
export class LimeFeatureValuesComponent {
  @Input() featureValues: FeatureValue[];

  columnDefs = [{ field: 'feature' }, { field: 'value' }];

  // todo the class is part of params
  rowClassRules = {
    positive: (params) => this.featureValues[params.rowIndex].class === 1,
    negative: (params) => this.featureValues[params.rowIndex].class === 0,
  };

  onGridSizeChanged(params: AgGridEvent) {
    params.columnApi.autoSizeAllColumns();
  }
}
