import { Component } from '@angular/core';
import { GlobalService } from './global.service';

@Component({
  selector: 'xai-global-feature-info',
  template: `
    <div class="flex-container">
      <div *ngIf="global$ | async as global" style="width:100%; height: 100%">
        <ag-grid-angular
          style="width: 100%;height: 100%;"
          class="ag-theme-alpine"
          [rowData]="global"
          [columnDefs]="columnDefs"
          (gridSizeChanged)="onGridSizeChanged($event)"
        ></ag-grid-angular>
      </div>

      <mat-spinner
        class="spinner"
        [class.show]="loading$ | async"
      ></mat-spinner>
    </div>
  `,
  styles: [
    `
      .flex-container {
        display: flex;
        height: 100%;
      }
    `,
  ],
})
export class GlobalFeatureInfoComponent {
  global$ = this.globalService.globalInfo$;
  loading$ = this.globalService.globalInfoLoading$;

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
