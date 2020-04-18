import { Component, Output, EventEmitter } from '@angular/core';
import { DataGridService } from './data-grid.service';

@Component({
  selector: 'xai-data-grid',
  template: ` <ag-grid-angular
    *ngIf="grid$ | async as grid"
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [rowData]="grid.rowData"
    [columnDefs]="grid.columnDefs"
    rowSelection="single"
    (selectionChanged)="onSelectionChanged($event)"
  >
  </ag-grid-angular>`,
})
export class DataGridComponent {
  grid$ = this.dataGrid.grid$;

  constructor(private dataGrid: DataGridService) {}

  onSelectionChanged(event: any) {
    this.dataGrid.rowSelected(event);
  }
}
