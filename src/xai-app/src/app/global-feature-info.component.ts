import { Component } from '@angular/core';
import { GlobalService } from './global.service';

@Component({
  selector: 'xai-global-feature-info',
  template: `
    <ag-grid-angular
      style="height: 100%"
      class="ag-theme-alpine"
      [rowData]="global$ | async"
      [columnDefs]="columnDefs"
      (gridSizeChanged)="onGridSizeChanged($event)"
    ></ag-grid-angular>
  `,
})
export class GlobalFeatureInfoComponent {
  global$ = this.globalService.globalInfo$;

  columnDefs = [
    { field: 'Name' },
    { field: 'Type' },
    { field: '# Unique' },
    { field: '% Non-zero' },
  ];

  constructor(private globalService: GlobalService) {}

  onGridSizeChanged(params: any) {
    params.api.sizeColumnsToFit();
  }
}
