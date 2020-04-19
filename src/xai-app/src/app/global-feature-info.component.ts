import { Component } from '@angular/core';
import { GlobalService } from './global.service';

@Component({
  selector: 'xai-global-feature-info',
  template: `<ag-grid-angular
    style="width: 100%; height: 100%"
    class="ag-theme-alpine"
    [rowData]="global$ | async"
    [columnDefs]="columnDefs"
    (firstDataRendered)="onFirstDataRendered($event)"
  ></ag-grid-angular>`,
})
export class GlobalFeatureInfoComponent {
  global$ = this.globalService.global$;

  columnDefs = [
    { field: 'Name' },
    { field: 'Type' },
    { field: '# Unique' },
    { field: '% Non-zero' },
  ];

  constructor(private globalService: GlobalService) {}

  onFirstDataRendered(params: any) {
    params.api.sizeColumnsToFit();
  }
}
